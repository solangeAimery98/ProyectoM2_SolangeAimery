INSERT INTO authors (name, email, bio)
VALUES
('Ana García', 'ana@example.com', 'Desarrolladora full-stack apasionada por Node.js'),
('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico especializado en bases de datos'),
('María López', 'maria@example.com', 'Ingeniera de software con foco en APIs REST');

INSERT INTO posts (title, content, author_id)
VALUES
('Introducción a Node.js', 'Aprendiendo a crear APIs con Express.', 1),
('¿Qué es PostgreSQL?', 'Una base de datos relacional muy utilizada.', 2),
('Primeros pasos con REST', 'Cómo diseñar endpoints correctamente.', 3);