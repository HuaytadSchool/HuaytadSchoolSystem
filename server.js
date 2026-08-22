const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  let fileName = 'preview_registration.html';

  if (reqUrl === '/leave' || reqUrl === '/form') {
    fileName = 'preview_leave_form.html';
  } else if (reqUrl === '/' || reqUrl === '/register') {
    fileName = 'preview_registration.html';
  } else {
    fileName = reqUrl.replace(/^\//, '');
  }

  const filePath = path.join(__dirname, fileName);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'text/html; charset=utf-8';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Fallback to preview_registration.html
      fs.readFile(path.join(__dirname, 'preview_registration.html'), (err2, data2) => {
        if (err2) {
          res.writeHead(404);
          res.end('Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data2);
        }
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080 (Registration Form) and http://localhost:8080/leave (Leave Form)');
});
