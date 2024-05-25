const loadCss = (t, n) => {
  "use strict";
  const arrStyles = document.querySelector('head noscript').textContent.split('href="');
  let cssHrefStart = arrStyles[1].trim();
  let cssHref = cssHrefStart.slice(0, cssHrefStart.length-2);
  var i = window.document.createElement("link");
  var o = t || window.document.getElementsByTagName("script")[0];
  i.rel = "stylesheet";
  i.href = cssHref;
  i.media = "only x";
  o.parentNode.insertBefore(i, o);
  setTimeout(function () {
    i.media = n || "all"
  })
}

export default loadCss;
