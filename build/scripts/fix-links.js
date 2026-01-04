// fixes up links so that they work with Live Preview locally
// but also generate nicer URLs in production

const linkMappings = {
    'index.html': '/',
    './index.html': '/',
    'handbook.html': '/handbook'
};

function fixLinks() {
    // Only apply fixes if in production
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';
    
    if (isLocalhost) {
        return;
    }
    
    // Fix all links in the document
    Object.entries(linkMappings).forEach(([file, newPath]) => {
        const links = document.querySelectorAll(`a[href="${file}"]`);
        links.forEach(link => {
            link.href = newPath;
        });
    });
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixLinks);
} else {
    fixLinks();
}