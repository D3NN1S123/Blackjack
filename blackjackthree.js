var previous= 0;
var dealer = 0;
var money = 1000;  
var betAmt = 0;
var b; 

var array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var randomNumArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var counter = 0;



function musicPlay(){
    
    var music = new Audio('audio/music.mp3');
    music.play();

    music.loop = true;
    enter();
}

function enter(){
    document.getElementById('title').innerHTML = "";
    var bankAccOutput = document.getElementById('moneyAmount');

    //starter wallet balance
    bankAccOutput.innerHTML = "Account Balance: $"+money;

    //enter button disappears
    document.getElementById("enter").style.display = "none";

    //bet text, button, and text box appear
    document.getElementById("topText").style.width = "300px";
    document.getElementById("topText").style.height = "800px";
    document.getElementById("centerButton").style.paddingTop = "0px";
    
    document.getElementById("betInst").innerHTML = "Enter your bet amount below, and click 'Place Bet'!";
    document.getElementById("placeBet").style.display = "inline";
    document.getElementById("bet").style.display = "inline";
    document.getElementById('funds').style.display = "inline";
}

function placeBet(){
    //reset the 2 arrays incase someone inputs invalid bet
    
    for(i=0; i<randomNumArray.length; i++){
        randomNumArray[i]=0;
    }

    for(i=0; i<array.length; i++){
        array[i]=0;
    }

    counter = 0;


     //sound play
     var num = Math.floor(Math.random()*3 +1);

     let sound = new Audio('audio/card'+num+'.mp3');
 
     sound.play();

    let sound1 = new Audio('audio/chips1.mp3');
    sound1.play();

    var bankAccOutput = document.getElementById('moneyAmount');
    var output2 = document.getElementById('hitText');

    //generates the 20 random numbers that'll be our cards for this round, making sure there are <=4 of each type of card
    for(i=0; i<randomNumArray.length; i++){
        var a = Math.floor(Math.random()*13 +1);
        array[a]+=1;

        if(array[a]>4){
            i--;
        }
        else{
            randomNumArray[i]=a;
        }
    }


    //bet amount is the amount the player enters into the text box
    betAmt = parseInt(document.getElementById('bet').value.trim());

    //check if amount entered is >wallet balance or <=0
    if(betAmt > money){
        document.getElementById("betInst").innerHTML = "You cannot bet more than you have in your bank account. Please try again.";
    }
    else if(isNaN(betAmt)){
        document.getElementById("betInst").innerHTML = "You must enter a valid bet amount. Please try again."; 
    }
    else if(betAmt <=0){
        document.getElementById("betInst").innerHTML = "You cannot bet a negative amount. Please try again.";
    }
    else{
        document.getElementById('cards').style.display = "inline";
        //remove bet amount from balance
        money -= betAmt;

        //make various texts appear (hand value, new balance)
        document.getElementById('hitText').innerHTML = "0";
        document.getElementById("betInst").innerHTML = "You have placed a bet of $"+betAmt+"! Good luck!";
        bankAccOutput.innerHTML = "Account Balance: $"+money;

        //get rid of bet button+text box, make hit and stand button appear
        document.getElementById("bet").style.display = "none";
        document.getElementById("placeBet").style.display = "none";
        document.getElementById("hitButt").style.display = "inline";
        document.getElementById("standButt").style.display = "inline";

        //display dealer's facedown card
        document.getElementById("dealerFaceDown").src = "images/facedown.png";

        //dealers first face up card
        document.getElementById("dealerCards").src = "images/card"+randomNumArray[counter]+".png";
        
        //add the card value to hand total value
        if((randomNumArray[counter]==11) || (randomNumArray[counter]==12) || (randomNumArray[counter]==13)){
            dealer = dealer + 10;
        }
        else{
            dealer+=randomNumArray[counter];
        }

        counter++;

        //give player their first 2 cards
        document.getElementById('playerFirstCard').src = "images/card"+randomNumArray[counter]+".png";

        if((randomNumArray[counter]==11) || (randomNumArray[counter]==12) || (randomNumArray[counter]==13)){
            previous = previous + 10;
        }
        else if(randomNumArray[counter]==1){
            oneor11();
        }
        else{
            previous+=randomNumArray[counter];
        }

        counter++;
        
        document.getElementById('playerSecondCard').src = "images/card"+randomNumArray[counter]+".png";

        if((randomNumArray[counter]==11) || (randomNumArray[counter]==12) || (randomNumArray[counter]==13)){
            previous = previous + 10;
        }
        else if(randomNumArray[counter]==1){
            oneor11();
        }
        else{
            previous+=randomNumArray[counter];
        }

        counter++;

        output2.innerHTML = previous;
    }
        
}

