# Tâmo On — Partners Preview 0.1.30

## Objetivo

Unificar o cadastro administrativo de parceiros com as áreas que consomem esses dados e criar um fluxo inicial de entrada de novos estabelecimentos diretamente pelo aplicativo.

## Administração → Parceiros como referência administrativa

A versão 0.1.30 elimina o comportamento em que o cadastro da Administração era apenas uma lista paralela. Alterações relevantes passam a ser propagadas para as estruturas conectadas da Preview.

### Sincronização implementada

- Nome fantasia e cidade alteram também o card público do estabelecimento.
- Tipos de espaço informados pela Administração atualizam os tipos publicados no marketplace.
- Para o parceiro atualmente representado pelo Portal da Preview, razão social, CNPJ, responsável, contatos, regime tributário, atividade, contrato, aceites, situação fiscal e comissão são sincronizados com `partnerProfile`.
- Alterações feitas pelo próprio parceiro em Cadastro, integrações de pagamento e Espaços atualizam os dados administrativos correspondentes.
- Documentos do parceiro atual são exibidos diretamente no dossiê administrativo, evitando uma cópia paralela.
- Mudança do nome do estabelecimento atualiza referências associadas ao mesmo `venueId` nas estruturas locais relacionadas.

## Status e publicação no marketplace

Somente parceiros com status **Aprovado** são publicados na busca do usuário.

- `Pendente` / `Em análise`: não publicado.
- `Aprovado`: publicado e operacional.
- `Suspenso`: retirado do marketplace e Portal do parceiro bloqueado.
- `Rejeitado`: não publicado.
- `Encerrado`: retirado do marketplace e Portal bloqueado.
- `Excluir`: remove o cadastro administrativo e sua estrutura pública, preservando registros históricos de reservas. A exclusão continua bloqueada se houver vouchers ativos vinculados ao parceiro.

Ao aprovar um parceiro que ainda não possui estrutura pública, a Preview cria automaticamente um `venue` básico com agenda vazia. O card pode aparecer no marketplace, mas informa que ainda não há horários publicados.

## Nova área “Quero ser parceiro”

Foi criada uma quarta entrada na Preview para interessados em parceria.

O formulário solicita somente dados iniciais:

- nome fantasia;
- razão social;
- CNPJ;
- cidade;
- quantidade de espaços;
- tipos de espaço;
- responsável;
- e-mail;
- telefone/WhatsApp;
- observação opcional;
- autorização para contato.

O envio gera simultaneamente:

1. um registro em `partnerApplications` para acompanhamento do interessado;
2. uma pendência em **Administração → Parceiros** com origem `Solicitação pelo app`.

O estabelecimento não é publicado para usuários antes da aprovação administrativa. O solicitante consegue acompanhar na própria tela os estados Pendente, Em análise, Aprovado, Rejeitado ou removido pela Administração.

A Preview também impede nova solicitação com CNPJ já cadastrado em situação ativa e respeita a configuração administrativa que habilita/desabilita novos cadastros.

## Premissa para produção

O formulário atual é apenas de **manifestação inicial de interesse**. A recomendação para o produto definitivo é manter duas etapas:

1. solicitação curta, para reduzir atrito de entrada;
2. homologação completa após análise preliminar, com documentos, contrato, dados fiscais, bancários, meios de pagamento e publicação dos espaços.

Nenhuma solicitação é transmitida externamente nesta versão. Toda a persistência permanece em `localStorage`.
