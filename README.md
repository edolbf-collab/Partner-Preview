# Tâmo On — Partners Preview 0.1.2

Atualização incremental da linha isolada da futura área de quadras e canchas parceiras.

## Escopo entregue

- busca da área do usuário somente por nome da quadra ou cidade;
- remoção do filtro direto de esportes;
- futsal, society e campo mantidos como tipos cadastrados pelo parceiro;
- card de horários disponíveis substituído por uma área demonstrativa de Promoções;
- criação local de reserva com horário marcado em cor de pendência;
- mudança visual para confirmação ou cancelamento conforme endpoint demonstrativo;
- botões locais para simular `payment.confirmed` e `reservation.cancelled`;
- todos os controles da Preview 0.1.1 preservados.

## Regra futura de compatibilidade esportiva

O esporte será escolhido na criação de cada grupo. Ao iniciar a busca de espaço a partir desse grupo, o sistema deverá apresentar somente parceiros e quadras compatíveis com o esporte definido. A busca geral desta Preview permanece limitada a quadra ou cidade.

## Estados demonstrativos da reserva

- `reservation.created` → reserva pendente, em amarelo;
- `payment.confirmed` → reserva confirmada, em verde;
- `reservation.cancelled` → reserva cancelada, em vermelho.

As transições são locais e existem apenas para validar a interface.

## O que não está conectado

- Supabase;
- usuários reais;
- banco da linha Beta 1.0;
- Asaas Sandbox;
- webhooks reais;
- pagamentos reais.

## Execução local

```bash
python -m http.server 8080
```

Abra `http://localhost:8080`.

## Segurança

A configuração mantém `realMoney: false`, `asaas.enabled: false` e `productionWrites: false`. Nenhuma chave de API deve ser inserida no frontend.
