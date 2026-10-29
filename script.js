'use strict';

/* ==========================================================
   1. SAMPLE DATA. Replace these arrays with your real content.
   Keep every id unique and stable: saved progress is keyed by id.
   For resources, set `url` to a real file/link. Leave it null if the
   file is not supplied yet: the card will show an honest empty state.
   ========================================================== */
const COURSES = [
  { id: 'web', title: 'Web Development Foundations', lessons: [
    // Lesson fields: id, title, video (optional file path or YouTube link), summary (optional).
    // Put video files in a "videos" folder next to index.html, or use a full URL.
    { id: 'web-1', title: 'How the web works', video: 'videos/web-1-how-the-web-works.mp4',
      summary: 'What happens between typing a URL and seeing a page: DNS, HTTP requests, servers and browsers.' },
    { id: 'web-2', title: 'HTML structure and semantics', video: 'videos/web-2-html-semantics.mp4',
      summary: 'Build a page skeleton with semantic elements and correct heading order.' },
    { id: 'web-3', title: 'CSS layout with Flexbox and Grid' },
    { id: 'web-4', title: 'JavaScript basics' },
    { id: 'web-5', title: 'Working with the DOM' } ] },
  { id: 'py', title: 'Python for Beginners', lessons: [
    { id: 'py-1', title: 'Variables and data types' },
    { id: 'py-2', title: 'Conditions and loops' },
    { id: 'py-3', title: 'Functions' },
    { id: 'py-4', title: 'Lists and dictionaries' },
    { id: 'py-5', title: 'Reading and writing files' } ] },
  { id: 'ds', title: 'Data Structures Basics', lessons: [
    { id: 'ds-1', title: 'Arrays and complexity' },
    { id: 'ds-2', title: 'Stacks and queues' },
    { id: 'ds-3', title: 'Linked lists' },
    { id: 'ds-4', title: 'Hash tables' } ] }
];

// category: notes | assignments | materials | additional
const RESOURCES = [
  { id: 'r1', category: 'notes', courseId: 'web', lessonId: 'web-2', title: 'HTML semantics cheat notes',
    description: 'Short notes on when to use each semantic element.',
    body: 'Use <header>, <nav>, <main>, <section>, <article> and <footer> to describe what content is, not how it looks.\n\nOne <h1> per page. Headings go in order (h1, h2, h3) without skipping levels.\n\nEvery form control needs a <label>.' },
  { id: 'r2', category: 'notes', courseId: 'py', lessonId: 'py-2', title: 'Loops: for vs while',
    description: 'When to pick each loop.',
    body: 'for: you know what you are iterating over (a list, a range).\nwhile: you repeat until a condition changes.\n\nAlways make sure a while loop has a way to stop.' },
  { id: 'r3', category: 'assignments', courseId: 'web', lessonId: 'web-3', title: 'Assignment: responsive profile card',
    description: 'Build a profile card that works on mobile and desktop.',
    body: 'Instructions:\n1. Build a card with a photo, name and three links.\n2. Use Flexbox for the content row.\n3. At 600px wide or less, stack everything in one column.\n4. Submit your index.html and style.css.',
    url: null, expectedPath: 'resources/assignments/web-profile-card.pdf', type: 'PDF' },
  { id: 'r4', category: 'assignments', courseId: 'py', lessonId: 'py-4', title: 'Assignment: word counter',
    description: 'Count word frequency in a text using a dictionary.',
    body: 'Instructions:\nWrite a function that takes a string and returns a dictionary of word counts. Ignore case and punctuation. Include 3 test inputs.',
    url: null, expectedPath: 'resources/assignments/py-word-counter.pdf', type: 'PDF' },
  { id: 'r5', category: 'materials', courseId: 'web', lessonId: 'web-1', title: 'MDN: Learn web development',
    description: 'Mozilla\'s structured beginner curriculum.', url: 'https://developer.mozilla.org/en-US/docs/Learn', type: 'Link' },
  { id: 'r6', category: 'materials', courseId: 'py', lessonId: 'py-1', title: 'The Python Tutorial (official)',
    description: 'Official reference tutorial from python.org.', url: 'https://docs.python.org/3/tutorial/', type: 'Link' },
  { id: 'r7', category: 'materials', courseId: 'ds', lessonId: 'ds-1', title: 'Course slides: arrays and complexity',
    description: 'Lecture PDF.', url: null, expectedPath: 'resources/materials/ds-arrays.pdf', type: 'PDF' },
  { id: 'r8', category: 'additional', courseId: 'ds', lessonId: 'ds-2', title: 'Practice: implement a stack',
    description: 'Practical exercise.', body: 'Implement push, pop and peek using a plain array. Then add a size check so pop on an empty stack returns a clear error instead of crashing.', type: 'Exercise' },
  { id: 'r9', category: 'additional', courseId: 'web', lessonId: 'web-4', title: 'Supplementary video: JS basics',
    description: 'Video not supplied yet.', url: null, expectedPath: 'resources/videos/js-basics.mp4', type: 'Video' }
];

