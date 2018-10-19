var massaDeDados = gerarDadosDeTeste();
var dadosDeVenda = 0;

massaDeDados.categorias.forEach(function(item){
	$('#categorias').append('<option value=' + item.id + '>' + item.nome + '</option>');
});

var idCategoriaSelecionada = $('#categorias option:selected').val();
console.log(idCategoriaSelecionada);
var categoria = buscaCategoriaPorId(parseInt(idCategoriaSelecionada), massaDeDados.categorias);
dadosDeVenda = categoria.numeroDeVendas;

$('body').on('change', '#categorias', function(){
	var idCategoria = $(this).val();
	$('#produtos').empty();
	massaDeDados.produtos.forEach(function(item){
		if(item.categoria.id == idCategoria){
			$('#produtos').append('<option value=' + item.id + '>' + item.nome + '</option>');
		}
	});
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
});

var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["January", "February", "March", "April"],
        datasets: [{
            label: 'Vendas',
            data: [dadosDeVenda, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
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

	var QUANTIDADE_DE_PRODUTOS_POR_CATEGORIA = 4;
	var QUANTIDADE_DE_MARCAS_POR_PRODUTO = 2;

	for(i = 0; i < categorias.length; i++){
		for(j = 0; j < QUANTIDADE_DE_PRODUTOS_POR_CATEGORIA; j++){
			var produto = new Object();
			produto.id = j + 1;
			produto.nome = 'Produto' + (j + 1) + 'daCategoria' + categorias[i].nome;
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

function buscaCategoriaPorId(id, categorias){
	categorias.forEach(function(item){
		if(item.id == id){
			return item;
		}
	});
}