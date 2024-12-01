class BooksDAO:
    def __init__(self, db):
        self.db = db
        self.table = "books"

    def createBook(self, name, edition, year, author, count, available):
        try:
            query = f"INSERT INTO {self.table} (name, edition, year, author, count, available) VALUES (?, ?, ?, ?, ?, ?)"
            self.db.query(query, (name, edition, year, author, count, available))
            self.db.commit()
            return {"message": "Book created successfully"}
        except Exception as e:
            return {"error": f"Failed to create book: {str(e)}"}

    def delete(self, id):
        try:
            query = f"DELETE FROM {self.table} WHERE id = ?"
            self.db.query(query, (id,))
            self.db.commit()
            return {"message": "Book deleted successfully"}
        except Exception as e:
            return {"error": f"Failed to delete book: {str(e)}"}

    def getBook(self, id):
        try:
            query = f"SELECT * FROM {self.table} WHERE id = ?"
            book = self.db.query(query, (id,)).fetchone()
            return book if book else {"error": "Book not found"}
        except Exception as e:
            return {"error": f"Failed to retrieve book: {str(e)}"}

    def check_availability(self, id):
        try:
            book = self.getBook(id)
            if not book or book['count'] < 1:
                return False
            return True
        except Exception as e:
            return {"error": f"Failed to check availability: {str(e)}"}

    def getAllBooks(self, availability=1):
        try:
            query = f"SELECT * FROM {self.table}"
            if availability == 1:
                query += " WHERE available = ?"
                books = self.db.query(query, (availability,))
            else:
                books = self.db.query(query)
            return books.fetchall()
        except Exception as e:
            return {"error": f"Failed to retrieve books: {str(e)}"}

    def search_book(self, name, availability=1):
        try:
            query = f"SELECT * FROM {self.table} WHERE name LIKE ?"
            params = (f"%{name}%",)
            if availability == 1:
                query += " AND available = ?"
                params += (availability,)
            books = self.db.query(query, params).fetchall()
            return books
        except Exception as e:
            return {"error": f"Failed to search books: {str(e)}"}

    def updateBook(self, id, name=None, edition=None, year=None, author=None, count=None, available=None):
        try:
            updates = []
            params = []
            if name:
                updates.append("name = ?")
                params.append(name)
            if edition:
                updates.append("edition = ?")
                params.append(edition)
            if year:
                updates.append("year = ?")
                params.append(year)
            if author:
                updates.append("author = ?")
                params.append(author)
            if count is not None:
                updates.append("count = ?")
                params.append(count)
            if available is not None:
                updates.append("available = ?")
                params.append(available)
            params.append(id)

            if updates:
                query = f"UPDATE {self.table} SET {', '.join(updates)} WHERE id = ?"
                self.db.query(query, tuple(params))
                self.db.commit()
                return {"message": "Book updated successfully"}
            else:
                return {"error": "No fields to update"}
        except Exception as e:
            return {"error": f"Failed to update book: {str(e)}"}
