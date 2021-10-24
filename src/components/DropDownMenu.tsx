import React from "react"
import { useState } from "preact/hooks"
import MenuButton from "./MenuButton"

const DropDownMenu: React.FC = ({children}) => {
  const [isVisible, setIsVisible] = useState(false)

  const _handleClick = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div>
      <div><MenuButton isVisible={isVisible} onClick={_handleClick} /></div>
      <div className={`p-4 ${isVisible ? "block" : "hidden "}`}>
        {children}
      </div>
    </div>
  )
}

export default DropDownMenu
