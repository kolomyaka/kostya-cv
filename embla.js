import EmblaCarousel from 'embla-carousel'

const wrapperNode = document.querySelectorAll('.embla')

wrapperNode.forEach((wrapper) => {
    const viewportNode = wrapper.querySelector('.embla__viewport')
    const prevButtonNode = wrapper.querySelector('.embla__prev')
    const nextButtonNode = wrapper.querySelector('.embla__next')


    const emblaApi = EmblaCarousel(viewportNode, { loop: false })

    prevButtonNode.addEventListener('click', () => emblaApi.scrollPrev(), false)
    nextButtonNode.addEventListener('click', () => emblaApi.scrollNext(), false)
})

