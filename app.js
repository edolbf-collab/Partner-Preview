(function () {
  "use strict";

  const app = document.getElementById("app");
  const roleButtons = [...document.querySelectorAll(".role-chip")];
  const reservationDialog = document.getElementById("reservationDialog");
  const reservationTitle = document.getElementById("reservationTitle");
  const reservationSummary = document.getElementById("reservationSummary");
  const reservationForm = document.getElementById("reservationForm");
  const infoDialog = document.getElementById("infoDialog");
  const actionDialog = document.getElementById("actionDialog");
  const actionEyebrow = document.getElementById("actionEyebrow");
  const actionTitle = document.getElementById("actionTitle");
  const actionBody = document.getElementById("actionBody");
  const toast = document.getElementById("toast");

  const state = {
    role: "user",
    search: "",
    partnerDay: 6,
    selectedReservation: null,
    reservations: [
      {
        id: "R-0007",
        venueId: "arena-central",
        venue: "Arena Central",
        date: "06/08",
        time: "20:00",
        statusKey: "pending",
        status: "Reserva pendente",
        endpoint: "reservation.created"
      }
    ],
    partners: [
      { id: 1, name: "Arena Central", city: "Curitiba", spaces: 3, status: "Aprovado", rating: 4.8, color: "" },
      { id: 2, name: "Cancha Horizonte", city: "São José dos Pinhais", spaces: 2, status: "Em análise", rating: 4.6, color: "alt" },
      { id: 3, name: "Complexo Vale Verde", city: "Colombo", spaces: 4, status: "Pendente", rating: 4.7, color: "warm" }
    ]
  };

  const venues = [
    {
      id: "arena-central",
      name: "Arena Central",
      city: "Curitiba",
      distance: "2,4 km",
      rating: 4.8,
      reviews: 126,
      sports: ["Futsal", "Society"],
      price: 120,
      color: "",
      slots: ["18:00", "19:00", "20:00", "21:00"],
      unavailable: ["19:00"]
    },
    {
      id: "cancha-horizonte",
      name: "Cancha Horizonte",
      city: "São José dos Pinhais",
      distance: "8,1 km",
      rating: 4.6,
      reviews: 74,
      sports: ["Society"],
      price: 105,
      color: "alt",
      slots: ["17:30", "19:00", "20:30", "22:00"],
      unavailable: ["20:30"]
    },
    {
      id: "vale-verde",
      name: "Complexo Vale Verde",
      city: "Colombo",
      distance: "11,7 km",
      rating: 4.7,
      reviews: 91,
      sports: ["Futsal", "Campo"],
      price: 95,
      color: "warm",
      slots: ["18:00", "19:30", "21:00"],
      unavailable: []
    }
  ];

  const partnerDays = [
    ["SEG", 3], ["TER", 4], ["QUA", 5], ["QUI", 6], ["SEX", 7], ["SÁB", 8], ["DOM", 9]
  ];

  const reservationStatuses = Object.freeze({
    pending: { label: "Reserva pendente", statusClass: "status-warning", slotClass: "reservation-pending" },
    confirmed: { label: "Confirmada pelo pagamento", statusClass: "status-ok", slotClass: "reservation-confirmed" },
    cancelled: { label: "Cancelada", statusClass: "status-danger", slotClass: "reservation-cancelled" }
  });

  function getReservationStatus(reservation) {
    return reservationStatuses[reservation?.statusKey] || reservationStatuses.pending;
  }

  function getReservationForSlot(venueId, time) {
    return state.reservations.find((reservation) =>
      reservation.venueId === venueId && reservation.time === time && reservation.date === "06/08"
    );
  }

  function applyReservationEndpoint(reservationId, endpoint) {
    const reservation = state.reservations.find((item) => item.id === reservationId);
    if (!reservation) return;

    const endpointMap = {
      "payment.confirmed": { statusKey: "confirmed", status: "Confirmada pelo pagamento" },
      "reservation.cancelled": { statusKey: "cancelled", status: "Cancelada" }
    };
    const next = endpointMap[endpoint];
    if (!next) return;

    Object.assign(reservation, next, { endpoint });
    render();
    showToast(`${reservation.id}: ${next.status}.`);
  }

  function money(value) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
  }

  function escapeCsv(value) {
    const text = String(value ?? "");
    return `"${text.replaceAll('"', '""')}"`;
  }

  function nextReservationId() {
    const highest = state.reservations.reduce((max, reservation) => {
      const number = Number.parseInt(String(reservation.id).replace(/\D/g, ""), 10);
      return Number.isFinite(number) ? Math.max(max, number) : max;
    }, 0);
    return `R-${String(highest + 1).padStart(4, "0")}`;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function showAction({ eyebrow = "Ação provisória", title, body }) {
    actionEyebrow.textContent = eyebrow;
    actionTitle.textContent = title;
    actionBody.innerHTML = body;
    actionDialog.showModal();
  }

  function setRole(role) {
    state.role = role;
    roleButtons.forEach((button) => button.classList.toggle("active", button.dataset.role === role));
    render();
    app.focus({ preventScroll: true });
  }

  function openReservation(venueId, time) {
    const venue = venues.find((item) => item.id === venueId);
    if (!venue) return;

    const existingReservation = getReservationForSlot(venueId, time);
    if (existingReservation) {
      const status = getReservationStatus(existingReservation);
      showAction({
        eyebrow: "Status do horário",
        title: `${venue.name} · ${time}`,
        body: `<div class="summary-card action-summary"><strong>${status.label}</strong><div class="meta-row" style="margin-top:8px"><span>Reserva ${existingReservation.id}</span><span>Endpoint: ${existingReservation.endpoint}</span></div></div><p class="muted-copy">A cor deste horário acompanha o estado da reserva. Na integração real, a alteração será aplicada pelo endpoint ou webhook correspondente.</p>`
      });
      return;
    }

    if (venue.unavailable.includes(time)) {
      showAction({
        eyebrow: "Horário indisponível",
        title: `${venue.name} · ${time}`,
        body: `<p>Este horário está ocupado no conjunto de dados fictícios.</p><p class="muted-copy">O botão permanece ativo para validar o retorno visual. A lista de espera e os alertas de disponibilidade serão conectados em uma etapa posterior.</p>`
      });
      return;
    }

    state.selectedReservation = { venue, time };
    reservationTitle.textContent = `${venue.name} · ${time}`;
    reservationSummary.innerHTML = `
      <strong>${venue.name}</strong>
      <div class="meta-row" style="margin-top:7px">
        <span>Quarta-feira · 06/08/2026</span>
        <span>${time} às ${Number.parseInt(time, 10) + 1}:00</span>
        <span>${money(venue.price)}</span>
      </div>`;
    reservationDialog.showModal();
  }

  function showVenueDetails(venueId) {
    const venue = venues.find((item) => item.id === venueId);
    if (!venue) return;
    showAction({
      eyebrow: "Espaço selecionado",
      title: venue.name,
      body: `
        <div class="summary-card action-summary">
          <strong>${venue.city} · ${venue.distance}</strong>
          <div class="meta-row" style="margin-top:8px">
            <span>${venue.sports.join(" · ")}</span>
            <span>★ ${venue.rating} · ${venue.reviews} avaliações</span>
            <span>${money(venue.price)} por hora</span>
          </div>
        </div>
        <p>Tipos identificados pelo parceiro: ${venue.sports.join(" · ")}.</p>
        <p class="muted-copy">Esses tipos não funcionam como filtro nesta área. Futuramente, o esporte será definido na criação do grupo e somente parceiros compatíveis serão apresentados.</p>`
    });
  }

  function showPartnerDetails(partnerId) {
    const partner = state.partners.find((item) => String(item.id) === String(partnerId));
    if (!partner) return;
    showAction({
      eyebrow: "Análise de parceiro",
      title: partner.name,
      body: `
        <div class="summary-card action-summary">
          <strong>${partner.city}</strong>
          <div class="meta-row" style="margin-top:8px">
            <span>${partner.spaces} espaços</span>
            <span>★ ${partner.rating}</span>
            <span>Status: ${partner.status}</span>
          </div>
        </div>
        <p>O acesso ao dossiê foi ativado em modo provisório.</p>
        <p class="muted-copy">Documentos, responsável, dados bancários, histórico e checklist de homologação serão ligados à tela definitiva em outro ciclo.</p>`
    });
  }

  function handleProvisionalAction(action, button) {
    const actions = {
      "new-block": {
        eyebrow: "Agenda do parceiro",
        title: "Bloquear horário",
        body: `<p>A função está ativa e pronta para receber o formulário definitivo.</p><p class="muted-copy">O fluxo futuro solicitará espaço, data, hora inicial, duração e motivo do bloqueio.</p>`
      },
      "new-space": {
        eyebrow: "Cadastro do parceiro",
        title: "Cadastrar espaço",
        body: `<p>A entrada para um novo espaço foi ativada.</p><p class="muted-copy">A tela posterior reunirá nome, tipo da quadra (futsal, society ou campo), capacidade, estrutura, preço-base, fotos e regras de disponibilidade.</p>`
      },
      calendar: {
        eyebrow: "Agenda ampliada",
        title: "Calendário completo",
        body: `<p>O acesso ao calendário está ativo em modo provisório.</p><p class="muted-copy">A versão completa terá visualização mensal e semanal, filtros por espaço, reservas, bloqueios e disponibilidade.</p>`
      },
      "edit-space": {
        eyebrow: "Gestão de espaços",
        title: `Editar ${button.dataset.spaceName || "espaço"}`,
        body: `<p>O comando de edição foi reconhecido.</p><p class="muted-copy">As alterações ainda não são persistidas. O formulário definitivo será conectado ao cadastro do parceiro em uma versão posterior.</p>`
      },
      "review-next": null,
      export: null
    };

    if (action === "review-next") {
      const nextPartner = state.partners.find((partner) => partner.status !== "Aprovado");
      if (nextPartner) showPartnerDetails(nextPartner.id);
      else showAction({ eyebrow: "Fila de análise", title: "Nenhum parceiro pendente", body: `<p>Todos os parceiros fictícios já estão aprovados.</p>` });
      return;
    }

    if (action === "export") {
      exportReport();
      return;
    }

    const config = actions[action] || {
      eyebrow: "Ação reconhecida",
      title: button.textContent.trim() || "Comando ativado",
      body: `<p>Este controle já responde ao clique.</p><p class="muted-copy">A tela ou integração correspondente será conectada posteriormente.</p>`
    };
    showAction(config);
  }

  function exportReport() {
    const rows = [
      ["Tipo", "Identificador", "Nome", "Cidade/Data", "Quantidade/Hora", "Status"],
      ...state.partners.map((partner) => ["Parceiro", partner.id, partner.name, partner.city, partner.spaces, partner.status]),
      ...state.reservations.map((reservation) => ["Reserva", reservation.id, reservation.venue, reservation.date, reservation.time, reservation.status])
    ];
    const csv = `\uFEFF${rows.map((row) => row.map(escapeCsv).join(";")).join("\r\n")}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tamo-on-partners-preview-0.1.2-relatorio.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("Relatório demonstrativo exportado em CSV.");
  }

  function userView() {
    const filtered = venues.filter((venue) =>
      `${venue.name} ${venue.city}`.toLowerCase().includes(state.search.toLowerCase())
    );

    const cards = filtered.map((venue) => `
      <article class="card venue-card">
        <div class="venue-cover ${venue.color}">
          <span class="badge">★ ${venue.rating}</span>
          <div>
            <div class="venue-name">${venue.name}</div>
            <div class="meta-row"><span>${venue.city}</span><span>${venue.distance}</span></div>
          </div>
        </div>
        <div class="venue-body">
          <div class="meta-row">
            <span>${venue.sports.join(" · ")}</span>
            <span>${venue.reviews} avaliações</span>
          </div>
          <div class="slot-row">
            ${venue.slots.map((slot) => {
              const unavailable = venue.unavailable.includes(slot);
              const reservation = getReservationForSlot(venue.id, slot);
              const reservationStatus = reservation ? getReservationStatus(reservation) : null;
              const slotClass = unavailable ? "unavailable" : reservationStatus?.slotClass || "";
              const slotState = unavailable ? "indisponível; clique para ver o motivo" : reservationStatus ? `${reservationStatus.label}; clique para ver o status` : "disponível para reserva";
              return `<button type="button" class="slot ${slotClass}" data-reserve="${venue.id}" data-time="${slot}" aria-label="${slot}, ${slotState}" title="${slotState}">${slot}</button>`;
            }).join("")}
          </div>
          <div class="slot-legend" aria-label="Legenda dos horários">
            <span><i class="legend-dot available"></i>Livre</span>
            <span><i class="legend-dot pending"></i>Pendente</span>
            <span><i class="legend-dot confirmed"></i>Confirmado</span>
            <span><i class="legend-dot cancelled"></i>Cancelado</span>
          </div>
          <div class="price-row">
            <div class="price"><small>A partir de</small>${money(venue.price)}</div>
            <button type="button" class="button secondary small" data-details="${venue.id}">Ver espaço</button>
          </div>
        </div>
      </article>`).join("");

    return `
      <section class="hero">
        <article class="hero-card">
          <span class="eyebrow">Área do usuário</span>
          <h1>Encontre uma quadra e transforme a reserva em evento.</h1>
          <p>A busca considera somente o nome da quadra ou a cidade. A compatibilidade por esporte será aplicada futuramente a partir do esporte escolhido no grupo.</p>
          <div class="hero-actions">
            <button type="button" class="button primary" data-scroll="venues">Explorar horários</button>
            <button type="button" class="button ghost" data-show-reservations>Minhas reservas</button>
          </div>
        </article>
        <article class="hero-card promotion-card">
          <div>
            <span class="eyebrow">Promoções</span>
            <div class="promotion-title">Vouchers e ofertas dos parceiros</div>
            <p>Espaço reservado para descontos de primeira reserva, horários promocionais e benefícios vinculados aos grupos.</p>
          </div>
          <div class="promotion-voucher"><strong>10% OFF</strong><span>Exemplo de voucher · não aplicável nesta Preview</span></div>
        </article>
      </section>

      <div class="toolbar" id="venues">
        <label class="search"><span>⌕</span><input id="venueSearch" value="${state.search}" placeholder="Buscar por quadra ou cidade" aria-label="Buscar por quadra ou cidade"></label>
      </div>

      <div class="section-title"><div><h2>Espaços em destaque</h2><p>Futsal, society e campo são identificações cadastradas pelo parceiro, sem filtro nesta busca.</p></div><span class="status status-info">Preview</span></div>
      <section class="grid">${cards || `<div class="empty-state"><div class="empty-icon">⌕</div>Nenhuma quadra encontrada para esta busca.</div>`}</section>

      <div class="section-title" id="reservations"><div><h2>Minhas reservas</h2><p>O status e a cor acompanham o endpoint demonstrativo aplicado.</p></div></div>
      <section class="card">
        ${state.reservations.map((reservation) => {
          const status = getReservationStatus(reservation);
          return `
          <div class="list-item reservation-list-item ${status.slotClass}">
            <div class="avatar">${reservation.venue.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div>
            <div class="list-item-main"><strong>${reservation.venue}</strong><small>${reservation.date} · ${reservation.time} · Reserva ${reservation.id}<br>Último endpoint: ${reservation.endpoint}</small></div>
            <span class="status ${status.statusClass}">${status.label}</span>
            ${reservation.statusKey === "pending" ? `<div class="item-actions reservation-actions"><button type="button" class="button secondary small" data-reservation-endpoint="payment.confirmed" data-reservation-id="${reservation.id}">Simular pagamento</button><button type="button" class="button danger small" data-reservation-endpoint="reservation.cancelled" data-reservation-id="${reservation.id}">Cancelar</button></div>` : ""}
          </div>`;
        }).join("")}
      </section>`;
  }

  function partnerView() {
    return `
      <section class="hero">
        <article class="hero-card">
          <span class="eyebrow">Portal do parceiro</span>
          <h1>Agenda, espaços e reservas no mesmo painel.</h1>
          <p>A Partners Preview inicia a validação da operação interna das quadras antes dos pagamentos.</p>
          <div class="hero-actions">
            <button type="button" class="button primary" data-action="new-block">Bloquear horário</button>
            <button type="button" class="button ghost" data-action="new-space">Cadastrar espaço</button>
          </div>
        </article>
        <article class="hero-card kpi-card">
          <div><span class="eyebrow">Ocupação semanal</span><div class="kpi-value">68%</div><div class="kpi-label">27 de 40 horários reservados</div></div>
          <div class="kpi-delta">+8% em relação à semana anterior</div>
        </article>
      </section>

      <section class="stats-grid">
        <div class="stat"><strong>11</strong><span>reservas confirmadas</span></div>
        <div class="stat"><strong>3</strong><span>aguardando resposta</span></div>
        <div class="stat"><strong>2</strong><span>horários bloqueados</span></div>
        <div class="stat"><strong>R$ 0</strong><span>pagamentos em preview</span></div>
      </section>

      <div class="section-title"><div><h2>Agenda de hoje</h2><p>Arena Central · Quadra Society 1</p></div><button type="button" class="button secondary small" data-action="calendar">Abrir calendário</button></div>
      <section class="card">
        <div class="calendar-strip" aria-label="Selecionar dia da agenda">
          ${partnerDays.map(([day, number]) => `<button type="button" class="day ${number === state.partnerDay ? "active" : ""}" data-partner-day="${number}" aria-pressed="${number === state.partnerDay}"><small>${day}</small><strong>${number}</strong></button>`).join("")}
        </div>
        <div class="timeline">
          <div class="timeline-row"><div class="timeline-time">18:00</div><div class="timeline-event"><strong>Grupo Quinta sem Falta</strong><div class="meta-row"><span>Confirmada</span><span>1 hora</span></div></div></div>
          <div class="timeline-row"><div class="timeline-time">19:00</div><div class="timeline-event warning"><strong>Solicitação pendente</strong><div class="meta-row"><span>Aguardando parceiro</span><span>Society 1</span></div></div></div>
          <div class="timeline-row"><div class="timeline-time">20:00</div><div class="timeline-event"><strong>Pelada dos Amigos</strong><div class="meta-row"><span>Confirmada</span><span>Evento vinculado</span></div></div></div>
          <div class="timeline-row"><div class="timeline-time">21:00</div><div class="timeline-event blocked"><strong>Manutenção do gramado</strong><div class="meta-row"><span>Bloqueio interno</span></div></div></div>
        </div>
      </section>

      <div class="section-title"><div><h2>Espaços cadastrados</h2><p>Estrutura, preço e disponibilidade.</p></div></div>
      <section class="grid two">
        <article class="card"><span class="status status-ok">Ativo</span><h3 style="margin-top:12px">Quadra Society 1</h3><p class="meta-row"><span>Grama sintética</span><span>14 jogadores</span></p><div class="price-row"><div class="price"><small>Hora-base</small>${money(120)}</div><button type="button" class="button ghost small" data-action="edit-space" data-space-name="Quadra Society 1">Editar</button></div></article>
        <article class="card"><span class="status status-ok">Ativo</span><h3 style="margin-top:12px">Quadra Futsal</h3><p class="meta-row"><span>Piso esportivo</span><span>12 jogadores</span></p><div class="price-row"><div class="price"><small>Hora-base</small>${money(95)}</div><button type="button" class="button ghost small" data-action="edit-space" data-space-name="Quadra Futsal">Editar</button></div></article>
      </section>

      <div class="section-title"><div><h2>Preparação financeira</h2><p>Estrutura prevista para a Fase 2.2.</p></div></div>
      <div class="callout"><strong>Asaas Sandbox ainda desativado</strong><p>O próximo ciclo adicionará cadastro financeiro de teste, criação de checkout e recebimento de webhooks em ambiente separado, sem dinheiro real.</p></div>`;
  }

  function adminView() {
    return `
      <section class="hero">
        <article class="hero-card">
          <span class="eyebrow">Administração da plataforma</span>
          <h1>Controle de parceiros, reservas e implantação.</h1>
          <p>Painel demonstrativo para aprovação, auditoria e acompanhamento da futura operação do marketplace.</p>
          <div class="hero-actions">
            <button type="button" class="button primary" data-action="review-next">Analisar próximo parceiro</button>
            <button type="button" class="button ghost" data-action="export">Exportar relatório</button>
          </div>
        </article>
        <article class="hero-card kpi-card">
          <div><span class="eyebrow">Implantação</span><div class="kpi-value">0.1.2</div><div class="kpi-label">busca e estados da reserva ajustados</div></div>
          <div class="kpi-delta">Banco e Asaas ainda isolados</div>
        </article>
      </section>

      <section class="stats-grid">
        <div class="stat"><strong>3</strong><span>parceiros cadastrados</span></div>
        <div class="stat"><strong>${state.partners.filter((partner) => partner.status !== "Aprovado").length}</strong><span>aguardando análise</span></div>
        <div class="stat"><strong>9</strong><span>espaços mapeados</span></div>
        <div class="stat"><strong>0</strong><span>transações reais</span></div>
      </section>

      <div class="section-title"><div><h2>Parceiros</h2><p>Aprovação e controle operacional.</p></div><span class="status status-neutral">Dados fictícios</span></div>
      <section class="card">
        <div class="list">
          ${state.partners.map((partner) => `
            <div class="list-item">
              <div class="avatar">${partner.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div>
              <div class="list-item-main"><strong>${partner.name}</strong><small>${partner.city} · ${partner.spaces} espaços · ★ ${partner.rating}</small></div>
              <span class="status ${partner.status === "Aprovado" ? "status-ok" : partner.status === "Em análise" ? "status-warning" : "status-neutral"}">${partner.status}</span>
              <div class="item-actions">
                ${partner.status !== "Aprovado" ? `<button type="button" class="button secondary small" data-approve="${partner.id}">Aprovar</button>` : ""}
                <button type="button" class="button ghost small" data-review="${partner.id}">Detalhes</button>
              </div>
            </div>`).join("")}
        </div>
      </section>

      <div class="section-title"><div><h2>Reservas recentes</h2><p>Monitoramento operacional antes dos pagamentos.</p></div></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Reserva</th><th>Parceiro</th><th>Usuário</th><th>Horário</th><th>Status</th><th>Pagamento</th></tr></thead>
          <tbody>
            <tr><td>R-0007</td><td>Arena Central</td><td>Eduardo B.</td><td>06/08 · 20:00</td><td><span class="status status-warning">Aguardando parceiro</span></td><td><span class="status status-neutral">Externo</span></td></tr>
            <tr><td>R-0006</td><td>Cancha Horizonte</td><td>Marcos L.</td><td>06/08 · 19:00</td><td><span class="status status-ok">Confirmada</span></td><td><span class="status status-neutral">Externo</span></td></tr>
            <tr><td>R-0005</td><td>Arena Central</td><td>Paulo R.</td><td>05/08 · 21:00</td><td><span class="status status-danger">Cancelada</span></td><td><span class="status status-neutral">Não iniciado</span></td></tr>
          </tbody>
        </table>
      </div>

      <div class="section-title"><div><h2>Controles de implantação</h2><p>Separação rígida da linha Beta 1.0.</p></div></div>
      <section class="grid two">
        <article class="card"><span class="eyebrow">Feature flags</span><h3 style="margin-top:10px">Pagamentos reais</h3><p class="meta-row"><span>Bloqueado no código</span><span>REAL_MONEY=false</span></p><span class="status status-danger">Desativado</span></article>
        <article class="card"><span class="eyebrow">Backup</span><h3 style="margin-top:10px">Planejamento mestre</h3><p class="meta-row"><span>Incluído em docs</span><span>Atualizado nesta build</span></p><span class="status status-ok">Presente</span></article>
      </section>`;
  }

  function render() {
    app.innerHTML = state.role === "user" ? userView() : state.role === "partner" ? partnerView() : adminView();
    bindDynamicEvents();
  }

  function bindDynamicEvents() {
    const search = document.getElementById("venueSearch");

    if (search) {
      search.addEventListener("input", (event) => {
        state.search = event.target.value;
        render();
        const refreshedSearch = document.getElementById("venueSearch");
        refreshedSearch?.focus();
        refreshedSearch?.setSelectionRange(state.search.length, state.search.length);
      });
    }


    document.querySelectorAll("[data-reserve]").forEach((button) => button.addEventListener("click", () => openReservation(button.dataset.reserve, button.dataset.time)));
    document.querySelectorAll("[data-reservation-endpoint]").forEach((button) => button.addEventListener("click", () => {
      applyReservationEndpoint(button.dataset.reservationId, button.dataset.reservationEndpoint);
    }));
    document.querySelectorAll("[data-details]").forEach((button) => button.addEventListener("click", () => showVenueDetails(button.dataset.details)));
    document.querySelectorAll("[data-scroll]").forEach((button) => button.addEventListener("click", () => {
      document.getElementById(button.dataset.scroll)?.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Horários exibidos.");
    }));
    document.querySelectorAll("[data-show-reservations]").forEach((button) => button.addEventListener("click", () => {
      document.getElementById("reservations")?.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast(`${state.reservations.length} reserva(s) demonstrativa(s) exibida(s).`);
    }));
    document.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", () => handleProvisionalAction(button.dataset.action, button)));
    document.querySelectorAll("[data-review]").forEach((button) => button.addEventListener("click", () => showPartnerDetails(button.dataset.review)));
    document.querySelectorAll("[data-partner-day]").forEach((button) => button.addEventListener("click", () => {
      state.partnerDay = Number(button.dataset.partnerDay);
      render();
      showToast(`Dia ${state.partnerDay}/08 selecionado em modo demonstrativo.`);
    }));
    document.querySelectorAll("[data-approve]").forEach((button) => button.addEventListener("click", () => {
      const partner = state.partners.find((item) => String(item.id) === button.dataset.approve);
      if (partner) partner.status = "Aprovado";
      showToast(`${partner?.name || "Parceiro"} aprovado no ambiente de teste.`);
      render();
    }));
  }

  roleButtons.forEach((button) => button.addEventListener("click", () => setRole(button.dataset.role)));
  document.getElementById("openReleaseNotes").addEventListener("click", () => infoDialog.showModal());

  reservationForm.addEventListener("submit", (event) => {
    if (event.submitter?.value === "cancel") return;
    event.preventDefault();
    const selected = state.selectedReservation;
    if (!selected) return;
    const id = nextReservationId();
    state.reservations.unshift({
      id,
      venueId: selected.venue.id,
      venue: selected.venue.name,
      date: "06/08",
      time: selected.time,
      statusKey: "pending",
      status: "Reserva pendente",
      endpoint: "reservation.created"
    });
    reservationDialog.close();
    showToast(`Reserva ${id} criada com status pendente.`);
    render();
  });

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  }

  render();
})();
