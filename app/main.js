const net = require("net");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on('data', (_) => {
    socket.write("HTTP/1.1 200 OK\r\n\r\n");
    socket.end();
  })
  socket.on("close", () => {
    socket.end();
    server.close();
  });
});

server.listen(4221, "localhost");
