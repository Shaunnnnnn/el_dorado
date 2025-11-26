import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// TODO: Implement domain purchase
app.post('/domain/buy', async (req, res) => {
  res.json({ message: 'Domain purchase endpoint - TODO' });
});

// TODO: Implement DNS verification
app.post('/domain/verify-dns', async (req, res) => {
  res.json({ message: 'DNS verification endpoint - TODO' });
});

// TODO: Implement SSL provisioning
app.post('/domain/provision-ssl', async (req, res) => {
  res.json({ message: 'SSL provisioning endpoint - TODO' });
});

// TODO: Implement Vercel linking
app.post('/domain/link-vercel', async (req, res) => {
  res.json({ message: 'Vercel linking endpoint - TODO' });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Domain service running on port ${PORT}`);
});
