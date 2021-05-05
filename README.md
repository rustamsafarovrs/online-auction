# Online Auction
Simple web application simulating auction. Using Spring Boot, Spring Data, Angular

## System description
The system is built following the web browser/REST server architecture. The architecture is presented in the following figure:


![architecture](https://github.com/rustamsafarovrs/online-auction/blob/master/angular-spring-boot.png?raw=true)


A MySQL database was used as a persistence storage. The back-end is developed in Java.
The Hibernate ORM framework was employed for the Data Access Layer and Spring MVC for the REST API.
The REST API is secured with token-based authentication, implemented using Spring security.
The front-end was written in Angular.


## Deployment instruction

### Database

1. Create a user in MySQL with full privileges
2. Edit the file /back-end/auction/src/main/resources/application.properties to add your user's username and password.
3. Import initial-data.sql MySQL dump file that is located in the folder /back-end/auction/. In this way, a database with name "auction" will be created, containing some sample auction data.

### Server

1. Build the project in /back-end/auction by running the command "mvn build".

### Client

1. In command line go to folder /front-end/online-auction
2. Run npm install
3. Run 

## Technologies
- Spring Boot
- Spring Data
- Spring Security
- HTML (bootstrap)
- SCSS
- JS (Angular)
