import { Router } from 'express';
import { remove, insert, read, update } from '../models/Order';

// export default Router.......
export default Router()

  .post('/api/v1/orders', async (req, res) => {
    try {
      const order = await insert(req.params.quantity);
      res.send(order);
    } catch (err) {
      res.status(500).send(err);
    } 
  })

  .get('/api/v1/orders/:id', async (req, res) => {
    try {
      const order = await read(req.params.id);
      res.send(order);
    } catch (err) {
      res.status(500).send(err);
    }
  })

  .put('/api/v1/orders/:id', async (req, res) => {
    try {
      const order = await update(req.params.id, req.params.quantity);
      res.send(order);
    } catch (err) {
      res.status(500).send(err);
    }
  })

  .delete('/api/v1/orders/:id', async (req, res) => {
    try {
      const order = await remove(req.params.id);
      res.send(order);
    } catch (err) {
      res.status(500).send(err);
    }
  })
;
