# Backend – Node.js + Express + MySQL

## Passo a passo para configurar no PC do seu amigo

---

### 1. Instalar o Node.js
Acesse **https://nodejs.org** e baixe a versão **LTS**.  
Instale normalmente (next → next → finish).

---

### 2. Instalar o MySQL
Acesse **https://dev.mysql.com/downloads/installer/** e baixe o **MySQL Installer**.  
Durante a instalação, anote a **senha do usuário root** que você criar.

---

### 3. Copiar a pasta `backend` para o PC

Copie a pasta inteira para qualquer lugar, por exemplo:
```
C:\projetos\backend\
```

---

### 4. Criar o banco de dados

Abra o **MySQL Workbench** (ou o terminal MySQL) e execute o arquivo `database.sql`:

```sql
CREATE DATABASE IF NOT EXISTS clientes_db CHARACTER SET utf8mb4;
USE clientes_db;
CREATE TABLE IF NOT EXISTS clientes (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  nome      VARCHAR(150) NOT NULL,
  email     VARCHAR(150),
  telefone  VARCHAR(20),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 5. Configurar o .env

Abra o arquivo `.env` e coloque a senha do seu MySQL:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=SUA_SENHA_DO_MYSQL
DB_NAME=clientes_db
PORT=3000
```

---

### 6. Instalar as dependências

Abra o **cmd** dentro da pasta `backend` e rode:

```bash
npm install
```

---

### 7. Iniciar o servidor

```bash
npm run dev
```

Você vai ver:
```
✅ Backend rodando!
   Local:   http://localhost:3000
   Rede:    http://SEU_IP:3000  ← use este IP no frontend
```

---

### 8. Descobrir o IP para passar pro frontend

No cmd, digite:
```bash
ipconfig
```

Procure **"Endereço IPv4"** (algo como `192.168.X.X`).  
Passe esse IP pro seu amigo colocar em `src/config/api.js` no frontend.

---

### 9. Liberar o firewall do Windows (importante!)

Para que o frontend de outro PC acesse o backend, é necessário liberar a porta 3000:

1. Abra o **Painel de Controle** → **Firewall do Windows Defender**
2. Clique em **Configurações avançadas**
3. **Regras de entrada** → **Nova regra**
4. Escolha **Porta** → TCP → porta **3000**
5. Marque **Permitir conexão** → Avançar → Avançar → dar um nome → Concluir

---

### Testar se está funcionando

Abra o navegador no PC do **frontend** e acesse:
```
http://IP_DO_AMIGO:3000/
```

Se aparecer `{"status":"ok","mensagem":"Backend rodando!"}` — está funcionando! ✅
