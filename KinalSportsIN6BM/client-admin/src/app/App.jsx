import { useEffect } from "react";
import { AppRoutes } from "./router/AppRoutes.jsx";
import { Toaster } from "react-hot-toast"
import { ConfirmModal } from "../shared/components/ui/ConfirmModa.jsx";
import { useAuthStore } from "../features/auth/store/authStore.js";

export const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: "inherit",
            fontWeight: 600,
            fontSize: "1rem",
            borderRadius: "8px"
          }
        }}
      />
      <AppRoutes />
      <ConfirmModal />
    </>
  )
}
