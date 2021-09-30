let API_KEY = '563492ad6f91700001000001cc52da5bc10a47019f94450009ed5479';

// let mainContainer = document.querySelector('.main-container');
let searchForm = document.querySelector('#search-form');

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let results = JSON.parse(xhttp.responseText);
            let photoData = results.photos.map(function(photo) {
                return photo;
            })
            let container = document.querySelector('.main-container');
            container.innerHTML = '';
            photoData.forEach(function(photo) {
                let photoDiv = document.createElement('div');
                photoDiv.classList.add('photo-div');
                photoDiv.innerHTML = `
                    <a href='${photo.url}' target='_blank'><img class='photo' src=${photo.src.large}></a>
                    <a class ='hidden' href='${photo.photographer_url}' target='_blank'>${photo.photographer}</a>
                    `;
                container.appendChild(photoDiv);
            })
        }
    };
    let textValue = document.querySelector('#search-bar').value;
    xhttp.open("GET", `https://api.pexels.com/v1/search?query=${textValue}`, true);
    xhttp.setRequestHeader('Authorization', API_KEY);
    xhttp.send();
})