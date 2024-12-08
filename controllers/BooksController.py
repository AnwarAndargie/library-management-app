from App.Books import Books
from app import db

class BooksController:
    @staticmethod
    def create_book(name, edition, year, author, count, available):
        try:
            book = Books(
                name=name,
                edition=edition,
                year=year,
                author=author,
                count=count,
                available=available
            )
            db.session.add(book)
            db.session.commit()
            return {"message": f"Book '{name}' created successfully"}
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}

    @staticmethod
    def get_all_books():
        try:
            return Books.query.all()
        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def get_book_by_id(book_id):
        try:
            book =Books.query.get(book_id)
            if book is None:
                return {"error": "Book not found"}
            return book
        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def delete_book(book_id):
        try:
            book = Books.query.get(book_id)
            if book is None:
                return {"error": "Book not found"}
            db.session.delete(book)
            db.session.commit()
            return {"message": "Book deleted successfully"}
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}

    @staticmethod
    def update_book(book_id, **kwargs):
        try:
            book = Books.query.get(book_id)
            if book is None:
                return {"error": "Book not found"}
            for key, value in kwargs.items():
                if hasattr(book, key):
                    setattr(book, key, value)
            db.session.commit()
            return {"message": "Book updated successfully"}
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}
