# AccessControl

## 🚀 Sobre o Projeto

O **AccessControl** é uma API para gerenciamento de usuários e permissões, seguindo a estrutura DDD (Domain-Driven Design). Ele foi desenvolvido utilizando **NestJS**, **PostgreSQL**, e integração com **Datadog** para logging.

## 🛠️ Tecnologias Utilizadas

- **NestJS** (Framework backend)
- **TypeScript**
- **PostgreSQL** + **Prisma ORM**
- **Docker** (para ambiente de desenvolvimento)
- **Datadog** (monitoramento e logging)
- **Winston** (logging)
- **Node.js**

## 📂 Estrutura do Projeto

A estrutura do projeto segue a abordagem DDD e está organizada da seguinte forma:

```
/src
  ├── core/         # Lógica compartilhada
  ├── domain/       # Regras de negócio
  │   ├── application/ # Casos de uso e repositórios
  │   ├── enterprise/  # Entidades e objetos de valor
  ├── infra/        # Infraestrutura (Banco de dados, HTTP, etc.)
  ├── main.ts       # Bootstrap da aplicacão
```

## 🏗️ Configuração e Execução

### 1️⃣ Configurar Variáveis de Ambiente

Crie um arquivo **`.env`** na raiz do projeto e defina as variáveis necessárias:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/access_control
DATADOG_API_KEY=seu_api_key_aqui
LOG_PATH=/var/log/datadog/custom_logs/log.log
```

### 2️⃣ Subir o Ambiente com Docker

```sh
docker-compose up -d
```

### 3️⃣ Rodar as Migrações do Prisma

```sh
npx prisma migrate dev
```

### 4️⃣ Executar a API

```sh
npm run start
```

## 📊 Logging com Datadog

A API utiliza **Winston** integrado ao **Datadog** para captura de logs. O `AppLogger` está configurado para:

- Escrever logs no arquivo definido em **LOG\_PATH**
- Exibir logs coloridos no console
- (Opcional) Enviar logs diretamente para a API do Datadog

### 📌 Como visualizar os logs no Datadog

1. Acesse o [Datadog Logs](https://app.datadoghq.com/logs)
2. Configure os filtros para visualizar os logs do **access-control-api**
