const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use( express.json())

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.post('/adopt', (req, res) => {
  const { name, color, power } = req.body;
  res.send(`
    <link rel="stylesheet" href="/style.css">
        <div class ="container">

   
     <div class ="adopt">
    <h2>Congrats, ${name}! </h2>
    <p>You adopted a <strong>${color}</strong> unicorn with the power of <strong>${power}</strong>!</p>
   <img src="/images/unicorn.jpg" alt="Unicorn" width="245">
   <div>
    <a href="/download"><button>Download Your Unicorn</button></a>
    </div>
</div>
  `);
});



app.get('/download', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'images', 'unicorn.jpg');
  res.download(filePath, 'my-unicorn.jpg', (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).send('Something went wrong with the download.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

///sources//
//https://www.w3schools.com/howto/howto_js_topnav_responsive.asp//
//https://youtu.be/SccSCuHhOw0?si=4Z3UW9zwj2KSPg57//
//images from freepik.com//