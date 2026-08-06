# Validação — Partners Preview 0.1.13

## Ambiente

- Chromium headless;
- viewport mobile de 390 × 844 px;
- estado local simulado em memória;
- JavaScript executado integralmente no navegador.

## Fluxo do usuário validado

1. abertura da Arena Central;
2. seleção do dia 13/08;
3. seleção do período 18:00 às 19:00;
4. ativação da modalidade mensalista;
5. geração das ocorrências de 13/08, 20/08 e 27/08;
6. valor mensalista exibido: R$ 440,00;
7. aplicação do voucher fictício de R$ 120,00;
8. diferença exibida no pagamento: R$ 320,00;
9. aceite da política;
10. criação da reserva pendente com complemento;
11. exibição da reserva em **Minhas reservas** com modalidade, número de datas e diferença.

## Fluxo do parceiro validado

1. acesso à aba Agenda;
2. abertura do formulário **Criar agenda**;
3. criação do período 18:30 às 20:00;
4. definição do valor avulso de R$ 155,00;
5. definição do pacote mensalista de R$ 570,00;
6. repetição nas semanas restantes do mês;
7. publicação de três datas na agenda;
8. exibição correta do período e do valor mensalista.

## Resultado técnico

- nenhuma exceção JavaScript registrada;
- largura do documento igual à largura disponível no mobile;
- sem transbordamento horizontal da página;
- sintaxe JavaScript validada com `node --check`;
- arquivos do cache verificados;
- pacote completo e incremental verificados após compactação.
