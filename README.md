# Provala

A free availability planner for a group that meets regularly. Members mark the days and times they can come for a whole month and add notes. You see everyone's answers, find the overlaps, and publish the dates.

- **Only your members can use it.** You add them in the planner and each person gets their own username and password. Without signing in, the link shows a sign-in screen and nothing else: no titles, no dates, no names, and no way to answer.
- **Members** sign in once on their phone or computer and stay signed in there. They tap a day (or a weekday name like *Tue* for every Tuesday) and mark its half hours as *Available* or *If needed*, add notes for specific days and a general comment, and send. *If needed* asks for a short reason, either in that day's note or in the general comment. They can come back any time, from any device, to change their answers. They never see anyone else's answers.
- **You (the organizer)** sign in to the planner with a private key. You get a timetable that shows how many people are free at each half hour, a board you drag people onto (or fill with one tap per voice part) to see the overlaps of any group, a ranked list of the best times (marked *tam kadro* when everyone can come), suggestions for any number of meetings a month, a list of who hasn't answered yet, and a schedule you publish to members. Best times are ranked by the weakest voice part, so 10 people with every part there come before 12 with no tenors, and the people every rehearsal needs (the accompanist, a soloist) come first. You can copy the schedule as a ready-made message for WhatsApp in Turkish or English, and members can add the dates to their calendars.
- **Holidays and closed days.** Public holidays show as red-letter days in every calendar. They stay open, because sometimes a holiday is the only day left; you close the ones you won't rehearse on, poll by poll, along with any other day (a hall that's taken). Nobody can mark times on a closed day.
- **Sectionals.** A meeting can be for some voice parts only. Only they are asked to reply and get it in their calendar; the others see it marked as not theirs.
- **Like last month.** A member who hasn't answered a new poll yet can fill it in with one press from their previous answer, weekday by weekday, then fix what's changed.
- **After you publish**, members answer each rehearsal with *Geliyorum*, *Kısmen* or *Gelemiyorum*. *Kısmen* asks when they'll arrive or leave and why, *Gelemiyorum* asks why, unless they tick that you already know. Only you see any of it; other members only see how many of each voice part (or instrument) are coming. You see the replies per rehearsal, copy ready-made reminders for whoever hasn't answered, take attendance on the day, and keep a season record. Members can subscribe to the dates from their phone's calendar, and see their own attendance.
- **Several groups** (a choir, a chamber choir, an orchestra…) can share one planner and one organizer key. Each group has its own sections (voice parts or instruments) and its own polls; a member can be in several groups, and only sees their own groups' polls and meetings.
- The page switches between Turkish and English (TR / EN in the header), and between day and night (the moon and sun button). Every page opens in Turkish, whatever language the phone is set to; someone who presses EN keeps English on that device until they press TR. Day or night starts out matching the device's own setting.

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
| Your data | A private Google Sheet called **Provala data** in your Google Drive | Members, polls, every answer, notes, comments, the schedule, replies to rehearsals, attendance. |

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

1. Open `index.html` in a text editor. Near the top you'll find a short block marked **SETUP** with this line:

   ```js
   var API_URL = '';
   ```

   Paste your Web app URL between the quotes and save:

   ```js
   var API_URL = 'https://script.google.com/macros/s/AKfy.../exec';
   ```

2. On GitHub, create a new **public** repository, for example `provala`.
3. Click **uploading an existing file**, drag in all of these at once: `index.html`, `banner.webp`, the eight `tex-…webp` files, `vollkorn.woff2`, `vollkorn-italic.woff2`, `OFL.txt`, `icon.png` and `preview.jpg` (and this `README.md` if you like). Then click **Commit changes**. They must all sit in the same folder as `index.html`. `preview.jpg` is the picture WhatsApp and other apps show when you share the link. Its address is written into `index.html` as `https://ackc92.github.io/provala/preview.jpg`; if your repository or username is different, change the `og:url` and `og:image` lines near the top of `index.html` to match.
4. Go to the repository's **Settings → Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, Branch to **main** and the folder to **/ (root)**, then click **Save**.
5. After a minute or two the page is live at `https://<your-username>.github.io/provala/`.

