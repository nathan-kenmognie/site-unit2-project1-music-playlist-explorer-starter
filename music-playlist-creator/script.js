const playlists = document.querySelectorAll('.playlist');

playlists.forEach(playlist => {
  const dialog = playlist.querySelector('dialog');
  const likeBtn = playlist.querySelector('.likeBtn');
  const likeCount = playlist.querySelector('.like-count');

  if (likeBtn && likeCount) {
    likeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (this.innerHTML === "♡") {
        this.innerHTML = "♥";
        this.style.fontSize = "30px";
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
      } else {
        this.innerHTML = "♡";
        this.style.fontSize = "16px";
        likeCount.textContent = Math.max(0, parseInt(likeCount.textContent) - 1);
      }
    });
  }

  if (dialog) {
    playlist.addEventListener('click', (e) => {
      // Only open dialog if not clicking the likeBtn
      if (!e.target.classList.contains('likeBtn')) {
        dialog.showModal();
      }
    });

    dialog.addEventListener('click', e => e.stopPropagation());
    const closeBtn = dialog.querySelector('.closeBtn');
    if (closeBtn) {
      closeBtn.onclick = (event) => {
        event.stopPropagation();
        dialog.close();
      };
    }
    dialog.addEventListener('click', function(event) {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  }
});

const jsonFetch = fetch('./data/data.json').then(response => response.json());  

jsonFetch.then(jsonData => {jsonFunction(jsonData)});


const playlistCards = document.getElementById('playlist-cards');


let jsonFunction = (jsonData) => {
  playlistCards.innerHTML = ""; // Clear any existing cards




  jsonData.playlists.forEach((playlist,idx) => {
    // Build songs HTML for the modal
    const songsHTML = playlist.songs.map(song => `
      <article>
        <img src=${song.cover || "Song Cover"} alt="Song Image">
        <div class="description">
          <h4>${song.title || "Song Title"}</h4>
          <p>${song.author || "Artist Name"}</p>
          <p>${song.album || "Album Name"}</p>
        </div>
        <audio controls>
          <source src="assets/audio/random-kalimba-a-288207.mp3" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </article>
    `).join('');

    // Build the playlist card HTML
    const cardHTML = `
      <article class="playlist  data-playlist-idx="${idx}">
        <img src="${playlist.playlist_art || 'assets/img/playlist.png'}" class="playlist-image" alt="Playlist Image">
        <h2>${playlist.playlist_name || "Playlist"}</h2>
        <span class="playlist-author">${playlist.playlist_author || "Author Name"}</span>
        <div class="like-row">
            <button class="likeBtn" aria-label="Like Playlist">&#9825;</button>
            <span class="like-count">${playlist.likes || "Likes"}</span>
        </div>
        <dialog>
          <div class="playlist-details">
            <button class="closeBtn" aria-label="Close">&times;</button>
            <div class="playlist-header">
            
              <img src="${playlist.playlist_art || 'assets/img/playlist.png'}" alt="Playlist Image" class="playlist-image">
              <div class="playlist-info">
                <h2>${playlist.playlist_name || "Playlist Title"}</h2>
                <h3>${playlist.playlist_author || "Creator Name"}</h3>
                <p>${playlist.description || "Description"}</p>
                <button class="shuffleBtn" aria-label="Shuffle Playlist">Shuffle</button>

              </div>
            </div>
          </div>
          <div class="playlist-songs">
            ${songsHTML}
          </div>
        </dialog>
      </article>
    `;
    playlistCards.insertAdjacentHTML('beforeend', cardHTML);
  });

  // After cards are generated, re-attach event listeners
  attachPlaylistListeners();
};

// Attach like and modal listeners to dynamically created cards
function attachPlaylistListeners() {
  document.querySelectorAll('.playlist').forEach(playlist => {
    const dialog = playlist.querySelector('dialog');
    const likeBtn = playlist.querySelector('.likeBtn');
    const likeCount = playlist.querySelector('.like-count');
    const shuffleBtn = playlist.querySelector('.shuffleBtn');

    if (likeBtn && likeCount) {
      likeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (this.innerHTML === "♡") {
          this.innerHTML = "♥";
          this.style.fontSize = "30px";
          likeCount.textContent = parseInt(likeCount.textContent) + 1;
        } else {
          this.innerHTML = "♡";
          this.style.fontSize = "16px";
          likeCount.textContent = Math.max(0, parseInt(likeCount.textContent) - 1);
        }
      });
    }

    if (dialog) {
      playlist.addEventListener('click', (e) => {
        if (!e.target.classList.contains('likeBtn')) {
          dialog.showModal();
        }
      });

      dialog.addEventListener('click', e => e.stopPropagation());
      const closeBtn = dialog.querySelector('.closeBtn');
      if (closeBtn) {
        closeBtn.onclick = (event) => {
          event.stopPropagation();
          dialog.close();
        };
      }
      dialog.addEventListener('click', function(event) {
        if (event.target === dialog) {
          dialog.close();
        }
      });

      // Shuffle button functionality
      if (shuffleBtn) {
        shuffleBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          const songs = Array.from(dialog.querySelectorAll('.playlist-songs article'));
          const shuffledSongs = songs.sort(() => Math.random() - 0.5);
          const songsContainer = dialog.querySelector('.playlist-songs');
          songsContainer.innerHTML = ''; // Clear existing songs
          shuffledSongs.forEach(song => songsContainer.appendChild(song)); // Append shuffled songs
        });
      }
    }
  });
}

// Fetch and generate cards
fetch('./data/data.json')
  .then(response => response.json())
  .then(jsonData => { jsonFunction(jsonData); });