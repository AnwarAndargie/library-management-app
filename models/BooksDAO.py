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
            return {"error": f"Failed to create book '{name}': {str(e)}"}

    def delete(self, id):
        try:
            query = f"DELETE FROM {self.table} WHERE id = ?"
            self.db.query(query, (id,))
            self.db.commit()
            return {"message": "Book deleted successfully"}
        except Exception as e:
            return {"error": f"Failed to delete book with ID {id}: {str(e)}"}

    def getBook(self, id):
        try:
            query = f"SELECT * FROM {self.table} WHERE id = ?"
            book = self.db.query(query, (id,)).fetchone()
            return book if book else {"error": "Book not found"}
        except Exception as e:
            return {"error": f"Failed to retrieve book with ID {id}: {str(e)}"}

    def check_availability(self, id):
        try:
            query = f"SELECT count FROM {self.table} WHERE id = ?"
            result = self.db.query(query, (id,)).fetchone()
            return result and result["count"] > 0
        except Exception as e:
            return {"error": f"Failed to check availability for book ID {id}: {str(e)}"}

    def getAllBooksPaginated(self, availability=1, offset=0, limit=10):
        try:
            query = f"SELECT * FROM {self.table}"
            params = []
            if availability == 2:
                query += " WHERE available = ?"
                params.append(availability)
            query += " LIMIT ? OFFSET ?"
            params.extend([limit, offset])
            books = self.db.query(query, tuple(params)).fetchall()
            return books
        except Exception as e:
            return {"error": f"Failed to retrieve books: {str(e)}"}

    def search_book(self, keyword, availability=1):
        try:
            query = f"SELECT * FROM {self.table} WHERE (name LIKE ? OR author LIKE ?)"
            params = [f"%{keyword}%", f"%{keyword}%"]
            if availability == 1:
                query += " AND available = ?"
                params.append(availability)
            books = self.db.query(query, tuple(params)).fetchall()
            return books
        except Exception as e:
            return {"error": f"Failed to search books with keyword '{keyword}': {str(e)}"}

    def updateBook(self, id, name=None, edition=None, year=None, author=None, count=None, available=None):
        try:
            if count is not None and count < 0:
                return {"error": "Count cannot be negative"}
            
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
            return {"error": f"Failed to update book with ID {id}: {str(e)}"}
