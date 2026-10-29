/**
 * ============================================================================
 * Teaching Space Frontend Script - โรงเรียนบ้านห้วยตาด
 * มาตรฐาน: ใช้ SVG Icons ทั้งหมด (100% Emoji-Free)
 * ============================================================================
 */

const CONFIG = {
  GAS_WEB_APP_URL: "https://script.google.com/macros/s/AKfycbysT26dUNIrAAPyEyXhSv-mOOiFiFqTo0NtY4iOLPx-dXStgOIVb7m0x4ZnEo3A_6iygQ/exec",
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

// Global App State
let state = {
  currentLineProfile: null,
  teacher: null,
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
  reportSubView: 'plans'
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
        <h2 style="font-size:20px; font-weight:800; color:var(--primary); margin-bottom:6px;">Teaching Space</h2>
        <p style="font-size:13px; color:var(--text-muted); margin-bottom:24px;">ระบบส่งแผนการสอนและบันทึกหลังสอน<br/>โรงเรียนบ้านห้วยตาด</p>
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
  const isReviewer = ['Head', 'Academic', 'Admin', 'Director'].includes(state.teacher.role) || state.pendingReviewsCount > 0;
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

  // แท็บจัดการวิชาการ (สำหรับ Academic / Admin / Director)
  const isAcademic = ['Academic', 'Admin', 'Director'].includes(state.teacher.role);
  const manageTab = document.getElementById('tab-manage-btn');
  if (manageTab) {
    manageTab.style.display = isAcademic ? 'flex' : 'none';
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
    const latestPlan = (load.plans && load.plans.length > 0) ? load.plans[load.plans.length - 1] : null;
    const status = latestPlan ? latestPlan.status : 'Not_Submitted';
    const statusText = getStatusBadge(status);
    const isLocked = ['Pending_Head', 'Pending_Academic', 'Approved'].includes(status);
    
    // ตรวจสอบวันกำหนดส่ง
    const dueDate = latestPlan && latestPlan.due_date ? latestPlan.due_date : (state.rounds[0] ? state.rounds[0].due_date : '');
    const isOverdue = dueDate && new Date(dueDate) < new Date() && ['Not_Submitted', 'Draft', 'Revise'].includes(status);

    html += `
      <div class="load-card">
        <div class="load-header">
          <div>
            <span class="subject-code">${esc(load.subject_code || 'วิชา')}</span>
            <div class="subject-name">${esc(load.subject_name)}</div>
            <div class="classroom-tag">ชั้น ${esc(load.classroom)} ${load.level ? '(' + esc(load.level) + ')' : ''}</div>
          </div>
          <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
            ${statusText}
            ${isOverdue ? `<span class="status-badge status-revise" style="font-size:11px;">${svg('alert', 11)} ค้างส่งเกินกำหนด</span>` : ''}
          </div>
        </div>

        ${latestPlan ? `
          <div style="font-size:13px; color:#475569; margin: 8px 0; background:#f8fafc; padding:8px 12px; border-radius:8px; border:1px solid #e2e8f0;">
            <div><strong>หน่วย/เรื่อง:</strong> ${esc(latestPlan.unit_title || '-')} (${latestPlan.teaching_hours || 0} ชม.)</div>
            <div><strong>ฉบับที่:</strong> ${latestPlan.version || 1} ${latestPlan.due_date ? '• กำหนดส่ง: ' + formatDate(latestPlan.due_date) : ''}</div>
          </div>
        ` : ''}

        <div class="load-info-row">
          <div class="reviewer-info">
            <span>ผู้ตรวจ: <strong>${esc(load.reviewer_name)}</strong></span>
          </div>
          <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
            ${latestPlan ? `
              <button class="btn-secondary" onclick="openHistoryModal('${latestPlan.plan_id}')">
                ${svg('clock', 14)} <span>ประวัติ</span>
              </button>
            ` : ''}
            ${latestPlan && latestPlan.drive_pdf_url ? `
              <a href="${latestPlan.drive_pdf_url}" target="_blank" class="btn-secondary" style="text-decoration:none;">
                ${svg('fileText', 14)} <span>ดู PDF</span>
              </a>
            ` : ''}
            ${isLocked ? `
              <span style="font-size:12px; color:#64748b; display:inline-flex; align-items:center; gap:4px; padding:4px 8px; background:#f1f5f9; border-radius:6px;">
                ${svg('lock', 12)} ล็อกรอการตรวจ
              </span>
            ` : `
              <button class="btn-primary" onclick="openSubmitModal('${load.load_id}')">
                ${latestPlan ? `${svg('edit', 14)} <span>${status === 'Revise' ? 'ส่งฉบับแก้ไข' : 'แก้ไขร่าง'}</span>` : `${svg('send', 14)} <span>ส่งแผนการสอน</span>`}
              </button>
            `}
            ${status === 'Approved' ? `
              <button class="btn-primary" onclick="switchTab('reflections')" style="background:#16a34a;">
                ${svg('plus', 14)} <span>บันทึกหลังสอน</span>
              </button>
            ` : ''}
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
        : `<span class="status-badge status-pending_academic">${svg('eye', 12)} รอฝ่ายวิชาการรับรอง</span>`;

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
  const passLabel = isHead ? 'ผ่านการตรวจ (ส่งต่อให้ฝ่ายวิชาการรับรอง)' : 'รับรองแผนสมบูรณ์ (อนุมัติให้เริ่มบันทึกหลังสอน)';

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
      <div style="margin-bottom:16px;">
        <a href="${item.drive_pdf_url}" target="_blank" class="btn-secondary" style="width:100%; justify-content:center; padding:10px; text-decoration:none; display:flex;">
          ${svg('fileText', 16)} <span>คลิกเพื่อเปิดอ่านไฟล์ PDF ใน Google Drive</span>
        </a>
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
  container.innerHTML = `
    <div style="text-align:center; padding:40px 16px;">
      <div class="spinner" style="margin:0 auto 12px;"></div>
      <p style="color:#64748b; font-size:13px;">กำลังโหลดข้อมูลการจัดการฝ่ายวิชาการ...</p>
    </div>`;

  try {
    const data = await api.getAcademicManageData(state.teacher.lineUserId);
    state.manageData = data;

    const rounds = data.rounds || [];
    const loads = data.loads || [];

    let roundsHtml = '';
    if (rounds.length === 0) {
      roundsHtml = '<div style="color:#64748b; font-size:13px; text-align:center; padding:16px;">ยังไม่มีการเปิดรอบส่งแผนในภาคเรียนนี้</div>';
    } else {
      roundsHtml = rounds.map(r => {
        const isOpen = r.is_open === true || String(r.is_open).toUpperCase() === 'TRUE';
        return `
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:14px; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div>
              <div style="font-weight:700; font-size:14px; color:#0f172a;">${esc(r.title)}</div>
              <div style="font-size:12px; color:#64748b; margin-top:2px;">
                เปิดรับ: ${formatDate(r.start_date)} • กำหนดส่ง: ${formatDate(r.due_date)}
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="status-badge ${isOpen ? 'status-approved' : 'status-draft'}">
                ${isOpen ? `${svg('check', 11)} กำลังเปิดรับ` : `${svg('x', 11)} ปิดรับแล้ว`}
              </span>
              <button class="btn-secondary" style="font-size:12px; padding:6px 10px;" onclick="handleToggleRound('${r.round_id}', ${!isOpen})">
                ${isOpen ? 'ปิดรอบ' : 'เปิดรับ'}
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    let loadsHtml = '';
    if (loads.length === 0) {
      loadsHtml = '<div style="color:#64748b; font-size:13px; text-align:center; padding:16px;">ยังไม่มีการมอบหมายภาระการสอน</div>';
    } else {
      loadsHtml = loads.map(l => {
        return `
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
              <div>
                <button class="btn-secondary" style="font-size:12px; padding:6px 12px;" onclick="openChangeReviewerModal('${l.load_id}', '${esc(l.subject_code)}', '${esc(l.classroom)}', '${esc(l.reviewer_id)}')">
                  ${svg('edit', 12)} <span>เปลี่ยนผู้ตรวจ</span>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    container.innerHTML = `
      <div style="margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div style="font-size:18px; font-weight:800; color:var(--primary); display:flex; align-items:center; gap:8px;">
          ${svg('settings', 18)} <span>การจัดการฝ่ายวิชาการ</span>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="btn-primary" onclick="openCreateRoundModal()">
            ${svg('plus', 14)} <span>เปิดรอบส่งแผน</span>
          </button>
          <button class="btn-primary" onclick="openCreateLoadModal()" style="background:#0284c7;">
            ${svg('plus', 14)} <span>มอบหมายภาระสอน</span>
          </button>
          <button class="btn-secondary" onclick="openCreateSubjectModal()">
            ${svg('plus', 14)} <span>เพิ่มรายวิชา</span>
          </button>
        </div>
      </div>

      <!-- ส่วนที่ 1: รอบการส่งแผน -->
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:18px; margin-bottom:24px;">
        <div style="font-size:15px; font-weight:800; color:#1e3a8a; margin-bottom:12px; display:flex; align-items:center; gap:6px;">
          ${svg('calendar', 16)} <span>รอบการส่งแผนการสอน (ภาคเรียนปัจจุบัน)</span>
        </div>
        ${roundsHtml}
      </div>

      <!-- ส่วนที่ 2: ภาระการสอน -->
      <div style="margin-bottom:14px;">
        <div style="font-size:15px; font-weight:800; color:#1e3a8a; margin-bottom:12px; display:flex; align-items:center; gap:6px;">
          ${svg('book', 16)} <span>ทะเบียนภาระการสอนและผู้ตรวจประจำวิชา</span>
        </div>
        <div class="cards-grid">
          ${loadsHtml}
        </div>
      </div>
    `;

  } catch (err) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${svg('alert', 40, 1.5)}</div>
        <p style="color:#dc2626;">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
        <small class="text-muted">${esc(err.message)}</small>
      </div>`;
  }
}

// เปิด/ปิด สถานะรอบการส่งแผน
async function handleToggleRound(roundId, newIsOpen) {
  showLoader(true, 'กำลังอัปเดตสถานะรอบส่งแผน...');
  try {
    await api.toggleRoundStatus({
      roundId: roundId,
      isOpen: newIsOpen,
      lineUserId: state.teacher.lineUserId
    });
    const container = document.getElementById('tab-content');
    await renderManage(container);
  } catch (err) {
    Swal.fire('ข้อผิดพลาด', err.message, 'error');
  } finally {
    showLoader(false);
  }
}

// Modal สร้างรอบส่งแผนใหม่
function openCreateRoundModal() {
  const today = new Date().toISOString().split('T')[0];

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
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div class="form-group">
          <label class="form-label">วันเริ่มเปิดรับ *</label>
          <input type="date" id="round-start" class="form-input" value="${today}" required/>
        </div>
        <div class="form-group">
          <label class="form-label">วันกำหนดส่ง *</label>
          <input type="date" id="round-due" class="form-input" value="${today}" required/>
        </div>
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

    Swal.fire('สร้างรอบส่งแผนสำเร็จ', 'ระบบได้เพิ่มรอบและเตรียมรายการติดตามให้ครูทุกท่านเรียบร้อยแล้ว', 'success').then(async () => {
      const container = document.getElementById('tab-content');
      await renderManage(container);
    });
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
  const reviewerOptions = teachers.map(t => `<option value="${t.id}">${esc(t.fullName)} (${esc(t.department || 'ไม่ระบุ')})</option>`).join('');

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
        <select id="load-subject-id" class="form-select">
          ${subjectOptions}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">ห้องเรียนที่สอน *</label>
        <input type="text" id="load-classroom" class="form-input" placeholder="เช่น ม.1/1 หรือ ป.4" required/>
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

    Swal.fire('บันทึกสำเร็จ', 'มอบหมายภาระการสอนเรียบร้อยแล้ว', 'success').then(async () => {
      const container = document.getElementById('tab-content');
      await renderManage(container);
    });
  } catch (err) {
    Swal.fire('เกิดข้อผิดพลาด', err.message, 'error');
  } finally {
    showLoader(false);
  }
}

// Modal เปลี่ยนผู้ตรวจประจำวิชา
function openChangeReviewerModal(loadId, subjectCode, classroom, currentReviewerId) {
  const teachers = (state.manageData && state.manageData.teachers) || [];
  const reviewerOptions = teachers.map(t => `<option value="${t.id}" ${t.id === currentReviewerId ? 'selected' : ''}>${esc(t.fullName)} (${esc(t.department || 'ไม่ระบุ')})</option>`).join('');

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

    Swal.fire('เปลี่ยนผู้ตรวจสำเร็จ', 'ระบบได้บันทึกประวัติและปรับผู้ตรวจเรียบร้อยแล้ว', 'success').then(async () => {
      const container = document.getElementById('tab-content');
      await renderManage(container);
    });
  } catch (err) {
    Swal.fire('เกิดข้อผิดพลาด', err.message, 'error');
  } finally {
    showLoader(false);
  }
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
        <input type="text" id="sub-level" class="form-input" placeholder="เช่น ม.1 หรือ ป.5"/>
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

    Swal.fire('เพิ่มรายวิชาสำเร็จ', 'รายวิชาใหม่พร้อมสำหรับการมอบหมายภาระการสอนแล้ว', 'success').then(async () => {
      const container = document.getElementById('tab-content');
      await renderManage(container);
    });
  } catch (err) {
    Swal.fire('เกิดข้อผิดพลาด', err.message, 'error');
  } finally {
    showLoader(false);
  }
}

// --------------------------------------------------------------------------
// Modals & Actions
// --------------------------------------------------------------------------

function openSubmitModal(loadId) {
  const load = state.loads.find(l => String(l.load_id) === String(loadId));
  if (!load) return;
  state.selectedLoad = load;
  state.uploadedBase64 = null;
  state.uploadedFileName = null;

  const latestPlan = (load.plans && load.plans.length > 0) ? load.plans[load.plans.length - 1] : null;
  
  if (latestPlan && ['Pending_Head', 'Pending_Academic', 'Approved'].includes(latestPlan.status)) {
    Swal.fire({
      icon: 'info',
      title: 'ไม่สามารถแก้ไขได้',
      text: 'แผนการสอนฉบับนี้อยู่ระหว่างการตรวจรับรองหรือได้รับการรับรองแล้ว',
      confirmButtonColor: '#1e3a8a'
    });
    return;
  }

  const isRevise = latestPlan && latestPlan.status === 'Revise';
  const hasExistingPdf = latestPlan && latestPlan.drive_pdf_url;

  const content = `
    <div class="modal-header">
      <div class="modal-title">${latestPlan ? 'แก้ไขและส่งแผนการสอน' : 'ส่งแผนการสอน'}</div>
      <button class="modal-close-btn" onclick="closeModal()">${svg('x', 18)}</button>
    </div>
    <div style="margin-bottom:14px; background:#f1f5f9; padding:10px 14px; border-radius:8px; font-size:13px; border:1px solid #e2e8f0;">
      <div><strong>วิชา:</strong> ${esc(load.subject_code)} ${esc(load.subject_name)}</div>
      <div><strong>ชั้นเรียน:</strong> ${esc(load.classroom)} | <strong>ผู้ตรวจ:</strong> ${esc(load.reviewer_name)}</div>
      ${latestPlan ? `<div><strong>ฉบับปัจจุบัน:</strong> ฉบับที่ ${latestPlan.version || 1}</div>` : ''}
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
      <div class="form-group">
        <label class="form-label">รอบการส่งแผน</label>
        <select id="modal-round-id" class="form-select">
          ${state.rounds.map(r => `<option value="${r.round_id}" ${latestPlan && latestPlan.round_id === r.round_id ? 'selected' : ''}>${esc(r.title)} (กำหนดส่ง: ${formatDate(r.due_date)})</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">ชื่อหน่วยการเรียนรู้ / เรื่อง *</label>
        <input type="text" id="modal-unit-title" class="form-input" placeholder="เช่น หน่วยที่ 1 การออกแบบอัลกอริทึม" value="${latestPlan ? esc(latestPlan.unit_title || '') : ''}" required/>
      </div>
      <div class="form-group">
        <label class="form-label">จำนวนชั่วโมง *</label>
        <input type="number" id="modal-hours" class="form-input" placeholder="เช่น 4" min="1" max="100" value="${latestPlan ? esc(latestPlan.teaching_hours || '') : ''}" required/>
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
  const unitTitle = document.getElementById('modal-unit-title').value.trim();
  const hours = document.getElementById('modal-hours').value.trim();
  const roundId = document.getElementById('modal-round-id').value;
  const load = state.selectedLoad;
  const latestPlan = (load && load.plans && load.plans.length > 0) ? load.plans[load.plans.length - 1] : null;

  if (!unitTitle || !hours) {
    Swal.fire('กรุณากรอกข้อมูลให้ครบ', 'ระบุชื่อหน่วยการเรียนรู้และจำนวนชั่วโมง', 'warning');
    return;
  }

  if (!state.uploadedBase64 && (!latestPlan || !latestPlan.drive_pdf_url)) {
    Swal.fire('กรุณาแนบไฟล์ PDF', 'ต้องแนบไฟล์แผนการสอนประกอบด้วยครับ', 'warning');
    return;
  }

  closeModal();
  showLoader(true, isDraft ? 'กำลังบันทึกฉบับร่าง...' : 'กำลังประมวลผลและส่งตรวจ...');

  try {
    const payload = {
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

    Swal.fire({
      icon: 'success',
      title: isDraft ? 'บันทึกฉบับร่างแล้ว' : 'ส่งแผนการสอนสำเร็จ',
      text: isDraft ? 'คุณสามารถกลับมาแก้ไขและส่งตรวจได้ตลอดเวลา' : 'ระบบแจ้งเตือนผู้ตรวจเรียบร้อยแล้ว',
      confirmButtonColor: '#1e3a8a'
    }).then(() => {
      window.location.reload();
    });

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
                ${esc(rev.reviewer_name)} (${rev.role === 'Head' ? 'หัวหน้ากลุ่มสาระ' : rev.role === 'Academic' ? 'ฝ่ายวิชาการ' : 'ผู้สอน'})
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
        const isReviewerOrAdmin = ['Academic', 'Admin', 'Director', 'Head'].includes(state.teacher.role);

        return `
          <div style="border:1px solid #e2e8f0; border-radius:10px; padding:14px; margin-bottom:12px; background:#ffffff;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:8px;">
              <div>
                <div style="font-weight:700; font-size:14px; color:#0f172a;">
                  วันที่สอน: ${formatDate(ref.teach_date)}
                </div>
                <div style="font-size:12px; color:#64748b; margin-top:2px;">
                  มาเรียน: <strong>${ref.present_students}/${ref.total_students}</strong> คน • บรรลุ: <strong>${ref.passed_students}</strong> คน (<span style="color:#15803d; font-weight:700;">${ref.passed_pct}%</span>)
                </div>
              </div>
              <div>${lockBadge}</div>
            </div>

            <div style="background:#f8fafc; border-radius:6px; padding:10px; font-size:12.5px; color:#334155; margin-bottom:10px;">
              <div><strong>ผลการสอน:</strong> ${esc(ref.outcomes)}</div>
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
      <div style="margin-top:16px; display:flex; justify-content:space-between;">
        <button class="btn-primary" onclick='openReflectionModal("${planId}", "${esc(unitTitle)}")'>
          ${svg('plus', 14)} <span>เพิ่มวันสอนใหม่</span>
        </button>
        <button class="btn-secondary" onclick="closeModal()">ปิด</button>
      </div>
    `;

    showModal(content);

  } catch (err) {
    showLoader(false);
    Swal.fire('ข้อผิดพลาด', err.message, 'error');
  }
}

// Modal บันทึกหลังสอน (เพิ่มใหม่ หรือ แก้ไขฉบับร่าง)
function openReflectionModal(planId, unitTitle, existing) {
  const today = new Date().toISOString().split('T')[0];
  const refId = existing ? existing.reflection_id : '';
  const dateVal = existing && existing.teach_date ? new Date(existing.teach_date).toISOString().split('T')[0] : today;
  const totalVal = existing ? existing.total_students : '';
  const presentVal = existing ? existing.present_students : '';
  const passedVal = existing ? existing.passed_students : '';
  const outcomesVal = existing ? existing.outcomes : '';
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
        <label class="form-label">วันที่สอนจริง *</label>
        <input type="date" id="ref-date" class="form-input" value="${dateVal}" max="${today}" required/>
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
        <label class="form-label">ผลการจัดการเรียนรู้ *</label>
        <textarea id="ref-outcomes" class="form-textarea" rows="2" placeholder="นักเรียนส่วนใหญ่มีความเข้าใจและปฏิบัติกิจกรรมได้ตามจุดประสงค์..." required>${esc(outcomesVal)}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">ปัญหา / อุปสรรค</label>
        <textarea id="ref-problems" class="form-textarea" rows="2" placeholder="มีนักเรียนบางคนยังสับสนขั้นตอน...">${esc(problemsVal)}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">ข้อเสนอแนะ / แนวทางแก้ไข</label>
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
  const teachDate = document.getElementById('ref-date').value;
  const total = parseInt(document.getElementById('ref-total').value, 10);
  const present = parseInt(document.getElementById('ref-present').value, 10);
  const passed = parseInt(document.getElementById('ref-passed').value, 10);
  const outcomes = document.getElementById('ref-outcomes').value.trim();
  const problems = document.getElementById('ref-problems').value.trim();
  const solutions = document.getElementById('ref-solutions').value.trim();

  if (!teachDate || isNaN(total) || isNaN(present) || isNaN(passed) || !outcomes) {
    Swal.fire('กรุณากรอกข้อมูลให้ครบ', 'กรอกวันที่ ยอดนักเรียน และผลการจัดการเรียนรู้', 'warning');
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

    Swal.fire({
      icon: 'success',
      title: isLocked ? 'ยืนยันบันทึกสมบูรณ์แล้ว' : 'บันทึกฉบับร่างสำเร็จ',
      text: isLocked ? 'บันทึกถูกล็อกตามระเบียบเรียบร้อยแล้ว' : 'คุณสามารถกลับมาแก้ไขได้ตลอดเวลา',
      confirmButtonColor: '#1e3a8a'
    }).then(() => {
      // รีเฟรชแท็บบันทึกหลังสอน
      renderCurrentTab();
    });

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

        Swal.fire('ปลดล็อกเรียบร้อย', 'ครูผู้สอนสามารถเข้าไปแก้ไขบันทึกได้แล้ว', 'success').then(() => {
          openPlanReflectionsListModal(planId, unitTitle);
        });
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
    case 'Pending_Academic': return `<span class="status-badge status-pending_academic">${svg('eye', 12)} รอวิชาการรับรอง</span>`;
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
  const data = await api.getTeachingReport(
    lineUserId,
    state.reportFilterTerm || '',
    state.reportFilterRound || '',
    state.reportFilterGroup || ''
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
  const currentSubView = state.reportSubView || 'plans';

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
        <span class="metric-label">รอวิชาการตรวจ</span>
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
  if (currentSubView === 'plans') {
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

  if (termEl) state.reportFilterTerm = termEl.value;
  if (roundEl) state.reportFilterRound = roundEl.value;
  if (groupEl) state.reportFilterGroup = groupEl.value;

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
          <div class="text-muted">ส่งเมื่อ: ${esc(p.submitted_at)}</div>
        </td>
        <td style="text-align:center; white-space:nowrap;">
          <div style="display:inline-flex; gap:4px;">
            ${fileBtn}
            <button class="btn btn-secondary" onclick="printPlanSheet('${esc(p.plan_id)}')" style="padding:4px 8px; font-size:11.5px;" title="พิมพ์ทะเบียนแผนฉบับนี้">
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
          <small class="text-muted">${esc(rf.classroom)} · ครูผู้สอน: ${esc(rf.teacher_name)}</small>
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

/**
 * พิมพ์สรุปรายงานผลการติดตามการจัดทำและส่งแผนการจัดการเรียนรู้ (A4)
 */
function printSummaryReport() {
  if (!state.reportsData) return;
  const d = state.reportsData;
  const s = d.summary || {};
  const plans = d.plans || [];

  const termObj = (d.terms || []).find(t => String(t.termId) === String(state.reportFilterTerm)) || {};
  const termTitle = termObj.termName ? `ภาคเรียนที่ ${termObj.termName}` : 'ประจำภาคเรียน';

  const rows = plans.map((p, idx) => `
    <tr>
      <td style="text-align:center;">${idx + 1}</td>
      <td style="text-align:center;">${esc(p.subject_code)}</td>
      <td>${esc(p.subject_name)}</td>
      <td style="text-align:center;">${esc(p.classroom)}</td>
      <td>${esc(p.teacher_name)}</td>
      <td>${esc(p.unit_title)}</td>
      <td style="text-align:center;">${esc(p.status_label)}</td>
      <td style="text-align:center;">${p.submitted_at !== '-' ? esc(p.submitted_at.slice(0, 10)) : '-'}</td>
      <td style="text-align:center;">${p.is_overdue ? 'เกินกำหนด' : 'ปกติ'}</td>
    </tr>
  `).join('');

  const todayDateStr = formatDate(new Date().toISOString());

  const printHtml = `
    <article class="print-document">
      <header class="print-header">
        <h1>โรงเรียนบ้านห้วยตาด</h1>
        <h2>แบบรายงานผลการติดตามการจัดทำและส่งแผนการจัดการเรียนรู้</h2>
        <p>${termTitle} · ข้อมูล ณ วันที่ ${todayDateStr}</p>
      </header>

      <div style="font-size:10.5pt; margin-bottom:12px; display:flex; justify-content:space-between;">
        <div><strong>จำนวนภาระสอนทั้งหมด:</strong> ${s.totalLoads || 0} รายการ</div>
        <div><strong>ส่งแผนแล้ว:</strong> ${s.submittedPlans || 0} รายการ (${s.submissionRate || 0}%)</div>
        <div><strong>อนุมัติแล้ว:</strong> ${s.approved || 0} รายการ (${s.approvedRate || 0}%)</div>
        <div><strong>ค้างส่งเกินกำหนด:</strong> ${s.overdue || 0} รายการ</div>
      </div>

      <table class="print-table">
        <thead>
          <tr>
            <th style="width:30px;">ที่</th>
            <th style="width:70px;">รหัสวิชา</th>
            <th>ชื่อรายวิชา</th>
            <th style="width:50px;">ชั้น</th>
            <th style="width:130px;">ครูผู้สอน</th>
            <th>หน่วย / แผนการสอน</th>
            <th style="width:90px;">สถานะ</th>
            <th style="width:75px;">วันที่ส่ง</th>
            <th style="width:65px;">หมายเหตุ</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <div class="print-signature-section">
        <div class="print-signature-box">
          <p>ลงชื่อ ................................................................ ผู้รายงาน</p>
          <p>( ................................................................ )</p>
          <p>ตำแหน่ง หัวหน้างานวิชาการ / ผู้รับผิดชอบ</p>
        </div>
        <div class="print-signature-box">
          <p>ลงชื่อ ................................................................ ผู้รับรอง</p>
          <p>( ................................................................ )</p>
          <p>ผู้อำนวยการโรงเรียนบ้านห้วยตาด</p>
        </div>
      </div>

      <footer class="print-meta-footer">
        <div>พิมพ์จากระบบ Teaching Space · โรงเรียนบ้านห้วยตาด</div>
        <div>หน้า 1 จาก 1</div>
      </footer>
    </article>
  `;

  const printArea = document.getElementById('printable-area');
  printArea.innerHTML = printHtml;
  window.print();
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

  const todayDateStr = formatDate(new Date().toISOString());

  const printHtml = `
    <article class="print-document">
      <header class="print-header">
        <h1>โรงเรียนบ้านห้วยตาด</h1>
        <h2>ทะเบียนแผนการจัดการเรียนรู้และการตรวจรับรอง</h2>
        <p>รหัสแผนงาน: ${esc(plan.plan_id)} · ฉบับที่ ${plan.version}</p>
      </header>

      <div style="font-size:11.5pt; line-height:1.8; margin-bottom:18px;">
        <div><strong>รายวิชา:</strong> ${esc(plan.subject_code)} ${esc(plan.subject_name)} &nbsp;&nbsp;&nbsp; <strong>ระดับชั้น:</strong> ${esc(plan.classroom)}</div>
        <div><strong>กลุ่มสาระการเรียนรู้:</strong> ${esc(plan.group_name || '-')}</div>
        <div><strong>ครูผู้สอน:</strong> ${esc(plan.teacher_name)}</div>
        <div><strong>ชื่อหน่วยการเรียนรู้/แผน:</strong> ${esc(plan.unit_title)}</div>
        <div><strong>จำนวนชั่วโมงสอน:</strong> ${plan.teaching_hours || 0} ชั่วโมง &nbsp;&nbsp;&nbsp; <strong>รอบการส่ง:</strong> ${esc(plan.round_title)}</div>
        <div><strong>สถานะการตรวจสอบ:</strong> ${esc(plan.status_label)} &nbsp;&nbsp;&nbsp; <strong>วันที่ส่ง:</strong> ${esc(plan.submitted_at)}</div>
      </div>

      <div class="print-section-title">ผลการตรวจสอบและการประเมิน</div>
      <table class="print-table" style="margin-top:8px;">
        <thead>
          <tr>
            <th style="width:140px;">ขั้นตอนการตรวจ</th>
            <th style="width:180px;">ผู้ตรวจ</th>
            <th>ความคิดเห็นและข้อเสนอแนะ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align:center;">หัวหน้ากลุ่มสาระการเรียนรู้</td>
            <td>${esc(plan.reviewer_name)}</td>
            <td>${esc(plan.latest_review_note) || 'เห็นควรอนุมัติให้ใช้จัดการเรียนรู้ได้'}</td>
          </tr>
          <tr>
            <td style="text-align:center;">ฝ่ายวิชาการ / ผู้อำนวยการ</td>
            <td>ผู้อำนวยการโรงเรียนบ้านห้วยตาด</td>
            <td>อนุมัติให้ใช้ในการจัดการเรียนรู้ตามหลักสูตรสถานศึกษา</td>
          </tr>
        </tbody>
      </table>

      <div class="print-signature-section" style="margin-top:40px;">
        <div class="print-signature-box">
          <p>ลงชื่อ ................................................................ ผู้สอน</p>
          <p>( ${esc(plan.teacher_name)} )</p>
          <p>ตำแหน่ง ครูผู้สอน</p>
        </div>
        <div class="print-signature-box">
          <p>ลงชื่อ ................................................................ ผู้ตรวจรับรอง</p>
          <p>( ................................................................ )</p>
          <p>หัวหน้ากลุ่มสาระการเรียนรู้ / ฝ่ายวิชาการ</p>
        </div>
      </div>

      <footer class="print-meta-footer" style="margin-top:50px;">
        <div>พิมพ์จากระบบ Teaching Space · โรงเรียนบ้านห้วยตาด (${todayDateStr})</div>
        <div>หน้า 1 จาก 1</div>
      </footer>
    </article>
  `;

  const printArea = document.getElementById('printable-area');
  printArea.innerHTML = printHtml;
  window.print();
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

  const todayDateStr = formatDate(new Date().toISOString());

  const printHtml = `
    <article class="print-document">
      <header class="print-header">
        <h1>โรงเรียนบ้านห้วยตาด</h1>
        <h2>แบบบันทึกหลังการจัดกิจกรรมการเรียนรู้</h2>
        <p>กลุ่มสาระการเรียนรู้ ${esc(rf.group_name || '-')} · โรงเรียนบ้านห้วยตาด</p>
      </header>

      <div style="font-size:11.5pt; line-height:1.75; margin-bottom:14px;">
        <div><strong>รายวิชา:</strong> ${esc(rf.subject_code)} ${esc(rf.subject_name)} &nbsp;&nbsp;&nbsp; <strong>ระดับชั้น:</strong> ${esc(rf.classroom)}</div>
        <div><strong>ชื่อหน่วยการเรียนรู้:</strong> ${esc(rf.unit_title)}</div>
        <div><strong>ครูผู้สอน:</strong> ${esc(rf.teacher_name)} &nbsp;&nbsp;&nbsp; <strong>วันที่ทำการสอน:</strong> ${formatDate(rf.taught_date)}</div>
      </div>

      <div class="print-section-title">1. สถิติจำนวนนักเรียนและการบรรลุจุดประสงค์การเรียนรู้</div>
      <table class="print-table" style="text-align:center;">
        <thead>
          <tr>
            <th>นักเรียนทั้งหมด (คน)</th>
            <th>มาเรียน (คน)</th>
            <th>ขาดเรียน (คน)</th>
            <th>บรรลุจุดประสงค์ (คน)</th>
            <th>คิดเป็นร้อยละ (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${rf.total_students}</td>
            <td>${rf.present_students}</td>
            <td>${Math.max(0, rf.total_students - rf.present_students)}</td>
            <td><strong>${rf.achieved_students}</strong></td>
            <td><strong style="font-size:11pt;">${rf.achievement_percentage}%</strong></td>
          </tr>
        </tbody>
      </table>

      <div class="print-section-title">2. ผลการจัดกิจกรรมการเรียนรู้</div>
      <div style="font-size:11pt; padding:6px 10px; border:1px solid #000; min-height:60px; line-height:1.6; white-space:pre-wrap; margin-bottom:12px;">
        ${esc(rf.outcomes) || 'ไม่มีการระบุ'}
      </div>

      <div class="print-section-title">3. ปัญหาและอุปสรรค</div>
      <div style="font-size:11pt; padding:6px 10px; border:1px solid #000; min-height:50px; line-height:1.6; white-space:pre-wrap; margin-bottom:12px;">
        ${esc(rf.problems) || 'ไม่มีปัญหาและอุปสรรคในการจัดกิจกรรมการเรียนรู้'}
      </div>

      <div class="print-section-title">4. ข้อเสนอแนะและแนวทางแก้ไข / พัฒนา</div>
      <div style="font-size:11pt; padding:6px 10px; border:1px solid #000; min-height:50px; line-height:1.6; white-space:pre-wrap; margin-bottom:20px;">
        ${esc(rf.solutions) || 'ไม่มีการระบุ'}
      </div>

      <div class="print-signature-section" style="margin-top:30px;">
        <div class="print-signature-box">
          <p>ลงชื่อ ................................................................ ผู้สอน</p>
          <p>( ${esc(rf.teacher_name)} )</p>
          <p>ตำแหน่ง ครูผู้สอน</p>
        </div>
        <div class="print-signature-box">
          <p>ลงชื่อ ................................................................ ผู้รับทราบ</p>
          <p>( ................................................................ )</p>
          <p>หัวหน้ากลุ่มสาระการเรียนรู้ / หัวหน้าฝ่ายวิชาการ</p>
        </div>
      </div>

      <footer class="print-meta-footer" style="margin-top:35px;">
        <div>พิมพ์จากระบบ Teaching Space · โรงเรียนบ้านห้วยตาด (${todayDateStr})</div>
        <div>หน้า 1 จาก 1</div>
      </footer>
    </article>
  `;

  const printArea = document.getElementById('printable-area');
  printArea.innerHTML = printHtml;
  window.print();
}

/**
 * พิมพ์แบบบันทึกหลังสอนโดยตรงจากหน้าต่างรายการ (Modal)
 */
function printReflectionDirect(ref, planId, unitTitle) {
  let load = null;
  if (state.loads) {
    for (const l of state.loads) {
      if ((l.plans || []).some(p => String(p.plan_id) === String(planId))) {
        load = l;
        break;
      }
    }
  }

  const rf = {
    reflection_id: ref.reflection_id,
    group_name: load ? load.group_name : '',
    subject_code: load ? load.subject_code : '',
    subject_name: load ? load.subject_name : '',
    classroom: load ? load.classroom : '',
    unit_title: unitTitle,
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

  const todayDateStr = formatDate(new Date().toISOString());

  const printHtml = `
    <article class="print-document">
      <header class="print-header">
        <h1>โรงเรียนบ้านห้วยตาด</h1>
        <h2>แบบบันทึกหลังการจัดกิจกรรมการเรียนรู้</h2>
        <p>กลุ่มสาระการเรียนรู้ ${esc(rf.group_name || '-')} · โรงเรียนบ้านห้วยตาด</p>
      </header>

      <div style="font-size:11.5pt; line-height:1.75; margin-bottom:14px;">
        <div><strong>รายวิชา:</strong> ${esc(rf.subject_code)} ${esc(rf.subject_name)} &nbsp;&nbsp;&nbsp; <strong>ระดับชั้น:</strong> ${esc(rf.classroom)}</div>
        <div><strong>ชื่อหน่วยการเรียนรู้:</strong> ${esc(rf.unit_title)}</div>
        <div><strong>ครูผู้สอน:</strong> ${esc(rf.teacher_name)} &nbsp;&nbsp;&nbsp; <strong>วันที่ทำการสอน:</strong> ${formatDate(rf.taught_date)}</div>
      </div>

      <div class="print-section-title">1. สถิติจำนวนนักเรียนและการบรรลุจุดประสงค์การเรียนรู้</div>
      <table class="print-table" style="text-align:center;">
        <thead>
          <tr>
            <th>นักเรียนทั้งหมด (คน)</th>
            <th>มาเรียน (คน)</th>
            <th>ขาดเรียน (คน)</th>
            <th>บรรลุจุดประสงค์ (คน)</th>
            <th>คิดเป็นร้อยละ (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${rf.total_students}</td>
            <td>${rf.present_students}</td>
            <td>${Math.max(0, rf.total_students - rf.present_students)}</td>
            <td><strong>${rf.achieved_students}</strong></td>
            <td><strong style="font-size:11pt;">${rf.achievement_percentage}%</strong></td>
          </tr>
        </tbody>
      </table>

      <div class="print-section-title">2. ผลการจัดกิจกรรมการเรียนรู้</div>
      <div style="font-size:11pt; padding:6px 10px; border:1px solid #000; min-height:60px; line-height:1.6; white-space:pre-wrap; margin-bottom:12px;">
        ${esc(rf.outcomes) || 'ไม่มีการระบุ'}
      </div>

      <div class="print-section-title">3. ปัญหาและอุปสรรค</div>
      <div style="font-size:11pt; padding:6px 10px; border:1px solid #000; min-height:50px; line-height:1.6; white-space:pre-wrap; margin-bottom:12px;">
        ${esc(rf.problems) || 'ไม่มีปัญหาและอุปสรรคในการจัดกิจกรรมการเรียนรู้'}
      </div>

      <div class="print-section-title">4. ข้อเสนอแนะและแนวทางแก้ไข / พัฒนา</div>
      <div style="font-size:11pt; padding:6px 10px; border:1px solid #000; min-height:50px; line-height:1.6; white-space:pre-wrap; margin-bottom:20px;">
        ${esc(rf.solutions) || 'ไม่มีการระบุ'}
      </div>

      <div class="print-signature-section" style="margin-top:30px;">
        <div class="print-signature-box">
          <p>ลงชื่อ ................................................................ ผู้สอน</p>
          <p>( ${esc(rf.teacher_name)} )</p>
          <p>ตำแหน่ง ครูผู้สอน</p>
        </div>
        <div class="print-signature-box">
          <p>ลงชื่อ ................................................................ ผู้รับทราบ</p>
          <p>( ................................................................ )</p>
          <p>หัวหน้ากลุ่มสาระการเรียนรู้ / หัวหน้าฝ่ายวิชาการ</p>
        </div>
      </div>

      <footer class="print-meta-footer" style="margin-top:35px;">
        <div>พิมพ์จากระบบ Teaching Space · โรงเรียนบ้านห้วยตาด (${todayDateStr})</div>
        <div>หน้า 1 จาก 1</div>
      </footer>
    </article>
  `;

  const printArea = document.getElementById('printable-area');
  printArea.innerHTML = printHtml;
  window.print();
}
