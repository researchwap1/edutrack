// ===== AVATAR COLORS =====
const avatarColors = [
  'linear-gradient(135deg,#7c3aed,#4f46e5)',
  'linear-gradient(135deg,#dc2626,#f87171)',
  'linear-gradient(135deg,#1a56db,#3b82f6)',
  'linear-gradient(135deg,#059669,#4ade80)',
  'linear-gradient(135deg,#d97706,#fcd34d)',
  'linear-gradient(135deg,#0891b2,#67e8f9)',
  'linear-gradient(135deg,#db2777,#f472b6)',
  'linear-gradient(135deg,#65a30d,#a3e635)',
]


// ===== USER DATA =====
let users = [
  { name: 'Super Admin', id: 'SYS-ROOT', role: 'superadmin', status: 'active', login: 'Today, 9:00 AM' },
  { name: 'Mrs. Sandra Eze', id: 'ADM-001', role: 'admin', status: 'active', login: 'Today, 8:42 AM' },
  { name: 'Mr. James Okafor', id: 'STF-0042', role: 'teacher', status: 'active', login: 'Today, 8:15 AM' },
  { name: 'Mrs. Ngozi Adeyemi', id: 'STF-0019', role: 'teacher', status: 'active', login: 'Yesterday' },
  { name: 'Mr. David Chukwu', id: 'STF-0067', role: 'teacher', status: 'inactive', login: '3 days ago' },
  { name: 'Chidera Okonkwo', id: 'STU-2024-00123', role: 'student', status: 'active', login: 'Yesterday' },
  { name: 'Amara Bello', id: 'STU-2024-00456', role: 'student', status: 'active', login: '2 days ago' },
  { name: 'Emeka Nwachukwu', id: 'STU-2024-00334', role: 'student', status: 'suspended', login: '1 week ago' },
]

let filtered = [...users]


// ===== LOGIN ACTIVITY LOG (static history — would come from a logs table) =====
const loginLog = [
  { type: 'success', name: 'Mrs. Sandra Eze', text: 'logged in successfully', time: 'Today, 8:42 AM' },
  { type: 'success', name: 'Mr. James Okafor', text: 'logged in successfully', time: 'Today, 8:15 AM' },
  { type: 'fail', name: '', text: 'Failed attempt on Admin login page — unknown Staff ID', time: 'Yesterday, 11:32 PM' },
  { type: 'fail', name: '', text: 'Failed attempt on Admin login page — wrong password', time: 'Yesterday, 11:30 PM' },
  { type: 'success', name: 'Chidera Okonkwo', text: 'logged in to Student portal', time: 'Yesterday, 6:18 PM' },
]


// ===== HELPERS =====
function initials(name) {
  return name.replace('Mr. ', '').replace('Mrs. ', '').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}


// ===== RENDER USERS TABLE =====
function renderTable(data) {
  const countEl = document.getElementById('user-count')
  if (countEl) countEl.textContent = `Showing ${data.length} of ${users.length} users`

  const tbody = document.getElementById('users-tbody')
  if (!tbody) return

  tbody.innerHTML = data.map((u, i) => `
    <tr>
      <td>
        <div class="user-cell">
          <div class="u-avatar" style="background:${avatarColors[i % avatarColors.length]}">${initials(u.name)}</div>
          <div>
            <div class="u-name">${u.name}</div>
            <div class="u-id">${u.id}</div>
          </div>
        </div>
      </td>
      <td><span class="role-badge ${u.role}">${u.role.charAt(0).toUpperCase() + u.role.slice(1)}</span></td>
      <td><span class="status-badge ${u.status}">● ${u.status.charAt(0).toUpperCase() + u.status.slice(1)}</span></td>
      <td><span class="last-login">${u.login}</span></td>
      <td>
        <div class="action-btns">
          <button class="action-btn-lbl view" onclick="viewUser('${u.id}')">
            <i class="fa-solid fa-eye"></i> View
          </button>
          <button class="action-btn-lbl gen-id" onclick="resetPassword('${u.id}')">
            <i class="fa-solid fa-key"></i> Reset
          </button>
          ${u.role !== 'superadmin' ? `
            <button class="action-btn-lbl assign" onclick="openModal('${u.id}')">
              <i class="fa-solid fa-shield-halved"></i> Role
            </button>
            <button class="action-btn-lbl ${u.status === 'suspended' ? 'activate-btn' : 'deactivate'}" onclick="toggleSuspend('${u.id}')">
              <i class="fa-solid ${u.status === 'suspended' ? 'fa-circle-check' : 'fa-ban'}"></i>
              ${u.status === 'suspended' ? 'Restore' : 'Suspend'}
            </button>
          ` : ''}
        </div>
      </td>
    </tr>
  `).join('')
}


