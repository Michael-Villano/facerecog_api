const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const dataBase = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'foo@bar.com',
      password: 'secret_pass',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@bar.com',
      password: 'fruits',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'foo@bar.com'
    }
  ]
}

app.get('/', (req, res) => {
  res.send(dataBase.users);
})

app.post('/signin', (req, res) => {
  bcrypt.compare("cops", '$2a$10$ndpeYU3W4qLW6PUpVWAKdudJ0AiTYBXJe6/o6y1ogcMo9IJApk1pO').then((res) => {
    console.log('first guess', res);
  });
  bcrypt.compare("pig", '$2a$10$ndpeYU3W4qLW6PUpVWAKdudJ0AiTYBXJe6/o6y1ogcMo9IJApk1pO').then((res) => {
    console.log('second guess', res);
  });

if (req.body.email === dataBase.users[0].email &&
    req.body.password === dataBase.users[0].password) {
  res.json(dataBase.users[0]);
} else {
  res.status(400).json('error logging in');
}
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        console.log(hash);
    });
});
  dataBase.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  res.json(dataBase.users[dataBase.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
  const {id} = req.params;
  let found = false;
  dataBase.users.forEach(user => {
    if (user.id === id) {
      found = true;
      res.json(user);
    }
  })
  if (!found) {
    res.status(400).json('not found');
  }
})

app.put('/image', (req, res) => {
  const {id} = req.body;
  let found = false;
  dataBase.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      res.json(user.entries);
    }
  })
  if (!found) {
    res.status(400).json('not found');
  }
})

app.listen(3001, () => {
  console.log('app is running on port 3001');
})
