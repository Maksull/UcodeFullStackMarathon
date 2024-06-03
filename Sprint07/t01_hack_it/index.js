import express from 'express';
import expressThymeleaf from 'express-thymeleaf';
import session from 'express-session';
import path from 'path';
import { TemplateEngine } from 'thymeleaf';
import crypto from 'crypto';

const app = express();
const templateEngine = new TemplateEngine();
const __dirname = path.resolve();

app.engine('html', expressThymeleaf(templateEngine));
app.set('view engine', 'html');
app.set('views', __dirname);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: 'sprint07_t01',
    secret: 'sprint07_t01',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

const hasSession = (req) => req.session.showAd ? true : false;

const addSession = (req, session) => req.session.showAd = session;

const sessionEnd = (req) => req.session.destroy();

const getSessionValue = (session) => session.showAd;

const generateSaltHash = (password, saltCount) => {
  const saltSize = Number(saltCount);
  if (isNaN(saltSize) || saltSize <= 0) {
    throw new Error('Salt count must be a positive number');
  }

  const salt = crypto.randomBytes(Number(saltSize)).toString('hex');
  const hash = crypto.createHash('sha256').update(password + salt).digest('hex');
  return { HASH: hash, SALT: salt };
};

const isCorrectPass = (pass, hash, salt) => {
  const generatedHash = crypto.createHash('sha256').update(pass + salt).digest('hex');
  return generatedHash === hash;
};

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
  if (hasSession(req)) {
    const sessionValue = getSessionValue(req.session);
    if (sessionValue.status === 'correct') {
      res.render('index', { answer: 'Hack!' });
    } else if (sessionValue.status === 'denied') {
      res.render('guess', { answer: 'Access denied!', HASH: sessionValue.HASH, SALT: sessionValue.SALT });
    } else {
      res.render('guess', sessionValue);
    }
  } else {
    res.render('index');
  }
});

app.post('/', (req, res) => {
  if (!req.body) {
    res.sendStatus(404).end();
  }
  const { pass, salt } = req.body;
  const { HASH, SALT } = generateSaltHash(pass, salt);
  addSession(req, { HASH, SALT });
  res.render('guess', { answer: 'Salt generated successfully!', HASH, SALT });
});

app.post('/correct-pass', (req, res) => {
  const sessionValue = getSessionValue(req.session);
  const checkPass = req.body.checkPass;
  if (isCorrectPass(checkPass, sessionValue.HASH, sessionValue.SALT)) {
    addSession(req, { status: 'correct' });
    res.render('index', { answer: 'Hack!' });
  } else {
    addSession(req, { status: 'denied', HASH: sessionValue.HASH, SALT: sessionValue.SALT });
    res.render('guess', {
      answer: 'Access denied!',
      HASH: sessionValue.HASH,
      SALT: sessionValue.SALT
    });
  }
});

app.post('/clear', (req, res) => {
  sessionEnd(req);
  res.redirect('/');
});
