
import { Avatar } from "./BlogCard";
import { Link,useNavigate } from "react-router-dom";

export const Appbar = () => {
    const navigate = useNavigate();
    const imgs = [
        "https://cdn.mos.cms.futurecdn.net/uazw6gFQuEC29mxMM55Tpb-1200-80.jpg.webp"
       
    ];

    return (
        <div className=" h-24 border-b flex justify-between px-10 py-4">
            <Link
                to={"/blogs"}
                className="flex flex-col justify-center cursor-pointer"
            >
                <img className="h-12 w-12 rounded-full" src={imgs[0]} alt="logo" />
            </Link>
            <div className="flex  items-center">
                <Link to={`/publish`}>
                    <button
                        type="button"
                        className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
                    >
                        New
                    </button>
                </Link>
                <div className="flex gap-3 justify-center items-center">
                    <Avatar size={"big"} name="Raunak" />
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/");
                        }}
                        type="button"
                        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};
