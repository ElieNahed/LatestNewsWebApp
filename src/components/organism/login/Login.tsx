import React, { useState } from "react";
import { useSelector } from "react-redux";

interface LoginProps {
  handleLogin: (
    email: string,
    password: string,
    token_expires_in: string | undefined
  ) => void;
  handleSignupClick: () => void;
}

const Login: React.FC<LoginProps> = ({ handleLogin, handleSignupClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  const loading = useSelector((state: any) => state.user.loading);
  const loginError = useSelector((state: any) => state.user.error);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your login logic here
    handleLogin(email, password, "30m");
  };

  const handleButtonMouseEnter = () => {
    setIsButtonHovered(true);
  };

  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false);
  };

  const handleLinkMouseEnter = () => {
    setIsLinkHovered(true);
  };

  const handleLinkMouseLeave = () => {
    setIsLinkHovered(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        className="border rounded-lg px-3 py-2 my-2 w-full"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        className="border rounded-lg px-3 py-2 my-2 w-full"
        required
      />
      {loginError && <p className="error-message">{loginError}</p>}
      <button
        type="submit"
        className={`${
          isButtonHovered ? "bg-hover-color" : "bg-color-3A4D57"
        } text-white font-medium rounded-lg px-4 py-2 w-full`}
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleButtonMouseLeave}
        disabled={loading}
      >
        {loading ? "Loading ... " : "Login"}
      </button>
      <div className="text-color-3A4D57 font-medium text-sm mt-2">
        Don't have an account?{" "}
        <span
          className={`${
            isLinkHovered ? "hover-color cursor-pointer" : "cursor-pointer"
          } font-bold`}
          onClick={handleSignupClick}
          onMouseEnter={handleLinkMouseEnter}
          onMouseLeave={handleLinkMouseLeave}
        >
          Sign Up
        </span>
      </div>
    </form>
  );
};

export default Login;
