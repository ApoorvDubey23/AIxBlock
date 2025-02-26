from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import re  # ✅ Import regex to clean unwanted symbols

app = Flask(__name__)

# ✅ Allow all origins for CORS
CORS(app, resources={r"/*": {"origins": "*"}})

def clean_json_string(json_str):
    """
    ✅ Cleans the JSON string by removing unnecessary backticks (` ```json ... ``` `).
    """
    if isinstance(json_str, str):  # ✅ Only process if it's a string
        json_str = re.sub(r"```json\n|\n```", "", json_str).strip()  # ✅ Remove Markdown JSON block
    return json_str

def process_json(data):
    """ ✅ Processes and cleans the incoming JSON data """
    try:
        # ✅ If 'result' is a string containing JSON, parse it properly
        if isinstance(data.get("result"), str):
            cleaned_result = clean_json_string(data["result"])
            parsed_result = json.loads(cleaned_result)  # ✅ Convert JSON string to a Python dict
        else:
            parsed_result = data.get("result", {})

        # ✅ Ensure the task_output is parsed correctly if it contains JSON inside a string
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
    """ ✅ API Endpoint to clean and return readable JSON """
    try:
        data = request.get_json()  # ✅ Get JSON data from request
        if not data:
            return jsonify({"error": "No JSON data received"}), 400

        processed_json = process_json(data)
        return jsonify(processed_json), 200  # ✅ Return cleaned JSON

    except Exception as e:
        return jsonify({"error": str(e)}), 400  # ✅ Return error response

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # ✅ Runs on port 5001
