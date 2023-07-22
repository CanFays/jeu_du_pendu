"use strict";

// TIMER

let time = 20; // globale, décompte du timer via ticTac !! devient string qd <10 !!
let intervalId; // dans Game, clear le timer
let tryAgain = false; // win ou loose

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
console.log("transfo en étoiles(starArray) : ok", starArray, starArray[1])


// dans win, loose et ascii insertion
const hideDesertHTML = () => {
  const desertShowed = document.querySelector(".desert:not(.hide)");
  desertShowed.classList.add("hide");
}

// LOOOOOSE    - par asciiInsertion ou par Timer -
const loose = () => {
  console.log("perdu")
  hideDesertHTML()
  const loose = document.getElementById("loose")
  loose.classList.remove("hide")
  clearInterval(intervalId)
  // TO DO : disparition interface + score + bouton try again
}


// WIN
const win = () => {
  console.log("gagné")
  hideDesertHTML()
  clearInterval(intervalId)
}
// TO DO : score, message bravo, bouton rejouer


// Try again

const tryAgainFunction = () => {

}


// INPUT LETTER

const inputLetter = document.getElementById('letter');
const badLetters = document.getElementById("bad-letters")
let badLettersArray = []
let letter = ""
let errorNumber = 0

// TRY , BAD AND GOOD LETTER INPUT

const tryALetter = () => {
  letter = inputLetter.value.toUpperCase();
  console.log('Lettre saisie (letter):', letter);
  // if (!/^[a-zA-Z]+$/.test(letter)) {
  //   console.log('regex okay')
  //   alert("Veuillez saisir une lettre ou un tiret")
  time = 20
  clearInterval(intervalId);
  intervalId = setInterval(ticTac, 1000);
  return letter
}

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
    hideDesertHTML()
    const desertError = document.getElementById(`error${errorNumber}`)
    desertError.classList.remove("hide");
  } else {
    loose()
  }
}


// SCORE


// RELOAD
// sauvegarder score dans localStorage
// html: remettre les classes hide pour id="error1" à id="error9" et "loose"








//                      .....   GAME   .....                      //
displayWordToGuess()
inputLetter.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    if (starArray.join("") === randomWord) {
      win()
    } else if (!/^[a-zA-Z]+$/.test(event.key) && event.key !== '-') {
      alert("Veuillez saisir une lettre ou un tiret")
      console.log(event.key)
    } else {
      if (event.key === 'Enter' && inputLetter !== null) {
        letter = tryALetter()
  // TO DO : ne pas prendre en compte les lettres déjà saisies
    
        // GOOD OR BAD INPUT
        if (wordToGuessArray.includes(letter)) {
          goodLetter()
        } else {
          badLetter()
          ASCIIinsertion()
        }
      };
    }
    inputLetter.value = ""
  }
});








