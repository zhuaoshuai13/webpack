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
    test() {
      return {
        controller, util,
      };
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
