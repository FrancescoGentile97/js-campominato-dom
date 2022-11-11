// ricordarmi che "this" richiama l'elemento HTML che ha scatenato l'evento

// aggiungo una "const" per richiamare il button
const playButtonEl = document.getElementById("btn-play");
let counter = 0;
// array di 16 bombe da riempire con il ciclo 
let bombs = [];
let explode = false;

// aggiungo un eventlistener per "click" al bottone
playButtonEl.addEventListener("click", function() {
    const options = document.getElementById("difficulty");
    let grid = parseInt(options.value);
// aggiugo una let che mi moltiplica il valore di "grid" per se stesso 
// così da ottenere il numero completo delle grid che mi servono
    let totGrid = grid * grid;

    const gridContainerEl = document.querySelector(".grid-container");
    // reset dell'html
    gridContainerEl.innerHTML = "";

    bombs = generateBombList(+totGrid);

    // creo il classico ciclo for dove all'interno creo un elemento "div"
    // al quale aggiungo le grid-cell singole alle quali modifico la widht/flex basis
    // poi inserisco un innerHTML con ${i} così da numerare le grid
    // se tutto funziona correttamente utilizzo "append"
    for (let i = 1; i <= totGrid; i++) {
        const newCell = document.createElement("div");
        newCell.classList.add("grid-cell");
        newCell.style.flexBasis = 100 / grid + "%";
        newCell.innerHTML = `${i}`;

        newCell.dataset.numCella = i;
        newCell.addEventListener( "click", onCellClick );

        gridContainerEl.append(newCell);

    // aggiungo un'altro eventlistener questa volta alle newCell 
    // inserite nel ciclo for precedente con "create element"
    // e gli aggiungo sempre tramite una function "click"
    // la class list toggle con un colore diverso che si "accende" al clik
        newCell.addEventListener("click", function() {
            this.classList.toggle("bg-sucess");
        })
    }
})

// creo la funzione per il quale se explode è true si colorano di verde ed esegue il counter
//  altrimenti esce un alert per aver cliccato la bomba e si colora di rosso la casella
function onCellClick() {
    const numCell = parseInt(this.dataset.numCella);
    const counterEl = document.getElementById("counter");

    if (explode === true) {
        return;
    }

    if (this.classList.contains("bg-success")) {
        return;
    } else if (this.classList.contains("bg-danger")) {
        return;
    }

    counter++
    counterEl.innerHTML = ("Punteggio: " + counter);

    if (bombs.includes(numCell)) {
        alert("Hai cliccato su una bomba! Hai perso");
        this.classList.add("bg-danger");
        explode = true;
    } else {
        this.classList.toggle("bg-success");
        console.log(this.textContent);
    }
}

/**
 * @param {number} min (numero minimo);
 * @param {number} max (numero massimo);
 */

function generateRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * @param {number}
 * @param {array}
 */

// creo le bombe con il ciclo while visto con florian 
// preparo un console log per stampare la "bomblist" e vedere se va
// e con il ciclo while con il .lenght metto 16 bombe 
// poi con il random generator genero le bombe nei numeri di celle casuali
// effettuo il controllo visto con florian per evitare che ci siano piu di una bomba nella stessa cella

function generateBombList(totGrid) {
    const bombList = [];
    console.log(bombList);

    while (bombList.length < 16) {
        const num = generateRandomNumber(1, totGrid);
        if (!bombList.includes(num)) {
            bombList.push (num);
        }
    }
    return bombList;
}