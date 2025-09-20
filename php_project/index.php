<?php 
session_start();
include 'con.php';

$is_logged_in = isset($_SESSION['user_id']);
$user_name = $is_logged_in ? ($_SESSION['user_name'] ?? '') : '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Help Cornner</title>
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
        <h2 class="hero-title">Welcome to Help Cornner</h2>
        <p class="hero-subtitle">Your trusted partner for all your service needs</p>
        <button class="hero-cta" id="heroBookNow">Book Now</button>
      </div>
      <div class="hero-logo">
        <img src="images/logo.png" alt="Help Cornner Logo" class="hero-logo-img" />
      </div>
    </div>
  </section>

  <!-- Services Booking Section -->
  <section id="services" class="services-section">
    <h2 class="section-title">Book Our Service</h2>
    <div class="container">
      <div class="services-grid">
        <div class="services-row">
          <div class="service-card">
            <div class="service-icon"><img src="images/home-cleaning.jpg" alt="Home Cleaning Icon" class="service-img" /></div>
            <h3>Home Cleaning</h3>
            <p>Professional home cleaning for a spotless, healthy living space.</p>
            <button class="book-btn" onclick="window.location.href='https://docs.google.com/forms/d/e/1FAIpQLSf_4wROGl0_cOXUYD3z2mmy_vMFX1zCIBf52YgmzfpR21XyIg/viewform?usp=sharing&ouid=116412994177252716765';">Book Now</button>
          </div>
          <div class="service-card">
            <div class="service-icon"><img src="images/car-wash.jpg" alt="Car Washing Icon" class="service-img" /></div>
            <h3>Car Washing</h3>
            <p>Expert car washing and detailing for a sparkling, fresh ride.</p>
            <button class="book-btn" onclick="window.location.href='https://docs.google.com/forms/d/e/1FAIpQLSe2xiVJwDnj4Of657ueZuqoQdOwRbLl24YnRpoRa1V6ycQoQA/viewform?usp=sharing&ouid=116412994177252716765';">Book Now</button>
          </div>
          <div class="service-card">
            <div class="service-icon"><img src="images/solar-panel.jpg" alt="Solar Cleaning Icon" class="service-img" /></div>
            <h3>Solar Cleaning</h3>
            <p>Specialized solar panel cleaning for maximum energy efficiency.</p>
            <button class="book-btn" onclick="window.location.href='';">Book Now</button>
          </div>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 32px;">
          <a href="service.php" class="more-services-btn">More Services</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Client Reviews Section -->
  <section id="reviews" class="reviews-section">
    <h2 class="section-title">What Our Clients Say</h2>
    <div class="container">
      <!-- Existing Reviews -->
      <div class="reviews-grid" id="reviews-list">
        <div class="review-card">
          <div class="review-header">
            <div class="reviewer-info">
              <h4>John Smith</h4>
              <div class="stars">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p class="review-text">"Excellent service! The team was professional and fixed my computer issues quickly. Highly recommended!"</p>
        </div>
        <div class="review-card">
          <div class="review-header">
            <div class="reviewer-info">
              <h4>Sarah Johnson</h4>
              <div class="stars">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p class="review-text">"Amazing technical support. They helped me set up my home network perfectly. Very knowledgeable team!"</p>
        </div>
        <div class="review-card">
          <div class="review-header">
            <div class="reviewer-info">
              <h4>Mike Davis</h4>
              <div class="stars">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p class="review-text">"Fast and reliable service. They repaired my laptop in no time. Great value for money!"</p>
        </div>
      </div>
    </div>
    <!-- Leave Review Form -->
    <div class="review-form-container">
      <h3>Leave Your Review</h3>
      <form class="review-form" id="reviewForm">
        <div class="form-row">
          <input type="text" id="reviewerName" placeholder="Your Name" required />
          <div class="rating-container">
            <label>Rating:</label>
            <div class="star-rating" id="starRating">
              <input type="radio" name="rating" value="5" id="star5"><label for="star5" title="5 stars">&#9733;</label>
              <input type="radio" name="rating" value="4" id="star4"><label for="star4" title="4 stars">&#9733;</label>
              <input type="radio" name="rating" value="3" id="star3"><label for="star3" title="3 stars">&#9733;</label>
              <input type="radio" name="rating" value="2" id="star2"><label for="star2" title="2 stars">&#9733;</label>
              <input type="radio" name="rating" value="1" id="star1"><label for="star1" title="1 star">&#9733;</label>
            </div>
          </div>
        </div>
        <textarea id="reviewText" placeholder="Share your experience with us..." required></textarea>
        <button type="submit" class="submit-review-btn">Submit Review</button>
      </form>
    </div>
  </section>
  <!-- About Us Section -->
  <section id="about" class="about-modern-section">
    <div class="about-modern-container">
      <div class="about-modern-left">
        <h2 class="about-modern-title">Welcome to Help Cornner</h2>
        <p class="about-modern-desc">
          Your one-stop solution for booking trusted, local services—fast, easy, and reliable. We connect you with skilled professionals for everything from home cleaning to tech support, all through a single, user-friendly platform.
        </p>
        <p class="about-modern-desc">
          Our mission is to make your life simpler by bringing quality services to your doorstep. Whether you're a busy homeowner or a growing business, Help Cornner is here to help you save time and enjoy peace of mind.
        </p>
        <div class="about-modern-features">
          <div class="about-modern-feature">
            <span class="about-modern-icon about-modern-icon1">🛠️</span>
            <div>
              <div class="about-modern-feature-title">Skilled Experts</div>
              <div class="about-modern-feature-desc">Vetted professionals for every job</div>
            </div>
          </div>
          <div class="about-modern-feature">
            <span class="about-modern-icon about-modern-icon2">⏰</span>
            <div>
              <div class="about-modern-feature-title">Quick Booking</div>
              <div class="about-modern-feature-desc">Book in seconds, anytime</div>
            </div>
          </div>
          <div class="about-modern-feature">
            <span class="about-modern-icon about-modern-icon3">⚡</span>
            <div>
              <div class="about-modern-feature-title">Fast & Accurate</div>
              <div class="about-modern-feature-desc">Prompt service with attention to detail</div>
            </div>
          </div>
          <div class="about-modern-feature">
            <span class="about-modern-icon about-modern-icon4">💬</span>
            <div>
              <div class="about-modern-feature-title">Friendly Support</div>
              <div class="about-modern-feature-desc">We're here for you, always</div>
            </div>
          </div>
        </div>
      </div>
      <div class="about-modern-right">
        <div class="about-modern-img-wrap">
          <img src="images/icon.png" alt="Help Cornner Team" class="about-modern-img" />
          <div class="about-modern-img-caption">
            <div class="about-modern-img-caption-title">Trusted by Hundreds</div>
            <div class="about-modern-img-caption-desc">Join our community of happy customers and service pros!</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <script>
    // Modern star rating UX
    document.querySelectorAll('.star-rating input').forEach((input) => {
      input.addEventListener('change', function() {
        const stars = this.parentNode.querySelectorAll('label');
        stars.forEach((star, idx) => {
          if (stars.length - idx <= this.value) {
            star.classList.add('selected');
          } else {
            star.classList.remove('selected');
          }
        });
      });
    });

    // Hero 'Book Now' button scrolls to #services
    document.getElementById('heroBookNow').addEventListener('click', function() {
      document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
    });

    // Smooth scroll for nav-menu links
    document.querySelectorAll('.nav-menu a[href^="#"]').forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Review form submission
    document.getElementById('reviewForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('reviewerName').value.trim();
      const rating = document.querySelector('input[name="rating"]:checked');
      const text = document.getElementById('reviewText').value.trim();
      if (!name || !rating || !text) return;
      const stars = '★'.repeat(rating.value) + '☆'.repeat(5 - rating.value);
      const reviewCard = document.createElement('div');
      reviewCard.className = 'review-card';
      reviewCard.innerHTML = `
        <div class="review-header">
          <div class="reviewer-info">
            <h4>${name}</h4>
            <div class="stars">${stars}</div>
          </div>
        </div>
        <p class="review-text">"${text}"</p>
      `;
      document.getElementById('reviews-list').prepend(reviewCard);
      this.reset();
    });
  </script>

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
            <li><a href="#aboutus">About Us</a></li>
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
