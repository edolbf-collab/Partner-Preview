# Partners Preview 0.1.14

## Mensalistas

- cancelamento pelo usuário permitido somente até 24 horas antes da primeira ocorrência do pacote;
- depois desse marco, o botão informa que o cancelamento está encerrado e não abre a rotina;
- cancelamento elegível gera voucher integral de uso único;
- voucher originado de mensalista só pode ser usado em nova reserva mensalista de valor igual ou superior;
- cancelamentos provocados pelo parceiro ou pelo Tâmo On mantêm a regra de reembolso integral atribuída ao responsável.

## Agenda do parceiro

- incluída criação de agenda em lote por período de datas e dias da semana;
- modo **Grade automática do dia** divide uma faixa de funcionamento em horários de duração e intervalo configuráveis;
- modo **Um horário recorrente** repete um intervalo específico nas datas escolhidas;
- publicação pode gerar centenas de horários de uma vez, limitada a 600 por operação na Preview;
- nenhuma agenda é criada quando há sobreposição no mesmo espaço;
- edição também bloqueia conflitos;
- cada horário pode ser excluído, desde que não esteja vinculado a reserva ativa.

## Aceite dos termos

- o checkbox deixou de usar validação HTML obrigatória ao fechar a tela;
- o botão de confirmação permanece desabilitado enquanto os termos não forem aceitos;
- texto alterado para **Aceito os termos da reserva**, com detalhamento das políticas aplicáveis.

Nenhuma integração real com banco de dados, Asaas ou push foi adicionada.