You don't need to upload `Code.gs` to GitHub. It contains no secrets (the key and the password secrets are stored inside Apps Script), so it's fine either way.

## Step 3: Add your members

1. Open `https://<your-username>.github.io/provala/#admin` (or, on the sign-in page, tap the gold diamond at the bottom-right corner of the sign-in sheet: it's the organizer's way in, and members won't notice it; the same diamond on the planner's sign-in takes you back), paste your organizer key, and click **Open planner**. That browser stays signed in to the planner for 30 days, or until you click **Sign out**. The key itself isn't saved in the browser.
2. Click **New poll**, check the details, and click **Create poll** (Step 4 has more about polls).
3. Open the **Members** tab. Type or paste your group's names, one per line, and click **Add**.
4. Each person gets a username (from their first name, like `ayse`) and an easy password (like `kiraz-tempo-mavi-47`). Next to each name, click **Message (TR)** or **Message (EN)**. That copies a ready-to-send message with the link, their username and their password. Paste it into a private chat with that person, not the group chat.
5. The passwords are shown only now. The sheet keeps them in a scrambled form that can't be turned back into the password. If someone loses theirs, click **New password** next to their name and send them the new message.

6. Next to each name, pick their **voice part** (Soprano, Alto, Tenor, Bas). It's saved at once. Members then see, for each rehearsal you publish, how many of each part can come (numbers only, no names; see "What members see of each other" below). You can leave someone without a part. With more than one group (see "Groups" below), each member has a picker for each group.

Members can change their password after signing in (**Change password** under the title). Usernames don't care about capital letters or Turkish characters: `Ayşe`, `AYSE` and `ayse` all work.

## Step 4: Run your first month

1. In **New poll** (or **Settings** for the current one), check the titles (Turkish and English), the days people can pick, when the day starts and ends (11:00 to midnight unless you change it), the time step (30 minutes works well), your usual meeting length and an optional answer deadline. Your first poll becomes the **current** one automatically.
2. As answers arrive, the **Plan** tab fills in:
   - **The timetable.** Darker green means more people are free. A dot means everyone on the board is free (*tam kadro*). An amber line means everyone could come, but some only if needed. Tap a square to see who is free, who is "if needed" and why, who isn't, and their notes for that day.
   - **The board.** Everyone starts on it. Drag names off to the "Not on the board" tray, or drag them back, to see the overlaps for any group. Tapping a name also moves it. The buttons above the names (**Herkes**, **Soprano**, **Alto**, **Tenor**, **Bas**…) put just those sections on the board in one tap; press several for, say, tenors and basses. Meetings you add while they're pressed become sectionals for those sections (see below).
   - **Best times.** One line per day, best first, for the meeting length you choose, with who is missing and why, and how much of each section can come (`Soprano 4/5 · Alto 2/4 (+1) · Tenor 1/3`, the weakest in red). They're ranked by the weakest section (**Sıralama: en zayıf bölüm**); switch to **kişi sayısı** to rank by the number of people instead.
   - **Needed at every meeting.** Add the people every rehearsal needs (the accompanist, a soloist) under *Her buluşmada olması gerekenler*: times they can all come go first, and a time without one of them says so. Only you see this list. A new poll starts with the previous poll's list.
   - **Meetings in a month.** Choose how many (2 to 8) and how far apart at least: you get the set of dates whose least good meeting is best, then the best in all, for each month. **Add them all** puts them in the schedule.
   - **Holidays.** A holiday's row is marked ✦, and a line under the timetable lists the poll's holidays with a button to their settings. A closed day shows as a hatched row, and best times leave it out.
3. The **People** tab shows how many members have answered and who hasn't yet, then each person's month at a glance with their comment and day notes. You can delete an answer there, or show only that person on the board. While the poll takes answers, **Copy reminder (TR / EN)** gives you a message for the group chat, and **Messages one by one** a short personal one for each person who hasn't answered.
4. Click **Add** next to a time (or **Add both**), then open the **Schedule** tab. Adjust times, add a place and notes, and click **Publish to members**. Signed-in members see the dates under **Schedule** with buttons to add them to Google Calendar or any calendar app, and how many of each voice part can come. Under each meeting in the editor you see the same counts (like `Tenor 1/3`) before you publish, so you can spot a part nobody covers.
5. Publishing doesn't send anything. Click **Copy as message (TR)** or **(EN)** and paste the dates into your group chat.

