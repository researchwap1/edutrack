// ===== CURRENT DATE IN TOPBAR =====
function setCurrentDate() {
  const now = new Date()
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ]
  const days = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
  ]
  const dateString = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`
  const dateEl = document.getElementById('current-date')
  if (dateEl) dateEl.textContent = dateString
}

setCurrentDate()


// ===== COUNTER ANIMATION =====
function animateCounter(elementId, target, duration) {
  const el = document.getElementById(elementId)
  if (!el) return
  let current = 0
  const frames = duration / 16
  const step = target / frames
  const interval = setInterval(() => {
    current += step
    if (current >= target) {
      el.textContent = target
      clearInterval(interval)
    } else {
      el.textContent = Math.floor(current)
    }
  }, 16)
}


// ===== ANIMATE CLASS BARS =====
function animateClassBars() {
  const bars = document.querySelectorAll('.class-bar')
  bars.forEach(bar => {
    const targetWidth = bar.getAttribute('data-width')
    if (targetWidth) {
      setTimeout(() => {
        bar.style.width = targetWidth
      }, 300)
    }
  })
}


// ===== ACTIVE NAV ITEM =====
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop()
  const navItems = document.querySelectorAll('.nav-item')
  navItems.forEach(item => {
    item.classList.remove('active')
    const href = item.getAttribute('href')
    if (href === currentPage) {
      item.classList.add('active')
    }
  })
}

setActiveNav()


// ===== MOBILE SIDEBAR TOGGLE =====
function createMobileToggle() {
  if (window.innerWidth > 768) return
  const toggleBtn = document.createElement('button')
  toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>'
  toggleBtn.style.cssText = `
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 300;
    background: #0d2247;
    border: 1px solid rgba(255,255,255,0.1);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  `
  document.body.appendChild(toggleBtn)
  const sidebar = document.querySelector('.sidebar')
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open')
  })
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
      sidebar.classList.remove('open')
    }
  })
}

createMobileToggle()


// ===== RUN EVERYTHING ON PAGE LOAD =====
window.addEventListener('load', () => {

  // Animate stat card counters
  animateCounter('stat-students', 247, 1500)
  animateCounter('stat-teachers', 18, 1500)
  animateCounter('stat-classes', 6, 1200)
  animateCounter('stat-subjects', 14, 1200)

  // Animate class bars
  animateClassBars()

})