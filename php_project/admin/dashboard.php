<?php
include '../con.php';
session_start();
/* now create the pages update_user.php and delete_user.php

update_user.php can change field like user_name(textbox), user_email(textbox), user_password(password) and user_role(Dropdown with 2 options only 'user' and 'admin' in database table named hc_users
when clicked on delete_user.php, is should confirm by that asking are you sure to delete user information, when clicks on delete, delete users information from database table and if cancels it don't do anything*/
// Check if admin is logged in
if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'admin') {
    header("Location: ../login.php");
    exit();
}

// Fetch data for dashboard
$user_count_query = "SELECT COUNT(*) as count FROM hc_users WHERE user_role = 'user'";
$user_count_result = mysqli_query($conn, $user_count_query);
$user_count = mysqli_fetch_assoc($user_count_result)['count'];

$admin_count_query = "SELECT COUNT(*) as count FROM hc_users WHERE user_role = 'admin'";
$admin_count_result = mysqli_query($conn, $admin_count_query);
$admin_count = mysqli_fetch_assoc($admin_count_result)['count'];

$service_count_query = "SELECT COUNT(*) as count FROM hc_services";
$service_count_result = mysqli_query($conn, $service_count_query);
$service_count = mysqli_fetch_assoc($service_count_result)['count'];

$users_query = "SELECT * FROM hc_users WHERE user_role = 'user'";
$users_result = mysqli_query($conn, $users_query);

$admins_query = "SELECT * FROM hc_users WHERE user_role = 'admin'";
$admins_result = mysqli_query($conn, $admins_query);

$services_query = "SELECT * FROM hc_services";
$services_result = mysqli_query($conn, $services_query);

// Handle add service form submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['add_service'])) {
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $description = mysqli_real_escape_string($conn, $_POST['description']);
    $photo = mysqli_real_escape_string($conn, $_POST['photo']);
    $link = mysqli_real_escape_string($conn, $_POST['link']);

    $insert_query = "INSERT INTO hc_services (name, description, photo, link) VALUES ('$name', '$description', '$photo', '$link')";
    if (mysqli_query($conn, $insert_query)) {
        $success_message = "Service added successfully!";
    } else {
        $error_message = "Error adding service: " . mysqli_error($conn);
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Dashboard</title>
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
          <li><a href="#" class="nav-link active" data-target="dashboard-home"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
          <li><a href="#" class="nav-link" data-target="users-section"><i class="fas fa-users"></i> Users</a></li>
          <li><a href="#" class="nav-link" data-target="admins-section"><i class="fas fa-user-shield"></i> Admins</a></li>
          <li><a href="#" class="nav-link" data-target="services-section"><i class="fas fa-concierge-bell"></i> Services</a></li>
        </ul>
      </nav>
    </aside>

    <div class="main-content">
      <header class="dashboard-header">
        <div class="header-left">
          <h1>Dashboard</h1>
        </div>
        <div class="header-right">
          <span>Welcome, <?php echo $_SESSION['user_name']; ?>!</span>
          <a href="../logout.php" class="logout-btn">Logout</a>
        </div>
      </header>

      <main class="dashboard-main">
        <div id="dashboard-home" class="dashboard-section active">
          <h2 class="section-title">Statistics</h2>
          <section class="stats-section">
            <div class="stat-card">
              <h3>Total Users</h3>
              <p><?php echo $user_count; ?></p>
            </div>
            <div class="stat-card">
              <h3>Total Admins</h3>
              <p><?php echo $admin_count; ?></p>
            </div>
            <div class="stat-card">
              <h3>Total Services</h3>
              <p><?php echo $service_count; ?></p>
            </div>
          </section>
        </div>

        <div id="users-section" class="dashboard-section">
          <h2 class="section-title">All Users</h2>
          <section class="table-section">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <?php 
                mysqli_data_seek($users_result, 0);
                while ($user = mysqli_fetch_assoc($users_result)) { ?>
                <tr>
                  <td><?php echo $user['user_id']; ?></td>
                  <td><?php echo $user['user_name']; ?></td>
                  <td><?php echo $user['user_email']; ?></td>
                  <td><?php echo $user['user_number']; ?></td>
                  <td>
                    <a href="update_user.php?id=<?php echo $user['user_id']; ?>" class="btn-update">Update</a>
                    <a href="delete_user.php?id=<?php echo $user['user_id']; ?>" class="btn-delete">Delete</a>
                  </td>
                </tr>
                <?php } ?>
              </tbody>
            </table>
          </section>
        </div>

        <div id="admins-section" class="dashboard-section">
          <h2 class="section-title">All Admins</h2>
          <section class="table-section">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <?php while ($admin = mysqli_fetch_assoc($admins_result)) { ?>
                <tr>
                  <td><?php echo $admin['user_id']; ?></td>
                  <td><?php echo $admin['user_name']; ?></td>
                  <td><?php echo $admin['user_email']; ?></td>
                  <td>
                    <a href="update_user.php?id=<?php echo $admin['user_id']; ?>" class="btn-update">Update</a>
                    <a href="delete_user.php?id=<?php echo $admin['user_id']; ?>" class="btn-delete">Delete</a>
                  </td>
                </tr>
                <?php } ?>
              </tbody>
            </table>
          </section>
        </div>

        <div id="services-section" class="dashboard-section">
    <h2 class="section-title">All Services</h2>
    <section class="table-section">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Image Path</th>
                    <th>Link</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($service = mysqli_fetch_assoc($services_result)) { ?>
                <tr>
                    <td><?php echo $service['id']; ?></td>
                    <td><?php echo $service['name']; ?></td>
                    <td><?php echo $service['description']; ?></td>
                    <td><?php echo $service['photo']; ?></td>
                    <td><?php echo $service['link']; ?></td>
                    <td>
                        <a href="update_service.php?id=<?php echo $service['id']; ?>" class="btn-update">Update</a>
                        <a href="delete_service.php?id=<?php echo $service['id']; ?>" class="btn-delete">Delete</a>
                    </td>
                </tr>
                <?php } ?>
            </tbody>
        </table>
    </section>
    <section id="add-service-form-section" class="add-service-section">
        <h2 class="section-title">Add New Service</h2>
        <form method="POST" action="">
            <input type="text" name="name" placeholder="Service Name" required>
            <textarea name="description" placeholder="Description" required></textarea>
            <input type="text" name="photo" placeholder="Image Path (e.g., images/service.jpg)" required>
            <input type="text" name="link" placeholder="Book Now Link" required>
            <button type="submit" name="add_service">Add Service</button>
        </form>
        <?php if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['add_service'])) { ?>
            <?php if (isset($success_message)) { ?>
            <div class="success-message"><?php echo $success_message; ?></div>
            <?php } ?>
            <?php if (isset($error_message)) { ?>
            <div class="error-message"><?php echo $error_message; ?></div>
            <?php } ?>
        <?php } ?>
    </section>
</div>
      </main>

      <footer class="dashboard-footer">
        <p>&copy; 2025 Help Cornner. All rights reserved. | Developed with ❤️ by Himanshu &le;3</p>
      </footer>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const navLinks = document.querySelectorAll('.nav-link');
      const sections = document.querySelectorAll('.dashboard-section');

      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();

          navLinks.forEach(link => link.classList.remove('active'));
          this.classList.add('active');

          const target = this.getAttribute('data-target');
          sections.forEach(section => {
            if (section.id === target) {
              section.classList.add('active');
            } else {
              section.classList.remove('active');
            }
          });
        });
      });
    });
  </script>
</body>
</html>