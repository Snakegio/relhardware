set schema 'relhardware';

-- Roles should be lowercase
-- Ruoli base
INSERT INTO roles ("id", "name", "read", "modify", "read_pdf", "read_history")
VALUES (1, 'admin', true, true, true, true);

INSERT INTO roles ("id", "name", "read", "modify", "read_pdf", "read_history")
VALUES (2, 'user', true, false, true, false);

--user Email should be lowercase
-- user base
INSERT INTO users (id, name, surname, creation_date, modification_date, email, password, enable, pdf_report)
VALUES (1, 'admin', 'admin', now(), now(), 'admin@relatech.com',
        '$2a$10$B5..YfwiNY1QGeAr.x5fjenEUwIHE1d4In0cOjysKy4YhYNRe6gfC', true, null);
INSERT INTO users (id, name, surname, creation_date, modification_date, email, password, enable, pdf_report)
VALUES (2, 'user', 'user', now(), now(), 'user@relatech.com',
        '$2a$10$B5..YfwiNY1QGeAr.x5fjenEUwIHE1d4In0cOjysKy4YhYNRe6gfC', true, null);

SELECT setval('users_id_seq', (SELECT max(id) FROM users));

-- mapping utenti base con ruoli
INSERT INTO user_roles (user_id, role_id)
VALUES (1, 1);
INSERT INTO user_roles (user_id, role_id)
VALUES (2, 2);



