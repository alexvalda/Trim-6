class Game {
  constructor(contGameGame, level, prog, chor, speed, maxMilliseconds) {
    // Constructor de la clase Game
    // Configura los atributos y obtiene elementos del DOM
    this.contGame = document.getElementById(contGameGame); // Elemento contenedor del juego
    this.contCardGame; // Contenedor para las cartas del juego
    this.getServer = window.location.origin; // Obtiene la ruta del servidor
    this.folderPath = "/games_memory"; // Ruta de la carpeta del juego
    this.serverPath = this.getServer + this.folderPath; // Ruta completa del servidor
    this.uriJson = this.serverPath + "/assets/doc/User.json"; // URI del archivo JSON de datos
    this.pathImg = this.serverPath + "/assets/img/memory/"; // Ruta de las imágenes del juego
    this.pathImgDafault = this.serverPath + "/assets/img/memory/img_default.png"; // Ruta de la imagen por defecto
    this.longBootstrap = 12 / level; // Ancho de las cartas basado en el nivel
    this.newArrayGames = []; // Array para almacenar datos del JSON
    this.arrayGamesCard = []; // Array para almacenar las cartas del juego
    this.getDataJson(); // Método para obtener datos y comenzar el juego
    this.num = level; // Número de niveles del juego
    this.max = 19; // Valor máximo permitido
    this.min = 0; // Valor mínimo permitido
    this.maxCard = (this.num * this.num) / 2; // Número máximo de cartas
    this.flippedCards = []; // Array para almacenar cartas volteadas
    this.lockBoard = false; // Control de bloqueo de interacción con las cartas
    this.matchedPairs = 0; // Contador de pares coincidentes encontrados
    this.progressCont = document.getElementById(prog); // Elemento de la barra de progreso
    this.chronometer = new Chronometer(chor, speed, maxMilliseconds); // Cronómetro
  }

  // Método para obtener datos del archivo JSON
  getDataJson() {
    fetch(this.uriJson)
      .then(response => response.json())
      .then(data => {
        this.setElements(data); // Configura los elementos del juego con los datos obtenidos
        this.chronometer.startChronometer(); // Inicia el cronómetro después de cargar los datos
      });
  }

  // Método para generar un array aleatorio de números únicos
  getRandomArray(min, max, count) {
    let contentGame = [];
    let contentNum = [];
    if (min > max || count > max - min) {
      return false;
    }
    while (contentGame.length < count) {
      var num = Math.floor((Math.random() * (max - min)) + min);
      if (!contentNum.includes(num)) {
        contentGame.push(this.newArrayGames[num]);
        contentNum.push(num);
      }
    }
    this.arrayGamesCard = contentGame.concat(contentGame);
    return this.setShuffleArray(this.arrayGamesCard);
  }

  // Método para barajar un array
  setShuffleArray(dataArrar) {
    return dataArrar.sort(() => Math.random() - 0.5);
  }

  // Método para configurar los elementos del juego
  setElements(arraJson) {
    let cards = "";
    let cardsAux = "";
    let cont = 0;
    let row = this.num - 1;
    this.contGame.innerHTML = ""; // Limpia el contenedor del juego
    this.newArrayGames = arraJson; // Almacena los datos obtenidos del JSON
    const getNewArray = this.getRandomArray(this.min, this.max, this.maxCard); // Obtiene un nuevo array aleatorio de cartas

    // Genera las tarjetas del juego
    for (let i = 0; i < getNewArray.length; i++) {
      cardsAux += '<div class="col-' + this.longBootstrap + ' pt-2 mx-auto contCard" disabled><div class="card" ><img data-src="' + this.pathImg + getNewArray[i].img + '" src="' + this.pathImgDafault + '" class="card-img-top" alt="..."> <div class="card-body"><h5 class="card-title">' + getNewArray[i].nombre + '</h5><p class="card-text">' + getNewArray[i].valor + '</p></div></div></div>';
      cont++;
      if (row == cont - 1) {
        cards += '<div class="row">' + cardsAux + '</div>';
        cont = 0;
        cardsAux = "";
      }
    }
    this.contGame.innerHTML = cards; // Agrega las tarjetas al contenedor del juego
    this.showFrontSide(); // Muestra la parte frontal de las tarjetas
  }

  // Método para mostrar la parte frontal de las cartas
  showFrontSide() {
    this.contCardGame = document.querySelectorAll('.contCard'); // Obtiene todas las tarjetas del juego
    var pathDefault = this.pathImgDafault; // Ruta de la imagen por defecto
    for (let i = 0; i < this.contCardGame.length; i++) {
      const objImg = this.contCardGame[i].querySelector('img');
      const cardIndex = i;
      const cardTitle = this.contCardGame[i].querySelector('.card-title');
      const cardText = this.contCardGame[i].querySelector('.card-text');
      objImg.src = objImg.dataset.src;
      objImg.setAttribute('data-flipped', 'true');
      cardTitle.style.visibility = 'visible';
      cardText.style.visibility = 'visible';
      setTimeout(() => {
        objImg.src = pathDefault;
        objImg.removeAttribute('data-flipped');
        cardTitle.style.visibility = 'hidden';
        cardText.style.visibility = 'hidden';
        this.enableClick();
      }, 10000); // Muestra las tarjetas durante 10 segundos antes de voltearlas
    }
  }

  // Método para habilitar la funcionalidad de hacer clic en las cartas
  enableClick() {
    for (let i = 0; i < this.contCardGame.length; i++) {
      const objImg = this.contCardGame[i].querySelector('img');
      const cardIndex = i;
      const cardTitle = this.contCardGame[i].querySelector('.card-title');
      const cardText = this.contCardGame[i].querySelector('.card-text');
      this.contCardGame[i].addEventListener('click', () => {
        if (!this.lockBoard && !this.flippedCards.includes(cardIndex) && objImg.getAttribute('data-flipped') !== 'true') {
          objImg.src = objImg.dataset.src;
          objImg.setAttribute('data-flipped', 'true');
          cardTitle.style.visibility = 'visible';
          cardText.style.visibility = 'visible';
          this.flippedCards.push(cardIndex);
          if (this.flippedCards.length === 2) {
            this.checkForMatch();
          }
        }
      });
    }
  }

  // Método para verificar si se encontró una coincidencia entre dos cartas
  checkForMatch() {
    const firstCard = this.flippedCards[0];
    const secondCard = this.flippedCards[1];
    const firstImg = this.contCardGame[firstCard].querySelector('img');
    const secondImg = this.contCardGame[secondCard].querySelector('img');
    const pathDefault = this.pathImgDafault;
    this.lockBoard = true; // Bloquea el tablero mientras se realiza la comparación

    if (firstImg.dataset.src === secondImg.dataset.src) {
      this.matchedPairs++; // Incrementa el contador de pares coincidentes encontrados
      this.flippedCards = [];

      if (this.matchedPairs === this.maxCard / 2) { // Verifica si se han encontrado todos los pares posibles
        setTimeout(() => {
          alert("¡Has ganado!");
        }, 500);
      }
      this.updateProgressBar(); // Actualiza la barra de progreso
      this.lockBoard = false; // Desbloquea el tablero después de la comparación
    } else {
      setTimeout(() => {
        firstImg.src = pathDefault;
        firstImg.removeAttribute('data-flipped');
        secondImg.src = pathDefault;
        secondImg.removeAttribute('data-flipped');
        const firstCardTitle = this.contCardGame[firstCard].querySelector('.card-title');
        const firstCardText = this.contCardGame[firstCard].querySelector('.card-text');
        const secondCardTitle = this.contCardGame[secondCard].querySelector('.card-title');
        const secondCardText = this.contCardGame[secondCard].querySelector('.card-text');
        firstCardTitle.style.visibility = 'hidden';
        firstCardText.style.visibility = 'hidden';
        secondCardTitle.style.visibility = 'hidden';
        secondCardText.style.visibility = 'hidden';
        this.flippedCards = [];
        this.lockBoard = false;
      }, 1000); // Voltea las tarjetas de nuevo después de 1 segundo
    }
  }

  // Método para actualizar la barra de progreso
  updateProgressBar() {
    const progressPercentage = (this.matchedPairs / (this.maxCard / 2)) * 100; // Calcula el porcentaje de pares coincidentes encontrados
    this.progressCont.style.width = progressPercentage + "%";
    this.progressCont.innerText = progressPercentage.toFixed(2) + "%";
  }
}

// Uso del objeto Game
const game = new Game("contGame", 4, "progressBar", "chronometer", 1000, 60000);
