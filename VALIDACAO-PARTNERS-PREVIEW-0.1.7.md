# Validação — Partners Preview 0.1.7

## Verificações realizadas

- validação de sintaxe do JavaScript;
- limite do modal calculado pela largura real da viewport móvel;
- foto da fachada restrita ao próprio contêiner;
- blocos internos configurados com largura máxima de 100%;
- horários e valores mantidos dentro da tela;
- rolagem horizontal preservada somente na faixa de dias;
- ausência de rolagem horizontal no restante do modal;
- manutenção do dia selecionado e do fluxo de reserva já implementado.

## Medição em viewport móvel

Teste executado em viewport de **390 × 844 px**:

- documento: 390 px de largura, sem rolagem horizontal;
- modal: 372 px de largura e 372 px de conteúdo total;
- corpo interno: 344 px de largura e 344 px de conteúdo total;
- horários: 344 px de largura e 344 px de conteúdo total;
- faixa de dias: 344 px visíveis e 588 px roláveis horizontalmente.

## Resultado

O detalhe da agenda permanece enquadrado na tela do celular. Apenas a linha de dias pode ser deslocada lateralmente.
