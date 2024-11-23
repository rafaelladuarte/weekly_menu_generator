let pratosPrincipais = [];
let guarnicoes = [];
let saladas = [];
let pratosRapidos = [];

// Função para carregar os JSONs
async function carregarJSONs() {
    try {
        // Carregando os dados dos arquivos JSON da pasta 'pratos'
        const pratosResponse = await fetch('pratos/pratosPrincipais.json');
        const rapidosResponse = await fetch('pratos/pratosRapidos.json');
        const guarnicoesResponse = await fetch('pratos/guarnicoes.json');
        const saladasResponse = await fetch('pratos/saladas.json');
        
        // Convertendo os JSONs para objetos JavaScript
        const rapidosData = await rapidosResponse.json();
        const pratosData = await pratosResponse.json();
        const guarnicoesData = await guarnicoesResponse.json();
        const saladasData = await saladasResponse.json();

        // Atribuindo os dados aos arrays
        pratosRapidos = rapidosData.pratos_rapidos || [];
        pratosPrincipais = pratosData.pratos_principais || [];
        guarnicoes = guarnicoesData.guarnicoes || [];
        saladas = saladasData.saladas || [];

    } catch (error) {
        console.error("Erro ao carregar os JSONs:", error);
    }
}

// Função para gerar cardápio aleatório
async function gerarCardapio() {
    // Verifique se os JSONs foram carregados corretamente antes de tentar acessar os dados
    if (!pratosPrincipais || !guarnicoes || !saladas || !pratosRapidos) {
        await carregarJSONs();
    }

    // Certifique-se de que os arrays estão corretamente carregados
    if (
        !Array.isArray(pratosPrincipais) || !Array.isArray(guarnicoes) ||
        !Array.isArray(saladas) || !Array.isArray(pratosRapidos)
    ) {
        alert("Erro ao carregar dados para gerar o cardápio.");
        return;
    }


    // Obtendo o tipo de refeição selecionado
    const tipoRefeicao = document.getElementById("tipoRefeicao").value;

    // Reseta as exibições
    document.getElementById("resultado-completo").style.display = "none";
    document.getElementById("resultado-rapido").style.display = "none";

    if (tipoRefeicao === "completo") {
        // Gerar refeição completa (prato principal, guarnição e salada)
        const pratoAleatorio = pratosPrincipais[Math.floor(Math.random() * pratosPrincipais.length)];
        const guarnicaoAleatoria = guarnicoes[Math.floor(Math.random() * guarnicoes.length)];
        const saladaAleatoria = saladas[Math.floor(Math.random() * saladas.length)];

        document.getElementById("prato-principal").innerText = pratoAleatorio.nome;
        document.getElementById("guarnicao").innerText = guarnicaoAleatoria.nome;
        document.getElementById("salada").innerText = saladaAleatoria.nome;

        // Exibe a seção de pratos completos
        document.getElementById("resultado-completo").style.display = "inline-block";
    } else if (tipoRefeicao === "rapido") {
        // Gerar refeição rápida (prato rápido)
        const pratoRapidoAleatorio = pratosRapidos[Math.floor(Math.random() * pratosRapidos.length)];

        document.getElementById("prato-rapido").innerText = pratoRapidoAleatorio.nome;

        // Exibe a seção de pratos rápidos
        document.getElementById("resultado-rapido").style.display = "inline-block";
    }
}

// Chama a função para carregar os JSONs assim que a página carregar
window.onload = carregarJSONs;
