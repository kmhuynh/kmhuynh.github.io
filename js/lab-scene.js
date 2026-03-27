// ===== Pixel Art Banner — Research Lab Scene =====
(function() {
  const canvas = document.getElementById('lab-canvas');
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
      kCap: '#808088', kHair: '#483828', kShirt: '#2a5828', kPants: '#c0b080', kSneakers: '#4878b8',
      tCap: '#78a8d8', tCapBrim: '#5888b8', tHair: '#784020',
      tShirt: '#78a8d8', tPants: '#c8b888', tPouch: '#e08830', tPouchStrap: '#c07028',
      uHair: '#a8a8b0', uShirt: '#5878a0', uPants: '#484848', uShoes: '#383028',
      lHair: '#202020', lPants: '#404048', lShoes: '#383028',
      aHair: '#c8a060', aPants: '#408080', aSneakers: '#c8c8c8',
      gHair: '#907050', gSteth: '#486878',
      pHair: '#282018', pShirt: '#282828', pPants: '#4868a0', pShoes: '#302820',
      patientGown: '#90a8b8',
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
      kCap: '#707078', kHair: '#383020', kShirt: '#285020', kPants: '#988868', kSneakers: '#3868a0',
      tCap: '#5878a0', tCapBrim: '#486888', tHair: '#683818',
      tShirt: '#5878a0', tPants: '#b0a078', tPouch: '#b87020', tPouchStrap: '#986018',
      uHair: '#909098', uShirt: '#506878', uPants: '#383838', uShoes: '#302818',
      lHair: '#282828', lPants: '#383840', lShoes: '#302818',
      aHair: '#a88848', aPants: '#408070', aSneakers: '#909090',
      gHair: '#685038', gSteth: '#304050',
      pHair: '#181010', pShirt: '#181818', pPants: '#284878', pShoes: '#201810',
      patientGown: '#708090',
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

  function drawDesk(x, noPepsi) {
    const p = P();
    const deskY = groundY - 6;
    // Wide desk surface
    ctx.fillStyle = p.desk;
    ctx.fillRect(x, deskY, 26, 2);
    // Desk legs
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
    // Metal frame — thin vertical strips on sides
    ctx.fillStyle = p.server;
    ctx.fillRect(x, top, 8, rackH);
    ctx.fillStyle = p.serverDetail;
    ctx.fillRect(x, top, 1, rackH);       // left frame rail
    ctx.fillRect(x + 7, top, 1, rackH);   // right frame rail
    // Blinky light on top
    ctx.fillStyle = p.ledGreen;
    ctx.fillRect(x + 4, top, 1, 1);
    // Server rows — stacked shoeboxes with gaps
    const slotH = 3;
    let sy = top + 2;
    let slot = 0;
    while (sy + slotH <= top + rackH - 1) {
      if (slot === 2 || slot === 5) {
        // Empty slot — darker gap
        ctx.fillStyle = p.scanBore;
        ctx.fillRect(x + 1, sy, 6, slotH);
      } else {
        // Server unit — lighter gray box
        ctx.fillStyle = p.serverDetail;
        ctx.fillRect(x + 1, sy, 6, slotH);
        // Ventilation slits
        ctx.fillStyle = p.server;
        ctx.fillRect(x + 2, sy + 1, 3, 1);
      }
      // 1px gap between rows
      sy += slotH + 1;
      slot++;
    }
  }

  function drawWorkstation(x) {
    const p = P();
    const counterY = groundY - 5;
    // Built-in counter — wider for 4 monitors
    ctx.fillStyle = p.server;
    ctx.fillRect(x, counterY, 32, 2);
    ctx.fillRect(x, counterY + 2, 2, 3);         // left panel support
    ctx.fillRect(x + 30, counterY + 2, 2, 3);    // right panel support
    // Rack PC under left side
    ctx.fillStyle = p.serverDetail;
    ctx.fillRect(x + 3, counterY + 2, 3, 3);
    ctx.fillStyle = p.ledGreen;
    ctx.fillRect(x + 4, counterY + 3, 1, 1);
    // 4 monitors on counter
    for (let m = 0; m < 4; m++) {
      const mx = x + 1 + m * 7;
      const isCenter = (m === 1 || m === 2);
      const mh = isCenter ? 6 : 5;
      const mw = isCenter ? 7 : 6;
      ctx.fillStyle = p.monBezel;
      ctx.fillRect(mx, counterY - mh - 1, mw, mh);
      ctx.fillStyle = p.monScreen;
      ctx.fillRect(mx + 1, counterY - mh, mw - 2, mh - 2);
      // Stand
      ctx.fillStyle = p.monBezel;
      ctx.fillRect(mx + Math.floor(mw / 2), counterY - 1, 1, 1);
    }
    // Keyboard
    ctx.fillStyle = p.chair;
    ctx.fillRect(x + 10, counterY - 1, 5, 1);
    // Intercom panel (far right)
    ctx.fillStyle = p.serverDetail;
    ctx.fillRect(x + 29, counterY - 3, 2, 3);
    ctx.fillStyle = p.ledRed;
    ctx.fillRect(x + 29, counterY - 2, 1, 1);
    // Chair 1 (left position — wheels on floor)
    ctx.fillStyle = p.chair;
    ctx.fillRect(x + 7, counterY + 2, 3, 2);
    ctx.fillStyle = p.chairHi;
    ctx.fillRect(x + 6, counterY + 4, 5, 1);
    ctx.fillStyle = p.chair;
    ctx.fillRect(x + 8, counterY + 5, 1, groundY - counterY - 5);
    ctx.fillRect(x + 6, groundY, 1, 1);
    ctx.fillRect(x + 8, groundY, 1, 1);
    ctx.fillRect(x + 10, groundY, 1, 1);
    // Stool 2 (right position — wheels on floor)
    ctx.fillStyle = p.chairHi;
    ctx.fillRect(x + 20, counterY + 3, 4, 1);
    ctx.fillStyle = p.chair;
    ctx.fillRect(x + 21, counterY + 4, 1, groundY - counterY - 4);
    ctx.fillRect(x + 20, groundY, 1, 1);
    ctx.fillRect(x + 22, groundY, 1, 1);
  }

  function drawScannerTableBehind(cx, rackH) {
    // Table portion that passes BEHIND the scanner (right side)
    const p = P();
    const sTop = groundY - rackH;
    const centerY = sTop + Math.floor(rackH / 2);
    const halfW = 11;
    ctx.fillStyle = p.chair;
    ctx.fillRect(cx, centerY, halfW + 4, 2);
  }

  function drawScanner(cx, rackH) {
    // cx = horizontal center; height matches server rack
    const p = P();
    const sTop = groundY - rackH;
    const halfW = 11;
    const centerY = sTop + Math.floor(rackH / 2);
    const boreR = 3; // smaller bore — 6px diameter

    // Body: round top (semicircle), flat bottom (rectangle)
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

    // Bore: light ring then transparent hole
    for (let dy = -boreR - 1; dy <= boreR + 1; dy++) {
      const row = centerY + dy;
      const ringSpan = Math.floor(Math.sqrt((boreR + 1) * (boreR + 1) - dy * dy));
      if (ringSpan <= 0) continue;
      ctx.fillStyle = isDark() ? '#505868' : '#b0b8c8';
      ctx.fillRect(cx - ringSpan, row, ringSpan * 2 + 1, 1);
    }
    for (let dy = -boreR; dy <= boreR; dy++) {
      const row = centerY + dy;
      const span = Math.floor(Math.sqrt(boreR * boreR - dy * dy));
      ctx.clearRect(cx - span, row, span * 2 + 1, 1);
    }

    // Patient table — crosses in FRONT on the left, passes BEHIND on the right
    const tableY = centerY;
    // Left portion: drawn AFTER body = in front of scanner
    ctx.fillStyle = p.chair;
    ctx.fillRect(cx - halfW - 16, tableY, halfW + 16, 2);
    ctx.fillStyle = p.scanBody;
    ctx.fillRect(cx - halfW - 16, tableY + 2, 16, 1);
    // Right portion was drawn before the body (handled in draw loop — see drawScannerTableBehind)

    // Patient on table (only in light mode — goes home at night)
    if (!isDark()) {
      ctx.fillStyle = p.patientGown;
      ctx.fillRect(cx - halfW - 12, tableY - 1, 10, 2);
      ctx.fillStyle = p.skin;
      ctx.fillRect(cx - halfW - 12, tableY - 1, 2, 1); // head
      ctx.fillRect(cx - halfW - 2, tableY, 2, 1);       // feet
      ctx.fillStyle = p.coil;
      ctx.fillRect(cx - halfW - 8, tableY - 2, 4, 1);
    }
  }

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

  function drawLeey(cx, cy, blink) {
    const p = P();
    ctx.fillStyle = p.lHair;
    ctx.fillRect(cx, cy, 4, 2);
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx, cy + 2, 4, 2);
    if (!blink) { ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818'; ctx.fillRect(cx + 3, cy + 2, 1, 1); }
    ctx.fillStyle = p.labCoat;
    ctx.fillRect(cx, cy + 4, 4, 4);
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx + 4, cy + 5, 1, 2);
    ctx.fillStyle = p.lPants;
    ctx.fillRect(cx, cy + 8, 4, 2);
    ctx.fillStyle = p.lShoes;
    ctx.fillRect(cx, cy + 10, 2, 1);
    ctx.fillRect(cx + 2, cy + 10, 2, 1);
  }

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

  function drawGoralski(cx, cy, blink) {
    const p = P();
    // Blonde hair with side strands (female)
    ctx.fillStyle = p.aHair;
    ctx.fillRect(cx, cy, 4, 2);
    ctx.fillRect(cx - 1, cy + 1, 1, 3);
    ctx.fillRect(cx + 4, cy + 1, 1, 3);
    // Face (lighter skin)
    ctx.fillStyle = p.skinLight;
    ctx.fillRect(cx, cy + 2, 4, 2);
    if (!blink) { ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818'; ctx.fillRect(cx + 3, cy + 2, 1, 1); }
    // White lab coat (long)
    ctx.fillStyle = p.labCoat;
    ctx.fillRect(cx, cy + 4, 4, 4);
    // Stethoscope around neck
    ctx.fillStyle = p.gSteth;
    ctx.fillRect(cx + 1, cy + 4, 2, 1);
    // Arm
    ctx.fillStyle = p.skinLight;
    ctx.fillRect(cx + 4, cy + 5, 1, 2);
    // Dark pants
    ctx.fillStyle = p.lPants;
    ctx.fillRect(cx, cy + 8, 4, 2);
    // Dark shoes
    ctx.fillStyle = p.lShoes;
    ctx.fillRect(cx, cy + 10, 2, 1);
    ctx.fillRect(cx + 2, cy + 10, 2, 1);
  }

  function drawPtyap(cx, cy, blink) {
    const p = P();
    // Short dark hair (Asian male)
    ctx.fillStyle = p.pHair;
    ctx.fillRect(cx, cy, 4, 2);
    // Face — eye on LEFT (facing server)
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx, cy + 2, 4, 2);
    if (!blink) { ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818'; ctx.fillRect(cx, cy + 2, 1, 1); }
    // Black polo shirt
    ctx.fillStyle = p.pShirt;
    ctx.fillRect(cx, cy + 4, 4, 3);
    // Arms holding laptop (facing left)
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx - 1, cy + 5, 1, 2);
    // Laptop
    ctx.fillStyle = p.tablet;
    ctx.fillRect(cx - 2, cy + 5, 2, 2);
    ctx.fillStyle = p.tabletScreen;
    ctx.fillRect(cx - 2, cy + 5, 1, 1);
    // Blue jeans
    ctx.fillStyle = p.pPants;
    ctx.fillRect(cx, cy + 7, 4, 2);
    // Shoes
    ctx.fillStyle = p.pShoes;
    ctx.fillRect(cx, cy + 9, 2, 2);
    ctx.fillRect(cx + 2, cy + 9, 2, 2);
  }

  function drawKoikoiSitting(cx, cy, blink) {
    const p = P();
    ctx.fillStyle = p.kHair;
    ctx.fillRect(cx, cy, 4, 2);
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx, cy + 2, 4, 2);
    if (!blink) { ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818'; ctx.fillRect(cx, cy + 2, 1, 1); }
    // Green polo (short for seated)
    ctx.fillStyle = p.kShirt;
    ctx.fillRect(cx, cy + 4, 4, 2);
    // Arms resting forward (toward desk)
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx - 1, cy + 4, 1, 2);
    ctx.fillRect(cx - 2, cy + 5, 1, 1);
  }

  // Trucnnth — standing (facing right, default)
  function drawTrucnnth(cx, cy) {
    const p = P();
    ctx.fillStyle = p.lHair;
    ctx.fillRect(cx, cy, 4, 2);
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx, cy + 2, 4, 2);
    ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818';
    ctx.fillRect(cx + 3, cy + 2, 1, 1);
    ctx.fillStyle = '#f8a0a0'; ctx.globalAlpha = 0.4;
    ctx.fillRect(cx + 3, cy + 3, 1, 1); ctx.globalAlpha = 1;
    ctx.fillStyle = p.tShirt;
    ctx.fillRect(cx, cy + 4, 4, 3);
    ctx.fillStyle = p.tPouchStrap;
    ctx.fillRect(cx - 1, cy + 3, 1, 4);
    ctx.fillStyle = p.tPouch;
    ctx.fillRect(cx - 2, cy + 6, 2, 2);
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx + 4, cy + 5, 1, 2);
    ctx.fillStyle = p.tPants;
    ctx.fillRect(cx, cy + 7, 4, 2);
    ctx.fillStyle = '#483020';
    ctx.fillRect(cx, cy + 9, 2, 2);
    ctx.fillRect(cx + 2, cy + 9, 2, 2);
  }

  // Trucnnth — standing facing LEFT (mirrored)
  function drawTrucnnthLeft(cx, cy) {
    const p = P();
    ctx.fillStyle = p.lHair;
    ctx.fillRect(cx, cy, 4, 2);
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx, cy + 2, 4, 2);
    ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818';
    ctx.fillRect(cx, cy + 2, 1, 1);
    ctx.fillStyle = '#f8a0a0'; ctx.globalAlpha = 0.4;
    ctx.fillRect(cx, cy + 3, 1, 1); ctx.globalAlpha = 1;
    ctx.fillStyle = p.tShirt;
    ctx.fillRect(cx, cy + 4, 4, 3);
    ctx.fillStyle = p.tPouchStrap;
    ctx.fillRect(cx + 4, cy + 3, 1, 4);
    ctx.fillStyle = p.tPouch;
    ctx.fillRect(cx + 4, cy + 6, 2, 2);
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx - 1, cy + 5, 1, 2);
    ctx.fillStyle = p.tPants;
    ctx.fillRect(cx, cy + 7, 4, 2);
    ctx.fillStyle = '#483020';
    ctx.fillRect(cx, cy + 9, 2, 2);
    ctx.fillRect(cx + 2, cy + 9, 2, 2);
  }

  // Trucnnth — walking (with boot alternation + bob)
  function drawTrucnnthWalk(cx, cy, frame, left) {
    const p = P();
    const bob = Math.abs(Math.sin(frame * 0.8)) * 1.0;
    const fy = cy - bob;
    ctx.fillStyle = p.lHair;
    ctx.fillRect(cx, fy, 4, 2);
    // Face
    ctx.fillStyle = p.skin;
    ctx.fillRect(cx, fy + 2, 4, 2);
    ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818';
    ctx.fillRect(left ? cx : cx + 3, fy + 2, 1, 1);
    // Shirt
    ctx.fillStyle = p.tShirt;
    ctx.fillRect(cx, fy + 4, 4, 3);
    // Pouch
    ctx.fillStyle = p.tPouchStrap;
    ctx.fillRect(left ? cx + 4 : cx - 1, fy + 3, 1, 4);
    ctx.fillStyle = p.tPouch;
    ctx.fillRect(left ? cx + 4 : cx - 2, fy + 6, 2, 2);
    // Arm swing
    const armY = (frame % 4 < 2) ? fy + 4 : fy + 6;
    ctx.fillStyle = p.skin;
    ctx.fillRect(left ? cx - 1 : cx + 4, armY, 1, 2);
    // Pants
    ctx.fillStyle = p.tPants;
    ctx.fillRect(cx, fy + 7, 4, 2);
    // Boot alternation (4-frame walk cycle)
    ctx.fillStyle = '#483020';
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

  // Trucnnth — sitting (back to viewer, facing monitors)
  function drawTrucnnthSitting(cx, cy, armFrame) {
    const p = P();
    ctx.fillStyle = p.lHair;
    ctx.fillRect(cx, cy, 4, 2);
    // Back of shirt
    ctx.fillStyle = p.tShirt;
    ctx.fillRect(cx, cy + 3, 4, 3);
    // Pouch strap across back
    ctx.fillStyle = p.tPouchStrap;
    ctx.fillRect(cx + 1, cy + 3, 1, 3);
    // Arms typing (oscillate forward)
    ctx.fillStyle = p.skin;
    const armOff = (armFrame % 2 === 0) ? -1 : -2;
    ctx.fillRect(cx + armOff, cy + 4, 1, 2);
    ctx.fillRect(cx + 4 - armOff, cy + 4, 1, 2);
  }

  let time = 0;

  function draw() {
    time += 0.4;
    const p = P();
    const codes = [p.code1, p.code2, p.code3];

    ctx.clearRect(0, 0, W, H);

    // Key position constants (used by both equipment draws and state machine)
    const deskY = groundY - 6;
    const kDeskX = 2;
    const tDeskX = 36;
    const srvX = 78;
    const wsX = 158;
    const counterY = groundY - 5;
    const scanCx = 230;

    // === LAYOUT: desks+servers (left) — MRI suite (right) ===

    // Light gray floor line
    ctx.fillStyle = isDark() ? '#686868' : '#d0d0d0';
    ctx.fillRect(0, groundY, W, 1);

    // Room label
    drawPixelText('3163b', 50, groundY - 20, true);

    // --- LEFT: Two desks + servers nearby ---

    // Cabinets above koikoi's desk area
    ctx.fillStyle = isDark() ? '#484850' : '#909098';
    ctx.fillRect(kDeskX + 2, deskY - 14, 22, 5);
    ctx.fillStyle = isDark() ? '#383840' : '#787880';
    ctx.fillRect(kDeskX + 9, deskY - 14, 1, 5);
    ctx.fillRect(kDeskX + 16, deskY - 14, 1, 5);
    ctx.fillStyle = isDark() ? '#606068' : '#b0b0b8';
    ctx.fillRect(kDeskX + 6, deskY - 12, 1, 1);
    ctx.fillRect(kDeskX + 13, deskY - 12, 1, 1);
    ctx.fillRect(kDeskX + 20, deskY - 12, 1, 1);

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

    // Trucnnth's desk — a few px gap
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

    // HPC cluster — close to desk area
    const rackH = 20;
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

    // Bulletin board — centered between ptyap and uzay
    const bbX = 128;
    const bbTop = groundY - rackH;
    ctx.fillStyle = isDark() ? '#604830' : '#b09070';
    ctx.fillRect(bbX, bbTop, 20, 10);
    // Frame
    ctx.fillStyle = isDark() ? '#483820' : '#907050';
    ctx.fillRect(bbX, bbTop, 20, 1);
    ctx.fillRect(bbX, bbTop + 9, 20, 1);
    ctx.fillRect(bbX, bbTop, 1, 10);
    ctx.fillRect(bbX + 19, bbTop, 1, 10);
    // Pinned papers — white (accepted) + colored fliers
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

    // --- RIGHT: MRI suite ---
    // "UNC BRIC" label above workstation (same height as 3163b)
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

    // === Mechanical Room — flush wall of equipment, same height as servers ===
    const mechX = scanCx + 12;
    const mechTop = groundY - rackH;

    // Chiller (left section, no gaps, full height)
    ctx.fillStyle = isDark() ? '#585860' : '#a0a0a8';
    ctx.fillRect(mechX, mechTop, 10, rackH);
    ctx.fillStyle = isDark() ? '#484850' : '#888890';
    ctx.fillRect(mechX + 1, mechTop + 4, 8, 1);
    ctx.fillRect(mechX + 1, mechTop + 10, 8, 1);
    ctx.fillRect(mechX + 1, mechTop + 16, 8, 1);

    // Gradient Amplifier 1 (flush against chiller, server-colored)
    ctx.fillStyle = p.server;
    ctx.fillRect(mechX + 10, mechTop, 8, rackH);
    ctx.fillStyle = p.serverDetail;
    ctx.fillRect(mechX + 11, mechTop + 4, 6, 1);
    ctx.fillRect(mechX + 11, mechTop + 8, 6, 1);
    ctx.fillRect(mechX + 11, mechTop + 12, 6, 1);
    ctx.fillRect(mechX + 11, mechTop + 16, 6, 1);

    // Gradient Amplifier 2 (flush against amp 1)
    ctx.fillStyle = p.server;
    ctx.fillRect(mechX + 18, mechTop, 8, rackH);
    ctx.fillStyle = p.serverDetail;
    ctx.fillRect(mechX + 19, mechTop + 4, 6, 1);
    ctx.fillRect(mechX + 19, mechTop + 8, 6, 1);
    ctx.fillRect(mechX + 19, mechTop + 12, 6, 1);
    ctx.fillRect(mechX + 19, mechTop + 16, 6, 1);

    // Power Distribution / UPS (flush against amp 2, server-colored)
    ctx.fillStyle = p.server;
    ctx.fillRect(mechX + 26, mechTop, 8, rackH);
    ctx.fillStyle = p.serverDetail;
    ctx.fillRect(mechX + 27, mechTop + 2, 6, 1);
    // Display panel
    ctx.fillStyle = isDark() ? '#183018' : '#203820';
    ctx.fillRect(mechX + 28, mechTop + 4, 4, 2);
    ctx.fillStyle = p.code1;
    ctx.fillRect(mechX + 29, mechTop + 5, 2, 1);
    // Thick cables into floor
    ctx.fillStyle = isDark() ? '#303038' : '#484850';
    ctx.fillRect(mechX + 28, groundY, 2, 1);
    ctx.fillRect(mechX + 31, groundY, 2, 1);

    // Blinking indicator lights across mech room
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

    // Scanner — table behind (right side) BEFORE body
    drawScannerTableBehind(scanCx, rackH);
    // Scanner body + table in front (left side) + patient
    drawScanner(scanCx, rackH);

    // === Trucnnth state machine — compute FIRST so greetBob is available ===
    const myDeskX = tDeskX + 10;   // 46 — standing at her monitors
    const koikoiTalkX = 22;        // 8px left of koikoi (30)
    const ptyapTalkX = 112;        // 8px left of ptyap (120)
    const uzayTalkX = 144;         // 8px left of uzay (152)
    const wsStandX = wsX + 10;     // 168 — at workstation
    const leeyTalkX = 183;         // 8px left of leey (191)
    const goralskiTalkX = 218;     // 8px right of goralski (210)
    const amberTalkX = 228;        // 8px left of amber (236)
    const scannerX = 222;          // at scanner buttons

    // [endTime, startX, endX, type, talkTarget]
    // Walk durations proportional to distance (~1.1 px/time unit pace)
    // Distances: desk↔koikoi=24, desk→ptyap=66, ptyap→uzay=32, uzay→ws=24,
    //   ws→leey=15, leey→goralski=35, goralski→amber=10, amber→scanner=6,
    //   scanner→ws=54, ws→desk=122
    const S = 1.1; // pixels per time unit (consistent walk speed)
    let t = 0;
    t += 40;  const t1 = t;  // work at desk
    t += Math.round(24/S);  const t2 = t;  // walk to koikoi (24px)
    t += 15;  const t3 = t;  // talk koikoi
    t += Math.round(24/S);  const t4 = t;  // walk back to desk (24px)
    t += Math.round(66/S);  const t5 = t;  // walk to ptyap (66px)
    t += 12;  const t6 = t;  // talk ptyap
    t += Math.round(32/S);  const t7 = t;  // walk to uzay (32px)
    t += 12;  const t8 = t;  // talk uzay
    t += Math.round(24/S);  const t9 = t;  // walk to workstation (24px)
    t += 35;  const t10 = t; // work at workstation
    t += Math.round(15/S);  const t11 = t; // walk to leey (15px)
    t += 12;  const t12 = t; // talk leey
    t += Math.round(35/S);  const t13 = t; // walk to goralski (35px)
    t += 12;  const t14 = t; // talk goralski
    t += Math.round(10/S);  const t15 = t; // walk to amber (10px)
    t += 12;  const t16 = t; // talk amber
    t += Math.round(6/S);   const t17 = t; // walk to scanner (6px)
    t += 18;  const t18 = t; // push scanner buttons
    t += Math.round(54/S);  const t19 = t; // walk back to ws (54px)
    t += 30;  const t20 = t; // work at workstation
    t += Math.round(122/S); const t21 = t; // walk back to desk (122px)
    t += 20;  // work at desk to end cycle
    const CYCLE = t21 + 20;
    const ct = time % CYCLE;

    const states = [
      [t1,  myDeskX,       myDeskX,       'work-r',  null],
      [t2,  myDeskX,       koikoiTalkX,   'walk-l',  null],
      [t3,  koikoiTalkX,   koikoiTalkX,   'talk-l',  'koikoi'],
      [t4,  koikoiTalkX,   myDeskX,       'walk-r',  null],
      [t5,  myDeskX,       ptyapTalkX,    'walk-r',  null],
      [t6,  ptyapTalkX,    ptyapTalkX,    'talk-r',  'ptyap'],
      [t7,  ptyapTalkX,    uzayTalkX,     'walk-r',  null],
      [t8,  uzayTalkX,     uzayTalkX,     'talk-r',  'uzay'],
      [t9,  uzayTalkX,     wsStandX,      'walk-r',  null],
      [t10, wsStandX,      wsStandX,      'work-r',  null],
      [t11, wsStandX,      leeyTalkX,     'walk-r',  null],
      [t12, leeyTalkX,     leeyTalkX,     'talk-r',  'leey'],
      [t13, leeyTalkX,     goralskiTalkX, 'walk-r',  null],
      [t14, goralskiTalkX, goralskiTalkX, 'talk-l',  'goralski'],
      [t15, goralskiTalkX, amberTalkX,    'walk-r',  null],
      [t16, amberTalkX,    amberTalkX,    'talk-r',  'amber'],
      [t17, amberTalkX,    scannerX,      'walk-l',  null],
      [t18, scannerX,      scannerX,      'scanner', null],
      [t19, scannerX,      wsStandX,      'walk-l',  null],
      [t20, wsStandX,      wsStandX,      'work-r',  null],
      [t21, wsStandX,      myDeskX,       'walk-l',  null],
      [t21 + 20, myDeskX,  myDeskX,       'work-r',  null],
    ];

    // Find current state
    let prevEnd = 0, sx = myDeskX, ex = myDeskX, stype = 'work-r', talkTarget = null;
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
    const tx = Math.floor(sx + (ex - sx) * pct);
    const walkFrame = Math.floor(time * 0.15) % 4;

    // Greeting bob: 2 quick bobs when talking (2 sine peaks over the talk duration)
    const greetBob = talkTarget ? Math.abs(Math.sin(pct * Math.PI * 2)) * 2.0 : 0;

    // --- Characters only in light mode (everyone goes home in dark mode) ---
    if (!isDark()) {
      const blinkK = Math.floor(time * 0.4) % 120 < 4;
      const blinkU = Math.floor(time * 0.4 + 30) % 120 < 4;
      const blinkL = Math.floor(time * 0.4 + 60) % 120 < 4;
      const blinkA = Math.floor(time * 0.4 + 45) % 120 < 4;
      const blinkG = Math.floor(time * 0.4 + 90) % 120 < 4;
      const blinkP = Math.floor(time * 0.4 + 75) % 120 < 4;

      drawKoikoiSitting(kDeskX + 28, deskY - 4 - (talkTarget === 'koikoi' ? greetBob : 0), blinkK);
      drawPtyap(srvX + 42, groundY - 11 - (talkTarget === 'ptyap' ? greetBob : 0), blinkP);
      drawUzay(wsX - 6, groundY - 13 - (talkTarget === 'uzay' ? greetBob : 0), blinkU);
      drawLeey(wsX + 33, groundY - 11 - (talkTarget === 'leey' ? greetBob : 0), blinkL);
      drawGoralski(scanCx - 20, groundY - 11 - (talkTarget === 'goralski' ? greetBob : 0), blinkG);
      drawAmber(scanCx + 6, groundY - 12 - (talkTarget === 'amber' ? greetBob : 0), blinkA);

      // --- Draw trucnnth ---
      if (stype === 'work-r') {
        drawTrucnnth(tx, groundY - 11);
      } else if (stype === 'walk-r') {
        drawTrucnnthWalk(tx, groundY - 11, walkFrame, false);
      } else if (stype === 'walk-l') {
        drawTrucnnthWalk(tx, groundY - 11, walkFrame, true);
      } else if (stype === 'talk-l') {
        drawTrucnnthLeft(tx, groundY - 11 - greetBob);
      } else if (stype === 'talk-r') {
        drawTrucnnth(tx, groundY - 11 - greetBob);
      } else if (stype === 'scanner') {
        drawTrucnnthLeft(tx, groundY - 11);
        ctx.fillStyle = p.skin;
        ctx.fillRect(tx - 2, groundY - 6, 1, 1);
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
})();
