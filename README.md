# Tâmo On — Partners Preview 0.1.7

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

## Estados demonstrativos da reserva

- `reservation.created` → pendente;
- `payment.confirmed` → confirmada;
- `reservation.cancelled` → cancelada no histórico e horário liberado novamente na agenda.

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
