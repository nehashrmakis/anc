-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 31, 2025 at 09:42 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `anc_latest`
--

-- --------------------------------------------------------

--
-- Table structure for table `agents`
--

CREATE TABLE `agents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `agents`
--

INSERT INTO `agents` (`id`, `name`, `email`, `location`, `contact_number`, `created_at`, `updated_at`) VALUES
(1, 'Gurdeep', 'agent1@yopmail.com', 'Mohali', '9876543222', '2025-06-04 03:47:49', '2025-06-16 05:36:35'),
(2, 'Gurmeet', 'agent2@yopmail.com', 'Kharar', '98765433399', '2025-06-05 01:55:30', '2025-07-03 02:15:36');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `inventory_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `image`, `created_at`, `updated_at`) VALUES
(24, 'Steel Rods', 'categories/1752580425_steel-rods.jpg', '2025-07-15 06:23:46', '2025-07-15 06:23:46');

-- --------------------------------------------------------

--
-- Table structure for table `depos`
--

CREATE TABLE `depos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dispatch_history`
--

CREATE TABLE `dispatch_history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `size` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `total_weight` double NOT NULL,
  `arrival_depo` varchar(255) DEFAULT NULL,
  `dispatched_at` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dispatch_history`
--

INSERT INTO `dispatch_history` (`id`, `product_id`, `product_name`, `size`, `quantity`, `total_weight`, `arrival_depo`, `dispatched_at`, `created_at`, `updated_at`) VALUES
(11, 12, 'Fultons Steel Rods - 16mm x 3m', '16', 1, 20, 'Port1', '2025-07-15', '2025-07-15 07:39:21', '2025-07-15 07:39:21'),
(12, 13, 'Steel Rod', '2', 6, 60, 'Port2', '2025-07-15', '2025-07-15 07:43:56', '2025-07-15 07:43:56');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `final_inventories`
--

CREATE TABLE `final_inventories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` bigint(20) UNSIGNED NOT NULL,
  `invoice_container_id` bigint(20) UNSIGNED NOT NULL,
  `invoice_product_id` bigint(20) UNSIGNED NOT NULL,
  `inventory_id` bigint(20) UNSIGNED NOT NULL,
  `finalized_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `final_inventories`
--

INSERT INTO `final_inventories` (`id`, `invoice_id`, `invoice_container_id`, `invoice_product_id`, `inventory_id`, `finalized_at`, `created_at`, `updated_at`) VALUES
(29, 12, 25, 47, 12, '2025-07-15 07:36:43', '2025-07-15 07:36:43', '2025-07-15 07:36:43'),
(30, 13, 26, 48, 13, '2025-07-15 07:43:32', '2025-07-15 07:43:32', '2025-07-15 07:43:32');

-- --------------------------------------------------------

--
-- Table structure for table `inventories`
--

CREATE TABLE `inventories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `size_unit` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `weight_unit` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventories`
--

INSERT INTO `inventories` (`id`, `category_id`, `name`, `image`, `created_at`, `updated_at`, `size`, `size_unit`, `weight`, `weight_unit`) VALUES
(12, 24, 'Fultons Steel Rods - 16mm x 3m', 'inventories/1752580527_steel-rods.jpg', '2025-07-15 06:25:27', '2025-07-15 06:38:25', '16', 'Inch', '20', 'Kg/Each'),
(13, 24, 'Steel Rod', 'inventories/1752585046_steel-rods.jpg', '2025-07-15 07:40:47', '2025-07-15 07:40:47', '2', 'Feet', '10', 'Kg/Each');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_no` varchar(255) NOT NULL,
  `po_number` varchar(255) DEFAULT NULL,
  `supplier` varchar(255) DEFAULT NULL,
  `arrival_depo` varchar(255) DEFAULT NULL,
  `on_transit` varchar(255) DEFAULT NULL,
  `landing_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `vat_invoice` varchar(255) DEFAULT NULL,
  `etd` date DEFAULT NULL,
  `misc_invoices` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`misc_invoices`)),
  `remarks` text DEFAULT NULL,
  `clearance_invoice_no` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `invoice_no`, `po_number`, `supplier`, `arrival_depo`, `on_transit`, `landing_date`, `created_at`, `updated_at`, `vat_invoice`, `etd`, `misc_invoices`, `remarks`, `clearance_invoice_no`) VALUES
(12, 'INV01', 'PO01', 'ABC Supplier', 'Port1', 'In water', '2025-07-31', '2025-07-15 06:39:13', '2025-07-15 07:36:07', 'Vat01', '2025-07-15', '[{\"invoice\":\"Inv01\",\"remark\":\"Product Delayed\"}]', NULL, 'clr01'),
(13, 'INV02', 'PO02', 'XYZ Supplier', 'Port2', 'In water', '2025-08-03', '2025-07-15 07:41:37', '2025-07-15 07:43:27', 'Vat02', '2025-07-15', '[{\"invoice\":\"Inv02\",\"remark\":\"In Transit\"}]', NULL, 'Clr02');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_assignments`
--

