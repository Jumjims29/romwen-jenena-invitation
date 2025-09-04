const SHEET_NAME = 'RSVPs';
const HEADERS = ['Timestamp', 'Name', 'Attending', 'Message'];

function _sheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
  }
  return sh;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const sh = _sheet();
    const data = JSON.parse(e.postData.contents);

    const row = [new Date(), data.name, data.attending, data.message];
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
