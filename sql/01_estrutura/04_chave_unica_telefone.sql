-- Adiciona constraint de chave única na coluna telefone
-- garante que não existam dois contatos com o mesmo número de telefone no banco
-- Permite valores NULL caso o contato não tenha telefone cadastrado
ALTER TABLE Contatos ADD CONSTRAINT uk_contatos_telefone UNIQUE (telefone);