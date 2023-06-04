const API_KEY = '37f6913a13254c42aadf52dfc080f730';
const url = 'https://newsapi.org/v2/everything?q='

const searchBar = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const logo = document.querySelector('.company-logo');
const contentContainer = document.querySelector('.content__container');
const laoding = document.querySelector('.loading');
const templateNewsCard = document.querySelector('#cards-container');

function bindData(articles) {
    if(articles.length < 1) {
        templateNewsCard.innerHTML = 'No result found....'
    } else {
            articles.reverse().forEach(article => {
                if(!article.urlToImage) return
                const date = new Date(article.publishedAt).toLocaleString('en-US', {
                timeZone: 'Asia/Jakarta',
            });
            templateNewsCard.insertAdjacentHTML('afterbegin', `
            <a href=${article.url} target="_blank">
            <div class='card'>
                    <div class="card-header">
                    <img src=${article.urlToImage} />
                    </div>
                    <div class="card-content">
                    <h3 id="news-title">${article.title}</h3>
                        <h6 class="news-source" id="news-source">${article.source.name} - ${date}</h6>
                        <p class="news-desc" id="news-desc">${article.description}</p>
                        </div>
                        </div>
            </a>
            `)
        });   
    }
}

async function fetchNews(query) {
    try {
        contentContainer.classList.add('active');
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        contentContainer.classList.remove('active');
        bindData(data.articles);
    } catch (error) {
        laoding.innerHTML= '<img src="https://media.tenor.com/yw9Bf-X_898AAAAC/welcome-bhai-ye-to-koi-response-hi-nahi-de-raha-hai.gif" />'
    }
}



window.addEventListener('load', fetchNews('india'))


const navLinks = document.querySelector('.nav-links ul');
let curSelected = null;
navLinks.addEventListener('click', (event) => {
    if(!event.target.closest('li')) return
    templateNewsCard.innerHTML = ''
    fetchNews(event.target.closest('li').textContent.trim());
    curSelected?.classList.remove('active');
    curSelected = event.target.closest('li');
    curSelected.classList.add('active');
})


searchButton.addEventListener('click', () => {
    if(!searchBar.value) return
    templateNewsCard.innerHTML = ''
    fetchNews(searchBar.value);
    curSelected?.classList.remove('active');
    curSelected = null;
}
)
logo.addEventListener('click', () => {
    templateNewsCard.innerHTML = ''
    fetchNews('india');
    curSelected?.classList.remove('active');
    curSelected = null;
    searchBar.value = '';
})