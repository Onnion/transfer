## Dependências do projeto
1. [Docker](https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-18-04-pt)
1. [Docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04-pt)


## Pré requisitos
1. Copie o conteudo do arquivo `.env.default`
2. Crie o arquivo `.env` e cole o conteudo copiado
2. Altere as permissões dos arquivos `.sh` com o seguinte comando:
```bash
chmod +x services/**/.docker/*.sh
```

## Rodando o projeto
```bash
$ docker-compose up
# caso prefira não acompanhar os logs
$ docker-compose up -d
```
