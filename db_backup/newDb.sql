DROP DATABASE IF EXISTS travels;
CREATE DATABASE travels;
USE travels;
SET NAMES utf8;

CREATE TABLE `User`
(
    `id`                INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`              VARCHAR(255) NOT NULL,
    `email`             VARCHAR(255) NOT NULL,
    `email_verified_at` TIMESTAMP    NULL     DEFAULT NULL,
    `password`          VARCHAR(255) NOT NULL,
    `created_at`        TIMESTAMP    NOT NULL,
    `updated_at`        TIMESTAMP    NULL     DEFAULT NULL,
    `is_online`         TINYINT(1)   NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE KEY `users_email_unique` (`email`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4;

INSERT INTO `User`
VALUES (1, 'Jarod', 'ejilane.jarod@gmail.com', '2021-03-10 21:38:33', 'jarod321', '2021-03-10 21:38:33',
        '2021-03-10 21:38:33', 0),
       (2, 'Benjamin', 'benjamim@gmail.com', '2021-03-10 21:38:33', 'benjamin123', '2021-03-10 21:38:33',
        '2021-03-10 21:38:33', 1),
       (3, 'Test', 'test@gmail.com', '2021-03-10 21:38:33', 'test', '2021-03-10 21:38:33', '2021-03-10 21:38:33', 0);

CREATE TABLE `Supplier`
(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4;

CREATE TABLE `Admin`
(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4;

CREATE TABLE `Client`
(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4;

CREATE TABLE `Perform`
(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4;

CREATE TABLE `Reservation`
(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4;

CREATE TABLE `Vehicle`
(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4;

CREATE TABLE `Execute`
(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4;

CREATE TABLE `Payment`
(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4;