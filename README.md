# Tâmo On — Partners Preview 0.1.9

Protótipo operacional isolado da futura área de parceiros, preparado para validação de navegação, dados cadastrais e fluxos funcionais sem banco de dados ou pagamentos reais.

## Áreas e submenus ativos

### Usuário

- Buscar quadras;
- Minhas reservas;
- Favoritos;
- Promoções;
- Perfil.

A busca geral permanece limitada ao nome da quadra ou à cidade e aparece imediatamente após o submenu. Futsal, society e campo são apresentados apenas como tipos identificados pelo parceiro. A compatibilidade esportiva será aplicada futuramente a partir do esporte escolhido no grupo.

Os cards da busca foram reduzidos e carregam a imagem de fachada indicada no campo `facadeImage` em uma área própria do cartão. Na Preview, as imagens são locais e demonstrativas; na implementação com banco, esse campo deverá receber a imagem enviada pelo parceiro durante o cadastro.

O botão **Ver espaço** abre a agenda criada pelo parceiro, com os dias em uma faixa horizontal rolável, horários, estados e valores específicos de cada faixa. A nota pública exibida é calculada a partir das avaliações dos usuários. A administração poderá moderar avaliações, mas não atribuir diretamente a nota pública.

### Parceiro

- Visão geral;
- Agenda;
- Reservas;
- Espaços;
- Clientes;
- Equipe;
- Financeiro;
- Cadastro.

O cadastro inclui dados empresariais, responsável, endereço, documentos, contrato, termos, LGPD, política de cancelamento, emissão fiscal, comissão, dados bancários e futura subconta.

### Administração

- Visão geral;
- Parceiros;
- Reservas;
- Usuários;
- Financeiro;
- Configurações.

A homologação dos parceiros permite cadastrar, editar, consultar o dossiê, aprovar, suspender e exportar dados fictícios.

## Persistência local

As alterações são gravadas no `localStorage` do navegador. O botão de restauração no cabeçalho recupera os dados fictícios iniciais. Não há sincronização com a linha Beta 1.0.

## Reserva, grupo e evento automatizado

Toda reserva feita pelo usuário deve estar vinculada a um grupo do qual ele participa. O formulário valida se sua função no grupo permite criar e alterar eventos. Grupos sem esse privilégio aparecem bloqueados.

O usuário pode escolher um evento já publicado do grupo ou criar um novo evento usando local, data, horário e demais dados da reserva. O novo evento permanece em `standby_payment` e não aparece para os demais membros antes da confirmação.

Na simulação local, `payment.confirmed` confirma a reserva, publica o evento por `event.publish_after_payment` e registra o disparo `push.group_members`. O cancelamento antes do pagamento encerra o evento em espera sem publicação ou push.

## Estados demonstrativos da reserva

- `reservation.created` → pendente;
- `payment.confirmed` → confirmada, com publicação automática do evento em espera;
- `reservation.cancelled` → cancelada no histórico, evento em espera encerrado e horário liberado novamente na agenda.

## Estrutura fiscal e financeira simulada

- o parceiro presta o serviço esportivo e emite o documento fiscal ao usuário;
- o Tâmo On atua como plataforma/intermediador e emite NFS-e da comissão ao parceiro;
- valores do parceiro e comissão aparecem segregados nos demonstrativos;
- split, subconta, conciliação, estorno e reembolso permanecem apenas modelados.

## Execução local

```bash
python -m http.server 8080
```

Abra `http://localhost:8080`.

## Segurança

A configuração mantém `realMoney: false`, `asaas.enabled: false` e `productionWrites: false`. Não inserir chaves de produção no frontend.


## Atualização 0.1.9

- cancelamento de reserva confirmada e paga pelo usuário;
- cancelamento de reserva paga pelo parceiro com justificativa obrigatória;
- aviso prévio das implicações da ação;
- simulação de estorno pelo endpoint `refund.confirmed`;
- liberação automática do horário;
- cancelamento do evento criado ou vinculado;
- registro de comunicação ao usuário, parceiro e membros do grupo;
- histórico local de cancelamento e estorno.
