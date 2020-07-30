export const isApple = () => {
  return (
    /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent) && !window.MSStream
  );
};
