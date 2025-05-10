import "./style.css";
import { useForm } from "react-hook-form";
import { createUser } from "../../redux/feature/Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
// import {} from '@/redu'
type FormData = {
  name: string;
  email: string;
  password: string;
};

const Registration = () => {
  const dispatch:AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    // formState: { errors }
  } = useForm<FormData>();
  const user = useSelector((state) => state);
  const handleRegisttration = async (value: FormData) => {
    // return console.log(value);
    await dispatch(
      createUser({
        name: value.name,
        email: value.email,
        password: value.password,
      })
      
    );
  };

  console.log(user, "hello");

  return (
    <div className="registration">
      <div className="box">
        <form onSubmit={handleSubmit(handleRegisttration)}>
          <h2>Sign Up</h2>
          <div className="inputBox">
            <input
              type="text"
              required
              {...register("name", { required: true })}
            />
            <span>User Name</span>
            <i></i>
          </div>

          <div className="inputBox">
            <input
              type="email"
              required
              {...register("email", { required: true })}
            />
            <span>email </span>
            <i></i>
          </div>

          <div className="inputBox">
            <input
              type="password"
              required
              {...register("password", { required: true })}
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

export default Registration;
