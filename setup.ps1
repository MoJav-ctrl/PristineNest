<#
  PristineNest local dev setup (Windows + Rancher Desktop)

  Run this from inside the extracted project folder (the one containing
  package.json). It will:
    1. Start PostgreSQL via docker-compose.yml
    2. Wait until the database is actually ready
    3. Create .env from .env.example (only if .env does not already exist)
    4. Apply the database schema
    5. npm install
    6. Start the dev server

  Usage (from PowerShell, inside the project folder):
    .\setup.ps1
#>

$ErrorActionPreference = "Stop"

function Write-Step($msg) {
    Write-Host ""
    Write-Host ">>> $msg" -ForegroundColor Cyan
}

# --- 0. Sanity checks ------------------------------------------------------
if (-not (Test-Path ".\package.json")) {
    Write-Host "package.json not found here. Run this script from inside the extracted project folder." -ForegroundColor Red
    exit 1
}
if (-not (Test-Path ".\docker-compose.yml")) {
    Write-Host "docker-compose.yml not found. Place it in the project root alongside package.json." -ForegroundColor Red
    exit 1
}

try {
    docker version | Out-Null
} catch {
    Write-Host "Docker CLI not responding. Make sure Rancher Desktop is running, then try again." -ForegroundColor Red
    exit 1
}

# --- 1. Start PostgreSQL ----------------------------------------------------
Write-Step "Starting PostgreSQL container..."
docker compose up -d

# --- 2. Wait for PostgreSQL to actually be ready ---------------------------
Write-Step "Waiting for PostgreSQL to be ready..."
$ready = $false
for ($i = 1; $i -le 30; $i++) {
    docker exec pristinenest-postgres pg_isready -U pristinenest_user -d pristinenest 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) {
        $ready = $true
        break
    }
    Write-Host ("  not ready yet ({0}/30)..." -f $i)
    Start-Sleep -Seconds 2
}
if (-not $ready) {
    Write-Host "PostgreSQL never became ready. Check 'docker logs pristinenest-postgres'." -ForegroundColor Red
    exit 1
}
Write-Host "PostgreSQL is ready." -ForegroundColor Green

# --- 3. Create .env if it does not already exist ---------------------------
if (Test-Path ".\.env") {
    Write-Step ".env already exists, leaving it alone."
} else {
    Write-Step "Creating .env from .env.example..."

    # Generate a random JWT secret (no Node dependency needed for this)
    $bytes = New-Object byte[] 48
    [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    $jwtSecret = ([BitConverter]::ToString($bytes) -replace '-', '').ToLower()

    # Generate a random-ish admin path suffix
    $suffixBytes = New-Object byte[] 4
    [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($suffixBytes)
    $adminSuffix = ([BitConverter]::ToString($suffixBytes) -replace '-', '').ToLower()
    $adminPath = "staff-$adminSuffix"

    $envContent = Get-Content ".\.env.example" -Raw
    $envContent = $envContent -replace 'DB_HOST=.*', 'DB_HOST=localhost'
    $envContent = $envContent -replace 'DB_PORT=.*', 'DB_PORT=5432'
    $envContent = $envContent -replace 'DB_USER=.*', 'DB_USER=pristinenest_user'
    $envContent = $envContent -replace 'DB_PASSWORD=.*', 'DB_PASSWORD=devpassword'
    $envContent = $envContent -replace 'DB_NAME=.*', 'DB_NAME=pristinenest'
    $envContent = $envContent -replace 'DB_SSL=.*', 'DB_SSL=false'
    $envContent = $envContent -replace 'NODE_ENV=.*', 'NODE_ENV=development'
    $envContent = $envContent -replace 'JWT_SECRET=.*', "JWT_SECRET=$jwtSecret"
    $envContent = $envContent -replace 'VITE_ADMIN_LOGIN_PATH=.*', "VITE_ADMIN_LOGIN_PATH=$adminPath"
    $envContent | Set-Content ".\.env" -NoNewline

    Write-Host "Created .env with a generated JWT secret." -ForegroundColor Green
    Write-Host "NODE_ENV set to development. This is required for npm run dev to work (it uses Vite dev middleware instead of a prebuilt dist folder)." -ForegroundColor Yellow
    Write-Host "Your admin login path is: /$adminPath" -ForegroundColor Yellow
    Write-Host "You can change VITE_ADMIN_LOGIN_PATH in .env any time." -ForegroundColor Yellow
}

# --- 4. Apply the database schema (safe to re-run) --------------------------
Write-Step "Applying database schema..."
Get-Content ".\server\db\schema.sql" -Raw | docker exec -i pristinenest-postgres psql -U pristinenest_user -d pristinenest
if ($LASTEXITCODE -ne 0) {
    Write-Host "Schema apply failed. See the psql output above." -ForegroundColor Red
    exit 1
}

# --- 5. Install dependencies -------------------------------------------------
Write-Step "Running npm install..."
npm install

# --- 6. Start the dev server --------------------------------------------------
Write-Step "Starting the dev server..."
Write-Host "Once it is up, visit http://localhost:3001" -ForegroundColor Green
if (Test-Path ".\.env") {
    $adminLine = Select-String -Path ".\.env" -Pattern "^VITE_ADMIN_LOGIN_PATH=(.*)$"
    if ($adminLine) {
        $path = $adminLine.Matches[0].Groups[1].Value
        Write-Host ("Admin setup: http://localhost:3001/{0}" -f $path) -ForegroundColor Green
    }
}
npm run dev
