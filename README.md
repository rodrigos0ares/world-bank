# World Bank Client

### Passos para iniciar os containers.

 - Baixe o código utilizando o seguinte comando: ```git clone https://github.com/rodrigos0ares/world-bank.git```
 - ``` cd world-bank/bff && ./mvnw package```
 - Volte para a pasta raiz e execute o docker compose``` cd .. && docker-compose build && docker-compose up```
 - Abra o endereço http://localhost/


### Endereço do Swagger
 - http://localhost:8080/q/swagger-ui/#/

### User Story

**Como** um usuário

**Eu** gostaria de consultar o percentual de pobreza de cada país

**Para** saber qual país com a maior quantidade de pessoas em situação de extrema pobreza no mundo, vivendo com até $ 1,90/dia (dólar).

Critérios de aceitação

    Eu quero ter opções de consultar por nome do país.
    Eu quero visualizar o resultado em uma tabela.
    Eu quero o resultado ordenado por ano.
    Eu que a tabela tenha paginação.

