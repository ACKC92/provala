# Provala

A free availability planner for a group that meets regularly. Members mark the days and times they can come for a whole month and add notes. You see everyone's answers, find the overlaps, and publish the dates.

- **Only your members can use it.** You add them in the planner and each person gets their own username and password. Without signing in, the link shows a sign-in screen and nothing else: no titles, no dates, no names, and no way to answer.
- **Members** sign in once on their phone or computer and stay signed in there. They tap a day (or a weekday name like *Tue* for every Tuesday) and mark its half hours as *Available* or *If needed*, add notes for specific days and a general comment, and send. *If needed* asks for a short reason, either in that day's note or in the general comment. They can come back any time, from any device, to change their answers. They never see anyone else's answers.
- **Members know each other.** Each member has an **Üyeler** tab with the members of their group by section, and a profile of their own: optional phone, district or address, birthday and a line about themselves, shared with the group only when they tick that they want it. Under a rehearsal that has passed, the group sees who came. Whether members of different groups see each other is your setting. A short privacy notice (*aydınlatma metni*, KVKK) is shown to each member once, in your wording.
- **You (the organizer)** sign in to the planner with a private key. You get a timetable that shows how many people are free at each half hour, a board you drag people onto (or fill with one tap per voice part) to see the overlaps of any group, a ranked list of the best times (marked *tam kadro* when everyone can come), suggestions for any number of meetings a month, a list of who hasn't answered yet, and a schedule you publish to members. Best times are ranked by the weakest voice part, so 10 people with every part there come before 12 with no tenors, and the people every rehearsal needs (the accompanist, a soloist) come first. You can copy the schedule as a ready-made message for WhatsApp in Turkish or English, and members can add the dates to their calendars.
- **Holidays and closed days.** Public holidays show as red-letter days in every calendar. They stay open, because sometimes a holiday is the only day left; you close the ones you won't rehearse on, poll by poll, along with any other day (a hall that's taken). Nobody can mark times on a closed day.
- **Sectionals.** A meeting can be for some voice parts only. Only they are asked to reply and get it in their calendar; the others see it marked as not theirs.
- **Like last month.** A member who hasn't answered a new poll yet can fill it in with one press from their previous answer, weekday by weekday, then fix what's changed.
- **Changes reach members.** When you publish a moved, cancelled or new meeting, members see what changed at the top of their page until they've read it, and you get it as a ready message for the group chat. From the best times, **Yayımla** puts a time straight onto the published schedule.
- **Days away.** A member who'll be away (a holiday, a trip) enters the dates once, with a note only you see. Every poll then leaves those days out for them, and every meeting on them shows them as not coming unless they reply otherwise. You can enter them too, for someone who told you.
- **One-tap sign-in links.** Instead of a username and password, you can send someone a private link that signs them in with one tap. Each link works once, within 7 days. The reminders you send one person at a time carry their own link, so nobody gets stuck at the sign-in screen.
- **Your own wording.** Every ready-made message (sign-in details, reminders, the schedule) can be rewritten in the planner's **Mesajlar** tab, in Turkish and English, and is then used everywhere.
- **Stage plans.** For a concert, up to four lineups on the risers, each tied to its songs. Place people by tapping or dragging, or arrange them by section in one press, then download the picture (names and all) to share in the group's chat. Close the places where a piano or a pillar stands, see at once who on stage can't come on the concert's date, and turn the stage round to show it as the singers see it. Members see their own place in the app; of everyone else, only the section.
- **Repertoire.** Each piece with links to its sheet music and practice tracks, for everyone or for one section. Members find their own groups' pieces in a **Repertuvar** tab, their own part's links first. Only the links are kept, never the files.
- **Rehearsal plans.** For each meeting, what you'll work on, in order: a warm-up, the pieces (with their bars), a break, each for so many minutes and for everyone or some sections. Each section's own time follows from it, and members see theirs under the meeting (*Sizin saatiniz: 19:45–21:30*) and in their calendar, with the plan. Copy it as a message for the group chat.
- **On the home screen.** Members can add Provala to their phone's home screen, and you can add the planner as an app of its own. It opens full-screen and at once, and without a connection it still opens, with their page as it was last time. When you upload a new `index.html`, phones take it up by themselves.
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
| `icon.png` | GitHub, next to `index.html` | The icon in the browser tab and on an iPhone's home screen. |
| `sw.js` | GitHub, next to `index.html` | Keeps Provala's own files (the page, its pictures and fonts) on a phone, so it opens at once and without a connection. Never any names or answers. |
| `manifest.webmanifest`, `planner.webmanifest` | GitHub, next to `index.html` | The name and icons on a home screen: the members' app and the planner's. |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `planner-180.png`, `planner-192.png`, `planner-512.png`, `planner-maskable-512.png` | GitHub, next to `index.html` | The home-screen icons: a gold P for members, a dark P on gold for the planner. |
| `preview.jpg` | GitHub, next to `index.html` | The picture WhatsApp shows when you share the link. |
| `Code.gs` | Google Apps Script, in your Google account | The small backend the page talks to. It checks every sign-in. |
| Your data | A private Google Sheet called **Provala data** in your Google Drive | Members, polls, every answer, notes, comments, the schedule, replies to rehearsals, attendance. |

