import React from 'react'
import './Tanks.css'

export default function SelectorButton({active,toggleTab,index, type,handleClick}) {
  return (
    <div onClick={()=> {handleClick(type); toggleTab(index)}} className={active ? "selectorItem btnactive" : "selectorItem"}>
      {type}
    </div>
  )
}