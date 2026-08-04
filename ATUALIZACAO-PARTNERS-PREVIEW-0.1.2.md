# Atualização — Partners Preview 0.1.2

## Área do usuário

- removido o seletor de modalidades da busca;
- busca limitada ao nome da quadra ou cidade;
- futsal, society e campo mantidos apenas como tipos informados pelo parceiro;
- removido o indicador numérico de horários próximos;
- criado o card **Promoções**, reservado para vouchers e ofertas futuras.

## Reserva e status visual

- horário passa para amarelo ao criar uma reserva pendente;
- endpoint demonstrativo `payment.confirmed` altera o horário para verde e confirma a reserva;
- endpoint demonstrativo `reservation.cancelled` altera o horário para vermelho e cancela a reserva;
- lista de reservas exibe o último endpoint aplicado;
- transições continuam locais, sem banco, webhook ou pagamento real.

## Arquivos principais alterados

- `index.html`;
- `app.js`;
- `styles.css`;
- `config.preview.js`;
- `service-worker.js`;
- `asaas-sandbox.js`;
- `version.json`;
- `README.md`;
- `docs/ESTADOS-DA-RESERVA.md`.
