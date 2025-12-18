const API_URL = "http://localhost:5000";

export const api = {
    getMedia: async () => {
        const response = await fetch(`${API_URL}/media/`);
        return response.json();
    },
    addMedia: async (media) => {
        const response = await fetch(`${API_URL}/media/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(media),
        });
        return response.json();
    },
    deleteMedia: async (id) => {
        const response = await fetch(`${API_URL}/media/delete/${id}`, {
            method: "DELETE",
        });
        return response.json();
    },
    updateMedia: async (id, media) => {
        const response = await fetch(`${API_URL}/media/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(media),
        });
        return response.json();
    },
    aiProcess: async (prompt) => {
        const response = await fetch(`${API_URL}/ai/process`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
        });
        return response.json();
    },
    login: async (credentials) => {
        const response = await fetch(`${API_URL}/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });
        return response.json();
    },
    register: async (userData) => {
        const response = await fetch(`${API_URL}/register/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        return response.json();
    },
};
