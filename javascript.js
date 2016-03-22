$(document).ready(function() {

  function Jukebox() {
    // initial setup
    this.i = 0
    this.song_list = []
    // this.collection = []

    this.track = function(title, artist, url) {
      this.title = title
      this.artist = artist
      this.url = url
    }

    var song1 = new this.track("Gymnopedie", "Erik Satie", "song1.mp3")
    var song2 = new this.track("Good to Love", "FKA Twigs", "song2.mp3")
    var song3 = new this.track("Some Minds", "Flume", "song3.mp3")
    var song4 = new this.track("Maad City", "Kendrick Lamar", "song4.mp3")

    this.add_track = function(obj) {
      this.song_list.push(obj)
    }
    this.add_track(song1)
    this.add_track(song2)
    this.add_track(song3)
    this.add_track(song4)

    // this.add_collection = function(obj) {
    //   this.collection.push(obj)
    // }
    // this.add_collection(song1)
    // this.add_collection(song2)
    // this.add_collection(song3)
    // this.add_collection(song4)


// ========== show the collection list (only runs once) (did not finish) ===========
  // for (var x = 0; x < this.collection.length; x++) {
  //   $("#collectionlist").append("<li class=\'collect" + (x+1) + "\'" + ">Title: " + this.collection[x].title + "<br>" + "Artist: " + this.collection[x].artist + "<br><button class=\'collectionClass\' id=\'addButton" + (x+1) + "\'" + ">Play</button></li>")
  // };
// ==============================================


// ========= displaying the Queue list and setting up class name ===============
  // this.showQueueList = function() {
    for (var x = 0; x < this.song_list.length; x++) {
      $("#playlist").append("<li class=\'item" + (x+1) + "\'" + ">Title: " + this.song_list[x].title + "<br>" + "Artist: " + this.song_list[x].artist + "</li>")
    };
  // }

  // this.showQueueList()
// ===============================================================================

// ============ update Queue list runs after every action ===========
// ===== its setting the queue list using the this.i index ======
    this.updatePlaylist = function() {
      var newArray = this.song_list.splice(this.i)
      var tempArray = newArray.concat(this.song_list)

      for (var x = 0; x < tempArray.length; x++) {
        $(".item"+(x+1)).html("Title: " + tempArray[x].title + "<br>" + "Artist: " + tempArray[x].artist)
      };
      this.song_list = this.song_list.concat(newArray)
    }
// =======================================================

// ======== variable functions for buttons =========
      this.current_title_artist = function() {
        $("#title").html("Title: " + this.song_list[this.i].title)
        $("#artist").html("Artist: " + this.song_list[this.i].artist)
      }
      this.next_title_artist = function() {
        $("#nextTitle").html("Title: " + this.song_list[this.i+1].title)
        $("#nextArtist").html("Title: " + this.song_list[this.i+1].artist)
      }
      this.set_audiotag_play = function() {
        $("#audiotag").attr("src", this.song_list[this.i].url)
        $("#audiotag")[0].play()
      }
      this.first_title_artist = function() {
        $("#nextTitle").html("Title: " + this.song_list[0].title)
        $("#nextArtist").html("Title: " + this.song_list[0].artist)
      }

      this.current_next_play_update = function() {
        $("#title").html("Title: " + this.song_list[this.i].title)
        $("#artist").html("Artist: " + this.song_list[this.i].artist)
        $("#nextTitle").html("Title: " + this.song_list[this.i+1].title)
        $("#nextArtist").html("Title: " + this.song_list[this.i+1].artist)
        $("#audiotag").attr("src", this.song_list[this.i].url)
        $("#audiotag")[0].play()
        var newArray = this.song_list.splice(this.i)
        var tempArray = newArray.concat(this.song_list)
          for (var x = 0; x < tempArray.length; x++) {
           $(".item"+(x+1)).html("Title: " + tempArray[x].title + "<br>" + "Artist: " + tempArray[x].artist)
          };
          this.song_list = this.song_list.concat(newArray)
        }

// =============================================

    this.play = function() {
      this.current_next_play_update()
    }

    this.pause = function() {
      $("#audiotag")[0].pause()
    }

    this.back = function() {
      if (this.i < 0) {
        this.current_next_play_update()
      }
      else {
        this.i -= 1
        this.current_next_play_update()
      }
    }

    this.forward = function() {
      if (this.i + 1 == this.song_list.length) {
        this.i = 0
        this.current_next_play_update()
      }
      else {
        this.i += 1
        this.current_title_artist()
        this.set_audiotag_play()
          if (this.i + 1 == this.song_list.length) {
            this.first_title_artist()
          }
          else {
            this.next_title_artist()
          }
        this.updatePlaylist()
      }
    }

    this.random = function() {
      var min = 0
      var max = this.song_list.length
      var random = Math.floor(Math.random() * (max - min)) + min
      this.i = random
      this.current_title_artist()
      this.set_audiotag_play()
      if (this.i + 1 == this.song_list.length) {
            this.first_title_artist()
          }
          else {
            this.next_title_artist()
          }
      this.updatePlaylist()
    }

// =========== timer ==============
  this.updatetime = function() {
    var seconds = Math.floor($("#audiotag")[0].currentTime)
    var hours   = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
    var seconds = seconds - (hours * 3600) - (minutes * 60);

    if (seconds < 10) {
      $("#timer").html("Timer: " + minutes + ":0" + seconds)
    }
    else {
      $("#timer").html("Timer: " + minutes + ":" + seconds)
    }
  }

  $("#audiotag")[0].addEventListener("timeupdate", this.updatetime)
// ==============================

};
// end of jukebox object

// initializing object
  var jukebox = new Jukebox()


// ============= on click of link add object into queue (did not finish) ================
    // $(".collectionClass").click(function() {
    //   var index = $(this).attr('id').slice(-1)
    //   console.log(jukebox.song_list)
    //   jukebox.song_list.push(jukebox.collection[index])
    //   jukebox.showQueueList()
    // })

// ====================================================================

// on click
  $("#play").click(function() {
    jukebox.play()
  })

  $("#pause").click(function() {
    jukebox.pause()
  })

  $("#back").click(function() {
    jukebox.back()
  })

  $("#forward").click(function() {
    jukebox.forward()
  })

  $("#random").click(function() {
    jukebox.random()
  })


})
// end of document ready