"use strict";

// TIMER
let time = 20; // devient string qd <10 !!
let intervalId;
// WORD TO GUESS
const wordToGuess = document.getElementById("word-to-guess")
let wordToGuessArray = []
let starArray = []
let starArrayString = ""
// INPUT LETTER
const inputLetter = document.getElementById('letter');
const badLetters = document.getElementById("bad-letters")
let badLettersArray = []
let letter = ""
let errorNumber = 0



// TIMER
const ticTac = () => {
  const timerElement = document.getElementById("timer");
  time = time <= 0 ? 0 : time - 1
  time = time < 10 ? `0${time}` : time
  timerElement.innerText = `${time}`
  if (time === "00") {
    timerElement.innerText = "BOOOOM !!!"
    loose()
  }
  console.log("timer : ok")
}

// total time : à faire
const chrono = () => {
const totalTime = 10
const timer_end = document.getElementById("timer-end")
timer_end.innerText = `${totalTime}`
}

// RANDOM WORDS     TO DO: ajouter un dico
const words = ["javascript", "formation", "developpeur", "ecole", "ordinateur", "programmation", "postgresql", "nodejs", "react", "angular", "python"]

const randomizeWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length)
  return wordToGuessArray = words[randomIndex].toUpperCase().split("")
}

// DISPLAY WORDS TO GUESS WITH STARS
const displayWordToGuess = () => {
  randomizeWord()
  console.log("wordToGuessArray dans displayWordToGuess après randomizeWord:", wordToGuessArray)
  wordToGuessArray.forEach(letter => {
    starArray.push("*")
    starArrayString = starArray.join(" ")
    wordToGuess.innerText = starArrayString
  })
}


// INPUT LETTER

const tryALetter = () => {
  letter = inputLetter.value.toUpperCase();
  if (!badLettersArray.includes(letter) || letter === /^[a-zA-Z-]$/) {
    time = 20
    clearInterval(intervalId);
    intervalId = setInterval(ticTac, 1000);
  }
  console.log('Lettre saisie (letter):', letter);
  return letter
}

const goodLetter = () => {
  for (let i = 0; i < wordToGuessArray.length; i++) {
    if (wordToGuessArray[i] === letter) {
      starArray[i] = letter;
      console.log("starArray[i] : ", starArray[i])
    }
  }
  wordToGuess.innerText = starArray.join(" ")
  console.log("lettres bonnes: ", wordToGuessArray.includes(letter))
}

const badLetter = () => {
  const chances = document.getElementById("chances")
  if (/^[a-zA-Z-]/.test(inputLetter.value)) {
    errorNumber++
    chances.innerText = `${errorNumber}/10`
    badLettersArray.push(letter);
  }
  badLetters.innerText = badLettersArray.join(" ")
}

// ACSII ART IMAGES BY ERROR NUMBER
const ASCIIinsertion = () => {
  if (errorNumber <= 9) {
    hideDesertHTML()
    const desertError = document.getElementById(`error${errorNumber}`)
    desertError.classList.remove("hide");
  } else {
    loose()
  }
}

// dans win, loose et ascii insertion
const hideDesertHTML = () => {
  const desertShowed = document.querySelector(".desert:not(.hide)");
  desertShowed.classList.add("hide");
}

const displayEnd = () => {

}

// LOOOOOSE    - par asciiInsertion ou par Timer -
const loose = () => {
  console.log("perdu")
  // const loose = document.getElementById("loose")
  // loose.classList.remove("hide")
  const loose_html = document.getElementById("loose")
  loose_html.classList.remove("hide")
  tryAgain()
  // TO DO : disparition interface + score + bouton try again
}


// WIN
const win = () => {
  console.log("gagné")
  document.getElementById("win").classList.remove("hide")
  tryAgain()
}


// TRY AGAIN
const tryAgain = () => {
  hideDesertHTML()
  clearInterval(intervalId)
  score()
  document.querySelector("#play-again:not(.hide)").addEventListener("click", reloadGame)
  //ne trouve pas celui de loose
}

// SCORE
const score = () => {
  chrono()
}
// timer total
// nombre mauvaises lettres
// score partie
// score total


// RELOAD
const reloadGame = () => {
// sauvegarder score dans localStorage

  location.reload();
}







//                      .....   GAME   .....                      //
displayWordToGuess()
inputLetter.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    if (!/^[a-zA-Z]+$/.test(inputLetter.value) && inputLetter.value !== '-') {
      alert("Veuillez saisir une lettre ou un tiret")
    } else {
      letter = tryALetter()
      if (wordToGuessArray.includes(letter)) {
        goodLetter()
        starArray.join("") === wordToGuessArray.join("") ? win() : null
      } else if (badLettersArray.includes(letter)) {
        console.log("lettre déjà saisie")
        null
      } else {
        badLetter()
        ASCIIinsertion()
      }
    }
    inputLetter.value = ""
  }
});