const QUIZZES = [
  { id: 'q-web', courseId: 'web', title: 'Web basics', questions: [
    { q: 'Which element should wrap the main unique content of a page?', options: ['<div>', '<main>', '<section>', '<span>'], answer: 1, explain: '<main> marks the primary content and should appear once per page.' },
    { q: 'Which CSS property turns an element into a flex container?', options: ['position: flex', 'flex: container', 'display: flex', 'layout: flex'], answer: 2, explain: 'display: flex enables Flexbox on the element.' },
    { q: 'What does DOM stand for?', options: ['Document Object Model', 'Data Order Method', 'Display Output Mode', 'Document Oriented Markup'], answer: 0, explain: 'The DOM is the browser\'s object model of the page.' } ] },
  { id: 'q-py', courseId: 'py', title: 'Python fundamentals', questions: [
    { q: 'Which of these creates a list?', options: ['{1, 2}', '(1, 2)', '[1, 2]', '<1, 2>'], answer: 2, explain: 'Square brackets create a list.' },
    { q: 'What does len("skill") return?', options: ['4', '5', '6', 'Error'], answer: 1, explain: '"skill" has 5 characters.' },
    { q: 'Which keyword defines a function?', options: ['func', 'function', 'def', 'lambda only'], answer: 2, explain: 'Python uses def.' } ] },
  { id: 'q-ds', courseId: 'ds', title: 'Data structures', questions: [
    { q: 'A stack follows which order?', options: ['FIFO', 'LIFO', 'Random', 'Sorted'], answer: 1, explain: 'Last in, first out.' },
    { q: 'Average lookup time in a good hash table is:', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'], answer: 2, explain: 'Hashing gives constant time on average.' },
    { q: 'Which structure is best for FIFO processing?', options: ['Stack', 'Queue', 'Tree', 'Heap'], answer: 1, explain: 'A queue is first in, first out.' } ] }
];

/* ==========================================================
   2. STATE + STORAGE
   completed: { lessonId: 'YYYY-MM-DD' }  (an object, so a lesson can only exist once)
   sessions:  [{ id, date, type: 'lesson' | 'manual', lessonId?, minutes? }]
   ========================================================== */
const STORE_KEY = 'skillnest.v1';
// videoPos: { lessonId: seconds }, lastLesson: last opened lesson id, notesPanelOpen: lesson-page notes visibility
const defaultState = () => ({ completed: {}, sessions: [], quizAttempts: [], notes: [], theme: 'dark', videoPos: {}, lastLesson: null, notesPanelOpen: true });

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    return Object.assign(defaultState(), saved || {});
  } catch (err) { return defaultState(); }
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
  catch (err) { console.warn('Could not save progress:', err); }
}
let state = loadState();

/* ==========================================================
   3. HELPERS
   ========================================================== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');

// Dates are always LOCAL calendar dates (never toISOString, which uses UTC).
const dateKey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const todayKey = () => dateKey(new Date());
// Day number via UTC math, so daylight-saving shifts cannot create 23/25-hour gaps.
const dayIndex = key => { const [y, m, d] = key.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / 86400000); };

const allLessons = () => COURSES.flatMap(c => c.lessons.map(l => ({ ...l, courseId: c.id, courseTitle: c.title })));
const findLesson = id => allLessons().find(l => l.id === id);
const findCourse = id => COURSES.find(c => c.id === id);

/* ==========================================================
   4. STREAK + STATS LOGIC
   ========================================================== */
const activeDays = () => [...new Set(state.sessions.map(s => s.date))].sort();

function computeStreaks() {
  const idx = activeDays().map(dayIndex);
  if (!idx.length) return { current: 0, longest: 0 };
  let longest = 1, run = 1;
  for (let i = 1; i < idx.length; i++) {
    run = idx[i] - idx[i - 1] === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
  }
  // Current streak is alive if the last active day is today or yesterday.
  let current = 0;
  if (dayIndex(todayKey()) - idx[idx.length - 1] <= 1) {
    current = 1;
    for (let i = idx.length - 1; i > 0 && idx[i] - idx[i - 1] === 1; i--) current++;
  }
  return { current, longest };
}
const studiedToday = () => state.sessions.some(s => s.date === todayKey());
const completedCount = () => allLessons().filter(l => state.completed[l.id]).length;

function courseProgress(course) {
  const total = course.lessons.length;
  const done = course.lessons.filter(l => state.completed[l.id]).length;
  return { done, total, remaining: total - done, percent: total ? Math.round(done / total * 100) : 0,
    status: done === 0 ? 'not-started' : done === total ? 'completed' : 'in-progress' };
}
const STATUS_LABEL = { 'not-started': 'Not started', 'in-progress': 'In progress', 'completed': 'Completed' };

// Toggle a lesson. Completing records ONE session; un-completing removes exactly that session.
function toggleLesson(lessonId) {
  if (!findLesson(lessonId)) return;
  if (state.completed[lessonId]) {
    delete state.completed[lessonId];
    state.sessions = state.sessions.filter(s => !(s.type === 'lesson' && s.lessonId === lessonId));
  } else {
    state.completed[lessonId] = todayKey();
    state.sessions.push({ id: uid(), date: todayKey(), type: 'lesson', lessonId });
  }
  saveState(); renderAll();
}

/* ==========================================================
   5. RENDER: DASHBOARD + COURSES
   ========================================================== */
/* ---------- Lesson detail page: video + summary + completion ---------- */
let currentLessonId = null;

const formatTime = s => `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}`;
const pastePlain = e => { // paste as plain text so foreign HTML never enters storage
  e.preventDefault();
  document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text/plain'));
};
let lessonNoteTimer = null;

// Hide or show the notes panel. Only CSS classes change, so the video keeps playing.
function applyNotesPanel() {
  const layout = $('.lesson-layout'), panel = $('#lessonNotesPanel');
  if (!layout || !panel) return;
  const open = state.notesPanelOpen !== false;
  layout.classList.toggle('notes-closed', !open);
  panel.hidden = !open;
  const btn = $('#toggleLessonNotes');
  if (btn) { btn.textContent = open ? 'Hide notes' : 'Show notes'; btn.setAttribute('aria-expanded', String(open)); }
}

