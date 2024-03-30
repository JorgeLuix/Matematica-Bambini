// selezioniamo l'elemento input per il nome
const nameInput = document.getElementById('name');

// selezioniamo l'elemento del link di inizio gioco
const startGameLink = document.querySelector('a[href="/ContenutoGame/game.html"]');

// aggiungiamo un event listener per l'evento click sul link di inizio gioco
startGameLink.addEventListener('click', function(event) {
  // previene il comportamento predefinito del link di aprire una nuova pagina
  event.preventDefault();

  // memorizza il nome dell'utente nella sessionStorage
  sessionStorage.setItem('userName', nameInput.value);

  // reindirizza l'utente alla pagina del gioco
  window.location.href = startGameLink.getAttribute('href');
});

// nella pagina successiva, selezioniamo l'elemento per mostrare il nome dell'utente
const userNameElement = document.getElementById('user-name');

// recuperiamo il nome dell'utente dalla sessionStorage
const userName = sessionStorage.getItem('userName');

// verifichiamo se il nome dell'utente esiste e lo mostriamo nella pagina
if (userName) {
  userNameElement.textContent = 'Benvenuto, ' + userName + '!';
} else {
  userNameElement.textContent = 'Benvenuto!';
}
