document.getElementById('apiForm').addEventListener('submit', async (e) => {
	e.preventDefault();
	e.target.style.display = 'none';

	const response = await fetch('/api');
	const data = await response.json();

	const renderData = (data) => {
		return Object.entries(data).map(([key, value]) => {
			if (typeof value === 'object' && value !== null) {
				return `
                    <div class="box parent">
                        <p class="name__object parent__color">${key}:</p>
                        ${renderData(value)}
                    </div>
                `;
			} else {
				return `
                    <div class="box child">
                        <p class="name__object">${key}: <span class="value">${value}</span></p>
                    </div>
                `;
			}
		}).join('');
	};

	document.getElementById('content').innerHTML = renderData(data);
});
