# English Practice – offline-ready iPad app

This is a static web app/PWA for simple English listening practice. The exercise code has no server or account requirement: each iPad stores its own progress and answers in Safari. The app is **not published**; it must first be placed on an HTTPS web host that the school allows pupils to access.

## What to upload

Publish these files together, preserving their names and folder:

- `index.html`
- `app.js`
- `styles.css`
- `manifest.webmanifest`
- `sw.js`
- `icon.svg`

The host must serve HTML, JavaScript, CSS, the web manifest, and the service worker from the same HTTPS site. A normal OneDrive file link is file sharing, not web hosting. SharePoint and Teams may require a specially approved app/web-part setup to run custom JavaScript; check the school's existing platform before choosing a host.

## Prepare each iPad for offline use

1. Open the school's HTTPS app link in Safari while online.
2. Wait until the pupil panel says the app is ready for offline use.
3. In Safari, use **Share → Add to Home Screen**. Launch the app from that icon for the offline test.
4. Choose one pupil code for that iPad. Keep using the same iPad and app/browser profile; progress is stored there.
5. Test once in Airplane Mode before relying on it in class. Turn Airplane Mode off afterward.

The app must be opened online once for its files to be cached. If Safari storage is cleared, the app is removed, or a different browser/profile is used, that iPad's local progress may be lost.

## Collecting results

Results are **not sent to the teacher or shared between iPads**. On each iPad, open **Lærer / resultater** and choose **Last ned resultater fra denne iPaden (CSV)**. Transfer each CSV into a private, school-approved Teams/SharePoint folder; the files can then be combined in a spreadsheet. The teacher dashboard shown on an iPad only contains that device's results.

Use pupil codes rather than names. Keep the CSV files in the school's approved location. A shared, automatic teacher dashboard would need a separate approved backend and sign-in; this static version intentionally does not include one.
