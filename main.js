import './style.css'

const accordionElements = document.getElementsByClassName('accordion__title')
const scrollButton = document.querySelector('.scroll-button')

for (let i = 0; i < accordionElements.length; i++) {
    const currentAccordion = accordionElements[i]
    currentAccordion.addEventListener('click', () => {
      const arrow = currentAccordion.querySelector('.accordion__title--arrow');
      const content = currentAccordion.nextElementSibling
      arrow.classList.toggle('active');
      content.classList.toggle('active');
  })
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

function toggleScrollButton() {
    console.log('here', window.scrollY)
    if (window.scrollY > 200) {
        scrollButton.classList.add('show')
    } else {
        scrollButton.classList.remove('show')
    }
}

// Add event listener to the scroll button
scrollButton.addEventListener('click', scrollToTop)

// Add event listener to window scroll
window.addEventListener('scroll', toggleScrollButton)

// Initial check to see if the button should be visible
toggleScrollButton()