// One note per lesson, stored in the same list as the Digital Notes workspace.
function saveLessonNote() {
  const lesson = findLesson(currentLessonId), body = $('#lessonNoteBody');
  if (!lesson || !body) return;
  let note = state.notes.find(n => n.lessonId === currentLessonId);
  if (!note) {
    if (!body.textContent.trim()) return; // do not create empty notes
    note = { id: uid(), title: 'Lesson notes: ' + lesson.title, courseId: lesson.courseId, lessonId: currentLessonId, html: '', updated: Date.now() };
    state.notes.push(note);
  }
  note.html = body.innerHTML; note.updated = Date.now();
  saveState(); renderNoteList();
  if (activeNoteId === note.id) loadNoteIntoEditor(); // keep the workspace editor in sync
  $('#lessonNoteStatus').textContent = 'Saved';
}

function openLessonNoteInWorkspace() {
  saveLessonNote();
  let note = state.notes.find(n => n.lessonId === currentLessonId);
  if (!note) {
    const lesson = findLesson(currentLessonId);
    note = { id: uid(), title: 'Lesson notes: ' + lesson.title, courseId: lesson.courseId, lessonId: currentLessonId, html: '', updated: Date.now() };
    state.notes.push(note); saveState();
  }
  activeNoteId = note.id; showView('notes'); loadNoteIntoEditor(); renderNoteList();
}

// Wires up lesson notes and video resume after the lesson page is built.
function setupLessonExtras(lesson) {
  state.lastLesson = lesson.id; saveState();
  const body = $('#lessonNoteBody'), note = state.notes.find(n => n.lessonId === lesson.id);
  body.innerHTML = note ? note.html : '';
  body.addEventListener('input', () => {
    $('#lessonNoteStatus').textContent = 'Editing...';
    clearTimeout(lessonNoteTimer); lessonNoteTimer = setTimeout(saveLessonNote, 500);
  });
  body.addEventListener('focusout', () => { clearTimeout(lessonNoteTimer); saveLessonNote(); });
  body.addEventListener('paste', pastePlain);

  const video = $('#lessonDetail video'); // YouTube embeds are not tracked (needs YouTube's API)
  if (!video) return;
  let lastSaved = 0;
  video.addEventListener('loadedmetadata', () => {
    const pos = state.videoPos[lesson.id];
    if (pos > 5 && pos < video.duration - 5) { video.currentTime = pos; $('#resumeNote').textContent = 'Resumed from ' + formatTime(pos) + '.'; }
  });
  video.addEventListener('timeupdate', () => {
    if (Math.abs(video.currentTime - lastSaved) >= 3) { lastSaved = video.currentTime; state.videoPos[lesson.id] = Math.floor(video.currentTime); saveState(); }
  });
  video.addEventListener('pause', () => {
    if (video.currentTime > 0 && !video.ended) { state.videoPos[lesson.id] = Math.floor(video.currentTime); saveState(); }
  });
  video.addEventListener('ended', () => { delete state.videoPos[lesson.id]; saveState(); });
}

function videoMarkup(lesson) {
  const src = lesson.video;
  if (!src) return '<div class="empty">No video supplied for this lesson yet. Set <code>video</code> on this lesson in script.js.</div>';
  const yt = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  if (yt) return `<div class="video-wrap"><iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}" title="${esc(lesson.title)} video" allowfullscreen loading="lazy"></iframe></div>`;
  return `<div class="video-wrap"><video controls preload="metadata" src="${esc(src)}" aria-label="${esc(lesson.title)} video"></video></div>`;
}