// ===== RENDER ROLE SUMMARY (dynamic, computed from data) =====
function renderRoleSummary() {
  const container = document.getElementById('role-summary')
  if (!container) return

  const roles = [
    { key: 'superadmin', label: 'Super Admin', color: '#c4b5fd' },
    { key: 'admin', label: 'Admin', color: '#f87171' },
    { key: 'teacher', label: 'Teachers', color: '#f59e0b' },
    { key: 'student', label: 'Students', color: '#3b82f6' },
  ]

  container.innerHTML = roles.map(r => {
    const count = users.filter(u => u.role === r.key).length
    return `
      <div class="role-summary-item">
        <div class="role-summary-left">
          <div class="role-dot-big" style="background:${r.color};"></div>
          ${r.label}
        </div>
        <div class="role-summary-count" style="color:${r.color};">${count}</div>
      </div>
    `
  }).join('')
}


// ===== RENDER LOGIN ACTIVITY LOG =====
function renderLoginLog() {
  const container = document.getElementById('login-log')
  if (!container) return

  container.innerHTML = loginLog.map(log => `
    <div class="log-item">
      <div class="log-dot ${log.type}"></div>
      <div>
        <div class="log-text">
          ${log.type === 'success'
            ? `<span>${log.name}</span> ${log.text}`
            : `<span class="fail-text">Failed attempt</span> ${log.text.replace('Failed attempt ', '')}`
          }
        </div>
        <div class="log-time">${log.time}</div>
      </div>
    </div>
  `).join('')
}


// ===== UPDATE MINI STATS =====
function updateStats() {
  const totalEl = document.getElementById('stat-total')
  const activeEl = document.getElementById('stat-active')

  if (totalEl) totalEl.textContent = users.length
  if (activeEl) activeEl.textContent = users.filter(u => u.status === 'active').length
}


// ===== VIEW USER =====
function viewUser(id) {
  const user = users.find(u => u.id === id)
  if (!user) return

  const existing = document.getElementById('view-user-overlay')
  if (existing) existing.remove()

  const html = `
    <div id="view-user-overlay" style="
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
        max-width:420px;
        margin:20px;
      ">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <div>
            <div style="font-family:Syne,sans-serif; font-size:1.05rem; font-weight:700;">User Profile</div>
            <div style="font-size:0.78rem; color:#94a3b8; margin-top:4px;">Account details for ${user.name}</div>
          </div>
          <button onclick="document.getElementById('view-user-overlay').remove()" style="
            width:32px; height:32px; border-radius:8px;
            background:rgba(255,255,255,0.06); border:none;
            color:#94a3b8; cursor:pointer; font-size:14px;
          ">✕</button>
        </div>

        <div style="display:flex; align-items:center; gap:14px; padding:16px; background:rgba(255,255,255,0.04); border-radius:12px; margin-bottom:18px;">
          <div style="width:48px; height:48px; border-radius:12px; background:${avatarColors[users.indexOf(user) % avatarColors.length]}; display:flex; align-items:center; justify-content:center; font-family:Syne,sans-serif; font-weight:700; font-size:1rem; color:#fff; flex-shrink:0;">
            ${initials(user.name)}
          </div>
          <div>
            <div style="font-weight:600; font-size:0.95rem;">${user.name}</div>
            <div style="font-size:0.75rem; color:#94a3b8; margin-top:2px;">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
          </div>
          <span class="status-badge ${user.status}" style="margin-left:auto;">● ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
        </div>

        <div style="display:flex; flex-direction:column; gap:0;">
          <div style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
            <span style="font-size:0.78rem; color:#94a3b8;">User ID</span>
            <span style="font-family:monospace; font-size:0.82rem; color:#93c5fd;">${user.id}</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
            <span style="font-size:0.78rem; color:#94a3b8;">Role</span>
            <span style="font-size:0.82rem; color:#fff;">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:12px 0;">
            <span style="font-size:0.78rem; color:#94a3b8;">Last Login</span>
            <span style="font-size:0.82rem; color:#fff;">${user.login}</span>
          </div>
        </div>

      </div>
    </div>
  `

  document.body.insertAdjacentHTML('beforeend', html)
  document.getElementById('view-user-overlay').addEventListener('click', function(e) {
    if (e.target === this) this.remove()
  })
}


