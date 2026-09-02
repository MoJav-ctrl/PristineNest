// The admin area's base path, deliberately not "/admin" so it isn't
// guessable. Must match ADMIN_LOGIN_PATH in the backend's .env — see
// .env.example. Read at BUILD time (Vite inlines it into the JS bundle),
// so changing this value requires rebuilding and redeploying the frontend,
// not just restarting the server.
export const ADMIN_BASE_PATH = import.meta.env.VITE_ADMIN_LOGIN_PATH || 'staff-portal-7k2m';
