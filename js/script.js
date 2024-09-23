'use strict';
// importing my authentication key variable from my config.js file that is not uploaded to git
import { api_token_authentication_key } from './config.js';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: api_token_authentication_key
    }
};

const endpoints = {
    nowPlaying: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
    popular: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
    topRated: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
    upcoming: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1'
};

const movieContent = document.getElementById('movie-content');

function fetchMovies(category) {
    fetch(endpoints[category], options)
        .then(response => response.json())
        .then(data => displayMovies(data.results))
        .catch(err => console.error(err));
}

function displayMovies(movies) {
    movieContent.innerHTML = ''; // Clear existing content
    const baseUrl = 'https://image.tmdb.org/t/p/w300';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-item');
        movieElement.innerHTML = `
            <div class="movie-card">
                <h2 class="movie-title">${movie.title}</h2>

                <div class="movie-content">
                    <div class="movie-img">
                        <img src="${baseUrl}${movie.backdrop_path}">
                    </div>

                    <div class="movie-details">
                        <p class="movie-overview">${movie.overview}</p>

                        <p class="movie-original-title">
                            <span class="bold-text">Original title:</span>
                            <span>${movie.original_title}</span>
                        </p>
                        
                        <p class="movie-release">
                            <span class="bold-text">Release date:</span>
                            <span>${movie.release_date}</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
        movieContent.appendChild(movieElement);
    });
}

// Event listeners for navigation links
document.getElementById('now-playing').addEventListener('click', (e) => {
    e.preventDefault();
    fetchMovies('nowPlaying');
});

document.getElementById('popular').addEventListener('click', (e) => {
    e.preventDefault();
    fetchMovies('popular');
});

document.getElementById('top-rated').addEventListener('click', (e) => {
    e.preventDefault();
    fetchMovies('topRated');
});

document.getElementById('upcoming').addEventListener('click', (e) => {
    e.preventDefault();
    fetchMovies('upcoming');
});

// Initial fetch
fetchMovies('nowPlaying'); // Will load now playing movies by default
