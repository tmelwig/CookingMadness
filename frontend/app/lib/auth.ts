import { AuthState } from "@/app/stores/auth-store";
import { gETMe } from "../../api/gourmetAPI";

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
  Accept: "application/json",
});

const checkIfUserIsLoggedIn = async (
  setAuthState: (authState: AuthState) => void
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    const response = await gETMe({
      headers: authHeaders(token),
    });
    const isValidResponse =
      response.status === 200 && "username" in response.data;
    if (isValidResponse) {
      setAuthState({
        isConnected: true,
        username: response.data?.username || "",
      });
    }
    return isValidResponse;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to check user login status");
  }
};

export { checkIfUserIsLoggedIn, authHeaders };
