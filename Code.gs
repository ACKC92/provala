/**
 * Provala — backend for the availability planner (Google Apps Script)
 * ------------------------------------------------------------------
 * Everything people send is stored in a private Google Sheet in YOUR Google
 * account. The web page (index.html on GitHub Pages) only talks to this script;
 * nothing personal is ever stored on GitHub.
 *
 * Only members can use the page: you add them in the planner (Members tab), each
 * one gets a username and password, and nothing (poll, answers, schedule) is
 * shown or accepted without signing in. Passwords are stored as salted hashes.
 * Members never see each other's answers or notes: only how many people are free
 * (no names, updated daily, once five others have answered) and, for published
 * rehearsals, who can come by voice part. Replies to rehearsals (Geliyorum /
 * Kısmen / Gelemiyorum) and their notes go only to the organizer; a "Geliyorum"
 * just puts that name in the rehearsal's list.
 *
 * One-time setup (full walk-through in README.md):
 *   1. Go to script.google.com → New project. Replace the sample code with this
 *      whole file and save (Ctrl+S).
 *   2. In the toolbar, choose the function "setup" and click Run. Allow access
 *      when Google asks. The Execution log then shows:
 *        • the link to your new spreadsheet ("Provala data")
 *        • your organizer key (keep it private)
 *   3. Deploy → New deployment → type: Web app
 *        Execute as:      Me
 *        Who has access:  Anyone
 *      Click Deploy and copy the Web app URL (it ends with /exec).
 *      Paste it into index.html where it says API_URL.
 *
 * After you change this file later: Deploy → Manage deployments → pencil icon →
 * Version: "New version" → Deploy. The URL stays the same.
 *
 * Handy functions you can run from the editor:
 *   showOrganizerKey()  – prints your organizer key again
 *   newOrganizerKey()   – makes a new key (the old one stops working)
 *   signOutEveryone()   – ends every sign-in, members' and the planner's (passwords keep working)
 *
 * Calendar feeds: each member can subscribe to the published meetings from their phone's calendar with a
 * private link (this web app's URL + ?feed=…). The link only shows meeting times and places.
 */

var LIMITS = {
  name: 80, comment: 3000, note: 300, title: 120, message: 1500,
  place: 160, eventNote: 500, scheduleNote: 2000, events: 40,
  days: 93, responsesPerPoll: 400, cell: 45000,
  username: 40, password: 128, members: 400
};

var SESSION_DAYS = 180;     // a member stays signed in on a device this long
var ORGANIZER_DAYS = 30;    // the planner stays signed in on a device this long
var MAX_FAILS = 8;          // wrong passwords in a row before a username is paused
var MAX_KEY_FAILS = 10;     // wrong organizer keys before the planner is paused
var PAUSE_SECONDS = 900;    // ...for this long

var DATA_HEADER = 'Data (used by the app, please don’t edit)';

// What members see of each other. Never anyone's notes or comment. Without names: how many people are free
// (or free if needed) on each day and time, once answers from at least GROUP_MIN other people count, and
// updated once a day, so nobody can read someone's times off the change right after they send.
// By name: for each published rehearsal, who can come for all of it, by voice part.
var GROUP_MIN = 5;
var PARTS = ['S', 'A', 'T', 'B'];   // soprano, alto, tenor, bass ('' = not set)

var SHEETS = {
  polls: {
    name: 'Polls',
    headers: ['Poll ID', 'Title', 'From', 'To', 'Accepting answers', 'Updated', DATA_HEADER]
  },
  responses: {
    name: 'Responses',
    headers: ['Poll', 'Name', 'Updated', 'Comment', 'Availability (times in brackets = only if needed)', 'Day notes', DATA_HEADER]
  },
  schedules: {
    name: 'Schedules',
    headers: ['Poll ID', 'Published', 'Published meetings', DATA_HEADER]
  },
  members: {
    name: 'Members',
    headers: ['Member ID', 'Name', 'Username', 'Can sign in', 'Last sign-in', DATA_HEADER]
  },
  // Added in 2026-10: each is created the first time it's needed; nothing above changes.
  replies: {
    name: 'Replies',
    headers: ['Poll', 'Name', 'Updated', 'Replies to meetings', DATA_HEADER]
  },
  attendance: {
    name: 'Attendance',
    headers: ['Poll', 'Meeting', 'Title', 'Came', 'Absent', 'Updated', DATA_HEADER]
  },
  errors: {
    name: 'Errors',
    headers: ['When', 'Page', 'Error', 'Browser', DATA_HEADER]
  }
};

// What this backend can do, so a page can show only what works (an older Code.gs sends none of these).
var CAPS = ['replies', 'attendance', 'feed', 'reports'];
var REPLY = { yes: 'Geliyorum', part: 'Kısmen', no: 'Gelemiyorum' };   // also the words in the Replies sheet
var MARKS = { p: 'Geldi', l: 'Geç geldi', e: 'İzinli', a: 'Gelmedi' }; // attendance marks, and their words in the sheet
// Is k one of the table's own keys? (Not "constructor" or "__proto__", which every object answers to.)
function own_(table, k) { return typeof k === 'string' && Object.prototype.hasOwnProperty.call(table, k); }

/* ------------------------------------------------------------------ setup */

function setup() {
  var ss = openDb_(true);
  var key = props_().ADMIN_KEY;
  if (!key) {
    key = token_(24);
    setProp_('ADMIN_KEY', key);
  }
  secret_('PW_SECRET');
  secret_('AUTH_SECRET');
  Logger.log('Your data spreadsheet: ' + ss.getUrl());
  Logger.log('Your organizer key: ' + key);
  Logger.log('Next: Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).');
  Logger.log('Then add your members in the planner (Members tab). Each one gets a username and password.');
}

function showOrganizerKey() {
  Logger.log('Your organizer key: ' + props_().ADMIN_KEY);
}

function newOrganizerKey() {
  var key = token_(24);
  setProp_('ADMIN_KEY', key);
  Logger.log('New organizer key: ' + key + '   (the old key no longer works)');
}

function signOutEveryone() {
  setProp_('AUTH_SECRET', token_(48));
  Logger.log('Every member is signed out. Their usernames and passwords still work.');
}

/* ------------------------------------------------------------- web entry */

// Opening the web app URL in a browser only confirms it is running. All data needs a sign-in.
// The one exception: a member's private calendar link (?feed=…) gets the published meetings as a calendar.
function doGet(e) {
  beginRequest_();
  var feed = e && e.parameter && e.parameter.feed;
  if (feed) {
    try { return feed_(String(feed)); } catch (x) { console.error(x && x.stack ? x.stack : x); return ContentService.createTextOutput('Not available').setMimeType(ContentService.MimeType.TEXT); }
  }
  return respond_(function () { return { app: 'Provala' }; });
}

function doPost(e) {
  beginRequest_();
  return respond_(function () {
    var raw = (e && e.postData && e.postData.contents) || '';
    var body;
    try { body = JSON.parse(raw || '{}'); } catch (x) { throw fail_('invalid', 'Body is not JSON'); }
    if (!body || typeof body !== 'object') throw fail_('invalid', 'Body is not an object');
    switch (body.action) {
      case 'login': return login_(body);
      case 'state': return memberState_(body);
      case 'submit': return submit_(body);
      case 'password': return changePassword_(body);
      case 'reply': return reply_(body);
      case 'feed': return feedLink_(body);
      case 'history': return history_(body);
      case 'report': return report_(body);
      case 'admin': return admin_(body);
    }
    throw fail_('unknown_action');
  });
}

