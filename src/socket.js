//const WebSocket = require('ws');
const SocketIO = require('socket.io');
const OUT_1_PATH = "D:/ws/svn/D2MapServer/logs/D2MapServer-out-1.log";
const ERR_1_PATH = "D:/ws/svn/D2MapServer/logs/D2MapServer-error-1.log";
const OUT_2_PATH = "D:/ws/svn/D2MapServer/logs/D2MapServer-out-2.log";
const ERR_2_PATH = "D:/ws/svn/D2MapServer/logs/D2MapServer-error-2.log";
const TailFile = require('@logdna/tail-file');
const split2 = require('split2');

module.exports = (server) => {

  /* const tail_out_2 = new TailFile(OUT_2_PATH);
  tail_out_2.on('tail_error', (err) => {
    console.error('[TAIL ERROR] :', err);
  });
  tail_out_2.start(); */
  //express의 server와 연결
  //const io = SocketIO(server, {path: '/socket.io'});

  const io = SocketIO(server, {
    path: '/socket.io',
    cors: {
      origin: '*'
    }
  });

  // D2MapServer-1 out log
  io.of('/out_1').on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속 : out_1', ip, socket.id);
    
    const tail_out_1 = new TailFile(OUT_1_PATH);
    tail_out_1.on('tail_error', (err) => {
      console.error('[TAIL_ERROR :', OUT_1_PATH, ']', err);
    });
    tail_out_1.start();
    tail_out_1
    .pipe(split2())
    .on('data', (line) => {
      console.log(line);
      socket.emit('log', line.replace(/\u001b\[\d+m/g, ''));
    });

    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      tail_out_1.quit();
    });
  });

  // D2MapServer-1 err log
  io.of('/err_1').on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속 : err_1', ip, socket.id);
    
    const tail_err_1 = new TailFile(ERR_1_PATH);
    tail_err_1.on('tail_error', (err) => {
      console.error('[TAIL_ERROR :', ERR_1_PATH, ']', err);
    });
    tail_err_1.start();
    tail_err_1
    .pipe(split2())
    .on('data', (line) => {
      console.log(line);
      socket.emit('log', line.replace(/\u001b\[\d+m/g, ''));
    });

    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      tail_err_1.quit();
    });
  });
  
  // D2MapServer-2 out log
  io.of('/out_2').on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속 : out_2', ip, socket.id);
    
    const tail_out_2 = new TailFile(OUT_2_PATH);
    tail_out_2.on('tail_error', (err) => {
      console.error('[TAIL_ERROR :', OUT_2_PATH, ']', err);
    });
    tail_out_2.start();
    tail_out_2
    .pipe(split2())
    .on('data', (line) => {
      console.log(line);
      socket.emit('log', line.replace(/\u001b\[\d+m/g, ''));
    });

    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      tail_out_2.quit();
    });
  });

  // D2MapServer-2 err log
  io.of('/err_2').on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속 : err_2', ip, socket.id);
    
    const tail_err_2 = new TailFile(ERR_2_PATH);
    tail_err_2.on('tail_error', (err) => {
      console.error('[TAIL_ERROR :', ERR_2_PATH, ']', err);
    });
    tail_err_2.start();
    tail_err_2
    .pipe(split2())
    .on('data', (line) => {
      console.log(line);
      socket.emit('log', line.replace(/\u001b\[\d+m/g, ''));
    });

    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      tail_err_2.quit();
    });
  });
};