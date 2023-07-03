"use strict";

// TIMER

const timer = () => {}

let time = 20
const timerElement = document.getElementById("timer");

const ticTac = () => {
  time = time < 10 ? "0" + time : time
  time = time <= 0 ? 0 : time - 1
  timerElement.innerText = `${time}`
  if (time === 0) {
    timerElement.innerText = "BOOOOM !!!"
    loose()
  }
}
// Exécute une fonction toutes les secondes
setInterval(ticTac, 1000)
console.log("timer : ok")

// Reste à stopper le timer quand le mot est trouvé ou quand le temps est écoulé


// RANDOM WORDS     TO DO: ajouter un dico
const words = [
  "javascript",
  "formation",
  "developpeur",
  "ecole",
  "ordinateur",
  "programmation",
  "postgresql",
  "nodejs",
  "react",
  "angular",
  "python"]

const randomizeWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex].toUpperCase()
}

const randomWord = randomizeWord()
console.log("randomWord : ok - ", randomWord)


// DISPLAY WORDS TO GUESS WITH STARS
const wordToGuess = document.getElementById("word-to-guess")
const wordToGuessArray = randomWord.split("")
console.log("wordToGuessArray : ok - ", wordToGuessArray)

let starArray = []
let starArrayString = ""
const displayWordToGuess = () => {
  wordToGuessArray.forEach(letter => {
    starArray.push("*")
    starArrayString = starArray.join(" ")
    wordToGuess.innerText = starArrayString
  })
}
displayWordToGuess()
console.log("transfo en étoiles(starArray) : ok", starArray, starArray[1])



// LOOOOOSE
const loose = () => {
  console.log("perdu")
  const desertShowed = document.querySelector(".desert:not(.hide)");
  desertShowed.classList.add("hide");  // A REFACTO, AUSSI DANS ASCIIinsertion
  const loose = document.getElementById("loose")
  loose.classList.remove("hide")
  // TO DO : disparition interface + score + bouton try again
}

// WIN
// TO DO : arrêt timer, score, message bravo, bouton rejouer



// INPUT LETTER

const inputLetter = document.getElementById('letter');
const badLetters = document.getElementById("bad-letters")
let badLettersArray = []
let letter = ""
let errorNumber = 0

// BAD AND GOOD LETTER INPUT

const goodLetter = () => {
  for (let i = 0; i < wordToGuessArray.length; i++) {
    if (wordToGuessArray[i] === letter) {
      starArray[i] = letter;
      console.log("starArray[i] : ", starArray[i])
    }
  }
  starArrayString = starArray.join(" ")
  wordToGuess.innerText = starArrayString
  console.log("lettres bonnes: ", wordToGuessArray.includes(letter))
}

const badLetter = () => {
  badLettersArray += letter
  badLetters.innerText = badLettersArray
  const chances = document.getElementById("chances")
  chances.innerText = `${errorNumber + 1}/9`
  errorNumber++
  console.log("errorNumber: ", errorNumber)
}

// ACSII ART IMAGES BY ERROR NUMBER

const ASCIIinsertion = () => {
  if (errorNumber <= 9) {
    const desertShowed = document.querySelector(".desert:not(.hide)");
    const desertError = document.getElementById(`error${errorNumber}`)
    desertShowed.classList.add("hide");
    desertError.classList.remove("hide");
  } else {
    loose()
  }
}



//                      .....   GAME   .....                      //

inputLetter.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && inputLetter !== null) {
    letter = inputLetter.value.toUpperCase();
    console.log('Lettre saisie (letter):', letter);
    time = 20
// TO DO : ne pas prendre en compte les lettres déjà saisies et les appuis vides sur entrée

    // GOOD OR BAD INPUT
    if (wordToGuessArray.includes(letter)) {
      goodLetter()
    } else {
      badLetter()
      ASCIIinsertion()
    }
  };
  inputLetter.value = ""
});



// SCORE
// RELOAD
// sauvegarder score dans localStorage
// html: remettre les classes hide pour id="error1" à id="error9" et "loose"


// GAME
// random word
// input
// timer start
