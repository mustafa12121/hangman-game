let chars = document.querySelector(".chars");
let letters = "qwertyuiopasdfghjklzxcvbnm";
let charList = Array.from(letters);

for (let i in charList) {
  let letter = document.createElement("span");
  letter.className = "letter";
  letter.appendChild(document.createTextNode(charList[i]));
  chars.appendChild(letter);
}
let randomProparty, randomValue, guesLetter;
getWords();

let wrongAns = 0;

document.addEventListener("click", (e) => {
  if (e.target.className === "letter") {
    e.target.classList.add("clicked");

    let clickedChar = e.target.innerHTML;
    guesLetter.forEach((ele, ind) => {
      if (clickedChar === ele) {
        let reatechar = document.querySelector(
          `.chos-chars span:nth-of-type(${+ind + 1})`
        );
        reatechar.innerHTML = clickedChar;
        e.target.classList.add("raet");
      }
    });

    if (!e.target.classList.contains("raet")) {
      document.querySelector(".drow").classList.add(`wrong-${++wrongAns}`);
    }
  }
  let writenWord = Array.from(
    document.querySelector(".chos-chars").children,
    (ele) => {
      return ele.innerHTML;
    }
  ).join("");
  if (writenWord == randomValue) endTheGame(true);

  if (wrongAns === 8) {
    style.appendChild(
      document.createTextNode(`
      .row .drow .fot-stands {
        bottom: 0;
      }
      .row .drow .the-man{
        bottom: -6px;
      }
    .row .drow .the-man .the-head .the-eys::after,
     .row .drow .the-man .the-head .the-eys::before{
        background-image:radial-gradient(black -31%, transparent 52%);
      }
      .row .drow .the-man .the-head .mous{
       
        transform: translate(8px,33px);
        width: 30px;
        height: 6px;   
        background-image: radial-gradient(red 27%, transparent 50%);
        background-color: white;
        border-color:var(--main-color)
      }
      `)
    );
    endTheGame();
  }
});

let style = document.createElement("style");
document.head.after(style);

document.addEventListener("click", (e) => {
  if (e.target.id == "retray") {
    delete document.querySelector("style");
    location.reload();
  }
});

function endTheGame(win = false) {
  let endMessege = document.createElement("div");

  endMessege.style = `
  position: absolute;
  transition: 0.5s;
  top: 50%;
  border-radius: 8px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 150px;
  z-index: 10;
  background-color: cadetblue;
  `;
  let messegeText = document.createElement("h2");
  if (win == false) {
    messegeText.append(`the word is:${randomValue}`);
  } else {
    if (wrongAns === 0) {
      messegeText.append(`you are brilien ${wrongAns} falt`);
    } else if (wrongAns <= 5) {
      messegeText.append(`you'r Good ${wrongAns} falt`);
    } else if (wrongAns > 5) {
      messegeText.append(`you almost daid ${wrongAns} falt`);
    }
  }

  messegeText.style = `
    color: white;
    text-align: center;
    margin-top: 10px;
    font-weight:bold;
  `;
  endMessege.appendChild(messegeText);
  let buttun = document.createElement("span");
  if (win) {
    buttun.append("play again");
  } else buttun.append("retray");
  buttun.id = "retray";
  buttun.style = `
  padding: 10px 15px;
  text-align: center;
  margin: 20px 98px;
  font-size: 25px;
  display: block;
  background-color: #00783a;
  color: white;
  cursor:pointer;
  border-radius: 8px;`;
  endMessege.appendChild(buttun);
  style.appendChild(
    document.createTextNode(`
  .container::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: black;
  z-index: 9;
  opacity: 0.8;
}

`)
  );
  document.querySelector("script").before(endMessege);
}

async function getWords() {
  let prom = await fetch("words.json");
  let words = await prom.json();

  let randomKey =
    Object.keys(words)[Math.floor(Math.random() * Object.keys(words).length)];
  randomProparty = words[randomKey];
  randomValue =
    randomProparty[Math.floor(Math.random() * randomProparty.length)];

  document.querySelector("header div span").innerHTML = randomKey;

  let chosenLetterContainer = document.querySelector(".chos-chars");

  guesLetter = Array.from(randomValue);
  guesLetter.forEach((letter) => {
    let span = document.createElement("span");
    if (letter === " ") {
      span.className = "space";
      span.innerHTML = " ";
    }
    chosenLetterContainer.appendChild(span);
  });
}
