console.log("welcome to spotify");
let songIndex = 0;
let audioElement = new Audio("song/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName("songItems"));
let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let songlistcontainer = document.getElementById("songlistcontainer");
let songImage = document.getElementById("songImage");

let songs=[
    {SongName: "Kabira",filePath: "song/1.mp3",coverPath: "covers/1.jpg"},
    {SongName: "Kesariya",filePath: "song/2.mp3",coverPath: "covers/2.jpg"},
    {SongName: "Mera Dil Ye Pukare ",filePath: "song/3.mp3",coverPath: "covers/3.jpg"},
    {SongName: "Pata Nahi Kis Roop ",filePath: "song/4.mp3",coverPath: "covers/4.jpg"},
    {SongName: "Raam Siya Raam",filePath: "song/5.mp3",coverPath: "covers/1.jpg"},
    {SongName: "Tu Aake Dekhle",filePath: "song/6.mp3",coverPath: "covers/6.jpg"},
   
    {SongName: "Bairiya",filePath: "song/7.mp3",coverPath: "covers/7.jpg"},
    {SongName: "Kahani Suno",filePath: "song/8.mp3",coverPath: "covers/8.jpg"},
    {SongName: "O bedardiya",filePath: "song/9.mp3",coverPath: "covers/9.jpg"},
    {SongName: "Saya",filePath: "song/10.mp3",coverPath: "covers/10.jpg"},
    {SongName: "Tere havale",filePath: "song/11.mp3",coverPath: "covers/10.jpg"}
   
]


//update song list
songItems.forEach((element,i)=>{
     console.log(element,i);
     element.getElementsByClassName("songName")[0].innerText= songs[i].SongName;
})

//play song and change the play pause button
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-pause')
        gif.style.opacity=1;
        if(songIndex==0){
        songItems[0].style.color="white";
        songItems[0].style.background="aqua";
        }
    }
    else 
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity=0;
    }
}) 

//update seekbar
 audioElement.addEventListener('timeupdate', ()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
     audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
 })



 const makeAllPause = () => {
    console.log("hello");
 Array.from(document.getElementsByClassName('songItems')).forEach((element)=>{
    console.log(element);
    element.style.color="black";
    element.style.background="white";
})
}

//update songitem list according to urrent playing song
Array.from( document.getElementsByClassName('songItems')).forEach((element)=>{
       element.addEventListener('click',(e)=>{
       if(x.matches){
        if(songlistcontainer.style.display == "none"){
            console.log("none")
                songlistcontainer.style.display = "block";
                document.getElementById("playList").style.color = "red";
                songImage.style.display = "none";
            }
            else{
                songlistcontainer.style.display = "none";
                songImage.style.display = "block";
                document.getElementById("playList").style.color= "white";
                playMusic();
            }
       } 
       else{
          playMusic();
       }
     })
})

function playMusic(){
    Array.from( document.getElementsByClassName('songItems')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
    songIndex = parseInt(e.target.id); 
    makeAllPause();
    e.target.style.color="white";
    e.target.style.background="aqua";
    audioElement.src = `song/${songIndex+1}.mp3`;
    songImage.src = `covers/${songIndex+1}.jpg`;
     audioElement.currentTime=0;
     audioElement.play(); 
     masterPlay.classList.remove('fa-circle-play');
     masterPlay.classList.add('fa-pause');
     masterSongName.innerHTML = songs[songIndex].SongName;
     gif.style.opacity=1;
})
})}    

//play previous song
document.getElementById('previous').addEventListener('click',()=>{

    if(songIndex <=0){
        songIndex = songs.length-1;
    }
    else{
    songIndex -=1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play(); 
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause');
    masterSongName.innerHTML = songs[songIndex].SongName;
    gif.style.opacity=1;
    songItems.forEach((element)=>{
        console.log(element);
        element.style.color="black";
        element.style.background="white";
    })
    songItems[songIndex].style.color="white";
    songItems[songIndex].style.background ="aqua";
    songImage.src = `covers/${songIndex+1}.jpg`;
})
  

//play next song
 document.getElementById('next').addEventListener('click',playnext)


function playnext(){
        if(songIndex >=songs.length-1){
            songIndex = 0;
        }
        else{
        songIndex +=1;
        }
        audioElement.src = `song/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play(); 
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause');
        masterSongName.innerHTML = songs[songIndex].SongName;
        console.log(songItems[songIndex]);
        songItems.forEach((element)=>{
            console.log(element);
            element.style.color="black";
            element.style.background="white";
        })
        songItems[songIndex].style.color="white";
        songItems[songIndex].style.background ="aqua";
        gif.style.opacity=1;
        songImage.src = `covers/${songIndex+1}.jpg`;
}

//autoplay next song
audioElement.addEventListener("ended", ()=>{
    playnext();
});

//update timer and duration of songs
console.log(audioElement.currentTime);
setInterval(updateTimer,1000);



function updateTimer() {
    // Check if the current track duration is a legible number
    if (!isNaN(audioElement.duration)) {
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(audioElement.currentTime / 60);
      let currentSeconds = Math.floor(audioElement.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(audioElement.duration / 60);
      let durationSeconds = Math.floor(audioElement.duration - durationMinutes * 60);
      // Adding a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

      curr_time.innerHTML = currentMinutes + ":" + currentSeconds;
      total_duration.innerHTML = durationMinutes + ":" + durationSeconds;
    }
  }
 
document.getElementById("playList").addEventListener("click",()=>{
    if (x.matches) { 
         if(songlistcontainer.style.display == "none"){
            console.log("none")
                songlistcontainer.style.display = "block";
                document.getElementById("playList").style.color = "red";
                songImage.style.display = "none";
             
            }
            else{
            songlistcontainer.style.display = "none";
            songImage.style.display = "block";
            document.getElementById("playList").style.color= "white";
            
            }
        } 
    else{
    if( songlistcontainer.style.visibility == "visible"){
        songlistcontainer.style.visibility = "hidden";
        document.getElementById("playList").style.color = "white";
    }
    else{
    songlistcontainer.style.visibility = "visible";
    document.getElementById("playList").style.color= "red";
    }
}
})




//for media query
function myFunction(x) {
    if (x.matches) { 
        songlistcontainer.style.display = "none"; 
        songImage.style.display = "block";
        songlistcontainer.style.visibility = "visible";
        document.getElementById("playList").style.color= "white";
    } 
    else{

        songlistcontainer.style.display = "block"; 
         songImage.style.display = "block";
         document.getElementById("playList").style.color= "red";
    }
  }
  
  var x = window.matchMedia("(max-width: 1200px)");
 myFunction(x) // Call listener function at run time
 x.addEventListener("change",myFunction);




 