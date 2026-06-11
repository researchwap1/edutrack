// ===== AVATAR COLORS =====
const avatarColors = [
  'linear-gradient(135deg,#1a56db,#3b82f6)',
  'linear-gradient(135deg,#059669,#4ade80)',
  'linear-gradient(135deg,#7c3aed,#a78bfa)',
  'linear-gradient(135deg,#dc2626,#f87171)',
  'linear-gradient(135deg,#d97706,#fcd34d)',
  'linear-gradient(135deg,#0891b2,#67e8f9)',
  'linear-gradient(135deg,#db2777,#f472b6)',
  'linear-gradient(135deg,#65a30d,#a3e635)',
]


// ===== RESULTS DATA =====
let results = [
  { name: 'Grace Osei', reg: 'STU-2024-00412', cls: 'SSS 3', term: 'First Term', avg: 94,
    subjects: [{name:'Economics',score:96},{name:'Mathematics',score:92},{name:'English Language',score:93},{name:'Accounting',score:95}] },

  { name: 'Samuel Adeyemi', reg: 'STU-2024-00789', cls: 'SSS 1', term: 'First Term', avg: 91,
    subjects: [{name:'Mathematics',score:96},{name:'Physics',score:89},{name:'Chemistry',score:92},{name:'English Language',score:87}] },

  { name: 'Chidera Okonkwo', reg: 'STU-2024-00123', cls: 'JSS 2', term: 'First Term', avg: 88,
    subjects: [{name:'Mathematics',score:85},{name:'English Language',score:89},{name:'Basic Science',score:91},{name:'Social Studies',score:87}] },

  { name: 'Fatima Musa', reg: 'STU-2024-00201', cls: 'SSS 2', term: 'First Term', avg: 86,
    subjects: [{name:'Economics',score:88},{name:'Mathematics',score:84},{name:'English Language',score:85},{name:'Biology',score:87}] },

  { name: 'Amara Bello', reg: 'STU-2024-00456', cls: 'JSS 1', term: 'First Term', avg: 84,
    subjects: [{name:'Mathematics',score:82},{name:'English Language',score:85},{name:'Basic Science',score:86},{name:'Civic Education',score:83}] },

  { name: 'Tunde Fashola', reg: 'STU-2024-00567', cls: 'JSS 1', term: 'First Term', avg: 71,
    subjects: [{name:'Mathematics',score:68},{name:'English Language',score:73},{name:'Basic Science',score:70},{name:'Civic Education',score:74}] },

  { name: 'Emeka Nwachukwu', reg: 'STU-2024-00334', cls: 'JSS 3', term: 'First Term', avg: 63,
    subjects: [{name:'Mathematics',score:60},{name:'English Language',score:65},{name:'Basic Science',score:61},{name:'Social Studies',score:66}] },

  { name: 'Ngozi Eze', reg: 'STU-2024-00678', cls: 'SSS 1', term: 'First Term', avg: 48,
    subjects: [{name:'Mathematics',score:45},{name:'Physics',score:50},{name:'Chemistry',score:46},{name:'English Language',score:51}] },
]

let filtered = [...results]


// ===== HELPERS =====
function initials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

// Grade scale: A 75-100, B 65-74, C 55-64, D 45-54, F 0-44
function getGrade(avg) {
  if (avg >= 75) return 'A'
  if (avg >= 65) return 'B'
  if (avg >= 55) return 'C'
  if (avg >= 45) return 'D'
  return 'F'
}

function getBarColor(avg) {
  if (avg >= 75) return 'linear-gradient(90deg,#059669,#4ade80)'
  if (avg >= 65) return 'linear-gradient(90deg,#1a56db,#3b82f6)'
  if (avg >= 55) return 'linear-gradient(90deg,#d97706,#fcd34d)'
  if (avg >= 45) return 'linear-gradient(90deg,#ea580c,#fb923c)'
  return 'linear-gradient(90deg,#dc2626,#f87171)'
}


