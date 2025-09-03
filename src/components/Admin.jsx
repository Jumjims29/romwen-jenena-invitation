import React, { useEffect, useState } from "react";

const readEndpoint = import.meta.env.VITE_GSHEET_READ_ENDPOINT;

export default function Admin() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadGuests = async () => {
    if (!readEndpoint) {
      setError("Missing VITE_GSHEET_READ_ENDPOINT in .env");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(readEndpoint);
      const data = await res.json();
      if (Array.isArray(data)) {
        setGuests(data);
      } else if (data.records) {
        setGuests(data.records);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuests();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">RSVP Attendance Tracker</h1>

      {loading && <p>Loading RSVPs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Guests</th>
                <th className="border px-4 py-2">Attending</th>
                <th className="border px-4 py-2">Message</th>
                <th className="border px-4 py-2">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((g, i) => (
                <tr key={i}>
                  <td className="border px-4 py-2">{g.name}</td>
                  <td className="border px-4 py-2">{g.guests}</td>
                  <td className="border px-4 py-2">{g.attending}</td>
                  <td className="border px-4 py-2">{g.message}</td>
                  <td className="border px-4 py-2">{g.timestamp}</td>
                </tr>
              ))}
              {guests.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No RSVPs yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <button
        onClick={loadGuests}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Refresh
      </button>
    </div>
  );
}
