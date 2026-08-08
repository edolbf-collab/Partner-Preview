# Validação — Partners Preview 0.1.25

## Cenários cobertos

- Voucher percentual reduz o valor efetivamente devido.
- Voucher de valor fixo reduz o valor efetivamente devido sem produzir saldo negativo.
- Voucher incompatível com parceiro, modalidade, valor mínimo ou validade não é oferecido no checkout.
- Saldo após voucher é utilizado pelo rateio Pix.
- Saldo após voucher é utilizado na criação da intent de cartão Asaas.
- Voucher promocional integral pode confirmar uma reserva sem criar intent de pagamento.
- Voucher de cancelamento mantém sua regra própria de crédito de uso único.
- Parceiro só cria voucher para seu próprio espaço.
- Administração pode criar voucher global ou específico.
- Mensalista apresenta todas as ocorrências em uma única descrição textual.

## Verificações técnicas

- `node --check app.js`: obrigatório.
- `node --check payment-router.js`: obrigatório.
- `node --check pix-bank-adapters.js`: obrigatório.
- `node --check asaas-sandbox.js`: obrigatório.
- Nenhuma credencial ou chamada financeira produtiva foi adicionada.
