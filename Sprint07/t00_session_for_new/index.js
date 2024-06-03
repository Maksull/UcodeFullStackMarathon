import express from 'express';
import expressThymeleaf from 'express-thymeleaf';
import session from 'express-session';
import path from 'path';
import { TemplateEngine } from 'thymeleaf';

const app = express();
const __dirname = path.resolve();
const templateEngine = new TemplateEngine();

app.engine('html', expressThymeleaf(templateEngine));
app.set('view engine', 'html');
app.set('views', __dirname);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    name: 'sprint07_t00',
    secret: 'sprint07_t00',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

const addSession = (req, sessionData) => {
  req.session.showAd = sessionData;
};

const getSession = (req) => req.session.showAd;

const hasSession = (req) => !!req.session.showAd;

Array.prototype.sum = function () {
  let sum = 0;
  for (const num of this) {
    sum += Number(num);
  }
  return sum;
};

const handleDate = (date) => {
  const dateUser = {};
  Object.entries(date).forEach(([key, val]) => {
    dateUser[key] = val || '[none]';
  });
  if (dateUser.experience) {
    dateUser.experience = isNaN(dateUser.experience)
      ? `${dateUser.experience.sum()}`
      : `${dateUser.experience}`;
  } else {
    dateUser.experience = '[none]';
  }
  if (!dateUser.purpose) {
    dateUser.purpose = '[none]';
  }
  return { title: 'Session for new', dateUser };
};

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
  if (!req.body) {
    console.log('Request error');
    return res.status(404).end();
  }
  if (hasSession(req)) {
    res.render('session', getSession(req));
  } else {
    res.render('index');
  }
});

app.post('/', (req, res) => {
  addSession(req, handleDate(req.body));
  res.render('session', getSession(req));
});

app.post('/session', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});