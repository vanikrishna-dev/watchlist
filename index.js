const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const mainCard = document.getElementById("mainCard");

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
                        <button>Watchlist</button>
                    </div>
                    <p id="description">${data.Plot}</p>
                </div>
            </div>`;
          });
      });
    });
});
