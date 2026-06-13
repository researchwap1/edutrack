// ===== STAFF DATA =====
const avatarColors = [
  'linear-gradient(135deg,#1a56db,#3b82f6)',
  'linear-gradient(135deg,#059669,#4ade80)',
  'linear-gradient(135deg,#7c3aed,#a78bfa)',
  'linear-gradient(135deg,#dc2626,#f87171)',
  'linear-gradient(135deg,#d97706,#fcd34d)',
  'linear-gradient(135deg,#0891b2,#67e8f9)',
]

let staff = [
  { name: 'Mrs. Sandra Eze', staffId: 'ADM-001', role: 'Admin', subjects: ['All Subjects'], classes: ['All Classes'], status: 'active' },
  { name: 'Mr. James Okafor', staffId: 'STF-0042', role: 'Teacher', subjects: ['Mathematics', 'Physics'], classes: ['JSS 2', 'SSS 1'], status: 'active' },
  { name: 'Mrs. Ngozi Adeyemi', staffId: 'STF-0019', role: 'Teacher', subjects: ['English', 'Literature'], classes: ['JSS 1', 'JSS 2'], status: 'active' },
  { name: 'Mr. David Chukwu', staffId: 'STF-0067', role: 'Teacher', subjects: ['Biology', 'Chemistry'], classes: ['SSS 2', 'SSS 3'], status: 'active' },
  { name: 'Mrs. Amaka Obi', staffId: 'STF-0031', role: 'Teacher', subjects: ['Social Studies', 'Civic Edu'], classes: ['JSS 1', 'JSS 3'], status: 'active' },
  { name: 'Mr. Femi Ade', staffId: 'STF-0055', role: 'Teacher', subjects: ['Economics', 'Commerce'], classes: ['SSS 1', 'SSS 2'], status: 'active' },
]

let filtered = [...staff]


// ===== GET INITIALS =====
function initials(name) {
  return name
    .replace('Mr. ', '')
    .replace('Mrs. ', '')
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}


// ===== RENDER TABLE =====
function renderTable(data) {
  const tbody = document.getElementById('staff-tbody')
  const countEl = document.getElementById('table-count')

  if (countEl) {
    countEl.textContent = `Showing ${data.length} of ${staff.length} staff members`
  }

  if (!tbody) return

  tbody.innerHTML = data.map((s, i) => `
    <tr>
      <td>
        <div class="staff-cell">
          <div class="staff-avatar" style="background:${avatarColors[i % avatarColors.length]}">
            ${initials(s.name)}
          </div>
          <div class="staff-name">${s.name}</div>
        </div>
      </td>
      <td><span class="staff-id-code">${s.staffId}</span></td>
      <td><span class="role-badge ${s.role.toLowerCase()}">${s.role}</span></td>
      <td>
        <div class="subject-tags">
          ${s.subjects.map(sub => `<span class="subject-tag">${sub}</span>`).join('')}
        </div>
      </td>
      <td>
        <div class="subject-tags">
          ${s.classes.map(cls => `<span class="class-tag">${cls}</span>`).join('')}
        </div>
      </td>
      <td>
        <span class="status-badge ${s.status}">
          ● ${s.status === 'deactivated' ? 'Deactivated' : s.status.charAt(0).toUpperCase() + s.status.slice(1)}
        </span>
      </td>
      <td>
        <div class="action-btns">
          <button class="action-btn-lbl view" onclick="viewStaff('${s.staffId}')">
            <i class="fa-solid fa-eye"></i> View
          </button>
          <button class="action-btn-lbl gen-id" onclick="openModal()">
            <i class="fa-solid fa-key"></i> New ID
          </button>
          ${s.status === 'deactivated'
            ? `<button class="action-btn-lbl activate-btn" onclick="activateStaff('${s.staffId}')">
                <i class="fa-solid fa-circle-check"></i> Activate
               </button>`
            : `<button class="action-btn-lbl deactivate" onclick="showDeactivateMenu(event, '${s.staffId}')">
                <i class="fa-solid fa-ban"></i> Deactivate
               </button>`
          }
        </div>
      </td>
    </tr>
  `).join('')
}


