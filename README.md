# Tâmo On — Partners Preview 0.1.27

Protótipo operacional isolado do marketplace de espaços esportivos do Tâmo On. Os dados são fictícios e persistidos apenas no navegador. Não há integração real com Supabase, Asaas, emissão fiscal, webhooks ou push.

## Áreas disponíveis

### Usuário

- Buscar quadras;
- Minhas reservas;
- Favoritos;
- Voucher;
- Conta Tâmo On.

A busca é feita por nome da quadra ou cidade. O detalhe do parceiro exibe a agenda publicada, horários flexíveis, valores avulsos e, quando oferecido pelo parceiro, o plano mensalista.

### Parceiro

- Visão geral;
- Agenda;
- Reservas;
- Espaços;
- Clientes;
- Equipe;
- Financeiro;
- Cadastro.

O parceiro pode publicar agenda com início e término livres, inclusive horários parciais ou superiores a uma hora, definir o preço avulso, o valor mensalista e repetir a disponibilidade nas demais semanas do mês.

### Administração

- Visão geral;
- Parceiros;
- Reservas;
- Usuários;
- Financeiro;
- Configurações.

## Fluxo compacto de reserva

A tela de confirmação do horário prioriza apenas as decisões necessárias para concluir a reserva: modalidade, grupo/evento, voucher opcional, forma de pagamento e aceite. As regras de cancelamento e voucher ficam recolhidas por padrão. Ao escolher criar um novo evento, o Marketplace usa automaticamente os dados da reserva; qualquer ajuste posterior do evento é feito na Comunidade, dentro do grupo.

## Pagamento com voucher

Quando um voucher de cancelamento é selecionado, a tela de pagamento mostra separadamente:

- valor total da reserva;
- valor integral do voucher utilizado;
- diferença a pagar pelo Asaas.

O voucher é consumido integralmente. Somente a diferença paga gera nova obrigação fiscal e contábil. A Preview inclui um voucher fictício de R$ 120,00 para permitir a validação do fluxo.

## Reserva mensalista

A modalidade mensalista somente aparece quando o parceiro a habilita para o horário. O usuário vê antes do pagamento:

- valor total do pacote mensal;
- dias e períodos incluídos;
- quantidade de ocorrências;
- eventual voucher aplicado;
- diferença a pagar.

A reserva mensalista ocupa o mesmo dia da semana e o mesmo período nas demais datas disponíveis do mês, a partir da data escolhida. O registro guarda todas as ocorrências e impede que os horários sejam tratados como livres enquanto a reserva estiver ativa.

O parceiro também pode registrar uma reserva manual como mensalista. Nesse caso, a Preview gera as ocorrências semanais até o fim do mês e mostra o pacote na área de reservas.

## Agenda flexível do parceiro

Em **Parceiro → Agenda**, o botão **Criar agenda** abre uma criação em lote. O parceiro escolhe:

- data inicial e final;
- dias da semana;
- espaço;
- faixa de abertura e fechamento;
- grade automática ou um horário recorrente;
- duração de cada horário e intervalo entre eles;
- valor avulso;
- disponibilidade e valor para mensalista.

A grade pode publicar todo o mês de uma vez. São aceitos períodos parciais ou superiores a uma hora, como 18:30 às 19:30 e 18:00 às 19:30. O sistema bloqueia sobreposições no mesmo espaço. Horários livres podem ser editados ou excluídos; horários com reserva ativa não podem ser excluídos.

## Reserva, grupo e evento

Toda reserva deve estar vinculada a um grupo pertencente ao usuário. O usuário precisa possuir privilégios para criar e alterar eventos. Quando não houver evento existente, a Preview cria um evento em espera e o publica após a confirmação simulada do pagamento ou do complemento.

## Cancelamento e voucher

