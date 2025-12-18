from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager


from flask_cors import CORS
from dotenv import load_dotenv
import os

from extensions import db, migrate

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration from environment variables
user = os.getenv('DB_USER', 'postgres')
password = os.getenv('DB_PASSWORD', '')
host = os.getenv('DB_HOST', 'localhost')
port = os.getenv('DB_PORT', '5432')
db_name = os.getenv('DB_NAME', 'lms')

app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{user}:{password}@{host}:{port}/{db_name}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', '5ad22d041008936aab0e23d285f192fc9f7d46cd896c7fc3ff44954789730f17')

db.init_app(app)
migrate.init_app(app, db)


from routes.books import book_view
from routes.users import user_view
app.register_blueprint(book_view)
app.register_blueprint(user_view)


app.jinja_env.globals.update(str=str)

@app.route('/')
def index():
    return render_template('home.html')


if __name__ == '__main__':
    #Uncomment after setting up PostgreSQL database and credentials
    with app.app_context():
        db.create_all() 
    app.run(debug=True)
