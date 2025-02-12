# AccessControl API

A **AccessControl API** é um sistema de gerenciamento de usuários e permissões, utilizando práticas de **Domain-Driven Design (DDD)** para organizar o código e garantir que a lógica de negócios seja bem estruturada e facilmente escalável.

A API é construída usando **NestJS**, **TypeORM** e **PostgreSQL**, e tem como objetivo fornecer um sistema robusto para gerenciar usuários, papéis (roles) e permissões.

## Features

- Cadastro de usuários com informações de login.
- Atribuição de papéis (roles) aos usuários.
- Gerenciamento de permissões com base nos papéis.
- Uso de UUIDs para identificação dos recursos.
- Estrutura organizada em camadas com DDD.

## Tecnologias Utilizadas

- **NestJS**: Framework de Node.js para construir aplicações escaláveis.
- **TypeORM**: ORM para facilitar a interação com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional.
- **UUID**: Identificadores únicos para os registros.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **Docker** (opcional): Para facilitar o desenvolvimento e a execução da aplicação.

## Estrutura do Projeto

A aplicação segue a estrutura de camadas (DDD) com três principais diretórios dentro de `src/`:

- **core**: Contém a lógica de aplicação comum, como interfaces, DTOs e exceções.
- **domain**: Contém as entidades e lógica de negócios da aplicação, dividida em subdomínios (ex: `users`, `roles`).
  - **application**: Casos de uso e repositórios.
  - **enterprise**: Entidades e objetos de valor.
- **infra**: Contém a implementação de infraestrutura (ex: conexão com banco de dados, configurações externas).

