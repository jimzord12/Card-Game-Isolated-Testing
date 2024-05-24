CREATE DATABASE  IF NOT EXISTS `genera-game-v3` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `genera-game-v3`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: genera-web3-game-mysql-serve-tech-v1.b.aivencloud.com    Database: genera-game-v3
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '159b783d-f745-11ee-828d-e6963400778a:1-48,
61983062-f74e-11ee-bd0a-86c763c43404:1-21934';

--
-- Table structure for table `achiev_templates`
--

DROP TABLE IF EXISTS `achiev_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `achiev_templates` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `reward` int unsigned NOT NULL,
  `image` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idachievements_templates_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `achievements`
--

DROP TABLE IF EXISTS `achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `achievements` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `achievement_id` int unsigned NOT NULL,
  `owner_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `alliances`
--

DROP TABLE IF EXISTS `alliances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alliances` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `embassy_points` int unsigned NOT NULL,
  `subject_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `card_stats`
--

DROP TABLE IF EXISTS `card_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card_stats` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `cardId` int NOT NULL,
  `gold` int DEFAULT NULL,
  `concrete` int DEFAULT NULL,
  `metals` int DEFAULT NULL,
  `crystals` int DEFAULT NULL,
  `diesel` int DEFAULT NULL,
  `population` int DEFAULT NULL,
  `energy` int DEFAULT NULL,
  `rank` int DEFAULT NULL,
  `expenses` int DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=785 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `card_templates`
--

DROP TABLE IF EXISTS `card_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card_templates` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'This table is used to link Card Instaces with their data.\nFor example, in the frontend:\n\n1. We will fetch all Card Instaces a Player has.\n2. For each card, we fetch from this table it''s data.\n3. We use this data, to implant methods and properties to the Card Instace',
  `name` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `image` varchar(128) NOT NULL,
  `op_target_stat` varchar(45) DEFAULT NULL,
  `op_multiply_by` decimal(5,2) DEFAULT NULL,
  `op_research_points` int unsigned DEFAULT NULL,
  `op_gold` int unsigned DEFAULT NULL,
  `op_pop` int unsigned DEFAULT NULL,
  `op_concrete` int unsigned DEFAULT NULL,
  `op_metals` int unsigned DEFAULT NULL,
  `op_crystals` int unsigned DEFAULT NULL,
  `op_energy` int unsigned DEFAULT NULL,
  `req_gold` int unsigned DEFAULT NULL,
  `req_pop` int unsigned DEFAULT NULL,
  `req_concrete` int unsigned DEFAULT NULL,
  `req_metals` int unsigned DEFAULT NULL,
  `req_crystals` int unsigned DEFAULT NULL,
  `req_energy` int unsigned DEFAULT NULL,
  `req_research_points` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cards`
--

DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cards` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `templateId` int unsigned NOT NULL,
  `level` int unsigned NOT NULL DEFAULT '0',
  `ownerId` int unsigned NOT NULL,
  `in_mp` tinyint DEFAULT NULL,
  `priceTag` int unsigned DEFAULT NULL,
  `state` tinyint DEFAULT NULL,
  `locked` tinyint DEFAULT NULL,
  `town_id` int unsigned DEFAULT NULL,
  `rarity` int unsigned DEFAULT NULL,
  `disabled` tinyint DEFAULT NULL,
  `creationTime` date DEFAULT NULL,
  `creator` varchar(45) DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `on_map_spot` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idcards_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1420 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `google_form`
--

DROP TABLE IF EXISTS `google_form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `google_form` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `response_id` varchar(150) NOT NULL,
  `question_01` int NOT NULL,
  `question_02` varchar(45) NOT NULL,
  `question_03` int NOT NULL,
  `question_04` int NOT NULL,
  `question_05` varchar(150) NOT NULL,
  `question_06` varchar(150) NOT NULL,
  `question_07` int NOT NULL,
  `question_08` int NOT NULL,
  `question_09` int NOT NULL,
  `question_10` int NOT NULL,
  `question_11` varchar(255) DEFAULT NULL,
  `wallet` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `islands`
--

DROP TABLE IF EXISTS `islands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `islands` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `position_x` float NOT NULL,
  `position_y` float NOT NULL,
  `info` mediumtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `leaderboard_al`
