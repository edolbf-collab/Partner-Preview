# Partners Preview 0.1.8

## Reserva vinculada a grupo e evento

- toda nova reserva exige a seleção de um grupo pertencente ao usuário;
- grupos em que o usuário não possui privilégios de criação e alteração de eventos aparecem bloqueados;
- o usuário pode vincular a reserva a um evento já publicado do grupo;
- quando não utilizar um evento existente, pode criar outro com os dados da reserva;
- o novo evento é salvo em estado **Aguardando pagamento** e não é publicado imediatamente;
- a confirmação simulada pelo endpoint `payment.confirmed` publica o evento pelo fluxo `event.publish_after_payment`;
- após a publicação, é criado um registro local de push pelo endpoint demonstrativo `push.group_members`;
- o cancelamento da reserva impede a publicação do evento em espera e não dispara push.

## Dados fictícios incluídos

A Preview possui grupos com funções e permissões distintas, eventos publicados, um evento em espera e um histórico local de notificações para permitir a validação do fluxo.

## Limitações

A automação é simulada em `localStorage`. Não há chamada real ao Asaas, Supabase, banco de dados, Edge Function ou serviço de push.
