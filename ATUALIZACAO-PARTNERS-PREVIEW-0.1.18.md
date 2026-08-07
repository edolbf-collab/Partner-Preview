# Partners Preview 0.1.18

## Pagamentos multiprovedor

Foi criada uma camada de roteamento para permitir que uma reserva utilize meios de pagamento diferentes sem acoplar o fluxo do marketplace a um único provedor.

### Pix direto ao parceiro

- adaptadores preparados para Sicoob, Sicredi, Banco do Brasil e Inter;
- fallback manual para instituições ainda não integradas;
- criação de intent Pix normalizado com `txid`, valor, reserva, parceiro e provedor;
- estrutura de webhook bancário normalizada;
- pagamento destinado diretamente à conta cadastrada pelo parceiro;
- nenhuma passagem obrigatória pelo Asaas para o Pix direto.

### Cartão de crédito via Asaas

- opção disponível na tela de reserva;
- checkout hospedado como estratégia preparada;
- `externalReference` vinculado à reserva;
- payload de split preparado quando houver wallet do parceiro;
- normalização de webhook Asaas;
- dados de cartão não são armazenados no frontend.

### Interface

- usuário escolhe entre Pix direto e cartão Asaas;
- valor de eventual complemento de voucher respeita o meio selecionado;
- detalhes da reserva mostram meio, provedor e intent;
- parceiro visualiza status das integrações financeira/bancária;
- administração visualiza adaptadores e volumes separados por trilho financeiro.

## Segurança

A Preview mantém `realMoney=false`, chamadas externas desativadas e nenhuma credencial no pacote.
