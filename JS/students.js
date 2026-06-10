// ===== STUDENT DATA =====
const avatarColors = [
  'linear-gradient(135deg,#1a56db,#3b82f6)',
  'linear-gradient(135deg,#059669,#4ade80)',
  'linear-gradient(135deg,#7c3aed,#a78bfa)',
  'linear-gradient(135deg,#dc2626,#f87171)',
  'linear-gradient(135deg,#d97706,#fcd34d)',
  'linear-gradient(135deg,#0891b2,#67e8f9)',
]

let students = [
  { name: 'Chidera Okonkwo', reg: 'STU-2024-00123', cls: 'JSS 2', subjects: 8, status: 'active', date: 'Jan 10, 2024' },
  { name: 'Amara Bello', reg: 'STU-2024-00456', cls: 'JSS 1', subjects: 7, status: 'active', date: 'Jan 10, 2024' },
  { name: 'Samuel Adeyemi', reg: 'STU-2024-00789', cls: 'SSS 1', subjects: 9, status: 'active', date: 'Jan 15, 2024' },
  { name: 'Fatima Musa', reg: 'STU-2024-00201', cls: 'SSS 2', subjects: 9, status: 'active', date: 'Jan 15, 2024' },
  { name: 'Emeka Nwachukwu', reg: 'STU-2024-00334', cls: 'JSS 3', subjects: 8, status: 'active', date: 'Feb 3, 2024' },
  { name: 'Grace Osei', reg: 'STU-2024-00412', cls: 'SSS 3', subjects: 10, status: 'active', date: 'Feb 3, 2024' },
  { name: 'Tunde Fashola', reg: 'STU-2024-00567', cls: 'JSS 1', subjects: 7, status: 'active', date: 'Mar 1, 2024' },
  { name: 'Ngozi Eze', reg: 'STU-2024-00678', cls: 'SSS 1', subjects: 9, status: 'active', date: 'Mar 1, 2024' },
]

let filtered = [...students]


// ===== GET INITIALS =====
function initials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}


// ===== RENDER TABLE =====
function renderTable(data) {
  const tbody = document.getElementById('student-tbody')
  const countEl = document.getElementById('table-count')

  if (countEl) {
    countEl.textContent = `Showing ${data.length} of ${students.length} students`
  }

  if (!tbody) return

  tbody.innerHTML = data.map((s, i) => `
    <tr>
      <td>
        <div class="student-cell">
          <div class="student-avatar" style="background:${avatarColors[i % avatarColors.length]}">
            ${initials(s.name)}
          </div>
          <div class="student-name">${s.name}</div>
        </div>
      </td>
      <td style="font-family:monospace; font-size:0.78rem; color:#93c5fd;">${s.reg}</td>
      <td><span class="class-badge">${s.cls}</span></td>
      <td style="color:#94a3b8;">${s.subjects} subjects</td>
      <td>
        <span class="status-badge ${s.status}">
          ● ${s.status === 'deactivated' ? 'Deactivated' : s.status.charAt(0).toUpperCase() + s.status.slice(1)}
        </span>
      </td>
      <td style="color:#94a3b8; font-size:0.78rem;">${s.date}</td>
      <td>
        <div class="action-btns">
          <button class="action-icon-btn view" onclick="viewStudent('${s.reg}')">
            <i class="fa-solid fa-eye"></i> View
          </button>
          <button class="action-icon-btn edit" onclick="editStudent('${s.reg}')">
            <i class="fa-solid fa-pen"></i> Edit
          </button>
          ${s.status === 'deactivated'
            ? `<button class="action-icon-btn activate-student" onclick="activateStudent('${s.reg}')">
                <i class="fa-solid fa-circle-check"></i> Activate
               </button>`
            : `<button class="action-icon-btn delete" onclick="showDeleteMenu(event, '${s.reg}')">
                <i class="fa-solid fa-trash"></i> Delete
               </button>`
          }
        </div>
      </td>
    </tr>
  `).join('')
}


