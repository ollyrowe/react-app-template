import express from 'express';

// Set up the express router
const router = express.Router();

router.get('/login', (req, res) => {
  // TODO
});

router.get('/logout', (req, res) => {
  // TODO
});

// Catch any other invalid endpoint requests
router.get('*', (req, res) => {
  res.status(404).send('requested endpoint not found');
});
router.post('*', (req, res) => {
  res.status(404).send('requested endpoint not found');
});

export default router;
