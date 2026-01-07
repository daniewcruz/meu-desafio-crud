-- Cria a tabela Contatos para armazenar informações de pessoas/contatos
CREATE TABLE Contatos (
    idPessoa SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    dataNascimento DATE,
    observacoes TEXT
);