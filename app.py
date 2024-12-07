from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)

user = "root"
pin = ""  
host = "localhost"
db_name = "lms"

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{user}:{pin}@{host}/{db_name}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
migrate = Migrate(app, db)


from routes.books import book_view
app.register_blueprint(book_view)


app.jinja_env.globals.update(str=str)

@app.route('/')
def index():
    return render_template('home.html')


if __name__ == '__main__':
    with app.app_context():
        db.create_all() 
    app.run(debug=True)
