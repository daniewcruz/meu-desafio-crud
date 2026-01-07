-- Retorna todos os contatos cadastrados no banco de dados
-- Os registros são ordenados alfabeticamente pelo nome para facilitar a visualização
-- Retorna uma tabela com todos os campos de cada contato
CREATE OR REPLACE FUNCTION sp_selecionar_todos_contatos()
RETURNS TABLE (
    idPessoa INT,
    nome VARCHAR,
    dataNascimento DATE,
    observacoes TEXT,
    telefone VARCHAR,
    email VARCHAR
) AS $$
BEGIN
    -- Busca todos os contatos e retorna ordenado por nome
    RETURN QUERY
    SELECT 
        c.idPessoa, 
        c.nome, 
        c.dataNascimento, 
        c.observacoes, 
        c.telefone, 
        c.email
    FROM Contatos c
    ORDER BY c.nome;
END;
$$ LANGUAGE plpgsql;