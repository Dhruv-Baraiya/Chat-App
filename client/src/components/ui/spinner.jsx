import React from 'react'
import { Oval } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
      <Oval
        height="80"
        width="80"
        color="#fff" // Ensuring black color for the spinner
        secondaryColor="#888"
        animationDuration="0.75"
        radius="1"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loading;
