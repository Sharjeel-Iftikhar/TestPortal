import React from 'react';


let hocRenderCount = 0;


const withQuizGuard = (WrappedComponent) => {
  return (props) => {
    hocRenderCount++;
    console.log(`HOC component render count: ${hocRenderCount}`)


    return <WrappedComponent {...props} />;
  };
};

export default withQuizGuard;
