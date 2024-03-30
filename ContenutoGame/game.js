const request = document.querySelector('#request');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentRequest = {}
let acceptingAnswers = true
let score = 0
let requestCounter = 0
let availableRequests = [] // array delle domande

const SCORE_POINTS = 10
const MAX_REQUESTS = 10

// Funzione per generare un numero casuale compreso tra 1 e 99
function getRandomNumber() {
    return Math.floor(Math.random() * 99) + 1;
}


// Funzione per mescolare un array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Genera le richieste di addizione e sottrazione
for (let i = 0; i < MAX_REQUESTS; i++) {
    let num1 = getRandomNumber();
    let num2 = getRandomNumber();
    let operation = Math.random() < 0.5 ? '+' : '-'; // Probabilità del 50% per addizione o sottrazione
    
    let result;
    if (operation === '+') {
        result = num1 + num2;
    } else {
        if (num1 < num2) {
            let temp = num1;
            num1 = num2;
            num2 = temp;
        }
        result = num1 - num2;
    }
    
    // Genera un array con le risposte possibili, includendo sempre il risultato
    let choicesArray = [result];
    for (let j = 0; j < 3; j++) {
        let choice = getRandomNumber();
        // Assicura che le scelte siano diverse dal risultato
        while (choicesArray.includes(choice)) {
            choice = getRandomNumber();
        }
        choicesArray.push(choice);
    }
    
    // Mescola le scelte in modo casuale
    choicesArray = shuffleArray(choicesArray);
    
    // Aggiunge la richiesta alla lista delle richieste disponibili
    availableRequests.push({
        request: `${num1} ${operation} ${num2}`,
        choice1: choicesArray[0].toString(),
        choice2: choicesArray[1].toString(),
        choice3: choicesArray[2].toString(),
        choice4: choicesArray[3].toString(),
        answer: choicesArray.indexOf(result) + 1, // Indice della risposta corretta nelle scelte (1-based)
    });
}

//funzione inizio gioco
startGame = () => {
    requestCounter = 0
    score = 0
    getNewRequest()
}

//funzione per selezionare una domanda dall'array.
getNewRequest = () => {
    if(availableRequests.length === 0 || requestCounter >= MAX_REQUESTS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/PageFinale/end.html')
    }

    requestCounter++
    progressText.innerText = `Domanda ${requestCounter} su ${MAX_REQUESTS}`
    progressBarFull.style.width = `${(requestCounter/MAX_REQUESTS) * 100}%`

    const requestIndex = Math.floor(Math.random() * availableRequests.length)
    currentRequest = availableRequests[requestIndex]
    request.innerText = currentRequest.request

    choices.forEach(choice => {
        let number = choice.dataset['number']
        choice.innerText = currentRequest['choice' + number]
    })

    availableRequests.splice(requestIndex, 1)
    acceptingAnswers = true
}

//funzione delle opzione di risposte
choices.forEach(choice => {
    let menssaggio = document.getElementById('message');
    
    choice.addEventListener('click', e => {
        if(!acceptingAnswers)
            return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentRequest.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply)
    
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            menssaggio.innerHTML = '';
            getNewRequest();
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()
