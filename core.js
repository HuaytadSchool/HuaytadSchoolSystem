// ===========================================================================
// core.js — config, globals, constants, utils, API proxy
// ===========================================================================

const LIFF_ID = "2010662195-iJjI0NIA";
const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwd_swD_1GMPXstBSmasbxtwIK1YZlsQPCBz16PHv6oCX-9KhuY7m0nSImO1XCnOKNKVA/exec";
const SCHOOL_LOGO_URL = 'img/logo-ht.png';
const USER_BG_URL = 'img/BG_User.png';

// ---- Global state ----
let currentUser = null;
let currentLineProfile = null;
let leaveTypes = [];
let _holidays = [];
let calendarState = { year: new Date().getFullYear(), month: new Date().getMonth() };
let hrFilters = { dateFrom: '', dateTo: '', dept: 'all', type: 'all' };
let hrSort = { field: 'start_date', dir: 'desc' };

// ---- Constants ----
const THAI_MONTHS = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const THAI_MONTHS_FULL = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
const WEEKDAYS = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
const AVATAR_COLORS = ['#2563eb', '#0891b2', '#7c3aed', '#db2777', '#059669', '#d97706', '#4f46e5', '#0d9488'];
const PREFIXES = ['นาย', 'นาง', 'นางสาว', 'ว่าที่ร้อยตรี', 'ว่าที่ร้อยตรีหญิง', 'ดร.'];
const MALE_PREFIXES = ['นาย', 'ว่าที่ร้อยตรี'];
const FEMALE_PREFIXES = ['นาง', 'นางสาว', 'ว่าที่ร้อยตรีหญิง'];
const isMalePrefix = (p) => MALE_PREFIXES.includes(p);
const isFemalePrefix = (p) => FEMALE_PREFIXES.includes(p);

// ---- Personnel Positions & Academic Standings ----
const POSITIONS = ['ครู', 'ครูผู้ช่วย', 'ครูอัตราจ้าง', 'เจ้าหน้าที่ธุรการ', 'พี่เลี้ยงเด็กพิการ', 'พนักงานบริการ', 'อื่นๆ'];
const ACADEMIC_STANDINGS = [
  { id: 'none', label: 'ไม่มีวิทยฐานะ (ครู คศ.1)', text: '' },
  { id: 'c2', label: 'ครูชำนาญการ (คศ.2)', text: 'ชำนาญการ' },
  { id: 'c3', label: 'ครูชำนาญการพิเศษ (คศ.3)', text: 'ชำนาญการพิเศษ' },
  { id: 'c4', label: 'ครูเชี่ยวชาญ (คศ.4)', text: 'เชี่ยวชาญ' },
  { id: 'c5', label: 'ครูเชี่ยวชาญพิเศษ (คศ.5)', text: 'เชี่ยวชาญพิเศษ' }
];

function parsePosition(posStr) {
  const s = String(posStr || '').trim();
  if (!s) return { position: 'ครู', standing: 'none', other: '' };
  if (s.includes('ชำนาญการพิเศษ') || s.includes('คศ.3')) return { position: 'ครู', standing: 'c3', other: '' };
  if (s.includes('เชี่ยวชาญพิเศษ') || s.includes('คศ.5')) return { position: 'ครู', standing: 'c5', other: '' };
  if (s.includes('เชี่ยวชาญ') || s.includes('คศ.4')) return { position: 'ครู', standing: 'c4', other: '' };
  if (s.includes('ชำนาญการ') || s.includes('คศ.2')) return { position: 'ครู', standing: 'c2', other: '' };
  if (s.includes('ครูผู้ช่วย')) return { position: 'ครูผู้ช่วย', standing: 'none', other: '' };
  if (s.includes('ครูอัตราจ้าง')) return { position: 'ครูอัตราจ้าง', standing: 'none', other: '' };
  if (s.includes('ธุรการ')) return { position: 'เจ้าหน้าที่ธุรการ', standing: 'none', other: '' };
  if (s.includes('พี่เลี้ยง')) return { position: 'พี่เลี้ยงเด็กพิการ', standing: 'none', other: '' };
  if (s.includes('บริการ') || s.includes('ภารโรง')) return { position: 'พนักงานบริการ', standing: 'none', other: '' };
  if (s.startsWith('ครู') || s === 'ครู คศ.1') return { position: 'ครู', standing: 'none', other: '' };
  return { position: 'อื่นๆ', standing: 'none', other: s };
}

