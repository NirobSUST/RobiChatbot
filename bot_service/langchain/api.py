from flask import Flask, request, jsonify
import langchain_business
import config
app = Flask(__name__)
conversational_agent = None


def generate_text(prompt, conversational_agent):
    output = langchain_business.run(prompt, conversational_agent)
    text = output
    return text

@app.route("/generate", methods=["POST"])
def generate_endpoint():
    prompt = request.json.get("prompt", "")
    generated_text = generate_text(prompt, conversational_agent)
    x= jsonify({"generated_text": generated_text})
    return jsonify({"generated_text": generated_text})

if __name__ == "__main__":
    conversational_agent = langchain_business.initiation()
    app.run(debug=True, host=config.host, port=config.port)
