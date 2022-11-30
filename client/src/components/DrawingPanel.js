import React, { useRef } from "react"
import "../styles/drawingPanel.scss"
import Row from "./Row"
import axios from "axios";
// const axios = require('axios').default

export default function DrawingPanel(props) {
  const { width, height, selectedColor } = props

  const panelRef = useRef()

  let rows = []

  for (let i = 0; i < height; i++) {
    rows.push(<Row key={i} width={width} selectedColor={selectedColor} />)
  }

  const onSubmit = async () => {
    let image = []
    for (const row of panelRef.current.childNodes.values()) {
      let newRow = []
      for (const pixel of row.childNodes) {
        let val = (pixel.attributes.style.nodeValue === "background-color: rgb(255, 255, 255);") ? 0 : 1;
        newRow.push(val)
      }
      image.push(newRow)
    }

    // Send data to MongoDB
    let drawing = {
      image: image,
    }
    axios.post("http://localhost:5000/sendDrawing/", drawing).then((response) => {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  
  return (
    <div id="drawingPanel">
      <div id="pixels" ref={panelRef}>
        {rows}
      </div>
      <button onClick={onSubmit} className="button">
        Send Image
      </button>
    </div>
  )
}
