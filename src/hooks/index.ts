import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    content: string;
    title: string;
    id: string;
    publishDate: string;
    author: {
        name: string;
    };
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
       

        const fetchBlog = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No token found");
                }

                const response = await axios.get(
                    `${BACKEND_URL}/api/v1/blog/${id}`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                setBlog(response.data.blog);
            } catch (error) {
                console.error("Error fetching blog data:", error);
               
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    return {
        loading,
        blog,
    };
};
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setBlogs(response.data.blogs);
                console.log(response.data.blogs);
                setLoading(false);
            });
    }, []);

    return {
        loading,
        blogs,
    };
};
