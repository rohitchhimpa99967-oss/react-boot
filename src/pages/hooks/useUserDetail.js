import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export const useUserDetail = () => {
    const [decode, setDecode] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            console.log(decoded)
            setDecode(decoded);
        } else {
            setDecode(null);
        }


    }, [])

    return { decode };
}
