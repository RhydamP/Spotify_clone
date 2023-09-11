console.log('Welcome');
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById("masterSongName");
let songs = [
    {songName: "With You"           ,filePath: "songs/1.mp3", coverPath:"img1.jpg" },
    {songName: "Heeriye"            ,filePath: "songs/2.mp3", coverPath:"img2.jpg" },
    {songName: "Left Right"         ,filePath: "songs/3.mp3", coverPath:"img3.jpeg" },
    {songName: "Praagya - Khel"     ,filePath: "songs/4.mp3", coverPath:"img4.jpeg" },
    {songName: "Taaj"               ,filePath: "songs/5.mp3", coverPath:"img5.jpeg" },
    {songName: "Under The Influence",filePath: "songs/6.mp3", coverPath:"img6.jpeg" },
    {songName: "Praise The Lord"    ,filePath: "songs/7.mp3", coverPath:"img7.jpeg" },
]
songItems.forEach((element,i)=>{
    console.log(element);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
// play/pause
masterPlay.addEventListener('click' , ()=>{
    console.log('masterPlay clicked');
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-solid","fa-play");
        masterPlay.classList.add("fa-solid","fa-pause"); 
        gif.style.opacity= 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-solid","fa-pause");
        masterPlay.classList.add("fa-solid","fa-play");
        gif.style.opacity= 0;
    }
})
//progressbar
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100).toFixed(2);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime =myProgressBar.value*audioElement.duration/100;
     
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove("fa-solid","fa-pause");
        element.classList.add("fa-solid","fa-play");
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-solid","fa-play");
        e.target.classList.add("fa-solid","fa-pause"); 
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.currentTime=0;
        audioElement.play();
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play();
            masterPlay.classList.remove("fa-solid","fa-play");
            masterPlay.classList.add("fa-solid","fa-pause"); 
            gif.style.opacity= 1;
        }
        else{
            audioElement.pause();
            masterPlay.classList.remove("fa-solid","fa-pause");
            masterPlay.classList.add("fa-solid","fa-play");
            gif.style.opacity= 0;
        } 
    })
})
document.getElementById('next').addEventListener('click',()=>{
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-solid","fa-play");
    masterPlay.classList.add("fa-solid","fa-pause");
    gif.style.opacity= 1;
})
document.getElementById('previous').addEventListener('click',()=>{
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-solid","fa-play");
    masterPlay.classList.add("fa-solid","fa-pause");
    gif.style.opacity= 1;
})
