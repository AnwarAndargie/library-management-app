from App.Media import Media
from extensions import db

class MediaController:
    @staticmethod
    def create_media(name, type, author, url=None, ai_description=None, size=None):
        try:
            media = Media(
                name=name,
                type=type,
                author=author,
                url=url,
                ai_description=ai_description,
                size=size
            )
            db.session.add(media)
            db.session.commit()
            return {"message": f"Media '{name}' created successfully", "media": media.to_dict()}
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}

    @staticmethod
    def get_all_media():
        try:
            media_list = Media.query.all()
            return [m.to_dict() for m in media_list]
        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def get_media_by_id(media_id):
        try:
            media = Media.query.get(media_id)
            if media is None:
                return {"error": "Media not found"}
            return media.to_dict()
        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def delete_media(media_id):
        try:
            media = Media.query.get(media_id)
            if media is None:
                return {"error": "Media not found"}
            db.session.delete(media)
            db.session.commit()
            return {"message": "Media deleted successfully"}
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}

    @staticmethod
    def update_media(media_id, **kwargs):
        try:
            media = Media.query.get(media_id)
            if media is None:
                return {"error": "Media not found"}
            for key, value in kwargs.items():
                if hasattr(media, key):
                    setattr(media, key, value)
            db.session.commit()
            return {"message": "Media updated successfully", "media": media.to_dict()}
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}
