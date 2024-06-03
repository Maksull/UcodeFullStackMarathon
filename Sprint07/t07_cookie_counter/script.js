let data = { count: 0, views: 0 };

async function fetchDataAndUpdateViews() {
	try {
		const response = await fetch('/viewsCount');
		const dataCurr = await response.json();

		if (dataCurr.count !== data.count) {
			data = dataCurr;
			document.getElementById('views-count').innerText = `This page was loaded ${dataCurr.views} time(s) in the last minute.`;
		}
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

window.onload = function() {
	fetchDataAndUpdateViews();
};
