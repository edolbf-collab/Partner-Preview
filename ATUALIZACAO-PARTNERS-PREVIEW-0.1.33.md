# Partners Preview 0.1.33

## Contraste automático das fotos do parceiro

A Preview passa a analisar automaticamente a luminosidade das fotos carregadas em **Parceiro → Cadastro → Fotos do estabelecimento**.

Para evitar que uma média geral da imagem prejudique a leitura, o algoritmo dá peso maior à parte inferior da foto, região onde aparecem o nome, localização e endereço nos componentes públicos.

A classificação resultante é armazenada junto à foto como **fundo claro** ou **fundo escuro**:

- fundo escuro: textos públicos claros e degradê escuro;
- fundo claro: textos públicos escuros e degradê claro.

O comportamento é aplicado ao **card do estabelecimento no Marketplace** e ao **cabeçalho do balão Ver espaço**, que contém foto, avaliação, endereço e botão Galeria.

Ao selecionar outra foto como favorita, o contraste correspondente é propagado imediatamente para o estabelecimento. Fotos existentes de versões anteriores que ainda não possuam essa informação são analisadas automaticamente ao carregar a aplicação.

A análise ocorre inteiramente no navegador usando Canvas e não depende de serviço externo.
