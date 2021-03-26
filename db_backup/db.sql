DROP DATABASE IF EXISTS travels;
CREATE DATABASE travels;
USE travels;
SET NAMES utf8;

CREATE TABLE `Category`
(
    `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP    NOT NULL,
    `updated_at` TIMESTAMP    NULL     DEFAULT NULL,
    `name`       VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 6;

INSERT INTO `Category`
VALUES (1, '2021-03-10 21:38:33', '2021-03-10 21:38:33', 'Asie'),
       (2, '2021-03-10 21:38:33', '2021-03-10 21:38:33', 'Europe'),
       (3, '2021-03-10 21:38:33', '2021-03-10 21:38:33', 'Afrique'),
       (4, '2021-03-10 21:38:33', '2021-03-10 21:38:33', 'Océanie'),
       (5, '2021-03-10 21:38:33', '2021-03-10 21:38:33', 'Amérique');

CREATE TABLE `User`
(
    `id`                INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`              VARCHAR(255) NOT NULL,
    `email`             VARCHAR(255) NOT NULL,
    `email_verified_at` TIMESTAMP    NULL DEFAULT NULL,
    `password`          VARCHAR(255) NOT NULL,
    `created_at`        TIMESTAMP    NOT NULL,
    `updated_at`        TIMESTAMP    NULL DEFAULT NULL,
    -- `is_online`  TINYINT(1)   NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
    -- UNIQUE KEY `users_email_unique` (`email`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 4;

-- INSERT INTO `User`
-- VALUES (1, 'Jarod', 'ejilane.jarod@gmail.com', CURRENT_TIMESTAMP(), 'jarod321', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 0),
--        (2, 'Benjamin', 'benjamim@gmail.com', CURRENT_TIMESTAMP(), 'benjamin123', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 0),
--        (3, 'Test', 'test@gmail.com', CURRENT_TIMESTAMP(), 'test', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), 0);
INSERT INTO `User`
VALUES (1, 'Jarod', 'ejilane.jarod@gmail.com', '2021-03-10 21:38:33', 'jarod321', '2021-03-10 21:38:33', '2021-03-10 21:38:33'),
       (2, 'Benjamin', 'benjamim@gmail.com', '2021-03-10 21:38:33', 'benjamin123', '2021-03-10 21:38:33', '2021-03-10 21:38:33'),
       (3, 'Test', 'test@gmail.com', '2021-03-10 21:38:33', 'test', '2021-03-10 21:38:33', '2021-03-10 21:38:33');

CREATE TABLE `Travel`
(
    `id`               INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at`       TIMESTAMP    NOT NULL,
    `updated_at`       TIMESTAMP    NULL DEFAULT NULL,
    `agency`           VARCHAR(255) NOT NULL,
    `destination`      VARCHAR(255) NOT NULL,
    `price_ht`         DOUBLE(8, 2) NOT NULL,
    `price`            DOUBLE(8, 2) NOT NULL,
    `description`      TEXT         NOT NULL,
    `main_photo` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 10;

INSERT INTO `Travel`
VALUES (1, '2021-03-10 21:38:33', '2021-03-10 21:38:33', 'Air Malaysia', 'Voyage en Malaisie',
        1000.00, 1200.99, 'Voyage tah les fou', 'Malaisie.jpg'),
       (2, '2021-03-10 21:38:33', '2021-03-10 21:38:33', 'Air Thailand', 'Voyage en Thaïlande',
        1000.00, 1200.90, 'Voyage tah les fou', 'Thaïlande.jpg'),
       (3, '2021-03-10 21:38:33', '2021-03-10 21:38:33', 'Air China', 'Voyage en Chine',
        1000.00, 1200.00, 'Voyage tah les fou', 'Chine.jpg'),
       (4, '2021-03-10 21:38:33', '2021-03-10 21:38:33', 'Air India', 'Voyage en Inde',
        1000.00, 1200.00, 'Voyage tah les fou', 'Inde.jpg'),
       (5, '2021-03-10 21:38:33', '2021-03-10 21:38:33', 'Air Japan', 'Voyage en Japon',
        1000.00, 1200.00, 'Voyage tah les fou', 'Japon.jpg'),
       (6, '2021-03-10 21:38:33', '2021-03-10 21:38:33', 'Air Algeria', 'Voyage en Algérie',
        1000.00, 1200.00, 'Voyage tah les fou', 'Maroc.jpg'),
       (7, '2021-03-10 21:38:33', '2021-03-10 21:38:33', 'Air Switzerland', 'Voyage en Suisse',
        1000.00, 1200.00, 'Voyage tah les fou', 'Suisse.jpg'),
       (8, '2021-03-10 21:38:33', '2021-03-10 21:38:33', 'Air Taiwan', 'Voyage a Taiwan',
        1000.00, 1200.00, 'Voyage tah les fou', 'Taiwan.jpg'),
       (9, '2021-03-10 21:38:33', '2021-03-10 21:38:33', 'Air Vietnam', 'Voyage en Vietnam',
        1000.00, 1200.00, 'Voyage tah les fou', 'Vietnam.jpg');
