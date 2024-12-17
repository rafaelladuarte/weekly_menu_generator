let pratosPrincipais = [];
let guarnicoes = [];
let saladas = [];
let pratosRapidos = [];

async function carregarJSONs() {
    try {
        const pratosResponse = await fetch('pratos/pratosPrincipais.json');
        const rapidosResponse = await fetch('pratos/pratosRapidos.json');
        const guarnicoesResponse = await fetch('pratos/guarnicoes.json');
        const saladasResponse = await fetch('pratos/saladas.json');
        
        const rapidosData = await rapidosResponse.json();
        const pratosData = await pratosResponse.json();
        const guarnicoesData = await guarnicoesResponse.json();
        const saladasData = await saladasResponse.json();

        pratosRapidos = rapidosData.pratos_rapidos || [];
        pratosPrincipais = pratosData.pratos_principais || [];
        guarnicoes = guarnicoesData.guarnicoes || [];
        saladas = saladasData.saladas || [];

    } catch (error) {
        console.error("Erro ao carregar os JSONs:", error);
    }
}

async function gerarCardapio() {
    if (!pratosPrincipais || !guarnicoes || !saladas || !pratosRapidos) {
        await carregarJSONs();
    }

    hideReceitas()

    if (
        !Array.isArray(pratosPrincipais) || !Array.isArray(guarnicoes) ||
        !Array.isArray(saladas) || !Array.isArray(pratosRapidos)
    ) {
        alert("Erro ao carregar dados para gerar o cardápio.");
        return;
    }

    const tipoRefeicao = document.getElementById("tipoRefeicao").value;

    resultadoCompleto.style.display = "none";
    resultadoRapido.style.display = "none";

    if (tipoRefeicao === "completo") {
        const pratoAleatorio = pratosPrincipais[Math.floor(Math.random() * pratosPrincipais.length)];
        const guarnicaoAleatoria = guarnicoes[Math.floor(Math.random() * guarnicoes.length)];
        const saladaAleatoria = saladas[Math.floor(Math.random() * saladas.length)];
        
        pratoPrincipal.innerText = pratoAleatorio.nome;
        guarnicao.innerText = guarnicaoAleatoria.nome;
        salada.innerText = saladaAleatoria.nome;
        
        verificadoCompleto.innerHTML = pratoAleatorio.verificado ? 'Verificado' : 'Não Verificado'
        verificadoCompleto.style.color = pratoAleatorio.verificado ? 'green' : 'red'

        let topicoPrato = ''
        itensPratoPrincipal.innerHTML = ''

        for (let ingrediente in pratoAleatorio.ingredientes) {
            const itemPrato = ingrediente
            const quantidadePrato = pratoAleatorio.ingredientes[ingrediente]

            topicoPrato += `<li> ${itemPrato}: ${quantidadePrato} </li>`
          }

        itensPratoPrincipal.innerHTML = topicoPrato 

        let etapaPrato = ''
        listaPratoPrincipal.innerHTML = ''

        for (let i = 0; i < pratoAleatorio.receita.length; i++) {
            const passoPrato = pratoAleatorio.receita[i];
            
            etapaPrato += `<li> ${passoPrato} </li>`
        }

        listaPratoPrincipal.innerHTML = etapaPrato

        let topicoGuarnicao= ''
        itensGuarnicao.innerHTML = ''

        for (let ingrediente in guarnicaoAleatoria.ingredientes) {
            const itemGuarnicao = ingrediente
            const quantidadeGuarnicao = guarnicaoAleatoria.ingredientes[ingrediente]

            topicoGuarnicao += `<li> ${itemGuarnicao}: ${quantidadeGuarnicao} </li>`
          }

        itensGuarnicao.innerHTML = topicoGuarnicao

        let etapaGuarnicao = ''
        listaGuarnicao.innerHTML = ''

        for (let i = 0; i < guarnicaoAleatoria.receita.length; i++) {
            const passoGuarnicao = guarnicaoAleatoria.receita[i];
            
            etapaGuarnicao += `<li> ${passoGuarnicao} </li>`
        }

        listaGuarnicao.innerHTML = etapaGuarnicao

        resultadoCompleto.style.display = "inline-block";

        
    } else if (tipoRefeicao === "rapido") {

        const pratoRapidoAleatorio = pratosRapidos[Math.floor(Math.random() * pratosRapidos.length)];

        pratoRapido.innerText = pratoRapidoAleatorio.nome;

        verificadoRapido.innerHTML = pratoRapidoAleatorio.verificado ? 'Verificado' : 'Não Verificado'
        verificadoRapido.style.color = pratoRapidoAleatorio.verificado ? 'green' : 'red'

        let etapa = ''
        listaRapido.innerHTML = ''

        for (let i = 0; i < pratoRapidoAleatorio.receita.length; i++) {
            const passo = pratoRapidoAleatorio.receita[i];
            
            etapa += `<li> ${passo} </li>`
        }

        listaRapido.innerHTML = etapa

        let topico = ''
        itensRapido.innerHTML = ''

        for (let ingrediente in pratoRapidoAleatorio.ingredientes) {
            const item = ingrediente
            const quantidade = pratoRapidoAleatorio.ingredientes[ingrediente]

            topico += `<li> ${item}: ${quantidade} </li>`
          }

        itensRapido.innerHTML = topico
        resultadoRapido.style.display = "inline-block";
    }
}

function verReceita(tipoReceita){
    receitaPratoPrincipal.style.display = "none";
    receitaGuarnicao.style.display = "none";
    receitaRapido.style.display = "none";

    document.getElementById("receita" + tipoReceita).style.display = 'inline-block'

}

function verIngredientes(tipoReceita){
    ingredientesPratoPrincipal.style.display = "none";
    ingredientesGuarnicao.style.display = "none";
    ingredientesRapido.style.display = "none";

    document.getElementById("ingredientes" + tipoReceita).style.display = 'inline-block'
}

function hideReceitas(){
    receitaPratoPrincipal.style.display = "none";
    receitaGuarnicao.style.display = "none";
    receitaRapido.style.display = "none";
}

function hideResulto(){
    resultadoCompleto.style.display = 'none'
    resultadoRapido.style.display = 'none'
}

// Chama a função para carregar os JSONs assim que a página carregar
window.onload = carregarJSONs;
