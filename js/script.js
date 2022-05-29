/* A pokemon 1v1 fighter, first pokemon that inflicts a killing blow wins the game. ( Killing blow == 0hp) */

var startGame = document.querySelector("#start"),
    introGame = document.querySelector("#intro"),
    selectPokemon = document.querySelector("#selectPokemon"),
    corviknightButton = document.querySelector("#corviknightButton"),
    heroImg = document.querySelector("#heroImage"),
    enemyImg = document.querySelector("#enemyImage"),
    heroHp =  document.getElementById('heroHpBar'),
    enemyHp =  document.getElementById('enemyHpBar'),
    enemyInfo = document.getElementById("enemyInfo"),
    heroInfo = document.getElementById("heroInfo"),
    battleText = document.querySelector("#battleText"),
    heroAttacks = document.querySelector("#heroAttacks"),
    backgroundImage = document.querySelector("main"),
    backgroundImages = ['./assets/background-1.png', './assets/background-2.png'];
    battleThemeSource = new Audio('./assets/audio/battleTheme.mp3');
        battleThemeSource.volume = 0.1;


/* Picks a random number between two different numbers, Max / Min */
function randomNum(max, min){
    return Math.floor(Math.random() * (max - min) + min); 
}


/* picks a random number : 0 - 3*/
function randomAttack() {
    return Math.floor(Math.random() * 4);
}


/* Makes a class so you can quickly build pokemons */
class Pokemon {
    constructor(pokemonName, frontImage, backImage, hp, moves) {
        this.name = pokemonName;
        this.frontImage = frontImage;
        this.backImage = backImage;
        this.hp = hp;
        this.moves = moves;
    }
    /* Where I learned it from : https://www.w3schools.com/js/js_classes.asp */
}


/* Makes a new array for a pokemon called Corviknight */
var corviknight = new Pokemon  (
    "corviknight", "./assets/corviknightFront.gif", "./assets/corviknightBack.gif", 100,
        [
            /* Corviknights moves, Max and min number ( randomNum() function ) */
            ["Brave bird", 60, 10],
            ["Body Press", 40, 12],
            ["Roost", 30, 5],
            ["Tackle", 20, 15]
        ]
);


/* Makes a new array for a pokemon called Aeorodactyl */
var darkrai = new Pokemon (
    "darkrai", "./assets/darkraiFront.gif", "./assets/darkraiBack.gif", 100,
        [
            ["Shadow ball", 50, 10],
            ["Dream barrage", 40, 5],
            ["Potion", 50, 10],
            ["Shadow meteor", 40, 22]
        ]
); 


/* The starting screen */
function pokemonSelection() {
    backgroundImage.style.backgroundImage = "url('" + backgroundImages[0] + "')";
    introGame.style.display = 'none';
    selectPokemon.style.display = 'flex';
}


/* When clicked on button that has var corviknightButton attached to it */
corviknightButton.addEventListener("click", function(){

    battleThemeSource.play();

    /* Hiding and revealing html elements */
    selectPokemon.style.display = 'none';
    document.getElementById("battle").style.display = 'flex';
    document.getElementById("battleUi").style.display = 'flex';        
    backgroundImage.style.backgroundImage = "url('" + backgroundImages[1] + "')";

    setTimeout(function(){
        heroInfo.style.display = 'flex';

        /* Visuals for Corviknight */
        document.querySelector("#heroName").innerText = corviknight.name;
        heroHp.style.width = corviknight.hp + "%";
        heroImg.src = corviknight.backImage;

        /* Attacks for Corviknight */
        document.querySelector("#attackOne").innerText = corviknight.moves[0][0];
        document.querySelector("#attackTwo").innerText = corviknight.moves[1][0];
        document.querySelector("#attackThree").innerText = corviknight.moves[2][0];
        document.querySelector("#attackFour").innerText = corviknight.moves[3][0];
        
        /* Animation for enemy Pokemen, on a timer */
        setTimeout(function(){
            document.querySelector("#enemyName").innerText = darkrai.name;
            enemyInfo.style.display = 'flex';
            enemyHp.style.width = darkrai.hp + "%";
            enemyImg.src = darkrai.frontImage;
        }, 1200); 

    }, 1200); 
}); 


