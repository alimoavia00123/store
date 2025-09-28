import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear login info
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    // Redirect to home or alert page
    navigate("/", { replace: true }); // "/" wo page jahan alert aur login optional hai
  };

  return (
    <button
      onClick={handleLogout}
      
    >
      Logout
    </button>
  );
};

export default Logout;
