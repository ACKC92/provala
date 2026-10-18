# Provala

A free availability planner for a group that meets regularly. Members mark the days and times they can come for a whole month and add notes. You see everyone's answers, find the overlaps, and publish the dates.

- **Only your members can use it.** You add them in the planner and each person gets their own username and password. Without signing in, the link shows a sign-in screen and nothing else: no titles, no dates, no names, and no way to answer.
- **Members** sign in once on their phone or computer and stay signed in there. They tap a day (or a weekday name like *Tue* for every Tuesday) and mark its half hours as *Available* or *If needed*, add notes for specific days and a general comment, and send. *If needed* asks for a short reason, either in that day's note or in the general comment. They can come back any time, from any device, to change their answers. They never see anyone else's answers.
- **You (the organizer)** sign in to the planner with a private key. You get a timetable that shows how many people are free at each half hour, a board you drag people onto to see the overlaps of any group, a ranked list of the best times (marked *tam kadro* when everyone can come), a "two meetings a month" suggestion, a list of who hasn't answered yet, and a schedule you publish to members. You can copy the schedule as a ready-made message for WhatsApp in Turkish or English, and members can add the dates to their calendars.
- The page switches between Turkish and English, and between day and night (the moon and sun button in the header). It starts out matching the device's own setting.

## What goes where

| File | Where it lives | What's in it |
| --- | --- | --- |
| `index.html` | Your GitHub repository (public) | The page itself. No names, no answers, no passwords. |
| `banner.webp` | GitHub, next to `index.html` | The Provayoyo banner. |
| `tex-*.webp` (8 files) | GitHub, next to `index.html` | The parchment and ground textures. Each device fetches only the ones it needs. |
| `vollkorn.woff2`, `vollkorn-italic.woff2`, `OFL.txt` | GitHub, next to `index.html` | The page's font (Vollkorn) and its free licence. |
| `icon.png` | GitHub, next to `index.html` | The icon in the browser tab and on a phone's home screen. |
| `preview.jpg` | GitHub, next to `index.html` | The picture WhatsApp shows when you share the link. |
| `Code.gs` | Google Apps Script, in your Google account | The small backend the page talks to. It checks every sign-in. |
| Your data | A private Google Sheet called **Provala data** in your Google Drive | Members, polls, every answer, notes, comments, the schedule. |

The banner, font, icon and preview picture rarely change, so after the first upload you normally only replace `index.html`.

Nothing personal is ever stored on GitHub. Answers go straight from the member's browser to your Google account.

---

## Step 1: Set up the backend (about 10 minutes)

Apps Script is Google's free place to run a small program with your Google account. `setup` is the name of a function inside `Code.gs`: running it once creates your private data sheet and your organizer key. You never need to run it again.

1. Go to **https://script.google.com** while signed in to the Google account that should own the data, and click **New project**.
2. Click **Untitled project** at the top and rename it **Provala**.
3. You'll see a file called `Code.gs` with a few lines of sample code. Select all of it, delete it, paste the whole contents of this repo's `Code.gs`, and press **Ctrl+S** to save.
4. Above the code there's a **▶ Run** button, and next to it a dropdown showing a function name. Choose **setup** in that dropdown, then click **▶ Run**.
   - Google asks for permission the first time. Click **Review permissions**, choose your account, then **Advanced → Go to Provala (unsafe) → Allow**. The warning appears because the script is your own and isn't published by a company. It only works with the spreadsheet it creates in your Drive.
5. When it finishes, the **Execution log** at the bottom shows two things. Keep both:
   - **Your data spreadsheet:** a link to the new "Provala data" sheet.
   - **Your organizer key:** a long code. This is your password for the planner. Keep it in a password manager and don't share it.
6. Click **Deploy → New deployment**. Click the gear icon next to "Select type" and choose **Web app**. Fill in:
   - Description: `Provala`
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click **Deploy** and copy the **Web app URL**. It ends with `/exec`.

To check it works, open that URL in your browser. You should see a short line of text containing `"ok":true`.

"Anyone" only lets the page reach the script. The script itself gives nothing out and takes nothing in without a member's sign-in, or your organizer key for the planner.

## Step 2: Put the page online with GitHub Pages

1. Open `index.html` in a text editor. Near the top of the script you'll find:

   ```js
   const API_URL = '';
   ```

   Paste your Web app URL between the quotes and save:

   ```js
   const API_URL = 'https://script.google.com/macros/s/AKfy.../exec';
   ```

