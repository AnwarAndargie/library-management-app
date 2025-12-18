import { useState, useEffect } from 'react';
import { api } from '../api/api';
import { Trash2, Edit, Plus } from 'lucide-react';

export default function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newBook, setNewBook] = useState({
        name: '',
        author: '',
        edition: '',
        year: '',
        count: 1,
        available: true
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const data = await api.getBooks();
            if (data.error) throw new Error(data.error);
            setBooks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            const res = await api.addBook(newBook);
            if (res.error) throw new Error(res.error);
            setBooks([...books, res.book]);
            setShowAddForm(false);
            setNewBook({ name: '', author: '', edition: '', year: '', count: 1, available: true });
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.deleteBook(id);
            setBooks(books.filter(b => b.id !== id));
        } catch (err) {
            alert('Failed to delete book');
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Library Books</h1>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700"
                >
                    <Plus size={20} /> Add Book
                </button>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {showAddForm && (
                <form onSubmit={handleAddBook} className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Book Name"
                            className="border p-2 rounded"
                            value={newBook.name}
                            onChange={e => setNewBook({ ...newBook, name: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Author"
                            className="border p-2 rounded"
                            value={newBook.author}
                            onChange={e => setNewBook({ ...newBook, author: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Edition"
                            className="border p-2 rounded"
                            value={newBook.edition}
                            onChange={e => setNewBook({ ...newBook, edition: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Year"
                            className="border p-2 rounded"
                            value={newBook.year}
                            onChange={e => setNewBook({ ...newBook, year: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Count"
                            className="border p-2 rounded"
                            value={newBook.count}
                            onChange={e => setNewBook({ ...newBook, count: parseInt(e.target.value) })}
                            min="1"
                            required
                        />
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={newBook.available}
                                onChange={e => setNewBook({ ...newBook, available: e.target.checked })}
                                className="mr-2"
                            />
                            <label>Available</label>
                        </div>
                    </div>
                    <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Save Book
                    </button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map(book => (
                    <div key={book.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-800">{book.name}</h3>
                        <p className="text-gray-600">Author: {book.author}</p>
                        <p className="text-gray-500 text-sm">Edition: {book.edition} | Year: {book.year}</p>
                        <div className="mt-4 flex justify-between items-center">
                            <span className={`px-2 py-1 rounded text-xs ${book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {book.available ? 'Available' : 'Out of Stock'}
                            </span>
                            <button onClick={() => handleDelete(book.id)} className="text-red-500 hover:text-red-700">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
