// ===== SUBJECT DATA =====
const subjectIcons = ['📐', '📖', '🔬', '🌍', '⚗️', '🧬', '💰', '🏛️', '✏️', '🖥️', '🎨', '🏃', '🎵', '📊']

let subjects = [
  { name: 'Mathematics', classes: ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1'], teacher: 'Mr. James Okafor', students: 169 },
  { name: 'English Language', classes: ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'], teacher: 'Mrs. Ngozi Adeyemi', students: 247 },
  { name: 'Biology', classes: ['SSS 1', 'SSS 2', 'SSS 3'], teacher: 'Mr. David Chukwu', students: 123 },
  { name: 'Chemistry', classes: ['SSS 1', 'SSS 2', 'SSS 3'], teacher: 'Mr. David Chukwu', students: 123 },
  { name: 'Physics', classes: ['SSS 1', 'SSS 2'], teacher: 'Mr. James Okafor', students: 79 },
  { name: 'Social Studies', classes: ['JSS 1', 'JSS 2', 'JSS 3'], teacher: 'Mrs. Amaka Obi', students: 124 },
  { name: 'Civic Education', classes: ['JSS 1', 'JSS 3', 'SSS 1'], teacher: 'Mrs. Amaka Obi', students: 126 },
  { name: 'Economics', classes: ['SSS 1', 'SSS 2', 'SSS 3'], teacher: 'Mr. Femi Ade', students: 123 },
]

let filtered = [...subjects]

const allClasses = ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3']


// ===== RENDER TABLE =====
function renderTable(data) {
  const tbody = document.getElementById('subject-tbody')
  const countEl = document.getElementById('table-count')

  if (countEl) {
    countEl.textContent = `Showing ${data.length} of ${subjects.length} subjects`
  }

  if (!tbody) return

  tbody.innerHTML = data.map((s, i) => `
    <tr>
      <td>
        <div class="subject-cell">
          <div class="subject-icon-cell">${subjectIcons[i % subjectIcons.length]}</div>
          <span style="font-weight:500; color:#ffffff;">${s.name}</span>
        </div>
      </td>
      <td>
        <div class="class-tags">
          ${s.classes.map(c => `<span class="class-tag">${c}</span>`).join('')}
        </div>
      </td>
      <td><span class="teacher-tag">${s.teacher}</span></td>
      <td style="color:#94a3b8;">${s.students} students</td>
      <td>
        <div class="action-btns">
          <button class="subj-action-btn edit" onclick="editSubject('${s.name}')">
            <i class="fa-solid fa-pen"></i> Edit
          </button>
          <button class="subj-action-btn assign" onclick="assignSubject('${s.name}')">
            <i class="fa-solid fa-link"></i> Assign
          </button>
          <button class="subj-action-btn delete" onclick="deleteSubject('${s.name}')">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </div>
      </td>
    </tr>
  `).join('')
}


// ===== RENDER CLASS BREAKDOWN =====
function renderBreakdown() {
  const container = document.getElementById('class-breakdown')
  if (!container) return

  const maxSubjects = Math.max(...allClasses.map(cls =>
    subjects.filter(s => s.classes.includes(cls)).length
  ))

  container.innerHTML = allClasses.map(cls => {
    const count = subjects.filter(s => s.classes.includes(cls)).length
    const pct = maxSubjects > 0 ? Math.round((count / maxSubjects) * 100) : 0
    return `
      <div class="class-breakdown-item">
        <div class="class-breakdown-top">
          <span class="class-breakdown-name">${cls}</span>
          <span class="class-breakdown-count">${count} subjects</span>
        </div>
        <div class="class-breakdown-bar-wrap">
          <div class="class-breakdown-bar" style="width:${pct}%;"></div>
        </div>
      </div>
    `
  }).join('')
}


// ===== FILTER FUNCTIONS =====
function filterSubjects(val) {
  const v = val.toLowerCase()
  filtered = v ? subjects.filter(s => s.name.toLowerCase().includes(v)) : [...subjects]
  renderTable(filtered)
}

function filterClass(cls) {
  filtered = cls ? subjects.filter(s => s.classes.includes(cls)) : [...subjects]
  renderTable(filtered)
}


// ===== TOGGLE CHECKBOX =====
function toggleCheck(el) {
  el.classList.toggle('checked')
}


// ===== EDIT SUBJECT =====
function editSubject(name) {
  const subject = subjects.find(s => s.name === name)
  if (!subject) return

  const existing = document.getElementById('edit-subject-overlay')
  if (existing) existing.remove()

  const html = `
    <div id="edit-subject-overlay" style="
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
        max-height:90vh;
        overflow-y:auto;
      ">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:22px;">
          <div>
            <div style="font-family:Syne,sans-serif; font-size:1.05rem; font-weight:700;">Edit Subject</div>
            <div style="font-size:0.78rem; color:#94a3b8; margin-top:4px;">Update details for ${subject.name}</div>
          </div>
          <button onclick="document.getElementById('edit-subject-overlay').remove()" style="
            width:32px; height:32px; border-radius:8px;
            background:rgba(255,255,255,0.06); border:none;
            color:#94a3b8; cursor:pointer; font-size:14px;
          ">✕</button>
        </div>

        <div style="margin-bottom:14px;">
          <label style="display:block; font-size:0.78rem; color:#94a3b8; margin-bottom:7px;">Subject Name</label>
          <input id="edit-subject-name" type="text" value="${subject.name}" style="
            width:100%; padding:11px 14px;
            background:rgba(255,255,255,0.05);
            border:1px solid rgba(255,255,255,0.08);
            border-radius:10px; color:#fff;
            font-size:0.88rem; outline:none;
            font-family:'DM Sans',sans-serif;
          " />
        </div>

        <div style="margin-bottom:14px;">
          <label style="display:block; font-size:0.78rem; color:#94a3b8; margin-bottom:7px;">Teacher</label>
          <select id="edit-subject-teacher" style="
            width:100%; padding:11px 14px;
            background:rgba(255,255,255,0.05);
            border:1px solid rgba(255,255,255,0.08);
            border-radius:10px; color:#fff;
            font-size:0.88rem; outline:none; cursor:pointer;
            font-family:'DM Sans',sans-serif;
          ">
            <option style="background:#0d2247;" ${subject.teacher === 'Mr. James Okafor' ? 'selected' : ''}>Mr. James Okafor</option>
            <option style="background:#0d2247;" ${subject.teacher === 'Mrs. Ngozi Adeyemi' ? 'selected' : ''}>Mrs. Ngozi Adeyemi</option>
            <option style="background:#0d2247;" ${subject.teacher === 'Mr. David Chukwu' ? 'selected' : ''}>Mr. David Chukwu</option>
            <option style="background:#0d2247;" ${subject.teacher === 'Mrs. Amaka Obi' ? 'selected' : ''}>Mrs. Amaka Obi</option>
            <option style="background:#0d2247;" ${subject.teacher === 'Mr. Femi Ade' ? 'selected' : ''}>Mr. Femi Ade</option>
          </select>
        </div>

        <div style="display:flex; gap:10px; justify-content:flex-end; padding-top:18px; border-top:1px solid rgba(255,255,255,0.06);">
          <button onclick="document.getElementById('edit-subject-overlay').remove()" style="
            padding:10px 20px; background:transparent;
            border:1px solid rgba(255,255,255,0.1);
            border-radius:10px; color:#94a3b8;
            font-size:0.88rem; cursor:pointer;
            font-family:'DM Sans',sans-serif;
          ">Cancel</button>
          <button onclick="saveSubjectEdit('${subject.name}')" style="
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
  document.getElementById('edit-subject-overlay').addEventListener('click', function(e) {
    if (e.target === this) this.remove()
  })
}


// ===== SAVE SUBJECT EDIT =====
function saveSubjectEdit(originalName) {
  const subject = subjects.find(s => s.name === originalName)
  if (!subject) return

  const newName = document.getElementById('edit-subject-name').value.trim()
  const newTeacher = document.getElementById('edit-subject-teacher').value

  if (!newName) {
    alert('Subject name cannot be empty.')
    return
  }

  subject.name = newName
  subject.teacher = newTeacher
  filtered = filtered.map(s => s.name === originalName ? { ...s, name: newName, teacher: newTeacher } : s)

  document.getElementById('edit-subject-overlay').remove()
  renderTable(filtered)
  renderBreakdown()
}


// ===== ASSIGN SUBJECT TO CLASSES =====
function assignSubject(name) {
  const subject = subjects.find(s => s.name === name)
  if (!subject) return

  const existing = document.getElementById('assign-overlay')
  if (existing) existing.remove()

  const checkboxes = allClasses.map(cls => `
    <div class="checkbox-item ${subject.classes.includes(cls) ? 'checked' : ''}" data-class="${cls}" onclick="toggleCheck(this)">
      <div class="check-box"><i class="fa-solid fa-check" style="font-size:9px;"></i></div>
      <span class="check-label">${cls}</span>
    </div>
  `).join('')

  const html = `
    <div id="assign-overlay" style="
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
            <div style="font-family:Syne,sans-serif; font-size:1.05rem; font-weight:700;">Assign Classes</div>
            <div style="font-size:0.78rem; color:#94a3b8; margin-top:4px;">Select classes for ${subject.name}</div>
          </div>
          <button onclick="document.getElementById('assign-overlay').remove()" style="
            width:32px; height:32px; border-radius:8px;
            background:rgba(255,255,255,0.06); border:none;
            color:#94a3b8; cursor:pointer; font-size:14px;
          ">✕</button>
        </div>

        <div id="assign-checkboxes" style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:20px;">
          ${checkboxes}
        </div>

        <div style="display:flex; gap:10px; justify-content:flex-end; padding-top:18px; border-top:1px solid rgba(255,255,255,0.06);">
          <button onclick="document.getElementById('assign-overlay').remove()" class="modal-btn-cancel-dyn">Cancel</button>
          <button onclick="saveAssignment('${subject.name}')" class="modal-btn-save-dyn">
            <i class='fa-solid fa-check'></i> Save Assignment
          </button>
        </div>

      </div>
    </div>
  `

  document.body.insertAdjacentHTML('beforeend', html)
  document.getElementById('assign-overlay').addEventListener('click', function(e) {
    if (e.target === this) this.remove()
  })
}


// ===== SAVE ASSIGNMENT =====
function saveAssignment(subjectName) {
  const subject = subjects.find(s => s.name === subjectName)
  if (!subject) return

  const checkedItems = document.querySelectorAll('#assign-checkboxes .checkbox-item.checked')
  const selectedClasses = Array.from(checkedItems).map(el => el.getAttribute('data-class'))

  if (selectedClasses.length === 0) {
    alert('Please select at least one class.')
    return
  }

  subject.classes = selectedClasses
  filtered = filtered.map(s => s.name === subjectName ? { ...s, classes: selectedClasses } : s)

  document.getElementById('assign-overlay').remove()
  renderTable(filtered)
  renderBreakdown()
}


// ===== DELETE SUBJECT =====
function deleteSubject(name) {
  const subject = subjects.find(s => s.name === name)
  if (!subject) return

  const confirmed = confirm(
    `⚠ PERMANENT REMOVAL\n\nAre you sure you want to permanently remove:\n\nSubject: ${subject.name}\nClasses: ${subject.classes.join(', ')}\nTeacher: ${subject.teacher}\n\nThis action CANNOT be undone. Proceed?`
  )

  if (!confirmed) return

  const index = subjects.findIndex(s => s.name === name)
  if (index !== -1) subjects.splice(index, 1)
  filtered = filtered.filter(s => s.name !== name)

  renderTable(filtered)
  renderBreakdown()

  const statEl = document.getElementById('stat-total')
  if (statEl) statEl.textContent = subjects.length
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

  const nameEl = document.getElementById('subject-name')
  const teacherEl = document.getElementById('subject-teacher')
  if (nameEl) nameEl.value = ''
  if (teacherEl) teacherEl.value = ''

  document.querySelectorAll('#class-checkboxes .checkbox-item').forEach(el => {
    el.classList.remove('checked')
  })
}


// ===== SAVE NEW SUBJECT =====
function saveSubject() {
  const name = document.getElementById('subject-name').value.trim()
  const teacher = document.getElementById('subject-teacher').value
  const checkedItems = document.querySelectorAll('#class-checkboxes .checkbox-item.checked')
  const selectedClasses = Array.from(checkedItems).map(el => el.getAttribute('data-class'))

  if (!name) {
    alert('Please enter a subject name.')
    return
  }

  if (selectedClasses.length === 0) {
    alert('Please select at least one class.')
    return
  }

  const exists = subjects.find(s => s.name.toLowerCase() === name.toLowerCase())
  if (exists) {
    alert(`A subject named "${name}" already exists.`)
    return
  }

  const newSubject = {
    name: name,
    classes: selectedClasses,
    teacher: teacher || 'Not Assigned',
    students: 0
  }

  subjects.push(newSubject)
  filtered = [...subjects]

  const btn = document.getElementById('save-subject-btn')
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Subject Saved!'
  btn.style.background = '#059669'

  setTimeout(() => {
    closeModal()
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Save Subject'
    btn.style.background = ''
    renderTable(filtered)
    renderBreakdown()
    const statEl = document.getElementById('stat-total')
    if (statEl) statEl.textContent = subjects.length
  }, 1000)
}


// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', () => {

  renderTable(subjects)
  renderBreakdown()

  const closeBtn = document.getElementById('modal-close-btn')
  const cancelBtn = document.getElementById('modal-cancel-btn')
  const saveBtn = document.getElementById('save-subject-btn')
  const overlay = document.getElementById('modal-overlay')

  if (closeBtn) closeBtn.addEventListener('click', closeModal)
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal)
  if (saveBtn) saveBtn.addEventListener('click', saveSubject)

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal()
    })
  }

})