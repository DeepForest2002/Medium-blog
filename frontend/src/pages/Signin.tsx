import { Label } from "../components/labels";
import { Link } from "react-router-dom";
export const Signin = () => {
  return (
    <div>
      <div className="w-screen h-screen flex flex-row">
        <div className="w-[50%] h-screen flex justify-center items-center">
          {/* This is the form element */}
          <div className="flex flex-col justify-center items-center gap-7 p-3">
            <div className="text-center">
              <h2 className="text-5xl font-bold">Create an account</h2>
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
              />
              <Label
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                labelText="Passowrd"
              />
            </form>
            <button className="w-[100%] p-2 font-bold text-xl text-white bg-black rounded-md">
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
