
document.addEventListener("DOMContentLoaded", function() {
    const loadingElement = document.getElementById("loading");
    const gameElement = document.getElementById("game");
    const contadorElement = document.getElementById("contador");
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const scoreElement = document.getElementById("score-value");
    const retryButton = document.getElementById("retry");
    
  
    let score = 0;
    let questionCount = 0;
    let generatedQuestions = [];
    let incorrectAnswers = [];

    MAX_REQUESTS = 10;
  
    retryButton.addEventListener("click", function() {
      resetGame();
      startGame();
    });
  
    function resetGame() {
      score = 0;
      questionCount = 0;
      generatedQuestions = [];
      incorrectAnswers = [];
      scoreElement.textContent = score;
    }
  
    function generateQuestion() {
      if (questionCount >= 10) {
        showSummary();
        return;
      }
  
      let num1, num2;
      do {
        num1 = 10;
        num2 = Math.floor(Math.random() * 10) + 1;
      } while (generatedQuestions.includes(`${num1} x ${num2}`));
  
      generatedQuestions.push(`${num1} x ${num2}`);
  
      const answer = num1 * num2;

      contadorElement.textContent = `Domanda ${questionCount + 1} su ${MAX_REQUESTS}`;
  
      questionElement.textContent = `${num1} x ${num2}?`;
  
      optionsElement.innerHTML = "";
  
      // Genera opzioni casuali
      const options = [];
      options.push(answer); // La risposta corretta è sempre inclusa tra le opzioni
      while (options.length < 4) {
        const option = Math.floor(Math.random() * 60) + 1; // Genera un'altra opzione casuale
        if (!options.includes(option)) {
          options.push(option);
        }
      }
  
      // Mescola le opzioni in modo casuale
      options.sort(() => Math.random() - 0.5);
  
      // Aggiungi le opzioni alla pagina
      options.forEach(option => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => {
          if (option === answer) {
            score += 10;
            scoreElement.textContent = score;
            optionElement.style.backgroundColor = "green"; // Colora l'opzione corretta di verde
          } else {
            optionElement.style.backgroundColor = "red"; // Colora l'opzione sbagliata di rosso
            incorrectAnswers.push({ operation: `${num1} x ${num2}`, incorrect: option, correct: answer });
          }
          questionCount++;
          setTimeout(generateQuestion, 1000); // Attendiamo 1 secondo prima di passare alla prossima domanda
        });
        optionsElement.appendChild(optionElement);
      });
    }
  
    function showSummary() {
      questionElement.textContent = "Riepilogo";
      optionsElement.innerHTML = "";
      optionsElement.style.textAlign = "center";
      optionsElement.style.marginBottom = "15px";
  
      if (incorrectAnswers.length > 0) {
        incorrectAnswers.forEach(wrongAnswer => {
          const userAnswer = document.createElement("div");
          userAnswer.textContent = `${wrongAnswer.operation}, Hai risposto: ${wrongAnswer.incorrect} (Risposta corretta: ${wrongAnswer.correct})`;
          userAnswer.style.color = "yellow";
          userAnswer.style.padding ="0 15px";
          optionsElement.appendChild(userAnswer);
        });
      } else {
        const congratsMessage = document.createElement("div");
        congratsMessage.textContent = `Eccellente !!! Hai finito tutte le tabelline`;
        congratsMessage.style.color = "yellow";
        congratsMessage.style.fontSize = "20px";
        congratsMessage.style.marginBottom ="20px"
        congratsMessage.style.padding = "0 20px";
        optionsElement.appendChild(congratsMessage);
      }
      retryButton.style.display = "block"; // Mostra il bottone "Riprova"
      
    }
  
    function startGame() {
      loadingElement.textContent = "Pronto?";
      loadingElement.style.color = "yellow";
     
     
      setTimeout(function() {
          animateNumber("3");
      }, 1000);
      setTimeout(function() {
          animateNumber("2");
      }, 2000);
      setTimeout(function() {
          animateNumber("1");
      }, 3000);
      setTimeout(function() {
        animateNumber("Vai!!");
    }, 4000);
      setTimeout(function() {
          loadingElement.style.display = "none";
          gameElement.style.display = "block";
          generateQuestion();
      }, 5000);
  }
  
  function animateNumber(number) {
      // Creazione di un elemento span per il numero e aggiunta al DOM
      const numberSpan = document.createElement("span");
      numberSpan.textContent = number;
      loadingElement.innerHTML = "";
      loadingElement.appendChild(numberSpan);
      
      // Aggiunta della classe CSS per l'animazione
      numberSpan.classList.add("animate-number");
      
      // Rimozione dell'elemento dopo l'animazione
      setTimeout(function() {
          numberSpan.remove();
      }, 1000);
  }
  
      startGame();
   
   
  });
  
