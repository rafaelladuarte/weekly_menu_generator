// Função para carregar dados de um arquivo JSON
function carregarDados(url) {
    return fetch(`/pratos/${url}`)
        .then(response => response.json())
        .catch(error => console.error('Erro ao carregar os dados:', error));
}

// Carregar os dados dos arquivos JSON
Promise.all([
    carregarDados('pratosPrincipais.json'),
    carregarDados('guarnicoes.json'),
    carregarDados('saladas.json')
])
.then(([pratosPrincipais, guarnicoes, saladas]) => {
    // Adiciona evento de clique no botão para gerar uma nova combinação
    document.getElementById('gerarBtn').addEventListener('click', () => {
        gerarCombinacao(pratosPrincipais, guarnicoes, saladas);
    });
})
.catch(error => console.error('Erro ao carregar os arquivos JSON:', error));
