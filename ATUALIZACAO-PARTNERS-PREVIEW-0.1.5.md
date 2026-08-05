# Partners Preview 0.1.5

Ajustes aplicados apenas na área do usuário, com foco em **Buscar quadras** e na experiência mobile.

## Alterações

- removido o botão duplicado de **Minhas reservas** da página de busca, mantendo apenas o item do submenu;
- cartões dos parceiros reduzidos para um formato mais compacto;
- divisão visual do card em duas metades: parte superior com foto, nome, cidade, bairro, distância e favorito; parte inferior com nota, tipo de campo e botão **Ver espaço**;
- aplicada a foto enviada pelo usuário como teste de fachada no primeiro parceiro (**Arena Central**);
- mantida a barra de pesquisa logo após o submenu;
- no detalhe do parceiro, adicionada a ação **Abrir calendário / Ocultar calendário** para selecionar todos os dias cadastrados;
- a seleção de horário agora preserva o contexto: ao fechar ou voltar, a agenda do parceiro é reaberta no mesmo dia;
- ao criar uma reserva pendente, o protótipo reabre a agenda do parceiro para facilitar a continuidade do teste.

## Observações

- a nota pública continua representando a média das avaliações dos usuários;
- cancelamentos continuam liberando novamente o horário na agenda, mantendo o histórico apenas em **Minhas reservas**;
- sem alterações de banco, Supabase, Asaas ou webhooks reais nesta versão.
