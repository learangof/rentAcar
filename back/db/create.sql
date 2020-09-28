create database rentAcar;
use rentAcar;

create table users (
Uid int not null auto_increment,
fname varchar(255),
lname varchar(255),
phone int(10),
email varchar(255) unique,
pass varchar(255),
type set('A','U'),
deleted boolean default FALSE,
primary key(Uid)
);

create table cars (
Cid int not null auto_increment,
model int(4),
price int,
deleted boolean default FALSE,
type varchar(255),
primary key(Cid)
);

create table bookings(
Bid int not null auto_increment,
request set('A','R','N') default 'N',
total int,
Uid int,
deleted boolean default FALSE,
primary key(Bid),
foreign key(Uid) references users(Uid)
);

create table car_booking(
Bid int,
Cid int,
cDate date default NOW(),
Ddate date default (NOW() + INTERVAL 1 DAY),
foreign key(Bid) references bookings(Bid),
foreign key(Cid) references cars(Cid)
);

delimiter $$
create procedure create_booking (in customer int, in car int, in total int, in collect_date date, in drop_date date)
begin
DECLARE booking INT DEFAULT 0;

INSERT INTO bookings (Uid,total)VALUES (customer,total);

SET booking = LAST_INSERT_ID();

INSERT INTO car_booking (Bid,Cid,cDate,Ddate)VALUES (booking,car,collect_date,drop_date);
end $$
delimiter ;

INSERT INTO `rentacar`.`users`
(`fname`,
`lname`,
`phone`,
`email`,
`pass`,
`type`)
VALUES
('admin','admin',000,'admin','123','A'),
('luis','arango',000,'luis','123','U');



INSERT INTO `rentacar`.`cars`
(`model`,
`price`,
`type`)
VALUES
(2005,2000,'Sedan'),
(2010,3000,'Truck'),
(2000,500,'Sedan');

INSERT INTO `rentacar`.`bookings`
(`total`,
`Uid`)
VALUES
(2000,2),
(3000,2),
(500,2);
INSERT INTO `rentacar`.`car_booking`
(`Bid`,
`Cid`)
VALUES
(1,1),
(2,2),
(3,3);

select * from bookings B 
left join car_booking CB on CB.Bid = B.Bid
left join cars C on C.Cid = CB.Cid
left join users U on U.Uid = B.Uid
where B.deleted = 0; 

select * from cars C
left join car_booking CB on  CB.Cid = C.Cid
where CB.Cid is null or CB.cDate not between '2020-09-25' and '2020-09-26'; 

update bookings set request = "N";

select * from users;

update users set deleted = 0;


