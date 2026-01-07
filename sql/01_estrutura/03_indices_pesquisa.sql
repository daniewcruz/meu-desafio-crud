-- Cria índices para otimizar as consultas de busca na tabela Contatos
-- idx_contatos_nome: acelera buscas e filtros pelo nome do contato
-- idx_contatos_dataNasc: acelera buscas e filtros pela data de nascimento
CREATE INDEX idx_contatos_nome ON Contatos(nome);
CREATE INDEX idx_contatos_dataNasc ON Contatos(dataNascimento);