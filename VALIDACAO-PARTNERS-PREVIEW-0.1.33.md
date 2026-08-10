# Validação — Partners Preview 0.1.33

## Escopo

Validação da classificação automática de luminosidade das fotos e aplicação de contraste adaptativo no Marketplace.

## Verificações

- JavaScript validado com `node --check`.
- Foto enviada pelo parceiro é redimensionada e analisada antes de ser persistida.
- Metadados `tone` e `luminance` são armazenados junto à foto.
- Fotos de versões anteriores sem classificação entram em migração automática local.
- Foto favorita sincroniza `facadeTone` e `facadeLuminance` do estabelecimento.
- Card público recebe classe `photo-tone-light` ou `photo-tone-dark`.
- Cabeçalho de `Ver espaço` recebe a mesma classe da foto favorita.
- CSS possui tratamentos independentes para texto, degradê e botão de favorito em fundos claros e escuros.
- O botão Galeria mantém contraste próprio independentemente da fotografia.
- Não há chamadas externas para análise da imagem.

## Observação

A classificação é automática e baseada na luminosidade percebida da imagem, com peso maior na região inferior. Fotografias extremamente heterogêneas podem ter áreas claras e escuras simultaneamente; o degradê adaptativo foi mantido para preservar legibilidade nesses casos.
