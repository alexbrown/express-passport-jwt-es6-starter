import jwt from 'jwt-simple';
import User from '../models/user';
import config from '../config';

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

export function signin(req, res) {
  const payload = { token: tokenForUser(req.user) };
  res.send({ token: tokenForUser(req.user) });
}

export function signup(req, res, next) {
  const {
    email,
    password,
  } = req.body;
  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(422).send('Email is in use.');
    }

    const user = new User({
      email,
      password,
    });

    user.save((error) => {
      if (error) { return next(error); }
      res.json({ token: tokenForUser(user) });
    });
  });
}