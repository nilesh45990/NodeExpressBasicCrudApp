create table product(id int primary key auto_increment,
name varchar(50),
price double,
image varchar(200),
description varchar(500),createdBy int,createdDate date, updatedBy int,updatedDate date);