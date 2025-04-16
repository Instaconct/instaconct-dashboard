import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuth = () => {
  const router = useRouter();
  const user = ref<{ email?: string; name?: string } | null>(null);

  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    user.value = storedUser ? JSON.parse(storedUser) : null;
  }

  const login = async (email: string, password: string) => {
    const fakeUser = {
      email: "islam@dev.com",
      password: "pass",
      name: "islam",
    };

    if (email === fakeUser.email && password === fakeUser.password) {
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(fakeUser));
      }
      user.value = fakeUser;
      router.push("/");
    } else {
      throw new Error("Invalid email or password");
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    user.value = null;
    router.push("/login");
  };

  const isAuthenticated = () => !!user.value?.email;

  return {
    user,
    login,
    logout,
    isAuthenticated,
  };
};
