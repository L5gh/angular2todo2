import * as express from 'express';

import UserCtrl from './controllers/user';
import User from './models/user';
import SortingCtrl from './controllers/sorting';
import Sorting from './models/sorting';

export default function setRoutes(app) {

  const router = express.Router();
  const userCtrl = new UserCtrl();
  const sortingCtrl = new SortingCtrl();
  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);
  // sortings
  router.route('/sortings').get(sortingCtrl.getAll);
  router.route('/sortings/count').get(sortingCtrl.count);
  router.route('/sorting').post(sortingCtrl.insert);
  router.route('/sorting/:id').get(sortingCtrl.get);
  router.route('/sorting/:id').put(sortingCtrl.update);
  router.route('/sorting/:id').delete(sortingCtrl.delete);


  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