/* When user clicks on any attack, attach attack to variable and run heroDamageStep function */
heroAttacks.addEventListener('click', function(e) {

    let attackNumber = e.target.value;
    const damage = randomNum (corviknight.moves[attackNumber][1], corviknight.moves[attackNumber][2]);
    let heroDamage = damage;
    let moveName = corviknight.moves[attackNumber][0];

    /* Runs function heroDamagstep */
    heroDamageStep(heroDamage, moveName, attackNumber) 

});


/* When hero Pokemon initiates an attack */
function heroDamageStep(heroDamage, moveName, attackNumber){
    
    heroAttacks.style.display = 'none';

    /* If the attackNumber number equals 1 of 3 damaging moves */
    if ( corviknight.moves[attackNumber] === corviknight.moves[0] || corviknight.moves[attackNumber] === corviknight.moves[1] || corviknight.moves[attackNumber] === corviknight.moves[3]){
        
        /* Total hp of enemy monster minus the damage of hero attack */
        var updatedEnemyHp = darkrai.hp - heroDamage;
        darkrai.hp = updatedEnemyHp;
        enemyHp.style.width = darkrai.hp + '%';

        /* Animation */
        heroImg.style.width = "283px";
        heroImg.style.bottom = "30%";
        heroImg.style.left = "23%";

    }   
    
    /* If the attackNumber number equals the only healing move */
    else if ( corviknight.moves[attackNumber] === corviknight.moves[2]) {
        
        /* Total hp of hero hp plus the healing amount */
        var updatedEnemyHp = corviknight.hp + heroDamage;
        corviknight.hp = updatedEnemyHp;
        heroHp.style.width = corviknight.hp + '%';  

        /* Animation */
        heroImg.style.bottom = "10%";

        /* A message showing that you used this move, and the amount you healed for. On a timeout. */
        setTimeout(function(){
            battleText.innerHTML = corviknight.name + " heals for " + heroDamage + " Hp!"  ;

        }, 2000);
    }

    battleText.style.display = "block";
    battleText.innerHTML = corviknight.name + " uses " + moveName + "!";
   
   
    if ( heroDamage > 50 ){
    /* If hero deals more than 50 damage */

        /* Timeout so user doesn't get overwhelmed */
        setTimeout(function(){
            battleText.innerHTML = "Critical hit!";
        }, 1000);
    } else if (heroDamage < 20){
    /* If hero deals less than 20 damage */

         /* Timeout so user doesn't get overwhelmed */
         setTimeout(function(){
            battleText.innerHTML = "It wasn't very effective";
        }, 1000);
    }

    /* If enemy hp gets below 40 */
    if ( darkrai.hp <= 40 ) {

        /* Change background color of hp bar */
        enemyHp.style.background = "#ff8d14";

    } else if ( darkrai.hp <= 10 ) {
      /* If enemy hp gets below 10 */ 

        /* Change background color of hp bar */
        enemyHp.style.background = "#730707";
    }


    /* Delay timeout, give user time to breath */
    setTimeout(function(){

        /* If hp of enemy pokemon reaches 0 */
        if (darkrai.hp <= 0){
            enemyHp.style.width = 0;

            /* Important timeout so all the changes don't overlay at once */
            setTimeout(function(){

                /* animation so it's visible when hero wins */
                battleText.innerText = corviknight.name + " Has won this battle!";
                enemyInfo.style.opacity = "0";
                enemyImg.style.opacity = "0"
                enemyHp.style.opacity = "0";
        
                /* Important timeout so all the changes don't overlay at once */
                setTimeout(function(){

                    /* Game ends */
                    alert("Congrats! Thank you for playing");
                    /* Force restart */
                    location.reload()
            
                }, 3000);
            }, 2000);
        } else { 

            /* reverts animation */
            heroImg.style.width = "326px";
            heroImg.style.bottom = "14%";
            heroImg.style.left = "6%";
            
            /* Run enemyBattleStep function */
            enemyBattleStep()
            
        }
    }, 1500);
}


