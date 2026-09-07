const searchButton = document.getElementById("searchButton")
const searchInput = document.getElementById("searchInput")

searchButton.addEventListener("click", () => {
    let movieName = searchInput.value
    event.preventDefault()
    fetch(`http://www.omdbapi.com/?apikey=5dd3066a&t=${movieName}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
})

