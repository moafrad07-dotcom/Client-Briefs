# Client Brief website (Google Apps Script version)

Files:
- `index.html` is the client-facing form.
- `Code.gs` is the small Google script that receives each submission.

When a client presses **Send brief**:
- You get an **email from your own Gmail** with the paragraph brief in the body and **two PDFs attached** (`...-brief.pdf` and `...-answers.pdf`). The client's email is set as the reply-to address.
- One row is added to a Google Sheet: date, company, contact, email, phone. The full answers are not stored in the Sheet.
- Nothing is saved to Google Drive.
- The client sees only a thank-you page.

## One-time setup (about 10 minutes)

1. Create a new Google Sheet. Name it "Client Briefs".
2. Open **Extensions > Apps Script**. Delete the starter code and paste in everything from `Code.gs`.
3. At the top of the script, set `OWNER_EMAIL` to your email and change `SECRET` to a word of your own. Save.
4. Select **Deploy > New deployment**. Choose type **Web app**. Set **Execute as: Me** and **Who has access: Anyone**. Select **Deploy**.
5. Google asks you to authorize. Choose your account. If it shows "Google hasn't verified this app", select **Advanced**, then **Go to (project name)**. This is your own script, so this is expected.
6. Copy the **Web app URL**.
7. Open `index.html` in a text editor. Near the end, find `SCRIPT_URL` and paste the URL. Set `SECRET` to the same word you used in step 3.
8. Put the site online for free: drag the folder onto https://app.netlify.com/drop (you can ignore Netlify's form settings), or use GitHub Pages or Cloudflare Pages.
9. Open your live link, fill in a test brief, and press Send. The email should arrive within a minute.

## Changing the script later

After any edit to `Code.gs`, select **Deploy > Manage deployments**, edit the deployment, choose **New version**, and Deploy. The web address stays the same.

## Good to know

- Free Gmail has a daily limit on emails sent by scripts. It is far above what client briefs need. See https://developers.google.com/apps-script/guides/services/quotas
- The web app address is public. The hidden field and the `SECRET` stop most junk, but they are not strong security. Share your live link only with clients.
- If a submission cannot be sent, the client does not see the thank-you page. They see a message to try again, and a **Copy my answers** button so they can send the text to you by email or WhatsApp.

## Editing

- Questions: the `S` array near the top of the script in `index.html`.
- Paragraph wording: the `compose` function.
- Colors: the `:root` block at the top.
