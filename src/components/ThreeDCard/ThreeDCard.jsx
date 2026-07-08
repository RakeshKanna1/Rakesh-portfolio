import React, { createContext, useContext, useRef, useState, useEffect } from "react";

const MouseEnterContext = createContext(undefined);

export const CardContainer = ({
  children,
  className = "",
  containerClassName = ""
}) => {
  const containerRef = useRef(null);
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20; // rotation strength
    const y = (e.clientY - top - height / 2) / 20;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEnter(true);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEnter(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEnter, setIsMouseEnter]}>
      <div
        className={containerClassName}
        style={{
          perspective: "1000px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={className}
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.1s ease-out",
            position: "relative"
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({ children, className = "" }) => {
  return (
    <div
      className={className}
      style={{
        transformStyle: "preserve-3d",
        height: "100%",
        width: "100%"
      }}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className = "",
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  const ref = useRef(null);
  const contextValue = useContext(MouseEnterContext);
  const isMouseEnter = contextValue ? contextValue[0] : false;

  useEffect(() => {
    if (!ref.current) return;
    if (isMouseEnter) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  }, [isMouseEnter, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        transition: "transform 0.2s ease-out",
        display: "block",
        ...rest.style
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};
