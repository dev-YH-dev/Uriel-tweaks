(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var canvas = document.getElementById('graph');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;

    function seriesStock(n){
      var out = []; var v = 55;
      for (var i=0;i<n;i++){ v += (Math.random()-0.5)*22; v = Math.max(30, Math.min(85, v)); out.push(v); }
      return out;
    }
    function seriesTuned(n){
      var out = []; var v = 150;
      for (var i=0;i<n;i++){ v += (Math.random()-0.5)*8; v = Math.max(130, Math.min(170, v)); out.push(v); }
      return out;
    }
    function drawLine(points, color, lw){
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.lineJoin = 'round';
      var stepX = W / (points.length - 1);
      points.forEach(function(p, i){
        var x = i * stepX;
        var y = H - p;
        if (i === 0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      });
      ctx.stroke();
    }
    function drawGrid(){
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      for (var i=1;i<4;i++){
        var y = (H/4)*i;
        ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke();
      }
    }
    function render(){
      ctx.clearRect(0,0,W,H);
      drawGrid();
      drawLine(seriesStock(90), 'rgba(169,159,199,0.85)', 2);
      drawLine(seriesTuned(90), '#b25bff', 3);
    }
    render();
  }

  var afterEl = document.getElementById('fpsAfter');
  if (afterEl) {
    if (reduce) {
      afterEl.textContent = '450+';
    } else {
      var start = null, dur = 1400, from = 240, to = 450;
      function step(ts){
        if (!start) start = ts;
        var p = Math.min(1, (ts - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = Math.round(from + (to - from) * eased);
        afterEl.textContent = p >= 1 ? '450+' : val;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  }

  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var isOpen = item.getAttribute('data-open') === 'true';
      faqItems.forEach(function(other){
        other.setAttribute('data-open', 'false');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.setAttribute('data-open', 'true');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
})();
