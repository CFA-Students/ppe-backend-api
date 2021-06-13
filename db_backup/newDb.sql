DROP DATABASE IF EXISTS travels;
CREATE DATABASE travels;
USE travels;
SET NAMES utf8;
SET sql_mode = 'ONLY_FULL_GROUP_BY,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

# START OF USER INHERITANCE
CREATE TABLE `User`
(
    `id`       INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `email`    VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name`     VARCHAR(100) NOT NULL,
    `surname`  VARCHAR(100) NOT NULL,
    `phone`    VARCHAR(15)  NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `credentials_unique` (`username`, `email`, `password`)
) ENGINE = InnoDB;

INSERT INTO `User`
VALUES (1, 'e-jarod', 'test@test.com', 'test321', 'Jarod', 'EJILANE', '+33768458663'),
       (2, 'wisem', 'test1@test.com', 'test1', 'Jarod', 'EJILANE', '+33768458663'),
       (3, 'frozenn', 'test2@test.com', 'test2', 'Jarod', 'EJILANE', '+33768458663');

CREATE TABLE `Client`
(
    `id`      INT UNSIGNED NOT NULL,
    `is_male` BOOLEAN      NOT NULL DEFAULT true,
    `address` TEXT         NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

ALTER TABLE `Client`
    ADD CONSTRAINT `fk_client_user_id`
        FOREIGN KEY (`id`)
            REFERENCES User (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION;

INSERT INTO `Client`
    VALUE (1, true, 'Addresse qqc, ville, machin');

CREATE TABLE `Admin`
(
    `id`             INT UNSIGNED NOT NULL,
    `is_super_admin` TINYINT(1)   NOT NULL DEFAULT 0 NOT NULL,
    PRIMARY KEY (`id`)

) ENGINE = InnoDB;

ALTER TABLE `Admin`
    ADD CONSTRAINT `fk_admin_user_id`
        FOREIGN KEY (`id`)
            REFERENCES User (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION;

INSERT INTO `Admin`
    VALUE (2, 1);

CREATE TABLE `Supplier`
(
    `id`            INT UNSIGNED NOT NULL,
    `id_company`    VARCHAR(150) NOT NULL,
    `supplier_name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

ALTER TABLE `Supplier`
    ADD CONSTRAINT `fk_supplier_user_id`
        FOREIGN KEY (`id`)
            REFERENCES User (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION;

INSERT INTO `Supplier`
    VALUE (3, 'id qqc company', 'Un prestataire');
# END OF USER INHERITANCE

CREATE TABLE `Location_category`
(
    `id`            INT UNSIGNED NOT NULL AUTO_INCREMENT,
#     hotel/airport/port/...
    `category_name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE `Location_spot`
(
    `id`                   INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`                 VARCHAR(255) NOT NULL,
    `street_address`       VARCHAR(255) NOT NULL,
    `city`                 VARCHAR(255) NOT NULL,
    `postal_code`          VARCHAR(10)  NOT NULL,
    `country`              VARCHAR(255) NOT NULL,
    `id_location_category` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

ALTER TABLE `Location_spot`
    ADD CONSTRAINT `fk_location_category_id`
        FOREIGN KEY (`id_location_category`)
            REFERENCES Location_category (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION;

CREATE TABLE `Reservation`
(
    `id`                     INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `start_at`               TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `end_at`                 TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `id_location_spot_start` INT UNSIGNED NOT NULL,
    `id_location_spot_end`   INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_location_spot_start`) REFERENCES Location_spot (`id`),
    FOREIGN KEY (`id_location_spot_end`) REFERENCES Location_spot (`id`)
) ENGINE = InnoDB;

ALTER TABLE `Reservation`
    ADD CONSTRAINT `fk_location_spot_start_id`
        FOREIGN KEY (`id_location_spot_start`)
            REFERENCES Location_spot (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION;

ALTER TABLE `Reservation`
    ADD CONSTRAINT `fk_location_spot_end_id`
        FOREIGN KEY (`id_location_spot_end`)
            REFERENCES Location_spot (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION;

CREATE TABLE `Vehicle_category`
(
    `id`            INT UNSIGNED NOT NULL AUTO_INCREMENT,
#     car/bus/train/flight/boat/...
    `category_name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE `Vehicle`
(
    `id`                  INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`                VARCHAR(255) NOT NULL,
    `seats_count`         SMALLINT     NOT NULL,
    `id_reservation`      INT UNSIGNED NOT NULL,
    `id_vehicle_category` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_reservation`) REFERENCES Reservation (`id`),
    FOREIGN KEY (`id_vehicle_category`) REFERENCES Vehicle_category (`id`)
) ENGINE = InnoDB;

CREATE TABLE `Payment`
(
    `id`       INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `price_ht` DOUBLE(8, 2) NOT NULL,
    `price`    DOUBLE(8, 2) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

# START OF 1,N - 1,N TABLES
CREATE TABLE `Perform_reservation`
(
    `id_client`      INT UNSIGNED NOT NULL,
    `id_reservation` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id_client`, `id_reservation`),
    FOREIGN KEY (`id_client`) REFERENCES Client (`id`),
    FOREIGN KEY (`id_reservation`) REFERENCES Reservation (`id`)
) ENGINE = InnoDB;

CREATE TABLE `Execute_payment`
(
    `id_reservation` INT UNSIGNED NOT NULL,
    `id_payment`     INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id_reservation`, `id_payment`),
    FOREIGN KEY (`id_reservation`) REFERENCES Reservation (`id`),
    FOREIGN KEY (`id_payment`) REFERENCES Payment (`id`)
) ENGINE = InnoDB;
# END OF 1,N - 1,N TABLES

# ######
# # TRIGGERS
# ######
#
# # User triggers
#
# DELIMITER $
# CREATE TRIGGER User_trigger_before_insert
#     BEFORE INSERT
#     ON `User`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER User_trigger_after_insert
#     AFTER INSERT
#     ON `User`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER User_trigger_before_update
#     BEFORE UPDATE
#     ON `User`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER User_trigger_after_update
#     AFTER UPDATE
#     ON `User`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER User_trigger_before_delete
#     BEFORE DELETE
#     ON `User`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER User_trigger_after_delete
#     AFTER DELETE
#     ON `User`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
#
# # Client triggers
#
# DELIMITER $
# CREATE TRIGGER Client_trigger_before_insert
#     BEFORE INSERT
#     ON `Client`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Client_trigger_after_insert
#     AFTER INSERT
#     ON `Client`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Client_trigger_before_update
#     BEFORE UPDATE
#     ON `Client`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Client_trigger_after_update
#     AFTER UPDATE
#     ON `Client`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Client_trigger_before_delete
#     BEFORE DELETE
#     ON `Client`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Client_trigger_after_delete
#     AFTER DELETE
#     ON `Client`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
#
# # Admin triggers
#
# DELIMITER $
# CREATE TRIGGER Admin_trigger_before_insert
#     BEFORE INSERT
#     ON `Admin`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Admin_trigger_after_insert
#     AFTER INSERT
#     ON `Admin`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Admin_trigger_before_update
#     BEFORE UPDATE
#     ON `Admin`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Admin_trigger_after_update
#     AFTER UPDATE
#     ON `Admin`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Admin_trigger_before_delete
#     BEFORE DELETE
#     ON `Admin`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Admin_trigger_after_delete
#     AFTER DELETE
#     ON `Admin`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
#
# # Supplier triggers
#
# DELIMITER $
# CREATE TRIGGER Supplier_trigger_before_insert
#     BEFORE INSERT
#     ON `Supplier`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Supplier_trigger_after_insert
#     AFTER INSERT
#     ON `Supplier`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Supplier_trigger_before_update
#     BEFORE UPDATE
#     ON `Supplier`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Supplier_trigger_after_update
#     AFTER UPDATE
#     ON `Supplier`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Supplier_trigger_before_delete
#     BEFORE DELETE
#     ON `Supplier`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Supplier_trigger_after_delete
#     AFTER DELETE
#     ON `Supplier`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
#
# # Location triggers
#
# DELIMITER $
# CREATE TRIGGER Location_trigger_before_insert
#     BEFORE INSERT
#     ON `Location`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Location_trigger_after_insert
#     AFTER INSERT
#     ON `Location`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Location_trigger_before_update
#     BEFORE UPDATE
#     ON `Location`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Location_trigger_after_update
#     AFTER UPDATE
#     ON `Location`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Location_trigger_before_delete
#     BEFORE DELETE
#     ON `Location`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Location_trigger_after_delete
#     AFTER DELETE
#     ON `Location`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
#
# # Location_category triggers
#
# DELIMITER $
# CREATE TRIGGER Location_category_trigger_before_insert
#     BEFORE INSERT
#     ON `Location_category`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Location_category_trigger_after_insert
#     AFTER INSERT
#     ON `Location_category`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Location_category_trigger_before_update
#     BEFORE UPDATE
#     ON `Location_category`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Location_category_trigger_after_update
#     AFTER UPDATE
#     ON `Location_category`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Location_category_trigger_before_delete
#     BEFORE DELETE
#     ON `Location_category`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Location_category_trigger_after_delete
#     AFTER DELETE
#     ON `Location_category`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# # Vehicle_category triggers
#
# DELIMITER $
# CREATE TRIGGER Vehicle_category_trigger_before_insert
#     BEFORE INSERT
#     ON `Vehicle_category`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Vehicle_category_trigger_after_insert
#     AFTER INSERT
#     ON `Vehicle_category`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Vehicle_category_trigger_before_update
#     BEFORE UPDATE
#     ON `Vehicle_category`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Vehicle_category_trigger_after_update
#     AFTER UPDATE
#     ON `Vehicle_category`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Vehicle_category_trigger_before_delete
#     BEFORE DELETE
#     ON `Vehicle_category`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Vehicle_category_trigger_after_delete
#     AFTER DELETE
#     ON `Vehicle_category`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
#
# # Vehicle triggers
#
# DELIMITER $
# CREATE TRIGGER Vehicle_trigger_before_insert
#     BEFORE INSERT
#     ON `Vehicle`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Vehicle_trigger_after_insert
#     AFTER INSERT
#     ON `Vehicle`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Vehicle_trigger_before_update
#     BEFORE UPDATE
#     ON `Vehicle`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Vehicle_trigger_after_update
#     AFTER UPDATE
#     ON `Vehicle`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Vehicle_trigger_before_delete
#     BEFORE DELETE
#     ON `Vehicle`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Vehicle_trigger_after_delete
#     AFTER DELETE
#     ON `Vehicle`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
#
# # Payment triggers
#
# DELIMITER $
# CREATE TRIGGER Payment_trigger_before_insert
#     BEFORE INSERT
#     ON `Payment`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Payment_trigger_after_insert
#     AFTER INSERT
#     ON `Payment`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Payment_trigger_before_update
#     BEFORE UPDATE
#     ON `Payment`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Payment_trigger_after_update
#     AFTER UPDATE
#     ON `Payment`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Payment_trigger_before_delete
#     BEFORE DELETE
#     ON `Payment`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Payment_trigger_after_delete
#     AFTER DELETE
#     ON `Payment`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
#
# # Perform_reservation triggers
#
# DELIMITER $
# CREATE TRIGGER Perform_reservation_trigger_before_insert
#     BEFORE INSERT
#     ON `Perform_reservation`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Perform_reservation_trigger_after_insert
#     AFTER INSERT
#     ON `Perform_reservation`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Perform_reservation_trigger_before_update
#     BEFORE UPDATE
#     ON `Perform_reservation`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Perform_reservation_trigger_after_update
#     AFTER UPDATE
#     ON `Perform_reservation`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Perform_reservation_trigger_before_delete
#     BEFORE DELETE
#     ON `Perform_reservation`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Perform_reservation_trigger_after_delete
#     AFTER DELETE
#     ON `Perform_reservation`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
#
# # Execute_payment triggers
#
# DELIMITER $
# CREATE TRIGGER Execute_payment_trigger_before_insert
#     BEFORE INSERT
#     ON `Execute_payment`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Execute_payment_trigger_after_insert
#     AFTER INSERT
#     ON `Execute_payment`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Execute_payment_trigger_before_update
#     BEFORE UPDATE
#     ON `Execute_payment`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Execute_payment_trigger_after_update
#     AFTER UPDATE
#     ON `Execute_payment`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Execute_payment_trigger_before_delete
#     BEFORE DELETE
#     ON `Execute_payment`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
# DELIMITER $
# CREATE TRIGGER Execute_payment_trigger_after_delete
#     AFTER DELETE
#     ON `Execute_payment`
#     FOR EACH ROW
# BEGIN
#     # @TODO:
# END $
# DELIMITER ;