function positionSelectHtml(id, currentPosition) {
  const parsed = parsePosition(currentPosition);
  const posOpts = POSITIONS.map(p => `<option value="${p}" ${parsed.position === p ? 'selected' : ''}>${p}</option>`).join('');
  const standOpts = ACADEMIC_STANDINGS.map(st => `<option value="${st.id}" ${parsed.standing === st.id ? 'selected' : ''}>${st.label}</option>`).join('');
  const isTeacher = parsed.position === 'ครู';
  const isOther = parsed.position === 'อื่นๆ';

  return `
    <div style="display:flex;flex-direction:column;gap:8px">
      <select id="${id}-pos-main" class="dc-input" onchange="togglePositionStanding('${id}')">
        ${posOpts}
      </select>
      <div id="${id}-standing-wrap" style="display:${isTeacher ? 'block' : 'none'}">
        <div class="dc-label" style="margin-bottom:3px;font-size:11.5px;color:#64748b">วิทยฐานะ</div>
        <select id="${id}-pos-standing" class="dc-input">
          ${standOpts}
        </select>
      </div>
      <input id="${id}-pos-other" class="dc-input" placeholder="ระบุชื่อตำแหน่ง" style="display:${isOther ? 'block' : 'none'}" value="${isOther ? esc(parsed.other) : ''}"/>
    </div>
  `;
}
window.positionSelectHtml = positionSelectHtml;

function togglePositionStanding(id) {
  const main = (document.getElementById(id + '-pos-main') || {}).value;
  const standWrap = document.getElementById(id + '-standing-wrap');
  const otherInput = document.getElementById(id + '-pos-other');
  if (standWrap) standWrap.style.display = (main === 'ครู') ? 'block' : 'none';
  if (otherInput) otherInput.style.display = (main === 'อื่นๆ') ? 'block' : 'none';
}
window.togglePositionStanding = togglePositionStanding;

function getPositionValue(id) {
  const main = (document.getElementById(id + '-pos-main') || {}).value || 'ครู';
  if (main === 'ครู') {
    const stVal = (document.getElementById(id + '-pos-standing') || {}).value;
    const stObj = ACADEMIC_STANDINGS.find(x => x.id === stVal);
    if (stObj && stObj.text) {
      return `ครู วิทยฐานะครู${stObj.text}`;
    }
    return 'ครู';
  }
  if (main === 'อื่นๆ') {
    const o = document.getElementById(id + '-pos-other');
    return (o ? o.value : '').trim() || 'อื่นๆ';
  }
  return main;
}
window.getPositionValue = getPositionValue;

// ---- Department / Academic Group Constants ----
const DEPARTMENTS = [
  'ปฐมวัย',
  'ภาษาไทย',
  'คณิตศาสตร์',
  'วิทยาศาสตร์และเทคโนโลยี',
  'สังคมศึกษา ศาสนา และวัฒนธรรม',
  'สุขศึกษาและพลศึกษา',
  'ศิลปะ',
  'การงานอาชีพ',
  'ภาษาต่างประเทศ',
  'วิชาการ',
  'บริหารงานทั่วไป / ธุรการ',
  'กิจการนักเรียน',
  'บริหารงบประมาณ',
  'อื่นๆ'
];

function departmentSelectHtml(id, currentDept) {
  const isOther = currentDept && !DEPARTMENTS.includes(currentDept);
  const selectedDept = isOther ? 'อื่นๆ' : (currentDept || 'ปฐมวัย');
  const opts = DEPARTMENTS.map(d => {
    const sel = d === selectedDept ? 'selected' : '';
    return `<option value="${d}" ${sel}>${d}</option>`;
  }).join('');
  return `
    <div style="display:flex;flex-direction:column;gap:6px">
      <select id="${id}-dept-select" class="dc-input" onchange="toggleDepartmentOther('${id}')">
        ${opts}
      </select>
      <input id="${id}-dept-other" class="dc-input" placeholder="ระบุกลุ่มสาระ/ฝ่าย" style="display:${isOther ? 'block' : 'none'}" value="${isOther ? esc(currentDept) : ''}"/>
    </div>
  `;
}
window.departmentSelectHtml = departmentSelectHtml;
window.toggleDepartmentOther = (id) => {
  const s = document.getElementById(id + '-dept-select');
  const other = document.getElementById(id + '-dept-other');
  if (s && other) other.style.display = s.value === 'อื่นๆ' ? 'block' : 'none';
};
window.getDepartmentValue = (id) => {
  const s = document.getElementById(id + '-dept-select');
  if (!s) return '';
  if (s.value === 'อื่นๆ') {
    const other = document.getElementById(id + '-dept-other');
    return other ? other.value.trim() || 'อื่นๆ' : 'อื่นๆ';
  }
  return s.value;
};

