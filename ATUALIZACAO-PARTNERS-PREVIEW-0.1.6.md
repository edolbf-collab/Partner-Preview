# Partners Preview 0.1.6

Esta versão refina os três pontos da área do usuário: cards mobile, agenda do parceiro e Minhas reservas.

## Buscar quadras

- cards menores e com menos espaço vazio;
- nota posicionada ao lado do nome da quadra;
- botão **Ver espaço** novamente em tamanho compacto;
- foto enviada aplicada à Arena Central por elemento de imagem, tanto no card quanto no detalhe do espaço;
- imagem adicionada ao cache da Preview para evitar falha de carregamento.

## Agenda do parceiro

- removida a ação Abrir/Ocultar calendário da versão anterior;
- todos os dias com agenda cadastrada aparecem em uma faixa horizontal;
- a faixa pode ser rolada para a direita ou esquerda;
- o dia selecionado permanece destacado;
- ao fechar os detalhes de um horário ou voltar da reserva, a agenda é reaberta no mesmo parceiro e no mesmo dia.

## Minhas reservas

- indicadores transformados em uma faixa compacta;
- filtro por Todas, Pendentes, Confirmadas e Canceladas;
- reservas exibidas em cartões menores, com data, horário, valor, status e ações essenciais;
- cancelamentos permanecem no histórico, sem bloquear a agenda.

## Foco e navegação

- removido o foco programático do contêiner principal;
- os diálogos passam a receber foco no próprio contêiner, evitando contorno automático no botão X;
- mantidos os contornos de acessibilidade quando a navegação é feita pelo teclado.

Não houve integração com banco, Supabase, Asaas ou endpoints reais.
