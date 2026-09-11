const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const db = require('./db');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Middlewares ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors());       // Responde pre-flight de qualquer rota
app.use(express.json());        // Lê body em JSON


// ─── Rotas ────────────────────────────────────────────────────────────────────

// Rota de teste – acesse http://localhost:3000/ no navegador
app.get('/', (req, res) => {
  res.json({ status: 'ok', mensagem: 'Backend rodando!' });
});

// ── POST /clientes → Cadastrar novo cliente ───────────────────────────────────
app.post('/clientes', async (req, res) => {
  const { nome, email, telefone } = req.body;

  if (!nome || !nome.trim()) {
    return res.status(400).json({ message: 'O campo nome é obrigatório.' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)',
      [nome.trim(), email?.trim() || null, telefone?.trim() || null]
    );

    res.status(201).json({
      id:       result.insertId,
      nome:     nome.trim(),
      email:    email?.trim() || null,
      telefone: telefone?.trim() || null,
    });
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error.message);
    res.status(500).json({ message: 'Erro interno ao cadastrar cliente.' });
  }
});

// ── GET /clientes?busca=TEXTO → Buscar clientes ───────────────────────────────
app.get('/clientes', async (req, res) => {
  const { busca } = req.query;

  try {
    let rows;

    if (busca && busca.trim()) {
      const termo = `%${busca.trim()}%`;
      // Busca por nome OU por ID (se a busca for um número)
      [rows] = await db.execute(
        `SELECT id, nome, email, telefone, criado_em
         FROM clientes
         WHERE nome LIKE ? OR CAST(id AS CHAR) LIKE ?
         ORDER BY nome ASC
         LIMIT 50`,
        [termo, termo]
      );
    } else {
      // Se não informou busca, retorna todos (limitado a 50)
      [rows] = await db.execute(
        'SELECT id, nome, email, telefone, criado_em FROM clientes ORDER BY nome ASC LIMIT 50'
      );
    }

    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error.message);
    res.status(500).json({ message: 'Erro interno ao buscar clientes.' });
  }
});

// ── GET /clientes/:id → Buscar cliente por ID ─────────────────────────────────
app.get('/clientes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute(
      'SELECT id, nome, email, telefone, criado_em FROM clientes WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar cliente:', error.message);
    res.status(500).json({ message: 'Erro interno ao buscar cliente.' });
  }
});


// ─── Iniciar servidor ─────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('✅ Backend rodando!');
  console.log(`   Local:   http://localhost:${PORT}`);
  console.log(`   Rede:    http://SEU_IP:${PORT}  ← use este IP no frontend`);
  console.log('');
  console.log('   Para descobrir seu IP: abra o cmd e digite "ipconfig"');
  console.log('   Procure por "Endereço IPv4"');
  console.log('');
});
