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

// Funzione per generare un numero casuale compreso tra 1 e 10 per la divisione
function getRandomOperation() {
    const num1 = Math.floor(Math.random() * 100) + 1;
    let num2;
    do {
        num2 = Math.floor(Math.random() * 100) + 1;
    } while (num1 % num2 !== 0 || num2 === 1); // Assicura che il divisore sia diverso da 1 e che la divisione produca un risultato intero
    return `${num1} ÷ ${num2}`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// Genera le richieste di divisione
for (let i = 0; i < MAX_REQUESTS; i++) {
    let request;
    let result;

    do {
        request = getRandomOperation();
        const [num1, , num2] = request.split(' ');
        result = Math.floor(num1 / num2); // Calcola il risultato dell'operazione
    } while (result < 1 || result > 100); // Assicura che il risultato sia un numero intero compreso tra 1 e 100

    // Genera un array con le risposte possibili, includendo sempre il risultato
    let choicesArray = [result];
    for (let j = 0; j < 3; j++) {
        let choice;
        do {
            choice = Math.floor(Math.random() * 100) + 1; // Genera numeri casuali tra 1 e 100 per le risposte sbagliate
        } while (choicesArray.includes(choice));
        choicesArray.push(choice);
    };
    
    // Mescola le scelte in modo casuale
    choicesArray = shuffleArray(choicesArray);
    
    // Aggiunge la richiesta alla lista delle richieste disponibili
    availableRequests.push({
        request: request,
        choice1: choicesArray[0].toString(),
        choice2: choicesArray[1].toString(),
        choice3: choicesArray[2].toString(),
        choice4: choicesArray[3].toString(),
        answer: choicesArray.indexOf(result) + 1, // Indice della risposta corretta nelle scelte (1-based)
    });
}
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
