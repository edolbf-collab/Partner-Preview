window.TAMO_ON_PARTNERS_CONFIG = Object.freeze({
  appName: "Tâmo On Partners Preview",
  version: "0.1.3",
  environment: "partners_preview",
  realMoney: false,
  asaas: {
    enabled: false,
    environment: "sandbox",
    baseUrl: "https://api-sandbox.asaas.com/v3",
    checkoutMode: "hosted"
  },
  features: {
    venueDiscovery: true,
    mockReservations: true,
    partnerPortal: true,
    adminPortal: true,
    localPersistence: true,
    editableMockData: true,
    fullSubmenus: true,
    asaasCheckout: false,
    split: false,
    productionWrites: false
  }
});
