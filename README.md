# Tâmo On — Partners Preview 0.1

Primeira build isolada da futura área de quadras e canchas parceiras.

## Escopo entregue

- protótipo responsivo da área do usuário;
- busca e filtros de espaços fictícios;
- horários e criação de reserva simulada;
- portal do parceiro com agenda, espaços e indicadores;
- painel administrativo com aprovação demonstrativa;
- feature flags de pagamento e produção bloqueadas;
- adaptador Asaas Sandbox criado, porém desativado;
- backup integral do planejamento na pasta `docs`.

## O que não está conectado

- Supabase;
- usuários reais;
- banco da linha Beta 1.0;
- Asaas Sandbox;
- webhooks;
- subcontas e split;
- pagamentos reais.

## Execução local

Use um servidor HTTP simples. Exemplo:

```bash
python -m http.server 8080
```

Abra `http://localhost:8080`.

## Segurança

A configuração mantém `realMoney: false`, `asaas.enabled: false` e `productionWrites: false`. Nenhuma chave de API deve ser inserida no frontend.

## Próximo ciclo sugerido — Preview 0.2

- detalhamento do parceiro e dos espaços;
- calendário mensal e regras de disponibilidade;
- estados completos da reserva;
- persistência em projeto Supabase separado;
- perfis e matriz de permissões;
- preparação das Edge Functions do Asaas Sandbox sem publicar na linha Beta.
