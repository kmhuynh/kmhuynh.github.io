// ===== Pixel Art Banner — Koikoi's Lab Scene =====
(function() {
  const canvas = document.getElementById('koikoi-lab-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 280, H = 32;
  canvas.width = W; canvas.height = H;

  function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }

  const palette = {
    light: {
      floor: '#a08858',
      desk: '#8a7050', deskLeg: '#6a5040',
      chair: '#484848', chairHi: '#606060',
      monBezel: '#282828', monScreen: '#1a3a1a',
      code1: '#40c040', code2: '#80a0e0', code3: '#e8c848',
      server: '#707880', serverDetail: '#889098',
      ledGreen: '#40e040', ledRed: '#e04040',
      scanBody: '#c8c8d0', scanBodyDk: '#a0a0b0', scanBore: '#181818',
      scanTable: '#b0b0b8', coil: '#508888',
      skin: '#f8c898', skinLight: '#f8d8b8',
      labCoat: '#d8d8e0', scrubs: '#408080', scrubsHi: '#509090',
      glasses: '#404060',
      tablet: '#303030', tabletScreen: '#80c0e0',
      // Koikoi
      kCap: '#c8b898', kHair: '#483828', kShirt: '#2a5828', kPants: '#c0b080', kSneakers: '#4878b8',
      // Trucnnth
      tHair: '#202020', tShirt: '#78a8d8', tPants: '#c8b888',
      tPouch: '#e08830', tPouchStrap: '#c07028',
      // Uzay
      uHair: '#a8a8b0', uShirt: '#5878a0', uPants: '#484848', uShoes: '#383028',
      // Amber
      aHair: '#c8a060', aPants: '#408080', aSneakers: '#c8c8c8',
      // Ptyap
      pHair: '#282018', pShirt: '#282828', pPants: '#4868a0', pShoes: '#302820',
      // Patrick (dusty pink polo, khaki shorts, tall white male)
      ptHair: '#a08060', ptShirt: '#d8a0a0', ptPants: '#c0b080', ptShoes: '#a09078',
      // Weitang (white shirt, black pants, asian male)
      wHair: '#282020', wShirt: '#e0e0e0', wPants: '#303030', wShoes: '#282020',
    },
    dark: {
      floor: '#887858',
      desk: '#6a5040', deskLeg: '#584030',
      chair: '#484848', chairHi: '#585858',
      monBezel: '#282828', monScreen: '#0a1a0a',
      code1: '#20a020', code2: '#5070a0', code3: '#b8a030',
      server: '#586068', serverDetail: '#687078',
      ledGreen: '#20c020', ledRed: '#c02020',
      scanBody: '#909098', scanBodyDk: '#707078', scanBore: '#080808',
      scanTable: '#787880', coil: '#508080',
      skin: '#d8a868', skinLight: '#d8b888',
      labCoat: '#b0b0b8', scrubs: '#408070', scrubsHi: '#508880',
      glasses: '#484860',
      tablet: '#303038', tabletScreen: '#508090',
      kCap: '#a09070', kHair: '#383020', kShirt: '#285020', kPants: '#988868', kSneakers: '#3868a0',
      tHair: '#181818', tShirt: '#5878a0', tPants: '#b0a078',
      tPouch: '#b87020', tPouchStrap: '#986018',
      uHair: '#909098', uShirt: '#506878', uPants: '#383838', uShoes: '#302818',
      aHair: '#a88848', aPants: '#408070', aSneakers: '#909090',
      pHair: '#181010', pShirt: '#181818', pPants: '#284878', pShoes: '#201810',
      ptHair: '#886848', ptShirt: '#b08080', ptPants: '#988860', ptShoes: '#787058',
      wHair: '#201818', wShirt: '#b8b8b8', wPants: '#202020', wShoes: '#181818',
    }
  };
  function P() { return isDark() ? palette.dark : palette.light; }

  let seed = 42;
  function srand() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  const GLYPH = {
    'a': [2,5,7,5,5], 'b': [6,5,6,5,6], 'c': [3,4,4,4,3],
    'f': [7,4,6,4,4], 'h': [5,5,7,5,5], 'i': [2,0,2,2,2],
    'm': [5,7,7,5,5], 'n': [5,7,5,5,5], 'o': [2,5,5,5,2],
    'r': [6,5,6,5,5], 's': [3,4,2,1,6], 't': [7,2,2,2,2],
    'u': [5,5,5,5,2],
    '1': [2,6,2,2,7], '3': [7,1,3,1,7], '6': [3,4,7,5,2],
    ' ': [0,0,0,0,0],
  };

  function drawPixelText(text, cx, y, noShadow) {
    const totalW = text.length * 4 - 1;
    const sx = cx - Math.floor(totalW / 2);
    const fg = isDark() ? '#e0e0e0' : '#383838';
    if (!noShadow) {
      const bg = isDark() ? '#101010' : '#202020';
      ctx.fillStyle = bg;
      for (let ci = 0, px = sx; ci < text.length; ci++, px += 4) {
        const g = GLYPH[text[ci]];
        if (!g) continue;
        for (let row = 0; row < 5; row++)
          for (let col = 0; col < 3; col++)
            if (g[row] & (4 >> col))
              ctx.fillRect(px + col + 1, y + row + 1, 1, 1);
      }
    }
    ctx.fillStyle = fg;
    for (let ci = 0, px = sx; ci < text.length; ci++, px += 4) {
      const g = GLYPH[text[ci]];
      if (!g) continue;
      for (let row = 0; row < 5; row++)
        for (let col = 0; col < 3; col++)
          if (g[row] & (4 >> col))
            ctx.fillRect(px + col, y + row, 1, 1);
    }
  }

  const groundY = H - 5;

  // ===== Equipment =====

  function drawDesk(x, noPepsi) {
    const p = P();
    const deskY = groundY - 6;
    ctx.fillStyle = p.desk;
    ctx.fillRect(x, deskY, 26, 2);
    ctx.fillStyle = p.deskLeg;
    ctx.fillRect(x + 1, deskY + 2, 1, 4);
    ctx.fillRect(x + 2, deskY + 2, 1, 4);
    ctx.fillRect(x + 23, deskY + 2, 1, 4);
    ctx.fillRect(x + 24, deskY + 2, 1, 4);
    // Monitor 1
    ctx.fillStyle = p.monBezel;
    ctx.fillRect(x + 3, deskY - 7, 7, 6);
    ctx.fillStyle = p.monScreen;
    ctx.fillRect(x + 4, deskY - 6, 5, 4);
    ctx.fillStyle = p.monBezel;
    ctx.fillRect(x + 6, deskY - 1, 1, 1);
    // Monitor 2
    ctx.fillStyle = p.monBezel;
    ctx.fillRect(x + 12, deskY - 7, 7, 6);
    ctx.fillStyle = p.monScreen;
    ctx.fillRect(x + 13, deskY - 6, 5, 4);
    ctx.fillStyle = p.monBezel;
    ctx.fillRect(x + 15, deskY - 1, 1, 1);
    // Tower PC
    ctx.fillStyle = p.monBezel;
    ctx.fillRect(x + 21, deskY - 6, 4, 6);
    ctx.fillStyle = p.ledGreen;
    ctx.fillRect(x + 22, deskY - 5, 1, 1);
    ctx.fillStyle = p.serverDetail;
    ctx.fillRect(x + 22, deskY - 3, 2, 1);
    ctx.fillStyle = p.chairHi;
    ctx.fillRect(x + 22, deskY - 1, 1, 1);
    ctx.fillRect(x + 23, deskY - 1, 1, 1);
    // Mac Mini
    ctx.fillStyle = isDark() ? '#808088' : '#c0c0c8';
    ctx.fillRect(x + 0, deskY - 2, 3, 2);
    // Pepsi keg (optional)
    if (!noPepsi) {
      const kegX = x + 10, kegY = deskY + 2;
      ctx.fillStyle = '#182848';
      ctx.fillRect(kegX, kegY, 5, 4);
      ctx.fillRect(kegX + 1, kegY - 1, 3, 1);
      ctx.fillRect(kegX + 1, kegY + 4, 3, 1);
      ctx.fillStyle = '#e03030';
      ctx.fillRect(kegX + 2, kegY + 1, 1, 1);
      ctx.fillStyle = '#888888';
      ctx.fillRect(kegX + 5, kegY + 1, 1, 2);
    }
    // Chair
    ctx.fillStyle = p.chair;
    ctx.fillRect(x + 27, deskY - 1, 3, 3);
    ctx.fillStyle = p.chairHi;
    ctx.fillRect(x + 26, deskY + 2, 5, 2);
    ctx.fillStyle = p.chair;
    ctx.fillRect(x + 28, deskY + 4, 1, 2);
    ctx.fillRect(x + 26, groundY, 1, 1);
    ctx.fillRect(x + 28, groundY, 1, 1);
    ctx.fillRect(x + 30, groundY, 1, 1);
  }

  function drawServer(x, rackH) {
    const p = P();
    const top = groundY - rackH;
    ctx.fillStyle = p.server;
    ctx.fillRect(x, top, 8, rackH);
    ctx.fillStyle = p.serverDetail;
    ctx.fillRect(x, top, 1, rackH);
    ctx.fillRect(x + 7, top, 1, rackH);
    ctx.fillStyle = p.ledGreen;
    ctx.fillRect(x + 4, top, 1, 1);
    const slotH = 3;
    let sy = top + 2;
    let slot = 0;
    while (sy + slotH <= top + rackH - 1) {
      if (slot === 2 || slot === 5) {
        ctx.fillStyle = p.scanBore;
        ctx.fillRect(x + 1, sy, 6, slotH);
      } else {
        ctx.fillStyle = p.serverDetail;
        ctx.fillRect(x + 1, sy, 6, slotH);
        ctx.fillStyle = p.server;
        ctx.fillRect(x + 2, sy + 1, 3, 1);
      }
      sy += slotH + 1;
      slot++;
    }
  }

  function drawWorkstation(x) {
    const p = P();
    const counterY = groundY - 5;
    ctx.fillStyle = p.server;
    ctx.fillRect(x, counterY, 32, 2);
    ctx.fillRect(x, counterY + 2, 2, 3);
    ctx.fillRect(x + 30, counterY + 2, 2, 3);
    ctx.fillStyle = p.serverDetail;
    ctx.fillRect(x + 3, counterY + 2, 3, 3);
    ctx.fillStyle = p.ledGreen;
    ctx.fillRect(x + 4, counterY + 3, 1, 1);
    for (let m = 0; m < 4; m++) {
      const mx = x + 1 + m * 7;
      const isCenter = (m === 1 || m === 2);
      const mh = isCenter ? 6 : 5;
      const mw = isCenter ? 7 : 6;
      ctx.fillStyle = p.monBezel;
      ctx.fillRect(mx, counterY - mh - 1, mw, mh);
      ctx.fillStyle = p.monScreen;
      ctx.fillRect(mx + 1, counterY - mh, mw - 2, mh - 2);
      ctx.fillStyle = p.monBezel;
      ctx.fillRect(mx + Math.floor(mw / 2), counterY - 1, 1, 1);
    }
    ctx.fillStyle = p.chair;
    ctx.fillRect(x + 10, counterY - 1, 5, 1);
    ctx.fillStyle = p.serverDetail;
    ctx.fillRect(x + 29, counterY - 3, 2, 3);
    ctx.fillStyle = p.ledRed;
    ctx.fillRect(x + 29, counterY - 2, 1, 1);
    // Chair 1
    ctx.fillStyle = p.chair;
    ctx.fillRect(x + 7, counterY + 2, 3, 2);
    ctx.fillStyle = p.chairHi;
    ctx.fillRect(x + 6, counterY + 4, 5, 1);
    ctx.fillStyle = p.chair;
    ctx.fillRect(x + 8, counterY + 5, 1, groundY - counterY - 5);
    ctx.fillRect(x + 6, groundY, 1, 1);
    ctx.fillRect(x + 8, groundY, 1, 1);
    ctx.fillRect(x + 10, groundY, 1, 1);
    // Stool 2
    ctx.fillStyle = p.chairHi;
    ctx.fillRect(x + 20, counterY + 3, 4, 1);
    ctx.fillStyle = p.chair;
    ctx.fillRect(x + 21, counterY + 4, 1, groundY - counterY - 4);
    ctx.fillRect(x + 20, groundY, 1, 1);
    ctx.fillRect(x + 22, groundY, 1, 1);
  }

  function drawScannerTableBehind(cx, rackH) {
    const p = P();
    const sTop = groundY - rackH;
    const centerY = sTop + Math.floor(rackH / 2);
    const halfW = 11;
    ctx.fillStyle = p.chair;
    ctx.fillRect(cx, centerY, halfW + 4, 2);
  }

  // Scanner split into 3 parts for MRI animation layering
  function drawScannerBody(cx, rackH) {
    const p = P();
    const sTop = groundY - rackH;
    const halfW = 11;
    for (let row = sTop; row < groundY; row++) {
      const dy = row - sTop;
      let hw;
      if (dy < Math.floor(rackH / 2)) {
        const cd = Math.floor(rackH / 2) - dy;
        hw = Math.floor(Math.sqrt(halfW * halfW - cd * cd));
      } else {
        hw = halfW;
      }
      if (hw <= 0) continue;
      ctx.fillStyle = dy < 3 ? p.scanBody : (dy > rackH - 3 ? p.scanBodyDk : p.scanBody);
      ctx.fillRect(cx - hw, row, hw * 2 + 1, 1);
    }
  }

  function drawScannerBore(cx, rackH) {
    const sTop = groundY - rackH;
    const centerY = sTop + Math.floor(rackH / 2);
    const boreR = 3;
    // Bore ring
    for (let dy = -boreR - 1; dy <= boreR + 1; dy++) {
      const row = centerY + dy;
      const ringSpan = Math.floor(Math.sqrt((boreR + 1) * (boreR + 1) - dy * dy));
      if (ringSpan <= 0) continue;
      ctx.fillStyle = isDark() ? '#505868' : '#b0b8c8';
      ctx.fillRect(cx - ringSpan, row, ringSpan * 2 + 1, 1);
    }
    // Bore hole (clear to transparent)
    for (let dy = -boreR; dy <= boreR; dy++) {
      const row = centerY + dy;
      const span = Math.floor(Math.sqrt(boreR * boreR - dy * dy));
      ctx.clearRect(cx - span, row, span * 2 + 1, 1);
    }
  }

  function drawScannerTableFront(cx, rackH) {
    const p = P();
    const sTop = groundY - rackH;
    const halfW = 11;
    const centerY = sTop + Math.floor(rackH / 2);
    const tableY = centerY;
    ctx.fillStyle = p.chair;
    ctx.fillRect(cx - halfW - 16, tableY, halfW + 16, 2);
    ctx.fillStyle = p.scanBody;
    ctx.fillRect(cx - halfW - 16, tableY + 2, 16, 1);
  }

  // ===== Characters =====

  // Koikoi — standing facing RIGHT
  function drawKoikoi(cx, cy) {
    const p = P();
    ctx.fillStyle = p.kCap;
    ctx.fillRect(cx, cy - 2, 4, 1);
    ctx.fillRect(cx - 1, cy - 1, 6, 1);
    ctx.fillStyle = p.kHair;
    ctx.fillRect(cx, cy, 4, 2);
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx, cy + 2, 4, 2);
    ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818';
    ctx.fillRect(cx + 3, cy + 2, 1, 1);
    ctx.fillStyle = p.kShirt;
    ctx.fillRect(cx, cy + 4, 4, 3);
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx + 4, cy + 5, 1, 2);
    ctx.fillStyle = p.kPants;
    ctx.fillRect(cx, cy + 7, 4, 2);
    ctx.fillStyle = p.kSneakers;
    ctx.fillRect(cx, cy + 9, 2, 2);
    ctx.fillRect(cx + 2, cy + 9, 2, 2);
  }

  // Koikoi — standing facing LEFT
  function drawKoikoiLeft(cx, cy) {
    const p = P();
    ctx.fillStyle = p.kCap;
    ctx.fillRect(cx, cy - 2, 4, 1);
    ctx.fillRect(cx - 1, cy - 1, 6, 1);
    ctx.fillStyle = p.kHair;
    ctx.fillRect(cx, cy, 4, 2);
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx, cy + 2, 4, 2);
    ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818';
    ctx.fillRect(cx, cy + 2, 1, 1);
    ctx.fillStyle = p.kShirt;
    ctx.fillRect(cx, cy + 4, 4, 3);
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx - 1, cy + 5, 1, 2);
    ctx.fillStyle = p.kPants;
    ctx.fillRect(cx, cy + 7, 4, 2);
    ctx.fillStyle = p.kSneakers;
    ctx.fillRect(cx, cy + 9, 2, 2);
    ctx.fillRect(cx + 2, cy + 9, 2, 2);
  }

  // Koikoi — walking
  function drawKoikoiWalk(cx, cy, frame, left) {
    const p = P();
    const bob = Math.abs(Math.sin(frame * 0.8)) * 1.0;
    const fy = cy - bob;
    ctx.fillStyle = p.kCap;
    ctx.fillRect(cx, fy - 2, 4, 1);
    ctx.fillRect(cx - 1, fy - 1, 6, 1);
    ctx.fillStyle = p.kHair;
    ctx.fillRect(cx, fy, 4, 2);
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx, fy + 2, 4, 2);
    ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818';
    ctx.fillRect(left ? cx : cx + 3, fy + 2, 1, 1);
    ctx.fillStyle = p.kShirt;
    ctx.fillRect(cx, fy + 4, 4, 3);
    const armY = (frame % 4 < 2) ? fy + 4 : fy + 6;
    ctx.fillStyle = p.skin;
    ctx.fillRect(left ? cx - 1 : cx + 4, armY, 1, 2);
    ctx.fillStyle = p.kPants;
    ctx.fillRect(cx, fy + 7, 4, 2);
    ctx.fillStyle = p.kSneakers;
    const f = frame % 4;
    if (f === 0 || f === 2) {
      ctx.fillRect(cx, fy + 9, 2, 2);
      ctx.fillRect(cx + 2, fy + 9, 2, 2);
    } else if (f === 1) {
      ctx.fillRect(cx - 1, fy + 9, 2, 2);
      ctx.fillRect(cx + 3, fy + 9, 2, 2);
    } else {
      ctx.fillRect(cx + 1, fy + 9, 2, 2);
      ctx.fillRect(cx + 1, fy + 9, 2, 2);
    }
  }

  // Koikoi — lying on scanner table (head left, feet right)
  function drawKoikoiLying(x, y) {
    const p = P();
    // Hair / cap
    ctx.fillStyle = p.kCap;
    ctx.fillRect(x, y - 1, 2, 1);
    // Head
    ctx.fillStyle = p.skin;
    ctx.fillRect(x, y, 2, 1);
    ctx.fillStyle = p.kHair;
    ctx.fillRect(x, y + 1, 2, 1);
    // Torso (green shirt)
    ctx.fillStyle = p.kShirt;
    ctx.fillRect(x + 2, y, 4, 2);
    // Legs (khaki pants)
    ctx.fillStyle = p.kPants;
    ctx.fillRect(x + 6, y, 3, 2);
    // Feet (sneakers)
    ctx.fillStyle = p.kSneakers;
    ctx.fillRect(x + 9, y, 1, 2);
  }

  // Trucnnth — sitting at desk, facing LEFT (toward monitors)
  function drawTrucnnthSitting(cx, cy, blink) {
    const p = P();
    // Hair
    ctx.fillStyle = p.tHair;
    ctx.fillRect(cx, cy, 4, 2);
    // Face — eye on LEFT (facing left toward monitors)
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx, cy + 2, 4, 2);
    if (!blink) { ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818'; ctx.fillRect(cx, cy + 2, 1, 1); }
    // Blush
    ctx.fillStyle = '#f8a0a0'; ctx.globalAlpha = 0.4;
    ctx.fillRect(cx, cy + 3, 1, 1); ctx.globalAlpha = 1;
    // Blue shirt (short for seated)
    ctx.fillStyle = p.tShirt;
    ctx.fillRect(cx, cy + 4, 4, 2);
    // Arms resting forward (toward left / desk)
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx - 1, cy + 4, 1, 2);
    ctx.fillRect(cx - 2, cy + 5, 1, 1);
  }

  // Uzay — standing facing RIGHT
  function drawUzay(cx, cy, blink) {
    const p = P();
    ctx.fillStyle = p.uHair;
    ctx.fillRect(cx, cy, 4, 2);
    ctx.fillStyle = p.skinLight;
    ctx.fillRect(cx, cy + 2, 4, 2);
    if (!blink) { ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818'; ctx.fillRect(cx + 3, cy + 2, 1, 1); }
    ctx.fillStyle = p.uShirt;
    ctx.fillRect(cx, cy + 4, 4, 4);
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx + 4, cy + 5, 1, 2);
    ctx.fillStyle = p.tablet;
    ctx.fillRect(cx + 4, cy + 4, 2, 3);
    ctx.fillStyle = p.tabletScreen;
    ctx.fillRect(cx + 5, cy + 5, 1, 1);
    ctx.fillStyle = p.uPants;
    ctx.fillRect(cx, cy + 8, 4, 3);
    ctx.fillStyle = p.uShoes;
    ctx.fillRect(cx, cy + 11, 2, 2);
    ctx.fillRect(cx + 2, cy + 11, 2, 2);
  }

  // Amber — standing
  function drawAmber(cx, cy, blink) {
    const p = P();
    ctx.fillStyle = p.aHair;
    ctx.fillRect(cx, cy, 4, 2);
    ctx.fillRect(cx - 1, cy + 1, 1, 3);
    ctx.fillRect(cx + 4, cy + 1, 1, 3);
    ctx.fillStyle = p.skinLight;
    ctx.fillRect(cx, cy + 2, 4, 2);
    if (!blink) { ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818'; ctx.fillRect(cx + 3, cy + 2, 1, 1); }
    ctx.fillStyle = p.scrubs;
    ctx.fillRect(cx, cy + 4, 4, 3);
    ctx.fillStyle = p.skinLight;
    ctx.fillRect(cx + 4, cy + 5, 1, 2);
    ctx.fillStyle = p.scrubsHi;
    ctx.fillRect(cx, cy + 7, 4, 3);
    ctx.fillStyle = p.aSneakers;
    ctx.fillRect(cx, cy + 10, 2, 2);
    ctx.fillRect(cx + 2, cy + 10, 2, 2);
  }

  // Ptyap — standing facing LEFT (toward server rack)
  function drawPtyap(cx, cy, blink) {
    const p = P();
    ctx.fillStyle = p.pHair;
    ctx.fillRect(cx, cy, 4, 2);
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx, cy + 2, 4, 2);
    if (!blink) { ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818'; ctx.fillRect(cx, cy + 2, 1, 1); }
    ctx.fillStyle = p.pShirt;
    ctx.fillRect(cx, cy + 4, 4, 3);
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx - 1, cy + 5, 1, 2);
    ctx.fillStyle = p.tablet;
    ctx.fillRect(cx - 2, cy + 5, 2, 2);
    ctx.fillStyle = p.tabletScreen;
    ctx.fillRect(cx - 2, cy + 5, 1, 1);
    ctx.fillStyle = p.pPants;
    ctx.fillRect(cx, cy + 7, 4, 2);
    ctx.fillStyle = p.pShoes;
    ctx.fillRect(cx, cy + 9, 2, 2);
    ctx.fillRect(cx + 2, cy + 9, 2, 2);
  }

  // Patrick — tall white male, dusty pink polo, khaki shorts, facing RIGHT
  function drawPatrick(cx, cy, blink) {
    const p = P();
    // Short light brown hair
    ctx.fillStyle = p.ptHair;
    ctx.fillRect(cx, cy, 4, 2);
    // Face — eye on RIGHT (facing right)
    ctx.fillStyle = p.skinLight;
    ctx.fillRect(cx, cy + 2, 4, 2);
    if (!blink) { ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818'; ctx.fillRect(cx + 3, cy + 2, 1, 1); }
    // Dusty pink polo
    ctx.fillStyle = p.ptShirt;
    ctx.fillRect(cx, cy + 4, 4, 3);
    // Arm (facing right)
    ctx.fillStyle = p.skinLight;
    ctx.fillRect(cx + 4, cy + 5, 1, 2);
    // Khaki shorts
    ctx.fillStyle = p.ptPants;
    ctx.fillRect(cx, cy + 7, 4, 2);
    // Legs visible below shorts (skin)
    ctx.fillStyle = p.skinLight;
    ctx.fillRect(cx, cy + 9, 4, 2);
    // Shoes
    ctx.fillStyle = p.ptShoes;
    ctx.fillRect(cx, cy + 11, 2, 1);
    ctx.fillRect(cx + 2, cy + 11, 2, 1);
  }

  // Weitang — tall asian male, white shirt, black pants, facing LEFT
  function drawWeitang(cx, cy, blink) {
    const p = P();
    // Dark hair
    ctx.fillStyle = p.wHair;
    ctx.fillRect(cx, cy, 4, 2);
    // Face — eye on LEFT
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx, cy + 2, 4, 2);
    if (!blink) { ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818'; ctx.fillRect(cx, cy + 2, 1, 1); }
    // White shirt
    ctx.fillStyle = p.wShirt;
    ctx.fillRect(cx, cy + 4, 4, 4);
    // Arm (left side)
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx - 1, cy + 5, 1, 2);
    // Black pants
    ctx.fillStyle = p.wPants;
    ctx.fillRect(cx, cy + 8, 4, 3);
    // Shoes
    ctx.fillStyle = p.wShoes;
    ctx.fillRect(cx, cy + 11, 2, 2);
    ctx.fillRect(cx + 2, cy + 11, 2, 2);
  }

  // ===== Main draw loop =====

  let time = 0;

  function draw() {
    time += 0.4;
    const p = P();
    const codes = [p.code1, p.code2, p.code3];

    ctx.clearRect(0, 0, W, H);

    const deskY = groundY - 6;
    const kDeskX = 2;
    const tDeskX = 36;
    const srvX = 78;
    const wsX = 158;
    const counterY = groundY - 5;
    const scanCx = 230;
    const rackH = 20;
    const halfW = 11;
    const sTop = groundY - rackH;
    const centerY = sTop + Math.floor(rackH / 2);

    // ===== Koikoi state machine — compute FIRST =====
    const myDeskX = kDeskX + 10;
    const trucTalkX = 58;
    const patrickTalkX = 106;
    const ptyapTalkX = 112;
    const uzayTalkX = 160;
    const amberTalkX = 183;
    const weitangTalkX = 228;
    const scannerTableX = 205;

    const S = 1.1;
    let t = 0;
    t += 40;  const t1 = t;
    t += Math.round(46/S);  const t2 = t;   // walk to truc (12→58)
    t += 18;  const t3 = t;                  // pat truc (3 pats)
    t += Math.round(48/S);  const t4 = t;   // walk to patrick (58→106)
    t += 15;  const t4b = t;                 // talk patrick
    t += Math.round(6/S);   const t4c = t;  // walk to ptyap (106→112)
    t += 15;  const t5 = t;                  // talk ptyap
    t += Math.round(48/S);  const t6 = t;   // walk to uzay (112→160)
    t += 15;  const t7 = t;                  // talk uzay
    t += Math.round(23/S);  const t8 = t;   // walk to amber (160→183)
    t += 15;  const t9 = t;                  // talk amber
    t += Math.round(45/S);  const t10 = t;  // walk to weitang (183→228)
    t += 15;  const t11 = t;                 // talk weitang
    t += Math.round(23/S);  const t12 = t;  // walk to scanner (228→205, left)
    t += 8;   const t13 = t;                 // lie down
    t += 28;  const t14 = t;                 // scan in
    t += 12;  const t15 = t;                 // scan pause
    t += 28;  const t16 = t;                 // scan out
    t += 8;   const t17 = t;                 // stand up
    t += Math.round(193/S); const t18 = t;  // walk back to desk
    t += 20;
    const CYCLE = t18 + 20;
    const ct = time % CYCLE;

    const states = [
      [t1,  myDeskX,       myDeskX,       'stand-r',     null],
      [t2,  myDeskX,       trucTalkX,     'walk-r',      null],
      [t3,  trucTalkX,     trucTalkX,     'pat-truc',    'truc'],
      [t4,  trucTalkX,     patrickTalkX,  'walk-r',      null],
      [t4b, patrickTalkX,  patrickTalkX,  'talk-l',      'patrick'],
      [t4c, patrickTalkX,  ptyapTalkX,    'walk-r',      null],
      [t5,  ptyapTalkX,    ptyapTalkX,    'talk-r',      'ptyap'],
      [t6,  ptyapTalkX,    uzayTalkX,     'walk-r',      null],
      [t7,  uzayTalkX,     uzayTalkX,     'talk-l',      'uzay'],
      [t8,  uzayTalkX,     amberTalkX,    'walk-r',      null],
      [t9,  amberTalkX,    amberTalkX,    'talk-r',      'amber'],
      [t10, amberTalkX,    weitangTalkX,  'walk-r',      null],
      [t11, weitangTalkX,  weitangTalkX,  'talk-r',      'weitang'],
      [t12, weitangTalkX,  scannerTableX, 'walk-l',      null],
      [t13, scannerTableX, scannerTableX, 'lie-down',    null],
      [t14, scannerTableX, scannerTableX, 'scan-in',     null],
      [t15, scannerTableX, scannerTableX, 'scan-pause',  null],
      [t16, scannerTableX, scannerTableX, 'scan-out',    null],
      [t17, scannerTableX, scannerTableX, 'stand-up',    null],
      [t18, scannerTableX, myDeskX,       'walk-l',      null],
      [t18 + 20, myDeskX,  myDeskX,       'stand-r',     null],
    ];

    let prevEnd = 0, sx = myDeskX, ex = myDeskX, stype = 'stand-r', talkTarget = null;
    for (let si = 0; si < states.length; si++) {
      if (ct < states[si][0]) {
        sx = states[si][1]; ex = states[si][2]; stype = states[si][3]; talkTarget = states[si][4];
        break;
      }
      prevEnd = states[si][0];
    }
    const stateElapsed = ct - prevEnd;
    const stateDur = (states.find(s => ct < s[0]) || states[states.length - 1])[0] - prevEnd;
    const pct = stateDur > 0 ? stateElapsed / stateDur : 0;
    const kx = Math.floor(sx + (ex - sx) * pct);
    const walkFrame = Math.floor(time * 0.15) % 4;
    const greetBob = talkTarget ? Math.abs(Math.sin(pct * Math.PI * 2)) * 2.0 : 0;

    const isMri = stype === 'lie-down' || stype === 'scan-in' || stype === 'scan-pause' || stype === 'scan-out' || stype === 'stand-up';
    const maxScanOffset = 25;
    let scanOffset = 0;
    if (stype === 'scan-in') scanOffset = pct * maxScanOffset;
    else if (stype === 'scan-pause') scanOffset = maxScanOffset;
    else if (stype === 'scan-out') scanOffset = maxScanOffset * (1 - pct);

    // ===== Draw scene =====

    // Floor
    ctx.fillStyle = isDark() ? '#686868' : '#d0d0d0';
    ctx.fillRect(0, groundY, W, 1);

    // Room label
    drawPixelText('3163c', kDeskX + 13, groundY - 20, true);

    // Koikoi's desk (no Pepsi)
    drawDesk(kDeskX, true);
    for (let m = 0; m < 2; m++) {
      const mx = kDeskX + 4 + m * 9;
      for (let py = 0; py < 4; py++)
        for (let px = 0; px < 5; px++)
          if (Math.sin(time * 0.08 + m * 2 + py * 1.3 + px * 0.7 + 10) > 0.3) {
            ctx.fillStyle = codes[(py + px + m + Math.floor(time * 0.02)) % 3];
            ctx.fillRect(mx + px, deskY - 6 + py, 1, 1);
          }
    }

    // Cabinets above Truc's desk
    ctx.fillStyle = isDark() ? '#484850' : '#909098';
    ctx.fillRect(tDeskX + 2, deskY - 14, 22, 5);
    ctx.fillStyle = isDark() ? '#383840' : '#787880';
    ctx.fillRect(tDeskX + 9, deskY - 14, 1, 5);
    ctx.fillRect(tDeskX + 16, deskY - 14, 1, 5);
    ctx.fillStyle = isDark() ? '#606068' : '#b0b0b8';
    ctx.fillRect(tDeskX + 6, deskY - 12, 1, 1);
    ctx.fillRect(tDeskX + 13, deskY - 12, 1, 1);
    ctx.fillRect(tDeskX + 20, deskY - 12, 1, 1);

    // Truc's desk (no Pepsi)
    drawDesk(tDeskX, true);
    for (let m = 0; m < 2; m++) {
      const mx = tDeskX + 4 + m * 9;
      for (let py = 0; py < 4; py++)
        for (let px = 0; px < 5; px++)
          if (Math.sin(time * 0.08 + m * 2 + py * 1.3 + px * 0.7) > 0.3) {
            ctx.fillStyle = codes[(py + px + m + Math.floor(time * 0.02)) % 3];
            ctx.fillRect(mx + px, deskY - 6 + py, 1, 1);
          }
    }

    // HPC cluster
    const ledColors = [p.ledGreen, p.code2, p.ledGreen, p.code3, p.ledGreen];
    for (let r = 0; r < 5; r++) {
      drawServer(srvX + r * 8, rackH);
      const rTop = groundY - rackH;
      for (let li = 0; li < 3; li++) {
        const ledY = rTop + 3 + li * 4;
        if (ledY + 1 > groundY) continue;
        const on = Math.sin(time * 0.06 + r * 1.7 + li * 2.3) > 0;
        ctx.fillStyle = on ? ledColors[r] : p.ledRed;
        ctx.fillRect(srvX + r * 8 + 6, ledY, 1, 1);
      }
    }

    // Bulletin board
    const bbX = 128;
    const bbTop = groundY - rackH;
    ctx.fillStyle = isDark() ? '#604830' : '#b09070';
    ctx.fillRect(bbX, bbTop, 20, 10);
    ctx.fillStyle = isDark() ? '#483820' : '#907050';
    ctx.fillRect(bbX, bbTop, 20, 1);
    ctx.fillRect(bbX, bbTop + 9, 20, 1);
    ctx.fillRect(bbX, bbTop, 1, 10);
    ctx.fillRect(bbX + 19, bbTop, 1, 10);
    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(bbX + 2, bbTop + 2, 3, 4);
    ctx.fillRect(bbX + 6, bbTop + 2, 4, 3);
    ctx.fillRect(bbX + 14, bbTop + 2, 3, 4);
    ctx.fillStyle = isDark() ? '#c08040' : '#e8a050';
    ctx.fillRect(bbX + 11, bbTop + 2, 2, 3);
    ctx.fillStyle = isDark() ? '#4080a0' : '#60b0e0';
    ctx.fillRect(bbX + 6, bbTop + 6, 4, 2);
    ctx.fillStyle = isDark() ? '#a04040' : '#e06060';
    ctx.fillRect(bbX + 11, bbTop + 6, 2, 2);
    ctx.fillStyle = isDark() ? '#40a040' : '#60c060';
    ctx.fillRect(bbX + 14, bbTop + 7, 3, 1);

    // UNC BRIC label
    drawPixelText('unc bric', wsX + 16, groundY - 20, true);

    // Workstation
    drawWorkstation(wsX);
    for (let m = 0; m < 4; m++) {
      const mx = wsX + 2 + m * 7;
      const isCenter = (m === 1 || m === 2);
      const sw = isCenter ? 5 : 4;
      const sh = isCenter ? 4 : 3;
      const sy = isCenter ? counterY - 7 : counterY - 6;
      for (let py = 0; py < sh; py++)
        for (let px = 0; px < sw; px++)
          if (Math.sin(time * 0.08 + m * 1.5 + py * 1.3 + px * 0.9) > 0.3) {
            ctx.fillStyle = codes[(py + px + m + Math.floor(time * 0.03)) % 3];
            ctx.fillRect(mx + px, sy + py, 1, 1);
          }
    }

    // Mechanical Room
    const mechX = scanCx + 12;
    const mechTop = groundY - rackH;

    ctx.fillStyle = isDark() ? '#585860' : '#a0a0a8';
    ctx.fillRect(mechX, mechTop, 10, rackH);
    ctx.fillStyle = isDark() ? '#484850' : '#888890';
    ctx.fillRect(mechX + 1, mechTop + 4, 8, 1);
    ctx.fillRect(mechX + 1, mechTop + 10, 8, 1);
    ctx.fillRect(mechX + 1, mechTop + 16, 8, 1);

    ctx.fillStyle = p.server;
    ctx.fillRect(mechX + 10, mechTop, 8, rackH);
    ctx.fillStyle = p.serverDetail;
    ctx.fillRect(mechX + 11, mechTop + 4, 6, 1);
    ctx.fillRect(mechX + 11, mechTop + 8, 6, 1);
    ctx.fillRect(mechX + 11, mechTop + 12, 6, 1);
    ctx.fillRect(mechX + 11, mechTop + 16, 6, 1);

    ctx.fillStyle = p.server;
    ctx.fillRect(mechX + 18, mechTop, 8, rackH);
    ctx.fillStyle = p.serverDetail;
    ctx.fillRect(mechX + 19, mechTop + 4, 6, 1);
    ctx.fillRect(mechX + 19, mechTop + 8, 6, 1);
    ctx.fillRect(mechX + 19, mechTop + 12, 6, 1);
    ctx.fillRect(mechX + 19, mechTop + 16, 6, 1);

    ctx.fillStyle = p.server;
    ctx.fillRect(mechX + 26, mechTop, 8, rackH);
    ctx.fillStyle = p.serverDetail;
    ctx.fillRect(mechX + 27, mechTop + 2, 6, 1);
    ctx.fillStyle = isDark() ? '#183018' : '#203820';
    ctx.fillRect(mechX + 28, mechTop + 4, 4, 2);
    ctx.fillStyle = p.code1;
    ctx.fillRect(mechX + 29, mechTop + 5, 2, 1);
    ctx.fillStyle = isDark() ? '#303038' : '#484850';
    ctx.fillRect(mechX + 28, groundY, 2, 1);
    ctx.fillRect(mechX + 31, groundY, 2, 1);

    const mechLights = [p.ledGreen, p.code3, p.ledRed, p.code2, p.ledGreen, p.code3, p.ledGreen];
    for (let li = 0; li < 7; li++) {
      const lx = mechX + 16 + (li % 2) + Math.floor(li / 3) * 8;
      const ly = mechTop + 2 + (li % 3) * 4;
      const on = Math.sin(time * 0.07 + li * 1.9) > 0;
      ctx.fillStyle = on ? mechLights[li] : (isDark() ? '#181818' : '#383838');
      ctx.fillRect(lx, ly, 1, 1);
    }
    ctx.fillStyle = Math.sin(time * 0.04) > 0 ? p.ledGreen : (isDark() ? '#181818' : '#383838');
    ctx.fillRect(mechX + 8, mechTop + 2, 1, 1);
    ctx.fillStyle = Math.sin(time * 0.05 + 1) > 0 ? p.ledGreen : p.ledRed;
    ctx.fillRect(mechX + 32, mechTop + 2, 1, 1);

    // MRI Scanner
    const patientX = scanCx - halfW - 12 + Math.floor(scanOffset);
    const showKoikoiOnTable = !isDark() && isMri && stype !== 'stand-up' && stype !== 'scan-pause';

    drawScannerTableBehind(scanCx, rackH);
    drawScannerBody(scanCx, rackH);
    drawScannerBore(scanCx, rackH);
    drawScannerTableFront(scanCx, rackH);

    // Koikoi on table — drawn AFTER scanner so he's always in front
    if (showKoikoiOnTable) {
      drawKoikoiLying(patientX, centerY - 1);
    }

    // ===== Characters (light mode only) =====
    if (!isDark()) {
      const blinkT = Math.floor(time * 0.4) % 120 < 4;
      const blinkP = Math.floor(time * 0.4 + 75) % 120 < 4;
      const blinkPt = Math.floor(time * 0.4 + 50) % 120 < 4;
      const blinkU = Math.floor(time * 0.4 + 30) % 120 < 4;
      const blinkW = Math.floor(time * 0.4 + 90) % 120 < 4;
      const blinkA = Math.floor(time * 0.4 + 45) % 120 < 4;

      const armFrame = Math.floor(time * 0.15);

      // Truc sitting at her desk, facing left (static during head pat)
      const blinkTr = Math.floor(time * 0.4 + 15) % 120 < 4;
      drawTrucnnthSitting(tDeskX + 28, deskY - 4, blinkTr);

      // Ptyap near server rack
      // Patrick in middle of server rack, facing right
      const patrickBob = (talkTarget === 'patrick') ? greetBob : 0;
      drawPatrick(srvX + 20, groundY - 12 - patrickBob, blinkPt);

      // Ptyap near server rack
      const ptyapBob = (talkTarget === 'ptyap') ? greetBob : 0;
      drawPtyap(srvX + 42, groundY - 11 - ptyapBob, blinkP);

      // Uzay near MRI workstation
      const uzayBob = (talkTarget === 'uzay') ? greetBob : 0;
      drawUzay(wsX - 6, groundY - 13 - uzayBob, blinkU);

      // Amber (at leey's old position)
      const amberBob = (talkTarget === 'amber') ? greetBob : 0;
      drawAmber(wsX + 33, groundY - 12 - amberBob, blinkA);

      // Weitang (right side of MRI scanner, facing left)
      const weitangBob = (talkTarget === 'weitang') ? greetBob : 0;
      drawWeitang(scanCx + 6, groundY - 13 - weitangBob, blinkW);

      // ===== Draw Koikoi =====
      if (stype === 'stand-r') {
        drawKoikoi(kx, groundY - 11);
      } else if (stype === 'walk-r') {
        drawKoikoiWalk(kx, groundY - 11, walkFrame, false);
      } else if (stype === 'walk-l') {
        drawKoikoiWalk(kx, groundY - 11, walkFrame, true);
      } else if (stype === 'talk-l') {
        drawKoikoiLeft(kx, groundY - 11 - greetBob);
      } else if (stype === 'talk-r') {
        drawKoikoi(kx, groundY - 11 - greetBob);
      } else if (stype === 'pat-truc') {
        // Koikoi faces right, arm extends right to pat truc's head
        const ky = groundY - 11;
        drawKoikoi(kx, ky);
        // Pat arm: extends right toward truc's head (truc at tDeskX+28=64)
        const trucHeadY = deskY - 4;  // truc's hair top
        const patBob = Math.sin(pct * Math.PI * 6) * 1;  // 3 pats
        ctx.fillStyle = p.skin;
        // Arm from koikoi's right side (kx+4) bridging to truc's head (64)
        for (let ax = kx + 4; ax <= tDeskX + 28; ax++) {
          ctx.fillRect(ax, trucHeadY + Math.round(patBob), 1, 1);
        }
      } else if (stype === 'stand-up') {
        drawKoikoi(kx, groundY - 11);
      }
      // lie-down, scan-in, scan-pause, scan-out — koikoi drawn earlier (on table)
    }

    requestAnimationFrame(draw);
  }
  draw();
})();
