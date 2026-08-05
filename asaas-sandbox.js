(function () {
  "use strict";

  const config = window.TAMO_ON_PARTNERS_CONFIG;

  window.AsaasSandboxAdapter = Object.freeze({
    isEnabled() {
      return Boolean(config?.asaas?.enabled && config?.asaas?.environment === "sandbox");
    },

    async createCheckout() {
      throw new Error("Asaas Sandbox ainda não está habilitado na Partners Preview 0.1.11.");
    },

    async getPaymentStatus() {
      throw new Error("Consulta de pagamento será adicionada em uma versão posterior.");
    }
  });
})();
