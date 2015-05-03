(function(){
  var scrollToAnimated;
  var scrollToHref;

  scrollToHref = function (hash) {
    hash = hash.replace('/', '');
    var offTop, howMuch, bodyH, el = document.querySelector('a[name="' + hash + '"]');
    if (!el) {
      return false;
    }
    offTop = 0;
    while (el.parentNode) {
      offTop += (el.offsetTop || 0);
      el = el.parentNode;
    }
    bodyH = document.querySelector('body').offsetHeight;
    if (!bodyH) {
      bodyH = document.querySelector('html').offsetHeight;
    }
    howMuch = 0;
    if (bodyH) {
      howMuch = Math.floor(offTop / bodyH) * bodyH;
      setTimeout(function () {
        scrollToAnimated(howMuch, 400);
      }, 30);
    }
  }

  var scrollInt = null;

  scrollToAnimated = function (finalDestination, howLong) {
    var $el = document.getElementById('page');
    var activePoint = parseInt($el.scrollTop, 10);
    var endPoint = parseInt(finalDestination, 10);
    var movePerFrame = (endPoint - activePoint) / Math.round(howLong / 16.6667);
    if (scrollInt) {
      clearInterval(scrollInt);
      scrollInt = null;
    }
    scrollInt = setInterval(function () {
      activePoint += movePerFrame;
      if (Math.abs(endPoint - activePoint) <= Math.abs(movePerFrame)) {
        $el.scrollTop = endPoint;
        clearInterval(scrollInt);
        return;
      }
      $el.scrollTop = activePoint;
    }, 16.6667);
  }

  if (window.location.href.indexOf('#') > -1) {
    scrollToHref(window.location.hash.split('#').pop())
  }

  window.onscroll = function () {
    if (scrollInt) {
      clearInterval(scrollInt);
      scrollInt = null;
    }
  }

  var navs = [].slice.call(document.querySelectorAll('nav a'), 0);
  navs.forEach(function(el){
    (function(el){
      el.onclick = function (e) {
        e.preventDefault();
        var hsh = el.getAttribute('href').split('#').pop();
        scrollToHref(hsh);
        if (window.location.href.split('#').pop() === ('/' + hsh)) {
          return false;
        }
        window.location.hash = '/' + hsh;
      }
    })(el);
  });

})();
