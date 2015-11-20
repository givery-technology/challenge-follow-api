-- profileChallenge.db 

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  email varchar(100) NOT NULL UNIQUE,
  birthday date NOT NULL
);

CREATE TABLE IF NOT EXISTS followers (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  user_id int NOT NULL REFERENCES users(id),
  follower_id int NOT NULL REFERENCES users(id),
  UNIQUE (user_id, follower_id)
);

DELETE FROM users;
DELETE FROM followers;

INSERT INTO users (id, name, password, email, birthday) VALUES (1, 'John Smith',    '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'user1@test.com', "1991-04-17");
INSERT INTO users (id, name, password, email, birthday) VALUES (2, 'Taro Yamada',   '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'user2@test.com', "1989-04-17");
INSERT INTO users (id, name, password, email, birthday) VALUES (3, 'Ichiro Suzuki', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'user3@test.com', "1995-04-17");
INSERT INTO users (id, name, password, email, birthday) VALUES (4, 'Robin Hood',    '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'user4@test.com', "1987-04-17");
INSERT INTO users (id, name, password, email, birthday) VALUES (5, 'Bruce Wayne',   '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'user5@test.com', "1999-04-17");
INSERT INTO users (id, name, password, email, birthday) VALUES (6, 'Clark Kent',    '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'user6@test.com', "1994-04-17");

-- user1 has 5 followers
-- user2 has 2 followers
INSERT INTO followers (user_id, follower_id) VALUES (1, 2);
INSERT INTO followers (user_id, follower_id) VALUES (1, 3);
INSERT INTO followers (user_id, follower_id) VALUES (1, 4);
INSERT INTO followers (user_id, follower_id) VALUES (1, 5);
INSERT INTO followers (user_id, follower_id) VALUES (1, 6);
INSERT INTO followers (user_id, follower_id) VALUES (2, 1);
INSERT INTO followers (user_id, follower_id) VALUES (2, 3);

-- ALTER TABLE users AUTO_INCREMENT = 1;
-- ALTER TABLE followers AUTOINCREMENT = 1;

-- SH1 equivalent of "password" -> "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8"