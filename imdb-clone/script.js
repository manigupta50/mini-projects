var favMovies = [];

$('document').ready(() => {

    // Display Suggestions
    let searching = document.getElementById('searchText');
    searching.addEventListener("keydown", (e) => {
        if(e.key !== "Enter") {
            let searchText = $('#searchText').val();
            let searchArr = [];
            if(document.getElementById('suggestions') !== null)
                document.getElementById('suggestions').remove();

            axios.get('https://www.omdbapi.com/?apikey=a61a7758&s='+searchText)
            .then((response) => {
                let movies = response.data.Search;
                // console.log(movies);
                for(let i = 0; i < 10; i++) {
                    searchArr.push(movies[i]['Title']);
                }

                console.log("searchArr:", searchArr);
                let listOfMovies = $("#search-container").append('<ul id="suggestions"></ul>').find('ul');
                $('#suggestions').empty();
                for(let i = 0; i < 10; i++) {
                    let output = `
                        <li>${searchArr[i]}</li>
                    `;
                    listOfMovies.append(output);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }

        $('#searchForm').on('submit',(e) => {
            let searchText = $('#searchText').val();
            getMovies(searchText, favMovies);
            e.preventDefault();
        })
    });

    // Function to Search and Display all the Movies by User Input
    function getMovies(searchText) {
        // console.log(searchText);
        axios.get('https://www.omdbapi.com/?apikey=a61a7758&s='+searchText)
        .then((response) => {
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                    <div class="col-md-4">
                        <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title} <i class="fa-regular fa-star" id="${movie.imdbID}" onclick="favorite('${movie.imdbID}')"></i></h5>
                        <br/>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                        </div>
                    </div>
                    <br/><br/><hr>
                `;
            });
        
            $('#movies').html(output);
        })
        .catch((err) => {
            output = `
            <div class="col-md-4">No Movie Found</div>`;
            $('#movies').html(output);
            console.log(err);
        })
    }

})

// Function for Favorite Button
function favorite(favMovieId) {
    for(let i = 0; i < favMovies.length; i++) {
        if(favMovies[i] === favMovieId) {
            window.localStorage.clear();

            let elem = document.getElementById(favMovieId);
            elem.classList.remove("fa-solid");
            elem.classList.add("fa-regular");
            favMovies.splice(i, 1);

            window.localStorage.setItem('favoriteMovies', JSON.stringify(favMovies));
            return;
        }
    }

    let elem = document.getElementById(favMovieId);
    elem.classList.remove("fa-regular");
    elem.classList.add("fa-solid");
    favMovies.push(favMovieId);
    window.localStorage.clear();
    window.localStorage.setItem('favoriteMovies', JSON.stringify(favMovies));
}

// Function to Re-direct User to More Details of a Selected Movie
function movieSelected(id) {
    // console.log("id", id);
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

// Function to Display Details of the Selected Movie
function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('https://www.omdbapi.com?i=' + movieId + '&apikey=a61a7758&s=')
        .then((response) => {
            console.log(response);
            let movie = response.data;
            let output =`
            <div class="row">
                <div class="col-md-4">
                <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                </ul>
                </div>
            </div>
            <div class="row">
                <div class="well">
                <h3>Plot</h3>
                ${movie.Plot}
                <hr>
                <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                <a href="index.html" class="btn btn-default">Go Back To Search</a>
                </div>
            </div>
            `;
    
            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}