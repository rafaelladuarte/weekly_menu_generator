from flask import Flask, render_template
import random
import json
import os

app = Flask(__name__)


# Função para carregar os arquivos JSON da pasta 'pratos'
def carregar_dados():
    # Caminho para os arquivos JSON dentro da pasta 'pratos'
    pasta_pratos = os.path.join(os.getcwd(), 'pratos')

    # Carregar os arquivos JSON
    with open(
        os.path.join(pasta_pratos, 'pratosPrincipais.json'),
        'r', encoding='utf-8'
    ) as f:
        pratos = json.load(f)

    with open(
        os.path.join(pasta_pratos, 'guarnicoes.json'),
        'r', encoding='utf-8'
    ) as f:
        guarnicoes = json.load(f)

    with open(
        os.path.join(pasta_pratos, 'saladas.json'),
        'r', encoding='utf-8'
    ) as f:
        saladas = json.load(f)

    return pratos, guarnicoes, saladas


# Rota principal
@app.route('/')
def index():
    # Carrega os dados dos arquivos JSON
    pratos, guarnicoes, saladas = carregar_dados()

    # Seleciona aleatoriamente um prato principal, guarnição e salada
    prato_aleatorio = random.choice(pratos['pratos_principais'])
    guarnicao_aleatoria = random.choice(guarnicoes['guarnicoes'])
    salada_aleatoria = random.choice(saladas['saladas'])

    return render_template(
        'index.html',
        prato=prato_aleatorio,
        guarnicao=guarnicao_aleatoria,
        salada=salada_aleatoria)


if __name__ == '__main__':
    app.run(debug=True)
