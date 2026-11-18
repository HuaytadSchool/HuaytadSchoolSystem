// ===========================================================================
// admin.js — Admin portal (Redesigned Responsive UX/UI + Lazy Paginated Audit)
// ===========================================================================

let _adminData = {
  teachers: [],
  holidays: [],
  records: [],
  pendingUsers: [],
  settings: { approval_steps: 2 },
  auditLog: [],
  auditLoaded: false
};

let _adminTab = 0;            // 0=ผู้ใช้งาน 1=ประเภทลา/วันหยุด 2=ตั้งค่า 3=ประวัติการใช้งาน
let _userSearch = '';
let _userRoleFilter = 'all';
let _auditSearch = '';
let _auditCat = 'all';        // 'all' | 'leave' | 'user' | 'config'
let _auditPage = 1;
const AUDIT_PAGE_SIZE = 15;
let _auditFetchLimit = 50;

async function loadAdmin() {
  const [teachers, holidays, records, pendingUsers, settings] = await Promise.all([
    api.getAllTeachers(),
    api.getHolidays(),
    api.getAllLeaveReport(),
    api.getPendingUsers(),
    api.getSettings()
  ]);
  _adminData = {
    ..._adminData,
    teachers,
    holidays,
    records,
    pendingUsers,
    settings
  };
  if (_adminTab === 3) {
    await fetchAuditLogData(false);
  }
  renderAdmin();
}

async function fetchAuditLogData(showSpin = true) {
  if (showSpin) showLoader(true);
  try {
    const logs = await api.getAuditLog(_auditFetchLimit);
    _adminData.auditLog = logs || [];
    _adminData.auditLoaded = true;
  } catch (err) {
    swalError(err.message);
  } finally {
    if (showSpin) showLoader(false);
  }
}

window.setAdminTab = async (idx) => {
  _adminTab = idx;
  if (idx === 3 && !_adminData.auditLoaded) {
    renderAdmin();
    await fetchAuditLogData(false);
  }
  renderAdmin();
};

window.setAdminUserSearch = (v, el) => {
  const pos = el ? el.selectionStart : v.length;
  _userSearch = v;
  renderAdmin();
  const inp = document.getElementById('adm-user-search');
  if (inp) { inp.focus(); inp.setSelectionRange(pos, pos); }
};
window.setAdminUserRole = (r) => { _userRoleFilter = r; renderAdmin(); };
window.setAuditSearch = (v, el) => {
  const pos = el ? el.selectionStart : v.length;
  _auditSearch = v;
  _auditPage = 1;
  renderAdmin();
  const inp = document.getElementById('adm-audit-search');
  if (inp) { inp.focus(); inp.setSelectionRange(pos, pos); }
};
window.setAuditCat = (c) => { _auditCat = c; _auditPage = 1; renderAdmin(); };
window.setAuditPage = (p) => { _auditPage = p; renderAdmin(); };
window.reloadAuditWithLimit = async (limit) => {
  _auditFetchLimit = limit;
  _auditPage = 1;
  await fetchAuditLogData(true);
  renderAdmin();
};

const AUDIT_ACTION_LABELS = {
  leave_submit: 'ยื่นใบลา', leave_edit: 'แก้ไขใบลา', leave_approve: 'อนุมัติใบลา', leave_reject: 'ปฏิเสธใบลา', leave_cancel: 'ยกเลิกใบลา',
  leave_on_behalf: 'บันทึกใบลาแทน', user_approve: 'อนุมัติผู้ใช้', user_reject: 'ปฏิเสธผู้ใช้', user_create: 'เพิ่มผู้ใช้',
  user_update: 'แก้ไขผู้ใช้', user_delete: 'ลบผู้ใช้', quota_update: 'แก้โควตา', holiday_create: 'เพิ่มวันหยุด',
  holiday_update: 'แก้วันหยุด', holiday_delete: 'ลบวันหยุด', yearly_reset: 'ยกยอดข้ามปี', settings_save: 'ตั้งค่าระบบ'
};

function getAuditCategory(action) {
  const a = String(action || '');
  if (a.startsWith('leave')) return 'leave';
  if (a.startsWith('user')) return 'user';
  return 'config';
}

