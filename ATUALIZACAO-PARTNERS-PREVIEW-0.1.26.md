# Tâmo On — Partners Preview 0.1.26

## Grade única da agenda do parceiro

- Eliminada a dependência visual da antiga lista paralela `partnerAgenda` para reservas e bloqueios operacionais.
- `venues.schedule` passa a ser a fonte de verdade das duas visões da aba Agenda.
- Agenda publicada e Reservas/Bloqueios exibem exatamente o mesmo dia e os mesmos períodos.
- A navegação de dias é gerada dinamicamente com todos os dias que possuem slots, sem limite fixo de uma semana.
- Trocar o dia em qualquer uma das duas áreas atualiza a outra imediatamente.
- Bloqueios são aplicados ao próprio slot; novos bloqueios podem também criar um slot quando não houver sobreposição.
- Horários bloqueados podem ser desbloqueados e voltam à disponibilidade na mesma grade.
- Reservas manuais passam a ocupar um slot existente ou criar o período na agenda quando não houver conflito.
- Reservas manuais e reservas originadas pelo usuário passam a ser consideradas na verificação de ocupação da agenda.
- Edição/exclusão dos horários atua diretamente na fonte compartilhada, refletindo no marketplace e na visão operacional.
- A Visão geral do parceiro também deixou de usar a lista paralela e passa a exibir os próximos slots da grade publicada.

Não há integração com banco de dados nesta Preview; a persistência continua em `localStorage`.
