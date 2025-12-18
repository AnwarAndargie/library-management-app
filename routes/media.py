from flask import Blueprint, request, jsonify
import logging
from extensions import db
from App.Media import Media

media_view = Blueprint('media_view', __name__)

@media_view.route('/media/', defaults={'id': None}, methods=['GET'])
@media_view.route('/media/<int:id>', methods=['GET'])
def get_media(id):
    try:
        if id is not None:
            media = Media.query.get(id)
            if not media:
                return jsonify({"error": "No media found!"}), 404
            return jsonify([media.to_dict()])
        else:
            media_list = Media.query.all()
            return jsonify([m.to_dict() for m in media_list])
    except Exception as e:
        logging.error(e)
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@media_view.route('/media/add', methods=['POST'])
def add_media():
    try:
        data = request.get_json()
        name = data.get("name")
        type = data.get("type")
        author = data.get("author")
        url = data.get("url")
        ai_description = data.get("ai_description")
        size = data.get("size")

        if not name or not type or not author:
            return jsonify({"error": "Name, type, and author are required."}), 400

        new_media = Media(
            name=name,
            type=type,
            author=author,
            url=url,
            ai_description=ai_description,
            size=size
        )

        db.session.add(new_media)
        db.session.commit()

        return jsonify({"message": "Media added successfully!", "media": new_media.to_dict()}), 201

    except Exception as e:
        logging.error(f"Error in /media/add: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@media_view.route('/media/delete/<int:id>', methods=['POST', 'DELETE'])
def delete_media(id):
    try:
        media = Media.query.get(id)
        if not media:
            return jsonify({"error": "Media not found"}), 404

        db.session.delete(media)
        db.session.commit()

        return jsonify({"message": "Media deleted successfully"}), 200

    except Exception as e:
        logging.error(f"Error deleting media: {e}")
        return jsonify({"error": "Failed to delete media"}), 500

@media_view.route('/media/update/<int:id>', methods=['POST', 'PUT'])
def update_media(id):
    try:
        media = Media.query.get(id)
        if not media:
            return jsonify({"error": "Media not found"}), 404

        data = request.get_json()
        media.name = data.get("name", media.name)
        media.type = data.get("type", media.type)
        media.author = data.get("author", media.author)
        media.url = data.get("url", media.url)
        media.ai_description = data.get("ai_description", media.ai_description)
        media.size = data.get("size", media.size)

        db.session.commit()

        return jsonify({"message": "Media updated successfully", "media": media.to_dict()}), 200

    except Exception as e:
        logging.error(f"Error updating media: {e}")
        return jsonify({"error": "Failed to update media"}), 500

@media_view.route('/ai/process', methods=['POST'])
def ai_process():
    # Mock AI processing endpoint
    try:
        data = request.get_json()
        prompt = data.get("prompt")
        
        # In a real app, this would call GPT/Grok/Gemini API
        response = f"AI Response to '{prompt}': I have analyzed your media and optimized it for your workflow."
        
        return jsonify({"response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
