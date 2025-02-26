from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import re
from waitress import serve  # ✅ Production-ready server

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def clean_json_string(json_str):
    """
    ✅ Cleans JSON string by removing unnecessary backticks (` ```json ... ``` `).
    ✅ Converts valid JSON string to Python dictionary.
    """
    if isinstance(json_str, str):
        json_str = re.sub(r"```json\n|\n```", "", json_str).strip()  # Remove markdown JSON block

        try:
            return json.loads(json_str)  # Convert JSON string to dictionary
        except json.JSONDecodeError:
            print("⚠️ JSONDecodeError: Could not parse result as JSON, returning raw string.")
            return json_str  # Return as-is if not valid JSON

    return json_str

def extract_data(data):
    """ ✅ Extracts nested 'data' fields until we reach the actual content """
    while isinstance(data, dict) and "data" in data:
        data = data["data"]  # ✅ Keep unwrapping until we reach actual content
    return data

def process_json(data):
    """ ✅ Processes the input JSON to extract and clean the 'result' field """
    
    print("📥 Raw JSON Data:", json.dumps(data, indent=4))  # ✅ Debugging input data
    
    data = extract_data(data)  # ✅ Unwrap nested 'data'

    cleaned_result = clean_json_string(data.get("result", ""))

    # ✅ Process 'task_output' if it exists
    task_output = data.get("task_output", [])
    if isinstance(task_output, list):
        for task in task_output:
            if isinstance(task.get("result"), str):
                task["result"] = clean_json_string(task["result"])

    cleaned_data = {
        "name": data.get("name", "Unknown Task"),
        "result": cleaned_result,  # ✅ Cleaned main 'result' field
        "task_output": task_output  # ✅ Cleaned 'task_output' results
    }

    print("📤 Processed JSON Output:", json.dumps(cleaned_data, indent=4))  # ✅ Debugging output data
    
    return cleaned_data

@app.route('/convert', methods=['POST'])
def convert():
    """ ✅ API Endpoint to clean and return readable JSON """
    try:
        data = request.get_json()
        print("📥 Received Data:", json.dumps(data, indent=4))  # ✅ Debugging input data

        if not data:
            print("⚠️ No JSON data received")
            return jsonify({"error": "No JSON data received"}), 400

        processed_json = process_json(data)
        return jsonify(processed_json), 200  # ✅ Return cleaned JSON

    except Exception as e:
        print("❌ Server Error:", str(e))
        return jsonify({"error": str(e)}), 400  # ✅ Return error response

if __name__ == '__main__':
    print("🚀 Starting Flask Server on Port 5001...")  # ✅ Startup Debug Message
    print("✅ Server running rjtnfdjngjnflgndfljk at: http://127.0.0.1:5001/convert")  # ✅ Confirming API Endpoint
    serve(app, host="0.0.0.0", port=5001)  # ✅ Use Waitress for production