## Rehearsals: replies, attendance, the season

Once a schedule is published:

- **Members reply to each rehearsal.** Under every meeting (and in a box at the top of their page for the next one) they press **Geliyorum**, **Kısmen** or **Gelemiyorum**.
  - **Geliyorum** is sent at once; they can add a note for you afterwards (like "10 dakika gecikebilirim").
  - **Kısmen** opens a short form: when they'll arrive (*Geliş*) or leave (*Ayrılış*), in quarter hours within the meeting, and the reason. Both are needed.
  - **Gelemiyorum** opens the same form with just the reason, which is needed.
  - Either form has a tick box for when they've already told you in person: *Şef, kısmen katılma nedenimi biliyor.* or *Şef, katılamama nedenimi biliyor.* With it ticked, the reason (and, for *Kısmen*, the time) can be left out.
  - They can change (**Düzenle**) or take back a reply until the end of that day. If you change a meeting's day or time, earlier replies to it stop counting and members are asked again.
- **Who can come.** Members see numbers only: for each voice part (or instrument), how many can come for the whole meeting and how many members the part has (like `Tenor 2/3`), plus how many come partly (`+1 kısmen`). Names are for you alone. A reply counts before the poll answer: *Geliyorum* counts the person in, *Kısmen* counts them as partly, *Gelemiyorum* leaves them out. People who haven't replied are counted if their poll answer says they're free for the whole meeting. For a meeting outside the poll's days or hours there are no answers to go by, so its numbers appear only once someone has said *Geliyorum* or *Kısmen*.
- **The Attendance tab** (*Katılım*) shows, for each published meeting, how many said what. Open **Who said what** for the names, reasons and times (a tick you know about shows as *Nedenini biliyorsunuz*), and for those who haven't replied yet, with a reminder for the group chat or one message per person. In the attendance dialog, each name shows what they replied, with their time for a *Kısmen*.
- **Taking attendance.** From the day of a meeting, press **Take attendance**. Mark each member *Came*, *Late*, *Excused* or *Absent* (press again to clear), add guests, and save. **Fill in from replies** marks those who said *Geliyorum* as came and *Gelemiyorum* as excused; **Mark the rest as came** fills in everyone still unmarked. Members left unmarked simply aren't recorded for that meeting. You can edit it later.
- **The season record**, under the meetings: everyone's attendance since 1 September across all polls, with a percentage (came and late, out of came, late and absent; excused doesn't count) and a flag for anyone who missed the last two meetings with attendance. **Download CSV** has every meeting as a column. Attendance stays as you took it: moving or removing a meeting afterwards, or deleting its poll, doesn't change the record. To correct one, take that meeting's attendance again; to remove one, save it with nobody marked, or, for a meeting no longer on the schedule, press **Delete this attendance** on the Attendance tab. When you delete a poll, you can tick a box to delete its attendance too (handy for a test poll).
- **Members see their own attendance** this season on their Schedule page, never anyone else's.
- **Their calendar.** On the Schedule page, **Subscribe** gives each member a private calendar link (for iPhone, iPad and Mac, Google Calendar, or any calendar app that takes a link; on Android, Google Calendar only takes it from calendar.google.com on a computer, and the page explains how). New and changed meetings then appear by themselves; calendar apps check every few hours, Google sometimes only once a day. The link shows the meeting times and that member's own replies, nothing about anyone else. **Make a new link** stops the old one working.
- **Last month stays in reach.** When next month's poll becomes current, the meetings still to come from earlier polls stay on members' Schedule page, so they can still see and answer them. This holds for every poll with a published schedule, so if you try things out in a test poll, unpublish its schedule (or delete the poll) afterwards.
- **What's new.** When you open the planner, a line under the poll says what's new since your last visit on that device (new or changed answers, replies to meetings), and new ones are marked *new*.

