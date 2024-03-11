import { navigateToPreviousMedia } from './lightbox/previousArrow.js';
import { navigateToNextMedia } from './lightbox/nextArrow.js';

// LIGHTBOX
export let medias = [];
export let path = "";

export function openLightbox(mediaData, pathFromPage, mediasFromPage, index) {
    path = pathFromPage;
    medias = mediasFromPage;
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('#media-content');

    lightboxContent.innerHTML = '';

    if (mediaData.image) {
        const img = document.createElement('img');
        img.setAttribute("data-index", index);
        img.src = `${path}/${mediaData.image}`;
        img.alt = mediaData.title;
        lightboxContent.appendChild(img);
    } else if (mediaData.video) {
        const video = document.createElement('video');
        video.setAttribute("data-index", index);
        const source = document.createElement('source');
        video.controls = true;
        source.src = `${path}/${mediaData.video}`;
        video.appendChild(source);
        lightboxContent.appendChild(video);
    }

    const closeButton = document.getElementById("btn-close");
    closeButton.addEventListener('click', () => {
        lightbox.close();
    });

    lightbox.showModal();

    lightbox.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            navigateToPreviousMedia();
        } else if (event.key === 'ArrowRight') {
            navigateToNextMedia();
        }
    });

    window.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowDown') {
            window.scrollBy(0, 100);
        } else if (event.key === 'ArrowUp') {
            window.scrollBy(0, -100);
        }
    });
}