/* Enemy pokemon intiates an attack */ 
function enemyBattleStep(){

    let enemyAttackNumber = randomAttack(4);
    let moveName = darkrai.moves[enemyAttackNumber][0];

    /* creates a random number from 0 - 3 */
   
  
    battleText.style.display = "none";

    setTimeout(function(){
        
        battleText.style.display = "block";
            
        battleText.innerText = darkrai.name + " uses " + moveName + "!";
        
        /* if attack equals 0 - 3  */
        if (enemyAttackNumber == 0 || enemyAttackNumber == 1 || enemyAttackNumber == 3) {
            
            var enemyDamage = randomNum(darkrai.moves[enemyAttackNumber][1], darkrai.hp, darkrai.moves[enemyAttackNumber][1]);
            /* Hero hp minus Max / Min of attack */
            var updatedHeroHp = corviknight.hp - enemyDamage;

            corviknight.hp = updatedHeroHp;
            heroHp.style.width = updatedHeroHp + "%";

            enemyImg.style.width = "225px";
            enemyImg.style.top = "18%";
            enemyImg.style.right = "23%";

        } else if (enemyAttackNumber == 2) {

            var enemyDamage = randomNum(darkrai.moves[2][1], darkrai.hp, darkrai.moves[2][1]);
            var updatedEnemyHp = darkrai.hp + enemyDamage;

            darkrai.hp = updatedEnemyHp;
            enemyHp.style.width = updatedEnemyHp + "%";

           
            enemyImg.style.top = "2%";      

            setTimeout(function(){
                battleText.innerHTML = darkrai.name + " heals for " + enemyDamage + " Hp!"  ;
            }, 1000);
        } 

        if ( enemyDamage > 50 ){
            /* If enemy does over 50 damage */ 
                setTimeout(function(){
                    battleText.innerHTML = "Critical hit!";

                }, 1000);
        } else if ( enemyDamage < 20 ){
            /* If enemy does lower than 20 damage */ 

            setTimeout(function(){
                battleText.innerHTML = "It wasn't very effective..";

            }, 1000);
        }   


        if ( corviknight.hp <= 40 ) {
            /* If hero hp gets below 40 */ 

            /* Change background color of hp bar */
            heroHp.style.background = "#ff8d14";
    
        } else if ( corviknight.hp <= 10 ) {
          /* If hero hp gets below 10 */ 
    
            /* Change background color of hp bar */
            heroHp.style.background = "#730707";
        }
    
       
        /* If heromonster gets below 0, end game */
        if  (corviknight.hp <= 0){
            /* Animation for when hero dies*/
                
            heroHp.style.width = "0";

            /* Important timeout so all the changes don't overlay at once */
            setTimeout(function(){

                /* animation so it's visible when enemy wins */
                battleText.innerText = darkrai.name + " Has won this battle!";
                heroInfo.style.opacity = "0";
                heroImg.style.opacity = "0"
                heroHp.style.opacity = "0";
                enemyImg.style.top = "6%";
                enemyImg.style.right = "6%";
            
                /* Important timeout so all the changes don't overlay at once */
                setTimeout(function(){
    
                    /* Game ends */
                    alert("Good try! Care for another go?");
                    /* Force restart */
                    location.reload()
                
                }, 3000);
            }, 2000);
        }
        else {
            setTimeout(function(){
                /* Styling animation of enemy pokemon */
                enemyImg.style.top = "6%";
                enemyImg.style.right = "6%";
                enemyImg.style.width = "178px";
                battleText.style.display = "none";

                /* Displays the overview of Hero attacks */
                heroAttacks.style.display = 'flex';   
            }, 1500); 
        }
    }, 3000);
     
}


startGame.addEventListener('click', pokemonSelection);


/* Sources 

Audio
    battleTheme.mp3 : https://www.youtube.com/watch?v=rXefFHRgyE0&t=80s 

logo : https://en.wikipedia.org/wiki/Pok%C3%A9mon

Pokemon gifs
    corviknightFront.gif : https://pokemon.neoseeker.com/wiki/Corviknight
    corviknightBack.gif : https://www.smogon.com/forums/threads/custom-3d-animated-renders.3526922/page-11

    darkraiFront.gif : https://www.pokencyclopedia.info/en/index.php?id=sprites/491
    darkraiBack.gif : https://www.pokencyclopedia.info/en/index.php?id=sprites/491

Background Images
    background.jpg : https://www.reddit.com/r/PokemonSwordAndShield/comments/de6qvy/lets_appreciate_the_beauty_that_is_the_galar/
    background-1.jpg : https://hypebeast.com/2018/7/pokemon-lets-go-pikachu-eevee-nostalgia
    background-2.png :https://aminoapps.com/c/pokeartanddrawing/page/blog/shiyaini/a7d0_X5C0uKY0m05nxlgjaka3j41ozMxq6

*/ 