2. On GitHub, create a new **public** repository, for example `provala`.
3. Click **uploading an existing file**, drag in all of these at once: `index.html`, `banner.webp`, the eight `tex-…webp` files, `vollkorn.woff2`, `vollkorn-italic.woff2`, `OFL.txt`, `icon.png` and `preview.jpg` (and this `README.md` if you like). Then click **Commit changes**. They must all sit in the same folder as `index.html`. `preview.jpg` is the picture WhatsApp and other apps show when you share the link. Its address is written into `index.html` as `https://ackc92.github.io/provala/preview.jpg`; if your repository or username is different, change the `og:url` and `og:image` lines near the top of `index.html` to match.
4. Go to the repository's **Settings → Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, Branch to **main** and the folder to **/ (root)**, then click **Save**.
5. After a minute or two the page is live at `https://<your-username>.github.io/provala/`.

You don't need to upload `Code.gs` to GitHub. It contains no secrets (the key and the password secrets are stored inside Apps Script), so it's fine either way.

## Step 3: Add your members

1. Open `https://<your-username>.github.io/provala/#admin`, paste your organizer key, and click **Open planner**. That browser stays signed in to the planner for 30 days, or until you click **Sign out**. The key itself isn't saved in the browser.
2. Click **New poll**, check the details, and click **Create poll** (Step 4 has more about polls).
3. Open the **Members** tab. Type or paste your group's names, one per line, and click **Add**.
4. Each person gets a username (from their first name, like `ayse`) and an easy password (like `kiraz-tempo-mavi-47`). Next to each name, click **Message (TR)** or **Message (EN)**. That copies a ready-to-send message with the link, their username and their password. Paste it into a private chat with that person, not the group chat.
5. The passwords are shown only now. The sheet keeps them in a scrambled form that can't be turned back into the password. If someone loses theirs, click **New password** next to their name and send them the new message.

Members can change their password after signing in (**Change password** under the title). Usernames don't care about capital letters or Turkish characters: `Ayşe`, `AYSE` and `ayse` all work.

## Step 4: Run your first month

1. In **New poll** (or **Settings** for the current one), check the titles (Turkish and English), the days people can pick, when the day starts and ends (11:00 to midnight unless you change it), the time step (30 minutes works well), your usual meeting length and an optional answer deadline. Your first poll becomes the **current** one automatically.
2. As answers arrive, the **Plan** tab fills in:
   - **The timetable.** Darker green means more people are free. A dot means everyone on the board is free (*tam kadro*). An amber line means everyone could come, but some only if needed. Tap a square to see who is free, who is "if needed" and why, who isn't, and their notes for that day.
   - **The board.** Everyone starts on it. Drag names off to the "Not on the board" tray, or drag them back, to see the overlaps for any group (for example, only one section). Tapping a name also moves it.
   - **Best times.** One line per day, best first, for the meeting length you choose, with who is missing and why. **Two meetings a month** suggests the best pair of dates at least 10 days apart (you can change the gap).
3. The **People** tab shows how many members have answered and who hasn't yet, then each person's month at a glance with their comment and day notes. You can delete an answer there, or show only that person on the board.
4. Click **Add** next to a time (or **Add both**), then open the **Schedule** tab. Adjust times, add a place and notes, and click **Publish to members**. Signed-in members see the dates under **Schedule** with buttons to add them to Google Calendar or any calendar app.
5. Publishing doesn't send anything. Click **Copy as message (TR)** or **(EN)** and paste the dates into your group chat.

## Every month after that

1. In the planner, click **New poll**. It copies your last settings and picks the following month.
2. Click **Make current**. Members see the new month the next time they open the link. Old polls stay in the list, and members stay the same.

## Where your data is

Open the **Provala data** spreadsheet (link in the Apps Script log, or search your Drive). It has four sheets:

- **Members**: one row per member, with their name, username and when they last signed in. Passwords are only stored scrambled.
- **Polls**: one row per poll.
- **Responses**: one row per member per poll, with readable columns for name, comment, availability (times in brackets are "only if needed") and day notes.
- **Schedules**: what you published.

The last column of each sheet, **Data**, is what the app reads. Make changes through the app rather than in that column. **Export CSV** in the planner gives you one row per person per day.

## Changing things later

