const button = document.getElementById(`card__get-phrase-button`);
const adviceID = document.getElementById(`card__advice-id`);
const adviceText = document.getElementById(`card__advice-text`);

async function getPhrase() {

  const resposta = await fetch(`https://api.adviceslip.com/advice`);

  if (!resposta.ok) {
    throw new Error(`Erro na rede! Status: ${resposta.status}`);
  }

  const conselho = await resposta.json();
  const {slip: {id, advice}} = conselho;

  return {id, advice};

}

button.addEventListener(`click`, async () => {

  try {
    const {id, advice} = await getPhrase();

    adviceID.innerText = `${id}`;
    adviceText.innerText = `“${advice}”`;

  } catch (error){

    console.error(`Ocorreu um erro ao buscar o conselho.`, error);
    adviceID.innerText = `NaN`;
    adviceText.innerText = `No advice in this moment.`;

  }
});