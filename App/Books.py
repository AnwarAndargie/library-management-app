class Books():
	id = 0
	name = ""
	edition = ""
	year = ""
	count = 0
	available = False
	def __init__(self, BookDAO):
		self.dao = BookDAO