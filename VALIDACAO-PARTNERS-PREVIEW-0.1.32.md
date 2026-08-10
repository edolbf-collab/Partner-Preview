# Validação — Partners Preview 0.1.32

- `app.js` validado com `node --check`.
- `service-worker.js` validado com `node --check`.
- Confirmada existência do `galleryDialog` e do botão `venue-gallery`.
- Confirmada filtragem da agenda pública por data atual/futura sem alterar `venue.schedule`.
- Confirmado uso de `partnerProfile.photos` para a galeria do parceiro conectado, com fallback para a fachada nos demais estabelecimentos.
- Confirmada formatação pública do endereço com bairro, cidade e CEP.
- Pacotes completo e incremental testados com `unzip -t`.
