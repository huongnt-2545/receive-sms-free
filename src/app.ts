import express, { Application } from 'express';
import helmet from 'helmet';
import routes from './routes';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import i18nextBackend from 'i18next-fs-backend';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
const app: Application = express();

// set security HTTP headers

app.use(helmet());

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'))
app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method
    delete req.body._method
    return method
  }
}))

i18next
  .use(i18nextBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'vi',
    preload: ['vi', 'en'],
    saveMissing: true,
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
      addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json',
    },
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie'],
      lookupQuerystring: 'locale',
      lookupCookie: 'locale',
      ignoreCase: true,
      cookieSecure: false,
    }
  })
app.use(i18nextMiddleware.handle(i18next));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use('/', routes);
app.use((req, res) => {
  res.status(404).send(req.t('shared.not_found.base_message'));
});
app.locals.moment = require('moment');

export default app;
