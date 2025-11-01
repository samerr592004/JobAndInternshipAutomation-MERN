import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-hot-toast";
import { axiosInstance } from "@/lib/axiosInstance";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      OTP: null,

      login: async ({ email, password }) => {
        const loadingToast = toast.loading("Logging in...");
        try {
          const response = await axiosInstance.post("/auth/login", {
            email,
            password
          });
          set({ user: response.data.user, isAuthenticated: true });
          toast.success(`Welcome to CMS, ${response.data.user.username}!`, { id: loadingToast });
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || "Login failed", { id: loadingToast });
        }
      },

      signUp: async ({ username, email, password }) => {
        const loadingToast = toast.loading("Signing up...");
        console.log(username, email, password);

        try {
          const response = await axiosInstance.post("/auth/register", {
            username,
            email,
            password
          });
          set({ user: response.data.user, isAuthenticated: true });
          console.log(response.data);
          toast.success(`Welcome to CMS,! ${response.data.user.username}`, { id: loadingToast });
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || "Sign up failed", { id: loadingToast });
        }
      },
      sendOtp : async (email) => {
        try {
          // 🔢 Generate a 6-digit OTP
          const otp = Math.floor(100000 + Math.random() * 900000).toString();

          // 🚀 Send to backend
          const res = await axiosInstance.post("/auth/send-otp", {
            email,
            otp,
          });
          set({OTP:otp})
          toast.success("Otp Sent Successfully!!")

          return otp; // (optional) return it if you want to verify later locally
        } catch (error) {
          toast.error("❌ Error sending OTP:", error.response?.data || error.message);
          throw error;
        }
      },

      logout: () => {
        try {
          set({ user: null, isAuthenticated: false });
          toast.success("Logout successful");
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || "Logout failed");
        }
      },
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);

export default useAuthStore