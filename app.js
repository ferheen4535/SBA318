const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// --------------------Data------------------------//
let unicorns = [
  { id: 1, color: 'Rainbow', power: 'Invisibility' },
  { id: 2, color: 'Cotton Candy', power: 'Flight' }
];

let users = [
  { id: 1, name: 'Ferheen' },
  { id: 2, name: 'Moiz' }
];

let adoptions = [
  { id: 1, userId: 1, unicornId: 2, date: new Date() }
];

//--------------Middleware------------------------------//
app.set('view engine', 'ejs');           //CHECKED//
app.set('views', path.join(__dirname, 'views'));           //CHECKED//
app.use(express.urlencoded({ extended: true })); //CHECKED//
app.use(express.static('public')); 
app.use( express.json())                          //CHECKED//


// Logging Middlewaare                    //CHECKED//
app.use((req, res, next) => {
  const time = new Date();

  console.log(`-----${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});



// GET all unicorns
app.get('/api/unicorns', (req, res) => {
  res.json(unicorns);
});

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET all adoptions
app.get('/api/adoptions', (req, res) => {
  res.json(adoptions);
});


app.use((req, res, next) => {
  console.log(`Request from IP: ${req.ip}`);
  next();
});                                                  //checked// used for security, monitoring, and debugging//



// PATCH //
app.patch('/api/unicorns/:id', (req, res) => {
  const unicornId = parseInt(req.params.id);
  const unicorn = unicorns.find(u => u.id === unicornId);
  if (!unicorn) {
    return res.status(404).json({ error: 'Unicorn not found' });
  }

  const { color, power } = req.body;
  if (color) unicorn.color = color;
  if (power) unicorn.power = power;
  res.json(unicorn);
});

//---------DOWNLOAD--------------//
app.get('/download', (req, res) => {
  const image = req.query.image || 'unicorn.jpg';
  const filePath = path.join(__dirname, 'public', 'images', image);


  //--ERROR MIDDLEWARE---///
  res.download(filePath, image, (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).send('Something went wrong with the download.');
    }
  });
});

//----------------VIEWS Routes---------------------------//
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.post('/adopt', (req, res) => {
  const { name, color, power } = req.body;

  // image based on the color selected//
  let imageFile = 'unicorn.jpg'; // default image//

  if (color === 'Galaxy') {
    imageFile = 'galaxy.jpg';
  } else if (color === 'Rainbow') {
    imageFile = 'rainbow.jpg';
  } else if (color === 'Cotton Candy') {
    imageFile = 'cottoncandy.jpg';
  }

  // EJS view //
  res.render('adopt', { name, color, power, imageFile });
});


//---Error-handling middleware----//
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops, something went wrong!');
});

//----------Start Server------//

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

///sources//
//https://www.w3schools.com/howto/howto_js_topnav_responsive.asp//
//https://youtu.be/SccSCuHhOw0?si=4Z3UW9zwj2KSPg57//
//images from freepik.com//