//if any of the 2 first cards is an ace
function oneor11(){
    document.getElementById('hitButt').disabled = true;
    document.getElementById('standButt').disabled = true;

    document.getElementById('ace').innerHTML = "You have an ace! Do you want it to be used as 1 or 11?";
        
    //display 1 and 11 buttons
    document.getElementById('oneor11').style.display = "inline";
    document.getElementById('oneor11too').style.display = "inline";
}


function hit(){

    //sound play
    var num = Math.floor(Math.random()*3 +1);

    let sound = new Audio('audio/card'+num+'.mp3');

    sound.play();

    //initialize 
    var bankAccOutput = document.getElementById('moneyAmount');
    var output2 = document.getElementById('hitText');
    var output3 = document.getElementById('cardImages');

    //if the card is a face card
    if((randomNumArray[counter]==11) || (randomNumArray[counter]==12) || (randomNumArray[counter]==13)){
        output3.src = "images/card"+randomNumArray[counter]+".png";
        previous = previous + 10;
    }
    //if the card is an ace, choose whether you want it to be 1 or 11
    else if(randomNumArray[counter]==1){

        output3.src = "images/card1.png";

        oneor11();
    }
    else{
        output3.src = "images/card"+randomNumArray[counter]+".png";
        previous+=randomNumArray[counter];
    }

    counter++;

    //display new hand amount
    output2.innerHTML = previous;

    if(previous==21){
        document.getElementById("dealerFaceDown").src = "images/card"+randomNumArray[counter]+".png";

        if((randomNumArray[counter]==11) || (randomNumArray[counter]==12) || (randomNumArray[counter]==13)){
            dealer = dealer + 10;
        }
        else{
            dealer+=randomNumArray[counter];
        }

        counter++;


        //if dealer's hand is still <17 even after flipping up the face down card, flip up another one

        if(dealer <17){
            document.getElementById("dealerExtraCard").src = "images/card"+randomNumArray[counter]+".png";

            if((randomNumArray[counter]==11) || (randomNumArray[counter]==12) || (randomNumArray[counter]==13)){
                dealer = dealer + 10;
            }
            else{
                dealer+=randomNumArray[counter];
            }

            counter++;
        } 
        
        //check if dealer has 21 too, if he does, return bet to player
        if(dealer==21){

             //play chips sound
        let sound1 = new Audio('audio/chips2.mp3');
        sound1.play();

            document.getElementById('winOrLose').innerHTML = "You and the dealer both have 21! Your bet will be returned to you.";

            document.getElementById('hitButt').disabled = true;
            document.getElementById('standButt').disabled = true;

            money += betAmt;

            document.getElementById('startOver').style.display="inline";

        }
         
        else{

             //play chips sound
        let sound1 = new Audio('audio/chips2.mp3');
        sound1.play();

            document.getElementById('winOrLose').innerHTML = "You have 21! The dealer has "+dealer+". You win!"; 

            document.getElementById('hitButt').disabled = true;
            document.getElementById('standButt').disabled = true;

            money += 1.5*betAmt;
            bankAccOutput.innerHTML = "Account Balance: $"+money;
            document.getElementById('startOver').style.display="inline";
        }
    }
    else if(previous>21){

         //flip up the dealers face down card
        document.getElementById("dealerFaceDown").src = "images/card"+randomNumArray[counter]+".png";

        if((randomNumArray[counter]==11) || (randomNumArray[counter]==12) || (randomNumArray[counter]==13)){
            dealer = dealer + 10;
        }
        else{
            dealer+=randomNumArray[counter];
        }

        counter++;

        document.getElementById('winOrLose').innerHTML = "You've gotten over 21! Bust! The dealer had "+dealer+".";

        document.getElementById('startOver').style.display="inline";
        document.getElementById('standButt').disabled = true;
        document.getElementById('hitButt').disabled = true;
    }
    else{

    }
}

