const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const mainCard = document.getElementById("mainCard");
let currentList = JSON.parse(localStorage.getItem("myWatchlist")) || [];

function addToWatchlist(movieId) {
  if (currentList.includes(movieId)) {
    alert("This movie is already in your watchlist!");
    return;
  }
  currentList.push(movieId);
  localStorage.setItem("myWatchlist", JSON.stringify(currentList));
  alert("Movie added to your watchlist!");
  console.log(JSON.stringify(currentList));
}

function removeFromWatchlist(movieId) {
  let updatedList = currentList.filter((id) => id !== movieId);
  localStorage.setItem("myWatchlist", JSON.stringify(updatedList));
  alert("Movie removed from your watchlist!");
  window.location.reload();
}

if (searchButton) {
  searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    let movieName = searchInput.value;
    if (!movieName) return alert("Please enter a movie name");
    mainCard.innerHTML = "";
    fetch(`http://www.omdbapi.com/?apikey=5dd3066a&s=${movieName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.Search.forEach((movie) => {
          fetch(`http://www.omdbapi.com/?apikey=5dd3066a&i=${movie.imdbID}`)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              mainCard.innerHTML += `<div class="mainCardContent">
                <img src=${data.Poster} >
                <div id="cardContent">
                    <div id="title">
                        <p id="titleHeading">${data.Title}</p>
                        <p class="rating">⭐ ${data.imdbRating}</p>
                    </div>
                    <div id="highlightBox" > 
                        <p class="runtime" >${data.Runtime}</p>
                        <p class="genre" >${data.Genre}</p>
                        <button onclick="addToWatchlist('${data.imdbID}')"> + Watchlist</button>
                    </div>
                    <p id="description">${data.Plot}</p>
                </div>
            </div>`;
            });
        });
      });
  });
}

if (cardContainer) {
  watchList(currentList);
}

function watchList(list) {
  list.forEach((element) => {
    fetch(`http://www.omdbapi.com/?apikey=5dd3066a&i=${element}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        document.getElementById("cardContainer").innerHTML +=
          `<div class="mainCardContent">
                <img src=${data.Poster} >
                <div id="cardContent">
                    <div id="title">
                        <p id="titleHeading">${data.Title}</p>
                        <p class="rating">⭐ ${data.imdbRating}</p>
                    </div>
                    <div id="highlightBox" > 
                        <p class="runtime" >${data.Runtime}</p>
                        <p class="genre" >${data.Genre}</p>
                        <button onclick="removeFromWatchlist('${data.imdbID}')"> <img src="images/remove icon.svg" alt="remove" width="14" height="14" style="padding-right:4px">Remove from Watchlist</button>
                    </div>
                    <p id="description">${data.Plot}</p>
                </div>
            </div>`;
      });
  });
}
