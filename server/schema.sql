CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  tweet VARCHAR(255) NOT NULL,
  roomname VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

