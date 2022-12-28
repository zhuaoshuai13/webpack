import './pc.scss';
import './mob.scss';
import './index.html';

$(() => {
  const controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      reverse: true,
    },
  });

  const util = {
    isPc: !window.matchMedia('(max-aspect-ratio: 678/669)').matches,
  };

  const overview = {

    winScrollEvent() {
      const winHeight = $(window).height();
      window.onscroll = () => {
        const scrollTop = $(window).scrollTop();
        $('.ani-upslip').each((e, target) => {
          const startTop = $(target).offset().top - winHeight * 0.75;

          if (scrollTop < startTop) {
            $(target).removeClass('active');
          }
          if (scrollTop >= startTop) {
            $(target).addClass('active');
          }
        });
      };
    },

    setSec4() {
      if (!document.querySelector('.sec4')) {
        return;
      }
      const sec4Swiper = new Swiper('.sec4-swiper', {
        autoplay: {
          delay: 1500,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        initialSlide: 0,
        centeredSlides: true,
        slidesPerView: 1,
        direction: 'horizontal',
        on: {
          setTransition(transition) {
            for (let i = 0; i < this.slides.length; i++) {
              const slide = this.slides.eq(i);
              slide.transition(transition);
            }
          },
          slideChange() {
            const index = this.realIndex;
            const currentBtn = $('.sec4 .btn').eq(index);
            currentBtn.addClass('active');
            currentBtn.siblings('.btn').removeClass('active');
            const currentColor = $('.sec4 .color').eq(index);
            currentColor.addClass('active');
            currentColor.siblings('.color').removeClass('active');
          },
        },
      });

      $('.sec4 .btn').click((e) => {
        if ($(e.target).hasClass('active')) {
          return;
        }
        const index = $(e.target).index();
        sec4Swiper.slideTo(index, 1000, false);
        $(e.target).addClass('active');
        $(e.target).siblings().removeClass('active');
      });
    },

    setSec5() {
      if (!document.querySelector('.sec5')) {
        return;
      }
      const winHeight = $(window).height();
      const f1 = new TimelineMax()
        .from('.sec5 .part1', 1, {
          // opacity: 0,
          // 'transform': 'translateY(2rem)'
        })
        .to('.sec5 .part1', 1, {
          opacity: 0,
          transform: 'translateY(-1rem)',
        })
        .from('.sec5 .part2', 1, {
          opacity: 0,
          transform: 'translateY(2rem)',
        })
        .to('.sec5 .part2', 1, {
          opacity: 1,
          transform: 'translateY(0)',
        });

      new ScrollMagic.Scene({
        triggerElement: '.sec5',
        duration: 3 * winHeight,
        triggerHook: 0,
        offset: util.isPc ? -60 : -50,
      })
        .setPin('.sec5')
        .setTween(f1)
        .addTo(controller);

      const f2 = new TimelineMax()
        .to('.sec5 .top-slider', 1, {
          transform: util.isPc ? 'translateX(-22rem)' : 'translateX(-20rem)',
        }, 'same')
        .to('.sec5 .bottom-slider', 1, {
          transform: util.isPc ? 'translateX(-1.3rem)' : 'translateX(-3.8rem)',
        }, 'same');

      new ScrollMagic.Scene({
        triggerElement: '.sec5',
        duration: 4 * winHeight,
        offset: 0,
        triggerHook: 0,
      }).setTween(f2)
        .addTo(controller);
    },

    setSec8() {
      if (!document.querySelector('.sec8')) {
        return;
      }
      const winHeight = $(window).height();
      const eleHeight = $('.sec8 .pic-box').height();

      if (util.isPc) {
        const f1 = new TimelineMax()
          .to('.sec8 .f2', 1, {
            transform: 'scale(1.68)',
            left: '-.36rem',
            top: '.2rem',
          }, 'same')
          .to('.sec8 .f1-box', 1, {
            width: '19.2rem',
            height: '12.8rem',
            left: 0,
            top: '-3.6rem',
          }, 'same')
          .to('.sec8 .f2', 1, {
            opacity: 0,
          }, 'b')
          .from('.sec8 .f1-box', 1, {
            opacity: 0,
          }, 'b');

        new ScrollMagic.Scene({
          triggerElement: '.sec8 .pic-box',
          duration: 1 * winHeight,
          offset: -0.25 * winHeight,
          triggerHook: 0,
        }).setTween(f1)
          .addTo(controller)
          .setPin('.sec8 .pic-box');
      } else {
        const f2 = new TimelineMax()
          .to('.sec8 .f2', 1, {
            opacity: 0,
            transform: 'scale(1.3)',
          }, 'same')
          .to('.sec8 .f1-box', 1, {
            transform: 'scale(1.3)',
          }, 'same')
          .from('.sec8 .f1-box', 1, {
            'border-radius': '.2rem',
          }, 'same');

        new ScrollMagic.Scene({
          triggerElement: '.sec8 .pic-box',
          duration: 4 * winHeight,
          offset: (eleHeight - winHeight) / 2,
          triggerHook: 0,
        }).setTween(f2)
          .addTo(controller)
          .setPin('.sec8 .pic-box');
      }
    },

    setSec11() {
      if (!document.querySelector('.sec11')) {
        return;
      }
      // const winHeight = $(window).height();
      const sec11Swiper = new Swiper('.sec11-swiper', {
        autoplay: {
          delay: 1500,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        initialSlide: 0,
        centeredSlides: true,
        slidesPerView: 1,
        direction: 'horizontal',
        on: {
          setTransition(transition) {
            for (let i = 0; i < this.slides.length; i++) {
              const slide = this.slides.eq(i);
              slide.transition(transition);
            }
          },
          slideChange() {
            const index = this.realIndex;
            $('.sec11 .btns').attr('active-index', index);
            const currentBtn = $('.sec11 .btn').eq(index);
            currentBtn.addClass('active');
            currentBtn.siblings('.btn').removeClass('active');
          },
        },
      });

      $('.sec11 .btn').click(() => {
        if ($(this).hasClass('active')) {
          return;
        }
        const index = $(this).index();
        sec11Swiper.slideTo(index, 1000, false);
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
      });
    },

    setSec18() {
      if (!document.querySelector('.sec18')) {
        return;
      }
      new Swiper('.sec18-swiper', {
        autoplay: {
          delay: 1500,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        initialSlide: 0,
        centeredSlides: true,
        slidesPerView: 1,
        direction: 'horizontal',
        on: {
          setTransition(transition) {
            for (let i = 0; i < this.slides.length; i++) {
              const slide = this.slides.eq(i);
              slide.transition(transition);
            }
          },
        },
      });
    },

    init() {
      Object.keys(overview).forEach((key) => {
        if (overview[key].name !== 'init') {
          overview[key]();
        }
      });
    },
  };

  overview.init();
});
