import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import fs from 'fs/promises';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const DB_FILE = path.join(process.cwd(), 'server', 'database.json');

// Helper to interact with JSON file
async function getDB() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // If file doesn't exist, return empty structure
    return { users: [] };
  }
}

async function saveDB(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

// 1. Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, phone, age, gender, address, profileImage, documents } = req.body;
    const db = await getDB();
    
    if (db.users.find(u => u.email === email)) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
      name,
      phone,
      age,
      gender,
      address,
      profileImage,
      documents: documents || [],
      role: 'Patient',
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    await saveDB(db);
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await getDB();
    const user = db.users.find(u => u.email === email);
    
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const { password: _, ...userData } = user;
    res.json(userData);
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// 2. Profile Routes
app.get('/api/users/:email', async (req, res) => {
  try {
    const db = await getDB();
    const user = db.users.find(u => u.email === req.params.email);
    if (!user) return res.status(404).json({ error: "User not found" });
    
    const { password: _, ...userData } = user;
    res.json(userData);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.get('/api/patients/assigned/:doctorUsername', async (req, res) => {
  try {
    const db = await getDB();
    const patients = db.users.filter(u => u.assigned_doctor === req.params.doctorUsername);
    res.json(patients.map(({ password, ...rest }) => rest));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Aura Backend (File DB) running at http://localhost:${PORT}`);
  console.log(`📂 Storage: ${DB_FILE}`);
});