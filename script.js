const apiKey = 'QxExxRp47SYf1DJsRz5oLWaYNUGtgSzx';
const currentGif = document.getElementById('current-gif');
let offset = 0;


function loadGif(query) {
	let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=1&offset=${offset}`;
	if (query) {
		url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=1&offset=${offset}`;
	}

	fetch(url)
		.then(response => response.json())
		.then(data => {
			if (data.data.length === 0) {
				alert(`No results found for "${query}"`);
				return;
			}
			currentGif.src = data.data[0].images.original.url;
			currentGif.alt = data.data[0].title;
		})
		.catch(error => console.error(error));
}
function handleArrowKeys(event) {
	if (event.key === 'ArrowLeft') {
		offset = Math.max(0, offset - 1);
		loadGif();
	} else if (event.key === 'ArrowRight'|| event.key===' ') {
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
document.getElementById('search-input').addEventListener('keypress', event => {
	if (event.key === 'Enter') {
		handleSearch();
	}
});
function handleSearch() {
	const query = document.getElementById('search-input').value;
	offset = 0;
	loadGif(query);
}
document.addEventListener('keydown', handleArrowKeys);
document.addEventListener('click', handleMouseClick);

loadGif();
