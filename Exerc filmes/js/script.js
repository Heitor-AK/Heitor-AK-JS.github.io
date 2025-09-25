document.addEventListener('DOMContentLoaded', function() {
    const catalogo = document.getElementById('catalogo');
    
    // Função para carregar os filmes
    async function carregarFilmes() {
        try {
            const response = await fetch('https://rafaelescalfoni.github.io/desenv_web/filmes.json');
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados dos filmes');
            }
            const filmes = await response.json();
            console.log('Dados dos filmes carregados:', filmes);
            preencherCatalogo(filmes);
        } catch (error) {
            console.error('Erro:', error);
            catalogo.innerHTML = '<p class="erro">Não foi possível carregar os filmes. Tente novamente mais tarde.</p>';
        }
    }
    
    // Função para preencher o catálogo
    function preencherCatalogo(filmes) {
        catalogo.innerHTML = '';
        
        filmes.forEach(filme => {
            const filmeCard = document.createElement('div');
            filmeCard.className = 'filme-card';
            
            // Determinar a classe da faixa etária
            let faixaEtariaClass = '';
            if (filme.classificacao <= 14) {
                faixaEtariaClass = 'faixa-verde';
            } else if (filme.classificacao <= 18) {
                faixaEtariaClass = 'faixa-amarela';
            } else {
                faixaEtariaClass = 'faixa-vermelha';
            }
            
            // Criar estrelas de avaliação
            const ratingStars = criarEstrelas(filme.avaliacao);
            
            // Criar o HTML do card do filme
            filmeCard.innerHTML = `
                <img src="${filme.poster}" alt="${filme.titulo}" class="filme-poster" onerror="this.src='https://via.placeholder.com/300x450?text=Poster+Não+Disponível'">
                <div class="filme-info">
                    <h2 class="filme-titulo">${filme.titulo}</h2>
                    <div class="rating">${ratingStars}</div>
                    <p class="filme-resumo">${filme.resumo}</p>
                    
                    <div class="filme-detalhes">
                        <span class="faixa-etaria ${faixaEtariaClass}">${filme.classificacao}+</span>
                    </div>
                    
                    <div class="generos">
                        ${filme.generos.map(genero => `<span class="genero">${genero}</span>`).join('')}
                    </div>
                    
                    <div class="elenco">
                        <h4>Elenco Principal</h4>
                        <div class="atores">
                            ${filme.elenco.map(ator => `<span class="ator">${ator}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="opinioes">
                        <h4>Opiniões</h4>
                        ${filme.opinioes.map(opiniao => `
                            <div class="opiniao">
                                <p><strong>${opiniao.autor}</strong>: ${opiniao.comentario}</p>
                                <div class="rating">${criarEstrelas(opiniao.rating)}</div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="similares">
                        <h4>Títulos Semelhantes</h4>
                        <div class="similares-list">
                            ${filme.titulosSemelhantes.map(titulo => `<span class="similar">${titulo}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            catalogo.appendChild(filmeCard);
        });
    }
    
    // Função para criar estrelas de avaliação (Desafio 2)
    function criarEstrelas(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let starsHTML = '';
        
        // Estrelas cheias
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        
        // Meia estrela
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        
        // Estrelas vazias
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }
        
        return starsHTML;
    }
    
    // Carregar os filmes quando a página for carregada
    carregarFilmes();
});

// Verifique no console se há erros de carregamento
fetch('https://rafaelescalfoni.github.io/desenv_web/filmes.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Erro ao carregar JSON:', error));