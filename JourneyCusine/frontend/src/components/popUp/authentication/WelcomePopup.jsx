/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { API } from "../../../backend";
import { PulseLoader } from "react-spinners";
// import google from "../../assets/basicIcon/google.svg";
import google from "../../../assets/basicIcon/google.svg";
import { useGoogleLogin } from '@react-oauth/google';
import { userLogIn } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const WelcomePopup = ({
  handleCloseLoginPopup,
  setDefaultPopup,
  setShowLoginPopup,
  setShowCreateUserPopup,
  setLoginEmail,
}) => {
  const [inputFocused, setInputFocused] = useState(false);
  const { handleSubmit, register, reset, formState: { errors }  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const showErrorToast = (message) => {
    toast.error(message);
  };

  const dispatch = useDispatch()

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  const handleCheckEmail = async (data) => {
    const email = data.email;
    setLoginEmail(email);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API}auth/check_email`,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response?.data;
      if (responseData?.success === 1) {
        setDefaultPopup(false);
        setShowLoginPopup(true);
      }
      if (responseData?.success === 0) {
        setDefaultPopup(false);
        setShowCreateUserPopup(true);
      }
      setTimeout(() => {
        reset();
      }, 300);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Google login successful:', tokenResponse);

      try {
        const response = await axios.post(`${API}auth/google_login`, {
          token: tokenResponse
        });

        // Check if the email is a Gmail address
        const userData = response.data;
        setIsLoading(false);

        if (userData?.success === 0) {
          setShowErrorMessage(true);
        } else if (userData?.success === 1) {
          dispatch(userLogIn(userData));
          let accessToken = localStorage.getItem("accessToken");
          let refreshToken = localStorage.getItem("refreshToken");

          if (!accessToken) {
            localStorage.setItem(
              "accessToken",
              JSON.stringify(userData?.accessToken)
            );
          } else if (accessToken) {
            accessToken = userData?.accessToken;
            localStorage.setItem("accessToken", JSON.stringify(accessToken));
          }
          if (!refreshToken) {
            localStorage.setItem(
              "refreshToken",
              JSON.stringify(userData?.refreshToken)
            );
          } else if (refreshToken) {
            refreshToken = userData?.refreshToken;
            console.log(refreshToken);
            localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
          }
          // window.location.reload();
          // setDefaultPopup(false);
          // setShowLoginPopup(false);
          // setShowCreateUserPopup(false)
          // setPopup(false);
          handleCloseLoginPopup()
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.warn("Network error try again!");
      } finally {
        setIsLoading(false);
      }

      // Handle the token response, e.g., send it to your backend for verification
      console.log('Token response from backend:', response.data);

    },
    onError: () => {
      console.log('Google login failed');
      // Handle error scenarios, e.g., show error message to user
    },
  });


  return (
    <div className="flex flex-col gap-4">
      {/* welcome option */}
      <div className="px-8 pt-4">
        <h2 className="font-medium text-[22px] text-[#222222]">
          Welcome to Gharsewa
        </h2>
        <form onSubmit={handleSubmit(handleCheckEmail)}>
          <input
            type="email"
            placeholder="Email"
            className={`w-full border-[1.5px] border-[#dddddd] p-3 rounded-lg mt-4 ${inputFocused ? "placeholder-shrink" : "placeholder-restore"
              }`}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                message: 'Please enter a valid Gmail address',
              },
              onBlur: handleInputBlur,
            })}
          />
          {errors.email && showErrorToast(errors.email.message)}
          <div className=" pt-4 px-8 italic">
            <ul className=" list-disc text-xs text-[#222222] opacity-80">
              <p>You can use below test credentials to login!</p>
              <li>email: guest@email.com</li>
            </ul>
          </div>
          <p className=" text-xs text-[#222222] pt-3 mb-5 opacity-80 ml-[2px]">
            We’ll send a confirmation email to verify your email address. <br />{" "}
            <Link className=" font-semibold underline">Privacy Policy</Link>
          </p>
          <button
            className={`bg-[#ff385c] hover:bg-[#d90b63] transition-all duration-300 text-white font-medium rounded-lg p-3 w-full disabled:bg-[#dddddd] ${isLoading ? " cursor-not-allowed" : ""
              }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <PulseLoader
                color="#f7f7f7"
                size={7}
                margin={4}
                speedMultiplier={0.6}
              />
            ) : (
              "Continue"
            )}
          </button>
        </form>
      </div>
      {/* devider */}
      <div className="flex flex-row items-center px-8">
        <div className="h-[1.2px] w-full inline-block bg-[#dddddd]"></div>
        <p className="inline-block text-xs mx-2">or</p>
        <div className="h-[1.2px] w-full inline-block bg-[#dddddd]"></div>
      </div>
      {/* continue with google/facebook */}
      <div className=" flex flex-col gap-4 px-8 pb-7">
        <div
          className=" w-full flex flex-row items-center border border-[#222222] rounded-lg py-[10px] bg-[#ffffff] hover:bg-[#f7f7f7] transition-colors cursor-pointer"
          onClick={handleGoogleLogin}
        >
          <img src={google} alt="Log in with facebook" className="w-6 ml-5" />
          <p className="text-sm mx-auto font-medium text-[#222222]">
            Continue with Google
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
