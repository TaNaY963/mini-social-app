import { useState } from "react";

function SocialHeader({ username }) {
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  return (
    <header className="social-header">
      <h1>Social</h1>

      <div className="profile-wrapper">
        <button
          className="profile-avatar"
          onClick={() => setShowProfile(!showProfile)}
          title="Profile"
        >
          {username?.charAt(0).toUpperCase() || "U"}
        </button>

        {showProfile && (
          <div className="profile-menu">
            <div className="profile-info">
              <div className="profile-menu-avatar">
                {username?.charAt(0).toUpperCase() || "U"}
              </div>

              <div>
                <strong>{username}</strong>
                <span>Profile</span>
              </div>
            </div>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default SocialHeader;