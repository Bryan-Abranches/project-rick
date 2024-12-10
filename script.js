// Elementos DOM
const characterId = document.getElementById("characterId");
const btnGo = document.getElementById("btn-go");
const content = document.getElementById("content");
const image = document.getElementById("img");
const name = document.getElementById("name");
const status = document.getElementById("status");
const species = document.getElementById("species");
const gender = document.getElementById("gender");
const origin = document.getElementById("origin");

// Função para gerar um número aleatório para o ID do personagem
function getRandomNumber() {
  return Math.floor(Math.random() * 826) + 1;
}

// Função que faz a requisição com a API
const fetchApi = async (value) => {
  const url = `https://rickandmortyapi.com/api/character/${value}`;
  try {
    const response = await fetch(url); // Adicionado await para garantir que a resposta seja processada corretamente
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    return null; // Retorna null em caso de erro para evitar crash
  }
};

// Chaves esperadas do objeto retornado pela API
const keys = ["name", "status", "species", "gender", "origin", "image"];

/* // Função para construir o resultado baseado nos dados retornados da API
const buildResult = (result) => {
  const newObject = {};

  keys.forEach((key) => {
    // Verifica se a chave existe no resultado antes de atribuir
    if (key === "origin") {
      newObject[key] = result[key]?.name || "Desconhecido"; // Pega o nome do objeto "origin" ou retorna "Desconhecido"
    } else {
      newObject[key] = result[key] || "Desconhecido"; // Valor padrão para evitar undefined
    }
  });
  return newObject;
}; */

// Evento de clique no botão
btnGo.addEventListener("click", async (event) => {
  event.preventDefault();

  const randomId = getRandomNumber();
  const res = await fetchApi(randomId);

  if (res) {
    // Desestrutura os dados retornados pela API
    const {
      name: characterName,
      status: characterStatus,
      species: characterSpecies,
      gender: characterGender,
      origin: { name: characterOrigin } = {},
      image: characterImage,
    } = res;

    // Atualiza os elementos DOM com os dados do personagem
    //content.textContent = JSON.stringify(characterData, null, 2); // Mostra os dados formatados como JSON

    image.src = `${characterImage}`; // Atualiza a imagem
    name.innerText = `${characterName}`; // Nome
    status.innerText = `Situação: ${characterStatus}`; // Status
    species.innerText = `Especie: ${characterSpecies}`; // Espécie
    gender.innerText = `Genero: ${characterGender}`; // Gênero
    origin.innerText = `Origem: ${characterOrigin}`; // Origem
  } else {
    // Em caso de erro na API, exibe uma mensagem de erro
    content.textContent =
      "Não foi possível buscar os dados do personagem. Tente novamente.";
  }
});