function openLesson(id) {
  const lesson = findLesson(id);
  if (!lesson) return;
  currentLessonId = id;
  const list = allLessons(), i = list.findIndex(l => l.id === id);
  const prev = list[i - 1], next = list[i + 1];
  const related = RESOURCES.filter(r => r.lessonId === id).map(r => {
    let actions = r.body ? `<button class="btn small ghost" data-open="${r.id}">Read</button> ` : '';
    if (r.url) actions += `<a class="btn small ghost" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">Open</a>`;
    else if (!r.body) actions += '<span class="missing">Not supplied yet</span>';
    return `<li>${esc(r.title)} <small class="muted">${CAT_LABEL[r.category]}</small> ${actions}</li>`;
  }).join('');
  $('#lessonDetail').innerHTML = `<div class="lesson-layout"><div class="lesson-main"><p class="muted">${esc(lesson.courseTitle)}</p>
    <h2 class="lesson-title">${esc(lesson.title)}</h2>${videoMarkup(lesson)}
    <p id="resumeNote" class="muted" role="status"></p>
    ${lesson.summary ? `<p>${esc(lesson.summary)}</p>` : ''}
    <div id="lessonActions" class="row"></div>
    <h3>Related resources</h3><ul class="activity">${related || '<li class="muted">Nothing linked to this lesson yet.</li>'}</ul>
    <div class="row lesson-nav">${prev ? `<button class="btn ghost" data-openlesson="${prev.id}">Previous: ${esc(prev.title)}</button>` : '<span></span>'}
    ${next ? `<button class="btn ghost" data-openlesson="${next.id}">Next: ${esc(next.title)}</button>` : ''}</div></div>
    <aside class="lesson-notes" id="lessonNotesPanel" aria-label="Notes for this lesson">
      <h3>My notes for this lesson</h3>
      <div id="lessonNoteBody" class="lesson-note-body" contenteditable="true" role="textbox" aria-multiline="true" aria-label="Lesson notes"></div>
      <div class="row"><span id="lessonNoteStatus" class="muted" role="status">Saves automatically</span>
      <button class="btn small ghost" type="button" data-opennote>Open in My Digital Notes</button></div>
    </aside></div>`;
  // If the video file is missing, say so instead of showing a dead player.
  const video = $('#lessonDetail video');
  if (video) video.addEventListener('error', () => {
    video.closest('.video-wrap').outerHTML = `<div class="empty">Video file not found: <code>${esc(lesson.video)}</code>. Add the file at that path or change it in script.js.</div>`;
  });
  renderLessonActions();
  setupLessonExtras(lesson);
  showView('lesson');
  $$('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === 'courses'));
  window.scrollTo(0, 0);
}

// Updates only the button/status so the video does not restart when completion changes.
function renderLessonActions() {
  const box = $('#lessonActions');
  if (!box || !currentLessonId) return;
  const on = !!state.completed[currentLessonId];
  box.innerHTML = `<button class="btn ${on ? 'ghost' : ''}" data-complete="${currentLessonId}">${on ? 'Mark as not complete' : 'Mark lesson complete'}</button>
    <span class="today-pill ${on ? 'done' : 'todo'}">${on ? 'Completed ' + state.completed[currentLessonId] : 'Not completed'}</span>
    <button class="btn ghost" type="button" id="toggleLessonNotes" data-togglenotes aria-controls="lessonNotesPanel" aria-expanded="true">Hide notes</button>`;
  applyNotesPanel();
}

function progressBar(percent, label) {
  return `<div class="bar" role="progressbar" aria-label="${esc(label)}" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"><span style="width:${percent}%"></span></div>`;
}

function renderStats() {
  const { current, longest } = computeStreaks();
  const total = allLessons().length;
  const stats = [
    { label: 'Current streak (days)', value: current, hero: true },
    { label: 'Longest streak (days)', value: longest },
    { label: 'Lessons completed', value: `${completedCount()}/${total}` },
    { label: 'Learning sessions', value: state.sessions.length },
    { label: 'Active days', value: activeDays().length }
  ];
  $('#statsGrid').innerHTML = stats.map(s =>
    `<div class="stat ${s.hero ? 'hero' : ''}"><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`).join('');
  const done = studiedToday();
  const pill = $('#todayStatus');
  pill.textContent = done ? 'You have studied today' : 'No study logged today yet';
  pill.className = 'today-pill ' + (done ? 'done' : 'todo');
}

function renderHeatmap() {
  const counts = {};
  state.sessions.forEach(s => { counts[s.date] = (counts[s.date] || 0) + 1; });
  const WEEKS = 20, end = new Date();
  const start = new Date(end);
  start.setDate(end.getDate() - end.getDay() - (WEEKS - 1) * 7); // Sunday, 19 weeks back
  let html = '';
  for (let i = 0; i < WEEKS * 7; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i);
    if (d > end) { html += '<i class="cell future"></i>'; continue; }
    const key = dateKey(d), c = counts[key] || 0;
    html += `<i class="cell l${Math.min(4, c)}" title="${key}: ${c} session${c === 1 ? '' : 's'}"></i>`;
  }
  $('#heatmap').innerHTML = html;
}

// Shows "Resume" first when the last opened lesson has a saved video position and is not complete.
function renderNextLesson() {
  renderNextLessonBase();
  const last = state.lastLesson && findLesson(state.lastLesson);
  const pos = last && !state.completed[last.id] && state.videoPos[last.id];
  if (pos) $('#nextLesson').insertAdjacentHTML('afterbegin',
    `<p class="muted">Resume: <strong>${esc(last.title)}</strong> at ${formatTime(pos)}</p>
     <div class="row resume-row"><button class="btn" data-openlesson="${last.id}">Resume lesson</button></div>`);
}

function renderNextLessonBase() {
  const next = allLessons().find(l => !state.completed[l.id]);
  $('#nextLesson').innerHTML = next
    ? `<p class="muted">Up next: <strong>${esc(next.title)}</strong> (${esc(next.courseTitle)})</p>
       <div class="row"><button class="btn" data-openlesson="${next.id}">Open lesson</button>
       <button class="btn ghost" data-complete="${next.id}">Mark complete</button></div>`
    : '<p class="muted">Every lesson is complete. Add new courses in script.js.</p>';
}

function renderDashCourses() {
  $('#dashCourses').innerHTML = COURSES.map(c => {
    const p = courseProgress(c);
    return `<div class="progress-item"><div class="progress-head"><strong>${esc(c.title)}</strong><span class="muted">${p.done}/${p.total} · ${p.percent}%</span></div>${progressBar(p.percent, c.title)}</div>`;
  }).join('');
}

