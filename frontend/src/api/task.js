import api from "./axios";

export const taskAPI = {
  getAll: async () => {
    const { data } = await api.get("/tasks");
    return data.data;
  },

  getOne: async (id) => {
    const { data } = await api.get(`/tasks/${id}`);
    return data.data;
  },

  create: async (taskData) => {
    const { data } = await api.post("/tasks", taskData);
    return data.data;
  },

  update: async (id, taskData) => {
    const { data } = await api.put(`/tasks/${id}`, taskData);
    return data.data;
  },

  toggleStatus: async (id) => {
    const { data } = await api.patch(`/tasks/${id}/toggle`);
    return data.data;
  },

  delete: async (id) => {
    await api.delete(`/tasks/${id}`);
    return id;
  },
};
