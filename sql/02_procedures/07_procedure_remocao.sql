-- Remove um contato da tabela Contatos usando o ID informado
-- Retorna 'OK' quando a remoção acontece e 'NAO_ENCONTRADO' se o ID não existir
CREATE OR REPLACE FUNCTION sp_remover_contato(
    p_idPessoa INT
)
RETURNS TEXT
AS $$
BEGIN
    -- Tenta remover o contato pelo identificador informado
    DELETE FROM Contatos
    WHERE idPessoa = p_idPessoa;

    -- Se nenhuma linha foi afetada pelo DELETE, o contato não foi encontrado
    IF NOT FOUND THEN
        RETURN 'NAO_ENCONTRADO';
    END IF;

    -- Remoção realizada com sucesso
    RETURN 'OK';
END;
$$ LANGUAGE plpgsql;
