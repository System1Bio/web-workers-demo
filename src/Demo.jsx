import React from 'react';

import {makeBigArray} from './utils';
import {makeBigArray as makeBigArrayUsingWorker} from './workerUtils';

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      generatedNumber: null,
    };

    this.generateNumber = this.generateNumber.bind(this);
  }

  generateNumber() {
    this.setState({
      generatedNumber: Math.ceil(Math.random() * 100),
    });
  }

  render() {
    const {generatedNumber} = this.state;
    const {generateNumber} = this;

    return (
      <div>
        <div>
          <button onClick={makeBigArray}>
            (main thread) trigger expensive operation
          </button>
        </div>

        <div>
          <button onClick={() => makeBigArrayUsingWorker()}>
            (worker) trigger expensive operation
          </button>
        </div>

        <div>
          <button onClick={generateNumber}>generate random no.</button>
        </div>
        <div>
          generated number:&nbsp;
          {generatedNumber ? <strong>{generatedNumber}</strong> : 'n/a'}
        </div>
      </div>
    );
  }
}

export default Demo;
