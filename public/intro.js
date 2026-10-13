/*
 * Tela de carregamento JD Makeup — logo + pincel kabuki que "pinta" e revela o site.
 * Roda antes do bundle do React. Só aparece quando o <head> marcou `has-intro`
 * (primeira página da sessão, sem "menos movimento").
 *
 * Linha do tempo: logo entra (0,9 s) → espera o site carregar (mín. ~1,15 s, máx. 3 s)
 * → pincel faz 3 passadas em zigue-zague (1,25 s), cada uma revelando o site
 * → a tela some e dispara `intro:done` para o hero começar a entrada.
 * Clique ou tecla pulam. A trava de segurança no CSS a esconde em 8 s de qualquer jeito.
 */
(function () {
  var root = document.documentElement;
  var intro = document.getElementById('intro');
  if (!intro) return;

  if (!root.classList.contains('has-intro')) {
    intro.parentNode.removeChild(intro);
    return;
  }

  intro.classList.add('is-active');

  var curtain = document.getElementById('intro-curtain');
  var stroke = document.getElementById('intro-stroke');
  var brush = document.getElementById('intro-brush');

  var MIN_MS = 1150; // tempo para a logo e o reflexo aparecerem
  var MAX_MS = 3000; // nunca espera mais que isso pelo carregamento
  var PAINT_MS = 1250;
  var BRUSH_RATIO = 280 / 120; // altura / largura do desenho do pincel
  var TIP_Y = 268 / 280; // posição vertical da ponta das cerdas no desenho

  var startedAt = performance.now();
  var loaded = false;
  var painting = false;
  var done = false;

  function finish() {
    if (done) return;
    done = true;
    intro.classList.add('is-leaving');
    root.classList.remove('has-intro');
    try {
      window.dispatchEvent(new Event('intro:done'));
    } catch (e) {}
    window.removeEventListener('keydown', finish);
    setTimeout(function () {
      if (intro.parentNode) intro.parentNode.removeChild(intro);
    }, 450);
  }

  function paint() {
    if (painting || done) return;
    painting = true;

    var w = window.innerWidth;
    var h = window.innerHeight;
    curtain.setAttribute('viewBox', '0 0 ' + w + ' ' + h);

    // Três passadas em zigue-zague, com as curvas fora da tela
    var points = [
      [-0.25 * w, 0.16 * h],
      [1.25 * w, 0.3 * h],
      [-0.25 * w, 0.62 * h],
      [1.25 * w, 0.88 * h],
    ];
    stroke.setAttribute(
      'd',
      'M' + points.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' L'),
    );
    stroke.setAttribute('stroke-width', String(Math.max(h * 0.42, 180)));

    var length = stroke.getTotalLength();
    stroke.style.strokeDasharray = String(length);
    stroke.style.strokeDashoffset = String(length);

    var brushW = Math.min(Math.max(h * 0.14, 84), 150);
    var brushH = brushW * BRUSH_RATIO;
    brush.style.setProperty('--brush-w', brushW + 'px');

    intro.classList.add('is-painting');

    var tilt = -28;
    var t0 = performance.now();

    function frame(now) {
      if (done) return;
      var t = Math.min(1, (now - t0) / PAINT_MS);
      var eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      var at = length * eased;

      stroke.style.strokeDashoffset = String(length - at);

      var p = stroke.getPointAtLength(at);
      var q = stroke.getPointAtLength(Math.min(length, at + 2));
      var direction = q.x >= p.x ? 1 : -1;
      // o cabo inclina para trás em relação ao movimento
      tilt += (-28 * direction - tilt) * 0.2;

      brush.style.transform =
        'translate(' + (p.x - brushW / 2).toFixed(1) + 'px,' + (p.y - brushH * TIP_Y).toFixed(1) + 'px) rotate(' + tilt.toFixed(2) + 'deg)';

      if (t < 1) requestAnimationFrame(frame);
      else finish();
    }

    requestAnimationFrame(frame);
  }

  function maybePaint() {
    if (!loaded || painting || done) return;
    var elapsed = performance.now() - startedAt;
    if (elapsed < MIN_MS) setTimeout(maybePaint, MIN_MS - elapsed);
    else paint();
  }

  function markLoaded() {
    loaded = true;
    maybePaint();
  }

  if (document.readyState === 'complete') markLoaded();
  else window.addEventListener('load', markLoaded, { once: true });
  setTimeout(markLoaded, MAX_MS);

  // Pular: clique/toque ou qualquer tecla
  intro.addEventListener('click', finish);
  window.addEventListener('keydown', finish);
})();