- pacote mensalista: cancelamento pelo usuário somente até 24 horas antes da primeira ocorrência;
- após esse prazo, não é possível cancelar o pacote mensalista por iniciativa do usuário;
- voucher originado de mensalista: uso exclusivo em nova reserva mensalista de valor igual ou superior;
- cancelamento pelo usuário dentro do prazo: voucher integral;
- cancelamento pelo usuário fora do prazo: sem crédito automático;
- cancelamento pelo parceiro: reembolso integral e custos suportados pelo parceiro;
- cancelamento pelo Tâmo On: reembolso integral e custos suportados pelo Tâmo On.

A validade do voucher considera disponibilidade compatível com o período e a proximidade do horário original. Horários muito distantes não encerram automaticamente o crédito.

## Perfil centralizado

O marketplace reutiliza o perfil principal do Tâmo On. Nome e e-mail vêm da conta Google; telefone, cidade e preferências vêm do perfil central. As permissões são herdadas dos grupos.

## Execução local

```bash
python -m http.server 8080
```

Abra `http://localhost:8080`.

## Segurança

A configuração mantém `realMoney: false`, `asaas.enabled: false` e `productionWrites: false`. Não inserir chaves de produção no frontend.


## Atualização 0.1.17
- Tema claro opcional exclusivo do Marketplace/Partners Preview.
- Alternância disponível no cabeçalho para usuário, parceiro e administração.
- Preferência persistida no navegador sem alterar o tema do aplicativo principal Tâmo On.

## Atualização 0.1.18 — pagamentos multiprovedor

A Preview passa a separar os meios de pagamento por uma camada interna de roteamento:

- **Pix direto ao parceiro**: seleciona o adaptador do banco cadastrado no parceiro; o dinheiro não passa pelo Asaas;
- **Cartão de crédito · Asaas**: prepara checkout hospedado, `externalReference` da reserva, webhook e split;
- adaptadores Pix demonstrativos: Sicoob, Sicredi, Banco do Brasil e Inter;
- banco ainda não integrado utiliza fallback de confirmação manual;
- os detalhes da reserva registram meio, provedor, intent e endpoint lógico;
- parceiro e administração visualizam separadamente o volume de Pix direto e de cartão Asaas.

A Preview não contém credenciais, não chama APIs externas e não movimenta dinheiro real.


## Partners Preview 0.1.20

- Controles de agenda concentrados exclusivamente na aba **Agenda** do parceiro.
- Seleção múltipla da agenda publicada com exclusão em lote.
- Proteção automática de horários com reserva ativa.
- Reorganização encadeada de horários contíguos após alteração de término, preservando a duração dos períodos seguintes.


## Partners Preview 0.1.23 — chat da reserva

- chat entre usuário e parceiro liberado após confirmação do pagamento;
- um canal por reserva, acessível em **Minhas reservas** e **Reservas** do parceiro;
- histórico preservado após encerramento/cancelamento, em modo consulta;
- Preview usa persistência local; produção deverá usar backend autenticado e sincronização em tempo real.


## Partners Preview 0.1.27 — ajustes do balão de reserva

- voucher reposicionado para o bloco superior de resumo financeiro, imediatamente antes do valor total;
- rateio Pix inicia desmarcado em toda nova reserva e a lista de membros é removida da tela ao desmarcar;
- ao selecionar Mensalista, o resumo passa a listar todas as datas e respectivos horários incluídos no pacote;
- mantido o fluxo compacto da 0.1.23, sem reintroduzir textos extensos.

## Partners Preview 0.1.27 — vouchers funcionais e mensalista corrido

- Exibição mensalista em texto corrido, com data por extenso e horário de cada ocorrência.
- Vouchers promocionais com desconto real no checkout, inclusive para rateio Pix e cartão Asaas.
- Criação de vouchers pelo parceiro, limitada ao próprio espaço.
- Criação de vouchers pela administração, global ou por parceiro.
- Tipos de desconto: percentual ou valor fixo; valor mínimo, validade e modalidade configuráveis.


## Partners Preview 0.1.27 — grade única da agenda