- **Changed `index.html`?** Upload it to the GitHub repository again (with your `API_URL` filled in). Pages updates within a minute or two.
- **Set up earlier under the old name Tutti?** Nothing breaks. The page finds your sheet by its ID, so you can rename the sheet and the Apps Script project to Provala whenever you like. If you also rename the GitHub repository, the link changes to `https://<your-username>.github.io/provala/`. Send members the new link; they stay signed in, because it's still the same github.io address.
- **Want a different banner?** Replace `banner.webp` in the repository with the new picture (same name, about 3 times as wide as it is tall). The link-preview picture is the separate `preview.jpg` (1200 × 630); replace that file too. WhatsApp keeps old previews for a while, so the new picture can take a day or so to show in chats where the link was already shared.
- **Changed `Code.gs`?** Paste the new code, save it, then **Deploy → Manage deployments**, click the pencil icon, set Version to **New version**, and click **Deploy**. The URL stays the same. Without this step, the live web app keeps running the old code. The page works with an older `Code.gs` too, just a little slower: signing in and opening the planner then take two requests instead of one.
- **Someone forgot their password?** Members tab → **New password** next to their name. Their old password and sign-ins stop working.
- **Someone left the group?** Members tab → **Remove**. They can't sign in any more; answers they already gave stay.
- **Want everyone to sign in again** (for example, after a phone was lost)? Run `signOutEveryone` in the Apps Script editor (pick it in the same dropdown as `setup`, then **▶ Run**). Passwords keep working. A phone that is offline can still show its last copy of that member's own page, but it can't load anything new or send anything until someone signs in again.
- **Lost the organizer key?** Run `showOrganizerKey` in the Apps Script editor and look in the Execution log.
- **Want a new organizer key** (for example after sharing your screen)? Run `newOrganizerKey`. The old one stops working, and so does every planner sign-in made with it.
- **Want a co-organizer?** Give them the organizer key; they can then do everything you can in the planner. To take it back, run `newOrganizerKey`.
- **Want to choose your own organizer key?** In Apps Script, open **Project Settings** (the gear on the left) → **Script properties** → edit `ADMIN_KEY`. Use something long, like four or five unrelated words.

### Updating from the version without sign-in

Paste the new `Code.gs` and deploy a **New version** (see above), then upload the new `index.html` with your `API_URL`. You don't need to run `setup` again: the Members sheet appears by itself. Answers sent before the update stay in your sheet and in the planner, but aren't linked to a member, so the "who hasn't answered" list starts fresh.

## Security and privacy

**What is public.** The page's code on GitHub, including the address of your Apps Script. That's by design: the address only leads to a sign-in, and the script gives nothing out without a member's sign-in or the organizer key. Neither file contains a password or key.

**What protects your members' answers.**
- Only members you add can sign in, and each member can only ever load their own answers. So that the page opens at once on a return visit, it keeps a copy of the member's own page (the poll and their own answers) on their device, next to the sign-in; signing out removes both. Names, notes and schedules are shown as plain text, so nothing a member types can run as code in anyone's browser.
- Passwords are stored only as salted, keyed hashes. The secrets for those hashes and for sign-ins live in the script's properties, not in the sheet, so even a copy of the sheet doesn't reveal passwords.
- After 8 wrong passwords in a row, that username is paused for 15 minutes. After 10 wrong organizer keys, the planner is paused for 15 minutes.
- Sign-ins are signed and expire: 180 days for members, 30 days for the planner. A password change, a new password from you, or `signOutEveryone` ends them early.

**What you should do.**
- Turn on 2-Step Verification for the Google account that owns the script and the sheet. Everything is only as safe as that account.
- Don't share the **Provala data** sheet or the Apps Script project with anyone.
- Send each member their sign-in message privately, never in the group chat.
- Keep the organizer key private. Sign out of the planner on computers that aren't yours.
- All your GitHub Pages sites share one address (`<your-username>.github.io`), and pages on the same address can read each other's saved sign-ins. Don't add third-party scripts (trackers, widgets) to your other pages there. For complete separation, put Provala in a free GitHub organization instead, so it gets its own address.

**Limits.** A poll can cover up to 3 months and take up to 400 answers. You can add up to 400 members. Times are in the poll's time zone (set automatically from your browser, editable in the poll settings).

## Troubleshooting

- **"Couldn't reach the planner"**: check that `API_URL` in `index.html` is the Web app URL ending in `/exec`, and that the deployment's "Who has access" is **Anyone**.
- **"The planner isn't set up yet"**: run `setup` once in the Apps Script editor.
- **A member can't sign in**: check the username in the Members tab. If they've tried too many times, they can wait 15 minutes, or you can give them a new password.
- **Your changes to `Code.gs` don't show up**: deploy a **New version** (see above).
- **The organizer key isn't accepted**: run `showOrganizerKey` and copy it again, without extra spaces.
- **The page says "The page couldn't open" / "Sayfa açılamadı"**: press **Reload** first. If it comes back, press **Clear the copy and reload**: it removes only the copy of the page kept on that phone or computer; the person stays signed in and unsent answers are kept. The line under the buttons says what went wrong, which is useful in a screenshot.
- **The textures are missing (flat colours)**: the `tex-…webp` files aren't next to `index.html` on GitHub. Upload them; the page works without them, it just looks plainer.

## Try it first

With `API_URL` left empty, the page runs as a demo with eight sample people. Everything stays in your browser. Sign in with the username `deneme` and the password `demo`. Open the page with `#admin` at the end and use the key `demo` to see the planner and the Members tab.