The banner, font, icons, manifests, `sw.js` and preview picture rarely change, so after the first upload you normally only replace `index.html`.

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
3. Click **uploading an existing file**, drag in all of these at once: `index.html`, `sw.js`, `banner.webp`, the eight `tex-…webp` files, `vollkorn.woff2`, `vollkorn-italic.woff2`, `OFL.txt`, `icon.png`, `preview.jpg`, `manifest.webmanifest`, `planner.webmanifest` and the seven home-screen icons (`icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `planner-180.png`, `planner-192.png`, `planner-512.png`, `planner-maskable-512.png`), and this `README.md` if you like. Then click **Commit changes**. They must all sit in the same folder as `index.html`. `preview.jpg` is the picture WhatsApp and other apps show when you share the link. Its address is written into `index.html` as `https://ackc92.github.io/provala/preview.jpg`; if your repository or username is different, change the `og:url` and `og:image` lines near the top of `index.html` to match.
4. Go to the repository's **Settings → Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, Branch to **main** and the folder to **/ (root)**, then click **Save**.
5. After a minute or two the page is live at `https://<your-username>.github.io/provala/`.

You don't need to upload `Code.gs` to GitHub. It contains no secrets (the key and the password secrets are stored inside Apps Script), so it's fine either way.

## Step 3: Add your members

1. Open `https://<your-username>.github.io/provala/#admin` (or, on the sign-in page, tap the gold diamond at the bottom-right corner of the sign-in sheet: it's the organizer's way in, and members won't notice it; the same diamond on the planner's sign-in takes you back), paste your organizer key, and click **Open planner**. That browser stays signed in to the planner for 30 days, or until you click **Sign out**. The key itself isn't saved in the browser.
2. Click **New poll**, check the details, and click **Create poll** (Step 4 has more about polls).
3. Open the **Members** tab. Type or paste your group's names, one per line, and click **Add**.
4. Each person gets a username (from their first name, like `ayse`) and an easy password (like `kiraz-tempo-mavi-47`). Next to each name, click **Message (TR)** or **Message (EN)**. That copies a ready-to-send message with the link, their username and their password. Paste it into a private chat with that person, not the group chat.
5. The passwords are shown only now. The sheet keeps them in a scrambled form that can't be turned back into the password. If someone loses theirs, click **New password** next to their name and send them the new message.
   - **Or send a sign-in link instead.** **Giriş bağlantısı** next to a member's name copies a short message with a link that signs them in with one tap, no password needed. Each link works once, within 7 days, and only for that person, so send it in a private chat. Once in, they stay signed in on that phone as usual. (If someone else is already signed in on that phone, the page first asks whether to switch to them.) A member who lost their phone or got signed out just needs a new link: nothing about them changes.

6. Next to each name, pick their **voice part** (Soprano, Alto, Tenor, Bas). It's saved at once. Members then see, for each rehearsal you publish, how many of each part can come (numbers only, no names; see "What members see of each other" below). You can leave someone without a part. With more than one group (see "Groups" below), each member has a picker for each group.

Members can change their password after signing in (**Change password** under the title). Usernames don't care about capital letters or Turkish characters: `Ayşe`, `AYSE` and `ayse` all work.

## Step 4: Run your first month

1. In **New poll** (or **Settings** for the current one), check the titles (Turkish and English), the days people can pick, when the day starts and ends (11:00 to midnight unless you change it), the time step (30 minutes works well), your usual meeting length and an optional answer deadline. Members see the deadline with how long is left (*3 gün kaldı*, *Bugün son gün*). Tick **Son yanıt tarihinden sonra yanıtları kendiliğinden kapat** and the poll stops taking answers the day after it, by itself; without it, members can still answer late, and their answer is marked *Son günden sonra* for you. Your first poll becomes the **current** one automatically.
2. As answers arrive, the **Plan** tab fills in:
   - **The timetable.** Darker green means more people are free. A dot means everyone on the board is free (*tam kadro*). An amber line means everyone could come, but some only if needed. Tap a square to see who is free, who is "if needed" and why, who isn't, and their notes for that day.
   - **The board.** Everyone starts on it. Drag names off to the "Not on the board" tray, or drag them back, to see the overlaps for any group. Tapping a name also moves it. The buttons above the names (**Herkes**, **Soprano**, **Alto**, **Tenor**, **Bas**…) put just those sections on the board in one tap; press several for, say, tenors and basses. Meetings you add while they're pressed become sectionals for those sections (see below).
   - **Best times.** One line per day, best first, for the meeting length you choose, with who is missing and why, and how much of each section can come (`Soprano 4/5 · Alto 2/4 (+1) · Tenor 1/3`, the weakest in red). They're ranked by the weakest section (**Sıralama: en zayıf bölüm**); switch to **kişi sayısı** to rank by the number of people instead.
   - **Needed at every meeting.** Add the people every rehearsal needs (the accompanist, a soloist) under *Her buluşmada olması gerekenler*: times they can all come go first, and a time without one of them says so. Only you see this list. A new poll starts with the previous poll's list.
   - **Meetings in a month.** Choose how many (2 to 8) and how far apart at least: you get the set of dates whose least good meeting is best, then the best in all, for each month. **Add them all to draft** puts them in the schedule.
   - **Holidays.** A holiday's row is marked ✦, and a line under the timetable lists the poll's holidays with a button to their settings. A closed day shows as a hatched row, and best times leave it out.
3. The **People** tab shows how many members have answered and who hasn't yet (split into those who *opened the poll but haven't answered* and those who *haven't opened it yet*, so you can tell a message that never reached someone from one they looked at and left), then each person's month at a glance with their comment and day notes. You can delete an answer there, or show only that person on the board. While the poll takes answers, **Copy reminder (TR / EN)** gives you a message for the group chat, and **Messages one by one** a short personal one for each person who hasn't answered. Each personal message carries that person's own sign-in link, so one tap takes them straight to the poll, signed in. Copying a message for the same person again within ten minutes gives the same link. If the link can't be made just then (no connection, say), the message is copied with the usual link instead and the page tells you; the sign-in message in the Members tab isn't copied at all then. Either way the page never lets the message you copied before pass for the new one: if a message couldn't be copied, it says so plainly (then don't paste), or shows the new text for you to copy yourself. **✎ Metni düzenle** takes you to the wording (see "Your own wording" below).
4. Click **Add to draft** next to a time (or **Add both to draft**), then open the **Schedule** tab. Adjust times, add a place and notes, and click **Publish to members** (or **Save draft** to publish later; until you do either, reloading or closing the page, or signing out, asks first). In a hurry? **Yayımla** next to a best time publishes it at once, after asking in place with the meeting as it will go out (a plain title and the place of the nearest meeting for the same people, both to change, and whom it calls if the board shows some sections only; anything else you changed in the schedule and haven't published yet goes with it), and its message offers the text for the group chat. If publishing fails, the meeting stays on the schedule as you typed it, not published yet (the best time then says *Taslakta* instead of **Ekle**): **Yayımla** again publishes that one, never a second. A best time already on the published schedule (for at least the sections the board shows) says *Yayımlandı*; if another meeting is published at that time, the question says so. Signed-in members see the dates under **Schedule** with buttons to add them to Google Calendar or any calendar app, and how many of each voice part can come. Under each meeting in the editor you see the same counts (like `Tenor 1/3`) before you publish, so you can spot a part nobody covers.
5. Publishing doesn't send anything. Click **Copy as message (TR)** or **(EN)** and paste the dates into your group chat.
6. **Changing a published schedule.** Move a meeting (another day, or other times), change its place or whom it calls, take one off or add one, then publish again. Members then see *Takvimde değişiklik* at the top of their pages, listing what changed in their meetings still to come since they last pressed **Tamam** (on that device; changes of the last two weeks): a meeting new to them, moved, at a new place, cancelled, or now only for other sections. They're told how a meeting is now compared with how they last saw it, so one they saw announced and that you then call off is said to be cancelled (also if they saw it in the box without pressing **Tamam**), while one that came and went between their visits isn't mentioned. A meeting you take off and add again at the same day, times and sections counts as the same one: members are told nothing, or only its new place. A reply to a moved meeting asks them to reply again, as before. Right after publishing, the Schedule tab shows what that publishing changed, with **Değişiklikleri kopyala (TR / EN)** for the group chat. The first time you publish there's nothing to tell, since members hadn't seen any of it; after **Yayından kaldır**, publishing again is compared with what members saw before. Changes to a meeting's title or note alone aren't announced.

## Rehearsals: replies, attendance, the season

Once a schedule is published:

- **Members reply to each rehearsal.** Under every meeting (and in a box at the top of their page for the next one) they press **Geliyorum**, **Kısmen** or **Gelemiyorum**.
  - **Geliyorum** is sent at once; they can add a note for you afterwards (like "10 dakika gecikebilirim").
  - **Kısmen** opens a short form: when they'll arrive (*Geliş*) or leave (*Ayrılış*), in quarter hours within the meeting, and the reason. Both are needed.
  - **Gelemiyorum** opens the same form with just the reason, which is needed.
  - Either form has a tick box for when they've already told you in person: *Şefim neden kısmen katılabildiğimi biliyor.* or *Şefim neden katılamadığımı biliyor.* With it ticked, the reason (and, for *Kısmen*, the time) can be left out.
  - They can change (**Düzenle**) or take back a reply until the end of that day. If you change a meeting's day or time, earlier replies to it stop counting and members are asked again.
- **Who can come.** Members see numbers only: for each voice part (or instrument), how many can come for the whole meeting and how many members the part has (like `Tenor 2/3`), plus how many come partly (`+1 kısmen`). Names are for you alone. A reply counts before the poll answer: *Geliyorum* counts the person in, *Kısmen* counts them as partly, *Gelemiyorum* leaves them out. People who haven't replied are counted if their poll answer says they're free for the whole meeting. For a meeting outside the poll's days or hours there are no answers to go by, so its numbers appear only once someone has said *Geliyorum* or *Kısmen*.
- **The Attendance tab** (*Katılım*) shows, for each published meeting, how many said what. Open **Who said what** for the names, reasons and times (a tick you know about shows as *Nedenini biliyorsunuz*), and for those who haven't replied yet, with a reminder for the group chat or one message per person. In the attendance dialog, each name shows what they replied, with their time for a *Kısmen*.
- **Taking attendance.** From the day of a meeting, press **Take attendance**. Mark each member *Came*, *Late*, *Excused* or *Absent* (press again to clear), add guests, and save. **Fill in from replies** marks those who said *Geliyorum* as came and *Gelemiyorum* as excused; **Mark the rest as came** fills in everyone still unmarked. Members left unmarked simply aren't recorded for that meeting. You can edit it later.
- **The season record**, under the meetings: everyone's attendance since 1 September across all polls, with a percentage (came and late, out of came, late and absent; excused doesn't count) and a flag for anyone who missed the last two meetings with attendance. **Download CSV** has every meeting as a column. Attendance stays as you took it: moving or removing a meeting afterwards, or deleting its poll, doesn't change the record. To correct one, take that meeting's attendance again; to remove one, save it with nobody marked, or, for a meeting no longer on the schedule, press **Delete this attendance** on the Attendance tab. When you delete a poll, you can tick a box to delete its attendance too (handy for a test poll).
- **Members see their own attendance** this season on their Schedule page, never anyone else's.
- **Days away.** On their Schedule page, under **Uzakta olacağım günler**, members add the days they'll be away: a first and a last day (today or later), and a note only you see (**Uzakta olacağım günler…** under the poll's calendar takes them there). In polls those days are hatched (the other way from closed days) and can't be marked; times marked on them earlier are kept but don't count, so taking the days back brings them back. For a meeting on those days, a member who hasn't replied counts as *Gelemiyor*: you see them there tagged *Uzakta* with their note, they aren't among those to remind, and taking attendance starts them as *Excused*. If they reply anyway (*Geliyorum*, say), the reply counts. Their calendar link marks those meetings *(uzaktayım)*, without a reminder. In the Members tab, **Uzakta olacağı günler** next to a name shows and changes someone's days away (told by phone, say, or days already gone, for attendance); the member sees what you add. A change made from a list that was open for a while never removes days added meanwhile elsewhere, nor brings back days taken back there. You also see them on the board (*Uzakta* among those who can't), on the person's month and in the CSV. Other members only see the numbers, which leave the person out on those days (the poll's numbers from the next day, as always).
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
- **The conductor.** At the top of the Members tab, pick the conductor under **Şef** (one person, for all groups; *Seçilmedi* for nobody). The conductor has no section in any group and their pickers only say whether they're in each group, so you don't make a "Şef" section in every group. They're marked *Şef* in the list, aren't in any section's numbers, nobody waits for their reply or reminds them, and every meeting of their groups, sectionals too, is in their calendar. Picking someone else, or *Seçilmedi*, gives back the sections they had before. If you already made a "Şef" section in your groups, pick yourself as the conductor and then remove those sections.
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
- **Like last month.** When a member opens a poll they haven't answered yet, and they answered an earlier poll of the same group, a box offers **Geçen ayki gibi doldur**. Each day gets the times they marked on most of that weekday's days in their latest earlier answer (free on three of four Tuesdays at 19:00 means free on every Tuesday at 19:00; days they were away then don't count), on the new poll's open days only. Nothing is sent until they press send, and **Undo** clears it. Day notes and the comment aren't copied, so *if needed* times still ask for a reason.

## Your own wording: the Mesajlar tab

Every message the planner copies for you to paste into WhatsApp has a ready-made text. In the **Mesajlar** tab you can rewrite any of them, in Turkish and in English, and your text is then used everywhere it's copied:

- **Giriş bilgileri**: username and password, after adding someone or making a new password.
- **Tek dokunuşla giriş bağlantısı**: the sign-in link message (Members tab).
- **Takvim duyurusu**: the published dates (Schedule tab).
- **Anket hatırlatması**: for the group chat, and for one person (Yanıtlar tab).
- **Buluşma hatırlatması**: for the group chat, and for one person (Attendance tab).
- **Takvim değişikliği**: what changed when you publish again (in the Schedule tab, or from **Yayımla** in the Plan tab); `{değişiklikler}` is the list.

Open one, choose **Türkçe** or **English**, and edit. Words in braces are filled in as you copy: `{ad}` (the person's first name), `{anket}`, `{son gün}`, `{bağlantı}` and so on; the buttons under the text put them in for you, and the English names (`{name}`, `{link}`…) work too. In a message for one person, `{bağlantı}` is their own sign-in link. A part in square brackets drops out when something in it is empty: `[son gün {son gün}]` disappears for a poll without a deadline. The example under the text shows the result, and a word in braces the page doesn't know, or one this message has nothing for (`{şifre}` in a reminder), is pointed out (it would be copied as you typed it). A text can be up to 2000 characters. **Kaydet** keeps your text; **İlk haline döndür** goes back to the original wording, with **Geri al** in case (it brings back what you typed and hadn't saved, too). Leaving the page with a text not saved asks you first.

## Stage plans: who stands where

In the planner's **Sahne** tab (with several groups, pick the group first), press **Yeni sahne düzeni**.

- **The plan.** A title (*Bahar Konseri*), a date if you like, and up to four lineups. A new lineup starts as a copy of the last one, so the second and third take seconds. Give each lineup a name (*1. bölüm*, *Bis*) and its songs, one per line (up to 30, each up to 120 characters; the field warns you past that): that's how everyone knows which lineup goes with which songs. **Bu dizilişi kaldır** takes a lineup out, with **Geri al** in its message.
- **The risers.** Choose the number of rows (up to 8) and, for each row, its places (up to 40) with − and +. Rows count from the front; the drawing shows the stage as the audience sees it, with the back row at the top, the conductor in front and *Seyirci* below. **Biçim** switches between straight rows and an arc around the conductor (the places turn to face you).
- **Closed places.** Where a piano, a pillar or the stairs take a place, tap that empty place, then **Bu yeri kapat**, and say what's there (*Piyano*, *Kolon*… or nothing): the place is hatched with that word, nobody can be put there, and **Yeniden aç** opens it again. Arranging, **Sağ ile solu değiştir** and **Bütün yerleri boşalt** leave closed places where they are, and so do **Başka dizilişten kopyala** (when both lineups have the same rows and places; otherwise its message says this lineup's closed places went) and **Geri al**. With −, a row loses an empty place first; in a full row, the last place that isn't closed (whoever stood there goes back to the list, and **Geri al** in the message puts them back). Fewer rows say who went back to the list, with **Geri al** too. Members see closed places hatched, with what's there in the legend, and so does the picture.
- **As the singers see it.** **Şarkıcıların gözünden göster** turns the stage round: the audience and the conductor at the top, the back row at the bottom, and left and right as they are for someone on the risers facing the audience. The arrow keys follow the drawing, places are counted from its right (*sağdan 2. yer*), and the picture you download comes out the same way (it says *Şarkıcıların gözünden* under the title). Members have the same switch on their **Sahne** page. Each device remembers its choice.
- **Placing people.** Under the stage, everyone in the group who isn't placed yet waits by section, in the section's colour. Tap a name, then a place (or an empty place, then a name). Tap someone on stage, then another place, and they swap; **Sahneden çıkar** sends them back to the list. On a computer you can also drag people onto places, between places, and back to the list. With a keyboard, Tab takes you to the stage, the arrow keys move between places, and Enter picks or places. The conductor isn't in the list: they're drawn in front. Short names stay apart (*Ayşe De.*, *Ayşe Do.*), and pointing at a place shows the whole name.
- **Arranging in one press.** **Bölümlere göre diz** places everyone: *Bölümler yan yana* (each section a block, left to right as the audience sees it), *Bölümler önden arkaya* (the first sections at the front) or *Karışık* (one of each section in turn, for a mixed formation). The order is the order of the group's sections; **Sağ ile solu değiştir** mirrors a lineup, **Başka dizilişten kopyala** copies another lineup's places, and **Bütün yerleri boşalt** starts over. Each of these can be undone from its message (it undoes the lineup it changed, even if you've moved to another one).
- **Who can't come.** Give the plan a date and save it: whoever on stage can't come that day is marked with a red ring and a *!*, and listed above the stage with where they stand and why: away then (with their note), or *Gelemiyorum* to the group's published meetings that day that call them (which one, and their reason). Each of that day's meetings counts as for the meetings themselves: a reply says otherwise, so someone away who said *Geliyorum* isn't marked. Someone who can't come to only some of that day's meetings (*Gelemiyorum*, or away, for the dress rehearsal, and *Geliyorum*, *Kısmen* or no reply yet for the concert, say) gets an amber ring and a *½* instead, and is listed apart with the meeting they can't come to, since only you know which one the plan is for. **Sahneden çıkar** next to a name takes them off, and **O gün gelemeyecekleri gösterme** leaves them out of the list under the stage, and out of **Diz** (while it's ticked, it stays in sight). In the list of plans, *2 kişi gelemeyecek* says it before you open one. Change the date and save, and it's worked out for the new date. Only you see any of this: members don't, and the picture doesn't.
- **Saving and sharing with members.** Press **Kaydet**. Tick **Üyelere göster** and members of the group get a **Sahne** tab: each lineup with its songs, their own place marked *Siz* and described in words (row from the front, place from the left as the audience sees it, and from their right as they face the audience), and everyone else as a section only, never a name. A member who isn't in a lineup is told so; the conductor is told their place is at the front, in the middle. If the plan was saved meanwhile in another tab or on another device, **Kaydet** asks first instead of overwriting it: **Benimkini kaydet** or **Kaydedileni aç**. If it was deleted there, **Yeni düzen olarak kaydet** keeps your work.
- **The picture.** **Bu dizilişi indir** saves the lineup you're on as a PNG with the title, the date, the songs and everyone's name in their place, in their section's colour; **Bütün dizilişleri tek resimde indir** puts every lineup in one picture. Choose short names (*Ayşe D.*) or full ones. On a phone, **Paylaş…** sends it straight to WhatsApp or anywhere else. If a big picture took the phone too long to draw, it says *Resim hazır*: tap **Paylaş…** there once more. The picture shows the plan as it is on screen, saved or not; it's yours to share, so it has names where the app doesn't.
- **Later.** Someone you remove, take out of the group or make the conductor leaves the stage: members see their place empty, and when you open the plan it says how many were taken off (press **Kaydet** to keep it that way). A group with a stage plan can't be deleted until its plans are; the planner says which. Each section's colour comes from its place in the group's list (the first eight sections), and every place also shows the section's mark (S, A, T, B…; *Soprano I* and *Soprano II* become S1 and S2), so the colours are never all there is. An orchestra's seating can be added later as another kind of lineup, with the same rows of places.

## Repertoire: sheet music and practice tracks

In the planner's **Repertuvar** tab (with several groups, pick the group first), press **Yeni eser**.

- **The piece.** Its title, the composer or arranger if you like, and a note (*Konserin ilk bölümü*). **Üyelere göster** is ticked to start with; untick it for a piece you're not working on yet. (Do it here: the Repertoire sheet's columns are there to read, and changing them changes nothing.)
- **Its links.** For each one, paste the address (it must start with `https://`, or `http://`), give it a name if you like (*Nota*, *Soprano kaydı*), and pick whom it's for: **Herkes**, or one of the group's sections. Without a name, the site's name shows (*Google Drive*, *YouTube*). Up to 12 links per piece, and up to 200 pieces in all. Rows you leave empty are dropped when you save. Only the links are kept, in your sheet; the files stay where they are.
- **Saving.** **Kaydet**. If the piece was saved meanwhile somewhere else (another tab or device), it asks first: **Benimkini kaydet** or **Kaydedileni aç**; if it was deleted there, **Yeni eser olarak kaydet** keeps your work. Leaving the editor, reloading the page or signing out with changes not saved asks first too.
- **What members see.** A **Repertuvar** tab, once their group has a piece shown to members: each piece with its title, composer and note, then *Sizin partiniz: Soprano* with their own part's links, then the ones for everyone, and the other parts' links folded away under *Diğer partiler*. The conductor sees every part's links. Each link opens in a new tab. Members of several groups see each group's pieces under its name.
- **Whether a link opens** is up to the site it points to. A Google Drive file only you can open won't open for members: set its sharing to *Anyone with the link* (or share it with the members).
- **Later.** A section you take out of a group: its links count for everyone. A group with pieces can't be deleted until they are; the planner says which.

## Rehearsal plans: what each meeting works on

In the planner's **Takvim** tab, each saved meeting has **Prova planı**. (A meeting you've just added needs **Taslağı kaydet** or **Üyelere yayımla** first.)

- **Its rows, in order.** Each row is a warm-up (*Isınma*), a piece of the group's repertoire, something else you name (*Deşifre*), or a break (*Ara*). For each: the bars or the movement if you like (*1–32. ölçüler*), how many minutes it takes, and **Kimler için**: everyone the meeting calls, or some of its sections. Each row starts where the one before ends, from **Başlangıç** (the meeting's start, unless you change it). ↑ and ↓ move a row; a plan has up to 30.
- **Each section's time.** Under the rows, *Bölümlerin saatleri* shows each section from its first row to the end of its last (a break is nobody's): sopranos who are done at 20:00 can leave then, and basses wanted only for the second half come later. It also says when the plan runs past the meeting's end, and which sections have no row (they're called for the whole meeting).
- **What members see.** With **Üyelere göster** ticked (it is to start with), each member the meeting calls sees *Sizin saatiniz: 19:45–21:30* under it, when their time isn't the whole meeting, and the plan folded under *Prova planı*: every row with its times, theirs as they are and the others' quieter. A piece of their repertoire takes them to its links. Their calendar (the subscription, and the buttons under the meeting) has their own time, with the plan in its description. The conductor gets every row, and so does a member without a section (someone new, say: better there for all of it than missing their part). A meeting that's only on the draft, or doesn't call them, shows them no plan.
- **The message.** **Mesaj olarak kopyala (TR / EN)** copies the plan for the group chat, with each section's time when they differ; right after saving, **Mesajı kopyala** in the *Plan kaydedildi* notice does the same. Its wording is in the Mesajlar tab (*Prova planı*).
- **On the meeting's row**, next to **Prova planı**: *Üyeler görüyor*, *Gizli*, or *Yayımlanınca görünür* for a meeting only on the draft (members see its plan once it's published); *Buluşmaya sığmıyor* when the plan runs past the meeting's end, whether you saved it that way (that's allowed) or the meeting was made shorter or moved since. A plan can't run past midnight.
- **Later.** The plan follows its meeting: move the meeting and the times move with it (save the draft first, then open the plan), and a meeting you take off and add again at the same day and times keeps its plan once you publish. If both have a plan by then, the one saved last stays and the other is deleted. Saving, leaving with changes, two devices at once and deleting work as in the repertoire. Switching polls (or starting a new one) while a plan or the schedule has changes not saved yet asks first: **Kaydetmeden geç** drops them. A plan whose meeting you take off the schedule (and publish) is listed under the meetings, in *Takvimde artık olmayan buluşmaların planları*, to delete.

