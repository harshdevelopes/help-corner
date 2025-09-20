<?php
session_start();
include('../con.php');

if (!isset($_SESSION['user_name']) || $_SESSION['user_role'] !== 'admin') {
    header('Location: login.php');
    exit();
}

if (!isset($_GET['id']) || empty($_GET['id'])) {
    header('Location: dashboard.php');
    exit();
}
$user_id = $_GET['id'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_name = $_POST['user_name'];
    $user_email = $_POST['user_email'];
    $user_password = $_POST['user_password'];
    $user_role = $_POST['user_role'];

    $sql = "UPDATE hc_users SET user_name = ?, user_email = ?, user_role = ?";
    $types = "sss";
    $params = [$user_name, $user_email, $user_role];

    if (!empty($user_password)) {
        $hashed_password = password_hash($user_password, PASSWORD_DEFAULT);
        $sql .= ", user_password = ?";
        $types .= "s";
        $params[] = $hashed_password;
    }

    $sql .= " WHERE user_id = ?";
    $types .= "i";
    $params[] = $user_id;

    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$params);

    if ($stmt->execute()) {
        header('Location: dashboard.php');
        exit();
    } else {
        $error = "Error updating record: " . $conn->error;
    }
}

$sql = "SELECT * FROM hc_users WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Update User</title>
  <link rel="icon" type="image/png" href="../images/icon.png" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <link rel="stylesheet" href="admin.css" />
</head>
<body>
  <div class="dashboard-container">
    <aside class="sidebar">
      <div class="sidebar-header">
        <img src="../images/icon.png" alt="Help Cornner Logo" class="sidebar-logo" />
        <h2>Admin Panel</h2>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li><a href="dashboard.php" class="nav-link"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
          <li><a href="dashboard.php#users-section" class="nav-link active"><i class="fas fa-users"></i> Users</a></li>
          <li><a href="dashboard.php#admins-section" class="nav-link"><i class="fas fa-user-shield"></i> Admins</a></li>
          <li><a href="dashboard.php#services-section" class="nav-link"><i class="fas fa-concierge-bell"></i> Services</a></li>
        </ul>
      </nav>
    </aside>

    <div class="main-content">
      <header class="dashboard-header">
        <div class="header-left">
          <h1>Update User</h1>
        </div>
        <div class="header-right">
          <span>Welcome, <?php echo $_SESSION['user_name']; ?>!</span>
          <a href="../logout.php" class="logout-btn">Logout</a>
        </div>
      </header>

      <main class="dashboard-main">
        <div class="add-service-section">
            <h2 class="section-title">Edit User Details</h2>
            <?php if (isset($error)): ?>
                <p class="error-message"><?php echo $error; ?></p>
            <?php endif; ?>
            <form method="POST" action="">
                <label for="user_name">Username:</label>
                <input type="text" name="user_name" value="<?php echo htmlspecialchars($user['user_name']); ?>" required>

                <label for="user_email">Email:</label>
                <input type="email" name="user_email" value="<?php echo htmlspecialchars($user['user_email']); ?>" required>

                <label for="user_password">New Password (leave blank to keep current password):</label>
                <input type="password" name="user_password">

                <label for="user_role">Role:</label>
                <select name="user_role">
                    <option value="user" <?php if ($user['user_role'] == 'user') echo 'selected'; ?>>User</option>
                    <option value="admin" <?php if ($user['user_role'] == 'admin') echo 'selected'; ?>>Admin</option>
                </select>

                <button type="submit">Update User</button>
            </form>
        </div>
      </main>

      <footer class="dashboard-footer">
        <p>&copy; <?php echo date("Y"); ?> Help Cornner. All rights reserved. | Developed with ❤️ by Himanshu &le;3</p>
      </footer>
    </div>
  </div>
</body>
</html>
