from App.Books import Books
import logging

logging.basicConfig(level=logging.INFO)

class BooksController:
    def __init__(self, DAO):
        self.misc = Books(DAO.db.book)
        self.dao = self.misc.dao

    def createBook(self, name, edition, year, author, count, available):
        try:
            logging.info(f"Creating book: {name}, {edition}, {year}")
            book = self.dao.createBook(name, edition, year, author, count, available)
            return book
        except Exception as e:
            logging.error(f"Failed to create book: {str(e)}")
            return {"error": f"Failed to create book: {str(e)}"}

    def getAllBooks(self, availability=1, user_id=None, page=1, per_page=10):
        try:
            offset = (page - 1) * per_page
            if user_id:
                book_list = self.dao.listByUser(user_id)
            else:
                book_list = self.dao.getAllBooksPaginated(availability, offset, per_page)
            return book_list
        except Exception as e:
            logging.error(f"Failed to retrieve books: {str(e)}")
            return {"error": f"Failed to retrieve books: {str(e)}"}

    def getBook(self, id):
        try:
            if id <= 0:
                return {"error": "Invalid book ID."}
            book = self.dao.getBook(id)
            if not book:
                return {"error": "Book not found."}
            return book
        except Exception as e:
            logging.error(f"Failed to get book: {str(e)}")
            return {"error": f"Failed to get book: {str(e)}"}

    def updateBook(self, book_id, **kwargs):
        try:
            logging.info(f"Updating book ID: {book_id}")
            updated_book = self.dao.update(book_id, **kwargs)
            return updated_book
        except Exception as e:
            logging.error(f"Failed to update book: {str(e)}")
            return {"error": f"Failed to update book: {str(e)}"}

    def delete(self, id):
        try:
            if id <= 0:
                return {"error": "Invalid book ID."}
            self.dao.delete(id)
            return {"message": "Book deleted successfully"}
        except Exception as e:
            logging.error(f"Failed to delete book: {str(e)}")
            return {"error": f"Failed to delete book: {str(e)}"}