/* ---------- Learning insights (all derived from real session data) ---------- */
function renderInsights() {
  const box = $('#insights');
  if (!state.sessions.length) {
    box.innerHTML = '<p class="muted">Insights appear after your first session. Complete a lesson or log a session.</p>';
    return;
  }
  const days = activeDays(), todayIdx = dayIndex(todayKey());

  // Sessions per week for the last 8 weeks (weeks start on Sunday).
  const WEEKS = 8, now = new Date();
  const thisWeekStart = new Date(now); thisWeekStart.setDate(now.getDate() - now.getDay());
  const thisWeekIdx = dayIndex(dateKey(thisWeekStart));
  const weekly = Array(WEEKS).fill(0);
  state.sessions.forEach(s => {
    const diff = thisWeekIdx - dayIndex(s.date);   // days before the start of this week
    if (diff <= -7) return;                          // ignore dates beyond this week
    const back = diff <= 0 ? 0 : Math.ceil(diff / 7);
    if (back < WEEKS) weekly[WEEKS - 1 - back]++;
  });
  const maxWeek = Math.max(...weekly);

  // Consistency: share of the last 30 days with any activity.
  const recent = days.filter(d => { const gap = todayIdx - dayIndex(d); return gap >= 0 && gap < 30; }).length;

  // Weekday pattern: only meaningful with enough data, so say so otherwise.
  const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const byDay = Array(7).fill(0);
  days.forEach(d => { const [y, m, dd] = d.split('-').map(Number); byDay[new Date(y, m - 1, dd).getDay()]++; });
  const bestDay = days.length >= 7 ? names[byDay.indexOf(Math.max(...byDay))] : 'Needs 7 active days';

  const manualMinutes = state.sessions.filter(s => s.type === 'manual').reduce((sum, s) => sum + (s.minutes || 0), 0);
  const cards = [
    { v: Math.round(recent / 30 * 100) + '%', l: 'Active days, last 30 days' },
    { v: (state.sessions.length / days.length).toFixed(1), l: 'Sessions per active day' },
    { v: bestDay, l: 'Most active weekday' },
    { v: manualMinutes, l: 'Minutes logged manually' }
  ];
  const cols = weekly.map((n, i) => {
    const d = new Date(thisWeekStart); d.setDate(d.getDate() - (WEEKS - 1 - i) * 7);
    const label = d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
    return `<div class="wk"><span class="wk-n">${n}</span><div class="wk-track"><div class="wk-bar" style="height:${maxWeek ? Math.round(n / maxWeek * 100) : 0}%"></div></div><span class="wk-l">${label}</span></div>`;
  }).join('');
  box.innerHTML = `<div class="insight-grid">${cards.map(c => `<div class="stat"><div class="stat-value">${c.v}</div><div class="stat-label">${c.l}</div></div>`).join('')}</div>
    <h3>Sessions per week (week starting)</h3>
    <div class="weekbars" role="img" aria-label="Sessions per week for the last 8 weeks: ${weekly.join(', ')}">${cols}</div>
    <p class="muted">Completed lessons have no recorded duration, so minutes only include sessions you log manually.</p>`;
}

function renderRecent() {
  const items = [...state.sessions].reverse().slice(0, 6);
  $('#recentActivity').innerHTML = items.length ? items.map(s => {
    const lesson = s.lessonId && findLesson(s.lessonId);
    const text = s.type === 'lesson' ? `Completed: ${lesson ? esc(lesson.title) : 'a lesson'}` : `Study session: ${s.minutes} min`;
    return `<li>${text}<small>${s.date}</small></li>`;
  }).join('') : '<li class="muted">Nothing yet. Complete a lesson or log a session to start your streak.</li>';
}

function renderCourses() {
  const total = allLessons().length, done = completedCount();
  const pct = total ? Math.round(done / total * 100) : 0;
  $('#overallProgress').innerHTML = `<h2>Overall completion: ${pct}%</h2><p class="muted">${done} of ${total} lessons complete · ${total - done} remaining</p>${progressBar(pct, 'Overall completion')}`;
  $('#courseList').innerHTML = COURSES.map(c => {
    const p = courseProgress(c);
    const lessons = c.lessons.map(l => {
      const on = !!state.completed[l.id];
      return `<div class="lesson ${on ? 'done' : ''}"><input type="checkbox" id="chk-${l.id}" data-lesson="${l.id}" ${on ? 'checked' : ''}>
        <label for="chk-${l.id}">${esc(l.title)}</label>${on ? `<small class="muted">${state.completed[l.id]}</small>` : ''}
        <button class="btn small ghost" data-openlesson="${l.id}">${l.video ? 'Watch lesson' : 'Open lesson'}</button></div>`;
    }).join('');
    return `<article class="card"><div class="progress-head"><h2>${esc(c.title)}</h2><span class="badge ${p.status}">${STATUS_LABEL[p.status]}</span></div>
      <p class="muted">${p.done} of ${p.total} lessons · ${p.remaining} remaining · ${p.percent}%</p>${progressBar(p.percent, c.title)}<div>${lessons}</div></article>`;
  }).join('');
}

/* ==========================================================
   6. STUDY RESOURCES
   ========================================================== */
const CAT_LABEL = { notes: 'Study Note', assignments: 'Assignment', materials: 'Learning Material', additional: 'Additional Resource' };
let resourceFilter = { cat: 'all', course: 'all', text: '' };

function renderResources() {
  const t = resourceFilter.text.trim().toLowerCase();
  const list = RESOURCES.filter(r =>
    (resourceFilter.cat === 'all' || r.category === resourceFilter.cat) &&
    (resourceFilter.course === 'all' || r.courseId === resourceFilter.course) &&
    (!t || (r.title + ' ' + r.description).toLowerCase().includes(t)));
  $('#resourceList').innerHTML = list.length ? list.map(r => {
    const lesson = findLesson(r.lessonId), course = findCourse(r.courseId);
    const actions = [];
    if (r.body) actions.push(`<button class="btn small" data-open="${r.id}">${r.category === 'assignments' ? 'View instructions' : 'Read'}</button>`);
    if (r.url) actions.push(`<a class="btn small ghost" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">Open ${esc(r.type || 'link')} in new tab</a>`);
    else if (r.expectedPath) actions.push(`<span class="missing">File not supplied yet. Add it at ${esc(r.expectedPath)} and set its url in script.js.</span>`);
    return `<article class="card resource"><span class="badge">${CAT_LABEL[r.category]}</span><h3>${esc(r.title)}</h3>
      <p>${esc(course ? course.title : '')}${lesson ? ' · ' + esc(lesson.title) : ''}</p><p>${esc(r.description)}</p><div class="actions">${actions.join('')}</div></article>`;
  }).join('') : '<div class="empty">No resources match these filters. Try another category or clear the search.</div>';
}

function openResource(id) {
  const r = RESOURCES.find(x => x.id === id);
  if (!r) return;
  $('#dlgTitle').textContent = r.title;
  $('#dlgBody').textContent = r.body || '';
  $('#resourceDialog').showModal();
}

