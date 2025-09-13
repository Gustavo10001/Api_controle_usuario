## Projeto: Autenticação com Node.js, Express, Sequelize, Redis e JWT

Este repositório oferece um fluxo completo de autenticação: cadastro, login, rotas protegidas por JWT, logout com blacklist no Redis e documentação com Swagger.

### Critérios de Aceite (atendidos)
- Usuário pode se registrar e autenticar, recebendo um JWT válido
- Rotas protegidas respondem 401 Unauthorized quando o token está ausente, inválido ou revogado (blacklist)
- O logout insere o token na blacklist do Redis com expiração correta (TTL alinhado ao `exp` do JWT)
- Documentação Swagger disponível em `/api-docs`

### Requisitos
- Node.js 18+
- PostgreSQL em execução (local ou remoto)
- Redis em funcionamento (pode usar o Docker Compose deste repositório)

### Subindo o Redis via Docker
```bash
docker compose -f redis.yml up -d
```

### Arquivo .env (na raiz do projeto)
Crie um arquivo `.env` contendo:
```
PORT=3000
DB_DIALECT=postgres
DATABASE_URL=postgres://postgres:password@localhost:5432/exemplo_node
JWT_SECRET=supersecretjwtkey
JWT_EXPIRES_IN=1h
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=null
```
Observação: a aplicação utiliza `process.env`. Assegure que o `.env` seja carregado pelo seu ambiente (por exemplo, Docker Compose, sua IDE, ou ferramenta equivalente que injete as variáveis ao iniciar o processo).

### Instalação e Execução
```bash
npm install
npm run dev
```
Servidor disponível em `http://127.0.0.1:3000`

### Documentação (Swagger)
- Acesse: `http://127.0.0.1:3000/api-docs`
- Definições em: `docs/swagger.yml`

### Endpoints principais
- `POST /auth/register` — cadastra usuário
- `POST /auth/login` — autentica e retorna um JWT
- `POST /auth/logout` — invalida o token (blacklist no Redis). Requer header `Authorization: Bearer <token>`

### Fluxo demonstrativo (prints)
- Registro

![Register](Api_controle_usuario/docs/prints/Register.png)

- Login (retorna o JWT)

![Login](Api_controle_usuario/docs/prints/login.png)

- Logout bem-sucedido (token incluído na blacklist)

![Logout1](Api_controle_usuario/docs/prints/logout1.png)

- Logout repetido (token já revogado → 401 Unauthorized)

![LogoutErro](Api_controle_usuario/docs/prints/logoutErro.png)

### Notas técnicas
- Blacklist: chave no Redis `blacklist:token:<token>` com TTL calculado a partir do `exp` do JWT
- O middleware de autenticação verifica a blacklist antes de validar o token
- As configurações são lidas de `process.env` (`src/Config/index.js`)



