import React, { useEffect, useRef, useState } from 'react'

const InViewImage = ({ src, alt, style ,  ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsLoaded(true);
            observer.disconnect();
          }
        },
        {
          rootMargin: '100px',
        }
      );
  
      if (imgRef.current) {
        observer.observe(imgRef.current);
      }
  
      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current);
        }
      };
    }, [imgRef]);
  
    return (
      <img
        ref={imgRef}
        src={isLoaded ? src : ''}
        alt={alt}
        {...props}
        style={{ ...style , opacity: isLoaded ? 1 : 0.5  }}
      />
    );
}

export default InViewImage