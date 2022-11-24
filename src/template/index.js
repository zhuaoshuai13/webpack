import './pc.scss';
import './mob.scss';

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
    sec1() {
      const f1 = new TimelineMax().from('.sec1 .title', 0.7, { y: 200, opacity: 0 });

      new ScrollMagic.Scene({
        triggerElement: '.sec1',
        triggerHook: util.isPc ? 0 : 0,
        offset: -1000,
      })
        .setTween(f1)
        .addTo(controller);
    },

    sec2() {
      return 2;
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
