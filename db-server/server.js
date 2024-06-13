import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const port = 3001;

// CORS 설정 추가
app.use(cors());
app.use(express.json()); // JSON 요청 파싱

// 현재 파일의 디렉토리 경로를 가져오기 위한 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON 파일 경로
const dataFilePath = path.join(__dirname, 'DATA.json');

// 기본 경로 핸들러
app.get('/', (req, res) => {
  res.send('Welcome to the Members API. Use /members or /members/:member_id');
});

// 모든 멤버 조회
app.get('/members', (req, res) => {
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data file' });
    }
    res.json(JSON.parse(data).members);
  });
});

// 특정 member_id로 멤버 조회
app.get('/members/:member_id', (req, res) => {
  const memberId = req.params.member_id;

  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data file' });
    }

    const members = JSON.parse(data).members; // members 배열을 사용
    const member = members.find(m => m.member_id == memberId);

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json(member);
  });
});

// 특정 member_id로 멤버 업데이트
app.put('/members/:member_id', (req, res) => {
  const memberId = req.params.member_id;
  const updatedMember = req.body;

  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data file' });
    }

    let jsonData = JSON.parse(data);
    const members = jsonData.members;
    const memberIndex = members.findIndex(m => m.member_id == memberId);

    if (memberIndex === -1) {
      return res.status(404).json({ error: 'Member not found' });
    }

    members[memberIndex] = updatedMember;

    fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to write data file' });
      }

      res.json(updatedMember);
    });
  });
});

// 모든 accountLogs 조회
app.get('/accountLogs', (req, res) => {
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data file' });
    }
    res.json(JSON.parse(data).accountLogs);
  });
});

// 특정 log_id로 accountLog 조회
app.get('/accountLogs/:log_id', (req, res) => {
  const logId = req.params.log_id;

  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data file' });
    }

    const accountLogs = JSON.parse(data).accountLogs;
    const log = accountLogs.find(l => l.id == logId);

    if (!log) {
      return res.status(404).json({ error: 'Log not found' });
    }

    res.json(log);
  });
});

// 특정 log_id로 accountLog 업데이트
app.put('/accountLogs/:log_id', (req, res) => {
  const logId = req.params.log_id;
  const updatedLog = req.body;

  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data file' });
    }

    let jsonData = JSON.parse(data);
    const accountLogs = jsonData.accountLogs;
    const logIndex = accountLogs.findIndex(l => l.id == logId);

    if (logIndex === -1) {
      return res.status(404).json({ error: 'Log not found' });
    }

    accountLogs[logIndex] = updatedLog;

    fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to write data file' });
      }

      res.json(updatedLog);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
