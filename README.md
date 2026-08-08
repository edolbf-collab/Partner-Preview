# Tâmo On — Partners Preview 0.1.24

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


## Partners Preview 0.1.24 — ajustes do balão de reserva

- voucher reposicionado para o bloco superior de resumo financeiro, imediatamente antes do valor total;
- rateio Pix inicia desmarcado em toda nova reserva e a lista de membros é removida da tela ao desmarcar;
- ao selecionar Mensalista, o resumo passa a listar todas as datas e respectivos horários incluídos no pacote;
- mantido o fluxo compacto da 0.1.23, sem reintroduzir textos extensos.
