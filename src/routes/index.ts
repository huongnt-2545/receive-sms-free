import express from 'express';
import userRoute from '../routes/user.route';

const router = express.Router();

const routes = [
  {
    path: '/users',
    route: userRoute,
  },
]

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