--

DROP TABLE IF EXISTS `leaderboard_al`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaderboard_al` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `alliance_id` int unsigned NOT NULL,
  `rank` int unsigned NOT NULL,
  `total_grp` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idleaderboard_al_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `leaderboard_pl`
--

DROP TABLE IF EXISTS `leaderboard_pl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaderboard_pl` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `player_id` int unsigned NOT NULL,
  `rank` int unsigned NOT NULL,
  `grp` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idlead_board_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `marketplace`
--

DROP TABLE IF EXISTS `marketplace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marketplace` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `cardId` int unsigned NOT NULL,
  `buyerId` int unsigned NOT NULL,
  `sellerId` int unsigned NOT NULL,
  `priceTag` int unsigned NOT NULL,
  `completed` tinyint DEFAULT NULL,
  `rarity` int DEFAULT NULL,
  `templateId` int DEFAULT NULL,
  `level` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idmarketplace_UNIQUE` (`id`),
  UNIQUE KEY `cardId_UNIQUE` (`cardId`)
) ENGINE=InnoDB AUTO_INCREMENT=318 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `players` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `wallet` varchar(42) NOT NULL,
  `password` varchar(85) NOT NULL DEFAULT '12345678!@#',
  `island_id` int unsigned DEFAULT NULL,
  `townhall_lvl` int unsigned NOT NULL DEFAULT '1',
  `factory_lvl` int unsigned NOT NULL DEFAULT '1',
  `workers_concrete` int unsigned DEFAULT NULL,
  `workers_metals` int unsigned DEFAULT NULL,
  `workers_crystals` int unsigned DEFAULT NULL,
  `workers_diesel` int unsigned DEFAULT NULL,
  `workers_hospital` int unsigned DEFAULT NULL,
  `factory_barrels` int unsigned DEFAULT NULL,
  `concrete_quarry_lvl` int unsigned DEFAULT '1',
  `crystals_quarry_lvl` int unsigned DEFAULT '1',
  `metals_quarry_lvl` int unsigned DEFAULT '1',
  `diesel_quarry_lvl` int unsigned DEFAULT '1',
  `taxes` decimal(5,2) DEFAULT NULL,
  `voteCasted` tinyint DEFAULT NULL,
  `concrete` int unsigned DEFAULT NULL,
  `metals` int unsigned DEFAULT NULL,
  `crystals` int unsigned DEFAULT NULL,
  `diesel` int unsigned DEFAULT NULL,
  `population` int unsigned DEFAULT NULL,
  `gold` int unsigned DEFAULT NULL,
  `alliance` int unsigned DEFAULT NULL,
  `rank` int unsigned DEFAULT NULL,
  `grp` int unsigned DEFAULT NULL,
  `refreshToken` varchar(256) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  `lastETHtransfer` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idplayers_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `wallet_UNIQUE` (`wallet`)
) ENGINE=InnoDB AUTO_INCREMENT=844 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `from` int unsigned NOT NULL,
  `to` int unsigned NOT NULL,
  `type` tinyint unsigned NOT NULL,
  `votes_counter_yes` smallint unsigned DEFAULT NULL,
  `votes_counter_no` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idsubjects_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `testing`
--

DROP TABLE IF EXISTS `testing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testing` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `testingcol1` varchar(45) NOT NULL,
  `testingcol2` int unsigned NOT NULL,
  `testingcol3` tinyint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idtesting_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `towns`
--

DROP TABLE IF EXISTS `towns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `towns` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `owner_id` int unsigned NOT NULL,
  `location_x` decimal(12,6) unsigned NOT NULL,
  `location_y` decimal(12,6) unsigned NOT NULL,
  `ez_avail_slots` int unsigned DEFAULT NULL,
  `avail_slots` smallint unsigned DEFAULT NULL,
  `concrete_hour` decimal(5,2) unsigned DEFAULT NULL,
  `metals_hour` decimal(5,2) unsigned DEFAULT NULL,
  `crystals_hour` decimal(5,2) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idtowns_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-24 13:15:50
