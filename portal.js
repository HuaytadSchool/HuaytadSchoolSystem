// ===========================================================================
// portal.js — Huaytad School Super App Portal (LINE LIFF + 4 Departments)
// ===========================================================================

const PORTAL_LIFF_ID = '2010662195-iJjI0NIA';
const PORTAL_GAS_URL = 'https://script.google.com/macros/s/AKfycbwauu8fcgkbX0duHiyNtpZQzWLZuBreA5JF5tBeO3Fi3n6L5alTGrMaixt2GtLK2xFOSQ/exec';

const ROLE_LABELS = {
  Teacher: 'ครูผู้สอน',
  HR: 'ฝ่ายบริหารงานบุคคล (HR)',
  Director: 'ผู้อำนวยการโรงเรียน',
  Admin: 'ผู้ดูแลระบบ (Admin)'
};

let portalUser = null;
let portalLineProfile = null;
let moduleStatuses = { leave: 'active', teaching: 'active', note: '' };
let toastTimer = null;

async function portalApi(action, ...args) {
  const res = await fetch(PORTAL_GAS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, args })
  });
  const text = await res.text();
  const json = JSON.parse(text);
  if (!json.success) throw new Error(json.error || 'เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
  return json.data;
}

function setLoader(show) {
  const el = document.getElementById('portal-loader');
  if (el) el.style.display = show ? 'flex' : 'none';
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    setLoader(true);

    if (sessionStorage.getItem('loggedOut')) {
      sessionStorage.removeItem('loggedOut');
      showLogin();
      return;
    }

    // Restore Admin session if logged in via username/password
    try {
      const savedAdminRaw = localStorage.getItem('admin_session');
      if (savedAdminRaw) {
        const saved = JSON.parse(savedAdminRaw);
        if (saved && saved.user && saved.user.role === 'Admin' && (Date.now() - (saved.timestamp || 0) < 7 * 86400000)) {
          portalUser = saved.user;
          await loadPortalSettings();
          showPortal();
          return;
        }
      }
    } catch (e) {}

    if (typeof liff !== 'undefined' && PORTAL_LIFF_ID) {
      await liff.init({ liffId: PORTAL_LIFF_ID });
      if (!liff.isLoggedIn()) {
        showLogin();
        return;
      }
      portalLineProfile = await liff.getProfile();
      const [user, settings] = await Promise.all([
        portalApi('getTeacherByLineId', portalLineProfile.userId, portalLineProfile.pictureUrl || ''),
        portalApi('getSettings').catch(() => ({}))
      ]);
      applySettings(settings);

      if (user && user.status === 'Active') {
        portalUser = user;
        showPortal();
      } else {
        // ยังไม่ได้ลงทะเบียน / รออนุมัติ -> ส่งไปหน้าลงทะเบียนใน leave/index.html
        location.href = 'leave/index.html';
      }
    } else {
      showLogin();
    }
  } catch (err) {
    console.error(err);
    showLogin();
    showToast(err.message || 'ไม่สามารถเชื่อมต่อระบบได้');
  } finally {
    setLoader(false);
  }
});

async function loadPortalSettings() {
  try {
    const settings = await portalApi('getSettings');
    applySettings(settings);
  } catch (e) {}
}

function applySettings(settings) {
  if (settings && settings.module_statuses) {
    try {
      moduleStatuses = typeof settings.module_statuses === 'string'
        ? JSON.parse(settings.module_statuses)
        : settings.module_statuses;
    } catch (e) {}
  }
}

window.handlePortalLogin = () => {
  if (typeof liff !== 'undefined' && liff.login) {
    liff.login();
  }
};

window.handlePortalLogout = () => {
  sessionStorage.setItem('loggedOut', '1');
  try { localStorage.removeItem('admin_session'); } catch (e) {}
  try { if (typeof liff !== 'undefined' && liff.isLoggedIn && liff.isLoggedIn()) liff.logout(); } catch (e) {}
  location.reload();
};

function showLogin() {
  document.getElementById('view-portal').style.display = 'none';
  document.getElementById('view-login').style.display = 'flex';
  setLoader(false);
}

function showPortal() {
  document.getElementById('view-login').style.display = 'none';
  document.getElementById('view-portal').style.display = 'block';
  renderPortalUser();
  setLoader(false);
}

