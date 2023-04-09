let home = document.querySelector('.home'),
  main = document.querySelector('.main'),
  title = document.querySelector('.title'),
  easyBtn = document.querySelector('.easy'),
  mediumBtn = document.querySelector('.medium'),
  hardBtn = document.querySelector('.hard'),
  clearStorageBtn = document.querySelector("#clear-storage-btn"),
  showBtn = document.querySelector('.show-btn'),
  passwordInput = document.querySelectorAll('input[type="password"]')

// Run string start
let txt = title.innerHTML
title.innerHTML = ""

function str(x = 0) {
  title.innerHTML += txt[x]
  x++

  if (x < txt.length) {
    setTimeout(() => {
      str(x)
    }, 35);
  }
}

str()
// Run string end

easyBtn.addEventListener('click', function () {
  home.style.display = 'none'
  main.style.display = 'unset'
  easyTest()
})

mediumBtn.addEventListener('click', function () {
  home.style.display = 'none'
  main.style.display = 'unset'
  mediumTest()
})

hardBtn.addEventListener('click', function () {
  home.style.display = 'none'
  main.style.display = 'unset'
  hardTest()
})

// Show Password
showBtn.addEventListener('click', function (e) {
  e.preventDefault()

  for (let i = 0; i < passwordInput.length; i++) {
    if (passwordInput[i].type === 'password') {
      passwordInput[i].type = 'text'
      showBtn.innerHTML = `Parolni berkitish <i class="fal fa-eye-slash"></i>`
    } else {
      passwordInput[i].type = 'password'
      showBtn.innerHTML = `Parolni ko'rsatish <i class="fal fa-eye"></i>`
    }
  }
})
// Show Password

// Load animation start
let btnsSection = document.querySelector('.btns')

window.addEventListener('load', () => fadeAnim(btnsSection))

function fadeAnim(section) {
  let fadeRight = section.querySelector('.fade-right'),
    fadeLeft = section.querySelector('.fade-left'),
    fadeBottom = section.querySelector('.fade-bottom')

  const fadeSpeed = fadeRight.getAttribute('data-fade-speed')

  fadeRight.style.transition = fadeSpeed + 'ms'
  fadeRight.classList.add('active')

  fadeLeft.style.transition = fadeSpeed + 'ms'
  fadeLeft.classList.add('active')

  fadeBottom.style.transition = fadeSpeed + 'ms'
  fadeBottom.classList.add('active')
}
// Load animation end

clearStorageBtn.addEventListener("click", function () {
  localStorage.clear()
  login.style.display = 'block'
  home.style.display = 'none'
  clearStorageBtn.style.display = 'none'
})

// Login Start
let inputs = document.querySelectorAll(".register__input")

function addcl() {
  let parent = this.parentNode.parentNode;
  parent.classList.add("focus");
}

function remcl() {
  let parent = this.parentNode.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach(input => {
  input.addEventListener("focus", addcl);
  input.addEventListener("blur", remcl);
});


let form = document.querySelector("#register-form");
let login = document.querySelector(".login")
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let username = document.querySelector("#username").value,
    password = document.querySelector("#password").value,
    confirmPass = document.querySelector('#confirmPass').value

  let user = {
    username: username,
    password: password,
    confirmPass: confirmPass
  };
  if (password !== confirmPass) {
    alert('Parol bir xil emas(');
  } else {
    localStorage.setItem(username, JSON.stringify(user));

    form.reset();

    login.style.display = 'none'
    home.style.display = 'unset'
    clearStorageBtn.style.display = 'unset'
    fadeAnim(btnsSection)
  }
})
// Login End