## Members know each other: Üyeler, profiles, who came

Members of a group may know one another by name; availability and the published schedule still show no names at all, only counts per section.

- **Üyeler (for members).** The members of their groups, by section, the conductor first. For each person: their name, and whatever that person chose to share. Members in no group see nobody, and are seen by nobody.
- **Their profile**, at the top of that page: phone, district or address, birthday (day and month only), and a line about themselves. All optional, entered by the member. The tick under the fields (*açık rıza*) is what lets their group see them; without it, only you see what they filled in, and they can untick it at any time. *Bu haftanın doğum günleri* lists the birthdays of the next seven days.
- **Different groups.** In the Members tab (with more than one group), **Farklı gruplardaki üyeler birbirini görür** decides whether everyone sees everyone, or each member only their own groups. It's off to start with.
- **Who came.** Under a rehearsal that has passed and had attendance taken, the group's members see *Gelenler*: who came, by name (late ones marked), and the rest as counts: how many were excused or absent, never who. The member's own mark is said to them. The same fold is under *Bu sezonun geçmiş provaları* at the foot of their Schedule page, which lists every rehearsal of their groups this season with attendance taken, latest first. Members see only the rehearsals of their own groups, and names only of those they may see anyway.
- **You** see every profile in full in the Members tab (**Profil** under each member), whether it's shared with the group, and whether the member has read the notice. You can fill a profile in or correct it; sharing stays the member's own tick.
- **The notice.** The first time a member opens Provala with this version, the privacy notice (*Aydınlatma metni*) covers the page until they press **Okudum ve anladım**; the date is kept in the Profiles sheet. It's always at hand under Üyeler. Its wording is in the Mesajlar tab: fill in who the data controller is (you, or your association) and how to reach you, since the page can't know. When you change the wording (in either language), members who read the earlier one are shown the new one once more. The notice is not a consent form: it only informs; the only consent asked is the tick on the profile.

