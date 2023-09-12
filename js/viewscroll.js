export class ViewScroll {

    constructor(target, selector) {
        this.target = target;
        this.selector = selector;
        this.viewFadeEls = document.querySelectorAll(selector);
        this.viewFadeEls.forEach( el => {
            el.style.opacity = 0;
            el.setAttribute('visible', false);
        });
        this.init();
        window.viewscroll = this;
        this.scroll();
        window.onscroll = this.scroll();
    }

    init() {
        document.body.addEventListener('wheel', this.scroll.bind(this));
        document.body.addEventListener('touchmove', this.scroll.bind(this));
        document.body.addEventListener('touchstart', this.scroll.bind(this));
        document.body.addEventListener('touchend', this.scroll.bind(this));
        this.scrollCheck();
    }

    scrollCheck(){
        this.scroll();
        setTimeout(() => {
            this.scrollCheck();
        }, 500);
    }

    scroll() {
        this.test();
    }

    test(){
        var doc = document.documentElement;
        var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        let st = document.querySelector('#wrapper').scrollTop + ( window.innerHeight );
        this.viewFadeEls.forEach(el => {
            if (top > el.offsetTop - window.innerHeight && !el.classList.contains('hidemobile hidedesktop') ) {
                if (el.getAttribute('visible') === 'false')
                    anime({
                        targets: el,
                        opacity: [0, 1],
                        easing: 'linear',
                        duration: 1000
                    });
                el.setAttribute('visible', 'true');
            } else if (st < el.offsetTop + 100) {
                el.style.opacity = 0;
                el.setAttribute('visible', 'false');
            }
        });
    }
}