// Clean and normalize phone number
function formatPhone(p) {
  if (p == null || p === '') return '';
  let s = String(p).trim().replace(/[^0-9]/g, '');
  if (s.length === 9 && !s.startsWith('0')) s = '0' + s;
  return s;
}
window.formatPhone = formatPhone;

function prefixSelectHtml(id, current) {
  const isOther = current && !PREFIXES.includes(current);
  const opts = [...PREFIXES, 'อื่นๆ'].map(p => {
    const sel = (p === 'อื่นๆ' ? isOther : current === p) ? 'selected' : '';
    return `<option value="${p}" ${sel}>${p}</option>`;
  }).join('');
  return `<div style="display:flex;flex-direction:column;gap:6px">
    <select id="${id}-prefix" class="dc-input" onchange="togglePrefixOther('${id}')">${opts}</select>
    <input id="${id}-prefix-other" class="dc-input" placeholder="ระบุคำนำหน้า" style="display:${isOther ? 'block' : 'none'}" value="${isOther ? esc(current) : ''}"/>
  </div>`;
}
window.prefixSelectHtml = prefixSelectHtml;
window.togglePrefixOther = (id) => {
  const s = document.getElementById(id + '-prefix');
  const other = document.getElementById(id + '-prefix-other');
  if (s && other) other.style.display = s.value === 'อื่นๆ' ? 'block' : 'none';
  if (s) {
    const p = s.value;
    const gEl = document.getElementById(id + '-gender') || document.getElementById('reg-gender');
    if (gEl) {
      if (isMalePrefix(p)) gEl.value = 'male';
      else if (isFemalePrefix(p)) gEl.value = 'female';
    }
  }
};
window.getPrefix = (id) => {
  const s = document.getElementById(id + '-prefix');
  if (!s) return '';
  return s.value === 'อื่นๆ' ? (document.getElementById(id + '-prefix-other') ? document.getElementById(id + '-prefix-other').value.trim() : '') : s.value;
};

function availableTypesFor(prefix, gender) {
  const isMale = gender === 'male' || (!gender && isMalePrefix(prefix));
  const isFemale = gender === 'female' || (!gender && isFemalePrefix(prefix));
  return leaveTypes.filter(lt => {
    if (lt.gender === 'female' && isMale) return false;
    if (lt.gender === 'male' && isFemale) return false;
    return true;
  });
}
const ROLE_META = {
  Teacher: { label: 'ครู', bg: '#eff6ff', color: '#1d4ed8' },
  HR: { label: 'ฝ่ายบุคคล', bg: '#fdf4ff', color: '#a21caf' },
  Director: { label: 'ผู้อำนวยการ', bg: '#fff7ed', color: '#c2410c' },
  Admin: { label: 'ผู้ดูแลระบบ', bg: '#f0fdf4', color: '#15803d' },
};

