# Validação — Partners Preview 0.1.20

- Sintaxe JavaScript validada com `node --check`.
- Visão geral sem botões duplicados de agenda.
- Seleção individual e seleção total de horários.
- Exclusão em lote com proteção de reservas ativas.
- Propagação automática da sequência no mesmo dia e espaço.
- Preservação da duração dos horários subsequentes.
- Bloqueio da propagação em horário reservado, conflito independente e ao ultrapassar o fim do dia.
- Sincronização automática da duração de um horário mensalista nas datas equivalentes restantes do mesmo mês.
- Cenário funcional validado: 16:00–17:00 alterado para 16:00–17:30; datas semanais seguintes assumiram 16:00–17:30 e as grades posteriores foram deslocadas para 17:30–18:30 e 18:30–19:30.
- `monthlyOccurrencesForSelection` continua exigindo correspondência de início e término, garantindo que apenas datas com a duração sincronizada integrem o pacote mensalista.
- Nenhuma integração financeira foi alterada nesta revisão.
