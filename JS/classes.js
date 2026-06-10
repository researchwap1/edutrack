// ===== CLASS COLORS =====
const classColors = [
  { bg: 'rgba(26,86,219,0.15)', border: 'rgba(26,86,219,0.3)', badge: 'rgba(26,86,219,0.2)', text: '#93c5fd', progress: 'linear-gradient(90deg,#1a56db,#3b82f6)' },
  { bg: 'rgba(5,150,105,0.15)', border: 'rgba(5,150,105,0.3)', badge: 'rgba(5,150,105,0.2)', text: '#6ee7b7', progress: 'linear-gradient(90deg,#059669,#4ade80)' },
  { bg: 'rgba(124,58,237,0.15)', border: 'rgba(124,58,237,0.3)', badge: 'rgba(124,58,237,0.2)', text: '#c4b5fd', progress: 'linear-gradient(90deg,#7c3aed,#a78bfa)' },
  { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)', badge: 'rgba(245,158,11,0.2)', text: '#fcd34d', progress: 'linear-gradient(90deg,#d97706,#fcd34d)' },
  { bg: 'rgba(220,38,38,0.15)', border: 'rgba(220,38,38,0.3)', badge: 'rgba(220,38,38,0.2)', text: '#fca5a5', progress: 'linear-gradient(90deg,#dc2626,#f87171)' },
  { bg: 'rgba(8,145,178,0.15)', border: 'rgba(8,145,178,0.3)', badge: 'rgba(8,145,178,0.2)', text: '#67e8f9', progress: 'linear-gradient(90deg,#0891b2,#67e8f9)' },
]


// ===== CLASS DATA =====
let classes = [
  { name: 'JSS 1', level: 'Junior Secondary', students: 45, teacher: 'Mrs. Ngozi Adeyemi', subjects: ['English', 'Maths', 'Science', 'Social Studies', 'Civic Edu', 'CRS', 'French', '+1'], capacity: 50 },
  { name: 'JSS 2', level: 'Junior Secondary', students: 41, teacher: 'Mr. James Okafor', subjects: ['English', 'Maths', 'Physics', 'Chemistry', 'Biology', 'History', '+2'], capacity: 50 },
  { name: 'JSS 3', level: 'Junior Secondary', students: 38, teacher: 'Mrs. Amaka Obi', subjects: ['English', 'Maths', 'Science', 'Social Studies', 'Civic Edu', '+3'], capacity: 50 },
  { name: 'SSS 1', level: 'Senior Secondary', students: 43, teacher: 'Mr. Femi Ade', subjects: ['English', 'Maths', 'Economics', 'Commerce', 'Biology', '+4'], capacity: 50 },
  { name: 'SSS 2', level: 'Senior Secondary', students: 36, teacher: 'Mr. David Chukwu', subjects: ['English', 'Maths', 'Chemistry', 'Physics', 'Biology', '+3'], capacity: 50 },
  { name: 'SSS 3', level: 'Senior Secondary', students: 44, teacher: 'Mrs. Ngozi Adeyemi', subjects: ['English', 'Maths', 'Economics', 'Accounting', 'Biology', '+4'], capacity: 50 },
]