## Groups: a choir, a chamber choir, an orchestra…

You don't need groups: until you add one, everything works as one choir. When you do:

- **Members tab → Groups → New group.** Give it a name, then its **sections**: type them, or start from a ready list (*Karma koro (SATB)*, *Kadınlar korosu (SSAA)*, *Erkekler korosu (TTBB)*, *Sekiz partili*, *Yaylılar*, *Orkestra*, or none). Below, choose who is in it and each person's section. Everything is saved together with **Create group**.
- **Your existing choir is the first group** (*Koro*), with everyone who was a member before and every earlier poll. You can rename it and change its sections, but not delete it. Left unnamed, it shows as *Koro* in Turkish and *Choir* in English; sections from the ready lists also show in each reader's language.
- **A member can be in several groups**, with a different section in each. With more than one group, the member list has a picker per group (*Grupta değil* takes them out of it) and a **Show** filter by group. New members join the group you choose under **Add members**.
- **Each poll is for one or more groups**: pick them in the poll's settings (*Hangi gruplar için?*). Only those groups' members see the poll and its meetings, can answer it, reply to its meetings, and get them in their calendar link. A poll for two groups (a joint rehearsal, say) shows each group's numbers by its own sections.
- **Each group has its own current poll.** A group's first poll becomes its current one by itself; **Make current** shows a poll to all of its groups. A member of two groups gets a switch at the top of their page between their groups' polls, and their Schedule page has both groups' meetings, each marked with its group.
- **Attendance and the season** go by the poll's members. The season record has a **Group** filter: that group's meetings and members.
- **Removing a section** leaves its members in the group without a section (the planner asks first). **Deleting a group** is possible once no poll is for it; its members keep their accounts and other groups.
- **The conductor.** Tick **Şef** under a member's name in the Members tab (once, not per group). The conductor has no section in any group and their pickers only say whether they're in each group, so you don't make a "Şef" section in every group. They aren't in any section's numbers, nobody waits for their reply or reminds them, and every meeting of their groups, sectionals too, is in their calendar. Untick it and the sections they had before come back. If you already made a "Şef" section in your groups, tick **Şef** for yourself and then remove those sections.
- The **Groups** sheet in your data spreadsheet lists every group with its sections and who is in which. It appears with your first group.

## Holidays, closed days and sectionals

- **Holidays.** The page knows Türkiye's public holidays: New Year's Day, 23 April, 1 May, 19 May, 15 July, 30 August, 29 October (and the afternoon of the 28th), and Ramazan and Kurban Bayramı with their eves (half days). Members see them as red numbers in the calendar, with the holidays' names in a list below it and on the day itself; you see them marked in the timetable and in best times. The bayram dates are Diyanet's, listed in `index.html` through 2028; later years are worked out from the Hijri calendar, which gave Diyanet's dates for every year from 2023 to 2028. If Diyanet's date for a later year ever differs, add that year to `BAYRAMS` in `index.html`.
- **Closing days.** In a poll's **Settings**, under *Tatiller ve kapalı günler*, every holiday in the poll is listed as *açık* (open). Tick the ones you won't rehearse on; they become *kapalı, prova yok*. Below, close any other day with a reason members will see (*Salon dolu*). Members can't pick a closed day: it's hatched in their calendar, with the reason in the list below it, and **Select all days** leaves it out. Times someone marked on a day before you closed it are kept but don't count, so opening the day again brings them back.
- **Sectionals.** In the **Schedule** tab, each meeting has *Kimler çağrılı* (who's called): everyone, or some sections, by ticking them (a poll for several groups lists each group's sections; a group without sections is ticked as a whole). Ticking every section is everyone again. For a sectional:
  - only the members of those sections are asked to reply, counted in its numbers, reminded in the Attendance tab, and get it in their calendar link;
  - the others see it on their Schedule page marked *Bölüm provası: Tenor ve Bas*, as not theirs, without reply buttons;
  - taking attendance lists its sections first; anyone else who came anyway can be marked from the folded list below;
  - the season's "missed the last two" counts only the meetings each person was called to;
  - the message for the group chat says *yalnız Tenor ve Bas*;
  - when you remove a section, a sectional keeps the sections it still has; once those are all of the group's sections, it's for the whole group, as if you had ticked them all.
