from flask import Flask, render_template


app = Flask(__name__)

if __name__ == 'main':
  app.run()

@app.route('/')
def index():
  return render_template('home.html')
