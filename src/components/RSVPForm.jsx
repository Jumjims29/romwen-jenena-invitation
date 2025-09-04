import React, { useState } from "react";

// ✅ Use proxy in dev, env var in prod
const endpoint =
  import.meta.env.DEV
    ? "/rsvp"
    : import.meta.env.VITE_GSHEET_ENDPOINT;

export default function RSVPForm() {
  const [form, setForm] = useState({ name: "", attending: "Yes", message: "" });
  const [status, setStatus] = useState(null);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!endpoint) {
      setStatus({ ok: false, msg: "Missing VITE_GSHEET_ENDPOINT in .env" });
      return;
    }

    try {
      setStatus({ ok: null, msg: "Sending..." });

      // ✅ Send FormData instead of JSON
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("attending", form.attending);
      formData.append("message", form.message);

      const res = await fetch(endpoint, { method: "POST", body: formData });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus({ ok: true, msg: data.message || "RSVP sent. Thank you!" });
        setForm({ name: "", attending: "Yes", message: "" });
      } else {
        throw new Error(data.message || "Failed to send");
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
        <div className={status.ok ? "success" : "error"}>{status.msg}</div>
      )}
    </form>
  );
}
