import React, { useState } from "react";
import "./Signup.css";
import { useSelector } from "react-redux";

interface SignupComponentProps {
  handleSignup: (
    email: string,
    password: string,
    token_expires_in: string | undefined
  ) => void;
  handleLoginClick: () => void;
}

const SignupComponent: React.FC<SignupComponentProps> = ({
  handleSignup,
  handleLoginClick,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUpHovered, setIsSignUpHovered] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);

  const loading = useSelector((state: any) => state.user.loading);
  const signupError = useSelector((state: any) => state.user.error);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your signup logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    // After successful signup, navigate to login
    if (password === confirmPassword) {
      handleSignup(email, password, "30m");
    }
    // handle not equal
  };

  const handleSignUpMouseEnter = () => {
    setIsSignUpHovered(true);
  };

  const handleSignUpMouseLeave = () => {
    setIsSignUpHovered(false);
  };

  const handleLoginMouseEnter = () => {
    setIsLoginHovered(true);
  };

  const handleLoginMouseLeave = () => {
    setIsLoginHovered(false);
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        className="border rounded-lg px-3 py-2 my-2 w-full"
        required
      />
      {signupError && <p className="error-message">{signupError}</p>}
      <button
        type="submit"
        className={`${
          isSignUpHovered ? "bg-hover-color" : "bg-color-3A4D57"
        } text-white font-medium rounded-lg px-4 py-2 w-full`}
        onMouseEnter={handleSignUpMouseEnter}
        onMouseLeave={handleSignUpMouseLeave}
      >
        {loading ? "Loading..." : "Sign up"}
      </button>
      <div className="text-color-3A4D57 font-medium text-sm mt-2">
        Already have an account?{" "}
        <span
          className={`${
            isLoginHovered ? "hover-color cursor-pointer" : "cursor-pointer"
          } font-bold`}
          onClick={handleLoginClick}
          onMouseEnter={handleLoginMouseEnter}
          onMouseLeave={handleLoginMouseLeave}
        >
          Login
        </span>
      </div>
    </form>
  );
};

export default SignupComponent;
