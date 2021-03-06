# Backend - Adonis & Node (DESAFIO NODE.JS)

## Sobre a api
Com o encerramento da pandemia, as escolas e universidaes precisarão controlar a alocação de salas para professores e alunos. Pensando nisso a API conciste em resolver esse problema, permitindo que o professor possa criar suas salas, além de poder editar, visualizar e deletar essas salas. Também o professor poderá alocar um aluno para a sala, também podendo editar, visualizar e deletar a sala para melhor controle. 

## INSTALAÇÃO
Faça um clone do repositório, se preferir utilize a opição de download

```
$ git clone https://github.com/michael23-lopes/dasafio-node-adonis
```
Depois de baixado a past da api em seu computador, configure um banco de dados postgres e adicione as configurações em um arquivo .env, você pode usar o modelo do arquivo .env.examplo.

Em seguida execute o comando para a instalação das dependencias.
```
npm instal 
```

Agora execute o comando de migração para crias as tabelas no banco de dados
```
node ace migration:run 
``` 

Importe  as requisições do projeto no arquivo <a href="./backend-adonis.json">backend-adonis.json</a> para testar as funcionalidades da aplicação

E por fim execute a aplicação
```
node ace serve --watch 
```

Feito com :purple_heart: by [Michael W.Lopes](https://github.com/michael23-lopes)

[![Linkedin Badge](https://img.shields.io/badge/-Michael%20Lopes-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/michael-wellington-lopes/)](https://www.linkedin.com/in/michael-wellington-lopes/) 
[![Gmail Badge](https://img.shields.io/badge/-michael23.wellington@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:michael23.wellington@gmail.com)](mailto:michael23.wellington@gmail.com)
