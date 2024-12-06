from flask import Flask, render_template

app = Flask(__name__)
from models.DAO import DAO

DAO = DAO(app)

from routes.books import book_view
app.jinja_env.globals.update(
   str=str,
)


if __name__ == '__main__': 
    app.run(debug=True)



@app.route('/')
def index():
  return render_template('home.html')

app.register_blueprint(book_view)
