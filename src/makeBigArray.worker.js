// We can `import` in workers just like other JS files.
import {makeBigArray} from './utils';

const WORKER_MESSAGE = 'makeBigArray';

onmessage = ({data: dataContainer}) => {
  const {message, data} = dataContainer;

  if (message !== WORKER_MESSAGE) return;

  const result = makeBigArray();

  postMessage({
    message: `${WORKER_MESSAGE}Finished`,
    data: result,
  });
};

onerror = error => {
  postMessage({
    message: `${WORKER_MESSAGE}Errored`,
    data: {
      message: error.message,
      stack: error.stack,
    },
  });
};
