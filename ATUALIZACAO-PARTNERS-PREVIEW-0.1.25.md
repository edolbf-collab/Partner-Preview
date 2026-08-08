# Tâmo On — Partners Preview 0.1.25

## Alterações

1. **Mensalista**
   - A lista de ocorrências deixou de usar pequenos balões individuais.
   - Quando a opção Mensalista está marcada, todas as datas e horários são apresentados em texto corrido e por extenso.

2. **Correção dos vouchers promocionais**
   - Os vouchers promocionais agora possuem regra financeira real.
   - Desconto percentual e desconto fixo são calculados sobre o valor da reserva.
   - O valor descontado reduz efetivamente o saldo a pagar.
   - Rateio Pix e cartão Asaas trabalham sobre o saldo já descontado.
   - Vouchers pressionados como “Aplicar” na área do usuário são pré-selecionados na próxima reserva quando elegíveis.

3. **Voucher do parceiro**
   - Nova aba `Vouchers` no Portal do parceiro.
   - O parceiro pode criar vouchers válidos exclusivamente no próprio estabelecimento.
   - Campos: campanha, código, tipo e valor de desconto, reserva mínima, modalidade e validade.
   - Pode ativar e desativar vouchers criados.

4. **Voucher da administração**
   - Nova aba `Vouchers` na Administração.
   - Pode criar voucher global ou vinculado a um parceiro específico.
   - Mesmas regras financeiras usadas no checkout do usuário.

## Observação

A Preview continua sem backend e sem movimentação financeira real. Os vouchers são persistidos no armazenamento local para validação do fluxo.
