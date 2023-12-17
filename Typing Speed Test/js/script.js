const typingText = document.querySelector(".typing-text p");
inpField = document.querySelector(".wrapper .input-field"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
tryAgainBtn = document.querySelector(".content button"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");//character per minute

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;


function randomParagraph(){
    //getting random number and it'll always less than the paragraphs length 
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    //getting trandom item from the paragraphs array, splitting all the characters
    //od it, adding each charactr inside span and tehn adding this span inside p tag
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    
    typingText.querySelectorAll("span")[0].classList.add("active");

    //focusing input field on keydown or click event
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}
function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {//once timer starts it wont restart again on every key clicked
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        //if user hasnt entered any character or pressed backspace 
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;//decrement charIndex
                //DECREMENT MISTAKES ONLY IF THE charIndes span conatains incorrect class
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText === typedChar){
                characters[charIndex].classList.add("correct");//if user typed character and shown character matched then add the coorect clas
              }else{
                mistakes++;
                characters[charIndex].classList.add("incorrect");//else increment the mistakes and add the incorrect class
              }
              charIndex++;//increment charIndex either user typed correct or incorrect character
        }
      characters.forEach(span => span.classList.remove("active"));
      characters[charIndex].classList.add("active");
    
        // char = (tot typed character - tot mistakes) / 5
       // char type = char / (max time - time left)
      //wpm = char type * 60
      let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
      wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
      
      wpmTag.innerText = wpm;
      mistakeTag.innerText = mistakes;
      cpmTag.innerText = charIndex - mistakes;//cpm will not count mistakes
    }
    else {
        clearInterval(timer);
        inpField.value = "";
    }
    
}

function initTimer() {
    //if timeleft >0 then  decrement time left
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {// else clear timer
        clearInterval(timer);
    }
}

function resetGame() {
    //calling loadParagraph function and
    //resetting each variables and elements value to default
    randomParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);