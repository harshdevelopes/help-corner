-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2025 at 06:11 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `helpcornner_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `hc_services`
--

CREATE TABLE `hc_services` (
  `id` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hc_services`
--

INSERT INTO `hc_services` (`id`, `name`, `description`, `photo`, `link`) VALUES
(1, 'Home Cleaning', 'Professional home cleaning for a spotless, healthy living space.', 'https://img.freepik.com/free-vector/cleaners-with-cleaning-products-housekeeping-service_18591-52068.jpg', 'https://docs.google.com/forms/u/0/?pli=1'),
(2, 'Car Washing', 'Expert car washing and detailing for a sparkling, fresh ride.', 'https://img.freepik.com/free-vector/car-wash-illustration-man-has-washes-car-with-soap-water-by-high-pressure-pump-illustration-flat-style_1150-41756.jpg', 'https://docs.google.com/forms/u/0/?pli=1'),
(3, 'Solar Cleaning', 'Specialized solar panel cleaning for maximum energy efficiency.', 'https://static.vecteezy.com/system/resources/previews/060/391/647/non_2x/man-cleaning-solar-panel-in-flat-design-style-art-vector.jpg', 'https://docs.google.com/forms/u/0/?pli=1'),
(4, 'Tiffin Service', 'Delicious, homemade tiffin delivered fresh to your doorstep every day.', 'https://cdn.dribbble.com/userupload/28314488/file/original-e67e2e1aaa9da028cefdf4c9b069b197.jpg?format=webp&resize=400x300&vertical=center', 'https://docs.google.com/forms/u/0/?pli=1'),
(14, 'News Channel', 'Sends new paper daily morning. ', 'https://static.vecteezy.com/system/resources/previews/001/995/060/non_2x/online-news-newspaper-news-website-flat-illustration-news-update-news-article-internet-newspaper-digital-content-electronic-media-services-for-web-banner-and-apps-vector.jpg', 'https://docs.google.com/forms/u/0/?pli=1'),
(16, 'Electrician Services', 'Certified electricians for wiring, repairs, installations, and emergencies.', 'https://img.freepik.com/free-vector/electrician-engineer-checking-up-voltage-current-resistance-with-multimeter-breaker-switch-box_575670-109.jpg', 'https://docs.google.com/forms/u/0/?pli=1');

-- --------------------------------------------------------

--
-- Table structure for table `hc_users`
--

CREATE TABLE `hc_users` (
  `user_id` int(10) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_number` varchar(15) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hc_users`
--

INSERT INTO `hc_users` (`user_id`, `user_name`, `user_number`, `user_email`, `user_password`, `user_role`) VALUES
(1, 'Himss', '2147483647', 'himanshubvaghela@gmal.in', '$2y$10$Z2X', 'user'),
(2, 'Vivek', '2147483647', 'vivekjoshi540@gmail.', '$2y$10$wWI', 'user'),
(3, 'harsh', '2147483647', 'harsh@mail.com', '$2y$10$ubY', 'user'),
(5, 'awdawdaw', '2147483647', 'awdawd@gmail.com', '$2y$10$1zq', 'user'),
(6, 'himz', '8758721811', 'hims@hotmail.com', '2ba41c168de835967738595917644b7d', 'user'),
(7, 'himzz', '8758721811', 'himz@mail.com', '$2y$10$JKVbEXYj7y.AT2edglW9oeBZTUFWPdxnNJ.67nPqBYR9.GirTq3Du', 'user'),
(8, 'Himanshu', '8758721811', 'himanshubvaghela@gmail.com', 'bfa15d51c65c2458333e2d8cc2704a19', 'user'),
(9, 'Vaibhav', '9316030586', 'vaibhav@mail.com', '$2y$10$y7xpQ1rn56/m1AJ.ZvdAFOd7v7AfImJsVQ/LVDgx3hMQeZSzooT/S', 'user'),
(10, 'Heet', '9924486751', 'heet@69', '$2y$10$lZk.u5tzw9veG6Q4hldlJubIO6hRBeH4by27qACGgIESiTOh3B0Hm', 'user'),
(11, 'Jay', '8980100124', 'jay@mail.com', '$2y$10$jssvkrm8E0NM/1q/eic.1e34KdB8rXbqUhMDRSDtm3rMw8FvrJ6A6', 'user'),
(12, 'Himsxd', '8758721811', 'hims@admin.com', '$2y$10$sPlu/fas1Btw8/5WwpUZFO74fVR.g14uS/skAfWx7pLKMpNgORWLO', 'admin'),
(13, 'Admin', '9429895011', 'helpcornner@admin.com', 'admin123', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hc_services`
--
ALTER TABLE `hc_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hc_users`
--
ALTER TABLE `hc_users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hc_services`
--
ALTER TABLE `hc_services`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `hc_users`
--
ALTER TABLE `hc_users`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
