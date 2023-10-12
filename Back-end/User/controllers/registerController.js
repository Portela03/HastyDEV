const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const pino = require("pino")();
const User = require('../models/userModel'); // Importe o modelo de usuário que você definiu
const { registrationValidationRules } = require('./validations/userValidation');

const saltRounds = 10;

// Função de rota para o registro
function register(req, res) {
  const { username, email, password, confirmPassword, first_name, last_name } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'A senha e a confirmação de senha não coincidem' });
  }

  // Verificar se o username e o email já estão em uso
  User.findOne({ where: { username: username } })
    .then((existingUser) => {
      if (existingUser) {
        pino.info("Nome de usuário já em uso");
        return res.status(400).json({ error: "Nome de usuário já em uso" });
      } else {
        return User.findOne({ where: { email: email } });
      }
    })
    .then((existingUser) => {
      if (existingUser) {
        pino.info("Email já em uso");
        return res.status(400).json({ error: "Email já em uso" });
      }

      // Hash da senha
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          pino.error("Erro ao gerar o hash da senha:" + err);
          return res.status(500).json({ error: "Erro Interno do servidor" });
        }

        // Inserir dados no banco de dados usando o modelo de usuário
        User.create({
          username: username,
          password: hash,
          email: email,
          first_name: first_name,
          last_name: last_name,
        })
          .then(() => {
            pino.info("Cadastrado com sucesso");
            res.status(200).json({ message: "Cadastrado com sucesso" });
          })
          .catch((err) => {
            pino.error("Erro ao inserir dados no banco de dados:" + err);
            res.status(500).json({ error: "Erro Interno do servidor" });
          });
      });
    })
    .catch((err) => {
      pino.error("Erro ao consultar o banco de dados:" + err);
      res.status(500).json({ error: "Erro ao consultar o banco de dados" });
    });
}

module.exports = {registrationValidationRules, register };