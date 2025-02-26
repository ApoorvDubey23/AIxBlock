from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import re
from waitress import serve  # ✅ Use Waitress for production

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def clean_json_string(json_str):
    if isinstance(json_str, str):
        json_str = re.sub(r"```json\n|\n```", "", json_str).strip()
    return json_str

def process_json(data):
    try:
        if isinstance(data.get("result"), str):
            cleaned_result = clean_json_string(data["result"])
            parsed_result = json.loads(cleaned_result)
        else:
            parsed_result = data.get("result", {})

        task_output = data.get("task_output", [])
        if isinstance(task_output, list):
            for task in task_output:
                if isinstance(task.get("result"), str):
                    task["result"] = json.loads(clean_json_string(task["result"]))

        return {
            "name": data.get("name", "Unknown Task"),
            "result": parsed_result,
            "task_output": task_output
        }
    except json.JSONDecodeError as e:
        return {"error": f"JSON decoding error: {e}"}

@app.route('/convert', methods=['POST'])
def convert():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data received"}), 400

        processed_json = process_json(data)
        return jsonify(processed_json), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    serve(app, port=5001)  # ✅ No need to specify host
