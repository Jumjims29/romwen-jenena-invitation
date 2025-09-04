function doPost(e) {
  try {
    const sh = _sheet();

    // ✅ Read values from FormData (e.parameter)
    const name = e.parameter.name || "";
    const attending = e.parameter.attending || "";
    const message = e.parameter.message || "";

    // Save to sheet
    const row = [new Date(), name, attending, message];
    sh.appendRow(row);

    return jsonResponse({ success: true, message: "RSVP saved!" });
  } catch (err) {
    return jsonResponse({ success: false, message: String(err) });
  }
}

function doGet() {
  const sh = _sheet();
  const values = sh.getDataRange().getValues();
  const [header, ...rows] = values;

  const list = rows.filter(r => r[0]).map(r => ({
    timestamp: Utilities.formatDate(new Date(r[0]), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm"),
    name: r[1],
    attending: r[2],
    message: r[3],
  }));

  return jsonResponse({ records: list });
}
