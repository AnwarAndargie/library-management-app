from flask import Flask, render_template
from models import db 
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/lms'
db.init_app(app)
migrate = Migrate(app, db)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  
    app.run(debug=True)


@app.route('/')
def index():
  return render_template('home.html')