// ===== VIEW STUDENT =====
function viewStudent(reg) {
  const student = students.find(s => s.reg === reg)
  if (!student) return

  const existing = document.getElementById('view-student-overlay')
  if (existing) existing.remove()

  const html = `
    <div id="view-student-overlay" style="
      position:fixed; inset:0;
      background:rgba(0,0,0,0.65);
      z-index:200;
      display:flex;
      align-items:center;
      justify-content:center;
    ">
      <div style="
        background:#0d2247;
        border:1px solid rgba(255,255,255,0.1);
        border-radius:20px;
        padding:28px;
        width:100%;
        max-width:440px;
        margin:20px;
      ">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <div>
            <div style="font-family:Syne,sans-serif; font-size:1.05rem; font-weight:700;">Student Profile</div>
            <div style="font-size:0.78rem; color:#94a3b8; margin-top:4px;">Full details for ${student.name}</div>
          </div>
          <button onclick="document.getElementById('view-student-overlay').remove()" style="
            width:32px; height:32px; border-radius:8px;
            background:rgba(255,255,255,0.06); border:none;
            color:#94a3b8; cursor:pointer; font-size:14px;
          ">✕</button>
        </div>

        <div style="display:flex; align-items:center; gap:14px; padding:16px; background:rgba(255,255,255,0.04); border-radius:12px; margin-bottom:18px;">
          <div style="width:48px; height:48px; border-radius:12px; background:linear-gradient(135deg,#1a56db,#3b82f6); display:flex; align-items:center; justify-content:center; font-family:Syne,sans-serif; font-weight:700; font-size:1rem; color:#fff; flex-shrink:0;">
            ${initials(student.name)}
          </div>
          <div>
            <div style="font-weight:600; font-size:0.95rem;">${student.name}</div>
            <div style="font-size:0.75rem; color:#94a3b8; margin-top:2px;">${student.cls}</div>
          </div>
          <span style="margin-left:auto; padding:4px 10px; border-radius:100px; font-size:0.72rem; font-weight:600;
            background:${student.status === 'active' ? 'rgba(74,222,128,0.12)' : 'rgba(245,158,11,0.12)'};
            color:${student.status === 'active' ? '#4ade80' : '#f59e0b'};">
            ● ${student.status.charAt(0).toUpperCase() + student.status.slice(1)}
          </span>
        </div>

        <div style="display:flex; flex-direction:column; gap:0;">
          <div style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
            <span style="font-size:0.78rem; color:#94a3b8;">Registration Number</span>
            <span style="font-family:monospace; font-size:0.82rem; color:#93c5fd;">${student.reg}</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
            <span style="font-size:0.78rem; color:#94a3b8;">Class</span>
            <span style="font-size:0.82rem; color:#fff;">${student.cls}</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
            <span style="font-size:0.78rem; color:#94a3b8;">Subjects</span>
            <span style="font-size:0.82rem; color:#fff;">${student.subjects} subjects</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
            <span style="font-size:0.78rem; color:#94a3b8;">Date Added</span>
            <span style="font-size:0.82rem; color:#fff;">${student.date}</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:12px 0;">
            <span style="font-size:0.78rem; color:#94a3b8;">Status</span>
            <span style="font-size:0.82rem; color:${student.status === 'active' ? '#4ade80' : '#f59e0b'};">
              ${student.status.charAt(0).toUpperCase() + student.status.slice(1)}
            </span>
          </div>
        </div>

      </div>
    </div>
  `

  document.body.insertAdjacentHTML('beforeend', html)

  document.getElementById('view-student-overlay').addEventListener('click', function(e) {
    if (e.target === this) this.remove()
  })
}


