# Tâmo On — Partners Preview 0.1.31

Data: 09/08/2026

## Alterações

### Máscaras e validação cadastral
- Campos de CNPJ recebem máscara `00.000.000/0000-00`.
- Campos de telefone/WhatsApp recebem máscara com DDD, aceitando telefone fixo ou celular.
- Solicitação `Quero ser parceiro`, cadastro administrativo do parceiro e cadastro do Portal do parceiro exigem telefone e CNPJ completos quando obrigatórios.
- A validação é aplicada antes do envio/salvamento do formulário, impedindo textos livres ou números incompletos nesses campos.

### Janela temporal do chat
- O chat é liberado após a confirmação financeira da reserva.
- Permanece com envio habilitado até o término do horário reservado.
- Para mensalistas, a janela fica ativa até o término da última ocorrência do pacote.
- Depois do horário final, o campo de mensagem e o botão Enviar são desabilitados e a conversa permanece disponível apenas como histórico.
- Enquanto o chat estiver aberto, a Preview reavalia a janela periodicamente para desabilitar o envio quando o horário terminar.

### Fotos do estabelecimento
- `Parceiro > Cadastro` ganhou a seção `Fotos do estabelecimento`.
- É possível carregar até 6 fotos JPEG, PNG ou WebP.
- As imagens são reduzidas localmente antes da persistência da Preview.
- O parceiro pode escolher a foto favorita.
- A foto favorita é sincronizada com a imagem principal do estabelecimento no marketplace.
- A mesma foto aparece no resumo superior do balão de reserva do usuário.
- É possível remover fotos, preservando ao menos uma imagem quando ela for a única foto favorita disponível.

### Filtros de reservas da Administração
Em `Administração > Reservas` foram adicionados filtros combináveis por:
- parceiro;
- usuário;
- data;
- status.

Também foi incluído o comando `Limpar filtros`.

### Exclusão segura de vouchers promocionais
- Parceiro pode excluir vouchers promocionais criados para o próprio estabelecimento.
- Administração pode excluir vouchers promocionais gerenciados na plataforma.
- Um voucher não pode ser excluído enquanto estiver vinculado a uma reserva pendente ou selecionado no checkout em andamento.
- Voucher nunca utilizado é removido da lista.
- Voucher já utilizado é retirado das ofertas e arquivado, preservando código, quantidade de utilizações, última utilização e referências existentes em reservas e lançamentos financeiros.
- Vouchers de cancelamento não foram incluídos nessa exclusão, pois representam obrigação financeira/crédito do usuário e seguem o fluxo próprio de cancelamento e ressarcimento.

## Persistência
A Preview continua usando apenas armazenamento local do navegador. Uploads de fotos, filtros e histórico de vouchers são demonstrações locais e ainda não utilizam Supabase, Storage ou backend de produção.
