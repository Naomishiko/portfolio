/* Arclane — static dashboard.
   Same model as server.js, run in the browser and persisted to localStorage
   so the demo is fully clickable without a backend. */

const NEGLECT_HOURS = 24;
const STORE_KEY = "arclane.static.v1";

// Ages are relative so the demo always looks current.
const SEED = [
  { id: "INQ-1041", customer: "Marcus Webb", company: "Webb Roofing", channel: "web form", service: "Roof inspection + repair quote", value: 4800, receivedAgo: 52, status: "new", respondedAgo: null, lastAgo: 52, followUps: 0, owner: "Unassigned" },
  { id: "INQ-1040", customer: "Priya Nair", company: "Spotless Co.", channel: "email", service: "Weekly office cleaning", value: 1450, receivedAgo: 30, status: "new", respondedAgo: null, lastAgo: 30, followUps: 0, owner: "Unassigned" },
  { id: "INQ-1039", customer: "Dana Okafor", company: "Okafor Consulting", channel: "phone", service: "Discovery call", value: 6000, receivedAgo: 9, status: "new", respondedAgo: null, lastAgo: 9, followUps: 0, owner: "Unassigned" },
  { id: "INQ-1038", customer: "Liam Foster", company: "Foster & Daughters Salon", channel: "Instagram", service: "Bridal party booking", value: 900, receivedAgo: 70, status: "contacted", respondedAgo: 48, lastAgo: 48, followUps: 1, owner: "Rosa" },
  { id: "INQ-1037", customer: "Grace Lindqvist", company: "Northside Dental", channel: "web form", service: "Quarterly compliance audit", value: 12000, receivedAgo: 120, status: "quoted", respondedAgo: 100, lastAgo: 96, followUps: 2, owner: "Tomas" },
  { id: "INQ-1036", customer: "Owen Barrett", company: "Barrett Landscaping", channel: "text", service: "Spring cleanup", value: 650, receivedAgo: 4, status: "new", respondedAgo: null, lastAgo: 4, followUps: 0, owner: "Unassigned" },
  { id: "INQ-1035", customer: "Sofia Marchetti", company: "Marchetti Interiors", channel: "email", service: "Full apartment refresh", value: 9800, receivedAgo: 200, status: "contacted", respondedAgo: 190, lastAgo: 180, followUps: 1, owner: "Rosa" },
  { id: "INQ-1034", customer: "Henry Cole", company: "Cole Plumbing", channel: "Google Business", service: "Emergency callout", value: 400, receivedAgo: 2, status: "won", respondedAgo: 1.5, lastAgo: 1, followUps: 1, owner: "Tomas" },
  { id: "INQ-1033", customer: "Aisha Rahman", company: "Rahman Legal", channel: "phone", service: "Website redesign", value: 7200, receivedAgo: 300, status: "lost", respondedAgo: 240, lastAgo: 220, followUps: 0, owner: "Unassigned" },
  { id: "INQ-1032", customer: "Noah Petrov", company: "Petrov Fitness", channel: "web form", service: "Member app build", value: 15000, receivedAgo: 14, status: "new", respondedAgo: null, lastAgo: 14, followUps: 0, owner: "Unassigned" },
];

const iso = (agoHours) => (agoHours === null ? null : new Date(Date.now() - agoHours * 36e5).toISOString());
const hoursSince = (t) => (Date.now() - new Date(t).getTime()) / 36e5;

function materialize(row) {
  return {
    id: row.id, customer: row.customer, company: row.company, channel: row.channel,
    service: row.service, value: row.value, status: row.status,
    receivedAt: row.receivedAt || iso(row.receivedAgo),
    firstRespondedAt: row.firstRespondedAt !== undefined ? row.firstRespondedAt : iso(row.respondedAgo),
    lastActivityAt: row.lastActivityAt || iso(row.lastAgo),
    followUps: row.followUps || 0, owner: row.owner || "Unassigned",
  };
}

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw).inquiries;
  } catch (e) { /* fall through to seed */ }
  return SEED.map(materialize);
}

function save(inquiries) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify({ inquiries, savedAt: new Date().toISOString() })); }
  catch (e) { /* storage unavailable — demo still works in memory */ }
}

