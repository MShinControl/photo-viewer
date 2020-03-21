CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
  firstname varchar(255),
  lastname varchar(255),
	username varchar(255),
	password varchar(255)
);