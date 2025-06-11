document.addEventListener('DOMContentLoaded', () => {
  fetch('./data/data.json')
    .then(res => res.json())
    .then(data => {
      const playlists = data.playlists;
      const randomIdx = Math.floor(Math.random() * playlists.length);
      const playlist = playlists[randomIdx];

      // Update playlist card
      document.getElementById('featured-playlist-img').src = playlist.playlist_art || 'assets/img/playlist.png';
      document.getElementById('featured-playlist-title').textContent = playlist.playlist_name || 'Playlist Title';
      document.getElementById('featured-playlist-author').textContent = playlist.playlist_author ? `By ${playlist.playlist_author}` : '';
      document.getElementById('featured-playlist-description').textContent = playlist.description || '';

      // Update songs (limit to 5)
      const songList = document.getElementById('featured-song-list');
      songList.innerHTML = '';
      playlist.songs.slice(0, 5).forEach(song => {
        songList.insertAdjacentHTML('beforeend', `
          <li>
            <article class="featured-song">
              <img src=${song.cover || ''} class="featured-song-img" alt="Song Image">
              <section class="featured-song-description">
                <h3 class="featured-song-title">${song.title || ''}</p>
                <h3 class="featured-song-album">${song.album || ''}</h3>
                <p class="featured-song-author">${song.author || ''}</h3>
              </section>
            </article>
          </li>
        `);
      });
    });
});