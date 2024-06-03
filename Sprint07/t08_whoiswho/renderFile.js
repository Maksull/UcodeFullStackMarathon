import fs from 'fs';

function getIndex(insert = false)
{
	try
	{
		const data = fs.readFileSync('index.html', 'utf-8');
		return data && insert ? data.replace('#TEXT#', insert) : data.replace('#TEXT#', '');
	}
	catch (err)
	{
		console.error(err);
	}
	return false;
}

function renderTable(arr, filter = false) {
	let map = getFilters(arr);
	let result = `
		<form action="/filter" id="filters" method="get">
			<table border="1px;">
				<tr>`;
	for (let key in arr[0]) {
		result += `<th>${getFilterHtml(
			key,
			map,
			filter ? filter[key] : false
		)}</th>`;
	}
	result += '</tr>';
	if (filter && Object.keys(filter).length !== 0) {
		arr = arr.filter((item) => {
			let flag = true;
			for (let key in item) {
				if (!(filter[key] === item[key] || filter[key] === 'all-items')) {
					flag = false;
				}
			}
			return flag;
		});
	}

	arr.map((item) => {
		result += '<tr>';
		for (let key in item) {
			result += `<td>${item[key]}</td>`;
		}
		result += '</tr>';
	});
	result += `
			</table>
		</form>
		<script>
			document.querySelectorAll('#filters select').forEach(select => {
				select.addEventListener('change', () => {
					document.getElementById('filters').submit();
				});
			});
		</script>`;
	return result;
}


function getFilterHtml(title, map, filter)
{
	let result = `<select name="${title}">${title}<option value="all-items" ${!filter || filter === 'all-items' ? 'selected' : ''}><b>${title} (all)</b></option>`;
	map.get(title).map((item) => {
		result += `<option value="${item}"  ${filter === item ? 'selected' : ''}>${item}</option>`;
	});
	result += `</select>`;
	return result;
}

function getFilters(arr) {
	let map = new Map();
	for (let key in arr[0])
	{
		map.set(
		key,
		[
			...new Set(arr.map((item) => {return item[key];})),].sort()
		);
	}
	return map;
}

export { renderTable, getIndex };

