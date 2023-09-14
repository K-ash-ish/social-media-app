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
  return [login];
}
