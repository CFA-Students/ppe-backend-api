DROP DATABASE IF EXISTS travels;
CREATE DATABASE travels;
USE travels;
SET NAMES utf8;

CREATE TABLE `User`
(
    `id`                INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `username`          VARCHAR(255) NOT NULL,
    `password`          VARCHAR(255) NOT NULL,
    `name`              VARCHAR(100) NOT NULL,
    `surname`           VARCHAR(100) NOT NULL,
    `email`             VARCHAR(255) NOT NULL,
    `tel`               VARCHAR(15)  NOT NULL,
    `created_at`        TIMESTAMP    NOT NULL,
    `email_verified_at` TIMESTAMP    NULL     DEFAULT NULL,
    `updated_at`        TIMESTAMP    NULL     DEFAULT NULL,
    `is_online`         TINYINT(1)   NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE KEY `users_email_unique` (`email`)
) ENGINE = InnoDB;

CREATE TABLE `Supplier`
(
    `id`      INT UNSIGNED PRIMARY KEY NOT NULL REFERENCES User (`id`),
    `name`    VARCHAR(100)             NOT NULL,
    `surname` VARCHAR(100)             NOT NULL
) ENGINE = InnoDB;

CREATE TABLE `Admin`
(
    `id` INT UNSIGNED PRIMARY KEY NOT NULL REFERENCES User (`id`)
) ENGINE = InnoDB;

CREATE TABLE `Client`
(
    `id` INT UNSIGNED PRIMARY KEY NOT NULL REFERENCES User (`id`)
) ENGINE = InnoDB;

CREATE TABLE `Reservation`
(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE `Perform`
(
    `id_client`      INT UNSIGNED NOT NULL,
    `id_reservation` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id_client`, `id_reservation`),
    FOREIGN KEY (`id_client`) REFERENCES Client (`id`),
    FOREIGN KEY (`id_reservation`) REFERENCES Reservation (`id`)
) ENGINE = InnoDB;

# 1,N
CREATE TABLE `Payment`
(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

# 1,N
CREATE TABLE `Execute`
(
    `id_reservation` INT UNSIGNED NOT NULL,
    `id_payment`     INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id_reservation`, `id_payment`),
    FOREIGN KEY (`id_reservation`) REFERENCES Reservation (`id`),
    FOREIGN KEY (`id_payment`) REFERENCES Payment (`id`)
) ENGINE = InnoDB;

CREATE TABLE `Vehicle`
(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;