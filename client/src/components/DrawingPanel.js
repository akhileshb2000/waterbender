import React, { useRef } from "react"
import "../styles/drawingPanel.scss"
import Row from "./Row"

const axios = require('axios').default;

export default function DrawingPanel(props) {
  const { width, height, selectedColor } = props

  const panelRef = useRef()

  let rows = []

  for (let i = 0; i < height; i++) {
    rows.push(<Row key={i} width={width} selectedColor={selectedColor} />)
  }

  function sendImage() {
    let data = []
    for (const row of panelRef.current.childNodes.values()) {
      let newRow = []
      for (const pixel of row.childNodes) {
        let val = (pixel.attributes.style.nodeValue === "background-color: rgb(255, 255, 255);") ? 0 : 1;
        newRow.push(val)
      }
      data.push(newRow)
    }

    // Send data via server to RPI
    console.log("Sending request", data);
    axios.post("http://localhost:8080/draw", data).then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const onSubmit = React.useCallback(async () => {
    let data = []
    for (const row of panelRef.current.childNodes.values()) {
      let newRow = []
      for (const pixel of row.childNodes) {
        let val = (pixel.attributes.style.nodeValue === "background-color: rgb(255, 255, 255);") ? 0 : 1;
        newRow.push(val)
      }
      data.push(newRow)
    }

    // Send data via server to RPI
    console.log("Sending request", data);
    axios.post("http://localhost:8080/post").then((response) => {
      console.log("HERHE")
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  });
  
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
