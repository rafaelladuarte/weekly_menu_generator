let pratosPrincipais = [];
let guarnicoes = [];
let saladas = [];

// Função para carregar os JSONs
async function carregarJSONs() {
    try {
        // Carregando os dados dos arquivos JSON da pasta 'pratos'
        const pratosResponse = await fetch('pratos/pratosPrincipais.json');
        const guarnicoesResponse = await fetch('pratos/guarnicoes.json');
        const saladasResponse = await fetch('pratos/saladas.json');
        
        // Convertendo os JSONs para objetos JavaScript
        const pratosData = await pratosResponse.json();
        const guarnicoesData = await guarnicoesResponse.json();
        const saladasData = await saladasResponse.json();

        // Atribuindo os dados aos arrays
        pratosPrincipais = pratosData.pratos_principais;
        guarnicoes = guarnicoesData.guarnicoes;
        saladas = saladasData.saladas;

    } catch (error) {
        console.error("Erro ao carregar os JSONs:", error);
    }
}

// Função para gerar cardápio aleatório
async function gerarCardapio() {
    if (pratosPrincipais.length === 0 || guarnicoes.length === 0 || saladas.length === 0) {
        // Espera o carregamento dos JSONs se ainda não estiverem carregados
        await carregarJSONs();
    }

    const pratoAleatorio = pratosPrincipais[Math.floor(Math.random() * pratosPrincipais.length)];
    const guarnicaoAleatoria = guarnicoes[Math.floor(Math.random() * guarnicoes.length)];
    const saladaAleatoria = saladas[Math.floor(Math.random() * saladas.length)];

    document.getElementById("prato-principal").innerText = pratoAleatorio.nome;
    document.getElementById("guarnicao").innerText = guarnicaoAleatoria.nome;
    document.getElementById("salada").innerText = saladaAleatoria.nome;

    document.getElementById("resultado").style.display = "block";
}

// Chama a função para carregar os JSONs assim que a página carregar
window.onload = carregarJSONs;
