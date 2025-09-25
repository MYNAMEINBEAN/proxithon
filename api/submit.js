import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'submissions.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const submission = req.body;
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.push(submission);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.status(200).json({ message: 'Submitted' });
  }
}