// ===== VIEW STAFF =====
function viewStaff(staffId) {
  const member = staff.find(s => s.staffId === staffId)
  if (!member) return

  const existing = document.getElementById('view-modal-overlay')
  if (existing) existing.remove()

  const html = `
    <div id="view-modal-overlay" style="
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
        max-width:460px;
        margin:20px;
      ">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <div>
            <div style="font-family:Syne,sans-serif; font-size:1.05rem; font-weight:700;">Staff Profile</div>
            <div style="font-size:0.78rem; color:#94a3b8; margin-top:4px;">Full details for ${member.name}</div>
          </div>
          <button onclick="document.getElementById('view-modal-overlay').remove()" style="
            width:32px; height:32px; border-radius:8px;
            background:rgba(255,255,255,0.06); border:none;
            color:#94a3b8; cursor:pointer; font-size:14px;
          ">✕</button>
        </div>

        <div style="display:flex; align-items:center; gap:14px; padding:16px; background:rgba(255,255,255,0.04); border-radius:12px; margin-bottom:18px;">
          <div style="width:48px; height:48px; border-radius:12px; background:linear-gradient(135deg,#7c3aed,#4f46e5); display:flex; align-items:center; justify-content:center; font-family:Syne,sans-serif; font-weight:700; font-size:1rem; color:#fff; flex-shrink:0;">
            ${initials(member.name)}
          </div>
          <div>
            <div style="font-weight:600; font-size:0.95rem;">${member.name}</div>
            <div style="font-size:0.75rem; color:#94a3b8; margin-top:2px;">${member.role}</div>
          </div>
          <span style="margin-left:auto; padding:4px 10px; border-radius:100px; font-size:0.72rem; font-weight:600;
            background:${member.status === 'active' ? 'rgba(74,222,128,0.12)' : 'rgba(245,158,11,0.12)'};
            color:${member.status === 'active' ? '#4ade80' : '#f59e0b'};">
            ● ${member.status.charAt(0).toUpperCase() + member.status.slice(1)}
          </span>
        </div>

        <div style="display:flex; flex-direction:column; gap:0;">
          <div style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
            <span style="font-size:0.78rem; color:#94a3b8;">Staff ID</span>
            <span style="font-family:monospace; font-size:0.82rem; color:#fcd34d;">${member.staffId}</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
            <span style="font-size:0.78rem; color:#94a3b8;">Role</span>
            <span style="font-size:0.82rem; color:#fff;">${member.role}</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
            <span style="font-size:0.78rem; color:#94a3b8;">Subjects</span>
            <div style="display:flex; flex-wrap:wrap; gap:4px; justify-content:flex-end; max-width:65%;">
              ${member.subjects.map(s => `<span style="font-size:0.68rem; padding:2px 8px; border-radius:6px; background:rgba(59,130,246,0.1); border:1px solid rgba(59,130,246,0.15); color:#93c5fd;">${s}</span>`).join('')}
            </div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; padding:12px 0;">
            <span style="font-size:0.78rem; color:#94a3b8;">Classes</span>
            <div style="display:flex; flex-wrap:wrap; gap:4px; justify-content:flex-end; max-width:65%;">
              ${member.classes.map(c => `<span style="font-size:0.68rem; padding:2px 8px; border-radius:6px; background:rgba(74,222,128,0.08); border:1px solid rgba(74,222,128,0.15); color:#86efac;">${c}</span>`).join('')}
            </div>
          </div>
        </div>

      </div>
    </div>
  `

  document.body.insertAdjacentHTML('beforeend', html)

  document.getElementById('view-modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) this.remove()
  })
}


