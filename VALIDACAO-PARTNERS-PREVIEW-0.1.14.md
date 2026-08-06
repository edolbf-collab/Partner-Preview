# Validação — Partners Preview 0.1.14

## Verificações

- sintaxe JavaScript validada;
- fechamento da reserva sem exigir marcação do checkbox;
- botão de confirmação habilitado somente após aceite dos termos e seleção válida de grupo/evento;
- cancelamento mensalista usa a primeira ocorrência como marco de 24 horas;
- pacote mensalista fora do prazo não abre rotina de cancelamento pelo usuário;
- voucher mensalista não aparece em reserva avulsa;
- voucher mensalista aparece em nova reserva mensalista de valor igual ou superior;
- geração de agenda mensal em lote;
- criação de grade automática com durações e intervalos configuráveis;
- bloqueio integral da operação quando existe qualquer sobreposição;
- edição de horário sem sobreposição;
- exclusão de horário livre;
- bloqueio da exclusão quando existe reserva ativa.

Resultado: versão apta para validação funcional local.
