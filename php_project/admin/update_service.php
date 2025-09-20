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
    $service_name = $_POST['service_name'];
    $service_description = $_POST['service_description'];
    $service_photo = $_POST['service_photo'];
    $service_link = $_POST['service_link'];

    $sql = "UPDATE hc_services SET name = ?, description = ?, photo = ?, link = ? WHERE id = ?";
    $types = "ssssi";
    $params = [$service_name, $service_description, $service_photo, $service_link, $service_id];

    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$params);

    if ($stmt->execute()) {
        header('Location: dashboard.php');
        exit();
    } else {
        $error = "Error updating record: " . $conn->error;
    }
}

$sql = "SELECT * FROM hc_services WHERE id = ?";
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
  <title>Update Service</title>
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
          <h1>Update Service</h1>
        </div>
        <div class="header-right">
          <span>Welcome, <?php echo $_SESSION['user_name']; ?>!</span>
          <a href="../logout.php" class="logout-btn">Logout</a>
        </div>
      </header>

      <main class="dashboard-main">
        <div class="add-service-section">
            <h2 class="section-title">Edit Service Details</h2>
            <?php if (isset($error)): ?>
                <p class="error-message"><?php echo $error; ?></p>
            <?php endif; ?>
            <form method="POST" action="">
                <label for="service_name">Service Name:</label>
                <input type="text" name="service_name" value="<?php echo htmlspecialchars($service['name']); ?>" required>

                <label for="service_description">Description:</label>
                <textarea name="service_description" required><?php echo htmlspecialchars($service['description']); ?></textarea>

                <label for="service_photo">Image Path:</label>
                <input type="text" name="service_photo" value="<?php echo htmlspecialchars($service['photo']); ?>" required>

                <label for="service_link">Link:</label>
                <input type="text" name="service_link" value="<?php echo htmlspecialchars($service['link']); ?>" required>

                <button type="submit">Update Service</button>
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