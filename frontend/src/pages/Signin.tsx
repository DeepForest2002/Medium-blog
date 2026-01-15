import { Label } from "../components/Labels";
import { Link, useNavigate } from "react-router-dom";
import type { signinType } from "@sayan_pramanik2002/common-type";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Signin = () => {
  const navigate = useNavigate();
  const [signinInputs, setSigninInputs] = useState<signinType>({
    email: "",
    password: "",
  });

  async function HandleSignin() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/siginin`,
        signinInputs
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (err) {
      alert("Error while signing in");
    }
  }
  return (
    <div>
      <div className="w-screen h-screen flex flex-row">
        <div className="w-[50%] h-screen flex justify-center items-center">
          {/* This is the form element */}
          <div className="flex flex-col justify-center items-center gap-7 p-3">
            <div className="text-center">
              <h2 className="text-5xl font-bold">Signin to your acccount</h2>
              <p className="text-xl text-gray-500 mt-2">
                Dont have an account?{" "}
                <Link to={"/signup"} className="underline">
                  Signup
                </Link>
              </p>
            </div>
            <form
              action=""
              className="flex flex-col w-[100%] justify-center  gap-3 p-3"
            >
              <Label
                id="email"
                type="email"
                name="email"
                placeholder="abcd@gmail.com"
                labelText="Email"
                value={signinInputs.email}
                onChange={(e) => {
                  setSigninInputs({
                    ...signinInputs,
                    email: e.target.value,
                  });
                }}
              />
              <Label
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                labelText="Passowrd"
                value={signinInputs.password}
                onChange={(e) => {
                  setSigninInputs({
                    ...signinInputs,
                    password: e.target.value,
                  });
                }}
              />
            </form>
            <button
              className="w-[100%] p-2 font-bold text-xl text-white bg-black rounded-md"
              onClick={HandleSignin}
            >
              Signin
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
