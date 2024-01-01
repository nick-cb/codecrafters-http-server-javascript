const net = require("net");

const METHODS = ["GET", "POST", "PUT", "DELETE"];
// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const requestRaw = data.toString();
    // console.log(request);
    const lines = requestRaw.trim().split("\r\n");
    const request = lines.reduce((prev, line) => {
      const spaceIdx = line.indexOf(" ");
      const [key, value] = [line.slice(0, spaceIdx), line.slice(spaceIdx + 1)];
      return { ...prev, [key?.replaceAll(": ", "")]: value };
    }, {});
    for (const method of METHODS) {
      const [path, _] = request[method]?.split(" ");
      if (path && path !== "/") {
        socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
        socket.end();
        return;
      }
    }
    socket.write("HTTP/1.1 200 OK\r\n\r\n");
    socket.end();
  });
  socket.on("close", () => {
    socket.end();
    server.close();
  });
});

server.listen(4221, "localhost");
