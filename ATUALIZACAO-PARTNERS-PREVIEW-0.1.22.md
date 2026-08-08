# Partners Preview 0.1.22

## Chat do parceiro e mensagens não lidas

- Corrigida a aba **Parceiro → Reservas** para exibir o botão **Chat com usuário** nas reservas com pagamento confirmado.
- A listagem do parceiro passou a usar cards responsivos, evitando que o chat fique fora da área visível em telas menores.
- Adicionados contadores de mensagens não lidas para usuário e parceiro.
- O contador aparece no seletor de área, no submenu **Reservas**, no card da reserva e no botão do chat.
- Reservas com mensagens novas recebem destaque visual.
- Ao alternar para uma área que possui mensagens pendentes, a Preview exibe um aviso.
- Ao abrir a conversa, as mensagens daquele lado são marcadas como lidas.
- Ao enviar uma nova mensagem, o contador do destinatário é incrementado imediatamente.
- O histórico continua associado à reserva e permanece disponível após eventual encerramento, em modo de consulta.

A troca de mensagens permanece simulada em `localStorage`. O backend futuro deverá substituir os contadores locais por estado persistido, Realtime/WebSocket e push.
