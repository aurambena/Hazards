//Random colors code
//create color pairs array
let imagesArray = ['./images/1.jpeg','./images/2.jpeg','./images/3.jpeg','./images/4.jpeg',
    './images/5.jpeg', './images/6.jpeg','./images/1.png','./images/2.png','./images/3.png',
    './images/4.png','./images/5.png', './images/6.png'];
//Create empty array
let randomNumbers = [];
numberImages = imagesArray.length;

//Assign random number between 0 and 29 (number of colors)
for(let k=0; k<numberImages;k++){            
    for(let j=0; j<numberImages;j++){   
        let total = numberImages;         
        let random =(Math.random()*((total)-1)).toFixed();
        //if random number is not include, it is added to the new array
        if(!randomNumbers.includes(random)){      
            randomNumbers.push(random);
            //if the array size is minor than boxes number, it assigns a new random number and repeat the loop
        }else if(randomNumbers.length<numberImages){
            for(let i=0; i<numberImages;i++){                    
                let random =(Math.random()*((total)-1)).toFixed();
                if(!randomNumbers.includes(random)){
                randomNumbers.push(random);
                }
            }
        }
    }
}


//Select droppable area, in this case a section tag with id=container
let droppableArea = document.getElementById('container');

//Create div tags and add attributes
for (let i=0; i<numberImages; i++){
    let divs = document.createElement('img');
    //Attribute allows drag items if it is true
    divs.setAttribute('draggable', 'false');
    //Attribute class images
    divs.setAttribute('class', 'images');
    //Attribute class width
    divs.setAttribute('width', 200);
    //Attribute class height
    divs.setAttribute('height', 200);
    //Attribute class height
    divs.setAttribute('data-set', 'pictures');
    //Attribute class height
    divs.setAttribute('status', 'close');
    //Attribute data-color assigning a random color for each div
    divs.setAttribute('src', imagesArray[Number(randomNumbers[i])]);
     //Attribute data-color assigning a random color for each div
     divs.setAttribute('data-id', imagesArray[Number(randomNumbers[i])]);
    //Insert div tags to the section tag, index.html file
    droppableArea.appendChild(divs);
    
}

//Select all colors class items
let images = document.getElementsByClassName('images');
let click = [];

//Walk through the colors class elements
for(let c of images){
    //Set the box background color style
    c.setAttribute('src', './images/darkblue.png');
    //Add event when click over a box
    c.addEventListener('click', ()=>{
            //Attribute class height
            c.setAttribute('status', 'open');
            //when click, get real color from the attribute data-color 
            let picture = c.dataset.id;
            //Reveal the real color 
            c.setAttribute('src', picture)  ;
            //Activate drag function changing the attribute state
            c.setAttribute('draggable', 'true');
            //add color to the empty array
            click.push(c);
            //if there is 2 boxes that not match, they turn back to black
            if(click.length > 1 ){
                c.src = './images/darkblue.png'; 
            }     
    });

    //Drag and drop code
    //Drag event
    c.addEventListener ('dragstart', (e)=>{
        //get a reference to the element that the user dragged, get real color from drag area(box)
        e.dataTransfer.setData('id', e.target.dataset.id);        
    });

    //Drop event
    c.addEventListener('drop', function dropp (e){
        e.preventDefault();
        //Get real color from drop area(box)
        const data = e.dataTransfer.getData('id');  
        
        //if drag area color equal to drop area color and the click had changed the attribute value to true
        if (e.target.dataset.id.slice(9,10) === data.slice(9,10) && click[0].getAttribute('draggable') === 'true'){ 
            //Get the real color
            let matchId = c.dataset.id;
            //Reveal the real image 
            c.setAttribute('src', matchId) ;
            //Change the drop area attribute to false and remove the drop event, in order to keep it in that way
            c.setAttribute('draggable', 'false');
            c.removeEventListener('drop', dropp);
            //Change the drag area attibute to false and remove the drop event, in order to keep it in that way
            click[0].setAttribute('draggable', 'false');
            click[0].removeEventListener('drop', dropp);
            //Empty array click to start again
            click.splice(0, click.length);
            //Code to check if the color match had been completed
            //Select all div elements
            let divsColors = document.getElementsByTagName('img');
            //Number of div tags
            numberOfDivs = divsColors.length;
            counter=0;
            
            //Walk through the colors backgrounds
            for (let d of divsColors){
              
                //If the color is different to black the counter add 1
                if(d.src != 'http://localhost:5500/images/darkblue.png'){
                    counter = counter+1;
                    
                    //if counter is equal to number of div tags, the game is over
                    if(counter == numberOfDivs){ 
                        
                        // //Create a new p tag
                        let youWon = document.createElement('p');
                        // //Add text and style
                        minutesLabel = minutesLabel.innerHTML
                        secondsLabel = secondsLabel.innerHTML
                        console.log(minutesLabel,secondsLabel);
                        
                        // youWon.textContent = `Ganaste!!, Tu tiempo fue: ${minutesLabel}:${secondsLabel} `;
                        youWon.style.fontSize = '50px';
                        youWon.style.color = 'red';
                        youWon.style.marginLeft = '50px';
                        //Insert to the index.html the text "you won" and the time 
                        let firstMain = document.getElementById('clock');
                        firstMain.insertBefore(youWon,firstMain.firstElementChild);
                    }
                }

            }
        //if drag area color different to drop area color, then, it changes the attribute value to false and color to black
        }else{
            click[0].src = './images/darkblue.png';
            click[0].setAttribute('draggable', 'false');
            //Set the array to empty to start again
            click.splice(0, click.length);
        }
    });
    //Dragover event
    droppableArea.addEventListener('dragover', (e)=>{
        //enables it to receive drop events
        e.preventDefault();
    }); 
}

//Timer
var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");
        var totalSeconds = 0;
        setInterval(setTime, 1000);

        function setTime()
        {
            ++totalSeconds;
            secondsLabel.innerHTML = pad(totalSeconds%60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
        }

        function pad(val)
        {
            var valString = val + "";
            if(valString.length < 2)
            {
                return "0" + valString;
            }
            else
            {
                return valString;
            }
        }
