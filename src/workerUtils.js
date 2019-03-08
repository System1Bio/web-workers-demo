import MakeBigArrayWorker from './makeBigArray.worker';

/**
 * Copied from `collection`!
 */
function promisifyWorker(Worker, message) {
  /**
   * @param {Object} dataContainer
   * @param {String} dataContainer.message
   * @param {*} dataContainer.data
   */
  return data => {
    const worker = new Worker();

    return new Promise((resolve, reject) => {
      function handleResponse({data: dataContainer}) {
        const {message: responseMessage, data: responseData} = dataContainer;

        if (responseMessage === `${message}Errored`) {
          // We pass strings instead of an actual Error object because Error objects can't be
          // `postMessage`d:
          // https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#Things_that_don't_work_with_structured_clone.
          const {message: errMessage, stack} = responseData;

          const err = new Error(errMessage);

          // Overwrite `err`'s `stack` with the `stack` passed from the worker.
          err.stack = stack;

          reject(err);
          return;
        }

        // For now, only accept "<message>Finished" responses.
        if (responseMessage !== `${message}Finished`) return;

        // Clean up our event listener.
        worker.removeEventListener('message', handleResponse);

        resolve(responseData);
      }

      worker.addEventListener('message', handleResponse);

      worker.postMessage({
        message,
        data,
      });
    });
  };
}

export const makeBigArray = promisifyWorker(MakeBigArrayWorker, 'makeBigArray');
