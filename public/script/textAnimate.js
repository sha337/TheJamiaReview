
const TypeWriter = function(txtElement, words, wait = 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait);
    this.type();
    this.isdeleting = false;
}

//Type Method
TypeWriter.prototype.type = function(){
    //current index of word
    const current = this.wordIndex % this.words.length;

    //get full text of current word
    const fulltxt = this.words[current];

    //check if deleting
    if(this.isdeleting){
        //remove a char
        this.txt = fulltxt.substring(0, this.txt.length - 1);
    }else{
        //add char
        this.txt = fulltxt.substring(0, this.txt.length + 1);
    }

    //insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //Initial Type Speed
    let typeSpeed = 300;

    if(this.isdeleting){
        typeSpeed /= 2;
    }

    //If word is complete
    if(!this.isdeleting && this.txt === fulltxt){
        //make a pause at end
        typeSpeed = this.wait;
        //set delete true
        this.isdeleting = true;
    }else if(this.isdeleting && this.txt === ''){
        this.isdeleting = false;
        //move tonext word
        this.wordIndex++;
        //pause before start typing
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed)
}

//Init on DOM load
document.addEventListener('DOMContentLoaded', init);

//Init App
function init(){
    const txtElement = document.querySelector('#changing-text');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //init typewriter
    new TypeWriter(txtElement, words, wait);
}