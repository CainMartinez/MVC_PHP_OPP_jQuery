-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-01-2024 a las 12:23:07
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25
CREATE DATABASE IF NOT EXISTS `property_houses` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `property_houses`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `property_houses`
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
(1, 'New Building', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/New-Building.jpg'),
(2, 'Pool', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/Pool.jpg'),
(3, 'Beach', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/Beach.jpg'),
(4, 'Garden', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/Garden.jpg'),
(5, 'Garage', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/Garage.jpg');

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
(1, 'Ontinyent', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/Ontinyent.jpg'),
(2, 'Gandia', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/Gandia.jpg'),
(3, 'Albaida', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/Albaida.jpg'),
(4, 'Alcoi', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/Alcoi.jpg'),
(5, 'Xativa', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/Xativa.jpg');

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
(1, 'Heating', '2024-01-26 17:49:03', '2024-01-26 17:49:03', 1, 'views/images/extra1.jpg'),
(2, 'Air Conditioning', '2024-01-26 17:49:03', '2024-01-26 17:49:03', 1, 'views/images/extra3.jpg'),
(3, 'Fireplace', '2024-01-26 17:49:03', '2024-01-26 17:49:03', 1, 'views/images/extra4.jpg'),
(4, 'Elevator', '2024-01-26 17:49:03', '2024-01-26 17:49:03', 1, 'views/images/extra6.jpg'),
(5, 'Sauna', '2024-01-26 17:49:03', '2024-01-26 17:49:03', 1, 'views/images/extra8.jpg');

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
(1, 'views/images/property1.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 1),
(2, 'views/images/property1.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 1),
(3, 'views/images/property1.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 1),
(4, 'views/images/property1.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 1),
(5, 'views/images/property1.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 1),
(6, 'views/images/property2.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 2),
(7, 'views/images/property2.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 2),
(8, 'views/images/property2.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 2),
(9, 'views/images/property2.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 2),
(10, 'views/images/property2.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 2),
(11, 'views/images/property3.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 3),
(12, 'views/images/property3.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 3),
(13, 'views/images/property3.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 3),
(14, 'views/images/property3.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 3),
(15, 'views/images/property3.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 3),
(16, 'views/images/property4.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 4),
(17, 'views/images/property4.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 4),
(18, 'views/images/property4.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 4),
(19, 'views/images/property4.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 4),
(20, 'views/images/property4.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 4),
(21, 'views/images/property5.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 5),
(22, 'views/images/property5.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 5),
(23, 'views/images/property5.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 5),
(24, 'views/images/property5.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 5),
(25, 'views/images/property5.jpg', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 5);

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
(1, 'Sale', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/image3.png'),
(2, 'Rent', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/image1.png'),
(3, 'Share', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/image2.png'),
(4, 'Rent to own', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'views/images/image4.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property`
--

CREATE TABLE `property` (
  `id_property` int(10) NOT NULL,
  `cadastral_reference` varchar(50) DEFAULT NULL,
  `square_meters` int(10) DEFAULT NULL,
  `number_of_rooms` int(2) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `price` int(10) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `creation_date` varchar(50) DEFAULT NULL,
  `update_date` varchar(50) DEFAULT NULL,
  `id_city` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `property`
--

INSERT INTO `property` (`id_property`, `cadastral_reference`, `square_meters`, `number_of_rooms`, `description`, `price`, `is_active`, `creation_date`, `update_date`, `id_city`) VALUES
(1, '12345-67890-A', 100, 3, 'Beautiful house with garden', 200000, 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 1),
(2, '23456-78901-B', 80, 2, 'Apartment with sea view', 150000, 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 2),
(3, '34567-89012-C', 120, 4, 'Spacious villa with pool', 300000, 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 3),
(4, '45678-90123-D', 60, 1, 'Cozy studio in the city center', 100000, 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 4),
(5, '56789-01234-E', 90, 2, 'Modern loft with industrial design', 180000, 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_category`
--

CREATE TABLE `property_category` (
  `id_property` int(10) NOT NULL,
  `id_category` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_operation`
--

CREATE TABLE `property_operation` (
  `id_property` int(10) NOT NULL,
  `id_operation` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_type`
--

CREATE TABLE `property_type` (
  `id_property` int(10) NOT NULL,
  `id_type` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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
(1, 'Apartment', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'image1.jpg'),
(2, 'House', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'image2.jpg'),
(3, 'Townhouse', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'image3.jpg'),
(4, 'Duplex', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'image4.jpg'),
(5, 'Office', 1, '2024-01-25 02:17:42', '2024-01-25 02:17:42', 'image5.jpg');

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
-- Indices de la tabla `operation`
--
ALTER TABLE `operation`
  ADD PRIMARY KEY (`id_operation`);

--
-- Indices de la tabla `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`id_property`),
  ADD KEY `fk_city` (`id_city`);

--
-- Indices de la tabla `property_category`
--
ALTER TABLE `property_category`
  ADD PRIMARY KEY (`id_property`,`id_category`),
  ADD KEY `id_category` (`id_category`);

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
  MODIFY `id_category` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `city`
--
ALTER TABLE `city`
  MODIFY `id_city` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `extras`
--
ALTER TABLE `extras`
  MODIFY `id_extras` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `id_images` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `operation`
--
ALTER TABLE `operation`
  MODIFY `id_operation` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `property`
--
ALTER TABLE `property`
  MODIFY `id_property` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  ADD CONSTRAINT `fk_city` FOREIGN KEY (`id_city`) REFERENCES `city` (`id_city`);

--
-- Filtros para la tabla `property_category`
--
ALTER TABLE `property_category`
  ADD CONSTRAINT `property_category_ibfk_1` FOREIGN KEY (`id_property`) REFERENCES `property` (`id_property`),
  ADD CONSTRAINT `property_category_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`);

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