// ---- Date / util helpers ----
const normDate = (v) => (v == null ? '' : String(v).substring(0, 10));
function parseISO(s) { const [y, m, d] = normDate(s).split('-').map(Number); return new Date(y, m - 1, d); }
function fmtThai(iso) { const d = parseISO(iso); return `${d.getDate()} ${THAI_MONTHS[d.getMonth()]} ${d.getFullYear() + 543}`; }
function fmtShort(iso) { const d = parseISO(iso); return `${d.getDate()} ${THAI_MONTHS[d.getMonth()]}`; }
function halfDayLabel(hd) { return hd === 'morning' ? 'ครึ่งวันเช้า' : hd === 'afternoon' ? 'ครึ่งวันบ่าย' : ''; }
function daysBetween(from, to) { return Math.round((parseISO(to) - parseISO(from)) / 86400000) + 1; }
function dateInRange(dateStr, from, to) { const d = parseISO(dateStr).getTime(); return d >= parseISO(from).getTime() && d <= parseISO(to).getTime(); }
function toISO(y, m, d) { return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`; }
function todayISO() { const d = new Date(); return toISO(d.getFullYear(), d.getMonth(), d.getDate()); }
function initials(name) { return String(name || '?').replace(/^(นาง|นางสาว|นาย|ผอ\.)/, '').trim().slice(0, 1) || '?'; }
function avatarColor(seed) { let n = 0; for (const c of String(seed)) n += c.charCodeAt(0); return AVATAR_COLORS[n % AVATAR_COLORS.length]; }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

function statusMeta(status) {
  if (status === 'Approved')         return { label: 'อนุมัติแล้ว',    bg: '#f0fdf4', color: '#15803d' };
  if (status === 'Rejected')         return { label: 'ไม่อนุมัติ',     bg: '#fef2f2', color: '#b91c1c' };
  if (status === 'Cancelled')        return { label: 'ยกเลิกแล้ว',    bg: '#f1f5f9', color: '#64748b' };
  if (status === 'Pending_Director') return { label: 'รออนุมัติ ผอ.', bg: '#fff7ed', color: '#c2410c' };
  return { label: 'รออนุมัติ', bg: '#fffbeb', color: '#b45309' };
}
const isPending = (s) => String(s).indexOf('Pending') === 0 || s === 'Pending';
const isActive = (s) => s !== 'Rejected' && s !== 'Cancelled';
function typeColor(id) { const t = leaveTypes.find(x => x.id == id); return t ? t.color_code : '#64748b'; }
function typeName(id) { const t = leaveTypes.find(x => x.id == id); return t ? t.name : id; }

// ---- UI utils ----
// heightAuto:false app-wide — with our min-height:100vh layouts SweetAlert2's
// default heightAuto leaves the backdrop / body overflow lock after close,
// freezing the page (e.g. cancelling the logout dialog).
if (typeof Swal !== 'undefined') Swal = Swal.mixin({ heightAuto: false });
const showLoader = (show = true) => { document.getElementById('loader').style.display = show ? 'flex' : 'none'; };
function toast(text) {
  const root = document.getElementById('toast-root');
  root.innerHTML = `<div style="position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#0f172a;color:#fff;padding:12px 22px;border-radius:999px;font-size:13px;font-weight:600;z-index:2000;box-shadow:0 10px 30px rgba(0,0,0,.25)">${esc(text)}</div>`;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { root.innerHTML = ''; }, 2400);
}
const swalError = (msg) => Swal.fire('เกิดข้อผิดพลาด!', msg, 'error');

// ---- Inline SVG icons ----
const ICONS = {
  chart: '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
  list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  checkCircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  alert: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  paperclip: '<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  chevronLeft: '<polyline points="15 18 9 12 15 6"/>',
  chevronRight: '<polyline points="9 18 15 12 9 6"/>',
  chevronUp: '<polyline points="18 15 12 9 6 15"/>',
  chevronDown: '<polyline points="6 9 12 15 18 9"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
};
function svg(name, size = 16, width = 2) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;flex:none">${ICONS[name] || ''}</svg>`;
}