// ===== SHOW DEACTIVATE MENU =====
function showDeactivateMenu(event, staffId) {
  event.stopPropagation()
  removeDeactivateMenu()

  const pos = clampMenuPosition(event.clientX, event.clientY, 230, 140)

  const menu = document.createElement('div')
  menu.id = 'deactivate-menu'
  menu.style.cssText = `
    position: fixed;
    background: #0d2247;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 12px;
    padding: 8px;
    z-index: 300;
    min-width: 230px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.4);
    top: ${pos.top}px;
    left: ${pos.left}px;
  `

  menu.innerHTML = `
    <div style="font-size:0.68rem; color:#94a3b8; padding:6px 10px 10px; letter-spacing:1.5px; text-transform:uppercase; border-bottom:1px solid rgba(255,255,255,0.06); margin-bottom:8px;">
      Choose action
    </div>

    <button onclick="temporaryDeactivate('${staffId}')" style="
      display:flex; align-items:center; gap:10px;
      width:100%; padding:10px 12px; border-radius:8px;
      background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.15);
      color:#fcd34d; font-size:0.82rem; cursor:pointer; margin-bottom:6px;
      font-family:'DM Sans',sans-serif; text-align:left;
    ">
      <i class="fa-solid fa-clock"></i>
      Temporarily Deactivate
    </button>

    <button onclick="permanentRemove('${staffId}')" style="
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
    document.addEventListener('click', removeDeactivateMenu, { once: true })
  }, 10)
}


// ===== REMOVE DEACTIVATE MENU =====
function removeDeactivateMenu() {
  const existing = document.getElementById('deactivate-menu')
  if (existing) existing.remove()
}


// ===== TEMPORARILY DEACTIVATE =====
function temporaryDeactivate(staffId) {
  removeDeactivateMenu()
  const member = staff.find(s => s.staffId === staffId)
  if (!member) return
  member.status = 'deactivated'
  filtered = filtered.map(s => s.staffId === staffId ? { ...s, status: 'deactivated' } : s)
  renderTable(filtered)
}


// ===== ACTIVATE STAFF =====
function activateStaff(staffId) {
  const confirmed = confirm(`Reactivate this staff member? They will regain full access to the portal.`)
  if (!confirmed) return
  const member = staff.find(s => s.staffId === staffId)
  if (!member) return
  member.status = 'active'
  filtered = filtered.map(s => s.staffId === staffId ? { ...s, status: 'active' } : s)
  renderTable(filtered)
}


// ===== PERMANENTLY REMOVE =====
function permanentRemove(staffId) {
  removeDeactivateMenu()
  const member = staff.find(s => s.staffId === staffId)
  if (!member) return

  const confirmed = confirm(
    `⚠ PERMANENT REMOVAL\n\nYou are about to permanently remove:\n\nName: ${member.name}\nStaff ID: ${member.staffId}\nRole: ${member.role}\nClasses: ${member.classes.join(', ')}\n\nThis action CANNOT be undone. Proceed?`
  )

  if (!confirmed) return

  const index = staff.findIndex(s => s.staffId === staffId)
  if (index !== -1) staff.splice(index, 1)
  filtered = filtered.filter(s => s.staffId !== staffId)
  renderTable(filtered)
}


// ===== FILTER FUNCTIONS =====
function filterStaff(val) {
  const v = val.toLowerCase()
  filtered = staff.filter(s =>
    s.name.toLowerCase().includes(v) ||
    s.staffId.toLowerCase().includes(v)
  )
  renderTable(filtered)
}

function filterRole(role) {
  filtered = role ? staff.filter(s => s.role === role) : [...staff]
  renderTable(filtered)
}

function filterStatus(status) {
  filtered = status ? staff.filter(s => s.status === status) : [...staff]
  renderTable(filtered)
}


// ===== OPEN MODAL =====
function openModal() {
  const overlay = document.getElementById('modal-overlay')
  const display = document.getElementById('gen-id-display')
  if (overlay) overlay.classList.add('show')
  if (display) display.classList.remove('show')
}



function closeModal() {
  const overlay = document.getElementById('modal-overlay')
  if (overlay) overlay.classList.remove('show')
  resetModalForm()
}

// ===== RESET MODEL FORM =====

function resetModalForm() {
  const displayEl = document.getElementById('gen-id-display')
  const cancelBtn = document.getElementById('modal-cancel-btn')
  const generateBtn = document.getElementById('generate-btn')
  const fnameEl = document.getElementById('fname')
  const lnameEl = document.getElementById('lname')
  const roleEl = document.getElementById('role-select')

  if (fnameEl) fnameEl.value = ''
  if (lnameEl) lnameEl.value = ''
  if (roleEl) roleEl.value = ''
  if (displayEl) displayEl.classList.remove('show')
  if (cancelBtn) cancelBtn.textContent = 'Cancel'

  if (generateBtn) {
    generateBtn.innerHTML = '<i class="fa-solid fa-key"></i> Generate ID'
    generateBtn.style.background = ''
    generateBtn.removeAttribute('data-mode')
  }
}

// ===== GENERATE ID =====

function generateID() {
  const fname = document.getElementById('fname').value.trim()
  const lname = document.getElementById('lname').value.trim()
  const role = document.getElementById('role-select').value

  if (!fname || !lname || !role) {
    alert('Please fill in all fields.')
    return
  }

  const num = String(Math.floor(Math.random() * 9000) + 1000)
  const year = new Date().getFullYear()
  const id = `${role}-${year}-${num}`

  const idValueEl = document.getElementById('gen-id-value')
  const displayEl = document.getElementById('gen-id-display')
  const cancelBtn = document.getElementById('modal-cancel-btn')
  const generateBtn = document.getElementById('generate-btn')

  if (idValueEl) idValueEl.textContent = id
  if (displayEl) displayEl.classList.add('show')

  if (cancelBtn) cancelBtn.textContent = 'Generate Another'
  if (generateBtn) {
    generateBtn.innerHTML = '<i class="fa-solid fa-check"></i> Done'
    generateBtn.style.background = '#059669'
    generateBtn.setAttribute('data-mode', 'done')
  }
}



// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', () => {

  renderTable(staff)

  const closeBtn = document.getElementById('modal-close-btn')
  const cancelBtn = document.getElementById('modal-cancel-btn')
  const generateBtn = document.getElementById('generate-btn')
  const copyBtn = document.getElementById('copy-id-btn')
  const overlay = document.getElementById('modal-overlay')

  if (closeBtn) closeBtn.addEventListener('click', closeModal)
  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      const mode = generateBtn.getAttribute('data-mode')
      if (mode === 'done') {
        closeModal()
      } else {
        generateID()
      }
    })
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      const text = cancelBtn.textContent.trim()
      if (text === 'Generate Another') {
        resetModalForm()
      } else {
        closeModal()
      }
    })
  }
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const id = document.getElementById('gen-id-value').textContent
      navigator.clipboard.writeText(id).catch(() => {})
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!'
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy ID'
      }, 2000)
    })
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal()
    })
  }

})