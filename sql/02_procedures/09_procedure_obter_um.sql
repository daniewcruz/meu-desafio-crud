-- Busca e retorna os dados de um contato específico pelo ID
-- Recebe o ID do contato como parâmetro e retorna seus dados completos
-- Se o ID não existir, retorna uma tabela vazia
CREATE OR REPLACE FUNCTION sp_obter_contato(p_idPessoa INT)
RETURNS TABLE (
    idPessoa INT,
    nome VARCHAR,
    dataNascimento DATE,
    observacoes TEXT,
    telefone VARCHAR,
    email VARCHAR
) AS $$
BEGIN
    -- Busca o contato pelo identificador e retorna todos os seus campos
    RETURN QUERY
    SELECT 
        c.idPessoa, 
        c.nome, 
        c.dataNascimento, 
        c.observacoes, 
        c.telefone, 
        c.email
    FROM Contatos c
    WHERE c.idPessoa = p_idPessoa;
END;
$$ LANGUAGE plpgsql;