// ===== RENDER CLASS CARDS =====
function renderClasses() {
  const grid = document.getElementById('classes-grid')
  if (!grid) return

  grid.innerHTML = classes.map((cls, i) => {
    const c = classColors[i % classColors.length]
    const pct = Math.round((cls.students / cls.capacity) * 100)

    return `
      <div class="class-card" style="border:1px solid ${c.border};">

        <div class="class-card-top">
          <div>
            <div class="class-name-big">${cls.name}</div>
            <div class="class-level-text">${cls.level}</div>
          </div>
          <div class="class-badge-big" style="background:${c.badge}; color:${c.text};">
            ${cls.name.replace(' ', '')}
          </div>
        </div>

        <div class="class-card-body">

          <div class="class-stat-row">
            <span class="class-stat-label">Students Enrolled</span>
            <span class="class-stat-val">${cls.students} / ${cls.capacity}</span>
          </div>

          <div class="class-progress-wrap">
            <div class="class-progress" style="width:${pct}%; background:${c.progress};"></div>
          </div>

          <div class="class-stat-row">
            <span class="class-stat-label">Class Teacher</span>
            <span class="class-stat-val" style="font-size:0.8rem;">${cls.teacher}</span>
          </div>

          <div class="class-stat-row" style="margin-bottom:12px;">
            <span class="class-stat-label">Subjects</span>
            <span class="class-stat-val">${cls.subjects.length} subjects</span>
          </div>

          <div class="class-subjects">
            ${cls.subjects.length > 0
              ? cls.subjects.map(s => `
                  <span class="subject-chip" style="background:${c.bg}; border:1px solid ${c.border}; color:${c.text};">
                    ${s}
                  </span>
                `).join('')
              : `<span style="font-size:0.72rem; color:#94a3b8; font-style:italic;">
                  No subjects assigned yet. Go to Manage Subjects to assign.
                </span>`
            }
          </div>

          <div class="class-card-actions">
            <button class="class-action-btn view" onclick="viewClass('${cls.name}')">
              <i class="fa-solid fa-eye"></i> View
            </button>
            <button class="class-action-btn edit" onclick="editClass('${cls.name}')">
              <i class="fa-solid fa-pen"></i> Edit
            </button>
            <button class="class-action-btn delete" onclick="deleteClass('${cls.name}')">
              <i class="fa-solid fa-trash"></i> Delete
            </button>
          </div>

        </div>
      </div>
    `
  }).join('')
}


// ===== VIEW CLASS =====
function viewClass(name) {
  const cls = classes.find(c => c.name === name)
  if (!cls) return

  const existing = document.getElementById('view-class-overlay')
  if (existing) existing.remove()

  const c = classColors[classes.indexOf(cls) % classColors.length]
  const pct = Math.round((cls.students / cls.capacity) * 100)

  const html = `
    <div id="view-class-overlay" style="
      position:fixed; inset:0;
      background:rgba(0,0,0,0.65);
      z-index:200;
      display:flex;
      align-items:center;
      justify-content:center;
    ">
      <div style="
        background:#0d2247;
        border:1px solid ${c.border};
        border-radius:20px;
        padding:28px;
        width:100%;
        max-width:460px;
        margin:20px;
        max-height:90vh;
        overflow-y:auto;
      ">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <div>
            <div style="font-family:Syne,sans-serif; font-size:1.05rem; font-weight:700;">${cls.name} — Class Profile</div>
            <div style="font-size:0.78rem; color:#94a3b8; margin-top:4px;">${cls.level}</div>
          </div>
          <button onclick="document.getElementById('view-class-overlay').remove()" style="
            width:32px; height:32px; border-radius:8px;
            background:rgba(255,255,255,0.06); border:none;
            color:#94a3b8; cursor:pointer; font-size:14px;
          ">✕</button>
        </div>

        <div style="padding:16px; background:${c.bg}; border:1px solid ${c.border}; border-radius:12px; margin-bottom:18px; display:flex; align-items:center; gap:16px;">
          <div style="width:52px; height:52px; border-radius:14px; background:${c.badge}; display:flex; align-items:center; justify-content:center; font-family:Syne,sans-serif; font-weight:800; font-size:0.9rem; color:${c.text}; flex-shrink:0;">
            ${cls.name.replace(' ', '')}
          </div>
          <div style="flex:1;">
            <div style="font-family:Syne,sans-serif; font-weight:700; font-size:1.1rem;">${cls.name}</div>
            <div style="font-size:0.75rem; color:#94a3b8; margin-top:2px;">${cls.students} of ${cls.capacity} students — ${pct}% capacity</div>
            <div style="height:4px; background:rgba(255,255,255,0.07); border-radius:10px; margin-top:8px; overflow:hidden;">
              <div style="height:100%; width:${pct}%; background:${c.progress}; border-radius:10px;"></div>
            </div>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:0;">
          <div style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
            <span style="font-size:0.78rem; color:#94a3b8;">Level</span>
            <span style="font-size:0.82rem; color:#fff;">${cls.level}</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
            <span style="font-size:0.78rem; color:#94a3b8;">Class Teacher</span>
            <span style="font-size:0.82rem; color:#fff;">${cls.teacher}</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
            <span style="font-size:0.78rem; color:#94a3b8;">Students Enrolled</span>
            <span style="font-size:0.82rem; color:#fff;">${cls.students} / ${cls.capacity}</span>
          </div>
          <div style="padding:12px 0;">
            <div style="font-size:0.78rem; color:#94a3b8; margin-bottom:10px;">Subjects (${cls.subjects.length})</div>
            <div style="display:flex; flex-wrap:wrap; gap:5px;">
              ${cls.subjects.map(s => `
                <span style="font-size:0.68rem; padding:3px 9px; border-radius:6px; background:${c.bg}; border:1px solid ${c.border}; color:${c.text};">${s}</span>
              `).join('')}
            </div>
          </div>
        </div>

      </div>
    </div>
  `

  document.body.insertAdjacentHTML('beforeend', html)
  document.getElementById('view-class-overlay').addEventListener('click', function(e) {
    if (e.target === this) this.remove()
  })
}


