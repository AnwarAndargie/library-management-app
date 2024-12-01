from flaskext.mysql import MySQL
class DB():
	host = "localhost"
	user = "root"
	password = ""
	db = "lms"
	table = ""

	def __init__(self, app):
		app.config["MYSQL_DATABASE_HOST"] = self.host
		app.config["MYSQL_DATABASE_USER"] = self.user
		app.config["MYSQL_DATABASE_PASSWORD"] = self.password
		app.config["MYSQL_DATABASE_DB"] = self.db

		self.mysql = MySQL(app)
	def get_db_cursor(self):
		conn = self.mysql.connect()
		return conn, conn.cursor()

