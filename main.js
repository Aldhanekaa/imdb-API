// function getMovies(keyword) {
//     $.ajax({
//         url: `http://www.omdbapi.com/?apikey=f7afb257&s=${keyword}`,
//         success: results => {
//             const {
//                 Search
//             } = results;
//             if (typeof Search == 'undefined') {
//                 swal("Oh no!", "We couldn't find that movie title", "error");
//             } else {
//                 let cards = '';
//                 Search.forEach(element => {
//                     cards += showCards(element);
//                 });
//                 $('.results').html(`Total Results: ${results["totalResults"]}`);
//                 $('#APA').html(cards);
//                 $('.modal-detail-btn').on('click', function () {
//                     $.ajax({
//                         url: `http://www.omdbapi.com/?apikey=f7afb257&I=${$(this).data('imdbid')}`,
//                         success: response => {
//                             const modalContent = shwoMovieDetail(response);
//                             $('.modal-content').html(modalContent);
//                         },
//                         error: () => {
//                             swal("Damn!", "We couldn't connect you to database please fix your internet connection", "error");
//                         }
//                     });
//                 });
//             }
//         },
//         error: e => {
//             swal("Damn!", "We couldn't connect you to database please fix your internet connection", "error");
//         }
//     })
// }
// getMovies('Einstein');


// console.log(e)
//             const {
//                 Search
//             } = e;

//             if (typeof Search == 'undefined') {
//                 swal("Oh no!", "We couldn't find that movie title", "error");
//             } else {
//                 let cards = '';

//                 Search.forEach(element => {
//                     cards += showCards(element)
//                 });
//                 document.querySelector('.results').textContent = `Total Result: ${e["totalResults"]}`;
//                 document.querySelector('#APA').innerHTML = cards;

//                 const modalButtons = document.querySelectorAll('.modal-detail-btn');

//                 modalButtons.forEach(btns => {
//                     btns.addEventListener('click', function () {
//                         const imdbid = this.dataset.imdbid;

//                         fetch(`http://www.omdbapi.com/?apikey=f7afb257&I=${imdbid}`)
//                             .then(response => response.json())
//                             .then(response => {
//                                 const modalBody = document.querySelector('.modal-content');
//                                 const modalContent = shwoMovieDetail(response);

//                                 modalBody.innerHTML = modalContent;
//                             })
//                     })
//                 })
//             }



const searchBtn = document.querySelector('.searchMoviesBtn');

searchBtn.addEventListener('click', async function () {
    const searchInput = document.querySelector('.searchMovies');
    const movies = await getMovies(searchInput.value);
    updateUI(movies);
})

function getMovies(keyword) {
    return fetch(`http://www.omdbapi.com/?apikey=f7afb257&s=${keyword}`)
        .then(response => response.json())
        .then(e => e.Search);
}

function updateUI(movies) {
    let cards = '';
    movies.forEach(element => {
        cards += showCards(element)
    });
    // document.querySelector('.results').textContent = `Total Result: ${e["totalResults"]}`;
    document.querySelector('#APA').innerHTML = cards;
}

document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('modal-detail-btn')) {
        const imdbid = e.target.dataset.imdbid;
        console.log(imdbid)
        const movieDetail = await getMovieDetail(imdbid);
        updateDetailUI(movieDetail)
    }
})

function getMovieDetail(id) {
    return fetch(`http://www.omdbapi.com/?apikey=f7afb257&I=${id}`)
        .then(response => response.json())
        .then(response => response);
}

function updateDetailUI(e) {
    const modalBody = document.querySelector('.modal-content');
    const modalContent = shwoMovieDetail(e);

    modalBody.innerHTML = modalContent;
}










function showCards(e) {
    const {
        Title,
        Year,
        Poster: Image,
        imdbID
    } = e;
    return `<div class="col-md-4 my-3">
                        <div class="card">
                            <img src="${Image != 'N/A' ? Image : `${`noImageAvailable.jpg`}`}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">${Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${Year}</h6>
                                <a href="#" class="btn btn-primary modal-detail-btn" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${imdbID}">Show Details</a>
                            </div>
                        </div>
                    </div>`;
}

function shwoMovieDetail(e) {
    const {
        Title,
        Production,
        Director,
        Actors,
        Writer,
        Genre,
        Poster: Image
    } = e;
    return `<div class="modal-header">
        <h5 class="modal-title" id="movieDetailModalLabel">${Title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <div class="modal-fluid">
            <div class="row">
                <div class="col-md-4">
                    <img src="${Image != 'N/A' ? Image : `${`noImageAvailable.jpg`}`}" alt="" class="img-fluid">
                </div>
                <div class="col-md">
                    <ul class="list-group">
                    <li class="list-group-item"> <h3><strong>${Production}</strong></li></h3>
                        <li class="list-group-item"> <strong>Director: </strong>${Director}</li>
                        <li class="list-group-item"><strong>Actors: </strong>${Actors}</li>
                        <li class="list-group-item"><strong>Writers: </strong>${Writer}</li>
                        <li class="list-group-item">${Genre}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    </div>`;
}

// $('.searchMoviesBtn').on('click', function () {
//     console.log()
//     const x = $('.searchMovies').val()
//     getMovies(x);
// });