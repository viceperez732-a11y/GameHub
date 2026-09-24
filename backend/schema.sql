-- Esquema de base de datos para GameHub (Registro / Inicio de sesión)
-- Ejecuta este script en MySQL antes de correr el backend:
--   mysql -u root -p < schema.sql

CREATE DATABASE IF NOT EXISTS gamehub_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE gamehub_db;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    avatar VARCHAR(500) DEFAULT NULL,
    bio VARCHAR(300) DEFAULT NULL,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
