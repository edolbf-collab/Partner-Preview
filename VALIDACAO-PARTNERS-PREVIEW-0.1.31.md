# Validação — Partners Preview 0.1.31

## Verificações executadas

- `node --check app.js`: aprovado.
- `node --check asaas-sandbox.js`: aprovado.
- `node --check config.preview.js`: aprovado.
- `node --check payment-router.js`: aprovado.
- `node --check pix-bank-adapters.js`: aprovado.
- `node --check service-worker.js`: aprovado.
- HTML analisado estruturalmente: 75 IDs e nenhuma duplicidade.
- Título e cache atualizados para `0.1.31`.

## Fluxos revisados no código

### CNPJ e telefone
- máscara de CNPJ limitada a 14 dígitos;
- telefone limitado a 10 ou 11 dígitos com DDD;
- `setCustomValidity` impede salvamento de valores incompletos;
- validação aplicada no formulário de interesse e nos formulários dinâmicos do parceiro/administração.

### Chat
- confirmação financeira continua sendo pré-requisito;
- término calculado pelo `endTime` da reserva ou pelo horário final da grade;
- reserva mensalista usa a última ocorrência;
- depois do término, chat permanece acessível, mas o compositor fica desabilitado;
- verificação periódica de 30 segundos quando a conversa está aberta.

### Fotos
- estado do parceiro contém galeria e `favoritePhotoId`;
- migração local cria a galeria a partir da fachada já existente em versões anteriores;
- escolha da favorita atualiza `venue.facadeImage`;
- card do marketplace e resumo da reserva usam `venue.facadeImage`;
- upload limitado a 6 fotos e redimensionado para reduzir uso do localStorage.

### Administração > Reservas
- filtros podem ser combinados por parceiro, usuário, data e status;
- data da reserva em `dd/mm/aaaa` é normalizada para comparação com `input[type=date]`;
- comando de limpeza restaura todos os filtros.

### Vouchers
- exclusão bloqueada quando há reserva pendente vinculada ao voucher ou seleção ativa no checkout;
- voucher sem histórico pode ser removido;
- voucher usado é arquivado (`deleted`) e deixa de ser elegível no checkout;
- referências da reserva e do ledger permanecem preservadas.

## Limitações da Preview
- Não há upload real para storage remoto.
- Não há websocket/realtime real no chat.
- Não há relógio do servidor; a janela do chat usa o horário do dispositivo nesta Preview.
- Não houve alteração de banco de dados nesta versão.
