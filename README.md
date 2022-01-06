[![Maintainability](https://api.codeclimate.com/v1/badges/f980de4300486c38bb00/maintainability)](https://codeclimate.com/github/Onnion/transfer/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f980de4300486c38bb00/test_coverage)](https://codeclimate.com/github/Onnion/transfer/test_coverage)
![example workflow](https://github.com/Onnion/transfer/actions/workflows/coverage.yml/badge.svg)
![Heroku](http://heroku-badge.herokuapp.com/?app=angularjs-crypto&style=flat&svg=1)


## Dependências do projeto
1. [Docker](https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-18-04-pt)
1. [Docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04-pt)


## Pré requisitos
1. Copie o conteudo do arquivo `.env.default`
2. Crie o arquivo `.env` e cole o conteudo copiado
2. Altere as permissões dos arquivos `.sh` com o seguinte comando:
```bash
chmod +x ./docker/*.sh
```

## Rodando o projeto
```bash
$ docker-compose up
# caso prefira não acompanhar os logs
$ docker-compose up -d
```
