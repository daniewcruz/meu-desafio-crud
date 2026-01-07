-- Adiciona as colunas de telefone e email na tabela Contatos
-- telefone: armazena número de telefone com até 20 caracteres
-- email: armazena endereço de email com até 100 caracteres
ALTER TABLE Contatos ADD COLUMN telefone VARCHAR(20);
ALTER TABLE Contatos ADD COLUMN email VARCHAR(100);