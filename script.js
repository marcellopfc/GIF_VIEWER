const apiKey = 'QxExxRp47SYf1DJsRz5oLWaYNUGtgSzx';
const currentGif = document.getElementById('current-gif');
let offset = 0;

function loadGif() {
	fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=1&offset=${offset}`)
		.then(response => response.json())
		.then(data => {
			currentGif.src = data.data[0].images.original.url;
			currentGif.alt = data.data[0].title;
		})
		.catch(error => console.error(error));
}

function handleArrowKeys(event) {
	if (event.key === 'ArrowLeft') {
		offset = Math.max(0, offset - 1);
		loadGif();
	} else if (event.key === 'ArrowRight') {
		offset++;
		loadGif();
	}
}

function handleMouseClick(event) {
	if (event.button === 0) {
		offset++;
		loadGif();
	}
}

document.addEventListener('keydown', handleArrowKeys);
document.addEventListener('click', handleMouseClick);

loadGif();
