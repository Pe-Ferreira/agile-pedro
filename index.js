var massaDeDados = gerarDadosDeTeste();

massaDeDados.categorias.forEach(function(item){
	$('#categorias').append('<option value=' + item.id + '>' + item.nome + '</option>');
});

var idCategoriaSelecionada = $('#categorias option:selected').val();
var categoria = buscaObjetoPorId(parseInt(idCategoriaSelecionada), massaDeDados.categorias);
var grafico = gerarGrafico(categoria.numeroDeVendas);

$('body').on('change', '#categorias', function(){
	var idCategoria = $(this).val();
	$('#produtos').empty();
	massaDeDados.produtos.forEach(function(item){
		if(item.categoria.id == idCategoria){
			$('#produtos').append('<option value=' + item.id + '>' + item.nome + '</option>');
		}
	});
	var idCategoriaSelecionada = $('#categorias option:selected').val();
	var categoria = buscaObjetoPorId(parseInt(idCategoriaSelecionada), massaDeDados.categorias);
	grafico.data.datasets.data = [categoria.numeroDeVendas/2, categoria.numeroDeVendas/4, categoria.numeroDeVendas/8, categoria.numeroDeVendas/16];
	grafico.update();
	$('#marcas').empty();
});

$('body').on('change', '#produtos', function(){
	var idProduto = $(this).val();
	$('#marcas').empty();
	massaDeDados.marcas.forEach(function(item){
		if(item.produto.id == idProduto){
			$('#marcas').append('<option value=' + item.id + '>' + item.nome + '</option>');
		}
	});
	var idProdutoSelecionada = $('#produtos option:selected').val();
	var produto = buscaObjetoPorId(parseInt(idProdutoSelecionada), massaDeDados.produtos);
	grafico.data.datasets.data = [produto.numeroDeVendas/2, produto.numeroDeVendas/4, produto.numeroDeVendas/8, produto.numeroDeVendas/16];
	grafico.update();
});

$('body').on('change', '#marcas', function(){
	var idMarcaSelecionada = $('#marcas option:selected').val();
	var marca = buscaObjetoPorId(parseInt(idMarcaSelecionada), massaDeDados.marcas);
	grafico.data.datasets.data = [marca.numeroDeVendas/2, marca.numeroDeVendas/4, marca.numeroDeVendas/8, marca.numeroDeVendas/16];
	grafico.update();
});

function gerarGrafico(dadosDeVenda){
	var ctx = document.getElementById("myChart").getContext('2d');
	var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["January", "February", "March", "April"],
        datasets: [{
            label: 'Vendas',
            data: [dadosDeVenda/2, dadosDeVenda/4, dadosDeVenda/8, dadosDeVenda/16],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
	});
	return myChart;
}

function gerarDadosDeTeste(){
	var categoria1 = new Object();
	categoria1.id = 1;
	categoria1.nome = 'Comida';
	categoria1.numeroDeVendas = Math.floor(Math.random() * 1000);
	
	var categoria2 = new Object();
	categoria2.id = 2;
	categoria2.nome = 'Bebida';
	categoria2.numeroDeVendas = Math.floor(Math.random() * 1000);
	
	var categoria3 = new Object();
	categoria3.id = 3;
	categoria3.nome = 'Vestuário';
	categoria3.numeroDeVendas = Math.floor(Math.random() * 1000);
	
	var categorias = [categoria1, categoria2, categoria3];
	var produtos = [];
	var marcas = [];

	var QUANTIDADE_DE_PRODUTOS_POR_CATEGORIA = 3;
	var QUANTIDADE_DE_MARCAS_POR_PRODUTO = 2;

	for(i = 0; i < categorias.length; i++){
		for(j = 0; j < QUANTIDADE_DE_PRODUTOS_POR_CATEGORIA; j++){
			var produto = new Object();
			produto.id = j + 1;
			produto.nome = 'Produto' + (j + 1) + 'daCat' + categorias[i].nome;
			produto.numeroDeVendas = Math.floor(Math.random() * 300);
			produto.categoria = categorias[i];
			produtos.push(produto);
			for(l = 0; l < QUANTIDADE_DE_MARCAS_POR_PRODUTO; l++){
				var marca = new Object();
				marca.id = l + 1;
				marca.nome = 'Marca' + (l + 1) + 'do' + produtos[j].nome;
				marca.numeroDeVendas = Math.floor(Math.random() * 150);
				marca.produto = produtos[j];
				marcas.push(marca);
			}
		}
	}

	var massaDeDados = new Object();
	massaDeDados.categorias = categorias;
	massaDeDados.produtos = produtos;
	massaDeDados.marcas = marcas;
	
	return massaDeDados;
}

function buscaObjetoPorId(id, arrayDeObjetos){
	for(i = 0; i < arrayDeObjetos.length; i++){
		if(arrayDeObjetos[i].id === id){
			return arrayDeObjetos[i];
		}
	}
}