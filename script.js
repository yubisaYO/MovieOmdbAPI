const searhButton = document.querySelector(".search-button");

searhButton.addEventListener("click", async function () {
  try {
    const keyword = document.querySelector(".input-keyword");
    const movies = await showListMovie(keyword.value);
    updateUI(movies);
  } catch (err) {
    alert(err);
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const initialKeyword = "insidious";
    const movies = await showListMovie(initialKeyword);
    updateUI(movies);
  } catch (err) {
    alert(err);
  }
});

function showListMovie(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=dca61bcc&s=" + keyword)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (!response.Response) {
        throw new Error(response.Error);
      }
      return response.Search;
    });
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => {
    cards += listMovies(m);
  });
  const movieContainer = document.querySelector(".movies-container");
  movieContainer.innerHTML = cards;
}

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getDetail(imdbid);
    updateUIDetail(movieDetail);
  }
});

function getDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=dca61bcc&i=" + imdbid)
    .then((response) => response.json())
    .then((m) => m);
}

function updateUIDetail(m) {
  const movieDetail = movieDetails(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

function listMovies(m) {
  return `<div class="col-md-4 my-3 mx-auto">
            <div class="card mx-auto" style="max-width: 18rem">
              <img src="${m.Poster}" class="card-img-top" style="height: 200px"/>
              <div class="card-body text-dark">
                <h5 class="card-title">${m.Title}</h5>
                <h6 class="card-subtitle mb-2 text- 
                 muted">${m.Year}</h6>
                <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal"
                    data-target="#movieDetailModal" data-imdbid = "${m.imdbID}">Show 
                 Details</a>
              </div>
            </div>
          </div>`;
}

function movieDetails(m) {
  return `<div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  <img src="${m.Poster}" class="img-fluid" />
                </div>
                <div class="col-md text-dark">
                  <ul class="list-group">
                    <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                    <li class="list-group-item"><strong>Sutradara : </strong>${m.Director}</li>
                    <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                    <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                    <li class="list-group-item"><strong>plot : </strong><br>${m.Plot}</li>
                  </ul>
                </div>
              </div>
            </div>`;
}
