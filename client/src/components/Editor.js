import React, { useState } from "react"
import "../styles/editor.scss"
import { CompactPicker } from "react-color"
import DrawingPanel from "./DrawingPanel"

export default function Editor() {
  const [panelWidth] = useState(10)
  const [panelHeight] = useState(15)
  const [hideOptions, setHideOptions] = useState(false)
  const [hideDrawingPanel, setHideDrawingPanel] = useState(true)
  const [buttonText, setButtonText] = useState("start drawing")
  const [selectedColor, setColor] = useState("#f44336")

  function initializeDrawingPanel() {
    setHideOptions(!hideOptions)
    setHideDrawingPanel(!hideDrawingPanel)

    buttonText === "start drawing"
      ? setButtonText("reset")
      : setButtonText("start drawing")
  }

  function changeColor(color) {
    setColor(color.hex)
  }

  return (
    <div id="editor">
      <h1>Waterbender</h1>
      {hideDrawingPanel && <h2>Dimensions of Drawing</h2>}
      {hideDrawingPanel && (
        <div id="options">
          <div className="option">
            {/* <input
              type="number"
              className="panelInput"
              defaultValue={panelWidth}
              onChange={(e) => {
                setPanelWidth(e.target.value)
              }}
            /> */}
            <div 
            type = "number"
            className="panelInput">
              {panelWidth}
            </div>
            <span>Width</span>
          </div>
          <div className="option">
            {/* <input
              type="number"
              className="panelInput"
              defaultValue={panelHeight}
              onChange={(e) => {
                setPanelHeight(e.target.value)
              }}
            /> */}
            <div 
            type = "number"
            className="panelInput">
              {panelHeight}
            </div>
            <span>Height</span>
          </div>
        </div>
      )}

      <button onClick={initializeDrawingPanel} className="button">
        {buttonText}
      </button>

      {hideOptions && (
        <CompactPicker color={selectedColor} onChangeComplete={changeColor} />
      )}

      {hideOptions && (
        <DrawingPanel
          width={panelWidth}
          height={panelHeight}
          selectedColor={selectedColor}
        />
      )}
    </div>
  )
}
