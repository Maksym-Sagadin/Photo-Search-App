let API_KEY = '563492ad6f91700001000001cc52da5bc10a47019f94450009ed5479';

let photoButton = document.querySelector('.photo-button');
let videoButton = document.querySelector('.video-button');

// Photo Button
photoButton.addEventListener('click', function(e) {
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
                    <a href='${photo.url}' target='_blank'><img class='photo' src='${photo.src.large}'></a>
                    <a class ='photographer' href='${photo.photographer_url}' target='_blank'>${photo.photographer}</a>
                    `;
                container.appendChild(photoDiv);
            })
        }
    };
    let textValue = document.querySelector('.search-bar').value;
    console.log(textValue);
    xhttp.open("GET", `https://api.pexels.com/v1/search?query=${textValue}`, true);
    xhttp.setRequestHeader('Authorization', API_KEY);
    xhttp.send();
})


// Video Button 
videoButton.addEventListener('click', function(e) {
    e.preventDefault();

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let results = JSON.parse(xhttp.responseText);
            let videoData = results.videos.map(function(video) {
                return video;
            })

            let container = document.querySelector('.main-container');
            container.innerHTML = '';
            videoData.forEach(function(video) {
                let videoDiv = document.createElement('div');
                videoDiv.classList.add('video-div');
                videoDiv.innerHTML = `
                    <a class='video-anchor' target='_blank' href='${video.url}'>
                        <video class='video'  loop muted preload='none' autoplay='true' controls>
                            <source src='${video.video_files[0].link}' type='${video.video_files[0].file_type}'>
                        </video>
                    </a>
                    `;
                container.appendChild(videoDiv);
            })
        }
    };
    let textValue = document.querySelector('.search-bar').value;
    xhttp.open("GET", `https://api.pexels.com/videos/search?query=${textValue}`, true);
    xhttp.setRequestHeader('Authorization', API_KEY);
    xhttp.send();
})