// ===== RENDER RESULTS TABLE =====
function renderTable(data) {
  const tbody = document.getElementById('results-tbody')
  const countEl = document.getElementById('table-count')

  if (countEl) {
    countEl.textContent = `Showing ${data.length} of ${results.length} students`
  }

  if (!tbody) return

  tbody.innerHTML = data.map((r, i) => `
    <tr>
      <td>
        <div class="student-cell">
          <div class="student-avatar" style="background:${avatarColors[i % avatarColors.length]}">
            ${initials(r.name)}
          </div>
          <div>
            <div class="student-name">${r.name}</div>
            <div style="font-family:monospace; font-size:0.7rem; color:#94a3b8; margin-top:1px;">${r.reg}</div>
          </div>
        </div>
      </td>
      <td><span class="class-badge">${r.cls}</span></td>
      <td><span class="term-tag">${r.term}</span></td>
      <td>
        <div class="score-wrap">
          <div class="score-bar-bg">
            <div class="score-bar" style="width:${r.avg}%; background:${getBarColor(r.avg)};"></div>
          </div>
          <span class="score-val">${r.avg}%</span>
        </div>
      </td>
      <td><span class="grade-badge grade-${getGrade(r.avg).toLowerCase()}">${getGrade(r.avg)}</span></td>
      <td>
        <div class="action-btns">
          <button class="action-icon-btn view" onclick="viewResult('${r.reg}', '${r.term}')">
            <i class="fa-solid fa-eye"></i> View
          </button>
          <button class="action-icon-btn edit" onclick="printResult('${r.reg}', '${r.term}')">
            <i class="fa-solid fa-print"></i> Print
          </button>
        </div>
      </td>
    </tr>
  `).join('')
}


// ===== RENDER GRADE DISTRIBUTION =====
function renderGradeDistribution() {
  const container = document.getElementById('grade-distribution')
  if (!container) return

  const total = results.length
  const grades = ['A', 'B', 'C', 'D', 'F']
  const ranges = { A: '75 - 100', B: '65 - 74', C: '55 - 64', D: '45 - 54', F: '0 - 44' }
  const colors = {
    A: { text: '#4ade80', bar: 'linear-gradient(90deg,#059669,#4ade80)' },
    B: { text: '#93c5fd', bar: 'linear-gradient(90deg,#1a56db,#3b82f6)' },
    C: { text: '#fcd34d', bar: 'linear-gradient(90deg,#d97706,#fcd34d)' },
    D: { text: '#fb923c', bar: 'linear-gradient(90deg,#ea580c,#fb923c)' },
    F: { text: '#f87171', bar: 'linear-gradient(90deg,#dc2626,#f87171)' },
  }

  container.innerHTML = grades.map(g => {
    const count = results.filter(r => getGrade(r.avg) === g).length
    const pct = total > 0 ? Math.round((count / total) * 100) : 0
    return `
      <div class="perf-item">
        <div class="perf-item-top">
          <span class="perf-label">${g}  (${ranges[g]})</span>
          <span class="perf-val" style="color:${colors[g].text};">${pct}%</span>
        </div>
        <div class="perf-bar-wrap">
          <div class="perf-bar" style="width:${pct}%; background:${colors[g].bar};"></div>
        </div>
      </div>
    `
  }).join('')
}


// ===== RENDER TOP PERFORMERS =====
function renderTopPerformers() {
  const container = document.getElementById('top-performers')
  if (!container) return

  // Sort by average descending, take top 5
  const top = [...results].sort((a, b) => b.avg - a.avg).slice(0, 5)

  container.innerHTML = top.map((r, i) => {
    const rankClass = i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-other'
    return `
      <div class="top-item">
        <div class="top-rank ${rankClass}">${i + 1}</div>
        <div class="top-info">
          <div class="top-name">${r.name}</div>
          <div class="top-class">${r.cls} — ${r.term}</div>
        </div>
        <div class="top-score">${r.avg}%</div>
      </div>
    `
  }).join('')
}


