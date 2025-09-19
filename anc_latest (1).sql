-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 19, 2025 at 06:27 AM
-- Server version: 8.0.43-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

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
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `agents`
--

INSERT INTO `agents` (`id`, `name`, `email`, `location`, `contact_number`, `created_at`, `updated_at`) VALUES
(1, 'Gurmeet', 'gm@yopmail.com', 'Mohali', '0099889900', '2025-08-21 02:25:26', '2025-08-21 02:25:26'),
(2, 'Gurdeep', 'gdp@yopmail.com', 'Chd', '45454545', '2025-08-21 02:26:03', '2025-08-21 02:26:03');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint UNSIGNED NOT NULL,
  `inventory_id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Steel Rods', 'categories/1755762305_steel-rods.jpg', '2025-08-21 01:55:02', '2025-08-21 02:15:05'),
(2, 'Iron road', 'categories/1758198623_iron_road.jpg', '2025-09-18 07:00:23', '2025-09-18 07:00:23');

-- --------------------------------------------------------

--
-- Table structure for table `depos`
--

CREATE TABLE `depos` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dispatch_history`
--

CREATE TABLE `dispatch_history` (
  `id` bigint UNSIGNED NOT NULL,
  `invoice_id` bigint UNSIGNED DEFAULT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int NOT NULL,
  `total_weight` double NOT NULL,
  `arrival_depo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dispatched_at` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dispatch_history`
--

INSERT INTO `dispatch_history` (`id`, `invoice_id`, `product_id`, `product_name`, `size`, `quantity`, `total_weight`, `arrival_depo`, `dispatched_at`, `created_at`, `updated_at`) VALUES
(1, NULL, 1, 'Stainless Steel Rod', '18', 1, 70, 'Chandigarh', '2025-08-21', '2025-08-21 05:24:02', '2025-08-21 05:24:02'),
(2, NULL, 1, 'Stainless Steel Rod', '18', 1, 70, 'Chandigarh', '2025-08-21', '2025-08-21 05:26:10', '2025-08-21 05:26:10'),
(3, NULL, 1, 'Stainless Steel Rod', '18', 1, 70, 'Chandigarh', '2025-08-22', '2025-08-22 04:56:16', '2025-08-22 04:56:16'),
(4, NULL, 1, 'Stainless Steel Rod', '18', 1, 70, 'Chandigarh', '2025-08-22', '2025-08-22 05:09:50', '2025-08-22 05:09:50'),
(5, NULL, 1, 'Stainless Steel Rod', '18', 5, 350, 'Chandigarh', '2025-08-22', '2025-08-22 05:10:06', '2025-08-22 05:10:06'),
(6, NULL, 1, 'Stainless Steel Rod', '18', 1, 70, 'Mohali', '2025-08-22', '2025-08-22 06:48:53', '2025-08-22 06:48:53'),
(9, NULL, 1, 'Stainless Steel Rod', '18', 5, 350, 'Mohali', '2025-08-22', '2025-08-22 07:03:10', '2025-08-22 07:03:10'),
(10, NULL, 1, 'Stainless Steel Rod', '18', 5, 350, 'Chandigarh', '2025-08-22', '2025-08-22 07:03:34', '2025-08-22 07:03:34'),
(11, NULL, 1, 'Stainless Steel Rod', '18', 1, 70, 'Mohali', '2025-08-23', '2025-08-23 12:50:01', '2025-08-23 12:50:01'),
(12, NULL, 1, 'Stainless Steel Rod', '18', 1, 70, 'Mohali', '2025-08-23', '2025-08-23 13:46:03', '2025-08-23 13:46:03'),
(13, NULL, 1, 'Stainless Steel Rod', '18', 1, 70, 'Mohali', '2025-08-23', '2025-08-23 13:49:33', '2025-08-23 13:49:33'),
(14, NULL, 1, 'Stainless Steel Rod', '18', 1, 70, 'Mohali', '2025-08-23', '2025-08-23 13:53:29', '2025-08-23 13:53:29'),
(15, 4, 1, 'Stainless Steel Rod', '18', 1, 70, 'Chandigarh', '2025-08-23', '2025-08-23 13:55:28', '2025-08-23 13:55:28'),
(16, 4, 1, 'Stainless Steel Rod', '18', 5, 350, 'Chandigarh', '2025-08-23', '2025-08-23 13:56:42', '2025-08-23 13:56:42'),
(17, 4, 1, 'Stainless Steel Rod', '18', 2, 140, 'Mohali', '2025-08-23', '2025-08-23 14:01:11', '2025-08-23 14:01:11'),
(20, 4, 1, 'Stainless Steel Rod', '18', 3, 210, 'Mohali', '2025-08-23', '2025-08-23 14:07:08', '2025-08-23 14:07:08'),
(21, 4, 1, 'Stainless Steel Rod', '18', 7, 490, 'Chandigarh', '2025-08-23', '2025-08-23 14:07:34', '2025-08-23 14:07:34'),
(22, 5, 2, 'Iron 20', '12', 2, 40, 'Mohali', '2025-09-18', '2025-09-18 07:19:41', '2025-09-18 07:19:41');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `final_inventories`
--

CREATE TABLE `final_inventories` (
  `id` bigint UNSIGNED NOT NULL,
  `invoice_id` bigint UNSIGNED NOT NULL,
  `invoice_container_id` bigint UNSIGNED NOT NULL,
  `invoice_product_id` bigint UNSIGNED NOT NULL,
  `inventory_id` bigint UNSIGNED NOT NULL,
  `total_product` int DEFAULT NULL,
  `marking` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `finalized_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `arrival_port` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `final_inventories`
--

INSERT INTO `final_inventories` (`id`, `invoice_id`, `invoice_container_id`, `invoice_product_id`, `inventory_id`, `total_product`, `marking`, `finalized_at`, `created_at`, `updated_at`, `arrival_port`, `quantity`) VALUES
(2, 3, 3, 1, 1, NULL, NULL, '2025-08-21 03:30:32', '2025-08-21 03:30:32', '2025-08-23 13:49:33', 'Mohali', '78'),
(3, 4, 4, 2, 1, NULL, NULL, '2025-08-21 04:03:38', '2025-08-21 04:03:38', '2025-08-23 14:07:34', 'Chandigarh', '164'),
(5, 4, 4, 2, 1, NULL, NULL, '2025-08-21 04:34:18', '2025-08-21 04:34:18', '2025-08-23 14:07:08', 'Mohali', '7'),
(8, 5, 5, 3, 1, NULL, NULL, '2025-09-18 23:54:23', '2025-09-18 23:54:23', '2025-09-18 23:54:23', 'Mohali', '240'),
(9, 5, 6, 4, 2, NULL, NULL, '2025-09-18 23:54:26', '2025-09-18 23:54:26', '2025-09-18 23:54:26', 'Mohali', '5');

-- --------------------------------------------------------

--
-- Table structure for table `inventories`
--

CREATE TABLE `inventories` (
  `id` bigint UNSIGNED NOT NULL,
  `category_id` bigint UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `size` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size_unit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weight` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weight_unit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventories`
--

INSERT INTO `inventories` (`id`, `category_id`, `name`, `image`, `created_at`, `updated_at`, `size`, `size_unit`, `weight`, `weight_unit`) VALUES
(1, 1, 'Stainless Steel Rod', 'inventories/1755762432_Threaded-stainless-steel-rod-rou.jpg', '2025-08-21 02:17:12', '2025-08-21 02:20:56', '18', 'Feet', '70', 'Kg/Each'),
(2, 2, 'Iron 20', 'inventories/1758198662_iron_road.jpg', '2025-09-18 07:01:02', '2025-09-18 07:01:02', '12', 'Feet', '20', 'Kg/Each');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` bigint UNSIGNED NOT NULL,
  `invoice_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `po_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplier` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `arrival_depo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `on_transit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `landing_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `vat_invoice` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `etd` date DEFAULT NULL,
  `misc_invoices` json DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `clearance_invoice_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `invoice_no`, `po_number`, `supplier`, `arrival_depo`, `on_transit`, `landing_date`, `created_at`, `updated_at`, `vat_invoice`, `etd`, `misc_invoices`, `remarks`, `clearance_invoice_no`) VALUES
(3, 'INV01', 'PO-01', 'ABC Supplier', 'Mohali', 'In water', '2025-08-22', '2025-08-21 02:24:34', '2025-08-21 02:27:06', 'VAT-01', '2025-08-21', '[{\"remark\": null, \"invoice\": null}]', NULL, 'CLR-01'),
(4, 'INV02', 'PO-02', 'XYZ Supplier', 'Chandigarh', 'In water', '2025-08-22', '2025-08-21 04:03:17', '2025-08-21 04:03:17', NULL, NULL, NULL, NULL, NULL),
(5, 'I147852', 'P852147', 'ABC Supplier', 'Mohali', 'In water', '2025-09-30', '2025-09-18 07:02:13', '2025-09-18 07:07:56', NULL, '2025-09-18', '[{\"remark\": null, \"invoice\": \"I854\"}]', NULL, 'C8976');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_assignments`
--

CREATE TABLE `invoice_assignments` (
  `id` bigint UNSIGNED NOT NULL,
  `invoice_id` bigint UNSIGNED NOT NULL,
  `port` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `agent_id` bigint UNSIGNED NOT NULL,
  `agent_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_assignments`
--

INSERT INTO `invoice_assignments` (`id`, `invoice_id`, `port`, `agent_id`, `agent_name`, `created_at`, `updated_at`) VALUES
(1, 3, 'Mohali', 1, 'Gurmeet', '2025-08-21 02:26:27', '2025-08-21 02:26:27'),
(2, 4, 'Chandigarh', 1, 'Gurmeet', '2025-08-21 04:03:27', '2025-08-21 04:03:27'),
(3, 5, 'Mohali', 2, 'Gurdeep', '2025-09-18 07:04:32', '2025-09-18 07:04:32');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_containers`
--

CREATE TABLE `invoice_containers` (
  `id` bigint UNSIGNED NOT NULL,
  `invoice_id` bigint UNSIGNED NOT NULL,
  `container_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_containers`
--

INSERT INTO `invoice_containers` (`id`, `invoice_id`, `container_id`, `created_at`, `updated_at`) VALUES
(3, 3, 'Container01', '2025-08-21 02:24:34', '2025-08-21 02:24:34'),
(4, 4, 'Container1', '2025-08-21 04:03:17', '2025-08-21 04:03:17'),
(5, 5, 'C123', '2025-09-18 07:02:13', '2025-09-18 07:02:13'),
(6, 5, 'C456', '2025-09-18 07:02:13', '2025-09-18 07:02:13');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_products`
--

CREATE TABLE `invoice_products` (
  `id` bigint UNSIGNED NOT NULL,
  `invoice_container_id` bigint UNSIGNED NOT NULL,
  `inventory_id` bigint UNSIGNED DEFAULT NULL,
  `marking` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` double DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `total_bundles` int DEFAULT NULL,
  `quantity_per_bundle` int DEFAULT NULL,
  `total_product` int DEFAULT NULL,
  `invoice_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_products`
--

INSERT INTO `invoice_products` (`id`, `invoice_container_id`, `inventory_id`, `marking`, `size`, `weight`, `total_bundles`, `quantity_per_bundle`, `total_product`, `invoice_id`, `created_at`, `updated_at`) VALUES
(1, 3, 1, 'Yes', 18, 70, 10, 10, 79, 3, '2025-08-21 02:24:34', '2025-08-23 12:50:01'),
(2, 4, 1, 'Yes', 18, 70, 20, 10, 180, 4, '2025-08-21 04:03:17', '2025-08-21 04:34:18'),
(3, 5, 1, 'Yes', 18, 70, 12, 20, 240, 5, '2025-09-18 07:02:13', '2025-09-18 07:02:13'),
(4, 6, 2, 'No', 12, 20, 2, 2, 5, 5, '2025-09-18 07:02:13', '2025-09-18 07:04:52');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
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
(12, '2025_05_28_125807_create_agents_table', 1),
(13, '2025_06_03_130842_create_suppliers_table', 1),
(14, '2025_06_09_052504_create_depos_table', 1),
(15, '2025_06_11_075313_create_ports_table', 1),
(16, '2025_06_27_064935_create_invoice_assignments_table', 1),
(17, '2025_07_04_093305_add_misc_fields_to_invoices_table', 1),
(18, '2025_07_04_122651_change_misc_invoices_type_on_invoices_table', 1),
(19, '2025_07_08_080134_create_final_inventories_table', 1),
(20, '2025_07_10_054347_create_carts_table', 1),
(21, '2025_07_14_061611_create_dispatch_history_table', 1),
(22, '2025_07_14_110531_add_clearance_invoice_no_to_invoices_table', 1),
(23, '2025_08_01_100637_create_quickbooks_tokens_table', 1),
(24, '2025_08_05_061405_add_is_main_to_ports_table', 1),
(25, '2025_08_07_055242_add_arrival_port_to_final_inventories_table', 1),
(26, '2025_08_21_070355_add_invoice_id_to_dispatch_histories_table', 1),
(27, '2025_08_21_075350_add_invoice_columns_to_invoice_products_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ports`
--

CREATE TABLE `ports` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_main` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ports`
--

INSERT INTO `ports` (`id`, `name`, `location`, `created_at`, `updated_at`, `is_main`) VALUES
(1, 'Mohali', 'Mohali', '2025-08-21 02:19:14', '2025-09-18 23:18:03', 1),
(2, 'Chandigarh', 'Chandigarh', '2025-08-21 02:19:30', '2025-09-18 23:18:03', 0),
(3, 'Kharar', 'Kharar', '2025-09-18 07:05:37', '2025-09-18 23:18:03', 0);

-- --------------------------------------------------------

--
-- Table structure for table `quick_books_tokens`
--

CREATE TABLE `quick_books_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `access_token` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `refresh_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `realm_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `quick_books_tokens`
--

INSERT INTO `quick_books_tokens` (`id`, `access_token`, `refresh_token`, `realm_id`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwieC5vcmciOiJIMCJ9..AM1kRqNYwLvx-QOrJNLjHQ.AlHEU4sOvY_Lb-qL2oqe1Gnxm7vz7X7fjHCv_0pbuoRtBopNMjx9lpneJJl4pA42pw65jt-XTzplA8l_m9Im0WKEoMJBWCgSBKUajCOvLh8sXrJLiiFRT3tJJIjfiz7PTa-mkPX5YTDiQ5E_IhTo4YIQttjF0pWWL0l2JOqZDNDjHI8T7biRQUzlWyG3bGlUq89kRMxjsqu5TZTzt6qYXBFuK-A-gZZUz9eAC7wOzPAzT1-2LvixyhIQJEJyCyv_TaqrODjoT23pUrpdTFlJl9OGG6gd9R4K_mM2u-YM4jbnPJYGj8Z7_F7C_ZNEtfhk2OWSDxCz9o_ACFgHzxOUOYnqZLJTP_3jsT2bZCqjpoJi8gUptouyktsSNNuCeIE-DLRI3VlCal_Mr0wsd7YkmLO2y_2OM-lYKU-lTca4vVjiHjHsSxm96pEHKVy-Xb2xUvLPYncYocKiSxrAF7o21w5YfSuOT986nlKBcKCf6i0.GJa-w6OAQEVOS5sOZpE1Vw', 'RT1-161-H0-1766985840y5gr8xudoc7fn1nq1sdp', '9341455111668725', '2025-09-19 00:54:00', NULL, '2025-09-18 23:54:00');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('1MyJ49JQuN4xNNfoasbnnv7R42Z9eLldnTO485QW', NULL, '36.106.167.172', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTzJ0bDd0Vzhwa0ZyWGFWbFdkb2JDM3ZFajh0RzVOc1o5alp3cHhjMCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758232270),
('40sHVfjiJe9Hut5gipPzEUIuhZDbTTTLI5P8O1nl', NULL, '45.156.129.57', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicFZUYmxzb2xWTnFaSWVUOVYyN1czNlY2T0g1djFYVW9QSkcyeUM0ZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758252525),
('4lAZrxbwE157MMNFXSvwrRBbNFXzNSHjF9rJ8E1c', NULL, '172.237.124.98', 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:8.0) Gecko/20100101 Firefox/8.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVmRlSmdDTk5mQXdYZkxqTndTRVdzcVJsU044dDB5bzdGSEdOSFFQOSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758257067),
('9xtqTpVYK5csRuyjGBfOUzE6eJQ8cdsp3HDnn1k0', NULL, '123.245.85.25', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRzZNSG5WOVQwcUhhMjNxUHpHQ0tzUkxwWmdyZkp3M1hTc0JTdmt6MCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758233368),
('9ZWjOp5hWiqljOvwL3QXpfVtjZAU7V6KtKOT1z83', NULL, '62.133.46.20', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN1lWRjlzYkdNeXV1YmN3SGd5ZjcyVm5oZzQySHVXWWpuT1ZvaXZEciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758247420),
('CY1aq3v3iN1y1c6t4lsS8nDInE7wwK7Xcpni33ZG', NULL, '182.138.158.92', '', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUndzc3FvdzJ3aTRkWWc3QjU1aDhzaTlNRmF4aFc1Tm5yT1JENWdwbSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758232041),
('day4DPS2AC1fhpFswQtozdmbmWnqzQBnhBZAZPJg', NULL, '121.29.178.171', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN29aZlR1VW5tTWRBdW1McVJuU2pRWXRaYkNISVRDTjV4QTh3NnFxYSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758232570),
('DiMqNpxz3eBN0ZzI983Lg6nvVDT7HvsdP5fEMpeu', NULL, '74.82.47.2', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 Edg/139.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieXB2RTYxYUlEVUNIUHVhcjBEQXV3dTFLaEcyUFFDUm9kcVpESU12NyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758251186),
('FLw9guv2KANoK7oowgZQ5jbUY2SSbIr0u5jyXFie', NULL, '103.164.67.226', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM0RzNmRqS2tUdnY1emVvcXhBN3Z0TFBQVDdrMExxN1JUaEtVeVhxciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHBzOi8vYW5jLmtyaXNobmFpcy5jb20iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758259452),
('G6v4XN51mUokbf9bo8Nn2I10JlO8QSCFxOajs01n', NULL, '144.126.231.115', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieVhKUWV6YmNFYXY0RjJ2ODJJUnBGaHVtaGluTEdCbHI4MjhXbU9ucyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758226484),
('IyEN5OFJwY1v94Xj9VrNbCPv4AISuTyClMJdcqVo', NULL, '74.82.47.2', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 Edg/139.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSHNtQzBHc2d2N016UlNZc2ZER3ppaGN5UFZUdk05R0JsVlY4ZUJUeSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758250428),
('kg1gOvyi4AjiVNxPdrbFnQ1rPQp4bGVRyexi3PBl', NULL, '157.230.60.44', 'Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 10.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRWxDNzdVa2VidnU0RDZsbmNXOFBxb1lyVFRiZDlKYjNBdmpwNGx2RyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758230514),
('KKSx7Fz7INfLoZEIpF5zA6JTEP1Ydr2OrJUAogCt', NULL, '13.89.125.27', 'Mozilla/5.0 zgrab/0.x', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidzd3aTlhQjFqUnlMMU1NcGZpcW1LbVEyRU1OT0lISFViN0VoUlVjVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758255697),
('M0TBkhKsy0uYpiznTa0y9nVfiXjraaW049iEPgdg', NULL, '118.212.120.23', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYTdaTUtoZ21yZTJFdnlPWlliRTBLenk3REtCQkFWMWlySUE4N3FITSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758232077),
('MnDJPCLT1iQIbkjYYiDJIFT87opVCkMNG74ZOVnG', NULL, '36.32.3.84', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRURNWU1TQWhtZVdBVXEwamtjVkZWOTR3cGp5MllhdXNZRjJmZWQycCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758232856),
('n8rmBxvMMW1xZ2kMSRvBuue0cbGXPVTGMhxCwaRT', 1, '103.164.67.227', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiTzU4UEJGaldpUUJhMlpVenlHU3Y2WjNYZmZ1MlZXTnVoQ2Q5Nzg4eCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo0NDoiaHR0cHM6Ly9hbmMua3Jpc2huYWlzLmNvbS9pbnZlbnRvcnktY2F0ZWdvcnkiO31zOjQ6ImNhcnQiO2E6MTp7czo5OiIyXzVfMTJfMjAiO2E6OTp7czoyOiJpZCI7aToyO3M6MTA6Imludm9pY2VfaWQiO2k6NTtzOjQ6Im5hbWUiO3M6NzoiSXJvbiAyMCI7czo0OiJzaXplIjtzOjI6IjEyIjtzOjk6InNpemVfdW5pdCI7czo0OiJGZWV0IjtzOjY6IndlaWdodCI7czoyOiIyMCI7czoxMToid2VpZ2h0X3VuaXQiO3M6NzoiS2cvRWFjaCI7czoxMjoiYXJyaXZhbF9kZXBvIjtzOjY6Ik1vaGFsaSI7czo4OiJxdWFudGl0eSI7aToyO319fQ==', 1758259850),
('o00LKOxAzGG4pRfCvuIVzFYPtePR4beTC2uWjn68', NULL, '182.88.236.208', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUkFOMmhkWlF2am8yQWRjbEZRZHBmYXNTVnBWRDFFU2tmb2hKb0tRRSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758233221),
('pWIXKagRufFchvzbn9N5o6PocVIjkJGIiR457RGt', NULL, '93.123.109.222', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoia3lQTjE2aG05bkNwM25VaFNZTk1mRFhoaVpnc3V0WGFzb1dVUG43YSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjg6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgvbG9naW4iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758235955),
('qd0zk0xfZRVp1bqP3ajLB7qObfmw2y3vGWMLxMBj', NULL, '34.79.192.229', 'python-requests/2.32.5', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRGRwcUNLMEYwd3puUFFPeEJzOVdlNm9LMEllUktIaTBSeHhrTzZybyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758230032),
('UB8MGcVAx33EGqrIVQOUYOg3T3ccRjcMrJmvXxtr', NULL, '122.188.28.150', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVjVGeUIxTDF2amQwb09oaDBhQ0NRZVY5Z1YwbHZUcG5JNGJqeXYwSCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758233099),
('uU7dIkubCuNmj4KBtCAhCC4Q3h6SekbWEma9ujzR', NULL, '185.242.226.118', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZGw3S1hjZTcxRFU1Z2xtZHQyYnJPWUJLRjRtVGgyY1lzZmExRWFSRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758237604),
('uxAMzSml1uaNTlVsZ0m8aR0RgXvRevCqlEwJyXbD', NULL, '171.118.67.6', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMVBLMElrRVhwa3FJV0VRNmVhdHJIYWRGWDhGQXE0MXIwaTJqbE1lMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758232751),
('vgM8SvueGagGoRPHLfKsSD6YrGQM7lu140be1D79', NULL, '220.197.51.91', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNTdjaVU1UlkyY2FPeHNOSkJtcGxkcEFEOTZjOXNITjBoZDZFTmVWWiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758232377),
('w4pvWftdNrp0nqz6wCiDQVE8QVNYZALtH5EYs8OX', NULL, '159.89.14.221', 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.0 )', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiT1l3Y2ZoWGFxQUhxOHI5dTBSMFk4UGJieEk0bG5udnNNZkdiTG9EdiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758231521),
('ZWotjDACrl1ITclimTlifHRo7ozdZsLdGWwIzNw4', NULL, '176.65.149.21', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWGdoaDRHc0ljWmd5dDU5VDNJMk9CS0FDV3BqcTl0dlJxcDBlUmR6aCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758228947),
('ZxThpWqFD6OxlIUpNWQSHki3yZITnNrcuJFPOrcO', NULL, '223.199.162.110', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTG5NUFBTR2N0cElPRzlGSUEyYWZiZXRWZU9NNlVPRFhQYVRRVktMYyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTAzLjE2NC42Ny4yMjgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1758232977);

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `email`, `location`, `contact_number`, `created_at`, `updated_at`) VALUES
(1, 'ABC Supplier', 'testsupplier@yopmail.com', 'Mohali', '1234567890', '2025-08-21 02:18:04', '2025-08-21 02:18:04'),
(2, 'XYZ Supplier', 'xyzsupplier@yopmail.com', 'Chandigarh', '0987654321', '2025-08-21 02:18:27', '2025-08-21 02:18:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Gurjot', 'gurjot@yopmail.com', NULL, '$2y$12$WV/tT8GKNTujEaW0X7gDneNs6a2wzBhzzxalOwcRqwRSV5086QCa6', NULL, '2025-08-21 01:53:07', '2025-08-21 01:53:07');

-- --------------------------------------------------------

--
-- Table structure for table `variants`
--

CREATE TABLE `variants` (
  `id` bigint UNSIGNED NOT NULL,
  `inventory_id` bigint UNSIGNED NOT NULL,
  `size` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size_unit` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `weight` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `weight_unit` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  ADD PRIMARY KEY (`id`),
  ADD KEY `dispatch_history_invoice_id_foreign` (`invoice_id`);

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
-- Indexes for table `quick_books_tokens`
--
ALTER TABLE `quick_books_tokens`
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
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `depos`
--
ALTER TABLE `depos`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dispatch_history`
--
ALTER TABLE `dispatch_history`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `final_inventories`
--
ALTER TABLE `final_inventories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `inventories`
--
ALTER TABLE `inventories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `invoice_assignments`
--
ALTER TABLE `invoice_assignments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `invoice_containers`
--
ALTER TABLE `invoice_containers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `invoice_products`
--
ALTER TABLE `invoice_products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `ports`
--
ALTER TABLE `ports`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `quick_books_tokens`
--
ALTER TABLE `quick_books_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `variants`
--
ALTER TABLE `variants`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_inventory_id_foreign` FOREIGN KEY (`inventory_id`) REFERENCES `inventories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `dispatch_history`
--
ALTER TABLE `dispatch_history`
  ADD CONSTRAINT `dispatch_history_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE SET NULL;

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
