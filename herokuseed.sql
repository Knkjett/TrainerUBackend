CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  token VARCHAR NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE shop (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  bio VARCHAR,
  socialmedia VARCHAR,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  shop_id INT REFERENCES shop(id),
  name VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  image_url_ARRAY TEXT [],
  price REAL NOT NULL,
  type VARCHAR NOT NULL,
  item_size VARCHAR,
  gender VARCHAR,
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
  shop_id INT REFERENCES shop(id),
  order_id INT REFERENCES orderlist(id),
  product_id INT REFERENCES products(id),
  amount INT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);