// ===== EDIT CLASS =====
function editClass(name) {
  const cls = classes.find(c => c.name === name)
  if (!cls) return

  const existing = document.getElementById('edit-class-overlay')
  if (existing) existing.remove()

  const html = `
    <div id="edit-class-overlay" style="
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
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:22px;">
          <div>
            <div style="font-family:Syne,sans-serif; font-size:1.05rem; font-weight:700;">Edit Class</div>
            <div style="font-size:0.78rem; color:#94a3b8; margin-top:4px;">Update details for ${cls.name}</div>
          </div>
          <button onclick="document.getElementById('edit-class-overlay').remove()" style="
            width:32px; height:32px; border-radius:8px;
            background:rgba(255,255,255,0.06); border:none;
            color:#94a3b8; cursor:pointer; font-size:14px;
          ">✕</button>
        </div>

        <div style="margin-bottom:14px;">
          <label style="display:block; font-size:0.78rem; color:#94a3b8; margin-bottom:7px;">Class Name</label>
          <input id="edit-class-name" type="text" value="${cls.name}" style="
            width:100%; padding:11px 14px;
            background:rgba(255,255,255,0.05);
            border:1px solid rgba(255,255,255,0.08);
            border-radius:10px; color:#fff;
            font-size:0.88rem; outline:none;
            font-family:'DM Sans',sans-serif;
          " />
        </div>

        <div style="margin-bottom:14px;">
          <label style="display:block; font-size:0.78rem; color:#94a3b8; margin-bottom:7px;">Class Teacher</label>
          <select id="edit-class-teacher" style="
            width:100%; padding:11px 14px;
            background:rgba(255,255,255,0.05);
            border:1px solid rgba(255,255,255,0.08);
            border-radius:10px; color:#fff;
            font-size:0.88rem; outline:none; cursor:pointer;
            font-family:'DM Sans',sans-serif;
          ">
            <option style="background:#0d2247;" ${cls.teacher === 'Mr. James Okafor' ? 'selected' : ''}>Mr. James Okafor</option>
            <option style="background:#0d2247;" ${cls.teacher === 'Mrs. Ngozi Adeyemi' ? 'selected' : ''}>Mrs. Ngozi Adeyemi</option>
            <option style="background:#0d2247;" ${cls.teacher === 'Mr. David Chukwu' ? 'selected' : ''}>Mr. David Chukwu</option>
            <option style="background:#0d2247;" ${cls.teacher === 'Mrs. Amaka Obi' ? 'selected' : ''}>Mrs. Amaka Obi</option>
            <option style="background:#0d2247;" ${cls.teacher === 'Mr. Femi Ade' ? 'selected' : ''}>Mr. Femi Ade</option>
          </select>
        </div>

        <div style="display:flex; gap:10px; justify-content:flex-end; padding-top:18px; border-top:1px solid rgba(255,255,255,0.06);">
          <button onclick="document.getElementById('edit-class-overlay').remove()" style="
            padding:10px 20px; background:transparent;
            border:1px solid rgba(255,255,255,0.1);
            border-radius:10px; color:#94a3b8;
            font-size:0.88rem; cursor:pointer;
            font-family:'DM Sans',sans-serif;
          ">Cancel</button>
          <button onclick="saveClassEdit('${cls.name}')" style="
            display:flex; align-items:center; gap:8px;
            padding:10px 20px; background:#1a56db;
            border:none; border-radius:10px; color:#fff;
            font-size:0.88rem; font-weight:600; cursor:pointer;
            font-family:'DM Sans',sans-serif;
          ">
            <i class='fa-solid fa-check'></i> Save Changes
          </button>
        </div>

      </div>
    </div>
  `

  document.body.insertAdjacentHTML('beforeend', html)
  document.getElementById('edit-class-overlay').addEventListener('click', function(e) {
    if (e.target === this) this.remove()
  })
}


