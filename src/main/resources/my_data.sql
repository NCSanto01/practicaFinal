-- Insertando algunos registros para que la base de datos no este vacia

INSERT INTO ORDERS (USER_ID,ORDER_DATE,SYMBOL,AMOUNT,BUY, PRICE) VALUES (1,'1996-09-18','BTCUSDT',1.12, 1,30000);
INSERT INTO ORDERS (USER_ID,ORDER_DATE,SYMBOL,AMOUNT,BUY, PRICE) VALUES (1,'1996-09-18','ETHUSDT',3.5, 1, 2000);
INSERT INTO ORDERS (USER_ID,ORDER_DATE,SYMBOL,AMOUNT,BUY, PRICE) VALUES (1,'1996-09-18','LTCUSDT',4, 1, 60);

INSERT INTO ORDERS (USER_ID,ORDER_DATE,SYMBOL,AMOUNT,BUY, PRICE) VALUES (2,'1996-09-18','BTCUSDT',0.32, 1, 30000);
INSERT INTO ORDERS (USER_ID,ORDER_DATE,SYMBOL,AMOUNT,BUY, PRICE) VALUES (2,'1996-09-18','ETHUSDT',1.78, 1, 2000);
INSERT INTO ORDERS (USER_ID,ORDER_DATE,SYMBOL,AMOUNT,BUY, PRICE) VALUES (2,'1996-09-18','LTCUSDT',3.2, 1, 60);

INSERT INTO USERS (USERNAME,EMAIL,PASSWORD) VALUES ('user1','user1@example.com','{noop}querty123');
INSERT INTO USERS (USERNAME,EMAIL,PASSWORD) VALUES ('user2','user2@example.com','{noop}querty456');

INSERT INTO ACCOUNTS (USER_ID, SYMBOL, AMOUNT) VALUES (1, 'BTCUSDT', 1.12);
INSERT INTO ACCOUNTS (USER_ID, SYMBOL, AMOUNT) VALUES (1, 'ETHUSDT', 3.5);
INSERT INTO ACCOUNTS (USER_ID, SYMBOL, AMOUNT) VALUES (1, 'LTCUSDT', 4);
INSERT INTO ACCOUNTS (USER_ID, SYMBOL, AMOUNT) VALUES (1, 'USDT', 2500);


INSERT INTO ACCOUNTS (USER_ID, SYMBOL, AMOUNT) VALUES (2, 'BTCUSDT', 0.32);
INSERT INTO ACCOUNTS (USER_ID, SYMBOL, AMOUNT) VALUES (2, 'ETHUSDT', 1.78);
INSERT INTO ACCOUNTS (USER_ID, SYMBOL, AMOUNT) VALUES (2, 'LTCUSDT', 3.2);
INSERT INTO ACCOUNTS (USER_ID, SYMBOL, AMOUNT) VALUES (2, 'USDT', 1000);




