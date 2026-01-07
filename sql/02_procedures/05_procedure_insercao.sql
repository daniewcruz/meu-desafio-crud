-- Cria uma função (stored procedure) para inserir novos contatos no banco de dados
-- Recebe todos os dados do contato como parâmetros e retorna o ID gerado
-- Facilita a inserção de dados e centraliza a lógica de criação de contatos
CREATE OR REPLACE FUNCTION sp_inserir_contato(
    p_nome VARCHAR,
    p_dataNascimento DATE,
    p_observacoes TEXT,
    p_telefone VARCHAR,
    p_email VARCHAR
)
RETURNS INTEGER
AS $$
DECLARE
    v_id INTEGER;
BEGIN
    -- Insere o novo contato e captura o ID gerado automaticamente
    INSERT INTO Contatos (nome, dataNascimento, observacoes, telefone, email)
    VALUES (p_nome, p_dataNascimento, p_observacoes, p_telefone, p_email)
    RETURNING idPessoa INTO v_id;

    -- Retorna o ID do contato recém-criado
    RETURN v_id;
END;
$$ LANGUAGE plpgsql;