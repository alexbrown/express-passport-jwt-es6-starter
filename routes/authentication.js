import passport from 'passport';
import passportService from '../services/passport';

import {
    signup,
    signin,
} from '../controllers/authentication';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

export default (router) => {
    router.get('/', requireAuth, (req, res) => {
        res.send({ hi: 'there' });
    });

    router.post('/signup', signup);

    router.post('/login', requireSignIn, signin);
};