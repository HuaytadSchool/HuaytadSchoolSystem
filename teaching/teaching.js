/**
 * ============================================================================
 * Huaytad Lesson Plan Frontend Script - โรงเรียนบ้านห้วยตาด
 * มาตรฐาน: ใช้ SVG Icons ทั้งหมด (100% Emoji-Free)
 * ============================================================================
 */

const CONFIG = {
  GAS_WEB_APP_URL: "https://script.google.com/macros/s/AKfycbx5ogiJsGcGKpcFrNrbwq2r_gp58ljcffJaO4KLN2nzmoWoySKm4FRCFj0Kda7jjCe1mQ/exec",
  LIFF_ID: "2010662195-iJjI0NIA",
  MAX_FILE_SIZE_MB: 10
};

// SVG Icons Dictionary (มาตรฐานเดียวกับระบบของโรงเรียน)
const ICONS = {
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  fileText: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
  edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
  checkCircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  refresh: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
  circle: '<circle cx="12" cy="12" r="9"/>',
  paperclip: '<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  unlock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
  list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  alert: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  barChart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  arrowRight: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>'
};

function svg(name, size = 16, width = 2) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;display:inline-block;flex:none">${ICONS[name] || ''}</svg>`;
}

function showToast(title, icon = 'success') {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 2200,
    timerProgressBar: true
  });
}

const THAI_MONTHS_FULL = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

function getTodayBangkokISO() {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Bangkok' });
}

function formatThaiPickerDisplay(iso) {
  const m = String(iso || '').slice(0, 10).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return 'เลือกวันที่...';
  const y = parseInt(m[1], 10);
  const mon = parseInt(m[2], 10) - 1;
  const d = parseInt(m[3], 10);
  return `${d} ${THAI_MONTHS_FULL[mon] || ''} ${y + 543}`;
}

function thaiDatePicker(id, value = '') {
  const iso = value ? String(value).slice(0, 10) : '';
  const hasVal = /^\d{4}-\d{2}-\d{2}$/.test(iso);
  const label = hasVal ? formatThaiPickerDisplay(iso) : 'เลือกวันที่...';
  return `
    <div class="thai-cal-wrap">
      <button type="button" id="${id}-display" class="thai-cal-trigger" onclick="openThaiCalendar('${id}', this)">
        <span id="${id}-label" style="color:${hasVal ? '#0f172a' : '#94a3b8'};">${esc(label)}</span>
        <span style="color:#64748b; display:inline-flex;">${svg('calendar', 16)}</span>
      </button>
      <input type="hidden" id="${id}" value="${esc(iso)}"/>
    </div>
  `;
}

let _thaiCalState = { targetId: null, viewYear: new Date().getFullYear(), viewMonth: new Date().getMonth() };

function closeThaiCalendar() {
  const pop = document.getElementById('thai-cal-popup');
  if (pop) pop.remove();
  _thaiCalState.targetId = null;
}

function openThaiCalendar(targetId, triggerEl) {
  const existing = document.getElementById('thai-cal-popup');
  if (existing && _thaiCalState.targetId === targetId) {
    closeThaiCalendar();
    return;
  }
  closeThaiCalendar();

  const hid = document.getElementById(targetId);
  const iso = hid ? hid.value : '';
  const m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const todayIso = getTodayBangkokISO();
  const tm = todayIso.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  _thaiCalState.targetId = targetId;
  _thaiCalState.viewYear = m ? parseInt(m[1], 10) : parseInt(tm[1], 10);
  _thaiCalState.viewMonth = m ? parseInt(m[2], 10) - 1 : parseInt(tm[2], 10) - 1;

  const pop = document.createElement('div');
  pop.id = 'thai-cal-popup';
  pop.className = 'thai-cal-popup no-print';
  pop.addEventListener('click', (e) => e.stopPropagation());
  document.body.appendChild(pop);

  renderThaiCalendarPopup();

  // จัดตำแหน่งไม่ให้ล้นขอบจอหรือโดน Modal ตัด
  const rect = triggerEl.getBoundingClientRect();
  const popRect = pop.getBoundingClientRect();
  let top = rect.bottom + 6;
  if (top + popRect.height > window.innerHeight - 8 && rect.top - popRect.height - 6 > 8) {
    top = rect.top - popRect.height - 6;
  }
  let left = rect.left;
  if (left + popRect.width > window.innerWidth - 8) {
    left = Math.max(8, window.innerWidth - popRect.width - 8);
  }
  pop.style.top = `${top}px`;
  pop.style.left = `${left}px`;
}

function renderThaiCalendarPopup() {
  const pop = document.getElementById('thai-cal-popup');
  if (!pop || !_thaiCalState.targetId) return;

  const hid = document.getElementById(_thaiCalState.targetId);
  const selectedIso = hid ? hid.value : '';
  const todayIso = getTodayBangkokISO();
  const { viewYear: y, viewMonth: m } = _thaiCalState;

  const nowYr = new Date().getFullYear();
  const minYr = Math.min(nowYr - 3, y);
  const maxYr = Math.max(nowYr + 3, y);
  const yearOpts = [];
  for (let yr = minYr; yr <= maxYr; yr++) {
    yearOpts.push(`<option value="${yr}" ${yr === y ? 'selected' : ''}>${yr + 543}</option>`);
  }
  const monthOpts = THAI_MONTHS_FULL.map((name, idx) =>
    `<option value="${idx}" ${idx === m ? 'selected' : ''}>${name}</option>`
  ).join('');

  const firstWeekday = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  let cells = '';
  for (let i = 0; i < firstWeekday; i++) {
    cells += '<div></div>';
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const wd = (firstWeekday + d - 1) % 7;
    const cls = [
      'thai-cal-day',
      (wd === 0 || wd === 6) ? 'is-weekend' : '',
      iso === todayIso ? 'is-today' : '',
      iso === selectedIso ? 'is-selected' : ''
    ].filter(Boolean).join(' ');
    cells += `<button type="button" class="${cls}" onclick="selectThaiCalendarDate('${iso}')">${d}</button>`;
  }

  pop.innerHTML = `
    <div class="thai-cal-header">
      <button type="button" class="thai-cal-nav-btn" onclick="stepThaiCalendarMonth(-1)" title="เดือนก่อนหน้า">&#8249;</button>
      <div class="thai-cal-selects">
        <select onchange="jumpThaiCalendar(this.value, null)" style="flex:1.4;">${monthOpts}</select>
        <select onchange="jumpThaiCalendar(null, this.value)" style="flex:1;">${yearOpts.join('')}</select>
      </div>
      <button type="button" class="thai-cal-nav-btn" onclick="stepThaiCalendarMonth(1)" title="เดือนถัดไป">&#8250;</button>
    </div>
    <div class="thai-cal-weekdays">
      <span>อา</span><span>จ</span><span>อ</span><span>พ</span><span>พฤ</span><span>ศ</span><span>ส</span>
    </div>
    <div class="thai-cal-days">${cells}</div>
    <div class="thai-cal-footer">
      <button type="button" class="thai-cal-foot-btn primary" onclick="selectThaiCalendarDate('${todayIso}')">วันนี้</button>
      <button type="button" class="thai-cal-foot-btn" onclick="closeThaiCalendar()">ปิด</button>
    </div>
  `;
}

function stepThaiCalendarMonth(delta) {
  let m = _thaiCalState.viewMonth + delta;
  let y = _thaiCalState.viewYear;
  if (m < 0) { m = 11; y -= 1; }
  else if (m > 11) { m = 0; y += 1; }
  _thaiCalState.viewMonth = m;
  _thaiCalState.viewYear = y;
  renderThaiCalendarPopup();
}

function jumpThaiCalendar(monthVal, yearVal) {
  if (monthVal !== null) _thaiCalState.viewMonth = parseInt(monthVal, 10);
  if (yearVal !== null) _thaiCalState.viewYear = parseInt(yearVal, 10);
  renderThaiCalendarPopup();
}

function selectThaiCalendarDate(iso) {
  const id = _thaiCalState.targetId;
  if (!id) return;
  const hid = document.getElementById(id);
  const lbl = document.getElementById(id + '-label');
  if (hid) hid.value = iso;
  if (lbl) {
    lbl.textContent = formatThaiPickerDisplay(iso);
    lbl.style.color = '#0f172a';
  }
  closeThaiCalendar();
}

document.addEventListener('click', (e) => {
  const pop = document.getElementById('thai-cal-popup');
  if (!pop) return;
  if (e.target.closest('.thai-cal-wrap') || e.target.closest('#thai-cal-popup')) return;
  closeThaiCalendar();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeThaiCalendar();
});

// Global App State
let state = {
  currentLineProfile: null,
  teacher: null,
  isAcademic: false,
  canManage: false,
  activeTerm: null,
  loads: [],
  rounds: [],
  pendingReviewsCount: 0,
  activeTab: 'loads',
  selectedLoad: null,
  selectedPlan: null,
  uploadedBase64: null,
  uploadedFileName: null,
  reportsData: null,
  reportFilterTerm: '',
  reportFilterRound: '',
  reportFilterGroup: '',
  reportScope: 'all',
  reportSubView: 'plans',
  complianceFilter: 'all',
  complianceSearch: '',
  manageSubTab: 'loads',
  subjectSearchKeyword: '',
  subjectFilterGroup: ''
};

// API Call Proxy (แบบเดียวกับระบบลาของโรงเรียน)
const api = new Proxy({}, {
  get: (_t, funcName) => async (...args) => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 60000);
    try {
      const res = await fetch(CONFIG.GAS_WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: funcName, args: args }),
        signal: ctrl.signal
      });
      clearTimeout(timer);
      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (e) {
        throw new Error('ไม่สามารถอ่านข้อมูลตอบกลับจากเซิร์ฟเวอร์');
      }
      if (!json.success) throw new Error(json.error || 'เกิดข้อผิดพลาดในการประมวลผล');
      return json.data;
    } catch (err) {
      clearTimeout(timer);
      throw new Error(err.message || 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    }
  }
});

// App Initialization
document.addEventListener('DOMContentLoaded', async () => {
  await initLiffAndApp();
});

async function initLiffAndApp() {
  showLoader(true, 'กำลังเชื่อมต่อระบบ...');
  try {
    let lineUserId = 'mock_line_user_id';
    let lineProfile = null;

    if (typeof liff !== 'undefined' && CONFIG.LIFF_ID) {
      await liff.init({ liffId: CONFIG.LIFF_ID });
      if (liff.isLoggedIn()) {
        lineProfile = await liff.getProfile();
        lineUserId = lineProfile.userId;
      } else {
        showLoader(false);
        renderLoginScreen();
        return;
      }
    } else {
      showLoader(false);
      renderLoginScreen();
      return;
    }

    state.currentLineProfile = lineProfile;

    // ดึงข้อมูลเริ่มต้นของครู
    showLoader(true, 'กำลังโหลดข้อมูลภาระการสอน...');
    const bootstrap = await api.getTeachingBootstrap(lineUserId);

    state.teacher = bootstrap.teacher;
    state.directorName = bootstrap.directorName || '';
    state.isAcademic = Boolean(bootstrap.isAcademic || ['Academic', 'Admin', 'Director'].includes(state.teacher.role));
    state.canManage = Boolean(bootstrap.canManage !== undefined ? bootstrap.canManage : (state.isAcademic && state.teacher.role !== 'Director'));
    if (state.isAcademic) state.reportSubView = 'compliance';
    state.activeTerm = bootstrap.activeTerm;
    state.loads = bootstrap.loads || [];
    state.rounds = bootstrap.rounds || [];
    state.pendingReviewsCount = bootstrap.pendingReviewsCount || 0;

    renderUserProfile();
    renderTabs();
    renderCurrentTab();

  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'เข้าสู่ระบบไม่สำเร็จ',
      text: err.message,
      confirmButtonText: 'ตกลง',
      confirmButtonColor: '#1e3a8a'
    });
  } finally {
    showLoader(false);
  }
}

// --------------------------------------------------------------------------
// UI Rendering
// --------------------------------------------------------------------------

function renderLoginScreen() {
  const container = document.querySelector('.main-container');
  if (!container) return;
  container.innerHTML = `
    <div style="min-height:70vh; display:flex; align-items:center; justify-content:center; padding:16px;">
      <div style="background:#ffffff; border:1px solid var(--border); border-radius:24px; box-shadow:var(--shadow-md); max-width:400px; width:100%; padding:36px 24px; text-align:center;">
        <img src="../img/logo-ht.png" alt="Logo" style="width:72px; height:72px; margin-bottom:16px; object-fit:contain;" onerror="this.style.display='none'"/>
        <h2 style="font-size:20px; font-weight:800; color:var(--primary); margin-bottom:6px;">Huaytad Lesson Plan</h2>
        <p style="font-size:13px; color:var(--text-muted); margin-bottom:24px;">ระบบแผนการจัดการเรียนรู้และบันทึกหลังสอน<br/>โรงเรียนบ้านห้วยตาด</p>
        <button onclick="handleLineLogin()" style="width:100%; background:#06c755; color:#ffffff; border:none; border-radius:12px; padding:14px; font-size:15px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:10px; box-shadow:0 4px 12px rgba(6,199,85,0.25);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff"><path d="M12 2C6.48 2 2 5.92 2 10.75c0 4.3 3.6 7.9 8.5 8.63.33.07.78.22.89.51.1.26.07.67.03 1.05-.12.87-.53 2.68-.58 2.94-.08.41.15.56.44.38 2.37-1.4 6.44-3.8 8.79-6.5C21.32 15.65 22 13.3 22 10.75 22 5.92 17.52 2 12 2z"/></svg>
          เข้าสู่ระบบด้วย LINE
        </button>
      </div>
    </div>
  `;
}

function handleLineLogin() {
  if (typeof liff !== 'undefined' && liff.login) {
    liff.login();
  } else {
    Swal.fire('แจ้งเตือน', 'กรุณาเปิดลิงก์นี้ผ่านแอปพลิเคชัน LINE หรือบนบราวเซอร์ที่รองรับ LIFF', 'info');
  }
}

function renderUserProfile() {
  const t = state.teacher;
  if (!t) return;

  document.getElementById('user-name').innerText = t.fullName;
  document.getElementById('user-meta').innerText = `${t.position || 'ครู'} • ${t.department || 'ไม่ระบุกลุ่มสาระ'}`;

  const avatarEl = document.getElementById('user-avatar-wrap');
  if (state.currentLineProfile && state.currentLineProfile.pictureUrl) {
    avatarEl.innerHTML = `<img src="${state.currentLineProfile.pictureUrl}" class="user-avatar" alt="profile"/>`;
  } else {
    avatarEl.innerHTML = `<div class="user-avatar-placeholder">${t.name ? t.name.charAt(0) : 'ค'}</div>`;
  }

  if (state.activeTerm) {
    document.getElementById('term-badge').innerText = `ภาคเรียนที่ ${state.activeTerm.term}/${state.activeTerm.year}`;
  }
}

function renderTabs() {
  const isReviewer = state.isAcademic || state.teacher.role === 'Head' || state.pendingReviewsCount > 0;
  const reviewTab = document.getElementById('tab-reviews-btn');
  if (reviewTab) {
    if (isReviewer) {
      reviewTab.style.display = 'flex';
      const badge = document.getElementById('review-badge');
      if (badge) {
        badge.innerText = state.pendingReviewsCount;
        badge.style.display = state.pendingReviewsCount > 0 ? 'inline-block' : 'none';
      }
    } else {
      reviewTab.style.display = 'none';
    }
  }

  // แท็บจัดการวิชาการ (สำหรับผู้รับผิดชอบฝ่ายวิชาการ และ Admin เท่านั้น — ไม่รวม Director)
  const manageTab = document.getElementById('tab-manage-btn');
  if (manageTab) {
    manageTab.style.display = state.canManage ? 'flex' : 'none';
  }
}

function switchTab(tabName) {
  state.activeTab = tabName;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`tab-${tabName}-btn`);
  if (activeBtn) activeBtn.classList.add('active');
  renderCurrentTab();
}

function renderCurrentTab() {
  const container = document.getElementById('tab-content');
  if (state.activeTab === 'loads') {
    renderLoads(container);
  } else if (state.activeTab === 'reflections') {
    renderReflections(container);
  } else if (state.activeTab === 'reviews') {
    renderReviews(container);
  } else if (state.activeTab === 'manage') {
    renderManage(container);
  } else if (state.activeTab === 'reports') {
    renderReports(container);
  }
}

