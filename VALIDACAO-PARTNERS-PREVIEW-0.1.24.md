# Validação — Partners Preview 0.1.24

## Verificações realizadas

- [x] `app.js` validado por `node --check`.
- [x] Seletor de voucher permanece único no DOM e foi movido para o resumo financeiro.
- [x] Atualização do valor não recria o seletor de voucher nem remove seus listeners.
- [x] Rateio Pix é reiniciado desmarcado ao abrir uma nova reserva.
- [x] Ao desmarcar o rateio, configuração, membros e resumo são ocultados e limpos.
- [x] Mensalista marcado lista todas as ocorrências com data, início e término.
- [x] Mensalista desmarcado mantém apenas resumo compacto.
- [x] Versão atualizada em `index.html`, `app.js`, `config.preview.js`, `version.json` e cache do service worker.
- [x] Nenhuma credencial real ou operação financeira produtiva adicionada.
