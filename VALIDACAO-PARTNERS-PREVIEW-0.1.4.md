# Validação — Tâmo On Partners Preview 0.1.4

Data da validação: 04/08/2026.

## Verificações funcionais

- Sintaxe de `app.js` validada pelo Node.js.
- Os 19 submenus das áreas usuário, parceiro e administração continuam navegáveis.
- A barra de busca aparece antes do cabeçalho da página em desktop e mobile.
- A pesquisa por cidade foi testada com “Colombo” e retornou somente o local correspondente.
- O botão **Promoções** abre o submenu correto.
- Os três cards compactos exibem apenas os dados previstos para a listagem.
- **Ver espaço** abre a agenda interna do parceiro.
- A troca de dia atualiza os horários e os valores exibidos.
- Uma reserva disponível pode ser criada como pendente.
- O cancelamento mantém a reserva no histórico com status cancelado.
- Após o cancelamento, o horário testado voltou à classe `available` e pôde ser selecionado novamente.
- Não foram detectados erros de JavaScript durante os testes automatizados.

## Verificações visuais

- Desktop validado em 1440 × 1000.
- Mobile validado em 390 × 844.
- Não foi detectado transbordamento horizontal da página no viewport mobile.
- Cards da busca foram reduzidos e a agenda foi retirada da tela principal.
- Imagens demonstrativas de fachada foram carregadas como plano de fundo.

## Arquivos e segurança

- Os três arquivos de fachada estão incluídos no cache do service worker.
- `realMoney`, Asaas e gravações de produção permanecem desativados.
- Não há alteração SQL nesta versão.
