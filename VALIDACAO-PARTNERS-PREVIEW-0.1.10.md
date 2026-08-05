# Validação — Partners Preview 0.1.10

## Cenários verificados

- aceite obrigatório da política antes da criação da reserva e do pagamento;
- cancelamento elegível de reserva paga pelo usuário;
- cancelamento de reserva paga pelo parceiro com justificativa obrigatória;
- geração de voucher de uso único no valor integral pago;
- validade inicial de 30 dias;
- exibição do voucher na área de promoções e créditos;
- vinculação ao parceiro responsável pela reserva original;
- restrição a nova reserva de valor igual ou superior;
- consumo integral do voucher, sem saldo residual;
- reserva integralmente coberta, confirmada sem nova cobrança;
- reserva superior ao voucher, com complemento pendente;
- confirmação do complemento e reconhecimento contábil somente da diferença;
- liberação do voucher quando a reserva com complemento é cancelada antes do pagamento;
- manutenção do pagamento original no exercício mensal de origem;
- cancelamento do evento vinculado e liberação do horário da quadra;
- bloqueio de encerramento do parceiro com vouchers ativos ou reservados;
- ressarcimento e realocação simulada pela administração.

## Testes funcionais executados

1. Cancelamento da reserva paga `R-0008`, com emissão do voucher `CANCELA-0001` no valor de R$ 130,00.
2. Tentativa de encerramento do parceiro bloqueada enquanto o voucher estava ativo.
3. Utilização integral do voucher em uma reserva de R$ 130,00, sem nova cobrança e com lançamento fiscal igual a zero.
4. Utilização do voucher em uma reserva de R$ 150,00, com complemento de R$ 20,00 e reconhecimento somente desse valor após a confirmação simulada.
5. Publicação automática do evento após a confirmação da reserva e registro local do push ao grupo.
6. Verificação em tela mobile de 390 × 844 px, sem transbordamento horizontal.

## Integridade

- `app.js` validado com `node --check`;
- nenhum erro de execução observado nos cenários testados;
- arquivos de configuração, cache, versão e documentação atualizados para 0.1.10;
- nenhuma chamada externa realizada.

Resultado: fluxo local consistente para validação funcional, sem Asaas, Supabase, banco, emissão fiscal ou push reais.
