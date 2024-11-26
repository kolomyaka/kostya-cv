import './style.css'

const accordionElements = document.getElementsByClassName('accordion__title')

for (let i = 0; i < accordionElements.length; i++) {
    const currentAccordion = accordionElements[i]
    currentAccordion.addEventListener('click', () => {
      const arrow = currentAccordion.querySelector('.accordion__title--arrow');
      const content = currentAccordion.nextElementSibling
      arrow.classList.toggle('active');
      content.classList.toggle('active');
  })
}