const ScrollTrigger = ( cn, tg ) => {

    var offset = 300

    if (!window && !document) return
    
    var el = document.querySelector(cn)
    var boundEl = el && el.getBoundingClientRect() || null
    var windowH = window.innerHeight

    var reveal = boundEl && (boundEl.top < windowH - offset) && !(boundEl.top * -1 > boundEl.height - offset) ? true : false

    if (reveal && el) {

        el.style.opacity = 100

    } else {

        el.style.opacity = 0

    }

}

export default ScrollTrigger