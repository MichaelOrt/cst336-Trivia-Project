-- Adminer 4.7.6 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `Trivia`;
CREATE DATABASE `Trivia` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `Trivia`;

DROP TABLE IF EXISTS `friends`;
CREATE TABLE `friends` (
  `userId` int(10) NOT NULL AUTO_INCREMENT,
  `friend` varchar(100) NOT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `Quiz_Taken`;
CREATE TABLE `Quiz_Taken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` int(10) NOT NULL,
  `quiz_name` varchar(100) NOT NULL,
  `score` double NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `username` (`username`),
  CONSTRAINT `Quiz_Taken_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- 2020-05-02 00:45:42
