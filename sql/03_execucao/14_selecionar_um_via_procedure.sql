-- Script para selecionar um contato específico na tabela de Contatos através da procedure de seleção
-- Executa a função sp_obter_contato passando o ID do contato que deseja buscar
-- Retorna os dados completos do contato se existir, ou uma linha vazia se não for encontrado
SELECT * FROM sp_obter_contato(1);  
