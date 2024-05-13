const searchForm=document.querySelector('form');
const movieContainer=document.querySelector('.movie-container');
const inputBox=document.querySelector('.inputBox');
// function to fetch movie api
const getmovieinfo = async (movie) =>{

    try{
        const myapikey="46e4a5d";
        const url=`http://www.omdbapi.com/?apikey=${myapikey}&t=${movie}`;

        const response= await fetch(url);

        if(!response.ok){
            throw new Error("Unable to fetch movie data.");
        }
        const data= await response.json(); 
        // console.log(data);
        showMovieData(data);
    }
    catch(error){
        
        showErrorMesssage("No Movie Found !!!");
    }

}
// function to show movie data
const showMovieData = (data) =>{

    movieContainer.innerHTML="";
    movieContainer.classList.remove('noBackground');

    //use destructuring assignment to extract properties from data object 
    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster}= data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info') ;

    movieElement.innerHTML = `<h2>${Title}</h2>
                                <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre') ;

    Genre.split(",").forEach(element =>{
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });
    
    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                                <p><strong>Duration: </strong>${Runtime}</p>
                                <p><strong>Cast: </strong>${Actors}</p>
                                <p><strong>Plot: </strong>${Plot}</p>`;
    //creating a div fr a movie poster
    console.log(Poster);
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src=${Poster}/>`

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
}
//Function for show error
const showErrorMesssage = (message) => {
    // movieContainer.inerHTML = `<img src=${url}/>`;
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add('noBackground');
}

//function to handle the form submission
const handleFormSubmission = (element) => {
    element.preventDefault();
    const moviename=inputBox.value.trim();
    if(moviename !== ''){
        showErrorMesssage("Fetching Movie Information....")
        getmovieinfo(moviename);
    }else{
        showErrorMesssage("Enter movie name to get information");
    }
}

//Adding event listener to search form
searchForm.addEventListener('submit',handleFormSubmission);