// ===== SAVE CLASS EDIT =====
function saveClassEdit(originalName) {
  const cls = classes.find(c => c.name === originalName)
  if (!cls) return

  const newName = document.getElementById('edit-class-name').value.trim()
  const newTeacher = document.getElementById('edit-class-teacher').value

  if (!newName) {
    alert('Class name cannot be empty.')
    return
  }

  cls.name = newName
  cls.teacher = newTeacher

  document.getElementById('edit-class-overlay').remove()
  renderClasses()
}


// ===== DELETE CLASS =====
function deleteClass(name) {
  const cls = classes.find(c => c.name === name)
  if (!cls) return

  const confirmed = confirm(
    `⚠ PERMANENT REMOVAL\n\nAre you sure you want to permanently remove:\n\nClass: ${cls.name}\nStudents Enrolled: ${cls.students}\nClass Teacher: ${cls.teacher}\n\nAll students in this class will need to be reassigned. This action CANNOT be undone. Proceed?`
  )

  if (!confirmed) return

  const index = classes.findIndex(c => c.name === name)
  if (index !== -1) classes.splice(index, 1)
  renderClasses()
}


// ===== OPEN MODAL =====
function openModal() {
  const overlay = document.getElementById('modal-overlay')
  if (overlay) overlay.classList.add('show')
}


// ===== CLOSE MODAL =====
function closeModal() {
  const overlay = document.getElementById('modal-overlay')
  if (overlay) overlay.classList.remove('show')
  const nameEl = document.getElementById('class-name')
  const levelEl = document.getElementById('class-level')
  const teacherEl = document.getElementById('class-teacher')
  const capacityEl = document.getElementById('class-capacity')
  if (nameEl) nameEl.value = ''
  if (levelEl) levelEl.value = ''
  if (teacherEl) teacherEl.value = ''
  if (capacityEl) capacityEl.value = '50'
}


// ===== SAVE NEW CLASS =====
function saveClass() {
  const name = document.getElementById('class-name').value.trim()
  const level = document.getElementById('class-level').value
  const teacher = document.getElementById('class-teacher').value

  if (!name || !level) {
    alert('Please fill in the class name and level.')
    return
  }

  const exists = classes.find(c => c.name.toLowerCase() === name.toLowerCase())
  if (exists) {
    alert(`A class named "${name}" already exists.`)
    return
  }

  const capacityInput = document.getElementById('class-capacity')
  const capacity = capacityInput ? parseInt(capacityInput.value) || 50 : 50

  const newClass = {
    name: name,
    level: level.includes('Junior') ? 'Junior Secondary' : 'Senior Secondary',
    students: 0,
    teacher: teacher || 'Not Assigned',
    subjects: [],
    capacity: capacity
  }

  classes.push(newClass)

  const btn = document.getElementById('save-class-btn')
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Class Saved!'
  btn.style.background = '#059669'

  setTimeout(() => {
    closeModal()
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Save Class'
    btn.style.background = ''
    renderClasses()
  }, 1000)
}


// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', () => {

  renderClasses()

  const closeBtn = document.getElementById('modal-close-btn')
  const cancelBtn = document.getElementById('modal-cancel-btn')
  const saveBtn = document.getElementById('save-class-btn')
  const overlay = document.getElementById('modal-overlay')

  if (closeBtn) closeBtn.addEventListener('click', closeModal)
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal)
  if (saveBtn) saveBtn.addEventListener('click', saveClass)

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal()
    })
  }

})