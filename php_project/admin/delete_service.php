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
$service_id = $_GET['id'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['confirm_delete'])) {
        $sql = "DELETE FROM hc_services WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $service_id);
        if ($stmt->execute()) {
            header('Location: dashboard.php');
            exit();
        } else {
            $error = "Error deleting record: " . $conn->error;
        }
    } else {
        header('Location: dashboard.php');
        exit();
    }
}

$sql = "SELECT name FROM hc_services WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $service_id);
$stmt->execute();
$result = $stmt->get_result();
$service = $result->fetch_assoc();

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Delete Service</title>
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
          <li><a href="dashboard.php#users-section" class="nav-link"><i class="fas fa-users"></i> Users</a></li>
          <li><a href="dashboard.php#admins-section" class="nav-link"><i class="fas fa-user-shield"></i> Admins</a></li>
          <li><a href="dashboard.php#services-section" class="nav-link active"><i class="fas fa-concierge-bell"></i> Services</a></li>
        </ul>
      </nav>
    </aside>

    <div class="main-content">
      <header class="dashboard-header">
        <div class="header-left">
          <h1>Delete Service</h1>
        </div>
        <div class="header-right">
          <span>Welcome, <?php echo $_SESSION['user_name']; ?>!</span>
          <a href="../logout.php" class="logout-btn">Logout</a>
        </div>
      </header>

      <main class="dashboard-main">
        <div class="add-service-section">
            <h2 class="section-title">Confirm Deletion</h2>
            <?php if (isset($error)): ?>
                <p class="error-message"><?php echo $error; ?></p>
            <?php endif; ?>
            <p>Are you sure you want to delete the service: <strong><?php echo htmlspecialchars($service['name']); ?></strong>?</p>
            <form method="POST" action="">
                <button type="submit" name="confirm_delete" class="btn-delete">Delete</button>
                <a href="dashboard.php" class="btn">Cancel</a>
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