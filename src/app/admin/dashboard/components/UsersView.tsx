import React from "react";
import "./UsersView.css"; // We'll create this CSS file for styling

interface Profile {
  id: string;
  user_name: string;
  user_email: string;
  user_role: string;
}

interface UsersViewProps {
  users: Profile[];
}

const UsersView: React.FC<UsersViewProps> = ({ users }) => {
  return (
    <div className="users-view">
      <h2 className="section-title">Users</h2>
      <div className="table-container">
        <div className="table-header">
          <div className="table-cell">ID</div>
          <div className="table-cell">Name</div>
          <div className="table-cell">Email</div>
          <div className="table-cell">Role</div>
        </div>
        <div className="table-body">
          {users.map((user) => (
            <div className="table-row" key={user.id}>
              <div className="table-cell" data-label="ID">
                {user.id}
              </div>
              <div className="table-cell" data-label="Name">
                {user.user_name}
              </div>
              <div className="table-cell" data-label="Email">
                {user.user_email}
              </div>
              <div className="table-cell" data-label="Role">
                {user.user_role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersView;