- **Like last month.** When a member opens a poll they haven't answered yet, and they answered an earlier poll of the same group, a box offers **Geçen ayki gibi doldur**. Each day gets the times they marked on most of that weekday's days in their latest earlier answer (free on three of four Tuesdays at 19:00 means free on every Tuesday at 19:00), on the new poll's open days only. Nothing is sent until they press send, and **Undo** clears it. Day notes and the comment aren't copied, so *if needed* times still ask for a reason.

## Every month after that

1. In the planner, click **New poll**. It copies the settings of the last poll for the same groups (with the people every meeting needs), picks the following month, and lists that month's holidays to close if you need to.
2. Click **Make current**. The poll's groups see the new month the next time they open the link. Old polls stay in the list, and members stay the same. Meetings still to come from the earlier poll stay on members' Schedule page.

## Where your data is

Open the **Provala data** spreadsheet (link in the Apps Script log, or search your Drive). It has these sheets:

- **Members**: one row per member, with their name, username and when they last signed in. Passwords are only stored scrambled.
- **Polls**: one row per poll (its closed days and the people every meeting needs are in its Data column).
- **Responses**: one row per member per poll, with readable columns for name, comment, availability (times in brackets are "only if needed") and day notes.
- **Schedules**: what you published (a sectional ends with *[yalnız Tenor, Bas]*).
- **Replies**: one row per member per poll, with their replies to the meetings, their times (*geliş* / *ayrılış*), reasons, and *[şef biliyor]* where they ticked that you know.
- **Attendance**: one row per meeting where you took attendance: who came (late ones marked), guests, and who was absent.
- **Errors**: problems the page ran into on members' devices (see below).
- **Groups**: each group with its sections and who is in which (once you add or edit a group).

These last four appear by themselves the first time something goes into them.
The last column of each sheet, **Data**, is what the app reads. Make changes through the app rather than in that column. **Export CSV** in the planner gives you one row per person per day.

## Changing things later

- **Changed `index.html`?** Upload it to the GitHub repository again (with your `API_URL` filled in). Pages updates within a minute or two.
- **Set up earlier under the old name Tutti?** Nothing breaks. The page finds your sheet by its ID, so you can rename the sheet and the Apps Script project to Provala whenever you like. If you also rename the GitHub repository, the link changes to `https://<your-username>.github.io/provala/`. Send members the new link; they stay signed in, because it's still the same github.io address.
- **Want a different banner?** Replace `banner.webp` in the repository with the new picture (same name, about 3 times as wide as it is tall). The link-preview picture is the separate `preview.jpg` (1200 × 630); replace that file too. WhatsApp keeps old previews for a while, so the new picture can take a day or so to show in chats where the link was already shared.
- **Changed `Code.gs`?** Paste the new code, save it, then **Deploy → Manage deployments**, click the pencil icon, set Version to **New version**, and click **Deploy**. The URL stays the same. Without this step, the live web app keeps running the old code. The page works with an older `Code.gs` too, just without what that version can't do (closed days, needed people, sectionals and *like last month*; with an older one also groups, replies, the Attendance tab, calendar links and error reports, and with a much older one voice parts and the numbers), and it shows only what works.
- **Someone forgot their password?** Members tab → **New password** next to their name. Their old password and sign-ins stop working.
- **Someone left the group?** Members tab → **Remove**. They can't sign in any more; answers they already gave stay.
- **Want everyone to sign in again** (for example, after a phone was lost)? Run `signOutEveryone` in the Apps Script editor (pick it in the same dropdown as `setup`, then **▶ Run**). Passwords keep working. A phone that is offline can still show its last copy of that member's own page, but it can't load anything new or send anything until someone signs in again.
- **Lost the organizer key?** Run `showOrganizerKey` in the Apps Script editor and look in the Execution log.
- **Want a new organizer key** (for example after sharing your screen)? Run `newOrganizerKey`. The old one stops working, and so does every planner sign-in made with it.
- **Want a co-organizer?** Give them the organizer key; they can then do everything you can in the planner. To take it back, run `newOrganizerKey`.
- **Want to choose your own organizer key?** In Apps Script, open **Project Settings** (the gear on the left) → **Script properties** → edit `ADMIN_KEY`. Use something long, like four or five unrelated words.