function easyTest() {
  let wrongRating = document.querySelector(".rating-num")
  let correctRating = document.querySelector(".true-num")

  const englishWords = ['cat', 'dog', 'bird', 'fish', 'horse', 'monkey', 'rabbit', 'parrot', 'cow', 'mouse'];
  const russianWords = ['mushuk', 'kuchuk', 'qush', 'baliq', 'ot', 'maymun', 'quyon', "to'ti qush", 'sigir', 'sichqon'];
  let selectedEnglishWord = null;
  let correctMatches = 0;

  function generateGameBoard() {
    const gameBoard = document.getElementById('game-board1');
    const gameBoard2 = document.getElementById('game-board2');
    gameBoard.innerHTML = '';

    for (let i = 0; i < englishWords.length; i++) {
      const englishWordBox = document.createElement('div');
      englishWordBox.className = 'word-box';
      englishWordBox.innerText = englishWords[i];
      englishWordBox.addEventListener('click', function () {
        if (selectedEnglishWord !== null) {
          return;
        }
        selectedEnglishWord = i;
        englishWordBox.classList.add('selected');
      });
      gameBoard.appendChild(englishWordBox);
    }

    let n = 0
    let x = 0
    correctRating.textContent = x
    wrongRating.textContent = n
    for (let i = 0; i < russianWords.length; i++) {
      const russianWordBox = document.createElement('div');
      russianWordBox.className = 'word-box';
      russianWordBox.innerText = russianWords[i];
      russianWordBox.addEventListener('click', function () {
        if (selectedEnglishWord === null) {
          return;
        }
        if (i === selectedEnglishWord) {
          russianWordBox.classList.add('matched');
          const selectedEnglishWordBox = document.querySelector('.selected');
          selectedEnglishWordBox.classList.add('matched');
          x++;
          correctRating.textContent = x
          selectedEnglishWordBox.classList.remove('selected');
          selectedEnglishWord = null;
          correctMatches++;
          checkGameOver();
        } else {
          russianWordBox.classList.add('wrong');
          const selectedEnglishWordBox = document.querySelector('.selected');
          selectedEnglishWordBox.classList.add('wrong');
          n++;
          wrongRating.textContent = n
          setTimeout(function () {
            russianWordBox.classList.remove('wrong');
            selectedEnglishWordBox.classList.remove('selected');
            selectedEnglishWordBox.classList.remove('wrong');
            selectedEnglishWord = null;
          }, 1000);
        }
      });
      gameBoard2.appendChild(russianWordBox);
    }
  }

  function checkGameOver() {
    if (correctMatches === englishWords.length) {
      const resultElement = document.getElementById('result');
      resultElement.style.color = 'green';
    }
  }

  function resetGame() {
    const gameBoard = document.getElementById('game-board2');
    gameBoard.innerHTML = '';
    selectedEnglishWord = null;
    correctMatches = 0;
    generateGameBoard();
    document.getElementById('result').innerHTML = '';
  }

  generateGameBoard();
  document.getElementById('reset-button').addEventListener('click', resetGame);

  let full_broad_timer = document.querySelector(".full-board");
  let rating_num = document.querySelector(".rating-nums");
  let reset_button1 = document.querySelector("#reset-button");
  let wrapper_timer = document.querySelector(".wrapper");
  reset_button1.addEventListener("click", function () {
    var myTimeout = setTimeout(greetGre, 60000);
    wrapper_timer.style.display = "flex";
    reset_button1.style.display = "none";
  })

  function greetGre(params) {
    full_broad_timer.style.display = "none";
    rating_num.style.display = "flex";
    reset_button1.style.display = "block";
    wrapper_timer.style.display = "none";
    reset_button1.addEventListener("click", function () {
      rating_num.style.display = "none";
      full_broad_timer.style.display = "flex";
      wrapper_timer.style.display = "flex";
    })
  }
}

function mediumTest() {
  let wrongRating = document.querySelector(".rating-num")
  let correctRating = document.querySelector(".true-num")

  const englishWords = ['accept', 'advise', 'beef', 'chance', 'breast', 'flow', 'frozen', 'guard', 'humour', 'improvement'];
  const russianWords = ['qabul qilish', 'maslahat bermoq', 'mol go\'shti', 'imkoniyat', 'ko\'krak', 'oqim', 'muzlatilgan', "qo'riqchi", 'hazil', 'takomillashtirish'];
  let selectedEnglishWord = null;
  let correctMatches = 0;


  console.log(englishWords);

  function generateGameBoard() {
    const gameBoard = document.getElementById('game-board1');
    const gameBoard2 = document.getElementById('game-board2');
    gameBoard.innerHTML = '';

    for (let i = 0; i < englishWords.length; i++) {
      const englishWordBox = document.createElement('div');
      englishWordBox.className = 'word-box';
      englishWordBox.innerText = englishWords[i];
      englishWordBox.addEventListener('click', function () {
        if (selectedEnglishWord !== null) {
          return;
        }
        selectedEnglishWord = i;
        englishWordBox.classList.add('selected');
      });
      gameBoard.appendChild(englishWordBox);
    }
    let n = 0
    let x = 0
    correctRating.textContent = x
    wrongRating.textContent = n
    for (let i = 0; i < russianWords.length; i++) {
      const russianWordBox = document.createElement('div');
      russianWordBox.className = 'word-box';
      russianWordBox.innerText = russianWords[i];
      russianWordBox.addEventListener('click', function () {
        if (selectedEnglishWord === null) {
          return;
        }
        if (i === selectedEnglishWord) {
          russianWordBox.classList.add('matched');
          const selectedEnglishWordBox = document.querySelector('.selected');
          selectedEnglishWordBox.classList.add('matched');
          x++;
          correctRating.textContent = x
          selectedEnglishWordBox.classList.remove('selected');
          selectedEnglishWord = null;
          correctMatches++;
          checkGameOver();
        } else {
          russianWordBox.classList.add('wrong');
          const selectedEnglishWordBox = document.querySelector('.selected');
          selectedEnglishWordBox.classList.add('wrong');
          n++;
          wrongRating.textContent = n
          setTimeout(function () {
            russianWordBox.classList.remove('wrong');
            selectedEnglishWordBox.classList.remove('selected');
            selectedEnglishWordBox.classList.remove('wrong');
            selectedEnglishWord = null;
          }, 1000);
        }
      });
      gameBoard2.appendChild(russianWordBox);
    }
  }

  function checkGameOver() {
    if (correctMatches === englishWords.length) {
      const resultElement = document.getElementById('result');
      resultElement.style.color = 'green';
    }
  }

  function resetGame() {
    const gameBoard = document.getElementById('game-board2');
    gameBoard.innerHTML = '';
    selectedEnglishWord = null;
    correctMatches = 0;
    generateGameBoard();
    document.getElementById('result').innerHTML = '';
  }

  generateGameBoard();
  document.getElementById('reset-button').addEventListener('click', resetGame);

  let full_broad_timer = document.querySelector(".full-board");
  let rating_num = document.querySelector(".rating-nums");
  let reset_button1 = document.querySelector("#reset-button");
  let wrapper_timer = document.querySelector(".wrapper");
  reset_button1.addEventListener("click", function () {
    var myTimeout = setTimeout(greetGre, 60000);
    wrapper_timer.style.display = "flex";
    reset_button1.style.display = "none";
  })

  function greetGre(params) {
    full_broad_timer.style.display = "none";
    rating_num.style.display = "flex";
    reset_button1.style.display = "block";
    wrapper_timer.style.display = "none";
    reset_button1.addEventListener("click", function () {
      rating_num.style.display = "none";
      full_broad_timer.style.display = "flex";
      wrapper_timer.style.display = "flex";
    })
  }
}

