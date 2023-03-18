# 🏫 Fatequense API

Uma api não oficial do Siga para conseguir pegar suas informações de estudante facilmente por meio de requisições HTTP!

## 🔎 Observações

- A aplicação pode dar problema a qualquer momento, desde que haja mudanças significativas no site do SIGA.
- A API pode ser utilizada apenas por contas de estudantes da Fatec.

## 🔥 Tecnologias

- [TypeScript](https://www.typescriptlang.org)
- [Fastify](https://fastify.io)
- [Jest](https://jestjs.io)
- [Zod](https://zod.dev)
- [JWT](https://jwt.io)
- [urllib](https://github.com/node-modules/urllib)
- [Cheerio](https://cheerio.js.org)

## 🚀️ Rodando localmente

1. Clone o repositório e entre nele
```bash
$ git clone https://github.com/SadS4ndWiCh/fatequense-api
$ cd fatequense-api
```
 
2. Instale as dependências
```bash
$ pnpm i
```

3. Crie o arquivo de variáveis ambiente
```bash
$ touch .env.local
```

 - 3.1. Insira as seguintes variáveis ambiente no arquivo:
```env
// .env.local

PORT= # Definir em qual porta o servidor vai rodar

JWT_SECRET_KEY= # Definir a chave para o JWT
JWT_EXPIRES_IN= # Definir o tempo de expiração do JWT
JWT_ALGORITHM= # Definir qual algorítimo irá usar na chave
```

3. Execute a aplicação
```bash
$ pnpm dev
```

## 🛠️ Rodando os testes
```bash
# Testes unitários
$ pnpm test

# Testes unitários em modo 'watch'
$ pnpm test:watch
```