function respond_(fn) {
  var out;
  try {
    out = fn() || {};
    out.ok = true;
  } catch (x) {
    if (!x || !x.code) console.error(x && x.stack ? x.stack : x);
    out = { ok: false, error: (x && x.code) || 'server_error', message: String((x && x.message) || x) };
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

/* ------------------------------------------------------- member reads */

// Everything a signed-in member needs in one call: who they are, the poll, the published schedule,
// their own answer (never anyone else's), the group's numbers and who can come to each rehearsal.
function memberState_(b) {
  return stateFor_(memberFromSession_(b.session), b.p);
}

// memberRows: the Members table if the caller already has it (saves reading it again).
function stateFor_(m, p, memberRows) {
  var id = cleanId_(p) || currentPollId_();
  var found = id ? findPoll_(id) : null;
  var out = { member: memberInfo_(m), poll: null, schedule: null, mine: null, group: null, attend: null, replies: null, more: [], caps: CAPS };
  var ms = (memberRows || table_('members').rows).map(function (r) { return r.data; });
  var responses = table_('responses').rows.map(function (r) { return r.data; });
  // The Replies sheet is read only if some published meeting needs it.
  var replies = null;
  var repliesOf = function (pollId) { if (!replies) replies = repliesByPoll_(); return replies[pollId] || {}; };
  if (found) {
    var poll = found.poll;
    var sch = findSchedule_(poll.id);
    var mine = findResponse_(poll.id, m.id);
    var rs = answersOf_(poll, responses, ms, dayOf_(new Date(), poll));
    out.poll = publicPoll_(poll);
    out.schedule = sch && sch.data.published ? sch.data.published : null;
    out.mine = mine ? responseOut_(mine.data) : null;
    out.group = groupFor_(poll, rs, m.id);
    if (out.schedule) {
      var rp = repliesOf(poll.id);
      out.attend = attendFor_(poll, out.schedule.events, rs, ms, rp);
      out.replies = myReplies_(rp[m.id], out.schedule.events);
    }
  }
  out.more = moreFor_(m, found ? found.poll.id : '', ms, responses, repliesOf);
  return out;
}

// Meetings still to come from other polls' published schedules, so last month's rehearsals stay in reach
// (to see and to reply to) once next month's poll is the current one. The same rules as the shown poll's.
function moreFor_(m, shownId, ms, responses, repliesOf) {
  var polls = {};
  table_('polls').rows.forEach(function (r) { polls[r.data.id] = r.data; });
  var list = [];
  table_('schedules').rows.forEach(function (r) {
    var pub = r.data.published, poll = polls[r.data.pollId];
    if (!pub || !poll || poll.id === shownId) return;
    var today = dayOf_(new Date(), poll);
    var events = (pub.events || []).filter(function (ev) { return ev.date >= today; });
    if (events.length) list.push({ poll: poll, pub: pub, events: events });
  });
  list.sort(function (a, b) { return a.events[0].date < b.events[0].date ? -1 : a.events[0].date > b.events[0].date ? 1 : 0; });
  return list.slice(0, 3).map(function (x) {
    var rp = repliesOf(x.poll.id);
    return {
      poll: publicPoll_(x.poll),
      schedule: { events: x.events, note: x.pub.note || '', at: x.pub.at },
      attend: attendFor_(x.poll, x.events, answersOf_(x.poll, responses, ms, ''), ms, rp),
      replies: myReplies_(rp[m.id], x.events)
    };
  });
}

// The answers that count for the group: this poll's, from people who are still members. Only what the
// group needs, never notes or comments: `avail` is the answer now (for who can come to a rehearsal),
// `counted` the answer as it stood at the start of `today` (for the numbers; null if it's new today).
function answersOf_(poll, responses, ms, today) {
  var byId = {};
  ms.forEach(function (x) { byId[x.id] = x; });
  var out = [];
  responses.forEach(function (d) {
    var who = d.pollId === poll.id && d.memberId ? byId[d.memberId] : null;
    if (who) out.push({ id: who.id, name: who.name, part: partOf_(who), avail: d.avail || {}, counted: today ? countedAvail_(d, today, poll) : null });
  });
  return out;
}

// Changes made today count from tomorrow (see submit_, which keeps the answer as it was before today's
// first change). So the numbers only move once a day, all answers of a day together.
function countedAvail_(d, today, poll) {
  var changed = d.updated ? dayOf_(new Date(d.updated), poll) : '';
  if (changed && changed < today) return d.avail || {};
  if (d.base && d.base.day === today) return d.base.avail || {};
  return null;
}

// The calendar day (yyyy-MM-dd) of a moment, in the poll's time zone.
function dayOf_(date, poll) {
  if (!date || isNaN(date.getTime())) return '';
  try { return Utilities.formatDate(date, (poll && poll.tz) || Session.getScriptTimeZone(), 'yyyy-MM-dd'); }
  catch (x) { return date.toISOString().slice(0, 10); }
}

// An answer with at least one time marked inside the poll.
function hasTimes_(avail, poll) {
  var n = slotCount_(poll);
  return Object.keys(avail).some(function (d) { var s = avail[d]; return inPoll_(d, poll) && typeof s === 'string' && s.length === n && /[12]/.test(s); });
}

// How many people are free on each day, with no names: for every time slot, how many are free and how
// many could come if needed, and the most people free together for a meeting of the usual length.
// Only answers with times count, and nothing is shown until there are GROUP_MIN of them besides the viewer's.
function groupFor_(poll, rs, viewerId) {
  var use = rs.filter(function (r) { return r.counted && hasTimes_(r.counted, poll); });
  var others = use.filter(function (r) { return r.id !== viewerId; }).length;
  var out = { answered: use.length, others: others, min: GROUP_MIN, days: null };
  if (others < GROUP_MIN) return out;
  var n = slotCount_(poll), L = Math.max(1, Math.ceil((poll.duration || 120) / poll.slot));
  var dates = {};
  use.forEach(function (r) { Object.keys(r.counted).forEach(function (d) { if (inPoll_(d, poll)) dates[d] = true; }); });
  var days = {};
  Object.keys(dates).sort().forEach(function (d) {
    var free = [], maybe = [], whole = [], i;
    for (i = 0; i < n; i++) { free.push(0); maybe.push(0); }
    for (i = 0; i + L <= n; i++) whole.push(0);
    use.forEach(function (r) {
      var s = r.counted[d];
      if (typeof s !== 'string' || s.length !== n) return;
      var run = 0;
      for (i = 0; i < n; i++) {
        var c = s.charAt(i);
        if (c === '2') { free[i]++; run++; } else { run = 0; if (c === '1') maybe[i]++; }
        if (run >= L) whole[i - L + 1]++;   // free for a whole meeting starting L slots back
      }
    });
    days[d] = { free: free, maybe: maybe, best: whole.length ? Math.max.apply(null, whole) : 0 };
  });
  out.days = days;
  return out;
}

// For each published meeting: who can come, by voice part, and how many members each part has.
// A member's own reply decides: Geliyorum lists them (also in `sure`), Kısmen or Gelemiyorum leaves them out.
// Without a reply, their poll answer does: free for the whole meeting. Nobody is named as missing, and
// "if needed" or "partly" isn't shown (in a small part it would point at one person). A meeting outside the
// poll's days and hours has no answers to go by: it lists those who said Geliyorum, once someone has (a list
// that appeared because of a Gelemiyorum would tell everyone that someone declined).
// rp: memberId -> that member's replies for this poll (from repliesMap_).
function attendFor_(poll, events, rs, ms, rp) {
  rp = rp || {};
  var n = slotCount_(poll);
  var used = PARTS.filter(function (pt) { return ms.some(function (x) { return partOf_(x) === pt; }); });
  var keys = used.concat(['']);
  var keyOf = function (part) { return used.length ? part : ''; };
  var avail = {};
  rs.forEach(function (r) { avail[r.id] = r.avail; });
  return (events || []).map(function (ev) {
    var inside = inPoll_(ev.date, poll) && ev.start >= poll.dayStart && ev.end <= poll.dayEnd;
    var s = Math.floor((ev.start - poll.dayStart) / poll.slot), e = Math.ceil((ev.end - poll.dayStart) / poll.slot);
    var groups = {}, replied = false;
    keys.forEach(function (k) { groups[k] = { part: k, yes: [], sure: [], of: 0 }; });
    ms.forEach(function (x) {
      var g = groups[keyOf(partOf_(x))];
      g.of++;
      var r = validReply_(rp[x.id] && rp[x.id][ev.id], ev);
      if (r) {
        if (r.s === 'yes') { g.yes.push(x.name); g.sure.push(x.name); replied = true; }
        return;
      }
      if (inside && windowState_(avail[x.id] && avail[x.id][ev.date], s, e, n) === 2) g.yes.push(x.name);
    });
    if (!inside && !replied) return { id: ev.id, parts: null };
    var byName = function (a, b) { return a.localeCompare(b, 'tr'); };
    return {
      id: ev.id,
      parts: keys.map(function (k) { return groups[k]; })
        .filter(function (g) { return g.part || g.of || g.yes.length; })
        .map(function (g) { g.yes.sort(byName); g.sure.sort(byName); return g; })
    };
  });
}

/* ------------------------------------------------------ replies to meetings */

// A reply belongs to the meeting as it was when the member answered: if its day or time changes, the
// reply no longer counts and the member is asked again.
function fp_(ev) { return ev.date + '|' + ev.start + '|' + ev.end; }
function validReply_(r, ev) { return r && own_(REPLY, r.s) && r.fp === fp_(ev) ? r : null; }

// memberId -> { eventId: { s, note, at, fp } } for one poll.
function repliesMap_(pollId) {
  return repliesByPoll_()[pollId] || {};
}
// pollId -> memberId -> replies, for every poll.
function repliesByPoll_() {
  var out = {};
  table_('replies').rows.forEach(function (r) {
    var d = r.data;
    if (d.pollId && d.memberId) (out[d.pollId] = out[d.pollId] || {})[d.memberId] = d.replies || {};
  });
  return out;
}

// A member's own replies to the published meetings, for their page: changed meetings are marked stale.
function myReplies_(mine, events) {
  var out = {};
  (events || []).forEach(function (ev) {
    var r = mine && own_(mine, ev.id) ? mine[ev.id] : null;
    if (!r || !own_(REPLY, r.s)) return;
    out[ev.id] = { s: r.s, note: r.note || '', at: r.at || '', stale: r.fp !== fp_(ev) };
  });
  return out;
}

function repliesSummary_(replies, events) {
  return (events || []).filter(function (ev) { return replies[ev.id]; }).map(function (ev) {
    var r = replies[ev.id];
    return fmtDate_(ev.date) + ' ' + hhmm_(ev.start) + ': ' + REPLY[r.s] + (r.note ? ' (' + r.note + ')' : '') + (r.fp !== fp_(ev) ? ' [gün ya da saat değişti]' : '');
  }).join('\n');
}

// Geliyorum / Kısmen / Gelemiyorum (s: yes / part / no; empty takes the reply back), with an optional note only
// the organizer sees. Until the end of the meeting's day. Answers with the fresh lists of who can come.
function reply_(b) {
  var m = memberFromSession_(b.session);
  var ms = table_('members').rows.map(function (r) { return r.data; });   // read already, for the session
  // Checked before taking the lock, so the lock is held only for the write: replies come in bursts after a reminder.
  var found = findPoll_(cleanId_(b.pollId));
  if (!found) throw fail_('no_poll');
  var poll = found.poll;
  var sch = findSchedule_(poll.id);
  var events = sch && sch.data.published ? sch.data.published.events : [];
  var ev = events.filter(function (x) { return x.id === cleanId_(b.eventId); })[0];
  if (!ev) throw fail_('no_event');
  if (ev.date < dayOf_(new Date(), poll)) throw fail_('past');
  // yes, part or no; '' takes the reply back; anything else is refused.
  if (typeof b.s !== 'string' || (b.s !== '' && !own_(REPLY, b.s))) throw fail_('invalid', 's');
  var s = b.s;
  var res = withLock_(function () {
    var t = table_('replies');
    var existing = null;
    for (var i = 0; i < t.rows.length; i++) if (t.rows[i].data.pollId === poll.id && t.rows[i].data.memberId === m.id) existing = t.rows[i];
    var now = new Date();
    var data = existing ? existing.data : { id: 'y' + token_(12), pollId: poll.id, memberId: m.id, created: now.toISOString(), replies: {} };
    data.name = m.name;
    data.replies = data.replies || {};
    if (s) data.replies[ev.id] = { s: s, note: text_(b.note, LIMITS.note, false), at: now.toISOString(), fp: fp_(ev) };
    else delete data.replies[ev.id];
    // Replies to meetings that are no longer in the schedule go.
    var live = {};
    events.forEach(function (x) { live[x.id] = true; });
    Object.keys(data.replies).forEach(function (k) { if (!live[k]) delete data.replies[k]; });
    data.updated = now.toISOString();
    writeRow_('replies', existing ? existing.row : 0, [pollLabel_(poll), m.name, now, repliesSummary_(data.replies, events), JSON.stringify(data)]);
    var all = {};
    t.rows.forEach(function (r) { if (r.data.pollId === poll.id && r.data.memberId) all[r.data.memberId] = r.data.replies || {}; });
    all[m.id] = data.replies;
    return { poll: poll, events: events, rp: all, mine: data.replies };
  });
  var rs = answersOf_(res.poll, table_('responses').rows.map(function (r) { return r.data; }), ms, '');
  return { replies: myReplies_(res.mine, res.events), attend: attendFor_(res.poll, res.events, rs, ms, res.rp) };
}

/* ------------------------------------------------------ attendance */

// The organizer records who came to a published meeting: p (came), l (came late), e (excused), a (absent).
// Members left out simply aren't recorded for that meeting.
function saveAttendance_(b) {
  var found = findPoll_(cleanId_(b.pollId));
  if (!found) throw fail_('no_poll');
  var poll = found.poll;
  var sch = findSchedule_(poll.id);
  var events = sch && sch.data.published ? sch.data.published.events : [];
  var ev = events.filter(function (x) { return x.id === cleanId_(b.eventId); })[0];
  if (!ev) throw fail_('no_event');
  var names = {};
  table_('members').rows.forEach(function (r) { names[r.data.id] = r.data.name; });
  var marks = {};
  var given = b.marks && typeof b.marks === 'object' ? b.marks : {};
  Object.keys(given).forEach(function (id) { if (own_(names, id) && own_(MARKS, given[id])) marks[id] = given[id]; });
  var guests = Math.max(0, Math.min(500, int_(b.guests) || 0));
  // Nothing marked and no guests: no attendance for this meeting (an empty record would count as a meeting
  // with attendance taken, and nobody there).
  if (!Object.keys(marks).length && !guests) {
    deleteRowsWhere_('attendance', function (d) { return d.pollId === poll.id && d.eventId === ev.id; });
    return { attendance: null };
  }
  var t = table_('attendance');
  var existing = null;
  for (var i = 0; i < t.rows.length; i++) if (t.rows[i].data.pollId === poll.id && t.rows[i].data.eventId === ev.id) existing = t.rows[i];
  var now = new Date();
  var data = existing ? existing.data : { id: 'a' + token_(10), pollId: poll.id, eventId: ev.id, created: now.toISOString() };
  data.date = ev.date; data.start = ev.start; data.end = ev.end; data.title = ev.title || ''; data.poll = pollLabel_(poll);
  data.marks = marks; data.guests = guests; data.updated = now.toISOString();
  var who = function (codes) {
    return Object.keys(marks).filter(function (id) { return codes.indexOf(marks[id]) !== -1; })
      .map(function (id) { return names[id] + (marks[id] === 'l' ? ' (geç)' : ''); })
      .sort(function (x, y) { return x.localeCompare(y, 'tr'); }).join(', ');
  };
  writeRow_('attendance', existing ? existing.row : 0, [
    pollLabel_(poll), fmtDate_(ev.date) + ' ' + hhmm_(ev.start), ev.title || '', who(['p', 'l']) + (guests ? ' + ' + guests + ' misafir' : ''), who(['a']), now, JSON.stringify(data)
  ]);
  return { attendance: attendanceOut_(data) };
}

// Removes one meeting's attendance record: for a meeting no longer on the schedule, whose record can't be
// opened and saved again.
function deleteAttendance_(b) {
  var pollId = cleanId_(b.pollId), eventId = cleanId_(b.eventId);
  var n = deleteRowsWhere_('attendance', function (d) { return d.pollId === pollId && d.eventId === eventId; });
  if (!n) throw fail_('not_found');
  return {};
}

function attendanceOut_(d) {
  return { pollId: d.pollId, eventId: d.eventId, date: d.date, start: d.start, end: d.end, title: d.title || '', marks: d.marks || {}, guests: d.guests || 0, updated: d.updated || '' };
}

// The season record between two days, across every poll: each attendance taken, as it was taken (it keeps the
// meeting's day, time and title, so it stays even if the meeting is moved or removed, or its poll deleted; the
// same rows members' own history comes from), then the published meetings without attendance yet.
function season_(b) {
  var from = isDate_(b.from) ? b.from : '0000-01-01', to = isDate_(b.to) ? b.to : '9999-12-31';
  var polls = {};
  table_('polls').rows.forEach(function (r) { polls[r.data.id] = r.data; });
  var meetings = [], taken = {};
  table_('attendance').rows.forEach(function (r) {
    var a = r.data;
    if (!isDate_(a.date) || a.date < from || a.date > to) return;
    taken[a.pollId + '|' + a.eventId] = true;
    meetings.push({ pollId: a.pollId, eventId: a.eventId, date: a.date, start: a.start, end: a.end, title: a.title || '',
      poll: polls[a.pollId] ? pollLabel_(polls[a.pollId]) : a.poll || '', marks: a.marks || {}, guests: a.guests || 0 });
  });
  table_('schedules').rows.forEach(function (r) {
    var pub = r.data.published, poll = polls[r.data.pollId];
    if (!pub || !poll) return;
    pub.events.forEach(function (ev) {
      if (ev.date < from || ev.date > to || taken[poll.id + '|' + ev.id]) return;
      meetings.push({ pollId: poll.id, eventId: ev.id, date: ev.date, start: ev.start, end: ev.end, title: ev.title || '', poll: pollLabel_(poll),
        marks: null, guests: 0 });
    });
  });
  meetings.sort(function (x, y) { return x.date === y.date ? x.start - y.start : (x.date < y.date ? -1 : 1); });
  return { meetings: meetings, members: listMembers_(), from: from, to: to };
}

// The season runs from 1 September.
function seasonStart_(now) {
  var day = dayOf_(now, null);
  var y = Number(day.slice(0, 4));
  if (day.slice(5) < '09-01') y--;
  return y + '-09-01';
}

// A member's own attendance this season (never anyone else's).
function history_(b) {
  var m = memberFromSession_(b.session);
  var from = seasonStart_(new Date());
  var out = { from: from, p: 0, l: 0, e: 0, a: 0, meetings: [] };
  table_('attendance').rows.forEach(function (r) {
    var d = r.data, mk = d.marks && own_(d.marks, m.id) ? d.marks[m.id] : '';
    if (!own_(MARKS, mk) || !(d.date >= from)) return;
    out[mk]++;
    out.meetings.push({ date: d.date, start: d.start, title: d.title || '', mark: mk });
  });
  out.meetings.sort(function (x, y) { return x.date < y.date ? 1 : x.date > y.date ? -1 : 0; });
  return { history: out };
}

/* ------------------------------------------------------ calendar feed */

// The member's private calendar link: made on first ask, or anew (the old link stops working).
function feedLink_(b) {
  var m = memberFromSession_(b.session);
  return withLock_(function () {
    var f = findMember_(m.id);
    if (!f) throw fail_('auth_required');
    if (!f.data.feed || b.renew) {
      f.data.feed = token_(32);
      writeMember_(f.row, f.data);
    }
    return { feed: f.data.feed };
  });
}

// Published meetings of every poll from four months back, as an iCalendar feed, with a reminder two hours
// before. A meeting the member said they can't come to says so in its title. Times are given in UTC.
function feed_(token) {
  if (!/^[A-Za-z0-9]{20,64}$/.test(token)) return ContentService.createTextOutput('Not found').setMimeType(ContentService.MimeType.TEXT);
  var who = findMemberBy_('feed', token);
  if (!who || who.data.active === false) return ContentService.createTextOutput('Not found').setMimeType(ContentService.MimeType.TEXT);
  var m = who.data;
  var since = dayOf_(new Date(Date.now() - 120 * 864e5), null);
  var polls = {};
  table_('polls').rows.forEach(function (r) { polls[r.data.id] = r.data; });
  var mine = {}, lang = 'tr';
  table_('replies').rows.forEach(function (r) { if (r.data.memberId === m.id) mine[r.data.pollId] = r.data.replies || {}; });
  table_('responses').rows.forEach(function (r) { if (r.data.memberId === m.id && r.data.lang === 'en') lang = 'en'; });
  var now = icsStamp_(new Date());
  var esc = function (v) { return String(v || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n'); };
  var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Provala//Planner//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'X-WR-CALNAME:Provala', 'REFRESH-INTERVAL;VALUE=DURATION:PT6H', 'X-PUBLISHED-TTL:PT6H'];
  table_('schedules').rows.forEach(function (r) {
    var pub = r.data.published, poll = polls[r.data.pollId];
    if (!pub || !poll) return;
    var tz = poll.tz || Session.getScriptTimeZone();
    var name = (lang === 'en' ? poll.title.en || poll.title.tr : poll.title.tr || poll.title.en) || 'Provala';
    pub.events.forEach(function (ev) {
      if (ev.date < since) return;
      var rp = validReply_(mine[poll.id] && mine[poll.id][ev.id], ev);
      var title = (ev.title || name) + (rp && rp.s === 'no' ? (lang === 'en' ? ' (can’t come)' : ' (gelemiyorum)') : '');
      var desc = [ev.note || '', rp ? (lang === 'en' ? 'Your reply: ' : 'Yanıtınız: ') + (lang === 'en' ? { yes: 'coming', part: 'partly', no: 'can’t come' }[rp.s] : REPLY[rp.s]) : ''].filter(String).join('\n');
      // The poll's id is part of the event's identity, so meetings of different polls never merge in a calendar.
      lines.push('BEGIN:VEVENT', 'UID:' + poll.id + '.' + ev.id + '@provala', 'DTSTAMP:' + now,
        'DTSTART:' + icsStamp_(utcOf_(ev.date, ev.start, tz)), 'DTEND:' + icsStamp_(utcOf_(ev.date, ev.end, tz)),
        'SUMMARY:' + esc(title));
      if (ev.place) lines.push('LOCATION:' + esc(ev.place));
      if (desc) lines.push('DESCRIPTION:' + esc(desc));
      if (pub.at) lines.push('LAST-MODIFIED:' + icsStamp_(new Date(pub.at)));
      // A reminder two hours before, except for a meeting the member said they can't come to.
      if (!(rp && rp.s === 'no')) lines.push('BEGIN:VALARM', 'ACTION:DISPLAY', 'TRIGGER:-PT2H', 'DESCRIPTION:' + esc(title), 'END:VALARM');
      lines.push('END:VEVENT');
    });
  });
  lines.push('END:VCALENDAR');
  return ContentService.createTextOutput(lines.map(foldIcs_).join('\r\n') + '\r\n').setMimeType(ContentService.MimeType.ICAL);
}

// Minutes east of UTC for this moment in this time zone ("+0300" -> 180).
function tzOffset_(date, tz) {
  try {
    var z = /^([+-])(\d\d)(\d\d)$/.exec(Utilities.formatDate(date, tz, 'Z'));
    if (z) return (z[1] === '-' ? -1 : 1) * (Number(z[2]) * 60 + Number(z[3]));
  } catch (x) { /* unknown zone: UTC */ }
  return 0;
}
// The moment of a day and minute (24:00 = next midnight) in a time zone.
function utcOf_(day, minute, tz) {
  var guess = Date.parse(day + 'T00:00:00Z') + minute * 60000;
  var off = tzOffset_(new Date(guess), tz);
  var t = guess - off * 60000;
  var off2 = tzOffset_(new Date(t), tz);   // across a clock change the offset at the result can differ
  return new Date(off2 === off ? t : guess - off2 * 60000);
}
function icsStamp_(date) { return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }
// iCalendar lines are folded at 75 bytes (UTF-8).
function foldIcs_(line) {
  var out = [], cur = '', bytes = 0;
  for (var i = 0; i < line.length; i++) {
    var c = line.charAt(i), code = line.charCodeAt(i), b = code < 0x80 ? 1 : code < 0x800 ? 2 : (code >= 0xd800 && code < 0xdc00) ? 4 : (code >= 0xdc00 && code < 0xe000) ? 0 : 3;
    if (b && bytes + b > (out.length ? 74 : 75)) { out.push(cur); cur = ''; bytes = 0; }
    cur += c; bytes += b;
  }
  out.push(cur);
  return out.join('\r\n ');
}

/* ------------------------------------------------------ error reports */

// A page that fails sends what went wrong (the error text, where, and the browser; never names or answers).
// At most 30 an hour; the sheet keeps the latest 500.
var REPORT_WHERE = ['start', 'stuck', 'render', 'member', 'schedule', 'admin', 'login'];
function report_(b) {
  var data = { msg: text_(b.msg, 300, false), stack: text_(b.stack, 1500, true), where: text_(b.where, 20, false), ua: text_(b.ua, 200, false), v: text_(b.v, 20, false) };
  if (!data.msg) return {};
  if (REPORT_WHERE.indexOf(data.where) === -1) data.where = '';
  if (!/^[0-9A-Za-z.-]{1,20}$/.test(data.v)) data.v = '';
  var cache = CacheService.getScriptCache();
  var hour = Math.floor(Date.now() / 36e5);
  var key = 'reports:' + hour, seenKey = 'report:' + hour + ':' + hash_(data.msg);
  if (cache.get(seenKey)) return {};   // the same problem was reported this hour already
  var n = Number(cache.get(key) || 0);
  if (n >= 30) return {};
  cache.put(key, String(n + 1), 3700);
  cache.put(seenKey, '1', 3700);
  var sh = sheet_('errors');
  var last = sh.getLastRow();
  if (last > 600) sh.deleteRows(2, last - 500);
  sh.appendRow([new Date(), data.where, data.msg, data.ua, JSON.stringify(data)].map(safeCell_));
  var info = {};
  try { info = JSON.parse(props_().ERRORS || '{}') || {}; } catch (x) { info = {}; }
  info.n = (info.n || 0) + 1;
  info.last = new Date().toISOString();
  setProp_('ERRORS', JSON.stringify(info));
  return {};
}

// A short fingerprint of a text (FNV-1a), for cache keys.
function hash_(s) {
  var h = 0x811c9dc5;
  for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0; }
  return h.toString(16);
}

// 2 = free for all of slots [s, e), 1 = all of it at least "if needed", 0 = not.
function windowState_(str, s, e, n) {
  if (typeof str !== 'string' || str.length !== n) return 0;
  var st = 2;
  for (var i = s; i < e; i++) {
    var c = str.charAt(i);
    if (c === '1') st = 1; else if (c !== '2') return 0;
  }
  return st;
}

function partOf_(m) { return m && PARTS.indexOf(m.part) !== -1 ? m.part : ''; }

function publicPoll_(p) {
  return {
    id: p.id, title: p.title, message: p.message, start: p.start, end: p.end,
    days: p.days, dayStart: p.dayStart, dayEnd: p.dayEnd, slot: p.slot,
    duration: p.duration, deadline: p.deadline || '', open: !!p.open, tz: p.tz || ''
  };
}

function responseOut_(d) {
  return {
    id: d.id, pollId: d.pollId, name: d.name, lang: d.lang, avail: d.avail || {},
    notes: d.notes || {}, comment: d.comment || '', updated: d.updated
  };
}

/* ------------------------------------------------------- member writes */

function submit_(b) {
  var m = memberFromSession_(b.session);
  var ms = table_('members').rows.map(function (r) { return r.data; });   // read already, for the session
  var res = withLock_(function () {
    var found = findPoll_(cleanId_(b.pollId));
    if (!found) throw fail_('no_poll');
    var poll = found.poll;
    if (!poll.open) throw fail_('closed');

    var avail = cleanAvail_(b.avail, poll);
    var notes = cleanNotes_(b.notes, poll);
    var comment = text_(b.comment, LIMITS.comment, true);
    var lang = b.lang === 'en' ? 'en' : 'tr';
    // "If needed" needs a reason: a note on that day, or the general comment.
    if (!comment) {
      Object.keys(avail).forEach(function (day) {
        if (avail[day].indexOf('1') !== -1 && !notes[day]) throw fail_('note_needed', day);
      });
    }

    var t = table_('responses');
    var existing = null;
    var count = 0;
    for (var i = 0; i < t.rows.length; i++) {
      var d = t.rows[i].data;
      if (d.pollId !== poll.id) continue;
      count++;
      if (d.memberId === m.id) existing = t.rows[i];
    }
    if (!existing && count >= LIMITS.responsesPerPoll) throw fail_('full');

    var now = new Date();
    var data = existing ? existing.data : {
      id: 'r' + token_(12), pollId: poll.id, memberId: m.id, created: now.toISOString()
    };
    // The group's numbers use the answer as it was at the start of the day; keep that before today's first change.
    var today = dayOf_(now, poll);
    if (existing && (!data.updated || dayOf_(new Date(data.updated), poll) !== today)) data.base = { day: today, avail: data.avail || {} };
    data.name = m.name;
    data.lang = lang;
    data.avail = avail;
    data.notes = notes;
    data.comment = comment;
    data.updated = now.toISOString();

    var json = JSON.stringify(data);
    if (json.length > LIMITS.cell && data.base) { delete data.base; json = JSON.stringify(data); }
    if (json.length > LIMITS.cell) throw fail_('too_large');
    writeRow_('responses', existing ? existing.row : 0, [
      pollLabel_(poll), m.name, now, comment, availSummary_(avail, poll), notesSummary_(notes), json
    ]);
    var all = t.rows.map(function (r) { return r.data; });
    if (!existing) all.push(data);
    return { id: data.id, updated: data.updated, poll: poll, all: all };
  });
  // Who can come to each published rehearsal changes with this answer at once (worked out after the lock).
  var out = { id: res.id, updated: res.updated };
  var sch = findSchedule_(res.poll.id);
  if (sch && sch.data.published) out.attend = attendFor_(res.poll, sch.data.published.events, answersOf_(res.poll, res.all, ms, ''), ms, repliesMap_(res.poll.id));
  return out;
}

function findResponse_(pollId, memberId) {
  var t = table_('responses');
  for (var i = 0; i < t.rows.length; i++) {
    var d = t.rows[i].data;
    if (d.pollId === pollId && d.memberId === memberId) return t.rows[i];
  }
  return null;
}

/* ------------------------------------------------------ signing in */

function login_(b) {
  var username = userKey_(b.username);
  var password = typeof b.password === 'string' ? b.password : '';
  if (!username || !password || password.length > LIMITS.password) {
    Utilities.sleep(700);
    throw fail_('bad_login');
  }
  var cache = CacheService.getScriptCache();
  var failKey = 'fail:' + username;
  var fails = Number(cache.get(failKey) || 0);
  if (fails >= MAX_FAILS) throw fail_('locked');
  var found = findMemberBy_('username', username);
  if (!found || found.data.active === false || !same_(hashPw_(password, found.data.salt), found.data.hash)) {
    cache.put(failKey, String(fails + 1), PAUSE_SECONDS);
    Utilities.sleep(700);
    throw fail_('bad_login');
  }
  cache.remove(failKey);
  var rows = null;
  var m = withLock_(function () {
    var f = findMember_(found.data.id);
    if (!f) throw fail_('bad_login');
    rows = table_('members').rows;
    f.data.lastLogin = new Date().toISOString();
    writeMember_(f.row, f.data);
    return f.data;
  });
  // The member's page comes with the sign-in, so the browser doesn't have to ask again.
  return { session: makeSession_(m), member: memberInfo_(m), state: stateFor_(m, b.p, rows) };
}

function changePassword_(b) {
  var m = memberFromSession_(b.session);
  var old = typeof b.old === 'string' ? b.old : '';
  var next = typeof b.next === 'string' ? b.next : '';
  if (next.length < 6 || next.length > LIMITS.password) throw fail_('weak_password');
  if (!same_(hashPw_(old, m.salt), m.hash)) {
    Utilities.sleep(700);
    throw fail_('bad_password');
  }
  return withLock_(function () {
    var f = findMember_(m.id);
    setPassword_(f.data, next);
    writeMember_(f.row, f.data);
    // Other devices are signed out; this one gets a fresh sign-in.
    return { session: makeSession_(f.data) };
  });
}

/* ------------------------------------------------------------- organizer */

// The planner accepts the organizer key itself, or a 30-day planner sign-in made from it
// (so the browser never has to keep the key). Repeated wrong keys pause the planner for a while.
function admin_(b) {
  var key = props_().ADMIN_KEY;
  var cache = CacheService.getScriptCache();
  var fails = Number(cache.get('fail:organizer') || 0);
  if (fails >= MAX_KEY_FAILS) throw fail_('locked');
  var withKey = !!key && same_(b.key, key);
  if (!withKey && !organizerSessionOk_(b.key, key)) {
    cache.put('fail:organizer', String(fails + 1), PAUSE_SECONDS);
    Utilities.sleep(700);
    throw fail_('bad_key');
  }
  var signIn = withKey ? { session: makeOrganizerSession_(key) } : {};
  switch (b.op) {
    case 'check': return signIn;
    case 'state': return Object.assign(adminState_(b.withPoll), signIn);
    case 'poll': return adminPoll_(cleanId_(b.pollId));
    case 'savePoll': return withLock_(function () { return savePoll_(b.poll || {}); });
    case 'setCurrent': return withLock_(function () { return setCurrent_(cleanId_(b.pollId)); });
    case 'deletePoll': return withLock_(function () { return deletePoll_(cleanId_(b.pollId), b.attendance === true); });
    case 'deleteResponse': return withLock_(function () { return deleteResponse_(cleanId_(b.id)); });
    case 'saveSchedule': return withLock_(function () { return saveSchedule_(b); });
    case 'members': return { members: listMembers_() };
    case 'addMembers': return withLock_(function () { return addMembers_(b.names); });
    case 'resetMember': return withLock_(function () { return resetMember_(cleanId_(b.id)); });
    case 'removeMember': return withLock_(function () { return removeMember_(cleanId_(b.id)); });
    case 'setPart': return withLock_(function () { return setPart_(cleanId_(b.id), b.part); });
    case 'saveAttendance': return withLock_(function () { return saveAttendance_(b); });
    case 'deleteAttendance': return withLock_(function () { return deleteAttendance_(b); });
    case 'season': return season_(b);
  }
  throw fail_('unknown_action');
}

// The list of polls. With withPoll (a poll id, or '' for the current one) the planner also gets
// that poll's answers in the same call, so it opens with one request instead of two.
function adminState_(withPoll) {
  var t = table_('polls');
  var counts = {};
  table_('responses').rows.forEach(function (r) {
    counts[r.data.pollId] = (counts[r.data.pollId] || 0) + 1;
  });
  var polls = t.rows.map(function (r) {
    var p = r.data;
    p.answers = counts[p.id] || 0;
    return p;
  });
  polls.sort(function (a, b) { return a.start < b.start ? 1 : a.start > b.start ? -1 : 0; });
  var errors = {};
  try { errors = JSON.parse(props_().ERRORS || '{}') || {}; } catch (x) { errors = {}; }
  var out = { polls: polls, currentId: currentPollId_(), caps: CAPS, errors: { n: errors.n || 0, last: errors.last || '' } };
  if (typeof withPoll === 'string') {
    var has = function (id) { return !!id && polls.some(function (p) { return p.id === id; }); };
    var pick = has(cleanId_(withPoll)) ? cleanId_(withPoll) : has(out.currentId) ? out.currentId : (polls[0] ? polls[0].id : '');
    out.pollData = pick ? adminPoll_(pick) : null;
  }
  return out;
}

function adminPoll_(id) {
  var found = findPoll_(id);
  if (!found) throw fail_('no_poll');
  var responses = table_('responses').rows
    .filter(function (r) { return r.data.pollId === id; })
    .map(function (r) {
      var d = r.data;
      return {
        id: d.id, memberId: d.memberId || '', name: d.name, lang: d.lang, avail: d.avail || {}, notes: d.notes || {},
        comment: d.comment || '', created: d.created, updated: d.updated
      };
    });
  var sch = findSchedule_(id);
  // Replies to the published meetings (with their notes) and attendance taken, for the Rehearsals tab.
  var replies = table_('replies').rows.filter(function (r) { return r.data.pollId === id; })
    .map(function (r) { return { memberId: r.data.memberId, name: r.data.name, replies: r.data.replies || {}, updated: r.data.updated || '' }; });
  var attendance = table_('attendance').rows.filter(function (r) { return r.data.pollId === id; })
    .map(function (r) { return attendanceOut_(r.data); });
  return {
    poll: found.poll,
    responses: responses,
    members: listMembers_(),
    schedule: { draft: sch ? sch.data.draft || null : null, published: sch ? sch.data.published || null : null },
    replies: replies,
    attendance: attendance,
    currentId: currentPollId_()
  };
}

function savePoll_(p) {
  var t = table_('polls');
  var existing = null;
  var givenId = cleanId_(p.id);
  if (givenId) {
    for (var i = 0; i < t.rows.length; i++) if (t.rows[i].data.id === givenId) existing = t.rows[i];
    if (!existing) throw fail_('no_poll');
  }
  var now = new Date();
  var poll = existing ? existing.data : { id: 'p' + token_(10), created: now.toISOString() };
  var answered = existing ? countAnswers_(poll.id) > 0 : false;

  var title = {
    tr: text_(p.title && p.title.tr, LIMITS.title, false),
    en: text_(p.title && p.title.en, LIMITS.title, false)
  };
  if (!title.tr && !title.en) throw fail_('invalid', 'title');
  var message = {
    tr: text_(p.message && p.message.tr, LIMITS.message, true),
    en: text_(p.message && p.message.en, LIMITS.message, true)
  };
  if (!isDate_(p.start) || !isDate_(p.end) || p.end < p.start) throw fail_('invalid', 'dates');
  if (dayDiff_(p.start, p.end) >= LIMITS.days) throw fail_('invalid', 'range');
  var days = [];
  (Array.isArray(p.days) ? p.days : []).forEach(function (d) {
    d = Number(d);
    if (d >= 0 && d <= 6 && Math.floor(d) === d && days.indexOf(d) === -1) days.push(d);
  });
  if (!days.length) throw fail_('invalid', 'days');
  days.sort();

  var dayStart = int_(p.dayStart), dayEnd = int_(p.dayEnd), slot = int_(p.slot);
  if (answered) {
    dayStart = poll.dayStart; dayEnd = poll.dayEnd; slot = poll.slot;
  } else {
    if ([15, 30, 60].indexOf(slot) === -1) throw fail_('invalid', 'slot');
    if (!(dayStart >= 0 && dayEnd > dayStart && dayEnd <= 1440)) throw fail_('invalid', 'hours');
    if (dayStart % slot || (dayEnd - dayStart) % slot) throw fail_('invalid', 'hours');
  }
  var duration = int_(p.duration);
  if (!(duration >= 15 && duration <= 720)) duration = 120;
  var deadline = isDate_(p.deadline) ? p.deadline : '';

  poll.title = title;
  poll.message = message;
  poll.start = p.start;
  poll.end = p.end;
  poll.days = days;
  poll.dayStart = dayStart;
  poll.dayEnd = dayEnd;
  poll.slot = slot;
  poll.duration = duration;
  poll.deadline = deadline;
  poll.open = p.open !== false;
  // Fixed once someone has answered, like the hours: the day the group's numbers move on depends on it.
  poll.tz = (answered && poll.tz) || text_(p.tz, 60, false) || poll.tz || Session.getScriptTimeZone();
  poll.updated = now.toISOString();
  delete poll.answers;

  writeRow_('polls', existing ? existing.row : 0, [
    poll.id, pollLabel_(poll), fmtDate_(poll.start), fmtDate_(poll.end), poll.open ? 'Yes' : 'No', now, JSON.stringify(poll)
  ]);
  if (!currentPollId_()) setProp_('CURRENT_POLL', poll.id);
  poll.answers = existing ? countAnswers_(poll.id) : 0;
  return { poll: poll, currentId: currentPollId_() };
}

function setCurrent_(id) {
  if (!findPoll_(id)) throw fail_('no_poll');
  setProp_('CURRENT_POLL', id);
  return { currentId: id };
}

// withAttendance: also delete the attendance taken for its meetings (for a test poll, say). Without it, that
// stays: it's the season's record, and members' own history.
function deletePoll_(id, withAttendance) {
  var found = findPoll_(id);
  if (!found) throw fail_('no_poll');
  deleteRowsWhere_('responses', function (d) { return d.pollId === id; });
  deleteRowsWhere_('replies', function (d) { return d.pollId === id; });
  if (withAttendance) deleteRowsWhere_('attendance', function (d) { return d.pollId === id; });
  deleteRowsWhere_('schedules', function (d) { return d.pollId === id; });
  deleteRowsWhere_('polls', function (d) { return d.id === id; });
  if (currentPollId_() === id) {
    var rest = table_('polls').rows.map(function (r) { return r.data; });
    rest.sort(function (a, b) { return a.start < b.start ? 1 : -1; });
    if (rest.length) setProp_('CURRENT_POLL', rest[0].id);
    else delProp_('CURRENT_POLL');
  }
  return adminState_();
}

function deleteResponse_(id) {
  var n = deleteRowsWhere_('responses', function (d) { return d.id === id; });
  if (!n) throw fail_('not_found');
  return {};
}

function saveSchedule_(b) {
  var found = findPoll_(cleanId_(b.pollId));
  if (!found) throw fail_('no_poll');
  var s = b.schedule || {};
  var events = (Array.isArray(s.events) ? s.events : []).slice(0, LIMITS.events)
    .map(cleanEvent_).filter(function (x) { return !!x; });
  events.sort(function (x, y) { return x.date === y.date ? x.start - y.start : (x.date < y.date ? -1 : 1); });
  var now = new Date();
  var draft = { events: events, note: text_(s.note, LIMITS.scheduleNote, true), saved: now.toISOString() };

  var t = table_('schedules');
  var existing = null;
  for (var i = 0; i < t.rows.length; i++) if (t.rows[i].data.pollId === found.poll.id) existing = t.rows[i];
  var data = existing ? existing.data : { pollId: found.poll.id };
  data.draft = draft;
  if (b.publish) data.published = { events: draft.events, note: draft.note, at: draft.saved };
  if (b.unpublish) data.published = null;

  var pub = data.published;
  writeRow_('schedules', existing ? existing.row : 0, [
    found.poll.id,
    pub ? new Date(pub.at) : '',
    pub ? pub.events.map(function (ev) {
      return fmtDate_(ev.date) + ' ' + hhmm_(ev.start) + '–' + hhmm_(ev.end) +
        (ev.title ? ' ' + ev.title : '') + (ev.place ? ' @ ' + ev.place : '');
    }).join('\n') : '',
    JSON.stringify(data)
  ]);
  return { schedule: { draft: data.draft, published: data.published || null } };
}

function cleanEvent_(e) {
  if (!e || !isDate_(e.date)) return null;
  var start = int_(e.start), end = int_(e.end);
  if (!(start >= 0 && end > start && end <= 1440)) return null;
  return {
    id: cleanId_(e.id) || ('e' + token_(8)),
    date: e.date, start: start, end: end,
    title: text_(e.title, LIMITS.title, false),
    place: text_(e.place, LIMITS.place, false),
    note: text_(e.note, LIMITS.eventNote, true)
  };
}

/* ------------------------------------------------------ member accounts */

function listMembers_() {
  var list = table_('members').rows.map(function (r) {
    var m = r.data;
    return { id: m.id, name: m.name, username: m.username, part: partOf_(m), active: m.active !== false, created: m.created || '', lastLogin: m.lastLogin || '' };
  });
  list.sort(function (a, b) { return a.name.localeCompare(b.name, 'tr'); });
  return list;
}

// Adds one member per name and returns each new username and password. The
// passwords are only ever shown here; the sheet keeps salted hashes.
function addMembers_(names) {
  var list = (Array.isArray(names) ? names : [])
    .map(function (n) { return text_(n, LIMITS.name, false); })
    .filter(function (n) { return !!n; });
  if (!list.length) throw fail_('invalid', 'names');
  var t = table_('members');
  if (t.rows.length + list.length > LIMITS.members) throw fail_('full');
  var taken = {};
  t.rows.forEach(function (r) { taken[r.data.username] = true; });
  var created = [];
  list.forEach(function (name) {
    var username = usernameFor_(name, taken);
    taken[username] = true;
    var password = newPassword_();
    var m = { id: 'm' + token_(10), name: name, username: username, active: true, sv: 0, created: new Date().toISOString(), lastLogin: '' };
    setPassword_(m, password);
    writeMember_(0, m);
    created.push({ id: m.id, name: name, username: username, password: password });
  });
  return { created: created, members: listMembers_() };
}

// A new password for a member who forgot theirs. It also signs them out everywhere.
function resetMember_(id) {
  var f = findMember_(id);
  if (!f) throw fail_('not_found');
  var password = newPassword_();
  setPassword_(f.data, password);
  writeMember_(f.row, f.data);
  return { created: [{ id: f.data.id, name: f.data.name, username: f.data.username, password: password }], members: listMembers_() };
}

// The member's voice part (S, A, T, B, or '' for none), used to group who can come to each rehearsal.
function setPart_(id, part) {
  var f = findMember_(id);
  if (!f) throw fail_('not_found');
  f.data.part = PARTS.indexOf(part) !== -1 ? part : '';
  writeMember_(f.row, f.data);
  return { members: listMembers_() };
}

// Removes the account. Answers they already gave stay in the polls.
function removeMember_(id) {
  var n = deleteRowsWhere_('members', function (d) { return d.id === id; });
  if (!n) throw fail_('not_found');
  return { members: listMembers_() };
}

function findMember_(id) { return id ? findMemberBy_('id', id) : null; }

function findMemberBy_(field, value) {
  var t = table_('members');
  for (var i = 0; i < t.rows.length; i++) {
    if (t.rows[i].data[field] === value) return { sheet: t.sheet, row: t.rows[i].row, data: t.rows[i].data };
  }
  return null;
}

function writeMember_(row, m) {
  writeRow_('members', row, [
    m.id, m.name, m.username, m.active === false ? 'No' : 'Yes', m.lastLogin ? new Date(m.lastLogin) : '', JSON.stringify(m)
  ]);
}

function memberInfo_(m) { return { id: m.id, name: m.name, username: m.username }; }

function setPassword_(m, password) {
  m.salt = token_(16);
  m.hash = hashPw_(password, m.salt);
  m.sv = (m.sv || 0) + 1;   // any older sign-in stops working
}

// Passwords and sign-ins use separate secrets, so signing everyone out never touches passwords.
function hashPw_(password, salt) { return hmac_('pw:' + salt + ':' + password, 'PW_SECRET'); }

// A sign-in is "memberId.version.expiry.signature". Nothing is stored for it:
// the signature proves we issued it, and the version ends it after a password change.
function makeSession_(m) {
  var body = m.id + '.' + (m.sv || 0) + '.' + (Date.now() + SESSION_DAYS * 864e5);
  return body + '.' + hmac_('session:' + body, 'AUTH_SECRET');
}

// Signed with the current organizer key, so a new key (newOrganizerKey) ends every planner sign-in.
function makeOrganizerSession_(key) {
  var exp = String(Date.now() + ORGANIZER_DAYS * 864e5);
  return 'org.' + exp + '.' + hmac_('org:' + exp + ':' + key, 'AUTH_SECRET');
}

function organizerSessionOk_(session, key) {
  if (!key || typeof session !== 'string' || session.length > 200) return false;
  var p = session.split('.');
  if (p.length !== 3 || p[0] !== 'org' || !(Number(p[1]) > Date.now())) return false;
  return same_(hmac_('org:' + p[1] + ':' + key, 'AUTH_SECRET'), p[2]);
}

function memberFromSession_(session) {
  if (typeof session !== 'string' || !session || session.length > 200) throw fail_('auth_required');
  var parts = session.split('.');
  if (parts.length !== 4) throw fail_('auth_required');
  var body = parts[0] + '.' + parts[1] + '.' + parts[2];
  if (!same_(hmac_('session:' + body, 'AUTH_SECRET'), parts[3])) throw fail_('auth_required');
  if (!(Number(parts[2]) > Date.now())) throw fail_('auth_required');
  var f = findMember_(cleanId_(parts[0]));
  if (!f || f.data.active === false || String(f.data.sv || 0) !== parts[1]) throw fail_('auth_required');
  return f.data;
}

function hmac_(text, secretName) {
  var sig = Utilities.computeHmacSha256Signature(text, secret_(secretName), Utilities.Charset.UTF_8);
  return Utilities.base64EncodeWebSafe(sig).replace(/=+$/, '');
}

// Random secrets kept in the script's properties (never in the sheet).
function secret_(name) {
  var s = props_()[name];
  if (!s) { s = token_(48); setProp_(name, s); }
  return s;
}

// Compares in constant time, so timing doesn't hint at how much of a value was right.
function same_(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  var x = 0;
  for (var i = 0; i < a.length; i++) x |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return x === 0;
}

// Usernames are lowercase ASCII, so "Ayşe" can sign in by typing "ayse" or "Ayşe".
function userKey_(u) {
  if (typeof u !== 'string') return '';
  var map = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u' };
  var s = u.trim().toLowerCase().replace(/[çğıöşü]/g, function (c) { return map[c]; });
  s = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  return s.replace(/[^a-z0-9]+/g, '.').replace(/^\.+|\.+$/g, '').slice(0, LIMITS.username);
}

function usernameFor_(name, taken) {
  var parts = userKey_(name).split('.').filter(function (x) { return !!x; });
  var first = parts[0] || 'uye';
  var options = [first];
  if (parts.length > 1) {
    var last = parts[parts.length - 1];
    options.push(first + '.' + last.charAt(0), first + '.' + last);
  }
  for (var i = 0; i < options.length; i++) if (!taken[options[i]]) return options[i];
  for (var n = 2; ; n++) if (!taken[first + n]) return first + n;
}

// Easy to read out and type on a phone: three words and a number, like "kiraz-tempo-mavi-47".
var WORDS_ = ['nota', 'koro', 'ses', 'alto', 'bas', 'tenor', 'ritim', 'kanon', 'fuga', 'tempo', 'vals', 'tango',
  'arya', 'opera', 'piyano', 'viyola', 'flut', 'obua', 'harp', 'davul', 'gong', 'zil', 'elma', 'kiraz', 'erik',
  'incir', 'limon', 'nane', 'zeytin', 'ceviz', 'badem', 'ayva', 'armut', 'kavun', 'karpuz', 'kestane', 'papatya',
  'lale', 'nergis', 'zambak', 'mavi', 'yesil', 'turuncu', 'mor', 'pembe', 'beyaz', 'lacivert', 'bordo', 'deniz',
  'bulut', 'yildiz', 'ruzgar', 'yaprak', 'orman', 'nehir', 'kumsal', 'dalga', 'ada', 'kopru', 'fener', 'sokak',
  'kedi', 'serce', 'gemi'];
function newPassword_() {
  var pick = function (n) { return parseInt(Utilities.getUuid().replace(/-/g, '').slice(0, 8), 16) % n; };
  return WORDS_[pick(WORDS_.length)] + '-' + WORDS_[pick(WORDS_.length)] + '-' + WORDS_[pick(WORDS_.length)] + '-' + (10 + pick(90));
}

/* ------------------------------------------------------------- storage */

// Every call to the spreadsheet or the script properties takes time, so within one request
// each is read at most once: the properties, the spreadsheet, each sheet and each table.
// Writes refresh what they change, and the lock makes everything be read again inside it.
var DB_ = null;
var PROPS_ = null;
var SHEET_ = {};
var TABLES_ = {};

function beginRequest_() {
  DB_ = null; PROPS_ = null; SHEET_ = {}; TABLES_ = {};
}

function props_() {
  if (!PROPS_) PROPS_ = PropertiesService.getScriptProperties().getProperties();
  return PROPS_;
}
function setProp_(k, v) {
  PropertiesService.getScriptProperties().setProperty(k, String(v));
  props_()[k] = String(v);
}
function delProp_(k) {
  PropertiesService.getScriptProperties().deleteProperty(k);
  delete props_()[k];
}

function openDb_(create) {
  if (DB_) return DB_;
  var id = props_().SHEET_ID;
  var ss = null;
  if (id) {
    try { ss = SpreadsheetApp.openById(id); } catch (x) { ss = null; }
  }
  if (!ss) {
    if (!create) throw fail_('not_set_up', 'Run setup() in the Apps Script editor first.');
    ss = SpreadsheetApp.create('Provala data');
    setProp_('SHEET_ID', ss.getId());
  }
  if (create) ensureSheets_(ss);
  DB_ = ss;
  return ss;
}

// A sheet that's missing (for example Members, in a sheet made by an older version) is added the first time it's needed.
function sheet_(key) {
  if (SHEET_[key]) return SHEET_[key];
  var ss = openDb_(false);
  var sh = ss.getSheetByName(SHEETS[key].name);
  if (!sh) {
    ensureSheets_(ss);
    sh = ss.getSheetByName(SHEETS[key].name);
  }
  SHEET_[key] = sh;
  return sh;
}

function ensureSheets_(ss) {
  var ours = Object.keys(SHEETS).map(function (k) { return SHEETS[k].name; });
  Object.keys(SHEETS).forEach(function (k) {
    var spec = SHEETS[k];
    var sh = ss.getSheetByName(spec.name);
    if (!sh) {
      var all = ss.getSheets();
      var spare = (all.length === 1 && all[0].getLastRow() === 0 && ours.indexOf(all[0].getName()) === -1) ? all[0] : null;
      try { sh = spare ? spare.setName(spec.name) : ss.insertSheet(spec.name); }
      catch (x) { sh = ss.getSheetByName(spec.name); if (!sh) throw x; }   // another request added it just now
    }
    if (sh.getLastRow() === 0) {
      sh.appendRow(spec.headers);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, spec.headers.length).setFontWeight('bold');
    }
  });
}

function table_(key) {
  if (TABLES_[key]) return TABLES_[key];
  var spec = SHEETS[key];
  // Reading never adds a sheet: one that isn't there yet (Replies, say, before anyone has replied) reads as
  // empty, and the first write adds it.
  var sh = SHEET_[key] || openDb_(false).getSheetByName(spec.name);
  if (!sh) {
    TABLES_[key] = { sheet: null, rows: [] };
    return TABLES_[key];
  }
  SHEET_[key] = sh;
  var width = spec.headers.length;
  var last = sh.getLastRow();
  // A sheet emptied by hand gets its header row back, so the next row isn't taken for the header.
  if (last === 0) ensureSheets_(openDb_(false));
  var rows = [];
  if (last >= 2) {
    var values = sh.getRange(2, 1, last - 1, width).getValues();
    for (var i = 0; i < values.length; i++) {
      var raw = values[i][width - 1];
      if (!raw || typeof raw !== 'string') continue;
      try { rows.push({ row: i + 2, data: JSON.parse(raw) }); } catch (x) { /* row edited by hand: skip */ }
    }
  }
  TABLES_[key] = { sheet: sh, rows: rows };
  return TABLES_[key];
}

function writeRow_(key, row, cells) {
  var sh = sheet_(key);
  var safe = cells.map(safeCell_);
  if (row) sh.getRange(row, 1, 1, safe.length).setValues([safe]);
  else sh.appendRow(safe);
  delete TABLES_[key];
}

/** Text that starts like a formula is stored as plain text. */
function safeCell_(v) {
  if (typeof v === 'string' && /^[=+\-@\t\r]/.test(v)) return "'" + v;
  return v;
}

function deleteRowsWhere_(key, test) {
  var t = table_(key);
  var rows = t.rows.filter(function (r) { return test(r.data); }).map(function (r) { return r.row; });
  rows.sort(function (a, b) { return b - a; });
  rows.forEach(function (r) { t.sheet.deleteRow(r); });
  delete TABLES_[key];
  return rows.length;
}

function findPoll_(id) {
  if (!id) return null;
  var t = table_('polls');
  for (var i = 0; i < t.rows.length; i++) {
    if (t.rows[i].data.id === id) return { sheet: t.sheet, row: t.rows[i].row, poll: t.rows[i].data };
  }
  return null;
}

function findSchedule_(pollId) {
  var t = table_('schedules');
  for (var i = 0; i < t.rows.length; i++) if (t.rows[i].data.pollId === pollId) return t.rows[i];
  return null;
}

function countAnswers_(pollId) {
  return table_('responses').rows.filter(function (r) { return r.data.pollId === pollId; }).length;
}

function currentPollId_() {
  return props_().CURRENT_POLL || '';
}

/* ------------------------------------------------------------ cleaning */

function cleanAvail_(v, poll) {
  var out = {};
  if (!v || typeof v !== 'object') return out;
  var n = slotCount_(poll);
  var pattern = new RegExp('^[012]{' + n + '}$');
  Object.keys(v).forEach(function (day) {
    var s = v[day];
    if (!inPoll_(day, poll) || typeof s !== 'string' || !pattern.test(s)) return;
    if (/[12]/.test(s)) out[day] = s;
  });
  return out;
}

function cleanNotes_(v, poll) {
  var out = {};
  if (!v || typeof v !== 'object') return out;
  Object.keys(v).forEach(function (day) {
    if (!inPoll_(day, poll)) return;
    var s = text_(v[day], LIMITS.note, false);
    if (s) out[day] = s;
  });
  return out;
}

function text_(v, max, multiline) {
  if (typeof v !== 'string') return '';
  var s = v.replace(/\r\n?/g, '\n');
  s = multiline
    ? s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').replace(/\n{3,}/g, '\n\n')
    : s.replace(/[\u0000-\u001F\u007F]+/g, ' ');
  s = s.trim();
  return s.length > max ? s.slice(0, max) : s;
}

function cleanId_(v) {
  return typeof v === 'string' && /^[A-Za-z0-9_-]{1,40}$/.test(v) ? v : '';
}

function int_(v) {
  var n = Number(v);
  return isFinite(n) ? Math.round(n) : NaN;
}

function token_(len) {
  var s = '';
  while (s.length < len) s += Utilities.getUuid().replace(/-/g, '');
  return s.slice(0, len);
}

function fail_(code, message) {
  var e = new Error(message || code);
  e.code = code;
  return e;
}

function withLock_(fn) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) throw fail_('busy');
  // Someone else may have written while we waited, and rows may have moved: read again inside the lock.
  TABLES_ = {};
  PROPS_ = null;
  try { return fn(); } finally { lock.releaseLock(); }
}