/* ==========================================================
   7. QUIZZES (separate from lesson logic)
   ========================================================== */
let quizRun = null; // active attempt
let reviewAttemptId = null; // attempt currently shown in review mode

function startQuiz(id) {
  const quiz = QUIZZES.find(q => q.id === id);
  if (!quiz) return;
  quizRun = { quiz, index: 0, selected: null, submitted: false, correct: 0, answeredIdx: new Set(), answers: [], done: false, attempt: null };
  renderQuizzes();
}

// Start a new run containing only the questions missed in a saved attempt.
function retryMissed(attemptId) {
  const a = state.quizAttempts.find(x => x.id === attemptId);
  if (!a || !a.review) return;
  const missed = a.review.filter(q => q.selected !== q.answer).map(({ q, options, answer, explain }) => ({ q, options, answer, explain }));
  if (!missed.length) return;
  const title = a.title.replace(/ \(missed only\)$/, '') + ' (missed only)';
  quizRun = { quiz: { id: a.quizId, title, questions: missed }, index: 0, selected: null, submitted: false, correct: 0, answeredIdx: new Set(), answers: [], done: false, attempt: null };
  renderQuizzes();
}

// Review screen for one saved attempt. Uses the saved snapshot, so it stays correct even if quiz data changes later.
function reviewMarkup(id) {
  const a = state.quizAttempts.find(x => x.id === id);
  if (!a || !a.review) return '<article class="card"><p class="muted">Answers were not recorded for this attempt (saved before review mode existed).</p><button class="btn ghost" data-quizexit>Back to quizzes</button></article>';
  const missed = a.review.filter(q => q.selected !== q.answer).length;
  const items = a.review.map((q, i) => {
    const ok = q.selected === q.answer;
    const opts = q.options.map((o, j) => {
      const tags = [j === q.answer ? 'correct answer' : '', j === q.selected ? 'your answer' : ''].filter(Boolean).join(', ');
      return `<li class="${j === q.answer ? 'correct' : j === q.selected ? 'wrong' : ''}">${esc(o)}${tags ? ` <small>(${tags})</small>` : ''}</li>`;
    }).join('');
    return `<article class="card review-item ${ok ? 'ok' : 'bad'}"><p class="muted">Question ${i + 1} · ${ok ? 'Correct' : 'Incorrect'}</p>
      <h3>${esc(q.q)}</h3><ul class="review-opts">${opts}</ul><p>${esc(q.explain)}</p></article>`;
  }).join('');
  return `<article class="card"><h2>Review: ${esc(a.title)}</h2><p class="muted">${a.date} · ${a.correct}/${a.total} correct (${a.percent}%)</p>
    <div class="row">${missed ? `<button class="btn" data-retrymissed="${a.id}">Retry the ${missed} I missed</button>` : '<span>Perfect score. Nothing to retry.</span>'}
    <button class="btn ghost" data-quizexit>Back to quizzes</button></div></article>${items}`;
}
function submitAnswer() {
  const r = quizRun;
  // Guard: one count per question per attempt.
  if (!r || r.submitted || r.selected === null || r.answeredIdx.has(r.index)) return;
  r.answeredIdx.add(r.index);
  r.answers[r.index] = r.selected;
  r.submitted = true;
  if (r.selected === r.quiz.questions[r.index].answer) r.correct++;
  renderQuizzes();
}
function nextQuestion() {
  const r = quizRun;
  if (!r || !r.submitted) return;
  if (r.index + 1 < r.quiz.questions.length) { r.index++; r.selected = null; r.submitted = false; }
  else finishQuiz();
  renderQuizzes();
}
function finishQuiz() {
  const r = quizRun, total = r.quiz.questions.length;
  r.attempt = { id: uid(), quizId: r.quiz.id, title: r.quiz.title, date: todayKey(), total, correct: r.correct,
    incorrect: total - r.correct, percent: Math.round(r.correct / total * 100),
    review: r.quiz.questions.map((q, i) => ({ q: q.q, options: q.options, answer: q.answer, explain: q.explain, selected: r.answers[i] })) };
  state.quizAttempts.push(r.attempt);
  saveState();
  r.done = true;
}

