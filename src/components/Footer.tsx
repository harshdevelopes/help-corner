import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer-modern">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col company-info">
            <Image
              src="/images/logo.png"
              alt="Help Cornner Logo"
              width={60}
              height={60}
              className="footer-logo"
            />
            <h3>Help Cornner</h3>
            <p>
              Your trusted partner for all technical services and support needs.
            </p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/#services">Services</Link>
              </li>
              <li>
                <Link href="/#reviews">Reviews</Link>
              </li>
              <li>
                <Link href="/#about">About Us</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="footer-contact">
              <li>
                📧{" "}
                <a href="mailto:helpcornner@gmail.com">helpcornner@gmail.com</a>
              </li>
              <li>
                📞 <a href="tel:+919429895011">+91 9429895011</a>
              </li>
              <li>
                📍 F-6, Mega Mall First Floor, Jilla Panchayat road, Amreli
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="footer-social">
              <a href="https://wa.me/919429895011?text=Hi" title="WhatsApp">
                <Image
                  src="/images/whatsapp.png"
                  alt="WhatsApp"
                  width={32}
                  height={32}
                  className="social-img"
                />
              </a>
              <a
                href="https://www.instagram.com/help.cornner/"
                title="Instagram"
              >
                <Image
                  src="/images/instagram.png"
                  alt="Instagram"
                  width={32}
                  height={32}
                  className="social-img"
                />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61577732233292"
                title="Facebook"
              >
                <Image
                  src="/images/facebook.png"
                  alt="Facebook"
                  width={32}
                  height={32}
                  className="social-img"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy;2025 Help Cornner. All rights reserved.{" "}
            <span className="developer-credit">
              Developed with ❤️ by Himanshu &le;3
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
