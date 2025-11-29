import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { MdOutlineEmail, MdErrorOutline } from "react-icons/md";
import { CiLock, CiUnlock } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../../slice/userSlice";
import { Rings } from "react-loader-spinner";
import { useEffect } from "react";

const Login = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [lock, setLock] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleGoogle = () => {
    signInWithRedirect(auth, provider);

    setTimeout(() => navigate("/"), 1500);
  };


  useEffect(() => {
  getRedirectResult(auth)
    .then((result) => {
      if (result?.user) {
        // Save user data
        dispatch(userLoginInfo(result.user));
        localStorage.setItem("userLoginInfo", JSON.stringify(result.user));
        
        // Navigate home
        navigate("/");
      }
    })
    .catch((error) => {
      console.error("Google Redirect Error:", error);
    });
}, []);

  const validate = () => {
    let temp = {};

    if (!form.email) temp.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      temp.email = "Enter a valid email";

    if (!form.password) temp.password = "Password is required";
    else if (form.password.length < 8)
      temp.password = "Minimum 8 characters required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setLoading(true);

    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((result) => {
        toast.success("Login Successful!");

        dispatch(userLoginInfo(result.user));
        localStorage.setItem("userLoginInfo", JSON.stringify(result.user));

        setTimeout(() => navigate("/"), 1500);
      })
      .catch((err) => {
        if (err.code.includes("invalid-credential")) {
          setErrors({ form: "Invalid email or password" });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <ToastContainer position="top-center" theme="dark" />

      <section className="min-h-screen bg-primary flex items-center justify-center">
        <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8">
          <div className="text-center">
            <img src={logo} alt="logo" className="w-28 mx-auto mb-4" />

            <h1 className="font-public font-semibold text-2xl text-[#343a40]">
              Sign In
            </h1>
            <p className="text-[#7a7f9a] mt-1">
              Continue to your dashboard
            </p>
          </div>

          {errors.form && (
            <p className="text-red-500 font-medium mt-4 mb-2">{errors.form}</p>
          )}

          {/* Email */}
          <div className="mt-4">
            <label className="font-public font-medium text-[18px]">Email</label>
            <div className="flex items-center mt-3">
              <span className="p-[14px]  bg-[#F8F9FA] border outline-none focus:outline-none rounded-l-[4px] text-xl">
                <MdOutlineEmail />
              </span>
              <input
                name="email"
                onChange={handleChange}
                className="border rounded-r-[4px] outline-none focus:outline-none w-full py-[12px] px-4 font-public"
                type="email"
                placeholder="admin@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="font-public font-medium text-[18px]">
              Password
            </label>
            <div className="flex items-center mt-3">
              <span
                onClick={() => setLock(!lock)}
                className="p-[14px] bg-[#F8F9FA] border rounded-l-[4px] text-xl cursor-pointer"
              >
                {lock ? <CiUnlock /> : <CiLock />}
              </span>

              <input
                name="password"
                onChange={handleChange}
                className="border rounded-r-[4px] outline-none focus:outline-none w-full py-[12px] px-4 font-public"
                type={lock ? "text" : "password"}
                placeholder="******"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}

            <p className="text-right mt-1">
              <Link to="/forgot" className="text-[#6159CB]">
                Forgot Password?
              </Link>
            </p>

          </div>

          {/* Google Login */}
          <div
            onClick={handleGoogle}
            className="flex items-center border-2 rounded-xl px-6 py-3 mt-6 cursor-pointer hover:bg-gray-50 transition"
          >
            <FcGoogle className="text-3xl mr-4" />
            <span className="font-public text-lg">Login with Google</span>
          </div>

          {/* Sign In Button */}
          {loading ? (
            <div className="mt-6 flex justify-center">
              <Rings height="80" width="80" color="#6059CC" visible />
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-full mt-6 py-3 bg-[#6159CB] text-white rounded-xl text-xl font-medium shadow-lg hover:bg-[#544ebb] transition"
            >
              Sign In
            </button>
          )}

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-[#7a7f9a]">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#6159CB] font-medium">
                Sign Up
              </Link>
            </p>
            <p className="text-[#7a7f9a] mt-2">© {new Date().getFullYear()} Chatvia</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
