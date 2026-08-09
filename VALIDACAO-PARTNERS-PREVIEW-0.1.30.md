# Validação — Partners Preview 0.1.30

## Verificações executadas

- `node --check app.js`: aprovado.
- `version.json`: JSON válido.
- Cache do Service Worker atualizado para `tamo-on-partners-preview-0.1.30`.
- Título, cabeçalho e constante interna atualizados para 0.1.30.
- Presença da nova entrada `Quero ser parceiro` e do formulário `partnerInterestForm` confirmada.
- Presença da criação automática de pendência em `adminPartners` a partir de `partnerApplications` confirmada.
- Presença da validação de CNPJ já cadastrado confirmada.
- Presença da filtragem do marketplace por status administrativo confirmada.
- Presença dos comandos administrativos Aprovar, Em análise, Rejeitar, Suspender, Reativar, Encerramento e Excluir confirmada.

## Teste funcional isolado da sincronização

Foi executado um teste em Node com as funções reais extraídas de `app.js`.

Cenários aprovados:

1. Arena Central, com status Aprovado, é considerada publicável.
2. Cancha Horizonte, inicialmente Em análise, não é considerada publicável.
3. Alteração administrativa do nome e cidade da Arena Central atualiza `partnerProfile` e `venues`.
4. Suspensão da Arena Central bloqueia o Portal do parceiro e retira a publicação do marketplace.
5. Reativação restaura o acesso.
6. Aprovação da Cancha Horizonte torna sua estrutura existente publicável.
7. Aprovação de parceiro sem `venue` cria automaticamente estrutura pública com agenda vazia.
8. Exclusão de parceiro sem vouchers remove `adminPartners` e `venues` conectados.

Resultado do teste: `SYNC_TEST_OK`.

## Limites da Preview

- Não há autenticação real para identificar qual parceiro está conectado ao Portal.
- O Portal operacional continua representando o parceiro principal de demonstração (Arena Central); os demais parceiros são refletidos no marketplace e na Administração.
- Solicitações de parceria não são enviadas a backend, e-mail ou CRM.
- Não há Supabase, API bancária, Asaas produtivo ou transação real.
