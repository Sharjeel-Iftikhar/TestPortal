import React from 'react';

const withQuizGuard = (WrappedComponent) => {
  return (props) => {
    


    return <WrappedComponent {...props} />;
  };
};

export default withQuizGuard;
