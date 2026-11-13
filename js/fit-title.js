/* Название школы на первом экране всегда целиком внутри плашки (правило Сергея 13.11).
   Слово набрано в одну строку (.hw, white-space:nowrap); если при заданном в CSS размере оно шире
   строки заголовка, шрифт уменьшается ровно до ширины. Пересчёт — после загрузки шрифтов, при смене
   ширины плашки, темы, контраста и размера шрифта (А−/А+). Меряется копия слова без анимации букв. */
(function () {
  'use strict';
  var word = document.getElementById('heroWord');
  if (!word || !word.parentElement) return;
  var line = word.parentElement, raf = 0;
  function fit() {
    raf = 0;
    word.style.fontSize = '';
    var avail = line.clientWidth;
    if (!avail) return;
    var probe = document.createElement('span');
    probe.className = word.className;
    probe.textContent = word.getAttribute('aria-label') || word.textContent;
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'position:absolute;left:0;top:0;visibility:hidden;white-space:nowrap;display:inline-block;animation:none;opacity:0;pointer-events:none';
    line.appendChild(probe);
    var need = probe.getBoundingClientRect().width, size = parseFloat(getComputedStyle(probe).fontSize);
    line.removeChild(probe);
    if (need > avail && size) word.style.fontSize = Math.floor(size * avail / need * 0.97 * 10) / 10 + 'px';
  }
  function later() { if (!raf) raf = requestAnimationFrame(fit); }
  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(later);
  window.addEventListener('load', later);
  window.addEventListener('resize', later);
  if (window.ResizeObserver) new ResizeObserver(later).observe(line);
  if (window.MutationObserver) new MutationObserver(later).observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class', 'data-theme', 'data-hc'] });
})();
