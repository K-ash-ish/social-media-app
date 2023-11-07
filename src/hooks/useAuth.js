export function useAuth() {
  const login = async (email, password) => {
    return fetch("api/login", {
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
  };

  const signUp = async (email, password) => {
    return fetch("api/signup", {
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
  };
  const isLoggedIn = async () => {
    // console.log(cookies().getAll());
  };

  return { login, signUp, isLoggedIn };
}
