from App.Books import Books

class BookController:
    def __init__(self, DAO):
        self.misc = Books(DAO.db.book)
        self.dao = self.misc.dao

    def createBook(self, name, edition, year, author, count, available):
        try:
            book = self.dao.createBook(name, edition, year, author, count, available)
            return book
        except Exception as e:
            return {"error": f"Failed to create book: {str(e)}"}

    def getAllBooks(self, availability=1, user_id=None):
        try:
            if user_id is not None:
                book_list = self.dao.listByUser(user_id)
            else:
                book_list = self.dao.list(availability)
            return book_list
        except Exception as e:
            return {"error": f"Failed to retrieve books: {str(e)}"}

    def getReservedBooksByUser(self, user_id):
        try:
            books = self.dao.getReservedBooksByUser(user_id)
            return books
        except Exception as e:
            return {"error": f"Failed to get reserved books: {str(e)}"}

    def getBook(self, id):
        try:
            book = self.dao.getBook(id)
            return book
        except Exception as e:
            return {"error": f"Failed to get book: {str(e)}"}

    def search(self, keyword, availability=1):
        try:
            books = self.dao.search_book(keyword, availability)
            return books
        except Exception as e:
            return {"error": f"Search failed: {str(e)}"}

    def reserve(self, user_id, book_id):
        try:
            books = self.dao.reserve(user_id, book_id)
            return books
        except Exception as e:
            return {"error": f"Failed to reserve book: {str(e)}"}

    def getUserBooks(self, user_id):
        try:
            books = self.dao.getBooksByUser(user_id)
            return books
        except Exception as e:
            return {"error": f"Failed to get user books: {str(e)}"}

    def getUserBooksCount(self, user_id):
        try:
            count = self.dao.getBooksCountByUser(user_id)
            return count
        except Exception as e:
            return {"error": f"Failed to get book count: {str(e)}"}

    def updateBook(self, book_id, name=None, edition=None, year=None, author=None, count=None, available=None):
        try:
            updated_book = self.dao.update(book_id, name, edition, year, author, count, available)
            return updated_book
        except Exception as e:
            return {"error": f"Failed to update book: {str(e)}"}

    def delete(self, id):
        try:
            self.dao.delete(id)
            return {"message": "Book deleted successfully"}
        except Exception as e:
            return {"error": f"Failed to delete book: {str(e)}"}
