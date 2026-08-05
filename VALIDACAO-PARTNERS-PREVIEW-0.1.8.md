# Validação — Partners Preview 0.1.8

## Cenários verificados

1. O formulário de reserva exige um grupo do usuário.
2. Grupo com função de membro e sem privilégio aparece desabilitado.
3. Administrador e organizador podem criar e alterar eventos.
4. A lista de eventos é limitada ao grupo selecionado.
5. A reserva pode ser vinculada a um evento já publicado.
6. A opção de novo evento cria um registro em estado `standby_payment`.
7. O novo evento não é publicado antes da confirmação do pagamento.
8. `payment.confirmed` confirma a reserva, publica o evento e cria o registro de push.
9. `reservation.cancelled` cancela o evento em espera e não cria push.
10. Os detalhes da reserva exibem grupo, função, evento, endpoints e estado do push.

## Resultado

- sintaxe JavaScript validada com `node --check`;
- fluxo funcional executado em navegador headless com viewport de 390 × 844 px;
- reserva de teste criada como `R-0008`;
- evento em espera publicado após a confirmação simulada;
- registro de push criado para 17 destinatários fictícios;
- largura final do documento: 390 px, sem transbordamento horizontal;
- nenhum erro JavaScript registrado durante o cenário.

A validação utiliza dados e endpoints demonstrativos. Não houve integração externa real.
