const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'preview_leave_form.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading preview file');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
});

server.listen(8080, () => {
  console.log('Preview server running on http://localhost:8080');
});
