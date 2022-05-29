var startGame = document.querySelector("#start");
var introGame = document.querySelector("#intro");
var pokemonPick = document.querySelector("#selectPokemon");
var pikachuB = document.querySelector("#pikachuButton");
var charmanderB = document.querySelector("#charmanderButton");
var gengarB = document.querySelector("#gengarButton");
var heroI = document.querySelector("#heroImage");
var heroN = document.querySelector("#heroName");
var enemyN = document.querySelector("#enemyName");
var enemyI = document.querySelector("#enemyImage");
var heroHp =  document.getElementById('heroHpBar');
var enemyHp =  document.getElementById('enemyHpBar');

class pokemon {
    constructor(pokemonName, frontImage, backImage, hp, moves) {
        this.name = pokemonName;
        this.frontImage = frontImage;
        this.backImage = backImage;
        this.hp = hp;
        this.moves = moves
    }
}

var charmander = new pokemon  (
    "charmander", "./assets/charmanderFront.png", "./assets/charmanderBack.gif", 100,
        [
            ["Scratch", randomNum(25, 15)],
            ["Flamethrower", randomNum(50, 5)],
            ["Ember", randomNum(30, 15)],
            ["Tackle", randomNum(10, 40)]
        ]
);
var gengar = new pokemon (
    "Gengar", "./assets/charmanderFront.png", "./assets/charmanderBack.gif", 100,
        [
            ["Scratch", randomNum(100, 40)],
            ["Flamethrower", randomNum(100, 40)],
            ["Ember", randomNum(10, 40)],
            ["Tackle", randomNum(100, 40)]
        ]
);
startGame.addEventListener('click', function(){
    document.getElementById("intro").style.display = 'none';
    document.getElementById("selectPokemon").style.display = 'flex';
});

var attackOne = document.querySelector("#attackOne");
var attackTwo = document.querySelector("#attackTwo");
var attackThree = document.querySelector("#attackThree");
var attackFour = document.querySelector("#attackFour");

/*



Try doing the same thing you did with attacks -> storing the variable -> 3 event listeners 
for 3 pokemon but one function.




*/
function randomNum(max, min){
     return Math.floor(Math.random() * (max - min) + min); 
}

charmanderB.addEventListener('click', function(){
    /* Hiding and revealing html elements */
    document.getElementById("selectPokemon").style.display = 'none';
    document.getElementById("heroAttacks").style.display = 'flex';
    document.getElementById("heroHpContainer").style.display = 'flex';
    document.getElementById("heroInfo").style.display = 'flex';

    /* Visuals for Pikachu */
        heroN.innerHTML = charmander.name;
        heroHp.style.width = charmander.hp + "%";
        heroI.src = charmander.backImage;
        /* Attacks for Pikachu */
        attackOne.innerHTML = charmander.moves[0][0];
        attackTwo.innerHTML = charmander.moves[1][0];
        attackThree.innerHTML = charmander.moves[2][0];
        attackFour.innerHTML = charmander.moves[3][0];

    /* "Animation" fpr enemy Pokemen */
    setTimeout(function(){
        document.getElementById("enemyInfo").style.display = 'flex';
        enemyN.innerHTML = gengar.name;
        enemyHp.style.width = gengar.hp + "%";
        enemyI.src = gengar.frontImage;
    }, 1000); 
});



function move1(heroDamage) {
    var heroDamage = charmander.moves[0][1];
    
    setTimeout(function(){
        attackOne.innerText = 'Used';
        attackOne.style.background = 'gray'
    }, 500); 

    var heroAttack = true;

    if(heroAttack == true) {
        heroDamageStep(heroDamage)  
    }
}

function move2(heroDamage) {
    var heroDamage = charmander.moves[1][1];
    setTimeout(function(){
        attackTwo.innerText = 'Used';
        attackTwo.style.background = 'gray'
    }, 500); 

    var heroAttack = true;

    if(heroAttack == true) {
        heroDamageStep(heroDamage)
    }
    
}

function move3(heroDamage) {
    var heroDamage = charmander.moves[2][1];
    setTimeout(function(){
        attackThree.innerText = 'Used';
        attackThree.style.background = 'gray'
    }, 500); 

    var heroAttack = true;

    if(heroAttack == true) {
        heroDamageStep(heroDamage)
    }
   
}

function move4() {
    var heroDamage = charmander.moves[3][1];
    setTimeout(function(){
        attackFour.innerText = 'Used';
        attackFour.style.background = 'gray'
    }, 500); 

    var heroAttack = true;

    if(heroAttack == true) {
        heroDamageStep(heroDamage)
    }
}


attackOne.addEventListener('click', move1);
attackTwo.addEventListener('click', move2);
attackThree.addEventListener('click', move3);
attackFour.addEventListener('click', move4);


/*  Current problem, hp does not go - visually -> gengar.hp updates, though it doesnt reflect in CSS  */

function heroDamageStep(heroDamage){

    var updatedEnemyHp = gengar.hp - heroDamage; 

    gengar.hp = updatedEnemyHp;

    enemyHp.style.width = gengar.hp + '%';
    
    if (gengar.hp <= 0){
        alert("Congrats! You have won this battle.");
    }
    else {
        
        alert("You did " + updatedEnemyHp + " damage");
        enemyBattleStep()
    }

    enemyHp.style.width = updatedEnemyHp + '%';
}

function enemyBattleStep(){
    function getRandomInt() {
        return Math.floor(Math.random() * 4);
    }
  
    document.getElementById("heroAttacks").style.display = 'none';
    var attackId = getRandomInt(4);
    var moveName = gengar.moves[attackId][0];
    alert("Gengar uses " + moveName)

    setTimeout(function(){
        if (attackId == 0) {
            var updatedHeroHp = charmander.hp - gengar.moves[0][1];
            heroHp.style.width = updatedHeroHp + '%';
            alert(updatedHeroHp);
        }
        else if (attackId == 1) {
            var updatedHeroHp = charmander.hp  - gengar.moves[1][1];
            heroHp.style.width = updatedHeroHp + '%';
            alert(updatedHeroHp);
        }
        else if (attackId == 2) {
            var updatedHeroHp = charmander.hp - charmander.moves[2][1];
            heroHp.style.width = updatedHeroHp + '%';
            alert(updatedHeroHp);
        }
        else if (attackId == 3) {
            var updatedHeroHp = charmander.hp - charmander.moves[3][1];
            heroHp.style.width = updatedHeroHp + '%';
            alert(updatedHeroHp);
        }
    }, 500); 
     
    if (heroHp <= 0){
        alert("Congrats! You have won this battle.")
    }
    else {
        document.getElementById("heroAttacks").style.display = 'flex';
        
    }
}