function decorate(inq) {
  const ageHours = hoursSince(inq.receivedAt);
  const awaitingResponse = !inq.firstRespondedAt;
  const sinceLastContact = hoursSince(inq.lastActivityAt);
  const open = inq.status === "new" || inq.status === "contacted" || inq.status === "quoted";
  const neglected = open && ((awaitingResponse && ageHours > NEGLECT_HOURS) ||
    (!awaitingResponse && sinceLastContact > NEGLECT_HOURS * 2));
  const atRisk = neglected ? inq.value : 0;

  let priority = "normal";
  if (neglected && inq.value >= 5000) priority = "critical";
  else if (neglected) priority = "high";
  else if (open && awaitingResponse && ageHours > NEGLECT_HOURS / 2) priority = "high";

  let nextAction;
  if (!open) nextAction = inq.status === "won" ? "Closed — won" : "Closed — lost";
  else if (awaitingResponse) nextAction = `Reply now — waiting ${Math.round(ageHours)}h`;
  else if (sinceLastContact > NEGLECT_HOURS) nextAction = `Follow up — quiet ${Math.round(sinceLastContact)}h`;
  else nextAction = "On track";

  return { ...inq, ageHours: Math.round(ageHours * 10) / 10, sinceLastContact: Math.round(sinceLastContact * 10) / 10, neglected, atRisk, priority, nextAction, open };
}

function summarize(inquiries) {
  const d = inquiries.map(decorate);
  const open = d.filter((x) => x.open);
  const neglected = d.filter((x) => x.neglected);
  const responded = d.filter((x) => x.firstRespondedAt);
  const closed = d.filter((x) => x.status === "won" || x.status === "lost");
  const won = d.filter((x) => x.status === "won");
  const avgResponse = responded.length
    ? responded.reduce((s, x) => s + (hoursSince(x.receivedAt) - hoursSince(x.firstRespondedAt)), 0) / responded.length
    : 0;
  return {
    total: d.length, open: open.length, neglected: neglected.length,
    revenueAtRisk: neglected.reduce((s, x) => s + x.value, 0),
    openValue: open.reduce((s, x) => s + x.value, 0),
    recoveredValue: won.reduce((s, x) => s + x.value, 0),
    wonCount: won.length,
    winRate: closed.length ? Math.round((won.length / closed.length) * 100) : 0,
    avgResponseHours: Math.round(avgResponse * 10) / 10,
    neglectHours: NEGLECT_HOURS,
  };
}

function applyAction(inq, action, owner) {
  const now = new Date().toISOString();
  if (action === "respond") {
    if (!inq.firstRespondedAt) inq.firstRespondedAt = now;
    if (inq.status === "new") inq.status = "contacted";
    inq.lastActivityAt = now;
    if (inq.owner === "Unassigned") inq.owner = owner || "You";
  } else if (action === "followup") {
    inq.followUps = (inq.followUps || 0) + 1;
    inq.lastActivityAt = now;
    if (inq.status === "new") inq.status = "contacted";
  } else if (action === "quote") {
    inq.status = "quoted"; inq.lastActivityAt = now;
  } else if (action === "won" || action === "lost") {
    inq.status = action; inq.lastActivityAt = now;
  } else if (action === "snooze") {
    inq.lastActivityAt = now;
  }
  return inq;
}

/* ---------------- UI ---------------- */
const fmt = (n) => "$" + Math.round(n).toLocaleString();
let state = { filter: "all", q: "", inquiries: load() };

function pillFor(x) {
  if (x.status === "won") return '<span class="pill pill--green">Won</span>';
  if (x.status === "lost") return '<span class="pill pill--grey">Lost</span>';
  if (x.neglected) return '<span class="pill pill--red">Neglected</span>';
  if (x.priority === "high") return '<span class="pill pill--amber">Urgent</span>';
  return '<span class="pill pill--blue">On Track</span>';
}

function visible() {
  let items = state.inquiries.map(decorate);
  if (state.filter === "neglected") items = items.filter((x) => x.neglected);
  else if (state.filter !== "all") items = items.filter((x) => x.status === state.filter);
  if (state.q) {
    const q = state.q.toLowerCase();
    items = items.filter((x) => (x.customer + " " + x.company + " " + x.service).toLowerCase().includes(q));
  }
  items.sort((a, b) => b.atRisk - a.atRisk || b.ageHours - a.ageHours);
  return items;
}

