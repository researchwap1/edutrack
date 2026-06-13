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
  const sidebar = document.querySelector('.sidebar')
  if (!sidebar) return

  // Hamburger button — always created, visibility controlled by CSS media query
  const toggleBtn = document.createElement('button')
  toggleBtn.className = 'mobile-toggle-btn'
  toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>'
  document.body.appendChild(toggleBtn)

  // Dark backdrop behind the sidebar when open on mobile
  const backdrop = document.createElement('div')
  backdrop.className = 'sidebar-backdrop'
  document.body.appendChild(backdrop)

 function closeSidebar() {
    sidebar.classList.remove('open')
    backdrop.classList.remove('show')
    updateToggleIcon()
  }

  function openSidebar() {
    sidebar.classList.add('open')
    backdrop.classList.add('show')
    updateToggleIcon()
  }

 toggleBtn.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
      closeSidebar()
    } else {
      openSidebar()
    }
  })

  // Update the icon to reflect open/closed state
  function updateToggleIcon() {
    toggleBtn.innerHTML = sidebar.classList.contains('open')
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>'
  }

  backdrop.addEventListener('click', closeSidebar)

  // If the window is resized back to desktop width, force-close the drawer
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeSidebar()
  })
}

createMobileToggle()


// ===== CLAMP A FLOATING MENU SO IT NEVER GOES OFF-SCREEN =====
function clampMenuPosition(x, y, menuWidth, menuHeight) {
  const padding = 10
  let left = x - (menuWidth / 2)
  let top = y + 8

  if (left < padding) left = padding
  if (left + menuWidth > window.innerWidth - padding) {
    left = window.innerWidth - menuWidth - padding
  }
  if (top + menuHeight > window.innerHeight - padding) {
    top = y - menuHeight - 8
  }

  return { left, top }
}


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