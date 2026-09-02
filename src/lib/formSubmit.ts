// Sends form data to FormSubmit.co, which emails the submission directly —
// no backend, account, or API key required. On the very first real
// submission, FormSubmit sends a one-time confirmation email to the target
// address; that link must be clicked once to activate delivery.
// Docs: https://formsubmit.co/

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export async function submitToFormSubmit(
  targetEmail: string,
  fields: Record<string, string>,
  subject: string
): Promise<void> {
  const payload = {
    ...fields,
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
  };

  const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Form submission failed');
  }
}