// ---- Thai date picker ----
function thaiDate(id, value = '', cb = '') {
  const d = value ? parseISO(value) : null;
  const day = d ? d.getDate() : '';
  const mon = d ? d.getMonth() : '';
  const yr = d ? d.getFullYear() : '';
  const now = new Date().getFullYear();
  const years = [];
  for (let y = now - 5; y <= now + 3; y++) years.push(y);
  if (yr && !years.includes(yr)) { years.push(yr); years.sort((a, b) => a - b); }
  const sel = 'padding:8px 6px;border:1px solid #e2e8f0;border-radius:8px;font-size:12.5px;color:#0f172a;background:#fff';
  const dayOpts = ['<option value="">วัน</option>', ...Array.from({ length: 31 }, (_, i) => `<option value="${i + 1}" ${day == i + 1 ? 'selected' : ''}>${i + 1}</option>`)].join('');
  const monOpts = ['<option value="">เดือน</option>', ...THAI_MONTHS_FULL.map((m, i) => `<option value="${i}" ${mon === i ? 'selected' : ''}>${m}</option>`)].join('');
  const yrOpts = ['<option value="">ปี พ.ศ.</option>', ...years.map(y => `<option value="${y}" ${yr == y ? 'selected' : ''}>${y + 543}</option>`)].join('');
  return `<span class="thai-date" style="display:inline-flex;gap:6px;align-items:center">
    <select id="${id}-d" onchange="syncThaiDate('${id}')" style="${sel}">${dayOpts}</select>
    <select id="${id}-m" onchange="syncThaiDate('${id}')" style="${sel}">${monOpts}</select>
    <select id="${id}-y" onchange="syncThaiDate('${id}')" style="${sel}">${yrOpts}</select>
    <input type="hidden" id="${id}" value="${value}" data-cb="${esc(cb)}"/>
  </span>`;
}
function thaiDateBlock(id, value = '', cb = '') {
  const d = value ? parseISO(value) : null;
  const day = d ? d.getDate() : '';
  const mon = d ? d.getMonth() : '';
  const yr = d ? d.getFullYear() : '';
  const now = new Date().getFullYear();
  const years = [];
  for (let y = now - 5; y <= now + 3; y++) years.push(y);
  if (yr && !years.includes(yr)) { years.push(yr); years.sort((a, b) => a - b); }
  const sel = 'width:100%;padding:8px 4px;border:1px solid #e2e8f0;border-radius:8px;font-size:12px;color:#0f172a;background:#fff;box-sizing:border-box';
  const dayOpts = ['<option value="">วัน</option>', ...Array.from({ length: 31 }, (_, i) => `<option value="${i + 1}" ${day == i + 1 ? 'selected' : ''}>${i + 1}</option>`)].join('');
  const monOpts = ['<option value="">เดือน</option>', ...THAI_MONTHS_FULL.map((m, i) => `<option value="${i}" ${mon === i ? 'selected' : ''}>${m}</option>`)].join('');
  const yrOpts = ['<option value="">ปี</option>', ...years.map(y => `<option value="${y}" ${yr == y ? 'selected' : ''}>${y + 543}</option>`)].join('');
  return `<div style="display:grid;grid-template-columns:1fr 2fr 1.5fr;gap:4px">
    <select id="${id}-d" onchange="syncThaiDateFilter('${id}')" style="${sel}">${dayOpts}</select>
    <select id="${id}-m" onchange="syncThaiDateFilter('${id}')" style="${sel}">${monOpts}</select>
    <select id="${id}-y" onchange="syncThaiDateFilter('${id}')" style="${sel}">${yrOpts}</select>
    <input type="hidden" id="${id}" value="${value}" data-cb="${esc(cb)}"/>
  </div>`;
}
window.syncThaiDate = function (id) {
  const d = document.getElementById(id + '-d').value;
  const m = document.getElementById(id + '-m').value;
  const y = document.getElementById(id + '-y').value;
  const hid = document.getElementById(id);
  hid.value = (d && m !== '' && y) ? toISO(Number(y), Number(m), Number(d)) : '';
  const cb = hid.dataset.cb;
  if (cb) new Function(cb)();
};
// only fires when all 3 selects are filled — prevents re-render from wiping partial selections
window.syncThaiDateFilter = function(id) {
  const d = document.getElementById(id + '-d').value;
  const m = document.getElementById(id + '-m').value;
  const y = document.getElementById(id + '-y').value;
  if (!d || m === '' || !y) return;
  const hid = document.getElementById(id);
  hid.value = toISO(Number(y), Number(m), Number(d));
  const cb = hid.dataset.cb;
  if (cb) new Function(cb)();
};

