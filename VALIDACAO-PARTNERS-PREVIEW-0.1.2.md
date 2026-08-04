# Validação — Partners Preview 0.1.2

## Resultado

A versão foi validada em renderização desktop e móvel, com execução automatizada dos fluxos principais e sem erros de JavaScript no console.

## Cenários verificados

- título e identificação da versão 0.1.2;
- ausência do filtro de modalidades na área do usuário;
- busca com o texto “Society” sem retornar resultados por modalidade;
- busca por cidade retornando somente os espaços correspondentes;
- busca pelo nome da quadra retornando o espaço correspondente;
- presença do card **Promoções** no lugar do contador de horários;
- horário da reserva inicial exibido em amarelo como pendente;
- criação de nova reserva com identificador sequencial e estado `reservation.created`;
- aplicação de `payment.confirmed`, com status confirmado e horário verde;
- aplicação de `reservation.cancelled`, com status cancelado e horário vermelho;
- composição da lista de reservas em tela larga;
- responsividade da área do usuário em viewport móvel.

## Isolamento confirmado

- nenhuma conexão com Supabase;
- nenhuma chamada real ao Asaas;
- nenhum webhook publicado;
- nenhum pagamento real;
- `realMoney: false`;
- `asaas.enabled: false`;
- `productionWrites: false`.
