
class Playlist {
    constructor(id, name, url, thumbnail) {
        this.id = id;
        this.name = name;
        this.song_url = url;
        this.thumbnail = thumbnail;
    }
}

var playlist_obj = {
    "my_playlist" : [],
    addSong : function(id, song_name, url, thumbnail) {
        var obj = new Playlist(id, song_name, url, thumbnail);
        this.my_playlist.push(obj);
        console.log(this.my_playlist);
    },
    deleteSong : function(id) {
        this.my_playlist = this.my_playlist.filter(function(obj) {
            return obj.id != id;
        })
    },
    sortSong : function() {

    },
    searchSong : function(value) {
        // console.log(songs.filter(song => song.includes(value)));
        // return songs.filter(song => song.includes(value));
        
    }
}