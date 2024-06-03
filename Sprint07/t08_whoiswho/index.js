import express from 'express';
import session from 'express-session';
import csv from 'csv-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

function getIndex(insert = false) {
	try {
		const data = fs.readFileSync('index.html', 'utf-8');
		return data && insert ? data.replace('#TEXT#', insert) : data.replace('#TEXT#', '');
	}
	catch (err) {
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


function getFilterHtml(title, map, filter) {
	let result = `<select name="${title}">${title}<option value="all-items" ${!filter || filter === 'all-items' ? 'selected' : ''}><b>${title} (all)</b></option>`;
	map.get(title).map((item) => {
		result += `<option value="${item}"  ${filter === item ? 'selected' : ''}>${item}</option>`;
	});
	result += `</select>`;
	return result;
}

function getFilters(arr) {
	let map = new Map();
	for (let key in arr[0]) {
		map.set(
			key,
			[
				...new Set(arr.map((item) => { return item[key]; })),].sort()
		);
	}
	return map;
}

const app = express();
const upload = multer({ dest: 'uploads' });
let csvArray = [];
let sess;

app.use(
	session({
		name: 'sprint07_t08',
		secret: 'sprint07_t08',
		saveUninitialized: true,
		resave: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.resolve() + '/uploads'));
app.use('/js', express.static(path.resolve() + '/js'));

const parseCSV = (filePath, callback) => {
	let results = [];
	fs.createReadStream(filePath)
		.pipe(csv())
		.on('data', (data) => results.push(data))
		.on('end', () => callback(null, results))
		.on('error', (err) => callback(err, null));
};

app.get('/', (req, res) => {
	res.send(getIndex());
});

app.post('/', upload.single('file'), (req, res, next) => {
	sess = req.session;
	if (!req.file) {
		return res.redirect('/');
	}

	sess.file = req.file.path;
	parseCSV(sess.file, (err, data) => {
		if (err) {
			return next(err);
		}
		csvArray = data;
		const result = renderTable(csvArray);
		res.send(getIndex(result));
	});
});

app.get('/filter', (req, res, next) => {
	if (!sess || !sess.file) {
		return res.redirect('/');
	}

	parseCSV(sess.file, (err, data) => {
		if (err) {
			return next(err);
		}
		csvArray = data;
		const result = renderTable(csvArray, req.query);
		res.send(getIndex(result));
	});
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