function renderAdmin() {
  const s = _adminData;
  const u = currentUser || {};
  const pendingLeaveCount = (s.records || []).filter(r => isPending(r.status)).length;
  const pendingUserCount = (s.pendingUsers || []).length;
  const tab = _adminTab;

  const adminStyles = `
    <style>
      .adm-wrap { min-height: 100vh; background: #f1f5f9; }
      .adm-shell { max-width: 1180px; margin: 0 auto; padding: 18px 20px 48px; }
      .adm-topbar {
        background: linear-gradient(135deg, #0f172a, #1e3a8a);
        color: #fff; border-radius: 18px; padding: 18px 22px;
        display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px;
        box-shadow: 0 12px 28px rgba(15, 23, 42, 0.14); margin-bottom: 18px;
      }
      .adm-brand { display: flex; align-items: center; gap: 12px; }
      .adm-brand img { width: 42px; height: 42px; border-radius: 11px; background: #fff; padding: 3px; object-fit: contain; }
      .adm-top-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
      .adm-btn-ghost {
        background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.22);
        color: #fff; padding: 8px 14px; border-radius: 10px; font-size: 13px; font-weight: 700;
        font-family: inherit; line-height: 1.2; white-space: nowrap;
        cursor: pointer; display: inline-flex; align-items: center; gap: 6px; text-decoration: none;
        transition: background .15s ease;
      }
      .adm-btn-ghost:hover { background: rgba(255,255,255,0.22); }
      .adm-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 18px; }
      .adm-kpi {
        background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px 16px;
        cursor: pointer; transition: transform .15s ease, box-shadow .15s ease;
      }
      .adm-kpi:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(15,23,42,0.06); }
      .adm-tabs {
        display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; margin-bottom: 18px;
        scrollbar-width: none;
      }
      .adm-tabs::-webkit-scrollbar { display: none; }
      .adm-tab {
        flex: none; display: inline-flex; align-items: center; gap: 7px;
        padding: 10px 16px; border-radius: 12px; border: 1px solid #e2e8f0;
        background: #fff; color: #475569; font-size: 13px; font-weight: 700; cursor: pointer;
        transition: all .15s ease;
      }
      .adm-tab.active {
        background: #2563eb; border-color: #2563eb; color: #fff;
        box-shadow: 0 6px 16px rgba(37, 99, 235, 0.25);
      }
      .adm-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 18px; box-shadow: 0 2px 10px rgba(15,23,42,0.03); }
      .adm-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      .adm-chip {
        padding: 5px 12px; border-radius: 999px; border: 1px solid #e2e8f0; background: #f8fafc;
        color: #475569; font-size: 12px; font-weight: 700; cursor: pointer;
      }
      .adm-chip.active { background: #eff6ff; border-color: #3b82f6; color: #1d4ed8; }
      .adm-user-mobile { display: none; }
      .adm-user-desktop { display: block; }
      @media (max-width: 820px) {
        .adm-kpis { grid-template-columns: repeat(2, 1fr); }
        .adm-grid2 { grid-template-columns: 1fr; }
      }
      @media (max-width: 680px) {
        .adm-shell { padding: 12px 12px 48px; }
        .adm-user-desktop { display: none; }
        .adm-user-mobile { display: flex; flex-direction: column; gap: 10px; }
      }
    </style>
  `;

  const kpis = [
    { label: 'บุคลากรในระบบ', value: s.teachers.length, sub: 'บัญชี Active', color: '#2563eb', tab: 0 },
    { label: 'รออนุมัติผู้ใช้', value: pendingUserCount, sub: pendingUserCount ? 'รอตรวจสอบสิทธิ์' : 'ไม่มีรายการค้าง', color: pendingUserCount ? '#d97706' : '#16a34a', tab: 0 },
    { label: 'วันหยุด / ประเภทลา', value: `${s.holidays.length} / ${leaveTypes.length}`, sub: 'วันหยุด · ประเภทลา', color: '#0ea5e9', tab: 1 },
    { label: 'คำขอรออนุมัติ', value: pendingLeaveCount, sub: 'ขั้นตอนอนุมัติ ' + ((s.settings && s.settings.approval_steps) || 2) + ' ขั้น', color: '#7c3aed', tab: 2 }
  ].map(k => `
    <div class="adm-kpi" onclick="setAdminTab(${k.tab})">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:12px;color:#64748b;font-weight:600">${k.label}</span>
        <span style="width:9px;height:9px;border-radius:50%;background:${k.color}"></span>
      </div>
      <div style="font-size:22px;font-weight:800;color:#0f172a">${k.value}</div>
      <div style="font-size:11px;color:#94a3b8;margin-top:2px">${k.sub}</div>
    </div>
  `).join('');

  const TABS = [
    { icon: 'user', label: 'ผู้ใช้งาน', badge: pendingUserCount },
    { icon: 'calendar', label: 'ประเภทลา & วันหยุด', badge: 0 },
    { icon: 'settings', label: 'ตั้งค่าระบบ & เอกสาร', badge: 0 },
    { icon: 'list', label: 'ประวัติการใช้งาน', badge: 0 }
  ];

  const tabsHtml = TABS.map((t, i) => `
    <button class="adm-tab ${tab === i ? 'active' : ''}" onclick="setAdminTab(${i})">
      ${svg(t.icon, 15)}
      <span>${t.label}</span>
      ${t.badge ? `<span style="background:#ef4444;color:#fff;font-size:10px;padding:1px 6px;border-radius:999px">${t.badge}</span>` : ''}
    </button>
  `).join('');

  // ---- TAB 0: ผู้ใช้งาน ----
  const pendingRows = (s.pendingUsers || []).map(pu => {
    const roleSel = `<select id="pend-role-${esc(pu.id)}" style="padding:6px 8px;border:1px solid #e2e8f0;border-radius:8px;font-size:12px">
      <option value="Teacher">ครู (Teacher)</option><option value="HR">ฝ่ายบุคคล (HR)</option>
      <option value="Director">ผู้อำนวยการ (Director)</option><option value="Admin">ผู้ดูแลระบบ (Admin)</option></select>`;
    return `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #fef3c7;flex-wrap:wrap">
      <div style="width:36px;height:36px;border-radius:10px;background:${avatarColor(pu.id)};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;color:#fff">${initials(pu.name)}</div>
      <div style="flex:1;min-width:160px">
        <div style="font-size:13.5px;font-weight:700">${esc(pu.prefix || '')}${esc(pu.name)} ${esc(pu.surname || '')}</div>
        <div style="font-size:11.5px;color:#64748b">${esc(pu.position || '-')} · ${esc(pu.department || '-')} · ${esc(pu.phone || '-')}</div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
        <span style="font-size:11px;color:#94a3b8">สิทธิ์</span>${roleSel}
        <div onclick="approvePendingUser('${esc(pu.id)}')" class="dc-hover" style="cursor:pointer;background:#16a34a;color:#fff;padding:7px 14px;border-radius:8px;font-size:12px;font-weight:700">อนุมัติ</div>
        <div onclick="rejectPendingUser('${esc(pu.id)}')" class="dc-hover" style="cursor:pointer;background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;padding:7px 14px;border-radius:8px;font-size:12px;font-weight:700">ปฏิเสธ</div>
      </div>
    </div>`;
  }).join('');

  const pendingBlock = pendingUserCount ? `
    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:16px;padding:16px 18px;margin-bottom:16px">
      <div style="font-size:14px;font-weight:800;color:#b45309;margin-bottom:6px">ผู้ใช้งานรออนุมัติ · ${pendingUserCount} รายการ</div>
      ${pendingRows}
    </div>` : '';

  const qUser = _userSearch.trim().toLowerCase();
  const filteredTeachers = (s.teachers || []).filter(t => {
    if (_userRoleFilter !== 'all' && t.role !== _userRoleFilter) return false;
    if (!qUser) return true;
    const text = `${t.prefix || ''}${t.name} ${t.surname || ''} ${t.position || ''} ${t.department || ''}`.toLowerCase();
    return text.includes(qUser);
  });

  const userTableRows = filteredTeachers.map(t => {
    const rm = ROLE_META[t.role] || { label: t.role, bg: '#f1f5f9', color: '#64748b' };
    return `<tr class="dc-row">
      <td style="padding:10px 8px;border-bottom:1px solid #f1f5f9;font-weight:700">${esc(t.prefix || '')}${esc(t.name)} ${esc(t.surname || '')}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #f1f5f9;color:#64748b">${esc(t.position || '-')}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #f1f5f9;color:#64748b">${esc(t.department || '-')}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #f1f5f9"><span style="font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;background:${rm.bg};color:${rm.color}">${rm.label}</span></td>
      <td style="padding:10px 8px;border-bottom:1px solid #f1f5f9;text-align:right;white-space:nowrap">
        <span onclick="openUserModal('${esc(t.id)}')" style="cursor:pointer;color:#2563eb;font-weight:700;font-size:12px;margin-right:12px">แก้ไข</span>
        <span onclick="removeUser('${esc(t.id)}')" style="cursor:pointer;color:#94a3b8;font-weight:700;font-size:12px">ลบ</span>
      </td>
    </tr>`;
  }).join('');

  const userMobileCards = filteredTeachers.map(t => {
    const rm = ROLE_META[t.role] || { label: t.role, bg: '#f1f5f9', color: '#64748b' };
    return `<div style="border:1px solid #e2e8f0;border-radius:12px;padding:12px;display:flex;align-items:center;justify-content:space-between;gap:10px;background:#fff">
      <div style="min-width:0">
        <div style="font-size:14px;font-weight:700;color:#0f172a">${esc(t.prefix || '')}${esc(t.name)} ${esc(t.surname || '')}</div>
        <div style="font-size:12px;color:#64748b;margin-top:2px">${esc(t.position || '-')} · ${esc(t.department || '-')}</div>
        <span style="display:inline-block;margin-top:6px;font-size:11px;font-weight:700;padding:2px 9px;border-radius:999px;background:${rm.bg};color:${rm.color}">${rm.label}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;flex:none">
        <button onclick="openUserModal('${esc(t.id)}')" style="border:1px solid #bfdbfe;background:#eff6ff;color:#2563eb;border-radius:8px;padding:5px 10px;font-size:11.5px;font-weight:700;cursor:pointer">แก้ไข</button>
        <button onclick="removeUser('${esc(t.id)}')" style="border:1px solid #fee2e2;background:#fef2f2;color:#dc2626;border-radius:8px;padding:5px 10px;font-size:11.5px;font-weight:700;cursor:pointer">ลบ</button>
      </div>
    </div>`;
  }).join('');

  const roleFilters = [
    ['all', 'ทั้งหมด'], ['Teacher', 'ครู'], ['HR', 'บุคคล'], ['Director', 'ผอ.'], ['Admin', 'Admin']
  ].map(([val, lbl]) => `<button class="adm-chip ${_userRoleFilter === val ? 'active' : ''}" onclick="setAdminUserRole('${val}')">${lbl}</button>`).join('');

  const tab0 = `
    ${pendingBlock}
    <div class="adm-card">
      <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px">
        <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;flex:1;min-width:220px">
          <input id="adm-user-search" type="text" class="dc-input" placeholder="ค้นหาชื่อ, ตำแหน่ง, กลุ่มสาระ..." value="${esc(_userSearch)}" oninput="setAdminUserSearch(this.value, this)" style="max-width:260px;padding:8px 12px"/>
          <div style="display:flex;gap:6px;flex-wrap:wrap">${roleFilters}</div>
        </div>
        <div onclick="openUserModal()" class="dc-hover" style="cursor:pointer;background:#2563eb;color:#fff;padding:9px 16px;border-radius:10px;font-size:13px;font-weight:700;white-space:nowrap">+ เพิ่มผู้ใช้งาน</div>
      </div>

      <div class="adm-user-desktop" style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead><tr>
            <th style="text-align:left;padding:9px 8px;color:#64748b;font-size:11px;border-bottom:2px solid #e2e8f0">ชื่อ-สกุล</th>
            <th style="text-align:left;padding:9px 8px;color:#64748b;font-size:11px;border-bottom:2px solid #e2e8f0">ตำแหน่ง</th>
            <th style="text-align:left;padding:9px 8px;color:#64748b;font-size:11px;border-bottom:2px solid #e2e8f0">กลุ่มสาระ/ฝ่าย</th>
            <th style="text-align:left;padding:9px 8px;color:#64748b;font-size:11px;border-bottom:2px solid #e2e8f0">สิทธิ์</th>
            <th style="text-align:right;padding:9px 8px;color:#64748b;font-size:11px;border-bottom:2px solid #e2e8f0">จัดการ</th>
          </tr></thead>
          <tbody>${userTableRows || '<tr><td colspan="5" style="padding:20px;text-align:center;color:#94a3b8">ไม่พบข้อมูลผู้ใช้งาน</td></tr>'}</tbody>
        </table>
      </div>
      <div class="adm-user-mobile">${userMobileCards || '<div style="padding:20px;text-align:center;color:#94a3b8">ไม่พบข้อมูลผู้ใช้งาน</div>'}</div>
    </div>`;

  // ---- TAB 1: ประเภทการลา & วันหยุด ----
  const typeConfig = leaveTypes.map(lt => `
    <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #f1f5f9">
      <div style="width:11px;height:11px;border-radius:3px;background:${lt.color_code}"></div>
      <div style="flex:1;font-size:13.5px;font-weight:600">${esc(lt.name)}</div>
      <input type="number" value="${lt.quota_days}" onchange="setTypeQuota('${esc(lt.id)}',this.value)" style="width:66px;padding:6px 8px;border:1px solid #e2e8f0;border-radius:8px;font-size:13px;text-align:center"/>
      <div style="font-size:11.5px;color:#94a3b8">วัน/ปี</div>
    </div>`).join('');

  const holidayRows = s.holidays.slice().sort((a, b) => normDate(a.date).localeCompare(normDate(b.date))).map(h => `
    <div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid #f1f5f9;flex-wrap:wrap">
      ${thaiDate('hd-' + h.id, normDate(h.date), `var v=document.getElementById('hd-${esc(h.id)}').value; if(v) saveHoliday('${esc(h.id)}','date',v)`)}
      <input type="text" value="${esc(h.name)}" onchange="saveHoliday('${esc(h.id)}','name',this.value)" style="flex:1;min-width:140px;padding:6px 9px;border:1px solid #e2e8f0;border-radius:7px;font-size:12.5px"/>
      <span onclick="deleteHolidayRow('${esc(h.id)}')" style="cursor:pointer;color:#cbd5e1;display:inline-flex;padding:4px">${svg('x', 15)}</span>
    </div>`).join('');

  const tab1 = `
    <div class="adm-grid2">
      <div class="adm-card">
        <div style="font-size:16px;font-weight:800;margin-bottom:4px">ประเภทการลาและโควตา</div>
        <div style="font-size:12.5px;color:#64748b;margin-bottom:14px">แก้ไขจำนวนวันลาสูงสุดต่อปีของแต่ละประเภท</div>
        ${typeConfig}
      </div>
      <div class="adm-card">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:14px">
          <div>
            <div style="font-size:16px;font-weight:800">วันหยุดราชการ / โรงเรียน</div>
            <div style="font-size:12.5px;color:#64748b">${s.holidays.length} วันหยุด</div>
          </div>
          <div onclick="addHoliday()" class="dc-hover" style="cursor:pointer;background:#2563eb;color:#fff;padding:8px 14px;border-radius:9px;font-size:12.5px;font-weight:700">+ เพิ่มวันหยุด</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px">${holidayRows || '<div style="color:#94a3b8;font-size:13px;text-align:center;padding:20px">ยังไม่มีวันหยุด</div>'}</div>
      </div>
    </div>`;

  // ---- TAB 2: ตั้งค่าระบบ & เอกสาร ----
  const steps = (s.settings && s.settings.approval_steps) ? s.settings.approval_steps : 2;
  let modCfg = { leave: 'active', teaching: 'active', note: '' };
  if (s.settings && s.settings.module_statuses) {
    try {
      modCfg = typeof s.settings.module_statuses === 'string'
        ? JSON.parse(s.settings.module_statuses)
        : s.settings.module_statuses;
    } catch (e) {}
  }
  const modOpt = (cur, v, lbl) => `<option value="${v}" ${(cur || 'active') === v ? 'selected' : ''}>${lbl}</option>`;

  const tab2 = `
    <div class="adm-card" style="margin-bottom:16px">
      <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px">
        <div>
          <div style="font-size:16px;font-weight:800">สถานะโมดูล Super App (เปิด/ปิดปรับปรุงระบบ)</div>
          <div style="font-size:12.5px;color:#64748b">ควบคุมการเข้าใช้งานแต่ละระบบบนหน้าหลัก 4 ฝ่ายของโรงเรียน</div>
        </div>
      </div>
      <div class="adm-grid2" style="margin-bottom:12px">
        <div style="border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;gap:10px">
          <div>
            <div style="font-size:13.5px;font-weight:700">ระบบจัดการการลา</div>
            <div style="font-size:11.5px;color:#64748b">ฝ่ายบริหารงานบุคคล</div>
          </div>
          <select id="mod-leave-status" class="dc-input" style="width:auto;min-width:135px;padding:7px 10px">
            ${modOpt(modCfg.leave, 'active', 'เปิดใช้งาน')}
            ${modOpt(modCfg.leave, 'maintenance', 'ปิดปรับปรุง')}
            ${modOpt(modCfg.leave, 'disabled', 'ปิดการใช้งาน')}
          </select>
        </div>
        <div style="border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;gap:10px">
          <div>
            <div style="font-size:13.5px;font-weight:700">ระบบส่งแผนการสอน</div>
            <div style="font-size:11.5px;color:#64748b">ฝ่ายบริหารวิชาการ</div>
          </div>
          <select id="mod-teaching-status" class="dc-input" style="width:auto;min-width:135px;padding:7px 10px">
            ${modOpt(modCfg.teaching, 'active', 'เปิดใช้งาน')}
            ${modOpt(modCfg.teaching, 'maintenance', 'ปิดปรับปรุง')}
            ${modOpt(modCfg.teaching, 'disabled', 'ปิดการใช้งาน')}
          </select>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center">
        <input id="mod-maint-note" class="dc-input" value="${esc(modCfg.note || '')}" placeholder="ข้อความแจ้งเมื่อปิดปรับปรุง (เช่น ปิดปรับปรุง 19:00 - 20:00 น.)" style="flex:1;min-width:220px"/>
        <div onclick="saveModuleSettings()" class="dc-hover" style="cursor:pointer;background:#0f172a;color:#fff;padding:10px 18px;border-radius:9px;font-size:13px;font-weight:700;white-space:nowrap">บันทึกสถานะระบบ</div>
      </div>
    </div>

    <div class="adm-grid2" style="margin-bottom:16px">
      <div class="adm-card">
        <div style="font-size:16px;font-weight:800;margin-bottom:4px">ขั้นตอนการอนุมัติใบลา</div>
        <div style="font-size:12.5px;color:#64748b;margin-bottom:14px">กำหนดว่าใบลาต้องผ่านกี่ขั้นตอนก่อนถือว่าอนุมัติ</div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
          <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;padding:12px;border:2px solid ${steps==1?'#2563eb':'#e2e8f0'};border-radius:11px;background:${steps==1?'#eff6ff':'#fff'}">
            <input type="radio" name="approval_steps" value="1" ${steps==1?'checked':''} style="margin-top:2px;accent-color:#2563eb">
            <div>
              <div style="font-size:13.5px;font-weight:700">1 ขั้นตอน</div>
              <div style="font-size:12px;color:#64748b;margin-top:2px">ครู → HR อนุมัติ → แจ้งผลครูทันที</div>
            </div>
          </label>
          <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;padding:12px;border:2px solid ${steps!=1?'#2563eb':'#e2e8f0'};border-radius:11px;background:${steps!=1?'#eff6ff':'#fff'}">
            <input type="radio" name="approval_steps" value="2" ${steps!=1?'checked':''} style="margin-top:2px;accent-color:#2563eb">
            <div>
              <div style="font-size:13.5px;font-weight:700">2 ขั้นตอน <span style="font-size:11px;font-weight:600;background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:999px;margin-left:4px">ค่าเริ่มต้น</span></div>
              <div style="font-size:12px;color:#64748b;margin-top:2px">ครู → HR อนุมัติ → ผู้อำนวยการอนุมัติ → แจ้งผลครู</div>
            </div>
          </label>
        </div>
        <div onclick="saveSystemSettings()" class="dc-hover" style="cursor:pointer;display:inline-block;background:#2563eb;color:#fff;padding:10px 20px;border-radius:9px;font-size:13px;font-weight:700">บันทึกขั้นตอนอนุมัติ</div>
      </div>

      <div class="adm-card">
        <div style="font-size:16px;font-weight:800;margin-bottom:4px">ข้อมูลผู้ลงนามในใบลา</div>
        <div style="font-size:12.5px;color:#64748b;margin-bottom:14px">ชื่อและตำแหน่งที่ปรากฏในเอกสารใบลาเมื่อสั่งพิมพ์</div>
        <div style="display:flex;flex-direction:column;gap:12px">
          <div>
            <div class="dc-label">ชื่อ-นามสกุล ผู้อำนวยการ (ลงนามอนุมัติ)</div>
            <input id="cfg-director" class="dc-input" value="${esc(DIRECTOR_NAME)}" placeholder="เช่น นายปนิก สิทธิ">
          </div>
          <div>
            <div class="dc-label">ชื่อ-นามสกุล ผู้ตรวจสอบ/ผู้จัดทำ (ฝ่ายบุคคล)</div>
            <input id="cfg-preparer" class="dc-input" value="${esc(PREPARER_NAME)}" placeholder="เช่น นางสาวจิราพา สอนสุภาพ">
          </div>
          <div>
            <div class="dc-label">ตำแหน่ง ผู้ตรวจสอบ/ผู้จัดทำ (ฝ่ายบุคคล)</div>
            <input id="cfg-preparer-pos" class="dc-input" value="${esc(PREPARER_POSITION)}" placeholder="เช่น ครูโรงเรียนบ้านห้วยตาด">
          </div>
          <div>
            <div onclick="saveDocConfig()" class="dc-hover" style="cursor:pointer;display:inline-block;background:#2563eb;color:#fff;padding:10px 20px;border-radius:9px;font-size:13px;font-weight:700">บันทึกผู้ลงนาม</div>
          </div>
        </div>
      </div>
    </div>

    <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:16px;padding:18px 20px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px">
      <div>
        <div style="font-size:14.5px;font-weight:800;color:#b91c1c">พื้นที่อันตราย · ยกยอดวันลาข้ามปีงบประมาณ</div>
        <div style="font-size:12.5px;color:#7f1d1d;margin-top:3px">รีเซ็ตวันลาที่ใช้ไปของบุคลากรทุกคนกลับเป็น 0 วัน (ใช้ต้นปีงบประมาณใหม่ 1 ตุลาคม ไม่สามารถย้อนกลับได้)</div>
      </div>
      <div onclick="confirmYearlyReset()" class="dc-hover" style="cursor:pointer;background:#dc2626;color:#fff;padding:10px 18px;border-radius:10px;font-size:13px;font-weight:700;white-space:nowrap">ยกยอดวันลาข้ามปี (Reset)</div>
    </div>`;

  // ---- TAB 3: ประวัติการใช้งาน (Lazy Load + Filter + Pagination) ----
  const actorName = (actor) => {
    if (actor === 'Admin') return 'ผู้ดูแลระบบ';
    if (actor === 'HR') return 'ฝ่ายบุคคล';
    const t = s.teachers.find(x => x.id == actor);
    return t ? `${t.prefix || ''}${t.name} ${t.surname || ''}`.trim() : (actor || '-');
  };

  let tab3 = '';
  if (!s.auditLoaded) {
    tab3 = `<div class="adm-card" style="text-align:center;padding:36px;color:#64748b">กำลังโหลดประวัติการใช้งานล่าสุด...</div>`;
  } else {
    const qAudit = _auditSearch.trim().toLowerCase();
    const filteredAudit = (s.auditLog || []).filter(a => {
      if (_auditCat !== 'all' && getAuditCategory(a.action) !== _auditCat) return false;
      if (!qAudit) return true;
      const label = AUDIT_ACTION_LABELS[a.action] || a.action || '';
      const who = actorName(a.actor);
      return (`${who} ${label} ${a.detail || ''}`).toLowerCase().includes(qAudit);
    });

    const totalPages = Math.max(1, Math.ceil(filteredAudit.length / AUDIT_PAGE_SIZE));
    if (_auditPage > totalPages) _auditPage = totalPages;
    const startIdx = (_auditPage - 1) * AUDIT_PAGE_SIZE;
    const pageRows = filteredAudit.slice(startIdx, startIdx + AUDIT_PAGE_SIZE);

    const auditRowsHtml = pageRows.map(a => {
      const label = AUDIT_ACTION_LABELS[a.action] || a.action;
      const isLeave = String(a.action).indexOf('leave') === 0;
      const color = a.action === 'yearly_reset' || String(a.action).indexOf('delete') > -1 || a.action === 'leave_reject'
        ? '#b91c1c' : (isLeave ? '#2563eb' : '#0369a1');
      return `<tr class="dc-row">
        <td style="padding:9px 8px;border-bottom:1px solid #f1f5f9;color:#64748b;white-space:nowrap;font-size:12px">${esc(fmtAuditTime(a.timestamp))}</td>
        <td style="padding:9px 8px;border-bottom:1px solid #f1f5f9;font-weight:600;white-space:nowrap">${esc(actorName(a.actor))}</td>
        <td style="padding:9px 8px;border-bottom:1px solid #f1f5f9"><span style="font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;background:${color}18;color:${color};white-space:nowrap">${esc(label)}</span></td>
        <td style="padding:9px 8px;border-bottom:1px solid #f1f5f9;color:#475569;font-size:12.5px">${esc(a.detail || '')}</td>
      </tr>`;
    }).join('');

    const catChips = [
      ['all', 'ทั้งหมด'],
      ['leave', 'ใบลา'],
      ['user', 'ผู้ใช้งาน'],
      ['config', 'ตั้งค่า/วันหยุด']
    ].map(([c, lbl]) => `<button class="adm-chip ${_auditCat === c ? 'active' : ''}" onclick="setAuditCat('${c}')">${lbl}</button>`).join('');

    const limitBtns = [50, 100, 200].map(lim => `
      <button class="adm-chip ${_auditFetchLimit === lim ? 'active' : ''}" onclick="reloadAuditWithLimit(${lim})">${lim} ล่าสุด</button>
    `).join('');

    tab3 = `
      <div class="adm-card">
        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px">
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;flex:1;min-width:220px">
            <input id="adm-audit-search" type="text" class="dc-input" placeholder="ค้นหาชื่อผู้ทำรายการ หรือรายละเอียด..." value="${esc(_auditSearch)}" oninput="setAuditSearch(this.value, this)" style="max-width:260px;padding:8px 12px"/>
            <div style="display:flex;gap:6px;flex-wrap:wrap">${catChips}</div>
          </div>
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
            <span style="font-size:11.5px;color:#64748b">ดึงข้อมูล:</span>
            ${limitBtns}
          </div>
        </div>

        <div style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <thead><tr>
              <th style="text-align:left;padding:9px 8px;color:#64748b;font-size:11px;border-bottom:2px solid #e2e8f0">เวลา</th>
              <th style="text-align:left;padding:9px 8px;color:#64748b;font-size:11px;border-bottom:2px solid #e2e8f0">ผู้ทำรายการ</th>
              <th style="text-align:left;padding:9px 8px;color:#64748b;font-size:11px;border-bottom:2px solid #e2e8f0">การกระทำ</th>
              <th style="text-align:left;padding:9px 8px;color:#64748b;font-size:11px;border-bottom:2px solid #e2e8f0">รายละเอียด</th>
            </tr></thead>
            <tbody>${auditRowsHtml || '<tr><td colspan="4" style="padding:24px;text-align:center;color:#94a3b8">ไม่พบรายการที่ตรงเงื่อนไข</td></tr>'}</tbody>
          </table>
        </div>

        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-top:14px;padding-top:12px;border-top:1px solid #f1f5f9">
          <div style="font-size:12px;color:#64748b">
            แสดง ${filteredAudit.length ? (startIdx + 1) : 0}–${Math.min(startIdx + AUDIT_PAGE_SIZE, filteredAudit.length)} จาก ${filteredAudit.length} รายการ (หน้า ${_auditPage}/${totalPages})
          </div>
          <div style="display:flex;gap:6px">
            <button ${_auditPage <= 1 ? 'disabled' : ''} onclick="setAuditPage(${_auditPage - 1})" class="adm-chip" style="${_auditPage <= 1 ? 'opacity:.45;cursor:default' : ''}">ก่อนหน้า</button>
            <button ${_auditPage >= totalPages ? 'disabled' : ''} onclick="setAuditPage(${_auditPage + 1})" class="adm-chip" style="${_auditPage >= totalPages ? 'opacity:.45;cursor:default' : ''}">ถัดไป</button>
          </div>
        </div>
      </div>`;
  }

  document.getElementById('view-admin').innerHTML = `
    ${adminStyles}
    <div class="adm-wrap">
      <div class="adm-shell">
        <header class="adm-topbar">
          <div class="adm-brand">
            ${SCHOOL_LOGO_URL ? `<img src="${SCHOOL_LOGO_URL}" alt="Logo">` : ''}
            <div>
              <div style="font-size:16px;font-weight:800">ศูนย์ผู้ดูแลระบบ · โรงเรียนบ้านห้วยตาด</div>
              <div style="font-size:12px;opacity:.8">${esc(u.prefix || '')}${esc(u.name || 'Admin')} ${esc(u.surname || '')}</div>
            </div>
          </div>
          <div class="adm-top-actions">
            <a href="../index.html" class="adm-btn-ghost ht-home-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> หน้าหลักโรงเรียน</a>
            ${u.id === 'ADMIN' ? '' : `<button onclick="backFromAdmin()" class="adm-btn-ghost">${svg('user', 14)} หน้าระบบลาของฉัน</button>`}
            <button onclick="logout()" class="adm-btn-ghost" style="border-color:rgba(248,113,113,0.45);background:rgba(239,68,68,0.16);color:#fecaca">${svg('logout', 14)} ออกจากระบบ</button>
          </div>
        </header>

        <section class="adm-kpis">${kpis}</section>
        <nav class="adm-tabs">${tabsHtml}</nav>
        <section>${[tab0, tab1, tab2, tab3][tab] || ''}</section>
      </div>
    </div>`;
}

