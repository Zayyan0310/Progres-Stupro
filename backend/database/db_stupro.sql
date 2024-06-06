-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 05 Jun 2024 pada 00.12
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.1.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_stupro`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `contents`
--

CREATE TABLE `contents` (
  `id` int(25) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `tips_id` char(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `contents`
--

INSERT INTO `contents` (`id`, `title`, `description`, `tips_id`) VALUES
(1, 'Membuat Daftar Tugas', 'Tulis semua tugas yang perlu Anda selesaikan. Prioritaskan tugas berdasarkan urgensi dan pentingnya.', '1'),
(2, 'Gunakan Kalender atau Aplikasi Manajemen Waktu', 'Tentukan jadwal untuk setiap tugas dalam kalender atau aplikasi manajemen waktu. Tetapkan batas waktu yang realistis untuk setiap tugas.', '1'),
(3, 'Gunakan Teknik Pomodoro', 'Kerjakan tugas selama 25 menit, kemudian beristirahat selama 5 menit. Setelah empat sesi, beristirahat lebih lama (15-30 menit). Teknik ini dapat membantu Anda tetap fokus dan efisien.', '1'),
(4, 'Hindari Prokrastinasi', 'Mulailah mengerjakan tugas segera setelah Anda menetapkannya. Jangan menunda-nunda pekerjaan yang bisa dilakukan hari ini.', '1'),
(5, 'Atur Waktu Istirahat', 'Selain bekerja, penting juga untuk memberikan waktu istirahat yang cukup. Istirahat yang cukup dapat membantu Anda tetap segar dan produktif saat bekerja.', '1'),
(6, 'Evaluasi dan Sesuaikan', 'Lakukan evaluasi rutin terhadap jadwal Anda. Sesuaikan jadwal jika diperlukan untuk mengatasi perubahan yang muncul.', '1'),
(7, 'Identifikasi Sumber Gangguan', 'Ketahui apa yang menyebabkan gangguan tersebut. Apakah itu berasal dari lingkungan sekitar, gadget, atau faktor internal seperti kurangnya fokus.', '2'),
(8, 'Buatlah Lingkungan Kerja yang Tenang', 'Ciptakan lingkungan kerja yang bebas dari gangguan. Matikan pemberitahuan pada ponsel atau komputer dan hindari area dengan banyak aktivitas.', '2'),
(9, 'Gunakan Teknik Fokus', 'Gunakan teknik seperti Pomodoro di mana Anda bekerja selama periode waktu tertentu dan kemudian beristirahat sejenak.', '2'),
(10, 'Tetapkan Batas untuk Gangguan', 'Beri tahu orang di sekitar Anda kapan waktu yang tepat untuk tidak diganggu. Gunakan headphone atau tanda lain yang menunjukkan bahwa Anda sedang fokus dan tidak ingin diganggu.', '2'),
(11, 'Gunakan Website atau Aplikasi Pengatur Waktu', 'Gunakan website atau aplikasi yang dapat membantu Anda mengelola waktu dengan lebih efektif, seperti aplikasi pengatur waktu atau blokir situs web yang mengganggu.', '2'),
(12, 'Pahami Prioritas dan Jadwal Anda', 'Jangan biarkan gangguan mengubah prioritas atau jadwal Anda. Tetaplah fokus pada tugas yang paling penting dan sesuaikan jadwal Anda sesuai kebutuhan.', '2'),
(13, 'Mengatur waktu dengan baik', 'Agar bisa menjadi lebih produktif, kamu harus mulai mengatur waktu dengan baik. Bagaimana kamu bisa menjadi produktif kalau dalam satu hari saja kamu tidak tahu apa saja yang akan dikerjakan? Untuk itu, buatlah skala prioritas. Tentukan hal-hal mana yang akan kamu kerjakan lebih dulu dan kegiatan apa saja yang harus dilakukan hari itu. ', '3'),
(14, 'Membuat rencana dan jadwal', 'Setelah mengatur waktu atau melakukan manajemen waktu seperti di atas, sekarang saatnya kamu membuat rencana dan jadwal untuk mengerjakannya. Tuliskan semua aktivitas yang akan kamu lakukan hari itu, mulai dari bangun tidur pagi hingga menjelang tidur malam. Buatlah jadwal secara berurutan untuk memudahkan kamu mengingat apa saja yang harus dikerjakan. ', '3'),
(15, 'Menemukan “Golden Moment”', 'Salah satu cara menjadi produktif bagi pelajar adalah dengan menemukan “golden moment”. Golden moment adalah saat dimana kamu merasa memiliki kondisi terbaik untuk melakukan sesuatu. Ketika seseorang berada pada kondisi terbaik dan melakukan sebuah aktivitas, maka hasilnya akan menjadi lebih optimal. Golden moment pada setiap orang bisa saja berbeda, sehingga kamu harus mengenalinya sendiri. Mudahnya, kamu bisa mengartikan golden moment sebagai jam efektif untuk melakukan sesuatu. Biasanya, golden moment ada di pagi hari, namun beberapa orang bisa saja lebih produktif di siang atau malam hari.', '3'),
(16, 'Berlatih Mindfulness', 'Cobalah untuk mempraktikkan kesadaran (mindfulness) saat bekerja atau belajar. Fokus pada saat ini dan hindari pikiran yang melayang-layang.', '4'),
(17, 'Gunakan Musik yang Cocok', 'Beberapa orang menemukan bahwa mendengarkan musik instrumental atau musik yang menenangkan dapat membantu meningkatkan fokus dan konsentrasi.', '4'),
(18, 'Ubah Posisi atau Lingkungan', 'Kadang-kadang, mengubah posisi duduk atau lokasi tempat Anda belajar atau bekerja dapat membantu menyegarkan pikiran dan meningkatkan fokus.', '4'),
(19, 'Berikan Reward pada Diri Sendiri', 'Berikan hadiah kecil pada diri sendiri setelah berhasil menyelesaikan tugas yang sulit untuk meningkatkan motivasi dan fokus.', '4'),
(20, 'Jadwalkan Istirahat yang Teratur', 'Buat jadwal istirahat yang teratur untuk memberi waktu bagi otak Anda untuk beristirahat dan menyegarkan pikiran.', '4'),
(21, 'Hindari Multitasking', 'Fokuslah pada satu tugas pada satu waktu. Multitasking dapat mengurangi kualitas kerja dan membuat Anda lebih rentan terhadap gangguan.', '4'),
(22, 'Efisiensi Waktu', 'Dengan menetapkan prioritas, Anda dapat fokus pada tugas yang paling penting dan mendesak terlebih dahulu, sehingga menghemat waktu dan energi.', '5'),
(23, 'Menghindari Kecemasan', 'Dengan mengetahui tugas mana yang harus diselesaikan terlebih dahulu, Anda dapat mengurangi rasa cemas dan kekhawatiran tentang tugas yang belum selesai.', '5'),
(24, 'Meningkatkan Produktivitas', 'Dengan fokus pada tugas yang paling penting, Anda dapat meningkatkan produktivitas dan efektivitas dalam menyelesaikan pekerjaan.', '5'),
(25, 'Mengelola Waktu dengan Lebih Baik', 'Menetapkan prioritas membantu Anda mengelola waktu dengan lebih baik, sehingga Anda dapat lebih efisien dalam menyelesaikan tugas-tugas Anda.', '5'),
(26, 'Menghindari Penundaan', 'Dengan menetapkan prioritas, Anda dapat menghindari kebiasaan menunda-nunda pekerjaan yang dapat menghambat kemajuan Anda.', '5'),
(27, 'Mengurangi Kebingungan', 'Dengan mengetahui tugas mana yang harus diselesaikan terlebih dahulu, Anda dapat mengurangi kebingungan dan kekacauan dalam menyelesaikan pekerjaan.', '5');

-- --------------------------------------------------------

--
-- Struktur dari tabel `notes`
--

CREATE TABLE `notes` (
  `id` int(100) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `date` datetime NOT NULL,
  `status` text NOT NULL,
  `priority` text NOT NULL,
  `user_id` char(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `notes`
--

INSERT INTO `notes` (`id`, `title`, `description`, `date`, `status`, `priority`, `user_id`) VALUES
(6, 'judul', 'Deskripsi', '2024-07-06 00:00:00', 'Belum Mulai', 'Rendah', 'Xi94hY_ThrOlxrxo'),
(7, 'Tinggi Terdekat', 'ffafa', '2024-06-04 00:00:00', 'Belum Mulai', 'Tinggi', 'Xi94hY_ThrOlxrxo'),
(8, 'Tinggi Selesai', 'asasas', '2024-06-03 00:00:00', 'Selesai', 'Tinggi', 'Xi94hY_ThrOlxrxo'),
(9, 'Sedang Pertama', 'axxa', '2024-06-04 00:00:00', 'Sedang Berjalan', 'Sedang', 'Xi94hY_ThrOlxrxo'),
(10, 'Sedang Kedua', 'KEdua', '2024-06-30 00:00:00', 'Belum Mulai', 'Sedang', 'Xi94hY_ThrOlxrxo'),
(11, 'Rendah Terakhir', 'adad', '2024-07-06 00:00:00', 'Sedang Berjalan', 'Rendah', 'Xi94hY_ThrOlxrxo'),
(12, 'Catatanku', 'Dek', '2024-06-30 00:00:00', 'Belum Mulai', 'Tinggi', '5G1uOgeu9SZIzdjM');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tips`
--

