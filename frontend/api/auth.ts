import { gETMe } from "./gourmetAPI";


const checkIfUserIsLoggedIn = async () => {
    console.log("oui")
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return false;
        }
        const response = await gETMe({
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        console.log("LA REP", response);
        return response.status === 200 && "username" in response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export {checkIfUserIsLoggedIn};

