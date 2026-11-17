/* ============================================================
   Duespy — client-side detective engine
   Sample case file. All detection, forecasting and the cancel
   advisor run in the browser with plain rules.
   ============================================================ */
(() => {
  'use strict';

  /* ============================================================
     STRIPE CHECKOUT LINKS  ← EDIT THIS BLOCK ONLY
     ------------------------------------------------------------
     These are TEST links (Stripe sandbox). Replace each URL with
     the matching LIVE Payment Link from your Stripe dashboard
     (Dashboard → Payment Links) when you are ready to take real
     money. Keys must match the plan + billing cycle exactly.

     A button whose plan/cycle has no URL here is left as-is (it will
     scroll to #pricing) rather than being sent to Stripe.
     ============================================================ */
  const STRIPE_LINKS = {
    'Detective|monthly': 'https://buy.stripe.com/test_4gM00igOU7Aoh04djt5gc00',
    'Detective|annual' : 'https://buy.stripe.com/test_6oU14mfKQaMA4di2EP5gc01',
    'Precinct|monthly' : 'https://buy.stripe.com/test_fZu7sK0PWg6UfW03IT5gc02',
    'Precinct|annual'  : 'https://buy.stripe.com/test_bJe7sKgOUg6UfW0gvF5gc03',
  };

  /* Live-ness is read from the links rather than a second flag, so pasting
     real URLs switches the site over on its own and there is nothing to
     forget. Test links carry a /test_ path segment; live ones do not.
     Force either state by setting this to true or false. */
  const CHECKOUT_LIVE = null;
  const checkoutIsLive = () => {
    if (CHECKOUT_LIVE !== null) return CHECKOUT_LIVE;
    const urls = Object.values(STRIPE_LINKS).filter(Boolean);
    return urls.length > 0 && urls.every(u => !/\/test_/.test(u));
  };
  /* ======================= END EDIT BLOCK ===================== */

  /* ============================================================
     NEWSLETTER FORM  ← EDIT THIS ONE VALUE
     ------------------------------------------------------------
     Paste your Formspree endpoint here. It looks like:
       https://formspree.io/f/xxxxxxxx
     Find it in your Formspree dashboard (https://formspree.io/account)
     next to the form you created. It is a public URL, so it is safe to
     keep in this file - there is no secret key.

     While this is empty the form validates the address and says so
     honestly instead of pretending the signup was recorded.
     ============================================================ */
  const FORM_ENDPOINT = 'https://formspree.io/f/mnpddqqa';
  /* ======================= END EDIT BLOCK ===================== */

  const TODAY = new Date();
  TODAY.setHours(0, 0, 0, 0);

  /* Visitor-supplied text is interpolated into innerHTML all over the board,
     so escape it. Anything rendered from a subscription field goes through
     this first. */
  const esc = (v) => String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const money = (n, dec = 2) =>
    '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const dowNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  /* ── the case file ─────────────────────────────────────── */
  const SEED = [
    { id:'netflix', name:'Netflix',        cat:'Streaming',    brand:'#e50914', letter:'N',
      price:15.49, cycle:'monthly', priceThen:10.99, signedUp:'2019-03-11', day:14,
      lastUsed:88,  usage:'none',        dupGroup:null,    note:'No episode finished in 14 months.' },
    { id:'spotify', name:'Spotify Premium',cat:'Music',        brand:'#1db954', letter:'S',
      price:11.99, cycle:'monthly', priceThen:9.99,  signedUp:'2018-07-02', day:3,
      lastUsed:1,   usage:'heavy',       dupGroup:null,    note:'Used nearly every day. Keep.' },
    { id:'adobe',   name:'Adobe CC All Apps', cat:'Creative', brand:'#ff0000', letter:'A',
      price:59.99, cycle:'monthly', priceThen:52.99, signedUp:'2021-01-20', day:22,
      lastUsed:12,  usage:'light',       dupGroup:null,    note:'Price rose 13% without notice.' },
    { id:'icloud',  name:'iCloud+ 2TB',    cat:'Cloud storage',brand:'#3b82f6', letter:'i',
      price:9.99,  cycle:'monthly', priceThen:9.99,  signedUp:'2020-05-05', day:9,
      lastUsed:2,   usage:'light',       dupGroup:'cloud', note:'Overlaps with Google One.' },
    { id:'googleone',name:'Google One 2TB',cat:'Cloud storage',brand:'#4285f4', letter:'G',
      price:9.99,  cycle:'monthly', priceThen:9.99,  signedUp:'2022-02-18', day:27,
      lastUsed:2,   usage:'light',       dupGroup:'cloud', note:'Overlaps with iCloud+.' },
    { id:'disney',  name:'Disney+',        cat:'Streaming',    brand:'#113ccf', letter:'D',
      price:13.99, cycle:'monthly', priceThen:7.99,  signedUp:'2020-11-12', day:6,
      lastUsed:41,  usage:'none',        dupGroup:null,    note:'Used for one season, then forgotten.' },
    { id:'nyt',     name:'NYT All Access', cat:'News',         brand:'#121212', letter:'T',
      price:17.00, cycle:'monthly', priceThen:6.25,  signedUp:'2022-08-30', day:11,
      lastUsed:3,   usage:'moderate',    dupGroup:null,    note:'Intro rate expired; tripled in price.' },
    { id:'amazon',  name:'Amazon Prime',   cat:'Shopping',     brand:'#ff9900', letter:'P',
      price:139.00,cycle:'annual',  priceThen:119.00,signedUp:'2017-06-14', day:null, dayOfYear:null, month:6,
      lastUsed:2,   usage:'heavy',       dupGroup:null,    note:'Used for delivery weekly.' },
    { id:'notion',  name:'Notion Plus',    cat:'Productivity', brand:'#111111', letter:'N',
      price:96.00, cycle:'annual',  priceThen:96.00, signedUp:'2023-09-01', month:9,
      lastUsed:4,   usage:'moderate',    dupGroup:null,    note:'Shared with the household.' },
    { id:'peloton', name:'Peloton App One',cat:'Fitness',      brand:'#df1c2f', letter:'P',
      price:12.99, cycle:'monthly', priceThen:12.99, signedUp:'2021-02-08', day:25,
      lastUsed:154, usage:'none',        dupGroup:null,    note:'The bike was sold in June.' },
    { id:'audible', name:'Audible Premium',cat:'Audio',        brand:'#f8991c', letter:'A',
      price:14.95, cycle:'monthly', priceThen:14.95, signedUp:'2022-12-03', day:19,
      lastUsed:29,  usage:'light',       dupGroup:null,    note:'Two credits unused.' },
    { id:'hulu',    name:'Hulu (no ads)',  cat:'Streaming',    brand:'#1ce783', letter:'H',
      price:18.99, cycle:'monthly', priceThen:12.99, signedUp:'2021-09-09', day:16,
      lastUsed:6,   usage:'moderate',    dupGroup:null,    note:'Kept for one show.' },
    { id:'dropbox', name:'Dropbox Plus',   cat:'Cloud storage',brand:'#0061ff', letter:'D',
      price:11.99, cycle:'monthly', priceThen:9.99,  signedUp:'2019-10-22', day:8,
      lastUsed:120, usage:'none',        dupGroup:'cloud', note:'Third cloud drive. Overlaps.' },
  ];

  /* SUBSCRIPTIONS is the working list: seed entries first, visitor additions after. */
  const SUBSCRIPTIONS = [];

  /* ── visitor-added subscriptions ───────────────────────────
     The demo list above is the seed. Anything the visitor adds lives
     here, is tagged custom, and is mirrored into localStorage so it
     survives a reload. Only these entries are ever removed.          */
  const STORE_KEY = 'duespy.custom.v1';

  function readCustom() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }

  function writeCustom() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(SUBSCRIPTIONS.filter(s => s.custom)));
    } catch (e) { /* private mode or quota - the session still works */ }
  }

  /* Rebuild the list as seed + saved, with derived fields filled in so a
     saved entry is indistinguishable from a seeded one downstream. */
  function hydrate() {
    SUBSCRIPTIONS.length = 0;
    SEED.forEach(s => { s.custom = false; SUBSCRIPTIONS.push(s); });
    readCustom().forEach(r => {
      const s = normalize(r);
      if (s) SUBSCRIPTIONS.push(s);
    });
  }

  const CAT_BRANDS = {
    'Streaming':'#113ccf', 'Music':'#1db954', 'Creative':'#ff0000',
    'Cloud storage':'#3b82f6', 'News':'#121212', 'Shopping':'#ff9900',
    'Productivity':'#7a4dff', 'Fitness':'#df1c2f', 'Audio':'#f8991c',
    'Gaming':'#8b5cf6', 'Other':'#6f6d5f',
  };

  /* Turn a stored record into a full subscription, or null if unusable. */
  function normalize(r) {
    if (!r || typeof r !== 'object') return null;
    const price = Number(r.price);
    // Strip anything tag-like as well as escaping at render time; a name is
    // never legitimately markup.
    const name = String(r.name || '').replace(/[<>]/g, '').trim().slice(0, 40);
    const cycle = ['monthly', 'annual', 'quarterly', 'weekly'].includes(r.cycle) ? r.cycle : 'monthly';
    const cat = CAT_BRANDS[r.cat] ? r.cat : 'Other';
    if (!name || !isFinite(price) || price <= 0) return null;
    const day = Math.min(Math.max(parseInt(r.day, 10) || 1, 1), 31);
    return {
      id: String(r.id || '').slice(0, 40) || 'c' + Date.now().toString(36),
      name, cat, cycle, price,
      brand: CAT_BRANDS[cat], letter: name.charAt(0).toUpperCase(),
      priceThen: price, signedUp: '', day,
      lastUsed: 0,
      usage: ['heavy', 'moderate', 'light', 'none'].includes(r.usage) ? r.usage : 'moderate',
      dupGroup: null, note: 'Added by you.',
      custom: true,
    };
  }

  const CYCLE_DAYS = { monthly: 30.44, quarterly: 91.31, annual: 365.25, weekly: 7 };

  const monthlyCost = (s) => {
    if (s.cycle === 'annual') return s.price / 12;
    if (s.cycle === 'quarterly') return s.price / 3;
    if (s.cycle === 'weekly') return (s.price * 52) / 12;
    return s.price;
  };

  const cycleLabel = (s) => ({ monthly:'/mo', annual:'/yr', quarterly:'/qtr', weekly:'/wk' }[s.cycle]);

  /* ── classification: which verdict does this deserve? ──── */
  function classify(s) {
    const dup = s.dupGroup && SUBSCRIPTIONS.some(o => o.id !== s.id && o.dupGroup === s.dupGroup);
    const rose = s.price > s.priceThen + 0.005;
    const creepPct = ((s.price - s.priceThen) / s.priceThen) * 100;
    const monthly = monthlyCost(s);

    if (s.usage === 'none' && monthly >= 8) return { verdict:'cancel', dup, rose, creepPct };
    if (dup && s.usage !== 'heavy') return { verdict:'cancel', dup, rose, creepPct };
    if (s.usage === 'none') return { verdict:'review', dup, rose, creepPct };
    if (s.lastUsed >= 45) return { verdict:'review', dup, rose, creepPct };
    if (s.usage === 'light' && monthly >= 20) return { verdict:'review', dup, rose, creepPct };
    if (creepPct >= 40 && s.usage !== 'heavy') return { verdict:'review', dup, rose, creepPct };
    if (s.lastUsed >= 21) return { verdict:'review', dup, rose, creepPct };
    return { verdict:'keep', dup, rose, creepPct };
  }

  /* ── next charge date ──────────────────────────────────── */
  function nextCharge(s) {
    const d = new Date(TODAY);
    if (s.cycle === 'annual') {
      const m = (s.month || TODAY.getMonth() + 1) - 1;
      let y = TODAY.getFullYear();
      let c = new Date(y, m, Math.min(s.day || 1, 28));
      if (c < TODAY) c = new Date(y + 1, m, Math.min(s.day || 1, 28));
      return c;
    }
    if (s.cycle === 'monthly') {
      const day = s.day || 1;
      let c = new Date(d.getFullYear(), d.getMonth(), day);
      if (c < TODAY) c = new Date(d.getFullYear(), d.getMonth() + 1, day);
      return c;
    }
    if (s.cycle === 'weekly') {
      const day = s.day || 1;
      let c = new Date(d.getFullYear(), d.getMonth(), day);
      while (c < TODAY) c = new Date(c.getTime() + 7 * 864e5);
      return c;
    }
    return new Date(d.getTime() + 15 * 864e5);
  }

  const daysUntil = (date) => Math.round((date - TODAY) / 864e5);

  /* ── state ─────────────────────────────────────────────── */
  const state = {
    filter: 'all',
    annual: false,
    cut: new Set(),
    kept: new Set(),
    calSel: null,
  };

  const byId = (id) => SUBSCRIPTIONS.find(s => s.id === id);
  const isCut = (s) => state.cut.has(s.id);
  const isKept = (s) => state.kept.has(s.id);

  /* ── transaction feed (hero) ───────────────────────────── */
  const TXNS = [
    { merch:'SQ *SPOTIFYUSA',        meta:'Stockholm SE',        amt:11.99, rec:true,  tag:'Recurring · monthly · biller matched' },
    { merch:'WHOLE FOODS MKT #1042', meta:'Card ···4417',        amt:86.40, rec:false },
    { merch:'NETFLIX.COM',           meta:'Los Gatos CA',        amt:15.49, rec:true,  tag:'Recurring · monthly · price +41% since 2019' },
    { merch:'UBER TRIP',             meta:'Card ···4417',        amt:23.10, rec:false },
    { merch:'ADOBE *888-…',          meta:'San Jose CA',         amt:59.99, rec:true,  tag:'Recurring · monthly · increased in March' },
    { merch:'SHELL OIL 57483',       meta:'Card ···4417',        amt:54.02, rec:false },
    { merch:'APPLE.COM/BILL',        meta:'Cupertino CA',        amt:9.99,  rec:true,  tag:'Recurring · monthly · duplicate of Google One' },
    { merch:'AMZN Mktp US*2H4L9',    meta:'Card ···4417',        amt:38.77, rec:false },
  ];

  function renderTxns() {
    const list = document.getElementById('txnList');
    if (!list) return;
    list.innerHTML = '';
    let found = 0;
    TXNS.forEach(t => {
      const li = document.createElement('li');
      li.className = 'txn' + (t.rec ? ' is-recurring' : '');
      li.innerHTML = `
        <span class="txn-mark">${t.rec ? '◆' : '·'}</span>
        <span class="txn-merch">${t.merch}<small>${t.meta}</small></span>
        <span class="txn-amt">${money(t.amt)}</span>
        ${t.tag ? `<span class="txn-tag">${t.tag}</span>` : ''}`;
      list.appendChild(li);
      if (t.rec) found++;
    });
    document.getElementById('txnRecurring').textContent = found;
    document.getElementById('txnNote').textContent = 'Pattern confirmed. Opening the case board.';
  }

  /* ── KPIs ──────────────────────────────────────────────── */
  function renderKPIs() {
    const active = SUBSCRIPTIONS.filter(s => !isCut(s));
    const perMonth = active.reduce((a, s) => a + monthlyCost(s), 0);
    const perYear = perMonth * 12;

    const upcoming = active
      .map(s => ({ s, d: nextCharge(s), days: daysUntil(nextCharge(s)) }))
      .filter(x => x.days <= 30);

    const save = active
      .filter(s => classify(s).verdict === 'cancel' && !isKept(s))
      .reduce((a, s) => a + monthlyCost(s) * 12, 0);

    const set = (sel, txt) => { const el = document.querySelector(sel); if (el) el.textContent = txt; };

    set('#kpiCount', `${active.length} active subscription${active.length === 1 ? '' : 's'}`);
    set('#kpiUpcoming', money(upcoming.reduce((a, x) => a + x.s.price, 0), 2));
    set('#kpiUpcomingMeta', `${upcoming.length} charge${upcoming.length === 1 ? '' : 's'} landing`);
    set('#kpiSave', money(save, 0));
    set('#kpiSaveMeta', state.cut.size
      ? `${state.cut.size} marked to cut`
      : state.kept.size
        ? `${state.kept.size} kept off the list`
        : 'from flagged subscriptions');

    const [mEl, yEl] = document.querySelectorAll('.kpi .kpi-val[data-count]');
    if (mEl) mEl.textContent = money(perMonth, 2);
    if (yEl) yEl.textContent = money(perYear, 2);
  }

  /* ── subscription cards ────────────────────────────────── */
  function renderSubs() {
    const grid = document.getElementById('subGrid');
    if (!grid) return;

    const withVerdict = SUBSCRIPTIONS.map(s => ({ s, c: classify(s) }));
    const counts = {
      all: withVerdict.length,
      review: withVerdict.filter(x => x.c.verdict === 'review').length,
      cancel: withVerdict.filter(x => x.c.verdict === 'cancel').length,
      duplicate: withVerdict.filter(x => x.c.dup).length,
    };
    document.getElementById('cAll').textContent = counts.all;
    document.getElementById('cReview').textContent = counts.review;
    document.getElementById('cCancel').textContent = counts.cancel;
    document.getElementById('cDup').textContent = counts.duplicate;

    const shown = withVerdict
      .filter(x => {
        if (state.filter === 'all') return true;
        if (state.filter === 'duplicate') return x.c.dup;
        return x.c.verdict === state.filter;
      })
      .sort((a, b) => {
        const order = { cancel: 0, review: 1, keep: 2 };
        return order[a.c.verdict] - order[b.c.verdict] || monthlyCost(b.s) - monthlyCost(a.s);
      });

    grid.innerHTML = shown.map(({ s, c }) => {
      const cut = isCut(s);
      const next = nextCharge(s);
      const nd = daysUntil(next);
      const costNow = state.annual ? monthlyCost(s) * 12 : monthlyCost(s);
      const flags = [];
      if (c.dup) flags.push(`<span class="flag warn">Duplicate</span>`);
      if (c.rose) flags.push(`<span class="flag warn">+${c.creepPct.toFixed(0)}% price</span>`);
      if (s.lastUsed >= 45) flags.push(`<span class="flag warn">Idle ${s.lastUsed}d</span>`);
      if (s.usage === 'heavy') flags.push(`<span class="flag good">In daily use</span>`);
      if (s.cycle === 'annual') flags.push(`<span class="flag">Annual</span>`);

      return `
      <article class="sub-card ${cut ? 'is-cut' : ''}" data-id="${s.id}">
        ${s.custom ? '<span class="sub-custom">Added by you</span>' : ''}
        <div class="sub-top">
          <span class="sub-logo" style="--brand:${s.brand}">${s.letter}</span>
          <div>
            <h4 class="sub-name">${esc(s.name)}</h4>
            <p class="sub-cat">${s.cat}</p>
          </div>
          <div class="sub-price">
            <p class="p">${money(state.annual ? monthlyCost(s) * 12 : s.price, 2)}</p>
            <p class="cyc">${state.annual ? '/yr' : cycleLabel(s)}</p>
          </div>
        </div>
        <div class="sub-mid">
          <span class="stamp ${c.verdict}">${c.verdict === 'keep' ? 'Keep' : c.verdict === 'review' ? 'Review' : 'Cut'}</span>
          <div class="sub-flags">${flags.join('')}</div>
        </div>
        <div class="sub-foot">
          <span class="sub-next">Next charge <b>${monthNames[next.getMonth()]} ${next.getDate()}</b> · in ${nd} day${nd === 1 ? '' : 's'}</span>
          <button class="sub-act ${cut ? 'restore' : ''}" data-toggle="${s.id}">${cut ? 'Restore' : 'Mark to cut'}</button>
          ${s.custom ? `<button class="sub-del" data-del="${s.id}" aria-label="Remove ${esc(s.name)}">Remove</button>` : ''}
        </div>
      </article>`;
    }).join('');

    document.getElementById('subEmpty').hidden = shown.length > 0;
    grid.querySelectorAll('[data-del]').forEach(btn => {
      btn.addEventListener('click', () => removeSub(btn.dataset.del));
    });
    grid.querySelectorAll('[data-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.toggle;
        state.cut.has(id) ? state.cut.delete(id) : state.cut.add(id);
        renderAll();
      });
    });
  }

  /* ── upcoming calendar ─────────────────────────────────── */
  function renderUpcoming() {
    const rail = document.getElementById('calRail');
    if (!rail) return;

    const charges = SUBSCRIPTIONS.filter(s => !isCut(s)).map(s => ({
      s, date: nextCharge(s), days: daysUntil(nextCharge(s)),
    })).filter(x => x.days <= 45);

    // group by day
    const groups = new Map();
    charges.forEach(x => {
      const k = x.days;
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(x);
    });
    const maxDay = Math.max(...charges.map(x => x.s.price), 1);

    rail.innerHTML = Array.from({ length: 46 }, (_, i) => {
      const d = new Date(TODAY.getTime() + i * 864e5);
      const g = groups.get(i) || [];
      const sum = g.reduce((a, x) => a + x.s.price, 0);
      const h = g.length ? Math.max(4, Math.round((sum / maxDay) * 30)) : 0;
      const sel = state.calSel === i;
      const label = g.length
        ? `${monthNames[d.getMonth()]} ${d.getDate()}, ${g.length} charge${g.length === 1 ? '' : 's'}, ${money(sum)}`
        : `${monthNames[d.getMonth()]} ${d.getDate()}, nothing scheduled`;
      const attrs = g.length
        ? ` role="button" tabindex="0" data-day="${i}" aria-pressed="${sel}" aria-label="${label}"`
        : ` aria-label="${label}"`;
      return `
        <div class="cal-day ${i === 0 ? 'today' : ''} ${g.length ? '' : 'empty'}${sel ? ' is-sel' : ''}"${attrs}>
          <p class="dow">${i === 0 ? 'Today' : dowNames[d.getDay()]}</p>
          <p class="dnum">${d.getDate()}</p>
          ${h ? `<div class="cal-bar" style="height:${h}px"></div>` : '<div style="height:5px"></div>'}
          <p class="sum">${g.length ? money(sum, 0) : '—'}</p>
          <p class="cnt">${g.length ? g.map(x => esc(x.s.name.split(' ')[0])).join(', ') : 'clear'}</p>
        </div>`;
    }).join('');

    rail.querySelectorAll('.cal-day[data-day]').forEach(el => {
      const day = Number(el.dataset.day);
      const pick = () => {
        state.calSel = state.calSel === day ? null : day;
        renderUpcoming();
      };
      el.addEventListener('click', pick);
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); }
      });
    });

    // selected-day detail
    const detail = document.getElementById('calDetail');
    if (detail) {
      const sel = state.calSel;
      if (sel === null) {
        detail.innerHTML = '<p class="cd-empty">Pick a day to see what lands on it.</p>';
      } else {
        const d = new Date(TODAY.getTime() + sel * 864e5);
        const g = groups.get(sel) || [];
        const head = `${monthNames[d.getMonth()]} ${d.getDate()}`;
        if (!g.length) {
          detail.innerHTML = `<p class="cd-head">${head}</p><p class="cd-empty">Nothing scheduled that day.</p>`;
        } else {
          const tot = g.reduce((a, x) => a + x.s.price, 0);
          detail.innerHTML = `<p class="cd-head">${head} · ${g.length} charge${g.length === 1 ? '' : 's'} · ${money(tot)}</p>
            <ul class="cd-list">${g.map(x => `<li><span>${esc(x.s.name)}</span><b>${money(x.s.price)}</b></li>`).join('')}</ul>`;
        }
      }
    }

    // biggest hit
    const big = charges.slice().sort((a, b) => b.s.price - a.s.price)[0];
    const bigBox = document.getElementById('sideBig');
    if (big) {
      bigBox.innerHTML = `
        <p class="nm">${esc(big.s.name)}</p>
        <p class="amt">${money(big.s.price, 2)}</p>
        <p class="dt">${monthNames[big.date.getMonth()]} ${big.date.getDate()} · in ${big.days} day${big.days === 1 ? '' : 's'}</p>`;
    } else bigBox.innerHTML = '<p class="dt">Nothing scheduled.</p>';

    // next 7 days
    const soon = charges.filter(x => x.days <= 7).sort((a, b) => a.days - b.days);
    const soonList = document.getElementById('sideSoon');
    soonList.innerHTML = soon.length ? soon.map(x => `
      <li><span>${esc(x.s.name)}<br/><small style="color:var(--txt-3)">in ${x.days} day${x.days === 1 ? '' : 's'}</small></span><b>${money(x.s.price)}</b></li>`
    ).join('') : '<li><span>No charges this week.</span><b>$0.00</b></li>';
  }

  /* ── price creep ───────────────────────────────────────── */
  function renderCreep() {
    const list = document.getElementById('creepList');
    if (!list) return;

    const rows = SUBSCRIPTIONS
      .filter(s => s.price > s.priceThen + 0.005)
      .map(s => ({ s, delta: s.price - s.priceThen, pct: ((s.price - s.priceThen) / s.priceThen) * 100 }))
      .sort((a, b) => b.delta - a.delta);

    const totalMonthly = rows.reduce((a, r) =>
      a + (r.s.cycle === 'annual' ? r.delta / 12 : r.delta), 0);
    document.getElementById('creepTotal').textContent = money(totalMonthly, 2);

    const maxNow = Math.max(...rows.map(r => r.s.price), 1);
    list.innerHTML = rows.map(r => {
      const thenW = (r.s.priceThen / maxNow) * 100;
      const nowW = (r.s.price / maxNow) * 100;
      return `
      <div class="creep-row">
        <div class="nm">${esc(r.s.name)}<small>Since ${r.s.signedUp.slice(0, 7)}</small></div>
        <div class="creep-bars">
          <div class="creep-bar then"><span class="trk"><span class="fill" style="width:${thenW}%"></span></span><span class="val">${money(r.s.priceThen)}</span></div>
          <div class="creep-bar now"><span class="trk"><span class="fill" style="width:${nowW}%"></span></span><span class="val">${money(r.s.price)}</span></div>
        </div>
        <div class="creep-delta">+${money(r.delta)}<small>+${r.pct.toFixed(0)}% per charge</small></div>
      </div>`;
    }).join('');
  }

  /* ── cancel advisor ────────────────────────────────────── */
  function renderAdvisor() {
    const list = document.getElementById('advisorList');
    if (!list) return;

    /* Ranking is verdict first, price second. Ranking by raw cost put the most
       expensive service on top even when it was in active use, while services
       that were genuinely unused sat below it. The verdict already encodes
       usage, idleness and duplication, so it decides the tier; annual cost
       orders within a tier. Kept services sink to the bottom. */
    const TIER = { cancel: 0, review: 1, keep: 2 };
    const ranked = SUBSCRIPTIONS.map(s => {
      const c = classify(s);
      const monthly = monthlyCost(s);
      const kept = isKept(s);
      const tier = kept ? 3 : TIER[c.verdict];
      const score = monthly * 12;
      return { s, c, monthly, score, kept, tier };
    }).sort((a, b) => a.tier - b.tier || b.score - a.score);

    /* Mutually exclusive buckets that together account for all spend. Review
       used to fall in neither, so over half the total was invisible. */
    const bucket = (pred) => ranked.filter(pred).reduce((a, x) => a + x.monthly * 12, 0);
    const cutSum = bucket(x => !x.kept && x.c.verdict === 'cancel');
    const revSum = bucket(x => !x.kept && x.c.verdict === 'review');
    const keepSum = bucket(x => x.kept || x.c.verdict === 'keep');
    document.getElementById('advisorSummary').innerHTML = `
      <div class="asum"><p class="n cut">${money(cutSum, 0)}</p><p class="l">Cut candidates / yr</p></div>
      <div class="asum"><p class="n review">${money(revSum, 0)}</p><p class="l">Worth a look / yr</p></div>
      <div class="asum"><p class="n keep">${money(keepSum, 0)}</p><p class="l">Worth keeping / yr</p></div>`;

    list.innerHTML = ranked.map((x, i) => {
      const cut = isCut(x.s);
      const kept = isKept(x.s);
      const reasons = [];
      if (x.s.usage === 'none') reasons.push(`unused for ${x.s.lastUsed} days`);
      if (x.c.dup) reasons.push('duplicates another service');
      if (x.c.rose) reasons.push(`price up ${x.c.creepPct.toFixed(0)}%`);
      if (x.s.usage === 'heavy') reasons.push('in daily use');
      if (!reasons.length) reasons.push(x.s.note.toLowerCase());
      return `
      <li class="adv-item ${cut ? 'is-cut' : ''}${kept ? ' is-kept' : ''}">
        <span class="adv-rank">${i + 1}</span>
        <div class="adv-nm">${esc(x.s.name)}<small>${esc(x.s.note)}</small>
          <span class="stamp ${x.c.verdict}">${x.c.verdict === 'keep' ? 'Keep' : x.c.verdict === 'review' ? 'Review' : 'Cut'}</span>
        </div>
        <div class="adv-reason">${reasons.join(' · ')}</div>
        <div class="adv-cost">${money(x.monthly * 12, 0)}<small>per year</small></div>
        <div class="adv-act">
          <button class="adv-btn keep${kept ? ' is-on' : ''}" data-keep="${x.s.id}" aria-pressed="${kept}">${kept ? 'Kept' : 'Keep'}</button>
          <button class="adv-btn cut" data-cut="${x.s.id}">${cut ? 'Restore' : 'Cut'}</button>
        </div>
      </li>`;
    }).join('');

    list.querySelectorAll('[data-cut]').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.cut;
      state.kept.delete(id);
      state.cut.has(id) ? state.cut.delete(id) : state.cut.add(id);
      renderAll();
    }));
    list.querySelectorAll('[data-keep]').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.keep;
      state.cut.delete(id);
      state.kept.has(id) ? state.kept.delete(id) : state.kept.add(id);
      renderAll();
    }));
  }

  /* ── add / remove visitor subscriptions ────────────────── */
  function addSub(rec) {
    const s = normalize(rec);
    if (!s) return null;
    s.id = 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    SUBSCRIPTIONS.push(s);
    writeCustom();
    renderAll();
    return s;
  }

  function removeSub(id) {
    const i = SUBSCRIPTIONS.findIndex(s => s.id === id && s.custom);
    if (i === -1) return;
    SUBSCRIPTIONS.splice(i, 1);
    state.cut.delete(id);
    state.kept.delete(id);
    writeCustom();
    renderAll();
  }

  function openAdd() {
    const modal = document.getElementById('addModal');
    const scrim = document.getElementById('addScrim');
    if (!modal) return;
    const form = document.getElementById('addForm');
    form.reset();
    document.querySelectorAll('#addForm .is-bad').forEach(el => el.classList.remove('is-bad'));
    document.querySelectorAll('#addForm .field-err').forEach(el => { el.hidden = true; });
    // Default the charge date to one month out - the common case. Built from
    // local parts because toISOString() would shift the day in any timezone
    // ahead of UTC.
    const d = new Date(TODAY);
    d.setMonth(d.getMonth() + 1);
    const pad = (n) => String(n).padStart(2, '0');
    document.getElementById('fDay').value =
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    modal.hidden = false;
    scrim.hidden = false;
    document.body.classList.add('is-locked');
    document.getElementById('addSubBtn')?.classList.add('is-on');
    setTimeout(() => document.getElementById('fName')?.focus(), 30);
  }

  function closeAdd() {
    const modal = document.getElementById('addModal');
    if (!modal) return;
    modal.hidden = true;
    document.getElementById('addScrim').hidden = true;
    document.body.classList.remove('is-locked');
    document.getElementById('addSubBtn')?.classList.remove('is-on');
    document.getElementById('addSubBtn')?.focus();
  }

  /* Returns a record, or null after flagging the offending fields. */
  function readAddForm() {
    const nameEl = document.getElementById('fName');
    const priceEl = document.getElementById('fPrice');
    const dayEl = document.getElementById('fDay');
    const name = nameEl.value.trim();
    const price = Number(priceEl.value);
    const dayVal = dayEl.value;

    const bad = (el, errId, isBad) => {
      el.classList.toggle('is-bad', isBad);
      const e = document.getElementById(errId);
      if (e) e.hidden = !isBad;
      return isBad;
    };
    const nameBad = bad(nameEl, 'errName', !name);
    const priceBad = bad(priceEl, 'errPrice', !isFinite(price) || price <= 0);
    let day = 1;
    const dayBad = bad(dayEl, 'errDay', !dayVal);
    if (!dayBad) {
      const picked = new Date(dayVal + 'T00:00:00');
      if (isNaN(picked.getTime())) {
        bad(dayEl, 'errDay', true);
        return null;
      }
      day = picked.getDate();
    }
    if (nameBad || priceBad || dayBad) {
      [nameEl, priceEl, dayEl].find(el => el.classList.contains('is-bad'))?.focus();
      return null;
    }
    return {
      name,
      price: Math.round(price * 100) / 100,
      cycle: document.getElementById('fCycle').value,
      cat: document.getElementById('fCat').value,
      day,
      usage: document.getElementById('fUse').value,
    };
  }

  function initAdd() {
    const btn = document.getElementById('addSubBtn');
    const form = document.getElementById('addForm');
    if (!btn || !form) return;
    btn.addEventListener('click', openAdd);
    document.getElementById('addClose').addEventListener('click', closeAdd);
    document.getElementById('addCancel').addEventListener('click', closeAdd);
    document.getElementById('addScrim').addEventListener('click', closeAdd);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !document.getElementById('addModal').hidden) closeAdd();
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const rec = readAddForm();
      if (!rec) return;
      const s = addSub(rec);
      closeAdd();
      if (s) {
        // The new card may sort below the fold; show the board and flag it.
        document.querySelector('[data-tab=subs]')?.click();
        const grid = document.getElementById('subGrid');
        const card = grid?.querySelector(`[data-id="${s.id}"]`);
        if (card) {
          card.scrollIntoView({ block: 'center' });
          card.classList.add('is-flash');
          setTimeout(() => card.classList.remove('is-flash'), 1600);
        }
      }
    });
  }

  /* ── master render ─────────────────────────────────────── */
  function renderAll() {
    renderKPIs();
    renderSubs();
    renderUpcoming();
    renderCreep();
    renderAdvisor();
  }

  /* ── wiring ────────────────────────────────────────────── */
  function init() {
    // tabs
    document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(x => { x.classList.remove('is-active'); x.setAttribute('aria-selected', 'false'); });
      t.classList.add('is-active'); t.setAttribute('aria-selected', 'true');
      document.querySelectorAll('.panel').forEach(p => p.classList.toggle('is-active', p.dataset.panel === t.dataset.tab));
      // Panels differ a lot in height, so keeping the old scroll offset can hide
      // the swap above the fold. Pull the tab bar back into view when it isn't.
      const bar = document.querySelector('.board-bar');
      const navH = document.getElementById('nav')?.offsetHeight || 0;
      if (bar && bar.getBoundingClientRect().top < navH) bar.scrollIntoView({ block: 'start' });
    }));

    // filters
    document.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(x => x.classList.remove('is-active'));
      c.classList.add('is-active');
      state.filter = c.dataset.filter;
      renderSubs();
    }));

    // annual toggle
    const av = document.getElementById('annualView');
    if (av) av.addEventListener('change', () => { state.annual = av.checked; renderSubs(); });

    // reset
    const rb = document.getElementById('resetBoard');
    if (rb) rb.addEventListener('click', () => {
      state.cut.clear();
      state.kept.clear();
      state.calSel = null;
      state.filter = 'all';
      document.querySelectorAll('.chip').forEach(x => x.classList.toggle('is-active', x.dataset.filter === 'all'));
      renderAll();
      // The numbers live at the top of the board, so scroll them into view and
      // flag the strip: otherwise the reset edits state entirely off-screen.
      const strip = document.querySelector('.kpi-strip');
      if (strip) {
        strip.scrollIntoView({ block: 'center' });
        strip.classList.add('is-flash');
        setTimeout(() => strip.classList.remove('is-flash'), 1400);
      }
    });

    // pricing billing toggle
    document.querySelectorAll('.bt-opt').forEach(b => b.addEventListener('click', () => {
      document.querySelectorAll('.bt-opt').forEach(x => x.classList.remove('is-active'));
      b.classList.add('is-active');
      const annual = b.dataset.cycle === 'annual';
      document.querySelectorAll('.price-card').forEach(card => {
        const amt = card.querySelector('.amt');
        const per = card.querySelector('.per');
        if (!amt) return;
        const val = annual ? amt.dataset.annual : amt.dataset.monthly;
        if (val === '0') { amt.textContent = '$0'; per.textContent = 'forever'; return; }
        amt.textContent = '$' + val;
        per.textContent = annual ? '/year' : '/month';
      });
      if (typeof syncCtas === 'function') syncCtas();
    }));

    // nav burger
    const burger = document.querySelector('.nav-burger');
    const nav = document.getElementById('nav');
    if (burger) burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

    // sticky nav shadow
    window.addEventListener('scroll', () => {
      nav.classList.toggle('is-stuck', window.scrollY > 24);
    }, { passive: true });

    // reveal on scroll
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // crep bars animate in
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io2.unobserve(e.target); } });
    }, { threshold: 0.2 });
    document.querySelectorAll('.creep-row').forEach(el => io2.observe(el));

    hydrate();
    renderTxns();
    renderAll();
    syncCtas();
    initAdd();
    initFinaleForm();
  }

  /* ── newsletter form ───────────────────────────────────────── */
  function initFinaleForm() {
    const form = document.getElementById('finaleForm');
    if (!form) return;
    const input = document.getElementById('finaleEmail');
    const status = document.getElementById('finaleStatus');
    const btn = form.querySelector('button[type=submit]');
    const label = btn ? btn.innerHTML : '';

    const say = (msg, kind) => {
      if (!status) return;
      status.textContent = msg;
      status.className = 'finale-status' + (kind ? ' ' + kind : '');
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = (input.value || '').trim();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        say('That address looks incomplete - check it and try again.', 'err');
        input.focus();
        return;
      }

      if (!FORM_ENDPOINT) {
        say('Form not connected yet - add your Formspree endpoint in app.js.', 'err');
        return;
      }

      if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
      say('');

      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form),
        });
        if (res.ok) {
          form.reset();
          say("You're on the list. Check your inbox for a confirmation.", 'ok');
          if (btn) btn.textContent = 'You\u2019re in';
        } else {
          const data = await res.json().catch(() => ({}));
          const detail = data.errors && data.errors.length
            ? data.errors.map(x => x.message).join(' ') : '';
          say(detail || 'That did not go through. Please try again.', 'err');
          if (btn) { btn.disabled = false; btn.innerHTML = label; }
        }
      } catch (err) {
        say('Network error - check your connection and try again.', 'err');
        if (btn) { btn.disabled = false; btn.innerHTML = label; }
      }
    });
  }

  /* ── Stripe CTA wiring ───────────────────────────────────────── */
  const ctaLinks = () => document.querySelectorAll('a[data-plan]');

  function syncCtas() {
    const cycle = document.querySelector('.bt-opt.is-active')?.dataset.cycle || 'monthly';
    const live = checkoutIsLive();
    ctaLinks().forEach(a => {
      if (!live) {
        // Nothing to sell yet. A test-mode link looks like a real checkout but
        // takes no money, so send people to the waitlist instead of a dead end.
        a.href = '#finale';
        a.removeAttribute('target');
        a.removeAttribute('rel');
        if (!a.dataset.label) a.dataset.label = a.innerHTML;
        a.innerHTML = 'Join the waitlist<span class="dot"></span>';
        return;
      }
      const link = STRIPE_LINKS[`${a.dataset.plan}|${cycle}`];
      if (!link) return;
      if (a.dataset.label) a.innerHTML = a.dataset.label;
      a.href = link;
      a.target = '_blank';
      a.rel = 'noopener';
    });
    // "Card required" is a promise we cannot keep before launch.
    document.querySelectorAll('.price-fine').forEach(el => {
      el.innerHTML = live
        ? '14 days free &middot; Card required &middot; Cancel anytime.'
        : 'Not on sale yet &middot; Join the waitlist for early access.';
    });
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