A aba Agenda do parceiro foi consolidada sobre uma única fonte de dados. A agenda publicada no marketplace e a visão de reservas/bloqueios operacionais agora leem os mesmos slots, usam o mesmo dia selecionado e navegam por todos os dias criados. Bloqueios e reservas manuais são vinculados diretamente à grade publicada, e alterações de status/cancelamentos refletem automaticamente na disponibilidade.

## Partners Preview 0.1.28
Ações da agenda do parceiro compactadas em duas colunas no mobile, preservando todas as funções da grade operacional unificada.


## Partners Preview 0.1.29 — ações da agenda 2 × 2

- Ações dos horários em duas colunas também em desktop/tablet, e não apenas no mobile.
- Ordem visual: Abrir | Editar / Bloquear ou Desbloquear | Excluir.
- Removido o botão Novo bloqueio do cabeçalho para evitar redundância.

## Partners Preview 0.1.30 — parceiros sincronizados e solicitação pelo app

- Administração > Parceiros passa a ser a referência administrativa para nome, CNPJ, cidade, responsável, contatos, situação contratual, aceites, fiscal, comissão e status de homologação.
- Alterações administrativas do parceiro atual da Preview são refletidas no Portal do parceiro e nos dados públicos correspondentes do marketplace.
- Somente parceiros com status **Aprovado** são publicados na busca do usuário. Suspensão, encerramento, rejeição ou exclusão retiram o estabelecimento do marketplace.
- Aprovar um parceiro que ainda não possui `venue` cria sua estrutura pública básica com agenda vazia, pronta para ser preenchida depois pelo Portal do parceiro.
- Exclusão administrativa preserva reservas históricas, mas remove o estabelecimento das listas conectadas; parceiros com vouchers ativos continuam protegidos contra encerramento/exclusão.
- Nova entrada **Quero ser parceiro** permite que um interessado envie nome fantasia, razão social, CNPJ, cidade, número/tipo de espaços, responsável e contatos diretamente pelo app.
- A solicitação gera um registro em `partnerApplications` e uma pendência em Administração > Parceiros, sem publicar o estabelecimento antes da aprovação.
- O solicitante acompanha no próprio app os estados Pendente, Em análise, Aprovado, Rejeitado ou removido pela Administração.
- Dados continuam persistidos somente em `localStorage`; não há backend, autenticação real ou envio externo nesta Preview.


## Partners Preview 0.1.32 — cadastro, mídia, chat e filtros

- Máscaras obrigatórias de CNPJ e telefone nos principais fluxos cadastrais.
- Chat ativo da confirmação do pagamento até o término da reserva; após esse horário, histórico em modo leitura.
- Galeria de fotos no Cadastro do parceiro, com escolha da imagem principal usada no marketplace e no balão de reserva.
- Administração > Reservas com filtros combináveis por status, parceiro, usuário e data.


## Partners Preview 0.1.32 — dados, chat, fotos, filtros e vouchers

- Máscaras obrigatórias para CNPJ e telefone nos fluxos de parceria e cadastro.
- Chat ativo apenas entre a confirmação financeira e o fim do último horário da reserva; depois, histórico somente leitura.
- Galeria de fotos no cadastro do parceiro, com imagem favorita sincronizada com card e resumo da reserva.
- Filtros administrativos de reservas por parceiro, usuário, data e status.
- Exclusão segura de vouchers promocionais; itens em uso são protegidos e vouchers usados permanecem arquivados.

## Partners Preview 0.1.33 — contraste automático das fotos

- Cada foto carregada pelo parceiro recebe análise local de luminosidade via Canvas.
- A região inferior da imagem recebe peso maior porque concentra os textos do card e do cabeçalho público.
- Fundo classificado como escuro aplica textos claros e sombreado escuro; fundo claro aplica textos escuros e sombreado claro.
- A classificação da foto favorita é sincronizada com o card do Marketplace e o balão/cabeçalho de detalhes do espaço.
- Fotos antigas salvas sem metadados de contraste são analisadas automaticamente na abertura da Preview.
- Nenhuma imagem é enviada a serviço externo para esta análise.
