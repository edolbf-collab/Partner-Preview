# Partners Preview 0.1.11

Esta versão reorganiza as regras de cancelamento conforme o responsável pela ação e adiciona critérios objetivos de disponibilidade compatível para a validade dos vouchers.

## Responsabilidade pelo cancelamento

### Cancelamento pelo usuário dentro do prazo

- mantém o prazo inicial configurado em 24 horas antes da reserva;
- gera voucher integral de uso único;
- não realiza reembolso automático;
- libera o horário e cancela o evento vinculado;
- comunica os membros do grupo.

### Cancelamento pelo usuário fora do prazo

- não gera voucher;
- não gera reembolso;
- mantém o pagamento original;
- permite solicitar análise excepcional conjunta do Tâmo On e do parceiro;
- a análise não concede crédito automaticamente.

### Cancelamento pelo parceiro

- exige justificativa;
- gera reembolso integral ao usuário;
- não gera voucher;
- atribui ao parceiro todas as taxas e custos do cancelamento e do reembolso;
- preserva o usuário, o Tâmo On e o Asaas de prejuízos decorrentes da ação.

### Cancelamento pelo Tâmo On

- aplica a mesma estrutura do cancelamento pelo parceiro;
- gera reembolso integral;
- atribui ao Tâmo On as taxas e custos da operação;
- não gera voucher.

## Disponibilidade compatível do voucher

O voucher continua podendo ser usado em qualquer novo dia ou horário disponível do mesmo parceiro, em reserva de valor igual ou superior. Contudo, a validade nominal de 30 dias somente pode encerrar normalmente quando houver oferta compatível com a reserva original.

A regra inicial da Preview considera:

- o mesmo período do dia;
- tolerância de duas horas antes ou depois do horário original;
- no mínimo quatro datas distintas com horários disponíveis;
- prorrogação automática de sete dias quando a oferta compatível for insuficiente.

Exemplo: uma reserva original às 20h gera faixa compatível das 18h às 22h, no período noturno. Horários apenas pela manhã ou à tarde não são contabilizados para a expiração desse voucher.

Esses parâmetros podem ser alterados em Administração → Configurações.

## Operações mantidas

- liberação do horário após o cancelamento;
- cancelamento do evento criado ou vinculado;
- comunicação simulada ao grupo;
- registro do responsável, motivo, modalidade, reembolso, voucher e taxas;
- bloqueio de encerramento do parceiro enquanto houver vouchers ativos ou reservados.

Não há integração real com Asaas, Supabase, banco de dados, emissão fiscal ou push nesta versão.
