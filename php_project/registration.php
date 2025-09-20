<?php include 'con.php'; ?>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $mobile = mysqli_real_escape_string($conn, $_POST['mobile']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    
    // Check if passwords match
    if ($password !== $confirm_password) {
        $error = "Passwords do not match!";
    } else {
        // Check if user already exists
        $check_query = "SELECT * FROM hc_users WHERE user_email = '$email' OR user_name = '$username'";
        $result = mysqli_query($conn, $check_query);
        
        if (mysqli_num_rows($result) > 0) {
            $error = "User already exists !";
        } else {
            // Hash password and insert user
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $insert_query = "INSERT INTO hc_users (user_name, user_email, user_number, user_password) VALUES ('$username', '$email', '$mobile', '$hashed_password')";
            
            if (mysqli_query($conn, $insert_query)) {
                $success = "Registration successful! You can now login.";
            } else {
                $error = "Registration failed: " . mysqli_error($conn);
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Help Cornner - Registration</title>
  
  <link rel="icon" type="image/png" href="images/icon.png" />
  <link rel="stylesheet" href="css/style.css" />
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
  <div class="container">
    <div class="logo-section">
      <img src="images/logo.png" alt="Help Cornner Logo" class="logo" />
    </div>

    <div class="form-section">
      <form method="POST" action="">
        <h2>&nbsp;Create an account</h2>
        
        <?php if (isset($error)): ?>
          <div style="color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 12px; margin: 12px; border-radius: 10px; text-align: center; font-size: 15px; position: relative; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <strong style="color: #721c24;">✗</strong> <?php echo $error; ?>
          </div>
        <?php endif; ?>
        
        <?php if (isset($success)): ?>
          <div style="color: #155724; background-color: #d4edda; border: 1px solid #c3e6cb; padding: 12px; margin: 12px; border-radius: 10px; text-align: center; font-size: 15px; position: relative; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <strong style="color: #155724;">✓</strong> <?php echo $success; ?>
          </div>
        <?php endif; ?>
        
        <div class="input-row">
          <input type="text" name="username" placeholder="Username" required />
          <input type="tel" name="mobile" placeholder="Mobile Number" required />
        </div>
        <div class="input-row">
          <input type="email" name="email" placeholder="Email address" required />
        </div>
        <div class="input-row">
          <input type="password" name="password" placeholder="Password" required />
          <input type="password" name="confirm_password" placeholder="Confirm password" required />
        </div>

        <p class="password-hint">&nbsp;&nbsp;Use 8 or more characters with a mix of letters, numbers & symbols</p>
      
        <button type="submit" class="submit-btn">Create an account</button>
        <a href="login.php"><button type="button" class="login-btn">Login</button></a>
      </form>
    </div>
  </div>
</body>
</html>