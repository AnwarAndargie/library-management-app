const API_URL = "http://localhost:5000";

export const api = {
    getBooks: async () => {
        const response = await fetch(`${API_URL}/books/`);
        return response.json();
    },
    addBook: async (book) => {
        const response = await fetch(`${API_URL}/books/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
        });
        return response.json();
    },
    deleteBook: async (id) => {
        const response = await fetch(`${API_URL}/books/delete/${id}`, {
            method: "POST",
        });
        return response.json();
    },
    updateBook: async (id, book) => {
        const response = await fetch(`${API_URL}/books/update/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
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
