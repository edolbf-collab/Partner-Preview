# Partners Preview 0.1.20

Atualização concentrada na agenda do parceiro. Esta revisão complementa a própria 0.1.20, sem alteração de numeração.

## Alterações
- Controles de criar agenda, bloqueio e reserva manual removidos da Visão geral e mantidos somente na aba Agenda.
- Checkbox em cada horário publicado e opção **Selecionar todos**.
- Botão **Excluir selecionados** para exclusão em lote.
- Horários com reserva ativa permanecem protegidos e não podem ser selecionados/excluídos.
- Edição ganhou **Reorganizar horários subsequentes**.
- Ao aumentar ou reduzir o término de um período, os próximos horários do mesmo dia e espaço são reposicionados em sequência, preservando a duração de cada um.
- A propagação é bloqueada se precisar deslocar horário com reserva ativa, encontrar outra sequência independente ou ultrapassar 23:59.
- **Mensalistas com horários de duração especial:** quando um horário elegível para mensalista é alterado, a mesma duração é aplicada automaticamente às datas equivalentes restantes daquele mês.
- A grade subsequente de cada uma dessas datas também é reorganizada automaticamente, preservando a duração individual dos horários posteriores.
- A sincronização mensal é interrompida se alguma data equivalente tiver reserva ativa, bloqueio ou conflito que impeça o deslocamento seguro.

### Exemplo de sequência diária
14:00–15:00, 15:00–16:00, 16:00–17:00. Alterando o segundo para 15:00–16:30, o terceiro passa automaticamente para 16:30–17:30.

### Exemplo mensalista
Um horário das quintas-feiras originalmente criado como 16:00–17:00 é alterado para **16:00–17:30** e mantido elegível para mensalista. As demais quintas-feiras vinculáveis daquele mês passam igualmente para **16:00–17:30**. Em cada uma delas, a sequência 17:00–18:00 e 18:00–19:00 passa para 17:30–18:30 e 18:30–19:30.
