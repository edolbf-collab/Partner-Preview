# Atualização — Partners Preview 0.1.3

Data: 04/08/2026

## Objetivo

Transformar a Preview em um ambiente de validação funcional, com todas as áreas internas navegáveis, dados fictícios editáveis e menor poluição visual.

## Alterações principais

- criação de menu interno próprio para usuário, parceiro e administração;
- reorganização das telas por tarefa, com apenas as informações essenciais em cada página;
- persistência das alterações no armazenamento local do navegador;
- restauração integral dos dados fictícios pelo cabeçalho ou pelas configurações;
- formulários locais para cadastro e edição;
- exportações CSV demonstrativas;
- modais de detalhes e confirmações.

## Área do usuário

- busca por quadra ou cidade;
- criação e acompanhamento de reservas;
- simulação de confirmação pelo endpoint `payment.confirmed`;
- simulação de cancelamento pelo endpoint `reservation.cancelled`;
- favoritos;
- vouchers e promoções;
- edição do perfil.

## Portal do parceiro

- visão geral operacional;
- agenda por dia, bloqueios e edição de compromissos;
- reservas manuais, aceite e recusa;
- cadastro e edição de espaços, com identificação de futsal, society ou campo;
- clientes;
- equipe e permissões;
- demonstrativo financeiro;
- cadastro empresarial, contratual, fiscal, bancário e documental.

## Administração

- fila de homologação;
- cadastro, edição, aprovação e suspensão de parceiros;
- dossiê cadastral do parceiro;
- reservas e alteração de status;
- usuários e bloqueio de acesso;
- conciliação financeira demonstrativa;
- configurações locais e regras comerciais.

## Integrações

Nenhuma integração real foi ativada. Permanecem desativados Supabase, Asaas, webhooks, emissão fiscal, split, subcontas e pagamentos reais.
