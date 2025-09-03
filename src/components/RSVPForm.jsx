import React, { useState } from 'react';

// ✅ Use proxy in dev, env variable in prod
const endpoint =
  import.meta.env.DEV
    ? '/rsvp' // handled by Vite proxy locally
    : import.meta.env.VITE_GSHEET_ENDPOINT;

export default function RSVPForm() {
  const [form, setForm] = useState({ name: '', attending: 'Yes', message: '' });
  const [status, setStatus] = useState(null);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!endpoint) {
      setStatus({ ok: false, msg: 'Missing VITE_GSHEET_ENDPOINT in .env' });
      return;
    }

    try {
      setStatus({ ok: null, msg: 'Sending...' });

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus({ ok: true, msg: data.message || 'RSVP sent. Thank you!' });
        setForm({ name: '', attending: 'Yes', message: '' });
      } else {
        throw new Error(data.message || 'Failed to send');
      }
    } catch (err) {
      setStatus({ ok: false, msg: err.message });
    }
  };

  return (
    <form className="grid" onSubmit={submit}>
      <label className="field">
        <span>Full Name</span>
        <input
          name="name"
          required
          value={form.name}
          onChange={onChange}
          placeholder="e.g., Juan Dela Cruz"
        />
      </label>

      <label className="field">
        <span>Will you attend?</span>
        <select name="attending" value={form.attending} onChange={onChange}>
          <option>Yes</option>
          <option>No</option>
          <option>Maybe</option>
        </select>
      </label>

      <label className="field">
        <span>Message (optional)</span>
        <textarea
          name="message"
          rows="3"
          value={form.message}
          onChange={onChange}
          placeholder="Leave a note for the couple..."
        />
      </label>

      <button className="btn primary" type="submit">
        Send RSVP
      </button>

      {status && (
        <div className={status.ok ? 'success' : 'error'}>{status.msg}</div>
      )}
      {!endpoint && (
        <small className="helper">
          Tip: edit <code>.env</code> and set{' '}
          <code>VITE_GSHEET_ENDPOINT</code>.
        </small>
      )}
    </form>
  );
}
