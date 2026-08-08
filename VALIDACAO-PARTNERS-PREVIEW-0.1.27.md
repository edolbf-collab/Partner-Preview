# Validação — Partners Preview 0.1.27

Validações executadas:

- `node --check app.js`: aprovado.
- Confirmada a remoção da seção textual **Reservas e bloqueios operacionais** do render da Agenda.
- Confirmada a existência de uma única faixa de navegação de dias na página Agenda.
- Confirmado que a tabela principal possui as ações Abrir, Editar, Bloquear/Desbloquear e Excluir.
- Confirmado que **Novo bloqueio** obtém suas opções de `blockableAvailabilityEntries(venue)`, que exclui slots bloqueados e slots com reserva ativa.
- Confirmado que o bloqueio altera diretamente o slot de `venues.schedule`, que também é a fonte utilizada pelo marketplace.
- Confirmado que o fluxo de bloqueio não cria novos dias nem novos slots.
- Confirmado que desbloqueio continua revertendo `slot.blocked` na mesma fonte de dados.

Não foram adicionadas chamadas de rede, credenciais ou operações financeiras reais.
