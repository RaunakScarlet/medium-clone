import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SignupInput } from "medium-raunak";
import { BACKEND_URL } from "../config";
export const Auth = ({ type }: { type: "signin" | "signup" }) => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState<SignupInput>({
        email: "",
        name: "",
        password: "",
    });
    async function sendRequest() {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${
                    type === "signup" ? "signup" : "signin"
                }`,
                userDetails
            );
            const jwt = response.data;
           
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className=" h-screen flex flex-col justify-center">
            <div className="flex justify-center flex-col items-center">
                <div>
                    <div className="text-3xl font-extrabold ">
                        Start Using Medium
                    </div>
                    <div className="text-slate-400 my-2 text-center">
                        {type === "signin"
                            ? "Dont have an account?"
                            : " Already have an account?"}
                        <Link
                            className="pl-2 underline"
                            to={type === "signup" ? "/signin" : "/signup"}
                        >
                            {type === "signin" ? "SignUp" : "SignIn"}
                        </Link>
                    </div>
                </div>
                <div>
                    {type === "signup" && (
                        <LabelledInput
                            label="Name"
                            placeholder="Raunak"
                            onChange={(e) =>
                                setUserDetails({
                                    ...userDetails,
                                    name: e.target.value,
                                })
                            }
                        />
                    )}
                    <LabelledInput
                        label="Email"
                        placeholder="raunak@gmail.com"
                        onChange={(e) =>
                            setUserDetails({
                                ...userDetails,
                                email: e.target.value,
                            })
                        }
                    />
                    <LabelledInput
                        label="Password"
                        placeholder="********"
                        type="password"
                        onChange={(e) =>
                            setUserDetails({
                                ...userDetails,
                                password: e.target.value,
                            })
                        }
                    />
                    <button
                        onClick={sendRequest}
                        type="button"
                        className="w-full  mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                        {type === "signin" ? "Sign in" : " Sign up"}
                    </button>
                </div>
            </div>
        </div>
    );
};

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function LabelledInput({
    label,
    placeholder,
    onChange,
    type,
}: LabelledInputType) {
    return (
        <div>
            <label
                htmlFor="first_name"
                className="block mt-2 mb-1 text-sm font-medium text-black"
            >
                {label}
            </label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
