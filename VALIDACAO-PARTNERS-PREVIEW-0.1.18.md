# Validação — Partners Preview 0.1.18

## Verificações

- sintaxe de `app.js`, `pix-bank-adapters.js`, `asaas-sandbox.js` e `payment-router.js`;
- scripts carregados antes do aplicativo;
- service worker atualizado com os novos módulos;
- seleção de Pix direto e cartão Asaas na reserva;
- cálculo de voucher/complemento preservado;
- intent de pagamento local criado e vinculado à reserva;
- simulação de confirmação atualiza intent e log de webhook;
- cadastro do parceiro exibe integração Pix e Asaas;
- financeiro de parceiro e administração separa Pix direto de cartão Asaas;
- nenhuma API key, certificado, token ou credencial real incluída.

## Resultado

Arquitetura da Preview preparada para conexão futura com APIs Pix bancárias e Asaas, mantendo o ambiente sem movimentação financeira real.
