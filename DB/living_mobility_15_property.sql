-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-03-2024 a las 01:15:49
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `living_mobility`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id_category` int(10) NOT NULL,
  `name_category` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `creation_date` varchar(50) DEFAULT NULL,
  `update_date` varchar(50) DEFAULT NULL,
  `image_category` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id_category`, `name_category`, `is_active`, `creation_date`, `update_date`, `image_category`) VALUES
(1, 'New Building', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/category/New-Building.webp'),
(2, 'Pool', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/category/Pool.webp'),
(3, 'Beach', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/category/Beach.webp'),
(4, 'Garden', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/category/Garden.webp'),
(5, 'Garage', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/category/Garage.webp'),
(6, 'Storage', 1, '2024-02-05 21:55:27', '2024-02-05 21:55:27', 'views/images/category/storage.webp'),
(7, 'Terrace', 1, '2024-02-06 18:45:18', '2024-02-06 18:45:18', 'views/images/category/terrace.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `city`
--

CREATE TABLE `city` (
  `id_city` int(10) NOT NULL,
  `name_city` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `creation_date` varchar(50) DEFAULT NULL,
  `update_date` varchar(50) DEFAULT NULL,
  `image_city` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `city`
--

INSERT INTO `city` (`id_city`, `name_city`, `is_active`, `creation_date`, `update_date`, `image_city`) VALUES
(1, 'Ontinyent', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/city/Ontinyent.webp'),
(2, 'Gandia', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/city/Gandia.webp'),
(3, 'Albaida', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/city/Albaida.webp'),
(4, 'Alcoi', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/city/Alcoi.webp'),
(5, 'Xativa', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/city/Xativa.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exceptions`
--

CREATE TABLE `exceptions` (
  `type_error` int(10) NOT NULL,
  `spot` varchar(100) NOT NULL,
  `current_date_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `exceptions`
--

INSERT INTO `exceptions` (`type_error`, `spot`, `current_date_time`) VALUES
(503, 'Carrusel_Brands HOME', '2024-01-25 02:17:43'),
(503, 'Carrusel_Brands HOME', '2024-01-25 02:17:43'),
(503, 'Carrusel_Brands HOME', '2024-01-25 02:17:43'),
(503, 'Function load_like_user SHOP', '2024-01-25 02:17:43'),
(503, 'Function load_like_user SHOP', '2024-01-25 02:17:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `extras`
--

CREATE TABLE `extras` (
  `id_extras` int(10) NOT NULL,
  `name_extras` varchar(50) NOT NULL,
  `creation_date` varchar(100) NOT NULL,
  `update_date` varchar(100) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `image_extras` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `extras`
--

INSERT INTO `extras` (`id_extras`, `name_extras`, `creation_date`, `update_date`, `is_active`, `image_extras`) VALUES
(1, 'Heating', '2024-01-26 17:49:03', '2024-01-26 17:49:03', 1, 'views/images/extras/heating.webp'),
(2, 'Air Conditioning', '2024-01-26 17:49:03', '2024-01-26 17:49:03', 1, 'views/images/extras/air.webp'),
(3, 'Fireplace', '2024-01-26 17:49:03', '2024-01-26 17:49:03', 1, 'views/images/extras/fireplace.webp'),
(4, 'Elevator', '2024-01-26 17:49:03', '2024-01-26 17:49:03', 1, 'views/images/extras/elevator.webp'),
(5, 'Sauna', '2024-01-26 17:49:03', '2024-01-26 17:49:03', 1, 'views/images/extras/sauna.webp'),
(6, 'Solar Panel', '2024-02-06 18:51:06', '2024-02-06 18:51:06', 1, '/views/images/extras/solar.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `id_images` int(10) NOT NULL,
  `path_images` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `creation_date` varchar(50) DEFAULT NULL,
  `update_date` varchar(50) DEFAULT NULL,
  `id_property` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `images`
--

INSERT INTO `images` (`id_images`, `path_images`, `is_active`, `creation_date`, `update_date`, `id_property`) VALUES
(1, 'views/images/property/property1-1.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 1),
(2, 'views/images/property/property1-2.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 1),
(3, 'views/images/property/property1-3.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 1),
(4, 'views/images/property/property1-4.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 1),
(5, 'views/images/property/property1-5.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 1),
(6, 'views/images/property/property2-1.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 2),
(7, 'views/images/property/property2-2.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 2),
(8, 'views/images/property/property2-3.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 2),
(9, 'views/images/property/property2-4.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 2),
(10, 'views/images/property/property2-5.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 2),
(11, 'views/images/property/property3-1.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 3),
(12, 'views/images/property/property3-2.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 3),
(13, 'views/images/property/property3-3.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 3),
(14, 'views/images/property/property3-4.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 3),
(15, 'views/images/property/property3-5.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 3),
(16, 'views/images/property/property4-1.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 4),
(17, 'views/images/property/property4-2.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 4),
(18, 'views/images/property/property4-3.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 4),
(19, 'views/images/property/property4-4.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 4),
(20, 'views/images/property/property4-5.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 4),
(21, 'views/images/property/property5-1.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 5),
(22, 'views/images/property/property5-2.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 5),
(23, 'views/images/property/property5-3.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 5),
(24, 'views/images/property/property5-4.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 5),
(25, 'views/images/property/property5-5.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 5),
(26, 'views/images/property/property1-1.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 34),
(27, 'views/images/property/property34-2.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 34),
(28, 'views/images/property/property34-3.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 34),
(29, 'views/images/property/property34-4.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 34),
(30, 'views/images/property/property34-5.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 34),
(31, 'views/images/property/property2-1.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 35),
(32, 'views/images/property/property35-2.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 35),
(33, 'views/images/property/property35-3.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 35),
(34, 'views/images/property/property35-4.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 35),
(35, 'views/images/property/property35-5.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 35),
(36, 'views/images/property/property1-1.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 37),
(37, 'views/images/property/property37-147.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 37),
(38, 'views/images/property/property37-605.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 37),
(39, 'views/images/property/property37-585.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 37),
(40, 'views/images/property/property37-113.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 37),
(41, 'views/images/property/property2-1.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 38),
(42, 'views/images/property/property5-1.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 38),
(43, 'views/images/property/property38-75.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 38),
(44, 'views/images/property/property38-276.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 38),
(45, 'views/images/property/property38-157.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 38),
(46, 'views/images/property/property3-1.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 39),
(47, 'views/images/property/property5-1.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 39),
(48, 'views/images/property/property39-729.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 39),
(49, 'views/images/property/property39-685.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 39),
(50, 'views/images/property/property39-237.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 39),
(51, 'views/images/property/property5-1.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 40),
(52, 'views/images/property/property40-766.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 40),
(53, 'views/images/property/property40-859.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 40),
(54, 'views/images/property/property40-998.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 40),
(55, 'views/images/property/property40-415.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 40),
(56, 'views/images/property/property3-1.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 41),
(57, 'views/images/property/property41-152.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 41),
(58, 'views/images/property/property41-522.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 41),
(59, 'views/images/property/property41-155.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 41),
(60, 'views/images/property/property41-211.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 41),
(61, 'views/images/property/property2-1.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 42),
(62, 'views/images/property/property42-651.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 42),
(63, 'views/images/property/property42-577.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 42),
(64, 'views/images/property/property42-933.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 42),
(65, 'views/images/property/property42-935.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 42),
(66, 'views/images/property/property1-1.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 43),
(67, 'views/images/property/property43-580.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 43),
(68, 'views/images/property/property43-267.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 43),
(69, 'views/images/property/property43-599.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 43),
(70, 'views/images/property/property43-194.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 43),
(71, 'views/images/property/property5-1.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 36),
(72, 'views/images/property/property42-524.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 36),
(73, 'views/images/property/property42-928.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 36),
(74, 'views/images/property/property42-71.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 36),
(75, 'views/images/property/property42-569.webp', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 36);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `large_people`
--

CREATE TABLE `large_people` (
  `id_large_people` int(10) NOT NULL,
  `name_large_people` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `creation_date` varchar(50) DEFAULT NULL,
  `update_date` varchar(50) DEFAULT NULL,
  `image_people` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `large_people`
--

INSERT INTO `large_people` (`id_large_people`, `name_large_people`, `is_active`, `creation_date`, `update_date`, `image_people`) VALUES
(1, 'Kitchen', 1, '2024-02-22 16:20:32', '2024-02-22 16:20:32', 'views/images/adapted_people/kitchen.webp'),
(2, 'Bathroom', 1, '2024-02-22 16:20:32', '2024-02-22 16:20:32', 'views/images/adapted_people/bathroom.webp'),
(3, 'Stairs', 1, '2024-02-22 16:20:32', '2024-02-22 16:20:32', 'views/images/adapted_people/stairs.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operation`
--

CREATE TABLE `operation` (
  `id_operation` int(10) NOT NULL,
  `name_operation` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `creation_date` varchar(50) DEFAULT NULL,
  `update_date` varchar(50) DEFAULT NULL,
  `image_operation` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `operation`
--

INSERT INTO `operation` (`id_operation`, `name_operation`, `is_active`, `creation_date`, `update_date`, `image_operation`) VALUES
(1, 'Sale', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/operation/sale.webp'),
(2, 'Rent', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/operation/rent.webp'),
(3, 'Share', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/operation/share.webp'),
(4, 'Rent to own', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/operation/rent_to_own.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property`
--

CREATE TABLE `property` (
  `id_property` int(10) NOT NULL,
  `property_name` varchar(50) NOT NULL,
  `cadastral_reference` varchar(50) DEFAULT NULL,
  `square_meters` int(10) DEFAULT NULL,
  `number_of_rooms` int(2) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `price` int(10) DEFAULT NULL,
  `id_large_people` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `creation_date` varchar(50) DEFAULT NULL,
  `update_date` varchar(50) DEFAULT NULL,
  `id_city` int(10) DEFAULT NULL,
  `visits` int(11) DEFAULT 0,
  `currently_date` datetime DEFAULT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `property`
--

INSERT INTO `property` (`id_property`, `property_name`, `cadastral_reference`, `square_meters`, `number_of_rooms`, `description`, `price`, `id_large_people`, `is_active`, `creation_date`, `update_date`, `id_city`, `visits`, `currently_date`, `latitude`, `longitude`) VALUES
(1, 'Garden\'s John', '12345-67890-A', 100, 3, 'Beautiful house with garden', 200000, 1, 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 1, 22, '2024-03-18 20:41:58', 38.8167, -0.61667),
(2, 'The Tower', '23456-78901-B', 80, 2, 'Apartment with sea view', 150000, 2, 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 2, 10, '2024-03-18 20:52:41', 38.9667, -0.18333),
(3, 'Sunset View Manor', '34567-89012-C', 120, 4, 'Spacious villa with pool', 300000, 3, 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 3, 15, '2024-03-18 20:38:31', 38.838, -0.51721),
(4, 'Enchanted Hideaway', '45678-90123-D', 60, 1, 'Cozy studio in the city center', 100000, 2, 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 4, 6, '2024-03-18 20:48:35', 38.7054, -0.47432),
(5, 'Harmony Homestead', '56789-01234-E', 90, 2, 'Modern loft with industrial design', 180000, 1, 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 5, 29, '2024-03-18 20:47:48', 38.9833, -0.51667),
(34, 'Sunny Villa', 'CR1', 200, 4, 'A beautiful villa with a sunny garden', 300000, 1, 1, '2022-01-01', '2022-01-01', 1, 0, '2024-03-24 00:11:52', 38.8276, -0.61876),
(35, 'Modern Loft', 'CR2', 100, 2, 'A modern loft in the city center', 250000, 2, 1, '2022-01-02', '2022-01-02', 2, 0, '2024-03-24 00:11:52', 34.0522, -118.244),
(36, 'Cozy Cottage', 'CR3', 150, 3, 'A cozy cottage in the countryside', 200000, 3, 1, '2022-01-03', '2022-01-03', 3, 0, '2024-03-24 00:11:52', 51.5074, -0.127758),
(37, 'Luxury Penthouse', 'CR4', 250, 3, 'A luxury penthouse with a city view', 500000, 2, 1, '2022-01-04', '2022-01-04', 4, 0, '2024-03-24 00:11:52', 48.8566, 2.35222),
(38, 'Charming Bungalow', 'CR5', 120, 2, 'A charming bungalow near the beach', 220000, 3, 1, '2022-01-05', '2022-01-05', 5, 0, '2024-03-24 00:11:52', 52.52, 13.405),
(39, 'Elegant Mansion', 'CR6', 400, 5, 'An elegant mansion with a large pool', 800000, 1, 1, '2022-01-06', '2022-01-06', 1, 0, '2024-03-24 00:11:52', 41.9028, 12.4964),
(40, 'Stylish Studio', 'CR7', 80, 1, 'A stylish studio in the hip neighborhood', 180000, 2, 1, '2022-01-07', '2022-01-07', 2, 2, '2024-03-24 01:01:14', 40.4168, -3.70379),
(41, 'Classic Townhouse', 'CR8', 200, 3, 'A classic townhouse with a modern interior', 350000, 3, 1, '2022-01-08', '2022-01-08', 3, 0, '2024-03-24 00:11:52', 35.6895, 139.692),
(42, 'Rustic Cabin', 'CR9', 100, 2, 'A rustic cabin in the woods', 150000, 1, 1, '2022-01-09', '2022-01-09', 4, 0, '2024-03-24 00:11:52', 37.7749, -122.419),
(43, 'Contemporary Condo', 'CR10', 150, 2, 'A contemporary condo with a spacious balcony', 300000, 1, 1, '2022-01-10', '2022-01-10', 5, 0, '2024-03-24 00:11:52', 43.6532, -79.3832);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_category`
--

CREATE TABLE `property_category` (
  `id_property` int(10) NOT NULL,
  `id_category` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `property_category`
--

INSERT INTO `property_category` (`id_property`, `id_category`) VALUES
(1, 1),
(1, 2),
(2, 4),
(2, 5),
(3, 1),
(3, 3),
(3, 4),
(3, 5),
(4, 1),
(4, 2),
(4, 4),
(4, 5),
(5, 1),
(5, 2),
(34, 1),
(35, 2),
(36, 3),
(37, 4),
(38, 1),
(39, 2),
(40, 3),
(41, 4),
(42, 1),
(43, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_extras`
--

CREATE TABLE `property_extras` (
  `id_property` int(10) NOT NULL,
  `id_extras` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `property_extras`
--

INSERT INTO `property_extras` (`id_property`, `id_extras`) VALUES
(1, 1),
(1, 2),
(2, 4),
(2, 5),
(3, 1),
(3, 3),
(3, 4),
(3, 5),
(4, 1),
(4, 2),
(4, 4),
(4, 5),
(5, 1),
(5, 2),
(34, 1),
(35, 2),
(36, 3),
(37, 4),
(38, 5),
(39, 6),
(40, 1),
(41, 2),
(42, 3),
(43, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_operation`
--

CREATE TABLE `property_operation` (
  `id_property` int(10) NOT NULL,
  `id_operation` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `property_operation`
--

INSERT INTO `property_operation` (`id_property`, `id_operation`) VALUES
(1, 1),
(1, 2),
(2, 4),
(3, 1),
(3, 3),
(3, 4),
(4, 1),
(4, 2),
(4, 4),
(5, 1),
(5, 2),
(34, 1),
(35, 2),
(36, 3),
(37, 4),
(38, 1),
(39, 2),
(40, 3),
(41, 4),
(42, 1),
(43, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_type`
--

CREATE TABLE `property_type` (
  `id_property` int(10) NOT NULL,
  `id_type` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `property_type`
--

INSERT INTO `property_type` (`id_property`, `id_type`) VALUES
(1, 1),
(1, 2),
(2, 4),
(2, 5),
(3, 1),
(3, 3),
(3, 4),
(3, 5),
(4, 1),
(4, 2),
(4, 4),
(4, 5),
(5, 1),
(5, 2),
(34, 1),
(35, 2),
(36, 3),
(37, 4),
(38, 1),
(39, 2),
(40, 3),
(41, 4),
(42, 1),
(43, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type`
--

CREATE TABLE `type` (
  `id_type` int(10) NOT NULL,
  `name_type` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `creation_date` varchar(50) DEFAULT NULL,
  `update_date` varchar(50) DEFAULT NULL,
  `image_type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `type`
--

INSERT INTO `type` (`id_type`, `name_type`, `is_active`, `creation_date`, `update_date`, `image_type`) VALUES
(1, 'Apartment', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/type/apartment.webp'),
(2, 'House', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/type/house.webp'),
(3, 'Townhouse', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/type/townhouse.webp'),
(4, 'Duplex', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/type/duplex.webp'),
(5, 'Office', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/type/office.webp');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indices de la tabla `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id_city`);

--
-- Indices de la tabla `extras`
--
ALTER TABLE `extras`
  ADD PRIMARY KEY (`id_extras`);

--
-- Indices de la tabla `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id_images`),
  ADD KEY `fk_property` (`id_property`);

--
-- Indices de la tabla `large_people`
--
ALTER TABLE `large_people`
  ADD PRIMARY KEY (`id_large_people`);

--
-- Indices de la tabla `operation`
--
ALTER TABLE `operation`
  ADD PRIMARY KEY (`id_operation`);

--
-- Indices de la tabla `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`id_property`),
  ADD KEY `fk_city` (`id_city`),
  ADD KEY `fk_large_people` (`id_large_people`);

--
-- Indices de la tabla `property_category`
--
ALTER TABLE `property_category`
  ADD PRIMARY KEY (`id_property`,`id_category`),
  ADD KEY `id_category` (`id_category`);

--
-- Indices de la tabla `property_extras`
--
ALTER TABLE `property_extras`
  ADD PRIMARY KEY (`id_property`,`id_extras`),
  ADD KEY `id_extras` (`id_extras`);

--
-- Indices de la tabla `property_operation`
--
ALTER TABLE `property_operation`
  ADD PRIMARY KEY (`id_property`,`id_operation`),
  ADD KEY `id_operation` (`id_operation`);

--
-- Indices de la tabla `property_type`
--
ALTER TABLE `property_type`
  ADD PRIMARY KEY (`id_property`,`id_type`),
  ADD KEY `id_type` (`id_type`);

--
-- Indices de la tabla `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id_type`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `city`
--
ALTER TABLE `city`
  MODIFY `id_city` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `extras`
--
ALTER TABLE `extras`
  MODIFY `id_extras` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `id_images` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de la tabla `large_people`
--
ALTER TABLE `large_people`
  MODIFY `id_large_people` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `operation`
--
ALTER TABLE `operation`
  MODIFY `id_operation` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `property`
--
ALTER TABLE `property`
  MODIFY `id_property` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `type`
--
ALTER TABLE `type`
  MODIFY `id_type` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `fk_property` FOREIGN KEY (`id_property`) REFERENCES `property` (`id_property`);

--
-- Filtros para la tabla `property`
--
ALTER TABLE `property`
  ADD CONSTRAINT `fk_city` FOREIGN KEY (`id_city`) REFERENCES `city` (`id_city`),
  ADD CONSTRAINT `fk_large_people` FOREIGN KEY (`id_large_people`) REFERENCES `large_people` (`id_large_people`);

--
-- Filtros para la tabla `property_category`
--
ALTER TABLE `property_category`
  ADD CONSTRAINT `property_category_ibfk_1` FOREIGN KEY (`id_property`) REFERENCES `property` (`id_property`),
  ADD CONSTRAINT `property_category_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`);

--
-- Filtros para la tabla `property_extras`
--
ALTER TABLE `property_extras`
  ADD CONSTRAINT `property_extras_ibfk_1` FOREIGN KEY (`id_property`) REFERENCES `property` (`id_property`),
  ADD CONSTRAINT `property_extras_ibfk_2` FOREIGN KEY (`id_extras`) REFERENCES `extras` (`id_extras`);

--
-- Filtros para la tabla `property_operation`
--
ALTER TABLE `property_operation`
  ADD CONSTRAINT `property_operation_ibfk_1` FOREIGN KEY (`id_property`) REFERENCES `property` (`id_property`),
  ADD CONSTRAINT `property_operation_ibfk_2` FOREIGN KEY (`id_operation`) REFERENCES `operation` (`id_operation`);

--
-- Filtros para la tabla `property_type`
--
ALTER TABLE `property_type`
  ADD CONSTRAINT `property_type_ibfk_1` FOREIGN KEY (`id_property`) REFERENCES `property` (`id_property`),
  ADD CONSTRAINT `property_type_ibfk_2` FOREIGN KEY (`id_type`) REFERENCES `type` (`id_type`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
