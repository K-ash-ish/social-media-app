import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { getQueryClient } from "../get-query-client";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const router = useRouter();
  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await fetch(
          "/api/verify-user",
          { method: "GET" },
          { credentials: "include" }
        )
          .then((res) => res.json())
          .then((data) => data);
        if (user.message === "Success") {
          setCurrentUser(user.data);
          setIsLoggedIn(true);
        }
      } catch (error) {}
    }

    fetchUser();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    const loginData = await fetch("/api/login", {
      body: JSON.stringify({
        email,
        password,
      }),
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    setIsLoading(false);

    if (loginData.error) {
      setErrorMessage(loginData.error);
    } else {
      const {
        message: { name, userHandle },
      } = loginData;
      setIsLoggedIn(true);
      setErrorMessage("");
      setCurrentUser({ name, userHandle });
      const route =
        (await loginData.message) === "Not Found" ? "/edit-profile" : "/";
      router.refresh();
      return router.push(route);
    }
  };

  const signUp = async (email, password) => {
    setIsLoading(true);
    const signUpData = await fetch("/api/signup", {
      body: JSON.stringify({
        email,
        password,
      }),
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });

    setIsLoading(false);

    if (signUpData.error) {
      setErrorMessage(signUpData.error);
    } else {
      const {
        message: { name, userHandle },
      } = signUpData;
      setIsLoggedIn(true);
      setErrorMessage("");
      setCurrentUser({ name, userHandle });
      router.refresh();
      return router.push("/edit-profile");
    }
  };
  const logout = async () => {
    const queryClient = getQueryClient();
    const res = await fetch("/api/logout")
      .then((res) => res.json())
      .then((data) => data);
    if (res.message === "success") {
      setIsLoggedIn(false);
      router.refresh();
      router.push("/login");
      return queryClient.resetQueries();
    }
  };
  const value = {
    signUp,
    login,
    logout,
    isLoggedIn,
    setIsLoggedIn,
    errorMessage,
    isLoading,
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
