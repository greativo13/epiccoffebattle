// 20. kor – térkép finomhangolás: a helyszínekhez igazított pontok,
// kisebb jelölők és egyetlen vékony, ívelt, szaggatott ösvény.
{
  // A nyolc térkép saját, korábban kialakított ösvényét használjuk.
  // A koordináták a térképfelület százalékai, balról/jobbról a pályasorrendben.
  const R20O_ROUTES = [
    [[17,83],[35,72],[48,58],[62,41]],
    [[20,83],[40,72],[57,55],[75,39]],
    [[16,80],[34,67],[57,73],[79,57]],
    [[18,83],[39,71],[61,57],[82,38]],
    [[20,83],[41,70],[58,54],[75,34]],
    [[78,82],[59,68],[42,53],[24,36]],
    [[17,82],[39,69],[62,73],[83,57]],
    [[20,83],[43,70],[66,55],[83,34]]
  ];

  const style = document.createElement('style');
  style.textContent = `
      .map-view .map-trail {
      display:block!important; opacity:1!important; visibility:visible!important;
      position:absolute!important; inset:0!important; width:100%!important; height:100%!important;
      z-index:2!important; overflow:visible!important; pointer-events:none!important;
      filter:none!important;
    }
    .map-view .map-route { display:none!important; opacity:0!important; }
    .map-view .mnode {
      box-sizing:border-box!important; width:40px!important; height:40px!important;
      min-width:40px!important; min-height:40px!important; padding:0!important;
      border:0!important; border-radius:50%!important; background:transparent!important;
      box-shadow:none!important; color:#fff1ca!important;
      font:800 11px/1 system-ui,sans-serif!important;
      text-shadow:0 1px 2px #21150d,0 0 3px #21150d!important;
      transform:translate(-50%,-50%)!important; z-index:3!important;
      position:absolute!important; overflow:visible!important;
    }
    .map-view .mnode::before {
      content:''!important; display:block!important; position:absolute!important;
      inset:8px!important; border:1px solid rgba(241,213,154,.94)!important;
      border-radius:50%!important;
      background:radial-gradient(circle at 34% 25%,#84603a 0,#53371e 66%,#291b12 100%)!important;
      box-shadow:0 0 0 1px rgba(45,25,11,.72),0 2px 4px rgba(31,18,10,.68),
        inset 0 1px 2px rgba(255,238,190,.52)!important;
      z-index:-1!important; pointer-events:none!important;
    }
    .map-view .mnode.done::after {
      right:3px!important; top:3px!important; width:13px!important; height:13px!important;
      line-height:12px!important; font-size:10px!important;
    }
    .map-view .mnode.next { animation:none!important; }
    @media (max-width:600px) {
      .map-view .mnode { width:38px!important; height:38px!important; }
      .map-view .mnode::before { inset:7px!important; }
    }
  `;
  document.head.appendChild(style);

  const mapBeforeR20O = mapScreen;
  mapScreen = function(...args) {
    const result = mapBeforeR20O.apply(this, args);
    const paintMapR20O = () => {
      const view = ov && ov.querySelector('.map-view');
      if (!view) return;

      const nodes = [...view.querySelectorAll('.mnode')].slice(0, 4);
      if (!nodes.length) return;

      const mapIndex = Math.max(0, Math.min(7, Number(args[0]) || 0));
      const pointsForMap = R20O_ROUTES[mapIndex];

      nodes.forEach((node, i) => {
        const [x,y] = pointsForMap[i];
        if (node.textContent.trim() !== String(i + 1) || node.childElementCount) {
          node.replaceChildren(document.createTextNode(String(i + 1)));
        }
        node.setAttribute('aria-label', `Pálya ${i + 1}`);
        node.style.setProperty('left', `${x}%`, 'important');
        node.style.setProperty('top', `${y}%`, 'important');
        node.style.setProperty('width', '40px', 'important');
        node.style.setProperty('height', '40px', 'important');
        node.style.setProperty('min-width', '40px', 'important');
        node.style.setProperty('min-height', '40px', 'important');
        node.style.setProperty('padding', '0', 'important');
        node.style.setProperty('border', '0', 'important');
        node.style.setProperty('background', 'transparent', 'important');
        node.style.setProperty('box-shadow', 'none', 'important');
        node.style.setProperty('transform', 'translate(-50%,-50%)', 'important');
        node.style.setProperty('z-index', '3', 'important');
      });

      view.querySelectorAll('.mnode').forEach((node, i) => {
        if (i >= nodes.length) node.style.setProperty('display', 'none', 'important');
      });

      const route = view.querySelector('svg[data-r20d-route]');
      view.querySelectorAll('.map-trail,.map-route,[data-r20d-route]').forEach(element => {
        if (element !== route) element.remove();
      });
      if (nodes.length < 2) return;

      const points = nodes.map(node => [parseFloat(node.style.left), parseFloat(node.style.top)]);
      const ns = 'http://www.w3.org/2000/svg';
      const svg = route || document.createElementNS(ns, 'svg');
      if (!route) {
        svg.setAttribute('class', 'map-trail');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.setAttribute('aria-hidden', 'true');
      }
      [...svg.querySelectorAll('path')].slice(1).forEach(extra => extra.remove());
      // A jelölőközéppontokon átvezetett Catmull–Rom/Bezier görbe.
      let d = `M${points[0][0]},${points[0][1]}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[Math.max(0, i - 1)];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[Math.min(points.length - 1, i + 2)];
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
      }
      const path = svg.querySelector('path') || document.createElementNS(ns, 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'rgba(105,70,39,.72)');
      path.setAttribute('stroke-width', '1.35');
      path.setAttribute('stroke-dasharray', '2.5 4.5');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      path.setAttribute('vector-effect', 'non-scaling-stroke');
      if (!path.parentNode) svg.appendChild(path);
      // A régi r20d figyelő felismeri ezt, így nem fűzi vissza a vastag rétegeit.
      svg.dataset.r20dRoute = '1';
      if (!route) view.insertBefore(svg, view.firstChild);
      window.__r20dMapPaint = paintMapR20O;
    };

    if (result && typeof result.then === 'function') {
      return result.then(value => {
        paintMapR20O();
        setTimeout(paintMapR20O, 140);
        return value;
      });
    }
    paintMapR20O();
    setTimeout(paintMapR20O, 140);
    return result;
  };
}
