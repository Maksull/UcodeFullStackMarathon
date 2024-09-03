CREATE DATABASE ucode_web;

CREATE USER 'myuhov' @'localhost' IDENTIFIED BY 'securepass';

GRANT ALL ON ucode_web.* TO 'myuhov' @'localhost';