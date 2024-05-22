const quote = document.getElementById("quote");
const url = "https://api.quotable.io/random";
const author = document.getElementById("author");

var icon = document.getElementById("icon");

icon.onclick = function(){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        icon.src = "./ic/sun.png";
    }
    else{
        icon.src = "./ic/moon.png";
    }
}


async function getquote(url){
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    quote.innerHTML = data.content;
    author.innerHTML = data.author;
}

getquote(url);


// function to upload it to the X --> 

function tweet(){
    window.open("https://twitter.com/intent/tweet?text="+quote.innerHTML, "Tweet Window" , "width=600, heigth = 300");
}






