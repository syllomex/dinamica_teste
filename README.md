<h1 align="center">Chat<br>
<span align="center">Node.js | ReactJS | Socket.IO | MongoDB</span>
</h1>
<h3 align="center">Projeto desenvolvido para dinâmica da Formare Tech</h3>
<h1 align="center"><img src="https://img.shields.io/github/languages/top/syllomex/dinamica_teste?style=flat-square"></h1>

# Objetivo

Desenvolver um chat em tempo real.

# Requisitos

#### Página de Login
- [x] Login com nome de usuário.
- [x] Plus: autenticação com senha criptografada.

#### Participante
- [x] Campo para inserir mensagens.
- [x] Identificação do usuário logado.
- [x] Área exibindo mensagens com o formato ```'DD/MM/YY - 'username' - HH:MM => 'mensagem'```
- [x] Exibir mensagens de todos os usuários, organizadas das mais novas para as mais velhas de baixo para cima.
- [x] Área de mensagem deve ser atualizada em tempo real sempre que houver uma nova mensagem.

#### Administrador
- [x] Filtrar mensagens por nome de usuário.
- [x] Filtrar mensagens por data.
- [x] Alternar ordem das mensagens.
- [x] Plus: apagar mensagens.

# Como executar

- ### Pré-requisitos
  - É **necessário** possuir o **[Node.js](https://nodejs.org/en/)** instalado.
  - É **necessário** possuir o **[Git](https://git-scm.com/)** instalado.
  - É **necessário** possuir um gerenciador de pacotes (**[NPM](https://www.npmjs.com/)** ou **[Yarn](https://yarnpkg.com/)**).
  - É **necessário** possuir o **[MongoDB](https://www.mongodb.com/try/download/community)** instalado.
 
1. Faça um clone do repositório:
```sh
$ git clone https://github.com/syllomex/dinamica_teste.git
```

2. Executando a aplicação:
```sh
# API
$ cd server

# Instalando as dependências
$ yarn install # ou npm install

# Inicializando a api
$ yarn start # ou npm start

# Aplicação Web
$ cd web

# Instalando as dependências
$ yarn install # ou npm install

# Inicializando a aplicação web
$ yarn start # ou npm start
```

**Atenção**: caso ocorra um erro na conexão com o banco de dados, tente alterar as credenciais da conexão em ```database.js```

# Sobre o desenvolvimento
### Autenticação
Para o login foi utilizado o JSON Web Token, gerando um token através de uma requisição HTTP e, na sequência, enviando os dados do usuário através do Socket.
Por motivos de demonstração, todas as contas criadas recebem privilégios de administrador.

### Sistema de mensagens
Ao se conectar à sala de chat, é renderizado na tela todas as mensagens anteriormente enviadas.

Ao criar (ou deletar) mensagens, várias ações são executadas ao mesmo tempo.
Para o usuário que está **enviando**, a mensagem é renderizada instantaneamente no front-end. Ao mesmo tempo, esta é enviada ao servidor, que a armazena em um array na própria memória, e também é armazenada no banco de dados.
Optei por esse método para não depender da conexão com o banco de dados durante a troca de mensagens, tornando um processo muito mais rápido.

Na remoção de mensagens, era necessário o ID para referenciar a mesma, porém este era gerado pelo banco de dados. Para evitar essa dependência, optei por adicionar mais uma propriedade nas mensagens contendo um UUID gerado no front-end. Dessa forma foi possível ter um ID único sem depender da criação da mensagem no banco.

### Filtros
Toda a lógica dos filtros se encontra no front-end, evitando requisições desnecessárias ao servidor e, consequentemente, reduzindo o tráfego de dados.
