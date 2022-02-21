import * as React from 'react';
import { useRef } from 'react';

export const RerenderCounter: React.VFC = () => {
  const counter = useRef(0);
  return (
    <div>
      Rerenders: {counter.current++}
      <p />
    </div>
  );
};
