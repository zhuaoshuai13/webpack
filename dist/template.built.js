(()=>{"use strict";let o=1;console.log(3),console.log($(".aa")),console.log(window.innerWidth);const e=new Promise((e=>{setTimeout((()=>{o+=1,console.log("定时器执行完毕"),e()}),1e3)}));console.log("promise:",e)})();