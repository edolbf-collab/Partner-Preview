# Validação — Partners Preview 0.1.9

## Testes automatizados realizados

### Cancelamento pelo usuário

- acesso à reserva confirmada e paga `R-0008`;
- abertura do aviso de cancelamento;
- preenchimento obrigatório do motivo e confirmação de ciência;
- alteração do status para cancelada e estornada;
- registro de `refund.confirmed`;
- cancelamento do evento vinculado;
- registro do push de cancelamento;
- liberação do horário de 07/08/2026 às 18:00 na agenda da Arena Central;
- exibição do motivo, estorno e horário liberado nos detalhes.

### Cancelamento pelo parceiro

- acesso à reserva paga `RP-103`;
- abertura do aviso específico do parceiro;
- validação da justificativa obrigatória;
- alteração do status para cancelada;
- pagamento alterado para estornado via Asaas;
- sincronização com a reserva do usuário e com o evento;
- exibição da justificativa e do estorno nos detalhes.

### Verificações técnicas

- sintaxe JavaScript validada com `node --check`;
- fluxos executados em navegador Chromium na largura de 390 × 844 px;
- ausência de erros JavaScript durante os dois testes.

## Resultado

Os dois fluxos funcionaram conforme esperado na simulação local.
