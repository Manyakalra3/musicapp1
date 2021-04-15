window.addEventListener("load", initEvents);
var audio;
var Index=0;
var range;
var data;
// var nxtbtn = document.getElementById('next');

var previous;
var togglePlay;
var currentsong=0;
var togglePlayFlag = true;
function initEvents() {
    audio = document.querySelector('#audio');
    range = document.querySelector("input[type='range']");
    range.addEventListener('change', seekSong);
    togglePlay = document.querySelector('#toggle-play');
    document.querySelector('#stopSong').addEventListener('click', stopSong);
   document.getElementById('next').addEventListener('click',nextSong);
   document.getElementById('previous').addEventListener('click',prevSong);
   total_time = document.querySelector("#total_time");
   song_curr_time = document.querySelector("#current_time");
   document.querySelector("#searchdiv").addEventListener("keyup",searchProduct);
 
    loadAllSongs();
    // document.querySelector("#searcharea").addEventListener('click',searchtext);
    
    loadPlaylist();
   
    
    // totaltime();
}


var row;

function loadAllSongs() {
    var ul = document.querySelector("#all_songs");
    ul.innerHTML="";
    // var ul = div.createElement("ul");
    songs.forEach(function(obj) {
        var li = document.createElement("li");
        var h5 = document.createElement('h5');
        var img = document.createElement("img");
        var add_btn = document.createElement("button");
        var play_btn = document.createElement("button");
      
        previous=document.querySelector("#previous");
        add_btn.className = 'btn btn-primary playlist_btn';
        play_btn.className = 'btn btn-primary play_btn';
        h5.innerHTML = obj.song_name;
        img.src = obj.song_thumbnail;
        add_btn.innerHTML = '<i class="fas fa-plus">';
        play_btn.innerHTML = '<i class="fas fa-play">';
        play_btn.setAttribute('title', obj.song_id);
        add_btn.setAttribute('title', obj.song_id);

        li.appendChild(img);
        li.appendChild(h5);
        li.appendChild(play_btn);
        li.appendChild(add_btn);

        ul.appendChild(li);
        // nxtbtn.addEventListener('click',nextSong);
        play_btn.addEventListener("click", playSong);
        play_btn.addEventListener('click',totaltime);
        add_btn.addEventListener("click", add_to_playlist);


    });
    
}
// var ul= document.querySelector("#all_songs");
// var url="https://raw.githubusercontent.com/Manyakalra3/musicapp/main/assets/js/songs.json";

//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if(this.status == 200 && this.readyState == 4) {
//            var data = this.responseText;
//             data = JSON.parse(data);
//             console.log(data);
//             data.data.forEach(function(obj) { 
//                 var li = document.createElement("li");
//                 console.log(li);
//                 console.log(ul);
//              var h5 = document.createElement('h5');
//         var img = document.createElement("img");
//         var add_btn = document.createElement("button");
//         var play_btn = document.createElement("button");
      
//         previous=document.querySelector("#previous");
//         add_btn.className = 'btn btn-primary playlist_btn';
//         play_btn.className = 'btn btn-primary play_btn';
//         h5.innerHTML = obj.song_name;
//         img.src = obj.song_thumbnail;
//         add_btn.innerHTML = '<i class="fas fa-plus">';
//         play_btn.innerHTML = '<i class="fas fa-play">';
//         play_btn.setAttribute('title', obj.song_id);
//         add_btn.setAttribute('title', obj.song_id);
//         li.appendChild(img);
//         li.appendChild(h5);
//         li.appendChild(play_btn);
//         li.appendChild(add_btn);

//         ul.appendChild(li);
//         // nxtbtn.addEventListener('click',nextSong);
//         play_btn.addEventListener("click", playSong);
//         play_btn.addEventListener('click',totaltime);
//         add_btn.addEventListener("click", add_to_playlist);

        
//              });
//         }
//     }
//     xhttp.open('get',url);
//     xhttp.send();
    
// })
function updateSongStatus(i) {
    current_song_idx = i;
    console.log("playing,",current_song_idx);
    // playSong();
}

function playSong() {
//    var a= document.getElementById("all_songs").getElementsByTagName("li");
    var song_id = this.title;
    for(var i=0;i< songs.length; i++) {
        if (song_id == songs[i].song_id) {
            var song_url = songs[i].song_url;
            current_song_idx=i;
            break;
           
        }
       
    }
    audio.src = song_url;
    audio.play();
    
    // update(Index);
    setInterval(function() {
        range.value = (audio.currentTime / audio.duration) * 100;
        // console.log(range);
        // console.log(audio.currentTime);
        // console.var log("Playing",song_id);
        // audio.currentTime = this.value / 100 * audio.duration;
        var currentmin=parseInt(range.value/60);
        var currentsec=parseInt(range.value%60);
        current_time.innerHTML= "0"+currentmin+":"+currentsec;

    }, 1000);
    updateSongStatus(i);
  totaltime();
       
    togglePlay.innerHTML = '<i class="fas fa-pause"></i>';
    togglePlay.addEventListener('click', togglePlayState);
    togglePlayFlag = false;
   
    
}
function nextSong(){
        for(;Index<songs.length;Index++){
        audio.src = songs[current_song_idx+=1].song_url;
    audio.play();
            totaltime();
    if(current_song_idx+1>=songs.length-1){
        current_song_idx=-1;
    }
    break;
    }
}
    function prevSong(){
   if(current_song_idx>0){
        audio.src = songs[current_song_idx-=1].song_url;
    audio.play();
       totaltime();
   }
    }


