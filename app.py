from flask import Flask, render_template

app = Flask(__name__)
from models.DAO import DAO

DAO = DAO(app)

if __name__ == '__main__': 
    app.run(debug=True)


@app.route('/')
def index():
  return render_template('home.html')