// Audit timestamp (ISO) → Thai date + time
function fmtAuditTime(ts) {
  if (!ts) return '-';
  const d = new Date(ts);
  if (isNaN(d)) return String(ts);
  const time = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  return `${fmtShort(toISO(d.getFullYear(), d.getMonth(), d.getDate()))} ${time}`;
}

window.approvePendingUser = async (id) => {
  const role = (document.getElementById('pend-role-' + id) || {}).value || 'Teacher';
  showLoader(true);
  try { await api.approveUser(id, role); toast('อนุมัติผู้ใช้งานแล้ว'); await loadAdmin(); }
  catch (err) { swalError(err.message); } finally { showLoader(false); }
};
window.rejectPendingUser = async (id) => {
  const c = await Swal.fire({ title: 'ปฏิเสธผู้ใช้งานนี้?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'ปฏิเสธ', cancelButtonText: 'ยกเลิก' });
  if (!c.isConfirmed) return;
  showLoader(true);
  try { await api.rejectUser(id); toast('ปฏิเสธผู้ใช้งานแล้ว'); await loadAdmin(); }
  catch (err) { swalError(err.message); } finally { showLoader(false); }
};
window.setTypeQuota = async (id, val) => {
  try { await api.updateLeaveTypeQuota(id, val); const t = leaveTypes.find(x => x.id == id); if (t) t.quota_days = Number(val) || 0; toast('บันทึกโควตาแล้ว'); }
  catch (err) { swalError(err.message); }
};
window.addHoliday = async () => {
  showLoader(true);
  try { await api.saveHoliday({ date: todayISO(), name: 'วันหยุดใหม่' }); await loadAdmin(); }
  catch (err) { swalError(err.message); } finally { showLoader(false); }
};
window.saveHoliday = async (id, field, val) => {
  try { await api.saveHoliday({ id, [field]: val }); const h = _adminData.holidays.find(x => x.id == id); if (h) h[field] = val; toast('บันทึกวันหยุดแล้ว'); }
  catch (err) { swalError(err.message); }
};
window.deleteHolidayRow = async (id) => {
  showLoader(true);
  try { await api.deleteHoliday(id); await loadAdmin(); }
  catch (err) { swalError(err.message); } finally { showLoader(false); }
};
window.removeUser = async (id) => {
  const c = await Swal.fire({ title: 'ยืนยันการลบผู้ใช้งาน?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'ลบ', cancelButtonText: 'ยกเลิก' });
  if (!c.isConfirmed) return;
  showLoader(true);
  try { await api.deleteTeacher(id); toast('ลบผู้ใช้งานแล้ว'); await loadAdmin(); }
  catch (err) { swalError(err.message); } finally { showLoader(false); }
};
window.saveDocConfig = async () => {
  const director_name = document.getElementById('cfg-director').value.trim();
  const preparer_name = document.getElementById('cfg-preparer').value.trim();
  const preparer_position = document.getElementById('cfg-preparer-pos').value.trim();
  showLoader(true);
  try {
    await api.saveSettings({ director_name, preparer_name, preparer_position });
    DIRECTOR_NAME = director_name;
    PREPARER_NAME = preparer_name;
    PREPARER_POSITION = preparer_position;
    toast('บันทึกข้อมูลผู้ลงนามเรียบร้อย');
  } catch (err) { swalError(err.message); } finally { showLoader(false); }
};
window.saveSystemSettings = async () => {
  const selected = document.querySelector('input[name="approval_steps"]:checked');
  if (!selected) return;
  const steps = parseInt(selected.value);
  showLoader(true);
  try {
    await api.saveSettings({ approval_steps: steps });
    _adminData.settings = { ..._adminData.settings, approval_steps: steps };
    renderAdmin();
    toast(`บันทึกแล้ว: ${steps === 1 ? '1 ขั้นตอน (HR → ครู)' : '2 ขั้นตอน (HR → ผอ. → ครู)'}`);
  } catch (err) { swalError(err.message); } finally { showLoader(false); }
};
window.saveModuleSettings = async () => {
  const module_statuses = {
    leave: document.getElementById('mod-leave-status').value,
    teaching: document.getElementById('mod-teaching-status').value,
    note: document.getElementById('mod-maint-note').value.trim()
  };
  showLoader(true);
  try {
    await api.saveSettings({ module_statuses: JSON.stringify(module_statuses) });
    _adminData.settings = { ..._adminData.settings, module_statuses };
    try { localStorage.setItem('ht_module_statuses', JSON.stringify(module_statuses)); } catch (e) {}
    renderAdmin();
    toast('บันทึกสถานะเปิด-ปิดระบบเรียบร้อย');
  } catch (err) { swalError(err.message); } finally { showLoader(false); }
};
window.confirmYearlyReset = async () => {
  const c = await Swal.fire({
    title: 'ยืนยันการยกยอดวันลาข้ามปี', icon: 'warning',
    html: `การดำเนินการนี้จะรีเซ็ตวันลาที่ใช้ไปของบุคลากรทุกคน (${_adminData.teachers.length} คน) กลับเป็น 0 วัน`,
    showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'ยืนยันรีเซ็ต', cancelButtonText: 'ยกเลิก'
  });
  if (!c.isConfirmed) return;
  showLoader(true);
  try { await api.yearlyReset(); toast('ยกยอดวันลาข้ามปีเรียบร้อยแล้ว'); }
  catch (err) { swalError(err.message); } finally { showLoader(false); }
};

// ---- Admin: user CRUD modal ----
window.openUserModal = (id) => {
  const u = id ? _adminData.teachers.find(x => x.id == id) : null;
  const roleOpt = (v, label) => `<option value="${v}" ${u && u.role === v ? 'selected' : ''}>${label}</option>`;
  const inner = `
    <div style="width:100vw;max-width:420px;background:#fff;border-radius:16px;padding:22px">
      <div style="font-size:16px;font-weight:800;margin-bottom:16px">${u ? 'แก้ไขข้อมูลผู้ใช้งาน' : 'เพิ่มผู้ใช้งานใหม่'}</div>
      <input type="hidden" id="uf-id" value="${u ? esc(u.id) : ''}"/>
      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:18px">
        <div style="display:flex;gap:10px">
          <div style="width:132px"><div class="dc-label">คำนำหน้า</div>${prefixSelectHtml('uf', u ? (u.prefix || '') : '')}</div>
          <div style="flex:1"><div class="dc-label">ชื่อ</div><input type="text" id="uf-name" class="dc-input" value="${u ? esc(u.name) : ''}"/></div>
          <div style="flex:1"><div class="dc-label">นามสกุล</div><input type="text" id="uf-surname" class="dc-input" value="${u ? esc(u.surname || '') : ''}"/></div>
        </div>
        <div style="display:flex;gap:10px">
          <div style="flex:1"><div class="dc-label">ตำแหน่ง</div>${positionSelectHtml('uf', u ? (u.position || '') : 'ครู')}</div>
          <div style="flex:1"><div class="dc-label">กลุ่มสาระ/ฝ่าย</div>${departmentSelectHtml('uf', u ? (u.department || '') : 'ปฐมวัย')}</div>
        </div>
        <div><div class="dc-label">อีเมล (ถ้ามี)</div><input type="email" id="uf-email" class="dc-input" value="${u ? esc(u.email || '') : ''}"/></div>
        <div><div class="dc-label">สิทธิ์การใช้งาน</div>
          <select id="uf-role" class="dc-input">
            ${roleOpt('Teacher', 'ครู (Teacher)')}${roleOpt('HR', 'ฝ่ายบุคคล (HR)')}${roleOpt('Director', 'ผู้อำนวยการ (Director)')}${roleOpt('Admin', 'ผู้ดูแลระบบ (Admin)')}
          </select>
        </div>
      </div>
      <div style="display:flex;gap:8px">
        <div onclick="closeModal()" class="dc-hover" style="cursor:pointer;flex:1;text-align:center;padding:11px;border:1px solid #e2e8f0;border-radius:10px;font-size:13px;font-weight:700;color:#334155">ยกเลิก</div>
        <div onclick="saveUser()" class="dc-hover" style="cursor:pointer;flex:1;text-align:center;background:#2563eb;color:#fff;padding:11px;border-radius:10px;font-size:13px;font-weight:700">บันทึก</div>
      </div>
    </div>`;
  document.getElementById('modal-root').innerHTML = overlay(inner);
};
window.saveUser = async () => {
  const obj = {
    id: document.getElementById('uf-id').value || undefined,
    prefix: getPrefix('uf'),
    name: document.getElementById('uf-name').value.trim(),
    surname: document.getElementById('uf-surname').value.trim(),
    position: getPositionValue('uf'),
    department: getDepartmentValue('uf'),
    email: document.getElementById('uf-email').value.trim(),
    role: document.getElementById('uf-role').value,
  };
  if (!obj.name) { toast('กรุณากรอกชื่อ'); return; }
  showLoader(true);
  try { await api.saveTeacher(obj); closeModal(); toast(obj.id ? 'บันทึกข้อมูลผู้ใช้งานแล้ว' : 'เพิ่มผู้ใช้งานใหม่แล้ว'); await loadAdmin(); }
  catch (err) { swalError(err.message); } finally { showLoader(false); }
};
