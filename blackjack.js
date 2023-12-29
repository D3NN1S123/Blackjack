
var previous= 0;
var dealer = 0;

function hit(){
    
    var output2 = document.getElementById('hitText');

    var output3 = document.getElementById('cardImages');

    var a = Math.floor(Math.random()*13 +1);
    var b = Math.floor(Math.random()*13 +1);
   
    if((a==11) || (a==12) || (a==13)){
        output3.src = "images/card"+a+".png";
        previous = previous + 10;
    }
    else if(a==1){
        document.getElementById('hitButt').disabled = true;
        document.getElementById('standButt').disabled = true;

        output3.src = "images/card1.png";
        document.getElementById('ace').innerHTML = "You have an ace! Do you want it to be used as 1 or 11?";
        document.getElementById('oneor11').style.display = "inline";
        document.getElementById('oneor11too').style.display = "inline";

    }
    else{
        output3.src = "images/card"+a+".png";
        previous = previous + a;
    }
    
    if((b==11) || (b==12) || (b==13)){
        dealer = dealer + 10;
    }
    else{
        dealer = dealer + b;
    }

    if(previous<21){
        output2.innerHTML = previous;
    }
    else if(previous ==21){
        output2.innerHTML = previous;
        document.getElementById('winOrLose').innerHTML = "You've gotten 21! You win the jackpot!";
        document.getElementById('hitButt').disabled = true;
        document.getElementById('standButt').disabled = true;
        document.getElementById('startOver').style.display="inline";
    }
    else{
        output2.innerHTML = previous;
        document.getElementById('startOver').style.display="inline";
        document.getElementById('standButt').disabled = true;
        document.getElementById('hitButt').disabled = true;
        document.getElementById('winOrLose').innerHTML = "You've gotten over 21! Bust! The dealer had "+ dealer;

            }
    
    

}

function aceOne(){
    document.getElementById('hitButt').disabled = false;
    document.getElementById('standButt').disabled = false;

    document.getElementById('oneor11').style.display = "none";
    document.getElementById('oneor11too').style.display = "none";
    document.getElementById('ace').innerHTML = "";
    previous += 1;
    document.getElementById("hitText").innerHTML = previous;
}

function ace11(){
    document.getElementById('hitButt').disabled = false;
    document.getElementById('standButt').disabled = false;

    document.getElementById('oneor11').style.display = "none";
    document.getElementById('oneor11too').style.display = "none";
    document.getElementById('ace').innerHTML = "";
    previous += 11;

    if(previous==21){
        document.getElementById("hitText").innerHTML = previous;
        document.getElementById('winOrLose').innerHTML = "You've gotten 21! You win the jackpot!";
        document.getElementById('startOver').style.display="inline";

        document.getElementById('hitButt').disabled = true;
        document.getElementById('standButt').disabled = true;
    }
    else if(previous >21){
        document.getElementById("hitText").innerHTML = previous;
        document.getElementById('winOrLose').innerHTML ="You've gotten over 21! Bust! The dealer had "+ dealer;
        document.getElementById('startOver').style.display="inline";

        document.getElementById('hitButt').disabled = true;
        document.getElementById('standButt').disabled = true;
    }
    else{
        document.getElementById("hitText").innerHTML = previous;
    }
    
    
}

function stand(){
    document.getElementById('startOver').style.display="inline";
    document.getElementById('hitButt').disabled = true;
    document.getElementById('standButt').disabled = true;
    document.getElementById('ace').innerHTML = "";
    document.getElementById('stand').innerHTML = "You stand at "+previous+"! The dealer has "+dealer+"."

    if(Math.abs(21-dealer)>Math.abs(21-previous)){
        document.getElementById('stand').innerHTML += " You are closer to 21 than the dealer! You win!";
    }
    else if(Math.abs(21-previous)>Math.abs(21-dealer)){
        document.getElementById('stand').innerHTML += " The dealer is closer to 21 than you. You lose!";
    }
    else{
        document.getElementById('stand').innerHTML += " You and the dealer are the same number away from 21. You keep your money!";
    }
}

function startOver(){

    previous = 0;
    dealer = 0;
    document.getElementById('hitButt').disabled = false;
    document.getElementById('standButt').disabled = false;
    document.getElementById('stand').innerHTML = "" ;
    document.getElementById('startOver').style.display="none";
    document.getElementById('hitText').innerHTML = "0" ;
    document.getElementById('winOrLose').innerHTML = "" ;
    document.getElementById('cardImages').src = "images/starterImg.png";

}