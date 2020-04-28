// here we will configure the various entry points in the website.
// the configuration for the websites, pages are done in here.

const express = require('express');
const port = process.env.PORT || 3000;
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('capitalise', (text) => text.toUpperCase());

app.set('view engine', 'hbs');
//app.use(express.static(__dirname + '/public'));

app.use((request, response, next) => {
  var logString = `${new Date().toString()} ${request.method} ${request.path}`;

  console.log(logString);
  fs.appendFile('server.log', logString + '\n', (err) => {
    if (err)
      console.log('Unable to append log')});
  next();
});

app.use((request, response, next) => {
  var logString = `${new Date().toString()} ${request.method} ${request.path}`;
  console.log(logString);

  fs.appendFile('server.log', logString, (err) => {
    if (err)
       console.log('Unable to append log');
  });

  response.render('maintenence.hbs');
});

app.get('/', (request, response) => {
  var dataObject = {
    Page: 'Home',
    rememberNote: 'Remember to share this page with your friends as much as possible. Thanks',
    Purpose: 'manage and monitor what is new with us.',
    Organisation: 'DevProfile (devprofile.in)',
    Founders: ['Suresh Prabhu', 'Kamla Chand', 'Uma Shankar Pandey', 'Nihal Pandey'],
    Starting: 2016,
    Aim: 'Learning, Hiring, Improving and Showcasing the developer skills all around the world',
    Operations: ['Learning Technologies', 'Hiring Platforms', 'Discussion Forums', 'Skill Showcasing'],
  };
  response.render('home.hbs', dataObject);
});

app.get('/about', (request, response) => {
   var dataObject = {
     Page: 'User Dashboard',
     rememberNote: 'Remember to share this page with your friends as much as possible. Thanks',
     Purpose: 'manage and monitor your own profile',
     Name: 'Shivam Shukla',
     Username: 'shukla284',
     Github: 'https://github.com/shukla284',
     Education: 'Computer Science Undergraduate',
     Course: 'Bachelor of Technology',
     Branch: 'Computer Science and Engineering',
     Institution: 'Madan Mohan Malaviya University of Technology, Gorakhpur',
     Development: ['MERN Stack Developer', 'Machine Learning Research', 'Artificial Intelligence',
                  'Competitive Programming'],
      Area: 'Competitive Programming and Artificial Intelligence',
      Residence: 'Prayagraj, Uttar Pradesh, India',
   };
   response.render('about.hbs', dataObject);
});

app.get('/bad', (request, response) => {
    var errorMessage = {
      message : 'The page is not available at the moment',
      redirect: 'https://github.com/shukla284'
    } ;
    response.send(errorMessage);
});

app.listen(port, () => console.log(`Application starting at port ${port}`));
