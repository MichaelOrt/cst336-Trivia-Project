-- MySQL dump 10.13  Distrib 5.5.62, for Linux (x86_64)
--
-- Host: 0.0.0.0    Database: Trivia
-- ------------------------------------------------------
-- Server version	5.5.62

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Quiz_Taken`
--

DROP TABLE IF EXISTS `Quiz_Taken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Quiz_Taken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `quiz_name` varchar(100) NOT NULL,
  `score` varchar(100) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Quiz_Taken`
--

LOCK TABLES `Quiz_Taken` WRITE;
/*!40000 ALTER TABLE `Quiz_Taken` DISABLE KEYS */;
INSERT INTO `Quiz_Taken` VALUES (2,'michael','Entertainment: Books','12/23','2020-05-03'),(3,'michael','Random Trivia','2/6','2020-05-03'),(4,'michael','Random Trivia','13/24','2020-05-03'),(5,'michael','Random Trivia','9/13','2020-05-03'),(6,'michael','Random Trivia','1/2','2020-05-03'),(7,'michael','Random Trivia','6/14','2020-05-03'),(8,'michael','Random Trivia','5/13','2020-05-03'),(9,'michael','Random Trivia','4/7','2020-05-03'),(10,'michael','Entertainment: Books','7/10','2020-05-03'),(11,'michael','Vehicles','1/1','2020-05-03'),(12,'undefined','History','5/5','2020-05-03'),(13,'michael','Random Trivia','1/1','2020-05-03');
/*!40000 ALTER TABLE `Quiz_Taken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friends` (
  `userId` int(10) NOT NULL AUTO_INCREMENT,
  `friend` varchar(100) NOT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pending_request`
--

DROP TABLE IF EXISTS `pending_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pending_request` (
  `requestId` int(11) NOT NULL AUTO_INCREMENT,
  `receiver` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  PRIMARY KEY (`requestId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pending_request`
--

LOCK TABLES `pending_request` WRITE;
/*!40000 ALTER TABLE `pending_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `pending_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `score` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'michael','$2b$10$cs30XhTdgoYl2eY5JFq8vOHqKZheXH/SOYGuZRPiHM2M1wmWjkWhC','mike@gmail.com',276),(4,'mike','$2b$10$1b6UYl7E8rrqZAjQjkcrSelJqrjAQ5UvWvEoe3d8e2ZRlzHmhD1Nm','mike@gmail.com',0),(5,'mm','$2b$10$iBL.vGVCxyfJxTO2Joygf.0LY6midjKmnP/eNpmbNIXbXwOI24I3.','mm@gmail.com',0),(6,'mk','$2b$10$4Nz2hKDHKky9puV4DWmZXegpTF.LackFqQdH0rXHJAtECS5sxTPVm','mk@gmail.com',0),(7,'mikey','$2b$10$0GKYpuZnO11zerrPK6wws.QyfF5FZHOOhCVzc0HaLrcwMOCNkd1kC','mikey@csumb',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-03 23:48:51
