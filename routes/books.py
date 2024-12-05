from flask import Blueprint, g, render_template, request, jsonify
import logging
from app import DAO
from controllers.BooksController import BooksController

book_view = Blueprint('book_routes', __name__, template_folder='/templates')

book_manager = BooksController(DAO)


@book_view.route('/books/', defaults={'id': None}, methods=['GET', 'POST'])
@book_view.route('/books/<int:id>', methods=['GET'])
def home(id):
    try:
        if id is not None:
            book = book_manager.getBook(id)
            if not book:
                return render_template('book_view.html', error="No book found!")
            return render_template("book_view.html", books=[book])
        else:
            books = book_manager.getAllBooks()
            if not books:
                return render_template('books.html', error="No books found!")
            return render_template("books.html", books=books)
    except Exception as e:
        logging.error(e)
        return render_template('error.html', error=f"An error occurred: {str(e)}")


@book_view.route('/books/add', methods=['POST'])
def add_book():
    try:
        book_data = {
            "name": request.form.get("name"),
            "edition": request.form.get("edition"),
            "year": request.form.get("year"),
            "author": request.form.get("author"),
            "count": int(request.form.get("count", 0)),
            "available": request.form.get("available") == "true",
        }
        result = book_manager.createBook(**book_data)
        if "error" in result:
            return render_template("books.html", error=result["error"], books=book_manager.getAllBooks())
        return render_template("books.html", msg="Book added successfully!", books=book_manager.getAllBooks())
    except Exception as e:
        return render_template('error.html', error=f"An error occurred: {str(e)}")
