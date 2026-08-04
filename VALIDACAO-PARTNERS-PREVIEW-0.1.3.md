# Validação — Partners Preview 0.1.3

Data: 04/08/2026

## Verificações executadas

- sintaxe JavaScript validada com `node --check`;
- carregamento do HTML, CSS e JavaScript em servidor HTTP local;
- teste automatizado de renderização dos 19 submenus das três áreas;
- abertura de formulários, detalhes e confirmações;
- criação e edição local de dados;
- persistência em `localStorage`;
- restauração dos dados iniciais;
- exportação CSV;
- ausência de chamadas ao Supabase ou ao Asaas;
- ausência de chaves de API no frontend;
- integridade do pacote completo;
- aplicação do pacote incremental sobre a base 0.1.2, com correspondência dos arquivos alterados.

## Resultado esperado

A Preview deve funcionar como ambiente local de homologação. Alterações realizadas em uma sessão do navegador permanecem após recarregar a página até o usuário restaurar os dados fictícios ou limpar o armazenamento local.

## Restrições mantidas

- sem banco de dados;
- sem autenticação real;
- sem pagamento real;
- sem emissão fiscal;
- sem webhook;
- sem escrita na linha Beta 1.0.
