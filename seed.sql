DROP DATABASE IF EXISTS traineru;
CREATE DATABASE traineru;

\c traineru;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  token VARCHAR NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE shop (
  id SERIAL PRIMARY KEY,
  owner INT REFERENCES users(id),
  name VARCHAR NOT NULL,
  bio TEXT,
  picture TEXT,
  socialmedia VARCHAR,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  shop_id INT REFERENCES shop(id),
  name VARCHAR NOT NULL,
  description TEXT NOT NULL,
  image_url_ARRAY TEXT [],
  price REAL NOT NULL,
  type VARCHAR NOT NULL,
  option VARCHAR,
  available BOOLEAN,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orderlist (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  address VARCHAR NOT NULL,
  address2 VARCHAR,
  city VARCHAR NOT NULL,
  zipcode INT NOT NULL,
  total_amount REAL NOT NULL,
  payment_token VARCHAR NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
CREATE TABLE order_item (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  shop_id INT REFERENCES shop(id),
  order_id INT REFERENCES orderlist(id),
  product_id INT REFERENCES products(id),
  amount INT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (email,token) VALUES
('johnsmith@email.com','testtoken'), 
('janedoe@email.com','123'),
('taq@email.com','4321');

INSERT INTO shop (owner ,name, bio, picture, socialmedia) VALUES
(1,'JohnLifts', 'Lifting stuff','', 'instagram.com/knkjett'),
(2,'KickBoxing 101','Kickboxing professional and 3 time winner of WMMA, Jane','','');

INSERT INTO products (shop_id, name,description, image_url_array, price, type, option, available) VALUES
('1','Biceps all day','Best biceps workouts you can do throughout the day',ARRAY [''],20.00,'lesson','', true),
('2','Kickboxing core','Core of Kickboxing', ARRAY[''],39.99,'lesson','Gender Neutral', true), 
('1','Bicep Tight Shirt','Best T-shirt to show off bicep gains',ARRAY[''],13.99,'wearable','Gender Neutral', true);

INSERT INTO orderlist (user_id, address, address2, city, zipcode, total_amount, payment_token) VALUES
('3','123 fake street', '2nd Fl', 'Flushing','11364',13.99, 'sptoken');

INSERT INTO order_item (user_id shop_id, order_id, product_id, amount) VALUES
(1,1,1,3,8);