CREATE TABLE `invoice_assignments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` bigint(20) UNSIGNED NOT NULL,
  `port` varchar(255) NOT NULL,
  `agent_id` bigint(20) UNSIGNED NOT NULL,
  `agent_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_assignments`
--

INSERT INTO `invoice_assignments` (`id`, `invoice_id`, `port`, `agent_id`, `agent_name`, `created_at`, `updated_at`) VALUES
(37, 12, 'Port1', 2, 'Gurmeet', '2025-07-15 07:16:54', '2025-07-15 07:16:54'),
(38, 13, 'Port2', 1, 'Gurdeep', '2025-07-15 07:42:17', '2025-07-15 07:42:17');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_containers`
--

CREATE TABLE `invoice_containers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` bigint(20) UNSIGNED NOT NULL,
  `container_id` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_containers`
--

INSERT INTO `invoice_containers` (`id`, `invoice_id`, `container_id`, `created_at`, `updated_at`) VALUES
(25, 12, 'Container01', '2025-07-15 06:39:13', '2025-07-15 06:39:13'),
(26, 13, 'Container2', '2025-07-15 07:41:37', '2025-07-15 07:41:37');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_products`
--

CREATE TABLE `invoice_products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` bigint(20) UNSIGNED NOT NULL,
  `invoice_container_id` bigint(20) UNSIGNED NOT NULL,
  `inventory_id` bigint(20) UNSIGNED DEFAULT NULL,
  `marking` varchar(255) DEFAULT NULL,
  `size` double DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `total_bundles` int(11) DEFAULT NULL,
  `quantity_per_bundle` int(11) DEFAULT NULL,
  `total_product` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_products`
--

INSERT INTO `invoice_products` (`id`, `invoice_id`, `invoice_container_id`, `inventory_id`, `marking`, `size`, `weight`, `total_bundles`, `quantity_per_bundle`, `total_product`, `created_at`, `updated_at`) VALUES
(47, 12, 25, 12, 'Yes', 16, 20, 12, 20, 240, '2025-07-15 06:39:13', '2025-07-15 06:39:13'),
(48, 13, 26, 13, 'No', 2, 10, 10, 20, 200, '2025-07-15 07:41:37', '2025-07-15 07:41:37');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_05_21_102029_create_categories_table', 1),
(5, '2025_05_22_053037_create_inventories_table', 1),
(6, '2025_05_22_054512_create_variants_table', 1),
(7, '2025_05_22_064759_add_variant_fields_to_inventories_table', 1),
(8, '2025_05_22_065411_add_category_id_to_inventories_table', 1),
(9, '2025_05_26_091837_create_invoices_table', 1),
(10, '2025_05_26_091840_create_invoice_containers_table', 1),
(11, '2025_05_26_091840_create_invoice_products_table', 1),
(12, '2025_05_28_125807_create_agents_table', 2),
(13, '2025_06_03_130842_create_suppliers_table', 2),
(15, '2025_06_11_075313_create_ports_table', 4),
(16, '2025_06_09_052504_create_depos_table', 5),
(17, '2025_06_27_064935_create_invoice_assignments_table', 5),
(18, '2025_07_04_093305_add_misc_fields_to_invoices_table', 6),
(19, '2025_07_04_122651_change_misc_invoices_type_on_invoices_table', 7),
(20, '2025_07_08_062416_create_final_inventories_table', 8),
(21, '2025_07_08_080134_create_final_inventories_table', 9),
(22, '2025_07_10_054347_create_carts_table', 10),
(23, '2025_07_14_061611_create_dispatch_history_table', 11),
(24, '2025_07_14_110531_add_clearance_invoice_no_to_invoices_table', 12);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ports`
--

CREATE TABLE `ports` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ports`
--

