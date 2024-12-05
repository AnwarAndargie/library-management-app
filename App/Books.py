class Books():
    def __init__(self, bookDAO, id=0, name="", edition="", year="", count=0, available=False):
        self.dao = bookDAO
        self.id = id
        self.name = name
        self.edition = edition
        self.year = year
        self.count = count
        self.available = available

    def __str__(self):
        return f"Books(id={self.id}, name='{self.name}', edition='{self.edition}', year='{self.year}', count={self.count}, available={self.available})"

    def from_dict(self, data):
        """
        Initialize a book object from a dictionary.
        """
        self.id = data.get('id', self.id)
        self.name = data.get('name', self.name)
        self.edition = data.get('edition', self.edition)
        self.year = data.get('year', self.year)
        self.count = data.get('count', self.count)
        self.available = data.get('available', self.available)

    def to_dict(self):
        """
        Convert the book object to a dictionary.
        """
        return {
            "id": self.id,
            "name": self.name,
            "edition": self.edition,
            "year": self.year,
            "count": self.count,
            "available": self.available
        }

    # Optionally, add CRUD helper methods here
    # def create(self):
    #     return self.dao.createBook(self.name, self.edition, self.year, self.count, self.available)

    # def delete(self):
    #     return self.dao.delete(self.id)

    # def update(self, **kwargs):
    #     """
    #     Update the book's attributes dynamically.
    #     """
    #     for key, value in kwargs.items():
    #         setattr(self, key, value)
    #     return self.dao.updateBook(self.id, **kwargs)
