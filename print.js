// ===========================================================================
// print.js — Leave form document (แบบใบลาป่วย ลาคลอดบุตร ลากิจส่วนตัว)
// ===========================================================================

const SCHOOL_NAME = 'โรงเรียนบ้านห้วยตาด';
// Populated from DB settings at boot (auth.js routeByRole); shared for all users
let DIRECTOR_NAME  = '';
let PREPARER_NAME  = '';

function leaveKind(name) {
  const n = String(name || '');
  if (n.includes('ป่วย')) return 'sick';
  if (n.includes('คลอด')) return 'maternity';
  if (n.includes('กิจ')) return 'personal';
  return '';
}

// Build "คำนำหน้า+ชื่อ สกุล" with a single space before the surname, collapsing
// any doubles. Guards the name-sticking bug when name/surname arrive merged or
// when the HR fallback passes a pre-joined teacher_name with no surname field.
function fullName(t) {
  const prefix = String(t.prefix || '').trim();
  const name = String(t.name || '').trim();
  const surname = String(t.surname || '').trim();
  // If name already ends with the surname (pre-joined), don't append it twice.
  const base = surname && !name.endsWith(surname) ? `${name} ${surname}` : name;
  return `${prefix}${base}`.replace(/\s+/g, ' ').trim();
}

window.printLeaveForm = (reqId) => {
  const rec = _teacherData.history.find(r => r.id == reqId);
  if (!rec) { toast('ไม่พบข้อมูลใบลา'); return; }
  openPrint(buildLeaveFormHtml(rec, currentUser, _teacherData.quotas));
};
window.printLeaveFormHr = (reqId) => {
  const rec = _hrData.records.find(r => r.id == reqId);
  if (!rec) { toast('ไม่พบข้อมูลใบลา'); return; }
  const teacher = _hrData.teachers.find(t => t.id == rec.teacher_id) || { name: rec.teacher_name, department: rec.department };
  openPrint(buildLeaveFormHtml(rec, teacher, null));
};

function parseDocDate(rec) {
  const raw = rec.created_at || rec.created_date || rec.submitted_at || rec.timestamp || rec.start_date;
  if (!raw) return new Date();
  if (raw instanceof Date) return raw;
  const str = String(raw).trim();
  const ymd = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (ymd) return new Date(Number(ymd[1]), Number(ymd[2]) - 1, Number(ymd[3]));
  const d = new Date(str);
  return isNaN(d.getTime()) ? new Date() : d;
}

function fmtThaiFullDate(isoStr) {
  if (!isoStr) return '';
  const d = parseISO(isoStr);
  if (!d) return '';
  return `${d.getDate()} ${THAI_MONTHS_FULL[d.getMonth()]} ${d.getFullYear() + 543}`;
}