// ---- Range calendar ----
const _range = {};
function rangeCalendar(id, opts) {
  opts = opts || {};
  const now = new Date();
  _range[id] = { start: '', end: '', year: now.getFullYear(), month: now.getMonth(), onchange: opts.onchange || '' };
  return `<div id="${id}-cal">${renderRangeCal(id)}</div>
    <input type="hidden" id="${id}-from"/><input type="hidden" id="${id}-to"/>`;
}
function renderRangeCal(id) {
  const st = _range[id];
  const { year, month, start, end } = st;
  const first = new Date(year, month, 1).getDay();
  const dim = new Date(year, month + 1, 0).getDate();
  const today = todayISO();
  const wd = WEEKDAYS.map(w => `<div style="text-align:center;font-size:10px;color:#94a3b8;font-weight:700;padding:2px 0">${w}</div>`).join('');
  let cells = '';
  for (let i = 0; i < first; i++) cells += '<div></div>';
  for (let d = 1; d <= dim; d++) {
    const iso = toISO(year, month, d);
    const isEnd = iso === start || iso === end;
    const inRange = start && end && iso > start && iso < end;
    let bg = 'transparent', color = '#0f172a';
    if (isEnd) { bg = '#2563eb'; color = '#fff'; }
    else if (inRange) { bg = '#dbeafe'; color = '#1d4ed8'; }
    const border = (iso === today && !isEnd) ? 'border:1px solid #2563eb;' : '';
    cells += `<div onclick="pickRangeDay('${id}','${iso}')" class="dc-hover" style="cursor:pointer;aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:12.5px;border-radius:8px;background:${bg};color:${color};${border}">${d}</div>`;
  }
  const summary = start ? (end ? `${fmtThai(start)} — ${fmtThai(end)}` : `${fmtThai(start)} · แตะเลือกวันสิ้นสุด`) : 'แตะเลือกวันเริ่มลา';
  return `
    <div style="border:1px solid #e2e8f0;border-radius:12px;padding:12px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <div onclick="rangeMove('${id}',-1)" class="dc-hover" style="cursor:pointer;width:28px;height:28px;border:1px solid #e2e8f0;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#334155">${svg('chevronLeft', 15)}</div>
        <div style="font-size:13px;font-weight:700">${THAI_MONTHS_FULL[month]} ${year + 543}</div>
        <div onclick="rangeMove('${id}',1)" class="dc-hover" style="cursor:pointer;width:28px;height:28px;border:1px solid #e2e8f0;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#334155">${svg('chevronRight', 15)}</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-bottom:3px">${wd}</div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px">${cells}</div>
      <div style="margin-top:10px;font-size:12px;font-weight:600;color:${start ? '#2563eb' : '#94a3b8'};text-align:center">${esc(summary)}</div>
    </div>`;
}
window.rangeMove = (id, delta) => {
  const st = _range[id];
  let m = st.month + delta, y = st.year;
  if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; }
  st.month = m; st.year = y;
  document.getElementById(id + '-cal').innerHTML = renderRangeCal(id);
};
window.pickRangeDay = (id, iso) => {
  const st = _range[id];
  if (!st.start || st.end) { st.start = iso; st.end = ''; }
  else if (parseISO(iso) < parseISO(st.start)) { st.start = iso; st.end = ''; }
  else { st.end = iso; }
  document.getElementById(id + '-from').value = st.start;
  document.getElementById(id + '-to').value = st.end || '';
  document.getElementById(id + '-cal').innerHTML = renderRangeCal(id);
  if (st.onchange) new Function(st.onchange)();
};

// ---- API proxy (POST text/plain to avoid GAS CORS preflight) ----
// 45s timeout so a stalled request (e.g. the POST→googleusercontent redirect
// hanging under browser Tracking Prevention) surfaces as an error instead of
// spinning the loader forever.
const api = new Proxy({}, {
  get: (_t, funcName) => async (...args) => {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 45000);
    let res;
    try {
      res = await fetch(GAS_WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: funcName, args }),
        signal: ctrl.signal
      });
    } catch (e) {
      throw new Error(ctrl.signal.aborted ? 'หมดเวลาเชื่อมต่อเซิร์ฟเวอร์ กรุณาลองใหม่' : (e.message || 'เชื่อมต่อเซิร์ฟเวอร์ไม่สำเร็จ'));
    } finally { clearTimeout(t); }
    const text = await res.text();
    let result;
    try { result = JSON.parse(text); }
    catch (e) { throw new Error('เซิร์ฟเวอร์ตอบกลับไม่ถูกต้อง (ตรวจสอบการ deploy / สิทธิ์การเข้าถึง)'); }
    if (!result.success) throw new Error(result.error || 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์');
    return result.data;
  }
});