function aceOne(){
    var bankAccOutput = document.getElementById('moneyAmount');
    document.getElementById('hitButt').disabled = false;
    document.getElementById('standButt').disabled = false;

    document.getElementById('oneor11').style.display = "none";
    document.getElementById('oneor11too').style.display = "none";
    document.getElementById('ace').innerHTML = "";
    previous += 1;

    if(previous==21){

        document.getElementById("hitText").innerHTML = previous;
        document.getElementById('startOver').style.display="inline";

        document.getElementById('hitButt').disabled = true;
        document.getElementById('standButt').disabled = true;


        //flip up the dealers face down card
        document.getElementById("dealerFaceDown").src = "images/card"+randomNumArray[counter]+".png";

        if((randomNumArray[counter]==11) || (randomNumArray[counter]==12) || (randomNumArray[counter]==13)){
            dealer = dealer + 10;
        }
        else{
            dealer+=randomNumArray[counter];
        }
        counter++;
        
        if(dealer <17){
            document.getElementById("dealerExtraCard").src = "images/card"+randomNumArray[counter]+".png";

            if((randomNumArray[counter]==11) || (randomNumArray[counter]==12) || (randomNumArray[counter]==13)){
                dealer = dealer + 10;
            }
            else{
                dealer+=randomNumArray[counter];
            }

            counter++;
        }

        

        //if we get 21, check if dealer has 21
        if(dealer==21){
            document.getElementById('roundEnd').innerHTML = "You and the dealer both have 21! Your bet has been returned to you.";
            money += betAmt;
            bankAccOutput.innerHTML = "Account Balance: $"+money;
        }
        else{
            document.getElementById('roundEnd').innerHTML = "You got 21! You win! The dealer has "+dealer+".";
            money += 1.5*betAmt;
            bankAccOutput.innerHTML = "Account Balance: $"+money;
        } 
    }
    else if(previous>21){

        //flip up the dealers face down card
        document.getElementById("dealerFaceDown").src = "images/card"+randomNumArray[counter]+".png";

        if((randomNumArray[counter]==11) || (randomNumArray[counter]==12) || (randomNumArray[counter]==13)){
            dealer = dealer + 10;
        }
        else{
            dealer+=randomNumArray[counter];
        }

        counter++;

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

function ace11(){
    var bankAccOutput = document.getElementById('moneyAmount');
    document.getElementById('hitButt').disabled = false;
    document.getElementById('standButt').disabled = false;

    document.getElementById('oneor11').style.display = "none";
    document.getElementById('oneor11too').style.display = "none";
    document.getElementById('ace').innerHTML = "";
    previous += 11;

    if(previous==21){

        document.getElementById("hitText").innerHTML = previous;
        document.getElementById('startOver').style.display="inline";

        document.getElementById('hitButt').disabled = true;
        document.getElementById('standButt').disabled = true;


        //flip up the dealers face down card
        document.getElementById("dealerFaceDown").src = "images/card"+randomNumArray[counter]+".png";

        if((randomNumArray[counter]==11) || (randomNumArray[counter]==12) || (randomNumArray[counter]==13)){
            dealer = dealer + 10;
        }
        else{
            dealer+=randomNumArray[counter];
        }

        counter++;

        if(dealer <17){
            document.getElementById("dealerExtraCard").src = "images/card"+randomNumArray[counter]+".png";

            if((randomNumArray[counter]==11) || (randomNumArray[counter]==12) || (randomNumArray[counter]==13)){
                dealer = dealer + 10;
            }
            else{
                dealer+=randomNumArray[counter];
            }

            counter++;
        }
        //if we get 21, check if dealer has 21
        if(dealer==21){
            document.getElementById('roundEnd').innerHTML = "You and the dealer both have 21! Your bet has been returned to you.";
            money += betAmt;
            bankAccOutput.innerHTML = "Account Balance: $"+money;
        }
        else{
            document.getElementById('roundEnd').innerHTML = "You got 21! You win! The dealer has "+dealer+".";
            money += 1.5*betAmt;
            bankAccOutput.innerHTML = "Account Balance: $"+money;
        } 
    }
    else if(previous>21){

        //flip up the dealers face down card
        document.getElementById("dealerFaceDown").src = "images/card"+randomNumArray[counter]+".png";

        if((randomNumArray[counter]==11) || (randomNumArray[counter]==12) || (randomNumArray[counter]==13)){
            dealer = dealer + 10;
        }
        else{
            dealer+=randomNumArray[counter];
        }

        counter++;

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

     //play chips sound
     let sound1 = new Audio('audio/chips2.mp3');
     sound1.play();

    var bankAccOutput = document.getElementById('moneyAmount');

    //turn up the facedown dealer card
    document.getElementById("dealerFaceDown").src = "images/card"+randomNumArray[counter]+".png";

        if((randomNumArray[counter]==11) || (randomNumArray[counter]==12) || (randomNumArray[counter]==13)){
            dealer = dealer + 10;
        }
        else{
            dealer+=randomNumArray[counter];
        }

        counter++;

    //if dealer's hand is still <17 even after flipping up the face down card, flip up another one
    if(dealer <17){
        document.getElementById("dealerExtraCard").src = "images/card"+randomNumArray[counter]+".png";

        if((randomNumArray[counter]==11) || (randomNumArray[counter]==12) || (randomNumArray[counter]==13)){
            dealer = dealer + 10;
        }
        else{
            dealer+=randomNumArray[counter];
        }

        counter++;
    } 


    if(dealer==21){
        document.getElementById('roundEnd').innerHTML = "The dealer has 21! You lose!";
    }
    else if(dealer>21){
        document.getElementById('roundEnd').innerHTML = "The dealer is above 21! You win!";
        money = money + betAmt*1.5;
        bankAccOutput.innerHTML = "Account Balance: $"+money;
    }
    else if(Math.abs(21-dealer)>Math.abs(21-previous)){
        document.getElementById('roundEnd').innerHTML = " You are closer to 21 than the dealer! You win!";
        money = money + (betAmt*1.5);
        bankAccOutput.innerHTML = "Account Balance: $"+money;

    }
    else if(Math.abs(21-previous)>Math.abs(21-dealer)){
        document.getElementById('roundEnd').innerHTML = " The dealer is closer to 21 than you. You lose!";
    }
    else if(Math.abs(21-previous)==Math.abs(21-dealer)){
        document.getElementById('roundEnd').innerHTML = " You and the dealer are the same number away from 21. Your bet has been returned to you!";
        money = money + betAmt;
        bankAccOutput.innerHTML = "Account Balance: $"+money;
    }



document.getElementById('startOver').style.display="inline";
document.getElementById('hitButt').disabled = true;
document.getElementById('standButt').disabled = true;
document.getElementById('ace').innerHTML = "";
document.getElementById('stand').innerHTML = "You stand at "+previous+". The dealer has "+dealer+"."
}

function startOver(){

    previous = 0;
    dealer = 0;

    //reset the 2 arrays
    for(i=0; i<randomNumArray.length; i++){
        randomNumArray[i]=0;
    }

    for(i=0; i<array.length; i++){
        array[i]=0;
    }
    
    document.getElementById('hitButt').disabled = false;
    document.getElementById('standButt').disabled = false;
    document.getElementById('stand').innerHTML = "" ;
    document.getElementById('startOver').style.display="none";
    document.getElementById('hitText').innerHTML = "" ;
    document.getElementById('winOrLose').innerHTML = "" ;
    document.getElementById('cardImages').src = "images/starterImg.png";
    document.getElementById('dealerCards').src = "images/starterImg.png";
    document.getElementById('dealerFaceDown').src = "images/starterImg.png";
    document.getElementById('dealerExtraCard').src = "images/starterImg.png";
    document.getElementById('playerFirstCard').src = "images/starterImg.png";
    document.getElementById('playerSecondCard').src = "images/starterImg.png";
    document.getElementById("hitButt").style.display = "none";
    document.getElementById("standButt").style.display = "none";
    document.getElementById('roundEnd').innerHTML = "";

    counter = 0;
    enter();
}