### Updating to version 2026-10-r3.1 (the conductor tick)

1. Open the **Provala data** sheet and choose **File → Make a copy**, as before.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**.
3. Upload the new `index.html` to GitHub.

Nothing changes until you tick someone as the conductor. The order of steps 2 and 3 doesn't matter: the new page with the previous `Code.gs` just doesn't offer the tick, and the previous page works with the new `Code.gs` (it shows the conductor as a member without a section). Going back to the previous `Code.gs` gives the conductor their earlier sections again.

### Updating to version 2026-10-r3 (holidays and closed days, needed people, sectionals, like last month)

1. Open the **Provala data** sheet and choose **File → Make a copy**, as before.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**. You don't need to run `setup`.
3. Upload the new `index.html` to GitHub (your `API_URL` is already in it).

Everything stays as it is: members, passwords, sign-ins, groups, polls, answers, replies, attendance and calendar links. No day is closed and nobody is marked as needed until you do it. The order of steps 2 and 3 doesn't matter:
- **The new page with the previous `Code.gs`** works without closed days, needed people, sectionals and *like last month* (they aren't offered); ranking by the weakest section, the section buttons on the board and several meetings a month work anyway.
- **The previous page with the new `Code.gs`** keeps working. It doesn't know closed days, so a member who still has it open could mark times on one: they're kept, but don't count. It shows a sectional's reply buttons to everyone; a reply from someone the sectional doesn't call is refused with "Bir sorun oluştu", until they load the new page.

Going back to the previous `Code.gs` works on the same sheet. It doesn't know closed days, needed people or sectionals, and while it's live the new page leaves them out too: closed days are open (times marked on them count), nobody is marked as needed, and every meeting is for everyone. They stay in the sheet and come back when you deploy this version again, with one exception: a schedule you save or publish while the previous version is live loses its sectionals for good.

### Updating to version 2026-10-r2 (reasons for Kısmen and Gelemiyorum, numbers only, groups)

1. Open the **Provala data** sheet and choose **File → Make a copy**, as before.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**. You don't need to run `setup`.
3. Upload the new `index.html` to GitHub (your `API_URL` is already in it).

Everything stays as it is: members, passwords, sign-ins, polls, answers, replies, attendance and calendar links. Your choir becomes the first group, with everyone in it and every poll for it, so nothing changes for anyone until you add a group. Members stay signed in. The order of steps 2 and 3 doesn't matter: the new page works with the previous `Code.gs` (without groups; a *Kısmen*'s time and the tick then go into its note), and the previous page with the new one.

From the moment the new `Code.gs` is live, no member's page gets other members' names any more, only the numbers. A phone that still has the earlier page open keeps working: it shows a tick for each person instead of their name, and its replies are taken without a reason until it loads the new page (a reload, or opening the link again). Going back to the previous `Code.gs` works on the same sheet, also after you've added groups: it then sees one choir again (members only in another group appear in it without a part) and ignores the rest. Keep in mind that it also works as it did before: members see names on each rehearsal's list again, and every poll, whichever group it's for. Coming forward again, voice parts you changed in the meantime are kept.

### Updating to the October 2026 version (replies, attendance, calendar links)

1. Open the **Provala data** sheet and choose **File → Make a copy**. Nothing should go wrong, but this way you have every answer and member exactly as they are now.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version** (see "Changed `Code.gs`?" above). You don't need to run `setup`.
3. Upload the new `index.html` to GitHub (your `API_URL` is already in it).

