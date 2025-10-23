CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  edad INT
);

INSERT INTO usuarios (nombre, edad) VALUES ('Carlos', 25), ('Ana', 30), ('Luis', 22);