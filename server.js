const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//take all of the contents of a folder and serve them as static assets//
app.use(express.static(path.join(__dirname, 'public')));
