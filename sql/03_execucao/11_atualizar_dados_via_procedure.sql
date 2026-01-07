-- Script para atualizar dados na tabela de Contatos através da procedure de atualização
-- Executa a função sp_atualizar_contato passando o ID do contato e os novos valores
-- Parâmetros: id do contato, nome, data de nascimento, observações, telefone e email
-- A função retorna 'OK' se a atualização for bem-sucedida ou 'NAO_ENCONTRADO' se o ID não existir
SELECT sp_atualizar_contato(
    1,  
    'Eduardo Luiz Silva',  
    '1990-05-20',  
    'Observação atualizada através do script referente ao que foi inserido anteriormente.',  -- Novas observações
    '84999998888',  
    'eduardo.silva@email.com'  
);