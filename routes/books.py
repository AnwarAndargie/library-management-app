from flask import Blueprint, render_template, request, jsonify
import logging
from extensions import db
from App.Books import Books


book_view = Blueprint('book_view', __name__, template_folder='templates')


@book_view.route('/books/', defaults={'id': None}, methods=['GET'])
@book_view.route('/books/<int:id>', methods=['GET'])
def home(id):
    try:
        if id is not None:
            book = Books.query.get(id)
            if not book:
                return jsonify({"error": "No book found!"}), 404
            return jsonify([book.to_dict()])
        else:
            books = Books.query.all()
            return jsonify([book.to_dict() for book in books])
    except Exception as e:
        logging.error(e)
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@book_view.route('/books/add', methods=['POST'])
def add_book():
    try:
        data = request.get_json()
        name = data.get("name")
        edition = data.get("edition")
        year = data.get("year")
        author = data.get("author")
        count = int(data.get("count", 0))
        available = data.get("available")

        if not name or not edition or not year or not author or count < 1:
            return jsonify({"error": "All fields are required, and count must be a positive integer."}), 400

        new_book = Books(
            name=name,
            edition=edition,
            year=year,
            author=author,
            count=count,
            available=available,
        )

        db.session.add(new_book)
        db.session.commit()

        return jsonify({"message": "Book added successfully!", "book": new_book.to_dict()}), 201

    except Exception as e:
        logging.error(f"Error in /books/add: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


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
        data = request.get_json()
        book.name = data.get("name", book.name)
        book.edition = data.get("edition", book.edition)
        book.year = data.get("year", book.year)
        book.author = data.get("author", book.author)
        book.count = int(data.get("count", book.count))
        book.available = data.get("available", book.available)

        # Commit changes to database
        db.session.commit()

        return jsonify({"message": "Book updated successfully"}), 200

    except Exception as e:
        logging.error(f"Error updating book: {e}")
        return jsonify({"error": "Failed to update book"}), 500
