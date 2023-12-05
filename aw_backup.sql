-- MySQL dump 10.13  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: localhost    Database: adoptionwebsite
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendevent`
--

DROP TABLE IF EXISTS `attendevent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendevent` (
  `attendeventID` int NOT NULL AUTO_INCREMENT,
  `eventFK` int NOT NULL,
  `memberFK` int NOT NULL,
  PRIMARY KEY (`attendeventID`),
  KEY `AEE_ID_idx` (`eventFK`),
  KEY `AEM_ID_idx` (`memberFK`),
  CONSTRAINT `AEE_ID` FOREIGN KEY (`eventFK`) REFERENCES `events` (`eventID`),
  CONSTRAINT `AEM_ID` FOREIGN KEY (`memberFK`) REFERENCES `members` (`memberID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendevent`
--

LOCK TABLES `attendevent` WRITE;
/*!40000 ALTER TABLE `attendevent` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendevent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendworkshop`
--

DROP TABLE IF EXISTS `attendworkshop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendworkshop` (
  `attendworkshopID` int NOT NULL AUTO_INCREMENT,
  `workshopFK` int NOT NULL,
  `memberFK` int NOT NULL,
  PRIMARY KEY (`attendworkshopID`),
  KEY `AWW_ID_idx` (`workshopFK`),
  KEY `AWM_ID_idx` (`memberFK`),
  CONSTRAINT `AWM_ID` FOREIGN KEY (`memberFK`) REFERENCES `members` (`memberID`) ON UPDATE CASCADE,
  CONSTRAINT `AWW_ID` FOREIGN KEY (`workshopFK`) REFERENCES `workshops` (`workshopID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendworkshop`
--

LOCK TABLES `attendworkshop` WRITE;
/*!40000 ALTER TABLE `attendworkshop` DISABLE KEYS */;
INSERT INTO `attendworkshop` VALUES (2,1,3);
/*!40000 ALTER TABLE `attendworkshop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cartID` int NOT NULL AUTO_INCREMENT,
  `totalCost` decimal(10,2) NOT NULL DEFAULT '0.00',
  `totalItems` int NOT NULL DEFAULT '0',
  `memberFK` int DEFAULT NULL,
  PRIMARY KEY (`cartID`),
  UNIQUE KEY `memberFK_UNIQUE` (`memberFK`),
  CONSTRAINT `memberFK` FOREIGN KEY (`memberFK`) REFERENCES `members` (`memberID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,0.00,0,1),(2,0.00,0,2),(3,0.00,0,3),(4,0.00,0,4),(5,0.00,0,5);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartitems`
--

DROP TABLE IF EXISTS `cartitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartitems` (
  `cartitemsID` int NOT NULL AUTO_INCREMENT,
  `cartFK` int NOT NULL,
  `itemFK` int NOT NULL,
  `item_quantity` int NOT NULL,
  PRIMARY KEY (`cartitemsID`),
  KEY `CII_ID_idx` (`itemFK`),
  KEY `CIC_ID_idx` (`cartFK`),
  CONSTRAINT `CIC_ID` FOREIGN KEY (`cartFK`) REFERENCES `cart` (`cartID`),
  CONSTRAINT `CII_ID` FOREIGN KEY (`itemFK`) REFERENCES `items` (`ItemID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartitems`
--

LOCK TABLES `cartitems` WRITE;
/*!40000 ALTER TABLE `cartitems` DISABLE KEYS */;
INSERT INTO `cartitems` VALUES (2,3,1,1),(3,1,2,4),(9,1,1,1),(10,1,3,1);
/*!40000 ALTER TABLE `cartitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employeeID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `Datejoined` date NOT NULL,
  PRIMARY KEY (`employeeID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'aa','aa','$2b$08$eEtZpUL7TeeOfxT/D9mrz.9VYTpxZw0M/YGgiibowBaK4rEo1QdnK','2023-11-29');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `eventID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `desc` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  `ES_FK` int DEFAULT NULL,
  PRIMARY KEY (`eventID`),
  KEY `ES_ID_idx` (`ES_FK`),
  CONSTRAINT `ES_ID` FOREIGN KEY (`ES_FK`) REFERENCES `shelters` (`shelterID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Pet Adoption Fair','Join us for a day of pet adoptions!','2023-05-15 00:00:00',1),(2,'Dog Training Workshop','Learn basic dog training techniques.','2023-06-01 00:00:00',1),(3,'Golden Retriever Meet Up','Open to all pet owners with Golden Retrievers! Come and meet other similiar pet owners!','2023-12-06 18:00:00',2),(4,'aaa','aaa','2023-12-06 22:00:00',3);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `ItemID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `item_type` char(45) NOT NULL,
  `quantity` int NOT NULL,
  `IS_FK` int DEFAULT NULL,
  PRIMARY KEY (`ItemID`),
  KEY `IS_ID_idx` (`IS_FK`),
  CONSTRAINT `IS_ID` FOREIGN KEY (`IS_FK`) REFERENCES `shelters` (`shelterID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'Tuffy\'s Dry Doy food (40 lbs)',43.99,'Dog Food',10,1),(2,'KONG - Goodie Bone (Large, Red)',27.50,'Doy Toy',10,1),(3,'Heybly Cat Tree Cat Tower',79.99,'Cat Bed',4,1),(4,'Tuffy\'s Dry Doy food (40 lbs)',43.99,'Dog Food',10,2),(5,'Tuffy\'s Dry Doy food (40 lbs)',43.99,'Dog Food',5,3),(6,'Flying Saucer Ball',13.99,'Doy Toy',10,1);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `memberID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `Datejoined` date NOT NULL,
  PRIMARY KEY (`memberID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'1','1','$2b$08$8n/gjyM.kltsjF4H0P2DEORI9EA0.CS/nCmcZGUOVabUf3i5rStcu','2023-12-01'),(2,'2','2','$2b$08$8n/gjyM.kltsjF4H0P2DEORI9EA0.CS/nCmcZGUOVabUf3i5rStcu','2023-12-01'),(3,'a','a','$2b$08$8n/gjyM.kltsjF4H0P2DEORI9EA0.CS/nCmcZGUOVabUf3i5rStcu','2023-11-29'),(4,'b','b','$2b$08$jgJ2WdqJBS4XafHxz1WlsO/kL2GnpQ1.irG4q3ogFn/DBcp513lOO','2023-12-01'),(5,'c','c','$2b$08$qz2G9I4tN5y5C/skjURV4e1uGTHZLUs5jMKnuXvIbLLVLotBZsbvG','2023-12-01');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pets`
--

DROP TABLE IF EXISTS `pets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pets` (
  `petID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `pet_type` char(45) NOT NULL,
  `age` int NOT NULL,
  `desc` varchar(100) NOT NULL,
  `PS_FK` int DEFAULT NULL,
  `PM_FK` int DEFAULT NULL,
  PRIMARY KEY (`petID`),
  KEY `s_ID_idx` (`PS_FK`),
  KEY `PM_ID_idx` (`PM_FK`),
  CONSTRAINT `PM_ID` FOREIGN KEY (`PM_FK`) REFERENCES `members` (`memberID`),
  CONSTRAINT `PS_ID` FOREIGN KEY (`PS_FK`) REFERENCES `shelters` (`shelterID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pets`
--

LOCK TABLES `pets` WRITE;
/*!40000 ALTER TABLE `pets` DISABLE KEYS */;
INSERT INTO `pets` VALUES (1,'Clifford','mammal',10,'Energetic dog',1,3),(2,'Hop','amphibian',20,'Aged frog',1,NULL),(3,'Wuguay','reptile',70,'Old turtle',1,NULL),(7,'a','mammal',4,'asdasd',1,NULL);
/*!40000 ALTER TABLE `pets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shelters`
--

DROP TABLE IF EXISTS `shelters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shelters` (
  `shelterID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `pet_capacity` int NOT NULL,
  `location` varchar(45) NOT NULL,
  PRIMARY KEY (`shelterID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shelters`
--

LOCK TABLES `shelters` WRITE;
/*!40000 ALTER TABLE `shelters` DISABLE KEYS */;
INSERT INTO `shelters` VALUES (1,'Maple Pet Shelter',50,'Toronto, ON'),(2,'Rocky Mountain Animal Rescue',30,'Calgary, AB'),(3,'Ocean View Pet Haven',40,'Vancouver, BC');
/*!40000 ALTER TABLE `shelters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workshops`
--

DROP TABLE IF EXISTS `workshops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workshops` (
  `workshopID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `desc` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  `WS_FK` int DEFAULT NULL,
  PRIMARY KEY (`workshopID`),
  KEY `WS_ID_idx` (`WS_FK`),
  CONSTRAINT `WS_ID` FOREIGN KEY (`WS_FK`) REFERENCES `shelters` (`shelterID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workshops`
--

LOCK TABLES `workshops` WRITE;
/*!40000 ALTER TABLE `workshops` DISABLE KEYS */;
INSERT INTO `workshops` VALUES (1,'Pet Nutrition Workshop','Learn about proper pet nutrition.','2023-05-20 00:00:00',1),(2,'Cat Grooming Class','Tips for grooming your feline friend.','2023-06-10 00:00:00',1),(3,'asda','asad','2023-12-03 18:00:00',1);
/*!40000 ALTER TABLE `workshops` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-04 17:27:30
