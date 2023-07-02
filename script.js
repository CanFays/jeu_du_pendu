"use strict";

// TIMER

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


// RANDOM WORDS
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
// si errorNumber = 10 || time === 0
const loose = () => {
  console.log("perdu")
  // display none pour toutes les classes desert, block pour la classe loose
  // bouton try again
}


// ACSII ART IMAGES BY ERRORS
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
// Récupérer la première div visible
// let divVisible = document.querySelector('div:not([style*="display: none"])');

// Cacher la div visible
// divVisible.style.display = 'none';

// Trouver la div suivante
// let divSuivante = divVisible.nextElementSibling;

// Rendre la div suivante visible
// if (divSuivante) {
//   divSuivante.style.display = 'block';
// }




// INPUT LETTER

const inputLetter = document.getElementById('letter');
const badLetters = document.getElementById("bad-letters")
let badLettersArray = []
let letter = ""
let errorNumber = 0

inputLetter.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && inputLetter !== null) {
    letter = inputLetter.value.toUpperCase();
    console.log('Lettre saisie (letter):', letter);
    time = 20

    // BAD AND GOOD LETTERS

    // si inputLetter est dans wordToGuessArray
    if (wordToGuessArray.includes(letter)) {
      // pour chaque lettre qui correspond on récup l'index
      // et on remplace à cet index l'étoile de starArray par la lettre
      for (let i = 0; i < wordToGuessArray.length; i++) {
        if (wordToGuessArray[i] === letter) {
          starArray[i] = letter;
          console.log("starArray[i] : ", starArray[i], "starArray",starArray, "marche pas; LETTER:", letter, "i:", i, "V/F:", wordToGuessArray[i] === letter)
        }
      }
      // on injecte starArray dans html
      starArrayString = starArray.join(" ")
      wordToGuess.innerText = starArrayString
      console.log("lettres bonnes: ", wordToGuessArray.includes(letter))
    } else {
      console.log("lettres bonnes: ", wordToGuessArray.includes(inputLetter), "mauvaises:", badLetters)
      // sinon, on met la lettre dans badLetters
      badLettersArray += letter
      // on injecte badLetters dans html
      badLetters.innerText = badLettersArray
      // on fait avancer le display block
      errorNumber++
      console.log("errorNumber: ", errorNumber)
      ASCIIinsertion()
    }
  };
  // suppr lettre du champs input
  inputLetter.value = ""
});



// SCORE
// RELOAD
// sauvegarder score dans localStorage
// html: remettre les classes hide pour id="error1" à id="error9" et "loose"
