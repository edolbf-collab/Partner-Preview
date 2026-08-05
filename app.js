(function () {
  "use strict";

  const VERSION = "0.1.12";
  const STORAGE_KEY = "tamo_on_partners_preview_0112";
  const app = document.getElementById("app");
  const roleButtons = [...document.querySelectorAll(".role-chip")];
  const toast = document.getElementById("toast");
  const reservationDialog = document.getElementById("reservationDialog");
  const reservationForm = document.getElementById("reservationForm");
  const reservationTitle = document.getElementById("reservationTitle");
  const reservationSummary = document.getElementById("reservationSummary");
  const groupSelect = document.getElementById("groupSelect");
  const groupPermissionNote = document.getElementById("groupPermissionNote");
  const eventSelect = document.getElementById("eventSelect");
  const newEventPanel = document.getElementById("newEventPanel");
  const newEventTitle = document.getElementById("newEventTitle");
  const reservationAutomationPreview = document.getElementById("reservationAutomationPreview");
  const voucherSelect = document.getElementById("voucherSelect");
  const reservationVoucherPreview = document.getElementById("reservationVoucherPreview");
  const reservationPolicyAcknowledge = document.getElementById("reservationPolicyAcknowledge");
  const reservationPolicyText = document.getElementById("reservationPolicyText");
  const formDialog = document.getElementById("formDialog");
  const dynamicForm = document.getElementById("dynamicForm");
  const formEyebrow = document.getElementById("formEyebrow");
  const formTitle = document.getElementById("formTitle");
  const formDescription = document.getElementById("formDescription");
  const formFields = document.getElementById("formFields");
  const formSubmit = document.getElementById("formSubmit");
  const detailDialog = document.getElementById("detailDialog");
  const detailEyebrow = document.getElementById("detailEyebrow");
  const detailTitle = document.getElementById("detailTitle");
  const detailBody = document.getElementById("detailBody");
  const confirmDialog = document.getElementById("confirmDialog");
  const confirmForm = document.getElementById("confirmForm");
  const confirmTitle = document.getElementById("confirmTitle");
  const confirmMessage = document.getElementById("confirmMessage");
  const confirmSubmit = document.getElementById("confirmSubmit");
  const infoDialog = document.getElementById("infoDialog");
  const cancellationDialog = document.getElementById("cancellationDialog");
  const cancellationForm = document.getElementById("cancellationForm");
  const cancellationEyebrow = document.getElementById("cancellationEyebrow");
  const cancellationTitle = document.getElementById("cancellationTitle");
  const cancellationSummary = document.getElementById("cancellationSummary");
  const cancellationImpactList = document.getElementById("cancellationImpactList");
  const cancellationWarningText = document.getElementById("cancellationWarningText");
  const cancellationReasonLabel = document.getElementById("cancellationReasonLabel");
  const cancellationReason = document.getElementById("cancellationReason");
  const cancellationAcknowledge = document.getElementById("cancellationAcknowledge");
  const cancellationAcknowledgeText = document.getElementById("cancellationAcknowledgeText");
  const cancellationSubmit = document.getElementById("cancellationSubmit");

  let formHandler = null;
  let confirmHandler = null;
  let selectedReservation = null;
  let selectedVenueSchedule = null;
  let detailReturnContext = null;
  let reservationReturnContext = null;
  let selectedCancellation = null;
  const allowAutomaticFieldFocus = window.matchMedia("(min-width: 701px) and (pointer: fine)").matches;

  const menus = {
    user: [
      ["discover", "⌕", "Buscar quadras"],
      ["reservations", "▣", "Minhas reservas"],
      ["favorites", "♡", "Favoritos"],
      ["promotions", "%", "Promoções"],
      ["profile", "○", "Conta Tâmo On"]
    ],
    partner: [
      ["overview", "⌂", "Visão geral"],
      ["agenda", "▦", "Agenda"],
      ["reservations", "▣", "Reservas"],
      ["spaces", "◇", "Espaços"],
      ["clients", "◎", "Clientes"],
      ["team", "♙", "Equipe"],
      ["finance", "$", "Financeiro"],
      ["registration", "≡", "Cadastro"]
    ],
    admin: [
      ["overview", "⌂", "Visão geral"],
      ["partners", "◇", "Parceiros"],
      ["reservations", "▣", "Reservas"],
      ["users", "◎", "Usuários"],
      ["finance", "$", "Financeiro"],
      ["settings", "⚙", "Configurações"]
    ]
  };

  function initialState() {
    return {
      role: "user",
      activePage: { user: "discover", partner: "overview", admin: "overview" },
      search: { venue: "", adminPartner: "", adminUser: "" },
      filters: { userReservationStatus: "Todas", adminPartnerStatus: "Todos", adminReservationStatus: "Todos", partnerReservationStatus: "Todos" },
      partnerDay: 6,
      userProfile: {
        name: "Eduardo Batista",
        email: "eduardo.teste@exemplo.com",
        phone: "(41) 99988-7766",
        city: "Curitiba",
        notification: "Ativadas",
        preferredTime: "Noite",
        accountProvider: "Google",
        accountSource: "Conta Google vinculada ao Tâmo On",
        complementarySource: "Perfil principal do Tâmo On",
        lastSync: "05/08/2026 às 15:54",
        centralProfileStatus: "Completo",
        marketplaceEditable: false
      },
      userGroups: [
        { id: "G-001", name: "Quinta sem Falta", role: "Administrador", memberCount: 18, canCreateEvents: true, canEditEvents: true },
        { id: "G-002", name: "Amigos do Bairro", role: "Organizador", memberCount: 14, canCreateEvents: true, canEditEvents: true },
        { id: "G-003", name: "Família FC", role: "Membro", memberCount: 22, canCreateEvents: false, canEditEvents: false }
      ],
      groupEvents: [
        { id: "EV-0101", groupId: "G-001", title: "Pelada de quinta-feira", date: "13/08/2026", time: "20:00", statusKey: "published", status: "Publicado", published: true, source: "existing" },
        { id: "EV-0102", groupId: "G-002", title: "Amistoso de sábado", date: "15/08/2026", time: "16:00", statusKey: "published", status: "Publicado", published: true, source: "existing" },
        { id: "EV-0201", groupId: "G-001", title: "Arena Central · 06/08 às 20:00", date: "06/08/2026", time: "20:00", venue: "Arena Central", statusKey: "standby_payment", status: "Aguardando pagamento", published: false, source: "reservation", sourceReservationId: "R-0007", publicationEndpoint: "waiting.payment.confirmed", pushStatus: "Aguardando publicação" },
        { id: "EV-0202", groupId: "G-002", title: "Arena Central · 07/08 às 18:00", date: "07/08/2026", time: "18:00", venue: "Arena Central", statusKey: "published", status: "Publicado", published: true, source: "reservation", sourceReservationId: "R-0008", publicationEndpoint: "event.publish_after_payment", pushStatus: "Enviado", pushEndpoint: "push.group_members" }
      ],
      pushLog: [],
      cancellationLog: [],
      cancellationVouchers: [],
      cancellationExceptionReviews: [],
      accountingLedger: [
        { id: "LED-0001", type: "service_payment", reservationId: "R-0008", venueId: "arena-central", venue: "Arena Central", amount: 130, accountingMonth: "08/2026", fiscalAmount: 130, description: "Pagamento original da reserva" },
        { id: "LED-0002", type: "service_payment", reservationId: "R-0006", venueId: "cancha-horizonte", venue: "Cancha Horizonte", amount: 105, accountingMonth: "08/2026", fiscalAmount: 105, description: "Pagamento original da reserva" }
      ],
      favorites: ["arena-central"],
      appliedVouchers: [],
      ui: {},
      venues: [
        {
          id: "arena-central", name: "Arena Central", city: "Curitiba", neighborhood: "Água Verde", distance: "2,4 km",
          rating: 4.8, reviews: 126, ratingSource: "users", types: ["Futsal", "Society"], price: 120, address: "Rua das Palmeiras, 250",
          facadeImage: "assets/venues/arena-central-fachada.png", facadeSource: "partner_upload", amenities: ["Vestiário", "Estacionamento", "Churrasqueira"],
          schedule: [
            { date: "06/08/2026", shortDate: "06/08", weekday: "Qui", dayLabel: "6 ago", slots: [{ time: "18:00", price: 120 }, { time: "19:00", price: 120, blocked: true }, { time: "20:00", price: 120 }, { time: "21:00", price: 130 }] },
            { date: "07/08/2026", shortDate: "07/08", weekday: "Sex", dayLabel: "7 ago", slots: [{ time: "18:00", price: 130 }, { time: "19:00", price: 140 }, { time: "20:00", price: 140 }, { time: "21:00", price: 140 }] },
            { date: "08/08/2026", shortDate: "08/08", weekday: "Sáb", dayLabel: "8 ago", slots: [{ time: "14:00", price: 150 }, { time: "16:00", price: 150 }, { time: "18:00", price: 160 }, { time: "20:00", price: 160 }] },
            { date: "09/08/2026", shortDate: "09/08", weekday: "Dom", dayLabel: "9 ago", slots: [{ time: "10:00", price: 150 }, { time: "12:00", price: 150 }, { time: "16:00", price: 160 }, { time: "18:00", price: 160 }] },
            { date: "10/08/2026", shortDate: "10/08", weekday: "Seg", dayLabel: "10 ago", slots: [{ time: "18:00", price: 120 }, { time: "19:00", price: 120 }, { time: "20:00", price: 130 }, { time: "21:00", price: 130 }] },
            { date: "11/08/2026", shortDate: "11/08", weekday: "Ter", dayLabel: "11 ago", slots: [{ time: "18:00", price: 120 }, { time: "19:00", price: 120 }, { time: "20:00", price: 130 }, { time: "21:00", price: 130 }] },
            { date: "12/08/2026", shortDate: "12/08", weekday: "Qua", dayLabel: "12 ago", slots: [{ time: "18:00", price: 120 }, { time: "19:00", price: 120 }, { time: "20:00", price: 130 }, { time: "21:00", price: 130 }] }
          ]
        },
        {
          id: "cancha-horizonte", name: "Cancha Horizonte", city: "São José dos Pinhais", neighborhood: "Centro", distance: "8,1 km",
          rating: 4.6, reviews: 74, ratingSource: "users", types: ["Society"], price: 105, address: "Avenida Central, 840",
          facadeImage: "assets/venues/cancha-horizonte.svg", facadeSource: "partner_upload", amenities: ["Estacionamento", "Lanchonete"],
          schedule: [
            { date: "06/08/2026", shortDate: "06/08", weekday: "Qui", dayLabel: "6 ago", slots: [{ time: "17:30", price: 105 }, { time: "19:00", price: 105 }, { time: "20:30", price: 115, blocked: true }, { time: "22:00", price: 105 }] },
            { date: "07/08/2026", shortDate: "07/08", weekday: "Sex", dayLabel: "7 ago", slots: [{ time: "17:30", price: 110 }, { time: "19:00", price: 120 }, { time: "20:30", price: 120 }, { time: "22:00", price: 110 }] },
            { date: "09/08/2026", shortDate: "09/08", weekday: "Dom", dayLabel: "9 ago", slots: [{ time: "10:00", price: 120 }, { time: "12:00", price: 120 }, { time: "16:00", price: 130 }, { time: "18:00", price: 130 }] }
          ]
        },
        {
          id: "vale-verde", name: "Complexo Vale Verde", city: "Colombo", neighborhood: "Roça Grande", distance: "11,7 km",
          rating: 4.7, reviews: 91, ratingSource: "users", types: ["Futsal", "Campo"], price: 95, address: "Estrada do Vale, 41",
          facadeImage: "assets/venues/vale-verde.svg", facadeSource: "partner_upload", amenities: ["Vestiário", "Arquibancada", "Iluminação"],
          schedule: [
            { date: "06/08/2026", shortDate: "06/08", weekday: "Qui", dayLabel: "6 ago", slots: [{ time: "18:00", price: 95 }, { time: "19:30", price: 105 }, { time: "21:00", price: 105 }] },
            { date: "08/08/2026", shortDate: "08/08", weekday: "Sáb", dayLabel: "8 ago", slots: [{ time: "09:00", price: 120 }, { time: "11:00", price: 120 }, { time: "15:00", price: 140 }, { time: "17:00", price: 140 }] },
            { date: "09/08/2026", shortDate: "09/08", weekday: "Dom", dayLabel: "9 ago", slots: [{ time: "09:00", price: 130 }, { time: "11:00", price: 130 }, { time: "15:00", price: 150 }, { time: "17:00", price: 150 }] }
          ]
        }
      ],
      promotions: [
        { id: "P-01", title: "Primeira reserva", code: "BEMVINDO10", benefit: "10% de desconto", venue: "Todos os parceiros", validUntil: "31/08/2026", active: true },
        { id: "P-02", title: "Fora do horário de pico", code: "FORADEPICO", benefit: "R$ 15,00 de desconto", venue: "Cancha Horizonte", validUntil: "20/08/2026", active: true },
        { id: "P-03", title: "Grupo recorrente", code: "GRUPO4X", benefit: "4ª reserva com 20%", venue: "Arena Central", validUntil: "30/09/2026", active: true }
      ],
      reservations: [
        { id: "R-0007", venueId: "arena-central", venue: "Arena Central", user: "Eduardo Batista", date: "06/08/2026", shortDate: "06/08", time: "20:00", value: 120, statusKey: "pending", status: "Reserva pendente", endpoint: "reservation.created", groupId: "G-001", groupName: "Quinta sem Falta", groupRole: "Administrador", eventId: "EV-0201", event: "Arena Central · 06/08 às 20:00", eventMode: "new", eventPublicationStatus: "standby_payment", pushStatus: "Aguardando pagamento", voucher: "" },
        { id: "R-0008", venueId: "arena-central", venue: "Arena Central", user: "Eduardo Batista", date: "07/08/2026", shortDate: "07/08", time: "18:00", value: 130, statusKey: "confirmed", status: "Confirmada e paga", endpoint: "payment.confirmed", paymentStatus: "Pago", paymentProvider: "Asaas", accountingRecognizedValue: 130, accountingMonth: "08/2026", fiscalObligationValue: 130, cancellationPolicyAccepted: true, cancellationPolicyVersion: "voucher-responsibility-availability-v2", groupId: "G-002", groupName: "Amigos do Bairro", groupRole: "Organizador", eventId: "EV-0202", event: "Arena Central · 07/08 às 18:00", eventMode: "new", eventPublicationStatus: "published", pushStatus: "Enviado", voucher: "" },
        { id: "R-0006", venueId: "cancha-horizonte", venue: "Cancha Horizonte", user: "Marcos Lima", date: "06/08/2026", shortDate: "06/08", time: "19:00", value: 105, statusKey: "confirmed", status: "Confirmada", endpoint: "payment.confirmed", accountingRecognizedValue: 105, accountingMonth: "08/2026", fiscalObligationValue: 105, cancellationPolicyAccepted: true, cancellationPolicyVersion: "voucher-responsibility-availability-v2", groupId: "G-010", groupName: "Amigos do Bairro", eventId: "EV-0901", event: "Amistoso do bairro", eventMode: "existing", eventPublicationStatus: "linked_existing", pushStatus: "Não aplicável", voucher: "FORADEPICO" },
        { id: "R-0005", venueId: "arena-central", venue: "Arena Central", user: "Paulo Reis", date: "05/08/2026", shortDate: "05/08", time: "21:00", value: 120, statusKey: "cancelled", status: "Cancelada", endpoint: "reservation.cancelled", groupId: "G-020", groupName: "Grupo do Paulo", eventId: "", event: "", eventMode: "none", eventPublicationStatus: "cancelled", pushStatus: "Não enviado", voucher: "" }
      ],
      partnerAgenda: [
        { id: "A-01", day: 6, time: "18:00", title: "Grupo Quinta sem Falta", space: "Quadra Society 1", type: "confirmed", detail: "Reserva R-0010 · 1 hora" },
        { id: "A-02", day: 6, time: "19:00", title: "Solicitação pendente", space: "Quadra Society 1", type: "pending", detail: "Aguardando confirmação" },
        { id: "A-03", day: 6, time: "20:00", title: "Pelada dos Amigos", space: "Quadra Futsal", type: "confirmed", detail: "Evento vinculado" },
        { id: "A-04", day: 6, time: "21:00", title: "Manutenção do gramado", space: "Quadra Society 1", type: "blocked", detail: "Bloqueio interno" },
        { id: "A-05", day: 7, time: "19:00", title: "Grupo Sexta FC", space: "Quadra Society 1", type: "confirmed", detail: "Reserva recorrente" }
      ],
      partnerSpaces: [
        { id: "E-01", name: "Quadra Society 1", type: "Society", floor: "Grama sintética", capacity: 14, price: 120, status: "Ativo", lights: "Sim", covered: "Não", maintenance: "15/08/2026" },
        { id: "E-02", name: "Quadra Futsal", type: "Futsal", floor: "Piso esportivo", capacity: 12, price: 95, status: "Ativo", lights: "Sim", covered: "Sim", maintenance: "22/08/2026" }
      ],
      partnerReservations: [
        { id: "RP-101", client: "Grupo Quinta sem Falta", date: "06/08/2026", time: "18:00", space: "Quadra Society 1", value: 120, status: "Confirmada", payment: "Externo" },
        { id: "RP-102", client: "Amigos do Bairro", date: "06/08/2026", time: "19:00", space: "Quadra Society 1", value: 120, status: "Pendente", payment: "Não iniciado" },
        { id: "RP-103", client: "Amigos do Bairro", date: "07/08/2026", time: "18:00", space: "Quadra Society 1", value: 130, status: "Confirmada", payment: "Pago via Asaas", userReservationId: "R-0008", groupName: "Amigos do Bairro", eventId: "EV-0202", accountingRecognizedValue: 130, accountingMonth: "08/2026" },
        { id: "RP-104", client: "Turma do Sábado", date: "08/08/2026", time: "16:00", space: "Quadra Society 1", value: 120, status: "Cancelada", payment: "Estornado externamente" }
      ],
      partnerClients: [
        { id: "C-01", name: "Grupo Quinta sem Falta", contact: "Carlos Mendes", phone: "(41) 99876-1102", frequency: "Semanal", lastBooking: "30/07/2026", notes: "Prefere o horário das 18h." },
        { id: "C-02", name: "Pelada dos Amigos", contact: "Rafael Souza", phone: "(41) 99700-3321", frequency: "Quinzenal", lastBooking: "06/08/2026", notes: "Solicita coletes quando disponíveis." },
        { id: "C-03", name: "Turma do Sábado", contact: "Mariana Lopes", phone: "(41) 99621-8240", frequency: "Mensal", lastBooking: "11/07/2026", notes: "Contato preferencial por WhatsApp." }
      ],
      partnerTeam: [
        { id: "T-01", name: "Lucas Ferreira", role: "Administrador", email: "lucas@arenacentral.exemplo", permission: "Total", status: "Ativo" },
        { id: "T-02", name: "Ana Paula Costa", role: "Atendimento", email: "ana@arenacentral.exemplo", permission: "Agenda e reservas", status: "Ativo" },
        { id: "T-03", name: "João Martins", role: "Manutenção", email: "joao@arenacentral.exemplo", permission: "Agenda e bloqueios", status: "Ativo" }
      ],
      partnerProfile: {
        tradeName: "Arena Central",
        legalName: "Arena Central Espaços Esportivos Ltda.",
        cnpj: "12.345.678/0001-90",
        legalNature: "Sociedade limitada",
        taxRegime: "Simples Nacional",
        declaredActivity: "Gestão e locação de espaços esportivos",
        municipalRegistration: "987654-3",
        responsibleName: "Lucas Henrique Ferreira",
        responsibleCpf: "***.456.789-**",
        responsibleRole: "Sócio-administrador",
        email: "contato@arenacentral.exemplo",
        phone: "(41) 3333-4455",
        whatsapp: "(41) 99911-2233",
        address: "Rua das Palmeiras, 250",
        neighborhood: "Água Verde",
        city: "Curitiba",
        state: "PR",
        zip: "80.000-000",
        contractStatus: "Assinado",
        termsStatus: "Aceitos",
        privacyStatus: "Aceita",
        cancellationPolicy: "Cancelamento pelo usuário até 24 horas antes gera voucher. Cancelamento pelo parceiro ou Tâmo On gera reembolso integral, com taxas suportadas por quem cancelou. Fora do prazo, não há voucher ou reembolso automático.",
        venueId: "arena-central",
        fiscalIssuer: "Parceiro emite documento fiscal ao usuário",
        commissionInvoice: "Tâmo On emite NFS-e da comissão ao parceiro",
        paymentModel: "Pagamento externo nesta fase",
        bank: "Banco Exemplo",
        branch: "0001",
        account: "****-5",
        pixKey: "CNPJ cadastrado",
        asaasSubaccount: "Não criada",
        commissionRate: 6,
        documents: [
          { name: "Cartão CNPJ", status: "Validado" },
          { name: "Contrato social", status: "Validado" },
          { name: "Comprovante de endereço", status: "Validado" },
          { name: "Dados bancários", status: "Pendente de conferência" },
          { name: "Contrato de parceria", status: "Assinado" }
        ]
      },
      adminPartners: [
        { id: 1, venueId: "arena-central", tradeName: "Arena Central", legalName: "Arena Central Espaços Esportivos Ltda.", cnpj: "12.345.678/0001-90", city: "Curitiba", spaces: 2, types: "Futsal · Society", status: "Aprovado", responsible: "Lucas Ferreira", email: "contato@arenacentral.exemplo", phone: "(41) 3333-4455", taxRegime: "Simples Nacional", activity: "Gestão e locação de espaços esportivos", contract: "Assinado", fiscal: "Parceiro emite ao usuário", banking: "Em conferência", commission: 6, score: 92 },
        { id: 2, venueId: "cancha-horizonte", tradeName: "Cancha Horizonte", legalName: "Horizonte Esportes e Eventos Ltda.", cnpj: "23.456.789/0001-01", city: "São José dos Pinhais", spaces: 2, types: "Society", status: "Em análise", responsible: "Fernanda Ribeiro", email: "financeiro@horizonte.exemplo", phone: "(41) 3344-7788", taxRegime: "Simples Nacional", activity: "Locação de espaços esportivos", contract: "Enviado", fiscal: "A validar", banking: "Pendente", commission: 6, score: 68 },
        { id: 3, venueId: "vale-verde", tradeName: "Complexo Vale Verde", legalName: "Vale Verde Centro Esportivo Ltda.", cnpj: "34.567.890/0001-12", city: "Colombo", spaces: 4, types: "Futsal · Campo", status: "Pendente", responsible: "Gustavo Almeida", email: "gestao@valeverde.exemplo", phone: "(41) 3656-2010", taxRegime: "Lucro Presumido", activity: "Centro esportivo e eventos", contract: "Não enviado", fiscal: "A validar", banking: "Não informado", commission: 6, score: 41 }
      ],
      adminUsers: [
        { id: "U-1001", name: "Eduardo Batista", email: "eduardo.teste@exemplo.com", city: "Curitiba", groups: 3, reservations: 4, status: "Ativo", createdAt: "14/06/2026" },
        { id: "U-1002", name: "Marcos Lima", email: "marcos.lima@exemplo.com", city: "São José dos Pinhais", groups: 1, reservations: 2, status: "Ativo", createdAt: "20/06/2026" },
        { id: "U-1003", name: "Paulo Reis", email: "paulo.reis@exemplo.com", city: "Curitiba", groups: 2, reservations: 1, status: "Bloqueado", createdAt: "02/07/2026" },
        { id: "U-1004", name: "Mariana Lopes", email: "mariana.lopes@exemplo.com", city: "Colombo", groups: 1, reservations: 3, status: "Ativo", createdAt: "08/07/2026" }
      ],
      settings: {
        marketplaceEnabled: true,
        newPartners: true,
        vouchersEnabled: true,
        realMoney: false,
        automaticApproval: false,
        notificationEmails: true,
        defaultCommission: 6,
        cancellationHours: 24,
        voucherValidityDays: 30,
        voucherCompatibilityWindowHours: 2,
        voucherMinimumCompatibleDates: 4,
        voucherExtensionDays: 7,
        cancellationVoucherPolicy: true
      }
    };
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return saved && saved.activePage && saved.venues ? saved : initialState();
    } catch (_error) {
      return initialState();
    }
  }

  let state = loadState();

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function money(value) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value || 0));
  }


  function parsePtDateTime(date, time = "00:00") {
    const [day, month, year] = String(date || "").split("/").map(Number);
    const [hour, minute] = String(time || "00:00").split(":").map(Number);
    return new Date(year, Math.max(0, month - 1), day, hour || 0, minute || 0, 0, 0);
  }

  function formatPtDate(date) {
    return new Intl.DateTimeFormat("pt-BR").format(date);
  }

  function accountingMonth(date = new Date()) {
    return new Intl.DateTimeFormat("pt-BR", { month: "2-digit", year: "numeric" }).format(date);
  }

  function cancellationEligibility(reservation, source = "user") {
    if (!reservation) return { eligible: false, hoursRemaining: 0, mode: "none" };
    const useAt = parsePtDateTime(reservation.date, reservation.time);
    const hoursRemaining = (useAt.getTime() - Date.now()) / 3600000;
    if (source === "partner" || source === "tamo") return { eligible: true, hoursRemaining, mode: "refund" };
    const eligible = hoursRemaining >= Number(state.settings.cancellationHours || 24);
    return { eligible, hoursRemaining, mode: eligible ? "voucher" : "no_compensation" };
  }

  function timeToMinutes(time) {
    const [hour, minute] = String(time || "00:00").split(":").map(Number);
    return Math.max(0, Math.min(1439, (hour || 0) * 60 + (minute || 0)));
  }

  function minutesToTime(minutes) {
    const normalized = Math.max(0, Math.min(1439, Number(minutes || 0)));
    return `${String(Math.floor(normalized / 60)).padStart(2, "0")}:${String(normalized % 60).padStart(2, "0")}`;
  }

  function timePeriod(time) {
    const minutes = timeToMinutes(time);
    if (minutes < 360) return "madrugada";
    if (minutes < 720) return "manhã";
    if (minutes < 1080) return "tarde";
    return "noite";
  }

  function voucherCompatibleWindow(originalTime) {
    const center = timeToMinutes(originalTime);
    const tolerance = Number(state.settings.voucherCompatibilityWindowHours || 2) * 60;
    return { start: Math.max(0, center - tolerance), end: Math.min(1439, center + tolerance), period: timePeriod(originalTime) };
  }

  function compatibleAvailabilityForVoucher(voucher) {
    const venue = state.venues.find((item) => item.id === voucher.venueId);
    if (!venue) return { dates: [], count: 0, slots: 0 };
    const window = voucherCompatibleWindow(voucher.originalTime || "20:00");
    const issuedDate = voucher.issuedDate || String(voucher.issuedAt || "").split(",")[0];
    const startsAt = parsePtDateTime(issuedDate, "00:00");
    const endsAt = parsePtDateTime(voucher.expiresAt, "23:59");
    const dates = [];
    let slots = 0;
    venue.schedule.forEach((day) => {
      const dayDate = parsePtDateTime(day.date, "00:00");
      if (dayDate < startsAt || dayDate > endsAt) return;
      const matching = day.slots.filter((slot) => {
        const minutes = timeToMinutes(slot.time);
        const occupied = findReservationForSlot(venue.id, slot.time, day.shortDate);
        return !slot.blocked && !occupied && timePeriod(slot.time) === window.period && minutes >= window.start && minutes <= window.end;
      });
      if (matching.length) {
        dates.push(day.date);
        slots += matching.length;
      }
    });
    const uniqueDates = [...new Set(dates)];
    return { dates: uniqueDates, count: uniqueDates.length, slots };
  }

  function voucherStatusLabel(voucher) {
    const map = { active: "Disponível", active_extended: "Prorrogado por disponibilidade", reserved: "Reservado", used: "Utilizado", expired: "Expirado", reassigned: "Realocado" };
    return map[voucher.status] || voucher.status;
  }

  function refreshVoucherAvailability(voucher) {
    if (!voucher || !["active", "active_extended", "reserved"].includes(voucher.status)) return voucher;
    if (voucher.status === "reserved") return voucher;
    const minimum = Number(voucher.minimumCompatibleDates || state.settings.voucherMinimumCompatibleDates || 4);
    let availability = compatibleAvailabilityForVoucher(voucher);
    voucher.compatibleDatesCount = availability.count;
    voucher.compatibleSlotsCount = availability.slots;
    voucher.compatibleDates = availability.dates;
    const window = voucherCompatibleWindow(voucher.originalTime || "20:00");
    voucher.compatibilityWindow = voucher.compatibilityWindow || `${minutesToTime(window.start)}–${minutesToTime(window.end)}`;
    let expiry = parsePtDateTime(voucher.expiresAt, "23:59");
    let guard = 0;
    while (expiry.getTime() < Date.now() && availability.count < minimum && guard < 24) {
      expiry.setDate(expiry.getDate() + Number(state.settings.voucherExtensionDays || 7));
      voucher.expiresAt = formatPtDate(expiry);
      voucher.status = "active_extended";
      voucher.extensionCount = Number(voucher.extensionCount || 0) + 1;
      voucher.extensionReason = `Disponibilidade compatível insuficiente: ${availability.count} de ${minimum} datas.`;
      availability = compatibleAvailabilityForVoucher(voucher);
      voucher.compatibleDatesCount = availability.count;
      voucher.compatibleSlotsCount = availability.slots;
      voucher.compatibleDates = availability.dates;
      guard += 1;
    }
    if (expiry.getTime() < Date.now() && availability.count >= minimum) voucher.status = "expired";
    return voucher;
  }

  function voucherIsExpired(voucher) {
    refreshVoucherAvailability(voucher);
    return voucher?.status === "expired";
  }

  function activeCancellationVouchers() {
    state.cancellationVouchers.forEach(refreshVoucherAvailability);
    return state.cancellationVouchers.filter((voucher) => ["active", "active_extended", "reserved"].includes(voucher.status));
  }

  function activeVoucherLiability(venueId) {
    const items = activeCancellationVouchers().filter((voucher) => voucher.venueId === venueId);
    return { items, count: items.length, value: items.reduce((sum, voucher) => sum + Number(voucher.value || 0), 0) };
  }

  function cancellationVoucherByValue(value) {
    if (!String(value || "").startsWith("CANCEL:")) return null;
    const id = String(value).slice(7);
    return state.cancellationVouchers.find((voucher) => voucher.id === id) || null;
  }

  function eligibleCancellationVouchersForReservation() {
    if (!selectedReservation) return [];
    activeCancellationVouchers();
    return state.cancellationVouchers.filter((voucher) =>
      ["active", "active_extended"].includes(voucher.status) &&
      voucher.user === state.userProfile.name &&
      voucher.venueId === selectedReservation.venue.id &&
      Number(selectedReservation.value) >= Number(voucher.value)
    );
  }

  function populateVoucherOptions() {
    const eligible = eligibleCancellationVouchersForReservation();
    const promoOptions = state.promotions.filter((promo) => promo.active).map((promo) => `<option value="PROMO:${esc(promo.code)}">${esc(promo.code)} · ${esc(promo.benefit)}</option>`).join("");
    const cancellationOptions = eligible.map((voucher) => `<option value="CANCEL:${esc(voucher.id)}">${esc(voucher.code)} · crédito ${money(voucher.value)}</option>`).join("");
    voucherSelect.innerHTML = `<option value="">Sem voucher</option>${cancellationOptions ? `<optgroup label="Vouchers de cancelamento">${cancellationOptions}</optgroup>` : ""}${promoOptions ? `<optgroup label="Promoções">${promoOptions}</optgroup>` : ""}`;
    voucherSelect.value = "";
    updateVoucherPaymentPreview();
  }

  function updateVoucherPaymentPreview() {
    if (!reservationVoucherPreview || !selectedReservation) return;
    const voucher = cancellationVoucherByValue(voucherSelect.value);
    if (!voucher) {
      reservationVoucherPreview.innerHTML = `<strong>Pagamento da reserva</strong><p>${money(selectedReservation.value)} será processado pelos meios disponibilizados no app após a criação da reserva pendente.</p>`;
      return;
    }
    const complement = Math.max(0, Number(selectedReservation.value) - Number(voucher.value));
    reservationVoucherPreview.innerHTML = `<strong>Voucher de cancelamento selecionado</strong><div class="voucher-calculation"><span>Valor da nova reserva <b>${money(selectedReservation.value)}</b></span><span>Voucher consumido integralmente <b>− ${money(voucher.value)}</b></span><span class="voucher-total">Complemento a pagar <b>${money(complement)}</b></span></div><p>O voucher é de uso único e será consumido integralmente. Apenas o complemento, quando houver, gera novo pagamento e nova obrigação fiscal e contábil.</p>`;
  }

  function initials(name) {
    return String(name || "?").split(/\s+/).filter(Boolean).map((part) => part[0]).slice(0, 2).join("").toUpperCase();
  }

  function nextId(prefix, items) {
    const highest = items.reduce((max, item) => {
      const number = Number.parseInt(String(item.id).replace(/\D/g, ""), 10);
      return Number.isFinite(number) ? Math.max(max, number) : max;
    }, 0);
    return `${prefix}${String(highest + 1).padStart(4, "0")}`;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function statusClass(status) {
    const value = String(status || "").toLowerCase();
    if (value.includes("aprov") || value.includes("confirm") || value === "ativo" || value.includes("valid") || value.includes("assinado") || value.includes("aceit")) return "status-ok";
    if (value.includes("pend") || value.includes("análise") || value.includes("enviado") || value.includes("conferência")) return "status-warning";
    if (value.includes("cancel") || value.includes("bloque") || value.includes("rejeit") || value.includes("suspens") || value.includes("não")) return "status-danger";
    return "status-neutral";
  }

  function reservationStatus(statusKey) {
    const map = {
      pending: { label: "Reserva pendente", status: "status-warning", slot: "reservation-pending" },
      confirmed: { label: "Confirmada", status: "status-ok", slot: "reservation-confirmed" },
      cancelled: { label: "Cancelada", status: "status-danger", slot: "reservation-cancelled" }
    };
    return map[statusKey] || map.pending;
  }

  function reservationDateBadge(date) {
    const [day = "--", month = "--"] = String(date || "").split("/");
    const months = { "01":"JAN", "02":"FEV", "03":"MAR", "04":"ABR", "05":"MAI", "06":"JUN", "07":"JUL", "08":"AGO", "09":"SET", "10":"OUT", "11":"NOV", "12":"DEZ" };
    return { day, month: months[month] || month };
  }

  function eventPublicationLabel(statusKey) {
    const map = {
      standby_payment: { label: "Evento em espera", className: "status-warning" },
      published: { label: "Evento publicado", className: "status-ok" },
      linked_existing: { label: "Evento existente", className: "status-neutral" },
      cancelled: { label: "Evento cancelado", className: "status-danger" }
    };
    return map[statusKey] || map.linked_existing;
  }

  function userGroup(groupId) {
    return state.userGroups.find((group) => group.id === groupId);
  }

  function canManageGroupEvents(group) {
    return Boolean(group?.canCreateEvents && group?.canEditEvents);
  }

  function defaultEventTitle(reservation) {
    return `${reservation.venue.name} · ${reservation.day.shortDate} às ${reservation.time}`;
  }

  function populateReservationGroups() {
    groupSelect.innerHTML = `<option value="">Selecione um grupo</option>${state.userGroups.map((group) => `<option value="${esc(group.id)}" ${canManageGroupEvents(group) ? "" : "disabled"}>${esc(group.name)} · ${esc(group.role)}${canManageGroupEvents(group) ? "" : " · sem permissão"}</option>`).join("")}`;
    const firstAllowed = state.userGroups.find(canManageGroupEvents);
    groupSelect.value = firstAllowed?.id || "";
    updateReservationEventOptions();
  }

  function updateReservationEventOptions() {
    const group = userGroup(groupSelect.value);
    const allowed = canManageGroupEvents(group);
    groupPermissionNote.textContent = !group ? "Selecione um grupo pertencente ao usuário." : allowed ? `${group.role}: autorizado a criar e alterar eventos neste grupo.` : `${group.role}: sem privilégio para criar ou alterar eventos.`;
    groupPermissionNote.classList.toggle("permission-denied", Boolean(group && !allowed));
    eventSelect.disabled = !allowed;
    if (!allowed) {
      eventSelect.innerHTML = `<option value="">Grupo sem permissão</option>`;
      newEventPanel.hidden = true;
      updateReservationSubmitState();
      return;
    }
    const events = state.groupEvents.filter((event) => event.groupId === group.id && event.published);
    eventSelect.innerHTML = `<option value="__new__">Criar novo evento com esta reserva</option>${events.map((event) => `<option value="${esc(event.id)}">${esc(event.title)} · ${esc(event.date)} ${esc(event.time)}</option>`).join("")}`;
    eventSelect.value = "__new__";
    newEventTitle.value = selectedReservation ? defaultEventTitle(selectedReservation) : "";
    updateNewEventPanel();
  }

  function updateNewEventPanel() {
    const createsNew = eventSelect.value === "__new__";
    newEventPanel.hidden = !createsNew;
    if (createsNew && !newEventTitle.value && selectedReservation) newEventTitle.value = defaultEventTitle(selectedReservation);
    reservationAutomationPreview.classList.toggle("existing-event", !createsNew);
    const lastStep = reservationAutomationPreview.querySelector(".automation-step:last-child small");
    if (lastStep) lastStep.textContent = createsNew ? "Evento publicado e push enviado automaticamente" : "Reserva vinculada ao evento já publicado";
    updateReservationSubmitState();
  }

  function updateReservationSubmitState() {
    const group = userGroup(groupSelect.value);
    const validGroup = canManageGroupEvents(group);
    const validEvent = Boolean(eventSelect.value) && (eventSelect.value !== "__new__" || newEventTitle.value.trim());
    const validPolicy = Boolean(reservationPolicyAcknowledge?.checked);
    const submit = document.getElementById("confirmReservation");
    if (submit) submit.disabled = !(validGroup && validEvent && validPolicy);
  }

  function publishStandbyEventForReservation(reservation, publicationEndpoint = "event.publish_after_payment") {
    if (reservation.eventMode !== "new" || !reservation.eventId) return false;
    const linkedEvent = state.groupEvents.find((event) => event.id === reservation.eventId);
    if (!linkedEvent || linkedEvent.statusKey !== "standby_payment") return false;
    const group = userGroup(reservation.groupId);
    linkedEvent.statusKey = "published";
    linkedEvent.status = "Publicado";
    linkedEvent.published = true;
    linkedEvent.publishedAt = new Date().toLocaleString("pt-BR");
    linkedEvent.publicationEndpoint = publicationEndpoint;
    linkedEvent.pushStatus = "Enviado";
    linkedEvent.pushEndpoint = "push.group_members";
    reservation.eventPublicationStatus = "published";
    reservation.pushStatus = "Enviado";
    reservation.automationEndpoint = publicationEndpoint;
    state.pushLog.unshift({
      id: nextId("PUSH-", state.pushLog),
      groupId: reservation.groupId,
      groupName: reservation.groupName,
      eventId: reservation.eventId,
      eventTitle: reservation.event,
      recipients: Math.max(0, Number(group?.memberCount || 1) - 1),
      endpoint: "push.group_members",
      status: "Enviado",
      createdAt: linkedEvent.publishedAt
    });
    return true;
  }

  function cancellationSourceLabel(source) {
    return source === "partner" ? "Parceiro" : source === "tamo" ? "Tâmo On" : "Usuário";
  }

  function cancellationImpacts(source, mode) {
    const common = [
      "O horário cancelado será liberado imediatamente para uma nova reserva.",
      "O evento criado ou vinculado será cancelado e os membros do grupo serão comunicados.",
      "A operação e o motivo permanecerão registrados no histórico."
    ];
    if (mode === "voucher") return [
      `Será emitido um voucher de uso único no valor integral pago, com prazo nominal de ${state.settings.voucherValidityDays} dias.`,
      "O voucher poderá ser utilizado em qualquer novo dia ou horário disponível do mesmo parceiro, em reserva de valor igual ou superior.",
      `Para o prazo expirar normalmente, o parceiro deverá oferecer ao menos ${state.settings.voucherMinimumCompatibleDates} datas distintas em faixa compatível de até ${state.settings.voucherCompatibilityWindowHours} horas antes ou depois do horário original e no mesmo período do dia.`,
      "Horários apenas pela manhã ou tarde não contam como disponibilidade compatível para um voucher originado à noite.",
      "Se a disponibilidade compatível for insuficiente, a validade será prorrogada automaticamente.",
      "Ao utilizar o voucher, todo o crédito será consumido; eventual diferença deverá ser paga no app.",
      ...common,
      "O pagamento original permanece contabilizado no mês em que ocorreu; somente eventual complemento futuro gera nova obrigação fiscal e contábil."
    ];
    if (mode === "refund") return [
      "O usuário receberá reembolso integral do valor pago.",
      `${cancellationSourceLabel(source)} assumirá integralmente taxas, custos de transação, cancelamento e reembolso, sem prejuízo ao usuário, às demais partes ou ao Asaas.`,
      "Nenhum voucher será gerado.",
      ...common
    ];
    return [
      `O cancelamento ocorre fora do prazo de ${state.settings.cancellationHours} horas.`,
      "Não haverá reembolso nem geração de voucher.",
      "Situações excepcionais poderão ser submetidas à análise conjunta do Tâmo On e do parceiro, sem concessão automática.",
      ...common,
      "O pagamento original permanece contabilizado conforme a operação já realizada."
    ];
  }

  function openPaidCancellation(source, reservationId, partnerReservationId = "") {
    const reservation = reservationId ? state.reservations.find((item) => item.id === reservationId) : null;
    const partnerReservation = partnerReservationId ? state.partnerReservations.find((item) => item.id === partnerReservationId) : state.partnerReservations.find((item) => item.userReservationId === reservationId);
    if (!reservation && !partnerReservation) return;
    const effectiveReservation = reservation || state.reservations.find((item) => item.id === partnerReservation?.userReservationId);
    const eligibility = cancellationEligibility(effectiveReservation, source);
    const mode = eligibility.mode;
    selectedCancellation = { source, mode, reservationId: effectiveReservation?.id || "", partnerReservationId: partnerReservation?.id || partnerReservationId, outsideDeadline: mode === "no_compensation" };
    cancellationEyebrow.textContent = `Cancelamento pelo ${cancellationSourceLabel(source)}`;
    cancellationTitle.textContent = mode === "voucher" ? "Cancelar e gerar voucher" : mode === "refund" ? "Cancelar com reembolso integral" : "Cancelar fora do prazo";
    cancellationSummary.innerHTML = `<strong>${esc(effectiveReservation?.venue || partnerReservation?.space || "Reserva")}</strong><div class="meta-row" style="margin-top:7px"><span>${esc(effectiveReservation?.date || partnerReservation?.date || "")}</span><span>${esc(effectiveReservation?.time || partnerReservation?.time || "")}</span><span>${money(effectiveReservation?.value || partnerReservation?.value || 0)}</span></div>`;
    cancellationWarningText.textContent = mode === "voucher" ? "O usuário está dentro do prazo e receberá voucher conforme a política aceita antes do pagamento." : mode === "refund" ? "Quem efetua este cancelamento assume o reembolso integral e todos os custos decorrentes." : "O prazo regular foi encerrado. O cancelamento será concluído sem reembolso ou voucher.";
    cancellationImpactList.innerHTML = cancellationImpacts(source, mode).map((item) => `<li>${esc(item)}</li>`).join("");
    cancellationReasonLabel.textContent = source === "user" ? "Motivo do cancelamento" : "Justificativa obrigatória ao usuário";
    cancellationReason.placeholder = source === "user" ? "Informe brevemente o motivo do cancelamento." : `Explique por que ${cancellationSourceLabel(source)} precisa cancelar este horário já reservado e pago.`;
    cancellationReason.value = "";
    cancellationAcknowledge.checked = false;
    cancellationAcknowledgeText.textContent = mode === "voucher" ? "Estou ciente de que o horário e o evento serão cancelados e o valor pago será convertido em voucher conforme as regras de disponibilidade compatível." : mode === "refund" ? "Confirmo o reembolso integral e a responsabilidade do cancelador por todas as taxas e custos, sem desconto para o usuário." : "Estou ciente de que este cancelamento fora do prazo não gera reembolso nem voucher.";
    cancellationSubmit.textContent = mode === "voucher" ? "Cancelar e gerar voucher" : mode === "refund" ? "Cancelar e reembolsar integralmente" : "Cancelar sem reembolso ou voucher";
    cancellationDialog.showModal();
    focusDialog(cancellationDialog);
  }

  function cancelLinkedEventAndNotify(reservation, source, now) {
    const linkedEvent = reservation?.eventId ? state.groupEvents.find((event) => event.id === reservation.eventId) : null;
    if (linkedEvent) Object.assign(linkedEvent, { statusKey: "cancelled", status: "Cancelado", published: false, publicationEndpoint: `${source}.reservation.cancelled`, pushStatus: "Cancelamento comunicado" });
    const group = reservation ? userGroup(reservation.groupId) : null;
    if (reservation?.groupId) state.pushLog.unshift({ id: nextId("PUSH-", state.pushLog), groupId: reservation.groupId, groupName: reservation.groupName, eventId: reservation.eventId, eventTitle: reservation.event, recipients: Math.max(0, Number(group?.memberCount || 1) - 1), endpoint: "push.group_cancellation", status: "Enviado", createdAt: now });
  }

  function completePaidCancellation({ source, mode, reservationId, partnerReservationId, reason, outsideDeadline }) {
    const reservation = reservationId ? state.reservations.find((item) => item.id === reservationId) : null;
    const partnerReservation = partnerReservationId ? state.partnerReservations.find((item) => item.id === partnerReservationId) : state.partnerReservations.find((item) => item.userReservationId === reservationId);
    const nowDate = new Date();
    const now = nowDate.toLocaleString("pt-BR");
    const value = Number(reservation?.value || partnerReservation?.value || 0);
    const venueId = reservation?.venueId || state.partnerProfile.venueId;
    const venueName = reservation?.venue || state.venues.find((venue) => venue.id === venueId)?.name || state.partnerProfile.tradeName;
    const cancellationId = nextId("CAN-", state.cancellationLog);
    let voucher = null;
    let endpoint = "";
    let paymentStatus = "";
    if (mode === "voucher") {
      const voucherId = nextId("VC-", state.cancellationVouchers);
      const voucherCode = `CANCELA-${voucherId.replace(/\D/g, "")}`;
      const expiresAtDate = new Date(nowDate);
      expiresAtDate.setDate(expiresAtDate.getDate() + Number(state.settings.voucherValidityDays || 30));
      const originalTime = reservation?.time || partnerReservation?.time || "20:00";
      const window = voucherCompatibleWindow(originalTime);
      voucher = { id: voucherId, code: voucherCode, sourceReservationId: reservation?.id || "", partnerReservationId: partnerReservation?.id || "", user: reservation?.user || state.userProfile.name, venueId, venue: venueName, value, originalValue: value, originalTime, originalPeriod: timePeriod(originalTime), compatibilityWindow: `${minutesToTime(window.start)}–${minutesToTime(window.end)}`, minimumCompatibleDates: Number(state.settings.voucherMinimumCompatibleDates || 4), status: "active", issuedAt: now, issuedDate: formatPtDate(nowDate), expiresAt: formatPtDate(expiresAtDate), validityDays: Number(state.settings.voucherValidityDays || 30), useType: "single", minimumReservationValue: value, partnerLiability: true, accountingOriginMonth: reservation?.accountingMonth || accountingMonth(nowDate), accountingTreatment: "Pagamento original mantido; resgate sem nova obrigação, salvo complemento", cancellationSource: source, cancellationReason: reason, reassignmentStatus: "Vinculado ao parceiro original" };
      refreshVoucherAvailability(voucher);
      state.cancellationVouchers.unshift(voucher);
      endpoint = "user.reservation.cancelled_with_voucher";
      paymentStatus = "Pago — convertido em voucher";
      state.accountingLedger.unshift({ id: nextId("LED-", state.accountingLedger), type: "voucher_issued", reservationId: reservation?.id || "", voucherId, venueId, venue: venueName, amount: value, fiscalAmount: 0, accountingMonth: reservation?.accountingMonth || accountingMonth(nowDate), description: "Voucher emitido sem reversão do pagamento original" });
    } else if (mode === "refund") {
      endpoint = source === "partner" ? "partner.reservation.cancelled_with_full_refund" : "tamo_on.reservation.cancelled_with_full_refund";
      paymentStatus = "Reembolso integral confirmado — simulado";
      state.accountingLedger.unshift({ id: nextId("LED-", state.accountingLedger), type: "full_refund", reservationId: reservation?.id || "", venueId, venue: venueName, amount: value, fiscalAmount: 0, accountingMonth: accountingMonth(nowDate), responsible: source, feeResponsibility: source, description: `Reembolso integral; taxas e custos suportados por ${cancellationSourceLabel(source)}` });
    } else {
      endpoint = "user.reservation.cancelled_outside_deadline";
      paymentStatus = "Pago — sem reembolso ou voucher";
    }
    if (reservation) Object.assign(reservation, { statusKey: "cancelled", status: mode === "voucher" ? "Cancelada com voucher" : mode === "refund" ? "Cancelada com reembolso integral" : "Cancelada fora do prazo", endpoint, paymentStatus, voucherGeneratedId: voucher?.id || "", voucherGeneratedCode: voucher?.code || "", cancellationSource: source, cancellationMode: mode, cancellationReason: reason, cancelledAt: now, slotReleased: true, refundValue: mode === "refund" ? value : 0, refundStatus: mode === "refund" ? "confirmed" : "not_applicable", refundFeePayer: mode === "refund" ? source : "", outsideDeadline: Boolean(outsideDeadline), pushStatus: "Cancelamento comunicado", eventPublicationStatus: "cancelled" });
    if (partnerReservation) Object.assign(partnerReservation, { status: "Cancelada", payment: mode === "voucher" ? "Pago — voucher emitido" : mode === "refund" ? "Reembolso integral — simulado" : "Pago — sem compensação", cancellationSource: source, cancellationMode: mode, cancellationReason: reason, voucherGeneratedId: voucher?.id || "", voucherGeneratedCode: voucher?.code || "", voucherStatus: voucher ? voucherStatusLabel(voucher) : "Não emitido", refundValue: mode === "refund" ? value : 0, refundFeePayer: mode === "refund" ? source : "", cancelledAt: now });
    cancelLinkedEventAndNotify(reservation, source, now);
    state.cancellationLog.unshift({ id: cancellationId, source, mode, reservationId: reservation?.id || "", partnerReservationId: partnerReservation?.id || "", reason, voucherId: voucher?.id || "", voucherCode: voucher?.code || "", refundValue: mode === "refund" ? value : 0, feeResponsibility: mode === "refund" ? source : "", outsideDeadline: Boolean(outsideDeadline), slotReleased: true, eventId: reservation?.eventId || partnerReservation?.eventId || "", createdAt: now });
    saveState();
    render();
    showToast(mode === "voucher" ? "Reserva cancelada; voucher gerado e horário liberado." : mode === "refund" ? "Reserva cancelada com reembolso integral simulado." : "Reserva cancelada fora do prazo, sem reembolso ou voucher.");
  }

  function focusDialog(dialog) {
    if (!allowAutomaticFieldFocus) return;
    requestAnimationFrame(() => dialog?.focus({ preventScroll: true }));
  }

  function fieldMarkup(field) {
    const required = field.required ? "required" : "";
    const full = field.full ? " full" : "";
    const help = field.help ? `<small class="field-help">${esc(field.help)}</small>` : "";
    let control = "";
    if (field.type === "select") {
      control = `<select name="${esc(field.name)}" ${required}>${field.options.map((option) => {
        const optionValue = typeof option === "object" ? option.value : option;
        const optionLabel = typeof option === "object" ? option.label : option;
        return `<option value="${esc(optionValue)}" ${String(optionValue) === String(field.value ?? "") ? "selected" : ""}>${esc(optionLabel)}</option>`;
      }).join("")}</select>`;
    } else if (field.type === "textarea") {
      control = `<textarea name="${esc(field.name)}" ${required}>${esc(field.value ?? "")}</textarea>`;
    } else {
      control = `<input type="${esc(field.type || "text")}" name="${esc(field.name)}" value="${esc(field.value ?? "")}" ${field.min !== undefined ? `min="${esc(field.min)}"` : ""} ${field.max !== undefined ? `max="${esc(field.max)}"` : ""} ${field.step !== undefined ? `step="${esc(field.step)}"` : ""} ${required}>`;
    }
    return `<label class="field${full}"><span>${esc(field.label)}</span>${control}${help}</label>`;
  }

  function openForm({ eyebrow = "Editar dados", title, description = "", submitLabel = "Salvar", fields, onSubmit }) {
    formEyebrow.textContent = eyebrow;
    formTitle.textContent = title;
    formDescription.textContent = description;
    formDescription.hidden = !description;
    formSubmit.textContent = submitLabel;
    formFields.innerHTML = fields.map(fieldMarkup).join("");
    formHandler = onSubmit;
    formDialog.showModal();
    if (allowAutomaticFieldFocus) setTimeout(() => formFields.querySelector("input,select,textarea")?.focus({ preventScroll: true }), 30);
  }

  function openDetail({ eyebrow = "Detalhes", title, body }) {
    detailEyebrow.textContent = eyebrow;
    detailTitle.textContent = title;
    detailBody.innerHTML = body;
    if (!detailDialog.open) {
      detailDialog.showModal();
      focusDialog(detailDialog);
    }
  }

  function askConfirm({ title, message, confirmLabel = "Confirmar", onConfirm }) {
    confirmTitle.textContent = title;
    confirmMessage.textContent = message;
    confirmSubmit.textContent = confirmLabel;
    confirmHandler = onConfirm;
    confirmDialog.showModal();
    focusDialog(confirmDialog);
  }

  function exportCsv(filename, rows) {
    const escapeCsv = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
    const csv = `\uFEFF${rows.map((row) => row.map(escapeCsv).join(";")).join("\r\n")}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("Arquivo CSV gerado com os dados fictícios atuais.");
  }

  function setRole(role) {
    state.role = role;
    saveState();
    roleButtons.forEach((button) => button.classList.toggle("active", button.dataset.role === role));
    render();
  }

  function nav(role, page) {
    state.activePage[role] = page;
    saveState();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navShell(role, content) {
    const menu = menus[role];
    return `
      <div class="role-layout">
        <nav class="subnav" aria-label="Menu da área ${role}">
          <div class="subnav-title">Navegação</div>
          ${menu.map(([id, icon, label]) => `<button type="button" class="subnav-button ${state.activePage[role] === id ? "active" : ""}" data-nav="${id}"><span class="subnav-icon">${icon}</span>${label}</button>`).join("")}
        </nav>
        <section class="content">${content}</section>
      </div>`;
  }

  function pageHeader(eyebrow, title, description, actions = "") {
    return `<header class="page-header"><div><span class="eyebrow">${esc(eyebrow)}</span><h1>${esc(title)}</h1><p>${esc(description)}</p></div>${actions ? `<div class="page-actions">${actions}</div>` : ""}</header>`;
  }

  function stat(value, label, note = "") {
    return `<div class="stat"><strong>${esc(value)}</strong><span>${esc(label)}</span>${note ? `<div class="kpi-note">${esc(note)}</div>` : ""}</div>`;
  }

  function emptyState(icon, text) {
    return `<div class="empty-state"><div class="empty-icon">${icon}</div>${esc(text)}</div>`;
  }

  function findReservationForSlot(venueId, time, shortDate) {
    return state.reservations.find((reservation) => reservation.venueId === venueId && reservation.time === time && reservation.shortDate === shortDate && reservation.statusKey !== "cancelled");
  }

  function venueCard(venue) {
    const favorite = state.favorites.includes(venue.id);
    return `<article class="venue-card compact-venue-card">
      <div class="venue-card-media">
        <img class="venue-card-photo" src="${esc(venue.facadeImage)}" alt="Fachada de ${esc(venue.name)}" loading="lazy">
        <div class="venue-card-shade"></div>
        <div class="venue-card-top">
          <div class="venue-card-top-text">
            <div class="venue-title-row"><h2>${esc(venue.name)}</h2><span class="rating-inline" title="Nota calculada pelas avaliações dos usuários">★ ${esc(venue.rating)}</span></div>
            <div class="venue-location"><span>${esc(venue.city)}</span><span>${esc(venue.neighborhood)}</span><strong>${esc(venue.distance)}</strong></div>
          </div>
          <button type="button" class="favorite-button ${favorite ? "active" : ""}" data-action="toggle-favorite" data-id="${esc(venue.id)}" aria-label="${favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}">${favorite ? "♥" : "♡"}</button>
        </div>
      </div>
      <div class="venue-card-base">
        <span class="venue-types-note">${esc(venue.types.join(" · "))}</span>
        <button type="button" class="button primary small" data-action="venue-details" data-id="${esc(venue.id)}">Ver espaço</button>
      </div>
    </article>`;
  }

  function userDiscover() {
    const filtered = state.venues.filter((venue) => `${venue.name} ${venue.city}`.toLowerCase().includes(state.search.venue.toLowerCase()));
    const activePromotions = state.promotions.filter((item) => item.active).length;
    return `<div class="discover-toolbar"><label class="search discover-search"><span>⌕</span><input id="venueSearch" value="${esc(state.search.venue)}" placeholder="Buscar por quadra ou cidade" aria-label="Buscar por quadra ou cidade"></label><button class="promo-menu-button" data-nav="promotions"><span class="promo-menu-icon">%</span><span><strong>Promoções</strong><small>${activePromotions} ofertas disponíveis</small></span><b>›</b></button></div>
      ${pageHeader("Área do usuário", "Buscar quadras", "Selecione um local para consultar a agenda, os horários e os valores cadastrados pelo parceiro.")}
      <section class="grid venue-grid">${filtered.map(venueCard).join("") || emptyState("⌕", "Nenhuma quadra encontrada para essa busca.")}</section>`;
  }

  function userReservations() {
    const allReservations = state.reservations.filter((item) => item.user === state.userProfile.name || item.id === "R-0007");
    const pending = allReservations.filter((item) => item.statusKey === "pending").length;
    const confirmed = allReservations.filter((item) => item.statusKey === "confirmed").length;
    const cancelled = allReservations.filter((item) => item.statusKey === "cancelled").length;
    const filter = state.filters.userReservationStatus || "Todas";
    const filterMap = { Pendentes: "pending", Confirmadas: "confirmed", Canceladas: "cancelled" };
    const visibleReservations = filter === "Todas" ? allReservations : allReservations.filter((item) => item.statusKey === filterMap[filter]);
    return `${pageHeader("Área do usuário", "Minhas reservas", "Acompanhe reservas atuais e consulte o histórico sem ocupar a agenda com horários cancelados.", `<button class="button primary small" data-nav="discover">Nova reserva</button>`)}
      <section class="reservation-overview" aria-label="Resumo das reservas"><span><strong>${allReservations.length}</strong> total</span><span class="pending"><strong>${pending}</strong> pendentes</span><span class="confirmed"><strong>${confirmed}</strong> confirmadas</span><span class="cancelled"><strong>${cancelled}</strong> canceladas</span></section>
      <div class="reservation-toolbar"><label class="compact-filter"><span>Mostrar</span><select id="userReservationFilter"><option>Todas</option><option>Pendentes</option><option>Confirmadas</option><option>Canceladas</option></select></label></div>
      <section class="reservation-list">${visibleReservations.map((reservation) => {
        const visual = reservationStatus(reservation.statusKey);
        const badge = reservationDateBadge(reservation.date);
        const eventVisual = eventPublicationLabel(reservation.eventPublicationStatus);
        return `<article class="reservation-card"><div class="reservation-date"><strong>${esc(badge.day)}</strong><span>${esc(badge.month)}</span></div><div class="reservation-card-main"><div class="reservation-card-heading"><div><h2>${esc(reservation.venue)}</h2><p>${esc(reservation.time)} · ${money(reservation.value)}</p></div><span class="status ${visual.status}">${visual.label}</span></div><div class="reservation-group-line"><strong>${esc(reservation.groupName || "Grupo não informado")}</strong><span>${esc(reservation.groupRole || "")}</span></div><div class="reservation-card-meta"><span>${esc(reservation.event || "Evento não informado")}</span><span class="status ${eventVisual.className}">${eventVisual.label}</span></div><div class="reservation-card-actions"><button class="button ghost small" data-action="reservation-details" data-id="${esc(reservation.id)}">Detalhes</button>${reservation.statusKey === "pending" ? `<button class="button secondary small" data-action="reservation-status" data-id="${esc(reservation.id)}" data-status="confirmed">Simular pagamento</button><button class="button danger small" data-action="reservation-status" data-id="${esc(reservation.id)}" data-status="cancelled">Cancelar</button>` : reservation.statusKey === "confirmed" ? `<button class="button danger small" data-action="cancel-paid-user-reservation" data-id="${esc(reservation.id)}">Cancelar reserva</button>` : reservation.statusKey === "cancelled" && reservation.outsideDeadline && !reservation.exceptionReviewId ? `<button class="button ghost small" data-action="request-cancellation-exception" data-id="${esc(reservation.id)}">Solicitar análise excepcional</button>` : ""}</div></div></article>`;
      }).join("") || emptyState("▣", "Nenhuma reserva encontrada neste filtro.")}</section>`;
  }

  function userFavorites() {
    const favoriteVenues = state.venues.filter((venue) => state.favorites.includes(venue.id));
    return `${pageHeader("Área do usuário", "Favoritos", "Acesse rapidamente os locais que você marcou.", `<button class="button ghost" data-nav="discover">Buscar mais quadras</button>`)}<section class="grid">${favoriteVenues.map(venueCard).join("") || emptyState("♡", "Nenhuma quadra foi adicionada aos favoritos.")}</section>`;
  }

  function userPromotions() {
    activeCancellationVouchers();
    const vouchers = state.cancellationVouchers.filter((voucher) => voucher.user === state.userProfile.name);
    return `${pageHeader("Área do usuário", "Promoções e vouchers", "Consulte promoções e créditos gerados por cancelamentos elegíveis.")}
      <section class="section"><div class="section-heading"><div><h2>Vouchers de cancelamento</h2><p>Uso único, no mesmo parceiro, em nova reserva de valor igual ou superior.</p></div></div><div class="grid two">${vouchers.map((voucher) => `<article class="card voucher-card"><div class="section-heading"><div><span class="status ${["active", "active_extended"].includes(voucher.status) ? "status-ok" : voucher.status === "reserved" ? "status-warning" : "status-neutral"}">${esc(voucherStatusLabel(voucher))}</span><h3>${esc(voucher.code)}</h3></div><strong class="voucher-value">${money(voucher.value)}</strong></div><div class="detail-list"><div class="detail-line"><span>Parceiro</span><strong>${esc(voucher.venue)}</strong></div><div class="detail-line"><span>Validade atual</span><strong>${esc(voucher.expiresAt)}</strong></div><div class="detail-line"><span>Regra de uso</span><strong>Reserva de ${money(voucher.minimumReservationValue)} ou mais</strong></div><div class="detail-line"><span>Uso</span><strong>Integral e único</strong></div><div class="detail-line"><span>Horário original</span><strong>${esc(voucher.originalTime || "—")} · ${esc(voucher.originalPeriod || "—")}</strong></div><div class="detail-line"><span>Faixa compatível</span><strong>${esc(voucher.compatibilityWindow || "—")}</strong></div><div class="detail-line"><span>Datas compatíveis</span><strong>${esc(voucher.compatibleDatesCount || 0)} de ${esc(voucher.minimumCompatibleDates || state.settings.voucherMinimumCompatibleDates)}</strong></div>${voucher.extensionReason ? `<div class="detail-line"><span>Prorrogação</span><strong>${esc(voucher.extensionReason)}</strong></div>` : ""}${voucher.reassignedFrom ? `<div class="detail-line"><span>Realocação</span><strong>${esc(voucher.reassignmentStatus)}</strong></div>` : ""}</div></article>`).join("") || emptyState("%", "Nenhum voucher de cancelamento foi gerado para este usuário.")}</div></section>
      <section class="section"><div class="section-heading"><div><h2>Promoções</h2><p>Ofertas demonstrativas independentes dos vouchers de cancelamento.</p></div></div><div class="grid">${state.promotions.map((promo) => `<article class="card"><span class="status ${promo.active ? "status-ok" : "status-neutral"}">${promo.active ? "Disponível" : "Encerrada"}</span><h3>${esc(promo.title)}</h3><p class="meta-row"><span>${esc(promo.venue)}</span><span>Até ${esc(promo.validUntil)}</span></p><div class="promo-code"><div><strong>${esc(promo.code)}</strong><div class="meta-row">${esc(promo.benefit)}</div></div><button class="button ${state.appliedVouchers.includes(promo.code) ? "ghost" : "secondary"} small" data-action="apply-voucher" data-code="${esc(promo.code)}">${state.appliedVouchers.includes(promo.code) ? "Aplicado" : "Aplicar"}</button></div></article>`).join("")}</div></section>`;
  }

  function userProfile() {
    const profile = state.userProfile;
    const permittedGroups = state.userGroups.filter((group) => group.canCreateEvents && group.canEditEvents);
    return `${pageHeader("Área do usuário", "Conta Tâmo On", "O marketplace reutiliza o perfil principal do aplicativo. Nenhum dado pessoal precisa ser preenchido novamente nesta área.", `<button class="button secondary" data-action="sync-main-profile">Sincronizar agora</button><button class="button ghost" data-action="manage-main-profile">Gerenciar no Tâmo On</button>`)}
      <section class="profile-sync-banner" role="status">
        <div class="profile-avatar" aria-hidden="true">${initials(profile.name)}</div>
        <div><span class="eyebrow">Perfil único</span><h2>${esc(profile.name)}</h2><p>Dados centrais compartilhados entre Grupos, Marketplace e demais áreas autorizadas.</p></div>
        <span class="status status-ok">${esc(profile.centralProfileStatus)}</span>
      </section>
      <section class="details-grid">
        <article class="detail-group"><div class="section-heading"><div><h3>Conta Google</h3><p>Identidade fornecida pelo login vinculado.</p></div><span class="source-badge">Google</span></div><div class="detail-list"><div class="detail-line"><span>Nome</span><strong>${esc(profile.name)}</strong></div><div class="detail-line"><span>E-mail</span><strong>${esc(profile.email)}</strong></div><div class="detail-line"><span>Origem</span><strong>${esc(profile.accountSource)}</strong></div></div></article>
        <article class="detail-group"><div class="section-heading"><div><h3>Dados complementares</h3><p>Preenchidos uma única vez no perfil principal.</p></div><span class="source-badge">Tâmo On</span></div><div class="detail-list"><div class="detail-line"><span>Telefone</span><strong>${esc(profile.phone)}</strong></div><div class="detail-line"><span>Cidade</span><strong>${esc(profile.city)}</strong></div><div class="detail-line"><span>Notificações</span><strong>${esc(profile.notification)}</strong></div><div class="detail-line"><span>Horário preferido</span><strong>${esc(profile.preferredTime)}</strong></div></div></article>
      </section>
      <section class="card profile-permissions"><div class="section-heading"><div><h2>Permissões utilizadas pelo marketplace</h2><p>Reservas com eventos usam as permissões já existentes em cada grupo.</p></div></div><div class="list">${state.userGroups.map((group) => `<div class="list-item compact"><div class="avatar">${initials(group.name)}</div><div class="list-item-main"><strong>${esc(group.name)}</strong><small>${esc(group.role)} · ${esc(group.memberCount)} membros</small></div><span class="status ${group.canCreateEvents && group.canEditEvents ? "status-ok" : "status-neutral"}">${group.canCreateEvents && group.canEditEvents ? "Pode criar eventos" : "Sem permissão"}</span></div>`).join("")}</div><div class="profile-sync-footer"><span>Última sincronização: <strong>${esc(profile.lastSync)}</strong></span><span>${permittedGroups.length} grupo(s) habilitado(s) para reservas com eventos</span></div></section>`;
  }

  function userView() {
    const page = state.activePage.user;
    const views = { discover: userDiscover, reservations: userReservations, favorites: userFavorites, promotions: userPromotions, profile: userProfile };
    return navShell("user", (views[page] || userDiscover)());
  }

  function partnerOverview() {
    const confirmed = state.partnerReservations.filter((item) => item.status === "Confirmada").length;
    const pending = state.partnerReservations.filter((item) => item.status === "Pendente").length;
    const activeSpaces = state.partnerSpaces.filter((item) => item.status === "Ativo").length;
    const gross = state.partnerReservations.filter((item) => item.status === "Confirmada").reduce((sum, item) => sum + item.value, 0);
    return `${pageHeader("Portal do parceiro", "Visão geral", "Atalhos objetivos para a operação diária da Arena Central.", `<button class="button primary" data-action="new-block">Bloquear horário</button><button class="button ghost" data-action="new-partner-reservation">Nova reserva manual</button>`)}
      <section class="stats-grid">${stat(confirmed, "confirmadas", "+1 nesta semana")}${stat(pending, "pendentes")}${stat(activeSpaces, "espaços ativos")}${stat(money(gross), "reservas confirmadas")}</section>
      <section class="grid two">
        <article class="card"><div class="section-heading"><div><h2>Próximos horários</h2><p>Agenda de 06/08/2026</p></div><button class="button ghost small" data-nav="agenda">Ver agenda</button></div><div class="list">${state.partnerAgenda.filter((item) => item.day === 6).slice(0,3).map((item) => `<div class="list-item"><div class="avatar">${esc(item.time.slice(0,2))}</div><div class="list-item-main"><strong>${esc(item.title)}</strong><small>${esc(item.time)} · ${esc(item.space)} · ${esc(item.detail)}</small></div><span class="status ${item.type === "confirmed" ? "status-ok" : item.type === "pending" ? "status-warning" : "status-neutral"}">${item.type === "confirmed" ? "Confirmado" : item.type === "pending" ? "Pendente" : "Bloqueio"}</span></div>`).join("")}</div></article>
        <article class="card"><div class="section-heading"><div><h2>Cadastro do parceiro</h2><p>Completude dos dados</p></div><button class="button ghost small" data-nav="registration">Revisar</button></div><div class="progress"><span style="width:88%"></span></div><div class="meta-row" style="margin-top:10px"><span>Dados cadastrais completos</span><span>Dados bancários em conferência</span></div><div class="callout" style="margin-top:14px"><strong>Próxima pendência</strong><p>Confirmar a titularidade da conta bancária antes da futura criação da subconta.</p></div></article>
      </section>`;
  }

  function partnerAgenda() {
    const days = [["SEG",3],["TER",4],["QUA",5],["QUI",6],["SEX",7],["SÁB",8],["DOM",9]];
    const items = state.partnerAgenda.filter((item) => item.day === state.partnerDay).sort((a,b) => a.time.localeCompare(b.time));
    return `${pageHeader("Portal do parceiro", "Agenda", "Consulte reservas e bloqueios por dia. Todos os registros podem ser abertos ou alterados.", `<button class="button primary" data-action="new-block">Novo bloqueio</button><button class="button ghost" data-action="new-partner-reservation">Reserva manual</button>`)}
      <section class="card"><div class="calendar-strip">${days.map(([label,day]) => `<button class="day ${day === state.partnerDay ? "active" : ""}" data-action="partner-day" data-day="${day}"><small>${label}</small><strong>${day}</strong></button>`).join("")}</div><div class="timeline">${items.map((item) => `<div class="timeline-row"><div class="timeline-time">${esc(item.time)}</div><div class="timeline-event ${item.type === "pending" ? "warning" : item.type === "blocked" ? "blocked" : ""}"><strong>${esc(item.title)}</strong><div class="meta-row"><span>${esc(item.space)}</span><span>${esc(item.detail)}</span></div></div><div class="item-actions"><button class="button ghost small" data-action="agenda-details" data-id="${esc(item.id)}">Abrir</button><button class="button ghost small" data-action="edit-agenda" data-id="${esc(item.id)}">Editar</button></div></div>`).join("") || emptyState("▦", "Nenhum compromisso para o dia selecionado.")}</div></section>`;
  }

  function partnerReservations() {
    const filter = state.filters.partnerReservationStatus;
    const items = state.partnerReservations.filter((item) => filter === "Todos" || item.status === filter);
    return `${pageHeader("Portal do parceiro", "Reservas", "Aceite solicitações, registre reservas manuais e acompanhe os pagamentos externos.", `<button class="button primary" data-action="new-partner-reservation">Nova reserva manual</button>`)}
      <div class="toolbar"><select class="filter-select" id="partnerReservationFilter"><option>Todos</option><option>Pendente</option><option>Confirmada</option><option>Cancelada</option></select><button class="button ghost" data-action="export-partner-reservations">Exportar CSV</button></div>
      <div class="table-wrap"><table><thead><tr><th>Reserva</th><th>Cliente</th><th>Data e hora</th><th>Espaço</th><th>Valor</th><th>Status</th><th>Ações</th></tr></thead><tbody>${items.map((item) => `<tr><td>${esc(item.id)}</td><td>${esc(item.client)}</td><td>${esc(item.date)} · ${esc(item.time)}</td><td>${esc(item.space)}</td><td>${money(item.value)}</td><td><span class="status ${statusClass(item.status)}">${esc(item.status)}</span></td><td><div class="item-actions"><button class="button ghost small" data-action="partner-reservation-details" data-id="${esc(item.id)}">Detalhes</button>${item.status === "Pendente" ? `<button class="button secondary small" data-action="partner-reservation-status" data-id="${esc(item.id)}" data-status="Confirmada">Aceitar</button><button class="button danger small" data-action="partner-reservation-status" data-id="${esc(item.id)}" data-status="Cancelada">Recusar</button>` : item.status === "Confirmada" && item.payment === "Pago via Asaas" ? `<button class="button danger small" data-action="cancel-paid-partner-reservation" data-id="${esc(item.id)}">Cancelar e reembolsar</button>` : ""}</div></td></tr>`).join("")}</tbody></table></div>`;
  }

  function partnerSpaces() {
    return `${pageHeader("Portal do parceiro", "Espaços", "Cadastre o tipo de cada quadra ou local, estrutura, capacidade, preço e disponibilidade.", `<button class="button primary" data-action="new-space">Cadastrar espaço</button>`)}
      <section class="grid two">${state.partnerSpaces.map((space) => `<article class="card"><div class="section-heading"><div><span class="status ${statusClass(space.status)}">${esc(space.status)}</span><h2 style="margin-top:9px">${esc(space.name)}</h2><p>${esc(space.type)} · ${esc(space.floor)}</p></div></div><div class="details-grid"><div class="detail-line"><span>Capacidade</span><strong>${esc(space.capacity)} pessoas</strong></div><div class="detail-line"><span>Preço-base</span><strong>${money(space.price)}</strong></div><div class="detail-line"><span>Iluminação</span><strong>${esc(space.lights)}</strong></div><div class="detail-line"><span>Coberta</span><strong>${esc(space.covered)}</strong></div></div><div class="price-row"><div class="meta-row"><span>Manutenção: ${esc(space.maintenance)}</span></div><div class="item-actions"><button class="button ghost small" data-action="edit-space" data-id="${esc(space.id)}">Editar</button><button class="button ${space.status === "Ativo" ? "danger" : "secondary"} small" data-action="toggle-space" data-id="${esc(space.id)}">${space.status === "Ativo" ? "Desativar" : "Ativar"}</button></div></div></article>`).join("")}</section>`;
  }

  function partnerClients() {
    return `${pageHeader("Portal do parceiro", "Clientes", "Histórico de grupos e responsáveis que já utilizaram os espaços.", `<button class="button primary" data-action="new-client">Cadastrar cliente</button>`)}
      <section class="card"><div class="list">${state.partnerClients.map((client) => `<div class="list-item"><div class="avatar">${initials(client.name)}</div><div class="list-item-main"><strong>${esc(client.name)}</strong><small>${esc(client.contact)} · ${esc(client.phone)} · ${esc(client.frequency)}<br>Última reserva: ${esc(client.lastBooking)}</small></div><div class="item-actions"><button class="button ghost small" data-action="client-details" data-id="${esc(client.id)}">Detalhes</button><button class="button ghost small" data-action="edit-client" data-id="${esc(client.id)}">Editar</button></div></div>`).join("")}</div></section>`;
  }

  function partnerTeam() {
    return `${pageHeader("Portal do parceiro", "Equipe", "Defina funções e permissões operacionais para cada colaborador.", `<button class="button primary" data-action="new-team-member">Adicionar pessoa</button>`)}
      <section class="card"><div class="list">${state.partnerTeam.map((member) => `<div class="list-item"><div class="avatar">${initials(member.name)}</div><div class="list-item-main"><strong>${esc(member.name)}</strong><small>${esc(member.role)} · ${esc(member.email)}<br>Permissão: ${esc(member.permission)}</small></div><span class="status ${statusClass(member.status)}">${esc(member.status)}</span><div class="item-actions"><button class="button ghost small" data-action="edit-team-member" data-id="${esc(member.id)}">Editar</button><button class="button ${member.status === "Ativo" ? "danger" : "secondary"} small" data-action="toggle-team-member" data-id="${esc(member.id)}">${member.status === "Ativo" ? "Desativar" : "Ativar"}</button></div></div>`).join("")}</div></section>`;
  }

  function partnerFinance() {
    const recognized = state.reservations.filter((item) => item.venueId === state.partnerProfile.venueId).reduce((sum, item) => sum + Number(item.accountingRecognizedValue || 0), 0);
    const complements = state.reservations.filter((item) => item.venueId === state.partnerProfile.venueId).reduce((sum, item) => sum + Number(item.complementPaid || 0), 0);
    const commission = recognized * (state.partnerProfile.commissionRate / 100);
    const liability = activeVoucherLiability(state.partnerProfile.venueId);
    return `${pageHeader("Portal do parceiro", "Financeiro", "Conciliação demonstrativa com pagamentos originais, vouchers e complementos.", `<button class="button ghost" data-action="export-partner-finance">Exportar demonstrativo</button>`)}
      <section class="stats-grid">${stat(money(recognized), "valor contabilizado")}${stat(money(liability.value), "vouchers a honrar", `${liability.count} ativos`)}${stat(money(complements), "complementos novos")}${stat(money(commission), "comissão simulada")}</section>
      <section class="grid two"><article class="card"><h2>Tratamento do voucher</h2><div class="detail-list"><div class="detail-line"><span>Pagamento cancelado</span><strong>Permanece no mês original</strong></div><div class="detail-line"><span>Uso integral do voucher</span><strong>Sem nova obrigação</strong></div><div class="detail-line"><span>Reserva de valor superior</span><strong>Somente o complemento é novo</strong></div><div class="detail-line"><span>Responsabilidade</span><strong>Parceiro da quadra</strong></div></div></article><article class="card"><h2>Conta para recebimento</h2><div class="detail-list"><div class="detail-line"><span>Banco</span><strong>${esc(state.partnerProfile.bank)}</strong></div><div class="detail-line"><span>Agência e conta</span><strong>${esc(state.partnerProfile.branch)} · ${esc(state.partnerProfile.account)}</strong></div><div class="detail-line"><span>Subconta Asaas</span><strong>${esc(state.partnerProfile.asaasSubaccount)}</strong></div></div><button class="button ghost small" style="margin-top:14px" data-action="edit-bank-data">Editar dados</button></article></section>
      <div class="callout section"><strong>Obrigação pendente</strong><p>O parceiro não pode encerrar as atividades na plataforma enquanto houver vouchers ativos. Para encerrar, deverá honrar os créditos ou ressarcir o Tâmo On para permitir a realocação.</p></div>`;
  }

  function partnerRegistration() {
    const p = state.partnerProfile;
    const group = (title, lines, action) => `<article class="detail-group"><div class="section-heading"><div><h2>${esc(title)}</h2></div><button class="button ghost small" data-action="${action}">Editar</button></div><div class="detail-list">${lines.map(([label,value]) => `<div class="detail-line"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join("")}</div></article>`;
    return `${pageHeader("Portal do parceiro", "Cadastro", "Dados cadastrais, operacionais, contratuais, fiscais e financeiros definidos para a homologação do parceiro.")}
      <section class="details-grid">
        ${group("Empresa", [["Nome fantasia",p.tradeName],["Razão social",p.legalName],["CNPJ",p.cnpj],["Natureza jurídica",p.legalNature],["Regime tributário",p.taxRegime],["Atividade declarada",p.declaredActivity],["Inscrição municipal",p.municipalRegistration]], "edit-company-data")}
        ${group("Responsável", [["Nome",p.responsibleName],["CPF",p.responsibleCpf],["Função",p.responsibleRole],["E-mail",p.email],["Telefone",p.phone],["WhatsApp",p.whatsapp]], "edit-responsible-data")}
        ${group("Endereço", [["Logradouro",p.address],["Bairro",p.neighborhood],["Cidade/UF",`${p.city}/${p.state}`],["CEP",p.zip]], "edit-address-data")}
        ${group("Contratos e regras", [["Contrato",p.contractStatus],["Termos",p.termsStatus],["LGPD",p.privacyStatus],["Cancelamento",p.cancellationPolicy]], "edit-contract-data")}
        ${group("Fiscal e financeiro", [["Documento ao usuário",p.fiscalIssuer],["NFS-e da comissão",p.commissionInvoice],["Pagamento",p.paymentModel],["Comissão",`${p.commissionRate}%`],["Subconta",p.asaasSubaccount]], "edit-fiscal-data")}
        <article class="detail-group"><div class="section-heading"><div><h2>Documentos</h2></div><button class="button ghost small" data-action="add-document">Adicionar</button></div><div class="detail-list">${p.documents.map((doc,index) => `<div class="toggle-row"><div class="toggle-copy"><strong>${esc(doc.name)}</strong><small>${esc(doc.status)}</small></div><button class="button ghost small" data-action="edit-document" data-index="${index}">Alterar</button></div>`).join("")}</div></article>
        <article class="detail-group"><div class="section-heading"><div><h2>Vouchers e encerramento</h2></div><button class="button danger small" data-action="request-partner-closure">Solicitar encerramento</button></div><div class="detail-list"><div class="detail-line"><span>Vouchers ativos</span><strong>${activeVoucherLiability(p.venueId).count}</strong></div><div class="detail-line"><span>Valor a honrar</span><strong>${money(activeVoucherLiability(p.venueId).value)}</strong></div><div class="detail-line"><span>Regra</span><strong>Encerramento bloqueado com créditos pendentes</strong></div></div></article>
      </section>`;
  }

  function partnerView() {
    const views = { overview: partnerOverview, agenda: partnerAgenda, reservations: partnerReservations, spaces: partnerSpaces, clients: partnerClients, team: partnerTeam, finance: partnerFinance, registration: partnerRegistration };
    return navShell("partner", (views[state.activePage.partner] || partnerOverview)());
  }

  function adminOverview() {
    const pendingPartners = state.adminPartners.filter((item) => item.status !== "Aprovado").length;
    const activeUsers = state.adminUsers.filter((item) => item.status === "Ativo").length;
    const pendingReservations = state.reservations.filter((item) => item.statusKey === "pending").length;
    return `${pageHeader("Administração", "Visão geral", "Acompanhe pendências e acesse os cadastros sem excesso de informações na tela.", `<button class="button primary" data-action="review-next-partner">Analisar parceiro</button><button class="button ghost" data-action="export-admin-overview">Exportar resumo</button>`)}
      <section class="stats-grid">${stat(state.adminPartners.length, "parceiros")}${stat(pendingPartners, "em homologação")}${stat(activeUsers, "usuários ativos")}${stat(pendingReservations, "reservas pendentes")}</section>
      <section class="grid two"><article class="card"><div class="section-heading"><div><h2>Fila de parceiros</h2><p>Prioridade por completude cadastral</p></div><button class="button ghost small" data-nav="partners">Ver todos</button></div><div class="list">${state.adminPartners.filter((item) => item.status !== "Aprovado").map((partner) => `<div class="list-item"><div class="avatar">${initials(partner.tradeName)}</div><div class="list-item-main"><strong>${esc(partner.tradeName)}</strong><small>${esc(partner.city)} · completude ${esc(partner.score)}%</small></div><span class="status ${statusClass(partner.status)}">${esc(partner.status)}</span><button class="button ghost small" data-action="admin-partner-details" data-id="${partner.id}">Abrir</button></div>`).join("")}</div></article><article class="card"><div class="section-heading"><div><h2>Segurança da Preview</h2><p>Integrações críticas isoladas</p></div><button class="button ghost small" data-nav="settings">Configurar</button></div><div class="toggle-row"><div class="toggle-copy"><strong>Pagamentos reais</strong><small>Bloqueado no código</small></div><span class="status status-danger">Desativado</span></div><div class="toggle-row"><div class="toggle-copy"><strong>Banco de produção</strong><small>Nenhuma conexão configurada</small></div><span class="status status-danger">Isolado</span></div><div class="toggle-row"><div class="toggle-copy"><strong>Dados locais</strong><small>Persistência apenas no navegador</small></div><span class="status status-ok">Ativo</span></div></article></section>`;
  }

  function adminPartners() {
    const query = state.search.adminPartner.toLowerCase();
    const filter = state.filters.adminPartnerStatus;
    const items = state.adminPartners.filter((partner) => `${partner.tradeName} ${partner.legalName} ${partner.city} ${partner.cnpj}`.toLowerCase().includes(query) && (filter === "Todos" || partner.status === filter));
    return `${pageHeader("Administração", "Parceiros", "Homologação cadastral, documental, contratual, fiscal e financeira.", `<button class="button primary" data-action="new-admin-partner">Cadastrar parceiro</button>`)}
      <div class="toolbar"><label class="search"><span>⌕</span><input id="adminPartnerSearch" value="${esc(state.search.adminPartner)}" placeholder="Buscar nome, CNPJ ou cidade"></label><select class="filter-select" id="adminPartnerFilter"><option>Todos</option><option>Aprovado</option><option>Em análise</option><option>Pendente</option><option>Suspenso</option></select><button class="button ghost" data-action="export-admin-partners">Exportar CSV</button></div>
      <section class="card"><div class="list">${items.map((partner) => `<div class="list-item"><div class="avatar">${initials(partner.tradeName)}</div><div class="list-item-main"><strong>${esc(partner.tradeName)}</strong><small>${esc(partner.legalName)} · ${esc(partner.cnpj)}<br>${esc(partner.city)} · ${esc(partner.spaces)} espaços · cadastro ${esc(partner.score)}%</small></div><span class="status ${statusClass(partner.status)}">${esc(partner.status)}</span><div class="item-actions"><button class="button ghost small" data-action="admin-partner-details" data-id="${partner.id}">Dossiê</button><button class="button ghost small" data-action="edit-admin-partner" data-id="${partner.id}">Editar</button>${partner.status !== "Aprovado" ? `<button class="button secondary small" data-action="admin-partner-status" data-id="${partner.id}" data-status="Aprovado">Aprovar</button>` : `<button class="button danger small" data-action="admin-partner-status" data-id="${partner.id}" data-status="Suspenso">Suspender</button><button class="button ghost small" data-action="request-admin-partner-closure" data-id="${partner.id}">Encerramento</button>`}</div></div>`).join("") || emptyState("◇", "Nenhum parceiro corresponde aos filtros.")}</div></section>`;
  }

  function adminReservations() {
    const filter = state.filters.adminReservationStatus;
    const items = state.reservations.filter((item) => filter === "Todos" || reservationStatus(item.statusKey).label === filter);
    return `${pageHeader("Administração", "Reservas", "Acompanhe o status operacional e o último endpoint aplicado.")}
      <div class="toolbar"><select class="filter-select" id="adminReservationFilter"><option>Todos</option><option>Reserva pendente</option><option>Confirmada</option><option>Cancelada</option></select><button class="button ghost" data-action="export-admin-reservations">Exportar CSV</button></div>
      <div class="table-wrap"><table><thead><tr><th>Reserva</th><th>Parceiro</th><th>Usuário</th><th>Data</th><th>Valor</th><th>Status</th><th>Endpoint</th><th>Ações</th></tr></thead><tbody>${items.map((item) => { const visual = reservationStatus(item.statusKey); return `<tr><td>${esc(item.id)}</td><td>${esc(item.venue)}</td><td>${esc(item.user)}</td><td>${esc(item.date)} · ${esc(item.time)}</td><td>${money(item.value)}</td><td><span class="status ${visual.status}">${visual.label}</span></td><td>${esc(item.endpoint)}</td><td><div class="item-actions"><button class="button ghost small" data-action="admin-reservation-edit" data-id="${esc(item.id)}">Alterar status</button>${item.statusKey === "confirmed" ? `<button class="button danger small" data-action="cancel-paid-tamo-reservation" data-id="${esc(item.id)}">Cancelar pelo Tâmo On</button>` : ""}</div></td></tr>`; }).join("")}</tbody></table></div>`;
  }

  function adminUsers() {
    const query = state.search.adminUser.toLowerCase();
    const items = state.adminUsers.filter((user) => `${user.name} ${user.email} ${user.city}`.toLowerCase().includes(query));
    return `${pageHeader("Administração", "Usuários", "Consulte cadastros fictícios e teste bloqueio ou reativação de acesso.")}
      <div class="toolbar"><label class="search"><span>⌕</span><input id="adminUserSearch" value="${esc(state.search.adminUser)}" placeholder="Buscar usuário, e-mail ou cidade"></label><button class="button ghost" data-action="export-admin-users">Exportar CSV</button></div>
      <section class="card"><div class="list">${items.map((user) => `<div class="list-item"><div class="avatar">${initials(user.name)}</div><div class="list-item-main"><strong>${esc(user.name)}</strong><small>${esc(user.email)} · ${esc(user.city)}<br>${esc(user.groups)} grupos · ${esc(user.reservations)} reservas · desde ${esc(user.createdAt)}</small></div><span class="status ${statusClass(user.status)}">${esc(user.status)}</span><div class="item-actions"><button class="button ghost small" data-action="admin-user-details" data-id="${esc(user.id)}">Detalhes</button><button class="button ${user.status === "Ativo" ? "danger" : "secondary"} small" data-action="toggle-admin-user" data-id="${esc(user.id)}">${user.status === "Ativo" ? "Bloquear" : "Reativar"}</button></div></div>`).join("")}</div></section>`;
  }

  function adminFinance() {
    const recognized = state.reservations.reduce((sum, item) => sum + Number(item.accountingRecognizedValue || 0), 0);
    const complements = state.reservations.reduce((sum, item) => sum + Number(item.complementPaid || 0), 0);
    const refunds = state.cancellationLog.reduce((sum, item) => sum + Number(item.refundValue || 0), 0);
    const commission = recognized * (state.settings.defaultCommission / 100);
    const activeVouchers = activeCancellationVouchers();
    const voucherLiability = activeVouchers.reduce((sum, item) => sum + Number(item.value || 0), 0);
    return `${pageHeader("Administração", "Financeiro", "Conciliação demonstrativa de pagamentos, vouchers, reembolsos, complementos e obrigações dos parceiros.", `<button class="button ghost" data-action="export-admin-finance">Exportar conciliação</button>`)}
      <section class="stats-grid">${stat(money(recognized), "valores contabilizados")}${stat(money(voucherLiability), "vouchers ativos", `${activeVouchers.length} créditos`)}${stat(money(refunds), "reembolsos integrais")}${stat(money(complements), "complementos pagos")}</section>
      <section class="card"><div class="section-heading"><div><h2>Vouchers de cancelamento</h2><p>Prazo condicionado à oferta de horários compatíveis e responsabilidade do parceiro.</p></div></div><div class="table-wrap" style="border:0"><table><thead><tr><th>Voucher</th><th>Parceiro</th><th>Valor</th><th>Faixa</th><th>Datas</th><th>Validade</th><th>Status</th><th>Ação</th></tr></thead><tbody>${state.cancellationVouchers.map((voucher) => `<tr><td>${esc(voucher.code)}</td><td>${esc(voucher.venue)}</td><td>${money(voucher.value)}</td><td>${esc(voucher.originalTime || "—")} · ${esc(voucher.compatibilityWindow || "—")}</td><td>${esc(voucher.compatibleDatesCount || 0)}/${esc(voucher.minimumCompatibleDates || state.settings.voucherMinimumCompatibleDates)}</td><td>${esc(voucher.expiresAt)}</td><td><span class="status ${["active", "active_extended"].includes(voucher.status) ? "status-ok" : voucher.status === "reserved" ? "status-warning" : "status-neutral"}">${esc(voucherStatusLabel(voucher))}</span></td><td>${["active", "active_extended"].includes(voucher.status) ? `<button class="button ghost small" data-action="reassign-cancellation-voucher" data-id="${esc(voucher.id)}">Ressarcir e realocar</button>` : "—"}</td></tr>`).join("") || `<tr><td colspan="8">Nenhum voucher gerado.</td></tr>`}</tbody></table></div></section>
      <section class="card section"><div class="section-heading"><div><h2>Cancelamentos e reembolsos</h2><p>O responsável pelo cancelamento suporta a consequência financeira aplicável.</p></div></div><div class="table-wrap" style="border:0"><table><thead><tr><th>Registro</th><th>Reserva</th><th>Responsável</th><th>Modalidade</th><th>Reembolso</th><th>Taxas</th></tr></thead><tbody>${state.cancellationLog.map((item) => `<tr><td>${esc(item.id)}</td><td>${esc(item.reservationId || item.partnerReservationId)}</td><td>${esc(cancellationSourceLabel(item.source))}</td><td>${item.mode === "voucher" ? "Voucher" : item.mode === "refund" ? "Reembolso integral" : "Sem compensação"}</td><td>${money(item.refundValue || 0)}</td><td>${item.feeResponsibility ? esc(cancellationSourceLabel(item.feeResponsibility)) : "Não aplicável"}</td></tr>`).join("") || `<tr><td colspan="6">Nenhum cancelamento processado.</td></tr>`}</tbody></table></div></section>
      <section class="card section"><div class="section-heading"><div><h2>Análises excepcionais</h2><p>Cancelamentos fora do prazo submetidos conjuntamente ao Tâmo On e ao parceiro.</p></div></div><div class="table-wrap" style="border:0"><table><thead><tr><th>Solicitação</th><th>Reserva</th><th>Parceiro</th><th>Status</th><th>Decisões</th></tr></thead><tbody>${state.cancellationExceptionReviews.map((review) => `<tr><td>${esc(review.id)}</td><td>${esc(review.reservationId)}</td><td>${esc(review.venue)}</td><td><span class="status status-warning">${esc(review.status)}</span></td><td>Tâmo On: ${esc(review.tamoDecision)} · Parceiro: ${esc(review.partnerDecision)}</td></tr>`).join("") || `<tr><td colspan="5">Nenhuma análise excepcional pendente.</td></tr>`}</tbody></table></div></section>
      <div class="callout section"><strong>Regra contábil simulada</strong><p>O pagamento que originou o voucher permanece no exercício original. Cancelamentos do parceiro ou do Tâmo On geram reembolso integral e os custos ficam com o responsável. Fora do prazo, não há crédito automático.</p></div>`;
  }

  function adminSettings() {
    const settings = state.settings;
    const toggle = (key,title,help,locked=false) => `<div class="toggle-row"><div class="toggle-copy"><strong>${esc(title)}</strong><small>${esc(help)}</small></div><button class="switch ${settings[key] ? "on" : ""}" data-action="toggle-setting" data-key="${esc(key)}" aria-pressed="${settings[key]}" ${locked ? "disabled" : ""}></button></div>`;
    return `${pageHeader("Administração", "Configurações", "Controles locais da Preview. Pagamentos reais permanecem bloqueados.", `<button class="button ghost" data-action="edit-commercial-settings">Editar regras comerciais</button>`)}
      <section class="grid two"><article class="card"><h2>Operação</h2>${toggle("marketplaceEnabled","Área de parceiros","Exibe as áreas demonstrativas.")}${toggle("newPartners","Novos cadastros","Permite incluir parceiros fictícios.")}${toggle("vouchersEnabled","Vouchers","Exibe promoções na área do usuário.")}${toggle("notificationEmails","Avisos por e-mail","Simulação de comunicações operacionais.")}</article><article class="card"><h2>Regras comerciais</h2><div class="detail-list" style="margin-top:14px"><div class="detail-line"><span>Comissão padrão</span><strong>${esc(settings.defaultCommission)}%</strong></div><div class="detail-line"><span>Prazo do usuário</span><strong>${esc(settings.cancellationHours)} horas</strong></div><div class="detail-line"><span>Validade nominal</span><strong>${esc(settings.voucherValidityDays)} dias</strong></div><div class="detail-line"><span>Faixa compatível</span><strong>± ${esc(settings.voucherCompatibilityWindowHours)} horas</strong></div><div class="detail-line"><span>Mínimo de datas</span><strong>${esc(settings.voucherMinimumCompatibleDates)}</strong></div><div class="detail-line"><span>Prorrogação</span><strong>${esc(settings.voucherExtensionDays)} dias</strong></div><div class="detail-line"><span>Persistência</span><strong>LocalStorage do navegador</strong></div></div></article></section>
      <section class="section"><button class="button danger" data-action="reset-local-data">Restaurar dados iniciais</button></section>`;
  }

  function adminView() {
    const views = { overview: adminOverview, partners: adminPartners, reservations: adminReservations, users: adminUsers, finance: adminFinance, settings: adminSettings };
    return navShell("admin", (views[state.activePage.admin] || adminOverview)());
  }

  function render() {
    app.innerHTML = state.role === "user" ? userView() : state.role === "partner" ? partnerView() : adminView();
    roleButtons.forEach((button) => button.classList.toggle("active", button.dataset.role === state.role));
    const userReservationFilter = document.getElementById("userReservationFilter");
    if (userReservationFilter) userReservationFilter.value = state.filters.userReservationStatus || "Todas";
    const partnerFilter = document.getElementById("partnerReservationFilter");
    if (partnerFilter) partnerFilter.value = state.filters.partnerReservationStatus;
    const adminPartnerFilter = document.getElementById("adminPartnerFilter");
    if (adminPartnerFilter) adminPartnerFilter.value = state.filters.adminPartnerStatus;
    const adminReservationFilter = document.getElementById("adminReservationFilter");
    if (adminReservationFilter) adminReservationFilter.value = state.filters.adminReservationStatus;
  }

  function venueScheduleBody(venue, selectedDate) {
    const day = venue.schedule.find((item) => item.shortDate === selectedDate) || venue.schedule[0];
    selectedVenueSchedule = { venueId: venue.id, shortDate: day.shortDate };
    return `<div class="venue-detail-cover"><img class="venue-detail-image" src="${esc(venue.facadeImage)}" alt="Fachada de ${esc(venue.name)}"><div class="venue-detail-overlay"><span class="rating-badge" title="Nota calculada pelas avaliações dos usuários">★ ${esc(venue.rating)} <small>${esc(venue.reviews)} avaliações</small></span><div><strong>${esc(venue.city)} · ${esc(venue.neighborhood)}</strong><small>${esc(venue.address)} · ${esc(venue.distance)}</small></div></div></div>
      <div class="venue-detail-summary"><span><b>Tipos disponíveis</b>${esc(venue.types.join(" · "))}</span><span><b>Estrutura</b>${esc(venue.amenities.join(" · "))}</span></div>
      <section class="schedule-section"><div class="section-heading"><div><h2>Agenda do parceiro</h2><p>Deslize a linha de dias para consultar toda a agenda cadastrada.</p></div></div>
      <div class="schedule-days" aria-label="Dias com agenda disponível">${venue.schedule.map((item) => `<button type="button" class="schedule-day ${item.shortDate === day.shortDate ? "active" : ""}" data-action="venue-schedule-day" data-id="${esc(venue.id)}" data-date="${esc(item.shortDate)}"><small>${esc(item.weekday)}</small><strong>${esc(item.dayLabel)}</strong></button>`).join("")}</div>
      <div class="schedule-slots">${day.slots.map((slot) => {
        const reservation = findReservationForSlot(venue.id, slot.time, day.shortDate);
        const visual = reservation ? reservationStatus(reservation.statusKey) : null;
        const cls = slot.blocked ? "unavailable" : visual?.slot || "available";
        const label = slot.blocked ? "Indisponível" : reservation ? visual.label : "Disponível";
        return `<button type="button" class="schedule-slot ${cls}" data-action="reserve-slot" data-venue="${esc(venue.id)}" data-time="${esc(slot.time)}" data-date="${esc(day.shortDate)}"><span><strong>${esc(slot.time)}</strong><small>${esc(label)}</small></span><b>${money(slot.price)}</b></button>`;
      }).join("")}</div><div class="slot-legend schedule-legend"><span><i class="legend-dot"></i>Disponível</span><span><i class="legend-dot pending"></i>Pendente</span><span><i class="legend-dot confirmed"></i>Confirmado</span></div></section>`;
  }

  function openVenueSchedule(venueId, shortDate) {
    const venue = state.venues.find((item) => item.id === venueId);
    if (!venue) return;
    detailEyebrow.textContent = "Espaço parceiro";
    detailTitle.textContent = venue.name;
    detailBody.innerHTML = venueScheduleBody(venue, shortDate || venue.schedule[0].shortDate);
    if (!detailDialog.open) {
      detailDialog.showModal();
      focusDialog(detailDialog);
    }
  }

  function openReservation(venueId, time, shortDate) {
    const venue = state.venues.find((item) => item.id === venueId);
    if (!venue) return;
    const day = venue.schedule.find((item) => item.shortDate === shortDate) || venue.schedule[0];
    const slot = day.slots.find((item) => item.time === time);
    if (!slot) return;
    const existing = findReservationForSlot(venueId, time, day.shortDate);
    if (existing) {
      const visual = reservationStatus(existing.statusKey);
      detailReturnContext = { venueId: venue.id, shortDate: day.shortDate };
      openDetail({ eyebrow: "Status do horário", title: `${venue.name} · ${time}`, body: `<div class="summary-card"><strong>${visual.label}</strong><div class="meta-row" style="margin-top:7px"><span>${esc(existing.id)}</span><span>Endpoint: ${esc(existing.endpoint)}</span></div></div><p class="dialog-description">Horários cancelados deixam de bloquear a agenda e permanecem apenas no histórico de reservas.</p>` });
      return;
    }
    if (slot.blocked) {
      detailReturnContext = { venueId: venue.id, shortDate: day.shortDate };
      openDetail({ eyebrow: "Horário indisponível", title: `${venue.name} · ${time}`, body: `<p class="dialog-description">Este horário foi bloqueado pelo parceiro e não pode ser reservado.</p>` });
      return;
    }
    selectedReservation = { venue, time, day, value: slot.price };
    reservationReturnContext = { venueId: venue.id, shortDate: day.shortDate };
    reservationTitle.textContent = `${venue.name} · ${time}`;
    reservationSummary.innerHTML = `<strong>${esc(venue.name)}</strong><div class="meta-row" style="margin-top:7px"><span>${esc(day.date)}</span><span>${esc(time)}</span><span>${money(slot.price)}</span></div>`;
    reservationPolicyAcknowledge.checked = false;
    if (reservationPolicyText) reservationPolicyText.textContent = `Cancelamento pelo usuário até ${state.settings.cancellationHours} horas antes gera voucher de uso único. Cancelamento pelo parceiro ou pelo Tâmo On gera reembolso integral, com taxas suportadas pelo responsável. Fora do prazo não há crédito automático. O voucher tem prazo nominal de ${state.settings.voucherValidityDays} dias, mas só expira normalmente se houver ao menos ${state.settings.voucherMinimumCompatibleDates} datas em faixa compatível de ±${state.settings.voucherCompatibilityWindowHours} horas e no mesmo período do dia.`;
    populateVoucherOptions();
    populateReservationGroups();
    if (detailDialog.open) detailDialog.close();
    reservationDialog.showModal();
    focusDialog(reservationDialog);
  }

  function applyUserReservationStatus(id, statusKey) {
    const reservation = state.reservations.find((item) => item.id === id);
    if (!reservation) return;
    const linkedVoucher = reservation.cancellationVoucherId ? state.cancellationVouchers.find((voucher) => voucher.id === reservation.cancellationVoucherId) : null;
    if (statusKey === "confirmed") {
      const complement = Number(reservation.paymentDue || 0);
      const hadAccounting = Number(reservation.accountingRecognizedValue || 0) > 0;
      Object.assign(reservation, {
        statusKey: "confirmed",
        status: complement > 0 ? "Confirmada — complemento pago" : "Confirmada",
        endpoint: complement > 0 ? "payment.complement.confirmed" : "payment.confirmed",
        paymentStatus: complement > 0 ? "Complemento pago via Asaas" : "Pago",
        complementPaid: complement,
        accountingRecognizedValue: complement > 0 ? complement : Number(reservation.accountingRecognizedValue || reservation.value),
        fiscalObligationValue: complement > 0 ? complement : Number(reservation.fiscalObligationValue || reservation.value),
        accountingMonth: accountingMonth()
      });
      if (linkedVoucher) {
        Object.assign(linkedVoucher, { status: "used", usedAt: new Date().toLocaleString("pt-BR"), usedReservationId: reservation.id, consumedValue: linkedVoucher.value });
      }
      if (complement > 0) {
        state.accountingLedger.unshift({ id: nextId("LED-", state.accountingLedger), type: "voucher_complement", reservationId: reservation.id, voucherId: linkedVoucher?.id || "", venueId: reservation.venueId, venue: reservation.venue, amount: complement, fiscalAmount: complement, accountingMonth: reservation.accountingMonth, description: "Complemento pago em reserva com voucher" });
      } else if (!linkedVoucher && !hadAccounting) {
        state.accountingLedger.unshift({ id: nextId("LED-", state.accountingLedger), type: "service_payment", reservationId: reservation.id, venueId: reservation.venueId, venue: reservation.venue, amount: reservation.value, fiscalAmount: reservation.value, accountingMonth: reservation.accountingMonth, description: "Pagamento da reserva" });
      }
      const published = publishStandbyEventForReservation(reservation, complement > 0 ? "event.publish_after_complement" : "event.publish_after_payment");
      saveState(); render();
      showToast(published ? `${id}: pagamento confirmado, evento publicado e push registrado.` : `${id}: pagamento confirmado.`);
      return;
    }
    if (linkedVoucher?.status === "reserved") Object.assign(linkedVoucher, { status: "active", reservedReservationId: "", reservedAt: "" });
    Object.assign(reservation, { statusKey: "cancelled", status: "Cancelada", endpoint: "reservation.cancelled", pushStatus: "Não enviado" });
    if (reservation.eventMode === "new" && reservation.eventId) {
      const linkedEvent = state.groupEvents.find((event) => event.id === reservation.eventId);
      if (linkedEvent && linkedEvent.statusKey === "standby_payment") {
        Object.assign(linkedEvent, { statusKey: "cancelled", status: "Cancelado", published: false, publicationEndpoint: "reservation.cancelled", pushStatus: "Não enviado" });
        reservation.eventPublicationStatus = "cancelled";
      }
    }
    saveState(); render(); showToast(`${id}: reserva cancelada; o evento em espera não foi publicado.`);
  }

  function partnerDetailsBody(partner) {
    return `<div class="details-grid">
      <div class="detail-group"><h3>Empresa</h3><div class="detail-list"><div class="detail-line"><span>Razão social</span><strong>${esc(partner.legalName)}</strong></div><div class="detail-line"><span>CNPJ</span><strong>${esc(partner.cnpj)}</strong></div><div class="detail-line"><span>Cidade</span><strong>${esc(partner.city)}</strong></div><div class="detail-line"><span>Atividade declarada</span><strong>${esc(partner.activity)}</strong></div><div class="detail-line"><span>Regime tributário</span><strong>${esc(partner.taxRegime)}</strong></div></div></div>
      <div class="detail-group"><h3>Responsável</h3><div class="detail-list"><div class="detail-line"><span>Nome</span><strong>${esc(partner.responsible)}</strong></div><div class="detail-line"><span>E-mail</span><strong>${esc(partner.email)}</strong></div><div class="detail-line"><span>Telefone</span><strong>${esc(partner.phone)}</strong></div><div class="detail-line"><span>Tipos de espaço</span><strong>${esc(partner.types)}</strong></div></div></div>
      <div class="detail-group"><h3>Contrato e fiscal</h3><div class="detail-list"><div class="detail-line"><span>Contrato</span><strong>${esc(partner.contract)}</strong></div><div class="detail-line"><span>Documento fiscal</span><strong>${esc(partner.fiscal)}</strong></div><div class="detail-line"><span>Comissão</span><strong>${esc(partner.commission)}%</strong></div></div></div>
      <div class="detail-group"><h3>Financeiro e homologação</h3><div class="detail-list"><div class="detail-line"><span>Dados bancários</span><strong>${esc(partner.banking)}</strong></div><div class="detail-line"><span>Status</span><strong>${esc(partner.status)}</strong></div><div class="detail-line"><span>Completude</span><strong>${esc(partner.score)}%</strong></div><div class="detail-line"><span>Vouchers ativos</span><strong>${esc(activeVoucherLiability(partner.venueId).count)} · ${money(activeVoucherLiability(partner.venueId).value)}</strong></div><div class="progress"><span style="width:${Math.min(100,partner.score)}%"></span></div></div></div>
    </div>`;
  }

  function handleAction(button) {
    const action = button.dataset.action;
    const id = button.dataset.id;

    if (action === "toggle-favorite") {
      state.favorites = state.favorites.includes(id) ? state.favorites.filter((item) => item !== id) : [...state.favorites,id];
      saveState(); render(); showToast(state.favorites.includes(id) ? "Quadra adicionada aos favoritos." : "Quadra removida dos favoritos.");
    } else if (action === "reserve-slot") {
      openReservation(button.dataset.venue, button.dataset.time, button.dataset.date);
    } else if (action === "venue-details") {
      openVenueSchedule(id);
    } else if (action === "venue-schedule-day") {
      openVenueSchedule(id, button.dataset.date);
    } else if (action === "reservation-details") {
      const reservation = state.reservations.find((item) => item.id === id);
      if (reservation) {
        const linkedEvent = state.groupEvents.find((event) => event.id === reservation.eventId);
        const latestPush = state.pushLog.find((push) => push.eventId === reservation.eventId);
        openDetail({ eyebrow: "Reserva e automação", title: reservation.id, body: `<div class="details-grid"><div class="detail-group"><h3>Horário</h3><div class="detail-list"><div class="detail-line"><span>Local</span><strong>${esc(reservation.venue)}</strong></div><div class="detail-line"><span>Data</span><strong>${esc(reservation.date)}</strong></div><div class="detail-line"><span>Hora</span><strong>${esc(reservation.time)}</strong></div><div class="detail-line"><span>Valor</span><strong>${money(reservation.value)}</strong></div></div></div><div class="detail-group"><h3>Grupo e permissão</h3><div class="detail-list"><div class="detail-line"><span>Grupo</span><strong>${esc(reservation.groupName || "Não informado")}</strong></div><div class="detail-line"><span>Função do usuário</span><strong>${esc(reservation.groupRole || "Não informada")}</strong></div><div class="detail-line"><span>Evento</span><strong>${esc(reservation.event || "Não informado")}</strong></div><div class="detail-line"><span>Origem</span><strong>${reservation.eventMode === "new" ? "Criado pela reserva" : "Evento existente"}</strong></div></div></div><div class="detail-group"><h3>Pagamento e publicação</h3><div class="detail-list"><div class="detail-line"><span>Reserva</span><strong>${esc(reservation.status)}</strong></div><div class="detail-line"><span>Endpoint do pagamento</span><strong>${esc(reservation.endpoint)}</strong></div><div class="detail-line"><span>Evento</span><strong>${esc(linkedEvent?.status || eventPublicationLabel(reservation.eventPublicationStatus).label)}</strong></div><div class="detail-line"><span>Endpoint de publicação</span><strong>${esc(linkedEvent?.publicationEndpoint || "Aguardando pagamento")}</strong></div></div></div><div class="detail-group"><h3>Notificação automática</h3><div class="detail-list"><div class="detail-line"><span>Status do push</span><strong>${esc(reservation.pushStatus || linkedEvent?.pushStatus || "Não iniciado")}</strong></div><div class="detail-line"><span>Destinatários</span><strong>${latestPush ? `${esc(latestPush.recipients)} membros` : "Aguardando publicação"}</strong></div><div class="detail-line"><span>Endpoint</span><strong>${esc(latestPush?.endpoint || "push.group_members")}</strong></div><div class="detail-line"><span>Voucher</span><strong>${esc(reservation.voucher || "Não aplicado")}</strong></div><div class="detail-line"><span>Valor abatido</span><strong>${money(reservation.voucherAppliedValue || 0)}</strong></div><div class="detail-line"><span>Complemento</span><strong>${money(reservation.paymentDue || reservation.complementPaid || 0)}</strong></div><div class="detail-line"><span>Política aceita</span><strong>${reservation.cancellationPolicyAccepted ? "Sim" : "Não"}</strong></div></div></div>${reservation.cancellationSource ? `<div class="detail-group"><h3>Cancelamento</h3><div class="detail-list"><div class="detail-line"><span>Responsável</span><strong>${esc(cancellationSourceLabel(reservation.cancellationSource))}</strong></div><div class="detail-line"><span>Modalidade</span><strong>${reservation.cancellationMode === "voucher" ? "Voucher" : reservation.cancellationMode === "refund" ? "Reembolso integral" : "Sem compensação"}</strong></div><div class="detail-line"><span>Motivo</span><strong>${esc(reservation.cancellationReason || "Não informado")}</strong></div><div class="detail-line"><span>Voucher</span><strong>${esc(reservation.voucherGeneratedCode || "Não gerado")}</strong></div><div class="detail-line"><span>Reembolso</span><strong>${money(reservation.refundValue || 0)}</strong></div><div class="detail-line"><span>Taxas suportadas por</span><strong>${reservation.refundFeePayer ? esc(cancellationSourceLabel(reservation.refundFeePayer)) : "Não aplicável"}</strong></div><div class="detail-line"><span>Análise excepcional</span><strong>${esc(reservation.exceptionReviewStatus || "Não solicitada")}</strong></div><div class="detail-line"><span>Endpoint</span><strong>${esc(reservation.endpoint || "cancellation.pending")}</strong></div><div class="detail-line"><span>Horário</span><strong>${reservation.slotReleased ? "Liberado" : "Bloqueado"}</strong></div></div></div>` : ""}</div>` });
      }
    } else if (action === "cancel-paid-user-reservation") {
      openPaidCancellation("user", id);
    } else if (action === "request-cancellation-exception") {
      const reservation = state.reservations.find((item) => item.id === id);
      if (!reservation) return;
      openForm({ eyebrow: "Análise excepcional", title: `Solicitar análise de ${reservation.id}`, description: "A solicitação será analisada conjuntamente pelo Tâmo On e pelo parceiro. Não há concessão automática de reembolso ou voucher.", fields: [{ name: "details", label: "Justificativa e circunstâncias excepcionais", type: "textarea", value: "", required: true, full: true }], submitLabel: "Enviar para análise", onSubmit: (data) => { const reviewId = nextId("EXC-", state.cancellationExceptionReviews); state.cancellationExceptionReviews.unshift({ id: reviewId, reservationId: reservation.id, venueId: reservation.venueId, venue: reservation.venue, user: reservation.user, details: data.details, status: "Pendente de análise conjunta", partnerDecision: "Pendente", tamoDecision: "Pendente", createdAt: new Date().toLocaleString("pt-BR") }); reservation.exceptionReviewId = reviewId; reservation.exceptionReviewStatus = "Pendente de análise conjunta"; saveState(); render(); showToast("Solicitação excepcional enviada ao Tâmo On e ao parceiro."); } });
    } else if (action === "reservation-status") {
      const label = button.dataset.status === "confirmed" ? "confirmar pelo pagamento" : "cancelar";
      askConfirm({ title: "Alterar reserva", message: `Deseja ${label} a reserva ${id}?`, confirmLabel: "Aplicar endpoint", onConfirm: () => applyUserReservationStatus(id, button.dataset.status) });
    } else if (action === "apply-voucher") {
      const code = button.dataset.code;
      if (!state.appliedVouchers.includes(code)) state.appliedVouchers.push(code);
      saveState(); render(); showToast(`Voucher ${code} aplicado à próxima reserva.`);
    } else if (action === "sync-main-profile") {
      state.userProfile.lastSync = new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
      saveState(); render(); showToast("Perfil principal sincronizado com o marketplace.");
    } else if (action === "manage-main-profile") {
      openDetail({ eyebrow: "Perfil principal", title: "Gerenciar dados no Tâmo On", body: `<div class="profile-central-explanation"><p>Nome e e-mail são fornecidos pela conta Google. Telefone, cidade e preferências são preenchidos uma única vez no perfil principal do Tâmo On.</p><div class="detail-list"><div class="detail-line"><span>Marketplace</span><strong>Somente leitura</strong></div><div class="detail-line"><span>Grupos</span><strong>Usa o mesmo perfil</strong></div><div class="detail-line"><span>Administração e organização</span><strong>Permissões herdadas dos grupos</strong></div></div><p class="dialog-description">Na aplicação integrada, este botão abrirá o perfil principal. A Preview não cria outro cadastro nem duplica os campos pessoais.</p></div>` });
    } else if (action === "partner-day") {
      state.partnerDay = Number(button.dataset.day); saveState(); render();
    } else if (action === "new-block") {
      openForm({ eyebrow:"Agenda",title:"Novo bloqueio",description:"O bloqueio será salvo apenas nesta Preview.",fields:[
        {name:"day",label:"Dia de agosto",type:"number",value:state.partnerDay,min:3,max:9,required:true},{name:"time",label:"Horário",type:"time",value:"21:00",required:true},
        {name:"space",label:"Espaço",type:"select",value:state.partnerSpaces[0]?.name,options:state.partnerSpaces.map((item)=>item.name)},{name:"title",label:"Motivo",value:"Manutenção",required:true},
        {name:"detail",label:"Observação",type:"textarea",value:"Bloqueio interno",full:true}
      ],submitLabel:"Criar bloqueio",onSubmit:(data)=>{state.partnerAgenda.push({id:nextId("A-",state.partnerAgenda),day:Number(data.day),time:data.time,title:data.title,space:data.space,type:"blocked",detail:data.detail||"Bloqueio interno"});saveState();render();showToast("Bloqueio adicionado à agenda.");} });
    } else if (action === "new-partner-reservation") {
      openForm({ eyebrow:"Reservas",title:"Nova reserva manual",fields:[
        {name:"client",label:"Cliente ou grupo",value:"",required:true},{name:"date",label:"Data",type:"date",value:"2026-08-10",required:true},
        {name:"time",label:"Horário",type:"time",value:"19:00",required:true},{name:"space",label:"Espaço",type:"select",options:state.partnerSpaces.map((item)=>item.name)},
        {name:"value",label:"Valor",type:"number",step:"0.01",value:120,required:true},{name:"status",label:"Status",type:"select",value:"Pendente",options:["Pendente","Confirmada"]}
      ],submitLabel:"Salvar reserva",onSubmit:(data)=>{state.partnerReservations.unshift({id:nextId("RP-",state.partnerReservations),client:data.client,date:new Date(`${data.date}T12:00:00`).toLocaleDateString("pt-BR"),time:data.time,space:data.space,value:Number(data.value),status:data.status,payment:"Externo"});saveState();render();showToast("Reserva manual criada.");} });
    } else if (action === "agenda-details") {
      const item = state.partnerAgenda.find((entry)=>entry.id===id); if(item) openDetail({eyebrow:"Agenda",title:item.title,body:`<div class="summary-card"><strong>${esc(item.time)} · ${esc(item.space)}</strong><div class="meta-row" style="margin-top:7px"><span>Dia ${esc(item.day)}/08/2026</span><span>${esc(item.detail)}</span></div></div>`});
    } else if (action === "edit-agenda") {
      const item=state.partnerAgenda.find((entry)=>entry.id===id); if(!item)return;
      openForm({eyebrow:"Agenda",title:"Editar compromisso",fields:[{name:"day",label:"Dia",type:"number",value:item.day,min:3,max:9},{name:"time",label:"Horário",type:"time",value:item.time},{name:"title",label:"Título",value:item.title},{name:"space",label:"Espaço",type:"select",value:item.space,options:state.partnerSpaces.map((s)=>s.name)},{name:"type",label:"Tipo",type:"select",value:item.type,options:[{value:"confirmed",label:"Confirmado"},{value:"pending",label:"Pendente"},{value:"blocked",label:"Bloqueio"}]},{name:"detail",label:"Observação",type:"textarea",value:item.detail,full:true}],onSubmit:(data)=>{Object.assign(item,data,{day:Number(data.day)});saveState();render();showToast("Agenda atualizada.");}});
    } else if (action === "partner-reservation-details") {
      const item=state.partnerReservations.find((r)=>r.id===id); if(item)openDetail({eyebrow:"Reserva do parceiro",title:item.id,body:`<div class="details-grid"><div class="detail-group"><h3>Reserva</h3><div class="detail-list"><div class="detail-line"><span>Cliente</span><strong>${esc(item.client)}</strong></div><div class="detail-line"><span>Data</span><strong>${esc(item.date)} · ${esc(item.time)}</strong></div><div class="detail-line"><span>Espaço</span><strong>${esc(item.space)}</strong></div></div></div><div class="detail-group"><h3>Financeiro</h3><div class="detail-list"><div class="detail-line"><span>Valor</span><strong>${money(item.value)}</strong></div><div class="detail-line"><span>Status</span><strong>${esc(item.status)}</strong></div><div class="detail-line"><span>Pagamento</span><strong>${esc(item.payment)}</strong></div><div class="detail-line"><span>Voucher</span><strong>${esc(item.voucherGeneratedCode || "Não gerado")}</strong></div></div></div>${item.cancellationSource ? `<div class="detail-group"><h3>Cancelamento</h3><div class="detail-list"><div class="detail-line"><span>Responsável</span><strong>${esc(cancellationSourceLabel(item.cancellationSource))}</strong></div><div class="detail-line"><span>Modalidade</span><strong>${item.cancellationMode === "voucher" ? "Voucher" : item.cancellationMode === "refund" ? "Reembolso integral" : "Sem compensação"}</strong></div><div class="detail-line"><span>Motivo</span><strong>${esc(item.cancellationReason || "Não informado")}</strong></div><div class="detail-line"><span>Voucher</span><strong>${esc(item.voucherGeneratedCode || "Não gerado")}</strong></div><div class="detail-line"><span>Reembolso</span><strong>${money(item.refundValue || 0)}</strong></div><div class="detail-line"><span>Taxas suportadas por</span><strong>${item.refundFeePayer ? esc(cancellationSourceLabel(item.refundFeePayer)) : "Não aplicável"}</strong></div></div></div>` : ""}</div>`});
    } else if (action === "cancel-paid-partner-reservation") {
      const item = state.partnerReservations.find((r) => r.id === id);
      if (item) openPaidCancellation("partner", item.userReservationId || "", item.id);
    } else if (action === "partner-reservation-status") {
      const item=state.partnerReservations.find((r)=>r.id===id); if(item){item.status=button.dataset.status;saveState();render();showToast(`${id}: ${item.status}.`);}
    } else if (action === "export-partner-reservations") {
      exportCsv(`reservas-parceiro-${VERSION}.csv`,[["Reserva","Cliente","Data","Hora","Espaço","Valor","Status"],...state.partnerReservations.map((r)=>[r.id,r.client,r.date,r.time,r.space,r.value,r.status])]);
    } else if (action === "new-space" || action === "edit-space") {
      const item=action==="edit-space"?state.partnerSpaces.find((s)=>s.id===id):null;
      openForm({eyebrow:"Espaços",title:item?"Editar espaço":"Cadastrar espaço",fields:[{name:"name",label:"Nome",value:item?.name||"",required:true},{name:"type",label:"Tipo",type:"select",value:item?.type||"Society",options:["Futsal","Society","Campo"]},{name:"floor",label:"Piso",value:item?.floor||"Grama sintética"},{name:"capacity",label:"Capacidade",type:"number",value:item?.capacity||14},{name:"price",label:"Preço-base",type:"number",step:"0.01",value:item?.price||120},{name:"status",label:"Status",type:"select",value:item?.status||"Ativo",options:["Ativo","Inativo"]},{name:"lights",label:"Iluminação",type:"select",value:item?.lights||"Sim",options:["Sim","Não"]},{name:"covered",label:"Coberta",type:"select",value:item?.covered||"Não",options:["Sim","Não"]},{name:"maintenance",label:"Próxima manutenção",value:item?.maintenance||"",full:true}],onSubmit:(data)=>{const normalized={...data,capacity:Number(data.capacity),price:Number(data.price)};if(item)Object.assign(item,normalized);else state.partnerSpaces.push({id:nextId("E-",state.partnerSpaces),...normalized});saveState();render();showToast(item?"Espaço atualizado.":"Espaço cadastrado.");}});
    } else if (action === "toggle-space") {
      const item=state.partnerSpaces.find((s)=>s.id===id);if(item){item.status=item.status==="Ativo"?"Inativo":"Ativo";saveState();render();showToast(`${item.name}: ${item.status}.`);}
    } else if (action === "new-client" || action === "edit-client") {
      const item=action==="edit-client"?state.partnerClients.find((c)=>c.id===id):null;
      openForm({eyebrow:"Clientes",title:item?"Editar cliente":"Cadastrar cliente",fields:[{name:"name",label:"Grupo ou cliente",value:item?.name||"",required:true},{name:"contact",label:"Responsável",value:item?.contact||"",required:true},{name:"phone",label:"Telefone",value:item?.phone||""},{name:"frequency",label:"Frequência",type:"select",value:item?.frequency||"Semanal",options:["Semanal","Quinzenal","Mensal","Eventual"]},{name:"lastBooking",label:"Última reserva",value:item?.lastBooking||""},{name:"notes",label:"Observações",type:"textarea",value:item?.notes||"",full:true}],onSubmit:(data)=>{if(item)Object.assign(item,data);else state.partnerClients.push({id:nextId("C-",state.partnerClients),...data});saveState();render();showToast(item?"Cliente atualizado.":"Cliente cadastrado.");}});
    } else if (action === "client-details") {
      const item=state.partnerClients.find((c)=>c.id===id);if(item)openDetail({eyebrow:"Cliente",title:item.name,body:`<div class="detail-group"><div class="detail-list"><div class="detail-line"><span>Responsável</span><strong>${esc(item.contact)}</strong></div><div class="detail-line"><span>Telefone</span><strong>${esc(item.phone)}</strong></div><div class="detail-line"><span>Frequência</span><strong>${esc(item.frequency)}</strong></div><div class="detail-line"><span>Observações</span><strong>${esc(item.notes)}</strong></div></div></div>`});
    } else if (action === "new-team-member" || action === "edit-team-member") {
      const item=action==="edit-team-member"?state.partnerTeam.find((m)=>m.id===id):null;
      openForm({eyebrow:"Equipe",title:item?"Editar pessoa":"Adicionar pessoa",fields:[{name:"name",label:"Nome",value:item?.name||"",required:true},{name:"email",label:"E-mail",type:"email",value:item?.email||"",required:true},{name:"role",label:"Função",value:item?.role||"Atendimento"},{name:"permission",label:"Permissão",type:"select",value:item?.permission||"Agenda e reservas",options:["Total","Agenda e reservas","Agenda e bloqueios","Somente leitura"]},{name:"status",label:"Status",type:"select",value:item?.status||"Ativo",options:["Ativo","Inativo"]}],onSubmit:(data)=>{if(item)Object.assign(item,data);else state.partnerTeam.push({id:nextId("T-",state.partnerTeam),...data});saveState();render();showToast(item?"Pessoa atualizada.":"Pessoa adicionada.");}});
    } else if (action === "toggle-team-member") {
      const item=state.partnerTeam.find((m)=>m.id===id);if(item){item.status=item.status==="Ativo"?"Inativo":"Ativo";saveState();render();showToast(`${item.name}: ${item.status}.`);}
    } else if (action === "export-partner-finance") {
      exportCsv(`financeiro-parceiro-${VERSION}.csv`,[["Reserva","Cliente","Valor","Status","Pagamento","Voucher","Reconhecido"],...state.partnerReservations.map((r)=>[r.id,r.client,r.value,r.status,r.payment,r.voucherGeneratedCode||"",r.accountingRecognizedValue||0])]);
    } else if (action === "edit-bank-data") {
      const p=state.partnerProfile;openForm({eyebrow:"Financeiro",title:"Editar dados bancários",fields:[{name:"bank",label:"Banco",value:p.bank},{name:"branch",label:"Agência",value:p.branch},{name:"account",label:"Conta",value:p.account},{name:"pixKey",label:"Chave Pix",value:p.pixKey},{name:"asaasSubaccount",label:"Subconta Asaas",value:p.asaasSubaccount,full:true}],onSubmit:(data)=>{Object.assign(p,data);saveState();render();showToast("Dados bancários atualizados localmente.");}});
    } else if (["edit-company-data","edit-responsible-data","edit-address-data","edit-contract-data","edit-fiscal-data"].includes(action)) {
      editPartnerProfileSection(action);
    } else if (action === "add-document" || action === "edit-document") {
      const index=Number(button.dataset.index);const item=action==="edit-document"?state.partnerProfile.documents[index]:null;
      openForm({eyebrow:"Documentos",title:item?"Alterar documento":"Adicionar documento",fields:[{name:"name",label:"Documento",value:item?.name||"",required:true},{name:"status",label:"Status",type:"select",value:item?.status||"Pendente",options:["Pendente","Enviado","Em análise","Validado","Rejeitado","Assinado"]}],onSubmit:(data)=>{if(item)Object.assign(item,data);else state.partnerProfile.documents.push(data);saveState();render();showToast("Lista de documentos atualizada.");}});
    } else if (action === "review-next-partner") {
      const partner=state.adminPartners.find((p)=>p.status!=="Aprovado");if(partner)openDetail({eyebrow:"Próximo parceiro",title:partner.tradeName,body:partnerDetailsBody(partner)});else showToast("Não há parceiros pendentes.");
    } else if (action === "export-admin-overview") {
      exportCsv(`resumo-administrativo-${VERSION}.csv`,[["Indicador","Valor"],["Parceiros",state.adminPartners.length],["Usuários",state.adminUsers.length],["Reservas",state.reservations.length]]);
    } else if (action === "new-admin-partner" || action === "edit-admin-partner") {
      const item=action==="edit-admin-partner"?state.adminPartners.find((p)=>String(p.id)===String(id)):null;
      openForm({eyebrow:"Parceiros",title:item?"Editar parceiro":"Cadastrar parceiro",description:"Dados de teste para validar a homologação.",fields:[{name:"tradeName",label:"Nome fantasia",value:item?.tradeName||"",required:true},{name:"legalName",label:"Razão social",value:item?.legalName||"",required:true},{name:"cnpj",label:"CNPJ",value:item?.cnpj||"",required:true},{name:"city",label:"Cidade",value:item?.city||"Curitiba"},{name:"spaces",label:"Número de espaços",type:"number",value:item?.spaces||1},{name:"types",label:"Tipos de espaço",value:item?.types||"Society"},{name:"responsible",label:"Responsável",value:item?.responsible||""},{name:"email",label:"E-mail",type:"email",value:item?.email||""},{name:"phone",label:"Telefone",value:item?.phone||""},{name:"taxRegime",label:"Regime tributário",value:item?.taxRegime||"Simples Nacional"},{name:"activity",label:"Atividade declarada",value:item?.activity||"Gestão de espaços esportivos",full:true},{name:"status",label:"Status",type:"select",value:item?.status||"Pendente",options:["Pendente","Em análise","Aprovado","Suspenso"]},{name:"contract",label:"Contrato",type:"select",value:item?.contract||"Não enviado",options:["Não enviado","Enviado","Assinado"]},{name:"fiscal",label:"Emissão fiscal",value:item?.fiscal||"A validar"},{name:"banking",label:"Dados bancários",value:item?.banking||"Pendente"},{name:"commission",label:"Comissão (%)",type:"number",step:"0.1",value:item?.commission||state.settings.defaultCommission},{name:"score",label:"Completude (%)",type:"number",min:0,max:100,value:item?.score||30}],onSubmit:(data)=>{const normalized={...data,spaces:Number(data.spaces),commission:Number(data.commission),score:Number(data.score)};if(item)Object.assign(item,normalized);else state.adminPartners.push({id:Math.max(0,...state.adminPartners.map((p)=>Number(p.id)))+1,...normalized});saveState();render();showToast(item?"Parceiro atualizado.":"Parceiro cadastrado.");}});
    } else if (action === "admin-partner-details") {
      const partner=state.adminPartners.find((p)=>String(p.id)===String(id));if(partner)openDetail({eyebrow:"Dossiê do parceiro",title:partner.tradeName,body:partnerDetailsBody(partner)});
    } else if (action === "admin-partner-status") {
      const partner=state.adminPartners.find((p)=>String(p.id)===String(id));if(partner){const next=button.dataset.status;askConfirm({title:`${next} parceiro`,message:`Aplicar o status ${next} a ${partner.tradeName}?`,confirmLabel:"Aplicar status",onConfirm:()=>{partner.status=next;if(next==="Aprovado")partner.score=Math.max(partner.score,90);saveState();render();showToast(`${partner.tradeName}: ${next}.`);}});}
    } else if (action === "export-admin-partners") {
      exportCsv(`parceiros-${VERSION}.csv`,[["Nome fantasia","Razão social","CNPJ","Cidade","Status","Completude"],...state.adminPartners.map((p)=>[p.tradeName,p.legalName,p.cnpj,p.city,p.status,p.score])]);
    } else if (action === "export-admin-reservations") {
      exportCsv(`reservas-administracao-${VERSION}.csv`,[["Reserva","Parceiro","Usuário","Data","Hora","Status","Endpoint"],...state.reservations.map((r)=>[r.id,r.venue,r.user,r.date,r.time,r.status,r.endpoint])]);
    } else if (action === "cancel-paid-tamo-reservation") {
      openPaidCancellation("tamo", id);
    } else if (action === "admin-reservation-edit") {
      const item=state.reservations.find((r)=>r.id===id);if(!item)return;
      openForm({eyebrow:"Reservas",title:`Alterar ${item.id}`,fields:[{name:"statusKey",label:"Status",type:"select",value:item.statusKey,options:[{value:"pending",label:"Reserva pendente"},{value:"confirmed",label:"Confirmada"},{value:"cancelled",label:"Cancelada"}]},{name:"endpoint",label:"Endpoint",value:item.endpoint,full:true}],onSubmit:(data)=>{item.statusKey=data.statusKey;item.status=reservationStatus(data.statusKey).label;item.endpoint=data.endpoint;saveState();render();showToast("Reserva atualizada.");}});
    } else if (action === "admin-user-details") {
      const user=state.adminUsers.find((u)=>u.id===id);if(user)openDetail({eyebrow:"Usuário",title:user.name,body:`<div class="detail-group"><div class="detail-list"><div class="detail-line"><span>E-mail</span><strong>${esc(user.email)}</strong></div><div class="detail-line"><span>Cidade</span><strong>${esc(user.city)}</strong></div><div class="detail-line"><span>Grupos</span><strong>${esc(user.groups)}</strong></div><div class="detail-line"><span>Reservas</span><strong>${esc(user.reservations)}</strong></div><div class="detail-line"><span>Status</span><strong>${esc(user.status)}</strong></div></div></div>`});
    } else if (action === "toggle-admin-user") {
      const user=state.adminUsers.find((u)=>u.id===id);if(user){user.status=user.status==="Ativo"?"Bloqueado":"Ativo";saveState();render();showToast(`${user.name}: ${user.status}.`);}
    } else if (action === "export-admin-users") {
      exportCsv(`usuarios-${VERSION}.csv`,[["ID","Nome","E-mail","Cidade","Grupos","Reservas","Status"],...state.adminUsers.map((u)=>[u.id,u.name,u.email,u.city,u.groups,u.reservations,u.status])]);
    } else if (action === "export-admin-finance") {
      exportCsv(`conciliacao-financeira-${VERSION}.csv`,[["Reserva","Parceiro","Valor bruto","Comissão (%)","Comissão","Líquido parceiro"],...state.reservations.filter((r)=>r.statusKey==="confirmed").map((r)=>[r.id,r.venue,r.value,state.settings.defaultCommission,r.value*state.settings.defaultCommission/100,r.value*(1-state.settings.defaultCommission/100)])]);
    } else if (action === "toggle-setting") {
      const key=button.dataset.key;if(key!=="realMoney"){state.settings[key]=!state.settings[key];saveState();render();showToast("Configuração atualizada.");}
    } else if (action === "edit-commercial-settings") {
      openForm({eyebrow:"Configurações",title:"Regras comerciais",fields:[{name:"defaultCommission",label:"Comissão padrão (%)",type:"number",step:"0.1",value:state.settings.defaultCommission},{name:"cancellationHours",label:"Prazo do cancelamento pelo usuário (horas)",type:"number",value:state.settings.cancellationHours},{name:"voucherValidityDays",label:"Validade nominal do voucher (dias)",type:"number",value:state.settings.voucherValidityDays},{name:"voucherCompatibilityWindowHours",label:"Tolerância da faixa compatível (horas)",type:"number",value:state.settings.voucherCompatibilityWindowHours},{name:"voucherMinimumCompatibleDates",label:"Mínimo de datas compatíveis",type:"number",value:state.settings.voucherMinimumCompatibleDates},{name:"voucherExtensionDays",label:"Prorrogação automática (dias)",type:"number",value:state.settings.voucherExtensionDays}],onSubmit:(data)=>{state.settings.defaultCommission=Number(data.defaultCommission);state.settings.cancellationHours=Number(data.cancellationHours);state.settings.voucherValidityDays=Number(data.voucherValidityDays);state.settings.voucherCompatibilityWindowHours=Number(data.voucherCompatibilityWindowHours);state.settings.voucherMinimumCompatibleDates=Number(data.voucherMinimumCompatibleDates);state.settings.voucherExtensionDays=Number(data.voucherExtensionDays);saveState();render();showToast("Regras comerciais atualizadas.");}});
    } else if (action === "request-partner-closure") {
      const liability = activeVoucherLiability(state.partnerProfile.venueId);
      if (liability.count > 0) {
        openDetail({ eyebrow: "Encerramento bloqueado", title: "Existem vouchers pendentes", body: `<div class="cancellation-warning"><strong>${liability.count} voucher(es) · ${money(liability.value)}</strong><p>O parceiro deve manter a operação até o uso dos créditos ou ressarcir o Tâmo On. Após o ressarcimento, a administração poderá realocar os vouchers para outra quadra.</p></div>` });
      } else {
        askConfirm({ title: "Solicitar encerramento", message: "Não há vouchers ativos. Registrar solicitação de encerramento do parceiro?", confirmLabel: "Solicitar", onConfirm: () => showToast("Solicitação de encerramento registrada na Preview.") });
      }
    } else if (action === "request-admin-partner-closure") {
      const partner = state.adminPartners.find((item) => String(item.id) === String(id));
      if (!partner) return;
      const liability = activeVoucherLiability(partner.venueId);
      if (liability.count > 0) {
        openDetail({ eyebrow: "Encerramento bloqueado", title: partner.tradeName, body: `<div class="cancellation-warning"><strong>${liability.count} voucher(es) ativos · ${money(liability.value)}</strong><p>O encerramento somente poderá ser concluído depois da utilização dos vouchers ou do ressarcimento ao Tâmo On para realocação dos créditos.</p></div>` });
      } else {
        askConfirm({ title: "Encerrar parceiro", message: `Registrar o encerramento de ${partner.tradeName}?`, confirmLabel: "Encerrar", onConfirm: () => { partner.status = "Encerrado"; saveState(); render(); showToast("Parceiro encerrado na Preview."); } });
      }
    } else if (action === "reassign-cancellation-voucher") {
      const voucher = state.cancellationVouchers.find((item) => item.id === id);
      if (!voucher) return;
      const targets = state.venues.filter((venue) => venue.id !== voucher.venueId);
      openForm({ eyebrow: "Ressarcimento e realocação", title: voucher.code, description: "Simula o ressarcimento do parceiro original ao Tâmo On e a disponibilização do crédito em outra quadra.", fields: [{ name: "targetVenueId", label: "Novo parceiro", type: "select", options: targets.map((venue) => ({ value: venue.id, label: venue.name })), required: true }, { name: "reimbursementReference", label: "Referência do ressarcimento", value: `RESS-${voucher.id}`, required: true }], submitLabel: "Ressarcir e realocar", onSubmit: (data) => { const target = state.venues.find((venue) => venue.id === data.targetVenueId); if (!target) return; const formerVenue = voucher.venue; voucher.reassignedFrom = formerVenue; voucher.originalVenueId = voucher.venueId; voucher.venueId = target.id; voucher.venue = target.name; voucher.partnerReimbursed = true; voucher.reimbursementReference = data.reimbursementReference; voucher.reassignmentStatus = `Realocado de ${formerVenue} para ${target.name}`; state.accountingLedger.unshift({ id: nextId("LED-", state.accountingLedger), type: "partner_reimbursement", voucherId: voucher.id, venueId: voucher.originalVenueId, venue: formerVenue, amount: voucher.value, fiscalAmount: 0, accountingMonth: accountingMonth(), description: `Ressarcimento para realocação em ${target.name}` }); saveState(); render(); showToast("Voucher ressarcido e realocado para outro parceiro."); } });
    } else if (action === "reset-local-data") {
      askConfirm({title:"Restaurar dados iniciais",message:"Todas as alterações feitas nesta Preview serão apagadas do navegador.",confirmLabel:"Restaurar",onConfirm:resetState});
    }
  }

  function editPartnerProfileSection(action) {
    const p=state.partnerProfile;
    const configs={
      "edit-company-data":{title:"Dados da empresa",fields:[{name:"tradeName",label:"Nome fantasia",value:p.tradeName},{name:"legalName",label:"Razão social",value:p.legalName},{name:"cnpj",label:"CNPJ",value:p.cnpj},{name:"legalNature",label:"Natureza jurídica",value:p.legalNature},{name:"taxRegime",label:"Regime tributário",value:p.taxRegime},{name:"declaredActivity",label:"Atividade declarada",value:p.declaredActivity,full:true},{name:"municipalRegistration",label:"Inscrição municipal",value:p.municipalRegistration}]},
      "edit-responsible-data":{title:"Responsável e contatos",fields:[{name:"responsibleName",label:"Nome",value:p.responsibleName},{name:"responsibleCpf",label:"CPF",value:p.responsibleCpf},{name:"responsibleRole",label:"Função",value:p.responsibleRole},{name:"email",label:"E-mail",type:"email",value:p.email},{name:"phone",label:"Telefone",value:p.phone},{name:"whatsapp",label:"WhatsApp",value:p.whatsapp}]},
      "edit-address-data":{title:"Endereço",fields:[{name:"address",label:"Logradouro",value:p.address,full:true},{name:"neighborhood",label:"Bairro",value:p.neighborhood},{name:"city",label:"Cidade",value:p.city},{name:"state",label:"UF",value:p.state},{name:"zip",label:"CEP",value:p.zip}]},
      "edit-contract-data":{title:"Contratos e regras",fields:[{name:"contractStatus",label:"Contrato",type:"select",value:p.contractStatus,options:["Não enviado","Enviado","Assinado"]},{name:"termsStatus",label:"Termos",type:"select",value:p.termsStatus,options:["Pendente","Aceitos"]},{name:"privacyStatus",label:"LGPD",type:"select",value:p.privacyStatus,options:["Pendente","Aceita"]},{name:"cancellationPolicy",label:"Política de cancelamento",value:p.cancellationPolicy,full:true}]},
      "edit-fiscal-data":{title:"Fiscal e financeiro",fields:[{name:"fiscalIssuer",label:"Documento fiscal do serviço",value:p.fiscalIssuer,full:true},{name:"commissionInvoice",label:"Documento fiscal da comissão",value:p.commissionInvoice,full:true},{name:"paymentModel",label:"Modelo de pagamento",value:p.paymentModel},{name:"commissionRate",label:"Comissão (%)",type:"number",step:"0.1",value:p.commissionRate},{name:"asaasSubaccount",label:"Subconta Asaas",value:p.asaasSubaccount}]}
    };
    const config=configs[action];if(!config)return;
    openForm({eyebrow:"Cadastro do parceiro",title:config.title,fields:config.fields,onSubmit:(data)=>{if("commissionRate" in data)data.commissionRate=Number(data.commissionRate);Object.assign(p,data);saveState();render();showToast(`${config.title} atualizado.`);}});
  }

  function resetState() {
    state=initialState();saveState();render();showToast("Dados fictícios restaurados.");
  }

  app.addEventListener("click", (event) => {
    const navButton=event.target.closest("[data-nav]");
    if(navButton){nav(state.role,navButton.dataset.nav);return;}
    const actionButton=event.target.closest("[data-action]");
    if(actionButton)handleAction(actionButton);
  });

  detailDialog.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");
    if (actionButton) handleAction(actionButton);
  });

  detailDialog.addEventListener("close", () => {
    if (!detailReturnContext) return;
    const context = detailReturnContext;
    detailReturnContext = null;
    setTimeout(() => openVenueSchedule(context.venueId, context.shortDate), 10);
  });

  reservationDialog.addEventListener("close", () => {
    if (!reservationReturnContext) {
      selectedReservation = null;
      return;
    }
    const context = reservationReturnContext;
    reservationReturnContext = null;
    selectedReservation = null;
    setTimeout(() => openVenueSchedule(context.venueId, context.shortDate), 10);
  });

  groupSelect.addEventListener("change", updateReservationEventOptions);
  eventSelect.addEventListener("change", updateNewEventPanel);
  newEventTitle.addEventListener("input", updateReservationSubmitState);
  voucherSelect.addEventListener("change", updateVoucherPaymentPreview);
  reservationPolicyAcknowledge.addEventListener("change", updateReservationSubmitState);

  app.addEventListener("input", (event) => {
    if(event.target.id==="venueSearch"){state.search.venue=event.target.value;saveState();render();const input=document.getElementById("venueSearch");input?.focus();input?.setSelectionRange(state.search.venue.length,state.search.venue.length);}
    if(event.target.id==="adminPartnerSearch"){state.search.adminPartner=event.target.value;saveState();render();const input=document.getElementById("adminPartnerSearch");input?.focus();input?.setSelectionRange(state.search.adminPartner.length,state.search.adminPartner.length);}
    if(event.target.id==="adminUserSearch"){state.search.adminUser=event.target.value;saveState();render();const input=document.getElementById("adminUserSearch");input?.focus();input?.setSelectionRange(state.search.adminUser.length,state.search.adminUser.length);}
  });

  app.addEventListener("change", (event) => {
    if(event.target.id==="userReservationFilter"){state.filters.userReservationStatus=event.target.value;saveState();render();}
    if(event.target.id==="partnerReservationFilter"){state.filters.partnerReservationStatus=event.target.value;saveState();render();}
    if(event.target.id==="adminPartnerFilter"){state.filters.adminPartnerStatus=event.target.value;saveState();render();}
    if(event.target.id==="adminReservationFilter"){state.filters.adminReservationStatus=event.target.value;saveState();render();}
  });

  roleButtons.forEach((button)=>button.addEventListener("click",()=>setRole(button.dataset.role)));
  document.getElementById("openReleaseNotes").addEventListener("click",()=>{infoDialog.showModal();focusDialog(infoDialog);});
  document.getElementById("resetPreview").addEventListener("click",()=>askConfirm({title:"Restaurar Preview",message:"Apagar todas as alterações locais e recuperar os dados fictícios iniciais?",confirmLabel:"Restaurar",onConfirm:resetState}));

  dynamicForm.addEventListener("submit",(event)=>{
    if(event.submitter?.value==="cancel")return;
    event.preventDefault();
    if(!dynamicForm.reportValidity())return;
    const data=Object.fromEntries(new FormData(dynamicForm).entries());
    const handler=formHandler;formDialog.close();formHandler=null;handler?.(data);
  });

  confirmForm.addEventListener("submit",(event)=>{
    if(event.submitter?.value==="cancel")return;
    event.preventDefault();
    const handler=confirmHandler;confirmDialog.close();confirmHandler=null;handler?.();
  });

  cancellationForm.addEventListener("submit", (event) => {
    if (event.submitter?.value === "cancel") return;
    event.preventDefault();
    if (!selectedCancellation || !cancellationForm.reportValidity()) return;
    const payload = { ...selectedCancellation, reason: cancellationReason.value.trim() };
    cancellationDialog.close();
    selectedCancellation = null;
    completePaidCancellation(payload);
  });

  cancellationDialog.addEventListener("close", () => {
    selectedCancellation = null;
    cancellationReason.value = "";
    cancellationAcknowledge.checked = false;
  });

  reservationForm.addEventListener("submit",(event)=>{
    if(event.submitter?.value==="cancel")return;
    event.preventDefault();
    if(!selectedReservation)return;
    const group = userGroup(groupSelect.value);
    if (!group || !canManageGroupEvents(group)) {
      groupPermissionNote.textContent = "A reserva exige um grupo do usuário e privilégio para criar e alterar eventos.";
      groupPermissionNote.classList.add("permission-denied");
      return;
    }
    if (!reservationPolicyAcknowledge.checked) {
      showToast("Confirme o aceite da política de cancelamento, voucher e reembolso.");
      return;
    }
    const createsNewEvent = eventSelect.value === "__new__";
    const existingEvent = createsNewEvent ? null : state.groupEvents.find((item) => item.id === eventSelect.value && item.groupId === group.id);
    if (!createsNewEvent && !existingEvent) {
      showToast("Selecione um evento válido do grupo.");
      return;
    }
    const title = createsNewEvent ? newEventTitle.value.trim() : existingEvent.title;
    if (!title) {
      if (allowAutomaticFieldFocus) newEventTitle.focus({ preventScroll: true });
      return;
    }
    const selectedCancellationVoucher = cancellationVoucherByValue(voucherSelect.value);
    if (selectedCancellationVoucher) {
      const validVoucher = ["active", "active_extended"].includes(selectedCancellationVoucher.status) && selectedCancellationVoucher.user === state.userProfile.name && selectedCancellationVoucher.venueId === selectedReservation.venue.id && Number(selectedReservation.value) >= Number(selectedCancellationVoucher.value);
      if (!validVoucher) {
        showToast("O voucher não é válido para este parceiro ou valor de reserva.");
        populateVoucherOptions();
        return;
      }
    }
    const id=nextId("R-",state.reservations);
    const promoVoucher = String(voucherSelect.value || "").startsWith("PROMO:") ? String(voucherSelect.value).slice(6) : "";
    const voucherAppliedValue = Number(selectedCancellationVoucher?.value || 0);
    const paymentDue = Math.max(0, Number(selectedReservation.value) - voucherAppliedValue);
    let eventId = existingEvent?.id || "";
    let eventPublicationStatus = "linked_existing";
    let pushStatus = "Não aplicável";
    if (createsNewEvent) {
      eventId = nextId("EV-", state.groupEvents);
      eventPublicationStatus = paymentDue === 0 && selectedCancellationVoucher ? "standby_voucher" : "standby_payment";
      pushStatus = paymentDue === 0 && selectedCancellationVoucher ? "Aguardando resgate do voucher" : "Aguardando pagamento";
      state.groupEvents.unshift({
        id: eventId,
        groupId: group.id,
        title,
        date: selectedReservation.day.date,
        time: selectedReservation.time,
        venue: selectedReservation.venue.name,
        statusKey: "standby_payment",
        status: paymentDue === 0 && selectedCancellationVoucher ? "Aguardando resgate do voucher" : "Aguardando pagamento",
        published: false,
        source: "reservation",
        sourceReservationId: id,
        publicationEndpoint: selectedCancellationVoucher ? "waiting.voucher_or_complement" : "waiting.payment.confirmed",
        pushStatus: "Aguardando publicação"
      });
    }
    const fullyCovered = Boolean(selectedCancellationVoucher && paymentDue === 0);
    const newReservation = {
      id,
      venueId:selectedReservation.venue.id,
      venue:selectedReservation.venue.name,
      user:state.userProfile.name,
      date:selectedReservation.day.date,
      shortDate:selectedReservation.day.shortDate,
      time:selectedReservation.time,
      value:selectedReservation.value,
      statusKey: fullyCovered ? "confirmed" : "pending",
      status: fullyCovered ? "Confirmada com voucher" : selectedCancellationVoucher ? "Reserva pendente — complemento" : "Reserva pendente",
      endpoint: fullyCovered ? "voucher.redeemed" : selectedCancellationVoucher ? "payment.complement.pending" : "reservation.created",
      paymentStatus: fullyCovered ? "Pago com voucher" : selectedCancellationVoucher ? "Complemento pendente" : "Pagamento pendente",
      paymentDue,
      voucherAppliedValue,
      cancellationVoucherId:selectedCancellationVoucher?.id || "",
      voucher:selectedCancellationVoucher?.code || promoVoucher,
      groupId:group.id,
      groupName:group.name,
      groupRole:group.role,
      eventId,
      event:title,
      eventMode:createsNewEvent?"new":"existing",
      eventPublicationStatus,
      pushStatus,
      cancellationPolicyAccepted:true,
      cancellationPolicyAcceptedAt:new Date().toLocaleString("pt-BR"),
      cancellationPolicyVersion:"voucher-responsibility-availability-v2",
      accountingRecognizedValue:0,
      fiscalObligationValue:0,
      accountingOriginMonth:selectedCancellationVoucher?.accountingOriginMonth || ""
    };
    state.reservations.unshift(newReservation);
    if (selectedCancellationVoucher) {
      if (fullyCovered) {
        Object.assign(selectedCancellationVoucher, { status:"used", usedAt:new Date().toLocaleString("pt-BR"), usedReservationId:id, consumedValue:selectedCancellationVoucher.value });
        state.accountingLedger.unshift({ id: nextId("LED-", state.accountingLedger), type:"voucher_redeemed", reservationId:id, voucherId:selectedCancellationVoucher.id, venueId:newReservation.venueId, venue:newReservation.venue, amount:selectedCancellationVoucher.value, fiscalAmount:0, accountingMonth:accountingMonth(), description:"Voucher consumido integralmente sem nova obrigação" });
        publishStandbyEventForReservation(newReservation, "event.publish_after_voucher");
      } else {
        Object.assign(selectedCancellationVoucher, { status:"reserved", reservedAt:new Date().toLocaleString("pt-BR"), reservedReservationId:id });
      }
    }
    saveState();reservationDialog.close();render();
    if (fullyCovered) showToast(`Reserva ${id} confirmada com voucher; evento publicado automaticamente.`);
    else if (selectedCancellationVoucher) showToast(`Reserva ${id} criada; falta pagar ${money(paymentDue)} de complemento.`);
    else showToast(createsNewEvent ? `Reserva ${id} criada; evento em espera até o pagamento.` : `Reserva ${id} vinculada ao evento ${title}.`);
  });

  if("serviceWorker" in navigator && location.protocol!=="file:")navigator.serviceWorker.register("service-worker.js").catch(()=>{});
  render();
})();
