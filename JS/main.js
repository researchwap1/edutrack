// ===== SCORE BAR ANIMATION =====

// Wait for the page to fully load before animating
window.addEventListener('load', () => {

  // Delay the animation by 500ms so it feels intentional
  setTimeout(() => {

    // Grab all score bar elements
    const scoreBars = document.querySelectorAll('.score-bar')

    // Loop through each bar
    scoreBars.forEach(bar => {

      // Read the data-width attribute from the HTML
      const targetWidth = bar.getAttribute('data-width')

      // Set the width using JavaScript
      // This triggers the CSS transition animation
      bar.style.width = targetWidth
    })

  }, 500)

})


// ===== SCROLL REVEAL ANIMATION =====

// Grab all elements with the reveal class
const revealElements = document.querySelectorAll('.reveal')

// Create an IntersectionObserver to watch them
const revealObserver = new IntersectionObserver((entries) => {

  // Loop through each entry
  entries.forEach((entry, index) => {

    // Check if the element is visible on screen
    if (entry.isIntersecting) {

      // Add a staggered delay based on the element's position
      // First element appears immediately
      // Second element appears 120ms later and so on
      setTimeout(() => {
        entry.target.classList.add('visible')
      }, index * 120)

    }
  })

}, {
  // Element must be at least 10% visible before triggering
  threshold: 0.1
})

// Tell the observer to watch each reveal element
revealElements.forEach(el => {
  revealObserver.observe(el)
})