import type { AuthProvider } from "@refinedev/core";

export const TOKEN_KEY = "token";

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    // if ((username || email) && password) {
    //   localStorage.setItem(TOKEN_KEY, username);
    //   return {
    //     success: true,
    //     redirectTo: "/",
    //   };
    // }

    // return {
    //   success: false,
    //   error: {
    //     name: "LoginError",
    //     message: "Invalid username or password",
    //   },
    // };
    console.log("Login from authProvider");

    const response = await fetch(
      "https://amitawt.pythonanywhere.com/auth/signin/",
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
      return { success: true };
    } else {
      return Promise.reject(new Error("Invalid credentials"));
    }

    // return { success: false };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