// ===== RENDER MINI STATS =====
function renderStats() {
  const total = results.length
  const avg = Math.round(results.reduce((sum, r) => sum + r.avg, 0) / total)
  const passCount = results.filter(r => r.avg >= 45).length
  const passRate = Math.round((passCount / total) * 100)
  const belowCount = results.filter(r => r.avg < 50).length

  const totalEl = document.getElementById('stat-total')
  const avgEl = document.getElementById('stat-avg')
  const passEl = document.getElementById('stat-pass')
  const belowEl = document.getElementById('stat-below')

  if (totalEl) totalEl.textContent = total
  if (avgEl) avgEl.textContent = avg + '%'
  if (passEl) passEl.textContent = passRate + '%'
  if (belowEl) belowEl.textContent = belowCount
}


// ===== VIEW RESULT =====
function viewResult(reg, term) {
  const record = results.find(r => r.reg === reg && r.term === term)
  if (!record) return

  const existing = document.getElementById('view-result-overlay')
  if (existing) existing.remove()

  const subjectRows = record.subjects.map(s => `
    <div style="display:flex; align-items:center; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
      <span style="flex:1; font-size:0.85rem; color:#f0f6ff;">${s.name}</span>
      <div class="score-bar-bg" style="margin:0 12px;">
        <div class="score-bar" style="width:${s.score}%; background:${getBarColor(s.score)};"></div>
      </div>
      <span class="score-val">${s.score}</span>
      <span class="grade-badge grade-${getGrade(s.score).toLowerCase()}" style="margin-left:8px;">${getGrade(s.score)}</span>
    </div>
  `).join('')

  const html = `
    <div id="view-result-overlay" style="
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
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
          <div>
            <div style="font-family:Syne,sans-serif; font-size:1.05rem; font-weight:700;">${record.name}</div>
            <div style="font-size:0.78rem; color:#94a3b8; margin-top:4px;">${record.cls} — ${record.term}</div>
          </div>
          <button onclick="document.getElementById('view-result-overlay').remove()" style="
            width:32px; height:32px; border-radius:8px;
            background:rgba(255,255,255,0.06); border:none;
            color:#94a3b8; cursor:pointer; font-size:14px;
          ">✕</button>
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; padding:14px 16px; background:rgba(59,130,246,0.06); border:1px solid rgba(59,130,246,0.15); border-radius:12px; margin-bottom:18px;">
          <div>
            <div style="font-size:0.72rem; color:#94a3b8;">Term Average</div>
            <div style="font-family:Syne,sans-serif; font-size:1.4rem; font-weight:800; margin-top:2px;">${record.avg}%</div>
          </div>
          <span class="grade-badge grade-${getGrade(record.avg).toLowerCase()}" style="width:42px; height:42px; font-size:1.15rem;">${getGrade(record.avg)}</span>
        </div>

        <div style="font-size:0.72rem; color:#94a3b8; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px;">Subject Breakdown</div>
        <div>
          ${subjectRows}
        </div>

      </div>
    </div>
  `

  document.body.insertAdjacentHTML('beforeend', html)
  document.getElementById('view-result-overlay').addEventListener('click', function(e) {
    if (e.target === this) this.remove()
  })
}


// ===== PRINT RESULT =====
function printResult(reg, term) {
  const record = results.find(r => r.reg === reg && r.term === term)
  if (!record) return

  alert(
    `Print Report Card\n\n` +
    `Generating a PDF report card for ${record.name} (${record.cls} — ${record.term}) requires the backend.\n\n` +
    `Once connected, this button will trigger PHP to generate a PDF and either download it or send it to the student's registered email automatically.`
  )
}


// ===== FILTER FUNCTIONS =====
function filterResults(val) {
  const v = val.toLowerCase()
  filtered = results.filter(r =>
    r.name.toLowerCase().includes(v) ||
    r.reg.toLowerCase().includes(v)
  )
  renderTable(filtered)
}

function filterByClass(cls) {
  filtered = cls ? results.filter(r => r.cls === cls) : [...results]
  renderTable(filtered)
}

function filterByTerm(term) {
  filtered = term ? results.filter(r => r.term === term) : [...results]
  renderTable(filtered)
}

function filterByGrade(grade) {
  filtered = grade ? results.filter(r => getGrade(r.avg) === grade) : [...results]
  renderTable(filtered)
}


// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', () => {
  renderTable(results)
  renderGradeDistribution()
  renderTopPerformers()
  renderStats()
})