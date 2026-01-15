import { Label } from "../components/Labels";
import { Link, useNavigate } from "react-router-dom";
import type { signupType } from "@sayan_pramanik2002/common-type";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { BACKEND_URL } from "../config";

export const Signup = () => {
  const navigate = useNavigate();
  const [signupInputs, setSignupInputs] = useState<signupType>({
    name: "",
    email: "",
    password: "",
  });

  //now write the signup button onClick function
  async function OnclickHandle() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        signupInputs
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert(`Error while signing up`);
    }
  }

  return (
    <div>
      <div className="w-screen h-screen flex flex-row">
        <div className="w-[50%] h-screen flex justify-center items-center">
          {/* This is the form element */}
          <div className="flex flex-col justify-center items-center gap-7 p-3">
            <div className="text-center">
              <h2 className="text-5xl font-bold">Create an account</h2>
              <p className="text-xl text-gray-500 mt-2">
                Already have an account?{" "}
                <Link to={"/signin"} className="underline">
                  Signin
                </Link>
              </p>
            </div>
            <form
              action=""
              className="flex flex-col w-[100%] justify-center  gap-3 p-3"
            >
              <Label
                id="uname"
                type="text"
                name="email"
                placeholder="Enter your name"
                labelText="Username"
                value={signupInputs.name}
                onChange={(e) => {
                  setSignupInputs({
                    ...signupInputs,
                    name: e.target.value,
                  });
                }}
              />
              <Label
                id="email"
                type="email"
                name="email"
                placeholder="abcd@gmail.com"
                labelText="Email"
                value={signupInputs.email}
                onChange={(e) => {
                  setSignupInputs({ ...signupInputs, email: e.target.value });
                }}
              />
              <Label
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                labelText="Passowrd"
                value={signupInputs.password}
                onChange={(e) => {
                  setSignupInputs({
                    ...signupInputs,
                    password: e.target.value,
                  });
                }}
              />
            </form>
            <button
              onClick={OnclickHandle}
              className="w-[100%] p-2 font-bold text-xl text-white bg-black rounded-md"
            >
              Signup
            </button>
          </div>
        </div>

        <div className="w-[50%] h-screen bg-slate-200 flex justify-center items-center">
          {/* For text content */}
          <div className="-400 w-[90%]">
            <h1 className=" text-black text-3xl font-bold">
              "The Customer Service i recieved was exceptional. The support team
              went above and beyond to address my concerns."
            </h1>
            <p className="text-black mt-6 text-xl font-bold">Jules Windfield</p>
            <p className="text-gray-500">CEO, Acame inc</p>
          </div>
        </div>
      </div>
    </div>
  );
};
