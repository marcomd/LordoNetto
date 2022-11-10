import { createContext } from 'react';

const sharedProperties = {
  mobile: false
}

const SharedContext = createContext(sharedProperties);

export {
  SharedContext,
}
