CREATE SCHEMA IF NOT EXISTS T16db;

CREATE TABLE
    IF NOT EXISTS T16db.persons (
        id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS T16db.addresses (
        id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
        street TEXT NOT NULL,
        number TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        country TEXT NOT NULL,
        person_id INTEGER,
        FOREIGN KEY (person_id) REFERENCES T16db.persons(id)
    );