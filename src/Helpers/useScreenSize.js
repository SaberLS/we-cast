import { useState, useEffect } from 'react';

// Define the theme for your application
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update the screen size whenever the window resizes
  useEffect(() => {
    const handleResize = () => {
      // Update the state with the new screen size
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener to the window object
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Return the current screen size as a prop to the component
  return screenSize;
};

export default useScreenSize;

// Usage in your component: screen size will be available as a prop in the constructor function below and will be updated whenever the window size changes

// class MyComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       screenSize: useScreenSize(),
//     };
//   }

//   render() {
//     return (
//       <div>
//         Screen size: {this.state.screenSize.width} x {this.state.screenSize.height}
//       </div>
//     );
//   }
// }

// Alternatively, you can use the hook directly in your component:

// function MyComponent() {
// const screenSize = useScreenSize();

// return (
//   <div>
//     Screen size: {screenSize.width} x {screenSize.height}
//   </div>
// );
// }