function renderQuizzes() {
  const area = $('#quizArea'), r = quizRun;
  if (!r && reviewAttemptId) {
    area.innerHTML = reviewMarkup(reviewAttemptId);
  } else if (!r) {
    area.innerHTML = `<div class="quiz-grid">${QUIZZES.map(q => `<article class="card"><h2>${esc(q.title)}</h2>
      <p class="muted">${esc(findCourse(q.courseId).title)} · ${q.questions.length} questions</p>
      <button class="btn" data-startquiz="${q.id}">Start quiz</button></article>`).join('')}</div>`;
  } else if (r.done) {
    const a = r.attempt;
    area.innerHTML = `<article class="card"><h2>Score: ${a.percent}%</h2>
      <p>Total questions: ${a.total} · Correct: ${a.correct} · Incorrect: ${a.incorrect}</p>
      <div class="row"><button class="btn" data-startquiz="${r.quiz.id}">Retry quiz</button><button class="btn ghost" data-review="${a.id}">Review answers</button><button class="btn ghost" data-quizexit>Back to quizzes</button></div></article>`;
  } else {
    const q = r.quiz.questions[r.index];
    const opts = q.options.map((o, i) => {
      let cls = '';
      if (r.submitted) cls = i === q.answer ? 'correct' : (i === r.selected ? 'wrong' : '');
      return `<label class="option ${cls}"><input type="radio" name="opt" value="${i}" ${r.selected === i ? 'checked' : ''} ${r.submitted ? 'disabled' : ''}> ${esc(o)}</label>`;
    }).join('');
    let feedback = '';
    if (r.submitted) {
      const ok = r.selected === q.answer;
      feedback = `<p class="feedback" role="status">${ok ? 'Correct.' : 'Incorrect.'} ${esc(q.explain)}</p>`;
    }
    const last = r.index + 1 === r.quiz.questions.length;
    area.innerHTML = `<article class="card"><p class="muted">${esc(r.quiz.title)} · Question ${r.index + 1} of ${r.quiz.questions.length}</p>
      <fieldset class="question"><legend>${esc(q.q)}</legend>${opts}</fieldset>${feedback}
      <div class="row">${r.submitted
        ? `<button class="btn" data-nextq>${last ? 'See results' : 'Next question'}</button>`
        : `<button class="btn" data-submitq ${r.selected === null ? 'disabled' : ''}>Submit answer</button>`}
        <button class="btn ghost" data-quizexit>Quit quiz</button></div></article>`;
  }
  const hist = [...state.quizAttempts].reverse();
  $('#quizHistory').innerHTML = hist.length
    ? `<table><thead><tr><th>Date</th><th>Quiz</th><th>Correct</th><th>Score</th><th><span class="sr-only">Review</span></th></tr></thead><tbody>${hist.map(a =>
        `<tr><td>${a.date}</td><td>${esc(a.title)}</td><td>${a.correct}/${a.total}</td><td>${a.percent}%</td><td><button class="btn small ghost" data-review="${a.id}">Review</button></td></tr>`).join('')}</tbody></table>`
    : '<p class="muted">No attempts yet. Finish a quiz to see your history here.</p>';
}

/* ==========================================================
   8. DIGITAL NOTES
   ========================================================== */
let activeNoteId = null;
let saveTimer = null;

function renderNoteCourseOptions() {
  $('#noteCourse').innerHTML = '<option value="">No course</option>' + COURSES.map(c => `<option value="${c.id}">${esc(c.title)}</option>`).join('');
}
function renderNoteList() {
  const t = $('#noteSearch').value.trim().toLowerCase();
  const notes = [...state.notes].sort((a, b) => b.updated - a.updated)
    .filter(n => !t || (n.title + ' ' + n.html.replace(/<[^>]+>/g, ' ')).toLowerCase().includes(t));
  $('#noteList').innerHTML = notes.length ? notes.map(n =>
    `<li><button data-note="${n.id}" ${n.id === activeNoteId ? 'aria-current="true"' : ''}>${esc(n.title || 'Untitled note')}
     <small>${new Date(n.updated).toLocaleDateString()}${n.lessonId && findLesson(n.lessonId) ? ' · ' + esc(findLesson(n.lessonId).title) : ''}</small></button></li>`).join('')
    : '<li class="muted">No notes yet. Select "New note".</li>';
}
function loadNoteIntoEditor() {
  const n = state.notes.find(x => x.id === activeNoteId);
  $('#noteTitle').value = n ? n.title : '';
  $('#noteCourse').value = n ? n.courseId : '';
  $('#noteBody').innerHTML = n ? n.html : '';
}
function newNote() {
  const note = { id: uid(), title: '', courseId: '', html: '', updated: Date.now() };
  state.notes.push(note); activeNoteId = note.id;
  saveState(); loadNoteIntoEditor(); renderNoteList(); $('#noteTitle').focus();
}
function saveNote(silent) {
  if (!activeNoteId) { if (silent) return; newNote(); }
  const n = state.notes.find(x => x.id === activeNoteId);
  if (!n) return;
  n.title = $('#noteTitle').value.trim();
  n.courseId = $('#noteCourse').value;
  n.html = $('#noteBody').innerHTML;
  n.updated = Date.now();
  saveState(); renderNoteList();
  $('#noteStatus').textContent = 'Saved';
}
function deleteNote() {
  if (!activeNoteId || !confirm('Delete this note? This cannot be undone.')) return;
  state.notes = state.notes.filter(n => n.id !== activeNoteId);
  activeNoteId = null; saveState(); loadNoteIntoEditor(); renderNoteList();
}
function queueAutosave() {
  $('#noteStatus').textContent = 'Editing...';
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => saveNote(true), 700);
}

/* ==========================================================
   9. NAVIGATION, SEARCH, THEME
   ========================================================== */
