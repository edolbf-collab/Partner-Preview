# Validação — Partners Preview 0.1.26

## Verificações realizadas

- Sintaxe JavaScript validada com `node --check app.js`.
- A antiga lista operacional `state.partnerAgenda` deixou de ser usada na renderização da Agenda e da Visão geral.
- Agenda publicada e visão operacional usam `publicAvailabilityEntries(venue)` sobre a mesma fonte `venue.schedule`.
- Navegação de dias usa `partnerScheduleDays()` e, portanto, inclui todos os dias que possuam horários criados, sem lista fixa de uma semana.
- O dia selecionado é compartilhado pelas duas áreas por `state.ui.partnerAgendaDate`.
- A seleção múltipla atua apenas sobre o dia visível e é limpa ao trocar de data.
- `findReservationForSlot()` passou a considerar tanto reservas originadas pelo usuário quanto reservas manuais do parceiro.
- Horários com reserva ativa ficam protegidos contra edição e exclusão da grade.
- Bloqueios são gravados diretamente no slot (`blocked`, `blockTitle` e `blockDetail`) e podem ser desbloqueados na própria grade.
- Reservas manuais validam bloqueios, ocupação e sobreposição; quando necessário, criam o slot na mesma agenda do marketplace.
- A Visão geral do parceiro também deriva os próximos horários da grade publicada.

## Testes estruturais executados

Foi executado um teste em Node/VM com DOM simulado sobre o próprio `app.js`:

- 10 dias da agenda inicial foram encontrados e disponibilizados na navegação dinâmica;
- para o dia selecionado, a quantidade de linhas em “Agenda publicada” e “Reservas e bloqueios operacionais” foi exatamente a mesma;
- uma reserva manual fictícia inserida em `partnerReservations` passou a ser identificada pelo resolvedor da grade como `confirmed`;
- ao simular um bloqueio em 27/08, título e observação do bloqueio apareceram simultaneamente nas duas visões da agenda.

## Resultado

As duas áreas da Agenda do parceiro passaram a compartilhar a mesma fonte de dados e o mesmo seletor de data. Alterações de disponibilidade, bloqueios, reservas e cancelamentos não dependem mais de uma agenda operacional paralela.