function hardTest() {
  let wrongRating = document.querySelector(".rating-num")
  let correctRating = document.querySelector(".true-num")

  const englishWords = ['anticipate', 'complicate', 'engage', 'hatred', 'bet', 'attorney', 'conservative', 'quote', 'scare', 'strip'];
  const russianWords = ['bashorat qilish', 'murakkablashtirish', 'shug\'ullanish', 'nafrat', 'tikish', 'advokat', 'konservativ', "iqtibos", 'qo\'rqitish', 'tasma'];
  let selectedEnglishWord = null;
  let correctMatches = 0;


  console.log(englishWords);

  function generateGameBoard() {
    const gameBoard = document.getElementById('game-board1');
    const gameBoard2 = document.getElementById('game-board2');
    gameBoard.innerHTML = '';

    for (let i = 0; i < englishWords.length; i++) {
      const englishWordBox = document.createElement('div');
      englishWordBox.className = 'word-box';
      englishWordBox.innerText = englishWords[i];
      englishWordBox.addEventListener('click', function () {
        if (selectedEnglishWord !== null) {
          return;
        }
        selectedEnglishWord = i;
        englishWordBox.classList.add('selected');
      });
      gameBoard.appendChild(englishWordBox);
    }
    let n = 0
    let x = 0
    correctRating.textContent = x
    wrongRating.textContent = n
    for (let i = 0; i < russianWords.length; i++) {
      const russianWordBox = document.createElement('div');
      russianWordBox.className = 'word-box';
      russianWordBox.innerText = russianWords[i];
      russianWordBox.addEventListener('click', function () {
        if (selectedEnglishWord === null) {
          return;
        }
        if (i === selectedEnglishWord) {
          russianWordBox.classList.add('matched');
          const selectedEnglishWordBox = document.querySelector('.selected');
          selectedEnglishWordBox.classList.add('matched');
          x++;
          correctRating.textContent = x
          selectedEnglishWordBox.classList.remove('selected');
          selectedEnglishWord = null;
          correctMatches++;
          checkGameOver();
        } else {
          russianWordBox.classList.add('wrong');
          const selectedEnglishWordBox = document.querySelector('.selected');
          selectedEnglishWordBox.classList.add('wrong');
          n++;
          wrongRating.textContent = n
          setTimeout(function () {
            russianWordBox.classList.remove('wrong');
            selectedEnglishWordBox.classList.remove('selected');
            selectedEnglishWordBox.classList.remove('wrong');
            selectedEnglishWord = null;
          }, 1000);
        }
      });
      gameBoard2.appendChild(russianWordBox);
    }
  }

  function checkGameOver() {
    if (correctMatches === englishWords.length) {
      const resultElement = document.getElementById('result');
      resultElement.style.color = 'green';
    }
  }

  function resetGame() {
    const gameBoard = document.getElementById('game-board2');
    gameBoard.innerHTML = '';
    selectedEnglishWord = null;
    correctMatches = 0;
    generateGameBoard();
    document.getElementById('result').innerHTML = '';
  }

  generateGameBoard();
  document.getElementById('reset-button').addEventListener('click', resetGame);

  let full_broad_timer = document.querySelector(".full-board");
  let rating_num = document.querySelector(".rating-nums");
  let reset_button1 = document.querySelector("#reset-button");
  let wrapper_timer = document.querySelector(".wrapper");
  reset_button1.addEventListener("click", function () {
    var myTimeout = setTimeout(greetGre, 60000);
    wrapper_timer.style.display = "flex";
    reset_button1.style.display = "none";
  })

  function greetGre(params) {
    full_broad_timer.style.display = "none";
    rating_num.style.display = "flex";
    reset_button1.style.display = "block";
    wrapper_timer.style.display = "none";
    reset_button1.addEventListener("click", function () {
      rating_num.style.display = "none";
      full_broad_timer.style.display = "flex";
      wrapper_timer.style.display = "flex";
    })
  }
}