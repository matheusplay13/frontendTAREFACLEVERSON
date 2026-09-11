-- Execute este script no MySQL para criar o banco e a tabela
-- Abra o MySQL Workbench ou o terminal MySQL e cole tudo abaixo:

CREATE DATABASE IF NOT EXISTS clientes_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE clientes_db;

CREATE TABLE IF NOT EXISTS clientes (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  nome      VARCHAR(150) NOT NULL,
  email     VARCHAR(150),
  telefone  VARCHAR(20),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
