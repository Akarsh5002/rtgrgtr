var dog, happyDog, database, foodS, foodStock,feedTime,lastFed,feed,addFood;
var gg,ff;


function preload()
{
  dogImg = loadImage("dogImg.png");
  dogHappyImg = loadImage("dogImg1.png");
  
  

}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

foodObj = new food();

foodStock = database.ref('Food');
foodStock.on("value",readStock);

  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  feed = createButton("EAT MUKU");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Wanna more");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
 
  
  
 


 


}



function draw() {  
  background("yellow")

  
foodObj.display();

feedTime = database.ref('FeedTime');
feedTime.on("value",function(data){
  lastFed = data.val();
});

  
 
  
    
     
      
  
     
    
  
  
  fill("cyan");
  textSize(17);
  if(lastFed>=12){
    text("Last Fed:"+lastFed%12+"PM",350,30);
  }else if(lastFed=0){
    text("Last Fed: 12 AM",350,30);
  }else{
    text("Last Feed:"+lastFed+"AM",30,30);
  }




  drawSprites();
  
 
  
}

function readStock(data)
{
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(dogHappyImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
foodS++;


  database.ref('/').update({
    Food:foodS
  })
}
