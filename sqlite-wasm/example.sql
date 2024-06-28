CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  age INTEGER,
  email TEXT UNIQUE
);
INSERT INTO users (firstname, lastname, age, email) VALUES
  ('John', 'Doe', 30, 'john.doe@example.com'),
  ('Jane', 'Smith', 25, 'jane.smith@example.com'),
  ('Michael', 'Lee', 37, 'michael.lee@example.com');
SELECT * FROM users;