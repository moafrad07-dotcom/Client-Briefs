/**
 * Client Brief receiver.
 * Paste this into a Google Sheet: Extensions > Apps Script.
 * Then Deploy > New deployment > Web app (Execute as: Me, Access: Anyone).
 *
 * Each submission:
 *  1. emails you the paragraph brief with both PDFs attached
 *  2. adds one row to the "Briefs" sheet (date, company, contact, email, phone)
 * Nothing is saved to Google Drive.
 */
var OWNER_EMAIL = "you@gmail.com";   // where the briefs are sent
var SECRET = "change-me";            // must match SECRET in index.html

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.hp) return reply_({ ok: true });            // bot filled the hidden field: pretend success
    if (d.token !== SECRET) return reply_({ ok: false, error: "rejected" });

    var attachments = [];
    if (d.briefPdf) attachments.push(Utilities.newBlob(Utilities.base64Decode(d.briefPdf), "application/pdf", d.briefName || "brief.pdf"));
    if (d.answersPdf) attachments.push(Utilities.newBlob(Utilities.base64Decode(d.answersPdf), "application/pdf", d.answersName || "answers.pdf"));

    var company = d.company || "Client";
    var body =
      "New client brief\n\n" +
      "Company: " + company + "\n" +
      "Contact: " + (d.contact || "-") + "\n" +
      "Email: " + (d.email || "-") + "\n" +
      "Phone: " + (d.phone || "-") + "\n\n" +
      "------ BRIEF ------\n\n" + (d.brief || "");

    var mail = { name: "Client Brief Form", attachments: attachments };
    if (d.email) mail.replyTo = d.email;
    MailApp.sendEmail(OWNER_EMAIL, "New client brief: " + company, body, mail);

    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sh = ss.getSheetByName("Briefs") || ss.insertSheet("Briefs");
      if (sh.getLastRow() === 0) sh.appendRow(["Date", "Company", "Contact", "Email", "Phone"]);
      sh.appendRow([new Date(), company, d.contact || "", d.email || "", d.phone || ""]);
    } catch (sheetErr) { /* the email already went out; ignore sheet problems */ }

    return reply_({ ok: true });
  } catch (err) {
    return reply_({ ok: false, error: String(err) });
  }
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
