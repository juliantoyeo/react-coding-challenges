import React, { useState, Component } from 'react';
import RocketCore from './RocketCore';

export function FunctionalRocket(props) {
  const [initialLaunchTime] = useState(Date.now());
	console.log('Functional Rocket rerendered')
  return <RocketCore initialLaunchTime={initialLaunchTime} />;
}

export const MemoizedFunctionalRocket = React.memo(FunctionalRocket)

export class ClassRocket extends Component {
  constructor() {
    super();

    this.state = {
      initialLaunchTime: Date.now()
    };
  }

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.toString() === nextProps.toString())
			return false;
  }

  render() {
    const { initialLaunchTime } = this.state;
		console.log('Class rocket rerendered')
    return <RocketCore initialLaunchTime={initialLaunchTime} />;
  }
}