function togglePlayState() {
    if(togglePlayFlag) {
        audio.play();
        togglePlay.innerHTML = '<i class="fas fa-pause"></i>';
        togglePlayFlag = false;
    }
    else {
        audio.pause();
        togglePlay.innerHTML = '<i class="fas fa-play"></i>';
        togglePlayFlag = true;
    }

}


function stopSong() {
    audio.currentTime = 0;
    audio.pause();
}

function add_to_playlist() {
    var song_id = this.title;
    for(var i = 0; i < songs.length; i++) {
        if (song_id == songs[i].song_id) {
            var song_obj = songs[i];
            break;
        }
    }
    playlist_obj.addSong(song_obj.song_id, song_obj.song_name,
                         song_obj.song_url, song_obj.song_thumbnail);
                        //  for(var i =0;i<my_playlist.length;i++){
                        //      var obj = my_playlist[i];
                             showPlaylist();
                         
 
}
function deleteSong() {
    var song_id = this.title;
    playlist_obj.deleteSong(song_id);
    showPlaylist();
}

function showPlaylist() {
    var ul = document.querySelector("#playlist");
    ul.innerHTML = "";
    playlist_obj.my_playlist.forEach(function(obj) {
        var li = document.createElement("li");
        var h5 = document.createElement('h5');
        var img = document.createElement("img");
        var delete_btn = document.createElement("button");
        var play_btn = document.createElement("button");
        delete_btn.className = 'btn btn-danger playlist_btn';
        play_btn.className = 'btn btn-primary play_btn';
        h5.innerHTML = obj.name;
        img.src = obj.thumbnail;
        delete_btn.innerHTML = '<i class="fas fa-trash">';
        play_btn.innerHTML = '<i class="fas fa-play">';
        play_btn.setAttribute('title', obj.id);
        delete_btn.setAttribute('title', obj.id);

        li.appendChild(img);
        li.appendChild(h5);
        li.appendChild(play_btn);
        li.appendChild(delete_btn);

        ul.appendChild(li);
        play_btn.addEventListener("click", playSong);
        delete_btn.addEventListener('click', deleteSong);
    });
    savePlaylist();
}

function seekSong() {
    audio.currentTime = this.value / 100 * audio.duration;
    console.log(audio.currentTime);
}


function loadPlaylist() {
    if(window.localStorage) {
        if(localStorage.data) {
            var data = localStorage.getItem('data');
            playlist_obj.my_playlist = JSON.parse(data);
            showPlaylist();
        }
    }
    else {
        alert("Localstorage not supported...");
    }
}
function savePlaylist() {
    if(window.localStorage) {
        var data = JSON.stringify(playlist_obj.my_playlist);
        localStorage.setItem('data', data);
    }
    else {
        alert("Localstorage not supported...");
    }
}
function totaltime(){
    setTimeout(function()
    {
        var duration = audio.duration;
        // slider.max = Tduration;
        // console.log(duration);
        var Totalmin = parseInt(duration/60);
        var Totalsec =parseInt(duration%60);
        total_time.innerHTML = "0"+Totalmin+":"+Totalsec;
    },500)
  
}
// function currenttime(){
// setTimeout(function(){
// var Cduration = audio.currentTime;
// var Cmin = parseInt(Cduration/60);
// var Csec =parseInt(Cduration%60);
// song_curr_time.innerHTML = "0"+Cmin+":"+Csec;
// },200);
// }
function searchProduct() {
    var toSearch = event.srcElement.value;
    // var toSearch = document.getElementById("searchdiv");
    songs = songs.filter(function(obj) {
        return obj.song_name.toLowerCase().includes(toSearch.toLowerCase());
        // loadAllSongs();
    });
    console.log(songs);

    loadAllSongs();

}
// function searchtext(){
    
       
//         var input,song,songid,found;
//         songid=this.title;
//         input = document.getElementById("searchdiv").innerHTML;
//         // 
// var ul=document.getElementById("all_songs");
// var heading=ul.getElementsByTagName("h5");

//     for(var i=0;i<heading.length;i++){
    
    
// if(heading[i].value.indexOf(input)>-1){
//     heading[i].parentElement.style.display="";
//     console.log(heading[i].parentElement+'found');
// }else{
//     heading[i].parentElement.style.display="none";
// }
//     }
       
        

    
            
      
