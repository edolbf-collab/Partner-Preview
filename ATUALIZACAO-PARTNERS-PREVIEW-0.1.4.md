# Tâmo On — Partners Preview 0.1.4

## Escopo da alteração

Esta versão altera somente o fluxo **Área do usuário → Buscar quadras**, mantendo as demais áreas e submenus da Preview 0.1.3.

## Alterações realizadas

- A barra de pesquisa foi posicionada imediatamente após o submenu da área do usuário.
- A pesquisa continua limitada ao nome da quadra ou à cidade.
- O card de cada local foi reduzido e agora exibe somente:
  - nome;
  - cidade e bairro;
  - distância;
  - nota pública;
  - tipos de espaço disponíveis;
  - botão **Ver espaço**.
- A nota pública foi definida como média das avaliações dos usuários. A administração poderá moderar avaliações, mas não atribuir diretamente a nota pública.
- O campo local `facadeImage` passou a representar a imagem de fachada enviada pelo parceiro. A Preview usa três imagens demonstrativas empacotadas localmente.
- O botão **Ver espaço** abre uma tela com:
  - fachada;
  - localização;
  - tipos e estrutura;
  - dias cadastrados pelo parceiro;
  - horários por dia;
  - valor específico de cada horário;
  - estados disponível, pendente, confirmado e indisponível.
- Promoções deixaram de ocupar um card informativo na busca e passaram a ser acessadas por um botão compacto que abre o submenu **Promoções**.
- Uma reserva cancelada permanece no histórico de **Minhas reservas**, mas deixa de bloquear o horário na agenda.
- O horário liberado após cancelamento pode receber uma nova reserva.

## Persistência e integrações

Os dados continuam fictícios e persistidos somente em `localStorage`. Não há alteração de banco, Supabase, Asaas, webhook, emissão fiscal ou dinheiro real.
