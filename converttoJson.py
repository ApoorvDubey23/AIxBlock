from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import re
from waitress import serve

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def clean_json_string(json_str):
    """
    ✅ Cleans the JSON string by removing unnecessary backticks (` ```json ... ``` `).
    ✅ If the string is valid JSON, it parses and returns a dictionary.
    """
    if isinstance(json_str, str):
        json_str = re.sub(r"```json\n|\n```", "", json_str).strip()  # ✅ Remove Markdown JSON block
        try:
            return json.loads(json_str)  # ✅ Convert JSON string to dictionary
        except json.JSONDecodeError:
            return json_str  # ✅ Return as is if it's not JSON
    return json_str

def process_json(data):
    """ ✅ Processes and cleans the incoming JSON data """
    try:
        # ✅ Process 'result' field
        cleaned_result = clean_json_string(data.get("result", ""))

        # ✅ Process 'task_output' field
        task_output = data.get("task_output", [])
        if isinstance(task_output, list):
            for task in task_output:
                if isinstance(task.get("result"), str):
                    task["result"] = clean_json_string(task["result"])

        return {
            "name": data.get("name", "Unknown Task"),
            "result": cleaned_result,
            "task_output": task_output
        }

    except json.JSONDecodeError as e:
        return {"error": f"JSON decoding error: {e}"}

@app.route('/convert', methods=['POST'])
def convert():
    """ ✅ API Endpoint to clean and return readable JSON """
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data received"}), 400

        processed_json = process_json(data)
        return jsonify(processed_json), 200  # ✅ Return cleaned JSON

    except Exception as e:
        return jsonify({"error": str(e)}), 400  # ✅ Return error response

if __name__ == '__main__':
    serve(app, port=5001)  # ✅ No need to specify host (Render auto-handles)
