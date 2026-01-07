-- Atualiza os dados de um contato existente na tabela Contatos
-- Recebe o ID do contato e os novos valores; retorna 'OK' se atualizar
-- ou 'NAO_ENCONTRADO' caso o ID não exista
CREATE OR REPLACE FUNCTION sp_atualizar_contato(
    p_idPessoa INT,
    p_nome VARCHAR,
    p_dataNascimento DATE,
    p_observacoes TEXT,
    p_telefone VARCHAR,
    p_email VARCHAR
)
RETURNS TEXT
AS $$
BEGIN
    -- Atualiza os campos do contato conforme os parâmetros informados
    UPDATE Contatos
    SET nome = p_nome,
        dataNascimento = p_dataNascimento,
        observacoes = p_observacoes,
        telefone = p_telefone,
        email = p_email
    WHERE idPessoa = p_idPessoa;

    -- Se nenhuma linha foi afetada, o contato não foi encontrado
    IF NOT FOUND THEN
        RETURN 'NAO_ENCONTRADO';
    END IF;

    -- Atualização bem-sucedida
    RETURN 'OK';
END;
$$ LANGUAGE plpgsql;
