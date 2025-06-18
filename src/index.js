const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

// Função para calcular o resultado da partida
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco sorteado: ${block}`);

    // rolar dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
      

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );
      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );
      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }

    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER; // Corrigido: era character1.PODER

      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
      );
      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
      );

      if(powerResult1 > powerResult2) {
        if(character2.PONTOS > 0) {
          character2.PONTOS--;
          console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu um ponto! 🐢`);
        } else {
          console.log(`${character1.NOME} venceu o confronto, mas ${character2.NOME} não tinha pontos para perder! 😅`);
        }
      } else if(powerResult2 > powerResult1) {
        if(character1.PONTOS > 0) {
          character1.PONTOS--;
          console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu um ponto! 🍌`);
        } else {
          console.log(`${character2.NOME} venceu o confronto, mas ${character1.NOME} não tinha pontos para perder! 😅`);
        }
      } else {
        console.log("Empate no confronto! Nenhum personagem perdeu pontos. 🤝");
      }

      // Atualiza os totalTestSkill para o sistema de pontuação normal
      totalTestSkill1 = powerResult1;
      totalTestSkill2 = powerResult2;
    }

    if (totalTestSkill1 > totalTestSkill2) {
      // quem marcou ponto
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }

    // exibe total de pontos de cada jogador até agora
    console.log(
      `${character1.NOME} tem ${character1.PONTOS} pontos. ${character2.NOME} tem ${character2.PONTOS} pontos.`
    );

    console.log("--------------------------");
  }
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
      break;
  }

  return result;
}

async function declareWinner(character1, character2) {
  console.log(`🏆 Fim da corrida! 🏆`);
  console.log(`${character1.NOME} tem ${character1.PONTOS} pontos.`);
  console.log(`${character2.NOME} tem ${character2.PONTOS} pontos.`);

  if(character1.PONTOS > character2.PONTOS) 
    console.log(`\n${character1.NOME} é o grande vencedor! 🎉`);
  else if(character2.PONTOS > character1.PONTOS) 
    console.log(`\n${character2.NOME} é o grande vencedor! 🎉`);
  else 
    console.log(`\nA corrida terminou em empate! 🤝`);

  console.log("Obrigado por jogar! Até a próxima! 👋");
}

(async function main() {
  console.log(
    `🏁 🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
  );
  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
