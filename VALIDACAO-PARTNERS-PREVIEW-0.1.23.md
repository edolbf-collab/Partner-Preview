# Validação — Partners Preview 0.1.23

## Verificações executadas

- `app.js` validado com `node --check`;
- arquivos auxiliares de pagamentos continuam sintaticamente válidos;
- IDs utilizados pelo fluxo de reserva foram preservados para não romper a lógica existente;
- criação automática de evento continua vinculada ao grupo e à confirmação financeira;
- campo visual de edição do novo evento foi removido do fluxo;
- aceite continua obrigatório apenas para confirmar a reserva, não para fechar o modal;
- rateio Pix permanece disponível somente no trilho Pix direto ao parceiro;
- voucher e mensalista continuam recalculando o valor devido antes da confirmação.

## Pontos para teste manual

1. Abrir um horário avulso sem voucher e verificar o modal reduzido.
2. Escolher um voucher e confirmar que aparece somente o abatimento e o valor restante.
3. Selecionar `Criar novo evento automaticamente` e verificar que nenhum formulário extra de evento aparece.
4. Selecionar um evento existente e conferir a mudança do aviso pós-pagamento.
5. Escolher Pix e ativar o rateio entre membros.
6. Escolher cartão Asaas e verificar o resumo compacto.
7. Abrir `Ver regras de cancelamento e voucher` e conferir o conteúdo recolhido por padrão.
8. Fechar o modal por X ou Voltar sem validação obrigatória.
