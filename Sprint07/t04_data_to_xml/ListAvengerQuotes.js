import fs from 'fs';
import path from 'path';
import xml2js from 'xml2js';
import { Comment } from './Comment.js';
import { AvengerQuote } from './AvengerQuote.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ListAvengerQuotes {
	constructor(data) {
		this.data = this.init(data);
	}

	init(data) {
		return data.map((value) => new Comment(new AvengerQuote(value)));
	}

	toXML() {
		const pathFile = path.resolve(__dirname, 'avenger_quote.xml');
		try {
			if (fs.existsSync(pathFile)) {
				return fs.readFileSync(pathFile, 'utf-8');
			} else {
				const builder = new xml2js.Builder();
				const toXML = builder.buildObject(this.data);
				fs.writeFileSync(pathFile, toXML);
				return toXML;
			}
		} catch (err) {
			console.error(`Error converting to XML: ${err.message}`);
			return '';
		}
	}

	fromXML() {
		const pathFile = path.resolve(__dirname, 'avenger_quote.xml');
		try {
			const data = fs.readFileSync(pathFile, 'utf-8');
			const parser = new xml2js.Parser();
			let response;
			parser.parseString(data, (err, result) => {
				if (err) {
					console.error(`Error parsing XML: ${err.message}`);
					return '';
				}
				response = JSON.stringify(result);
			});
			return response;
		} catch (err) {
			console.error(`Error reading XML file: ${err.message}`);
			return '';
		}
	}
}