function showView(name) {
  $$('.view').forEach(v => { v.hidden = v.id !== 'view-' + name; });
  $$('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === name));
  $('#pageTitle').textContent = $('#view-' + name).dataset.title;
  closeMenu();
}
function closeMenu() {
  $('#sidebar').classList.remove('open'); $('#scrim').hidden = true;
  $('#menuToggle').setAttribute('aria-expanded', 'false');
}
function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  $('#themeToggle').setAttribute('aria-label', state.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
}

function runGlobalSearch() {
  const t = $('#globalSearch').value.trim().toLowerCase(), box = $('#searchResults');
  if (!t) { box.hidden = true; return; }
  const hits = [
    ...allLessons().filter(l => l.title.toLowerCase().includes(t)).map(l => ({ label: l.title, sub: 'Lesson · ' + l.courseTitle, view: 'courses' })),
    ...RESOURCES.filter(r => r.title.toLowerCase().includes(t)).map(r => ({ label: r.title, sub: CAT_LABEL[r.category], view: 'resources' })),
    ...state.notes.filter(n => n.title.toLowerCase().includes(t)).map(n => ({ label: n.title, sub: 'Note', view: 'notes', note: n.id }))
  ].slice(0, 8);
  box.innerHTML = hits.length
    ? hits.map((h, i) => `<button data-hit="${i}">${esc(h.label)}<small>${esc(h.sub)}</small></button>`).join('')
    : '<p>No matches.</p>';
  box._hits = hits; box.hidden = false;
}

/* ==========================================================
   10. EVENTS
   ========================================================== */
function renderAll() {
  renderStats(); renderHeatmap(); renderNextLesson(); renderDashCourses(); renderRecent();
  renderCourses(); renderResources(); renderQuizzes(); renderNoteList(); renderLessonActions(); renderInsights();
}

function init() {
  applyTheme();
  // Course filter options
  $('#resourceCourse').innerHTML = '<option value="all">All courses</option>' + COURSES.map(c => `<option value="${c.id}">${esc(c.title)}</option>`).join('');
  renderNoteCourseOptions();
  renderAll();
  if (state.notes.length) { activeNoteId = [...state.notes].sort((a, b) => b.updated - a.updated)[0].id; loadNoteIntoEditor(); renderNoteList(); }

  $$('.nav-btn').forEach(b => b.addEventListener('click', () => showView(b.dataset.view)));
  $('#menuToggle').addEventListener('click', () => {
    const open = $('#sidebar').classList.toggle('open');
    $('#scrim').hidden = !open; $('#menuToggle').setAttribute('aria-expanded', String(open));
  });
  $('#scrim').addEventListener('click', closeMenu);
  $('#lessonBack').addEventListener('click', () => showView('courses'));
  $('#themeToggle').addEventListener('click', () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; saveState(); applyTheme(); });

  // Delegated clicks for dynamic content
  document.addEventListener('click', e => {
    const t = e.target.closest('button, input[data-lesson]');
    if (!t) { if (!e.target.closest('.search')) $('#searchResults').hidden = true; return; }
    if (t.dataset.complete) toggleLesson(t.dataset.complete);
    else if (t.dataset.openlesson) openLesson(t.dataset.openlesson);
    else if (t.hasAttribute('data-togglenotes')) { state.notesPanelOpen = !state.notesPanelOpen; saveState(); applyNotesPanel(); }
    else if (t.hasAttribute('data-opennote')) openLessonNoteInWorkspace();
    else if (t.dataset.open) openResource(t.dataset.open);
    else if (t.dataset.startquiz) startQuiz(t.dataset.startquiz);
    else if (t.hasAttribute('data-submitq')) submitAnswer();
    else if (t.hasAttribute('data-nextq')) nextQuestion();
    else if (t.hasAttribute('data-quizexit')) { quizRun = null; reviewAttemptId = null; renderQuizzes(); }
    else if (t.dataset.review) { quizRun = null; reviewAttemptId = t.dataset.review; renderQuizzes(); window.scrollTo(0, 0); }
    else if (t.dataset.retrymissed) { reviewAttemptId = null; retryMissed(t.dataset.retrymissed); window.scrollTo(0, 0); }
    else if (t.dataset.note) { saveNote(true); activeNoteId = t.dataset.note; loadNoteIntoEditor(); renderNoteList(); }
    else if (t.dataset.hit !== undefined) {
      const h = $('#searchResults')._hits[Number(t.dataset.hit)];
      showView(h.view);
      if (h.note) { activeNoteId = h.note; loadNoteIntoEditor(); renderNoteList(); }
      $('#searchResults').hidden = true; $('#globalSearch').value = '';
    }
  });
  document.addEventListener('change', e => {
    if (e.target.matches('input[data-lesson]')) toggleLesson(e.target.dataset.lesson);
    if (e.target.name === 'opt' && quizRun && !quizRun.submitted) { quizRun.selected = Number(e.target.value); renderQuizzes(); const sel = $('input[name="opt"]:checked'); if (sel) sel.focus(); }
  });

  $('#globalSearch').addEventListener('input', runGlobalSearch);
  $('#sessionForm').addEventListener('submit', e => {
    e.preventDefault();
    const minutes = Math.floor(Number($('#sessionMinutes').value));
    if (!(minutes >= 1 && minutes <= 600)) { $('#sessionMinutes').focus(); return; } // valid session = 1-600 min
    state.sessions.push({ id: uid(), date: todayKey(), type: 'manual', minutes });
    saveState(); renderAll();
  });

  // Resources
  $('#resourceTabs').addEventListener('click', e => {
    const b = e.target.closest('.tab'); if (!b) return;
    resourceFilter.cat = b.dataset.cat;
    $$('.tab').forEach(x => { const on = x === b; x.classList.toggle('active', on); x.setAttribute('aria-pressed', String(on)); });
    renderResources();
  });
  $('#resourceCourse').addEventListener('change', e => { resourceFilter.course = e.target.value; renderResources(); });
  $('#resourceSearch').addEventListener('input', e => { resourceFilter.text = e.target.value; renderResources(); });

  // Notes
  $('#newNoteBtn').addEventListener('click', newNote);
  $('#saveNoteBtn').addEventListener('click', () => saveNote(false));
  $('#deleteNoteBtn').addEventListener('click', deleteNote);
  $('#noteSearch').addEventListener('input', renderNoteList);
  ['#noteTitle', '#noteCourse', '#noteBody'].forEach(s => $(s).addEventListener('input', queueAutosave));
  $('#noteBody').addEventListener('paste', e => { // paste as plain text so foreign HTML never enters storage
    e.preventDefault();
    document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text/plain'));
  });
  $('.toolbar-rich').addEventListener('click', e => {
    const b = e.target.closest('button[data-cmd]'); if (!b) return;
    $('#noteBody').focus();
    document.execCommand(b.dataset.cmd, false, b.dataset.arg || null); // execCommand is deprecated but still universally supported
    queueAutosave();
  });
}

document.addEventListener('DOMContentLoaded', init);
