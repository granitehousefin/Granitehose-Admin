import React from "react";
import { MdOutlineAlternateEmail, MdLockOpen } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function AuthenticationPage() {
  let navigate = useNavigate();
  function handleAuth(e) {
    e.preventDefault();
    let username = e.target[0].value;
    let password = e.target[1].value;
    if (username === "developer@admin.com" && password === "123123") {
      localStorage.setItem("login", JSON.stringify({ value: true }));
      Swal.fire("Login successful", "", "success").then(() => {
        navigate("/dashboard", { replace: true });
      });
    } else {
      Swal.fire(
        "Login failed",
        "Please check username and password and try again",
        "warning"
      );
      localStorage.setItem("login", JSON.stringify({ value: true }));
    }
  }
  return (
    <div className="h-full">
      <div className="h-screen w-full">
        <div className="bg-[#f4f6f9]  h-full flex flex-col justify-center">
          <div className="max-w-[350px] w-full mx-auto">
            <div className="mb-[32px]">
              <div className="mb-[12px] flex justify-center">
                <img
                  src={process.env.PUBLIC_URL + "/assets/logo.svg"}
                  className="rounded"
                  width="180px"
                  alt=""
                  style={{ background: "black", height: "7rem" }}
                ></img>
              </div>
            </div>
            <form className="flex flex-col" onSubmit={(e) => handleAuth(e)}>
              <div className="flex bg-[#fbfbff] rounded-md p-4 mb-2 border-2 border-transparent hover:border-[#060b27] hover:border-2">
                <input
                  placeholder="Username"
                  className="bg-transparent w-full outline-0"
                  type="email"
                  required
                  id="username"
                ></input>
                <div className="flex items-center">
                  <MdOutlineAlternateEmail />
                </div>
              </div>
              <div className="flex bg-[#fbfbff] rounded-md p-4 mb-2 border-2 border-transparent hover:border-[#060b27] hover:border-2">
                <input
                  placeholder="Password"
                  className="bg-transparent w-full outline-0"
                  type="password"
                  required
                  id="password"
                ></input>
                <div className="flex items-center">
                  <MdLockOpen />
                </div>
              </div>
              {/* <div className="w-full text-right font-semibold text-[#060b27] text-sm mb-5">
                <span>Forgot Password</span>
              </div> */}
              <button
                type="submit"
                className="w-full rounded-md bg-[#ffce33] p-4 text-black font-semibold"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationPage;
