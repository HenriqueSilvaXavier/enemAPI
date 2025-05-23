const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

// Carrega as questões do arquivo JSON
let questions = require('./questions.json');

// Rota inicial
app.get('/', (req, res) => {
  res.send('API do ENEM está ativa!');
});

// Lista todas as questões
app.get('/questoes', (req, res) => {
  res.json(questions);
});

// Buscar questão por ID
app.get('/questoes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const questao = questions.find(q => q.id === id);
  if (!questao) {
    return res.status(404).json({ erro: 'Questão não encontrada' });
  }
  res.json(questao);
});

// Adiciona nova questão
app.post('/questoes', (req, res) => {
  const novaQuestao = req.body;
  novaQuestao.id = questions.length ? questions[questions.length - 1].id + 1 : 1;
  questions.push(novaQuestao);

  fs.writeFileSync('./questions.json', JSON.stringify(questions, null, 2));
  res.status(201).json(novaQuestao);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;
