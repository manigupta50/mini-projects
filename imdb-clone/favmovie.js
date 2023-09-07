$('document').ready(() => {
    
    let movies = JSON.parse(window.localStorage.getItem('favoriteMovies'));
    // console.log(movies);

    // Function to List Down all the Favorite Movie List
    let listOfMovies = $("#fav-movies").append('<ul id="fav-movies-list"><u>Favorite Movies</u></u>').find('ul');
    for(let i = 0; i < movies.length; i++) {
        axios.get('http://www.omdbapi.com/?apikey=a61a7758&i='+movies[i])
            .then((response) => {
                let details = response.data;
                let output = `
                    <li>${details.Title} <a onclick="removeFav('${details.imdbID}')" class="btn btn-primary" href="#">Delete</a></li>
                    
                `;
                listOfMovies.append(output);
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

// Function to Delete a Movie From the Favorite List
function removeFav(id) {
    let movies = JSON.parse(window.localStorage.getItem('favoriteMovies'));
    for(let i = 0; i < movies.length; i++) {
        if(movies[i] === id) {
            movies.splice(i, 1);
            window.localStorage.setItem('favoriteMovies', JSON.stringify(movies));
            location.reload();
        }
    }
}