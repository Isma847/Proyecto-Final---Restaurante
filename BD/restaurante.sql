-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-11-2025 a las 02:25:33
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `restaurante`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id` int(11) NOT NULL,
  `precioTotal` float NOT NULL,
  `pedido` text NOT NULL,
  `mesa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id`, `precioTotal`, `pedido`, `mesa`) VALUES
(5, 900, '[{\"cantidad\":1,\"idplatillo\":16,\"precioplatillo\":900,\"total\":900}]', 65);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platillo`
--

CREATE TABLE `platillo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `precio` int(11) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `platillo`
--

INSERT INTO `platillo` (`id`, `nombre`, `precio`, `descripcion`) VALUES
(1, 'Milanesa con papas fritas', 2500, 'Clásica milanesa de carne con guarnición de papas fritas.'),
(2, 'Hamburguesa completa', 2200, 'Pan casero, carne 100%, queso, jamón, lechuga, tomate y huevo frito.'),
(3, 'Pizza muzzarella', 2800, 'Pizza con salsa de tomate casera y abundante muzzarella.'),
(4, 'Pizza napolitana', 3000, 'Pizza con tomate en rodajas, ajo, orégano y muzzarella.'),
(5, 'Empanadas de carne (x3)', 1500, 'Tres empanadas de carne cortada a cuchillo.'),
(6, 'Tarta de jamón y queso', 1800, 'Tarta casera de jamón y queso.'),
(7, 'Ravioles con salsa bolognesa', 3200, 'Ravioles caseros de ricota con salsa bolognesa.'),
(8, 'Ñoquis con salsa blanca', 3100, 'Ñoquis caseros con salsa blanca y queso rallado.'),
(9, 'Lomo completo con papas', 3500, 'Lomo con huevo, jamón, queso y papas fritas.'),
(10, 'Coca-Cola 500ml', 900, 'Gaseosa Coca-Cola individual.'),
(11, 'Sprite 500ml', 900, 'Gaseosa Sprite individual.'),
(12, 'Agua sin gas 500ml', 700, 'Botella de agua sin gas.'),
(13, 'Agua con gas 500ml', 700, 'Botella de agua con gas.'),
(14, 'Flan casero', 1500, 'Flan casero con dulce de leche.'),
(15, 'Helado (2 bochas)', 1600, 'Helado artesanal, sabores a elección.'),
(16, 'Café espresso', 900, 'Café espresso intenso.'),
(17, 'Café con leche', 1100, 'Café con leche servido caliente.'),
(18, 'Té de hierbas', 1000, 'Té natural de hierbas aromáticas.'),
(19, 'Pancho clásico', 1200, 'Pancho con pan artesanal y salchicha parrillera.'),
(20, 'Papas fritas porción', 1400, 'Porción mediana de papas fritas.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id` int(11) NOT NULL,
  `aNombreDe` varchar(40) NOT NULL,
  `horario` date NOT NULL,
  `mesa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `email` varchar(25) NOT NULL,
  `contraseña` varchar(25) NOT NULL,
  `tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `email`, `contraseña`, `tipo`) VALUES
(1, 'Tizi', 'tizi@gmail.com', '123456789', 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `platillo`
--
ALTER TABLE `platillo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `platillo`
--
ALTER TABLE `platillo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