// ===== EDIT STUDENT =====
function editStudent(reg) {
  const student = students.find(s => s.reg === reg)
  if (!student) return

  const existing = document.getElementById('edit-student-overlay')
  if (existing) existing.remove()

  const html = `
    <div id="edit-student-overlay" style="
      position:fixed; inset:0;
      background:rgba(0,0,0,0.65);
      z-index:200;
      display:flex;
      align-items:center;
      justify-content:center;
    ">
      <div style="
        background:#0d2247;
        border:1px solid rgba(255,255,255,0.1);
        border-radius:20px;
        padding:28px;
        width:100%;
        max-width:480px;
        margin:20px;
        max-height:90vh;
        overflow-y:auto;
      ">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:22px;">
          <div>
            <div style="font-family:Syne,sans-serif; font-size:1.05rem; font-weight:700;">Edit Student</div>
            <div style="font-size:0.78rem; color:#94a3b8; margin-top:4px;">Update details for ${student.name}</div>
          </div>
          <button onclick="document.getElementById('edit-student-overlay').remove()" style="
            width:32px; height:32px; border-radius:8px;
            background:rgba(255,255,255,0.06); border:none;
            color:#94a3b8; cursor:pointer; font-size:14px;
          ">✕</button>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
          <div>
            <label style="display:block; font-size:0.78rem; color:#94a3b8; margin-bottom:7px;">First Name</label>
            <input id="edit-firstname" type="text" value="${student.name.split(' ')[0]}" style="
              width:100%; padding:11px 14px;
              background:rgba(255,255,255,0.05);
              border:1px solid rgba(255,255,255,0.08);
              border-radius:10px; color:#fff;
              font-size:0.88rem; outline:none;
              font-family:'DM Sans',sans-serif;
            " />
          </div>
          <div>
            <label style="display:block; font-size:0.78rem; color:#94a3b8; margin-bottom:7px;">Last Name</label>
            <input id="edit-lastname" type="text" value="${student.name.split(' ').slice(1).join(' ')}" style="
              width:100%; padding:11px 14px;
              background:rgba(255,255,255,0.05);
              border:1px solid rgba(255,255,255,0.08);
              border-radius:10px; color:#fff;
              font-size:0.88rem; outline:none;
              font-family:'DM Sans',sans-serif;
            " />
          </div>
        </div>

        <div style="margin-bottom:14px;">
          <label style="display:block; font-size:0.78rem; color:#94a3b8; margin-bottom:7px;">Registration Number</label>
          <input type="text" value="${student.reg}" disabled style="
            width:100%; padding:11px 14px;
            background:rgba(255,255,255,0.02);
            border:1px solid rgba(255,255,255,0.05);
            border-radius:10px; color:#94a3b8;
            font-size:0.88rem; outline:none;
            font-family:monospace; cursor:not-allowed;
          " />
          <p style="font-size:0.72rem; color:#475569; margin-top:5px;">Registration number cannot be changed</p>
        </div>

        <div style="margin-bottom:20px;">
          <label style="display:block; font-size:0.78rem; color:#94a3b8; margin-bottom:7px;">Class</label>
          <select id="edit-class" style="
            width:100%; padding:11px 14px;
            background:rgba(255,255,255,0.05);
            border:1px solid rgba(255,255,255,0.08);
            border-radius:10px; color:#fff;
            font-size:0.88rem; outline:none; cursor:pointer;
            font-family:'DM Sans',sans-serif;
          ">
            <option ${student.cls === 'JSS 1' ? 'selected' : ''}>JSS 1</option>
            <option ${student.cls === 'JSS 2' ? 'selected' : ''}>JSS 2</option>
            <option ${student.cls === 'JSS 3' ? 'selected' : ''}>JSS 3</option>
            <option ${student.cls === 'SSS 1' ? 'selected' : ''}>SSS 1</option>
            <option ${student.cls === 'SSS 2' ? 'selected' : ''}>SSS 2</option>
            <option ${student.cls === 'SSS 3' ? 'selected' : ''}>SSS 3</option>
          </select>
        </div>

        <div style="display:flex; gap:10px; justify-content:flex-end; padding-top:18px; border-top:1px solid rgba(255,255,255,0.06);">
          <button onclick="document.getElementById('edit-student-overlay').remove()" style="
            padding:10px 20px; background:transparent;
            border:1px solid rgba(255,255,255,0.1);
            border-radius:10px; color:#94a3b8;
            font-size:0.88rem; cursor:pointer;
            font-family:'DM Sans',sans-serif;
          ">Cancel</button>
          <button onclick="saveEdit('${student.reg}')" style="
            display:flex; align-items:center; gap:8px;
            padding:10px 20px; background:#1a56db;
            border:none; border-radius:10px; color:#fff;
            font-size:0.88rem; font-weight:600; cursor:pointer;
            font-family:'DM Sans',sans-serif;
          ">
            <i class='fa-solid fa-check'></i>
            Save Changes
          </button>
        </div>

      </div>
    </div>
  `

  document.body.insertAdjacentHTML('beforeend', html)

  document.getElementById('edit-student-overlay').addEventListener('click', function(e) {
    if (e.target === this) this.remove()
  })
}


// ===== SAVE EDIT =====
function saveEdit(reg) {
  const student = students.find(s => s.reg === reg)
  if (!student) return

  const firstName = document.getElementById('edit-firstname').value.trim()
  const lastName = document.getElementById('edit-lastname').value.trim()
  const cls = document.getElementById('edit-class').value

  if (!firstName || !lastName) {
    alert('Please fill in both name fields.')
    return
  }

  student.name = `${firstName} ${lastName}`
  student.cls = cls

  filtered = filtered.map(s => s.reg === reg ? { ...s, name: student.name, cls: student.cls } : s)

  document.getElementById('edit-student-overlay').remove()
  renderTable(filtered)
}


// ===== SHOW DELETE MENU =====
function showDeleteMenu(event, reg) {
  event.stopPropagation()
  removeDeleteMenu()

  const menu = document.createElement('div')
  menu.id = 'delete-menu'
  menu.style.cssText = `
    position: fixed;
    background: #0d2247;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 12px;
    padding: 8px;
    z-index: 300;
    min-width: 230px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.4);
    top: ${event.clientY + 8}px;
    left: ${event.clientX - 110}px;
  `

  menu.innerHTML = `
    <div style="font-size:0.68rem; color:#94a3b8; padding:6px 10px 10px; letter-spacing:1.5px; text-transform:uppercase; border-bottom:1px solid rgba(255,255,255,0.06); margin-bottom:8px;">
      Choose action
    </div>

    <button onclick="temporaryDeactivateStudent('${reg}')" style="
      display:flex; align-items:center; gap:10px;
      width:100%; padding:10px 12px; border-radius:8px;
      background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.15);
      color:#fcd34d; font-size:0.82rem; cursor:pointer; margin-bottom:6px;
      font-family:'DM Sans',sans-serif; text-align:left;
    ">
      <i class="fa-solid fa-clock"></i>
      Temporarily Deactivate
    </button>

    <button onclick="permanentRemoveStudent('${reg}')" style="
      display:flex; align-items:center; gap:10px;
      width:100%; padding:10px 12px; border-radius:8px;
      background:rgba(248,113,113,0.08); border:1px solid rgba(248,113,113,0.15);
      color:#f87171; font-size:0.82rem; cursor:pointer;
      font-family:'DM Sans',sans-serif; text-align:left;
    ">
      <i class="fa-solid fa-trash"></i>
      Permanently Remove
    </button>
  `

  document.body.appendChild(menu)

  setTimeout(() => {
    document.addEventListener('click', removeDeleteMenu, { once: true })
  }, 10)
}


