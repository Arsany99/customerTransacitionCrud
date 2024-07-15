import React from 'react';
import { useSpring, animated } from 'react-spring';

const AnimatedBackground = () => {
  const props = useSpring({
    from: { backgroundPosition: '0% 50%' },
    to: async (next) => {
      while (1) {
        await next({ backgroundPosition: '100% 50%' });
        await next({ backgroundPosition: '0% 50%' });
      }
    },
    config: { duration: 15000 },
  });

  return (
    <animated.div
      className="animated-background"
      style={{
        ...props,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(270deg, #ff6ec4, #7873f5, #ff6ec4)',
        backgroundSize: '600% 600%',
        zIndex: -1, // Ensure the background is behind other content
      }}
    />
  );
};

export default AnimatedBackground;

