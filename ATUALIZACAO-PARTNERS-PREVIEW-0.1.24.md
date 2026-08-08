# Tâmo On — Partners Preview 0.1.24

## Ajustes no balão de reserva

Esta versão reorganiza elementos do fluxo de reserva sem alterar as regras financeiras já definidas.

### Voucher no resumo financeiro
- A escolha de voucher foi movida para o bloco superior da reserva.
- O seletor aparece antes do valor total.
- Quando houver voucher de cancelamento aplicável, o resumo mostra o abatimento e o valor restante.

### Rateio Pix
- O checkbox **Ratear entre membros** inicia desmarcado em cada nova reserva.
- Os nomes dos participantes só aparecem enquanto o rateio estiver ativado.
- Ao desmarcar, lista, valores e resumo das cotas são imediatamente limpos da interface.
- Ao marcar novamente, a configuração é reconstruída a partir dos membros do grupo selecionado.

### Mensalista
- Enquanto desmarcado, permanece apenas o resumo da quantidade de datas disponíveis.
- Quando marcado, o pacote mostra todas as ocorrências que serão reservadas.
- Cada ocorrência informa a data e o intervalo completo de horário.
- A regra de duração idêntica entre as ocorrências mensalistas permanece inalterada.

### Banco de dados
Nenhuma alteração de banco nesta versão. A Preview continua local e sem integração produtiva.