// ===== REMOVE DELETE MENU =====
function removeDeleteMenu() {
  const existing = document.getElementById('delete-menu')
  if (existing) existing.remove()
}


// ===== TEMPORARILY DEACTIVATE STUDENT =====
function temporaryDeactivateStudent(reg) {
  removeDeleteMenu()
  const student = students.find(s => s.reg === reg)
  if (!student) return
  student.status = 'deactivated'
  filtered = filtered.map(s => s.reg === reg ? { ...s, status: 'deactivated' } : s)
  renderTable(filtered)
}


// ===== ACTIVATE STUDENT =====
function activateStudent(reg) {
  const confirmed = confirm('Reactivate this student? They will regain full access to the portal.')
  if (!confirmed) return
  const student = students.find(s => s.reg === reg)
  if (!student) return
  student.status = 'active'
  filtered = filtered.map(s => s.reg === reg ? { ...s, status: 'active' } : s)
  renderTable(filtered)
}


// ===== PERMANENTLY REMOVE STUDENT =====
function permanentRemoveStudent(reg) {
  removeDeleteMenu()
  const student = students.find(s => s.reg === reg)
  if (!student) return

  const confirmed = confirm(
    `⚠ PERMANENT REMOVAL\n\nYou are about to permanently remove:\n\nName: ${student.name}\nReg Number: ${student.reg}\nClass: ${student.cls}\n\nThis action CANNOT be undone. Proceed?`
  )

  if (!confirmed) return

  const index = students.findIndex(s => s.reg === reg)
  if (index !== -1) students.splice(index, 1)
  filtered = filtered.filter(s => s.reg !== reg)
  renderTable(filtered)
}


// ===== FILTER FUNCTIONS =====
function filterStudents(val) {
  const v = val.toLowerCase()
  filtered = students.filter(s =>
    s.name.toLowerCase().includes(v) ||
    s.reg.toLowerCase().includes(v)
  )
  renderTable(filtered)
}

function filterClass(cls) {
  filtered = cls ? students.filter(s => s.cls === cls) : [...students]
  renderTable(filtered)
}

function filterStatus(status) {
  filtered = status ? students.filter(s => s.status === status) : [...students]
  renderTable(filtered)
}


// ===== GENERATE PASSWORD =====
function generatePw() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#!'
  let pw = ''
  for (let i = 0; i < 12; i++) {
    pw += chars[Math.floor(Math.random() * chars.length)]
  }
  return pw
}


// ===== OPEN ADD STUDENT MODAL =====
function openModal() {
  const overlay = document.getElementById('modal-overlay')
  const pwEl = document.getElementById('modal-pw')
  if (overlay) overlay.classList.add('show')
  if (pwEl) pwEl.textContent = generatePw()
}


// ===== CLOSE MODAL =====
function closeModal() {
  const overlay = document.getElementById('modal-overlay')
  if (overlay) overlay.classList.remove('show')
}


// ===== SAVE STUDENT =====
function saveStudent() {
  const btn = document.getElementById('save-student-btn')
  if (!btn) return
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Student Saved!'
  btn.style.background = '#059669'
  setTimeout(() => {
    closeModal()
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Save Student'
    btn.style.background = ''
  }, 1500)
}


// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', () => {

  renderTable(students)

  const closeBtn = document.getElementById('modal-close-btn')
  const cancelBtn = document.getElementById('modal-cancel-btn')
  const saveBtn = document.getElementById('save-student-btn')
  const copyBtn = document.getElementById('copy-pw-btn')
  const overlay = document.getElementById('modal-overlay')

  if (closeBtn) closeBtn.addEventListener('click', closeModal)
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal)
  if (saveBtn) saveBtn.addEventListener('click', saveStudent)

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const pw = document.getElementById('modal-pw').textContent
      navigator.clipboard.writeText(pw).catch(() => {})
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>'
      }, 1500)
    })
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal()
    })
  }

})