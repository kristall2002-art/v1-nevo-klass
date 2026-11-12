/* Диагностика высот на настоящем телефоне: открыть сайт с ?diag=1 — справа появится табличка с замерами */
(function () {
  if (!/[?&]diag=1/.test(location.search)) return;
  function probe(u) { var d = document.createElement('div'); d.style.cssText = 'position:fixed;top:0;left:0;width:0;visibility:hidden;height:100' + u; document.body.appendChild(d); var h = d.offsetHeight; d.remove(); return h; }
  var box = document.createElement('div');
  box.style.cssText = 'position:fixed;right:6px;top:30%;z-index:99999;background:rgba(10,20,40,.82);color:#fff;font:600 12px/1.35 system-ui,sans-serif;padding:8px 10px;border-radius:10px;pointer-events:none;white-space:pre;max-width:62vw';
  document.body.appendChild(box);
  function r(n) { return Math.round(n); }
  function tick() {
    var vv = window.visualViewport, hdr = document.querySelector('.hdr'), bar = document.querySelector('.bar');
    var sec = document.querySelector('.sec.active'), wrap = sec && sec.querySelector('.sec-scroll .wrap'), hero = document.querySelector('.sec-hero');
    var hb = hdr ? hdr.getBoundingClientRect().bottom : 0, bt = bar ? bar.getBoundingClientRect().top : innerHeight;
    var st = sec ? sec.getBoundingClientRect().top : 0, wr = wrap ? wrap.getBoundingClientRect() : null;
    box.textContent =
      'окно innerHeight: ' + innerHeight + '\n' +
      'clientHeight: ' + document.documentElement.clientHeight + '\n' +
      'visualViewport: ' + (vv ? r(vv.height) : '—') + '\n' +
      '100vh / svh / lvh / dvh:\n  ' + probe('vh') + ' / ' + probe('svh') + ' / ' + probe('lvh') + ' / ' + probe('dvh') + '\n' +
      'взято --vh: ' + getComputedStyle(document.documentElement).getPropertyValue('--vh').trim() + '\n' +
      'первый экран: ' + (hero ? r(hero.getBoundingClientRect().height) : '—') + '\n' +
      'шапка низ: ' + r(hb) + ', панель верх: ' + r(bt) + '\n' +
      'сдвиг экрана: ' + r(st) + '\n' +
      (wr ? 'свободно сверху: ' + r(wr.top - hb) + '\nсвободно снизу: ' + r(bt - wr.bottom) : '') +
      '\nэкран: ' + (sec ? sec.id : '—') + ', ширина ' + innerWidth;
  }
  tick(); setInterval(tick, 500);
})();
