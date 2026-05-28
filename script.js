const secretWord = words[Math.floor(Math.random() * words.length)]

const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");

const maxRows = 6;
const wordLength = 5;

let currentRow = 0;
let currentGuess = "";

/* Spielfeld erstellen */

for(let i = 0; i < maxRows; i++){

  const row = document.createElement("div");
  row.classList.add("row");

  for(let j = 0; j < wordLength; j++){

    const tile = document.createElement("div");
    tile.classList.add("tile");

    row.appendChild(tile);
  }

  board.appendChild(row);
}

/* Tastatur */

const keyboardLayout = [
  "QWERTZUIOP",
  "ASDFGHJKL",
  "YXCVBNM"
];

keyboardLayout.forEach(line => {

  const row = document.createElement("div");
  row.classList.add("keyboard-row");

  line.split("").forEach(letter => {

    const button = document.createElement("button");

    button.textContent = letter;
    button.classList.add("key");

    button.addEventListener("click", () => {
      addLetter(letter);
    });

    row.appendChild(button);
  });

  keyboard.appendChild(row);
});

/* ENTER Button */

const enterRow = document.createElement("div");
enterRow.classList.add("keyboard-row");

const enterBtn = document.createElement("button");
enterBtn.textContent = "ENTER";
enterBtn.classList.add("key", "big");

enterBtn.addEventListener("click", submitGuess);

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "⌫";
deleteBtn.classList.add("key", "big");

deleteBtn.addEventListener("click", removeLetter);

enterRow.appendChild(enterBtn);
enterRow.appendChild(deleteBtn);

keyboard.appendChild(enterRow);

/* Tastatur vom PC */

document.addEventListener("keydown", (e) => {

  if(e.key === "Enter"){
    submitGuess();
  }

  else if(e.key === "Backspace"){
    removeLetter();
  }

  else{

    const letter = e.key.toUpperCase();

    if(letter.match(/[A-ZÄÖÜ]/)){
      addLetter(letter);
    }
  }
});

/* Buchstabe hinzufügen */

function addLetter(letter){

  if(currentGuess.length >= wordLength){
    return;
  }

  currentGuess += letter;

  const row = board.children[currentRow];

  row.children[currentGuess.length - 1].textContent = letter;
}

/* Buchstabe löschen */

function removeLetter(){

  if(currentGuess.length === 0){
    return;
  }

  const row = board.children[currentRow];

  row.children[currentGuess.length - 1].textContent = "";

  currentGuess = currentGuess.slice(0, -1);
}

/* Wort prüfen */

function submitGuess(){

  if(currentGuess.length !== wordLength){

    message.textContent =
      "Bitte 5 Buchstaben eingeben!";

    return;
  }

  const row = board.children[currentRow];

  for(let i = 0; i < wordLength; i++){

    const tile = row.children[i];
    const letter = currentGuess[i];

    tile.classList.add("flip");

    setTimeout(() => {

      if(letter === secretWord[i]){

        tile.classList.add("correct");

      }else if(secretWord.includes(letter)){

        tile.classList.add("present");

      }else{

        tile.classList.add("absent");
      }

    }, i * 200);
  }

  /* Gewonnen */

  if(currentGuess === secretWord){

    message.textContent =
      "🎉 Super! Du hast gewonnen!";

    return;
  }

  currentRow++;
  currentGuess = "";

  /* Verloren */

  if(currentRow >= maxRows){

    message.textContent =
      "😢 Das Wort war: " + secretWord;
  }
}
