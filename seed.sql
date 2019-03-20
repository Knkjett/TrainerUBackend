DROP DATABASE IF EXISTS utrainer;
CREATE DATABASE utrainer;

\c utrainer;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  token VARCHAR NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
);

CREATE TABLE shop (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  bio VARCHAR NOT NULL,
  socialmedia VARCHAR,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  shop_id INT REFERENCES shop(id),
  name VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  image_url_ARRAY [],
  price REAL NOT NULL,
  type VARCHAR NOT NULL,
  item_size VARCHAR,
  gender VARCHAR,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
);

CREATE TABLE order (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  address VARCHAR NOT NULL,
  address2 VARCHAR NOT NULL,
  city VARCHAR NOT NULL,
  zipcode INT NOT NULL,
  total_amount REAL NOT NULL,
  payment_token VARCHAR NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
);
CREATE TABLE order_item (
  id SERIAL PRIMARY KEY,
  shop_id INT REFERENCES shop(id),
  order_id INT REFERENCES order(id),
  product_id INT REFERENCES products(id),
  amount INT NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
);

INSERT INTO users (name, email,token) VALUES
('John', 'smith@email.com','testtoken'), ('Jane', 'doe@email.com','123'),('Taq','taq@email.com','4321');

INSERT INTO shop (name, bio, socialmeda) VALUES
('JohnLifts', 'Lifting stuff', 'instagram.com/knkjett'),('KickBoxing 101','Kickboxing professional and 3 time winner of WMMA, Jane','');

INSERT INTO products (shop_id, name,description, image_url_array, price,type,gender) VALUES
('1','Biceps all day','Best biceps workouts you can do throughout the day',ARRAY [''],20.00,'Lesson','',''),('2','Kickboxing core','Core of Kickboxing', ARRAY[''],39.99,'Lesson','Gender Neutral'), ('1','BicepTightShirt','Best T-shirt to show off bicep gains',ARRAY[''],13.99,'Wearable','Gender Neutral');

INSERT INTO order (user_id, address, address2, city, zipcode, total_amount, payment_token) VALUES
('3','123 fake street', '2nd Fl', 'Flushing','11364',13.99, 'sptoken')

INSERT INTO order_item (shop_id, order_id, product_id, amount) VALUES
(1,1,3,10)



