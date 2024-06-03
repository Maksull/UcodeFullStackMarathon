import express from 'express';
import fs from 'fs';
import path from 'path';
import request from 'request';
import { TemplateEngine } from 'thymeleaf';
import expressThymeleaf from 'express-thymeleaf';
import sharp from 'sharp';

const app = express();
const templateEngine = new TemplateEngine();

app.use('/public', express.static(path.resolve() + '/'));
app.engine('html', expressThymeleaf(templateEngine));
app.set('view engine', 'html');
app.set('views', path.resolve());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render('index');
});

let imageCounter = 0;

app.get('/upload', (req, res) => {
	const url = req.query.url;

	request.head(url, (err, response, body) => {
		if (err) {
			return res.status(500).json({ error: 'Error downloading image' });
		}

		const imageName = `image_${imageCounter++}`;
		const imagePath = `./${imageName}.png`;
		request(url).pipe(fs.createWriteStream(imagePath)).on('close', async () => {
			try {
				const imgPaths = await processImage(imagePath, imageName);
				res.json({ img: imgPaths });
			} catch (error) {
				res.status(500).json({ error: 'Error processing image' });
			}
		});
	});
});

async function processImage(imagePath, imageName) {
	const transformations = [
		[[1, 0, 0], [0, 0, 0], [0, 0, 0]],
		[[0, 0, 0], [1, 0, 0], [0, 0, 0]],
		[[0, 0, 0], [0, 0, 0], [1, 0, 0]],
	];

	const imagePaths = [];
	for (let i = 0; i < 4; i++) {
		let img = sharp(imagePath);
		if (i > 0) {
			img = img.recomb(transformations[i - 1]);
		}

		const outputPath = `./${imageName}_${i + 1}.png`;
		await img.resize(250, 250).toFile(outputPath);
		imagePaths.push(outputPath);
	}

	return imagePaths;
}

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
