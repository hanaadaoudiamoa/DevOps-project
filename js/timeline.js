/* ==========================================================================
   timeline.js
   Visual "course journey" components:
     - vertical timeline for the home dashboard
     - a Part-level dependency graph ("Course Map")
     - the interactive IaaS/PaaS/SaaS layer stack widget (Part 3)
     - a static before/after comparison widget (Part 1)
   ========================================================================== */

(function (global) {
  const PARTS = global.COURSE_DATA.parts;

  function statusFor(part, currentPartNumber, isPartDone) {
    if (isPartDone) return "done";
    if (part.number === currentPartNumber) return "current";
    return "available";
  }

  const checkIcon = '<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // ---- Home dashboard vertical timeline -------------------------------------
  function renderJourneyTimeline(currentPartNumber, isPartDoneFn) {
    const nodes = PARTS.map((part) => {
      const done = isPartDoneFn(part);
      const status = statusFor(part, currentPartNumber, done);
      const dot = status === "done" ? checkIcon : part.number;
      return `
        <div class="timeline-node ${status}">
          <div class="timeline-dot">${status === "done" ? checkIcon : `<span>${part.number}</span>`}</div>
          <button class="timeline-card" data-goto-part="${part.number}">
            <div class="timeline-card-title">Part ${part.number} — ${MD.escapeHtml(part.title)}</div>
            <div class="timeline-card-q">${MD.escapeHtml(part.coreQuestion)}</div>
          </button>
        </div>`;
    }).join("");
    return `<div class="timeline-vert">${nodes}</div>`;
  }

  // ---- Course Map: dependency graph ------------------------------------------
  // Manually laid out DAG mirroring course_architecture.md §5.
  const EDGES = [
    [1, 2], [1, 3], [1, 7], [1, 8],
    [2, 6],
    [3, 4], [3, 6],
    [4, 5], [4, 7],
    [5, 7],
    [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8],
  ];
  // simple manual grid coordinates (x,y) per part for a readable layout
  const POS = {
    1: { x: 60, y: 60 }, 2: { x: 300, y: 40 }, 3: { x: 300, y: 160 },
    4: { x: 560, y: 160 }, 5: { x: 800, y: 160 }, 6: { x: 300, y: 280 },
    7: { x: 800, y: 280 }, 8: { x: 1040, y: 160 },
  };
  const NODE_W = 190, NODE_H = 64;

  function renderConceptMap(currentPartNumber, isPartDoneFn) {
    const primaryEdges = new Set(["1-2", "1-3", "2-6", "3-4", "3-6", "4-5", "4-7", "5-7"]);
    let edgesSvg = "";
    for (const [a, b] of EDGES) {
      const key = `${a}-${b}`;
      if (!primaryEdges.has(key) && b !== 8) continue; // keep graph readable: show core deps + everything->8
      const pa = POS[a], pb = POS[b];
      const x1 = pa.x + NODE_W, y1 = pa.y + NODE_H / 2;
      const x2 = pb.x, y2 = pb.y + NODE_H / 2;
      const mx = (x1 + x2) / 2;
      edgesSvg += `<path class="map-edge" d="M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}"/>`;
    }

    let nodesSvg = "";
    for (const part of PARTS) {
      const pos = POS[part.number];
      const done = isPartDoneFn(part);
      const status = statusFor(part, currentPartNumber, done);
      nodesSvg += `
        <g class="map-node ${status}" data-goto-part="${part.number}" transform="translate(${pos.x},${pos.y})">
          <rect width="${NODE_W}" height="${NODE_H}" rx="10"></rect>
          <text class="map-title" x="14" y="26" font-size="13.5">Part ${part.number}</text>
          <text class="map-sub" x="14" y="46" font-size="11.5">${MD.escapeHtml(truncate(part.title, 26))}</text>
        </g>`;
    }

    return `
      <div class="map-svg-wrap">
        <svg viewBox="0 0 1250 380" width="100%" style="min-width:900px;">
          <defs>
            <marker id="map-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--border-strong)"/>
            </marker>
          </defs>
          ${edgesSvg}
          ${nodesSvg}
        </svg>
      </div>
      <p style="color:var(--text-muted);font-size:13.5px;margin-top:var(--sp-4);">
        Arrows show recommended prerequisites — for example, Part 5's security boundaries only make sense once you know the IaaS/PaaS/SaaS stack from Part 3.
        Every Part is still self-contained, so you're free to jump anywhere; this map is a guide, not a lock.
      </p>`;
  }

  function truncate(s, n) {
    return s.length > n ? s.slice(0, n - 1) + "…" : s;
  }

  // ---- IaaS/PaaS/SaaS interactive layer widget --------------------------------
  const STACK_LAYERS = [
    {
      key: "saas", label: "SaaS", sub: "Software as a Service",
      contains: "Complete, ready-to-use applications delivered over the network.",
      providerManages: "Everything: infrastructure, platform, and the application itself.",
      customerManages: "Only usage and light configuration (users, settings, data).",
      examples: "Webmail, CRM suites, office productivity apps.",
    },
    {
      key: "paas", label: "PaaS", sub: "Platform as a Service",
      contains: "A ready-to-use platform — operating system, runtime, and development tools.",
      providerManages: "Infrastructure and the platform (OS, runtime, middleware).",
      customerManages: "The applications they build and deploy on top of the platform.",
      examples: "Managed application platforms and database platforms developers deploy code to.",
    },
    {
      key: "iaas", label: "IaaS", sub: "Infrastructure as a Service",
      contains: "Raw computing building blocks — virtual machines, storage, and networking.",
      providerManages: "The physical infrastructure and the virtualization layer.",
      customerManages: "The operating system, runtime, and all applications on top of it.",
      examples: "Virtual machines, block storage, and virtual networks rented by the hour.",
    },
    {
      key: "infra", label: "Infrastructure", sub: "Physical layer",
      contains: "The physical data center: servers, storage arrays, network gear, power, and cooling.",
      providerManages: "Everything — this layer is never exposed directly to any cloud customer.",
      customerManages: "Nothing at this layer under any service model.",
      examples: "Racks of physical servers, storage systems, and network switches.",
    },
  ];

  function renderStackWidget() {
    const layers = STACK_LAYERS.map((l, i) => `
      <button class="stack-layer ${i === 0 ? "active" : ""}" data-stack-layer="${l.key}">
        ${l.label}<span class="layer-sub">${l.sub}</span>
      </button>`).join("");
    return `
      <div class="stack-widget" data-stack-widget>
        <div class="stack-layers">${layers}</div>
        <div class="stack-detail" data-stack-detail>${renderStackDetail(STACK_LAYERS[0])}</div>
      </div>
      <p style="color:var(--text-muted);font-size:13px;margin-top:-var(--sp-2);">Click a layer to see what it contains and who manages what.</p>`;
  }

  function renderStackDetail(l) {
    return `
      <h4>${l.label} — ${l.sub}</h4>
      <div class="stack-detail-row"><div class="stack-detail-label">What it contains</div><div class="stack-detail-val">${l.contains}</div></div>
      <div class="stack-detail-row"><div class="stack-detail-label">Provider manages</div><div class="stack-detail-val">${l.providerManages}</div></div>
      <div class="stack-detail-row"><div class="stack-detail-label">Customer manages</div><div class="stack-detail-val">${l.customerManages}</div></div>
      <div class="stack-detail-row"><div class="stack-detail-label">Examples</div><div class="stack-detail-val">${l.examples}</div></div>`;
  }

  function handleStackLayerClick(btn) {
    const widget = btn.closest("[data-stack-widget]");
    widget.querySelectorAll(".stack-layer").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const key = btn.getAttribute("data-stack-layer");
    const layer = STACK_LAYERS.find((l) => l.key === key);
    widget.querySelector("[data-stack-detail]").innerHTML = renderStackDetail(layer);
  }

  // ---- Before / After: traditional IT vs. cloud -------------------------------
  function renderBeforeAfter() {
    return `
      <div class="before-after">
        <div class="ba-panel ba-before">
          <h5>Traditional IT</h5>
          <ul>
            <li>Large upfront capital expense to buy servers before you know demand</li>
            <li>Provisioning new capacity takes days or weeks of manual work</li>
            <li>You pay for peak capacity all the time, even when idle</li>
            <li>Scaling means physically installing more hardware</li>
            <li>Access is largely limited to the local network or VPN</li>
          </ul>
        </div>
        <div class="ba-panel ba-after">
          <h5>Cloud Computing</h5>
          <ul>
            <li>No upfront hardware purchase — pay only for what you use</li>
            <li>Self-service provisioning in minutes, without a human in the loop</li>
            <li>Costs track actual, measured usage</li>
            <li>Capacity expands or contracts elastically as demand changes</li>
            <li>Broad network access from any internet-connected device</li>
          </ul>
        </div>
      </div>`;
  }

  global.Timeline = {
    renderJourneyTimeline,
    renderConceptMap,
    renderStackWidget,
    handleStackLayerClick,
    renderBeforeAfter,
  };
})(window);