INSERT INTO `ports` (`id`, `name`, `location`, `created_at`, `updated_at`) VALUES
(1, 'Port1', 'Mohali', '2025-06-11 04:24:02', '2025-06-11 05:04:52'),
(2, 'Port2', 'Chandigarh', '2025-06-11 04:24:47', '2025-06-11 04:24:47'),
(5, 'Port 3', 'Delhi', '2025-07-15 07:17:34', '2025-07-15 07:17:34');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0ROi6eh67lYWnvz372acTzxxrRhj4egL6GGBfXFm', NULL, '87.236.176.216', 'Mozilla/5.0 (compatible; InternetMeasurement/1.0; +https://internet-measurement.com/)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibEppZVlzWGtZbHhFUTlnTllZT2I0RjBWbDczYjBrcXVaa0tSdEd2QSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNzo4MDAwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1753939782),
('2GzBltHqXZ6YFfZ24ELbnbVk31D9yqZCJoQEMzAD', 1, '103.164.67.227', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiRzlLTWxzMm1qWWN6cDg1RHUyc3BTNmJ6RDhzdUlSRTdsblpqeGx3WSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDU6Imh0dHA6Ly9hbmMua3Jpc2huYWlzLmNvbS9hbmMtbGF0ZXN0L2Rhc2hib2FyZCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1753954154),
('6c1vEPJU9qzcR8mRWwTWlX7Jyf77CUR9pc5auWgg', NULL, '204.76.203.208', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiT2J6d2ZSNDBoczBJV2VOR3g5S3pxVExSUEU2djBmVmFlNG5DbzJ5RSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753945763),
('7Oix2xgrJ4W9k1j8jbmWDTXg2VteZliFC4E98LWc', NULL, '103.164.67.227', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSnFyR05hSjUzbmpWQjJ4eUgzWXRDdHJXeGF5OGRNeUNwYWJhMFpnbyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNzo4MDAwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1753954752),
('9B8AppWDpFtSomHvLQDxnN55QO9u8XlkYVtYM6N8', NULL, '185.218.84.22', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYVhZcWZHWklKRzZ5T2FjeVlCYkI0ZjVDT2hOcXh2YTc4ZzJlTW96NSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753945399),
('aAmFmcOtVihGko61hiiJXPT8QOc4VOdWFUGHi2MN', NULL, '204.76.203.208', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNUdHZmNiazRLc3FnU1llSHc2bXM3OXBhb2FYMHdMWTJPTU94dHlMSyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753945535),
('ATIGeS6FqEYX6GXYts3PuhP8u3fGlJlkdnrFDzo9', 1, '103.164.67.227', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiMmFYS1MwOUdjajJndExEVFhXb1VUY3VTbXVTNDc5eGFPU251RzBZYSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly9hbmMua3Jpc2huYWlzLmNvbS9hbmMtbGF0ZXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1753946131),
('Ayp8hRdY9d65wMaUFV5frEa4riIzxl9spD2tN9g0', NULL, '204.76.203.208', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQjVnbjJuSGxVQTlOUjljeUNaSERWVTFuUHJaT2drUVdQdTJlTjRHMSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753945447),
('cDXtj5QJPQZTl6QWynUFzav8ZBVVwLgCqSINWsvU', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibnFnUW1rd1RBY21mY3FFdERORGlpMlZzSHpHOUpwdFZUZHpMUXNYMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9sb2NhbGhvc3QvYW5jLWxhdGVzdCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753946271),
('ENTx4rKpfq9yUV4p8FgHDAkItz2yB6aYeKvRXgDs', NULL, '34.93.217.208', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.63', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWXBDcmJvTFp0c3hmNzFJTWdIanYxQ3VHMUU5aFNWb3loSG42a2Q1NyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNzo4MDAwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1753942818),
('ER7K5HRr01ARnt2JbOU7JKMBJoZsuTioCbAvfYQi', NULL, '204.76.203.208', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSUFlNVBXcGpOdGdDaWlZNmRRYzY5QlVlT091OU5VTWZndDRpam92RSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753945248),
('HI8YU9XKa8bV8IYVhk9ir5mfjEyqmLHQYWLW9VW6', NULL, '103.164.67.227', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiVlEyVjlkTHhZV0hMMHBramw4TjNGVUxQZ3l3cUxsRWVEMFBFWDF6SCI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czozNToiaHR0cDovLzEwMy4xNjQuNjcuMjI3OjgwMDAvaW52b2ljZXMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyNjoiaHR0cDovLzEwMy4xNjQuNjcuMjI3OjgwMDAiO319', 1753945759),
('hMBskk9DOFMko9c9NsdnUDPjaSa7yBqKLx4ME4ak', NULL, '204.76.203.211', 'Hello World/1.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidGxFbnhUV3JMZmt6ZXY5UTQ4aDB5VXdiQVM5UGxpQjZkZVJ2dHRHcyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753945471),
('iGd8zAWyci2PNhuuaLrB0KhDqVso3tZ2x0K29Qx8', NULL, '185.218.84.22', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNTBvZEp5WFpJZ1hwN2I5bEl6OXVKQWEzbmp3WE11OW5EdGozcWxZbCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753945650),
('iy1NWha3syLR3bCcKyJYjW4nDjCKi4kZKVcMhcHk', NULL, '43.167.245.18', 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiblA4ZEFRbFBmYmh4b3hsWkpNWER0QjNDYXNrWE1jMDZCRWlQOVNlOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNy9hbmMtbGF0ZXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1753950619),
('jtyE6gvNC9cqKgMcRZ0QnDrVfknWodLyg8XY2os6', NULL, '185.218.84.27', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicTJMRlZuSDBVN1VNWmJ0cno1cDIweEp5RktYbDZIcFRYemM2Y1ppciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753945528),
('MJU8n0KKjguXedZ7VHELt0jWjcXcPx1Vz1QbsIFc', NULL, '204.76.203.208', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVm9Bd3BqS2MwV3BGZ2xtQk8zdHROOXNud3Z3VjZJaTZsZDI1OFlSZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753945620),
('MlNKp8XZoIxIH7Eao5htewezbqdrR4eVYBwrI6s0', NULL, '185.218.84.27', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUXJ3NDVQRjgyMUhVT21kUXpKQ1NQd0N5SFk5Q250cWJNQ08wZDE0eiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753945745),
('mOuXMidWIDTNY6AbSFQJ3V2O5Em3U0fDBeUKBO04', NULL, '204.76.203.208', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYXFEMmR5dlhkYXBsR2dtdkViVDZ4MmdyT1l4SlJxNFBURE1QZVVteCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753945393),
('Mtv2tqDZ9gwv5ZhVAvtIB4jfwclmrOzxgTq0cvcL', NULL, '34.93.210.140', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.6.19', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieVo0b1VQTUxsdlpMd25WVEtNZm5lNUgyTTBZZnlnWktrZUNiSU5WRyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNzo4MDAwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1753953524),
('muFRLhw1PWY5Ha759vVMlYpg8aSRa1Wgf9RlKiv6', NULL, '195.184.76.114', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZVRySUNSa0pMZ2ZUSDZXWGJ2dU4wUmw0U2VjOW95ZkNvU29nQ0JRUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNzo4MDAwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1753939883),
('OibVUhUlmfKF7fA1lYVtpQMcYRRJErUuNjxNR8SS', NULL, '204.76.203.208', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVGMyTmp6MTllUnZUemdWU2ZkRWMzamFTeFVNNUR0WUlqUk0wVE1PSiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753945325),
('oOeYsd4HbeeaddJ6s7IlqiN3ouezXSUjaJIjKmzY', NULL, '185.242.226.48', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRHZoMkJjUDlVVUlGdGlNV0hSQTNFNjVBd1oxOUVCakp3aGJHUFdNaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjY6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNzo4MDAwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1753945661),
('pNg5ReNzZLHbnxXKmXPEXkZXRNGPHkz4EqMCFUy0', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiS3o4YVZaYm12Q3Q4ZnJ4bE1SNjY3N21qMVJDQVlPZjRrOEZteDMyVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzQ6Imh0dHA6Ly9sb2NhbGhvc3QvYW5jLWxhdGVzdC9wdWJsaWMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753945979),
('QLZRp38XzWPT1RI3HswevXb8HRUBysDfeeq50iwf', NULL, '89.42.231.140', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUHZlc3h1Y2l0QWZiZ2JJOXBGdWhQT3J5TlBLQTNUTjBjeHBpN3BVaSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753945811),
('s0w9kZ8JtErFmEEcnkZI7NGvSeWMgyznS0dRMrrk', NULL, '89.42.231.140', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUlB4RURVZEIxT1ZkS2JPcVhYZkRTajR3QXBqSHpIcXJqcXBaNHdyciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753945533),
('st37uFAkZ4sxVx7DoPW7f6o11ZbDhuQ6PTEs4tae', NULL, '3.134.148.59', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoid1plUnVrdHNqUFFQUVpnSXo2T2QwZ0xCbzB6RThFZUZGSm11a2l3SSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753945233),
('uHs7Y6r80UQCNoILr9sbqaCZ0GYEzE6aBx1pV04V', NULL, '103.164.67.227', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWE9YczRMajJnSWluN2VwTU4wbVVpMmtVZzdQbUpGVXh3b24yNXQzciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly9hbmMua3Jpc2huYWlzLmNvbS9hbmMtbGF0ZXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1753947105),
('V1ueAwqNNSJM6GQ8xcl0zqZGyi1BQ3sjAUmPZNhO', NULL, '185.218.84.23', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaVpnNGUxUGFXb3VseW5Rb1hRc0YxdGUwSGFFUVA5UGJxajlnMnBWWSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753945377),
('yJAQkQo5fJ6xVJg2BVBZM59YrrzVwyg7uGb9bHt7', NULL, '89.42.231.140', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaVBFOGIxWFZZMGxvWFp1eWVRejFPUWFXYXhLSnpmdFVjWjF6eVNzdyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753945210),
('ZmtC34GUgLvBaFH0tbtp1xeOCOKs3gnMZyeutYNw', NULL, '204.76.203.208', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSFVhOWVKWlA1ZmtuWmxPbzJYZmNXWFNhdVI4TjRaZmowV1lBOVlMRSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMDMuMTY0LjY3LjIyNyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753945667);

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `email`, `location`, `contact_number`, `created_at`, `updated_at`) VALUES
(24, 'ABC Supplier', 'testsupplier@yopmail.com', 'Chandigarh', '1112223334', '2025-07-15 06:29:26', '2025-07-15 06:29:26'),
(25, 'XYZ Supplier', 'xyzsupplier@yopmail.com', 'Mohali', '4445556661', '2025-07-15 06:30:17', '2025-07-15 06:30:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Gurjot', 'gurjot@yopmail.com', NULL, '$2y$12$hFKV7wvakEkK7kfJkgjvT.Df8lo0Nzicmwk4yBvbF1MuUD189Eahe', NULL, '2025-06-04 02:02:36', '2025-06-04 02:02:36');

-- --------------------------------------------------------

--
-- Table structure for table `variants`
--

CREATE TABLE `variants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `inventory_id` bigint(20) UNSIGNED NOT NULL,
  `size` varchar(255) NOT NULL,
  `size_unit` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `weight_unit` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `agents_email_unique` (`email`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_inventory_id_foreign` (`inventory_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `depos`
--
ALTER TABLE `depos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `depos_email_unique` (`email`);

--
-- Indexes for table `dispatch_history`
--
ALTER TABLE `dispatch_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `final_inventories`
--
ALTER TABLE `final_inventories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `final_inventories_invoice_id_foreign` (`invoice_id`),
  ADD KEY `final_inventories_invoice_container_id_foreign` (`invoice_container_id`),
  ADD KEY `final_inventories_invoice_product_id_foreign` (`invoice_product_id`),
  ADD KEY `final_inventories_inventory_id_foreign` (`inventory_id`);

--
-- Indexes for table `inventories`
--
ALTER TABLE `inventories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventories_category_id_foreign` (`category_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice_assignments`
--
ALTER TABLE `invoice_assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_assignments_invoice_id_foreign` (`invoice_id`);

--
-- Indexes for table `invoice_containers`
--
ALTER TABLE `invoice_containers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_containers_invoice_id_foreign` (`invoice_id`);

--
-- Indexes for table `invoice_products`
--
ALTER TABLE `invoice_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_products_invoice_container_id_foreign` (`invoice_container_id`),
  ADD KEY `invoice_products_inventory_id_foreign` (`inventory_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `ports`
--
ALTER TABLE `ports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `suppliers_email_unique` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `variants`
--
ALTER TABLE `variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `variants_inventory_id_foreign` (`inventory_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agents`
--
ALTER TABLE `agents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `depos`
--
ALTER TABLE `depos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dispatch_history`
--
ALTER TABLE `dispatch_history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `final_inventories`
--
ALTER TABLE `final_inventories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `inventories`
--
ALTER TABLE `inventories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `invoice_assignments`
--
ALTER TABLE `invoice_assignments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `invoice_containers`
--
ALTER TABLE `invoice_containers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `invoice_products`
--
ALTER TABLE `invoice_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `ports`
--
ALTER TABLE `ports`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `variants`
--
ALTER TABLE `variants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_inventory_id_foreign` FOREIGN KEY (`inventory_id`) REFERENCES `inventories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `final_inventories`
--
ALTER TABLE `final_inventories`
  ADD CONSTRAINT `final_inventories_inventory_id_foreign` FOREIGN KEY (`inventory_id`) REFERENCES `inventories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `final_inventories_invoice_container_id_foreign` FOREIGN KEY (`invoice_container_id`) REFERENCES `invoice_containers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `final_inventories_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `final_inventories_invoice_product_id_foreign` FOREIGN KEY (`invoice_product_id`) REFERENCES `invoice_products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `inventories`
--
ALTER TABLE `inventories`
  ADD CONSTRAINT `inventories_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `invoice_assignments`
--
ALTER TABLE `invoice_assignments`
  ADD CONSTRAINT `invoice_assignments_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `invoice_containers`
--
ALTER TABLE `invoice_containers`
  ADD CONSTRAINT `invoice_containers_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `invoice_products`
--
ALTER TABLE `invoice_products`
  ADD CONSTRAINT `invoice_products_inventory_id_foreign` FOREIGN KEY (`inventory_id`) REFERENCES `inventories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `invoice_products_invoice_container_id_foreign` FOREIGN KEY (`invoice_container_id`) REFERENCES `invoice_containers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `variants`
--
ALTER TABLE `variants`
  ADD CONSTRAINT `variants_inventory_id_foreign` FOREIGN KEY (`inventory_id`) REFERENCES `inventories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
