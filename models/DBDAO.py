from copy import copy

from models.BooksDAO import BooksDAO
# from Models.UserDAO import UserDAO
# from Models.AdminDAO import AdminDAO

from models.DB import DB

class DBDAO(DB):
	def __init__(self, app):
		super(DBDAO, self).__init__(app)

		self.book = BooksDAO(copy(self))
		# self.user = UserDAO(copy(self))
		# self.admin = AdminDAO(copy(self))
