import React, { useState, useEffect, useRef } from "react";
var dragCounter = 0;
const DragDropImg = ({ handleDropEvent, ...props }) => {
  const dropRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
  };
  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };
  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter--;
    if (dragCounter === 0) {
      setDragging(false);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleDropEvent(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  useEffect(() => {
    let div = dropRef.current;
    console.log(div);
    // if (div !== null) {
    div.addEventListener("dragenter", handleDragIn);
    div.addEventListener("dragleave", handleDragOut);
    div.addEventListener("dragover", handleDrag);
    div.addEventListener("drop", handleDrop);
    // }

    return () => {
      div.removeEventListener("dragenter", handleDragIn);
      div.removeEventListener("dragleave", handleDragOut);
      div.removeEventListener("dragover", handleDrag);
      div.removeEventListener("drop", handleDrop);
    };
  }, []);

  return (
    <div
      ref={dropRef}
      style={{
        height: 100,
        width: "700px",
        border: "dashed grey 4px",
        display: "inline-block",
        position: "relative",
      }}
    >
      {/* {dragging && ( */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            left: 0,
            textAlign: "center",
            color: "grey",
            fontSize: 22,
          }}
        >
          {props.children ? (
            props.children
          ) : (
            <small>Drag and Drop files, paste screenshots or browse</small>
          )}
        </div>
      </div>
      {/* )} */}
      {console.log(props.children)}
      {/* {props.children} */}
    </div>
  );
};

export default DragDropImg;