/* --------------------------------------------------------- dates, text */

function isDate_(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  var d = new Date(s + 'T00:00:00Z');
  return !isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

function weekday_(s) { return new Date(s + 'T00:00:00Z').getUTCDay(); }

function dayDiff_(a, b) {
  return Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 864e5);
}

function inPoll_(s, poll) {
  return isDate_(s) && s >= poll.start && s <= poll.end && poll.days.indexOf(weekday_(s)) !== -1;
}

function slotCount_(poll) { return Math.round((poll.dayEnd - poll.dayStart) / poll.slot); }

function fmtDate_(s) { return s.slice(8, 10) + '.' + s.slice(5, 7) + '.' + s.slice(0, 4); }

function hhmm_(m) {
  var h = Math.floor(m / 60), mm = m % 60;
  return (h < 10 ? '0' : '') + h + ':' + (mm < 10 ? '0' : '') + mm;
}

function pollLabel_(p) {
  var t = p.title || {};
  return t.tr && t.en && t.tr !== t.en ? t.tr + ' / ' + t.en : (t.tr || t.en || p.id);
}

function runs_(str, ch, poll) {
  var out = [], i = 0, n = str.length;
  while (i < n) {
    if (str.charAt(i) === ch) {
      var j = i;
      while (j < n && str.charAt(j) === ch) j++;
      out.push({ from: i, text: hhmm_(poll.dayStart + i * poll.slot) + '–' + hhmm_(poll.dayStart + j * poll.slot) });
      i = j;
    } else {
      i++;
    }
  }
  return out;
}

function availSummary_(avail, poll) {
  return Object.keys(avail).sort().map(function (day) {
    var s = avail[day];
    var parts = runs_(s, '2', poll).concat(runs_(s, '1', poll).map(function (r) {
      return { from: r.from, text: '(' + r.text + ')' };
    }));
    parts.sort(function (a, b) { return a.from - b.from; });
    return fmtDate_(day) + ': ' + parts.map(function (r) { return r.text; }).join(', ');
  }).join('\n');
}

function notesSummary_(notes) {
  return Object.keys(notes).sort().map(function (day) { return fmtDate_(day) + ': ' + notes[day]; }).join('\n');
}
