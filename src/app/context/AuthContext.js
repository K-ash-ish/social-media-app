import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

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
      const user = await fetch("/api/user", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => data);
      if (user) {
        setCurrentUser(user.message);
        setIsLoggedIn(true);
      }
    }

    fetchUser();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    const loginData = await fetch("api/login", {
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
      setCurrentUser({ name, userHandle });
      const route = loginData.message === "Not Found" ? "/edit-profile" : "/";
      return router.push(route);
    }
  };

  const signUp = async (email, password) => {
    setIsLoading(true);
    const signUpData = await fetch("api/signup", {
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
      } = signUpData;
      setIsLoggedIn(true);
      setCurrentUser({ name, userHandle });
      return router.push("/edit-profile");
    }
  };
  const logout = async () => {
    const response = await fetch("api/logout")
      .then((res) => res.json())
      .then((data) => data);
    if (response.message === "Success") {
      setIsLoggedIn(false);
      return router.push("/login");
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
