create database dashboard;

use dashboard;

create table users(
user_id int primary key auto_increment,
name varchar (255),
lastname varchar (255),
email varchar (255) unique key,
password varchar (255)
);

create table projects(
project_id int primary key auto_increment,
name varchar (255),
description varchar (255),
User_id int,
constraint projects_user_id_foreign foreign key (User_id) references users (user_id)
);

create table tasks(
task_id int primary key auto_increment,
title varchar (255),
status varchar (255) default 'desenvolvimento',
Project_Id int,
User_Id int,
constraint tasks_user_id_foreign foreign key (User_Id) references users (user_id),
constraint tasks_project_id_foreign foreign key (Project_id) references projects (project_id) 
);

select *from users;
select *from projects;
select *from tasks;

describe users;
describe projects;
describe tasks;

select name from projects where User_id = '1';
