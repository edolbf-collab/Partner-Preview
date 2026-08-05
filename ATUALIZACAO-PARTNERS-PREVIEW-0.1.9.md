# Partners Preview 0.1.9

Esta versão adiciona os fluxos de cancelamento de reservas já confirmadas e pagas.

## Área do usuário

- reservas confirmadas exibem o botão **Cancelar e solicitar estorno**;
- antes da confirmação, um aviso informa sobre estorno, liberação do horário, cancelamento do evento e comunicações;
- o usuário deve informar o motivo e confirmar ciência das consequências;
- o fluxo simula `user.reservation.cancelled_after_payment` e `refund.confirmed`;
- o horário volta a ficar disponível;
- o evento criado ou vinculado é cancelado;
- o parceiro e os membros do grupo recebem comunicação simulada;
- os dados ficam disponíveis nos detalhes da reserva.

## Portal do parceiro

- reservas confirmadas e pagas via Asaas exibem **Cancelar reserva paga**;
- o parceiro recebe um aviso próprio sobre os efeitos operacionais e financeiros;
- a justificativa ao usuário é obrigatória;
- o fluxo simula o estorno, libera o horário, cancela o evento e registra as comunicações;
- o motivo e o estorno ficam registrados nos detalhes da reserva.

## Limites da Preview

As operações são locais. Não há estorno real, chamada ao Asaas, gravação no Supabase, webhook ou envio de push nesta versão.
