'use strict';

(function () {
  const targetEl = document.getElementById('target');

  const logHtml = function (cssClass, ...args) {
    const ln = document.createElement('div');
    if (cssClass) ln.classList.add(cssClass);
    ln.append(document.createTextNode(args.join(' ')));
    targetEl.append(ln);
  };

  const log = (...args) => logHtml('', ...args);
  const warn = (...args) => logHtml('warning', ...args);
  const error = (...args) => logHtml('error', ...args);

  const handleMessage = (e, sqlite3) => {
    console.log(e.data);
    if (!e.data || e.data === '' || !typeof e.data === 'string') return;
    const query = e.data;

    targetEl.innerHTML = '';

    // const capi = sqlite3.capi /*C-style API*/,
    const oo = sqlite3.oo1; /*high-level OO API*/
    const db = new oo.DB('/mydb.sqlite3', 'ct');
    // log('transient db =', db.filename);

    try {
      log('Query data with exec() without a callback...');
      let resultRows = [];
      db.exec({
        sql: query,
        rowMode: 'object',
        resultRows: resultRows,
      });
      // log('Result rows:', JSON.stringify(resultRows, undefined, 2));
      for (let result of resultRows) {
        log(JSON.stringify(result));
      }
    } finally {
      db.close();
    }
  };

  log('Loading and initializing sqlite3 module...');

  globalThis
    .sqlite3InitModule({
      print: log,
      printErr: error,
    })
    .then(function (sqlite3) {
      log('Done initializing. Running demo...');
      try {
        window.addEventListener('message', (e) => handleMessage(e, sqlite3));
      } catch (e) {
        error('Exception:', e.message);
      }
    });
})();