## Polls made easier: standing commitments, corrections, what changed, news

- **Hours a member can never come.** On their **Takvim** page, under the days away, *Düzenli olarak gelemediğiniz saatler*: a class, a shift, a standing engagement, given once as days of the week and hours (18:00–20:30 on Tuesdays, say), until a date if it ends, with a note only you see. Every poll leaves those hours out for them: on the day's times they are shown as *gelemez* and can't be marked, what the member had marked there earlier doesn't count, and their summary says so. Your numbers and the member's row leave them out the same way (the page shows them crossed out, like days away). You can set them for a member who told you, in the Members tab (**Gelemediği saatler**); a member can have up to eight.
- **Correcting a member's answer.** In the **Yanıtlar** tab (called *Kişiler* before version 2026-10-r5.3), each answer has **Yanıtı düzenle**: it opens that member's page in a new tab, signed in as them for two hours, with a band across the top saying whose answer you're editing, and **Bitir** to come back. Their poll answers work as for the member, after the deadline too; what is the member's own stays theirs: no replies to meetings, no calendar link, no password change, no reading the notice for them, and no sharing tick on their profile (you can fill a profile field in, as in the Members tab). What you send is kept as your correction: the member's page tells them *Yanıtınızı en son şefiniz değiştirdi* (your conductor last changed your answer), and the Yanıtlar tab marks the answer *şef düzenledi*. Opening their page this way doesn't count as the member having opened the poll. Nothing of theirs stays on your device.
- **What each member changed.** Under each answer in Yanıtlar, **Değişiklikler** folds out the last twenty changes: when, how many days changed, each day as before → after (the first twelve), whether a note or the comment changed, and whether it was you. Each sent answer that differs from the one before is one step.
- **News for members.** Besides the schedule's changes, the box at the top of a member's page tells them of a rehearsal plan added or changed for a meeting of theirs still to come, and of a piece new in their repertoire, until they press **Tamam**.
- **Meetings that clash.** When you save or publish a schedule, the planner checks the other groups' published meetings: a meeting on the same day whose hours overlap, with people called to both, is listed under the schedule (*Başka bir grubun buluşmalarıyla çakışıyor*, with how many people) and marked *Çakışıyor* on its row. It only tells you; members see both meetings in their calendars as before.

## Around the rehearsal: concerts, rehearsal notes, starting notes

- **A concert, or something else.** Each meeting in the **Takvim** tab has a **Tür**: a rehearsal (as before), a concert, or something else (a trip, a party). A concert carries what it asks: **Toplanma saati** (when to be there), **Kıyafet** for women and for men, and **Getirilecekler**. Members see it on the meeting, marked *Konser*; it goes into their calendar entries and into the schedule message you copy for the group chat. A changed call time is told to members in the box at the top of their page, like a moved meeting, and listed in the changes you can copy for the group chat. Leave the call time empty if there isn't one.
- **Rehearsal notes.** Under each saved meeting, **Prova notları**: a line about the rehearsal, a link to its recording, and a line per piece (*Ölçü 12: tenorlar geç giriyor*). The rows come from the meeting's rehearsal plan, each piece once; add others from the repertoire. Members called to the meeting see the notes once it's published and its day has come: folded under the meeting on their Schedule page once it's over, and under *Bu sezonun geçmiş provaları* (which also lists earlier polls' meetings with notes, attendance taken or not), with a news line at the top of their page; the pieces link to the repertoire. Saving, leaving with changes, two devices at once and deleting work as for rehearsal plans.
- **Each piece's history.** Under a piece in the member's **Repertuvar**, *Bu sezon* lists this season's past rehearsals of their groups that worked on it: the date, how long the plan gave it to their section (from plans shown to members only), and what you noted. It comes from the plans and the notes; nothing to fill in.
- **Starting notes.** In the piece editor (Repertuvar tab), a starting note per section: a letter, # or b, and the octave (*G4*, *F#3*, *Bb4*; C4 is middle C). Members see them under the piece, their own section marked, and a tap sounds the note on the phone (a soft tone, a second and a half).

## Places and people: venues, lifts, the care list, backups

- **Venues.** The planner's **Mekânlar** tab lists where you meet: a name, whether it's for rehearsals, concerts or both, the address, and a map link if you have one; also its capacity, cost, a contact and a note, which only you see. In the **Takvim** tab each meeting then has **Mekân** under its place: pick one and its name becomes the place (a concert lists the concert venues first). Members see the place with its address and a **Harita** link (the venue's own link, or a map search of its address), and their calendar entries get the address too. Typing another place over it unlinks the venue; deleting a venue leaves its meetings with its name as their place.
- **Lifts.** Under each meeting still to come that calls them, members find **Araç paylaşımı**: they can say *Arabamda yer var* (how many, from where, a short note) or *Yer arıyorum* (from where). Sharing is what shows their name: it's seen by the members that meeting calls who see them anyway (as under Üyeler), with the phone they share on their profile, if they do. They can take it back at any time. A post is deleted, with what's in it, once the meeting's day has passed, or the meeting is taken off the schedule or moved to another day or time (the post was for the old one: they can post again), or the member is removed; it goes the next time someone posts, opens their page that day, or a backup is made. You see how many offers and requests each meeting has on its row in the Takvim tab. Editing as a member, you can't post for them.
- **Worth a call.** In the **Katılım** tab, *Arayıp sormaya değer* (open it to see the list) shows members who weren't at the last three meetings that called them and had attendance taken (absent or excused), or who haven't opened Provala in 30 days (or, added over a month ago, never have) and weren't at any of those three either. Each has **Mesajı kopyala**: a short message to send them yourself, with their own one-tap sign-in link: *Hal hatır sorma* for someone who missed the meetings, *Provala hatırlatması* for someone who hasn't opened it (their wording is in the Mesajlar tab). Members in no group, or who can't sign in, aren't on it. Only you see this list. The day a member last opens Provala is kept for it (once a day), from this version on: for the first month nobody is called away for lack of it (the list says since when), except someone added over a month ago who has never signed in.
- **Backups.** The Members tab shows when the last backup was made, links to the backups, and **Şimdi yedekle**. Each backup is a spreadsheet in your Google Drive with every sheet's contents, named after when it was made; up to 8 are kept, the oldest one overwritten by the next. To have one made every week by itself, add a trigger once (see *Backups* under *Changing things later*). If the last backup is more than a week old, the Members tab says so.

## Section leaders: polls and sectionals for their sections

- **Who.** In the Members tab, **Bölüm şefi** under a member: tick the sections they lead (any section of their groups), then **Bölümleri kaydet**. Their card then says *Soprano bölüm şefi*. Untick everything to end it; it ends at once, on every device.
- **Their panel.** A section leader finds **Bölüm paneli** among the tabs of their own page. It opens the planner's page for their sections only, with their own sign-in: no organizer key, and nothing is kept on their phone as a planner's sign-in. Signing out of their page ends it on that device; a password change or `signOutEveryone` ends it everywhere.
- **Their polls.** **Yeni anket** there makes a poll for the sections they tick (of one group). Once it has published meetings still to come, its sections can't be changed in a way that changes whom those meetings call: take them off or change them first. Only those sections' members get it, after their group's own poll (in their switch); it's never a group's current poll. The leader sees those members' answers by name, with their times, the days they're away and the hours they can't come (never the notes about them), but no day notes, comments, change history or profiles.
- **Sectionals.** In their **Takvim** tab they publish meetings for their sections. A meeting can't be published at the time of a general rehearsal of their group (one of your polls' published meetings that calls the whole group or any of those sections): the row says so, and **Üyelere yayımla** refuses it; a draft may overlap one. Their poll's answer grid shows those times hatched as *genel prova*, not for marking, and they don't count. **General rehearsals come first**: if you publish one at the time of a sectional, the sectional comes off what members see (they're told it's cancelled), stays in the leader's draft to be moved, and your Takvim tab lists which ones came off.
- **Attendance, notes and messages.** They take attendance at their own meetings, and, in their **Katılım** tab, at their group's general rehearsals of the last three weeks for their sections (your marks for everyone else, and the guests, stay as they are). They write rehearsal notes for their meetings, and copy the ready-made messages in your wording, with the plain link (never sign-in links).
- **What they don't get.** Other groups and sections, comments, reasons, the member list and its passwords and sign-in links, your settings, venues, rehearsal plans, the repertoire, stage plans, the care list, backups, or editing as a member.
- **You and their polls.** Their polls are in your poll list, marked *bölüm şefi …*. You can open, edit (the sections stay) and delete them. Another leader, even of the same sections, doesn't get them; a leader who no longer leads all of a poll's sections loses it too (it stays yours), and its members are no longer told a leader sees their answers. Each leader can have up to 30 polls of their own.
- **Attendance by two people.** You and a leader can take attendance at the same general rehearsal at once: each save changes only the marks changed in that dialog, and a mark the other changed meanwhile stays as they saved it (the later save says whose marks were kept, so you can look again). A planner page from before this version still saves the whole record: reload the planner on every device you use.

## On the home screen

Provala can sit on a phone's home screen like an app. It opens full-screen and at once, and without a connection it still opens, with the member's page as it was last time on that phone (it says so, and nothing can be sent until the connection is back).

- **On Android**, in Chrome, members see *Provala’yı ana ekranınıza ekleyin* at the very bottom of their **Takvim** page, with **Ana ekrana ekle**, which asks the phone. Other browsers may not show the box, but every browser's own menu has it: *Ana ekrana ekle* or *Uygulamayı yükle*. The app shares the browser's sign-in. On a computer the box doesn't show; Chrome's own install button in the address bar does the same.
- **On an iPhone or iPad**, the same box says how: in Safari, **Paylaş** (on newer iOS versions, first **•••** next to the address bar), then **Ana Ekrana Ekle**. The app on the home screen keeps its own sign-in, apart from Safari's, so the first time they open it there they sign in once more: with their username and password, or with a new **Giriş bağlantısı** from you, which they copy (press and hold the link in WhatsApp, then **Kopyala**) and paste into the username box. (A link tapped in WhatsApp opens in Safari, not in the app.) For the same reason, signing out in Safari doesn't sign them out of the app, nor the other way round: on a phone that's shared or passed on, sign out in both.
- **Hayır, teşekkürler** hides the box on that device for good. In the app itself, it never shows.
- **The planner is an app of its own**, *Planlama*, with a dark P on gold. Open the planner (`#admin` at the end of the address) and add it the same way: the box is at the bottom of the planner. On an iPhone, you enter the organizer key once more there. On Android, the two apps share Provala's address, so once one of them is on a phone, Chrome may not offer the other there: on your own phone, add the planner (members' pages still open in the browser).
- **Updates.** When you upload a new `index.html`, a phone gets it the next time Provala opens with a connection (on a slow one, some 15 seconds after it opens). A page that's left open checks too: soon after opening, when it's looked at again after a while, and when the connection comes back, it loads the new version by itself, unless something there would be lost (something typed in, not sent or saved yet, a window or a question open, new passwords on screen, an answer on its way). Then, and every half hour while it stays open in view, it shows *Provala’nın yeni sürümü hazır* with **Yenile**, which asks first if something would be lost.