function renderPortalUser() {
  if (!portalUser) return;
  const fullName = `${portalUser.prefix || ''}${portalUser.name || ''} ${portalUser.surname || ''}`.trim() || 'ผู้ใช้งาน';
  const avatarEl = document.getElementById('user-avatar');
  if (portalLineProfile && portalLineProfile.pictureUrl) {
    avatarEl.innerHTML = `<img src="${portalLineProfile.pictureUrl}" alt="avatar">`;
  } else {
    avatarEl.textContent = (portalUser.name || 'ค').charAt(0);
  }
  document.getElementById('user-fullname').textContent = fullName;
  document.getElementById('user-role-text').textContent = portalUser.position || ROLE_LABELS[portalUser.role] || portalUser.role;

  const lb = document.getElementById('leave-badge');
  if (moduleStatuses.leave === 'maintenance') { lb.textContent = 'ปิดปรับปรุง'; lb.className = 'card-badge badge-alert'; }
  else if (moduleStatuses.leave === 'disabled') { lb.textContent = 'ปิดใช้งาน'; lb.className = 'card-badge badge-soon'; }
  else { lb.textContent = 'พร้อมใช้'; lb.className = 'card-badge badge-ready'; }

  const tb = document.getElementById('teaching-badge');
  if (moduleStatuses.teaching === 'maintenance') { tb.textContent = 'ปิดปรับปรุง'; tb.className = 'card-badge badge-alert'; }
  else if (moduleStatuses.teaching === 'disabled') { tb.textContent = 'ปิดใช้งาน'; tb.className = 'card-badge badge-soon'; }
  else { tb.textContent = 'พร้อมใช้'; tb.className = 'card-badge badge-ready'; }

  document.getElementById('admin-section').style.display = portalUser.role === 'Admin' ? 'flex' : 'none';
}

