// ВСТАВЬТЕ СЮДА ВАШ API КЛЮЧ ОТ TMDB
const API_KEY = 'YOUR_API_KEY_HERE';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const ORIGINAL_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

// DOM Elements
const moviesGrid = document.getElementById('moviesGrid');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const pageTitle = document.getElementById('pageTitle');
const modal = document.getElementById('movieModal');
const modalBody = document.getElementById('modalBody');

// State
let isSearching = false;

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    loadTrending();
});

// Search Handler
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        searchMovies(query);
    }
});

async function loadTrending() {
    isSearching = false;
    pageTitle.textContent = 'Популярное сейчас';
    searchInput.value = '';
    
    // Check if API Key is set
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        moviesGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: red;">Пожалуйста, вставьте ваш API ключ в файл script.js</div>';
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ru-RU`);
        const data = await response.json();
        renderMovies(data.results);
    } catch (error) {
        console.error('Error:', error);
        moviesGrid.innerHTML = '<div class="error">Ошибка загрузки данных</div>';
    }
}

async function searchMovies(query) {
    isSearching = true;
    pageTitle.textContent = `Результаты поиска: ${query}`;
    
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=ru-RU&query=${encodeURIComponent(query)}`);
        const data = await response.json();
        renderMovies(data.results);
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderMovies(movies) {
    moviesGrid.innerHTML = '';
    
    if (movies.length === 0) {
        moviesGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center;">Ничего не найдено</div>';
        return;
    }

    movies.forEach((movie, index) => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.onclick = () => showMovieDetails(movie.id);
        card.style.setProperty('--delay', `${index * 60}ms`);
        
        const posterPath = movie.poster_path 
            ? `${IMAGE_BASE_URL}${movie.poster_path}` 
            : 'https://via.placeholder.com/500x750?text=No+Image';

        const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

        card.innerHTML = `
            <img src="${posterPath}" alt="${movie.title}" class="poster">
            <div class="movie-info">
                <div class="movie-title" title="${movie.title}">${movie.title}</div>
                <div class="movie-year">
                    <span>${year}</span>
                    <span class="rating">★ ${movie.vote_average.toFixed(1)}</span>
                </div>
            </div>
        `;
        
        moviesGrid.appendChild(card);
    });
}

async function showMovieDetails(id) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ru-RU&append_to_response=videos`);
        const movie = await response.json();
        
        openModal(movie);
    } catch (error) {
        console.error('Error fetching details:', error);
    }
}

function openModal(movie) {
    const backdropPath = movie.backdrop_path 
        ? `${ORIGINAL_IMAGE_BASE_URL}${movie.backdrop_path}` 
        : '';
    
    const posterPath = movie.poster_path 
        ? `${IMAGE_BASE_URL}${movie.poster_path}` 
        : 'https://via.placeholder.com/500x750?text=No+Image';

    const trailer = movie.videos?.results.find(
        v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
    );

    const genres = movie.genres.map(g => g.name).join(', ');

    modalBody.innerHTML = `
        <div class="details-container">
            ${backdropPath ? `<img src="${backdropPath}" class="backdrop">` : '<div style="height: 100px;"></div>'}
            
            <div class="details-content">
                <img src="${posterPath}" class="details-poster">
                
                <div class="details-text">
                    <h2 class="details-title">${movie.title}</h2>
                    ${movie.tagline ? `<p class="tagline">${movie.tagline}</p>` : ''}
                    
                    <div class="details-meta">
                        <span>${new Date(movie.release_date).getFullYear()}</span>
                        <span>${movie.runtime} мин</span>
                        <span class="rating">★ ${movie.vote_average.toFixed(1)}</span>
                        <span>${genres}</span>
                    </div>

                    <p class="overview">${movie.overview || 'Описание отсутствует.'}</p>

                    ${trailer ? `
                        <div class="trailer-container">
                            <h3>Трейлер</h3>
                            <div class="video-wrapper">
                                <iframe 
                                    src="https://www.youtube.com/embed/${trailer.key}" 
                                    title="YouTube video player" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen>
                                </iframe>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    modalBody.innerHTML = ''; // Stop video playback
    document.body.style.overflow = '';
}

// Close modal on click outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

