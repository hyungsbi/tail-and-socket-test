//const WebSocket = require('ws');
const SocketIO = require('socket.io');
const OUT_2_PATH = "D:/ws/svn/D2MapServer/logs/D2MapServer-out-2.log";
const TailFile = require('@logdna/tail-file');
const split2 = require('split2');

module.exports = (server) => {

  const tail = new TailFile(OUT_2_PATH);
  tail.on('tail_error', (err) => {
    console.error('[TAIL ERROR] :', err);
  });
  tail.start();
  //express의 server와 연결
  //const io = SocketIO(server, {path: '/socket.io'});
  const io = SocketIO(server, {path: '/log'});
  // 클라이언트 connection 이벤트 핸들러 : 클라이언트에서 접속 시 실행
  io.on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id);
    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      //clearInterval(socket.interval);
    });
    socket.on('error', (error) => {
      console.error(error);
    });
    socket.on('reply', (data) => {
      console.log(data);
    });
    /* socket.interval = setInterval(() => {
      socket.emit('OUT_1', '안녕, 난 Socket.IO야!! [' + (new Date().toLocaleString()) + ']');
    }, 3000); */
    tail
    .pipe(split2())
    .on('data', (line) => {
      console.log(line);
      socket.emit('OUT_2', line);
    });
  });
  /* wss.on('connection', (ws, req) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속', ip);

    // message 이벤트 핸들러 : 클라이언트에서 메시지 전송 시 실행
    ws.on('message', (message) => {
      console.log(message.toString('utf-8'));
    });
    // error 이벤트 핸들러 : 에러 발생 시 실행
    ws.on('error', (error) => {
      console.error(error);
    });
    // close 이벤트 핸들러 : 클라이언트에서 접속 해제시 실행
    ws.on('close', () => {
      console.log('클라이언트 접속 해제', ip);
      clearInterval(ws.interval);
    });

    ws.interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.send('나는 서버야, 안녕! [' + (new Date()).toLocaleString() + ']');
      }
    }, 3000);
  }); */
};