function buildLeaveFormHtml(rec, teacher, quotas) {
  const box = (on) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px;border:1px solid #000;vertical-align:middle;margin:0 4px">${on ? svg('check', 10, 3) : ''}</span>`;
  const parenBox = (on) => `( ${on ? '✓' : '&nbsp;&nbsp;'} )`;
  const fill = (text, min, align = 'left') => `<span style="display:inline-block;border-bottom:1px dotted #000;min-width:${min};text-align:${align};padding:0 6px">${esc(text == null ? '' : text)}</span>`;

  const kind = leaveKind(rec.type_name || typeName(rec.leave_type_id));
  const doc = parseDocDate(rec);
  const docDay = doc.getDate();
  const docMonth = THAI_MONTHS_FULL[doc.getMonth()];
  const docYear = doc.getFullYear() + 543;

  const from = normDate(rec.start_date), to = normDate(rec.end_date);
  const name = fullName(teacher);
  const position = teacher.position || (ROLE_META[teacher.role] ? ROLE_META[teacher.role].label : 'ครู');
  const affiliationStr = `${SCHOOL_NAME} สำนักงานเขตพื้นที่การศึกษาประถมศึกษาเลย เขต 1`;

  // Retrieve prior approved history records for this teacher in current fiscal year
  const historyList = (window._teacherData && Array.isArray(_teacherData.history) && _teacherData.history.length)
    ? _teacherData.history
    : ((window._hrData && Array.isArray(_hrData.records))
      ? _hrData.records.filter(r => String(r.teacher_id) === String(rec.teacher_id || teacher.id))
      : []);

  const fyYear = doc.getMonth() >= 9 ? doc.getFullYear() + 1 : doc.getFullYear();
  const fyStart = `${fyYear - 1}-10-01`;
  const fyEnd = `${fyYear}-09-30`;

  const approvedPriorLeaves = historyList.filter(r => {
    if (r.id == rec.id) return false;
    if (r.status !== 'Approved') return false;
    const sDate = normDate(r.start_date);
    return sDate >= fyStart && sDate <= fyEnd && sDate <= normDate(rec.start_date);
  });

  // Find the last previous leave prior to this request
  const sortedPrior = approvedPriorLeaves.slice().sort((a, b) => normDate(b.start_date).localeCompare(normDate(a.start_date)));
  const lastLeave = sortedPrior[0] || null;
  const lastKind = lastLeave ? leaveKind(lastLeave.type_name || typeName(lastLeave.leave_type_id)) : '';
  const lastFromStr = lastLeave ? fmtThaiFullDate(normDate(lastLeave.start_date)) : '';
  const lastToStr = lastLeave ? fmtThaiFullDate(normDate(lastLeave.end_date)) : '';
  const lastDaysStr = lastLeave ? (lastLeave.half_day ? 'ครึ่ง' : String(lastLeave.total_days || '')) : '';

  // Subject title: "ขออนุญาตลากิจ" / "ขออนุญาตลาป่วย" / "ขออนุญาตลาคลอดบุตร"
  let subjectStr = 'ขออนุญาตลา' + String(rec.type_name || typeName(rec.leave_type_id)).replace(/^ลา/, '');
  if (kind === 'personal') subjectStr = 'ขออนุญาตลากิจ';
  if (kind === 'sick') subjectStr = 'ขออนุญาตลาป่วย';
  if (kind === 'maternity') subjectStr = 'ขออนุญาตลาคลอดบุตร';

  // Table 1: สถิติการลาในปีงบประมาณนี้ (4 flat columns matching real form)
  const statRow1 = (label, matcher) => {
    const prevMatches = approvedPriorLeaves.filter(r => String(r.type_name || typeName(r.leave_type_id)).includes(matcher));
    const prevDays = prevMatches.reduce((sum, r) => sum + (Number(r.total_days) || 0), 0);

    const isThisType = (kind && matcher && String(rec.type_name || typeName(rec.leave_type_id)).includes(matcher));
    const thisDays = isThisType ? (Number(rec.total_days) || 0) : 0;

    let displayPrevDays = prevDays > 0 ? prevDays : '';
    if (historyList.length === 0 && quotas) {
      const q = (quotas || []).find(x => String(x.type_name || '').includes(matcher));
      const used = q ? Number(q.used_days) || 0 : 0;
      if (used > 0) {
        const bDays = isThisType ? Math.max(0, used - thisDays) : used;
        displayPrevDays = bDays > 0 ? bDays : '';
      }
    }

    const totalDaysVal = (displayPrevDays === '' ? 0 : Number(displayPrevDays)) + thisDays;
    const displayTotalDays = totalDaysVal > 0 ? totalDaysVal : '';
    const displayThisDays = isThisType ? (thisDays || '') : '';

    return `<tr>
      <td style="border:1px solid #000;padding:4px 6px;text-align:left">${label}</td>
      <td style="border:1px solid #000;padding:4px 6px;text-align:center">${displayPrevDays}</td>
      <td style="border:1px solid #000;padding:4px 6px;text-align:center">${displayThisDays}</td>
      <td style="border:1px solid #000;padding:4px 6px;text-align:center">${displayTotalDays}</td>
    </tr>`;
  };

  // Table 2: รับทราบผลการพิจารณา... สถิติการลา รวมครั้งนี้ (ครั้ง | วัน)
  const statRow2 = (label, matcher) => {
    const isThis = isThisTypeMatches(matcher);
    const allMatches = approvedPriorLeaves.concat(isThis ? [rec] : []).filter(r => String(r.type_name || typeName(r.leave_type_id)).includes(matcher));
    const totalCount = allMatches.length;
    const totalDays = allMatches.reduce((sum, r) => sum + (Number(r.total_days) || 0), 0);
    return `<tr>
      <td style="border:1px solid #000;padding:4px 6px;text-align:left">${label}</td>
      <td style="border:1px solid #000;padding:4px 6px;text-align:center">${totalCount || ''}</td>
      <td style="border:1px solid #000;padding:4px 6px;text-align:center">${totalDays || ''}</td>
    </tr>`;
  };

  function isThisTypeMatches(matcher) {
    return kind && matcher && String(rec.type_name || typeName(rec.leave_type_id)).includes(matcher);
  }

  const approved = rec.status === 'Approved';
  const line = 'display:inline-block;border-bottom:1px dotted #000;';

  // Lookup HR teacher (Level 1 Inspector)
  let hrName = PREPARER_NAME || '';
  let hrPosition = 'ครูโรงเรียนบ้านห้วยตาด';
  if (rec.approver_l1_id) {
    const hrObj = (window._hrData && Array.isArray(_hrData.teachers))
      ? _hrData.teachers.find(t => String(t.id) === String(rec.approver_l1_id))
      : (window._teacherData && String(teacher.id) === String(rec.approver_l1_id) ? teacher : null);
    if (hrObj) {
      hrName = fullName(hrObj);
      hrPosition = hrObj.position || 'ครูโรงเรียนบ้านห้วยตาด';
    }
  }

  // HR Approval date
  const hrRaw = rec.l1_approved_at || rec.hr_approved_at;
  const hrDoc = hrRaw ? parseDocDate({ created_at: hrRaw }) : ((rec.status === 'Pending_Director' || approved) ? doc : null);
  const hrDateStr = hrDoc ? `${hrDoc.getDate()} / ${THAI_MONTHS_FULL[hrDoc.getMonth()]} / ${hrDoc.getFullYear() + 543}` : '';
  const hrDateLineHtml = hrDateStr
    ? `<div>วันที่ ${fill(hrDateStr, '160px', 'center')}</div>`
    : `<div>วันที่ <span style="${line}min-width:35px">&nbsp;</span> / <span style="${line}min-width:50px">&nbsp;</span> / <span style="${line}min-width:55px">&nbsp;</span></div>`;

  // Director Approval date
  const dirRaw = rec.approved_at || rec.approved_date || rec.updated_at;
  const dirDoc = dirRaw ? parseDocDate({ created_at: dirRaw }) : (approved ? doc : null);
  const dirDateStr = dirDoc ? `${dirDoc.getDate()} / ${THAI_MONTHS_FULL[dirDoc.getMonth()]} / ${dirDoc.getFullYear() + 543}` : '';
  const dirDateLineHtml = dirDateStr
    ? `<div>วันที่ ${fill(dirDateStr, '160px', 'center')}</div>`
    : `<div>วันที่ <span style="${line}min-width:35px">&nbsp;</span> / <span style="${line}min-width:50px">&nbsp;</span> / <span style="${line}min-width:55px">&nbsp;</span></div>`;

  return `
  <div style="max-width:720px;min-height:255mm;margin:0 auto;padding:16px 36px;font-family:'TH Sarabun New','TH SarabunPSK','Sarabun',sans-serif;font-size:16px;color:#000;line-height:1.65">
    <div style="text-align:center;font-size:19px;font-weight:700;margin-bottom:12px">แบบใบลาป่วย ลาคลอดบุตร ลากิจส่วนตัว</div>

    <div style="text-align:right;margin-bottom:10px;line-height:1.7">
      <div>เขียนที่ ${fill(SCHOOL_NAME, '220px', 'center')}</div>
      <div>วันที่ ${fill(docDay, '35px', 'center')} เดือน ${fill(docMonth, '110px', 'center')} พ.ศ. ${fill(docYear, '65px', 'center')}</div>
    </div>

    <div>เรื่อง ${fill(subjectStr, '320px', 'left')}</div>
    <div>เรียน ${fill('ผู้อำนวยการ' + SCHOOL_NAME, '480px', 'left')}</div>

    <div style="margin-top:4px">ข้าพเจ้า ${fill(name, '240px', 'left')} ตำแหน่ง ${fill(position, '180px', 'left')}</div>
    <div>สังกัด ${fill(affiliationStr, '520px', 'left')}</div>

    <div style="margin-top:6px;padding-left:40px">
      <div>ขอลา</div>
      <div style="padding-left:30px">${parenBox(kind === 'sick')} ป่วย</div>
      <div style="padding-left:30px">${parenBox(kind === 'personal')} กิจส่วนตัว &nbsp;&nbsp; เนื่องจาก ${fill(kind === 'personal' ? rec.reason : (kind === 'sick' ? rec.reason : ''), '400px', 'left')}</div>
      <div style="padding-left:30px">${parenBox(kind === 'maternity')} คลอดบุตร</div>
    </div>

    <div style="margin-top:6px">ตั้งแต่วันที่ ${fill(fmtThaiFullDate(from), '170px', 'center')} ถึงวันที่ ${fill(fmtThaiFullDate(to), '170px', 'center')} มีกำหนด ${fill(rec.total_days, '45px', 'center')} วัน</div>
    <div>ข้าพเจ้าได้ลา ${parenBox(lastKind === 'sick')} ป่วย ${parenBox(lastKind === 'personal')} กิจส่วนตัว ${parenBox(lastKind === 'maternity')} คลอดบุตร ครั้งสุดท้ายตั้งแต่วันที่ ${fill(lastFromStr, '140px', 'center')} ถึงวันที่ ${fill(lastToStr, '140px', 'center')} มีกำหนด ${fill(lastDaysStr, '45px', 'center')} วัน</div>
    <div>ในระหว่างลาจะติดต่อข้าพเจ้าได้ที่ ${fill(rec.contact || teacher.address || '', '480px', 'left')}</div>
    <div>หมายเลขโทรศัพท์ ${fill(rec.phone || teacher.phone || '', '220px', 'left')}</div>

    <div style="margin-top:14px;text-align:right;padding-right:30px">
      <div style="display:inline-block;text-align:center;line-height:1.7">
        <div>(ลงชื่อ) <span style="${line}min-width:180px">&nbsp;</span> ผู้ลา</div>
        <div>( ${esc(name)} )</div>
      </div>
    </div>

    <div style="display:flex;gap:20px;margin-top:16px;align-items:flex-start">
      <!-- Left side: Table 1, Inspector, Table 2 -->
      <div style="flex:1.1">
        <div style="font-weight:700;margin-bottom:4px;font-size:15px">สถิติการลาในปีงบประมาณนี้</div>
        <table style="border-collapse:collapse;width:100%;font-size:13.5px;line-height:1.3;text-align:center">
          <thead>
            <tr>
              <th style="border:1px solid #000;padding:4px;width:30%">ประเภทลา</th>
              <th style="border:1px solid #000;padding:4px;width:23%">ลามาแล้ว<br>(วันทำการ)</th>
              <th style="border:1px solid #000;padding:4px;width:23%">ลาครั้งนี้<br>(วันทำการ)</th>
              <th style="border:1px solid #000;padding:4px;width:24%">รวมเป็น<br>(วันทำการ)</th>
            </tr>
          </thead>
          <tbody>
            ${statRow1('ป่วย', 'ป่วย')}
            ${statRow1('กิจส่วนตัว', 'กิจ')}
            ${statRow1('คลอดบุตร', 'คลอด')}
          </tbody>
        </table>

        <div style="margin-top:12px;text-align:center;font-size:13.5px;line-height:1.7">
          <div>(ลงชื่อ) <span style="${line}min-width:140px">&nbsp;</span> ผู้ตรวจ</div>
          <div>( ${hrName ? esc(hrName) : '........................................'} )</div>
          <div>ตำแหน่ง ${fill(hrPosition, '160px', 'center')}</div>
          ${hrDateLineHtml}
        </div>

        <div style="margin-top:14px;border-top:1px dashed #94a3b8;padding-top:8px;font-size:13px">
          <div style="font-weight:700">รับทราบผลการพิจารณาอนุญาตการลาและสถิติการลา</div>
          <div>- ผลการพิจารณา ${parenBox(approved)} อนุญาต ${parenBox(rec.status === 'Rejected')} ไม่อนุญาต</div>
          <div style="font-weight:700;margin-top:4px">สถิติการลา รวมครั้งนี้</div>
          <table style="border-collapse:collapse;width:100%;font-size:13px;line-height:1.2;text-align:center;margin-top:2px">
            <thead>
              <tr>
                <th rowspan="2" style="border:1px solid #000;padding:3px;width:50%">ประเภทการลา</th>
                <th colspan="2" style="border:1px solid #000;padding:3px">จำนวน</th>
              </tr>
              <tr>
                <th style="border:1px solid #000;padding:3px;width:25%">ครั้ง</th>
                <th style="border:1px solid #000;padding:3px;width:25%">วัน</th>
              </tr>
            </thead>
            <tbody>
              ${statRow2('ป่วย', 'ป่วย')}
              ${statRow2('กิจ', 'กิจ')}
            </tbody>
          </table>
          <div style="margin-top:10px;text-align:center;line-height:1.6">
            <div>(ลงชื่อ) <span style="${line}min-width:150px">&nbsp;</span> ผู้รับทราบ</div>
            <div>( ${esc(name)} )</div>
            <div>ตำแหน่ง ${fill(position, '150px', 'center')}</div>
          </div>
        </div>
      </div>

      <!-- Right side: Manager Opinion & Director Order -->
      <div style="flex:1">
        <div style="font-weight:700;font-size:15px">ความคิดเห็นของผู้บังคับบัญชา</div>
        <div style="${line}width:100%;margin-top:16px">&nbsp;</div>
        <div style="margin-top:12px;text-align:center;font-size:13.5px;line-height:1.7">
          <div>(ลงชื่อ) <span style="${line}min-width:140px">&nbsp;</span></div>
          <div>( ${DIRECTOR_NAME ? esc(DIRECTOR_NAME) : 'ผู้อำนวยการโรงเรียนบ้านห้วยตาด'} )</div>
          <div>ตำแหน่ง ผู้อำนวยการโรงเรียนบ้านห้วยตาด</div>
          ${dirDateLineHtml}
        </div>

        <div style="font-weight:700;margin-top:14px;font-size:15px">คำสั่ง</div>
        <div style="margin-top:4px;font-size:14px">${parenBox(approved)} อนุญาต &nbsp;&nbsp;&nbsp;&nbsp; ${parenBox(rec.status === 'Rejected')} ไม่อนุญาต</div>
        <div style="${line}width:100%;margin-top:6px">${esc(rec.comments || 'อนุมัติผ่านระบบสารสนเทศการลาอิเล็กทรอนิกส์')}</div>
        <div style="margin-top:12px;text-align:center;font-size:13.5px;line-height:1.7">
          <div>(ลงชื่อ) <span style="${line}min-width:140px">&nbsp;</span></div>
          <div>( ${DIRECTOR_NAME ? esc(DIRECTOR_NAME) : 'ผู้อำนวยการโรงเรียนบ้านห้วยตาด'} )</div>
          <div>ตำแหน่ง ผู้อำนวยการโรงเรียนบ้านห้วยตาด</div>
          ${dirDateLineHtml}
        </div>
      </div>
    </div>
  </div>`;
}

