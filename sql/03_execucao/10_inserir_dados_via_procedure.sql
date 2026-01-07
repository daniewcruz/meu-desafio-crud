-- Script para inserir dados na tabela de Contatos através da procedure de inserção
-- executa a função sp_inserir_contato passando todos os parâmetros necessários
-- Parâmetros: nome, data de nascimento, observações, telefone e email
-- A função retorna o id do novo contato criado no banco de dados
SELECT sp_inserir_contato(
    'Eduardo Luiz',  
    '1990-05-20',   
    'Contato inserido via script de teste.', 
    '84999998888',   
    'eduardo@luiz.com'  
);