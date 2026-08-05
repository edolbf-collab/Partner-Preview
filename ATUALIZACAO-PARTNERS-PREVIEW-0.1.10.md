# Partners Preview 0.1.10

Implementação da política de vouchers gerados por cancelamento de reservas pagas.

## Regras implementadas

- cancelamento pelo usuário dentro do prazo configurado, inicialmente 24 horas, gera voucher no valor integral da reserva;
- cancelamento pelo parceiro de uma reserva paga também gera voucher e exige justificativa;
- voucher válido por 30 dias, com prazo configurável;
- uso único e integral;
- vinculação ao parceiro que recebeu a reserva original;
- utilização somente em nova reserva de valor igual ou superior;
- pagamento obrigatório apenas da diferença quando a nova reserva for mais cara;
- reserva totalmente coberta pelo voucher é confirmada sem nova cobrança e pode publicar automaticamente o evento;
- reserva com complemento permanece pendente até a confirmação simulada do pagamento;
- cancelamento de reserva pendente libera novamente o voucher reservado;
- aceite obrigatório e visível antes da criação da reserva e do pagamento;
- horário e evento são liberados/cancelados no cancelamento da reserva paga;
- histórico registra origem, motivo, voucher e comunicações.

## Contabilidade simulada

- o pagamento original permanece reconhecido no mês em que ocorreu;
- a emissão e o uso integral do voucher não geram novo valor fiscal ou contábil;
- apenas eventual complemento é reconhecido como nova obrigação;
- parceiro mantém responsabilidade pelo saldo dos vouchers ativos;
- encerramento do parceiro é bloqueado enquanto houver vouchers pendentes;
- a administração pode simular ressarcimento ao Tâmo On e realocação do voucher para outra quadra.

Não há integração real com Asaas, banco de dados, emissão fiscal ou push nesta Preview.
