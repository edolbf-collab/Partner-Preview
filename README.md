# Tâmo On — Partners Preview 0.1.11

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
- `reservation.cancelled` → cancelada antes do pagamento, com encerramento do evento em espera e liberação do horário;
- `reservation.cancelled_with_voucher` → reserva paga cancelada dentro da política, com emissão de voucher e liberação do horário;
- `voucher.redeemed` → nova reserva integralmente coberta e confirmada sem nova cobrança;
- `payment.complement.pending` → voucher reservado e complemento aguardando pagamento;
- `payment.complement.confirmed` → complemento pago, reserva confirmada e voucher consumido.

## Política de cancelamento por responsável

A política fica visível e exige aceite antes da criação da reserva e do pagamento. A consequência depende de quem realiza o cancelamento:

- **usuário, dentro do prazo:** gera voucher integral de uso único;
- **usuário, fora do prazo:** não gera reembolso nem voucher automático;
- **parceiro:** gera reembolso integral ao usuário, com taxas e custos suportados pelo parceiro;
- **Tâmo On:** gera reembolso integral ao usuário, com taxas e custos suportados pelo Tâmo On.

Em todos os casos, o horário é liberado, o evento criado ou vinculado é cancelado e os membros do grupo são comunicados. Cancelamentos fora do prazo podem ser submetidos a análise excepcional conjunta do Tâmo On e do parceiro, sem concessão automática.

## Voucher e disponibilidade compatível

O voucher do cancelamento feito pelo usuário dentro do prazo:

- tem uso único e prazo nominal de 30 dias;
- permanece vinculado ao parceiro da reserva original;
- pode ser usado em qualquer novo dia ou horário disponível, em reserva de valor igual ou superior;
- é abatido integralmente, sem saldo residual;
- exige pagamento apenas da diferença quando a nova reserva tiver valor maior.

O prazo não pode expirar apenas porque o parceiro oferece horários muito distantes do original. A Preview considera como disponibilidade compatível:

- o mesmo período do dia da reserva original;
- horário dentro de uma tolerância configurável de duas horas antes ou depois;
- no mínimo quatro datas distintas durante a validade nominal.

Assim, um voucher originado de uma reserva às 20h considera inicialmente a faixa das 18h às 22h, no período noturno. Horários somente pela manhã ou à tarde não contam para encerrar esse voucher. Quando o mínimo de datas compatíveis não é atingido, a validade é prorrogada automaticamente em blocos de sete dias. A tolerância, o mínimo de datas e o período de prorrogação podem ser alterados na Administração.

O pagamento original permanece reconhecido no exercício mensal em que ocorreu. A emissão e a utilização integral do voucher não geram nova obrigação fiscal ou contábil. Quando houver complemento, somente o valor adicional é reconhecido como nova operação.

O parceiro responde pelos vouchers vinculados às suas quadras. O encerramento é bloqueado enquanto houver vouchers ativos ou reservados. Na simulação administrativa, o parceiro pode ressarcir o Tâmo On para que o crédito seja realocado a outro espaço.

## Estrutura fiscal e financeira simulada

- o parceiro presta o serviço esportivo e emite o documento fiscal ao usuário;
- o Tâmo On atua como plataforma/intermediador e emite NFS-e da comissão ao parceiro;
- valores originais, complementos, comissão e passivo de vouchers aparecem segregados nos demonstrativos;
- split, subconta, conciliação, reembolso e absorção de taxas permanecem apenas simulados;
- não há transação, estorno, emissão fiscal ou lançamento contábil real nesta Preview.

## Execução local

```bash
python -m http.server 8080
```

Abra `http://localhost:8080`.

## Segurança

A configuração mantém `realMoney: false`, `asaas.enabled: false` e `productionWrites: false`. Não inserir chaves de produção no frontend.

## Atualização 0.1.11

- responsabilidade do cancelamento definida pelo autor da ação;
- voucher somente para cancelamento do usuário dentro do prazo;
- cancelamento do parceiro ou Tâmo On com reembolso integral e custos suportados pelo responsável;
- cancelamento do usuário fora do prazo sem crédito automático;
- solicitação de análise excepcional conjunta;
- validade de voucher condicionada à disponibilidade compatível;
- faixa inicial de ±2 horas no mesmo período do dia;
- mínimo inicial de quatro datas compatíveis;
- prorrogação automática de sete dias quando a oferta for insuficiente;
- controles administrativos para alterar essas regras.
