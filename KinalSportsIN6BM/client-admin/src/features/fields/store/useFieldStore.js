import { create } from "zustand";
import {
    getFields as getFieldsRequest,
    createField as createFieldRequest,
    updateField as updateFieldRequest,
    deleteField as deleteFieldRequest
} from "../../../shared/api";

export const useFieldStore = create((set, get) => ({
    fields: [],
    loading: false,
    error: null,

    getFields: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getFieldsRequest();
            console.log(response);

            set({
                fields: response.data.data,
                loading: false
            })

        } catch (error) {
            set({
                error: error.response?.data?.message || "Error al obtener canchas."
            })
        }
    },

    createField: async (formData) => {
        try {
            set({ loading: true, error: null })

            const response = await createFieldRequest(formData);

            set({
                fields: [response.data.data, ...get().fields],
                loading: false
            });

        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al crear campo."
            })
        }
    },

    updateField: async (id, data) => {
        try {
            set({ loading: true, error: null });

            const response = await updateFieldRequest(id, data);
            const updated = response.data.data;

            set((state) => ({
                fields: state.fields.map((f) =>
                    (f._id || f.id) === (updated._id || updated.id)
                        ? updated
                        : f
                ),
                loading: false
            }));

        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || "Error al actualizar campo."
            });
        }
    },

    deleteField: async (id) => {
        try {
            set({ loading: true, error: null });

            await deleteFieldRequest(id);

            set((state) => ({
                fields: state.fields.filter(f => (f._id || f.id) !== id),
                loading: false
            }));

        } catch (error) {
            console.log(error.response?.data);
            set({
                loading: false,
                error: error.response?.data?.message || "Error al eliminar campo."
            });
        }
    }
}))