// ===== STUDENT DATA =====
const avatarColors = [
  'linear-gradient(135deg,#1a56db,#3b82f6)',
  'linear-gradient(135deg,#059669,#4ade80)',
  'linear-gradient(135deg,#7c3aed,#a78bfa)',
  'linear-gradient(135deg,#dc2626,#f87171)',
  'linear-gradient(135deg,#d97706,#fcd34d)',
  'linear-gradient(135deg,#0891b2,#67e8f9)',
]

const students = [
  { name: 'Chidera Okonkwo', reg: 'STU-2024-00123', cls: 'JSS 2', subjects: 8, status: 'active', date: 'Jan 10, 2024' },
  { name: 'Amara Bello', reg: 'STU-2024-00456', cls: 'JSS 1', subjects: 7, status: 'active', date: 'Jan 10, 2024' },
  { name: 'Samuel Adeyemi', reg: 'STU-2024-00789', cls: 'SSS 1', subjects: 9, status: 'active', date: 'Jan 15, 2024' },
  { name: 'Fatima Musa', reg: 'STU-2024-00201', cls: 'SSS 2', subjects: 9, status: 'active', date: 'Jan 15, 2024' },
  { name: 'Emeka Nwachukwu', reg: 'STU-2024-00334', cls: 'JSS 3', subjects: 8, status: 'inactive', date: 'Feb 3, 2024' },
  { name: 'Grace Osei', reg: 'STU-2024-00412', cls: 'SSS 3', subjects: 10, status: 'active', date: 'Feb 3, 2024' },
  { name: 'Tunde Fashola', reg: 'STU-2024-00567', cls: 'JSS 1', subjects: 7, status: 'active', date: 'Mar 1, 2024' },
  { name: 'Ngozi Eze', reg: 'STU-2024-00678', cls: 'SSS 1', subjects: 9, status: 'inactive', date: 'Mar 1, 2024' },
]

let filtered = [...students]


// ===== GET INITIALS FROM NAME =====
function initials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}


// ===== RENDER TABLE =====
function renderTable(data) {
  const tbody = document.getElementById('student-tbody')
  const countEl = document.getElementById('table-count')

  if (countEl) {
    countEl.textContent = `Showing ${data.length} of 247 students`
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
      <td><span class="status-badge ${s.status}">● ${s.status.charAt(0).toUpperCase() + s.status.slice(1)}</span></td>
      <td style="color:#94a3b8; font-size:0.78rem;">${s.date}</td>
      <td>
        <div class="action-btns">
          <button class="action-icon-btn view">
            <i class="fa-solid fa-eye"></i> View
          </button>
          <button class="action-icon-btn edit">
            <i class="fa-solid fa-pen"></i> Edit
          </button>
          <button class="action-icon-btn delete">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </div>
      </td>
    </tr>
  `).join('')
}


// ===== FILTER BY NAME OR REG NUMBER =====
function filterStudents(val) {
  const v = val.toLowerCase()
  filtered = students.filter(s =>
    s.name.toLowerCase().includes(v) ||
    s.reg.toLowerCase().includes(v)
  )
  renderTable(filtered)
}


// ===== FILTER BY CLASS =====
function filterClass(cls) {
  filtered = cls ? students.filter(s => s.cls === cls) : [...students]
  renderTable(filtered)
}


// ===== FILTER BY STATUS =====
function filterStatus(status) {
  filtered = status ? students.filter(s => s.status === status) : [...students]
  renderTable(filtered)
}


// ===== GENERATE RANDOM PASSWORD =====
function generatePw() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#!'
  let pw = ''
  for (let i = 0; i < 12; i++) {
    pw += chars[Math.floor(Math.random() * chars.length)]
  }
  return pw
}


// ===== OPEN MODAL =====
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

  // Render table on page load
  renderTable(students)

  // Close modal buttons
  const closeBtn = document.getElementById('modal-close-btn')
  const cancelBtn = document.getElementById('modal-cancel-btn')
  const saveBtn = document.getElementById('save-student-btn')
  const copyBtn = document.getElementById('copy-pw-btn')
  const overlay = document.getElementById('modal-overlay')

  if (closeBtn) closeBtn.addEventListener('click', closeModal)
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal)
  if (saveBtn) saveBtn.addEventListener('click', saveStudent)

  // Copy password button
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

  // Close modal when clicking outside
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal()
    })
  }

})