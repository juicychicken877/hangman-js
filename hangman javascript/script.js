var words = new Array(10);
var randomNumber = 0;

var randomWord = '';
var encryptedWord = '';
var wordLength = 0;

var mistakeCount = 0;

words = ['Cat', 'Book', 'Water', 'Coffee', 'Banana', 'Keyboard', 'Coat', 'Dog', 'Smartphone', 'Wallet'];
letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// generate word
var randomWord = GenerateWord().toUpperCase();
encryptedWord = EncryptWord(randomWord);

window.onload = Start;

function Start()
{
    var globalWord = document.getElementById('word');

    globalWord.innerHTML = encryptedWord;

    wordLength = encryptedWord.length;

    PrepareKeyboard();
}

function PrepareKeyboard()
{
    var globalKeyboard = document.getElementById('keyboard');
    var htmlKey = '';
    var className = 'key';

    for (let i=0; i<letters.length; i++)
    {
        let id = 'key' + i;

        htmlKey += '<div id="'+ id +'" onclick="FindLetterInString('+i+')" class="'+ className + '">'+ letters[i]+'</div>';

    }

    globalKeyboard.innerHTML = htmlKey;
}

String.prototype.ChangeChar = function(position, letter) 
{
    if (position > this.length-1) 
        return this.toString();
    else
        return (this.substring(0, position) + letter + this.substring(position+1)); 
}

function CheckGameStatus()
{
    let lostElement = "<p class='play-again' onclick='location.reload();'><span style='color: red'>You lost!</span> WANNA PLAY AGAIN?</p>"
    let winElement = "<p class='play-again' onclick='location.reload();'><span style='color: green'>You won!</span> WANNA PLAY AGAIN?</p>"
    // check if lost
    if (mistakeCount >= 10)
    {
        document.getElementById("keyboard").innerHTML = lostElement;
    }
    // check if won
    if (encryptedWord == randomWord)
    {
        document.getElementById("keyboard").innerHTML = winElement;
    }
}

function FindLetterInString(number)
{
    let founded = false;

    for(let i=0; i<wordLength; i++)
    {
        if (randomWord.charAt(i) == letters[number])
        {
            encryptedWord = encryptedWord.ChangeChar(i, letters[number]);
            founded = true;
        }
    }

    let id = 'key' + number;
    let keyboardKey = document.getElementById(id);

    if (founded == true)
    {
        keyboardKey.style.border = "3px solid green";
        keyboardKey.style.color = "green";
        keyboardKey.onclick = ";";
    }
    else {
        keyboardKey.style.border = "3px solid red";
        keyboardKey.style.color = "red";
        keyboardKey.onclick = ";";

        // update mistakes
        mistakeCount += 1;
        document.getElementById("mistake-count").innerHTML = mistakeCount.toString();
    }

    document.getElementById("word").innerHTML = encryptedWord.toString();

    CheckGameStatus();
}

function EncryptWord(word) {

    let newWord = ''

    for (let i=0; i<word.length; i++)
    {
        newWord += '_';
    }

    return newWord;
}

function GenerateWord() 
{
    randomNumber = Math.floor(Math.random() * (words.length));

    return words[randomNumber];
}