// ===== RESET PASSWORD =====
function resetPassword(id) {
  const user = users.find(u => u.id === id)
  if (!user) return

  const confirmed = confirm(`Reset password for ${user.name} (${user.id})?\n\nA new temporary password will be generated and the user will be required to change it on next login.`)
  if (!confirmed) return

  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#!'
  let pw = ''
  for (let i = 0; i < 10; i++) pw += chars[Math.floor(Math.random() * chars.length)]

  alert(`Password reset successful.\n\nNew temporary password for ${user.name}:\n\n${pw}\n\nShare this with the user securely. They will be asked to set a new password on next login.`)

  const resetsEl = document.getElementById('stat-resets')
  if (resetsEl) resetsEl.textContent = parseInt(resetsEl.textContent) + 1
}


// ===== TOGGLE SUSPEND / RESTORE =====
function toggleSuspend(id) {
  const user = users.find(u => u.id === id)
  if (!user) return

  if (user.status === 'suspended') {
    const confirmed = confirm(`Restore access for ${user.name}? They will be able to log in again immediately.`)
    if (!confirmed) return
    user.status = 'active'
  } else {
    const confirmed = confirm(`Suspend ${user.name}?\n\nThey will be immediately logged out and blocked from logging in until restored.`)
    if (!confirmed) return
    user.status = 'suspended'
  }

  filtered = filtered.map(u => u.id === id ? { ...u, status: user.status } : u)
  renderTable(filtered)
  updateStats()
}


// ===== CHANGE ROLE MODAL =====
let currentEditId = null

function openModal(id) {
  const user = users.find(u => u.id === id)
  if (!user) return

  currentEditId = id

  const userDisplay = document.getElementById('modal-user-display')
  const roleDisplay = document.getElementById('current-role-display')
  const roleSelect = document.getElementById('new-role-select')
  const overlay = document.getElementById('modal-overlay')

  if (userDisplay) userDisplay.textContent = `${user.name} (${user.id})`
  if (roleDisplay) roleDisplay.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1)
  if (roleSelect) roleSelect.value = ''
  if (overlay) overlay.classList.add('show')
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay')
  if (overlay) overlay.classList.remove('show')
  currentEditId = null
}

function saveRole() {
  const roleSelect = document.getElementById('new-role-select')
  const newRole = roleSelect ? roleSelect.value : ''

  if (!newRole) {
    alert('Please select a new role.')
    return
  }

  const user = users.find(u => u.id === currentEditId)
  if (!user) return

  if (newRole === user.role) {
    alert('This user already has that role.')
    return
  }

  user.role = newRole
  filtered = filtered.map(u => u.id === currentEditId ? { ...u, role: newRole } : u)

  const btn = document.getElementById('save-role-btn')
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Role Updated!'
  btn.style.background = '#059669'

  setTimeout(() => {
    closeModal()
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Update Role'
    btn.style.background = ''
    renderTable(filtered)
    renderRoleSummary()
  }, 1200)
}


// ===== FILTER FUNCTIONS =====
function filterUsers(val) {
  const v = val.toLowerCase()
  filtered = users.filter(u =>
    u.name.toLowerCase().includes(v) ||
    u.id.toLowerCase().includes(v)
  )
  renderTable(filtered)
}

function filterByRole(role) {
  filtered = role ? users.filter(u => u.role === role) : [...users]
  renderTable(filtered)
}

function filterByStatus(status) {
  filtered = status ? users.filter(u => u.status === status) : [...users]
  renderTable(filtered)
}


// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', () => {

  renderTable(users)
  renderRoleSummary()
  renderLoginLog()
  updateStats()

  const closeBtn = document.getElementById('modal-close-btn')
  const cancelBtn = document.getElementById('modal-cancel-btn')
  const saveBtn = document.getElementById('save-role-btn')
  const overlay = document.getElementById('modal-overlay')

  if (closeBtn) closeBtn.addEventListener('click', closeModal)
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal)
  if (saveBtn) saveBtn.addEventListener('click', saveRole)

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal()
    })
  }

})