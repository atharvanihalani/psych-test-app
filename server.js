const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Serve index.html as the home page
    const indexPath = path.join(__dirname, 'build', 'index.html');
    fs.readFile(indexPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    // Serve static files from the build folder
    const filePath = path.join(__dirname, 'build', req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 404;
        res.end('File Not Found');
      } else {
        res.end(data);
      }
    });
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