// District summary report: per-teacher leave days by type for a fiscal year (1 Oct – 30 Sep)
window.printDistrictReport = () => {
  const nowBE = new Date().getMonth() >= 9 ? new Date().getFullYear() + 544 : new Date().getFullYear() + 543;
  const ce = nowBE - 543;
  const fyStart = `${ce - 1}-10-01`, fyEnd = `${ce}-09-30`;

  const records = (_hrData.records || []).filter(r =>
    r.status === 'Approved' && normDate(r.start_date) >= fyStart && normDate(r.start_date) <= fyEnd
  );
  if (!records.length) { toast('ไม่มีข้อมูลการลาที่อนุมัติในปีงบประมาณนี้'); return; }

  // Group by teacher → days per leave type
  const byTeacher = {};
  records.forEach(r => {
    const t = byTeacher[r.teacher_id] || (byTeacher[r.teacher_id] = { name: r.teacher_name, dept: r.department, byType: {}, total: 0 });
    const days = Number(r.total_days) || 0;
    t.byType[r.leave_type_id] = (t.byType[r.leave_type_id] || 0) + days;
    t.total += days;
  });
  const teacherObj = (id) => (_hrData.teachers || []).find(x => x.id == id) || {};
  const rows = Object.keys(byTeacher).map(id => ({ id, ...byTeacher[id], position: teacherObj(id).position || 'ครู' }))
    .sort((a, b) => String(a.name).localeCompare(String(b.name), 'th'));

  const types = leaveTypes || [];
  const th = (t, extra) => `<th style="border:1px solid #000;padding:6px 8px;font-size:13px;${extra || ''}">${t}</th>`;
  const td = (t, extra) => `<td style="border:1px solid #000;padding:5px 8px;font-size:13px;${extra || ''}">${t}</td>`;

  const totalsByType = {};
  let grandTotal = 0;
  rows.forEach(r => { types.forEach(ty => { totalsByType[ty.id] = (totalsByType[ty.id] || 0) + (r.byType[ty.id] || 0); }); grandTotal += r.total; });

  const bodyRows = rows.map((r, i) => `<tr>
    ${td(i + 1, 'text-align:center')}
    ${td(esc(r.name))}
    ${td(esc(r.position), 'text-align:center')}
    ${types.map(ty => td(r.byType[ty.id] ? r.byType[ty.id] : '-', 'text-align:center')).join('')}
    ${td(r.total || '-', 'text-align:center;font-weight:700')}
  </tr>`).join('');

  const body = `
  <div style="max-width:1000px;margin:0 auto;padding:32px 36px;font-family:'TH Sarabun New','TH SarabunPSK','Sarabun',sans-serif;color:#000">
    <div style="text-align:center;font-size:18px;font-weight:700">รายงานสรุปสถิติการลาของข้าราชการครูและบุคลากร</div>
    <div style="text-align:center;font-size:15px;margin-top:4px">${esc(SCHOOL_NAME)}</div>
    <div style="text-align:center;font-size:14px;margin:4px 0 18px">ปีงบประมาณ ${nowBE} (1 ตุลาคม ${ce - 1 + 543} – 30 กันยายน ${ce + 543})</div>
    <table style="border-collapse:collapse;width:100%">
      <thead><tr>
        ${th('ที่', 'width:36px')}${th('ชื่อ-สกุล')}${th('ตำแหน่ง')}
        ${types.map(ty => th(esc(ty.name))).join('')}${th('รวม (วัน)')}
      </tr></thead>
      <tbody>${bodyRows}
        <tr style="background:#f1f5f9;font-weight:700">
          ${td('', 'text-align:center')}${td('รวมทั้งสิ้น', 'text-align:center')}${td('')}
          ${types.map(ty => td(totalsByType[ty.id] || '-', 'text-align:center')).join('')}
          ${td(grandTotal || '-', 'text-align:center')}
        </tr>
      </tbody>
    </table>
    <div style="display:flex;justify-content:space-around;margin-top:48px;font-size:15px;text-align:center">
      <div>
        <div>ลงชื่อ ................................................</div>
        <div style="margin-top:4px">( ${PREPARER_NAME ? esc(PREPARER_NAME) : '................................................'} )</div>
        <div style="margin-top:2px">ผู้จัดทำ / ฝ่ายบุคคล</div>
      </div>
      <div>
        <div>ลงชื่อ ................................................</div>
        <div style="margin-top:4px">( ${DIRECTOR_NAME ? esc(DIRECTOR_NAME) : '................................................'} )</div>
        <div style="margin-top:2px">ผู้อำนวยการ${esc(SCHOOL_NAME)}</div>
      </div>
    </div>
  </div>`;
  openPrint(body);
};

function openPrint(bodyHtml) {
  const w = window.open('', '_blank', 'width=820,height=1000');
  if (!w) { toast('เบราว์เซอร์บล็อกป๊อปอัพ กรุณาอนุญาต'); return; }
  w.document.write(`<!DOCTYPE html><html lang="th"><head><meta charset="utf-8">
    <title>ใบลา · ${esc(SCHOOL_NAME)}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&display=swap">
    <style>@page{size:A4;margin:14mm}body{margin:0;font-family:'Sarabun',sans-serif}@media print{.noprint{display:none}}</style>
    </head><body>
    <div class="noprint" style="text-align:center;padding:12px;background:#f1f5f9">
      <button onclick="window.print()" style="padding:8px 20px;background:#2563eb;color:#fff;border:none;border-radius:8px;font-family:'Sarabun';font-weight:700;cursor:pointer">พิมพ์ / บันทึกเป็น PDF</button>
    </div>
    ${bodyHtml}
    </body></html>`);
  w.document.close();
  w.focus();
  w.onload = () => setTimeout(() => w.print(), 400);
}