// Tab 1: ภาระการสอน
function renderLoads(container) {
  if (!state.loads || state.loads.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${svg('book', 40, 1.5)}</div>
        <p style="margin-top:10px;">ยังไม่มีข้อมูลภาระการสอนในภาคเรียนนี้</p>
        <small class="text-muted">กรุณาติดต่อฝ่ายวิชาการเพื่อกำหนดรายวิชาที่สอน</small>
      </div>`;
    return;
  }

  let html = '';
  state.loads.forEach(load => {
    const plans = load.plans || [];

    const unitsHtml = plans.length === 0
      ? `<div style="font-size:12.5px; color:#64748b; background:#f8fafc; padding:12px; border-radius:8px; border:1px dashed #cbd5e1; margin:10px 0; text-align:center;">
          ยังไม่มีหน่วยการเรียนรู้ที่ส่งในรายวิชานี้ — กดปุ่ม <strong>"+ เพิ่มหน่วยการเรียนรู้"</strong> ด้านล่าง
        </div>`
      : `<div style="display:flex; flex-direction:column; gap:8px; margin:10px 0;">
          ${plans.map(p => {
            const st = p.status || 'Not_Submitted';
            const badge = getStatusBadge(st);
            const isLocked = ['Pending_Head', 'Pending_Academic', 'Approved'].includes(st);
            const isOverdue = p.due_date && new Date(p.due_date) < new Date() && ['Not_Submitted', 'Draft', 'Revise'].includes(st);
            return `
              <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px 12px;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; flex-wrap:wrap;">
                  <div style="min-width:0;">
                    <div style="font-size:13.5px; font-weight:700; color:#0f172a;">${esc(p.unit_title || 'ไม่ระบุชื่อหน่วย')} (${p.teaching_hours || 0} ชม.)</div>
                    <div style="font-size:11.5px; color:#64748b; margin-top:2px;">
                      ${esc(p.round_title || 'รอบส่งแผน')} · ฉบับที่ ${p.version || 1} ${p.due_date ? '· กำหนดส่ง: ' + formatDate(p.due_date) : ''}
                    </div>
                  </div>
                  <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
                    ${badge}
                    ${isOverdue ? `<span class="status-badge status-revise" style="font-size:10.5px;">${svg('alert', 10)} เกินกำหนด</span>` : ''}
                  </div>
                </div>
                <div style="display:flex; gap:6px; align-items:center; flex-wrap:wrap; margin-top:8px;">
                  <button class="btn-secondary" style="font-size:12px; padding:5px 10px;" onclick="openHistoryModal('${p.plan_id}')">
                    ${svg('clock', 13)} <span>ประวัติ</span>
                  </button>
                  ${p.drive_pdf_url ? `
                    <a href="${p.drive_pdf_url}" target="_blank" class="btn-secondary" style="font-size:12px; padding:5px 10px; text-decoration:none;">
                      ${svg('fileText', 13)} <span>ดู PDF</span>
                    </a>
                  ` : ''}
                  ${isLocked ? `
                    <span style="font-size:11.5px; color:#64748b; display:inline-flex; align-items:center; gap:4px; padding:4px 8px; background:#e2e8f0; border-radius:6px;">
                      ${svg('lock', 11)} ล็อกรอการตรวจ
                    </span>
                  ` : `
                    <button class="btn-primary" style="font-size:12px; padding:5px 10px;" onclick="openSubmitModal('${load.load_id}', '${p.plan_id}')">
                      ${svg('edit', 13)} <span>${st === 'Revise' ? 'ส่งฉบับแก้ไข' : 'แก้ไขร่าง'}</span>
                    </button>
                  `}
                  ${st === 'Approved' ? `
                    <button class="btn-primary" onclick="switchTab('reflections')" style="font-size:12px; padding:5px 10px; background:#16a34a;">
                      ${svg('plus', 13)} <span>บันทึกหลังสอน</span>
                    </button>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>`;

    html += `
      <div class="load-card">
        <div class="load-header">
          <div>
            <span class="subject-code">${esc(load.subject_code || 'วิชา')}</span>
            <div class="subject-name">${esc(load.subject_name)}</div>
            <div class="classroom-tag">ชั้น ${esc(load.classroom)} ${load.level ? '(' + esc(load.level) + ')' : ''}</div>
          </div>
          <span style="font-size:12px; font-weight:700; color:#1e3a8a; background:#eff6ff; padding:4px 10px; border-radius:999px;">
            ${plans.length} หน่วย
          </span>
        </div>

        ${unitsHtml}

        <div class="load-info-row">
          <div class="reviewer-info">
            <span>ผู้ตรวจ: <strong>${esc(load.reviewer_name)}</strong></span>
          </div>
          <div>
            <button class="btn-primary" onclick="openSubmitModal('${load.load_id}')">
              ${svg('plus', 14)} <span>เพิ่มหน่วยการเรียนรู้</span>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = `<div class="cards-grid">${html}</div>`;
}

// Tab 2: บันทึกหลังสอน
function renderReflections(container) {
  const approvedPlans = [];
  state.loads.forEach(load => {
    (load.plans || []).forEach(plan => {
      if (plan.status === 'Approved') {
        approvedPlans.push({ ...plan, load: load });
      }
    });
  });

  if (approvedPlans.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${svg('edit', 40, 1.5)}</div>
        <p style="margin-top:10px;">ยังไม่มีแผนการสอนที่ผ่านการรับรอง</p>
        <small class="text-muted">เมื่อแผนการสอนได้รับการรับรองจากฝ่ายวิชาการแล้ว จะสามารถบันทึกหลังสอนได้ที่นี่</small>
      </div>`;
    return;
  }

  let html = '';
  approvedPlans.forEach(item => {
    html += `
      <div class="load-card">
        <div class="load-header">
          <div>
            <span class="subject-code">${esc(item.load.subject_code)}</span>
            <div class="subject-name">${esc(item.load.subject_name)} (ชั้น ${esc(item.load.classroom)})</div>
            <div class="classroom-tag">หน่วย: ${esc(item.unit_title)}</div>
          </div>
          <div><span class="status-badge status-approved">${svg('checkCircle', 12)} รับรองแล้ว</span></div>
        </div>
        <div class="load-info-row">
          <div style="display:flex; gap:8px;">
            <button class="btn-secondary" onclick="openPlanReflectionsListModal('${item.plan_id}', '${esc(item.unit_title)}')">
              ${svg('list', 14)} <span>ดูบันทึกทั้งหมด</span>
            </button>
          </div>
          <button class="btn-primary" onclick="openReflectionModal('${item.plan_id}', '${esc(item.unit_title)}')">
            ${svg('plus', 14)} <span>เพิ่มบันทึกหลังสอน</span>
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = `<div class="cards-grid">${html}</div>`;
}

// Tab 3: รายการรอตรวจ (สำหรับหัวหน้ากลุ่มสาระ และวิชาการ)
// Tab 3: รายการรอตรวจ (สำหรับหัวหน้ากลุ่มสาระ และวิชาการ)
async function renderReviews(container) {
  container.innerHTML = `
    <div style="text-align:center; padding:40px 16px;">
      <div class="spinner" style="margin:0 auto 12px;"></div>
      <p style="color:#64748b; font-size:13px;">กำลังโหลดรายการแผนการสอนที่รอตรวจ...</p>
    </div>`;

  try {
    const list = await api.getPendingReviews(state.teacher.lineUserId);
    state.pendingReviewsList = list || [];
    
    // อัปเดตตัวเลข badge
    const badge = document.getElementById('review-badge');
    if (badge) {
      badge.innerText = state.pendingReviewsList.length;
      badge.style.display = state.pendingReviewsList.length > 0 ? 'inline-block' : 'none';
    }

    if (state.pendingReviewsList.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">${svg('checkCircle', 44, 1.5)}</div>
          <p style="margin-top:10px; font-weight:700;">ไม่มีแผนการสอนที่รอการตรวจในขณะนี้</p>
          <small class="text-muted">เมื่อมีครูส่งแผนการสอนเข้ามา รายการจะแสดงขึ้นที่นี่โดยอัตโนมัติ</small>
        </div>`;
      return;
    }

    let html = '';
    state.pendingReviewsList.forEach(item => {
      const isHeadReview = item.review_role === 'Head';
      const roleBadge = isHeadReview 
        ? `<span class="status-badge status-pending_head">${svg('clock', 12)} รอหัวหน้ากลุ่มสาระตรวจ</span>`
        : `<span class="status-badge status-pending_academic">${svg('eye', 12)} รอผู้อำนวยการรับรอง</span>`;

      html += `
        <div class="load-card">
          <div class="load-header">
            <div>
              <span class="subject-code">${esc(item.subject_code)}</span>
              <div class="subject-name">${esc(item.subject_name)} (ชั้น ${esc(item.classroom)})</div>
              <div class="classroom-tag" style="margin-top:2px;">
                ผู้สอน: <strong>${esc(item.teacher_name)}</strong> ${item.teacher_dept ? '(' + esc(item.teacher_dept) + ')' : ''}
              </div>
            </div>
            <div>${roleBadge}</div>
          </div>

          <div style="font-size:13px; color:#475569; margin: 10px 0; background:#f8fafc; padding:10px 14px; border-radius:8px; border:1px solid #e2e8f0;">
            <div><strong>หน่วย/เรื่อง:</strong> ${esc(item.unit_title)} (${item.teaching_hours || 0} ชม.)</div>
            <div><strong>ฉบับที่:</strong> ฉบับที่ ${item.version || 1} • ส่งเมื่อ: ${formatDate(item.submitted_at)}</div>
          </div>

          <div class="load-info-row">
            <div>
              <button class="btn-secondary" onclick="openHistoryModal('${item.plan_id}')">
                ${svg('clock', 14)} <span>ประวัติ</span>
              </button>
            </div>
            <div style="display:flex; gap:8px;">
              ${item.drive_pdf_url ? `
                <a href="${item.drive_pdf_url}" target="_blank" class="btn-secondary" style="text-decoration:none;">
                  ${svg('fileText', 14)} <span>เปิดดู PDF</span>
                </a>
              ` : ''}
              <button class="btn-primary" onclick="openReviewModal('${item.plan_id}')">
                ${svg('check', 14)} <span>ตรวจรับรอง</span>
              </button>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = `<div class="cards-grid">${html}</div>`;

  } catch (err) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${svg('alert', 40, 1.5)}</div>
        <p style="color:#dc2626;">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
        <small class="text-muted">${esc(err.message)}</small>
      </div>`;
  }
}

// Modal ตรวจรับรองแผนการสอน
function openReviewModal(planId) {
  const item = (state.pendingReviewsList || []).find(p => String(p.plan_id) === String(planId));
  if (!item) return;

  const isHead = item.review_role === 'Head';
  const passLabel = isHead ? 'ผ่านการตรวจ (ส่งต่อให้ผู้อำนวยการรับรอง)' : 'รับรองแผนสมบูรณ์ (ผู้อำนวยการอนุมัติ)';

  const content = `
    <div class="modal-header">
      <div class="modal-title">ตรวจรับรองแผนการสอน</div>
      <button class="modal-close-btn" onclick="closeModal()">${svg('x', 18)}</button>
    </div>

    <div style="background:#f1f5f9; padding:12px 14px; border-radius:8px; font-size:13px; margin-bottom:16px; border:1px solid #e2e8f0;">
      <div><strong>วิชา:</strong> ${esc(item.subject_code)} ${esc(item.subject_name)} (ชั้น ${esc(item.classroom)})</div>
      <div><strong>ผู้สอน:</strong> ${esc(item.teacher_name)} | <strong>หน่วย:</strong> ${esc(item.unit_title)} (ฉบับที่ ${item.version})</div>
    </div>

    ${item.drive_pdf_url ? `
      <div style="margin-bottom:16px; display:flex; gap:8px; flex-wrap:wrap;">
        <a href="${item.drive_pdf_url}" target="_blank" class="btn-secondary" style="flex:1; min-width:150px; justify-content:center; padding:10px; text-decoration:none; display:flex;">
          ${svg('fileText', 16)} <span>เปิดดู PDF ฉบับที่ ${item.version || 1}</span>
        </a>
        <button type="button" class="btn-secondary" style="flex:1; min-width:150px; justify-content:center; padding:10px;" onclick="openHistoryModal('${item.plan_id}')">
          ${svg('clock', 16)} <span>ดูประวัติ & เทียบไฟล์เก่า</span>
        </button>
      </div>
    ` : ''}

    <form id="review-form">
      <div class="form-group">
        <label class="form-label">ผลการพิจารณา *</label>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <label style="display:flex; align-items:center; gap:8px; padding:10px 12px; border:1px solid #cbd5e1; border-radius:8px; cursor:pointer; background:#f0fdf4;">
            <input type="radio" name="review_action" value="Pass" checked onchange="toggleCommentRequirement(false)"/>
            <div>
              <div style="font-weight:700; color:#15803d;">อนุมัติ / ผ่านการตรวจ</div>
              <small style="color:#64748b;">${passLabel}</small>
            </div>
          </label>
          <label style="display:flex; align-items:center; gap:8px; padding:10px 12px; border:1px solid #cbd5e1; border-radius:8px; cursor:pointer; background:#fef2f2;">
            <input type="radio" name="review_action" value="Revise" onchange="toggleCommentRequirement(true)"/>
            <div>
              <div style="font-weight:700; color:#b91c1c;">ส่งกลับเพื่อแก้ไข</div>
              <small style="color:#64748b;">ให้ครูผู้สอนปรับปรุงแผนตามข้อเสนอแนะและส่งใหม่</small>
            </div>
          </label>
        </div>
      </div>

      <div class="form-group" style="margin-top:14px;">
        <label class="form-label" id="review-comment-label">ข้อเสนอแนะ / ความเห็นเพิ่มเติม</label>
        <textarea id="review-comment" class="form-textarea" rows="3" placeholder="ระบุความเห็นหรือจุดที่ต้องปรับปรุงแก้ไข..."></textarea>
      </div>

      <div style="display:flex; gap:10px; margin-top:20px;">
        <button type="button" class="btn-secondary" style="flex:1; justify-content:center;" onclick="closeModal()">
          ยกเลิก
        </button>
        <button type="button" class="btn-primary" style="flex:1; justify-content:center;" onclick="submitReviewAction('${item.plan_id}')">
          ${svg('check', 14)} <span>บันทึกผลการตรวจ</span>
        </button>
      </div>
    </form>
  `;

  showModal(content);
}

function toggleCommentRequirement(isRequired) {
  const label = document.getElementById('review-comment-label');
  const textarea = document.getElementById('review-comment');
  if (label && textarea) {
    if (isRequired) {
      label.innerHTML = 'ข้อเสนอแนะ / เหตุผลการส่งกลับแก้ไข <span style="color:#dc2626;">*</span>';
      textarea.setAttribute('required', 'required');
      textarea.focus();
    } else {
      label.innerHTML = 'ข้อเสนอแนะ / ความเห็นเพิ่มเติม (ไม่บังคับ)';
      textarea.removeAttribute('required');
    }
  }
}

async function submitReviewAction(planId) {
  const selectedRadio = document.querySelector('input[name="review_action"]:checked');
  if (!selectedRadio) return;

  const action = selectedRadio.value;
  const comment = document.getElementById('review-comment').value.trim();

  if (action === 'Revise' && !comment) {
    Swal.fire('กรุณาระบุข้อเสนอแนะ', 'กรณีส่งกลับแก้ไข ต้องระบุเหตุผลหรือจุดที่ต้องปรับปรุงให้ครูทราบด้วยครับ', 'warning');
    return;
  }

  closeModal();
  showLoader(true, 'กำลังบันทึกผลการตรวจ...');

  try {
    await api.reviewLessonPlan({
      planId: planId,
      action: action,
      comment: comment,
      lineUserId: state.teacher.lineUserId
    });

    Swal.fire({
      icon: 'success',
      title: action === 'Pass' ? 'ตรวจรับรองเรียบร้อย' : 'ส่งกลับแก้ไขแล้ว',
      text: 'ระบบได้บันทึกประวัติและแจ้งเตือนไปยังครูผู้สอนทาง LINE เรียบร้อยแล้ว',
      confirmButtonColor: '#1e3a8a'
    }).then(async () => {
      // โหลดหน้าจอรอตรวจใหม่
      const container = document.getElementById('tab-content');
      await renderReviews(container);
    });

  } catch (err) {
    Swal.fire('เกิดข้อผิดพลาด', err.message, 'error');
  } finally {
    showLoader(false);
  }
}

// Tab 4: จัดการวิชาการ (สำหรับ Academic / Admin / Director)
async function renderManage(container) {
  if (!state.manageData) {
    container.innerHTML = `
      <div style="text-align:center; padding:40px 16px;">
        <div class="spinner" style="margin:0 auto 12px;"></div>
        <p style="color:#64748b; font-size:13px;">กำลังโหลดข้อมูลการจัดการฝ่ายวิชาการ...</p>
      </div>`;
    try {
      const data = await api.getAcademicManageData(state.teacher.lineUserId);
      state.manageData = data;
    } catch (err) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">${svg('alert', 40, 1.5)}</div>
          <p style="color:#dc2626;">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
          <small class="text-muted">${esc(err.message)}</small>
        </div>`;
      return;
    }
  }

  const data = state.manageData;
  const rounds = data.rounds || [];
  const loads = data.loads || [];
  const subjects = data.subjects || [];
  const groups = data.groups || [];
  const currentSubTab = state.manageSubTab || 'loads';

  // Subtab navigation header
  let html = `
    <div style="margin-bottom:18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
      <div>
        <h2 style="font-size:18px; font-weight:800; color:var(--primary); margin-bottom:2px; display:flex; align-items:center; gap:8px;">
          ${svg('settings', 18)} <span>การจัดการฝ่ายวิชาการ</span>
        </h2>
        <p style="font-size:12.5px; color:var(--text-muted);">
          โรงเรียนบ้านห้วยตาด · จัดรอบส่ง มอบหมายภาระการสอน และคลังรายวิชา
        </p>
      </div>
      <div class="subview-tabs">
        <button class="subview-btn ${currentSubTab === 'loads' ? 'active' : ''}" onclick="setManageSubTab('loads')">
          ${svg('book', 14)} <span>ภาระการสอน (${loads.length})</span>
        </button>
        <button class="subview-btn ${currentSubTab === 'rounds' ? 'active' : ''}" onclick="setManageSubTab('rounds')">
          ${svg('calendar', 14)} <span>รอบการส่งแผน (${rounds.length})</span>
        </button>
        <button class="subview-btn ${currentSubTab === 'subjects' ? 'active' : ''}" onclick="setManageSubTab('subjects')">
          ${svg('list', 14)} <span>คลังรายวิชา (${subjects.length})</span>
        </button>
        <button class="subview-btn ${currentSubTab === 'settings' ? 'active' : ''}" onclick="setManageSubTab('settings')">
          ${svg('settings', 14)} <span>ตั้งค่าฝ่ายวิชาการ</span>
        </button>
      </div>
    </div>
  `;

  if (currentSubTab === 'loads') {
    // -------------------------------------------------------------
    // ส่วนที่ 1: ภาระการสอน
    // -------------------------------------------------------------
    let loadsHtml = '';
    if (loads.length === 0) {
      loadsHtml = '<div class="empty-state"><div class="empty-icon">' + svg('book', 40, 1.5) + '</div><p style="margin-top:10px;">ยังไม่มีการมอบหมายภาระการสอนในภาคเรียนนี้</p></div>';
    } else {
      loadsHtml = loads.map(l => `
        <div class="load-card" style="margin-bottom:12px;">
          <div class="load-header">
            <div>
              <span class="subject-code">${esc(l.subject_code)}</span>
              <div class="subject-name">${esc(l.subject_name)} (ชั้น ${esc(l.classroom)})</div>
              <div class="classroom-tag" style="margin-top:2px;">
                ผู้สอน: <strong>${esc(l.teacher_name)}</strong> ${l.teacher_dept ? '(' + esc(l.teacher_dept) + ')' : ''}
              </div>
            </div>
          </div>
          <div class="load-info-row">
            <div class="reviewer-info">
              ผู้ตรวจ: <strong>${esc(l.reviewer_name)}</strong>
            </div>
            <div style="display:flex; gap:6px; align-items:center;">
              <button class="btn-secondary" style="font-size:12px; padding:6px 12px;" onclick="openChangeReviewerModal('${l.load_id}', '${esc(l.subject_code)}', '${esc(l.classroom)}', '${esc(l.reviewer_id)}')">
                ${svg('edit', 12)} <span>เปลี่ยนผู้ตรวจ</span>
              </button>
              ${Number(l.plan_count || 0) === 0
                ? `<button class="btn-secondary" style="font-size:12px; padding:6px 10px; color:#dc2626; border-color:#fecaca; background:#fef2f2;" onclick="handleDeleteLoad('${l.load_id}', '${esc(l.subject_code)} ${esc(l.subject_name)}', '${esc(l.classroom)}')">ลบ</button>`
                : `<button class="btn-secondary" disabled title="มีการส่งแผนแล้ว ${Number(l.plan_count || 0)} แผน ไม่สามารถลบได้" style="font-size:12px; padding:6px 10px; opacity:0.45; cursor:not-allowed;">ลบ</button>`}
            </div>
          </div>
        </div>
      `).join('');
    }

    html += `
      <div style="margin-bottom:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <div style="font-size:15px; font-weight:800; color:#1e3a8a; display:flex; align-items:center; gap:6px;">
          ${svg('book', 16)} <span>ทะเบียนภาระการสอนและผู้ตรวจประจำวิชา</span>
        </div>
        <button class="btn-primary" onclick="openCreateLoadModal()" style="background:#0284c7;">
          ${svg('plus', 14)} <span>มอบหมายภาระสอนใหม่</span>
        </button>
      </div>
      <div class="cards-grid">
        ${loadsHtml}
      </div>
    `;

  } else if (currentSubTab === 'rounds') {
    // -------------------------------------------------------------
    // ส่วนที่ 2: รอบการส่งแผน
    // -------------------------------------------------------------
    let roundsHtml = '';
    if (rounds.length === 0) {
      roundsHtml = '<div class="empty-state"><div class="empty-icon">' + svg('calendar', 40, 1.5) + '</div><p style="margin-top:10px;">ยังไม่มีการเปิดรอบส่งแผนในภาคเรียนนี้</p></div>';
    } else {
      roundsHtml = rounds.map(r => {
        const isOpen = r.is_open === true || String(r.is_open).toUpperCase() === 'TRUE';
        const planCount = Number(r.plan_count || 0);
        const canDelete = planCount === 0;
        return `
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:14px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div>
              <div style="font-weight:700; font-size:14px; color:#0f172a;">${esc(r.title)}</div>
              <div style="font-size:12px; color:#64748b; margin-top:2px;">
                เปิดรับ: ${formatDate(r.start_date)} • กำหนดส่ง: ${formatDate(r.due_date)} • ส่งแล้ว ${planCount} แผน
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <span class="status-badge ${isOpen ? 'status-approved' : 'status-draft'}">
                ${isOpen ? `${svg('check', 11)} กำลังเปิดรับ` : `${svg('x', 11)} ปิดรับแล้ว`}
              </span>
              <button class="btn-secondary" style="font-size:12px; padding:6px 10px;" onclick="handleToggleRound('${r.round_id}', ${!isOpen})">
                ${isOpen ? 'ปิดรอบ' : 'เปิดรับ'}
              </button>
              ${canDelete
                ? `<button class="btn-secondary" style="font-size:12px; padding:6px 10px; color:#dc2626; border-color:#fecaca; background:#fef2f2;" onclick="handleDeleteRound('${r.round_id}', '${esc(r.title)}')">ลบ</button>`
                : `<button class="btn-secondary" disabled title="มีครูส่งแผนแล้ว ${planCount} แผน ไม่สามารถลบได้" style="font-size:12px; padding:6px 10px; opacity:0.45; cursor:not-allowed;">ลบ</button>`
              }
            </div>
          </div>
        `;
      }).join('');
    }

    html += `
      <div style="margin-bottom:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <div style="font-size:15px; font-weight:800; color:#1e3a8a; display:flex; align-items:center; gap:6px;">
          ${svg('calendar', 16)} <span>รอบการส่งแผนการสอน (ภาคเรียนปัจจุบัน)</span>
        </div>
        <button class="btn-primary" onclick="openCreateRoundModal()">
          ${svg('plus', 14)} <span>เปิดรอบส่งแผนใหม่</span>
        </button>
      </div>
      <div>
        ${roundsHtml}
      </div>
    `;

  } else if (currentSubTab === 'subjects') {
    // -------------------------------------------------------------
    // ส่วนที่ 3: คลังรายวิชา (Subject Catalog & Management)
    // -------------------------------------------------------------
    const groupMap = {};
    groups.forEach(g => { groupMap[String(g.group_id)] = g.name; });

    const keyword = (state.subjectSearchKeyword || '').trim().toLowerCase();
    const filterGroup = state.subjectFilterGroup || '';

    const filteredSubjects = subjects.filter(s => {
      const matchKeyword = !keyword || 
        String(s.code || '').toLowerCase().includes(keyword) || 
        String(s.name || '').toLowerCase().includes(keyword) || 
        String(s.level || '').toLowerCase().includes(keyword);
      const matchGroup = !filterGroup || String(s.group_id) === String(filterGroup);
      return matchKeyword && matchGroup;
    });

    const groupOptions = `<option value="">-- ทุกกลุ่มสาระการเรียนรู้ --</option>` + groups.map(g => 
      `<option value="${g.group_id}" ${String(g.group_id) === String(filterGroup) ? 'selected' : ''}>${esc(g.name)}</option>`
    ).join('');

    let subjectsTableHtml = '';
    if (filteredSubjects.length === 0) {
      subjectsTableHtml = `
        <div class="empty-state">
          <div class="empty-icon">${svg('search', 40, 1.5)}</div>
          <p style="margin-top:10px;">ไม่พบรายวิชาที่ตรงกับเงื่อนไขการค้นหา</p>
          <small class="text-muted">ลองเปลี่ยนคำค้นหา หรือกดปุ่ม "เพิ่มรายวิชาใหม่"</small>
        </div>
      `;
    } else {
      const rows = filteredSubjects.map((s, idx) => `
        <tr>
          <td style="text-align:center; font-weight:600; color:var(--text-muted);">${idx + 1}</td>
          <td>
            <span style="font-weight:800; color:var(--primary); font-family:monospace; font-size:13.5px;">${esc(s.code)}</span>
          </td>
          <td style="font-weight:600; color:#1e293b;">
            ${esc(s.name)}
          </td>
          <td>
            <span class="status-badge" style="background:#f1f5f9; color:#334155;">
              ${esc(groupMap[String(s.group_id)] || 'ไม่ระบุ')}
            </span>
          </td>
          <td style="color:#64748b;">
            ${esc(s.level || '-')}
          </td>
          <td style="text-align:center; white-space:nowrap;">
            <div style="display:inline-flex; gap:6px;">
              <button class="btn-secondary" style="padding:5px 10px; font-size:12px;" onclick='openEditSubjectModal(${JSON.stringify(s)})' title="แก้ไขรายวิชา">
                ${svg('edit', 12)} <span>แก้ไข</span>
              </button>
              <button class="btn-secondary" style="padding:5px 10px; font-size:12px; color:#dc2626; border-color:#fecaca;" onclick="handleDeleteSubject('${esc(s.subject_id)}', '${esc(s.code)}', '${esc(s.name)}')" title="ลบรายวิชา">
                ${svg('x', 12)} <span>ลบ</span>
              </button>
            </div>
          </td>
        </tr>
      `).join('');

      subjectsTableHtml = `
        <div class="table-container">
          <table class="report-table">
            <thead>
              <tr>
                <th style="width:40px; text-align:center;">ที่</th>
                <th style="width:110px;">รหัสวิชา</th>
                <th>ชื่อรายวิชา</th>
                <th>กลุ่มสาระการเรียนรู้</th>
                <th style="width:90px;">ระดับชั้น</th>
                <th style="width:130px; text-align:center;">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      `;
    }

    html += `
      <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:14px 18px; margin-bottom:16px; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px; box-shadow:var(--shadow-sm);">
        <div style="display:flex; flex-wrap:wrap; gap:10px; flex:1; min-width:280px;">
          <div style="position:relative; flex:1; min-width:180px;">
            <input type="text" class="search-input" placeholder="ค้นหารหัสวิชา หรือชื่อวิชา..." value="${esc(state.subjectSearchKeyword)}" oninput="onSubjectSearch(this.value)"/>
            <span style="position:absolute; left:10px; top:10px; color:#94a3b8;">${svg('search', 14)}</span>
          </div>
          <div style="min-width:180px;">
            <select class="filter-select" style="width:100%;" onchange="onSubjectGroupFilter(this.value)">
              ${groupOptions}
            </select>
          </div>
        </div>
        <div>
          <button class="btn-primary" onclick="openCreateSubjectModal()">
            ${svg('plus', 14)} <span>เพิ่มรายวิชาใหม่</span>
          </button>
        </div>
      </div>

      ${subjectsTableHtml}
    `;
  } else if (currentSubTab === 'settings') {
    const teachersList = data.teachers || [];
    const selectedIds = new Set((data.academicTeacherIds || []).map(String));
    const reviewSteps = Number(data.reviewSteps || 2);

    const teacherChecks = teachersList.map(t => {
      const isBasePriv = ['Admin', 'Director'].includes(t.role);
      const checked = isBasePriv || selectedIds.has(String(t.id));
      return `
        <label style="display:flex; align-items:center; justify-content:space-between; gap:10px; padding:10px 12px; border:1px solid #e2e8f0; border-radius:10px; background:${checked ? '#eff6ff' : '#ffffff'}; cursor:${isBasePriv ? 'default' : 'pointer'};">
          <div style="display:flex; align-items:center; gap:10px;">
            <input type="checkbox" class="acad-staff-chk" value="${esc(t.id)}" ${checked ? 'checked' : ''} ${isBasePriv ? 'disabled' : ''}/>
            <div>
              <div style="font-size:13.5px; font-weight:700; color:#0f172a;">${esc(t.fullName)}</div>
              <div style="font-size:11.5px; color:#64748b;">${esc(t.position || t.role)} ${t.department ? '· ' + esc(t.department) : ''}</div>
            </div>
          </div>
          <span style="font-size:11px; font-weight:700; padding:3px 8px; border-radius:999px; background:${isBasePriv ? '#e2e8f0' : checked ? '#dbeafe' : '#f1f5f9'}; color:${isBasePriv ? '#475569' : checked ? '#1d4ed8' : '#64748b'};">
            ${isBasePriv ? esc(t.role) + ' (อัตโนมัติ)' : checked ? 'ฝ่ายวิชาการ' : 'ครูผู้สอน'}
          </span>
        </label>
      `;
    }).join('');

    const termsList = (data.terms && data.terms.length) ? data.terms : (data.activeTerm ? [data.activeTerm] : []);
    const activeTermId = data.activeTerm ? String(data.activeTerm.term_id) : '';
    const termPills = termsList.map(t => {
      const isCur = String(t.term_id) === activeTermId || t.is_active === true || String(t.is_active).toUpperCase() === 'TRUE';
      const label = t.name || `ภาคเรียนที่ ${t.term}/${t.year}`;
      return `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; padding:10px 14px; border:1px solid ${isCur ? '#2563eb' : '#cbd5e1'}; background:${isCur ? '#eff6ff' : '#ffffff'}; border-radius:10px;">
          <div>
            <div style="font-weight:700; font-size:13.5px; color:#0f172a;">${esc(label)}</div>
            <div style="font-size:11.5px; color:#64748b;">รหัส: ${esc(t.term_id)}</div>
          </div>
          ${isCur
            ? '<span class="status-badge status-approved">ภาคเรียนปัจจุบัน</span>'
            : `<button type="button" class="btn-secondary" style="padding:5px 10px; font-size:12px;" onclick="handleSetActiveTerm('${esc(t.term_id)}', '${esc(label)}')">ตั้งเป็นปัจจุบัน</button>`}
        </div>
      `;
    }).join('');

    html += `
      <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:14px; padding:20px; box-shadow:var(--shadow-sm); margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; flex-wrap:wrap; margin-bottom:14px;">
          <div>
            <h3 style="font-size:15px; font-weight:800; color:#0f172a; margin-bottom:4px;">จัดการภาคเรียน / ปีการศึกษา</h3>
            <p style="font-size:12.5px; color:#64748b;">เพิ่มภาคเรียนใหม่หรือสลับภาคเรียนปัจจุบันของระบบส่งแผน (คัดลอกภาระสอนจากเทอมเดิมได้)</p>
          </div>
          <button type="button" class="btn-primary" style="padding:7px 12px; font-size:12.5px;" onclick="openCreateTermModal()">
            ${svg('plus', 14)} <span>เพิ่มภาคเรียนใหม่</span>
          </button>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:10px;">
          ${termPills || '<div class="text-muted" style="font-size:13px;">ยังไม่มีข้อมูลภาคเรียน</div>'}
        </div>
      </div>

      <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:14px; padding:20px; box-shadow:var(--shadow-sm);">
        <div style="margin-bottom:18px;">
          <h3 style="font-size:15px; font-weight:800; color:#0f172a; margin-bottom:4px;">ผู้รับผิดชอบฝ่ายวิชาการ (ระบบส่งแผน)</h3>
          <p style="font-size:12.5px; color:#64748b;">กำหนดครูที่ทำหน้าที่ตรวจรับรองแผนขั้นสุดท้ายและจัดการวิชาการ โดยไม่ต้องเปลี่ยน Role ในระบบลา</p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:10px; margin-bottom:22px;">
          ${teacherChecks}
        </div>

        <div style="border-top:1px solid #e2e8f0; padding-top:18px; margin-bottom:18px;">
          <h3 style="font-size:15px; font-weight:800; color:#0f172a; margin-bottom:8px;">ขั้นตอนการตรวจรับรองแผน</h3>
          <div style="display:flex; flex-wrap:wrap; gap:10px;">
            <label style="flex:1; min-width:220px; display:flex; align-items:flex-start; gap:8px; padding:12px; border:1px solid #cbd5e1; border-radius:10px; cursor:pointer;">
              <input type="radio" name="review_steps_opt" value="2" ${reviewSteps !== 1 ? 'checked' : ''} style="margin-top:3px;"/>
              <div>
                <div style="font-weight:700; font-size:13.5px; color:#0f172a;">2 ขั้นตอน (มาตรฐาน)</div>
                <div style="font-size:12px; color:#64748b;">ครูส่งแผน → ผู้ตรวจประจำวิชา → ฝ่ายวิชาการ/ผอ. รับรอง</div>
              </div>
            </label>
            <label style="flex:1; min-width:220px; display:flex; align-items:flex-start; gap:8px; padding:12px; border:1px solid #cbd5e1; border-radius:10px; cursor:pointer;">
              <input type="radio" name="review_steps_opt" value="1" ${reviewSteps === 1 ? 'checked' : ''} style="margin-top:3px;"/>
              <div>
                <div style="font-weight:700; font-size:13.5px; color:#0f172a;">1 ขั้นตอน (โรงเรียนขนาดเล็ก)</div>
                <div style="font-size:12px; color:#64748b;">ครูส่งแผน → ฝ่ายวิชาการ/ผอ. ตรวจรับรองจบในขั้นตอนเดียว</div>
              </div>
            </label>
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end;">
          <button class="btn-primary" onclick="handleSaveAcademicStaff()">
            ${svg('save', 14)} <span>บันทึกการตั้งค่าฝ่ายวิชาการ</span>
          </button>
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}

async function handleSaveAcademicStaff() {
  const checkedIds = Array.from(document.querySelectorAll('.acad-staff-chk:checked:not(:disabled)')).map(el => el.value);
  const stepsEl = document.querySelector('input[name="review_steps_opt"]:checked');
  const reviewSteps = stepsEl ? Number(stepsEl.value) : 2;
  showLoader(true, 'กำลังบันทึกการตั้งค่าฝ่ายวิชาการ...');
  try {
    const res = await api.saveAcademicStaff({
      academicTeacherIds: checkedIds,
      reviewSteps: reviewSteps,
      lineUserId: state.teacher.lineUserId
    });
    if (state.manageData) {
      state.manageData.academicTeacherIds = res.academicTeacherIds || checkedIds;
      state.manageData.reviewSteps = res.reviewSteps || reviewSteps;
    }
    showLoader(false);
    showToast('บันทึกการตั้งค่าฝ่ายวิชาการแล้ว');
  } catch (err) {
    showLoader(false);
    Swal.fire({ icon: 'error', title: 'ไม่สามารถบันทึกได้', text: err.message });
  }
}

function openCreateTermModal() {
  const curTerm = state.activeTerm || {};
  const curYear = parseInt(curTerm.year, 10) || (new Date().getFullYear() + 543);
  const nextTerm = String(curTerm.term) === '1' ? '2' : '1';
  const nextYear = String(curTerm.term) === '1' ? curYear : curYear + 1;

  const content = `
    <div class="modal-header">
      <div class="modal-title">เพิ่มภาคเรียน / ปีการศึกษาใหม่</div>
      <button class="modal-close-btn" onclick="closeModal()">${svg('x', 18)}</button>
    </div>
    <form id="create-term-form">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        <div class="form-group">
          <label class="form-label">ภาคเรียนที่ *</label>
          <select id="new-term-no" class="form-select">
            <option value="1" ${nextTerm === '1' ? 'selected' : ''}>1</option>
            <option value="2" ${nextTerm === '2' ? 'selected' : ''}>2</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">ปีการศึกษา (พ.ศ.) *</label>
          <input type="number" id="new-term-year" class="form-input" value="${nextYear}" min="2560" max="2650" required/>
        </div>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px; margin-top:4px; margin-bottom:16px;">
        <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
          <input type="checkbox" id="new-term-active" checked/>
          <span>ตั้งเป็นภาคเรียนปัจจุบันทันที</span>
        </label>
        <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
          <input type="checkbox" id="new-term-copy-loads" checked/>
          <span>คัดลอกภาระการสอน (วิชาและผู้ตรวจ) จากภาคเรียนปัจจุบันมาด้วย</span>
        </label>
      </div>
      <div style="display:flex; gap:10px;">
        <button type="button" class="btn-secondary" style="flex:1; justify-content:center;" onclick="closeModal()">ยกเลิก</button>
        <button type="button" class="btn-primary" style="flex:1; justify-content:center;" onclick="submitCreateTerm()">
          ${svg('plus', 14)} <span>สร้างภาคเรียน</span>
        </button>
      </div>
    </form>
  `;
  showModal(content);
}

async function submitCreateTerm() {
  const term = document.getElementById('new-term-no').value;
  const year = document.getElementById('new-term-year').value.trim();
  const setActive = document.getElementById('new-term-active').checked;
  const copyLoads = document.getElementById('new-term-copy-loads').checked;

  if (!term || !/^\d{4}$/.test(year)) {
    Swal.fire('ข้อมูลไม่ถูกต้อง', 'กรุณาระบุปีการศึกษา พ.ศ. 4 หลัก', 'warning');
    return;
  }

  closeModal();
  showLoader(true, 'กำลังสร้างภาคเรียนใหม่...');
  try {
    await api.createTerm({ term, year, setActive, copyLoads, lineUserId: state.teacher.lineUserId });
    await reloadAfterTermChange();
    showToast(`เพิ่มภาคเรียนที่ ${term}/${year} แล้ว`);
  } catch (err) {
    showLoader(false);
    Swal.fire('เกิดข้อผิดพลาด', err.message, 'error');
  }
}

async function handleSetActiveTerm(termId, label) {
  const ask = await Swal.fire({
    icon: 'question',
    title: 'เปลี่ยนภาคเรียนปัจจุบัน?',
    text: `ต้องการสลับระบบไปใช้ ${label} เป็นภาคเรียนปัจจุบันใช่หรือไม่`,
    showCancelButton: true,
    confirmButtonText: 'ยืนยันสลับภาคเรียน',
    cancelButtonText: 'ยกเลิก',
    confirmButtonColor: '#1e3a8a'
  });
  if (!ask.isConfirmed) return;

  showLoader(true, 'กำลังสลับภาคเรียนปัจจุบัน...');
  try {
    await api.setActiveTerm({ termId, lineUserId: state.teacher.lineUserId });
    await reloadAfterTermChange();
    showToast(`สลับเป็น ${label} แล้ว`);
  } catch (err) {
    showLoader(false);
    Swal.fire('เกิดข้อผิดพลาด', err.message, 'error');
  }
}

async function reloadAfterTermChange() {
  const bootstrap = await api.getTeachingBootstrap(state.teacher.lineUserId);
  state.activeTerm = bootstrap.activeTerm;
  state.loads = bootstrap.loads || [];
  state.rounds = bootstrap.rounds || [];
  state.pendingReviewsCount = bootstrap.pendingReviewsCount || 0;
  state.manageData = null;
  state.reportsData = null;
  state.reportFilterTerm = '';
  renderUserProfile();
  renderTabs();
  showLoader(false);
  await renderManage(document.getElementById('tab-content'));
}

function setManageSubTab(subTab) {
  state.manageSubTab = subTab;
  renderManage(document.getElementById('tab-content'));
}

function onSubjectSearch(keyword) {
  state.subjectSearchKeyword = keyword;
  renderManage(document.getElementById('tab-content'));
}

function onSubjectGroupFilter(groupId) {
  state.subjectFilterGroup = groupId;
  renderManage(document.getElementById('tab-content'));
}

// เปิด/ปิด สถานะรอบการส่งแผน (ต้องยืนยันก่อนเสมอ)
async function handleToggleRound(roundId, newIsOpen) {
  const roundObj = ((state.manageData && state.manageData.rounds) || []).find(r => String(r.round_id) === String(roundId)) || {};
  const todayStr = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Bangkok' });
  const dueStr = roundObj.due_date ? String(roundObj.due_date).slice(0, 10) : '';
  const isExpired = Boolean(newIsOpen && dueStr && todayStr > dueStr);

  let newDueDate = '';
  if (isExpired) {
    const res = await Swal.fire({
      title: 'รอบนี้เลยวันกำหนดส่งแล้ว',
      html: `
        <p style="font-size:13px;color:#475569;margin-bottom:12px;">
          รอบ "<strong>${esc(roundObj.title || '')}</strong>" ครบกำหนดส่งเมื่อ ${formatDate(dueStr)}<br/>
          กรุณากำหนดวันส่งใหม่ (พ.ศ.) เพื่อเปิดรับต่อ
        </p>
        <div style="text-align:left;">
          ${thaiDatePicker('swal-new-due', todayStr)}
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยันเปิดรับ',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#1e3a8a',
      preConfirm: () => {
        const val = document.getElementById('swal-new-due').value;
        if (!val || val < todayStr) {
          Swal.showValidationMessage('กรุณาเลือกวันกำหนดส่งตั้งแต่วันนี้เป็นต้นไป');
          return false;
        }
        return val;
      }
    });
    if (!res.isConfirmed) return;
    newDueDate = res.value;
  } else {
    const res = await Swal.fire({
      title: newIsOpen ? 'ยืนยันเปิดรับรอบส่งแผน?' : 'ยืนยันปิดรอบส่งแผน?',
      text: newIsOpen
        ? `ต้องการเปิดรับการส่งแผนในรอบ "${roundObj.title || ''}" หรือไม่?`
        : `เมื่อปิดรอบ "${roundObj.title || ''}" แล้ว ครูจะไม่สามารถส่งแผนในรอบนี้ได้จนกว่าจะเปิดรับอีกครั้ง`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: newIsOpen ? 'เปิดรับ' : 'ปิดรอบ',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: newIsOpen ? '#16a34a' : '#d97706'
    });
    if (!res.isConfirmed) return;
  }

  showLoader(true, 'กำลังอัปเดตสถานะรอบส่งแผน...');
  try {
    await api.toggleRoundStatus({
      roundId: roundId,
      isOpen: newIsOpen,
      newDueDate: newDueDate,
      lineUserId: state.teacher.lineUserId
    });
    state.manageData = null;
    state.reportsData = null;
    const container = document.getElementById('tab-content');
    await renderManage(container);
    showToast(newIsOpen ? 'เปิดรับรอบส่งแผนแล้ว' : 'ปิดรอบส่งแผนแล้ว');
    Swal.fire('ข้อผิดพลาด', err.message, 'error');
  } finally {
    showLoader(false);
  }
}

// ลบรอบการส่งแผน (เฉพาะรอบที่ยังไม่มีแผนส่งเข้ามา)
async function handleDeleteRound(roundId, roundTitle) {
  const res = await Swal.fire({
    title: 'ยืนยันลบรอบการส่งแผน?',
    text: `ต้องการลบรอบ "${roundTitle}" ออกจากระบบหรือไม่? (ลบได้เฉพาะรอบที่ยังไม่มีครูส่งแผน)`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ลบรอบนี้',
    cancelButtonText: 'ยกเลิก',
    confirmButtonColor: '#dc2626'
  });
  if (!res.isConfirmed) return;

  showLoader(true, 'กำลังลบรอบการส่งแผน...');
  try {
    await api.deleteRound({
      roundId: roundId,
      lineUserId: state.teacher.lineUserId
    });
    state.manageData = null;
    state.reportsData = null;
    const container = document.getElementById('tab-content');
    await renderManage(container);
    showToast(`ลบรอบ "${roundTitle}" เรียบร้อยแล้ว`);
  } catch (err) {
    Swal.fire('ไม่สามารถลบได้', err.message, 'error');
  } finally {
    showLoader(false);
  }
}

// Modal สร้างรอบส่งแผนใหม่
function openCreateRoundModal() {
  const today = getTodayBangkokISO();

  const content = `
    <div class="modal-header">
      <div class="modal-title">เปิดรอบการส่งแผนการสอน</div>
      <button class="modal-close-btn" onclick="closeModal()">${svg('x', 18)}</button>
    </div>
    <form id="create-round-form">
      <div class="form-group">
        <label class="form-label">ชื่อรอบการส่งแผน *</label>
        <input type="text" id="round-title" class="form-input" placeholder="เช่น แผนการสอนหน่วยที่ 1 หรือ ประจำสัปดาห์ที่ 1-4" required/>
      </div>
      <div class="form-group">
        <label class="form-label">วันเริ่มเปิดรับ (วัน/เดือน/ปี พ.ศ.) *</label>
        ${thaiDatePicker('round-start', today)}
      </div>
      <div class="form-group">
        <label class="form-label">วันกำหนดส่ง (วัน/เดือน/ปี พ.ศ.) *</label>
        ${thaiDatePicker('round-due', today)}
      </div>
      <div class="form-group" style="margin-top:10px;">
        <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
          <input type="checkbox" id="round-is-open" checked/>
          <span style="font-size:13px; font-weight:600; color:#334155;">เปิดรับการส่งทันที</span>
        </label>
      </div>
      <div style="display:flex; gap:10px; margin-top:20px;">
        <button type="button" class="btn-secondary" style="flex:1; justify-content:center;" onclick="closeModal()">ยกเลิก</button>
        <button type="button" class="btn-primary" style="flex:1; justify-content:center;" onclick="submitCreateRound()">
          ${svg('plus', 14)} <span>สร้างรอบส่งแผน</span>
        </button>
      </div>
    </form>
  `;

  showModal(content);
}

async function submitCreateRound() {
  const title = document.getElementById('round-title').value.trim();
  const start = document.getElementById('round-start').value;
  const due = document.getElementById('round-due').value;
  const isOpen = document.getElementById('round-is-open').checked;

  if (!title || !start || !due) {
    Swal.fire('กรุณากรอกข้อมูลให้ครบ', 'ระบุชื่อรอบ วันเริ่ม และวันกำหนดส่ง', 'warning');
    return;
  }

  closeModal();
  showLoader(true, 'กำลังสร้างรอบการส่งแผนและจัดเตรียมรายการติดตาม...');

  try {
    await api.createRound({
      title: title,
      startDate: start,
      dueDate: due,
      isOpen: isOpen,
      lineUserId: state.teacher.lineUserId
    });

    state.manageData = null;
    state.reportsData = null;
    const container = document.getElementById('tab-content');
    await renderManage(container);
    showToast('สร้างรอบส่งแผนสำเร็จ');
  } catch (err) {
    Swal.fire('เกิดข้อผิดพลาด', err.message, 'error');
  } finally {
    showLoader(false);
  }
}

// Modal มอบหมายภาระการสอนใหม่
function openCreateLoadModal() {
  const teachers = (state.manageData && state.manageData.teachers) || [];
  const subjects = (state.manageData && state.manageData.subjects) || [];

  const teacherOptions = teachers.map(t => `<option value="${t.id}">${esc(t.fullName)} (${esc(t.department || 'ไม่ระบุ')})</option>`).join('');
  const subjectOptions = subjects.map(s => `<option value="${s.subject_id}">${esc(s.code)} - ${esc(s.name)} (${esc(s.level || '-')})</option>`).join('');
  const reviewerCandidates = teachers.filter(t => t.role !== 'Director');
  const reviewerOptions = reviewerCandidates.map(t => `<option value="${t.id}">${esc(t.fullName)} (${esc(t.department || 'ไม่ระบุ')})</option>`).join('');

  const content = `
    <div class="modal-header">
      <div class="modal-title">มอบหมายภาระการสอน</div>
      <button class="modal-close-btn" onclick="closeModal()">${svg('x', 18)}</button>
    </div>
    <form id="create-load-form">
      <div class="form-group">
        <label class="form-label">ครูผู้สอน *</label>
        <select id="load-teacher-id" class="form-select">
          ${teacherOptions}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">รายวิชา *</label>
        <select id="load-subject-id" class="form-select" onchange="onLoadSubjectChange(this.value)">
          ${subjectOptions}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">ห้องเรียนที่สอน *</label>
        <select id="load-classroom" class="form-select" required>
          ${levelSelectOptions((subjects[0] && subjects[0].level) || '')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">หัวหน้าผู้ตรวจประจำวิชา * (ต้องเป็นคนละคนกับครูผู้สอน)</label>
        <select id="load-reviewer-id" class="form-select">
          ${reviewerOptions}
        </select>
      </div>
      <div style="display:flex; gap:10px; margin-top:20px;">
        <button type="button" class="btn-secondary" style="flex:1; justify-content:center;" onclick="closeModal()">ยกเลิก</button>
        <button type="button" class="btn-primary" style="flex:1; justify-content:center;" onclick="submitCreateLoad()">
          ${svg('plus', 14)} <span>บันทึกภาระสอน</span>
        </button>
      </div>
    </form>
  `;

  showModal(content);
}

function onLoadSubjectChange(subjectId) {
  const subjects = (state.manageData && state.manageData.subjects) || [];
  const sub = subjects.find(s => String(s.subject_id) === String(subjectId));
  const clsEl = document.getElementById('load-classroom');
  if (sub && sub.level && clsEl) {
    clsEl.value = sub.level;
  }
}

async function submitCreateLoad() {
  const teacherId = document.getElementById('load-teacher-id').value;
  const subjectId = document.getElementById('load-subject-id').value;
  const classroom = document.getElementById('load-classroom').value.trim();
  const reviewerId = document.getElementById('load-reviewer-id').value;

  if (!teacherId || !subjectId || !classroom || !reviewerId) {
    Swal.fire('กรุณากรอกข้อมูลให้ครบ', 'ระบุครูผู้สอน วิชา ห้องเรียน และผู้ตรวจ', 'warning');
    return;
  }

  if (teacherId === reviewerId) {
    Swal.fire('ข้อผิดพลาด', 'ผู้ตรวจประจำวิชาต้องเป็นคนละคนกับครูผู้สอนตามระเบียบ', 'warning');
    return;
  }

  closeModal();
  showLoader(true, 'กำลังบันทึกภาระการสอน...');

  try {
    await api.createTeachingLoad({
      teacherId: teacherId,
      subjectId: subjectId,
      classroom: classroom,
      reviewerId: reviewerId,
      lineUserId: state.teacher.lineUserId
    });

    state.manageData = null;
    state.reportsData = null;
    const container = document.getElementById('tab-content');
    await renderManage(container);
    showToast('มอบหมายภาระการสอนเรียบร้อยแล้ว');
  } catch (err) {
    Swal.fire('เกิดข้อผิดพลาด', err.message, 'error');
  } finally {
    showLoader(false);
  }
}

// Modal เปลี่ยนผู้ตรวจประจำวิชา
async function handleDeleteLoad(loadId, subjectTitle, classroom) {
  const ask = await Swal.fire({
    icon: 'warning',
    title: 'ยืนยันการลบภาระการสอน?',
    text: `ต้องการลบ "${subjectTitle} (${classroom})" ใช่หรือไม่`,
    showCancelButton: true,
    confirmButtonText: 'ลบภาระสอน',
    cancelButtonText: 'ยกเลิก',
    confirmButtonColor: '#dc2626'
  });
  if (!ask.isConfirmed) return;

  showLoader(true, 'กำลังลบภาระการสอน...');
  try {
    await api.deleteTeachingLoad({ loadId: loadId, lineUserId: state.teacher.lineUserId });
    state.manageData = null;
    state.reportsData = null;
    await renderManage(document.getElementById('tab-content'));
    showToast('ลบภาระการสอนเรียบร้อยแล้ว');
  } catch (err) {
    Swal.fire('ไม่สามารถลบได้', err.message, 'error');
  } finally {
    showLoader(false);
  }
}

function openChangeReviewerModal(loadId, subjectCode, classroom, currentReviewerId) {
  const teachers = (state.manageData && state.manageData.teachers) || [];
  const reviewerCandidates = teachers.filter(t => t.role !== 'Director');
  const reviewerOptions = reviewerCandidates.map(t => `<option value="${t.id}" ${t.id === currentReviewerId ? 'selected' : ''}>${esc(t.fullName)} (${esc(t.department || 'ไม่ระบุ')})</option>`).join('');

  const content = `
    <div class="modal-header">
      <div class="modal-title">เปลี่ยนผู้ตรวจประจำวิชา</div>
      <button class="modal-close-btn" onclick="closeModal()">${svg('x', 18)}</button>
    </div>
    <div style="background:#f1f5f9; padding:10px 14px; border-radius:8px; font-size:13px; margin-bottom:14px; border:1px solid #e2e8f0;">
      <div><strong>วิชา:</strong> ${esc(subjectCode)} (ชั้น ${esc(classroom)})</div>
    </div>
    <form id="change-reviewer-form">
      <div class="form-group">
        <label class="form-label">เลือกผู้ตรวจคนใหม่ *</label>
        <select id="new-reviewer-id" class="form-select">
          ${reviewerOptions}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">เหตุผลในการเปลี่ยนผู้ตรวจ *</label>
        <textarea id="reviewer-change-reason" class="form-textarea" rows="2" placeholder="ระบุเหตุผลในการเปลี่ยนผู้ตรวจประจำวิชา..." required></textarea>
      </div>
      <div style="display:flex; gap:10px; margin-top:20px;">
        <button type="button" class="btn-secondary" style="flex:1; justify-content:center;" onclick="closeModal()">ยกเลิก</button>
        <button type="button" class="btn-primary" style="flex:1; justify-content:center;" onclick="submitChangeReviewer('${loadId}')">
          ${svg('check', 14)} <span>ยืนยันเปลี่ยนผู้ตรวจ</span>
        </button>
      </div>
    </form>
  `;

  showModal(content);
}

async function submitChangeReviewer(loadId) {
  const newReviewerId = document.getElementById('new-reviewer-id').value;
  const reason = document.getElementById('reviewer-change-reason').value.trim();

  if (!newReviewerId || !reason) {
    Swal.fire('กรุณากรอกข้อมูลให้ครบ', 'เลือกผู้ตรวจคนใหม่และระบุเหตุผลในการเปลี่ยน', 'warning');
    return;
  }

  closeModal();
  showLoader(true, 'กำลังบันทึกข้อมูล...');

  try {
    await api.changeReviewer({
      loadId: loadId,
      newReviewerId: newReviewerId,
      reason: reason,
      lineUserId: state.teacher.lineUserId
    });

    state.manageData = null;
    state.reportsData = null;
    const container = document.getElementById('tab-content');
    await renderManage(container);
    showToast('เปลี่ยนผู้ตรวจเรียบร้อยแล้ว');
  } catch (err) {
    Swal.fire('เกิดข้อผิดพลาด', err.message, 'error');
  } finally {
    showLoader(false);
  }
}

const SCHOOL_LEVELS = ['ปฐมวัย', 'ป.1', 'ป.2', 'ป.3', 'ป.4', 'ป.5', 'ป.6', 'ม.1', 'ม.2', 'ม.3'];

function levelSelectOptions(selectedLevel) {
  const cur = String(selectedLevel || '').trim();
  const list = cur && !SCHOOL_LEVELS.includes(cur) ? [cur, ...SCHOOL_LEVELS] : SCHOOL_LEVELS;
  return `<option value="">-- เลือกระดับชั้น --</option>` +
    list.map(lv => `<option value="${esc(lv)}" ${lv === cur ? 'selected' : ''}>${esc(lv)}</option>`).join('');
}

// Modal เพิ่มรายวิชาใหม่
function openCreateSubjectModal() {
  const groups = (state.manageData && state.manageData.groups) || [];
  const groupOptions = groups.map(g => `<option value="${g.group_id}">${esc(g.name)}</option>`).join('');

  const content = `
    <div class="modal-header">
      <div class="modal-title">เพิ่มรายวิชาใหม่</div>
      <button class="modal-close-btn" onclick="closeModal()">${svg('x', 18)}</button>
    </div>
    <form id="create-subject-form">
      <div class="form-group">
        <label class="form-label">รหัสวิชา *</label>
        <input type="text" id="sub-code" class="form-input" placeholder="เช่น ว21101 หรือ ท15101" required/>
      </div>
      <div class="form-group">
        <label class="form-label">ชื่อรายวิชา *</label>
        <input type="text" id="sub-name" class="form-input" placeholder="เช่น วิทยาการคำนวณ 1" required/>
      </div>
      <div class="form-group">
        <label class="form-label">กลุ่มสาระการเรียนรู้ *</label>
        <select id="sub-group" class="form-select">
          ${groupOptions}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">ระดับชั้น</label>
        <select id="sub-level" class="form-select">
          ${levelSelectOptions('')}
        </select>
      </div>
      <div style="display:flex; gap:10px; margin-top:20px;">
        <button type="button" class="btn-secondary" style="flex:1; justify-content:center;" onclick="closeModal()">ยกเลิก</button>
        <button type="button" class="btn-primary" style="flex:1; justify-content:center;" onclick="submitCreateSubject()">
          ${svg('plus', 14)} <span>เพิ่มรายวิชา</span>
        </button>
      </div>
    </form>
  `;

  showModal(content);
}

async function submitCreateSubject() {
  const code = document.getElementById('sub-code').value.trim();
  const name = document.getElementById('sub-name').value.trim();
  const groupId = document.getElementById('sub-group').value;
  const level = document.getElementById('sub-level').value.trim();

  if (!code || !name || !groupId) {
    Swal.fire('กรุณากรอกข้อมูลให้ครบ', 'ระบุรหัสวิชา ชื่อวิชา และกลุ่มสาระ', 'warning');
    return;
  }

  closeModal();
  showLoader(true, 'กำลังเพิ่มรายวิชา...');

  try {
    await api.createSubject({
      code: code,
      name: name,
      groupId: groupId,
      level: level,
      lineUserId: state.teacher.lineUserId
    });

    state.manageSubTab = 'subjects';
    state.manageData = null;
    state.reportsData = null;
    const container = document.getElementById('tab-content');
    await renderManage(container);
    showToast('เพิ่มรายวิชาใหม่เรียบร้อยแล้ว');
  } catch (err) {
    Swal.fire('เกิดข้อผิดพลาด', err.message, 'error');
  } finally {
    showLoader(false);
  }
}

/**
 * เปิด Modal แก้ไขข้อมูลรายวิชา
 */
function openEditSubjectModal(subject) {
  const groups = (state.manageData && state.manageData.groups) || [];
  const groupOptions = groups.map(g => 
    `<option value="${g.group_id}" ${String(g.group_id) === String(subject.group_id) ? 'selected' : ''}>${esc(g.name)}</option>`
  ).join('');

  const content = `
    <div class="modal-header">
      <div class="modal-title">แก้ไขข้อมูลรายวิชา</div>
      <button class="modal-close-btn" onclick="closeModal()">${svg('x', 18)}</button>
    </div>
    <form id="edit-subject-form" onsubmit="event.preventDefault(); submitUpdateSubject('${esc(subject.subject_id)}');">
      <div class="form-group">
        <label class="form-label">รหัสวิชา *</label>
        <input type="text" id="edit-sub-code" class="form-input" value="${esc(subject.code)}" required/>
      </div>
      <div class="form-group">
        <label class="form-label">ชื่อรายวิชา *</label>
        <input type="text" id="edit-sub-name" class="form-input" value="${esc(subject.name)}" required/>
      </div>
      <div class="form-group">
        <label class="form-label">กลุ่มสาระการเรียนรู้ *</label>
        <select id="edit-sub-group" class="form-select">
          ${groupOptions}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">ระดับชั้น</label>
        <select id="edit-sub-level" class="form-select">
          ${levelSelectOptions(subject.level || '')}
        </select>
      </div>
      <div style="display:flex; gap:10px; margin-top:20px;">
        <button type="button" class="btn-secondary" style="flex:1; justify-content:center;" onclick="closeModal()">ยกเลิก</button>
        <button type="submit" class="btn-primary" style="flex:1; justify-content:center;">
          ${svg('save', 14)} <span>บันทึกการแก้ไข</span>
        </button>
      </div>
    </form>
  `;

  showModal(content);
}

/**
 * บันทึกการแก้ไขรายวิชา
 */
async function submitUpdateSubject(subjectId) {
  const code = document.getElementById('edit-sub-code').value.trim();
  const name = document.getElementById('edit-sub-name').value.trim();
  const groupId = document.getElementById('edit-sub-group').value;
  const level = document.getElementById('edit-sub-level').value.trim();

  if (!code || !name || !groupId) {
    Swal.fire('กรุณากรอกข้อมูลให้ครบ', 'ระบุรหัสวิชา ชื่อวิชา และกลุ่มสาระการเรียนรู้', 'warning');
    return;
  }

  closeModal();
  showLoader(true, 'กำลังบันทึกการแก้ไขรายวิชา...');

  try {
    await api.updateSubject({
      subjectId: subjectId,
      code: code,
      name: name,
      groupId: groupId,
      level: level,
      lineUserId: state.teacher.lineUserId
    });

    if (state.manageData && state.manageData.subjects) {
      const s = state.manageData.subjects.find(x => String(x.subject_id) === String(subjectId));
      if (s) {
        s.code = code;
        s.name = name;
        s.group_id = groupId;
        s.level = level;
      }
    }

    state.manageData = null;
    await renderManage(document.getElementById('tab-content'));
    showToast('แก้ไขข้อมูลรายวิชาเรียบร้อยแล้ว');
  } catch (err) {
    Swal.fire('เกิดข้อผิดพลาด', err.message, 'error');
  } finally {
    showLoader(false);
  }
}

/**
 * ลบรายวิชาออกจากระบบ
 */
async function handleDeleteSubject(subjectId, code, name) {
  const result = await Swal.fire({
    title: 'ยืนยันการลบรายวิชา?',
    html: `คุณต้องการลบรายวิชา <strong>${esc(code)} ${esc(name)}</strong> หรือไม่?<br/><small style="color:#64748b;">(จะไม่สามารถลบได้หากมีภาระการสอนผูกอยู่กับวิชานี้)</small>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'ใช่, ต้องการลบ',
    cancelButtonText: 'ยกเลิก'
  });

  if (!result.isConfirmed) return;

  showLoader(true, 'กำลังลบรายวิชา...');
  try {
    await api.deleteSubject({
      subjectId: subjectId,
      lineUserId: state.teacher.lineUserId
    });

    if (state.manageData && state.manageData.subjects) {
      state.manageData.subjects = state.manageData.subjects.filter(x => String(x.subject_id) !== String(subjectId));
    }

    state.manageData = null;
    await renderManage(document.getElementById('tab-content'));
    showToast(`ลบรายวิชา ${code} ออกจากระบบแล้ว`);
  } catch (err) {
    Swal.fire('ไม่สามารถลบได้', err.message, 'error');
  } finally {
    showLoader(false);
  }
}

// --------------------------------------------------------------------------
// Modals & Actions
// --------------------------------------------------------------------------

function openSubmitModal(loadId, planId) {
  const load = state.loads.find(l => String(l.load_id) === String(loadId));
  if (!load) return;
  state.selectedLoad = load;
  state.uploadedBase64 = null;
  state.uploadedFileName = null;

  const targetPlan = planId ? (load.plans || []).find(p => String(p.plan_id) === String(planId)) : null;
  state.selectedPlan = targetPlan;

  if (targetPlan && ['Pending_Head', 'Pending_Academic', 'Approved'].includes(targetPlan.status)) {
    Swal.fire({
      icon: 'info',
      title: 'ไม่สามารถแก้ไขได้',
      text: 'แผนการสอนฉบับนี้อยู่ระหว่างการตรวจรับรองหรือได้รับการรับรองแล้ว',
      confirmButtonColor: '#1e3a8a'
    });
    return;
  }

  if (!state.rounds || state.rounds.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'ยังไม่มีรอบการส่งแผนที่เปิดรับ',
      text: 'กรุณาติดต่อฝ่ายวิชาการเพื่อเปิดรอบการส่งแผนก่อนครับ',
      confirmButtonColor: '#1e3a8a'
    });
    return;
  }

  const isRevise = targetPlan && targetPlan.status === 'Revise';
  const hasExistingPdf = targetPlan && targetPlan.drive_pdf_url;

  // คำนวณเลขหน่วยการเรียนรู้ให้อัตโนมัติ (ถ้ายังไม่เคยสร้าง = 1)
  const existingPlans = load.plans || [];
  let maxUnitNo = 0;
  existingPlans.forEach((p, idx) => {
    const m = String(p.unit_title || '').match(/^หน่วยที่\s*(\d+)/);
    const num = m ? parseInt(m[1], 10) : (idx + 1);
    if (num > maxUnitNo) maxUnitNo = num;
  });

  let unitNo = maxUnitNo + 1;
  let unitNameOnly = '';
  if (targetPlan) {
    const m = String(targetPlan.unit_title || '').match(/^หน่วยที่\s*(\d+)[\s:：\-]*(.*)$/);
    if (m) {
      unitNo = parseInt(m[1], 10);
      unitNameOnly = (m[2] || '').trim();
    } else {
      const idx = existingPlans.findIndex(p => String(p.plan_id) === String(targetPlan.plan_id));
      unitNo = idx >= 0 ? idx + 1 : 1;
      unitNameOnly = targetPlan.unit_title || '';
    }
  }

  const content = `
    <div class="modal-header">
      <div class="modal-title">${targetPlan ? 'แก้ไขและส่งหน่วยการเรียนรู้' : 'เพิ่มหน่วยการเรียนรู้ / ส่งแผน'}</div>
      <button class="modal-close-btn" onclick="closeModal()">${svg('x', 18)}</button>
    </div>
    <div style="margin-bottom:14px; background:#f1f5f9; padding:10px 14px; border-radius:8px; font-size:13px; border:1px solid #e2e8f0;">
      <div><strong>วิชา:</strong> ${esc(load.subject_code)} ${esc(load.subject_name)}</div>
      <div><strong>ชั้นเรียน:</strong> ${esc(load.classroom)} | <strong>ผู้ตรวจ:</strong> ${esc(load.reviewer_name)}</div>
      ${targetPlan ? `<div><strong>ฉบับปัจจุบัน:</strong> ฉบับที่ ${targetPlan.version || 1}</div>` : ''}
    </div>

    ${isRevise ? `
      <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:10px 14px; margin-bottom:14px; font-size:13px; color:#991b1b;">
        <div style="font-weight:700; display:flex; align-items:center; gap:6px;">
          ${svg('alert', 14)} <span>แผนนี้ถูกส่งกลับเพื่อแก้ไข</span>
        </div>
        <div style="margin-top:4px;">กรุณาปรับปรุงแผนและแนบไฟล์ PDF ฉบับใหม่ (หรือกดดูประวัติเพื่ออ่านความเห็น)</div>
      </div>
    ` : ''}

    <form id="plan-form" onsubmit="handlePlanSubmit(event)">
      <input type="hidden" id="modal-plan-id" value="${targetPlan ? esc(targetPlan.plan_id) : ''}"/>
      <div class="form-group">
        <label class="form-label">รอบการส่งแผน</label>
        <select id="modal-round-id" class="form-select">
          ${state.rounds.map(r => `<option value="${r.round_id}" ${targetPlan && targetPlan.round_id === r.round_id ? 'selected' : ''}>${esc(r.title)} (กำหนดส่ง: ${formatDate(r.due_date)})</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">ชื่อหน่วยการเรียนรู้ / เรื่อง *</label>
        <div style="display:flex; align-items:stretch; gap:8px;">
          <span style="display:inline-flex; align-items:center; padding:0 12px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; font-size:13px; font-weight:800; color:#1e3a8a; white-space:nowrap;">
            หน่วยที่ ${unitNo}
          </span>
          <input type="hidden" id="modal-unit-no" value="${unitNo}"/>
          <input type="text" id="modal-unit-title" class="form-input" style="flex:1;" placeholder="พิมพ์ชื่อหน่วย เช่น การออกแบบอัลกอริทึม" value="${esc(unitNameOnly)}" required/>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">จำนวนชั่วโมง *</label>
        <input type="number" id="modal-hours" class="form-input" placeholder="เช่น 4" min="1" max="100" value="${targetPlan ? esc(targetPlan.teaching_hours || '') : ''}" required/>
      </div>
      <div class="form-group">
        <label class="form-label">ไฟล์แผนการสอน (เฉพาะ PDF ไม่เกิน 10 MB) ${hasExistingPdf ? '(ไม่บังคับ)' : '*'}</label>
        <div class="file-dropzone" onclick="document.getElementById('pdf-file-input').click()">
          <div id="dropzone-text" style="font-size:13px; color:#64748b;">
            ${hasExistingPdf ? `
              <div style="color:#0369a1; font-weight:600;">${svg('fileText', 16)} มีไฟล์ PDF ฉบับเดิมแล้ว</div>
              <small style="color:#64748b;">แตะที่นี่หากต้องการแนบไฟล์ฉบับปรับปรุงใหม่ (เว้นว่างไว้เพื่อใช้ไฟล์เดิม)</small>
            ` : `
              ${svg('paperclip', 18)} <span>แตะเพื่อเลือกไฟล์ PDF</span>
            `}
          </div>
        </div>
        <input type="file" id="pdf-file-input" accept="application/pdf" style="display:none;" onchange="handleFileChange(event)"/>
      </div>
      <div style="display:flex; gap:10px; margin-top:20px;">
        <button type="button" class="btn-secondary" style="flex:1; justify-content:center;" onclick="submitPlanForm(true)">
          ${svg('save', 14)} <span>บันทึกฉบับร่าง</span>
        </button>
        <button type="button" class="btn-primary" style="flex:1; justify-content:center;" onclick="submitPlanForm(false)">
          ${svg('send', 14)} <span>ส่งตรวจ</span>
        </button>
      </div>
    </form>
  `;

  showModal(content);
}

function handleFileChange(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.type !== 'application/pdf') {
    Swal.fire('ข้อผิดพลาด', 'กรุณาแนบไฟล์นามสกุล .pdf เท่านั้น', 'warning');
    event.target.value = '';
    return;
  }

  const sizeMb = file.size / (1024 * 1024);
  if (sizeMb > CONFIG.MAX_FILE_SIZE_MB) {
    Swal.fire('ไฟล์มีขนาดใหญ่เกินไป', `ขนาดไฟล์ต้องไม่เกิน ${CONFIG.MAX_FILE_SIZE_MB} MB (ไฟล์นี้: ${sizeMb.toFixed(1)} MB)`, 'error');
    event.target.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    state.uploadedBase64 = e.target.result;
    state.uploadedFileName = file.name;
    document.getElementById('dropzone-text').innerHTML = `
      <div style="color:#16a34a; font-weight:700;">${svg('check', 16)} เลือกไฟล์แล้ว: ${esc(file.name)}</div>
      <small style="color:#64748b;">ขนาด: ${sizeMb.toFixed(2)} MB</small>
    `;
  };
  reader.readAsDataURL(file);
}

async function submitPlanForm(isDraft) {
  const planIdEl = document.getElementById('modal-plan-id');
  const planId = planIdEl ? planIdEl.value.trim() : '';
  const unitNoEl = document.getElementById('modal-unit-no');
  const unitNo = unitNoEl ? unitNoEl.value.trim() : '';
  const rawUnitTitle = document.getElementById('modal-unit-title').value.trim();
  const hours = document.getElementById('modal-hours').value.trim();
  const roundId = document.getElementById('modal-round-id').value;
  const load = state.selectedLoad;
  const targetPlan = state.selectedPlan;

  if (!rawUnitTitle || !hours) {
    Swal.fire('กรุณากรอกข้อมูลให้ครบ', 'ระบุชื่อหน่วยการเรียนรู้และจำนวนชั่วโมง', 'warning');
    return;
  }

  const unitTitle = (unitNo && !/^หน่วยที่\s*\d+/.test(rawUnitTitle))
    ? `หน่วยที่ ${unitNo}: ${rawUnitTitle}`
    : rawUnitTitle;

  if (!state.uploadedBase64 && (!targetPlan || !targetPlan.drive_pdf_url)) {
    Swal.fire('กรุณาแนบไฟล์ PDF', 'ต้องแนบไฟล์แผนการสอนประกอบด้วยครับ', 'warning');
    return;
  }

  closeModal();
  showLoader(true, isDraft ? 'กำลังบันทึกฉบับร่าง...' : 'กำลังประมวลผลและส่งตรวจ...');

  try {
    const payload = {
      planId: planId,
      loadId: load.load_id,
      roundId: roundId,
      unitTitle: unitTitle,
      teachingHours: hours,
      base64Pdf: state.uploadedBase64 || '',
      fileName: state.uploadedFileName || '',
      isDraft: isDraft,
      lineUserId: state.teacher.lineUserId
    };

    await api.submitLessonPlan(payload);
    const bootstrap = await api.getTeachingBootstrap(state.teacher.lineUserId);
    state.loads = bootstrap.loads || [];
    state.pendingReviewsCount = bootstrap.pendingReviewsCount || 0;
    state.reportsData = null;
    renderTabs();
    renderCurrentTab();
    showToast(isDraft ? 'บันทึกฉบับร่างเรียบร้อยแล้ว' : 'ส่งแผนการสอนให้ผู้ตรวจแล้ว');

  } catch (err) {
    Swal.fire('เกิดข้อผิดพลาด', err.message, 'error');
  } finally {
    showLoader(false);
  }
}

// Modal ประวัติฉบับและการตรวจ (Plan History & Timeline)
async function openHistoryModal(planId) {
  showLoader(true, 'กำลังดึงประวัติการส่งแผน...');
  try {
    const data = await api.getPlanHistory(planId, state.teacher.lineUserId);
    showLoader(false);

    const plan = data.plan;
    const sub = data.subject;
    const reviews = data.reviews || [];

    let reviewsHtml = '';
    if (reviews.length === 0) {
      reviewsHtml = `
        <div style="text-align:center; padding:20px 0; color:#64748b; font-size:13px;">
          ยังไม่มีบันทึกประวัติการตรวจ
        </div>`;
    } else {
      reviewsHtml = reviews.map(rev => {
        const isPass = rev.action === 'Pass';
        const isRevise = rev.action === 'Revise';
        const isSubmit = rev.action === 'Submit';
        
        let actionBadge = `<span class="status-badge status-pending_head">${svg('send', 11)} ส่งแผน</span>`;
        if (isPass) actionBadge = `<span class="status-badge status-approved">${svg('check', 11)} ผ่าน</span>`;
        if (isRevise) actionBadge = `<span class="status-badge status-revise">${svg('refresh', 11)} ให้แก้ไข</span>`;

        return `
          <div style="border-left: 2px solid #cbd5e1; padding-left: 14px; margin-left: 8px; margin-bottom: 16px; position:relative;">
            <div style="position:absolute; left:-6px; top:0; width:10px; height:10px; border-radius:50%; background:#1e3a8a;"></div>
            <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
              <div style="font-size:13px; font-weight:700; color:#0f172a;">
                ${esc(rev.reviewer_name)} (${rev.role === 'Head' ? 'ผู้ตรวจ/วิชาการ' : rev.role === 'Director' ? 'ผู้อำนวยการ' : rev.role === 'Academic' ? 'ฝ่ายวิชาการ' : 'ผู้สอน'})
              </div>
              <div>${actionBadge}</div>
            </div>
            <div style="font-size:11.5px; color:#64748b; margin-top:2px;">
              ฉบับที่ ${rev.version} • ${formatDate(rev.timestamp)}
            </div>
            ${rev.comment ? `
              <div style="margin-top:6px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px; font-size:12.5px; color:#334155;">
                <strong>ข้อเสนอแนะ:</strong> ${esc(rev.comment)}
              </div>
            ` : ''}
            ${rev.pdf_url ? `
              <div style="margin-top:6px;">
                <a href="${esc(rev.pdf_url)}" target="_blank" class="btn-secondary" style="font-size:11.5px; padding:4px 10px; text-decoration:none; display:inline-flex; align-items:center; gap:5px;">
                  ${svg('fileText', 12)} <span>เปิดดูไฟล์ฉบับที่ ${rev.version}</span>
                </a>
              </div>
            ` : ''}
          </div>
        `;
      }).join('');
    }

    const content = `
      <div class="modal-header">
        <div class="modal-title">ประวัติการส่งและการตรวจ</div>
        <button class="modal-close-btn" onclick="closeModal()">${svg('x', 18)}</button>
      </div>
      <div style="background:#f1f5f9; padding:12px; border-radius:8px; font-size:13px; margin-bottom:16px; border:1px solid #e2e8f0;">
        <div><strong>วิชา:</strong> ${esc(sub.code)} ${esc(sub.name)} (ชั้น ${esc(sub.classroom)})</div>
        <div><strong>หน่วยการเรียนรู้:</strong> ${esc(plan.unit_title)} (${plan.teaching_hours} ชม.)</div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px; pt-2; border-top:1px dashed #cbd5e1; padding-top:6px;">
          <span><strong>ฉบับปัจจุบัน:</strong> ฉบับที่ ${plan.current_version}</span>
          ${getStatusBadge(plan.status)}
        </div>
      </div>
      <div style="max-height:360px; overflow-y:auto; padding-right:4px;">
        <div style="font-size:13px; font-weight:700; margin-bottom:12px; color:#1e3a8a;">ลำดับเหตุการณ์การตรวจ</div>
        ${reviewsHtml}
      </div>
      <div style="margin-top:16px; display:flex; justify-content:flex-end;">
        <button class="btn-secondary" onclick="closeModal()">ปิดหน้าต่าง</button>
      </div>
    `;

    showModal(content);

  } catch (err) {
    showLoader(false);
    Swal.fire('ข้อผิดพลาด', err.message, 'error');
  }
}

// Modal รายการบันทึกหลังสอนทั้งหมดของแผน (All Reflections for Plan)
async function openPlanReflectionsListModal(planId, unitTitle) {
  showLoader(true, 'กำลังโหลดรายการบันทึกหลังสอน...');
  try {
    const list = await api.getPlanReflections(planId, state.teacher.lineUserId);
    showLoader(false);

    let listHtml = '';
    if (list.length === 0) {
      listHtml = `
        <div style="text-align:center; padding:30px 16px; color:#64748b; font-size:13px;">
          ยังไม่มีการบันทึกหลังสอนในแผนนี้
        </div>`;
    } else {
      listHtml = list.map(ref => {
        const isLocked = ref.is_locked;
        const lockBadge = isLocked 
          ? `<span class="status-badge status-approved">${svg('lock', 11)} สมบูรณ์ (ล็อก)</span>` 
          : `<span class="status-badge status-draft">${svg('edit', 11)} ฉบับร่าง</span>`;

        // สิทธิ์ปลดล็อก: หัวหน้ากลุ่มสาระ, ฝ่ายวิชาการ, Admin (และไม่ใช่ผู้สอนเอง)
        const isReviewerOrAdmin = state.isAcademic || state.teacher.role === 'Head';

        return `
          <div style="border:1px solid #e2e8f0; border-radius:10px; padding:14px; margin-bottom:12px; background:#ffffff;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:8px;">
              <div>
                ${ref.lesson_title ? `<div style="font-weight:800; font-size:14px; color:#1e3a8a;">${esc(ref.lesson_title)}</div>` : ''}
                <div style="font-weight:700; font-size:${ref.lesson_title ? '12.5px' : '14px'}; color:#0f172a;">
                  วันที่สอน: ${formatDate(ref.teach_date)}
                </div>
                <div style="font-size:12px; color:#64748b; margin-top:2px;">
                  มาเรียน: <strong>${ref.present_students}/${ref.total_students}</strong> คน • บรรลุ: <strong>${ref.passed_students}</strong> คน (<span style="color:#15803d; font-weight:700;">${ref.passed_pct}%</span>)
                </div>
              </div>
              <div>${lockBadge}</div>
            </div>

            <div style="background:#f8fafc; border-radius:6px; padding:10px; font-size:12.5px; color:#334155; margin-bottom:10px; overflow-wrap:anywhere; word-break:break-word;">
              ${(() => {
                const kpa = parseReflectionOutcomes(ref.outcomes);
                if (kpa.hasKpa) {
                  return `
                    <div><strong>1.1 ความรู้ (K):</strong> ${esc(kpa.k)}</div>
                    <div style="margin-top:2px;"><strong>1.2 ทักษะ/กระบวนการ (P):</strong> ${esc(kpa.p)}</div>
                    <div style="margin-top:2px;"><strong>1.3 เจตคติ (A):</strong> ${esc(kpa.a)}</div>
                  `;
                }
                return `<div><strong>ผลการสอน:</strong> ${esc(ref.outcomes)}</div>`;
              })()}
              ${ref.problems ? `<div style="margin-top:4px;"><strong>ปัญหา:</strong> ${esc(ref.problems)}</div>` : ''}
              ${ref.solutions ? `<div style="margin-top:4px;"><strong>แนวทางพัฒนา:</strong> ${esc(ref.solutions)}</div>` : ''}
            </div>

            <div style="display:flex; justify-content:flex-end; gap:8px;">
              <button class="btn-secondary" style="padding:6px 12px; font-size:12px;" onclick='printReflectionDirect(${JSON.stringify(ref)}, "${planId}", "${esc(unitTitle)}")'>
                ${svg('printer', 12)} <span>พิมพ์ A4</span>
              </button>
              ${!isLocked ? `
                <button class="btn-primary" style="padding:6px 12px; font-size:12px;" onclick='openReflectionModal("${planId}", "${esc(unitTitle)}", ${JSON.stringify(ref)})'>
                  ${svg('edit', 12)} <span>แก้ไขร่าง</span>
                </button>
              ` : `
                ${isReviewerOrAdmin ? `
                  <button class="btn-secondary" style="padding:6px 12px; font-size:12px; color:#b45309;" onclick='promptUnlockReflection("${ref.reflection_id}", "${formatDate(ref.teach_date)}", "${planId}", "${esc(unitTitle)}")'>
                    ${svg('unlock', 12)} <span>ปลดล็อกให้แก้ไข</span>
                  </button>
                ` : `
                  <span style="font-size:11.5px; color:#94a3b8; display:flex; align-items:center; gap:4px;">
                    ${svg('lock', 11)} ล็อกแล้ว (ติดต่อวิชาการเพื่อปลดล็อก)
                  </span>
                `}
              `}
            </div>
          </div>
        `;
      }).join('');
    }

    state.currentModalReflections = { planId, unitTitle, list };

    const content = `
      <div class="modal-header">
        <div class="modal-title">บันทึกหลังสอนทั้งหมด</div>
        <button class="modal-close-btn" onclick="closeModal()">${svg('x', 18)}</button>
      </div>
      <div style="background:#f1f5f9; padding:10px 14px; border-radius:8px; font-size:13px; margin-bottom:14px; border:1px solid #e2e8f0;">
        <strong>หน่วยการเรียนรู้:</strong> ${esc(unitTitle)}
      </div>
      <div style="max-height:420px; overflow-y:auto; padding-right:4px;">
        ${listHtml}
      </div>
      <div style="margin-top:16px; display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="btn-primary" onclick='openReflectionModal("${planId}", "${esc(unitTitle)}")'>
            ${svg('plus', 14)} <span>เพิ่มวันสอนใหม่</span>
          </button>
          ${list.length > 1 ? `
            <button class="btn-secondary" onclick="printAllPlanReflections()">
              ${svg('printer', 14)} <span>พิมพ์ทั้งหมด (${list.length} แผน)</span>
            </button>
          ` : ''}
        </div>
        <button class="btn-secondary" onclick="closeModal()">ปิด</button>
      </div>
    `;

    showModal(content);

  } catch (err) {
    showLoader(false);
    Swal.fire('ข้อผิดพลาด', err.message, 'error');
  }
}

function parseReflectionOutcomes(raw) {
  const txt = String(raw || '').trim();
  const mk = txt.match(/\[K\]\s*([\s\S]*?)(?=\n?\[P\]|\n?\[A\]|$)/);
  const mp = txt.match(/\[P\]\s*([\s\S]*?)(?=\n?\[A\]|$)/);
  const ma = txt.match(/\[A\]\s*([\s\S]*?)$/);
  if (mk || mp || ma) {
    return {
      hasKpa: true,
      k: mk ? mk[1].trim() : '',
      p: mp ? mp[1].trim() : '',
      a: ma ? ma[1].trim() : ''
    };
  }
  return { hasKpa: false, k: txt, p: '', a: '' };
}

function formatReflectionOutcomes(k, p, a) {
  return `[K] ${k}\n[P] ${p}\n[A] ${a}`;
}

// Modal บันทึกหลังสอน (เพิ่มใหม่ หรือ แก้ไขฉบับร่าง)
function openReflectionModal(planId, unitTitle, existing) {
  const today = getTodayBangkokISO();
  const refId = existing ? existing.reflection_id : '';
  const lessonVal = existing ? (existing.lesson_title || '') : '';
  const dateVal = existing && existing.teach_date ? String(existing.teach_date).slice(0, 10) : today;
  const totalVal = existing ? existing.total_students : '';
  const presentVal = existing ? existing.present_students : '';
  const passedVal = existing ? existing.passed_students : '';
  const kpa = parseReflectionOutcomes(existing ? existing.outcomes : '');
  const problemsVal = existing ? existing.problems : '';
  const solutionsVal = existing ? existing.solutions : '';

  const content = `
    <div class="modal-header">
      <div class="modal-title">${existing ? 'แก้ไขบันทึกหลังสอน' : 'เพิ่มบันทึกผลการจัดการเรียนรู้'}</div>
      <button class="modal-close-btn" onclick="closeModal()">${svg('x', 18)}</button>
    </div>
    <div style="margin-bottom:12px; font-size:13px; color:#475569; background:#f8fafc; padding:8px 12px; border-radius:8px; border:1px solid #e2e8f0;">
      <strong>หน่วย:</strong> ${esc(unitTitle)}
    </div>
    <form id="reflection-form">
      <input type="hidden" id="ref-id" value="${esc(refId)}"/>
      <div class="form-group">
        <label class="form-label">แผนการจัดการเรียนรู้ที่ / เรื่องที่สอน *</label>
        <input type="text" id="ref-lesson-title" class="form-input" placeholder="เช่น แผนที่ 1: สมบัติของสสาร (คาบที่ 1-2)" value="${esc(lessonVal)}" required/>
      </div>
      <div class="form-group">
        <label class="form-label">วันที่สอนจริง (วัน/เดือน/ปี พ.ศ.) *</label>
        ${thaiDatePicker('ref-date', dateVal)}
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
        <div class="form-group">
          <label class="form-label">นร. ทั้งหมด *</label>
          <input type="number" id="ref-total" class="form-input" min="1" placeholder="35" value="${esc(totalVal)}" oninput="calcPassedPct()" required/>
        </div>
        <div class="form-group">
          <label class="form-label">มาเรียน *</label>
          <input type="number" id="ref-present" class="form-input" min="0" placeholder="34" value="${esc(presentVal)}" oninput="calcPassedPct()" required/>
        </div>
        <div class="form-group">
          <label class="form-label">บรรลุเป้าหมาย *</label>
          <input type="number" id="ref-passed" class="form-input" min="0" placeholder="30" value="${esc(passedVal)}" oninput="calcPassedPct()" required/>
        </div>
      </div>
      <div id="passed-pct-badge" style="font-size:12px; font-weight:700; color:#15803d; background:#f0fdf4; padding:6px 10px; border-radius:6px; margin-bottom:12px; border:1px solid #bbf7d0;">
        อัตราบรรลุจุดประสงค์: 0.0% (คำนวณจากผู้มาเรียนจริง)
      </div>

      <div class="form-group">
        <label class="form-label">1. ผลที่เกิดกับผู้เรียน — 1.1 ด้านความรู้ K (Knowledge) *</label>
        <textarea id="ref-outcome-k" class="form-textarea" rows="2" placeholder="นักเรียนสามารถอธิบาย/บอกหลักการได้..." required>${esc(kpa.k)}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">1.2 ด้านทักษะ/กระบวนการ/กระบวนการคิด P (Practice) *</label>
        <textarea id="ref-outcome-p" class="form-textarea" rows="2" placeholder="นักเรียนสามารถปฏิบัติ/วิเคราะห์/ทำงานกลุ่มได้..." required>${esc(kpa.p)}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">1.3 ด้านเจตคติ/คุณลักษณะอันพึงประสงค์ A (Attribute) *</label>
        <textarea id="ref-outcome-a" class="form-textarea" rows="2" placeholder="นักเรียนมีความรับผิดชอบ ใฝ่เรียนรู้ และให้ความร่วมมือ..." required>${esc(kpa.a)}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">2. ปัญหา / อุปสรรคที่พบจากการจัดการเรียนรู้</label>
        <textarea id="ref-problems" class="form-textarea" rows="2" placeholder="มีนักเรียนบางคนยังสับสนขั้นตอน...">${esc(problemsVal)}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">3. ข้อเสนอแนะ / แนวทางแก้ไข</label>
        <textarea id="ref-solutions" class="form-textarea" rows="2" placeholder="จัดกิจกรรมทบทวนเพิ่มเติมในคาบถัดไป...">${esc(solutionsVal)}</textarea>
      </div>
      <div style="display:flex; gap:10px; margin-top:20px;">
        <button type="button" class="btn-secondary" style="flex:1; justify-content:center;" onclick="submitReflection('${planId}', false)">
          ${svg('save', 14)} <span>บันทึกร่าง</span>
        </button>
        <button type="button" class="btn-primary" style="flex:1; justify-content:center;" onclick="submitReflection('${planId}', true)">
          ${svg('lock', 14)} <span>ยืนยันสมบูรณ์</span>
        </button>
      </div>
    </form>
  `;

  showModal(content);
  calcPassedPct();
}

function calcPassedPct() {
  const presentEl = document.getElementById('ref-present');
  const passedEl = document.getElementById('ref-passed');
  const badgeEl = document.getElementById('passed-pct-badge');
  if (!presentEl || !passedEl || !badgeEl) return;

  const present = parseFloat(presentEl.value) || 0;
  const passed = parseFloat(passedEl.value) || 0;

  if (present <= 0) {
    badgeEl.innerText = 'อัตราบรรลุจุดประสงค์: 0.0% (คำนวณจากผู้มาเรียนจริง)';
    badgeEl.style.color = '#64748b';
    return;
  }

  const pct = ((passed / present) * 100).toFixed(1);
  badgeEl.innerText = `อัตราบรรลุจุดประสงค์: ${pct}% (คิดจากนักเรียนที่มาเรียน ${present} คน)`;
  badgeEl.style.color = pct >= 80 ? '#15803d' : pct >= 50 ? '#b45309' : '#dc2626';
}

async function submitReflection(planId, isLocked) {
  const refId = document.getElementById('ref-id').value;
  const lessonTitle = document.getElementById('ref-lesson-title').value.trim();
  const teachDate = document.getElementById('ref-date').value;
  const total = parseInt(document.getElementById('ref-total').value, 10);
  const present = parseInt(document.getElementById('ref-present').value, 10);
  const passed = parseInt(document.getElementById('ref-passed').value, 10);
  const kVal = document.getElementById('ref-outcome-k').value.trim();
  const pVal = document.getElementById('ref-outcome-p').value.trim();
  const aVal = document.getElementById('ref-outcome-a').value.trim();
  const outcomes = formatReflectionOutcomes(kVal, pVal, aVal);
  const problems = document.getElementById('ref-problems').value.trim();
  const solutions = document.getElementById('ref-solutions').value.trim();

  if (!lessonTitle || !teachDate || isNaN(total) || isNaN(present) || isNaN(passed) || !kVal || !pVal || !aVal) {
    Swal.fire('กรุณากรอกข้อมูลให้ครบ', 'ระบุแผนการสอนที่/เรื่องที่สอน วันที่ ยอดนักเรียน และผลที่เกิดกับผู้เรียนทั้ง K, P, A', 'warning');
    return;
  }

  if (present > total) {
    Swal.fire('ข้อมูลไม่ถูกต้อง', 'จำนวนนักเรียนที่มาเรียนต้องไม่เกินจำนวนทั้งหมด', 'error');
    return;
  }
  if (passed > present) {
    Swal.fire('ข้อมูลไม่ถูกต้อง', 'จำนวนนักเรียนที่บรรลุต้องไม่เกินจำนวนที่มาเรียน', 'error');
    return;
  }

  closeModal();
  showLoader(true, isLocked ? 'กำลังยืนยันบันทึกสมบูรณ์...' : 'กำลังบันทึกฉบับร่าง...');

  try {
    await api.saveReflection({
      reflectionId: refId || '',
      planId: planId,
      lessonTitle: lessonTitle,
      teachDate: teachDate,
      totalStudents: total,
      presentStudents: present,
      passedStudents: passed,
      outcomes: outcomes,
      problems: problems,
      solutions: solutions,
      isLocked: isLocked,
      lineUserId: state.teacher.lineUserId
    });

    state.reportsData = null;
    renderCurrentTab();
    showToast(isLocked ? 'ยืนยันบันทึกหลังสอนสมบูรณ์แล้ว' : 'บันทึกฉบับร่างเรียบร้อยแล้ว');

  } catch (err) {
    Swal.fire('เกิดข้อผิดพลาด', err.message, 'error');
  } finally {
    showLoader(false);
  }
}

// ฟังก์ชันขอปลดล็อกบันทึกสมบูรณ์ (โดยผู้ตรวจ/วิชาการ)
function promptUnlockReflection(reflectionId, teachDateStr, planId, unitTitle) {
  Swal.fire({
    title: 'ขอปลดล็อกบันทึกหลังสอน',
    text: `ต้องการปลดล็อกบันทึกประจำวันที่ ${teachDateStr} หรือไม่?`,
    input: 'textarea',
    inputLabel: 'ระบุเหตุผลในการขอปลดล็อกแก้ไข *',
    inputPlaceholder: 'เช่น ครูขอปรับปรุงยอดนักเรียนที่มาเรียนจริง...',
    inputValidator: (value) => {
      if (!value || !value.trim()) {
        return 'กรุณาระบุเหตุผลในการปลดล็อกด้วยครับ';
      }
    },
    showCancelButton: true,
    confirmButtonText: 'ยืนยันปลดล็อก',
    cancelButtonText: 'ยกเลิก',
    confirmButtonColor: '#1e3a8a'
  }).then(async (result) => {
    if (result.isConfirmed) {
      showLoader(true, 'กำลังปลดล็อกบันทึก...');
      try {
        await api.unlockReflection({
          reflectionId: reflectionId,
          reason: result.value.trim(),
          lineUserId: state.teacher.lineUserId
        });

        showToast('ปลดล็อกบันทึกหลังสอนเรียบร้อยแล้ว');
        openPlanReflectionsListModal(planId, unitTitle);
      } catch (err) {
        Swal.fire('เกิดข้อผิดพลาด', err.message, 'error');
      } finally {
        showLoader(false);
      }
    }
  });
}

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

function showModal(contentHtml) {
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-overlay" onclick="handleOverlayClick(event)">
      <div class="modal-content" onclick="event.stopPropagation()">
        ${contentHtml}
      </div>
    </div>
  `;
}

function closeModal() {
  document.getElementById('modal-root').innerHTML = '';
}

function handleOverlayClick(event) {
  if (event.target.classList.contains('modal-overlay')) {
    closeModal();
  }
}

function showLoader(show, text = 'กำลังโหลด...') {
  const el = document.getElementById('loader-overlay');
  if (!el) return;
  if (show) {
    document.getElementById('loader-text').innerText = text;
    el.style.display = 'flex';
  } else {
    el.style.display = 'none';
  }
}

function getStatusBadge(status) {
  switch (status) {
    case 'Draft': return `<span class="status-badge status-draft">${svg('edit', 12)} ฉบับร่าง</span>`;
    case 'Pending_Head': return `<span class="status-badge status-pending_head">${svg('clock', 12)} รอหัวหน้าตรวจ</span>`;
    case 'Pending_Academic': return `<span class="status-badge status-pending_academic">${svg('eye', 12)} รอ ผอ. รับรอง</span>`;
    case 'Approved': return `<span class="status-badge status-approved">${svg('checkCircle', 12)} รับรองแล้ว</span>`;
    case 'Revise': return `<span class="status-badge status-revise">${svg('refresh', 12)} ให้แก้ไข</span>`;
    default: return `<span class="status-badge status-not_submitted">${svg('circle', 12)} ยังไม่ส่ง</span>`;
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear() + 543}`;
}

function esc(str) {
  return String(str || '').replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[m]);
}

// ============================================================================
// Module 6: Reports, Analytics, CSV Export & A4 Printing
// โรงเรียนบ้านห้วยตาด (100% Emoji-Free)
// ============================================================================

/**
 * โหลดข้อมูลรายงานและสถิติจากเซิร์ฟเวอร์
 */
async function loadReportData() {
  const lineUserId = state.currentLineProfile ? state.currentLineProfile.userId : 'mock_line_user_id';
  const scope = state.isAcademic ? (state.reportScope || 'all') : 'mine';
  const data = await api.getTeachingReport(
    lineUserId,
    state.reportFilterTerm || '',
    state.reportFilterRound || '',
    state.reportFilterGroup || '',
    scope
  );
  state.reportsData = data;
  if (!state.reportFilterTerm && data.activeTermId) {
    state.reportFilterTerm = data.activeTermId;
  }
}

/**
 * แสดงผลแท็บรายงานและสถิติ
 */
async function renderReports(container) {
  if (!state.reportsData) {
    showLoader(true, 'กำลังโหลดข้อมูลรายงานและสถิติ...');
    try {
      await loadReportData();
    } catch (err) {
      showLoader(false);
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">${svg('alert', 40, 1.5)}</div>
          <p style="margin-top:10px; color:#dc2626;">ไม่สามารถโหลดข้อมูลรายงานได้</p>
          <small class="text-muted">${esc(err.message)}</small>
          <div style="margin-top:16px;">
            <button class="btn btn-primary" onclick="renderReports(document.getElementById('tab-content'))">
              ${svg('refresh', 14)} ลองใหม่อีกครั้ง
            </button>
          </div>
        </div>
      `;
      return;
    } finally {
      showLoader(false);
    }
  }

  const d = state.reportsData;
  const s = d.summary || {};
  const isPersonalReport = !state.isAcademic || (d.scope ? d.scope === 'mine' : state.reportScope === 'mine');
  let currentSubView = state.reportSubView || 'plans';
  if (isPersonalReport && currentSubView === 'compliance') {
    currentSubView = 'plans';
    state.reportSubView = 'plans';
  }

  // สรุปข้อมูลตัวเลือกตัวกรอง
  const termOptions = (d.terms || []).map(t => 
    `<option value="${esc(t.termId)}" ${String(t.termId) === String(state.reportFilterTerm) ? 'selected' : ''}>ภาคเรียนที่ ${esc(t.termName)} ${t.isActive ? '(ปัจจุบัน)' : ''}</option>`
  ).join('');

  const roundOptions = `<option value="">-- ทุกรอบการส่ง --</option>` + (d.rounds || []).map(r => 
    `<option value="${esc(r.roundId)}" ${String(r.roundId) === String(state.reportFilterRound) ? 'selected' : ''}>${esc(r.title)} ${r.isOpen ? '(เปิดรับ)' : ''}</option>`
  ).join('');

  const groupOptions = `<option value="">-- ทุกกลุ่มสาระการเรียนรู้ --</option>` + (d.subjectGroups || []).map(g => 
    `<option value="${esc(g.groupId)}" ${String(g.groupId) === String(state.reportFilterGroup) ? 'selected' : ''}>${esc(g.name)}</option>`
  ).join('');

  let html = `
    <!-- Header รายงาน -->
    <div style="margin-bottom:16px;">
      <h2 style="font-size:18px; font-weight:800; color:var(--primary); margin-bottom:2px;">
        รายงาน & สถิติการจัดการเรียนรู้
      </h2>
      <p style="font-size:12.5px; color:var(--text-muted);">
        โรงเรียนบ้านห้วยตาด · ทะเบียนติดตามการส่งแผนและบันทึกหลังสอน
      </p>
    </div>

    <!-- แถบตัวกรองข้อมูล -->
    <div class="report-filter-bar no-print">
      <div class="filter-group">
        <label class="filter-label">ภาคเรียน / ปีการศึกษา</label>
        <select id="report-filter-term" class="filter-select" onchange="onFilterReportChange()">
          ${termOptions}
        </select>
      </div>
      <div class="filter-group">
        <label class="filter-label">รอบการส่งแผน</label>
        <select id="report-filter-round" class="filter-select" onchange="onFilterReportChange()">
          ${roundOptions}
        </select>
      </div>
      <div class="filter-group">
        <label class="filter-label">กลุ่มสาระการเรียนรู้</label>
        <select id="report-filter-group" class="filter-select" onchange="onFilterReportChange()">
          ${groupOptions}
        </select>
      </div>
      ${state.isAcademic ? `
        <div class="filter-group">
          <label class="filter-label">ขอบเขตข้อมูล</label>
          <select id="report-filter-scope" class="filter-select" onchange="onFilterReportChange()">
            <option value="all" ${state.reportScope !== 'mine' ? 'selected' : ''}>รวมทั้งโรงเรียน</option>
            <option value="mine" ${state.reportScope === 'mine' ? 'selected' : ''}>เฉพาะรายวิชาของฉัน</option>
          </select>
        </div>
      ` : ''}
      <div>
        <button class="btn btn-secondary" onclick="onFilterReportChange()" style="height:38px;">
          ${svg('refresh', 14)} รีเฟรช
        </button>
      </div>
    </div>

    <!-- การ์ดตัวชี้วัดและสถิติภาพรวม (6 Cards) -->
    <div class="metrics-grid">
      <div class="metric-card highlight-blue">
        <span class="metric-label">ภาระสอนทั้งหมด</span>
        <span class="metric-num">${s.totalLoads || 0}</span>
        <span class="metric-sub">รายวิชา/ห้องเรียน</span>
      </div>
      <div class="metric-card highlight-purple">
        <span class="metric-label">ส่งแผนแล้ว</span>
        <span class="metric-num">${s.submittedPlans || 0} / ${s.totalPlans || 0}</span>
        <span class="metric-sub">คิดเป็น ${s.submissionRate || 0}% ของทั้งหมด</span>
      </div>
      <div class="metric-card highlight-yellow">
        <span class="metric-label">รอหัวหน้าตรวจ</span>
        <span class="metric-num">${s.pendingHead || 0}</span>
        <span class="metric-sub">แผนการสอน</span>
      </div>
      <div class="metric-card highlight-cyan">
        <span class="metric-label">รอ ผอ. รับรอง</span>
        <span class="metric-num">${s.pendingAcademic || 0}</span>
        <span class="metric-sub">แผนการสอน</span>
      </div>
      <div class="metric-card highlight-green">
        <span class="metric-label">อนุมัติแล้ว</span>
        <span class="metric-num">${s.approved || 0}</span>
        <span class="metric-sub">คิดเป็น ${s.approvedRate || 0}% ของทั้งหมด</span>
      </div>
      <div class="metric-card highlight-red">
        <span class="metric-label">ค้างส่งเกินกำหนด</span>
        <span class="metric-num">${s.overdue || 0}</span>
        <span class="metric-sub">${s.revision || 0} แผนรอแก้ไข</span>
      </div>
    </div>

    <!-- แถบสลับมุมมอง & เครื่องมือส่งออกข้อมูล -->
    <div class="action-toolbar no-print">
      <div class="subview-tabs">
        ${state.isAcademic && !isPersonalReport ? `
          <button class="subview-btn ${currentSubView === 'compliance' ? 'active' : ''}" onclick="setReportSubView('compliance')">
            ${svg('barChart', 14)} สรุปรายครู (${(d.teacherSummary || []).length})
          </button>
        ` : ''}
        <button class="subview-btn ${currentSubView === 'plans' ? 'active' : ''}" onclick="setReportSubView('plans')">
          ${svg('fileText', 14)} ทะเบียนส่งแผน (${(d.plans || []).length})
        </button>
        <button class="subview-btn ${currentSubView === 'reflections' ? 'active' : ''}" onclick="setReportSubView('reflections')">
          ${svg('edit', 14)} บันทึกหลังสอน (${(d.reflections || []).length})
        </button>
      </div>

      <div class="export-btns">
        <button class="btn btn-secondary" onclick="exportCurrentCSV()" title="ส่งออกเป็นไฟล์ CSV สำหรับ Excel">
          ${svg('download', 14)} ส่งออก CSV
        </button>
        <button class="btn btn-primary" onclick="printSummaryReport()" title="พิมพ์แบบสรุปทางการขนาด A4">
          ${svg('printer', 14)} พิมพ์สรุป A4
        </button>
      </div>
    </div>
  `;

  // แสดงผลตารางตาม SubView
  if (currentSubView === 'compliance' && state.isAcademic) {
    html += renderTeacherComplianceDashboard(d.teacherSummary || []);
  } else if (currentSubView === 'plans') {
    html += renderPlansReportTable(d.plans || []);
  } else {
    html += renderReflectionsReportTable(d.reflections || []);
  }

  container.innerHTML = html;
}

/**
 * เปลี่ยนตัวกรองข้อมูลรายงาน
 */
async function onFilterReportChange() {
  const termEl = document.getElementById('report-filter-term');
  const roundEl = document.getElementById('report-filter-round');
  const groupEl = document.getElementById('report-filter-group');
  const scopeEl = document.getElementById('report-filter-scope');

  if (termEl) state.reportFilterTerm = termEl.value;
  if (roundEl) state.reportFilterRound = roundEl.value;
  if (groupEl) state.reportFilterGroup = groupEl.value;
  if (scopeEl) {
    state.reportScope = scopeEl.value;
    if (state.reportScope === 'mine' && state.reportSubView === 'compliance') {
      state.reportSubView = 'plans';
    }
  }

  showLoader(true, 'กำลังปรับปรุงข้อมูลรายงาน...');
  try {
    await loadReportData();
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'ปรับปรุงข้อมูลไม่สำเร็จ',
      text: err.message,
      confirmButtonColor: '#1e3a8a'
    });
  } finally {
    showLoader(false);
    renderReports(document.getElementById('tab-content'));
  }
}

/**
 * สลับมุมมองย่อย (ทะเบียนแผน / บันทึกหลังสอน)
 */
function setReportSubView(view) {
  state.reportSubView = view;
  renderReports(document.getElementById('tab-content'));
}

function setComplianceFilter(f) {
  state.complianceFilter = f;
  renderReports(document.getElementById('tab-content'));
}

function onComplianceSearch(v, el) {
  const pos = el ? el.selectionStart : v.length;
  state.complianceSearch = v;
  renderReports(document.getElementById('tab-content'));
  const inp = document.getElementById('compliance-search-input');
  if (inp) { inp.focus(); inp.setSelectionRange(pos, pos); }
}

/**
 * Dashboard สรุปรายครู (ติดตามว่าครูคนไหนยังไม่ส่งแผน สำหรับ ผอ. และ ฝ่ายวิชาการ)
 */
function renderTeacherComplianceDashboard(list) {
  if (!list || list.length === 0) {
    return `
      <div class="empty-state">
        <div class="empty-icon">${svg('barChart', 40, 1.5)}</div>
        <p style="margin-top:10px;">ยังไม่มีข้อมูลภาระการสอนของครูในรอบที่เลือก</p>
      </div>
    `;
  }

  const missingTeachersCount = list.filter(t => t.missing_count > 0 || t.revise_count > 0).length;
  const completeTeachersCount = list.length - missingTeachersCount;
  const kw = (state.complianceSearch || '').trim().toLowerCase();

  const filtered = list.filter(t => {
    const hasIssue = t.missing_count > 0 || t.revise_count > 0;
    if (state.complianceFilter === 'missing' && !hasIssue) return false;
    if (state.complianceFilter === 'complete' && hasIssue) return false;
    if (kw && !(`${t.teacher_name} ${t.department}`).toLowerCase().includes(kw)) return false;
    return true;
  });

  const filterBar = `
    <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:12px 16px; margin-bottom:14px; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:10px;">
      <div style="display:flex; flex-wrap:wrap; gap:8px;">
        <button class="subview-btn ${state.complianceFilter === 'all' ? 'active' : ''}" onclick="setComplianceFilter('all')">
          ทั้งหมด (${list.length})
        </button>
        <button class="subview-btn ${state.complianceFilter === 'missing' ? 'active' : ''}" onclick="setComplianceFilter('missing')" style="${state.complianceFilter === 'missing' ? '' : 'color:#b91c1c;'}">
          ยังไม่ครบ / ค้างส่ง (${missingTeachersCount})
        </button>
        <button class="subview-btn ${state.complianceFilter === 'complete' ? 'active' : ''}" onclick="setComplianceFilter('complete')" style="${state.complianceFilter === 'complete' ? '' : 'color:#15803d;'}">
          ส่งครบแล้ว (${completeTeachersCount})
        </button>
      </div>
      <div style="position:relative; min-width:220px;">
        <input id="compliance-search-input" type="text" class="search-input" placeholder="ค้นหาชื่อครู..." value="${esc(state.complianceSearch || '')}" oninput="onComplianceSearch(this.value, this)" style="padding-left:32px;"/>
        <span style="position:absolute; left:10px; top:10px; color:#94a3b8;">${svg('search', 14)}</span>
      </div>
    </div>
  `;

  const statusMeta = (st) => {
    switch (st) {
      case 'Approved': return { label: 'อนุมัติแล้ว', bg: '#dcfce7', color: '#15803d' };
      case 'Pending_Academic': return { label: 'รอ ผอ. รับรอง', bg: '#e0f2fe', color: '#0369a1' };
      case 'Pending_Head': return { label: 'รอหัวหน้าตรวจ', bg: '#fef3c7', color: '#b45309' };
      case 'Revise': return { label: 'ส่งกลับแก้ไข', bg: '#fee2e2', color: '#b91c1c' };
      default: return { label: 'ยังไม่ส่ง', bg: '#fef2f2', color: '#dc2626' };
    }
  };

  const cardsHtml = filtered.map(t => {
    const pct = t.expected_count > 0 ? Math.round((t.submitted_count / t.expected_count) * 100) : 0;
    const isComplete = t.missing_count === 0 && t.revise_count === 0;
    const barColor = isComplete ? '#16a34a' : (pct >= 50 ? '#f59e0b' : '#dc2626');
    const summaryBadge = isComplete
      ? `<span style="font-size:11.5px; font-weight:700; padding:3px 10px; border-radius:999px; background:#dcfce7; color:#15803d;">ส่งครบแล้ว</span>`
      : `<span style="font-size:11.5px; font-weight:700; padding:3px 10px; border-radius:999px; background:#fee2e2; color:#b91c1c;">ค้างส่ง ${t.missing_count} ${t.revise_count ? '· แก้ไข ' + t.revise_count : ''}</span>`;

    const itemsHtml = (t.items || []).map(it => {
      const sm = statusMeta(it.status);
      return `
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; padding:7px 10px; border-radius:8px; background:#f8fafc; border:1px solid #e2e8f0; font-size:12px;">
          <div style="min-width:0;">
            <span style="font-weight:700; color:#1e3a8a;">${esc(it.subject_code)}</span>
            <span style="color:#0f172a; font-weight:600;">${esc(it.subject_name)}</span>
            <span style="color:#64748b;">(${esc(it.classroom)}${it.unit_title ? ' · ' + esc(it.unit_title) : ' · ' + esc(it.round_title)})</span>
          </div>
          <span style="flex:none; font-size:11px; font-weight:700; padding:2px 8px; border-radius:999px; background:${sm.bg}; color:${sm.color};">${sm.label}</span>
        </div>
      `;
    }).join('');

    return `
      <div style="background:#ffffff; border:1px solid ${isComplete ? '#e2e8f0' : '#fecaca'}; border-radius:14px; padding:16px; margin-bottom:12px; box-shadow:var(--shadow-sm);">
        <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:10px; margin-bottom:10px;">
          <div>
            <div style="font-size:15px; font-weight:800; color:#0f172a;">${esc(t.teacher_name)}</div>
            <div style="font-size:12px; color:#64748b;">${esc(t.department || '-')} · ส่งแล้ว ${t.submitted_count}/${t.expected_count} รายการ (${pct}%)</div>
          </div>
          <div>${summaryBadge}</div>
        </div>
        <div style="height:8px; background:#f1f5f9; border-radius:999px; overflow:hidden; margin-bottom:12px;">
          <div style="height:100%; width:${pct}%; background:${barColor}; border-radius:999px; transition:width .3s ease;"></div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:8px;">
          ${itemsHtml}
        </div>
      </div>
    `;
  }).join('');

  return filterBar + (cardsHtml || `<div class="empty-state"><p>ไม่พบรายชื่อครูตามเงื่อนไขที่เลือก</p></div>`);
}

/**
 * แสดงตารางทะเบียนการส่งแผนการสอน
 */
function renderPlansReportTable(plans) {
  if (plans.length === 0) {
    return `
      <div class="empty-state">
        <div class="empty-icon">${svg('fileText', 40, 1.5)}</div>
        <p style="margin-top:10px;">ไม่พบข้อมูลแผนการสอนตามเงื่อนไขที่เลือก</p>
      </div>
    `;
  }

  let rows = plans.map((p, idx) => {
    let overdueBadge = '';
    if (p.is_overdue) {
      overdueBadge = `<span class="badge-overdue">${svg('alert', 10)} เกินกำหนด</span>`;
    }

    let fileBtn = '';
    if (p.drive_pdf_url) {
      fileBtn = `<a href="${esc(p.drive_pdf_url)}" target="_blank" class="btn btn-secondary" style="padding:4px 8px; font-size:11.5px; text-decoration:none;">${svg('paperclip', 12)} PDF</a>`;
    }

    return `
      <tr>
        <td style="text-align:center; font-weight:600; color:var(--text-muted);">${idx + 1}</td>
        <td>
          <div style="font-weight:700; color:var(--primary);">${esc(p.subject_code)} ${esc(p.subject_name)}</div>
          <small class="text-muted">${esc(p.classroom)} · ${esc(p.group_name)}</small>
        </td>
        <td>
          <div style="font-weight:600;">${esc(p.teacher_name)}</div>
          <small class="text-muted">ผู้ตรวจ: ${esc(p.reviewer_name)}</small>
        </td>
        <td>
          <div>${esc(p.unit_title)}</div>
          <small class="text-muted">${esc(p.round_title)} (ฉบับที่ ${p.version})</small>
        </td>
        <td style="text-align:center;">
          ${getStatusBadge(p.status)}
          ${overdueBadge ? `<div style="margin-top:3px;">${overdueBadge}</div>` : ''}
        </td>
        <td style="font-size:12px;">
          <div>กำหนด: ${p.round_end_date ? formatDate(p.round_end_date) : '-'}</div>
          <div class="text-muted">ส่งเมื่อ: ${p.submitted_at && p.submitted_at !== '-' ? formatDate(p.submitted_at) : '-'}</div>
        </td>
        <td style="text-align:center; white-space:nowrap;">
          <div style="display:inline-flex; gap:4px;">
            ${fileBtn}
            <button class="btn btn-secondary" ${p.status === 'Approved' ? `onclick="printPlanSheet('${esc(p.plan_id)}')"` : 'disabled'} style="padding:4px 8px; font-size:11.5px;${p.status === 'Approved' ? '' : ' opacity:0.45; cursor:not-allowed;'}" title="${p.status === 'Approved' ? 'พิมพ์บันทึกข้อความฉบับนี้' : 'รอ ผอ. รับรองก่อนจึงจะพิมพ์ได้'}">
              ${svg('printer', 12)}
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="table-container">
      <table class="report-table">
        <thead>
          <tr>
            <th style="width:40px; text-align:center;">ที่</th>
            <th>รายวิชา / ระดับชั้น</th>
            <th>ครูผู้สอน / ผู้ตรวจ</th>
            <th>หน่วย / แผนการสอน</th>
            <th style="text-align:center;">สถานะ</th>
            <th>กำหนดส่ง / วันที่ส่ง</th>
            <th style="text-align:center;">การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * แสดงตารางสรุปบันทึกหลังสอน
 */
function renderReflectionsReportTable(reflections) {
  if (reflections.length === 0) {
    return `
      <div class="empty-state">
        <div class="empty-icon">${svg('edit', 40, 1.5)}</div>
        <p style="margin-top:10px;">ไม่พบข้อมูลบันทึกหลังสอนตามเงื่อนไขที่เลือก</p>
      </div>
    `;
  }

  let rows = reflections.map((rf, idx) => {
    let pctBadgeColor = 'var(--success)';
    if (rf.achievement_percentage < 50) pctBadgeColor = 'var(--danger)';
    else if (rf.achievement_percentage < 70) pctBadgeColor = 'var(--warning)';

    let lockBadge = rf.is_locked
      ? `<span style="display:inline-flex; align-items:center; gap:3px; color:#16a34a; font-size:11.5px; font-weight:700;">${svg('lock', 11)} บันทึกเสร็จสมบูรณ์</span>`
      : `<span style="display:inline-flex; align-items:center; gap:3px; color:#d97706; font-size:11.5px; font-weight:700;">${svg('unlock', 11)} ยังแก้ไขได้</span>`;

    return `
      <tr>
        <td style="text-align:center; font-weight:600; color:var(--text-muted);">${idx + 1}</td>
        <td>
          <div style="font-weight:700; color:#1e293b;">${formatDate(rf.taught_date)}</div>
          <small class="text-muted">${esc(rf.round_title)}</small>
        </td>
        <td>
          <div style="font-weight:700; color:var(--primary);">${esc(rf.subject_code)} ${esc(rf.subject_name)}</div>
          <small class="text-muted">${esc(rf.classroom)} · ${rf.lesson_title ? esc(rf.lesson_title) + ' · ' : ''}ครูผู้สอน: ${esc(rf.teacher_name)}</small>
        </td>
        <td>
          <div style="font-size:12.5px;">มาเรียน: <strong>${rf.present_students}</strong> / ${rf.total_students} คน</div>
          <div style="font-size:12px; margin-top:2px;">
            บรรลุเป้าหมาย: <strong style="color:${pctBadgeColor};">${rf.achieved_students} คน (${rf.achievement_percentage}%)</strong>
          </div>
        </td>
        <td style="max-width:240px; font-size:12px;">
          <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${esc(rf.outcomes)}">
            <strong>ผล:</strong> ${esc(rf.outcomes) || '-'}
          </div>
          <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:#64748b; margin-top:2px;" title="${esc(rf.problems)}">
            <strong>ปัญหา:</strong> ${esc(rf.problems) || '-'}
          </div>
        </td>
        <td style="text-align:center;">
          ${lockBadge}
        </td>
        <td style="text-align:center; white-space:nowrap;">
          <button class="btn btn-secondary" onclick="printReflectionSheet('${esc(rf.reflection_id)}')" style="padding:4px 8px; font-size:11.5px;" title="พิมพ์บันทึกหลังสอน">
            ${svg('printer', 12)} พิมพ์ A4
          </button>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="table-container">
      <table class="report-table">
        <thead>
          <tr>
            <th style="width:40px; text-align:center;">ที่</th>
            <th>วันที่สอน</th>
            <th>รายวิชา / ผู้สอน</th>
            <th>สถิตินักเรียน / ร้อยละ</th>
            <th>ผลการสอน & ปัญหา</th>
            <th style="text-align:center;">สถานะ</th>
            <th style="text-align:center;">การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

// --------------------------------------------------------------------------
// CSV Export Functions (UTF-8 BOM สำหรับ Microsoft Excel)
// --------------------------------------------------------------------------

function csvEscape(val) {
  if (val === null || val === undefined) return '""';
  let s = String(val).replace(/"/g, '""');
  // ป้องกัน Formula Injection ในโปรแกรม Spreadsheet
  if (/^[\s]*[=+@\-\t\r]/.test(s)) {
    s = "'" + s;
  }
  return `"${s}"`;
}

function downloadCSV(csvContent, fileName) {
  // ใส่ UTF-8 BOM (\uFEFF) เพื่อให้ Excel ภาษาไทยเปิดได้ถูกต้อง 100% ไม่เป็นภาษาต่างดาว
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function exportCurrentCSV() {
  if (state.reportSubView === 'reflections') {
    exportReflectionsCSV();
  } else {
    exportPlansCSV();
  }
}

/**
 * ส่งออก CSV ทะเบียนการส่งแผนการสอน
 */
function exportPlansCSV() {
  if (!state.reportsData || !state.reportsData.plans) {
    Swal.fire({ icon: 'warning', title: 'ไม่มีข้อมูล', text: 'ไม่พบข้อมูลแผนการสอนสำหรับส่งออก' });
    return;
  }

  const plans = state.reportsData.plans;
  const headers = [
    'รหัสแผน', 'ภาคเรียน', 'รอบการส่ง', 'กลุ่มสาระการเรียนรู้', 'รหัสวิชา', 'ชื่อวิชา',
    'ระดับชั้น', 'ครูผู้สอน', 'ชื่อหน่วย/แผน', 'ชั่วโมงสอน', 'ฉบับที่', 'สถานะ',
    'กำหนดส่ง', 'วันที่ส่ง', 'ผู้ตรวจ (หัวหน้ากลุ่มฯ)', 'ค้างส่งเกินกำหนด',
    'จำนวนบันทึกหลังสอน', 'ความเห็นล่าสุด'
  ];

  let csvRows = [];
  csvRows.push(headers.map(csvEscape).join(','));

  plans.forEach(p => {
    csvRows.push([
      p.plan_id,
      p.term_name,
      p.round_title,
      p.group_name,
      p.subject_code,
      p.subject_name,
      p.classroom,
      p.teacher_name,
      p.unit_title,
      p.teaching_hours,
      p.version,
      p.status_label,
      p.round_end_date,
      p.submitted_at,
      p.reviewer_name,
      p.is_overdue ? 'ใช่' : 'ไม่ใช่',
      p.reflection_count,
      p.latest_review_note
    ].map(csvEscape).join(','));
  });

  const todayStr = new Date().toISOString().slice(0, 10);
  downloadCSV(csvRows.join('\r\n'), `teaching-plans-${todayStr}.csv`);
}

/**
 * ส่งออก CSV สรุปบันทึกหลังการจัดการเรียนรู้
 */
function exportReflectionsCSV() {
  if (!state.reportsData || !state.reportsData.reflections) {
    Swal.fire({ icon: 'warning', title: 'ไม่มีข้อมูล', text: 'ไม่พบข้อมูลบันทึกหลังสอนสำหรับส่งออก' });
    return;
  }

  const reflections = state.reportsData.reflections;
  const headers = [
    'รหัสบันทึก', 'รหัสแผน', 'รอบการส่ง', 'กลุ่มสาระการเรียนรู้', 'รหัสวิชา', 'ชื่อวิชา',
    'ระดับชั้น', 'ครูผู้สอน', 'ชื่อหน่วย/แผน', 'วันที่สอน', 'นักเรียนทั้งหมด', 'มาเรียน',
    'บรรลุเป้าหมาย', 'คิดเป็นร้อยละ', 'ผลการจัดกิจกรรม', 'ปัญหา/อุปสรรค',
    'แนวทางแก้ไข/พัฒนา', 'สถานะบันทึก', 'วันที่บันทึก'
  ];

  let csvRows = [];
  csvRows.push(headers.map(csvEscape).join(','));

  reflections.forEach(rf => {
    csvRows.push([
      rf.reflection_id,
      rf.plan_id,
      rf.round_title,
      rf.group_name,
      rf.subject_code,
      rf.subject_name,
      rf.classroom,
      rf.teacher_name,
      rf.unit_title,
      rf.taught_date,
      rf.total_students,
      rf.present_students,
      rf.achieved_students,
      `${rf.achievement_percentage}%`,
      rf.outcomes,
      rf.problems,
      rf.solutions,
      rf.is_locked ? 'เสร็จสมบูรณ์' : 'ยังแก้ไขได้',
      rf.created_at
    ].map(csvEscape).join(','));
  });

  const todayStr = new Date().toISOString().slice(0, 10);
  downloadCSV(csvRows.join('\r\n'), `teaching-reflections-${todayStr}.csv`);
}

// --------------------------------------------------------------------------
// Official A4 Print Layouts (แบบฟอร์มเอกสารทางการ โรงเรียนบ้านห้วยตาด)
// --------------------------------------------------------------------------

function formatThaiFullDate(val) {
  const d = val && val !== '-' ? new Date(val) : new Date();
  if (isNaN(d.getTime())) return formatDate(new Date().toISOString());
  return `${d.getDate()} ${THAI_MONTHS_FULL[d.getMonth()]} ${d.getFullYear() + 543}`;
}

function buildMemoHeaderHtml(subjectText, dateText) {
  const garudaUrl = new URL('../img/garuda.png', document.baseURI).href;
  return `
    <div style="display:flex; align-items:flex-end; gap:12px; min-height:1.5cm; margin-bottom:4px;">
      <div style="flex:none;">
        <img class="print-garuda-img" src="${garudaUrl}" alt="ตราครุฑ" width="52" height="57" style="height:1.5cm; width:auto; display:block;">
      </div>
      <div style="flex:1; text-align:center; padding-right:52px;">
        <div style="font-size:29pt; font-weight:bold; line-height:1;">บันทึกข้อความ</div>
      </div>
    </div>

    <div style="font-size:16pt; font-weight:normal; padding-bottom:6px; margin-bottom:8px;">
      <div style="display:flex; align-items:baseline;">
        <strong style="flex:none;">ส่วนราชการ</strong>
        <span style="flex:1; border-bottom:1px dotted #000; padding-left:8px; line-height:1.15;">โรงเรียนบ้านห้วยตาด สำนักงานเขตพื้นที่การศึกษาประถมศึกษาเลย เขต 1</span>
      </div>
      <div style="display:flex; align-items:baseline; gap:6px; margin-top:3px;">
        <div style="flex:1; display:flex; align-items:baseline;">
          <strong style="flex:none;">ที่</strong>
          <span style="flex:1; border-bottom:1px dotted #000; padding-left:8px; line-height:1.15;">ศธ 04136.0411/</span>
        </div>
        <div style="flex:1; display:flex; align-items:baseline;">
          <strong style="flex:none;">วันที่</strong>
          <span style="flex:1; border-bottom:1px dotted #000; padding-left:8px; line-height:1.15;">${esc(dateText)}</span>
        </div>
      </div>
      <div style="display:flex; align-items:baseline; margin-top:3px;">
        <strong style="flex:none;">เรื่อง</strong>
        <span style="flex:1; border-bottom:1px dotted #000; padding-left:8px; line-height:1.15;">${esc(subjectText)}</span>
      </div>
    </div>

    <div style="font-size:16pt; font-weight:normal; margin-bottom:10px;">
      <strong>เรียน</strong>&nbsp;&nbsp;ผู้อำนวยการโรงเรียนบ้านห้วยตาด
    </div>
  `;
}

function triggerMemoPrint(printArea) {
  const imgs = Array.from(printArea.querySelectorAll('.print-garuda-img, .print-doc-logo'));
  const waitImgs = Promise.all(imgs.map(img => (
    img.complete && img.naturalWidth
      ? Promise.resolve()
      : new Promise(res => { img.onload = res; img.onerror = res; })
  )));
  const waitFonts = (document.fonts && document.fonts.load)
    ? Promise.all([
        document.fonts.load("16pt 'TH Sarabun New'", 'ก'),
        document.fonts.load("bold 16pt 'TH Sarabun New'", 'ก')
      ]).then(() => document.fonts.ready)
    : Promise.resolve();
  const timeout = new Promise(res => setTimeout(res, 4000));
  Promise.race([Promise.all([waitImgs, waitFonts]), timeout])
    .catch(() => {})
    .then(() => requestAnimationFrame(() => window.print()));
}

/**
 * พิมพ์สรุปรายงานผลการติดตามการจัดทำและส่งแผนการจัดการเรียนรู้ (A4 - บันทึกข้อความ)
 */
function printSummaryReport() {
  if (!state.reportsData) return;
  const d = state.reportsData;
  const s = d.summary || {};
  const plans = d.plans || [];
  const isPersonal = !state.isAcademic || (d.scope ? d.scope === 'mine' : state.reportScope === 'mine');

  const termObj = (d.terms || []).find(t => String(t.termId) === String(state.reportFilterTerm)) || {};
  const termTitle = termObj.termName ? `ภาคเรียนที่ ${termObj.termName}` : 'ประจำภาคเรียน';
  const todayThaiFull = formatThaiFullDate(new Date().toISOString());
  const reporterName = state.teacher && state.teacher.fullName ? state.teacher.fullName : '';
  const directorName = d.directorName || state.directorName || '';

  // สำหรับเอกสารส่วนตัวของครู แสดงตามรายการในทะเบียนส่งแผน (ตรงกับตารางบนหน้าจอ)
  const personalRecords = isPersonal
    ? plans.map(p => ({
        subject_code: p.subject_code,
        subject_name: p.subject_name,
        classroom: p.classroom,
        unit_title: p.unit_title,
        status_label: p.status_label,
        submitted_at: p.submitted_at && p.submitted_at !== '-' ? formatDate(p.submitted_at) : '-',
        note: p.is_overdue ? 'เกินกำหนด' : 'ปกติ'
      }))
    : [];

  const rows = isPersonal
    ? (personalRecords.length
        ? personalRecords.map((r, idx) => `
          <tr>
            <td style="text-align:center;">${idx + 1}</td>
            <td style="text-align:center;">${esc(r.subject_code)}</td>
            <td>${esc(r.subject_name)}</td>
            <td style="text-align:center;">${esc(r.classroom)}</td>
            <td>${esc(r.unit_title)}</td>
            <td style="text-align:center;">${esc(r.status_label)}</td>
            <td style="text-align:center;">${esc(r.submitted_at)}</td>
            <td style="text-align:center;">${esc(r.note)}</td>
          </tr>
        `).join('')
        : '<tr><td colspan="8" style="text-align:center;">ยังไม่มีรายการส่งแผนการจัดการเรียนรู้</td></tr>')
    : (plans.length
        ? plans.map((p, idx) => `
          <tr>
            <td style="text-align:center;">${idx + 1}</td>
            <td style="text-align:center;">${esc(p.subject_code)}</td>
            <td>${esc(p.subject_name)}</td>
            <td style="text-align:center;">${esc(p.classroom)}</td>
            <td>${esc(p.teacher_name)}</td>
            <td>${esc(p.unit_title)}</td>
            <td style="text-align:center;">${esc(p.status_label)}</td>
            <td style="text-align:center;">${p.submitted_at && p.submitted_at !== '-' ? formatDate(p.submitted_at) : '-'}</td>
            <td style="text-align:center;">${p.is_overdue ? 'เกินกำหนด' : 'ปกติ'}</td>
          </tr>
        `).join('')
        : '<tr><td colspan="9" style="text-align:center;">ไม่มีข้อมูลแผนการจัดการเรียนรู้</td></tr>');

  const memoSubject = isPersonal
    ? `รายงานผลการส่งแผนการจัดการเรียนรู้รายบุคคล ${termTitle}`
    : `รายงานผลการติดตามการจัดทำและส่งแผนการจัดการเรียนรู้ ${termTitle}`;

  const introParagraph = isPersonal
    ? `ด้วยข้าพเจ้า ${esc(reporterName || 'ครูผู้สอน')} ตำแหน่ง ครูผู้สอน โรงเรียนบ้านห้วยตาด ได้ดำเนินการจัดทำและส่งแผนการจัดการเรียนรู้ในรายวิชาที่รับผิดชอบ ${esc(termTitle)} มีภาระสอนทั้งหมด ${s.totalLoads || 0} รายวิชา/ห้องเรียน ส่งแผนแล้ว ${personalRecords.length} รายการ และได้รับการรับรองแล้ว ${s.approved || 0} รายการ รายละเอียดดังตารางต่อไปนี้`
    : `ด้วยงานวิชาการ โรงเรียนบ้านห้วยตาด ได้สรุปผลการติดตามการจัดทำและส่งแผนการจัดการเรียนรู้ ${esc(termTitle)} มีภาระสอนทั้งหมด ${s.totalLoads || 0} รายการ ส่งแผนแล้ว ${s.submittedPlans || 0} รายการ (${s.submissionRate || 0}%) อนุมัติแล้ว ${s.approved || 0} รายการ (${s.approvedRate || 0}%) และค้างส่งเกินกำหนด ${s.overdue || 0} รายการ รายละเอียดดังตารางต่อไปนี้`;

  const reporterRoleTitle = isPersonal ? 'ตำแหน่ง ครูผู้สอน' : 'หัวหน้างานวิชาการ / ผู้รายงาน';

  const printHtml = `
    <article class="print-document" style="font-family:'TH Sarabun New','THSarabunNew','TH SarabunPSK','Sarabun',sans-serif; color:#000; font-size:16pt; font-weight:normal; line-height:1.2;">
      ${buildMemoHeaderHtml(memoSubject, todayThaiFull)}

      <div style="font-size:16pt; font-weight:normal; text-align:left;">
        <p style="text-indent:2.5cm; margin:0 0 8px 0;">
          ${introParagraph}
        </p>
      </div>

      <table class="print-table" style="font-size:13.5pt; line-height:1.15; margin:6px 0 10px 0;">
        <thead>
          <tr>
            <th style="width:28px;">ที่</th>
            <th style="width:62px;">รหัสวิชา</th>
            <th>ชื่อรายวิชา</th>
            <th style="width:45px;">ชั้น</th>
            ${isPersonal ? '' : '<th style="width:110px;">ครูผู้สอน</th>'}
            <th>หน่วย / แผนการสอน</th>
            <th style="width:82px;">สถานะ</th>
            <th style="width:72px;">วันที่ส่ง</th>
            <th style="width:65px;">หมายเหตุ</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <div style="font-size:16pt; font-weight:normal; text-align:left;">
        <p style="text-indent:2.5cm; margin:0 0 12px 0;">
          จึงเรียนมาเพื่อโปรดทราบและพิจารณา
        </p>
      </div>

      <div class="print-signature-section" style="margin-top:20px; font-size:16pt; font-weight:normal; line-height:1.25;">
        <div class="print-signature-box" style="font-size:16pt; line-height:1.25;">
          <div>ลงชื่อ ............................................... ผู้รายงาน</div>
          <div>(${esc(reporterName) || '...............................................'})</div>
          <div>${reporterRoleTitle}</div>
        </div>
        <div class="print-signature-box" style="font-size:16pt; line-height:1.25;">
          <div>ลงชื่อ ............................................... ผู้รับรอง</div>
          <div>(${esc(directorName) || '...............................................'})</div>
          <div>ผู้อำนวยการโรงเรียนบ้านห้วยตาด</div>
        </div>
      </div>
    </article>
  `;

  const printArea = document.getElementById('printable-area');
  printArea.innerHTML = printHtml;
  triggerMemoPrint(printArea);
}

/**
 * พิมพ์ทะเบียนแผนการจัดการเรียนรู้ฉบับรายบุคคล (A4)
 */
function printPlanSheet(planId) {
  let plan = null;
  if (state.reportsData && state.reportsData.plans) {
    plan = state.reportsData.plans.find(p => String(p.plan_id) === String(planId));
  }
  if (!plan && state.loads) {
    for (const l of state.loads) {
      const p = (l.plans || []).find(x => String(x.plan_id) === String(planId));
      if (p) {
        plan = {
          plan_id: p.plan_id,
          subject_code: l.subject_code,
          subject_name: l.subject_name,
          classroom: l.classroom,
          teacher_name: state.teacher.fullName,
          group_name: l.group_name || '',
          unit_title: p.unit_title,
          teaching_hours: p.teaching_hours,
          version: p.current_version,
          status_label: p.status,
          round_title: p.round_title,
          submitted_at: p.submitted_at || '-',
          reviewer_name: l.reviewer_name || 'หัวหน้ากลุ่มสาระฯ'
        };
        break;
      }
    }
  }

  if (!plan) {
    Swal.fire({ icon: 'warning', title: 'ไม่พบข้อมูลแผน', text: 'ไม่สามารถค้นหารายละเอียดแผนการสอนได้' });
    return;
  }

  if (plan.status !== 'Approved') {
    Swal.fire({ icon: 'info', title: 'ยังไม่สามารถพิมพ์ได้', text: 'ต้องได้รับการรับรองจากผู้อำนวยการก่อนจึงจะพิมพ์บันทึกข้อความได้' });
    return;
  }

  const submittedThaiFull = formatThaiFullDate(plan.submitted_at);
  const isApproved = plan.status === 'Approved';
  const isHeadChecked = plan.status === 'Pending_Academic' || isApproved;
  const directorName = plan.director_name || (state.reportsData && state.reportsData.directorName) || state.directorName || '';
  const reviewNoteText = esc(plan.latest_review_note) || (isHeadChecked ? 'แผนการจัดการเรียนรู้ครบถ้วนตามองค์ประกอบ' : '.............................................................');
  const chkBox = (on) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:12px;height:12px;border:1px solid #000;vertical-align:middle;margin-right:4px;font-size:10px;font-weight:bold;line-height:1;">${on ? '✓' : '&nbsp;'}</span>`;

  const printHtml = `
    <article class="print-document" style="font-family:'TH Sarabun New','THSarabunNew','TH SarabunPSK','Sarabun',sans-serif; color:#000; font-size:16pt; font-weight:normal; line-height:1.2;">
      ${buildMemoHeaderHtml(`ขออนุญาตส่งแผนการจัดการเรียนรู้ ภาคเรียนที่ ${plan.term_name || '-'}`, submittedThaiFull)}

      <!-- เนื้อหาบันทึกข้อความ (ฟอนต์ TH Sarabun New 16pt ตัวปกติ ย่อหน้า 2.5 ซม.) -->
      <div style="font-size:16pt; font-weight:normal; text-align:left;">
        <p style="text-indent:2.5cm; margin:0 0 6px 0;">
          ด้วยข้าพเจ้า ${esc(plan.teacher_name)} ตำแหน่ง ครูผู้สอน กลุ่มสาระการเรียนรู้${esc(plan.group_name || '-')}
          ได้จัดทำแผนการจัดการเรียนรู้ รายวิชา ${esc(plan.subject_code)} ${esc(plan.subject_name)}
          ระดับชั้น ${esc(plan.classroom)} เรื่อง ${esc(plan.unit_title)}
          จำนวน ${plan.teaching_hours || 0} ชั่วโมง (ฉบับที่ ${plan.version || 1} รอบการส่ง ${esc(plan.round_title)}) เสร็จสิ้นเรียบร้อยแล้ว
        </p>
        <p style="text-indent:2.5cm; margin:0 0 14px 0;">
          จึงเรียนมาเพื่อโปรดพิจารณาอนุญาตให้นำแผนการจัดการเรียนรู้ดังกล่าวไปใช้ในการจัดกิจกรรมการเรียนรู้ต่อไป
        </p>
      </div>

      <!-- ลงชื่อผู้เสนอ (ครูผู้สอน) เริ่มกึ่งกลางหน้ากระดาษตรงกับ วันที่ -->
      <div style="display:flex; justify-content:flex-end; margin:24px 0 22px 0; font-size:16pt; font-weight:normal;">
        <div style="width:50%; text-align:center; line-height:1.25;">
          <div>ลงชื่อ ...................................................</div>
          <div>(${esc(plan.teacher_name)})</div>
          <div>ตำแหน่ง ครูผู้สอน</div>
        </div>
      </div>

      <!-- ส่วนความเห็นและคำสั่ง (2 ระดับ - ฟอนต์ 16pt ตัวปกติ) -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; padding-top:10px; font-size:16pt; font-weight:normal; line-height:1.2; page-break-inside:avoid;">
        <div style="display:flex; flex-direction:column; justify-content:space-between; border:1px solid #64748b; border-radius:4px; padding:6px 10px;">
          <div>
            <div style="font-weight:bold; margin-bottom:2px;">ความเห็นหัวหน้ากลุ่มสาระฯ / ฝ่ายวิชาการ</div>
            <div>${chkBox(isHeadChecked)} เห็นควรอนุญาตให้ใช้จัดการเรียนรู้</div>
            <div style="margin:2px 0 6px 0;">
              <strong>ความเห็น:</strong> ${reviewNoteText}
            </div>
          </div>
          <div style="text-align:center; margin-top:4px;">
            <div>ลงชื่อ ...............................................</div>
            <div>(${esc(plan.reviewer_name)})</div>
            <div>ผู้ตรวจประจำวิชา / ฝ่ายวิชาการ</div>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; justify-content:space-between; border:1px solid #64748b; border-radius:4px; padding:6px 10px;">
          <div>
            <div style="font-weight:bold; margin-bottom:2px;">คำสั่ง / การพิจารณาของผู้อำนวยการ</div>
            <div>${chkBox(isApproved)} อนุญาต / อนุมัติให้ใช้จัดการเรียนรู้</div>
            <div style="margin:2px 0 6px 0;">${chkBox(plan.status === 'Revise')} ปรับปรุงแก้ไข</div>
          </div>
          <div style="text-align:center; margin-top:4px;">
            <div>ลงชื่อ ...............................................</div>
            <div>(${esc(directorName) || '...............................................'})</div>
            <div>ผู้อำนวยการโรงเรียนบ้านห้วยตาด</div>
          </div>
        </div>
      </div>
    </article>
  `;

  const printArea = document.getElementById('printable-area');
  printArea.innerHTML = printHtml;
  triggerMemoPrint(printArea);
}

/**
 * สร้าง HTML แบบบันทึกหลังการจัดการเรียนรู้ (A4 มาตรฐานโรงเรียนบ้านห้วยตาด K-P-A)
 */
function renderReflectionPrintHtml(rf) {
  const logoUrl = new URL('../img/logo-ht.png', document.baseURI).href;
  const kpa = parseReflectionOutcomes(rf.outcomes);
  const directorName = (state.reportsData && state.reportsData.directorName) || state.directorName || '';
  const lineBlock = (text, minLines = 2) => {
    const val = esc(text || '');
    const lh = 25;
    const ruleRows = Array.from({ length: 24 }, () =>
      `<div style="height:${lh}px; box-sizing:border-box; border-bottom:1px dotted #000;"></div>`
    ).join('');
    return `
      <div style="position:relative; min-height:${minLines * lh}px;">
        <div style="position:absolute; inset:0; overflow:hidden; pointer-events:none;">${ruleRows}</div>
        <div style="position:relative; z-index:1; padding:0 6px; line-height:${lh}px; white-space:pre-wrap; overflow-wrap:anywhere; word-break:break-word;">${val || '&nbsp;'}</div>
      </div>
    `;
  };

  const rawUnit = String(rf.unit_title || '').trim();
  const rawLesson = String(rf.lesson_title || '').trim();
  const um = rawUnit.match(/^หน่วย(?:การเรียนรู้)?ที่\s*(\d+)[\s:：\-]*(.*)$/);
  const lm = rawLesson.match(/^แผน(?:การจัดการเรียนรู้)?ที่\s*(\d+)[\s:：\-]*(.*)$/);
  const unitNoTxt = um ? um[1] : '';
  const unitNameTxt = um ? ((um[2] || '').replace(/^หน่วย(?:การเรียนรู้)?ที่\s*\d+[\s:：\-]*/, '').trim() || '-') : (rawUnit || '-');
  const lessonNoTxt = lm ? lm[1] : '';
  const lessonNameTxt = lm ? ((lm[2] || '').replace(/^แผน(?:การจัดการเรียนรู้)?ที่\s*\d+[\s:：\-]*/, '').trim() || '-') : (rawLesson || '-');

  return `
    <article class="print-document" style="font-family:'TH Sarabun New','THSarabunNew','TH SarabunPSK','Sarabun',sans-serif; color:#000; font-size:16pt; font-weight:normal; line-height:1.25;">
      <div style="text-align:center; margin-bottom:4px;">
        <img class="print-doc-logo" src="${logoUrl}" alt="ตราโรงเรียนบ้านห้วยตาด" style="height:1.6cm; width:auto; display:inline-block; margin-bottom:2px;" onerror="this.style.display='none'">
        <div style="font-size:18pt; font-weight:bold; line-height:1.15;">
          บันทึกหลังการจัดการเรียนรู้ &nbsp;รายวิชา ${esc(rf.subject_code)} ${esc(rf.subject_name)}
        </div>
      </div>

      <div style="font-size:16pt; margin-bottom:8px;">
        <div style="display:flex; align-items:baseline; gap:10px;">
          ${lm ? `
            <div style="flex:none; display:flex; align-items:baseline;">
              <span style="flex:none;">แผนจัดการเรียนรู้ที่</span>
              <span style="min-width:34px; border-bottom:1px dotted #000; text-align:center; line-height:1.15;">${esc(lessonNoTxt)}</span>
            </div>
            <div style="flex:1; display:flex; align-items:baseline;">
              <span style="flex:none;">เรื่อง</span>
              <span style="flex:1; border-bottom:1px dotted #000; padding-left:6px; line-height:1.15;">${esc(lessonNameTxt)}</span>
            </div>
          ` : `
            <div style="flex:1; display:flex; align-items:baseline;">
              <span style="flex:none;">แผนจัดการเรียนรู้ที่ / เรื่อง</span>
              <span style="flex:1; border-bottom:1px dotted #000; padding-left:6px; line-height:1.15;">${esc(lessonNameTxt)}</span>
            </div>
          `}
          <div style="flex:none;">วันที่สอน ${formatDate(rf.taught_date)}</div>
        </div>
        <div style="display:flex; align-items:baseline; gap:10px; margin-top:2px;">
          ${um ? `
            <div style="flex:none; display:flex; align-items:baseline;">
              <span style="flex:none;">หน่วยการเรียนรู้ที่</span>
              <span style="min-width:34px; border-bottom:1px dotted #000; text-align:center; line-height:1.15;">${esc(unitNoTxt)}</span>
            </div>
            <div style="flex:1; display:flex; align-items:baseline;">
              <span style="flex:none;">เรื่อง</span>
              <span style="flex:1; border-bottom:1px dotted #000; padding-left:6px; line-height:1.15;">${esc(unitNameTxt)}</span>
            </div>
          ` : `
            <div style="flex:1; display:flex; align-items:baseline;">
              <span style="flex:none;">หน่วยการเรียนรู้ที่ / เรื่อง</span>
              <span style="flex:1; border-bottom:1px dotted #000; padding-left:6px; line-height:1.15;">${esc(unitNameTxt)}</span>
            </div>
          `}
        </div>
        <div style="display:flex; align-items:baseline; gap:16px; margin-top:2px;">
          <div style="flex:1; display:flex; align-items:baseline;">
            <span style="flex:none;">กลุ่มสาระการเรียนรู้</span>
            <span style="flex:1; border-bottom:1px dotted #000; padding-left:6px; line-height:1.15;">${esc(rf.group_name || '-')}</span>
          </div>
          <div style="flex:none; min-width:130px; display:flex; align-items:baseline;">
            <span style="flex:none;">ชั้น</span>
            <span style="flex:1; border-bottom:1px dotted #000; padding-left:6px; text-align:center; line-height:1.15;">${esc(rf.classroom || '-')}</span>
          </div>
        </div>
      </div>

      <div style="margin-bottom:8px;">
        <div style="font-weight:bold;">1. ผลที่เกิดกับผู้เรียน
          <span style="font-weight:normal; font-size:14.5pt;">(นักเรียนทั้งหมด ${rf.total_students || 0} คน · มาเรียน ${rf.present_students || 0} คน · บรรลุเป้าหมาย ${rf.achieved_students || 0} คน คิดเป็นร้อยละ ${rf.achievement_percentage || 0}%)</span>
        </div>
        <div style="padding-left:18px; margin-top:2px;">
          <div>1.1 ด้านความรู้ K (Knowledge)</div>
          ${lineBlock(kpa.k, 2)}
        </div>
        <div style="padding-left:18px; margin-top:4px;">
          <div>1.2 ด้านทักษะ/กระบวนการ/กระบวนการคิด P (Practice)</div>
          ${lineBlock(kpa.p, 2)}
        </div>
        <div style="padding-left:18px; margin-top:4px;">
          <div>1.3 ด้านเจตคติ/คุณลักษณะอันพึงประสงค์ A (Attribute)</div>
          ${lineBlock(kpa.a, 2)}
        </div>
      </div>

      <div style="margin-bottom:8px;">
        <div style="font-weight:bold;">2. ปัญหา/อุปสรรคที่พบจากการจัดการเรียนรู้</div>
        ${lineBlock(rf.problems || 'ไม่มี', 2)}
      </div>

      <div style="margin-bottom:12px;">
        <div style="font-weight:bold;">3. ข้อเสนอแนะ / แนวทางแก้ไข</div>
        ${lineBlock(rf.solutions || '-', 2)}
      </div>

      <div style="display:flex; justify-content:flex-end; margin:28px 0 12px 0; font-size:16pt; break-inside:avoid; page-break-inside:avoid;">
        <div style="width:52%; text-align:center; line-height:1.25;">
          <div>ลงชื่อ ............................................. ครูผู้สอน</div>
          <div>(${esc(rf.teacher_name)})</div>
          <div>ตำแหน่ง ครูผู้สอน</div>
        </div>
      </div>

      <div style="break-inside:avoid; page-break-inside:avoid;">
        <div style="margin-bottom:10px;">
          <div style="font-weight:bold;">บันทึกติดตามผลของผู้อำนวยการโรงเรียน</div>
          <div style="border-bottom:1px dotted #000; height:24px;">&nbsp;</div>
          <div style="border-bottom:1px dotted #000; height:24px;">&nbsp;</div>
        </div>

        <div style="display:flex; justify-content:flex-end; margin-top:28px; font-size:16pt;">
          <div style="width:52%; text-align:center; line-height:1.25;">
            <div>ลงชื่อ ............................................. ผู้บริหาร</div>
            <div>(${esc(directorName) || '.............................................'})</div>
            <div>ตำแหน่ง ผู้อำนวยการโรงเรียนบ้านห้วยตาด</div>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * พิมพ์แบบบันทึกหลังการจัดกิจกรรมการเรียนรู้ (A4) พร้อมช่องลงนามทางการ
 */
function printReflectionSheet(reflectionId) {
  let rf = null;
  if (state.reportsData && state.reportsData.reflections) {
    rf = state.reportsData.reflections.find(x => String(x.reflection_id) === String(reflectionId));
  }

  if (!rf) {
    Swal.fire({ icon: 'warning', title: 'ไม่พบข้อมูลบันทึก', text: 'ไม่สามารถค้นหารายละเอียดบันทึกหลังสอนได้' });
    return;
  }

  const printArea = document.getElementById('printable-area');
  printArea.innerHTML = renderReflectionPrintHtml(rf);
  triggerMemoPrint(printArea);
}

function buildReflectionPrintPayload(ref, planId, unitTitle) {
  let load = null;
  if (state.loads) {
    for (const l of state.loads) {
      if ((l.plans || []).some(p => String(p.plan_id) === String(planId))) {
        load = l;
        break;
      }
    }
  }
  return {
    reflection_id: ref.reflection_id,
    group_name: load ? load.group_name : '',
    subject_code: load ? load.subject_code : '',
    subject_name: load ? load.subject_name : '',
    classroom: load ? load.classroom : '',
    unit_title: unitTitle,
    lesson_title: ref.lesson_title || '',
    teacher_name: state.teacher ? state.teacher.fullName : 'ครูผู้สอน',
    taught_date: ref.teach_date,
    total_students: ref.total_students,
    present_students: ref.present_students,
    achieved_students: ref.passed_students,
    achievement_percentage: ref.passed_pct,
    outcomes: ref.outcomes,
    problems: ref.problems,
    solutions: ref.solutions
  };
}

/**
 * พิมพ์แบบบันทึกหลังสอนโดยตรงจากหน้าต่างรายการ (Modal)
 */
function printReflectionDirect(ref, planId, unitTitle) {
  const rf = buildReflectionPrintPayload(ref, planId, unitTitle);
  const printArea = document.getElementById('printable-area');
  printArea.innerHTML = renderReflectionPrintHtml(rf);
  triggerMemoPrint(printArea);
}

/**
 * พิมพ์แบบบันทึกหลังสอนทั้งหมดในหน่วยการเรียนรู้ (เรียงจากแผนแรกไปล่าสุด แยกหน้าละ 1 แผน A4)
 */
function printAllPlanReflections() {
  const modalData = state.currentModalReflections;
  if (!modalData || !Array.isArray(modalData.list) || modalData.list.length === 0) {
    Swal.fire({ icon: 'warning', title: 'ไม่พบข้อมูล', text: 'ไม่มีรายการบันทึกหลังสอนสำหรับพิมพ์' });
    return;
  }

  const ordered = modalData.list.slice().sort((a, b) => {
    const da = String(a.teach_date || '');
    const db = String(b.teach_date || '');
    if (da !== db) return da.localeCompare(db);
    return String(a.lesson_title || '').localeCompare(String(b.lesson_title || ''), 'th');
  });

  const combinedHtml = ordered.map((ref, idx) => {
    const rf = buildReflectionPrintPayload(ref, modalData.planId, modalData.unitTitle);
    const pageHtml = renderReflectionPrintHtml(rf);
    return idx < ordered.length - 1
      ? `<div style="break-after:page; page-break-after:always;">${pageHtml}</div>`
      : pageHtml;
  }).join('');

  const printArea = document.getElementById('printable-area');
  printArea.innerHTML = combinedHtml;
  triggerMemoPrint(printArea);
}
