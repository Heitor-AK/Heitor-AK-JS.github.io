const container = document.querySelector("#container-pokemons");

for (let i = 1; i <= 1300; i++) { // limitar para 30 para testes
  const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  fetch(url)
    .then(res => res.json())
    .then(pokemon => {
      const card = document.createElement("div");
      card.className = "pokemon-card";

      card.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h2>${pokemon.name.toUpperCase()}</h2>
        <ul class="status">
          ${pokemon.stats.map(stat => `
            <li><strong>${stat.stat.name}:</strong> ${stat.base_stat}</li>
          `).join('')}
        </ul>
      `;

      container.appendChild(card);
    })
    .catch(err => {
      console.log("Erro ao buscar Pokémon:", err);
    });
}
