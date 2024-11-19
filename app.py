from flask import Flask, send_from_directory

app = Flask(__name__)


# Rota para servir o HTML
@app.route('/')
def index():
    return send_from_directory('templates', 'index.html')


# Rota para servir arquivos JSON da pasta 'pratos'
@app.route('/pratos/<filename>')
def serve_json(filename):
    return send_from_directory('pratos', filename)


# Rota para servir arquivos estáticos (JS, CSS, imagens, etc.)
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)


if __name__ == '__main__':
    app.run(debug=True)
