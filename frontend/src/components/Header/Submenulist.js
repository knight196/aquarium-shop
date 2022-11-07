import {useState} from 'react'
import {Link} from 'react-router-dom'
import './Header.css'

export default function Submenulist({title,list,Linked}) {

    const [showInfo,setShowInfo] = useState(false);

  return (
    <>
       <div className="px-2 question accordion">
<div className="d-flex justify-content-between align-items-center">
    <p><Link to={Linked}>{title}</Link></p>
    <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? "-" : "+"}</button>
</div>
{showInfo && (
  <>
  {list.map((item)=> (
    <>
    <p className="h5"><Link to={item.link}>{item.listitem}</Link></p>
    </>
  ))}
  </>
)}
  </div>
    </>
  )
}
