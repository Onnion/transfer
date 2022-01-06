[![Maintainability](https://api.codeclimate.com/v1/badges/f980de4300486c38bb00/maintainability)](https://codeclimate.com/github/Onnion/transfer/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f980de4300486c38bb00/test_coverage)](https://codeclimate.com/github/Onnion/transfer/test_coverage)
![Unit tests workflow](https://github.com/Onnion/transfer/actions/workflows/coverage.yml/badge.svg)
![Integration tests workflow](https://github.com/Onnion/transfer/actions/workflows/integration.yml/badge.svg)
[![Heroku](http://heroku-badge.herokuapp.com/?app=angularjs-crypto&style=flat&svg=1)](https://transfer-app-staging.herokuapp.com)

## Dependências do projeto
1. [Docker](https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-18-04-pt)
1. [Docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04-pt)

## Pré requisitos
1. Copie o conteudo do arquivo `.env.default`
2. Crie o arquivo `.env` e cole o conteudo copiado
2. Altere as permissões dos arquivos `.sh` com o seguinte comando:
```bash
chmod +x **/*.sh
```
## Rodando o projeto
```bash
$ docker-compose up
# caso prefira não acompanhar os logs
$ docker-compose up -d
```
## Documentação da api
[Documentação Swagger](https://transfer-app-staging.herokuapp.com/api/doc/)

## Artefatos do projeto

### 1. Collection Postman
[Collection Postman](https://www.getpostman.com/collections/41d2149b9d949e37e199)

[Enviroment](https://spotiy-share-music-generator.s3.sa-east-1.amazonaws.com/transfer-app-staging.postman_environment.json)

### 2. Diagrama de sequência
![Diagrama de sequència](/public/assets/docs/images/diagrama_de_sequencia.png)
