const playlists = document.querySelectorAll('.playlist');

playlists.forEach(playlist => {
  const dialog = playlist.querySelector('dialog');
  const likeBtn = playlist.querySelector('.likeBtn');
  const likeBtns =  document.getElementsByClassName("likeBtn")


  let liked = false
  
  // Prevent card click when likeBtn is clicked
if (likeBtn) {
  likeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    // Toggle only this button
    if (this.innerHTML === "♡") {
      this.innerHTML = "♥";
      this.style.fontSize = "30px";
      t
    } else {
      this.innerHTML = "♡";
      this.style.fontSize = "16px"; // or your default size
    }
  });
}
document.querySelectorAll('.playlist').forEach(playlist => {
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
});


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