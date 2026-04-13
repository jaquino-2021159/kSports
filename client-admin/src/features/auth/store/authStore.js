import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as loginRequest } from "../../../shared/api"

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            expiresAt: null,
            loading:false,
            error:null,
            isAuthenticated: false,

            login: async ({emailOrUsername, password}) => {
                try {

                    set({ loaging: true, error: null});
                    const  { data } = await loginRequest({emailOrUsername, password})

                    set ({
                        user: data.userDetails,
                        token: data.token, 
                        expiresAt: data.expiresAt,
                        loaging: false,
                        error: message
                    })
                } catch (err) {
                    console.error("Login error:", err);
                    const message =
                        err.responde?.data?.message || "Error de autenticacion";
                    set({ error: message, loading: false})
                    return { success: false, error: message }
                }
                }
        }) 
    )
)