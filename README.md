# Sistema de Gerenciamento de Contatos

Sistema CRUD completo para gestão de contatos com Next.js, TypeScript, PostgreSQL e Stored Procedures.

## Tecnologias

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4 + DaisyUI 5
- PostgreSQL com stored procedures
- API REST com Next.js App Router

## Pré-requisitos

- Node.js 18+
- PostgreSQL 12+

## Instalação e Configuração local

### 1. Clone e instale dependências

```bash
git clone https://github.com/daniewcruz/meu-desafio-crud.git
cd meu-desafio-crud
npm install
```

O `npm install` instala automaticamente: Next.js, React, TypeScript, Tailwind, DaisyUI e PostgreSQL driver.

### 2. Configure o PostgreSQL

**Crie o banco:**
```sql
CREATE DATABASE contatos;
```

**Execute os scripts SQL na ordem:**
```bash
# Estrutura da tabela
sql/01_estrutura/01_criar_tabela_contatos.sql
sql/01_estrutura/02_alterar_tabela_contatos.sql
sql/01_estrutura/03_indices_pesquisa.sql
sql/01_estrutura/04_chave_unica_telefone.sql

# Stored Procedures
sql/02_procedures/05_procedure_insercao.sql
sql/02_procedures/06_procedure_atualizacao.sql
sql/02_procedures/07_procedure_remocao.sql
sql/02_procedures/08_procedure_selecao_todos.sql
sql/02_procedures/09_procedure_obter_um.sql
```

### 3. Configure variáveis de ambiente

Crie `.env.local` na raiz:
```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=contatos
DB_USER=postgres
DB_PASSWORD=sua_senha
```

### 4. Execute

```bash
npm run dev
```

Acesse: http://localhost:3000

## Estrutura do Projeto

```
src/app/
  api/contatos/          - Endpoints da API REST
  contatos/              - Interface de gestão
  layout.tsx, page.tsx   - Layouts e home
src/components/
  icons/                 - Ícones SVG
  layout/                - Componentes reutilizáveis
src/lib/db.ts            - Conexão PostgreSQL
src/types/contact.ts     - Tipagens TypeScript
sql/                     - Scripts do banco de dados
```

## API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/contatos` | Lista todos os contatos |
| `POST` | `/api/contatos` | Cria novo contato |
| `GET` | `/api/contatos/[id]` | Busca contato por ID |
| `PUT` | `/api/contatos/[id]` | Atualiza contato |
| `DELETE` | `/api/contatos/[id]` | Remove contato |

## Funcionalidades

- CRUD completo de contatos
- Busca por nome, email ou telefone
- Paginação (10 itens por página)
- Validação de dados
- Formatação de telefone e data
- Interface responsiva
