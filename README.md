## Warren API Template

Esse repositório foi baseado no template api-ts, para mais informações sobre o template, basta acesssar:

https://github.com/warrenbrasil/api-ts-template

# :rocket: Accelerate Tribe Transactions Challenge Nodejs + Typescript
---
### Como funcionará a mecânica da trilha :gear:

O dev deverá criar um repositório de sua autoria com base neste template, pois o mesmo conterá toda a arquitetura padrão warren já pronta para desenvolver as trilhas.

Cada trilha, listados mais abaixo, deve representar um PR, ou mais, a ser avaliado pelos reviewers da tribo.

Basicamente é uma api para transações entre portfolios.

O que será avaliado:

- Estruturação do código
- Testes
- Repository Pattern
- SOLID
- Utilização de bibliotecas sugeridas nas trilhas
- Documentação das rotas com Swagger

## Modelos de dados

### Customer

Estrutura de usuario padrão da plataforma. Alguns pontos de atenção:
- `balance`: saldo da conta do usuario. Por este atributo que ocorrem as transações financeiras. Saldo da conta nunca pode ser negativo.
- `portfolios`: lista de subdocumentos de `Portfolio`

### Portfolio

Portfólio de investimentos é o conjunto de aplicações do investidor, também chamado de carteira de investimentos. Neste exercicio foi simplificada para uma estrutura mais basica:
- `amount`: quantidade atualmente alocada no portfolio
- `amountGoal`: quantidade total do objetivo alvo do portfolio

### Transaction

`Transaction` é o mapeamento de uma transação financeira da plataforma:
- `type`: tipo da transação:
  - `deposit`: deposito externo para saldo da conta do `customer`
  - `withdraw`: resgate do saldo do usuario para fora da plataforma
  - `account_transfer`: transferencia entre dois `customer` a partir de seus saldos de conta
  - `portfolio_deposit`: movimentação financeira do saldo de um `customer` para o `amount` de um portfolio pertencente
  - `portfolio_transfer`: transferencia entre dois portfolios de um mesmo `customer`
  - `portfolio_withdraw`: retirada de uma certa quantia de um portfolio para o saldo do customer dono do portfolio
- `status`: status atual da transação:
  - `pending`: transação em processamento
  - `accepted`: transação processada e aceita
  - `rejected`: transação processada e recusada
  - `deleted`: transação deletada
- `fromPortfolio`: referencia `Portfolio` para transações com direção saindo de um portfolio. Se não tem relação a portfolio campo não existe no documento.
- `toPortfolio`: referencia `Portfolio` para transações com direção entrando em um portfolio. Se não tem relação a portfolio campo não existe no documento.
- `toCustomer`: referencia `Customer` para transações com direção entrando para um outro customer. Se transação não é `account_transfer` campo não existe no documento.

**Toda transação financeira realizada deve ser registrado um novo documento no banco com as informações devidas**

---

## Trilha - Implementação inicial e configuração :boom:

Nesta trilha deverá ser implementado as rotas descritas mais abaixo com base em:

- Repository Pattern (Controller/Services/Repository)
- Arquivo de rotas separado para cada responsabilidade
- Typagem (Typescript)
- S-OLID, atentar-se a uma responsabilidade por arquivo, facilitando assim a manutenção
- DTO, adicionando o conceito de interfaces de DTO, seu código ganha muita escalabilidade. Não deixe de usar.
- Para a validaçaõ do que chega das rotas, sugiro a utilização do pacote Joi, já presente no repositório base.
- Documentação das rotas com Swagger

#### Rotas 🚋

Para especificar qual customer da request é repassado o seu id via header: ```customer-id = <string>```

- GET /portfolios/:id - Essa rota está quebrada! Dado um id de um portfolio essa rota deve retornar os dados do portfolio.

- GET /portfolios/goalReached - Retorna uma lista de todos portfolios de um determinado customer em que a quantidade alocada no portfolio é igual ou maior que o objetivo alvo do portfolio.

- GET /transactions/deposits?status=<string>&start=<date>&end=<date> - Retorna uma lista de transações deposit do customer abertas de um determinado status entre um determinado período de tempo delimitado por start e end

- POST /transactions/deposit - Depositar um valor amount na conta do usuario que fez a requisição.

- POST /transactions/account-transfer/:customerId - Transferência entre customer que fez a chamada em direção a conta de outro customer <customerId>

- POST /transactions/portfolio-transfer?fromPortfolio=<string>toPortfolio=<string> - Transferência entre dois portfolios de um customer.

- GET /admin/topAllocationAmount?page=<integer>&pageSize=<integer> - Retorna lista de clientes com maior valor alocado juntando todos seus portfolios. Contém paginação1.

- GET/admin/topCashChurn?page=<integer>&pageSize=<integer>&start=<date>&end=<date> - Retorna os clientes que mais retiraram dinheiro da plataforma entre um determinado periodo de tempo delimitado por start e end. Contém paginação1.

---
## Trilha - Implementação de testes :satellite:
  
Adicionar testes para a nossa aplicação.
Utilizar Jest, para testes unitários, e Supertest para testes de integração.
Crie uma pasta só para os testes.
Adicione uma cobertura de testes, importante ter no mínimo 75% de código coberto por testes.

---
## Trilha - Injeção de dependências com Tsyringe :syringe:
 
A camada de services provavelmente utilizará um arquivo de repositório para realizar as consultas aos bancos de dados.
Deverá ser implementada então a injeção de dependências com o pacote Tsyringe.
No repositório base temos uma pasta:
  
- di (Dependency Injection)
  
Ela tem a única responsabilidade de lidar com as injeções de dependências da nossa aplicação.

---
## Trilha CI - Continous Integration (Linter/Testes) :ferris_wheel:

Utilizar o github action no seu repositório para implementação de 2 actions:

- Linter
- Testes

Guia:

https://www.notion.so/warrenbrasil/Acordos-de-c-digo-ce16923c70f94925bd4d05d50ba81324

O github actions atua quando abrimos um PR e quando mergeamos para determinada branch.

 