## Every month after that

1. In the planner, click **New poll**. It copies the settings of the last poll for the same groups (with the people every meeting needs), picks the following month, and lists that month's holidays to close if you need to.
2. Click **Make current**. The poll's groups see the new month the next time they open the link. Old polls stay in the list, and members stay the same. Meetings still to come from the earlier poll stay on members' Schedule page.

## Where your data is

Open the **Provala data** spreadsheet (link in the Apps Script log, or search your Drive). It has these sheets:

- **Members**: one row per member, with their name, username and when they last signed in. Passwords are only stored scrambled; their days away, the hours they can never come and the sections they lead are in the Data column.
- **Polls**: one row per poll (its closed days and the people every meeting needs are in its Data column; a section leader's poll also has its sections and who made it there).
- **Responses**: one row per member per poll, with readable columns for name, comment, availability (times in brackets are "only if needed") and day notes. The last twenty changes, and whether the answer was last sent by you, are in the Data column.
- **Schedules**: what you published (a sectional ends with *[yalnız Tenor, Bas]*; a concert has *[Konser]* after its times, and what it asks is in the Data column).
- **Replies**: one row per member per poll, with their replies to the meetings, their times (*geliş* / *ayrılış*), reasons, and *[şef biliyor]* where they ticked that you know.
- **Attendance**: one row per meeting where you took attendance: who came (late ones marked), guests, and who was absent.
- **Errors**: problems the page ran into on members' devices (see below). When there are new ones, the planner's notice has **Errors sayfasını aç**, which opens this sheet.
- **Groups**: each group with its sections and who is in which (once you add or edit a group).
- **Stages**: one row per stage plan: its group, title, date, whether members see it, and each lineup with its songs and rows of names, back row first (a closed place shows as *[Piyano]*, or *[kapalı]*).
- **Messages**: your own wording of the ready-made messages, one row per message and language (only the ones you changed).
- **Repertoire**: one row per piece: its group, title and composer, each link with whom it's for, and whether members see it. Its starting notes are in the Data column.
- **Rehearsal plans**: one row per plan: its poll, its meeting (day, times and title), each row with its times and whom it's for, and whether members see it.
- **Profiles**: one row per member who filled something in or read the notice: phone, address, birthday, the line about themselves, when they read the notice. Whether they share it with their group is in the Data column.
- **Rehearsal notes**: one row per meeting with notes: its poll, the meeting, the recording's link, the line about the rehearsal, and a line per piece.
- **Venues**: one row per venue: its name, what it's for, address, map link, capacity, cost, contact and your note.
- **Rides**: one row per lift offered or asked for: the poll, the meeting, who, whether they offer or ask, how many seats, from where.

These last twelve appear by themselves the first time something goes into them. The backups are separate spreadsheets named *Provala yedek – …*, not sheets in this one.
The last column of each sheet, **Data**, is what the app reads. Make changes through the app rather than in that column. **Export CSV** in the planner gives you one row per person per day.

From version 2026-10-r5.3, Apps Script also keeps a copy of what it reads from these sheets in its cache for up to ten minutes, so pages open faster. The cache belongs to your script, on Google's side like the sheet itself; it's never on anyone's phone, and every page is still put together from it by the same rules. A change you make in the sheet by hand shows in Provala only once that copy runs out, or at once after you run `clearCache` from the editor.

## Changing things later

- **Changed `index.html`?** Upload it to the GitHub repository again (with your `API_URL` filled in). Pages updates within a minute or two, and phones with Provala on their home screen take it up by themselves (see *On the home screen*).
- **Set up before the app was called Provala?** Nothing breaks. The page finds your sheet by its ID, so you can rename the sheet and the Apps Script project to Provala whenever you like. If you also rename the GitHub repository, the link changes to `https://<your-username>.github.io/provala/`. Send members the new link; they stay signed in, because it's still the same github.io address. Anyone who added Provala to their home screen adds it again from the new link: the old icon then opens GitHub's "not found" page (and the phone drops its copy of the old one).
- **Want a different banner?** Replace `banner.webp` in the repository with the new picture (same name, about 3 times as wide as it is tall). The link-preview picture is the separate `preview.jpg` (1200 × 630); replace that file too. WhatsApp keeps old previews for a while, so the new picture can take a day or so to show in chats where the link was already shared.
- **Changed `Code.gs`?** Paste the new code, save it, then **Deploy → Manage deployments**, click the pencil icon, set Version to **New version**, and click **Deploy**. The URL stays the same. Without this step, the live web app keeps running the old code. The page works with an older `Code.gs` too, just without what that version can't do (the check that a second device didn't save the schedule or a poll first, sections for members as you add them, the link to the Errors sheet, section leaders, venues, lifts, the care list and backups, concerts' details, rehearsal notes, piece histories and starting notes, standing commitments, corrections and what members changed, the news lines about plans and pieces, clashes, rehearsal plans, the repertoire, stage plans, closed days, needed people, sectionals and *like last month*; with an older one also groups, replies, the Attendance tab, calendar links and error reports, and with a much older one voice parts and the numbers), and it shows only what works.
- **Backups.** The planner's **Şimdi yedekle** (Members tab) makes one at any time. To have one made every week: in Apps Script, open **Triggers** (the clock on the left) → **Add Trigger** → function `backupNow`, deployment *Head*, event source *Time-driven*, *Week timer*, a day and an hour (say Sunday, 3am to 4am) → **Save** (Google may ask you to allow it). You can also run `backupNow` from the editor. **To restore** from a backup: open it from the Members tab's list (or from your Drive: *Provala yedek – 2026-10-21 03:10*), then either copy the sheet you need back into **Provala data** (right-click its tab → *Copy to* → *Existing spreadsheet*; it arrives as *Copy of Members* or *Members kopyası*: delete the damaged sheet, or rename it, then rename the copy to exactly the old name, since Provala finds its sheets by name; then run `clearCache` from the editor, so Provala reads it at once), or use the whole backup: **File → Make a copy**, copy the new spreadsheet's id (the long part of its address between `/d/` and `/edit`), and in Apps Script **Project Settings → Script properties** set `SHEET_ID` to it. Provala then runs on that copy; nothing else changes. Backups made after that are of the copy.
- **Someone forgot their password?** Members tab → **New password** next to their name. Their old password and sign-ins stop working.
- **Someone left the group?** Members tab → **Remove**. They can't sign in any more; answers they already gave stay.
- **Want everyone to sign in again** (for example, after a phone was lost)? Run `signOutEveryone` in the Apps Script editor (pick it in the same dropdown as `setup`, then **▶ Run**). Passwords keep working. A phone that is offline can still show its last copy of that member's own page, but it can't load anything new or send anything until someone signs in again.
- **Lost the organizer key?** Run `showOrganizerKey` in the Apps Script editor and look in the Execution log.
- **Want a new organizer key** (for example after sharing your screen)? Run `newOrganizerKey`. The old one stops working, and so does every planner sign-in made with it, and every sign-in link that hasn't been used yet (send new ones where needed).
- **Want a co-organizer?** Give them the organizer key; they can then do everything you can in the planner. To take it back, run `newOrganizerKey` (which also ends the sign-in links they made and nobody has used yet).
- **Want to choose your own organizer key?** In Apps Script, open **Project Settings** (the gear on the left) → **Script properties** → edit `ADMIN_KEY`. Use something long, like four or five unrelated words.

### Updating to version 2026-10-r5.4 (the app's own names on phones)

Upload the new `index.html` to GitHub. Nothing else changes: `Code.gs`, `sw.js` and the sheet stay as they are.

What Provala keeps on each phone and computer (the sign-in, answers not sent yet, the language, the planner's sign-in) is now saved under Provala's own name instead of the app's first working title. The new page copies it over by itself the first time it opens, so nobody is signed out and nothing waiting to be sent is lost. The old copies stay for now (signing out removes them), so putting the previous `index.html` back still works; only someone who first signed in after this version then signs in once more. This version includes 2026-10-r5.3: coming from an earlier one, do that update first.

### Updating to version 2026-10-r5.3 (fixes, faster pages, easier to use)

This version includes 2026-10-r5.2.1 and r5.2: coming from an earlier one, read those sections too and do what they ask.

1. Open the **Provala data** sheet and choose **File → Make a copy**, as before.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**.
3. Upload the new `index.html` and the new `sw.js` to GitHub, then reload the planner on every device you use it on.
4. Optional: delete `banner.png` from the repository. Nothing uses it (the page uses `banner.webp`); it only makes the repository 2.6 MB bigger.

Provala needs no new permission. Do step 2 before step 3: with the previous `Code.gs`, the new page can't tell when a second device saved the schedule or a poll first, and a schedule of more than 40 meetings is still cut short.

**What it fixes**

- **Standing commitments on your board.** The board, the best times and the lists counted members as free in the hours they told you they can't come (a class every Tuesday, say). They now leave those hours out, as the members' numbers always did.
- **Two devices, one schedule.** A planner page left open on a second device (or a co-organizer's) could save or publish an older schedule over a newer one, and quietly undo it. Now the save is refused, and the page says so: **O hâlini göster** opens the newer one, or **Benimkini üstüne kaydet** (or **yayımla**) saves yours over it. The same goes for a poll's settings and for **Yanıtları kapat**.
- **Long schedules.** A schedule now takes up to 60 meetings. Before, everything after the 40th was dropped without a word; now a longer one is refused with a message.
- **Section leaders' polls.** **Yeni anket** copies your own latest poll, never a section leader's. "Like last month" no longer offers a section leader's poll for the group's next one. A sectional, with who came, shows under *past rehearsals* only to the sections it was for.
- **Calendar files on a phone in another time zone.** The `.ics` files (one meeting, or all of them) now carry the time in the poll's time zone, as the subscription and the Google button already did. Before, a phone set to another time zone showed it hours off.
- **Clashes with a section leader's sectional.** The note now says that publishing will take the sectional off (and its members are told it's cancelled), instead of calling it another group's meeting.
- **Deleting a poll** with published meetings still to come now warns that they vanish from members' calendars without a word.
- A member's Takvim page now holds up to ten other polls' meetings (six before), and a 29 February birthday shows on 28 February in other years.

**Faster**

- **Pages open faster.** `Code.gs` now keeps the tables it reads in Apps Script's cache for ten minutes, and reads only the data column. A member's page then needs a handful of calls instead of about fifty, and the planner opens about as fast. Anything saved through Provala shows at once: each save moves on the version of what it changed, so the old copy isn't used again. Saving always reads the sheet itself.
- The page on the home screen opens the copy kept on the phone after 1.5 seconds without an answer (4 before), the first visit no longer waits for pictures to be kept, and typing a comment or a day note no longer redraws the whole calendar at each key. Long lists (the planner's Üyeler and Yanıtlar, a member's past rehearsals) make what's inside a fold only when it's opened.

**One thing to know:** if you change the sheet by hand (copy a sheet back from a backup, say), Provala may show the old contents for up to ten minutes. To have it read the sheet again at once, run `clearCache` in the Apps Script editor (pick it in the same dropdown as `setup`, then **▶ Run**). Do the same after going back to an earlier `Code.gs` and forward again.

**Easier to use**

- **New password** and, for members, **Çıkış yap** now ask first.
- One name for each thing: members read *şefiniz* everywhere (no more *yönetici*), the planner's door is *Planlayıcı girişi*, and a voice part or instrument is a *bölüm* everywhere. The planner's **Kişiler** tab is now **Yanıtlar**.
- The members' deadline chip says *Son yanıt günü*, in red only on the last day and after.
- The poll page: the help under the calendar is clearer and folds away once someone has answered; with **Gerekirse** picked, it says that such a day needs a reason; on a narrow phone the bar at the bottom is one line.
- The Takvim page: what changed comes first; each meeting has the reply buttons first and the calendar buttons folded under **Takvime ekle**; the dot on the Takvim tab shows only when something is new or a meeting still waits for a reply.
- Üyeler (members): their own profile is folded (with whether it's shared), so the list comes first.
- The planner: **Taslağa ekle** and **Yayımla** on best times, with the venue to pick when publishing and **Mesajı kopyala** staying on the row; **Buluşmayı kaldır** in the Takvim tab; on a phone a link straight to the best times; in Katılım, today's meeting at the top, and the attendance dialog's save button stays in view; in Üyeler, a name search and **Bölüm** to give everyone you add their section at once.
- On touch screens the folds and small buttons are easier to tap; the keyboard has a skip link past the header, and the arrow keys move along the planner's tabs.

### Updating to version 2026-10-r5.2.1 (older phones, the Errors link)

This version includes 2026-10-r5.2: coming from an earlier one, read that section too and do what it asks.

1. Upload the new `index.html` to GitHub. That alone makes Provala work on older phones and browsers.
2. For the link to the Errors sheet: in Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**. With the previous `Code.gs`, the planner's notice says where the errors are, without the link.

Older phones and browsers: a browser from before late 2020 (Chrome before 86, Safari before 14, Firefox before 78) couldn't draw the page and showed *Sayfa açılamadı* instead; an iPhone 6 or 6 Plus, which can't go past iOS 12, is one. From this version the page fills in what such a browser lacks, and its layout keeps its margins there. On iOS 12, marking times works one by one (tap each time); dragging across several times needs iOS 13 or later. Such a browser shows the pages a little plainer: buttons sit closer together, and Firefox before 88 shows plain colours instead of the paper textures.

### Updating to version 2026-10-r5.2 (section leaders)

This version includes 2026-10-r5.1, r5, r4.9, r4.8 and r4.5: coming from an earlier one, read those sections too and do what they ask.

1. Open the **Provala data** sheet and choose **File → Make a copy**, as before.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**.
3. Upload the new `index.html` to GitHub, then reload the planner on every device you use it on (an older planner page saves attendance the old way, over the whole record).

Provala needs no new permission. The order of steps 2 and 3 doesn't matter: with the previous `Code.gs`, the new page shows none of this (a *Bölüm paneli* still open asks it in a way it refuses, never as a wrong organizer key), and the previous page works with the new `Code.gs` (members see a section leader's poll in their switch; the previous page lets them mark the general rehearsals' times there, which don't count). Before making someone a section leader, tell the group: in that leader's polls, the leader sees the names and times of their sections' answers (see *Security and privacy*). The ready-made notice (*Aydınlatma metni*) says so from this version; if you changed its wording in the Mesajlar tab, add a line about it yourself.

Going back to the previous `Code.gs` after section leaders have made polls: those polls become ordinary polls of their group there (every member of the group can open and answer one by its link, and you could make one current), and leaders lose their panel. Delete their polls first, or tell the group.

### Updating to version 2026-10-r5.1 (places and people)

This version includes 2026-10-r5, r4.9, r4.8 and r4.5: coming from an earlier one, read those sections too and do what they ask.

1. Open the **Provala data** sheet and choose **File → Make a copy**, as before.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**.
3. Upload the new `index.html` to GitHub.
4. Optional, once: add the weekly backup trigger (*Changing things later → Backups*), and make a first backup with **Şimdi yedekle** in the Members tab.

Provala needs no new permission for any of this (backups use the spreadsheet permission it already has); the trigger in step 4 may ask Google once. The order of steps 2 and 3 doesn't matter: with the previous `Code.gs`, the new page shows none of this, and the previous page works with the new `Code.gs`. Tell the group that they can offer or ask for lifts under each meeting, and that their name shows only when they do.

### Updating to version 2026-10-r5 (around the rehearsal)

This version includes 2026-10-r4.9, r4.8 and r4.5: coming from an earlier one, read those sections too and do what they ask.

1. Open the **Provala data** sheet and choose **File → Make a copy**, as before.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**.
3. Upload the new `index.html` to GitHub.

Every meeting stays a rehearsal until you say otherwise. The order of steps 2 and 3 doesn't matter: with the previous `Code.gs`, the new page shows none of this, and the previous page works with the new `Code.gs`. The **Rehearsal notes** sheet appears with the first notes you save.

### Updating to version 2026-10-r4.9 (polls made easier)

This version includes 2026-10-r4.8 and 2026-10-r4.5: coming from an earlier one, read those sections too and do what they ask (the notice's wording, the home-screen files).

1. Open the **Provala data** sheet and choose **File → Make a copy**, as before.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**.
3. Upload the new `index.html` to GitHub.

Nothing changes for members until they use it: the new box on their Takvim page, and the news lines. The order of steps 2 and 3 doesn't matter: with the previous `Code.gs`, the new page shows none of this, and the previous page works with the new `Code.gs`. A member's answer you correct is marked as yours from then on; answers sent before this version have no change history yet.

### Updating to version 2026-10-r4.8 (members know each other)

This version includes 2026-10-r4.5: coming from an earlier one, upload that version's files too (`sw.js`, the two manifests and the seven icons), and read the sections below.

1. Open the **Provala data** sheet and choose **File → Make a copy**, as before.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**.
3. Upload the new `index.html` to GitHub.
4. In the planner's **Mesajlar** tab, open *Aydınlatma metni (KVKK)* and write in who the data controller is and how to reach you, then save it. Until you do, members see the page's wording, which says only "the group's organizer".

Members see the notice the first time they open Provala after step 3 (with step 2 done), and the new **Üyeler** tab. Tell the group in your chat beforehand that members of a group now see one another's names and sections, and who came to past rehearsals; availability and the schedule stay as they were. The order of steps 2 and 3 doesn't matter: the new page with the previous `Code.gs` has no Üyeler tab and shows no notice, and the previous page works with the new `Code.gs`. The **Profiles** sheet appears by itself with the first member who fills something in or reads the notice.

### Updating to version 2026-10-r4.7 (rehearsal plans)

This version includes 2026-10-r4.5: coming from an earlier one, upload that version's files too (`sw.js`, the two manifests and the seven icons), and read the sections below.

1. Open the **Provala data** sheet and choose **File → Make a copy**, as before.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**.
3. Upload the new `index.html` to GitHub.

Nothing changes for members until you save a plan. The order of steps 2 and 3 doesn't matter: the new page with the previous `Code.gs` has no **Prova planı** on the meetings' rows, and the previous page works with the new `Code.gs` (it just shows no plans; a meeting taken off the schedule there leaves its plan listed apart in the new page). The **Rehearsal plans** sheet appears by itself with the first plan you save.

### Updating to version 2026-10-r4.6 (the repertoire)

This version includes 2026-10-r4.5: coming from an earlier one, upload that version's files too (`sw.js`, the two manifests and the seven icons), and read the sections below.

1. Open the **Provala data** sheet and choose **File → Make a copy**, as before.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**.
3. Upload the new `index.html` to GitHub.

Nothing changes for members until you show them a piece. The order of steps 2 and 3 doesn't matter: the new page with the previous `Code.gs` has no **Repertuvar** tab, and the previous page works with the new `Code.gs` (it just has no repertoire, and if you delete a group that has pieces from it, it only says something went wrong). The **Repertoire** sheet appears by itself with the first piece you save.

### Updating to version 2026-10-r4.5 (on the home screen)

`Code.gs` stays as it is: nothing to deploy, and no need to copy the sheet. Coming from a version before 2026-10-r4.4, do that update first (its `Code.gs` is this version's too).

1. Upload to GitHub, next to `index.html`: `sw.js`, `manifest.webmanifest`, `planner.webmanifest` and the seven icons (`icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `planner-180.png`, `planner-192.png`, `planner-512.png`, `planner-maskable-512.png`).
2. Upload the new `index.html` (with your `API_URL` filled in).

Doing both in one commit is easiest; otherwise do them in this order. The new page without `sw.js` next to it works as before, just without the home-screen copy, and the other files do nothing until the new page is there. Each phone takes up the change the next time it opens Provala, and from the time after that it opens at once.

Going back to the previous `index.html` works: phones keep the small helper (`sw.js`), and whenever there's a connection it hands them what GitHub has, so from their next opening they're on the previous page (on a slow connection, some 15 seconds into it). To take the helper off phones altogether, see *Switching the home-screen copy off* under Troubleshooting.

### Updating to version 2026-10-r4.4 (closed places, who can't come, the singers' view)

This version includes 2026-10-r4.3, 2026-10-r4.2, 2026-10-r4.1 and 2026-10-r4: coming from an earlier one, read those sections below too (one update covers all of them).

1. Open the **Provala data** sheet and choose **File → Make a copy**, as before.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**.
3. Upload the new `index.html` to GitHub.

Your stage plans stay as they are. The order of steps 2 and 3 doesn't matter: the new page with the previous `Code.gs` can turn the stage round but can't close places or say who can't come, and the previous page (members' and yours) shows closed places as empty ones. If you save a plan on the previous page, its closed places stay closed, unless someone is put there (by you, or by arranging or mirroring on that page, which sees an empty place there) or that row's number of places changes.

Going back to the previous `Code.gs` works on the same sheet, but it doesn't keep closed places: the next time you save a plan that has some, from either page, they become empty places (the new page says so above the plan before you save).

### Updating to version 2026-10-r4.3 (changes for members, publishing in one go)

This version includes 2026-10-r4.2, 2026-10-r4.1 and 2026-10-r4: coming from an earlier one, read those sections below too (one update covers all of them).

1. Open the **Provala data** sheet and choose **File → Make a copy**, as before.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**.
3. Upload the new `index.html` to GitHub.

Nothing changes for members until you next publish a schedule that changes meetings they've seen. The order of steps 2 and 3 doesn't matter: the new page with the previous `Code.gs` shows no changes and has no **Yayımla** in best times, and the previous page works with the new `Code.gs` (it just doesn't show the changes).

### Updating to version 2026-10-r4.2 (days away)

This version includes 2026-10-r4.1 and 2026-10-r4: coming from an earlier one, read those sections below too (one update covers all of them).

1. Open the **Provala data** sheet and choose **File → Make a copy**, as before.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**.
3. Upload the new `index.html` to GitHub.

Nothing changes until someone adds days away. The order of steps 2 and 3 doesn't matter: the new page with the previous `Code.gs` has no days away, and the previous page works with the new `Code.gs`. (Its planner doesn't know about days away: its board still counts times marked on them, and someone away who hasn't replied to a meeting is listed under *Henüz yanıt vermeyenler*, among those to remind. Members' numbers and the counts for meetings, which the new `Code.gs` works out, already leave them out.)

### Updating to version 2026-10-r4.1 (deadlines)

This version includes 2026-10-r4: coming from an earlier one, read that section below too (one update covers both).

1. Open the **Provala data** sheet and choose **File → Make a copy**, as before.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**.
3. Upload the new `index.html` to GitHub.

The countdown shows at once; answers only close by themselves in polls where you tick the new box in the settings. Who opened a poll is noted from now on, so for a poll that was already running, those who opened it before the update show under *Henüz açmadı* until they open it again. The order of steps 2 and 3 doesn't matter: the new page with the previous `Code.gs` has no closing by itself and no "opened" lists, and the previous page works with the new `Code.gs` (a poll that closed by itself shows as closed there too).

### Updating to version 2026-10-r4 (sign-in links, your own wording)

1. Open the **Provala data** sheet and choose **File → Make a copy**, as before.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**.
3. Upload the new `index.html` to GitHub.

Nothing changes until you send a link or change a message; the **Messages** sheet appears when you first save one. The order of steps 2 and 3 doesn't matter: the new page with the previous `Code.gs` has no Mesajlar tab and no sign-in links (the personal messages carry the plain link, as before), and the previous page works with the new `Code.gs`.

### Updating to version 2026-10-r3.2 (stage plans)

1. Open the **Provala data** sheet and choose **File → Make a copy**, as before.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**.
3. Upload the new `index.html` to GitHub.

Nothing changes until you save a stage plan; the **Stages** sheet appears then. The order of steps 2 and 3 doesn't matter: the new page with the previous `Code.gs` has no Sahne tab, and the previous page works with the new `Code.gs` (without stage plans). Going back to the previous `Code.gs` keeps the Stages sheet; it just isn't used until you come forward again. (A group deleted meanwhile leaves its plans under *Silinmiş grupların düzenleri* in the Sahne tab, to delete.)

### Updating to version 2026-10-r3.1 (the conductor)

1. Open the **Provala data** sheet and choose **File → Make a copy**, as before.
2. In Apps Script, replace all of `Code.gs` with the new one, save, and deploy a **New version**.
3. Upload the new `index.html` to GitHub.

Nothing changes until you pick a conductor. The order of steps 2 and 3 doesn't matter: the new page with the previous `Code.gs` just doesn't offer the conductor picker, and the previous page works with the new `Code.gs` (it shows the conductor as a member without a section). Going back to the previous `Code.gs` gives the conductor their earlier sections again.

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

**What members see of each other.** Only you see anyone's notes and comment, and anyone's full answer (a section leader sees, for their own sections and their own polls, names and times: see below). From version 2026-10-r4.8, members of a group know each other by name and section, with what each chose to share (see *Members know each other*), and see who came to past rehearsals; availability and the schedule still show no names. Members see:
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
- **Who opened a poll** without answering (the first time they did) only you see, in the Yanıtlar and Üyeler tabs.
- **Lifts.** A member's name shows under a meeting only if they offer or ask for a lift there, only to the members it calls who may see them anyway, with the phone they chose to share. Nothing else about anyone.
- **Section leaders.** A member you make a section leader gets, in their panel, of their own sections only: the names and times of the answers to the polls they make (with the days away and hours someone can't come, without their notes), replies to their meetings without reasons, and attendance at their meetings and at their group's general rehearsals of the last three weeks. Never day notes, comments, reasons, change history, profiles, usernames, sign-in times, or anything of other sections and groups. Members are told on that poll's page that their section leader sees their name and times. Their sign-in to the panel is their own member sign-in: it never becomes a planner's sign-in, ends when you untick them or when theirs ends, and wrong ones never count towards pausing the planner.
- **Venues, the care list, backups.** A member's page gets a venue's name, address and map link, never its cost, contact or your note. The day a member last opened Provala, and the care list, only you see. Backups are spreadsheets in your own Drive: share them with nobody, like the sheet itself.
- **Rehearsal notes and concerts.** A member's page gets the notes of the past published meetings that called them, and each piece's history from those meetings; nothing about anyone. A concert's details go to everyone it calls.
- **Rehearsal plans.** A member's page gets the plans you show for the published meetings that call them: the rows with their times, whom they're for, and the note. Nothing about anyone: their own time is worked out on their page, from their own section.
- **Üyeler.** A member's page gets, of the members of their groups (or of every group, with your setting on), the name, the sections, and the profile fields each has chosen to share; never ids, usernames, answers or anything else. Of past rehearsals of their groups with attendance taken, it gets the names of those marked as came and the counts of the rest. Someone in no group gets nobody.
- **Repertoire.** A member's page gets the pieces you show for their groups, with their links: nothing about anyone. The links are kept in your sheet, never on GitHub; who can open the files they point to is up to those files' own sharing.
- **Stage plans.** A member's page gets the plans you show for their groups: titles, songs, and the places, but with their own place as the only one tied to a person; every other place says only which section stands there. The picture you download has names, because you share it yourself. Who can't come on a plan's date, and why, is worked out for you only, and never goes into the picture.
- The page tells members this right under their answers and on the Schedule page. Before your first poll with this version, tell the group in your chat too: people may have answered expecting nobody to see anything.

**What protects your members' answers.**
- Only members you add can sign in, and each member only ever loads their own answers, plus the numbers above, which `Code.gs` works out on the server. Other people's answers never reach a member's phone. So that the page opens at once on a return visit, it keeps a copy of the member's page (the poll, their own answers and replies, the numbers above) on their device, next to the sign-in; signing out removes both. Names, notes and schedules are shown as plain text, so nothing a member types can run as code in anyone's browser.
- **The home-screen copy.** `sw.js` keeps Provala's own files on the phone: the page as it is on GitHub, its pictures and fonts, the same for everyone and with nothing about anyone in them. It never keeps anything from Apps Script, so no names, answers, times or sign-ins are in it (the member's own page is kept as described above, and signing out removes it). The page is asked for afresh from GitHub whenever there's a connection, waiting up to four seconds before opening the copy instead (and taking up the new version as soon as it's in, as above), so a phone doesn't stay on an old version. If GitHub says the page is gone, the copy goes too.
- Passwords are stored only as salted, keyed hashes. The secrets for those hashes and for sign-ins live in the script's properties, not in the sheet, so even a copy of the sheet doesn't reveal passwords.
- After 8 wrong passwords in a row, that username is paused for 15 minutes. After 10 wrong organizer keys, the planner is paused for 15 minutes.
- Sign-ins are signed and expire: 180 days for members, 30 days for the planner. A password change, a new password from you, or `signOutEveryone` ends them early.
- **Sign-in links** are long random codes. The sheet keeps only a keyed hash of each, so even a copy of the sheet can't sign anyone in. A link works once, within 7 days (the message names its last whole day), and a member has at most ten not yet used: a message copied again for the same person within ten minutes carries the same link, and an eleventh pushes out the oldest. A new password, a password change, `signOutEveryone` or `newOrganizerKey` ends the ones not used yet. The code sits after `#` in the address, which browsers never send to GitHub or anyone else; the page takes it out of the address before using it, and puts it back only when there was no connection, for another try. If someone else is signed in on that phone, the page first asks whether to switch, and the link isn't used until they say yes. Until it's used, a link is as good as a password, so send it only in a private chat.
- **Days away**, their dates and their note, are seen only by the member and you. Other members never get them, only the numbers, which change for those days as with any answer.
- **Hours a member can never come**, and their note, are seen only by the member and you, like days away; the numbers leave those hours out as with any answer.
- **Editing as a member** needs the organizer key and lasts two hours in that tab; the sign-in it uses is tied to the member's password and to the organizer key, so a new password or a new key ends it, and nothing of it is kept on your device once you close the tab (the tab itself remembers the sign-in until it's closed). It can't reach what is the member's own: their calendar link, password, replies, the notice, or the sharing tick. What you send is marked as yours, and the member is told.
- **Profiles.** Phone, address, birthday and the line about themselves are entered by each member (or by you, for someone who told you: what you enter is shown to the group under the member's own tick, so enter only what they asked you to); the member's own tick is what shares them with the group, and you can't tick it for them. The notice (*aydınlatma metni*) is shown before anything is shared, and when each member read it is kept, since the law asks you to be able to show that.
- A member's calendar link is a long random code that only works for the published meeting times and that member's own replies. Removing the member, or **Make a new link** on their Schedule page, stops it. A new password or `signOutEveryone` doesn't, so a forgotten password doesn't quietly break the member's calendar; if a phone is lost, the member can make a new link from another device.
- **Error reports.** When the page runs into a problem on someone's phone, it tells the script: the error message, where in the page it happened, and the browser name. Never names, answers, anything typed or a sign-in link. At most three per visit and thirty an hour reach the **Errors** sheet, which keeps the latest 500; the planner tells you when new ones arrive. If you want a problem fixed, those rows are what to pass on. Anyone with the page's address could send such a report (apart from trying to sign in, it's the only thing possible without a sign-in), which is why they're capped and kept apart from your members' data: at worst, made-up reports could fill that hour's thirty and crowd out real ones.

**What you should do.**
- Turn on 2-Step Verification for the Google account that owns the script and the sheet. Everything is only as safe as that account.
- Don't share the **Provala data** sheet or the Apps Script project with anyone.
- Send each member their sign-in message, and any message with a sign-in link, privately, never in the group chat.
- Keep the organizer key private. Sign out of the planner on computers that aren't yours.
- All your GitHub Pages sites share one address (`<your-username>.github.io`), and pages on the same address can read each other's saved sign-ins, and replace the copy of Provala a phone keeps. Don't add third-party scripts (trackers, widgets) to your other pages there. For complete separation, put Provala in a free GitHub organization instead, so it gets its own address.

**Limits.** A poll can cover up to 3 months and take up to 400 answers. You can add up to 400 members. A section leader can have up to 30 polls of their own. Times are in the poll's time zone (set automatically from your browser, editable in the poll settings until the first answer).

## Troubleshooting

- **"Couldn't reach Provala" / "Provala’ya ulaşılamadı"** (before version 2026-10-r5.3: "Couldn't reach the planner"): check that `API_URL` in `index.html` is the Web app URL ending in `/exec`, and that the deployment's "Who has access" is **Anyone**.
- **"Provala isn't set up yet"** (before version 2026-10-r5.3: "The planner isn't set up yet"): run `setup` once in the Apps Script editor.
- **"Sayfa, üyelerin cihazlarında … sorunla karşılaştı"** in the planner: **Errors sayfasını aç** in that notice opens the Errors sheet (or open **Provala data** in your Drive, tab **Errors** at the bottom). Each row has when, where in the page, the error and the browser; never names or answers, so you can pass it on to whoever fixes Provala. A single one with *start* in the Page column, from a browser that says it's a desktop computer, is usually a link checker (a chat app's preview or an email's link scanner) and nothing to worry about. The link opens the sheet in your Google account: a co-organizer with only the organizer key gets Google's "You need access" page instead.
- **A member can't sign in**: check the username in the Members tab. If they've tried too many times, they can wait 15 minutes, or you can give them a new password.
- **Your changes to `Code.gs` don't show up**: deploy a **New version** (see above).
- **A change you made in the sheet by hand doesn't show**: Provala keeps what it read for up to ten minutes. Run `clearCache` in the Apps Script editor to have it read the sheet again at once.
- **The organizer key isn't accepted**: run `showOrganizerKey` and copy it again, without extra spaces.
- **The page says "The page couldn't open" / "Sayfa açılamadı"**: press **Reload** first. If it comes back, press **Clear the copy and reload**: it removes only the copies of the page kept on that phone or computer (the member's page and the home-screen copy), so the page comes fresh from GitHub; the person stays signed in and unsent answers are kept. The line under the buttons says what went wrong, which is useful in a screenshot.
- **The textures are missing (flat colours)**: the `tex-…webp` files aren't next to `index.html` on GitHub. Upload them; the page works without them, it just looks plainer.
- **A calendar app won't take the subscription link**: try the other button (or **Copy the link** and add it in the app as a calendar "from URL"). If it still won't, the **Calendar file** buttons under each meeting always work, they just don't update by themselves. A meeting you change shows up in subscribed calendars within a few hours (Google can take up to a day).
- **No Attendance tab, no reply buttons, no Groups**: the live web app is still running an older `Code.gs`. Deploy a **New version**.
- **No holidays list in the poll settings, no *Kimler çağrılı*, no *Her buluşmada olması gerekenler***: the same, an older `Code.gs` is live.
- **A member can't pick a day**: it may be closed (hatched, with its reason below the calendar; open it again in the poll's **Settings**), or one they said they'll be away (hatched the other way; see *Uzakta olacağım günler* on their Schedule page, or **Uzakta olacağı günler** next to their name in the Members tab).
- **The stage picture doesn't download on an iPhone**: use **Paylaş…** instead, then **Save Image** or send it on directly.
- **"Bu giriş bağlantısı artık çalışmıyor"**: the link was used already (on another phone, say), a newer one pushed it out, or you made a new password or organizer key since. Send a new one with **Giriş bağlantısı**. *Süresi dolmuş* means it's older than 7 days. *Okunamadı* means part of it went missing on the way: send it again. *Planlayıcı şu an meşgul* or no connection: the link still works, so **Tekrar dene** in a moment.
- **No Mesajlar tab, no Giriş bağlantısı buttons**: the live web app is still running an older `Code.gs` (deploy a **New version**).
- **No Repertuvar tab**: the live web app is still running an older `Code.gs` (deploy a **New version**). For members, the tab appears once a piece for their group is shown to members.
- **No Prova planı on the meetings' rows**: the live web app is still running an older `Code.gs` (deploy a **New version**).
- **A member doesn't see a meeting's plan**: check that **Üyelere göster** is ticked, that the meeting is published (not only saved on the draft), and that it calls them.
- **No Üyeler tab for members, no Profil under members in the planner**: the live web app is still running an older `Code.gs` (deploy a **New version**).
- **A member doesn't see someone's phone or birthday**: that person hasn't ticked the line on their profile that shares it; only you see it. Someone from another group isn't shown unless **Farklı gruplardaki üyeler birbirini görür** is on in the Members tab.
- **A member sees nobody under Üyeler**: they're in no group (the Members tab's **Show** filter has *In no group*).
- **A member can't open a link in the repertoire**: the file's own sharing decides. In Google Drive, set it to *Anyone with the link can view* (or share it with the members).
- **No Sahne tab**: the live web app is still running an older `Code.gs` (deploy a **New version**). For members, the tab appears once a plan for their group is shown to members.
- **A phone still shows the previous version**: GitHub Pages can take a minute or two to serve a new upload. After that, Provala loads it the next time it opens (on a slow connection, some 15 seconds into it), and a page left open shows *Provala’nın yeni sürümü hazır* within half an hour: press **Yenile**. Closing the app or the tab and opening it again gets it too.
- **An iPhone's home-screen app asks to sign in**: that's once, the first time (the app keeps its sign-in apart from Safari's). The username and password work, or a new **Giriş bağlantısı** copied and pasted into the username box.
- **Switching the home-screen copy off**: should it ever get in the way, replace `sw.js` on GitHub (open it there, press the pencil, replace everything) with these lines:

  ```js
  // Provala without the home-screen copy: each phone drops it the next time it opens Provala,
  // and from then on everything comes straight from GitHub.
  self.addEventListener('install', () => self.skipWaiting());
  self.addEventListener('activate', e => e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.indexOf('provala-') === 0).map(k => caches.delete(k))))
    .then(() => self.clients.claim())));
  ```

  Each phone drops the copy the next time it opens Provala, and from then on opens it straight from GitHub, as before this version. Icons already on home screens keep working. To turn it back on, upload the real `sw.js` again.
- **A member sees "no poll"**: they may be in no group, or the current poll may be for another group. Check their pickers in the Members tab (the **Show** filter has *In no group*) and the poll's groups in its settings.

## Try it first

The demo is a separate copy of the page with eight sample people, in which the real `Code.gs` runs inside the page, on a stand-in for the sheet kept in your browser (Claude builds it from these files; `index.html` itself always talks to your Apps Script, and with `API_URL` empty it says the address is missing). It comes with November's rehearsals published (with some replies, reasons and times), October's with attendance taken, and a second group, a chamber orchestra by instrument, with its own poll. Sign in with the username `deneme` and the password `demo`: that sample member sings in the choir and plays the viola, so their page has both groups' polls to switch between. They answered October, so November offers **Geçen ayki gibi doldur**; 24 November is closed (the hall is taken), and the men's sectional on 26 November isn't theirs. Open the demo with `#admin` at the end and use the key `demo` to see the planner: the tenor Can Aydın is needed at every meeting, and the section buttons are above the board. Pick *Ekim 2026* in the poll list to see Republic Day closed and to try taking attendance, and see the groups in the Members tab. The 10 November rehearsal has a plan (its **Prova planı** in the planner's **Takvim** tab), which ends a quarter of an hour before the meeting: the sample member, in no section of the choir, gets every row, so their own time is *19:00–20:45*. The **Üyeler** tab has the choir by section, with what some sample people share (Ayşe Demir's phone and birthday, Mehmet Kaya's offer of a lift from Beşiktaş); Elif Şahin told her phone without sharing it, so only the planner sees it. Under October's rehearsals the sample member sees who came. The sample member has already read the notice; a real member sees it the first time. The **Repertuvar** tab has the winter concert's pieces with sample links (a practice track for each voice part of *Ave Verum Corpus*), and the orchestra's piece with a viola part for the sample member. The **Sahne** tab has the winter concert's stage plan (two lineups, one in an arc, with the piano's place closed in the first); Selin Yıldız is away on the concert's date, so the plan warns about her. The sample member sees it in their own **Sahne** tab, and can turn it round as the singers see it. The **Mesajlar** tab has every ready-made message to rewrite, and **Giriş bağlantısı** in the Members tab copies a sign-in link message (in the demo, the link only works inside the demo). The 19 November rehearsal was moved from the 18th and the one on the 12th cancelled, so members see *Takvimde değişiklik* at the top of their page. Zeynep Arslan is away from 27 to 29 November, so the 28 November rehearsal shows her under *Gelemiyor* as *Uzakta*; the sample member can add their own days away on their Schedule page, and the hours they can never come. Can Aydın sings in another choir on Wednesday evenings, so his Wednesdays leave 18:00–19:30 out; in **Kişiler**, Zeynep's answer has a change (her 4 November) under *Değişiklikler*, and Deniz Öztürk's holiday was entered by the planner as him, after he phoned, so his answer says *şef düzenledi*; the orchestra's 28 November rehearsal overlaps the choir's dress rehearsal, so the **Takvim** tab says it clashes. The winter concert on 29 November is a concert: the sample member sees what to wear, when to be there and what to bring under it. October's rehearsals have the conductor's notes (the 13th with a recording link), so they show under those meetings and in *Bu sezonun geçmiş provaları*, and **Repertuvar** has each piece's history this season; *Ave Verum Corpus* has starting notes for each section, which play when tapped. The November meetings have venues (the rehearsal room in Kadıköy, the concert hall in Beşiktaş), with their addresses and a map link for members; the planner's **Mekânlar** tab has them with their costs and notes. Under the 19 November rehearsal, *Araç paylaşımı* has Mehmet Kaya's offer of three seats from Beşiktaş and Elif Şahin asking for a lift from Üsküdar, and the sample member can add their own. Emre Çelik hasn't opened Provala in over a month, so he is under *Arayıp sormaya değer* in the Katılım tab. The demo makes no backups.
