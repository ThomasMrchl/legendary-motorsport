-- Table creation
CREATE TABLE adress (
    id_adress INT PRIMARY KEY AUTO_INCREMENT,
    country VARCHAR(45),
    postal_code INT,
    street LONGTEXT,
    street_number INT
);
CREATE TABLE user (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(45),
    last_name VARCHAR(45),
    birth_date DATE,
    adress INT,
    email LONGTEXT,
    password LONGTEXT,
    is_employee TINYINT,
    role LONGTEXT,
    yearly_salary LONGTEXT,
    FOREIGN KEY (adress) REFERENCES adress(id_adress)
);
CREATE TABLE franchise (
    id_franchise INT PRIMARY KEY AUTO_INCREMENT,
    franchise_adress INT,
    franchise_owner INT,
    franchise_capacity INT,
    franchise_name VARCHAR(100),   
    franchise_phone_number VARCHAR(20), 
    franchise_opening_year INT,  
    FOREIGN KEY (franchise_adress) REFERENCES adress(id_adress),
    FOREIGN KEY (franchise_owner) REFERENCES user(id_user)
);
CREATE TABLE car (
    id_car INT PRIMARY KEY AUTO_INCREMENT,
    franchise INT,
    status VARCHAR(45),
    color VARCHAR(45),
    mileage INT,
    conditions VARCHAR(45),
    buyout_price INT,
    first_price INT,
    latest_price INT,
    buyer INT,
    model LONGTEXT,
    brand VARCHAR(45),
    engine LONGTEXT,
    horsepower INT,
    final_owner INT,
    FOREIGN KEY (franchise) REFERENCES franchise(id_franchise),
    FOREIGN KEY (buyer) REFERENCES user(id_user),
    FOREIGN KEY (final_owner) REFERENCES user(id_user)
);

-- Database population
INSERT INTO `legendarymotorsport`.`adress` (`country`, `postal_code`, `street`, `street_number`)
VALUES
('USA', 90210, 'Beverly Hills', 123),
('France', 75001, 'Rue de Rivoli', 10),
('Germany', 10115, 'Unter den Linden', 55),
('Spain', 28013, 'Gran Vía', 1),
('Italy', 00184, 'Via dei Fori Imperiali', 25),
('Canada', 09811, 'Robson Street', 145),
('UK', 71616, 'Downing Street', 10),
('Australia', 2000, 'George Street', 35),
('Japan', 100-0001, 'Chiyoda', 3),
('Brazil', 01000-000, 'Avenida Paulista', 120);

INSERT INTO `legendarymotorsport`.`user` (`first_name`, `last_name`, `birth_date`, `adress`, `email`, `password`, `is_employee`, `role`, `yearly_salary`)
VALUES
('John', 'Doe', '1980-05-15', 1, 'john.doe@example.com', SHA2('password123',256), 1, 'Manager', '60000'),
('Jane', 'Smith', '1990-07-20', 2, 'jane.smith@example.com', SHA2('password133',256), 0, 'Customer', NULL),
('Alex', 'Johnson', '1985-09-12', 3, 'alex.johnson@example.com', SHA2('password623',256), 1, 'Sales', '45000'),
('Emily', 'Davis', '1995-03-25', 4, 'emily.davis@example.com', SHA2('password1243',256), 0, 'Customer', NULL),
('Michael', 'Wilson', '1978-11-30', 5, 'michael.wilson@example.com', SHA2('pasord123',256), 1, 'Technician', '50000'),
('Olivia', 'Brown', '1992-08-10', 6, 'olivia.brown@example.com', SHA2('passw2424d123',256), 1, 'HR', '55000'),
('William', 'Taylor', '1983-02-17', 7, 'william.taylor@example.com', SHA2('pas65ord123',256), 0, 'Customer', NULL),
('Sophia', 'Anderson', '1988-12-05', 8, 'sophia.anderson@example.com', SHA2('physword123',256), 1, 'Manager', '65000'),
('James', 'Thomas', '1975-01-22', 9, 'james.thomas@example.com', SHA2('passwor7623',256), 1, 'CEO', '100000'),
('Isabella', 'Moore', '2000-06-08', 10, 'isabella.moore@example.com', SHA2('p4word123',256), 0, 'Customer', NULL);

INSERT INTO `legendarymotorsport`.`franchise` (`franchise_adress`, `franchise_owner`, `franchise_capacity`, `franchise_name`, `franchise_phone_number`, `franchise_opening_year`)
VALUES
(1, 1, 50, 'Beverly Hills Auto', '310-555-1234', 2005),
(5, 9, 100, 'Imperial Motors', '06-555-9876', 2010),
(7, 3, 75, 'London Luxury Cars', '020-555-4567', 2012);

INSERT INTO `legendarymotorsport`.`car` (`franchise`, `status`, `color`, `mileage`, `conditions`, `buyout_price`, `first_price`, `latest_price`, `buyer`, `model`, `brand`, `engine`, `horsepower`, `final_owner`)
VALUES
(1, 'available', 'red', 20000, 'used', 15000, 20000, 18000, 2, 'Model S', 'Tesla', 'Electric', 670, NULL),
(2, 'sold', 'blue', 15000, 'used', 18000, 22000, 19000, 4, 'Mustang', 'Ford', 'V8', 450, 4),
(3, 'available', 'black', 30000, 'used', 12000, 16000, 15000, NULL, 'Civic', 'Honda', 'V4', 180, NULL),
(1, 'available', 'white', 10000, 'new', 40000, 50000, 48000, NULL, 'Corvette', 'Chevrolet', 'V8', 495, NULL),
(2, 'sold', 'green', 25000, 'used', 10000, 13000, 11000, 6, 'Golf', 'Volkswagen', 'V4', 170, 6),
(3, 'available', 'silver', 5000, 'new', 35000, 42000, 40000, NULL, 'Model 3', 'Tesla', 'Electric', 480, NULL),
(1, 'available', 'yellow', 8000, 'new', 45000, 48000, 47000, NULL, 'Camaro', 'Chevrolet', 'V6', 335, NULL),
(2, 'sold', 'blue', 2000, 'new', 60000, 62000, 61000, 8, 'Charger', 'Dodge', 'V8', 707, 8),
(3, 'available', 'red', 10000, 'new', 55000, 58000, 57000, NULL, 'Mustang', 'Ford', 'V8', 450, NULL),
(1, 'available', 'black', 3000, 'new', 70000, 75000, 74000, NULL, '911', 'Porsche', 'V6', 443, NULL);
