/**
 * ============================================================================
 * Teaching Space Frontend Script - โรงเรียนห้วยตาดวิทยา
 * มาตรฐาน: ใช้ SVG Icons ทั้งหมด (100% Emoji-Free)
 * ============================================================================
 */

const CONFIG = {
  GAS_WEB_APP_URL: "https://script.google.com/macros/s/AKfycbyF36N-d9g9AXo4SpW8Q9q6hAgg-pAP56qMVot70V2nQQ39M0xXGjm3KcorPzIKKm5ZHQ/exec",
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
  arrowRight: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>'
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
  uploadedFileName: null
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
        <p style="font-size:13px; color:var(--text-muted); margin-bottom:24px;">ระบบส่งแผนการสอนและบันทึกหลังสอน<br/>โรงเรียนห้วยตาดวิทยา</p>
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

    html += `
      <div class="load-card">
        <div class="load-header">
          <div>
            <span class="subject-code">${esc(load.subject_code || 'วิชา')}</span>
            <div class="subject-name">${esc(load.subject_name)}</div>
            <div class="classroom-tag">ชั้น ${esc(load.classroom)} ${load.level ? '(' + esc(load.level) + ')' : ''}</div>
          </div>
          <div>${statusText}</div>
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
          <div style="display:flex; gap:8px;">
            ${latestPlan && latestPlan.drive_pdf_url ? `
              <a href="${latestPlan.drive_pdf_url}" target="_blank" class="btn-secondary" style="text-decoration:none;">
                ${svg('fileText', 14)} <span>ดู PDF</span>
              </a>
            ` : ''}
            <button class="btn-primary" onclick="openSubmitModal('${load.load_id}')">
              ${latestPlan ? `${svg('edit', 14)} <span>ส่งฉบับแก้ไข</span>` : `${svg('send', 14)} <span>ส่งแผนการสอน</span>`}
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
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
          <div style="font-size:12.5px; color:#64748b;">
            สามารถบันทึกผลการจัดการเรียนรู้รายวันได้
          </div>
          <button class="btn-primary" onclick="openReflectionModal('${item.plan_id}', '${esc(item.unit_title)}')">
            ${svg('plus', 14)} <span>เพิ่มบันทึกหลังสอน</span>
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Tab 3: รายการรอตรวจ (สำหรับหัวหน้ากลุ่มสาระ และวิชาการ)
function renderReviews(container) {
  container.innerHTML = `
    <div class="load-card" style="text-align:center; padding: 36px 16px;">
      <div class="empty-icon">${svg('fileText', 44, 1.5)}</div>
      <div style="font-size: 16px; font-weight:800; margin-bottom: 6px;">ระบบตรวจรับรองผ่าน LINE Chat</div>
      <p style="font-size: 13px; color: #64748b; max-width: 460px; margin: 0 auto 16px;">
        เมื่อครูส่งแผนการสอน ระบบจะส่งการ์ดแจ้งเตือน (Flex Message) ไปที่แชท LINE ของท่านโดยตรง พร้อมปุ่มเปิดดู PDF และปุ่มอนุมัติ/ส่งกลับแก้ไข
      </p>
      <a href="https://line.me/R/nv/chat" class="btn-primary" style="margin: 0 auto;">
        ${svg('arrowRight', 14)} <span>เปิด LINE เพื่อตรวจแผน</span>
      </a>
    </div>
  `;
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

  const content = `
    <div class="modal-header">
      <div class="modal-title">ส่งแผนการสอน</div>
      <button class="modal-close-btn" onclick="closeModal()">${svg('x', 18)}</button>
    </div>
    <div style="margin-bottom:14px; background:#f1f5f9; padding:10px 14px; border-radius:8px; font-size:13px; border:1px solid #e2e8f0;">
      <div><strong>วิชา:</strong> ${esc(load.subject_code)} ${esc(load.subject_name)}</div>
      <div><strong>ชั้นเรียน:</strong> ${esc(load.classroom)} | <strong>ผู้ตรวจ:</strong> ${esc(load.reviewer_name)}</div>
    </div>
    <form id="plan-form" onsubmit="handlePlanSubmit(event)">
      <div class="form-group">
        <label class="form-label">รอบการส่งแผน</label>
        <select id="modal-round-id" class="form-select">
          ${state.rounds.map(r => `<option value="${r.round_id}">${esc(r.title)} (กำหนดส่ง: ${formatDate(r.due_date)})</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">ชื่อหน่วยการเรียนรู้ / เรื่อง *</label>
        <input type="text" id="modal-unit-title" class="form-input" placeholder="เช่น หน่วยที่ 1 การออกแบบอัลกอริทึม" required/>
      </div>
      <div class="form-group">
        <label class="form-label">จำนวนชั่วโมง *</label>
        <input type="number" id="modal-hours" class="form-input" placeholder="เช่น 4" min="1" max="100" required/>
      </div>
      <div class="form-group">
        <label class="form-label">แนบไฟล์แผนการสอน (เฉพาะ PDF ไม่เกิน 10 MB) *</label>
        <div class="file-dropzone" onclick="document.getElementById('pdf-file-input').click()">
          <div id="dropzone-text" style="font-size:13px; color:#64748b;">
            ${svg('paperclip', 18)} <span>แตะเพื่อเลือกไฟล์ PDF</span>
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

  if (!unitTitle || !hours) {
    Swal.fire('กรุณากรอกข้อมูลให้ครบ', 'ระบุชื่อหน่วยการเรียนรู้และจำนวนชั่วโมง', 'warning');
    return;
  }

  if (!state.uploadedBase64) {
    Swal.fire('กรุณาแนบไฟล์ PDF', 'ต้องแนบไฟล์แผนการสอนประกอบด้วยครับ', 'warning');
    return;
  }

  closeModal();
  showLoader(true, isDraft ? 'กำลังบันทึกฉบับร่าง...' : 'กำลังอัปโหลดไฟล์ขึ้น Google Drive และส่งตรวจ...');

  try {
    const payload = {
      loadId: state.selectedLoad.load_id,
      roundId: roundId,
      unitTitle: unitTitle,
      teachingHours: hours,
      base64Pdf: state.uploadedBase64,
      fileName: state.uploadedFileName,
      isDraft: isDraft,
      lineUserId: state.teacher.lineUserId
    };

    await api.submitLessonPlan(payload);

    Swal.fire({
      icon: 'success',
      title: isDraft ? 'บันทึกฉบับร่างแล้ว' : 'ส่งแผนการสอนสำเร็จ',
      text: isDraft ? 'คุณสามารถกลับมาแก้ไขและส่งตรวจได้ตลอดเวลา' : 'ระบบแจ้งเตือนหัวหน้ากลุ่มสาระเรียบร้อยแล้ว',
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

// Modal บันทึกหลังสอน
function openReflectionModal(planId, unitTitle) {
  const today = new Date().toISOString().split('T')[0];

  const content = `
    <div class="modal-header">
      <div class="modal-title">บันทึกผลการจัดการเรียนรู้</div>
      <button class="modal-close-btn" onclick="closeModal()">${svg('x', 18)}</button>
    </div>
    <div style="margin-bottom:12px; font-size:13px; color:#475569; background:#f8fafc; padding:8px 12px; border-radius:8px; border:1px solid #e2e8f0;">
      <strong>หน่วย:</strong> ${esc(unitTitle)}
    </div>
    <form id="reflection-form">
      <div class="form-group">
        <label class="form-label">วันที่สอนจริง *</label>
        <input type="date" id="ref-date" class="form-input" value="${today}" max="${today}" required/>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
        <div class="form-group">
          <label class="form-label">นร. ทั้งหมด</label>
          <input type="number" id="ref-total" class="form-input" min="1" placeholder="35" required/>
        </div>
        <div class="form-group">
          <label class="form-label">มาเรียน</label>
          <input type="number" id="ref-present" class="form-input" min="0" placeholder="34" required/>
        </div>
        <div class="form-group">
          <label class="form-label">บรรลุเป้าหมาย</label>
          <input type="number" id="ref-passed" class="form-input" min="0" placeholder="30" required/>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">ผลการจัดการเรียนรู้ *</label>
        <textarea id="ref-outcomes" class="form-textarea" rows="2" placeholder="นักเรียนส่วนใหญ่มีความเข้าใจและปฏิบัติได้..." required></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">ปัญหา / อุปสรรค</label>
        <textarea id="ref-problems" class="form-textarea" rows="2" placeholder="มีนักเรียน 3 คนยังสับสนเรื่องขั้นตอน..."></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">ข้อเสนอแนะ / แนวทางแก้ไข</label>
        <textarea id="ref-solutions" class="form-textarea" rows="2" placeholder="จัดกิจกรรมทบทวนเพิ่มเติมในคาบถัดไป..."></textarea>
      </div>
      <div style="margin-top:16px;">
        <button type="button" class="btn-primary" style="width:100%; justify-content:center; padding:12px;" onclick="submitReflection('${planId}')">
          ${svg('lock', 14)} <span>ยืนยันบันทึกสมบูรณ์</span>
        </button>
      </div>
    </form>
  `;

  showModal(content);
}

async function submitReflection(planId) {
  const teachDate = document.getElementById('ref-date').value;
  const total = parseInt(document.getElementById('ref-total').value, 10);
  const present = parseInt(document.getElementById('ref-present').value, 10);
  const passed = parseInt(document.getElementById('ref-passed').value, 10);
  const outcomes = document.getElementById('ref-outcomes').value.trim();
  const problems = document.getElementById('ref-problems').value.trim();
  const solutions = document.getElementById('ref-solutions').value.trim();

  if (!teachDate || isNaN(total) || isNaN(present) || isNaN(passed) || !outcomes) {
    Swal.fire('กรุณากรอกข้อมูลให้ครบ', 'กรอกวันที่ ยอดนักเรียน และผลการสอน', 'warning');
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
  showLoader(true, 'กำลังบันทึกข้อมูล...');

  try {
    await api.saveReflection({
      planId: planId,
      teachDate: teachDate,
      totalStudents: total,
      presentStudents: present,
      passedStudents: passed,
      outcomes: outcomes,
      problems: problems,
      solutions: solutions,
      isLocked: true,
      lineUserId: state.teacher.lineUserId
    });

    Swal.fire('บันทึกสำเร็จ', 'บันทึกหลังสอนของท่านถูกจัดเก็บเรียบร้อยแล้ว', 'success');
  } catch (err) {
    Swal.fire('เกิดข้อผิดพลาด', err.message, 'error');
  } finally {
    showLoader(false);
  }
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
