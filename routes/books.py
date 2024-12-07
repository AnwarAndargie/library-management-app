from flask import Blueprint, render_template, request, jsonify
import logging
from app import db
from App.Books import Books


book_view = Blueprint('book_view', __name__, template_folder='templates')


@book_view.route('/books/', defaults={'id': None}, methods=['GET', 'POST'])
@book_view.route('/books/<int:id>', methods=['GET'])
def home(id):
    try:
        if id is not None:
           
            book = Books.query.get(id)
            if not book:
                return render_template('book_view.html', error="No book found!")
            return render_template("book_view.html", books=[book])
        else:
           
            books = Books.query.all()
            if not books:
                return render_template('books.html', error="No books found!")
            return render_template("books.html", books=books)
    except Exception as e:
        logging.error(e)
        return render_template('error.html', error=f"An error occurred: {str(e)}")


@book_view.route('/books/add', methods=['POST'])
def add_book():
    try:
      
        name = request.form.get("name")
        edition = request.form.get("edition")
        year = request.form.get("year")
        author = request.form.get("author")
        count = int(request.form.get("count", 0))
        available = request.form.get("available") == "true"

       
        if not name or not edition or not year or not author or count < 1:
            return render_template(
                "books.html",
                error="All fields are required, and count must be a positive integer.",
                books=Books.query.all(),
            )

        # Create a new book instance
        new_book = Books(
            name=name,
            edition=edition,
            year=year,
            author=author,
            count=count,
            available=available,
        )

        # Add to database
        db.session.add(new_book)
        db.session.commit()

        return render_template("books.html", msg="Book added successfully!", books=Books.query.all())

    except Exception as e:
        logging.error(f"Error in /books/add: {e}")
        return render_template('error.html', error=f"An error occurred: {str(e)}")


@book_view.route('/books/delete/<int:id>', methods=['POST'])
def delete_book(id):
    try:
        # Fetch the book to delete
        book = Books.query.get(id)
        if not book:
            return jsonify({"error": "Book not found"}), 404

        # Delete from database
        db.session.delete(book)
        db.session.commit()

        return jsonify({"message": "Book deleted successfully"}), 200

    except Exception as e:
        logging.error(f"Error deleting book: {e}")
        return jsonify({"error": "Failed to delete book"}), 500


@book_view.route('/books/update/<int:id>', methods=['POST'])
def update_book(id):
    try:
        # Fetch the book to update
        book = Books.query.get(id)
        if not book:
            return jsonify({"error": "Book not found"}), 404

        # Update fields from form data
        book.name = request.form.get("name", book.name)
        book.edition = request.form.get("edition", book.edition)
        book.year = request.form.get("year", book.year)
        book.author = request.form.get("author", book.author)
        book.count = int(request.form.get("count", book.count))
        book.available = request.form.get("available") == "true"

        # Commit changes to database
        db.session.commit()

        return jsonify({"message": "Book updated successfully"}), 200

    except Exception as e:
        logging.error(f"Error updating book: {e}")
        return jsonify({"error": "Failed to update book"}), 500