CREATE TABLE `tips` (
  `id` int(25) NOT NULL,
  `title` text NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tips`
--

INSERT INTO `tips` (`id`, `title`, `image`) VALUES
(1, 'Tips dan Trik Agar Semua Tugas Dapat Selesai Tepat Waktu', '/uploads/tips/tips1.png'),
(2, 'Tips dan Trik Agar Tidak Terganggu Saat Belajar & Beraktivitas', '/uploads/tips/tips2.png'),
(3, 'Tips dan Trik Meningkatkan Produktivitas', '/uploads/tips/tips3.png'),
(4, 'Tips dan Trik Meningkatkan Fokus dan Kosentrasi Belajar & Aktivitas', '/uploads/tips/tips4.png'),
(5, 'Tips dan Trik Menetapkan Prioritas Dalam Menyelesaikan Tugas', '/uploads/tips/tips5.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` char(255) NOT NULL,
  `token` text NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `image` text DEFAULT NULL,
  `telp` text DEFAULT NULL,
  `bio` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `token`, `name`, `email`, `password`, `image`, `telp`, `bio`) VALUES
('5G1uOgeu9SZIzdjM', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVHMXVPZ2V1OVNaSXpkak0iLCJpYXQiOjE3MTc1NDYyMzh9.aclURFG4T3BtueHP9CPUaGzIG9hfxEOsSpmxYVsrdws', 'Sukacode', 'sukacode.dev@gmail.com', '$2a$08$DoJGAa1zV0H8A..s6Rjup.jiNxfWlQJlYi7hMiY9p7A1CBLatGZau', '/uploads/user_profile/zEd3m1qFGTCeBm1r.png', '081', 'Deskripsi ku'),
('Xi94hY_ThrOlxrxo', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlhpOTRoWV9UaHJPbHhyeG8iLCJpYXQiOjE3MTc1MzkwNjh9.9LKWitntxsTsbQ2Bjarcc1wDiLB1XAuEUcJTgDDJHzY', 'Test Bismillah', 'cahyadiantoni191@gmail.com', '$2a$08$53DdbTlPoZp2zyzqnBauq.0sj8Mcjao1M4QHjvREjL/1BKW4ksAoG', '/uploads/user_profile/Upv6oA_VcJqd8gj1.png', '123098', 'BIO DIUPDATE terbaru');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users_otp`
--

CREATE TABLE `users_otp` (
  `id` char(16) NOT NULL,
  `email` text NOT NULL,
  `otp` char(6) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `contents`
--
ALTER TABLE `contents`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tips`
--
ALTER TABLE `tips`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users_otp`
--
ALTER TABLE `users_otp`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `contents`
--
ALTER TABLE `contents`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT untuk tabel `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
