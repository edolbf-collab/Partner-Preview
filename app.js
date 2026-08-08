(function () {
  "use strict";

  const VERSION = "0.1.28";
  const STORAGE_KEY = "tamo_on_partners_preview_0119";
  const THEME_STORAGE_KEY = "tamo_on_marketplace_theme";
  const app = document.getElementById("app");
  const roleButtons = [...document.querySelectorAll(".role-chip")];
  const themeButton = document.getElementById("toggleMarketplaceTheme");
  const marketplaceThemeColor = document.getElementById("marketplaceThemeColor");
  const toast = document.getElementById("toast");
  const reservationDialog = document.getElementById("reservationDialog");
  const reservationForm = document.getElementById("reservationForm");
  const reservationTitle = document.getElementById("reservationTitle");
  const reservationSummary = document.getElementById("reservationSummary");
  const reservationSummaryHead = document.getElementById("reservationSummaryHead");
  const reservationSummaryTotal = document.getElementById("reservationSummaryTotal");
  const groupSelect = document.getElementById("groupSelect");
  const groupPermissionNote = document.getElementById("groupPermissionNote");
  const eventSelect = document.getElementById("eventSelect");
  const newEventPanel = document.getElementById("newEventPanel");
  const newEventTitle = document.getElementById("newEventTitle");
  const reservationAutomationPreview = document.getElementById("reservationAutomationPreview");
  const voucherSelect = document.getElementById("voucherSelect");
  const reservationVoucherPreview = document.getElementById("reservationVoucherPreview");
  const paymentMethodSelect = document.getElementById("paymentMethodSelect");
  const paymentMethodNote = document.getElementById("paymentMethodNote");
  const paymentProviderPreview = document.getElementById("paymentProviderPreview");
  const automationPaymentText = document.getElementById("automationPaymentText");
  const pixSplitPanel = document.getElementById("pixSplitPanel");
  const pixSplitToggle = document.getElementById("pixSplitToggle");
  const pixSplitConfig = document.getElementById("pixSplitConfig");
  const pixSplitMode = document.getElementById("pixSplitMode");
  const pixSplitMembers = document.getElementById("pixSplitMembers");
  const pixSplitSummary = document.getElementById("pixSplitSummary");
  const reservationPolicyAcknowledge = document.getElementById("reservationPolicyAcknowledge");
  const reservationPolicyText = document.getElementById("reservationPolicyText");
  const monthlyReservationToggle = document.getElementById("monthlyReservationToggle");
  const monthlyReservationPanel = document.getElementById("monthlyReservationPanel");
  const monthlyReservationPreview = document.getElementById("monthlyReservationPreview");
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
  const chatDialog = document.getElementById("chatDialog");
  const chatTitle = document.getElementById("chatTitle");
  const chatSubtitle = document.getElementById("chatSubtitle");
  const chatMessages = document.getElementById("chatMessages");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");
  const chatStatus = document.getElementById("chatStatus");

  let formHandler = null;
  let confirmHandler = null;
  let selectedReservation = null;
  let selectedVenueSchedule = null;
  let detailReturnContext = null;
  let reservationReturnContext = null;
  let selectedCancellation = null;
  let selectedChatReservationId = null;
  const allowAutomaticFieldFocus = window.matchMedia("(min-width: 701px) and (pointer: fine)").matches;

  const menus = {
    user: [
      ["discover", "⌕", "Buscar quadras"],
      ["reservations", "▣", "Minhas reservas"],
      ["favorites", "♡", "Favoritos"],
      ["promotions", "%", "Voucher"],
      ["profile", "○", "Conta Tâmo On"]
    ],
    partner: [
      ["overview", "⌂", "Visão geral"],
      ["agenda", "▦", "Agenda"],
      ["reservations", "▣", "Reservas"],
      ["spaces", "◇", "Espaços"],
      ["clients", "◎", "Clientes"],
      ["team", "♙", "Equipe"],
      ["vouchers", "%", "Vouchers"],
      ["finance", "$", "Financeiro"],
      ["registration", "≡", "Cadastro"]
    ],
    admin: [
      ["overview", "⌂", "Visão geral"],
      ["partners", "◇", "Parceiros"],
      ["reservations", "▣", "Reservas"],
      ["users", "◎", "Usuários"],
      ["finance", "$", "Financeiro"],
      ["vouchers", "%", "Vouchers"],
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
      groupMembers: [
        { id:"GM-001", groupId:"G-001", name:"Eduardo Batista", role:"Administrador" },
        { id:"GM-002", groupId:"G-001", name:"Carlos Mendes", role:"Membro" },
        { id:"GM-003", groupId:"G-001", name:"Rafael Souza", role:"Membro" },
        { id:"GM-004", groupId:"G-001", name:"Marcos Lima", role:"Membro" },
        { id:"GM-005", groupId:"G-001", name:"João Martins", role:"Membro" },
        { id:"GM-006", groupId:"G-001", name:"Paulo Reis", role:"Membro" },
        { id:"GM-101", groupId:"G-002", name:"Eduardo Batista", role:"Organizador" },
        { id:"GM-102", groupId:"G-002", name:"Mariana Lopes", role:"Membro" },
        { id:"GM-103", groupId:"G-002", name:"Ana Paula Costa", role:"Membro" },
        { id:"GM-104", groupId:"G-002", name:"Lucas Ferreira", role:"Membro" },
        { id:"GM-105", groupId:"G-002", name:"Bruno Alves", role:"Membro" }
      ],
      groupEvents: [
        { id: "EV-0101", groupId: "G-001", title: "Pelada de quinta-feira", date: "13/08/2026", time: "20:00", statusKey: "published", status: "Publicado", published: true, source: "existing" },
        { id: "EV-0102", groupId: "G-002", title: "Amistoso de sábado", date: "15/08/2026", time: "16:00", statusKey: "published", status: "Publicado", published: true, source: "existing" },
        { id: "EV-0201", groupId: "G-001", title: "Arena Central · 06/08 às 20:00", date: "06/08/2026", time: "20:00", venue: "Arena Central", statusKey: "standby_payment", status: "Aguardando pagamento", published: false, source: "reservation", sourceReservationId: "R-0007", publicationEndpoint: "waiting.payment.confirmed", pushStatus: "Aguardando publicação" },
        { id: "EV-0202", groupId: "G-002", title: "Arena Central · 07/08 às 18:00", date: "07/08/2026", time: "18:00", venue: "Arena Central", statusKey: "published", status: "Publicado", published: true, source: "reservation", sourceReservationId: "R-0008", publicationEndpoint: "event.publish_after_payment", pushStatus: "Enviado", pushEndpoint: "push.group_members" }
      ],
      pushLog: [],
      cancellationLog: [],
      cancellationVouchers: [
        { id: "VC-0001", code: "CANCELA-0001", sourceReservationId: "R-0004", partnerReservationId: "RP-099", user: "Eduardo Batista", venueId: "arena-central", venue: "Arena Central", value: 120, originalValue: 120, originalTime: "18:00", originalPeriod: "Noite", compatibilityWindow: "16:00–20:00", minimumCompatibleDates: 4, compatibleDatesCount: 4, compatibleSlotsCount: 4, compatibleDates: ["06/08/2026","13/08/2026","20/08/2026","27/08/2026"], status: "active", issuedAt: "05/08/2026, 10:00:00", issuedDate: "05/08/2026", expiresAt: "04/09/2026", validityDays: 30, useType: "single", eligibleBookingMode: "any", originBookingMode: "single", minimumReservationValue: 120, partnerLiability: true, accountingOriginMonth: "08/2026", accountingTreatment: "Pagamento original mantido; resgate sem nova obrigação, salvo complemento", cancellationSource: "user", cancellationReason: "Cancelamento dentro do prazo", reassignmentStatus: "Vinculado ao parceiro original" }
      ],
      cancellationExceptionReviews: [],
      accountingLedger: [
        { id: "LED-0001", type: "service_payment", reservationId: "R-0008", venueId: "arena-central", venue: "Arena Central", amount: 130, accountingMonth: "08/2026", fiscalAmount: 130, description: "Pagamento original da reserva" },
        { id: "LED-0002", type: "service_payment", reservationId: "R-0006", venueId: "cancha-horizonte", venue: "Cancha Horizonte", amount: 105, accountingMonth: "08/2026", fiscalAmount: 105, description: "Pagamento original da reserva" }
      ],
      pixCollections: [],
      paymentIntents: [
        { id:"PAY-0001", reservationId:"R-0008", method:"credit_card_asaas", provider:"ASAAS", status:"CONFIRMED", amount:130, route:"credit_card_asaas", externalReference:"R-0008", createdAt:"07/08/2026 18:01" },
        { id:"PAY-0002", reservationId:"R-0006", method:"pix_direct_partner", provider:"SICOOB", status:"CONFIRMED", amount:105, route:"pix_direct_partner_api", externalReference:"R-0006", txid:"R0006TOTAL", createdAt:"06/08/2026 18:55" }
      ],
      paymentWebhookLog: [
        { id:"WH-0001", provider:"ASAAS", event:"PAYMENT_CONFIRMED", reservationId:"R-0008", status:"Processado", createdAt:"07/08/2026 18:02" },
        { id:"WH-0002", provider:"SICOOB", event:"PIX_RECEIVED", reservationId:"R-0006", status:"Processado", createdAt:"06/08/2026 18:56" }
      ],
      chatThreads: [
        { id:"CHAT-R-0008", reservationId:"R-0008", partnerReservationId:"RP-103", venueId:"arena-central", venue:"Arena Central", user:"Eduardo Batista", createdAt:"07/08/2026 18:03", unlockedAt:"07/08/2026 18:02", status:"active", unread:{user:0,partner:1}, lastReadAt:{user:"07/08/2026 18:07",partner:"07/08/2026 18:05"}, messages:[
          { id:"MSG-0001", senderType:"partner", senderName:"Arena Central", text:"Olá! Sua reserva está confirmada. Se precisar combinar algum detalhe sobre acesso ou estrutura da quadra, pode falar por aqui.", createdAt:"07/08/2026 18:05" },
          { id:"MSG-0002", senderType:"user", senderName:"Eduardo Batista", text:"Perfeito. Vamos chegar alguns minutos antes para organizar o grupo.", createdAt:"07/08/2026 18:07" }
        ] }
      ],
      favorites: ["arena-central"],
      appliedVouchers: [],
      ui: { selectedAvailabilityKeys: [] },
      venues: [
        {
          id: "arena-central", name: "Arena Central", city: "Curitiba", neighborhood: "Água Verde", distance: "2,4 km",
          rating: 4.8, reviews: 126, ratingSource: "users", types: ["Futsal", "Society"], price: 120, address: "Rua das Palmeiras, 250",
          facadeImage: "assets/venues/arena-central-fachada.png", facadeSource: "partner_upload", amenities: ["Vestiário", "Estacionamento", "Churrasqueira"], bankProviderId:"SICOOB", bankLabel:"Sicoob", pixKey:"CNPJ cadastrado", asaasWalletId:"wallet_preview_arena_central",
          schedule: [
            { date: "06/08/2026", shortDate: "06/08", weekday: "Qui", dayLabel: "6 ago", slots: [{ time: "18:00", endTime: "19:00", price: 120, monthlyEligible: true, monthlyPrice: 440, space: "Quadra Society 1" }, { time: "19:00", endTime: "20:00", price: 120, blocked: true, space: "Quadra Society 1" }, { time: "20:00", endTime: "21:30", price: 150, space: "Quadra Society 1" }, { time: "21:30", endTime: "22:30", price: 130, space: "Quadra Society 1" }] },
            { date: "07/08/2026", shortDate: "07/08", weekday: "Sex", dayLabel: "7 ago", slots: [{ time: "18:00", price: 130 }, { time: "19:00", price: 140 }, { time: "20:00", price: 140 }, { time: "21:00", price: 140 }] },
            { date: "08/08/2026", shortDate: "08/08", weekday: "Sáb", dayLabel: "8 ago", slots: [{ time: "14:00", price: 150 }, { time: "16:00", price: 150 }, { time: "18:00", price: 160 }, { time: "20:00", price: 160 }] },
            { date: "09/08/2026", shortDate: "09/08", weekday: "Dom", dayLabel: "9 ago", slots: [{ time: "10:00", price: 150 }, { time: "12:00", price: 150 }, { time: "16:00", price: 160 }, { time: "18:00", price: 160 }] },
            { date: "10/08/2026", shortDate: "10/08", weekday: "Seg", dayLabel: "10 ago", slots: [{ time: "18:30", endTime: "19:30", price: 120, space: "Quadra Society 1" }, { time: "19:30", endTime: "20:30", price: 120, space: "Quadra Society 1" }, { time: "20:30", endTime: "22:00", price: 150, space: "Quadra Society 1" }] },
            { date: "11/08/2026", shortDate: "11/08", weekday: "Ter", dayLabel: "11 ago", slots: [{ time: "18:00", price: 120 }, { time: "19:00", price: 120 }, { time: "20:00", price: 130 }, { time: "21:00", price: 130 }] },
            { date: "12/08/2026", shortDate: "12/08", weekday: "Qua", dayLabel: "12 ago", slots: [{ time: "18:00", endTime: "19:00", price: 120, space: "Quadra Society 1" }, { time: "19:00", endTime: "20:00", price: 120, space: "Quadra Society 1" }, { time: "20:00", endTime: "21:30", price: 150, space: "Quadra Society 1" }, { time: "21:30", endTime: "22:30", price: 130, space: "Quadra Society 1" }] },
            { date: "13/08/2026", shortDate: "13/08", weekday: "Qui", dayLabel: "13 ago", slots: [{ time: "18:00", endTime: "19:00", price: 120, monthlyEligible: true, monthlyPrice: 440, space: "Quadra Society 1" }, { time: "19:00", endTime: "20:00", price: 120, space: "Quadra Society 1" }, { time: "20:00", endTime: "21:30", price: 150, space: "Quadra Society 1" }] },
            { date: "20/08/2026", shortDate: "20/08", weekday: "Qui", dayLabel: "20 ago", slots: [{ time: "18:00", endTime: "19:00", price: 120, monthlyEligible: true, monthlyPrice: 440, space: "Quadra Society 1" }, { time: "19:00", endTime: "20:00", price: 120, space: "Quadra Society 1" }, { time: "20:00", endTime: "21:30", price: 150, space: "Quadra Society 1" }] },
            { date: "27/08/2026", shortDate: "27/08", weekday: "Qui", dayLabel: "27 ago", slots: [{ time: "18:00", endTime: "19:00", price: 120, monthlyEligible: true, monthlyPrice: 440, space: "Quadra Society 1" }, { time: "19:00", endTime: "20:00", price: 120, space: "Quadra Society 1" }, { time: "20:00", endTime: "21:30", price: 150, space: "Quadra Society 1" }] }
          ]
        },
        {
          id: "cancha-horizonte", name: "Cancha Horizonte", city: "São José dos Pinhais", neighborhood: "Centro", distance: "8,1 km",
          rating: 4.6, reviews: 74, ratingSource: "users", types: ["Society"], price: 105, address: "Avenida Central, 840",
          facadeImage: "assets/venues/cancha-horizonte.svg", facadeSource: "partner_upload", amenities: ["Estacionamento", "Lanchonete"], bankProviderId:"SICREDI", bankLabel:"Sicredi", pixKey:"Chave Pix cadastrada", asaasWalletId:"wallet_preview_cancha_horizonte",
          schedule: [
            { date: "06/08/2026", shortDate: "06/08", weekday: "Qui", dayLabel: "6 ago", slots: [{ time: "17:30", price: 105 }, { time: "19:00", price: 105 }, { time: "20:30", price: 115, blocked: true }, { time: "22:00", price: 105 }] },
            { date: "07/08/2026", shortDate: "07/08", weekday: "Sex", dayLabel: "7 ago", slots: [{ time: "17:30", price: 110 }, { time: "19:00", price: 120 }, { time: "20:30", price: 120 }, { time: "22:00", price: 110 }] },
            { date: "09/08/2026", shortDate: "09/08", weekday: "Dom", dayLabel: "9 ago", slots: [{ time: "10:00", price: 120 }, { time: "12:00", price: 120 }, { time: "16:00", price: 130 }, { time: "18:00", price: 130 }] }
          ]
        },
        {
          id: "vale-verde", name: "Complexo Vale Verde", city: "Colombo", neighborhood: "Roça Grande", distance: "11,7 km",
          rating: 4.7, reviews: 91, ratingSource: "users", types: ["Futsal", "Campo"], price: 95, address: "Estrada do Vale, 41",
          facadeImage: "assets/venues/vale-verde.svg", facadeSource: "partner_upload", amenities: ["Vestiário", "Arquibancada", "Iluminação"], bankProviderId:"BB", bankLabel:"Banco do Brasil", pixKey:"Chave Pix cadastrada", asaasWalletId:"wallet_preview_vale_verde",
          schedule: [
            { date: "06/08/2026", shortDate: "06/08", weekday: "Qui", dayLabel: "6 ago", slots: [{ time: "18:00", price: 95 }, { time: "19:30", price: 105 }, { time: "21:00", price: 105 }] },
            { date: "08/08/2026", shortDate: "08/08", weekday: "Sáb", dayLabel: "8 ago", slots: [{ time: "09:00", price: 120 }, { time: "11:00", price: 120 }, { time: "15:00", price: 140 }, { time: "17:00", price: 140 }] },
            { date: "09/08/2026", shortDate: "09/08", weekday: "Dom", dayLabel: "9 ago", slots: [{ time: "09:00", price: 130 }, { time: "11:00", price: 130 }, { time: "15:00", price: 150 }, { time: "17:00", price: 150 }] }
          ]
        }
      ],
      promotions: [
        { id: "P-01", title: "Primeira reserva", code: "BEMVINDO10", benefit: "10% de desconto", discountType:"percentage", discountValue:10, minimumReservationValue:0, bookingMode:"any", venueId:"all", venue: "Todos os parceiros", validUntil: "31/08/2026", active: true, issuerType:"admin", issuerName:"Tâmo On" },
        { id: "P-02", title: "Fora do horário de pico", code: "FORADEPICO", benefit: "R$ 15,00 de desconto", discountType:"fixed", discountValue:15, minimumReservationValue:15, bookingMode:"any", venueId:"cancha-horizonte", venue: "Cancha Horizonte", validUntil: "20/08/2026", active: true, issuerType:"partner", issuerName:"Cancha Horizonte" },
        { id: "P-03", title: "Grupo recorrente", code: "GRUPO4X", benefit: "20% de desconto", discountType:"percentage", discountValue:20, minimumReservationValue:0, bookingMode:"any", venueId:"arena-central", venue: "Arena Central", validUntil: "30/09/2026", active: true, issuerType:"partner", issuerName:"Arena Central" }
      ],
      reservations: [
        { id: "R-0007", venueId: "arena-central", venue: "Arena Central", user: "Eduardo Batista", date: "06/08/2026", shortDate: "06/08", time: "20:00", value: 120, statusKey: "pending", status: "Reserva pendente", endpoint: "reservation.created", groupId: "G-001", groupName: "Quinta sem Falta", groupRole: "Administrador", eventId: "EV-0201", event: "Arena Central · 06/08 às 20:00", eventMode: "new", eventPublicationStatus: "standby_payment", pushStatus: "Aguardando pagamento", voucher: "" },
        { id: "R-0008", venueId: "arena-central", venue: "Arena Central", user: "Eduardo Batista", date: "07/08/2026", shortDate: "07/08", time: "18:00", value: 130, statusKey: "confirmed", status: "Confirmada e paga", endpoint: "asaas.webhook.payment_confirmed", paymentStatus: "Pago via cartão", paymentMethod: "credit_card_asaas", paymentProvider: "ASAAS", paymentIntentId:"PAY-0001", accountingRecognizedValue: 130, accountingMonth: "08/2026", fiscalObligationValue: 130, cancellationPolicyAccepted: true, cancellationPolicyVersion: "voucher-responsibility-availability-v2", groupId: "G-002", groupName: "Amigos do Bairro", groupRole: "Organizador", eventId: "EV-0202", event: "Arena Central · 07/08 às 18:00", eventMode: "new", eventPublicationStatus: "published", pushStatus: "Enviado", voucher: "" },
        { id: "R-0006", venueId: "cancha-horizonte", venue: "Cancha Horizonte", user: "Marcos Lima", date: "06/08/2026", shortDate: "06/08", time: "19:00", value: 105, statusKey: "confirmed", status: "Confirmada", endpoint: "bank_pix.webhook.received", paymentStatus:"Pix confirmado pelo banco", paymentMethod:"pix_direct_partner", paymentProvider:"SICOOB", paymentIntentId:"PAY-0002", accountingRecognizedValue: 105, accountingMonth: "08/2026", fiscalObligationValue: 105, cancellationPolicyAccepted: true, cancellationPolicyVersion: "voucher-responsibility-availability-v2", groupId: "G-010", groupName: "Amigos do Bairro", eventId: "EV-0901", event: "Amistoso do bairro", eventMode: "existing", eventPublicationStatus: "linked_existing", pushStatus: "Não aplicável", voucher: "FORADEPICO" },
        { id: "R-0005", venueId: "arena-central", venue: "Arena Central", user: "Paulo Reis", date: "05/08/2026", shortDate: "05/08", time: "21:00", value: 120, statusKey: "cancelled", status: "Cancelada", endpoint: "reservation.cancelled", groupId: "G-020", groupName: "Grupo do Paulo", eventId: "", event: "", eventMode: "none", eventPublicationStatus: "cancelled", pushStatus: "Não enviado", voucher: "" }
      ],
      partnerAgenda: [
        { id: "A-01", day: 6, time: "18:00", endTime: "19:00", title: "Grupo Quinta sem Falta", space: "Quadra Society 1", type: "confirmed", detail: "Reserva R-0010 · 1 hora" },
        { id: "A-02", day: 6, time: "19:00", endTime: "20:00", title: "Solicitação pendente", space: "Quadra Society 1", type: "pending", detail: "Aguardando confirmação" },
        { id: "A-03", day: 6, time: "20:00", endTime: "21:00", title: "Pelada dos Amigos", space: "Quadra Futsal", type: "confirmed", detail: "Evento vinculado" },
        { id: "A-04", day: 6, time: "21:00", endTime: "22:00", title: "Manutenção do gramado", space: "Quadra Society 1", type: "blocked", detail: "Bloqueio interno" },
        { id: "A-05", day: 7, time: "19:00", endTime: "20:00", title: "Grupo Sexta FC", space: "Quadra Society 1", type: "confirmed", detail: "Reserva recorrente" }
      ],
      partnerSpaces: [
        { id: "E-01", name: "Quadra Society 1", type: "Society", floor: "Grama sintética", capacity: 14, price: 120, monthlyPrice: 440, status: "Ativo", lights: "Sim", covered: "Não", maintenance: "15/08/2026" },
        { id: "E-02", name: "Quadra Futsal", type: "Futsal", floor: "Piso esportivo", capacity: 12, price: 95, monthlyPrice: 350, status: "Ativo", lights: "Sim", covered: "Sim", maintenance: "22/08/2026" }
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
        paymentModel: "Pix direto + cartão pelo Asaas",
        bank: "Sicoob",
        bankProviderId: "SICOOB",
        branch: "0001",
        account: "****-5",
        pixKey: "CNPJ cadastrado",
        pixApiStatus: "Estrutura pronta · credenciais não configuradas",
        pixAutoReconciliation: true,
        pixWebhookStatus: "Rota preparada",
        asaasSubaccount: "Sandbox não provisionado",
        asaasWalletId: "wallet_preview_arena_central",
        asaasCardStatus: "Checkout hospedado preparado",
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
        asaasCommissionRate: 2,
        cancellationHours: 24,
        voucherValidityDays: 30,
        voucherCompatibilityWindowHours: 2,
        voucherMinimumCompatibleDates: 4,
        voucherExtensionDays: 7,
        cancellationVoucherPolicy: true
      }
    };
  }

  function storedMarketplaceTheme() {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
    } catch (_error) {
      return "dark";
    }
  }

  function applyMarketplaceTheme(theme, persist = true) {
    const normalized = theme === "light" ? "light" : "dark";
    if (normalized === "light") document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;

    if (marketplaceThemeColor) marketplaceThemeColor.content = normalized === "light" ? "#f4faf6" : "#0b1f17";
    if (themeButton) {
      const isLight = normalized === "light";
      themeButton.setAttribute("aria-pressed", String(isLight));
      themeButton.setAttribute("aria-label", isLight ? "Ativar tema escuro" : "Ativar tema claro");
      themeButton.title = isLight ? "Ativar tema escuro" : "Ativar tema claro";
      const icon = themeButton.querySelector(".theme-button-icon");
      const label = themeButton.querySelector(".theme-button-label");
      if (icon) icon.textContent = isLight ? "☾" : "☀";
      if (label) label.textContent = isLight ? "Tema escuro" : "Tema claro";
    }
    if (persist) {
      try { localStorage.setItem(THEME_STORAGE_KEY, normalized); } catch (_error) {}
    }
  }

  function toggleMarketplaceTheme() {
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    applyMarketplaceTheme(next);
    showToast(next === "light" ? "Tema claro ativado no Marketplace." : "Tema escuro ativado no Marketplace.");
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!(saved && saved.activePage && saved.venues)) return initialState();
      saved.ui = saved.ui || {};
      saved.ui.selectedAvailabilityKeys = Array.isArray(saved.ui.selectedAvailabilityKeys) ? saved.ui.selectedAvailabilityKeys : [];
      saved.chatThreads = Array.isArray(saved.chatThreads) ? saved.chatThreads : [];
      saved.chatThreads.forEach((thread) => {
        if (!thread.unread || typeof thread.unread !== "object") {
          const last = Array.isArray(thread.messages) && thread.messages.length ? thread.messages[thread.messages.length - 1] : null;
          thread.unread = { user: last?.senderType === "partner" ? 1 : 0, partner: last?.senderType === "user" ? 1 : 0 };
        } else {
          thread.unread.user = Number(thread.unread.user || 0);
          thread.unread.partner = Number(thread.unread.partner || 0);
        }
        thread.lastReadAt = thread.lastReadAt || { user:"", partner:"" };
      });
      return saved;
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

  function firstReservationOccurrence(reservation) {
    const occurrences = Array.isArray(reservation?.occurrences) && reservation.occurrences.length
      ? [...reservation.occurrences].sort((a,b) => parsePtDateTime(a.date,a.time).getTime() - parsePtDateTime(b.date,b.time).getTime())
      : [{ date: reservation?.date, time: reservation?.time, endTime: reservation?.endTime }];
    return occurrences[0] || { date: reservation?.date, time: reservation?.time, endTime: reservation?.endTime };
  }

  function cancellationEligibility(reservation, source = "user") {
    if (!reservation) return { eligible: false, hoursRemaining: 0, mode: "none" };
    const firstOccurrence = firstReservationOccurrence(reservation);
    const useAt = parsePtDateTime(firstOccurrence.date, firstOccurrence.time);
    const hoursRemaining = (useAt.getTime() - Date.now()) / 3600000;
    if (source === "partner" || source === "tamo") return { eligible: true, hoursRemaining, mode: "refund", firstOccurrence };
    const eligible = hoursRemaining >= Number(state.settings.cancellationHours || 24);
    if (reservation.monthly && !eligible) return { eligible: false, hoursRemaining, mode: "monthly_locked", firstOccurrence };
    return { eligible, hoursRemaining, mode: eligible ? "voucher" : "no_compensation", firstOccurrence };
  }

  function timeToMinutes(time) {
    const [hour, minute] = String(time || "00:00").split(":").map(Number);
    return Math.max(0, Math.min(1439, (hour || 0) * 60 + (minute || 0)));
  }

  function minutesToTime(minutes) {
    const normalized = Math.max(0, Math.min(1439, Number(minutes || 0)));
    return `${String(Math.floor(normalized / 60)).padStart(2, "0")}:${String(normalized % 60).padStart(2, "0")}`;
  }

  function slotEndTime(slot) {
    return slot?.endTime || minutesToTime(timeToMinutes(slot?.time || "00:00") + 60);
  }

  function timeRange(startTime, endTime) {
    return `${startTime} às ${endTime || minutesToTime(timeToMinutes(startTime) + 60)}`;
  }

  function isoToLocalDate(isoDate) {
    const [year, month, day] = String(isoDate || "").split("-").map(Number);
    return new Date(year, Math.max(0, month - 1), day || 1, 12, 0, 0);
  }

  function scheduleDayFromDate(date) {
    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    return { date: formatPtDate(date), shortDate: `${String(date.getDate()).padStart(2,"0")}/${String(date.getMonth()+1).padStart(2,"0")}`, weekday: weekdays[date.getDay()], dayLabel: `${date.getDate()} ${months[date.getMonth()]}` };
  }

  function isoDateString(date) {
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
  }

  function timeRangesOverlap(startA, endA, startB, endB) {
    return timeToMinutes(startA) < timeToMinutes(endB) && timeToMinutes(startB) < timeToMinutes(endA);
  }

  function normalizedSlotSpace(slot) {
    return slot?.space || state.partnerSpaces[0]?.name || "Espaço principal";
  }

  function scheduleConflict(venue, dateMeta, space, startTime, endTime, excludeSlot = null) {
    const day = venue.schedule.find((item) => item.shortDate === dateMeta.shortDate);
    if (!day) return null;
    return day.slots.find((slot) => slot !== excludeSlot && normalizedSlotSpace(slot) === space && timeRangesOverlap(startTime, endTime, slot.time, slotEndTime(slot))) || null;
  }

  function availabilityKey(shortDate, time, space) {
    return `${String(shortDate || "")}::${String(time || "")}::${String(space || "")}`;
  }

  function selectedAvailabilityKeys() {
    state.ui = state.ui || {};
    state.ui.selectedAvailabilityKeys = Array.isArray(state.ui.selectedAvailabilityKeys) ? state.ui.selectedAvailabilityKeys : [];
    return state.ui.selectedAvailabilityKeys;
  }

  function publicAvailabilityEntries(venue) {
    return (venue?.schedule || []).flatMap((day) => day.slots.map((slot) => ({ day, slot, key: availabilityKey(day.shortDate, slot.time, normalizedSlotSpace(slot)) })));
  }

  function blockableAvailabilityEntries(venue) {
    return publicAvailabilityEntries(venue)
      .filter(({day,slot}) => !slot.blocked && !availabilityHasActiveReservation(venue,day,slot))
      .sort((a,b) => parsePtDateTime(a.day.date,a.slot.time) - parsePtDateTime(b.day.date,b.slot.time) || normalizedSlotSpace(a.slot).localeCompare(normalizedSlotSpace(b.slot)));
  }

  function availabilityHasActiveReservation(venue, day, slot) {
    return Boolean(findReservationForSlot(venue.id, slot.time, day.shortDate, slotEndTime(slot), normalizedSlotSpace(slot)));
  }

  function removeAvailabilityEntries(venue, keys) {
    const keySet = new Set(keys);
    let removed = 0;
    venue.schedule.forEach((day) => {
      const before = day.slots.length;
      day.slots = day.slots.filter((slot) => !keySet.has(availabilityKey(day.shortDate, slot.time, normalizedSlotSpace(slot))));
      removed += before - day.slots.length;
    });
    venue.schedule = venue.schedule.filter((day) => day.slots.length);
    state.ui.selectedAvailabilityKeys = selectedAvailabilityKeys().filter((key) => !keySet.has(key));
    return removed;
  }

  function partnerScheduleDays(venue) {
    return [...(venue?.schedule || [])].filter((day) => Array.isArray(day.slots) && day.slots.length).sort((a,b) => parsePtDateTime(a.date,"12:00") - parsePtDateTime(b.date,"12:00"));
  }

  function selectedPartnerAgendaDate(venue) {
    state.ui = state.ui || {};
    const days = partnerScheduleDays(venue);
    if (!days.length) {
      state.ui.partnerAgendaDate = "";
      return "";
    }
    if (days.some((day) => day.shortDate === state.ui.partnerAgendaDate)) return state.ui.partnerAgendaDate;
    const legacyDay = Number(state.partnerDay || 0);
    const legacyMatch = days.find((day) => Number(String(day.shortDate).slice(0,2)) === legacyDay);
    state.ui.partnerAgendaDate = (legacyMatch || days[0]).shortDate;
    return state.ui.partnerAgendaDate;
  }

  function partnerAgendaDateStrip(venue, selectedDate) {
    const days = partnerScheduleDays(venue);
    if (!days.length) return emptyState("▦", "Nenhum dia foi criado na agenda.");
    return `<div class="partner-agenda-date-strip schedule-days" aria-label="Dias criados na agenda">${days.map((day) => `<button type="button" class="schedule-day ${day.shortDate === selectedDate ? "active" : ""}" data-action="partner-schedule-date" data-date="${esc(day.shortDate)}"><small>${esc(day.weekday)}</small><strong>${esc(day.dayLabel)}</strong></button>`).join("")}</div>`;
  }

  function operationalSlotInfo(venue, day, slot) {
    if (slot.blocked) {
      return {
        type:"blocked",
        title:slot.blockTitle || "Bloqueio operacional",
        detail:slot.blockDetail || "Horário indisponível no marketplace",
        statusLabel:"Bloqueado",
        reservation:null
      };
    }
    const reservation = findReservationForSlot(venue.id, slot.time, day.shortDate, slotEndTime(slot), normalizedSlotSpace(slot));
    if (!reservation) {
      return {
        type:"available",
        title:"Disponível no marketplace",
        detail:`${money(slot.price)}${slot.monthlyEligible ? ` · Mensalista ${money(slot.monthlyPrice)}` : ""}`,
        statusLabel:"Disponível",
        reservation:null
      };
    }
    const statusKey = reservation.statusKey || partnerReservationStatusKey(reservation);
    const confirmed = statusKey === "confirmed";
    return {
      type:confirmed ? "confirmed" : "pending",
      title:reservation.groupName || reservation.client || reservation.user || "Reserva",
      detail:`${reservation.id || "Reserva"} · ${reservation.paymentStatus || reservation.payment || (confirmed ? "Confirmada" : "Pendente")}`,
      statusLabel:confirmed ? "Reservado · confirmado" : "Reserva pendente",
      reservation
    };
  }

  function ensureScheduleDay(venue, meta) {
    let day = venue.schedule.find((item) => item.shortDate === meta.shortDate);
    if (!day) {
      day = {...meta, slots:[]};
      venue.schedule.push(day);
      venue.schedule.sort((a,b) => parsePtDateTime(a.date,"12:00") - parsePtDateTime(b.date,"12:00"));
    }
    return day;
  }

  function slotForSchedulePeriod(venue, meta, space, startTime, endTime) {
    const day = venue.schedule.find((item) => item.shortDate === meta.shortDate);
    const slot = day?.slots.find((item) => normalizedSlotSpace(item) === space && item.time === startTime && slotEndTime(item) === endTime) || null;
    return { day, slot };
  }

  function cascadeAvailabilityPlan(venue, editDay, editSlot, nextEndTime) {
    const space = normalizedSlotSpace(editSlot);
    const ordered = editDay.slots.filter((slot) => normalizedSlotSpace(slot) === space).sort((a,b) => a.time.localeCompare(b.time));
    const index = ordered.indexOf(editSlot);
    if (index < 0) return { valid: true, changes: [] };
    const following = [];
    let originalCursor = slotEndTime(editSlot);
    for (const candidate of ordered.slice(index + 1)) {
      if (candidate.time !== originalCursor) break;
      following.push(candidate);
      originalCursor = slotEndTime(candidate);
    }
    let cursor = timeToMinutes(nextEndTime);
    const changes = [];
    for (const slot of following) {
      const duration = Math.max(1, timeToMinutes(slotEndTime(slot)) - timeToMinutes(slot.time));
      const nextStart = minutesToTime(cursor);
      if (availabilityHasActiveReservation(venue, editDay, slot) && slot.time !== nextStart) {
        return { valid:false, reason:`O horário ${timeRange(slot.time,slotEndTime(slot))} possui reserva ativa e não pode ser deslocado automaticamente.` };
      }
      const endMinutes = cursor + duration;
      if (endMinutes >= 1440) return { valid:false, reason:"A reorganização ultrapassaria 23:59. Ajuste o término ou reorganize a grade manualmente." };
      changes.push({ slot, startTime: nextStart, endTime: minutesToTime(endMinutes) });
      cursor = endMinutes;
    }
    return { valid:true, changes };
  }

  function monthlyAvailabilityPropagationPlan(venue, sourceDay, sourceSlot, desiredStartTime, desiredEndTime) {
    const sourceDate = parsePtDateTime(sourceDay.date, "12:00");
    const originalStart = sourceSlot.time;
    const originalSpace = normalizedSlotSpace(sourceSlot);
    const targetDuration = timeToMinutes(desiredEndTime) - timeToMinutes(desiredStartTime);
    if (targetDuration <= 0) return { valid:false, reason:"A duração mensalista precisa ser maior que zero.", dayPlans:[] };
    const dayPlans = [];
    const candidateDays = venue.schedule.filter((day) => {
      if (day === sourceDay) return false;
      const date = parsePtDateTime(day.date, "12:00");
      return date >= sourceDate && date.getMonth() === sourceDate.getMonth() && date.getFullYear() === sourceDate.getFullYear() && date.getDay() === sourceDate.getDay();
    });
    for (const day of candidateDays) {
      const slot = day.slots.find((item) => normalizedSlotSpace(item) === originalSpace && item.time === originalStart);
      if (!slot) continue;
      if (slot.blocked) return { valid:false, reason:`${day.date} possui o período ${timeRange(slot.time,slotEndTime(slot))} bloqueado e ele não pode integrar a sequência mensalista.`, dayPlans:[] };
      if (availabilityHasActiveReservation(venue, day, slot) && (slot.time !== desiredStartTime || slotEndTime(slot) !== desiredEndTime)) {
        return { valid:false, reason:`${day.date} · ${timeRange(slot.time,slotEndTime(slot))} já possui reserva ativa e não pode ter sua duração alterada.`, dayPlans:[] };
      }
      const cascade = cascadeAvailabilityPlan(venue, day, slot, desiredEndTime);
      if (!cascade.valid) return { valid:false, reason:`${day.date}: ${cascade.reason}`, dayPlans:[] };
      const followingSet = new Set(cascade.changes.map((change) => change.slot));
      const unaffected = day.slots.filter((item) => item !== slot && !followingSet.has(item) && normalizedSlotSpace(item) === originalSpace);
      const proposed = [{ startTime:desiredStartTime, endTime:desiredEndTime }, ...cascade.changes];
      const collision = proposed.find((period) => unaffected.some((item) => timeRangesOverlap(period.startTime,period.endTime,item.time,slotEndTime(item))));
      if (collision) {
        const conflict = unaffected.find((item) => timeRangesOverlap(collision.startTime,collision.endTime,item.time,slotEndTime(item)));
        return { valid:false, reason:`${day.date}: a grade ajustada em ${timeRange(collision.startTime,collision.endTime)} encontraria o horário independente ${timeRange(conflict.time,slotEndTime(conflict))}.`, dayPlans:[] };
      }
      dayPlans.push({ day, slot, cascade });
    }
    return { valid:true, dayPlans };
  }

  function applyMonthlyAvailabilityPropagation(plan, desiredStartTime, desiredEndTime, monthlyPrice) {
    let changedDays = 0;
    let shiftedSlots = 0;
    (plan?.dayPlans || []).forEach(({day,slot,cascade}) => {
      slot.time = desiredStartTime;
      slot.endTime = desiredEndTime;
      slot.monthlyEligible = true;
      slot.monthlyPrice = Number(monthlyPrice || 0);
      cascade.changes.forEach((change) => {
        change.slot.time = change.startTime;
        change.slot.endTime = change.endTime;
        shiftedSlots += 1;
      });
      day.slots.sort((a,b) => a.time.localeCompare(b.time));
      changedDays += 1;
    });
    return { changedDays, shiftedSlots };
  }

  function datesForAgendaRange(startIso, endIso, preset) {
    const start = isoToLocalDate(startIso);
    const end = isoToLocalDate(endIso);
    if (end < start) return [];
    const initialWeekday = start.getDay();
    const dates = [];
    for (let date = new Date(start); date <= end; date.setDate(date.getDate()+1)) {
      const weekday = date.getDay();
      const include = preset === "Todos os dias" ||
        (preset === "Segunda a sexta" && weekday >= 1 && weekday <= 5) ||
        (preset === "Segunda a sábado" && weekday >= 1 && weekday <= 6) ||
        (preset === "Sábados e domingos" && (weekday === 0 || weekday === 6)) ||
        (preset === "Mesmo dia da semana da data inicial" && weekday === initialWeekday);
      if (include) dates.push(new Date(date));
    }
    return dates;
  }

  function rangesForAgendaGeneration(mode, startTime, endTime, durationMinutes, intervalMinutes) {
    const start = timeToMinutes(startTime);
    const end = timeToMinutes(endTime);
    if (end <= start) return [];
    if (mode === "Um horário recorrente") return [{ startTime, endTime }];
    const duration = Math.max(15, Number(durationMinutes || 60));
    const interval = Math.max(0, Number(intervalMinutes || 0));
    const ranges = [];
    for (let cursor = start; cursor + duration <= end; cursor += duration + interval) {
      ranges.push({ startTime: minutesToTime(cursor), endTime: minutesToTime(cursor + duration) });
      if (ranges.length > 96) break;
    }
    return ranges;
  }

  function monthlyOccurrencesForSelection(selection) {
    if (!selection?.slot?.monthlyEligible) return [];
    const startDate = parsePtDateTime(selection.day.date, "12:00");
    const endTime = slotEndTime(selection.slot);
    return selection.venue.schedule
      .filter((day) => {
        const date = parsePtDateTime(day.date, "12:00");
        return date >= startDate && date.getMonth() === startDate.getMonth() && date.getFullYear() === startDate.getFullYear() && date.getDay() === startDate.getDay();
      })
      .map((day) => {
        const slot = day.slots.find((item) => item.time === selection.time && slotEndTime(item) === endTime && !item.blocked);
        if (!slot || !slot.monthlyEligible || findReservationForSlot(selection.venue.id, selection.time, day.shortDate, endTime, normalizedSlotSpace(slot))) return null;
        return { date: day.date, shortDate: day.shortDate, weekday: day.weekday, dayLabel: day.dayLabel, time: selection.time, endTime, space: normalizedSlotSpace(slot), value: Number(slot.price || selection.slot.price) };
      })
      .filter(Boolean);
  }

  function isMonthlySelection() {
    return Boolean(selectedReservation?.slot?.monthlyEligible && monthlyReservationToggle?.checked);
  }

  function currentReservationValue() {
    if (!selectedReservation) return 0;
    return isMonthlySelection() ? Number(selectedReservation.slot.monthlyPrice || selectedReservation.value) : Number(selectedReservation.value);
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
        const occupied = findReservationForSlot(venue.id, slot.time, day.shortDate, slotEndTime(slot), normalizedSlotSpace(slot));
        const bookingModeCompatible = voucher.eligibleBookingMode !== "monthly" || slot.monthlyEligible;
        return !slot.blocked && !occupied && bookingModeCompatible && timePeriod(slot.time) === window.period && minutes >= window.start && minutes <= window.end;
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

  function promotionByValue(value) {
    if (!String(value || "").startsWith("PROMO:")) return null;
    const code = String(value).slice(6);
    return state.promotions.find((promo) => promo.code === code) || null;
  }

  function promotionDiscountType(promo) {
    if (promo?.discountType) return promo.discountType;
    return /%/.test(String(promo?.benefit || "")) ? "percentage" : "fixed";
  }

  function promotionDiscountValue(promo) {
    const explicit = Number(promo?.discountValue);
    if (Number.isFinite(explicit) && explicit > 0) return explicit;
    const benefit = String(promo?.benefit || "");
    if (promotionDiscountType(promo) === "percentage") {
      const match = benefit.match(/(\d+(?:[,.]\d+)?)\s*%/);
      return match ? Number(match[1].replace(",", ".")) : 0;
    }
    const match = benefit.match(/R\$\s*([\d.]+(?:,\d+)?)/i);
    return match ? Number(match[1].replace(/\./g, "").replace(",", ".")) : 0;
  }

  function promotionBenefitLabel(promo) {
    const type = promotionDiscountType(promo);
    const value = promotionDiscountValue(promo);
    return type === "percentage" ? `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(value)}% de desconto` : `${money(value)} de desconto`;
  }

  function promotionVenueId(promo) {
    if (promo?.venueId) return promo.venueId;
    if (promo?.venue === "Todos os parceiros") return "all";
    return state.venues.find((venue) => venue.name === promo?.venue)?.id || "all";
  }

  function promotionValid(promo) {
    if (!promo?.active) return false;
    const expiry = parsePtDateTime(promo.validUntil || "31/12/2099", "23:59");
    return Number.isFinite(expiry.getTime()) && expiry.getTime() >= Date.now();
  }

  function promotionEligibleForSelection(promo) {
    if (!selectedReservation || !promotionValid(promo)) return false;
    const venueId = promotionVenueId(promo);
    if (venueId !== "all" && venueId !== selectedReservation.venue.id) return false;
    const bookingMode = promo.bookingMode || "any";
    if (bookingMode === "monthly" && !isMonthlySelection()) return false;
    if (bookingMode === "single" && isMonthlySelection()) return false;
    if (currentReservationValue() < Number(promo.minimumReservationValue || 0)) return false;
    return promotionDiscountValue(promo) > 0;
  }

  function promotionalDiscountAmount(promo, total = currentReservationValue()) {
    if (!promo || !promotionEligibleForSelection(promo)) return 0;
    const value = promotionDiscountValue(promo);
    const discount = promotionDiscountType(promo) === "percentage" ? Number(total || 0) * (value / 100) : value;
    return Math.max(0, Math.min(Number(total || 0), Math.round(discount * 100) / 100));
  }

  function selectedVoucherFinancials() {
    const total = currentReservationValue();
    const cancellation = cancellationVoucherByValue(voucherSelect?.value);
    if (cancellation) return { kind:"cancellation", item:cancellation, code:cancellation.code, amount:Math.min(total, Number(cancellation.value || 0)), label:`${cancellation.code} · crédito ${money(cancellation.value)}` };
    const promotion = promotionByValue(voucherSelect?.value);
    if (promotion && promotionEligibleForSelection(promotion)) {
      const amount = promotionalDiscountAmount(promotion, total);
      return { kind:"promotion", item:promotion, code:promotion.code, amount, label:`${promotion.code} · ${promotionBenefitLabel(promotion)}` };
    }
    return { kind:"none", item:null, code:"", amount:0, label:"" };
  }

  function dateLongPt(dateText) {
    const date = parsePtDateTime(dateText, "12:00");
    if (!Number.isFinite(date.getTime())) return String(dateText || "");
    return new Intl.DateTimeFormat("pt-BR", { weekday:"long", day:"numeric", month:"long", year:"numeric" }).format(date);
  }

  function cancellationVoucherByValue(value) {
    if (!String(value || "").startsWith("CANCEL:")) return null;
    const id = String(value).slice(7);
    return state.cancellationVouchers.find((voucher) => voucher.id === id) || null;
  }

  function eligibleCancellationVouchersForReservation() {
    if (!selectedReservation) return [];
    activeCancellationVouchers();
    const monthly = isMonthlySelection();
    return state.cancellationVouchers.filter((voucher) =>
      ["active", "active_extended"].includes(voucher.status) &&
      voucher.user === state.userProfile.name &&
      voucher.venueId === selectedReservation.venue.id &&
      currentReservationValue() >= Number(voucher.value) &&
      (voucher.eligibleBookingMode !== "monthly" || monthly)
    );
  }

  function populateVoucherOptions() {
    const eligible = eligibleCancellationVouchersForReservation();
    const eligiblePromotions = state.promotions.filter(promotionEligibleForSelection);
    const promoOptions = eligiblePromotions.map((promo) => `<option value="PROMO:${esc(promo.code)}">${esc(promo.code)} · ${esc(promotionBenefitLabel(promo))}</option>`).join("");
    const cancellationOptions = eligible.map((voucher) => `<option value="CANCEL:${esc(voucher.id)}">${esc(voucher.code)} · crédito ${money(voucher.value)}${voucher.eligibleBookingMode === "monthly" ? " · somente mensalista" : ""}</option>`).join("");
    voucherSelect.innerHTML = `<option value="">Não utilizar voucher</option>${cancellationOptions ? `<optgroup label="Vouchers de cancelamento">${cancellationOptions}</optgroup>` : ""}${promoOptions ? `<optgroup label="Vouchers promocionais">${promoOptions}</optgroup>` : ""}`;
    const preferredCode = [...state.appliedVouchers].reverse().find((code) => eligiblePromotions.some((promo) => promo.code === code));
    voucherSelect.value = preferredCode ? `PROMO:${preferredCode}` : "";
    updateVoucherPaymentPreview();
  }

  function groupMembers(groupId) {
    return state.groupMembers.filter((member) => member.groupId === groupId);
  }

  function pixSplitEnabled() {
    return selectedPaymentMethod() === "pix_direct_partner" && Boolean(pixSplitToggle?.checked);
  }

  function equalPixShares(total, members) {
    const cents = Math.round(Number(total || 0) * 100);
    const count = Math.max(1, members.length);
    const base = Math.floor(cents / count);
    let remainder = cents - base * count;
    return members.map((member) => ({ member, amount: (base + (remainder-- > 0 ? 1 : 0)) / 100 }));
  }

  function selectedPixSplitShares() {
    if (!pixSplitEnabled()) return [];
    const members = groupMembers(groupSelect.value).filter((member) => pixSplitMembers?.querySelector(`[data-split-member="${member.id}"]`)?.checked);
    if (pixSplitMode?.value !== "custom") return equalPixShares(currentPaymentDue(), members);
    return members.map((member) => ({ member, amount: Number(pixSplitMembers?.querySelector(`[data-split-value="${member.id}"]`)?.value || 0) }));
  }

  function currentPaymentDue() {
    const total = currentReservationValue();
    const voucher = selectedVoucherFinancials();
    return Math.max(0, total - Number(voucher.amount || 0));
  }

  function updatePixSplitPanel() {
    if (!pixSplitPanel || !selectedReservation) return;
    const due = currentPaymentDue();
    const isPix = selectedPaymentMethod() === "pix_direct_partner" && due > 0;
    pixSplitPanel.hidden = !isPix;
    if (!isPix) {
      pixSplitToggle.checked = false;
      pixSplitConfig.hidden = true;
      pixSplitMembers.innerHTML = "";
      pixSplitSummary.innerHTML = "";
      return;
    }
    pixSplitConfig.hidden = !pixSplitToggle.checked;
    if (!pixSplitToggle.checked) {
      pixSplitMembers.innerHTML = "";
      pixSplitSummary.innerHTML = "";
      return;
    }
    const members = groupMembers(groupSelect.value);
    const existingSelection = new Map([...pixSplitMembers.querySelectorAll('[data-split-member]')].map((input) => [input.dataset.splitMember, input.checked]));
    const existingValues = new Map([...pixSplitMembers.querySelectorAll('[data-split-value]')].map((input) => [input.dataset.splitValue, input.value]));
    const selectedMembers = members.filter((m) => existingSelection.has(m.id) ? existingSelection.get(m.id) : true);
    const equal = equalPixShares(due, selectedMembers);
    const equalMap = new Map(equal.map((item) => [item.member.id, item.amount]));
    pixSplitMembers.innerHTML = members.map((member) => {
      const checked = existingSelection.has(member.id) ? existingSelection.get(member.id) : true;
      const amount = pixSplitMode.value === "custom" ? (existingValues.get(member.id) ?? (checked ? (equalMap.get(member.id) || 0).toFixed(2) : "0.00")) : (checked ? (equalMap.get(member.id) || 0).toFixed(2) : "0.00");
      return `<div class="pix-split-member-row"><label><input type="checkbox" data-split-member="${esc(member.id)}" ${checked ? "checked" : ""}><span><strong>${esc(member.name)}</strong><small>${esc(member.role)}</small></span></label><div class="pix-split-value"><span>R$</span><input type="number" min="0" step="0.01" inputmode="decimal" data-split-value="${esc(member.id)}" value="${esc(amount)}" ${pixSplitMode.value === "equal" ? "readonly" : ""}></div></div>`;
    }).join("");
    updatePixSplitSummary();
  }

  function updatePixSplitSummary() {
    if (!pixSplitSummary || !pixSplitEnabled()) return;
    const due = currentPaymentDue();
    const shares = selectedPixSplitShares();
    if (pixSplitMode.value === "equal") {
      const equal = equalPixShares(due, shares.map((share)=>share.member));
      const byId = new Map(equal.map((share)=>[share.member.id,share.amount]));
      pixSplitMembers.querySelectorAll('[data-split-value]').forEach((input)=>{ input.value=(byId.get(input.dataset.splitValue)||0).toFixed(2); });
    }
    const finalShares = selectedPixSplitShares();
    const total = finalShares.reduce((sum, share) => sum + Number(share.amount || 0), 0);
    const diff = Math.round((due - total) * 100) / 100;
    const valid = finalShares.length >= 2 && Math.abs(diff) < 0.01 && finalShares.every((share)=>share.amount > 0);
    pixSplitSummary.innerHTML = `<div><span>Valor a arrecadar</span><strong>${money(due)}</strong></div><div><span>Membros selecionados</span><strong>${finalShares.length}</strong></div><div><span>Soma das cotas</span><strong>${money(total)}</strong></div><p class="${valid ? "split-ok" : "split-warning"}">${valid ? "Rateio pronto. Cada membro receberá uma pendência Pix própria." : finalShares.length < 2 ? "Selecione ao menos dois membros para usar o rateio." : `A soma das cotas precisa ser exatamente ${money(due)}. Diferença: ${money(Math.abs(diff))}.`}</p>`;
    updateReservationSubmitState();
  }

  function validatePixSplit() {
    if (!pixSplitEnabled()) return { valid:true, shares:[] };
    const due = currentPaymentDue();
    const shares = selectedPixSplitShares();
    const total = shares.reduce((sum, share)=>sum + Number(share.amount||0),0);
    const valid = shares.length >= 2 && shares.every((share)=>share.amount > 0) && Math.abs(total-due) < 0.01;
    return { valid, shares, total, due };
  }

  function createPixSplitCollection(reservation, shares) {
    const collectionId = nextId("COL-", state.pixCollections);
    const collection = { id:collectionId, reservationId:reservation.id, groupId:reservation.groupId, groupName:reservation.groupName, venueId:reservation.venueId, venue:reservation.venue, amount:shares.reduce((sum,share)=>sum+share.amount,0), status:"PENDING", paidAmount:0, paidCount:0, memberCount:shares.length, createdAt:new Date().toLocaleString("pt-BR"), items:[] };
    const venue = state.venues.find((item)=>item.id===reservation.venueId);
    const partner = { venueId:reservation.venueId, tradeName:reservation.venue, bank:venue?.bankLabel||"Banco do parceiro", bankProviderId:venue?.bankProviderId||"GENERIC_MANUAL", pixKey:venue?.pixKey||"Chave Pix cadastrada", asaasWalletId:venue?.asaasWalletId||"" };
    shares.forEach((share,index)=>{
      const memberReservation = { ...reservation, id:`${reservation.id}-${share.member.id}`, externalReference:`${reservation.id}:${share.member.id}`, memberId:share.member.id, memberName:share.member.name };
      const intent = window.TamoOnPaymentRouter?.createPreviewIntent({ method:"pix_direct_partner", reservation:memberReservation, partner, amount:share.amount, commissionRate:0 });
      if (!intent) return;
      const providerIntentId=intent.id;
      intent.id=nextId("PAY-",state.paymentIntents);
      intent.providerIntentId=providerIntentId;
      intent.reservationId=reservation.id;
      intent.collectionId=collectionId;
      intent.memberId=share.member.id;
      intent.memberName=share.member.name;
      intent.method="pix_direct_partner";
      intent.amount=share.amount;
      intent.externalReference=`${reservation.id}:${share.member.id}`;
      intent.createdAt=new Date().toLocaleString("pt-BR");
      state.paymentIntents.unshift(intent);
      collection.items.push({ memberId:share.member.id, memberName:share.member.name, amount:share.amount, status:"PENDING", paymentIntentId:intent.id, txid:intent.normalized?.txid||"" });
    });
    state.pixCollections.unshift(collection);
    reservation.pixSplit=true;
    reservation.pixCollectionId=collectionId;
    reservation.paymentIntentIds=collection.items.map((item)=>item.paymentIntentId);
    reservation.paymentRoute="pix_direct_partner_split";
    reservation.paymentProvider=partner.bankProviderId;
    return collection;
  }

  function selectedPaymentMethod() {
    return paymentMethodSelect?.value || window.TamoOnPaymentRouter?.METHODS?.PIX_DIRECT_PARTNER || "pix_direct_partner";
  }

  function paymentMethodLabel(method = selectedPaymentMethod()) {
    return window.TamoOnPaymentRouter?.methodLabel(method) || (method === "credit_card_asaas" ? "Cartão de crédito · Asaas" : "Pix direto ao parceiro");
  }

  function paymentProviderForSelection() {
    if (selectedPaymentMethod() === "credit_card_asaas") return "ASAAS";
    return selectedReservation?.venue?.bankProviderId || state.partnerProfile.bankProviderId || "GENERIC_MANUAL";
  }

  function updatePaymentProviderPreview() {
    if (!paymentProviderPreview || !paymentMethodNote || !selectedReservation) return;
    const total = currentReservationValue();
    const voucher = selectedVoucherFinancials();
    const due = Math.max(0, total - Number(voucher.amount || 0));
    if (due <= 0) {
      paymentMethodSelect.disabled = true;
      paymentMethodNote.textContent = "Voucher integral: nenhuma cobrança externa.";
      paymentProviderPreview.innerHTML = `<div class="provider-status-line"><span class="status status-ok">Quitado por voucher</span><strong>${money(total)}</strong></div>`;
      if (automationPaymentText) automationPaymentText.textContent = "Reserva coberta integralmente por voucher";
      if (pixSplitPanel) { pixSplitPanel.hidden = true; pixSplitToggle.checked = false; pixSplitConfig.hidden = true; }
      return;
    }
    paymentMethodSelect.disabled = false;
    const method = selectedPaymentMethod();
    if (method === "credit_card_asaas") {
      paymentMethodNote.textContent = "Pagamento seguro pelo checkout Asaas.";
      paymentProviderPreview.innerHTML = `<div class="provider-status-line"><span class="status status-warning">Sandbox</span><strong>Asaas · ${money(due)}</strong></div>`;
      if (automationPaymentText) automationPaymentText.textContent = "Aguardando confirmação do cartão pelo webhook Asaas";
    } else {
      const providerId = selectedReservation?.venue?.bankProviderId || state.partnerProfile.bankProviderId || "GENERIC_MANUAL";
      const provider = window.TamoOnBankPix?.provider(providerId) || { label: state.partnerProfile.bank || "Banco do parceiro", mode: "manual" };
      const automatic = provider.mode === "api";
      paymentMethodNote.textContent = automatic ? "Pix direto ao parceiro com baixa bancária automática." : "Pix direto ao parceiro com confirmação manual.";
      paymentProviderPreview.innerHTML = `<div class="provider-status-line"><span class="status ${automatic ? "status-ok" : "status-warning"}">${automatic ? "Baixa automática" : "Confirmação manual"}</span><strong>${esc(provider.label)} · ${money(due)}</strong></div>`;
      if (automationPaymentText) automationPaymentText.textContent = automatic ? `Aguardando confirmação Pix do ${provider.label}` : "Aguardando confirmação do parceiro";
    }
    updatePixSplitPanel();
  }

  function createPaymentIntentForReservation(reservation, amount) {
    if (Number(amount || 0) <= 0) return null;
    const intent = window.TamoOnPaymentRouter?.createPreviewIntent({
      method: reservation.paymentMethod,
      reservation,
      partner: reservation.venueId === state.partnerProfile.venueId ? state.partnerProfile : (() => { const venue = state.venues.find((item)=>item.id===reservation.venueId); return { venueId: reservation.venueId, tradeName: reservation.venue, bank: venue?.bankLabel || "Banco do parceiro", bankProviderId: venue?.bankProviderId || "GENERIC_MANUAL", pixKey: venue?.pixKey || "Chave Pix cadastrada", asaasWalletId: venue?.asaasWalletId || "" }; })(),
      amount,
      commissionRate: Number(state.settings.defaultCommission || 0)
    });
    if (!intent) return null;
    const providerIntentId = intent.id;
    intent.id = nextId("PAY-", state.paymentIntents);
    intent.providerIntentId = providerIntentId;
    intent.reservationId = reservation.id;
    intent.method = reservation.paymentMethod;
    intent.amount = Number(amount || 0);
    intent.externalReference = reservation.id;
    intent.createdAt = new Date().toLocaleString("pt-BR");
    state.paymentIntents.unshift(intent);
    reservation.paymentIntentId = intent.id;
    reservation.paymentProvider = intent.provider || (reservation.paymentMethod === "credit_card_asaas" ? "ASAAS" : state.partnerProfile.bankProviderId || "GENERIC_MANUAL");
    reservation.paymentRoute = intent.route || reservation.paymentMethod;
    if (intent.normalized?.txid) reservation.pixTxid = intent.normalized.txid;
    return intent;
  }

  function updateReservationPaymentSummary() {
    if (!selectedReservation) return;
    const total = currentReservationValue();
    const voucher = selectedVoucherFinancials();
    const complement = Math.max(0, total - Number(voucher.amount || 0));
    const occurrences = isMonthlySelection() ? monthlyOccurrencesForSelection(selectedReservation) : [{ date: selectedReservation.day.date }];
    const modeLabel = isMonthlySelection() ? `Mensalista · ${occurrences.length} data(s)` : "Reserva avulsa";
    reservationSummaryHead.innerHTML = `<div class="payment-summary-title"><div><strong>${esc(selectedReservation.venue.name)}</strong><small>${esc(selectedReservation.day.date)} · ${esc(timeRange(selectedReservation.time, slotEndTime(selectedReservation.slot)))}</small></div><span class="status ${isMonthlySelection() ? "status-ok" : "status-neutral"}">${modeLabel}</span></div>`;
    reservationSummaryTotal.innerHTML = `<div class="reservation-total-line"><span>${voucher.amount > 0 ? `Valor ${money(total)} · voucher −${money(voucher.amount)}` : "Valor total"}</span><strong>${money(complement)}</strong></div>`;
  }

  function updateVoucherPaymentPreview() {
    if (!reservationVoucherPreview || !selectedReservation) return;
    updateReservationPaymentSummary();
    const total = currentReservationValue();
    const voucher = selectedVoucherFinancials();
    if (!voucher.amount) {
      reservationVoucherPreview.innerHTML = "";
      updatePaymentProviderPreview();
      return;
    }
    const complement = Math.max(0, total - voucher.amount);
    reservationVoucherPreview.innerHTML = `<div class="voucher-compact-result"><span>${esc(voucher.code)} −${money(voucher.amount)}</span><strong>Restante ${money(complement)}</strong></div>`;
    updatePaymentProviderPreview();
  }

  function updateMonthlyReservationPreview() {
    if (!monthlyReservationPanel || !monthlyReservationPreview || !selectedReservation) return;
    const eligible = Boolean(selectedReservation.slot.monthlyEligible && Number(selectedReservation.slot.monthlyPrice || 0) > 0);
    monthlyReservationPanel.hidden = !eligible;
    monthlyReservationToggle.disabled = !eligible;
    if (!eligible) {
      monthlyReservationToggle.checked = false;
      monthlyReservationPreview.innerHTML = "";
      updateVoucherPaymentPreview();
      return;
    }
    const occurrences = monthlyOccurrencesForSelection(selectedReservation);
    if (!monthlyReservationToggle.checked) {
      monthlyReservationPreview.innerHTML = `<strong>${money(selectedReservation.slot.monthlyPrice)}</strong><span>${occurrences.length} datas disponíveis · ${timeRange(selectedReservation.time, selectedReservation.endTime)}</span>`;
      updateVoucherPaymentPreview();
      return;
    }
    monthlyReservationPreview.innerHTML = `<div class="monthly-preview-heading"><strong>${money(selectedReservation.slot.monthlyPrice)}</strong><span>${occurrences.length} datas reservadas</span></div><p class="monthly-occurrence-text">${occurrences.map((occurrence) => `${esc(dateLongPt(occurrence.date))}, das ${esc(occurrence.time)} às ${esc(occurrence.endTime)}`).join("; ")}.</p>`;
    updateVoucherPaymentPreview();
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
    return `${reservation.venue.name} · ${reservation.day.shortDate} · ${timeRange(reservation.time,reservation.endTime)}${isMonthlySelection() ? " · Mensalista" : ""}`;
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
    groupPermissionNote.textContent = !group ? "Selecione um grupo." : allowed ? `${group.role} · autorizado` : `${group.role} · sem permissão para eventos`;
    groupPermissionNote.classList.toggle("permission-denied", Boolean(group && !allowed));
    eventSelect.disabled = !allowed;
    if (!allowed) {
      eventSelect.innerHTML = `<option value="">Grupo sem permissão</option>`;
      newEventPanel.hidden = true;
      updateReservationSubmitState();
      return;
    }
    const events = state.groupEvents.filter((event) => event.groupId === group.id && event.published);
    eventSelect.innerHTML = `<option value="__new__">Criar novo evento automaticamente</option>${events.map((event) => `<option value="${esc(event.id)}">${esc(event.title)} · ${esc(event.date)} ${esc(event.time)}</option>`).join("")}`;
    eventSelect.value = "__new__";
    newEventTitle.value = selectedReservation ? defaultEventTitle(selectedReservation) : "";
    updateNewEventPanel();
    updatePixSplitPanel();
  }

  function updateNewEventPanel() {
    const createsNew = eventSelect.value === "__new__";
    newEventPanel.hidden = true;
    if (createsNew && selectedReservation) newEventTitle.value = defaultEventTitle(selectedReservation);
    reservationAutomationPreview.classList.toggle("existing-event", !createsNew);
    const outcome = reservationAutomationPreview.querySelector("span");
    if (outcome) outcome.textContent = createsNew ? "A reserva é confirmada e o novo evento é publicado automaticamente no grupo." : "A reserva é confirmada e vinculada ao evento selecionado.";
    updateReservationSubmitState();
  }

  function updateReservationSubmitState() {
    const group = userGroup(groupSelect.value);
    const validGroup = canManageGroupEvents(group);
    const validEvent = Boolean(eventSelect.value);
    const validPolicy = Boolean(reservationPolicyAcknowledge?.checked);
    const splitValidation = validatePixSplit();
    const submit = document.getElementById("confirmReservation");
    if (submit) submit.disabled = !(validGroup && validEvent && validPolicy && splitValidation.valid);
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

  function cancellationImpacts(source, mode, reservation = null) {
    const common = [
      "O horário cancelado será liberado imediatamente para uma nova reserva.",
      "O evento criado ou vinculado será cancelado e os membros do grupo serão comunicados.",
      "A operação e o motivo permanecerão registrados no histórico."
    ];
    if (mode === "voucher") return [
      `Será emitido um voucher de uso único no valor integral pago, com prazo nominal de ${state.settings.voucherValidityDays} dias.`,
      reservation?.monthly ? "Por se originar de um pacote mensalista, o voucher só poderá ser utilizado em uma nova reserva mensalista de valor igual ou superior." : "O voucher poderá ser utilizado em qualquer novo dia ou horário disponível do mesmo parceiro, em reserva de valor igual ou superior.",
      `Para o prazo expirar normalmente, o parceiro deverá oferecer ao menos ${state.settings.voucherMinimumCompatibleDates} datas distintas em faixa compatível de até ${state.settings.voucherCompatibilityWindowHours} horas antes ou depois do horário original e no mesmo período do dia.`,
      "Horários apenas pela manhã ou tarde não contam como disponibilidade compatível para um voucher originado à noite.",
      "Se a disponibilidade compatível for insuficiente, a validade será prorrogada automaticamente.",
      "Ao utilizar o voucher, todo o crédito será consumido; eventual diferença deverá ser paga no app.",
      ...common,
      "O pagamento original permanece contabilizado no mês em que ocorreu; somente eventual complemento futuro gera nova obrigação fiscal e contábil."
    ];
    if (mode === "monthly_locked") return [
      `O prazo de cancelamento do pacote mensalista terminou ${state.settings.cancellationHours} horas antes da primeira ocorrência.`,
      "Como os múltiplos horários foram adquiridos em uma única operação, não é possível cancelar apenas ocorrências isoladas nem cancelar o pacote após esse marco.",
      "Não haverá voucher ou reembolso por iniciativa do usuário.",
      "Cancelamentos provocados pelo parceiro ou pelo Tâmo On continuam sujeitos ao reembolso integral, conforme a responsabilidade de quem cancelar."
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
    if (source === "user" && mode === "monthly_locked") {
      const first = eligibility.firstOccurrence || firstReservationOccurrence(effectiveReservation);
      openDetail({ eyebrow:"Mensalista", title:"Cancelamento não disponível", body:`<div class="cancellation-warning"><strong>Prazo encerrado</strong><p>Esta reserva mensalista foi adquirida como um único pacote de múltiplos horários. O cancelamento pelo usuário só era permitido até ${esc(state.settings.cancellationHours)} horas antes da primeira ocorrência.</p><ul>${cancellationImpacts(source, mode, effectiveReservation).map((item)=>`<li>${esc(item)}</li>`).join("")}</ul><div class="detail-list" style="margin-top:12px"><div class="detail-line"><span>Primeira ocorrência</span><strong>${esc(first.date)} · ${esc(timeRange(first.time,first.endTime))}</strong></div><div class="detail-line"><span>Situação</span><strong>Pacote sem possibilidade de cancelamento pelo usuário</strong></div></div></div>` });
      return;
    }
    selectedCancellation = { source, mode, reservationId: effectiveReservation?.id || "", partnerReservationId: partnerReservation?.id || partnerReservationId, outsideDeadline: mode === "no_compensation" };
    cancellationEyebrow.textContent = `Cancelamento pelo ${cancellationSourceLabel(source)}`;
    cancellationTitle.textContent = mode === "voucher" ? (effectiveReservation?.monthly ? "Cancelar mensalista e gerar voucher mensalista" : "Cancelar e gerar voucher") : mode === "refund" ? "Cancelar com reembolso integral" : "Cancelar fora do prazo";
    cancellationSummary.innerHTML = `<strong>${esc(effectiveReservation?.venue || partnerReservation?.space || "Reserva")}</strong><div class="meta-row" style="margin-top:7px"><span>${esc(effectiveReservation?.date || partnerReservation?.date || "")}</span><span>${esc(effectiveReservation?.time || partnerReservation?.time || "")}</span><span>${money(effectiveReservation?.value || partnerReservation?.value || 0)}</span></div>`;
    cancellationWarningText.textContent = mode === "voucher" ? (effectiveReservation?.monthly ? "O pacote mensalista está dentro do prazo. O voucher integral será restrito a uma nova reserva mensalista de valor igual ou superior." : "O usuário está dentro do prazo e receberá voucher conforme a política aceita antes do pagamento.") : mode === "refund" ? "Quem efetua este cancelamento assume o reembolso integral e todos os custos decorrentes." : "O prazo regular foi encerrado. O cancelamento será concluído sem reembolso ou voucher.";
    cancellationImpactList.innerHTML = cancellationImpacts(source, mode, effectiveReservation).map((item) => `<li>${esc(item)}</li>`).join("");
    cancellationReasonLabel.textContent = source === "user" ? "Motivo do cancelamento" : "Justificativa obrigatória ao usuário";
    cancellationReason.placeholder = source === "user" ? "Informe brevemente o motivo do cancelamento." : `Explique por que ${cancellationSourceLabel(source)} precisa cancelar este horário já reservado e pago.`;
    cancellationReason.value = "";
    cancellationAcknowledge.checked = false;
    cancellationAcknowledgeText.textContent = mode === "voucher" ? (effectiveReservation?.monthly ? "Aceito o cancelamento integral do pacote e a emissão de voucher exclusivo para uma nova reserva mensalista de valor igual ou superior." : "Estou ciente de que o horário e o evento serão cancelados e o valor pago será convertido em voucher conforme as regras de disponibilidade compatível.") : mode === "refund" ? "Confirmo o reembolso integral e a responsabilidade do cancelador por todas as taxas e custos, sem desconto para o usuário." : "Estou ciente de que este cancelamento fora do prazo não gera reembolso nem voucher.";
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
      voucher = { id: voucherId, code: voucherCode, sourceReservationId: reservation?.id || "", partnerReservationId: partnerReservation?.id || "", user: reservation?.user || state.userProfile.name, venueId, venue: venueName, value, originalValue: value, originalTime, originalPeriod: timePeriod(originalTime), compatibilityWindow: `${minutesToTime(window.start)}–${minutesToTime(window.end)}`, minimumCompatibleDates: Number(state.settings.voucherMinimumCompatibleDates || 4), status: "active", issuedAt: now, issuedDate: formatPtDate(nowDate), expiresAt: formatPtDate(expiresAtDate), validityDays: Number(state.settings.voucherValidityDays || 30), useType: "single", eligibleBookingMode: reservation?.monthly ? "monthly" : "any", originBookingMode: reservation?.monthly ? "monthly" : "single", minimumReservationValue: value, partnerLiability: true, accountingOriginMonth: reservation?.accountingOriginMonth || reservation?.accountingMonth || accountingMonth(nowDate), accountingTreatment: "Pagamento original mantido; resgate sem nova obrigação, salvo complemento", cancellationSource: source, cancellationReason: reason, reassignmentStatus: "Vinculado ao parceiro original" };
      refreshVoucherAvailability(voucher);
      state.cancellationVouchers.unshift(voucher);
      endpoint = "user.reservation.cancelled_with_voucher";
      paymentStatus = "Pago — convertido em voucher";
      state.accountingLedger.unshift({ id: nextId("LED-", state.accountingLedger), type: "voucher_issued", reservationId: reservation?.id || "", voucherId, venueId, venue: venueName, amount: value, fiscalAmount: 0, accountingMonth: reservation?.accountingOriginMonth || reservation?.accountingMonth || accountingMonth(nowDate), description: reservation?.monthly ? "Voucher mensalista emitido sem reversão do pagamento original" : "Voucher emitido sem reversão do pagamento original" });
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
      const input = `<input type="${esc(field.type || "text")}" name="${esc(field.name)}" value="${esc(field.value ?? "")}" ${field.min !== undefined ? `min="${esc(field.min)}"` : ""} ${field.max !== undefined ? `max="${esc(field.max)}"` : ""} ${field.step !== undefined ? `step="${esc(field.step)}"` : ""} ${required}>`;
      const temporalTypes = ["date", "time", "datetime-local", "month", "week"];
      control = temporalTypes.includes(field.type) ? `<span class="temporal-control">${input}</span>` : input;
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
    const unread = totalUnreadForRole(role);
    if (unread > 0) showToast(`Você tem ${unread} mensagem${unread === 1 ? " nova" : "s novas"} em reservas.`);
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
          ${menu.map(([id, icon, label]) => {
            const unread = id === "reservations" && ["user","partner"].includes(role) ? totalUnreadForRole(role) : 0;
            return `<button type="button" class="subnav-button ${state.activePage[role] === id ? "active" : ""} ${unread ? "has-unread" : ""}" data-nav="${id}"><span class="subnav-icon">${icon}</span><span class="subnav-label">${label}</span>${messageBadge(unread)}</button>`;
          }).join("")}
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

  function partnerReservationStatusKey(reservation) {
    if (!reservation) return "pending";
    if (reservation.status === "Confirmada") return "confirmed";
    if (reservation.status === "Cancelada") return "cancelled";
    return "pending";
  }

  function findPartnerReservationForSlot(venueId, time, shortDate, endTime = "", space = "") {
    if (venueId !== state.partnerProfile.venueId) return null;
    return state.partnerReservations.find((reservation) => {
      if (reservation.status === "Cancelada") return false;
      const reservationSpace = reservation.space || state.partnerSpaces[0]?.name || "Espaço principal";
      const directDate = String(reservation.date || "").slice(0,5);
      const directSpaceMatches = !space || reservationSpace === space;
      const direct = directSpaceMatches && reservation.time === time && directDate === shortDate && (!endTime || !reservation.endTime || reservation.endTime === endTime);
      const recurring = Array.isArray(reservation.occurrences) && reservation.occurrences.some((item) => {
        const occurrenceSpace = item.space || reservationSpace;
        const occurrenceShortDate = item.shortDate || String(item.date || "").slice(0,5);
        return (!space || occurrenceSpace === space) && item.time === time && occurrenceShortDate === shortDate && (!endTime || !item.endTime || item.endTime === endTime);
      });
      return direct || recurring;
    }) || null;
  }

  function findReservationForSlot(venueId, time, shortDate, endTime = "", space = "") {
    const userReservation = state.reservations.find((reservation) => {
      if (reservation.venueId !== venueId || reservation.statusKey === "cancelled") return false;
      const reservationSpace = reservation.space || state.partnerSpaces[0]?.name || "Espaço principal";
      const directSpaceMatches = !space || reservationSpace === space;
      const direct = directSpaceMatches && reservation.time === time && reservation.shortDate === shortDate && (!endTime || !reservation.endTime || reservation.endTime === endTime);
      const recurring = Array.isArray(reservation.occurrences) && reservation.occurrences.some((item) => {
        const occurrenceSpace = item.space || reservationSpace;
        const occurrenceShortDate = item.shortDate || String(item.date || "").slice(0,5);
        return (!space || occurrenceSpace === space) && item.time === time && occurrenceShortDate === shortDate && (!endTime || !item.endTime || item.endTime === endTime);
      });
      return direct || recurring;
    });
    if (userReservation) return userReservation;

    const partnerReservation = findPartnerReservationForSlot(venueId, time, shortDate, endTime, space);
    if (!partnerReservation) return null;
    return {
      ...partnerReservation,
      statusKey: partnerReservationStatusKey(partnerReservation),
      endpoint: partnerReservation.payment === "Externo" ? "partner.manual_reservation" : "partner.reservation",
      _partnerReservation: true
    };
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
    const activeUserVouchers = state.cancellationVouchers.filter((item) => item.user === state.userProfile.name && ["active","active_extended","reserved"].includes(item.status)).length;
    return `<div class="discover-toolbar"><label class="search discover-search"><span>⌕</span><input id="venueSearch" value="${esc(state.search.venue)}" placeholder="Buscar por quadra ou cidade" aria-label="Buscar por quadra ou cidade"></label><button class="promo-menu-button" data-nav="promotions"><span class="promo-menu-icon">V</span><span><strong>Voucher</strong><small>${activeUserVouchers} crédito(s) · ${activePromotions} promocional(is)</small></span><b>›</b></button></div>
      ${pageHeader("Área do usuário", "Buscar quadras", "Selecione um local para consultar a agenda, os horários e os valores cadastrados pelo parceiro.")}
      <section class="grid venue-grid">${filtered.map(venueCard).join("") || emptyState("⌕", "Nenhuma quadra encontrada para essa busca.")}</section>`;
  }

  function userCancellationAction(reservation) {
    if (reservation.statusKey !== "confirmed") return "";
    const eligibility = cancellationEligibility(reservation, "user");
    if (reservation.monthly && eligibility.mode === "monthly_locked") return `<button class="button ghost small" type="button" disabled title="O prazo terminou 24 horas antes da primeira ocorrência">Cancelamento encerrado</button>`;
    return `<button class="button danger small" data-action="cancel-paid-user-reservation" data-id="${esc(reservation.id)}">Cancelar reserva</button>`;
  }

  function pixCollectionForReservation(reservationId) {
    return state.pixCollections.find((collection) => collection.reservationId === reservationId) || null;
  }

  function pixSplitDetailsBody(reservation) {
    const collection = pixCollectionForReservation(reservation.id);
    if (!collection) return `<p class="dialog-description">Nenhum rateio Pix foi encontrado para esta reserva.</p>`;
    const paid = collection.items.filter((item)=>item.status === "PAID").length;
    const paidAmount = collection.items.filter((item)=>item.status === "PAID").reduce((sum,item)=>sum+Number(item.amount||0),0);
    return `<div class="pix-collection-overview"><div><span>Valor da arrecadação</span><strong>${money(collection.amount)}</strong></div><div><span>Recebido</span><strong>${money(paidAmount)}</strong></div><div><span>Pagamentos</span><strong>${paid} de ${collection.memberCount}</strong></div></div><div class="list pix-collection-list">${collection.items.map((item)=>`<div class="list-item compact"><div class="avatar">${initials(item.memberName)}</div><div class="list-item-main"><strong>${esc(item.memberName)}</strong><small>${money(item.amount)} · ${item.txid ? `txid ${esc(item.txid)}` : "confirmação manual"}</small></div><span class="status ${item.status === "PAID" ? "status-ok" : "status-warning"}">${item.status === "PAID" ? "Pago" : "Pendente"}</span>${item.status !== "PAID" ? `<button type="button" class="button secondary small" data-action="simulate-pix-share-paid" data-id="${esc(item.paymentIntentId)}">Simular baixa</button>` : ""}</div>`).join("")}</div><div class="callout"><strong>Fluxo real</strong><p>Cada membro recebe sua cobrança Pix individual diretamente para a conta do parceiro. O webhook do banco baixa a cota pelo identificador da cobrança. A reserva só é quitada quando a soma das cotas confirmadas atingir o valor total.</p></div>`;
  }

  function openPixSplitDetails(reservationId) {
    const reservation = state.reservations.find((item)=>item.id===reservationId);
    if (!reservation) return;
    openDetail({ eyebrow:"Rateio Pix", title:`${reservation.id} · ${reservation.groupName || "Grupo"}`, body:pixSplitDetailsBody(reservation) });
  }

  function simulatePixSharePaid(paymentIntentId) {
    const intent = state.paymentIntents.find((item)=>item.id===paymentIntentId);
    if (!intent || !intent.collectionId || intent.status === "CONFIRMED") return;
    const collection = state.pixCollections.find((item)=>item.id===intent.collectionId);
    const reservation = state.reservations.find((item)=>item.id===intent.reservationId);
    if (!collection || !reservation) return;
    const share = collection.items.find((item)=>item.paymentIntentId===intent.id);
    if (!share) return;
    intent.status="CONFIRMED";
    intent.confirmedAt=new Date().toLocaleString("pt-BR");
    share.status="PAID";
    share.paidAt=intent.confirmedAt;
    collection.paidCount=collection.items.filter((item)=>item.status==="PAID").length;
    collection.paidAmount=collection.items.filter((item)=>item.status==="PAID").reduce((sum,item)=>sum+Number(item.amount||0),0);
    state.paymentWebhookLog.unshift({ id:nextId("WH-",state.paymentWebhookLog), provider:intent.provider||reservation.paymentProvider, event:"PIX_RECEIVED", reservationId:reservation.id, paymentIntentId:intent.id, memberId:intent.memberId, status:"Processado", createdAt:intent.confirmedAt });
    if (collection.paidCount >= collection.memberCount && Math.abs(collection.paidAmount-collection.amount)<0.01) {
      collection.status="SETTLED";
      collection.settledAt=intent.confirmedAt;
      Object.assign(reservation,{ statusKey:"confirmed", status:"Confirmada — rateio quitado", endpoint:"bank_pix.split.settled", paymentStatus:`Rateio Pix quitado · ${collection.paidCount} de ${collection.memberCount} cotas`, accountingRecognizedValue:collection.amount, fiscalObligationValue:collection.amount, accountingMonth:accountingMonth() });
      state.accountingLedger.unshift({ id:nextId("LED-",state.accountingLedger), type:"service_payment", reservationId:reservation.id, venueId:reservation.venueId, venue:reservation.venue, amount:collection.amount, fiscalAmount:collection.amount, accountingMonth:reservation.accountingMonth, description:"Reserva quitada por rateio Pix direto ao parceiro" });
      publishStandbyEventForReservation(reservation,"event.publish_after_pix_split");
      syncPartnerReservationFromUser(reservation);
      ensureChatThread(reservation);
      showToast(`Rateio quitado: ${collection.paidCount} de ${collection.memberCount} cotas confirmadas.`);
    } else {
      reservation.paymentStatus=`Rateio Pix · ${collection.paidCount} de ${collection.memberCount} cotas pagas`;
      showToast(`${share.memberName}: Pix confirmado. Faltam ${collection.memberCount-collection.paidCount} cota(s).`);
    }
    saveState(); render();
    if (detailDialog.open) {
      detailBody.innerHTML=pixSplitDetailsBody(reservation);
    }
  }

  function syncPartnerReservationFromUser(reservation) {
    if (!reservation || reservation.venueId !== state.partnerProfile.venueId) return null;
    let item = state.partnerReservations.find((entry) => entry.userReservationId === reservation.id);
    const normalized = {
      client: reservation.groupName || reservation.user,
      date: reservation.date,
      time: reservation.time,
      endTime: reservation.endTime || "",
      space: reservation.space || state.partnerSpaces[0]?.name || "Espaço principal",
      value: Number(reservation.value || 0),
      monthly: Boolean(reservation.monthly),
      occurrenceCount: Number(reservation.occurrenceCount || 0),
      occurrences: Array.isArray(reservation.occurrences) ? reservation.occurrences : [],
      status: reservation.statusKey === "confirmed" ? "Confirmada" : reservation.statusKey === "cancelled" ? "Cancelada" : "Pendente",
      payment: reservation.paymentStatus || "Não iniciado",
      userReservationId: reservation.id,
      groupName: reservation.groupName || "",
      eventId: reservation.eventId || "",
      accountingRecognizedValue: Number(reservation.accountingRecognizedValue || 0),
      accountingMonth: reservation.accountingMonth || ""
    };
    if (item) Object.assign(item, normalized);
    else {
      item = { id: nextId("RP-", state.partnerReservations), ...normalized };
      state.partnerReservations.unshift(item);
    }
    const thread = chatThreadForReservation(reservation.id);
    if (thread && !thread.partnerReservationId) thread.partnerReservationId = item.id;
    return item;
  }

  function reservationPaymentConfirmed(reservation) {
    if (!reservation || reservation.statusKey !== "confirmed") return false;
    if (String(reservation.paymentStatus || "").toLowerCase().includes("pendente")) return false;
    return Number(reservation.accountingRecognizedValue || 0) > 0 || ["voucher.redeemed","bank_pix.split.settled","asaas.webhook.payment_confirmed","bank_pix.webhook.received"].includes(reservation.endpoint);
  }

  function chatThreadForReservation(reservationId) {
    return state.chatThreads.find((thread) => thread.reservationId === reservationId) || null;
  }

  function partnerReservationForUserReservation(reservationId) {
    return state.partnerReservations.find((item) => item.userReservationId === reservationId) || null;
  }

  function ensureChatThread(reservation) {
    if (!reservation || !reservationPaymentConfirmed(reservation)) return null;
    let thread = chatThreadForReservation(reservation.id);
    if (thread) return thread;
    const partnerReservation = partnerReservationForUserReservation(reservation.id);
    thread = {
      id: `CHAT-${reservation.id}`,
      reservationId: reservation.id,
      partnerReservationId: partnerReservation?.id || "",
      venueId: reservation.venueId,
      venue: reservation.venue,
      user: reservation.user,
      createdAt: new Date().toLocaleString("pt-BR"),
      unlockedAt: new Date().toLocaleString("pt-BR"),
      status: "active",
      unread: { user:0, partner:0 },
      lastReadAt: { user:"", partner:"" },
      messages: []
    };
    state.chatThreads.unshift(thread);
    return thread;
  }

  function chatAvailableForReservation(reservation) {
    return Boolean(reservationPaymentConfirmed(reservation) || chatThreadForReservation(reservation?.id));
  }

  function chatCanSendForReservation(reservation) {
    return Boolean(reservationPaymentConfirmed(reservation) && reservation.statusKey === "confirmed");
  }

  function chatButtonForUser(reservation) {
    if (!chatAvailableForReservation(reservation)) return "";
    const unread = unreadForReservation(reservation.id, "user");
    const label = reservation.statusKey === "confirmed" ? "Falar com parceiro" : "Ver conversa";
    return `<button class="button secondary small chat-entry-button ${unread ? "has-unread" : ""}" data-action="open-reservation-chat" data-id="${esc(reservation.id)}"><span>${label}</span>${messageBadge(unread)}</button>`;
  }

  function chatButtonForPartner(item) {
    const reservation = state.reservations.find((entry) => entry.id === item.userReservationId);
    if (!reservation || !chatAvailableForReservation(reservation)) return "";
    const unread = unreadForReservation(reservation.id, "partner");
    const label = reservation.statusKey === "confirmed" ? "Chat com usuário" : "Ver conversa";
    return `<button class="button secondary small chat-entry-button ${unread ? "has-unread" : ""}" data-action="open-reservation-chat" data-id="${esc(reservation.id)}"><span>${label}</span>${messageBadge(unread)}</button>`;
  }

  function chatUnreadCount(thread, role) {
    if (!thread || !["user","partner"].includes(role)) return 0;
    thread.unread = thread.unread || { user:0, partner:0 };
    return Number(thread.unread[role] || 0);
  }

  function unreadForReservation(reservationId, role) {
    return chatUnreadCount(chatThreadForReservation(reservationId), role);
  }

  function totalUnreadForRole(role) {
    return state.chatThreads.reduce((total, thread) => total + chatUnreadCount(thread, role), 0);
  }

  function markChatRead(thread, role) {
    if (!thread || !["user","partner"].includes(role)) return;
    thread.unread = thread.unread || { user:0, partner:0 };
    thread.unread[role] = 0;
    thread.lastReadAt = thread.lastReadAt || { user:"", partner:"" };
    thread.lastReadAt[role] = new Date().toLocaleString("pt-BR");
  }

  function messageBadge(count) {
    return count > 0 ? `<span class="message-badge" aria-label="${esc(count)} mensagem(ns) nova(s)">${esc(count)}</span>` : "";
  }

  function updateRoleUnreadIndicators() {
    roleButtons.forEach((button) => {
      const role = button.dataset.role;
      const count = ["user","partner"].includes(role) ? totalUnreadForRole(role) : 0;
      let badge = button.querySelector(".role-unread-badge");
      if (count > 0) {
        if (!badge) {
          badge = document.createElement("span");
          badge.className = "role-unread-badge";
          button.appendChild(badge);
        }
        badge.textContent = count > 99 ? "99+" : String(count);
        badge.setAttribute("aria-label", `${count} mensagem(ns) não lida(s)`);
        button.classList.add("has-unread");
      } else {
        badge?.remove();
        button.classList.remove("has-unread");
      }
    });
  }

  function chatMessagesMarkup(thread, viewerRole) {
    if (!thread.messages.length) return `<div class="chat-empty"><strong>Conversa liberada</strong><p>A reserva foi paga. Usuário e parceiro já podem trocar mensagens sobre acesso, estrutura, horário e demais detalhes da reserva.</p></div>`;
    return thread.messages.map((message) => {
      const mine = (viewerRole === "user" && message.senderType === "user") || (viewerRole === "partner" && message.senderType === "partner");
      return `<div class="chat-message ${mine ? "mine" : "theirs"}"><div class="chat-bubble"><strong>${esc(message.senderName)}</strong><p>${esc(message.text)}</p><small>${esc(message.createdAt)}</small></div></div>`;
    }).join("");
  }

  function renderOpenChat() {
    if (!selectedChatReservationId || !chatDialog?.open) return;
    const reservation = state.reservations.find((item) => item.id === selectedChatReservationId);
    const thread = reservation ? chatThreadForReservation(reservation.id) : null;
    if (!reservation || !thread) return;
    const canSend = chatCanSendForReservation(reservation);
    chatTitle.textContent = state.role === "partner" ? thread.user : thread.venue;
    chatSubtitle.textContent = `${reservation.id} · ${reservation.date} · ${timeRange(reservation.time,reservation.endTime)}`;
    chatMessages.innerHTML = chatMessagesMarkup(thread, state.role);
    chatStatus.textContent = canSend ? "Reserva paga · conversa ativa" : "Reserva encerrada · conversa somente para consulta";
    chatStatus.className = `status ${canSend ? "status-ok" : "status-neutral"}`;
    chatInput.disabled = !canSend;
    chatSend.disabled = !canSend;
    chatInput.placeholder = canSend ? "Digite uma mensagem..." : "Conversa encerrada";
    requestAnimationFrame(() => { chatMessages.scrollTop = chatMessages.scrollHeight; });
  }

  function openReservationChat(reservationId) {
    const reservation = state.reservations.find((item) => item.id === reservationId);
    if (!reservation || !chatAvailableForReservation(reservation)) {
      showToast("O chat é liberado somente após a confirmação do pagamento da reserva.");
      return;
    }
    const thread = ensureChatThread(reservation) || chatThreadForReservation(reservation.id);
    if (!thread) return;
    selectedChatReservationId = reservation.id;
    markChatRead(thread, state.role);
    saveState();
    render();
    if (!chatDialog.open) chatDialog.showModal();
    renderOpenChat();
    if (chatCanSendForReservation(reservation) && allowAutomaticFieldFocus) setTimeout(() => chatInput.focus({ preventScroll:true }), 40);
  }

  function sendChatMessage(text) {
    const reservation = state.reservations.find((item) => item.id === selectedChatReservationId);
    if (!reservation || !chatCanSendForReservation(reservation)) return;
    const thread = ensureChatThread(reservation);
    const clean = String(text || "").trim();
    if (!thread || !clean) return;
    const senderType = state.role === "partner" ? "partner" : "user";
    const receiverType = senderType === "partner" ? "user" : "partner";
    const senderName = senderType === "partner" ? state.partnerProfile.tradeName : state.userProfile.name;
    thread.messages.push({ id: nextId("MSG-", thread.messages), senderType, senderName, text: clean.slice(0,1000), createdAt: new Date().toLocaleString("pt-BR") });
    thread.updatedAt = new Date().toLocaleString("pt-BR");
    thread.unread = thread.unread || { user:0, partner:0 };
    thread.unread[senderType] = 0;
    thread.unread[receiverType] = Number(thread.unread[receiverType] || 0) + 1;
    saveState();
    chatInput.value = "";
    renderOpenChat();
    updateRoleUnreadIndicators();
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
        const unread = unreadForReservation(reservation.id,"user");
        return `<article class="reservation-card ${unread ? "has-unread" : ""}"><div class="reservation-date"><strong>${esc(badge.day)}</strong><span>${esc(badge.month)}</span></div><div class="reservation-card-main"><div class="reservation-card-heading"><div><h2>${esc(reservation.venue)}</h2><p>${esc(timeRange(reservation.time,reservation.endTime))} · ${money(reservation.value)}${reservation.monthly ? ` · Mensalista (${esc(reservation.occurrenceCount)} datas)` : ""}${Number(reservation.paymentDue||0)>0 ? ` · Diferença ${money(reservation.paymentDue)}` : ""}${reservation.paymentMethodLabel ? ` · ${esc(reservation.paymentMethodLabel)}` : ""}${reservation.pixSplit ? ` · Rateio ${esc(pixCollectionForReservation(reservation.id)?.paidCount || 0)}/${esc(reservation.pixSplitMemberCount || 0)}` : ""}</p></div><span class="status ${visual.status}">${visual.label}</span></div><div class="reservation-group-line"><strong>${esc(reservation.groupName || "Grupo não informado")}</strong><span>${esc(reservation.groupRole || "")}</span></div><div class="reservation-card-meta"><span>${esc(reservation.event || "Evento não informado")}</span><span class="status ${eventVisual.className}">${eventVisual.label}</span></div>${unread ? `<div class="inline-message-notice"><span class="message-badge">${esc(unread)}</span><strong>${unread === 1 ? "Nova mensagem do parceiro" : `${unread} novas mensagens do parceiro`}</strong></div>` : ""}<div class="reservation-card-actions"><button class="button ghost small" data-action="reservation-details" data-id="${esc(reservation.id)}">Detalhes</button>${chatButtonForUser(reservation)}${reservation.pixSplit ? `<button class="button secondary small" data-action="pix-split-details" data-id="${esc(reservation.id)}">Acompanhar rateio</button>` : ""}${reservation.statusKey === "pending" ? `${reservation.pixSplit ? "" : `<button class="button secondary small" data-action="reservation-status" data-id="${esc(reservation.id)}" data-status="confirmed">Simular pagamento</button>`}<button class="button danger small" data-action="reservation-status" data-id="${esc(reservation.id)}" data-status="cancelled">Cancelar</button>` : reservation.statusKey === "confirmed" ? userCancellationAction(reservation) : reservation.statusKey === "cancelled" && reservation.outsideDeadline && !reservation.exceptionReviewId ? `<button class="button ghost small" data-action="request-cancellation-exception" data-id="${esc(reservation.id)}">Solicitar análise excepcional</button>` : ""}</div></div></article>`;
      }).join("") || emptyState("▣", "Nenhuma reserva encontrada neste filtro.")}</section>`;
  }

  function userFavorites() {
    const favoriteVenues = state.venues.filter((venue) => state.favorites.includes(venue.id));
    return `${pageHeader("Área do usuário", "Favoritos", "Acesse rapidamente os locais que você marcou.", `<button class="button ghost" data-nav="discover">Buscar mais quadras</button>`)}<section class="grid">${favoriteVenues.map(venueCard).join("") || emptyState("♡", "Nenhuma quadra foi adicionada aos favoritos.")}</section>`;
  }

  function userPromotions() {
    activeCancellationVouchers();
    const vouchers = state.cancellationVouchers.filter((voucher) => voucher.user === state.userProfile.name);
    return `${pageHeader("Área do usuário", "Vouchers", "Consulte créditos de cancelamento e vouchers promocionais disponíveis.")}
      <section class="section"><div class="section-heading"><div><h2>Vouchers de cancelamento</h2><p>Uso único, no mesmo parceiro, em nova reserva de valor igual ou superior.</p></div></div><div class="grid two">${vouchers.map((voucher) => `<article class="card voucher-card"><div class="section-heading"><div><span class="status ${["active", "active_extended"].includes(voucher.status) ? "status-ok" : voucher.status === "reserved" ? "status-warning" : "status-neutral"}">${esc(voucherStatusLabel(voucher))}</span><h3>${esc(voucher.code)}</h3></div><strong class="voucher-value">${money(voucher.value)}</strong></div><div class="detail-list"><div class="detail-line"><span>Parceiro</span><strong>${esc(voucher.venue)}</strong></div><div class="detail-line"><span>Validade atual</span><strong>${esc(voucher.expiresAt)}</strong></div><div class="detail-line"><span>Regra de uso</span><strong>Reserva de ${money(voucher.minimumReservationValue)} ou mais</strong></div><div class="detail-line"><span>Uso</span><strong>Integral e único</strong></div><div class="detail-line"><span>Horário original</span><strong>${esc(voucher.originalTime || "—")} · ${esc(voucher.originalPeriod || "—")}</strong></div><div class="detail-line"><span>Faixa compatível</span><strong>${esc(voucher.compatibilityWindow || "—")}</strong></div><div class="detail-line"><span>Datas compatíveis</span><strong>${esc(voucher.compatibleDatesCount || 0)} de ${esc(voucher.minimumCompatibleDates || state.settings.voucherMinimumCompatibleDates)}</strong></div>${voucher.extensionReason ? `<div class="detail-line"><span>Prorrogação</span><strong>${esc(voucher.extensionReason)}</strong></div>` : ""}${voucher.reassignedFrom ? `<div class="detail-line"><span>Realocação</span><strong>${esc(voucher.reassignmentStatus)}</strong></div>` : ""}</div></article>`).join("") || emptyState("V", "Nenhum voucher de cancelamento foi gerado para este usuário.")}</div></section>
      <section class="section"><div class="section-heading"><div><h2>Vouchers promocionais</h2><p>Ofertas demonstrativas independentes dos créditos gerados por cancelamento.</p></div></div><div class="grid">${state.promotions.map((promo) => `<article class="card"><span class="status ${promo.active ? "status-ok" : "status-neutral"}">${promo.active ? "Disponível" : "Encerrada"}</span><h3>${esc(promo.title)}</h3><p class="meta-row"><span>${esc(promo.venue)}</span><span>Até ${esc(promo.validUntil)}</span></p><div class="promo-code"><div><strong>${esc(promo.code)}</strong><div class="meta-row">${esc(promotionBenefitLabel(promo))}</div></div><button class="button ${state.appliedVouchers.includes(promo.code) ? "ghost" : "secondary"} small" data-action="apply-voucher" data-code="${esc(promo.code)}">${state.appliedVouchers.includes(promo.code) ? "Aplicado" : "Aplicar"}</button></div></article>`).join("")}</div></section>`;
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
    const venue = state.venues.find((item) => item.id === state.partnerProfile.venueId);
    const upcoming = publicAvailabilityEntries(venue).sort((a,b) => parsePtDateTime(a.day.date,a.slot.time) - parsePtDateTime(b.day.date,b.slot.time)).slice(0,3);
    return `${pageHeader("Portal do parceiro", "Visão geral", "Resumo objetivo da operação diária da Arena Central.")}
      <section class="stats-grid compact-kpi-grid">${stat(confirmed, "confirmadas", "+1 nesta semana")}${stat(pending, "pendentes")}${stat(activeSpaces, "espaços ativos")}${stat(money(gross), "reservas confirmadas")}</section>
      <section class="grid two">
        <article class="card"><div class="section-heading"><div><h2>Próximos horários</h2><p>Mesma grade publicada no marketplace</p></div><button class="button ghost small" data-nav="agenda">Ver agenda</button></div><div class="list">${upcoming.map(({day,slot}) => { const info=operationalSlotInfo(venue,day,slot); return `<div class="list-item"><div class="avatar">${esc(slot.time.slice(0,2))}</div><div class="list-item-main"><strong>${esc(info.title)}</strong><small>${esc(day.date)} · ${esc(timeRange(slot.time,slotEndTime(slot)))} · ${esc(normalizedSlotSpace(slot))}</small></div><span class="status ${info.type === "confirmed" ? "status-ok" : info.type === "pending" ? "status-warning" : "status-neutral"}">${esc(info.statusLabel)}</span></div>`; }).join("") || emptyState("▦","Nenhum horário publicado.")}</div></article>
        <article class="card"><div class="section-heading"><div><h2>Cadastro do parceiro</h2><p>Completude dos dados</p></div><button class="button ghost small" data-nav="registration">Revisar</button></div><div class="progress"><span style="width:88%"></span></div><div class="meta-row" style="margin-top:10px"><span>Dados cadastrais completos</span><span>Dados bancários em conferência</span></div><div class="callout" style="margin-top:14px"><strong>Próxima pendência</strong><p>Confirmar a titularidade da conta bancária antes da futura criação da subconta.</p></div></article>
      </section>`;
  }

  function partnerAgenda() {
    const venue = state.venues.find((item) => item.id === state.partnerProfile.venueId);
    if (!venue) return `${pageHeader("Portal do parceiro", "Agenda", "Agenda indisponível.")}${emptyState("▦","Parceiro sem espaço vinculado.")}`;
    state.reservations.filter((reservation) => reservation.venueId === venue.id).forEach((reservation) => syncPartnerReservationFromUser(reservation));
    const selectedDate = selectedPartnerAgendaDate(venue);
    const publicEntries = publicAvailabilityEntries(venue)
      .filter(({day}) => day.shortDate === selectedDate)
      .sort((a,b) => a.slot.time.localeCompare(b.slot.time) || normalizedSlotSpace(a.slot).localeCompare(normalizedSlotSpace(b.slot)));
    const selected = selectedAvailabilityKeys();
    const selectableEntries = publicEntries.filter(({day,slot}) => !availabilityHasActiveReservation(venue,day,slot));
    const selectedCount = selected.filter((key) => selectableEntries.some((entry) => entry.key === key)).length;
    const allSelectableSelected = selectableEntries.length > 0 && selectableEntries.every((entry) => selected.includes(entry.key));
    const dateStrip = partnerAgendaDateStrip(venue, selectedDate);
    return `${pageHeader("Portal do parceiro", "Agenda", "Uma única grade controla publicação, reservas e bloqueios do marketplace.", `<button class="button primary" data-action="new-availability">Criar agenda</button><button class="button ghost" data-action="new-block">Novo bloqueio</button><button class="button ghost" data-action="new-partner-reservation">Reserva manual</button>`)}
      <section class="agenda-batch-guide"><strong>Grade única</strong><span>Todas as ações abaixo alteram imediatamente a mesma agenda consultada pelo usuário no marketplace.</span></section>
      <section class="card"><div class="section-heading agenda-published-heading"><div><h2>Agenda publicada e operacional</h2><p>Navegue por todos os dias criados e gerencie disponibilidade, reservas e bloqueios no mesmo local.</p></div><div class="agenda-bulk-actions"><label class="agenda-select-all"><input type="checkbox" data-action="toggle-all-availability" ${allSelectableSelected ? "checked" : ""} ${!selectableEntries.length ? "disabled" : ""}><span>Selecionar todos</span></label><button type="button" class="button danger small" data-action="delete-selected-availability" ${selectedCount ? "" : "disabled"}>Excluir selecionados${selectedCount ? ` (${selectedCount})` : ""}</button></div></div>
        ${dateStrip}
        <div class="public-agenda-list">${publicEntries.map(({day,slot,key}) => {
          const occupied = availabilityHasActiveReservation(venue,day,slot);
          const checked = selected.includes(key);
          const info = operationalSlotInfo(venue,day,slot);
          const statusText = info.type === "available" ? `${info.statusLabel} · ${money(slot.price)}${slot.monthlyEligible ? ` · Mensalista ${money(slot.monthlyPrice)}` : ""}` : info.type === "blocked" ? `${info.statusLabel} · ${info.title}` : `${info.statusLabel} · ${info.title}`;
          return `<div class="public-agenda-row ${checked ? "selected" : ""} ${info.type !== "available" ? `agenda-row-${info.type}` : ""}"><label class="agenda-row-check" title="${occupied ? "Horário protegido por reserva ativa" : "Selecionar horário"}"><input type="checkbox" data-action="toggle-availability-selection" data-key="${esc(key)}" ${checked ? "checked" : ""} ${occupied ? "disabled" : ""}><span></span></label><div><strong>${esc(day.weekday)} · ${esc(day.dayLabel)}</strong><small>${esc(normalizedSlotSpace(slot))}${occupied ? " · reserva ativa" : ""}</small></div><div><strong>${esc(timeRange(slot.time,slotEndTime(slot)))}</strong><small>${esc(statusText)}</small></div><div class="item-actions"><button class="button ghost small" data-action="schedule-slot-details" data-date="${esc(day.shortDate)}" data-time="${esc(slot.time)}" data-space="${esc(normalizedSlotSpace(slot))}">Abrir</button><button class="button ghost small" data-action="edit-availability" data-date="${esc(day.shortDate)}" data-time="${esc(slot.time)}" data-space="${esc(normalizedSlotSpace(slot))}" ${occupied ? "disabled" : ""}>Editar</button>${slot.blocked ? `<button class="button ghost small" data-action="unblock-availability" data-date="${esc(day.shortDate)}" data-time="${esc(slot.time)}" data-space="${esc(normalizedSlotSpace(slot))}">Desbloquear</button>` : !occupied ? `<button class="button ghost small" data-action="block-availability" data-date="${esc(day.shortDate)}" data-time="${esc(slot.time)}" data-space="${esc(normalizedSlotSpace(slot))}">Bloquear</button>` : ""}<button class="button danger small" data-action="delete-availability" data-date="${esc(day.shortDate)}" data-time="${esc(slot.time)}" data-space="${esc(normalizedSlotSpace(slot))}" ${occupied ? "disabled" : ""}>Excluir</button></div></div>`;
        }).join("") || emptyState("▦", "Nenhum horário criado neste dia.")}</div></section>`;
  }

  function partnerReservations() {
    state.reservations.filter((reservation) => reservation.venueId === state.partnerProfile.venueId).forEach((reservation) => syncPartnerReservationFromUser(reservation));
    const filter = state.filters.partnerReservationStatus;
    const items = state.partnerReservations.filter((item) => filter === "Todos" || item.status === filter);
    const unreadTotal = totalUnreadForRole("partner");
    return `${pageHeader("Portal do parceiro", "Reservas", "Aceite solicitações, acompanhe pagamentos e converse com o usuário após a confirmação financeira.", `<button class="button primary" data-action="new-partner-reservation">Nova reserva manual</button>`)}
      ${unreadTotal ? `<div class="message-alert-banner" role="status"><span class="message-alert-icon">●</span><div><strong>${esc(unreadTotal)} mensagem${unreadTotal === 1 ? " nova" : "s novas"}</strong><small>As reservas com conversa pendente estão destacadas abaixo.</small></div></div>` : ""}
      <div class="toolbar"><select class="filter-select" id="partnerReservationFilter"><option>Todos</option><option>Pendente</option><option>Confirmada</option><option>Cancelada</option></select><button class="button ghost" data-action="export-partner-reservations">Exportar CSV</button></div>
      <section class="partner-reservation-list">${items.map((item) => {
        const reservation = item.userReservationId ? state.reservations.find((entry) => entry.id === item.userReservationId) : null;
        const unread = reservation ? unreadForReservation(reservation.id,"partner") : 0;
        const badge = reservationDateBadge(item.date);
        return `<article class="partner-reservation-card ${unread ? "has-unread" : ""}">
          <div class="reservation-date"><strong>${esc(badge.day)}</strong><span>${esc(badge.month)}</span></div>
          <div class="partner-reservation-main">
            <div class="partner-reservation-heading"><div><h2>${esc(item.client)}</h2><p>${esc(item.space)} · ${esc(timeRange(item.time,item.endTime))}${item.monthly ? ` · Mensalista (${esc(item.occurrenceCount || 0)} datas)` : ""}</p></div><span class="status ${statusClass(item.status)}">${esc(item.status)}</span></div>
            <div class="partner-reservation-meta"><span>${esc(item.date)}</span><strong>${money(item.value)}</strong><span>${esc(item.payment || "Pagamento não informado")}</span></div>
            ${unread ? `<div class="inline-message-notice"><span class="message-badge">${esc(unread)}</span><strong>${unread === 1 ? "Nova mensagem do usuário" : `${unread} novas mensagens do usuário`}</strong></div>` : ""}
            <div class="reservation-card-actions">${chatButtonForPartner(item)}<button class="button ghost small" data-action="partner-reservation-details" data-id="${esc(item.id)}">Detalhes</button>${item.status === "Pendente" ? `<button class="button secondary small" data-action="partner-reservation-status" data-id="${esc(item.id)}" data-status="Confirmada">Aceitar</button><button class="button danger small" data-action="partner-reservation-status" data-id="${esc(item.id)}" data-status="Cancelada">Recusar</button>` : item.status === "Confirmada" && item.payment === "Pago via Asaas" ? `<button class="button danger small" data-action="cancel-paid-partner-reservation" data-id="${esc(item.id)}">Cancelar e reembolsar</button>` : ""}</div>
          </div>
        </article>`;
      }).join("") || emptyState("▣", "Nenhuma reserva encontrada neste filtro.")}</section>`;
  }

  function partnerSpaces() {
    return `${pageHeader("Portal do parceiro", "Espaços", "Cadastre o tipo de cada quadra ou local, estrutura, capacidade, preço e disponibilidade.", `<button class="button primary" data-action="new-space">Cadastrar espaço</button>`)}
      <section class="grid two">${state.partnerSpaces.map((space) => `<article class="card"><div class="section-heading"><div><span class="status ${statusClass(space.status)}">${esc(space.status)}</span><h2 style="margin-top:9px">${esc(space.name)}</h2><p>${esc(space.type)} · ${esc(space.floor)}</p></div></div><div class="details-grid"><div class="detail-line"><span>Capacidade</span><strong>${esc(space.capacity)} pessoas</strong></div><div class="detail-line"><span>Preço-base</span><strong>${money(space.price)}</strong></div><div class="detail-line"><span>Mensalista padrão</span><strong>${money(space.monthlyPrice || 0)}</strong></div><div class="detail-line"><span>Iluminação</span><strong>${esc(space.lights)}</strong></div><div class="detail-line"><span>Coberta</span><strong>${esc(space.covered)}</strong></div></div><div class="price-row"><div class="meta-row"><span>Manutenção: ${esc(space.maintenance)}</span></div><div class="item-actions"><button class="button ghost small" data-action="edit-space" data-id="${esc(space.id)}">Editar</button><button class="button ${space.status === "Ativo" ? "danger" : "secondary"} small" data-action="toggle-space" data-id="${esc(space.id)}">${space.status === "Ativo" ? "Desativar" : "Ativar"}</button></div></div></article>`).join("")}</section>`;
  }

  function partnerClients() {
    return `${pageHeader("Portal do parceiro", "Clientes", "Histórico de grupos e responsáveis que já utilizaram os espaços.", `<button class="button primary" data-action="new-client">Cadastrar cliente</button>`)}
      <section class="card"><div class="list">${state.partnerClients.map((client) => `<div class="list-item"><div class="avatar">${initials(client.name)}</div><div class="list-item-main"><strong>${esc(client.name)}</strong><small>${esc(client.contact)} · ${esc(client.phone)} · ${esc(client.frequency)}<br>Última reserva: ${esc(client.lastBooking)}</small></div><div class="item-actions"><button class="button ghost small" data-action="client-details" data-id="${esc(client.id)}">Detalhes</button><button class="button ghost small" data-action="edit-client" data-id="${esc(client.id)}">Editar</button></div></div>`).join("")}</div></section>`;
  }

  function partnerTeam() {
    return `${pageHeader("Portal do parceiro", "Equipe", "Defina funções e permissões operacionais para cada colaborador.", `<button class="button primary" data-action="new-team-member">Adicionar pessoa</button>`)}
      <section class="card"><div class="list">${state.partnerTeam.map((member) => `<div class="list-item"><div class="avatar">${initials(member.name)}</div><div class="list-item-main"><strong>${esc(member.name)}</strong><small>${esc(member.role)} · ${esc(member.email)}<br>Permissão: ${esc(member.permission)}</small></div><span class="status ${statusClass(member.status)}">${esc(member.status)}</span><div class="item-actions"><button class="button ghost small" data-action="edit-team-member" data-id="${esc(member.id)}">Editar</button><button class="button ${member.status === "Ativo" ? "danger" : "secondary"} small" data-action="toggle-team-member" data-id="${esc(member.id)}">${member.status === "Ativo" ? "Desativar" : "Ativar"}</button></div></div>`).join("")}</div></section>`;
  }

  function promotionIssuerType(promo) {
    if (promo?.issuerType) return promo.issuerType;
    return promotionVenueId(promo) === "all" ? "admin" : "partner";
  }

  function promotionStatusClass(promo) {
    return promotionValid(promo) ? "status-ok" : "status-neutral";
  }

  function promotionBookingLabel(promo) {
    return promo.bookingMode === "monthly" ? "Mensalista" : promo.bookingMode === "single" ? "Avulsa" : "Avulsa ou mensalista";
  }

  function promotionCard(promo, management = false) {
    const valid = promotionValid(promo);
    return `<article class="card voucher-management-card"><div class="voucher-management-head"><div><span class="status ${promotionStatusClass(promo)}">${valid ? "Ativo" : promo.active ? "Expirado" : "Inativo"}</span><h3>${esc(promo.title)}</h3></div><strong class="voucher-code-large">${esc(promo.code)}</strong></div><div class="detail-list"><div class="detail-line"><span>Desconto</span><strong>${esc(promotionBenefitLabel(promo))}</strong></div><div class="detail-line"><span>Parceiro</span><strong>${esc(promo.venue || "Todos os parceiros")}</strong></div><div class="detail-line"><span>Modalidade</span><strong>${esc(promotionBookingLabel(promo))}</strong></div><div class="detail-line"><span>Reserva mínima</span><strong>${money(promo.minimumReservationValue || 0)}</strong></div><div class="detail-line"><span>Validade</span><strong>${esc(promo.validUntil)}</strong></div><div class="detail-line"><span>Criado por</span><strong>${esc(promo.issuerName || (promotionIssuerType(promo) === "partner" ? promo.venue : "Tâmo On"))}</strong></div></div>${management ? `<div class="reservation-card-actions"><button class="button ghost small" data-action="toggle-promotion" data-id="${esc(promo.id)}">${promo.active ? "Desativar" : "Ativar"}</button></div>` : ""}</article>`;
  }

  function partnerVouchers() {
    const venueId = state.partnerProfile.venueId;
    const items = state.promotions.filter((promo) => promotionVenueId(promo) === venueId && promotionIssuerType(promo) === "partner");
    return `${pageHeader("Portal do parceiro", "Vouchers", "Crie descontos promocionais válidos apenas para reservas do seu espaço.", `<button class="button primary" data-action="create-partner-promotion">Criar voucher</button>`)}<section class="grid two">${items.map((promo) => promotionCard(promo, true)).join("") || emptyState("%", "Nenhum voucher promocional criado pelo parceiro.")}</section><div class="callout section"><strong>Aplicação no checkout</strong><p>O desconto é calculado automaticamente quando o usuário seleciona o voucher em uma reserva elegível. O valor a pagar, o rateio Pix e o cartão Asaas passam a considerar o valor já descontado.</p></div>`;
  }

  function adminVouchers() {
    return `${pageHeader("Administração", "Vouchers", "Crie vouchers globais ou vinculados a um parceiro e acompanhe as regras promocionais.", `<button class="button primary" data-action="create-admin-promotion">Criar voucher</button>`)}<section class="grid two">${state.promotions.map((promo) => promotionCard(promo, true)).join("") || emptyState("%", "Nenhum voucher promocional cadastrado.")}</section>`;
  }

  function partnerFinance() {
    const partnerReservations = state.reservations.filter((item) => item.venueId === state.partnerProfile.venueId);
    const recognized = partnerReservations.reduce((sum, item) => sum + Number(item.accountingRecognizedValue || 0), 0);
    const complements = partnerReservations.reduce((sum, item) => sum + Number(item.complementPaid || 0), 0);
    const cardBase = partnerReservations.filter((item) => item.paymentMethod === "credit_card_asaas").reduce((sum,item)=>sum+Number(item.accountingRecognizedValue || 0),0);
    const pixDirectBase = partnerReservations.filter((item) => item.paymentMethod === "pix_direct_partner").reduce((sum,item)=>sum+Number(item.accountingRecognizedValue || 0),0);
    const tamoRate = Number(state.partnerProfile.commissionRate || state.settings.defaultCommission || 0);
    const asaasRate = Number(state.settings.asaasCommissionRate || 0);
    const asaasCommission = cardBase * (asaasRate / 100);
    const tamoCommission = recognized * (tamoRate / 100);
    const partnerNet = Math.max(0, recognized - asaasCommission - tamoCommission);
    const liability = activeVoucherLiability(state.partnerProfile.venueId);
    const bankProvider = window.TamoOnBankPix?.provider(state.partnerProfile.bankProviderId || "GENERIC_MANUAL") || { label:state.partnerProfile.bank, mode:"manual" };
    return `${pageHeader("Portal do parceiro", "Financeiro", "Acompanhamento transparente por meio de pagamento, incluindo valor bruto, custos do Asaas e comissão do Tâmo On.", `<button class="button ghost" data-action="export-partner-finance">Exportar demonstrativo</button>`)}
      <section class="stats-grid compact-kpi-grid financial-kpi-grid">${stat(money(recognized), "valor bruto total")}${stat(money(asaasCommission), "custo Asaas estimado", `somente cartão · ${asaasRate}% simulado`)}${stat(money(tamoCommission), "comissão Tâmo On", `${tamoRate}%`)}${stat(money(partnerNet), "líquido estimado do parceiro")}</section>
      <section class="finance-secondary-strip"><span><b>${money(pixDirectBase)}</b> recebido por Pix direto</span><span><b>${money(cardBase)}</b> processado por cartão Asaas</span><span><b>${money(complements)}</b> em complementos</span></section>
      <section class="grid two"><article class="card"><h2>Vouchers e complementos</h2><div class="detail-list"><div class="detail-line"><span>Vouchers a honrar</span><strong>${money(liability.value)} · ${liability.count} ativos</strong></div><div class="detail-line"><span>Pagamento cancelado</span><strong>Permanece no mês original</strong></div><div class="detail-line"><span>Uso integral do voucher</span><strong>Sem nova obrigação</strong></div><div class="detail-line"><span>Reserva de valor superior</span><strong>Somente o complemento é novo</strong></div></div></article><article class="card"><h2>Integrações de recebimento</h2><div class="detail-list"><div class="detail-line"><span>Pix direto</span><strong>${esc(bankProvider.label)} · ${bankProvider.mode === "api" ? "adaptador preparado" : "confirmação manual"}</strong></div><div class="detail-line"><span>Baixa automática Pix</span><strong>${state.partnerProfile.pixAutoReconciliation && bankProvider.mode === "api" ? "Preparada" : "Não disponível"}</strong></div><div class="detail-line"><span>Webhook bancário</span><strong>${esc(state.partnerProfile.pixWebhookStatus || "Não configurado")}</strong></div><div class="detail-line"><span>Cartão</span><strong>Asaas · checkout hospedado preparado</strong></div><div class="detail-line"><span>Subconta / wallet</span><strong>${esc(state.partnerProfile.asaasSubaccount)} · ${esc(state.partnerProfile.asaasWalletId ? "wallet configurável" : "wallet pendente")}</strong></div></div><button class="button ghost small" style="margin-top:14px" data-action="edit-payment-integrations">Configurar integrações</button></article></section>
      <div class="callout section"><strong>Rotas separadas</strong><p>Pix direto é creditado na conta bancária do parceiro e conciliado pelo banco. Cartão passa pelo Asaas e fica preparado para split. Nenhuma credencial real fica armazenada nesta Preview.</p></div>`;
  }

  function partnerRegistration() {
    const p = state.partnerProfile;
    const bankProvider = window.TamoOnBankPix?.provider(p.bankProviderId || "GENERIC_MANUAL") || { label:p.bank, mode:"manual" };
    const group = (title, lines, action) => `<article class="detail-group"><div class="section-heading"><div><h2>${esc(title)}</h2></div><button class="button ghost small" data-action="${action}">Editar</button></div><div class="detail-list">${lines.map(([label,value]) => `<div class="detail-line"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join("")}</div></article>`;
    return `${pageHeader("Portal do parceiro", "Cadastro", "Dados cadastrais, operacionais, contratuais, fiscais e financeiros definidos para a homologação do parceiro.")}
      <section class="details-grid">
        ${group("Empresa", [["Nome fantasia",p.tradeName],["Razão social",p.legalName],["CNPJ",p.cnpj],["Natureza jurídica",p.legalNature],["Regime tributário",p.taxRegime],["Atividade declarada",p.declaredActivity],["Inscrição municipal",p.municipalRegistration]], "edit-company-data")}
        ${group("Responsável", [["Nome",p.responsibleName],["CPF",p.responsibleCpf],["Função",p.responsibleRole],["E-mail",p.email],["Telefone",p.phone],["WhatsApp",p.whatsapp]], "edit-responsible-data")}
        ${group("Endereço", [["Logradouro",p.address],["Bairro",p.neighborhood],["Cidade/UF",`${p.city}/${p.state}`],["CEP",p.zip]], "edit-address-data")}
        ${group("Contratos e regras", [["Contrato",p.contractStatus],["Termos",p.termsStatus],["LGPD",p.privacyStatus],["Cancelamento",p.cancellationPolicy]], "edit-contract-data")}
        ${group("Fiscal e financeiro", [["Documento ao usuário",p.fiscalIssuer],["NFS-e da comissão",p.commissionInvoice],["Pagamento",p.paymentModel],["Comissão",`${p.commissionRate}%`]], "edit-fiscal-data")}
        ${group("Integrações de pagamento", [["Banco Pix",`${bankProvider.label} · ${bankProvider.mode === "api" ? "API" : "manual"}`],["Status API Pix",p.pixApiStatus],["Baixa automática",p.pixAutoReconciliation ? "Preparada" : "Desativada"],["Webhook Pix",p.pixWebhookStatus],["Cartão",p.asaasCardStatus],["Subconta Asaas",p.asaasSubaccount]], "edit-payment-integrations")}
        <article class="detail-group"><div class="section-heading"><div><h2>Documentos</h2></div><button class="button ghost small" data-action="add-document">Adicionar</button></div><div class="detail-list">${p.documents.map((doc,index) => `<div class="toggle-row"><div class="toggle-copy"><strong>${esc(doc.name)}</strong><small>${esc(doc.status)}</small></div><button class="button ghost small" data-action="edit-document" data-index="${index}">Alterar</button></div>`).join("")}</div></article>
        <article class="detail-group"><div class="section-heading"><div><h2>Vouchers e encerramento</h2></div><button class="button danger small" data-action="request-partner-closure">Solicitar encerramento</button></div><div class="detail-list"><div class="detail-line"><span>Vouchers ativos</span><strong>${activeVoucherLiability(p.venueId).count}</strong></div><div class="detail-line"><span>Valor a honrar</span><strong>${money(activeVoucherLiability(p.venueId).value)}</strong></div><div class="detail-line"><span>Regra</span><strong>Encerramento bloqueado com créditos pendentes</strong></div></div></article>
      </section>`;
  }

  function partnerView() {
    const views = { overview: partnerOverview, agenda: partnerAgenda, reservations: partnerReservations, spaces: partnerSpaces, clients: partnerClients, team: partnerTeam, vouchers: partnerVouchers, finance: partnerFinance, registration: partnerRegistration };
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
    const tamoRate = Number(state.settings.defaultCommission || 0);
    const asaasRate = Number(state.settings.asaasCommissionRate || 0);
    const cardBase = state.reservations.filter((item) => item.paymentMethod === "credit_card_asaas").reduce((sum,item)=>sum+Number(item.accountingRecognizedValue || 0),0);
    const pixDirectBase = state.reservations.filter((item) => item.paymentMethod === "pix_direct_partner").reduce((sum,item)=>sum+Number(item.accountingRecognizedValue || 0),0);
    const asaasCommission = cardBase * (asaasRate / 100);
    const tamoCommission = recognized * (tamoRate / 100);
    const partnerNet = Math.max(0, recognized - asaasCommission - tamoCommission);
    const activeVouchers = activeCancellationVouchers();
    const voucherLiability = activeVouchers.reduce((sum, item) => sum + Number(item.value || 0), 0);
    return `${pageHeader("Administração", "Financeiro", "Conciliação demonstrativa de pagamentos, vouchers, reembolsos, complementos e obrigações dos parceiros.", `<button class="button ghost" data-action="export-admin-finance">Exportar conciliação</button>`)}
      <section class="stats-grid compact-kpi-grid financial-kpi-grid">${stat(money(recognized), "valor bruto total")}${stat(money(asaasCommission), "custo Asaas estimado", `somente cartão · ${asaasRate}% simulado`)}${stat(money(tamoCommission), "comissão Tâmo On", `${tamoRate}%`)}${stat(money(partnerNet), "líquido estimado aos parceiros")}</section>
      <section class="finance-secondary-strip"><span><b>${money(pixDirectBase)}</b> por Pix direto ao parceiro</span><span><b>${money(cardBase)}</b> por cartão Asaas</span><span><b>${state.paymentIntents.length}</b> intents de pagamento</span><span><b>${state.paymentWebhookLog.length}</b> webhooks processados</span></section>
      <section class="finance-secondary-strip"><span><b>${money(voucherLiability)}</b> em vouchers ativos · ${activeVouchers.length} créditos</span><span><b>${money(refunds)}</b> em reembolsos</span><span><b>${money(complements)}</b> em complementos</span></section>
      <section class="card"><div class="section-heading"><div><h2>Conciliação por provedor</h2><p>Intents locais que representam o contrato futuro com bancos e Asaas.</p></div></div><div class="table-wrap" style="border:0"><table><thead><tr><th>Intent</th><th>Reserva</th><th>Meio</th><th>Provedor</th><th>Valor</th><th>Status</th></tr></thead><tbody>${state.paymentIntents.map((intent)=>`<tr><td>${esc(intent.id)}</td><td>${esc(intent.reservationId)}</td><td>${esc(paymentMethodLabel(intent.method))}</td><td>${esc(intent.provider || intent.normalized?.provider || "—")}</td><td>${money(intent.amount)}</td><td><span class="status ${intent.status === "CONFIRMED" || intent.status === "SETTLED" ? "status-ok" : "status-warning"}">${esc(intent.status)}</span></td></tr>`).join("") || `<tr><td colspan="6">Nenhuma intent criada.</td></tr>`}</tbody></table></div></section>
      <section class="card"><div class="section-heading"><div><h2>Vouchers de cancelamento</h2><p>Prazo condicionado à oferta de horários compatíveis e responsabilidade do parceiro.</p></div></div><div class="table-wrap" style="border:0"><table><thead><tr><th>Voucher</th><th>Parceiro</th><th>Valor</th><th>Uso</th><th>Faixa</th><th>Datas</th><th>Validade</th><th>Status</th><th>Ação</th></tr></thead><tbody>${state.cancellationVouchers.map((voucher) => `<tr><td>${esc(voucher.code)}</td><td>${esc(voucher.venue)}</td><td>${money(voucher.value)}</td><td>${voucher.eligibleBookingMode === "monthly" ? "Somente mensalista" : "Avulsa ou mensalista"}</td><td>${esc(voucher.originalTime || "—")} · ${esc(voucher.compatibilityWindow || "—")}</td><td>${esc(voucher.compatibleDatesCount || 0)}/${esc(voucher.minimumCompatibleDates || state.settings.voucherMinimumCompatibleDates)}</td><td>${esc(voucher.expiresAt)}</td><td><span class="status ${["active", "active_extended"].includes(voucher.status) ? "status-ok" : voucher.status === "reserved" ? "status-warning" : "status-neutral"}">${esc(voucherStatusLabel(voucher))}</span></td><td>${["active", "active_extended"].includes(voucher.status) ? `<button class="button ghost small" data-action="reassign-cancellation-voucher" data-id="${esc(voucher.id)}">Ressarcir e realocar</button>` : "—"}</td></tr>`).join("") || `<tr><td colspan="9">Nenhum voucher gerado.</td></tr>`}</tbody></table></div></section>
      <section class="card section"><div class="section-heading"><div><h2>Cancelamentos e reembolsos</h2><p>O responsável pelo cancelamento suporta a consequência financeira aplicável.</p></div></div><div class="table-wrap" style="border:0"><table><thead><tr><th>Registro</th><th>Reserva</th><th>Responsável</th><th>Modalidade</th><th>Reembolso</th><th>Taxas</th></tr></thead><tbody>${state.cancellationLog.map((item) => `<tr><td>${esc(item.id)}</td><td>${esc(item.reservationId || item.partnerReservationId)}</td><td>${esc(cancellationSourceLabel(item.source))}</td><td>${item.mode === "voucher" ? "Voucher" : item.mode === "refund" ? "Reembolso integral" : "Sem compensação"}</td><td>${money(item.refundValue || 0)}</td><td>${item.feeResponsibility ? esc(cancellationSourceLabel(item.feeResponsibility)) : "Não aplicável"}</td></tr>`).join("") || `<tr><td colspan="6">Nenhum cancelamento processado.</td></tr>`}</tbody></table></div></section>
      <section class="card section"><div class="section-heading"><div><h2>Análises excepcionais</h2><p>Cancelamentos fora do prazo submetidos conjuntamente ao Tâmo On e ao parceiro.</p></div></div><div class="table-wrap" style="border:0"><table><thead><tr><th>Solicitação</th><th>Reserva</th><th>Parceiro</th><th>Status</th><th>Decisões</th></tr></thead><tbody>${state.cancellationExceptionReviews.map((review) => `<tr><td>${esc(review.id)}</td><td>${esc(review.reservationId)}</td><td>${esc(review.venue)}</td><td><span class="status status-warning">${esc(review.status)}</span></td><td>Tâmo On: ${esc(review.tamoDecision)} · Parceiro: ${esc(review.partnerDecision)}</td></tr>`).join("") || `<tr><td colspan="5">Nenhuma análise excepcional pendente.</td></tr>`}</tbody></table></div></section>
      <div class="callout section"><strong>Regra contábil simulada</strong><p>O pagamento que originou o voucher permanece no exercício original. Cancelamentos do parceiro ou do Tâmo On geram reembolso integral e os custos ficam com o responsável. Fora do prazo, não há crédito automático.</p></div>`;
  }

  function adminSettings() {
    const settings = state.settings;
    const toggle = (key,title,help,locked=false) => `<div class="toggle-row"><div class="toggle-copy"><strong>${esc(title)}</strong><small>${esc(help)}</small></div><button class="switch ${settings[key] ? "on" : ""}" data-action="toggle-setting" data-key="${esc(key)}" aria-pressed="${settings[key]}" ${locked ? "disabled" : ""}></button></div>`;
    return `${pageHeader("Administração", "Configurações", "Controles locais da Preview. Pagamentos reais permanecem bloqueados.", `<button class="button ghost" data-action="edit-commercial-settings">Editar regras comerciais</button>`)}
      <section class="grid two"><article class="card"><h2>Operação</h2>${toggle("marketplaceEnabled","Área de parceiros","Exibe as áreas demonstrativas.")}${toggle("newPartners","Novos cadastros","Permite incluir parceiros fictícios.")}${toggle("vouchersEnabled","Vouchers","Exibe créditos de cancelamento e vouchers promocionais.")}${toggle("notificationEmails","Avisos por e-mail","Simulação de comunicações operacionais.")}</article><article class="card"><h2>Regras comerciais</h2><div class="detail-list" style="margin-top:14px"><div class="detail-line"><span>Comissão Tâmo On</span><strong>${esc(settings.defaultCommission)}%</strong></div><div class="detail-line"><span>Comissão Asaas simulada</span><strong>${esc(settings.asaasCommissionRate)}%</strong></div><div class="detail-line"><span>Prazo do usuário</span><strong>${esc(settings.cancellationHours)} horas</strong></div><div class="detail-line"><span>Validade nominal</span><strong>${esc(settings.voucherValidityDays)} dias</strong></div><div class="detail-line"><span>Faixa compatível</span><strong>± ${esc(settings.voucherCompatibilityWindowHours)} horas</strong></div><div class="detail-line"><span>Mínimo de datas</span><strong>${esc(settings.voucherMinimumCompatibleDates)}</strong></div><div class="detail-line"><span>Prorrogação</span><strong>${esc(settings.voucherExtensionDays)} dias</strong></div><div class="detail-line"><span>Persistência</span><strong>LocalStorage do navegador</strong></div></div></article></section>
      <section class="section"><div class="section-heading"><div><h2>Provedores de pagamento</h2><p>Camada multiprovedor preparada para Pix direto e cartão via Asaas. Credenciais e chamadas reais continuam fora do frontend.</p></div></div><div class="provider-grid">${(window.TamoOnBankPix?.listProviders()||[]).map((provider)=>`<article class="provider-card"><div><strong>${esc(provider.label)}</strong><small>Pix · ${provider.mode === "api" ? "adaptador automático" : "fallback manual"}</small></div><span class="status ${provider.mode === "api" ? "status-ok" : "status-warning"}">${provider.mode === "api" ? "Contrato pronto" : "Manual"}</span></article>`).join("")}<article class="provider-card"><div><strong>Asaas</strong><small>Cartão · checkout hospedado + split</small></div><span class="status status-warning">Sandbox preparado</span></article></div></section>
      <section class="section"><button class="button danger" data-action="reset-local-data">Restaurar dados iniciais</button></section>`;
  }

  function adminView() {
    const views = { overview: adminOverview, partners: adminPartners, reservations: adminReservations, users: adminUsers, finance: adminFinance, vouchers: adminVouchers, settings: adminSettings };
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
    updateRoleUnreadIndicators();
  }

  function venueScheduleBody(venue, selectedDate) {
    const day = venue.schedule.find((item) => item.shortDate === selectedDate) || venue.schedule[0];
    selectedVenueSchedule = { venueId: venue.id, shortDate: day.shortDate };
    return `<div class="venue-detail-cover"><img class="venue-detail-image" src="${esc(venue.facadeImage)}" alt="Fachada de ${esc(venue.name)}"><div class="venue-detail-overlay"><span class="rating-badge" title="Nota calculada pelas avaliações dos usuários">★ ${esc(venue.rating)} <small>${esc(venue.reviews)} avaliações</small></span><div><strong>${esc(venue.city)} · ${esc(venue.neighborhood)}</strong><small>${esc(venue.address)} · ${esc(venue.distance)}</small></div></div></div>
      <div class="venue-detail-summary"><span><b>Tipos disponíveis</b>${esc(venue.types.join(" · "))}</span><span><b>Estrutura</b>${esc(venue.amenities.join(" · "))}</span></div>
      <section class="schedule-section"><div class="section-heading"><div><h2>Agenda do parceiro</h2><p>Deslize a linha de dias para consultar toda a agenda cadastrada.</p></div></div>
      <div class="schedule-days" aria-label="Dias com agenda disponível">${venue.schedule.map((item) => `<button type="button" class="schedule-day ${item.shortDate === day.shortDate ? "active" : ""}" data-action="venue-schedule-day" data-id="${esc(venue.id)}" data-date="${esc(item.shortDate)}"><small>${esc(item.weekday)}</small><strong>${esc(item.dayLabel)}</strong></button>`).join("")}</div>
      <div class="schedule-slots">${day.slots.map((slot) => {
        const reservation = findReservationForSlot(venue.id, slot.time, day.shortDate, slotEndTime(slot), normalizedSlotSpace(slot));
        const visual = reservation ? reservationStatus(reservation.statusKey) : null;
        const cls = slot.blocked ? "unavailable" : visual?.slot || "available";
        const label = slot.blocked ? "Indisponível" : reservation ? visual.label : "Disponível";
        return `<button type="button" class="schedule-slot ${cls}" data-action="reserve-slot" data-venue="${esc(venue.id)}" data-time="${esc(slot.time)}" data-end="${esc(slotEndTime(slot))}" data-date="${esc(day.shortDate)}"><span><strong>${esc(timeRange(slot.time,slotEndTime(slot)))}</strong><small>${esc(label)}${slot.monthlyEligible ? ` · Mensalista ${money(slot.monthlyPrice)}` : ""}</small></span><b>${money(slot.price)}</b></button>`;
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

  function openReservation(venueId, time, shortDate, requestedEndTime = "") {
    const venue = state.venues.find((item) => item.id === venueId);
    if (!venue) return;
    const day = venue.schedule.find((item) => item.shortDate === shortDate) || venue.schedule[0];
    const slot = day.slots.find((item) => item.time === time && (!requestedEndTime || slotEndTime(item) === requestedEndTime));
    if (!slot) return;
    const endTime = slotEndTime(slot);
    const existing = findReservationForSlot(venueId, time, day.shortDate, endTime);
    if (existing) {
      const visual = reservationStatus(existing.statusKey);
      detailReturnContext = { venueId: venue.id, shortDate: day.shortDate };
      openDetail({ eyebrow: "Status do horário", title: `${venue.name} · ${timeRange(time,endTime)}`, body: `<div class="summary-card"><strong>${visual.label}</strong><div class="meta-row" style="margin-top:7px"><span>${esc(existing.id)}</span><span>Endpoint: ${esc(existing.endpoint)}</span></div></div><p class="dialog-description">Horários cancelados deixam de bloquear a agenda e permanecem apenas no histórico de reservas.</p>` });
      return;
    }
    if (slot.blocked) {
      detailReturnContext = { venueId: venue.id, shortDate: day.shortDate };
      openDetail({ eyebrow: "Horário indisponível", title: `${venue.name} · ${timeRange(time,endTime)}`, body: `<p class="dialog-description">Este horário foi bloqueado pelo parceiro e não pode ser reservado.</p>` });
      return;
    }
    selectedReservation = { venue, time, endTime, day, value: Number(slot.price), slot };
    reservationReturnContext = { venueId: venue.id, shortDate: day.shortDate };
    reservationTitle.textContent = `${venue.name} · ${timeRange(time,endTime)}`;
    monthlyReservationToggle.checked = false;
    reservationPolicyAcknowledge.checked = false;
    if (paymentMethodSelect) paymentMethodSelect.value = window.TAMO_ON_PARTNERS_CONFIG?.payments?.defaultMethod || "pix_direct_partner";
    if (pixSplitToggle) pixSplitToggle.checked = false;
    if (pixSplitMode) pixSplitMode.value = "equal";
    if (pixSplitConfig) pixSplitConfig.hidden = true;
    if (pixSplitMembers) pixSplitMembers.innerHTML = "";
    if (pixSplitSummary) pixSplitSummary.innerHTML = "";
    if (reservationPolicyText) reservationPolicyText.textContent = `Usuário: cancelamento até ${state.settings.cancellationHours}h antes pode gerar voucher. Mensalista: prazo contado da primeira ocorrência. Parceiro ou Tâmo On: reembolso integral. Fora do prazo não há crédito automático.`;
    populateVoucherOptions();
    updateMonthlyReservationPreview();
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
      const paymentMethod = reservation.paymentMethod || "credit_card_asaas";
      const isCard = paymentMethod === "credit_card_asaas";
      const provider = reservation.paymentProvider || (isCard ? "ASAAS" : "GENERIC_MANUAL");
      Object.assign(reservation, {
        statusKey: "confirmed",
        status: complement > 0 ? "Confirmada — complemento pago" : "Confirmada",
        endpoint: isCard ? "asaas.webhook.payment_confirmed" : "bank_pix.webhook.received",
        paymentStatus: complement > 0 ? (isCard ? "Complemento pago via cartão Asaas" : "Complemento Pix confirmado pelo banco") : (isCard ? "Pago via cartão Asaas" : "Pix confirmado pelo banco do parceiro"),
        complementPaid: complement,
        accountingRecognizedValue: complement > 0 ? complement : Number(reservation.accountingRecognizedValue || reservation.value),
        fiscalObligationValue: complement > 0 ? complement : Number(reservation.fiscalObligationValue || reservation.value),
        accountingMonth: accountingMonth()
      });
      const paymentIntent = state.paymentIntents.find((item) => item.id === reservation.paymentIntentId);
      if (paymentIntent) Object.assign(paymentIntent, { status:"CONFIRMED", confirmedAt:new Date().toLocaleString("pt-BR") });
      state.paymentWebhookLog.unshift({ id:nextId("WH-", state.paymentWebhookLog), provider, event:isCard ? "PAYMENT_CONFIRMED" : "PIX_RECEIVED", reservationId:reservation.id, status:"Processado", createdAt:new Date().toLocaleString("pt-BR") });
      if (linkedVoucher) {
        Object.assign(linkedVoucher, { status: "used", usedAt: new Date().toLocaleString("pt-BR"), usedReservationId: reservation.id, consumedValue: linkedVoucher.value });
      }
      if (complement > 0) {
        state.accountingLedger.unshift({ id: nextId("LED-", state.accountingLedger), type: "voucher_complement", reservationId: reservation.id, voucherId: linkedVoucher?.id || "", venueId: reservation.venueId, venue: reservation.venue, amount: complement, fiscalAmount: complement, accountingMonth: reservation.accountingMonth, description: "Complemento pago em reserva com voucher" });
      } else if (!linkedVoucher && !hadAccounting) {
        state.accountingLedger.unshift({ id: nextId("LED-", state.accountingLedger), type: "service_payment", reservationId: reservation.id, venueId: reservation.venueId, venue: reservation.venue, amount: reservation.value, fiscalAmount: reservation.value, accountingMonth: reservation.accountingMonth, description: "Pagamento da reserva" });
      }
      const published = publishStandbyEventForReservation(reservation, complement > 0 ? "event.publish_after_complement" : "event.publish_after_payment");
      syncPartnerReservationFromUser(reservation);
      ensureChatThread(reservation);
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

  function openPromotionForm(issuerType) {
    const isPartner = issuerType === "partner";
    const venueOptions = isPartner ? [{ value:state.partnerProfile.venueId, label:state.partnerProfile.tradeName }] : [{ value:"all", label:"Todos os parceiros" }, ...state.venues.map((venue) => ({ value:venue.id, label:venue.name }))];
    const today = new Date();
    const expiry = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const expiryIso = `${expiry.getFullYear()}-${String(expiry.getMonth()+1).padStart(2,"0")}-${String(expiry.getDate()).padStart(2,"0")}`;
    openForm({ eyebrow:isPartner ? "Voucher do parceiro" : "Voucher da administração", title:"Criar voucher promocional", description:"O desconto será aplicado diretamente ao valor da reserva quando o usuário selecionar este código no checkout.", fields:[
      {name:"title",label:"Nome da campanha",value:"",required:true},
      {name:"code",label:"Código do voucher",value:"",required:true},
      {name:"venueId",label:"Onde pode ser usado",type:"select",value:isPartner?state.partnerProfile.venueId:"all",options:venueOptions,required:true},
      {name:"discountType",label:"Tipo de desconto",type:"select",value:"percentage",options:[{value:"percentage",label:"Percentual (%)"},{value:"fixed",label:"Valor fixo (R$)"}],required:true},
      {name:"discountValue",label:"Valor do desconto",type:"number",step:"0.01",value:10,required:true},
      {name:"minimumReservationValue",label:"Valor mínimo da reserva",type:"number",step:"0.01",value:0},
      {name:"bookingMode",label:"Modalidade",type:"select",value:"any",options:[{value:"any",label:"Avulsa ou mensalista"},{value:"single",label:"Somente avulsa"},{value:"monthly",label:"Somente mensalista"}],required:true},
      {name:"validUntil",label:"Válido até",type:"date",value:expiryIso,required:true}
    ], submitLabel:"Criar voucher", onSubmit:(data)=>{
      const code=String(data.code||"").trim().toUpperCase().replace(/[^A-Z0-9_-]/g,"");
      if(code.length<3){showToast("Informe um código com pelo menos 3 caracteres.");return;}
      if(state.promotions.some((promo)=>String(promo.code).toUpperCase()===code)){showToast("Já existe um voucher com esse código.");return;}
      const discountValue=Number(data.discountValue||0);
      if(discountValue<=0 || (data.discountType==="percentage" && discountValue>100)){showToast("Revise o valor do desconto.");return;}
      const venueId=isPartner?state.partnerProfile.venueId:data.venueId;
      const venue=venueId==="all"?null:state.venues.find((item)=>item.id===venueId);
      const validDate=new Date(`${data.validUntil}T12:00:00`);
      const promo={ id:nextId("P-",state.promotions), title:data.title, code, discountType:data.discountType, discountValue, benefit:data.discountType==="percentage"?`${discountValue}% de desconto`:`${money(discountValue)} de desconto`, minimumReservationValue:Number(data.minimumReservationValue||0), bookingMode:data.bookingMode, venueId, venue:venue?.name||"Todos os parceiros", validUntil:formatPtDate(validDate), active:true, issuerType, issuerName:isPartner?state.partnerProfile.tradeName:"Tâmo On", createdAt:new Date().toLocaleString("pt-BR"), usedCount:0 };
      state.promotions.unshift(promo); saveState(); render(); showToast(`Voucher ${code} criado.`);
    }});
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

    if (action === "open-reservation-chat") {
      openReservationChat(id);
    } else if (action === "pix-split-details") {
      openPixSplitDetails(id);
    } else if (action === "simulate-pix-share-paid") {
      simulatePixSharePaid(id);
    } else if (action === "toggle-favorite") {
      state.favorites = state.favorites.includes(id) ? state.favorites.filter((item) => item !== id) : [...state.favorites,id];
      saveState(); render(); showToast(state.favorites.includes(id) ? "Quadra adicionada aos favoritos." : "Quadra removida dos favoritos.");
    } else if (action === "reserve-slot") {
      openReservation(button.dataset.venue, button.dataset.time, button.dataset.date, button.dataset.end || "");
    } else if (action === "venue-details") {
      openVenueSchedule(id);
    } else if (action === "venue-schedule-day") {
      openVenueSchedule(id, button.dataset.date);
    } else if (action === "reservation-details") {
      const reservation = state.reservations.find((item) => item.id === id);
      if (reservation) {
        const linkedEvent = state.groupEvents.find((event) => event.id === reservation.eventId);
        const latestPush = state.pushLog.find((push) => push.eventId === reservation.eventId);
        openDetail({ eyebrow: "Reserva e automação", title: reservation.id, body: `<div class="details-grid"><div class="detail-group"><h3>Horário</h3><div class="detail-list"><div class="detail-line"><span>Local</span><strong>${esc(reservation.venue)}</strong></div><div class="detail-line"><span>Data</span><strong>${esc(reservation.date)}</strong></div><div class="detail-line"><span>Período</span><strong>${esc(timeRange(reservation.time,reservation.endTime))}</strong></div><div class="detail-line"><span>Modalidade</span><strong>${reservation.monthly ? `Mensalista · ${esc(reservation.occurrenceCount)} datas` : "Avulsa"}</strong></div><div class="detail-line"><span>Valor total</span><strong>${money(reservation.value)}</strong></div></div></div><div class="detail-group"><h3>Grupo e permissão</h3><div class="detail-list"><div class="detail-line"><span>Grupo</span><strong>${esc(reservation.groupName || "Não informado")}</strong></div><div class="detail-line"><span>Função do usuário</span><strong>${esc(reservation.groupRole || "Não informada")}</strong></div><div class="detail-line"><span>Evento</span><strong>${esc(reservation.event || "Não informado")}</strong></div><div class="detail-line"><span>Origem</span><strong>${reservation.eventMode === "new" ? "Criado pela reserva" : "Evento existente"}</strong></div></div></div><div class="detail-group"><h3>Pagamento e publicação</h3><div class="detail-list"><div class="detail-line"><span>Reserva</span><strong>${esc(reservation.status)}</strong></div><div class="detail-line"><span>Endpoint do pagamento</span><strong>${esc(reservation.endpoint)}</strong></div><div class="detail-line"><span>Meio de pagamento</span><strong>${esc(reservation.paymentMethodLabel || paymentMethodLabel(reservation.paymentMethod || "credit_card_asaas"))}</strong></div><div class="detail-line"><span>Provedor</span><strong>${esc(reservation.paymentProvider || "Não informado")}</strong></div><div class="detail-line"><span>Intent</span><strong>${esc(reservation.paymentIntentId || "Não criado")}</strong></div><div class="detail-line"><span>Evento</span><strong>${esc(linkedEvent?.status || eventPublicationLabel(reservation.eventPublicationStatus).label)}</strong></div><div class="detail-line"><span>Endpoint de publicação</span><strong>${esc(linkedEvent?.publicationEndpoint || "Aguardando pagamento")}</strong></div></div></div><div class="detail-group"><h3>Notificação automática</h3><div class="detail-list"><div class="detail-line"><span>Status do push</span><strong>${esc(reservation.pushStatus || linkedEvent?.pushStatus || "Não iniciado")}</strong></div><div class="detail-line"><span>Destinatários</span><strong>${latestPush ? `${esc(latestPush.recipients)} membros` : "Aguardando publicação"}</strong></div><div class="detail-line"><span>Endpoint</span><strong>${esc(latestPush?.endpoint || "push.group_members")}</strong></div><div class="detail-line"><span>Voucher</span><strong>${esc(reservation.voucher || "Não aplicado")}</strong></div><div class="detail-line"><span>Valor abatido</span><strong>${money(reservation.voucherAppliedValue || 0)}</strong></div><div class="detail-line"><span>Complemento</span><strong>${money(reservation.paymentDue || reservation.complementPaid || 0)}</strong></div><div class="detail-line"><span>Política aceita</span><strong>${reservation.cancellationPolicyAccepted ? "Sim" : "Não"}</strong></div></div></div>${reservation.cancellationSource ? `<div class="detail-group"><h3>Cancelamento</h3><div class="detail-list"><div class="detail-line"><span>Responsável</span><strong>${esc(cancellationSourceLabel(reservation.cancellationSource))}</strong></div><div class="detail-line"><span>Modalidade</span><strong>${reservation.cancellationMode === "voucher" ? "Voucher" : reservation.cancellationMode === "refund" ? "Reembolso integral" : "Sem compensação"}</strong></div><div class="detail-line"><span>Motivo</span><strong>${esc(reservation.cancellationReason || "Não informado")}</strong></div><div class="detail-line"><span>Voucher</span><strong>${esc(reservation.voucherGeneratedCode || "Não gerado")}</strong></div><div class="detail-line"><span>Reembolso</span><strong>${money(reservation.refundValue || 0)}</strong></div><div class="detail-line"><span>Taxas suportadas por</span><strong>${reservation.refundFeePayer ? esc(cancellationSourceLabel(reservation.refundFeePayer)) : "Não aplicável"}</strong></div><div class="detail-line"><span>Análise excepcional</span><strong>${esc(reservation.exceptionReviewStatus || "Não solicitada")}</strong></div><div class="detail-line"><span>Endpoint</span><strong>${esc(reservation.endpoint || "cancellation.pending")}</strong></div><div class="detail-line"><span>Horário</span><strong>${reservation.slotReleased ? "Liberado" : "Bloqueado"}</strong></div></div></div>` : ""}</div>` });
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
    } else if (action === "create-partner-promotion") {
      openPromotionForm("partner");
    } else if (action === "create-admin-promotion") {
      openPromotionForm("admin");
    } else if (action === "toggle-promotion") {
      const promo = state.promotions.find((item) => item.id === id);
      const partnerCanManage = state.role === "partner" && promotionIssuerType(promo) === "partner" && promotionVenueId(promo) === state.partnerProfile.venueId;
      const adminCanManage = state.role === "admin";
      if (promo && (partnerCanManage || adminCanManage)) { promo.active = !promo.active; saveState(); render(); showToast(`Voucher ${promo.code} ${promo.active ? "ativado" : "desativado"}.`); }
    } else if (action === "partner-schedule-date") {
      state.ui = state.ui || {};
      state.ui.partnerAgendaDate = button.dataset.date || "";
      state.ui.selectedAvailabilityKeys = [];
      saveState(); render();
    } else if (action === "toggle-availability-selection") {
      const key=button.dataset.key;
      const selected=selectedAvailabilityKeys();
      state.ui.selectedAvailabilityKeys=button.checked ? [...new Set([...selected,key])] : selected.filter((item)=>item!==key);
      saveState();render();
    } else if (action === "toggle-all-availability") {
      const venue=state.venues.find((item)=>item.id===state.partnerProfile.venueId);if(!venue)return;
      const selectedDate=selectedPartnerAgendaDate(venue);
      const eligible=publicAvailabilityEntries(venue).filter(({day,slot})=>day.shortDate===selectedDate && !availabilityHasActiveReservation(venue,day,slot)).map((entry)=>entry.key);
      state.ui.selectedAvailabilityKeys=button.checked ? eligible : [];
      saveState();render();
    } else if (action === "delete-selected-availability") {
      const venue=state.venues.find((item)=>item.id===state.partnerProfile.venueId);if(!venue)return;
      const selected=selectedAvailabilityKeys();
      const entries=publicAvailabilityEntries(venue).filter((entry)=>selected.includes(entry.key));
      const blocked=entries.filter(({day,slot})=>availabilityHasActiveReservation(venue,day,slot));
      if(blocked.length){openDetail({eyebrow:"Agenda",title:"Há horários protegidos",body:`<div class="cancellation-warning"><strong>Exclusão em lote interrompida</strong><p>${esc(blocked.length)} horário(s) selecionado(s) possuem reserva ativa. Remova esses itens da seleção antes de continuar.</p></div>`});return;}
      if(!entries.length){showToast("Selecione ao menos um horário para excluir.");return;}
      askConfirm({title:"Excluir horários selecionados",message:`Excluir ${entries.length} horário(s) publicados? Horários ocupados não entram nesta seleção.`,confirmLabel:"Excluir horários",onConfirm:()=>{const removed=removeAvailabilityEntries(venue,entries.map((entry)=>entry.key));saveState();render();showToast(`${removed} horário(s) excluído(s) da agenda.`);}});
    } else if (action === "new-availability" || action === "edit-availability") {
      const venue = state.venues.find((item) => item.id === state.partnerProfile.venueId);
      if (!venue) return;
      const editDay = action === "edit-availability" ? venue.schedule.find((day) => day.shortDate === button.dataset.date) : null;
      const editSlot = editDay?.slots.find((slot) => slot.time === button.dataset.time && normalizedSlotSpace(slot) === (button.dataset.space || normalizedSlotSpace(slot))) || null;
      if (editSlot && availabilityHasActiveReservation(venue,editDay,editSlot)) {
        const occupied=findReservationForSlot(venue.id,editSlot.time,editDay.shortDate,slotEndTime(editSlot),normalizedSlotSpace(editSlot));
        openDetail({eyebrow:"Agenda",title:"Horário vinculado a uma reserva",body:`<div class="cancellation-warning"><strong>Edição protegida</strong><p>O período ${esc(timeRange(editSlot.time,slotEndTime(editSlot)))} está vinculado a ${esc(occupied?.id || "uma reserva ativa")}. Altere ou cancele a reserva na área de Reservas antes de modificar a grade.</p></div>`});
        return;
      }
      const defaultSpace = state.partnerSpaces.find((space) => space.name === normalizedSlotSpace(editSlot)) || state.partnerSpaces[0];
      const defaultIsoDate = editDay ? `${editDay.date.slice(6)}-${editDay.date.slice(3,5)}-${editDay.date.slice(0,2)}` : "2026-08-01";
      if (editSlot) {
        openForm({ eyebrow:"Agenda pública", title:"Editar horário disponível", description:"Altere este horário sem criar conflito. Se ele estiver elegível para mensalista, a mesma duração será sincronizada automaticamente nas datas equivalentes restantes do mês.", fields:[
          {name:"date",label:"Data",type:"date",value:defaultIsoDate,required:true},
          {name:"startTime",label:"Início",type:"time",value:editSlot.time,required:true},
          {name:"endTime",label:"Término",type:"time",value:slotEndTime(editSlot),required:true},
          {name:"space",label:"Espaço",type:"select",value:normalizedSlotSpace(editSlot),options:state.partnerSpaces.filter((item)=>item.status==="Ativo").map((item)=>item.name),required:true},
          {name:"price",label:"Valor avulso",type:"number",step:"0.01",value:editSlot.price,required:true},
          {name:"monthlyEnabled",label:"Disponível para mensalista",type:"select",value:editSlot.monthlyEligible?"Sim":"Não",options:["Sim","Não"]},
          {name:"monthlyPrice",label:"Valor do pacote mensal",type:"number",step:"0.01",value:editSlot.monthlyPrice||defaultSpace?.monthlyPrice||440,help:"Valor total da aquisição mensalista."},
          {name:"cascadeFollowing",label:"Reorganizar horários subsequentes",type:"select",value:"Sim",options:["Sim","Não"],full:true,help:"Ao alterar o término, os próximos horários do mesmo dia e espaço passam a iniciar no término do anterior, preservando a duração de cada período."}
        ], submitLabel:"Salvar horário", onSubmit:(data)=>{
          const start=timeToMinutes(data.startTime), end=timeToMinutes(data.endTime);
          if(end<=start){showToast("O horário de término deve ser posterior ao início.");return;}
          const meta=scheduleDayFromDate(isoToLocalDate(data.date));
          const sameDay=meta.shortDate===editDay.shortDate;
          const sameSpace=data.space===normalizedSlotSpace(editSlot);
          const cascade=data.cascadeFollowing==="Sim" && sameDay && sameSpace;
          let cascadePlan={valid:true,changes:[]};
          if(cascade){
            cascadePlan=cascadeAvailabilityPlan(venue,editDay,editSlot,data.endTime);
            if(!cascadePlan.valid){openDetail({eyebrow:"Reorganização da agenda",title:"Não foi possível ajustar os próximos horários",body:`<div class="cancellation-warning"><strong>Alteração interrompida</strong><p>${esc(cascadePlan.reason)}</p></div>`});return;}
            const followingSet=new Set(cascadePlan.changes.map((change)=>change.slot));
            const unaffected=editDay.slots.filter((slot)=>slot!==editSlot && !followingSet.has(slot) && normalizedSlotSpace(slot)===data.space);
            const proposed=[{startTime:data.startTime,endTime:data.endTime},...cascadePlan.changes];
            const collision=proposed.find((period)=>unaffected.some((slot)=>timeRangesOverlap(period.startTime,period.endTime,slot.time,slotEndTime(slot))));
            if(collision){const conflict=unaffected.find((slot)=>timeRangesOverlap(collision.startTime,collision.endTime,slot.time,slotEndTime(slot)));openDetail({eyebrow:"Conflito de agenda",title:"A sequência encontraria outro horário",body:`<div class="cancellation-warning"><strong>Não foi possível salvar</strong><p>A reorganização de ${esc(timeRange(collision.startTime,collision.endTime))} encontraria o período independente ${esc(timeRange(conflict.time,slotEndTime(conflict)))}. Ajuste o término ou edite a outra sequência.</p></div>`});return;}
          } else {
            const conflict=scheduleConflict(venue,meta,data.space,data.startTime,data.endTime,editSlot);
            if(conflict){openDetail({eyebrow:"Conflito de agenda",title:"Horário sobreposto",body:`<div class="cancellation-warning"><strong>Não foi possível salvar</strong><p>${esc(meta.date)} · ${esc(data.space)} já possui o período ${esc(timeRange(conflict.time,slotEndTime(conflict)))}. Ative a reorganização automática para deslocar a sequência quando aplicável.</p></div>`});return;}
          }
          let monthlyPlan={valid:true,dayPlans:[]};
          const syncMonthly=data.monthlyEnabled==="Sim" && sameDay && sameSpace;
          if(syncMonthly){
            monthlyPlan=monthlyAvailabilityPropagationPlan(venue,editDay,editSlot,data.startTime,data.endTime);
            if(!monthlyPlan.valid){openDetail({eyebrow:"Mensalista",title:"Não foi possível sincronizar o mês",body:`<div class="cancellation-warning"><strong>Alteração interrompida</strong><p>${esc(monthlyPlan.reason)}</p><p>As datas mensalistas precisam manter a mesma duração sem sobrepor horários ou deslocar reservas existentes.</p></div>`});return;}
          }
          if(cascade){
            Object.assign(editSlot,{time:data.startTime,endTime:data.endTime,price:Number(data.price),space:data.space,monthlyEligible:data.monthlyEnabled==="Sim",monthlyPrice:data.monthlyEnabled==="Sim"?Number(data.monthlyPrice):0});
            cascadePlan.changes.forEach((change)=>{change.slot.time=change.startTime;change.slot.endTime=change.endTime;});
            editDay.slots.sort((a,b)=>a.time.localeCompare(b.time));
            const monthlyResult=syncMonthly?applyMonthlyAvailabilityPropagation(monthlyPlan,data.startTime,data.endTime,Number(data.monthlyPrice)):null;
            state.ui.partnerAgendaDate=meta.shortDate;
            state.ui.selectedAvailabilityKeys=[];
            saveState();render();
            if(monthlyResult?.changedDays){showToast(`Horário mensalista sincronizado em ${monthlyResult.changedDays + 1} data(s); ${cascadePlan.changes.length + monthlyResult.shiftedSlots} período(s) subsequente(s) reorganizado(s).`);}
            else showToast(cascadePlan.changes.length?`Horário atualizado e ${cascadePlan.changes.length} período(s) subsequente(s) reorganizado(s).`:"Horário atualizado.");
            return;
          }
          editDay.slots=editDay.slots.filter((slot)=>slot!==editSlot);
          if(!editDay.slots.length) venue.schedule=venue.schedule.filter((day)=>day!==editDay);
          let day=venue.schedule.find((item)=>item.shortDate===meta.shortDate);
          if(!day){day={...meta,slots:[]};venue.schedule.push(day);}
          day.slots.push({time:data.startTime,endTime:data.endTime,price:Number(data.price),space:data.space,monthlyEligible:data.monthlyEnabled==="Sim",monthlyPrice:data.monthlyEnabled==="Sim"?Number(data.monthlyPrice):0,blocked:Boolean(editSlot.blocked),blockTitle:editSlot.blockTitle||"",blockDetail:editSlot.blockDetail||""});
          day.slots.sort((a,b)=>a.time.localeCompare(b.time));
          const monthlyResult=syncMonthly?applyMonthlyAvailabilityPropagation(monthlyPlan,data.startTime,data.endTime,Number(data.monthlyPrice)):null;
          venue.schedule.sort((a,b)=>parsePtDateTime(a.date,"12:00")-parsePtDateTime(b.date,"12:00"));
          state.ui.partnerAgendaDate=meta.shortDate;
          state.ui.selectedAvailabilityKeys=[];
          saveState();render();showToast(monthlyResult?.changedDays?`Horário atualizado e duração mensalista replicada em ${monthlyResult.changedDays} outra(s) data(s).`:"Horário atualizado.");
        }});
      } else {
        openForm({ eyebrow:"Agenda pública", title:"Criar agenda em lote", description:"Configure uma faixa do mês. A grade automática divide o período diário em vários horários e publica tudo de uma vez.", fields:[
          {name:"generationMode",label:"Como criar",type:"select",value:"Grade automática do dia",options:["Grade automática do dia","Um horário recorrente"],full:true,help:"Grade automática: informe abertura, fechamento e duração. Horário recorrente: repete apenas o intervalo inicial e final."},
          {name:"startDate",label:"Data inicial",type:"date",value:"2026-08-01",required:true},
          {name:"endDate",label:"Data final",type:"date",value:"2026-08-31",required:true},
          {name:"daysPreset",label:"Dias que terão agenda",type:"select",value:"Segunda a sábado",options:["Todos os dias","Segunda a sexta","Segunda a sábado","Sábados e domingos","Mesmo dia da semana da data inicial"],full:true},
          {name:"startTime",label:"Abertura / início",type:"time",value:"08:00",required:true},
          {name:"endTime",label:"Fechamento / término",type:"time",value:"22:00",required:true},
          {name:"durationMinutes",label:"Duração de cada horário (min)",type:"number",min:15,step:15,value:60,help:"Usado somente na grade automática."},
          {name:"intervalMinutes",label:"Intervalo entre horários (min)",type:"number",min:0,step:5,value:0,help:"Use 0 para horários consecutivos."},
          {name:"space",label:"Espaço",type:"select",value:defaultSpace?.name,options:state.partnerSpaces.filter((item)=>item.status==="Ativo").map((item)=>item.name),required:true},
          {name:"price",label:"Valor avulso por horário",type:"number",step:"0.01",value:defaultSpace?.price||120,required:true},
          {name:"monthlyEnabled",label:"Permitir mensalista",type:"select",value:"Sim",options:["Sim","Não"]},
          {name:"monthlyPrice",label:"Valor do pacote mensal",type:"number",step:"0.01",value:defaultSpace?.monthlyPrice||440,help:"Aplicado a cada faixa semanal equivalente."}
        ], submitLabel:"Gerar e publicar agenda", onSubmit:(data)=>{
          const dates=datesForAgendaRange(data.startDate,data.endDate,data.daysPreset);
          const ranges=rangesForAgendaGeneration(data.generationMode,data.startTime,data.endTime,data.durationMinutes,data.intervalMinutes);
          if(!dates.length){showToast("Nenhuma data foi encontrada no período e nos dias escolhidos.");return;}
          if(!ranges.length){showToast("Revise o horário inicial, final e a duração da grade.");return;}
          const total=dates.length*ranges.length;
          if(total>600){openDetail({eyebrow:"Agenda em lote",title:"Quantidade muito alta",body:`<p class="dialog-description">A configuração geraria ${esc(total)} horários. Reduza o período ou divida a publicação em duas etapas.</p>`});return;}
          const conflicts=[];
          dates.forEach((date)=>{const meta=scheduleDayFromDate(date);ranges.forEach((range)=>{const conflict=scheduleConflict(venue,meta,data.space,range.startTime,range.endTime);if(conflict)conflicts.push(`${meta.date} · ${timeRange(range.startTime,range.endTime)} sobrepõe ${timeRange(conflict.time,slotEndTime(conflict))}`);});});
          if(conflicts.length){openDetail({eyebrow:"Conflito de agenda",title:`${conflicts.length} sobreposição(ões) encontrada(s)`,body:`<div class="cancellation-warning"><strong>Nenhum horário foi criado</strong><p>Não é permitido publicar horários sobrepostos no mesmo espaço. Ajuste a faixa ou exclua os períodos existentes.</p><ul>${conflicts.slice(0,8).map((item)=>`<li>${esc(item)}</li>`).join("")}</ul>${conflicts.length>8?`<p class="dialog-description">E mais ${esc(conflicts.length-8)} conflito(s).</p>`:""}</div>`});return;}
          dates.forEach((date)=>{
            const meta=scheduleDayFromDate(date);
            let day=venue.schedule.find((item)=>item.shortDate===meta.shortDate);
            if(!day){day={...meta,slots:[]};venue.schedule.push(day);}
            ranges.forEach((range)=>day.slots.push({time:range.startTime,endTime:range.endTime,price:Number(data.price),space:data.space,monthlyEligible:data.monthlyEnabled==="Sim",monthlyPrice:data.monthlyEnabled==="Sim"?Number(data.monthlyPrice):0}));
            day.slots.sort((a,b)=>a.time.localeCompare(b.time));
          });
          venue.schedule.sort((a,b)=>parsePtDateTime(a.date,"12:00")-parsePtDateTime(b.date,"12:00"));
          saveState();render();showToast(`${total} horário(s) publicados em ${dates.length} dia(s).`);
        }});
      }
    } else if (action === "delete-availability") {
      const venue=state.venues.find((item)=>item.id===state.partnerProfile.venueId);if(!venue)return;
      const day=venue.schedule.find((item)=>item.shortDate===button.dataset.date);
      const slot=day?.slots.find((item)=>item.time===button.dataset.time && normalizedSlotSpace(item)===(button.dataset.space||normalizedSlotSpace(item)));
      if(!day||!slot)return;
      const occupied=findReservationForSlot(venue.id,slot.time,day.shortDate,slotEndTime(slot),normalizedSlotSpace(slot));
      if(occupied){openDetail({eyebrow:"Agenda",title:"Horário com reserva ativa",body:`<div class="cancellation-warning"><strong>Exclusão bloqueada</strong><p>O período ${esc(timeRange(slot.time,slotEndTime(slot)))} em ${esc(day.date)} está vinculado à reserva ${esc(occupied.id)}. Cancele ou trate a reserva antes de excluir a disponibilidade.</p></div>`});return;}
      askConfirm({title:"Excluir horário",message:`Excluir ${day.date}, ${timeRange(slot.time,slotEndTime(slot))}, em ${normalizedSlotSpace(slot)}?`,confirmLabel:"Excluir horário",onConfirm:()=>{const key=availabilityKey(day.shortDate,slot.time,normalizedSlotSpace(slot));day.slots=day.slots.filter((item)=>item!==slot);if(!day.slots.length)venue.schedule=venue.schedule.filter((item)=>item!==day);state.ui.selectedAvailabilityKeys=selectedAvailabilityKeys().filter((item)=>item!==key);saveState();render();showToast("Horário excluído da agenda.");}});
    } else if (action === "new-block") {
      const venue=state.venues.find((item)=>item.id===state.partnerProfile.venueId);if(!venue)return;
      const available=blockableAvailabilityEntries(venue);
      if(!available.length){openDetail({eyebrow:"Agenda",title:"Nenhum horário disponível para bloquear",body:`<div class="cancellation-warning"><strong>A grade não possui horários livres.</strong><p>Crie novos horários ou libere uma reserva/bloqueio existente antes de realizar outro bloqueio.</p></div>`});return;}
      const selectedDate=selectedPartnerAgendaDate(venue);
      const preferred=available.find(({day})=>day.shortDate===selectedDate)||available[0];
      openForm({eyebrow:"Agenda",title:"Novo bloqueio",description:"Selecione um horário já disponível na agenda. Somente dias e períodos livres são exibidos.",fields:[
        {name:"slotKey",label:"Dia e horário disponível",type:"select",value:preferred.key,required:true,options:available.map(({day,slot,key})=>({value:key,label:`${day.date} · ${timeRange(slot.time,slotEndTime(slot))} · ${normalizedSlotSpace(slot)}`}))},
        {name:"title",label:"Motivo",value:"Manutenção",required:true},{name:"detail",label:"Observação",type:"textarea",value:"Bloqueio interno",full:true}
      ],submitLabel:"Bloquear horário",onSubmit:(data)=>{
        const [shortDate,time,space]=String(data.slotKey||"").split("::");
        const day=venue.schedule.find((item)=>item.shortDate===shortDate);
        const slot=day?.slots.find((item)=>item.time===time && normalizedSlotSpace(item)===space);
        if(!day||!slot){showToast("O horário selecionado não existe mais na agenda.");return;}
        if(slot.blocked||availabilityHasActiveReservation(venue,day,slot)){openDetail({eyebrow:"Bloqueio",title:"Horário não está mais disponível",body:`<div class="cancellation-warning"><strong>Bloqueio não aplicado</strong><p>Este período foi reservado ou bloqueado depois da abertura do formulário. Atualize a agenda e tente novamente.</p></div>`});return;}
        slot.blocked=true;slot.blockTitle=data.title;slot.blockDetail=data.detail||"Bloqueio interno";
        state.ui.partnerAgendaDate=day.shortDate;state.ui.selectedAvailabilityKeys=[];saveState();render();showToast("Horário bloqueado e retirado imediatamente da disponibilidade do marketplace.");
      }});
    } else if (action === "block-availability") {
      const venue=state.venues.find((item)=>item.id===state.partnerProfile.venueId);if(!venue)return;
      const day=venue.schedule.find((item)=>item.shortDate===button.dataset.date);
      const slot=day?.slots.find((item)=>item.time===button.dataset.time && normalizedSlotSpace(item)===(button.dataset.space||normalizedSlotSpace(item)));
      if(!day||!slot)return;
      if(slot.blocked||availabilityHasActiveReservation(venue,day,slot)){showToast("Este horário não está disponível para bloqueio.");return;}
      openForm({eyebrow:"Agenda",title:`Bloquear ${day.date} · ${timeRange(slot.time,slotEndTime(slot))}`,description:`${normalizedSlotSpace(slot)} será retirado da disponibilidade do marketplace.`,fields:[{name:"title",label:"Motivo",value:"Manutenção",required:true},{name:"detail",label:"Observação",type:"textarea",value:"Bloqueio interno",full:true}],submitLabel:"Bloquear horário",onSubmit:(data)=>{
        if(slot.blocked||availabilityHasActiveReservation(venue,day,slot)){showToast("Este horário não está mais disponível para bloqueio.");return;}
        slot.blocked=true;slot.blockTitle=data.title;slot.blockDetail=data.detail||"Bloqueio interno";state.ui.partnerAgendaDate=day.shortDate;state.ui.selectedAvailabilityKeys=[];saveState();render();showToast("Horário bloqueado e retirado imediatamente da disponibilidade do marketplace.");
      }});
    } else if (action === "new-partner-reservation") {
      const venue=state.venues.find((item)=>item.id===state.partnerProfile.venueId);if(!venue)return;
      const selectedDate=selectedPartnerAgendaDate(venue);
      const selectedDay=venue.schedule.find((day)=>day.shortDate===selectedDate);
      const defaultIso=selectedDay?`${selectedDay.date.slice(6)}-${selectedDay.date.slice(3,5)}-${selectedDay.date.slice(0,2)}`:"2026-08-13";
      openForm({ eyebrow:"Reservas",title:"Nova reserva manual",description:"A reserva será vinculada à mesma grade exibida no marketplace. Se o horário ainda não existir e não houver conflito, ele será criado automaticamente.",fields:[
        {name:"client",label:"Cliente ou grupo",value:"",required:true},{name:"date",label:"Data inicial",type:"date",value:defaultIso,required:true},
        {name:"time",label:"Início",type:"time",value:"18:00",required:true},{name:"endTime",label:"Término",type:"time",value:"19:00",required:true},{name:"space",label:"Espaço",type:"select",options:state.partnerSpaces.map((item)=>item.name)},
        {name:"bookingMode",label:"Modalidade",type:"select",value:"Avulsa",options:["Avulsa","Mensalista"]},{name:"value",label:"Valor avulso",type:"number",step:"0.01",value:120,required:true},{name:"monthlyValue",label:"Valor mensalista",type:"number",step:"0.01",value:440},{name:"status",label:"Status",type:"select",value:"Pendente",options:["Pendente","Confirmada"]}
      ],submitLabel:"Salvar reserva",onSubmit:(data)=>{
        const start=timeToMinutes(data.time),end=timeToMinutes(data.endTime);if(end<=start){showToast("O término deve ser posterior ao início.");return;}
        const monthly=data.bookingMode==="Mensalista";const base=isoToLocalDate(data.date);const occurrences=[];
        if(monthly){for(let date=new Date(base);date.getMonth()===base.getMonth();date.setDate(date.getDate()+7)){const meta=scheduleDayFromDate(date);occurrences.push({...meta,time:data.time,endTime:data.endTime,space:data.space});}}
        else{const meta=scheduleDayFromDate(base);occurrences.push({...meta,time:data.time,endTime:data.endTime,space:data.space});}
        const problems=[];
        occurrences.forEach((occ)=>{
          const meta={date:occ.date,shortDate:occ.shortDate,weekday:occ.weekday,dayLabel:occ.dayLabel};
          const exact=slotForSchedulePeriod(venue,meta,data.space,data.time,data.endTime);
          if(exact.slot){
            if(exact.slot.blocked) problems.push(`${occ.date} · horário bloqueado`);
            else if(availabilityHasActiveReservation(venue,exact.day,exact.slot)) problems.push(`${occ.date} · horário já reservado`);
          }else{
            const conflict=scheduleConflict(venue,meta,data.space,data.time,data.endTime);
            if(conflict) problems.push(`${occ.date} · sobreposição com ${timeRange(conflict.time,slotEndTime(conflict))}`);
          }
        });
        if(problems.length){openDetail({eyebrow:"Reserva manual",title:"Não foi possível vincular a reserva",body:`<div class="cancellation-warning"><strong>Conflitos encontrados</strong><ul>${problems.slice(0,10).map((item)=>`<li>${esc(item)}</li>`).join("")}</ul></div>`});return;}
        occurrences.forEach((occ)=>{
          const meta={date:occ.date,shortDate:occ.shortDate,weekday:occ.weekday,dayLabel:occ.dayLabel};
          const exact=slotForSchedulePeriod(venue,meta,data.space,data.time,data.endTime);
          if(!exact.slot){const day=ensureScheduleDay(venue,meta);day.slots.push({time:data.time,endTime:data.endTime,price:Number(data.value),space:data.space,monthlyEligible:monthly,monthlyPrice:monthly?Number(data.monthlyValue):0});day.slots.sort((a,b)=>a.time.localeCompare(b.time));}
        });
        state.partnerReservations.unshift({id:nextId("RP-",state.partnerReservations),client:data.client,date:occurrences[0].date,time:data.time,endTime:data.endTime,space:data.space,value:Number(monthly?data.monthlyValue:data.value),monthly,occurrenceCount:occurrences.length,occurrences,status:data.status,payment:"Externo"});
        state.ui.partnerAgendaDate=occurrences[0].shortDate;state.ui.selectedAvailabilityKeys=[];saveState();render();showToast(monthly?`Reserva mensalista vinculada à grade em ${occurrences.length} datas.`:"Reserva manual vinculada à grade publicada.");
      } });
    } else if (action === "schedule-slot-details") {
      const venue=state.venues.find((item)=>item.id===state.partnerProfile.venueId);if(!venue)return;
      const day=venue.schedule.find((item)=>item.shortDate===button.dataset.date);
      const slot=day?.slots.find((item)=>item.time===button.dataset.time && normalizedSlotSpace(item)===(button.dataset.space||normalizedSlotSpace(item)));
      if(!day||!slot)return;
      const info=operationalSlotInfo(venue,day,slot);
      openDetail({eyebrow:"Grade única da agenda",title:`${day.date} · ${timeRange(slot.time,slotEndTime(slot))}`,body:`<div class="summary-card"><strong>${esc(info.statusLabel)}</strong><div class="meta-row" style="margin-top:7px"><span>${esc(normalizedSlotSpace(slot))}</span><span>${esc(info.title)}</span></div><p class="dialog-description">${esc(info.detail)}</p></div><div class="detail-list" style="margin-top:12px"><div class="detail-line"><span>Marketplace</span><strong>${slot.blocked ? "Indisponível" : info.reservation ? info.statusLabel : `Disponível por ${money(slot.price)}`}</strong></div><div class="detail-line"><span>Mensalista</span><strong>${slot.monthlyEligible ? `Elegível · ${money(slot.monthlyPrice)}` : "Não elegível"}</strong></div><div class="detail-line"><span>Fonte dos dados</span><strong>Agenda publicada do parceiro</strong></div></div>`});
    } else if (action === "unblock-availability") {
      const venue=state.venues.find((item)=>item.id===state.partnerProfile.venueId);if(!venue)return;
      const day=venue.schedule.find((item)=>item.shortDate===button.dataset.date);
      const slot=day?.slots.find((item)=>item.time===button.dataset.time && normalizedSlotSpace(item)===(button.dataset.space||normalizedSlotSpace(item)));
      if(!day||!slot||!slot.blocked)return;
      slot.blocked=false;delete slot.blockTitle;delete slot.blockDetail;
      if(Number(slot.price||0)<=0){const baseSpace=state.partnerSpaces.find((item)=>item.name===normalizedSlotSpace(slot));slot.price=Number(baseSpace?.price||0);}
      saveState();render();showToast("Horário desbloqueado e disponibilizado na mesma grade do marketplace.");
    } else if (action === "partner-reservation-details") {
      const item=state.partnerReservations.find((r)=>r.id===id); if(item)openDetail({eyebrow:"Reserva do parceiro",title:item.id,body:`<div class="details-grid"><div class="detail-group"><h3>Reserva</h3><div class="detail-list"><div class="detail-line"><span>Cliente</span><strong>${esc(item.client)}</strong></div><div class="detail-line"><span>Data</span><strong>${esc(item.date)} · ${esc(timeRange(item.time,item.endTime))}${item.monthly ? ` · Mensalista (${esc(item.occurrenceCount)} datas)` : ""}</strong></div><div class="detail-line"><span>Espaço</span><strong>${esc(item.space)}</strong></div></div></div><div class="detail-group"><h3>Financeiro</h3><div class="detail-list"><div class="detail-line"><span>Valor</span><strong>${money(item.value)}</strong></div><div class="detail-line"><span>Status</span><strong>${esc(item.status)}</strong></div><div class="detail-line"><span>Pagamento</span><strong>${esc(item.payment)}</strong></div><div class="detail-line"><span>Voucher</span><strong>${esc(item.voucherGeneratedCode || "Não gerado")}</strong></div></div></div>${item.cancellationSource ? `<div class="detail-group"><h3>Cancelamento</h3><div class="detail-list"><div class="detail-line"><span>Responsável</span><strong>${esc(cancellationSourceLabel(item.cancellationSource))}</strong></div><div class="detail-line"><span>Modalidade</span><strong>${item.cancellationMode === "voucher" ? "Voucher" : item.cancellationMode === "refund" ? "Reembolso integral" : "Sem compensação"}</strong></div><div class="detail-line"><span>Motivo</span><strong>${esc(item.cancellationReason || "Não informado")}</strong></div><div class="detail-line"><span>Voucher</span><strong>${esc(item.voucherGeneratedCode || "Não gerado")}</strong></div><div class="detail-line"><span>Reembolso</span><strong>${money(item.refundValue || 0)}</strong></div><div class="detail-line"><span>Taxas suportadas por</span><strong>${item.refundFeePayer ? esc(cancellationSourceLabel(item.refundFeePayer)) : "Não aplicável"}</strong></div></div></div>` : ""}</div>`});
    } else if (action === "cancel-paid-partner-reservation") {
      const item = state.partnerReservations.find((r) => r.id === id);
      if (item) openPaidCancellation("partner", item.userReservationId || "", item.id);
    } else if (action === "partner-reservation-status") {
      const item=state.partnerReservations.find((r)=>r.id===id); if(item){item.status=button.dataset.status;saveState();render();showToast(`${id}: ${item.status}.`);}
    } else if (action === "export-partner-reservations") {
      exportCsv(`reservas-parceiro-${VERSION}.csv`,[["Reserva","Cliente","Data","Hora","Espaço","Valor","Status"],...state.partnerReservations.map((r)=>[r.id,r.client,r.date,r.time,r.space,r.value,r.status])]);
    } else if (action === "new-space" || action === "edit-space") {
      const item=action==="edit-space"?state.partnerSpaces.find((s)=>s.id===id):null;
      openForm({eyebrow:"Espaços",title:item?"Editar espaço":"Cadastrar espaço",fields:[{name:"name",label:"Nome",value:item?.name||"",required:true},{name:"type",label:"Tipo",type:"select",value:item?.type||"Society",options:["Futsal","Society","Campo"]},{name:"floor",label:"Piso",value:item?.floor||"Grama sintética"},{name:"capacity",label:"Capacidade",type:"number",value:item?.capacity||14},{name:"price",label:"Preço-base",type:"number",step:"0.01",value:item?.price||120},{name:"monthlyPrice",label:"Preço mensalista padrão",type:"number",step:"0.01",value:item?.monthlyPrice||440},{name:"status",label:"Status",type:"select",value:item?.status||"Ativo",options:["Ativo","Inativo"]},{name:"lights",label:"Iluminação",type:"select",value:item?.lights||"Sim",options:["Sim","Não"]},{name:"covered",label:"Coberta",type:"select",value:item?.covered||"Não",options:["Sim","Não"]},{name:"maintenance",label:"Próxima manutenção",value:item?.maintenance||"",full:true}],onSubmit:(data)=>{const normalized={...data,capacity:Number(data.capacity),price:Number(data.price),monthlyPrice:Number(data.monthlyPrice)};if(item)Object.assign(item,normalized);else state.partnerSpaces.push({id:nextId("E-",state.partnerSpaces),...normalized});saveState();render();showToast(item?"Espaço atualizado.":"Espaço cadastrado.");}});
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
    } else if (["edit-company-data","edit-responsible-data","edit-address-data","edit-contract-data","edit-fiscal-data","edit-payment-integrations"].includes(action)) {
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
      openForm({eyebrow:"Configurações",title:"Regras comerciais",fields:[{name:"defaultCommission",label:"Comissão Tâmo On (%)",type:"number",step:"0.1",value:state.settings.defaultCommission},{name:"asaasCommissionRate",label:"Comissão Asaas simulada (%)",type:"number",step:"0.1",value:state.settings.asaasCommissionRate},{name:"cancellationHours",label:"Prazo do cancelamento pelo usuário (horas)",type:"number",value:state.settings.cancellationHours},{name:"voucherValidityDays",label:"Validade nominal do voucher (dias)",type:"number",value:state.settings.voucherValidityDays},{name:"voucherCompatibilityWindowHours",label:"Tolerância da faixa compatível (horas)",type:"number",value:state.settings.voucherCompatibilityWindowHours},{name:"voucherMinimumCompatibleDates",label:"Mínimo de datas compatíveis",type:"number",value:state.settings.voucherMinimumCompatibleDates},{name:"voucherExtensionDays",label:"Prorrogação automática (dias)",type:"number",value:state.settings.voucherExtensionDays}],onSubmit:(data)=>{state.settings.defaultCommission=Number(data.defaultCommission);state.settings.asaasCommissionRate=Number(data.asaasCommissionRate);state.settings.cancellationHours=Number(data.cancellationHours);state.settings.voucherValidityDays=Number(data.voucherValidityDays);state.settings.voucherCompatibilityWindowHours=Number(data.voucherCompatibilityWindowHours);state.settings.voucherMinimumCompatibleDates=Number(data.voucherMinimumCompatibleDates);state.settings.voucherExtensionDays=Number(data.voucherExtensionDays);saveState();render();showToast("Regras comerciais atualizadas.");}});
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
      "edit-fiscal-data":{title:"Fiscal e financeiro",fields:[{name:"fiscalIssuer",label:"Documento fiscal do serviço",value:p.fiscalIssuer,full:true},{name:"commissionInvoice",label:"Documento fiscal da comissão",value:p.commissionInvoice,full:true},{name:"paymentModel",label:"Modelo de pagamento",value:p.paymentModel},{name:"commissionRate",label:"Comissão (%)",type:"number",step:"0.1",value:p.commissionRate}]},
      "edit-payment-integrations":{title:"Integrações de pagamento",fields:[{name:"bankProviderId",label:"Banco / adaptador Pix",type:"select",value:p.bankProviderId||"GENERIC_MANUAL",options:(window.TamoOnBankPix?.listProviders()||[]).map((provider)=>({value:provider.id,label:provider.label}))},{name:"branch",label:"Agência",value:p.branch},{name:"account",label:"Conta",value:p.account},{name:"pixKey",label:"Chave Pix",value:p.pixKey},{name:"pixApiStatus",label:"Status da API Pix",value:p.pixApiStatus,full:true},{name:"asaasSubaccount",label:"Subconta Asaas",value:p.asaasSubaccount},{name:"asaasWalletId",label:"Wallet ID Asaas",value:p.asaasWalletId},{name:"asaasCardStatus",label:"Status do cartão Asaas",value:p.asaasCardStatus,full:true}]}
    };
    const config=configs[action];if(!config)return;
    openForm({eyebrow:"Cadastro do parceiro",title:config.title,fields:config.fields,onSubmit:(data)=>{if("commissionRate" in data)data.commissionRate=Number(data.commissionRate);if(data.bankProviderId){const provider=window.TamoOnBankPix?.provider(data.bankProviderId);if(provider){data.bank=provider.label;data.pixAutoReconciliation=provider.mode==="api";data.pixWebhookStatus=provider.mode==="api"?"Rota preparada":"Confirmação manual";}}Object.assign(p,data);saveState();render();showToast(`${config.title} atualizado.`);}});
  }

  function resetState() {
    state=initialState();saveState();render();showToast("Dados fictícios restaurados.");
  }

  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      const cancelButton = event.target.closest('button[value="cancel"]');
      if (!cancelButton) return;
      event.preventDefault();
      dialog.close("cancel");
    });
  });

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
  paymentMethodSelect?.addEventListener("change", () => { updateVoucherPaymentPreview(); updatePixSplitPanel(); updateReservationSubmitState(); });
  pixSplitToggle?.addEventListener("change", () => { updatePixSplitPanel(); updateReservationSubmitState(); });
  pixSplitMode?.addEventListener("change", updatePixSplitPanel);
  pixSplitMembers?.addEventListener("change", (event) => { if (event.target.matches('[data-split-member]')) updatePixSplitPanel(); });
  pixSplitMembers?.addEventListener("input", (event) => { if (event.target.matches('[data-split-value]')) updatePixSplitSummary(); });
  monthlyReservationToggle.addEventListener("change", () => { if (eventSelect.value === "__new__" && selectedReservation) newEventTitle.value = defaultEventTitle(selectedReservation); updateMonthlyReservationPreview(); populateVoucherOptions(); updateReservationSubmitState(); });
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
  themeButton?.addEventListener("click", toggleMarketplaceTheme);
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
    const title = createsNewEvent ? defaultEventTitle(selectedReservation) : existingEvent.title;
    const selectedCancellationVoucher = cancellationVoucherByValue(voucherSelect.value);
    const selectedPromotion = promotionByValue(voucherSelect.value);
    if (selectedCancellationVoucher) {
      const validVoucher = ["active", "active_extended"].includes(selectedCancellationVoucher.status) && selectedCancellationVoucher.user === state.userProfile.name && selectedCancellationVoucher.venueId === selectedReservation.venue.id && currentReservationValue() >= Number(selectedCancellationVoucher.value) && (selectedCancellationVoucher.eligibleBookingMode !== "monthly" || isMonthlySelection());
      if (!validVoucher) {
        showToast(selectedCancellationVoucher?.eligibleBookingMode === "monthly" ? "Este voucher só pode ser utilizado em uma nova reserva mensalista de valor igual ou superior." : "O voucher não é válido para este parceiro ou valor de reserva.");
        populateVoucherOptions();
        return;
      }
    }
    if (selectedPromotion && !promotionEligibleForSelection(selectedPromotion)) {
      showToast("Este voucher promocional não é válido para o parceiro, modalidade, valor ou período desta reserva.");
      populateVoucherOptions();
      return;
    }
    const splitValidation = validatePixSplit();
    if (!splitValidation.valid) {
      showToast("Revise o rateio: selecione ao menos dois membros e faça a soma das cotas coincidir com o valor a pagar.");
      return;
    }
    const id=nextId("R-",state.reservations);
    const promoVoucher = selectedPromotion?.code || "";
    const selectedVoucher = selectedVoucherFinancials();
    const voucherAppliedValue = Number(selectedVoucher.amount || 0);
    const reservationValue = currentReservationValue();
    const monthly = isMonthlySelection();
    const occurrences = monthly ? monthlyOccurrencesForSelection(selectedReservation) : [{ date:selectedReservation.day.date, shortDate:selectedReservation.day.shortDate, weekday:selectedReservation.day.weekday, dayLabel:selectedReservation.day.dayLabel, time:selectedReservation.time, endTime:selectedReservation.endTime, space:normalizedSlotSpace(selectedReservation.slot), value:selectedReservation.value }];
    if (monthly && occurrences.length < 2) { showToast("Não há datas suficientes para formar a reserva mensalista neste mês."); return; }
    const paymentDue = Math.max(0, reservationValue - voucherAppliedValue);
    let eventId = existingEvent?.id || "";
    let eventPublicationStatus = "linked_existing";
    let pushStatus = "Não aplicável";
    if (createsNewEvent) {
      eventId = nextId("EV-", state.groupEvents);
      eventPublicationStatus = paymentDue === 0 && selectedVoucher.amount > 0 ? "standby_voucher" : "standby_payment";
      pushStatus = paymentDue === 0 && selectedVoucher.amount > 0 ? "Aguardando aplicação do voucher" : "Aguardando pagamento";
      state.groupEvents.unshift({
        id: eventId,
        groupId: group.id,
        title,
        date: selectedReservation.day.date,
        time: selectedReservation.time,
        endTime: selectedReservation.endTime,
        recurrence: monthly ? "weekly_month" : "single",
        occurrences,
        venue: selectedReservation.venue.name,
        statusKey: "standby_payment",
        status: paymentDue === 0 && selectedVoucher.amount > 0 ? "Aguardando aplicação do voucher" : "Aguardando pagamento",
        published: false,
        source: "reservation",
        sourceReservationId: id,
        publicationEndpoint: selectedVoucher.amount > 0 ? "waiting.voucher_or_complement" : "waiting.payment.confirmed",
        pushStatus: "Aguardando publicação"
      });
    }
    const fullyCovered = Boolean(selectedVoucher.amount > 0 && paymentDue === 0);
    const newReservation = {
      id,
      venueId:selectedReservation.venue.id,
      venue:selectedReservation.venue.name,
      space:normalizedSlotSpace(selectedReservation.slot),
      user:state.userProfile.name,
      date:selectedReservation.day.date,
      shortDate:selectedReservation.day.shortDate,
      time:selectedReservation.time,
      endTime:selectedReservation.endTime,
      value:reservationValue,
      bookingMode:monthly?"monthly":"single",
      monthly,
      occurrenceCount:occurrences.length,
      occurrences,
      regularUnitValue:Number(selectedReservation.value),
      monthlyPackageValue:monthly?reservationValue:0,
      statusKey: fullyCovered ? "confirmed" : "pending",
      status: fullyCovered ? "Confirmada com voucher" : selectedVoucher.amount > 0 ? "Reserva pendente — valor com desconto" : "Reserva pendente",
      endpoint: fullyCovered ? (selectedPromotion ? "promotion.redeemed" : "voucher.redeemed") : selectedVoucher.amount > 0 ? "payment.discounted.pending" : "reservation.created",
      paymentStatus: fullyCovered ? "Coberta por voucher" : selectedVoucher.amount > 0 ? "Pagamento do valor com desconto pendente" : "Pagamento pendente",
      paymentDue,
      paymentMethod: paymentDue > 0 ? selectedPaymentMethod() : "voucher",
      paymentMethodLabel: paymentDue > 0 ? paymentMethodLabel() : "Voucher integral",
      paymentProvider: paymentDue > 0 ? paymentProviderForSelection() : "TAMO_ON",
      pixSplit: paymentDue > 0 && pixSplitEnabled(),
      pixSplitMemberCount: paymentDue > 0 && pixSplitEnabled() ? splitValidation.shares.length : 0,
      voucherAppliedValue,
      cancellationVoucherId:selectedCancellationVoucher?.id || "",
      promotionalVoucherId:selectedPromotion?.id || "",
      voucher:selectedVoucher.code || promoVoucher,
      voucherType:selectedVoucher.kind,
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
      cancellationPolicyVersion:"monthly-package-agenda-v3",
      accountingRecognizedValue:0,
      fiscalObligationValue:0,
      accountingOriginMonth:selectedCancellationVoucher?.accountingOriginMonth || ""
    };
    state.reservations.unshift(newReservation);
    syncPartnerReservationFromUser(newReservation);
    const pixCollection = paymentDue > 0 && newReservation.paymentMethod === "pix_direct_partner" && pixSplitEnabled() ? createPixSplitCollection(newReservation, splitValidation.shares) : null;
    const paymentIntent = paymentDue > 0 && !pixCollection ? createPaymentIntentForReservation(newReservation, paymentDue) : null;
    if (pixCollection) {
      newReservation.endpoint = "bank_pix.split.charges_created";
      newReservation.paymentStatus = `Rateio Pix · 0 de ${pixCollection.memberCount} cotas pagas`;
    } else if (paymentIntent) {
      if (newReservation.paymentMethod === "credit_card_asaas") {
        newReservation.endpoint = "asaas.card.checkout.created";
        newReservation.paymentStatus = selectedVoucher.amount > 0 ? "Valor com desconto aguardando cartão Asaas" : "Aguardando cartão Asaas";
      } else if (paymentIntent.route === "pix_direct_partner_manual") {
        newReservation.endpoint = "bank_pix.manual.pending";
        newReservation.paymentStatus = "Pix direto · confirmação manual";
      } else {
        newReservation.endpoint = "bank_pix.charge.created";
        newReservation.paymentStatus = "Pix direto · aguardando webhook bancário";
      }
    }
    if (selectedCancellationVoucher) {
      if (fullyCovered) {
        Object.assign(selectedCancellationVoucher, { status:"used", usedAt:new Date().toLocaleString("pt-BR"), usedReservationId:id, consumedValue:selectedCancellationVoucher.value });
        state.accountingLedger.unshift({ id: nextId("LED-", state.accountingLedger), type:"voucher_redeemed", reservationId:id, voucherId:selectedCancellationVoucher.id, venueId:newReservation.venueId, venue:newReservation.venue, amount:selectedCancellationVoucher.value, fiscalAmount:0, accountingMonth:accountingMonth(), description:"Voucher consumido integralmente sem nova obrigação" });
        publishStandbyEventForReservation(newReservation, "event.publish_after_voucher");
        syncPartnerReservationFromUser(newReservation);
        ensureChatThread(newReservation);
      } else {
        Object.assign(selectedCancellationVoucher, { status:"reserved", reservedAt:new Date().toLocaleString("pt-BR"), reservedReservationId:id });
      }
    }
    if (selectedPromotion) {
      state.appliedVouchers = state.appliedVouchers.filter((code) => code !== selectedPromotion.code);
      selectedPromotion.usedCount = Number(selectedPromotion.usedCount || 0) + 1;
      selectedPromotion.lastUsedAt = new Date().toLocaleString("pt-BR");
      selectedPromotion.lastUsedReservationId = id;
      state.accountingLedger.unshift({ id: nextId("LED-", state.accountingLedger), type:"promotional_discount", reservationId:id, promotionId:selectedPromotion.id, venueId:newReservation.venueId, venue:newReservation.venue, amount:voucherAppliedValue, fiscalAmount:0, accountingMonth:accountingMonth(), description:`Desconto promocional ${selectedPromotion.code} aplicado à reserva` });
      if (fullyCovered) {
        publishStandbyEventForReservation(newReservation, "event.publish_after_promotion");
        syncPartnerReservationFromUser(newReservation);
        ensureChatThread(newReservation);
      }
    }
    saveState();reservationDialog.close();render();
    if (fullyCovered) showToast(`Reserva ${id} confirmada com voucher; evento publicado automaticamente.`);
    else if (pixCollection) showToast(`Reserva ${id} criada com rateio Pix para ${pixCollection.memberCount} membros.`);
    else if (selectedVoucher.amount > 0) showToast(`Reserva ${id} criada com desconto de ${money(voucherAppliedValue)}; falta pagar ${money(paymentDue)} por ${paymentMethodLabel(newReservation.paymentMethod)}.`);
    else showToast(createsNewEvent ? `Reserva ${id} criada; pagamento preparado por ${paymentMethodLabel(newReservation.paymentMethod)}.` : `Reserva ${id} vinculada ao evento ${title}; pagamento preparado.`);
  });

  chatForm?.addEventListener("submit", (event) => {
    if (event.submitter?.value === "cancel") return;
    event.preventDefault();
    sendChatMessage(chatInput.value);
  });

  chatDialog?.addEventListener("close", () => {
    selectedChatReservationId = null;
    chatInput.value = "";
  });

  applyMarketplaceTheme(storedMarketplaceTheme(), false);
  if("serviceWorker" in navigator && location.protocol!=="file:")navigator.serviceWorker.register("service-worker.js").catch(()=>{});
  render();
})();
