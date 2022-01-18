CREATE DATABASE database_movie;

USE database_movie;

-- TABLA DE USUARIOS
CREATE TABLE users(
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);

--para modificar las tablas
ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

--para mostrar las tablas
DESCRIBE users;

-- TABLA DE PELÍCULAS
CREATE TABLE movies(
  id INT(11) NOT NULL,
  title VARCHAR(150) NOT NULL,
  url VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE movies
  ADD PRIMARY KEY (id);

ALTER TABLE movies
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

DESCRIBE movies;
