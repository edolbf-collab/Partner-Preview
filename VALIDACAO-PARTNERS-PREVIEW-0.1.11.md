# Validação — Partners Preview 0.1.11

## Verificações realizadas

- validação de sintaxe do JavaScript com `node --check`;
- cancelamento pelo usuário dentro do prazo com geração de voucher;
- confirmação de voucher originado às 20h com faixa compatível das 18h às 22h;
- contagem de datas compatíveis e mínimo configurado de quatro datas;
- cancelamento pelo parceiro com reembolso integral e responsabilidade pelas taxas;
- cancelamento pelo Tâmo On com reembolso integral e responsabilidade pelas taxas;
- cancelamento do usuário fora do prazo sem voucher ou reembolso;
- criação de solicitação de análise excepcional conjunta;
- manutenção da liberação do horário e cancelamento do evento;
- ausência de geração de voucher nos cancelamentos do parceiro e do Tâmo On;
- validação mobile em 390 × 844 px, sem transbordamento horizontal;
- ausência de erros JavaScript nos fluxos testados.

## Resultados dos testes locais

- voucher de teste: horário original 20:00, período noturno, faixa 18:00–22:00, sete datas compatíveis e estado ativo;
- cancelamento pelo parceiro: reembolso integral de R$ 130,00, responsável pelas taxas identificado como parceiro e nenhum voucher gerado;
- cancelamento pelo Tâmo On: modal de reembolso integral e aceite específico exibidos corretamente;
- cancelamento fora do prazo: pagamento mantido, voucher vazio, reembolso igual a zero e análise excepcional registrada como pendente.

## Limitações

Todos os efeitos são armazenados apenas no navegador. Reembolso, cobrança, taxas, comunicação e análise administrativa são simulações locais.
