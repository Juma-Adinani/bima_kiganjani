CREATE DATABASE bima_mkononi;

USE bima_mkononi;

CREATE TABLE bima_types(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(60) NOT NULL
);

INSERT INTO
    bima_types (type)
VALUES
    ('All'),
    ('BIMA KUBWA NA NDOGO'),
    ('BIMA YA KATI NA NDOGO'),
    ('BIMA KUBWA NA YA KATI'),
    ('BIMA KUBWA'),
    ('BIMA YA KATI'),
    ('BIMA NDOGO');

CREATE TABLE bima_beneficiaries(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    middlename VARCHAR NULL,
    lastname VARCHAR NOT NULL,
    bod DATE NOT NULL,
    date_of_issue DATETIME NOT NULL,
    expire_date DATETIME NOT NULL,
    card_no INT NOT NULL UNIQUE,
    bima_type_id INT NOT NULL,
    FOREIGN KEY (bima_type_id) REFERENCES bima_types (id) ON UPDATE CASCADE
);

CREATE TABLE regions(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    region_name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE health_centers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    center_name VARCHAR NOT NULL,
    region_id INT NOT NULL,
    bima_type_id INT NOT NULL,
    FOREIGN KEY (region_id) REFERENCES regions (id) ON UPDATE CASCADE,
    FOREIGN KEY (bima_type_id) REFERENCES bima_types (id) ON UPDATE CASCADE
);

CREATE TABLE medicines (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    medicine_code VARCHAR NOT NULL,
    medicine_name VARCHAR NOT NULL,
    bima_type_id INT NOT NULL,
    FOREIGN KEY (bima_type_id) REFERENCES bima_types ('id') ON UPDATE CASCADE
);

CREATE TABLE center_medicines (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    medicine_id INT NOT NULL,
    center_id INT NOT NULL,
    status ENUM(0, 1) DEFAULT 0,
    FOREIGN KEY (center_id) REFERENCES health_centers (id) ON UPDATE CASCADE,
    FOREIGN KEY (medicine_id) REFERENCES medicines (id) ON UPDATE CASCADE
);

CREATE TABLE diseases(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    disease_name VARCHAR NOT NULL
);

CREATE TABLE center_diseases(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    center_id INT NOT NULL,
    disease_id INT NOT NULL,
    FOREIGN KEY (center_id) REFERENCES health_centers (id) ON UPDATE CASCADE,
    FOREIGN KEY (disease_id) REFERENCES diseases (id) ON  UPDATE CASCADE
);

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    phone VARCHAR NOT NULL UNIQUE,
    card_no INT NOT NULL UNIQUE,
    password VARCHAR NOT NULL
);
