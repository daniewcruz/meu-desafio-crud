-- Script para remover dados na tabela de Contatos através da procedure de remoção
-- Executa a função sp_remover_contato passando o id do contato a ser deletado
-- Parâmetro: id do contato a ser removido
-- A função retorna 'OK' se a remoção for bem-sucedida ou 'NAO_ENCONTRADO' se o ID não existir
SELECT sp_remover_contato(1); 