Every member, password, sign-in, poll, answer and schedule stays as it is: the new version reads them unchanged and keeps its new things in new sheets. Members stay signed in. If you ever want to go back, paste the previous `Code.gs` and deploy it the same way; it keeps working on the same sheet and simply ignores the new ones (calendars subscribed to a member's link then stop updating, and keep the meetings as they last were). The order of steps 2 and 3 doesn't matter: the old page works with the new `Code.gs`, and the new page with the old one (without the new parts) in the meantime.

### Updating from the version without sign-in

Paste the new `Code.gs` and deploy a **New version** (see above), then upload the new `index.html` with your `API_URL`. You don't need to run `setup` again: the Members sheet appears by itself. Answers sent before the update stay in your sheet and in the planner, but aren't linked to a member, so the "who hasn't answered" list starts fresh.

## Security and privacy

**What is public.** The page's code on GitHub, including the address of your Apps Script. That's by design: the address only leads to a sign-in, and the script gives nothing out without a member's sign-in or the organizer key. Neither file contains a password or key.

**What members see of each other.** Only you see anyone's notes and comment, and anyone's full answer. Members see:
- **How many people are free, without names.** The calendar itself stays plain. When a member opens a day, a line says how many people can come at that day's best time for a meeting of your usual length, and each time shows how many are free then (and, with +, how many only if needed).
  - The numbers appear only once answers with times from at least 5 people *besides the person looking* are counted, so a number can't simply be one person's answer.
  - They update once a day, at midnight in the poll's time zone: an answer sent or changed today counts from tomorrow (until then, the earlier version counts). So nobody can work out someone's times by watching the numbers change right after they press send. If only one person answers on a given day, someone comparing the numbers from one day to the next could still work out that person's times; that's the price of exact numbers.
  - Answers from removed members don't count. Removing a member or deleting an answer changes the numbers right away, not the next day.
  - Once a poll has answers, its time zone is fixed, like its hours (it decides when "today" ends).
- **How many can come to a published rehearsal.** Under each published meeting: per voice part (or instrument), how many can come for the whole meeting, how many come partly, and how many members the part has (like `Tenor 1/3 +1 kısmen`). No names: those only you see. Nobody is counted as missing, and "only if needed" isn't shown. In a part with one or two people, `0/1` does show that person can't come for all of it (and `+1 kısmen` that they come for part of it); that's what makes the numbers useful. They follow the answers and replies as they are now.
- **Replies to rehearsals.** What someone replied, their reason and their times, only you see. Others only see the numbers change. The page tells members this next to the reply buttons.
- **Groups.** A member only ever gets the polls and meetings of their own groups (asking for another group's poll by its link gets them their own instead), and the names and sections of the groups those polls are for.
- **Closed days, sectionals, needed people.** Members see which days you closed and the reason you wrote, and which sections a sectional is for. Whom you marked as needed at every meeting only you see; it never reaches a member's phone.
- **Like last month** uses only the member's own earlier answer, on their own page.
- The page tells members this right under their answers and on the Schedule page. Before your first poll with this version, tell the group in your chat too: people may have answered expecting nobody to see anything.

**What protects your members' answers.**
- Only members you add can sign in, and each member only ever loads their own answers, plus the numbers above, which `Code.gs` works out on the server. Other people's answers never reach a member's phone. So that the page opens at once on a return visit, it keeps a copy of the member's page (the poll, their own answers and replies, the numbers above) on their device, next to the sign-in; signing out removes both. Names, notes and schedules are shown as plain text, so nothing a member types can run as code in anyone's browser.
- Passwords are stored only as salted, keyed hashes. The secrets for those hashes and for sign-ins live in the script's properties, not in the sheet, so even a copy of the sheet doesn't reveal passwords.
- After 8 wrong passwords in a row, that username is paused for 15 minutes. After 10 wrong organizer keys, the planner is paused for 15 minutes.
- Sign-ins are signed and expire: 180 days for members, 30 days for the planner. A password change, a new password from you, or `signOutEveryone` ends them early.
- A member's calendar link is a long random code that only works for the published meeting times and that member's own replies. Removing the member, or **Make a new link** on their Schedule page, stops it. A new password or `signOutEveryone` doesn't, so a forgotten password doesn't quietly break the member's calendar; if a phone is lost, the member can make a new link from another device.
- **Error reports.** When the page runs into a problem on someone's phone, it tells the script: the error message, where in the page it happened, and the browser name. Never names, answers or anything typed. At most three per visit and thirty an hour reach the **Errors** sheet, which keeps the latest 500; the planner tells you when new ones arrive. If you want a problem fixed, those rows are what to pass on. Anyone with the page's address could send such a report (apart from trying to sign in, it's the only thing possible without a sign-in), which is why they're capped and kept apart from your members' data: at worst, made-up reports could fill that hour's thirty and crowd out real ones.

**What you should do.**
- Turn on 2-Step Verification for the Google account that owns the script and the sheet. Everything is only as safe as that account.
- Don't share the **Provala data** sheet or the Apps Script project with anyone.
- Send each member their sign-in message privately, never in the group chat.
- Keep the organizer key private. Sign out of the planner on computers that aren't yours.
- All your GitHub Pages sites share one address (`<your-username>.github.io`), and pages on the same address can read each other's saved sign-ins. Don't add third-party scripts (trackers, widgets) to your other pages there. For complete separation, put Provala in a free GitHub organization instead, so it gets its own address.

**Limits.** A poll can cover up to 3 months and take up to 400 answers. You can add up to 400 members. Times are in the poll's time zone (set automatically from your browser, editable in the poll settings until the first answer).

## Troubleshooting

- **"Couldn't reach the planner"**: check that `API_URL` in `index.html` is the Web app URL ending in `/exec`, and that the deployment's "Who has access" is **Anyone**.
- **"The planner isn't set up yet"**: run `setup` once in the Apps Script editor.
- **A member can't sign in**: check the username in the Members tab. If they've tried too many times, they can wait 15 minutes, or you can give them a new password.
- **Your changes to `Code.gs` don't show up**: deploy a **New version** (see above).
- **The organizer key isn't accepted**: run `showOrganizerKey` and copy it again, without extra spaces.
- **The page says "The page couldn't open" / "Sayfa açılamadı"**: press **Reload** first. If it comes back, press **Clear the copy and reload**: it removes only the copy of the page kept on that phone or computer; the person stays signed in and unsent answers are kept. The line under the buttons says what went wrong, which is useful in a screenshot.
- **The textures are missing (flat colours)**: the `tex-…webp` files aren't next to `index.html` on GitHub. Upload them; the page works without them, it just looks plainer.
- **A calendar app won't take the subscription link**: try the other button (or **Copy the link** and add it in the app as a calendar "from URL"). If it still won't, the **Calendar file** buttons under each meeting always work, they just don't update by themselves. A meeting you change shows up in subscribed calendars within a few hours (Google can take up to a day).
- **No Attendance tab, no reply buttons, no Groups**: the live web app is still running an older `Code.gs`. Deploy a **New version**.
- **No holidays list in the poll settings, no *Kimler çağrılı*, no *Her buluşmada olması gerekenler***: the same, an older `Code.gs` is live.
- **A member can't pick a day**: it may be closed (hatched, with its reason below the calendar). Open it again in the poll's **Settings**.
- **A member sees "no poll"**: they may be in no group, or the current poll may be for another group. Check their pickers in the Members tab (the **Show** filter has *In no group*) and the poll's groups in its settings.

## Try it first

The demo is a separate copy of the page with eight sample people, in which the real `Code.gs` runs inside the page, on a stand-in for the sheet kept in your browser (Claude builds it from these files; `index.html` itself always talks to your Apps Script, and with `API_URL` empty it says the address is missing). It comes with November's rehearsals published (with some replies, reasons and times), October's with attendance taken, and a second group, a chamber orchestra by instrument, with its own poll. Sign in with the username `deneme` and the password `demo`: that sample member sings in the choir and plays the viola, so their page has both groups' polls to switch between. They answered October, so November offers **Geçen ayki gibi doldur**; 24 November is closed (the hall is taken), and the men's sectional on 26 November isn't theirs. Open the demo with `#admin` at the end and use the key `demo` to see the planner: the tenor Can Aydın is needed at every meeting, and the section buttons are above the board. Pick *Ekim 2026* in the poll list to see Republic Day closed and to try taking attendance, and see the groups in the Members tab.
