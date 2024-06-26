
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 10

finalScore.innerText = mostRecentScore;


saveHighScores = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        
    }
    
    highScores.push(score)
    
    highScores.sort((a,b) => {
        return b.score - a.score
    })
    
    highScores.splice(5)
    
    localStorage.setItem('#highScores', JSON.stringify(highScores))
    window.location.assign('/fileHighscores/highScores.html')


};


