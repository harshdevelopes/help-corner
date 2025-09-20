<?php 
include 'con.php'; 
session_start();

// Check if user is already logged in
if (isset($_SESSION['user_id'])) {
    if (isset($_SESSION['user_role']) && $_SESSION['user_role'] == 'admin') {
        header("Location: admin/dashboard.php");
    } elseif (isset($_SESSION['user_role']) && $_SESSION['user_role'] == 'user') {
        header("Location: dashboard.php");
    }
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];

    $query = "SELECT * FROM hc_users WHERE user_email = '$email' LIMIT 1";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) === 1) {
        $user = mysqli_fetch_assoc($result);

        // Check hashed OR plain text (for old DB entries)
        if (password_verify($password, $user['user_password']) || $password === $user['user_password']) {
            
            // If plain password matched, update it to hashed version for future logins
            if ($password === $user['user_password']) {
                $newHashed = password_hash($password, PASSWORD_DEFAULT);
                $update = "UPDATE hc_users SET user_password = '$newHashed' WHERE user_id = {$user['user_id']}";
                mysqli_query($conn, $update);
            }

            // Set session variables
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['user_name'] = $user['user_name'];
            $_SESSION['user_email'] = $user['user_email'];
            $_SESSION['user_role'] = $user['user_role'];

            if ($user['user_role'] == 'admin') {
                $_SESSION['is_admin'] = true;
                header("Location: admin/dashboard.php");
                exit();
            } elseif ($user['user_role'] == 'user') {
                $_SESSION['is_admin'] = false;
                header("Location: dashboard.php");
                exit();
            } else {
                $error = "Invalid user role!";
            }
        } else {
            $error = "Invalid password!";
        }
    } else {
        $error = "User not found with this email!";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Help Cornner - Login</title>
  
  <link rel="icon" type="image/png" href="images/icon.png" />
  <link rel="stylesheet" href="css/style.css" />
  <style>
    ::-webkit-scrollbar { display: none; }
    html { scrollbar-width: none; }
    body { -ms-overflow-style: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo-section">
      <img src="images/logo.png" alt="Help Cornner Logo" class="logo" />
    </div>

    <div class="form-section">
      <form method="POST" action="">
        <h2>&nbsp;Login to your account</h2>
        
        <?php if (isset($error)): ?>
          <div style="color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 12px; margin: 12px; border-radius: 10px; text-align: center; font-size: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <strong>✗</strong> <?php echo htmlspecialchars($error); ?>
          </div>
        <?php endif; ?>
        
        <div class="input-row">
          <input type="email" name="email" placeholder="Email address" required />
        </div>
        <div class="input-row">
          <input type="password" name="password" placeholder="Password" required />
        </div>

        <p class="password-hint">&nbsp;&nbsp;Enter your email and password to access your account</p>
      
        <button type="submit" class="submit-btn">Login</button>
        <a href="registration.php"><button type="button" class="login-btn">Sign Up</button></a>
      </form>
    </div>
  </div>
</body>
</html>
