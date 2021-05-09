from datetime import datetime, timedelta
from flask import jsonify, abort, request, Blueprint
# from main.extract_concepts import extract_concepts, expand_concepts
# from main.bloom_verbs import extract_bloom_verbs, get_bloom_taxonomy
# from main.fetch_lo import get_top_sentences
# from main.predict_bloom_taxonomy import predict_bloom_taxonomy
from main.predict_taxonomy import recommend_taxonomy

# from main.predict_taxonomy import predict_taxonomy
# from main.lo_templates import get_lo_templates

REQUEST_API = Blueprint('request_api', __name__)

def get_blueprint():
    """Return the blueprint for the main app module"""
    return REQUEST_API



@REQUEST_API.route('/recommendtaxonomy', methods=['POST'])
def recommend_tax():
    """triggers code to recommendtaxonomy hierarchy
    """
    if not request.files:
        abort(400)
    body = request.files["document"]
    text = body.read().decode("utf-8")
    output = recommend_taxonomy(text)
    print("output",output.tolist())

    return jsonify({"subjecttaxonomy": output.tolist()})


MODEL_HEALTH = {
    "health": {
        'status': u'api is up',
        'timestamp': (datetime.today() - timedelta(1)).timestamp()
    },
}


@REQUEST_API.route('/health', methods=['GET'])
def get_health():
    """Return all book requests
    @return: 200: health of api\
    flask/response object with application/json mimetype.
    """
    return jsonify(MODEL_HEALTH)