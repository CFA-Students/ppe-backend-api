DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE ecommerce;
USE ecommerce;

#------------------------------------------------------------
# Table: Warehouse
#------------------------------------------------------------

CREATE TABLE Warehouse
(
    id_warehouse INT AUTO_INCREMENT NOT NULL,
    name         VARCHAR(50)        NOT NULL,
    country      VARCHAR(200)       NOT NULL,
    city         VARCHAR(200)       NOT NULL,
    postal_code  VARCHAR(10)        NOT NULL,
    address      TEXT               NOT NULL,
    PRIMARY KEY (id_warehouse)
) ENGINE = InnoDB;

INSERT INTO Warehouse
VALUES (null, 'entrepot_1', 'france', 'paris', '75002', '1 rue de la liberte');
INSERT INTO Warehouse
VALUES (null, 'entrepot_2', 'espagne', 'barcelone', '08001', '1 la rambla del raval');

#------------------------------------------------------------
# Table: User
#------------------------------------------------------------

CREATE TABLE Client
(
    id_client  INT AUTO_INCREMENT NOT NULL,
    identifier VARCHAR(50)        NOT NULL,
    password   TEXT               NOT NULL,
    last_name  VARCHAR(200)       NOT NULL,
    first_name VARCHAR(200)       NOT NULL,
    address    VARCHAR(200)       NOT NULL,
    born_at    DATE               NOT NULL,
    email      VARCHAR(200)       NOT NULL,
    phone      VARCHAR(50)        NOT NULL,
    PRIMARY KEY (id_client)
) ENGINE = InnoDB;


#------------------------------------------------------------
# Table: Category
#------------------------------------------------------------

CREATE TABLE Category
(
    id_category INT AUTO_INCREMENT NOT NULL,
    label       VARCHAR(50)        NOT NULL,
    description VARCHAR(200)       NOT NULL,
    PRIMARY KEY (id_category)
) ENGINE = InnoDB;

INSERT INTO Category
VALUES (null, 'livre', 'c\'est des livres');
INSERT INTO Category
VALUES (null, 'musique', 'c\'est de la musique');


#------------------------------------------------------------
# Table: Product
#------------------------------------------------------------

CREATE TABLE Product
(
    id_product  INT AUTO_INCREMENT NOT NULL,
    name        VARCHAR(50)        NOT NULL,
    type        VARCHAR(50)        NOT NULL,
    code        VARCHAR(50)        NOT NULL,
    price       FLOAT              NOT NULL,
    vat         FLOAT              NOT NULL,
    description VARCHAR(500)       NOT NULL,
    id_category INT                NOT NULL,
    PRIMARY KEY (id_product),
    CONSTRAINT product_category_fk FOREIGN KEY (id_category) REFERENCES Category (id_category)
) ENGINE = InnoDB;

INSERT INTO Product
VALUES (null, 'Harry Potter 1', 'livre', '1', 15, 20, 'le livre harry potter', 1);
INSERT INTO Product
VALUES (null, 'la marseillaise', 'musique', '2', 2, 20, 'l\'hymne national', 2);

#------------------------------------------------------------
# Table: Product_physical
#------------------------------------------------------------

CREATE TABLE Product_physical
(
    id_product_physical INT AUTO_INCREMENT NOT NULL,
    quantity            INT                NOT NULL,
    id_warehouse        INT                NOT NULL,
    id_category         INT                NOT NULL,
    PRIMARY KEY (id_product_physical),
    CONSTRAINT product_physical_product_fk FOREIGN KEY (id_product_physical) REFERENCES Product (id_product),
    CONSTRAINT product_physical_warehouse_fk FOREIGN KEY (id_warehouse) REFERENCES Warehouse (id_warehouse),
    CONSTRAINT product_physical_category_fk FOREIGN KEY (id_category) REFERENCES Category (id_category)
) ENGINE = InnoDB;

INSERT INTO Product_physical
VALUES (1, 100, 1, 1);

#------------------------------------------------------------
# Table: Product_dematerialized
#------------------------------------------------------------

CREATE TABLE Product_dematerialized
(
    id_product_dematerialized INT AUTO_INCREMENT NOT NULL,
    size_bytes                BIGINT             NOT NULL,
    id_category               INT                NOT NULL,
    PRIMARY KEY (id_product_dematerialized),
    CONSTRAINT product_dematerialized_product_fk FOREIGN KEY (id_product_dematerialized) REFERENCES Product (id_product),
    CONSTRAINT product_dematerialized_category_fk FOREIGN KEY (id_category) REFERENCES Category (id_category)
) ENGINE = InnoDB;

INSERT INTO Product_dematerialized
VALUES (2, 1000000, 2);

#------------------------------------------------------------
# Table: Comment
#------------------------------------------------------------

CREATE TABLE Comment
(
    id_comment INT AUTO_INCREMENT NOT NULL,
    ETOILE     INT                NOT NULL,
    comment    VARCHAR(500)       NOT NULL,
    comment_at DATE               NOT NULL,
    id_client  INT                NOT NULL,
    id_product INT                NOT NULL,
    PRIMARY KEY (id_comment),
    CONSTRAINT comment_client_fk FOREIGN KEY (id_client) REFERENCES Client (id_client),
    CONSTRAINT comment_product_fk FOREIGN KEY (id_product) REFERENCES Product (id_product)
) ENGINE = InnoDB;


#------------------------------------------------------------
# Table: Media
#------------------------------------------------------------

CREATE TABLE Media
(
    id_media   INT AUTO_INCREMENT NOT NULL,
    url        VARCHAR(50)        NOT NULL,
    type       VARCHAR(200)       NOT NULL,
    id_product INT                NOT NULL,
    PRIMARY KEY (id_media),
    CONSTRAINT media_product_fk FOREIGN KEY (id_product) REFERENCES Product (id_product)
) ENGINE = InnoDB;


#------------------------------------------------------------
# Table: Command
#------------------------------------------------------------

CREATE TABLE Command
(
    id_command       INT AUTO_INCREMENT NOT NULL,
    commanded_at     DATE               NOT NULL,
    command_quantity INT                NOT NULL,
    id_client        INT                NOT NULL,
    id_product       INT                NOT NULL,
    PRIMARY KEY (id_command),
    CONSTRAINT command_product_fk FOREIGN KEY (id_product) REFERENCES Product (id_product),
    CONSTRAINT command_client_fk FOREIGN KEY (id_client) REFERENCES Client (id_client)
) ENGINE = InnoDB;

