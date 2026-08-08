# Tâmo On — Partners Preview 0.1.27

## Agenda do parceiro

- Removida a segunda tabela redundante de **Reservas e bloqueios operacionais**.
- A primeira tabela passou a ser a **Agenda publicada e operacional**, concentrando a leitura e as ações sobre a mesma fonte `venues.schedule`.
- Cada linha passa a oferecer, conforme o estado do horário: **Abrir**, **Editar**, **Bloquear**, **Desbloquear** e **Excluir**.
- A seleção múltipla e **Excluir selecionados** permanecem na mesma tabela.
- Reservas ativas continuam protegendo edição, bloqueio e exclusão do horário.

## Bloqueio

- O botão **Novo bloqueio** não aceita mais data/horário arbitrários.
- O formulário lista somente períodos já existentes na agenda e atualmente livres, com data, horário e espaço.
- Ao confirmar, o `slot` correspondente recebe `blocked=true`, `blockTitle` e `blockDetail`.
- Como a alteração ocorre diretamente em `venues.schedule`, o horário passa imediatamente a constar como **Bloqueado** na Agenda do parceiro e como **Indisponível** para o usuário no marketplace.
- Foi incluído também o botão **Bloquear** diretamente em cada linha disponível, reduzindo a chance de selecionar o período errado.

## Navegação

- A faixa horizontal de dias permanece como navegação única para todos os dias efetivamente criados na agenda.
- Não existe mais uma segunda seleção de data com estado paralelo.

## Banco de dados

Nenhuma alteração. A Preview permanece local, sem Supabase/Asaas/bancos em produção.
