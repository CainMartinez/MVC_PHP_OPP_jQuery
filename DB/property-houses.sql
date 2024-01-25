CREATE DATABASE IF NOT EXISTS property_houses;

USE property_houses;

CREATE TABLE IF NOT EXISTS property (
  id_property INT(10) AUTO_INCREMENT PRIMARY KEY,
  cadastral_reference VARCHAR(50),
  square_meters INT(10),
  number_of_rooms INT(2),
  price INT(10),
  is_active BOOLEAN,
  fecha_creacion VARCHAR(50),
  fecha_actualizacion VARCHAR(50),
  id_images INT(10)
);

CREATE TABLE IF NOT EXISTS type (
  id_type INT(10) AUTO_INCREMENT PRIMARY KEY,
  name_type VARCHAR(50),
  is_active BOOLEAN,
  fecha_creacion VARCHAR(50),
  fecha_actualizacion VARCHAR(50),
  image_type VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS operation (
  id_operation INT(10) AUTO_INCREMENT PRIMARY KEY,
  name_operation VARCHAR(50),
  is_active BOOLEAN,
  fecha_creacion VARCHAR(50),
  fecha_actualizacion VARCHAR(50),
  image_operation VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS category (
  id_category INT(10) AUTO_INCREMENT PRIMARY KEY,
  name_category VARCHAR(50),
  is_active BOOLEAN,
  fecha_creacion VARCHAR(50),
  fecha_actualizacion VARCHAR(50),
  image_category VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS city (
  id_city INT(10) AUTO_INCREMENT PRIMARY KEY,
  name_city VARCHAR(50),
  is_active BOOLEAN,
  fecha_creacion VARCHAR(50),
  fecha_actualizacion VARCHAR(50),
  id_property INT(10),
  image_city VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS images (
  id_images INT(10) AUTO_INCREMENT PRIMARY KEY,
  path_images VARCHAR(100),
  is_active BOOLEAN,
  fecha_creacion VARCHAR(50),
  fecha_actualizacion VARCHAR(50)
);

ALTER TABLE property
ADD FOREIGN KEY (id_images) REFERENCES images(id_images);


ALTER TABLE city
ADD FOREIGN KEY (id_property) REFERENCES property(id_property);

CREATE TABLE IF NOT EXISTS property_type_relation (
  id_property INT(10),
  id_type INT(10),
  description VARCHAR(150),
  PRIMARY KEY (id_property, id_type),
  FOREIGN KEY (id_property) REFERENCES property(id_property),
  FOREIGN KEY (id_type) REFERENCES type(id_type)
);

CREATE TABLE IF NOT EXISTS operation_type_relation (
  id_property INT(10),
  id_operation INT(10),
  PRIMARY KEY (id_property, id_operation),
  FOREIGN KEY (id_property) REFERENCES property(id_property),
  FOREIGN KEY (id_operation) REFERENCES operation(id_operation)
);

CREATE TABLE IF NOT EXISTS category_type_relation (
  id_property INT(10),
  id_category INT(10),
  PRIMARY KEY (id_property, id_category),
  FOREIGN KEY (id_property) REFERENCES property(id_property),
  FOREIGN KEY (id_category) REFERENCES category(id_category)
);