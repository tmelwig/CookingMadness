import { AuthState } from "@/app/stores/auth-store";
import { gETMe } from "./gourmetAPI";

const checkIfUserIsLoggedIn = async (
  setAuthState: (authState: AuthState) => void
) => {
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
    if (response.status === 200 && "username" in response.data) {
      if (response.data.username)
        setAuthState({ isConnected: true, username: response.data.username });
      return true;
    }
    return response.status === 200 && "username" in response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { checkIfUserIsLoggedIn };
