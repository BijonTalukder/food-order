import { useState, useEffect } from "react";
import "../../../public/Assets/CSS/ComponentCSS/login.scss";
import { loginUser } from "../../redux/feature/Auth/AuthSlice";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

type ILoginUser = {
  email: string;
  password: string;
};

const Login = () => {
  const [data, setData] = useState<ILoginUser>({
    email: "",
    password: "",
  });
  const dispatch:AppDispatch = useDispatch();
  const { isLoading, isError, error } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const handleLogin = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const resultAction=await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/"); // Navigate to root route on success
    } else {
      console.error("Login failed", resultAction.error.message);
    }
  };
  // useEffect(() => {
  //   if (userData) {
  //     navigate("/");
  //   }
  // }, );
  return (
    <div className="login">
      <div className="box">
        <form onSubmit={handleLogin}>
          <h2>Sign In</h2>

          <div className="inputBox">
            <input
              name="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              type="email"
              required
            />
            <span>email </span>
            <i></i>
          </div>

          <div className="inputBox">
            <input
              type="password"
              name="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
            <span>Password</span>
            <i></i>
          </div>

          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default Login;
