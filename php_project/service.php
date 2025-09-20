<?php 
include 'con.php';
session_start();

// Simple session check
if (isset($_SESSION['user_id'])) {
    // User is logged in
    $is_logged_in = true;
    $user_name = $_SESSION['user_name'];
} else {
    // User is not logged in
    $is_logged_in = false;
    $user_name = '';
}
$users_query = "SELECT * FROM hc_users";
$users_result = mysqli_query($conn, $users_query);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Help Cornner - Service</title>
  <link rel="icon" type="image/png" href="images/icon.png" />
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="css/style1.css" />
  <style>
    /* Hide scrollbar for all browsers */
    ::-webkit-scrollbar {
      display: none;
    }
    
    html {
      scrollbar-width: none;
    }
    
    body {
      -ms-overflow-style: none;
    }

  </style>
</head>
<body>

<!-- Header -->
<header class="header">
  <div class="header-container">
    <div class="header-left">
      <img src="images/icon.png" alt="Help Cornner Logo" class="header-logo" />
      <h1 class="company-name">Help Cornner</h1>
    </div>
    <nav class="header-nav">
      <ul class="nav-menu">
        <li><a href="#home" class="nav-link">Home</a></li>
        <li><a href="#services" class="nav-link">Services</a></li>
        <li><a href="#reviews" class="nav-link">Reviews</a></li>
        <li><a href="#about" class="nav-link">About Us</a></li>
        <?php if ($is_logged_in): ?>
          <li><span class="nav-link" style="color: #ff9b0e;">Welcome, <?php echo htmlspecialchars($user_name); ?>!</span></li>
          <li><a href="logout.php" class="nav-link login-link">Logout</a></li>
        <?php else: ?>
          <li><a href="login.php" class="nav-link login-link">Login</a></li>
        <?php endif; ?>
      </ul>
    </nav>
  </div>
</header>

  <!-- Hero Section -->
  <section id="home" class="hero-section">
    <div class="hero-content">
      <div class="hero-text">
        <h2 class="hero-title">Book Our Service</h2>
      </div>
      <div class="hero-logo">
        <img src="images/logo.png" alt="Help Cornner Logo" class="hero-logo-img" />
      </div>
    </div>
  </section>

<!-- Services Section -->
<section id="services" class="services-section">
  <h2 class="section-title">Book Our Service</h2>
  <div class="container">
    <div class="services-grid">
      <?php
      $sql = "SELECT * FROM hc_services";
      $result = mysqli_query($conn, $sql);
      if (mysqli_num_rows($result) > 0) {
          $count = 0;
          $total_services = mysqli_num_rows($result);
          while ($row = mysqli_fetch_assoc($result)) {
              if ($count % 3 == 0) {
                  $style = ($count > 0) ? 'style="margin-top: 32px;"' : '';
                  echo '<div class="services-row" ' . $style . '>';
              }
      ?>
      <div class="service-card">
        <div class="service-icon"><img src="<?php echo $row['photo']; ?>" alt="<?php echo $row['name']; ?> Icon" class="service-img" /></div>
        <h3><?php echo $row['name']; ?></h3>
        <p><?php echo $row['description']; ?></p>
        <button class="book-btn" onclick="window.location.href='<?php echo $row['link']; ?>'">Book Now</button>
      </div>
      <?php
              $count++;
              if ($count % 3 == 0 || $count == $total_services) {
                  echo '</div>';
              }
          }
      } else {
          echo "No services found.";
      }
      ?>
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="footer-modern">
    <div class="footer-container">
      <div class="footer-row">
        <div class="footer-col company-info">
          <img src="images/logo.png" alt="Help Cornner Logo" class="footer-logo" />
          <h3>Help Cornner</h3>
          <p>Your trusted partner for all technical services and support needs.</p>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <ul class="footer-contact">
            <li>📧 <a href="mailto:helpcornner@gmail.com">helpcornner@gmail.com</a></li>
            <li>📞 <a href="tel:+919429895011">+91 9429895011</a></li>
            <li>📍 F-6, Mega Mall First Floor, Jilla Panchayat road, Amreli</li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Follow Us</h4>
          <div class="footer-social">
            <a href="https://wa.me/919429895011?text=Hi" title="WhatsApp"><img src="images/whatsapp.png" alt="WhatsApp" class="social-img" /></a>
            <a href="https://www.instagram.com/help.cornner/" title="Instagram"><img src="images/instagram.png" alt="Instagram" class="social-img" /></a>
            <a href="https://www.facebook.com/profile.php?id=61577732233292" title="Facebook"><img src="images/facebook.png" alt="Facebook" class="social-img" /></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy;2025 Help Cornner. All rights reserved. <span class="developer-credit">Developed with ❤️ by Himanshu &le;3</span></p>
      </div>
    </div>
  </footer>
</body>
</html>