function render() {
  const s = summarize(state.inquiries);
  document.getElementById("kpis").innerHTML = `
    <div class="kpi kpi--risk">
      <div class="kpi__label">Revenue at risk</div>
      <div class="kpi__value">${fmt(s.revenueAtRisk)}</div>
      <div class="kpi__sub">${s.neglected} neglected of ${s.open} open</div>
    </div>
    <div class="kpi">
      <div class="kpi__label">Open pipeline</div>
      <div class="kpi__value">${fmt(s.openValue)}</div>
      <div class="kpi__sub">${s.open} live inquiries</div>
    </div>
    <div class="kpi">
      <div class="kpi__label">Recovered</div>
      <div class="kpi__value">${fmt(s.recoveredValue)}</div>
      <div class="kpi__sub">${s.wonCount} won · ${s.winRate}% win rate</div>
    </div>
    <div class="kpi">
      <div class="kpi__label">Avg response</div>
      <div class="kpi__value">${s.avgResponseHours}h</div>
      <div class="kpi__sub">Target ${s.neglectHours}h</div>
    </div>`;

  const banner = document.getElementById("banner");
  if (s.neglected > 0) {
    banner.hidden = false;
    document.getElementById("bannerText").innerHTML =
      `<strong>${s.neglected} INQUIRIES UNANSWERED</strong> — worth ${fmt(s.revenueAtRisk)} in potential revenue. Start with the oldest.`;
  } else {
    banner.hidden = true;
  }

  const rows = visible();
  const el = document.getElementById("table");
  if (!rows.length) {
    el.innerHTML = '<div class="empty">Nothing here — every inquiry is on track</div>';
    return;
  }
  el.innerHTML = '<div class="trow trow--head"><div>Customer</div><div>Service</div><div>Value</div><div>Status</div><div>Next action</div><div></div></div>'
    + rows.map(rowHtml).join("");
}

function rowHtml(x) {
  const actions = [];
  if (x.status === "new" && !x.firstRespondedAt) actions.push(`<button class="icon-btn icon-btn--primary" data-act="respond" data-id="${x.id}">Reply</button>`);
  if (x.open) {
    actions.push(`<button class="icon-btn" data-act="followup" data-id="${x.id}">Follow Up</button>`);
    if (x.status === "contacted") actions.push(`<button class="icon-btn" data-act="quote" data-id="${x.id}">Quoted</button>`);
    actions.push(`<button class="icon-btn" data-act="won" data-id="${x.id}">Won</button>`);
    actions.push(`<button class="icon-btn" data-act="lost" data-id="${x.id}">Lost</button>`);
  }
  return `
    <div class="trow ${x.neglected ? "trow--neglected" : ""}">
      <div class="who">${x.customer}<small>${x.company || "—"} · ${x.channel}${x.owner && x.owner !== "Unassigned" ? " · " + x.owner : ""}</small></div>
      <div>${x.service}<div class="cell-sub">${Math.round(x.ageHours)}h old · ${x.followUps} follow-up${x.followUps === 1 ? "" : "s"}</div></div>
      <div class="money-val ${x.neglected ? "risk" : ""}">${fmt(x.value)}</div>
      <div>${pillFor(x)}</div>
      <div class="cell-sub" style="margin-top:0">${x.nextAction}</div>
      <div class="actions">${actions.join("")}</div>
    </div>`;
}

function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("is-on");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("is-on"), 2200);
}

document.getElementById("tabs").addEventListener("click", (e) => {
  const b = e.target.closest(".tab");
  if (!b) return;
  state.filter = b.dataset.filter;
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("is-active", t.dataset.filter === state.filter));
  render();
});

document.getElementById("search").addEventListener("input", (e) => {
  state.q = e.target.value.trim();
  render();
});

document.getElementById("table").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-act]");
  if (!b) return;
  const inq = state.inquiries.find((x) => x.id === b.dataset.id);
  if (!inq) return;
  applyAction(inq, b.dataset.act, "You");
  save(state.inquiries);
  const labels = { respond: "Reply logged", followup: "Follow-up sent", quote: "Marked as quoted", won: "Marked as won", lost: "Marked as lost" };
  toast(labels[b.dataset.act] || "Updated");
  render();
});

document.getElementById("reset").addEventListener("click", () => {
  state.inquiries = SEED.map(materialize);
  save(state.inquiries);
  toast("Demo data reset");
  render();
});

render();
