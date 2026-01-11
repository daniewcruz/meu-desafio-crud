// Script para testar a API POST
const data = {
  nome: 'João Teste',
  email: 'joao@test.com',
  telefone: '11999999999',
  dataNascimento: '1990-05-15',
  observacoes: 'Contato de teste'
};

console.log('Enviando dados:', data);

fetch('http://localhost:3000/api/contatos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  .then(res => {
    console.log('Status:', res.status);
    return res.json();
  })
  .then(json => {
    console.log('Resposta:', json);
  })
  .catch(err => {
    console.error('Erro:', err);
  });
