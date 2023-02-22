/**
 * Global Constants
 */
const OUT_2 = "D:/ws/svn/D2MapServer/logs/D2MapServer-out-2.log";

/**
 * Example using data events
 * 감시하는 파일 변경 내용 전체를 가져옴
 */
/* 
const TailFile = require('@logdna/tail-file');
const tail = new TailFile(OUT_2, {
  encoding: 'utf-8'
});

// 'data' 이벤트 핸들러
tail.on('data', (chunk) => {
  console.log(chunk);
});

// 'tail_error' 이벤트 핸들러
tail.on('tail_error', (err) => {
  console.error('[TAIL ERROR] :', err);
});

// 'error' 이벤트 핸들러
tail.on('error', (err) => {
  console.error('[ERROR] :', err);
});

try {
  tail.start();
} catch (err) {
  console.error('[START ERROR] :', err);
}
 */
/**
 * Example using pipe
 * 변경 내용을 개행 기준으로 분리하여 매 라인마다 데이터 이벤트 발생
 */
/* 
const TailFile = require('@logdna/tail-file');
const split2 = require('split2');
const tail = new TailFile(OUT_2);

// 'tail_error' 이벤트 핸들러
tail.on('tail_error', (err) => {
  console.error('[TAIL ERROR] :', err);
});

try {
  tail.start();
  let i = 0;
  tail
    .pipe(split2())
    .on('data', (line) => {
      console.log(`${++i}) ${line}`);
    });
} catch (err) {
  console.error('[START ERROR] :', err);
  throw err;
}
 */

/**
 * Example using readline
 */
/* 
const readline = require('readline');
const TailFile = require('@logdna/tail-file');

async function startTail() {
  const tail = new TailFile(OUT_2)
    .on('tail_error', (err) => {
      console.error('TailFile had an error!', err);
    });

  try {
    await tail.start();
    const linesplitter = readline.createInterface({
      input: tail
    });

    let ln = 0;
    linesplitter.on('line', (line) => {
      console.log(`${++ln}) ${line}`);
    });
  } catch (err) {
    console.error('Cannot start tail.', err);
    throw err;
  }
}

startTail().catch((err) => {
  process.nextTick(() => {
    throw err;
  });
});
 */