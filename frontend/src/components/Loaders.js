export default function Loaders() {



  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh',flexDirection:'column'}} className="loader-animated">

<video width="100px" height="100px" loop="true" autoplay="true" muted>
  <source src="https://cdn-icons-mp4.flaticon.com/512/8718/8718553.mp4"/>
  </video>      
<p>Loading....</p>

    </div>
  )
}
