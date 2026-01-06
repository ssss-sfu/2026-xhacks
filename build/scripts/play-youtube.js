// This script will load the youtube video iframe only when the user clicks on the play button to improve page load performance

document.addEventListener('DOMContentLoaded', () => {
    // get all youtube containers
    const containers = document.querySelectorAll('.youtube-container');
    containers.forEach(container => {
        const videoId = container.getAttribute('data-videoid');

        //set the thumbnail of the image as the background of the placeholder 
        container.style.backgroundImage = `url('https://img.youtube.com/vi/${videoId}/hqdefault.jpg')`;
        
        container.addEventListener('click', function(event) {
            // checking if where the user clicks is inside the youtube placeholder
            const youtubeContainer = event.target.closest('.youtube-container');
            if(!youtubeContainer) return;

            // prevent default action/navigating straight to youtube
            event.preventDefault();

            const clickedVideoId = this.getAttribute('data-videoid');
            
            // construct iframe embedding URL
            const iframe = document.createElement('iframe');
            iframe.setAttribute('width', '560');
            iframe.setAttribute('height', '315');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${clickedVideoId}?autoplay=1`);
            iframe.setAttribute('title', 'YouTube video player');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'autoplay; picture-in-picture; web-share; fullscreen;');
            iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
            iframe.setAttribute('allowfullscreen', '');

            container.innerHTML = ''; // clear existing content
            container.appendChild(iframe); // add the iframe
        });
    });
});