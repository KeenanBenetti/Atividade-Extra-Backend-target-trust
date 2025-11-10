import express from 'express';
import { no } from 'zod/locales';

const app = express();
app.use(express.json());

let users = [{nome: "Jefferson", idade: 29}, {nome: "Maria", idade: 22}, {nome: "Ana", idade: 19}];

app.get('/', (request, response) => {
    response.send(`
    <h1>API de Usuários</h1>
    <p>Use os endpoints para interagir com a API.</p>
    <ul>
      <li>GET /users - Lista todos os usuários</li>
      <li>POST /newuser - Cria um novo usuário (envie JSON com 'nome' e 'idade')</li>
      <li>DELETE /deleteuser/:nome - Deleta o usuário pelo nome</li>
      <li>PUT /updateuser/:nome - Atualiza a idade do usuário pelo nome (envie JSON com 'idade')</li>
    </ul>
    `);
});
app.get('/users', (request, response) => {
  response.json({
    users: users
  });
})

app.post("/newuser", (req, res) => {
  const { nome, idade } = req.body;

  users.push({nome, idade});

  res.status(201).json({
    mensagem: "Usuário criado com sucesso!",
    usuario: { nome, idade },
  });
});

app.delete("/deleteuser/:nome", (req, res) => {
  const { nome } = req.params;

  users = users.filter(user => user.nome !== nome);

  res.json({
    mensagem: `Usuário ${nome} deletado com sucesso!`,
    usuarios: users,
  });
});

app.put("/updateuser/:nome", (req, res) => {
  const { nome } = req.params;
  const { idade } = req.body;

  const user = users.find(user => user.nome === nome);
  if (user) {
    user.idade = idade;
    res.json({
      mensagem: `Usuário ${nome} atualizado com sucesso!`,
      usuario: user,
    });
  } else {
    res.status(404).json({ mensagem: `Usuário ${nome} não encontrado.` });
  }
});

app.listen(3000, () => {
  console.log("API Rodando na port 3000");
});