const DEPT_APPS = {
  personnel: {
    title: 'ฝ่ายบริหารงานบุคคล',
    sub: 'เลือกโปรแกรมที่ต้องการใช้งาน',
    apps: [
      {
        name: 'ระบบจัดการการลา',
        hint: 'ยื่นใบลา · ตรวจสอบสิทธิ์',
        href: 'leave/index.html',
        modKey: 'leave',
        ready: true,
        bg: 'linear-gradient(145deg,#eff6ff,#dbeafe)',
        icon: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none"><rect x="7" y="10" width="34" height="31" rx="6" fill="#3b82f6"/><rect x="7" y="10" width="34" height="10" rx="4" fill="#1d4ed8"/><rect x="14" y="6" width="4" height="8" rx="2" fill="#93c5fd"/><rect x="30" y="6" width="4" height="8" rx="2" fill="#93c5fd"/><rect x="13" y="24" width="22" height="11" rx="3" fill="#fff"/><path d="M18 29.5l3 3 7-7" stroke="#16a34a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      },
      {
        name: 'ทะเบียนประวัติ / ก.พ.7',
        hint: 'ข้อมูลบุคลากรและคำสั่ง',
        ready: false,
        bg: '#f1f5f9',
        icon: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none"><rect x="10" y="7" width="28" height="34" rx="5" fill="#94a3b8"/><rect x="15" y="15" width="18" height="3" rx="1.5" fill="#fff"/><rect x="15" y="22" width="14" height="3" rx="1.5" fill="#fff"/><rect x="15" y="29" width="10" height="3" rx="1.5" fill="#fff"/></svg>'
      }
    ]
  },
  academic: {
    title: 'ฝ่ายบริหารวิชาการ',
    sub: 'เลือกโปรแกรมที่ต้องการใช้งาน',
    apps: [
      {
        name: 'ระบบส่งแผนการสอน',
        hint: 'ส่งแผน PDF · บันทึกหลังสอน',
        href: 'teaching/index.html',
        modKey: 'teaching',
        ready: true,
        bg: 'linear-gradient(145deg,#ecfdf5,#d1fae5)',
        icon: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none"><path d="M8 12c0-2.2 1.8-4 4-4h10c1.1 0 2 .9 2 2v28c-2-1.5-4.5-2-7-2H10c-1.1 0-2-.9-2-2V12z" fill="#10b981"/><path d="M40 12c0-2.2-1.8-4-4-4H26c-1.1 0-2 .9-2 2v28c2-1.5 4.5-2 7-2h7c1.1 0 2-.9 2-2V12z" fill="#34d399"/><circle cx="34" cy="33" r="9" fill="#ffffff" stroke="#059669" stroke-width="2"/><path d="M30.5 33l2.2 2.2 4.8-4.7" stroke="#059669" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      },
      {
        name: 'นิเทศการสอน & PLC',
        hint: 'บันทึกเยี่ยมชั้นเรียน',
        ready: false,
        bg: '#f1f5f9',
        icon: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none"><rect x="8" y="10" width="32" height="24" rx="5" fill="#94a3b8"/><path d="M16 39h16" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round"/><path d="M15 22l5-5 5 4 8-7" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      }
    ]
  },
  budget: {
    title: 'ฝ่ายบริหารงบประมาณ',
    sub: 'โปรแกรมที่เตรียมเปิดใช้งาน',
    apps: [
      {
        name: 'แผนงานและโครงการ',
        hint: 'ขออนุมัติใช้งบประมาณ',
        ready: false,
        bg: '#fef3c7',
        icon: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none"><rect x="9" y="10" width="30" height="28" rx="5" fill="#f59e0b"/><path d="M16 20h16M16 27h10" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/></svg>'
      },
      {
        name: 'ระบบพัสดุและเบิกจ่าย',
        hint: 'ทะเบียนครุภัณฑ์และวัสดุ',
        ready: false,
        bg: '#f1f5f9',
        icon: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none"><path d="M24 8l15 8v16l-15 8-15-8V16l15-8z" fill="#94a3b8"/><path d="M9 16l15 8 15-8M24 24v16" stroke="#fff" stroke-width="2"/></svg>'
      }
    ]
  },
  general: {
    title: 'ฝ่ายบริหารทั่วไป',
    sub: 'โปรแกรมที่เตรียมเปิดใช้งาน',
    apps: [
      {
        name: 'ระบบแจ้งซ่อมบำรุง',
        hint: 'แจ้งซ่อมอุปกรณ์และอาคาร',
        ready: false,
        bg: '#f3e8ff',
        icon: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="14" fill="#8b5cf6"/><path d="M18 24h12M24 18v12" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>'
      },
      {
        name: 'จองห้องประชุม / ยานพาหนะ',
        hint: 'ปฏิทินการใช้สถานที่',
        ready: false,
        bg: '#f1f5f9',
        icon: '<svg width="34" height="34" viewBox="0 0 48 48" fill="none"><rect x="8" y="10" width="32" height="28" rx="5" fill="#94a3b8"/><path d="M16 22h16M16 29h10" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>'
      }
    ]
  }
};

window.openDepartment = (deptKey) => {
  const dept = DEPT_APPS[deptKey];
  if (!dept) return;
  document.getElementById('dept-view-title').textContent = dept.title;
  document.getElementById('dept-view-sub').textContent = dept.sub;

  const isAdmin = portalUser && portalUser.role === 'Admin';
  const grid = document.getElementById('dept-apps-grid');
  grid.innerHTML = dept.apps.map(app => {
    const modState = app.modKey ? (moduleStatuses[app.modKey] || 'active') : (app.ready ? 'active' : 'soon');
    if (app.ready && (modState === 'active' || isAdmin)) {
      const badge = modState === 'active' ? 'เปิดใช้งาน' : (modState === 'maintenance' ? 'ปิดปรับปรุง (Admin)' : 'ปิดใช้งาน (Admin)');
      return `
        <a href="${app.href}" class="dept-card ready">
          <span class="card-badge ${modState === 'active' ? 'badge-ready' : 'badge-alert'}">${badge}</span>
          <div class="dept-icon" style="background:${app.bg}">${app.icon}</div>
          <div class="dept-name">${app.name}</div>
          <div class="dept-hint">${app.hint}</div>
        </a>`;
    }
    if (app.ready && (modState === 'maintenance' || modState === 'disabled')) {
      const isMaint = modState === 'maintenance';
      const msg = moduleStatuses.note || (isMaint ? `${app.name} อยู่ระหว่างปิดปรับปรุงชั่วคราว` : `${app.name} ปิดการใช้งานชั่วคราว`);
      return `
        <div class="dept-card soon" onclick="showToast('${msg.replace(/'/g, "\\'")}')">
          <span class="card-badge ${isMaint ? 'badge-alert' : 'badge-soon'}">${isMaint ? 'ปิดปรับปรุง' : 'ปิดใช้งาน'}</span>
          <div class="dept-icon" style="background:${app.bg}">${app.icon}</div>
          <div class="dept-name">${app.name}</div>
          <div class="dept-hint">${app.hint}</div>
        </div>`;
    }
    return `
      <div class="dept-card soon" onclick="showToast('${app.name} — กำลังพัฒนาเร็วๆ นี้')">
        <span class="card-badge badge-soon">เร็วๆ นี้</span>
        <div class="dept-icon" style="background:${app.bg}">${app.icon}</div>
        <div class="dept-name">${app.name}</div>
        <div class="dept-hint">${app.hint}</div>
      </div>`;
  }).join('');

  document.getElementById('dept-list-view').style.display = 'none';
  document.getElementById('dept-apps-view').style.display = 'block';
};

window.closeDepartment = () => {
  document.getElementById('dept-apps-view').style.display = 'none';
  document.getElementById('dept-list-view').style.display = 'block';
};

window.showToast = (msg) => {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
};
