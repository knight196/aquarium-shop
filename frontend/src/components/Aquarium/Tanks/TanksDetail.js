import {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import TanksInfo from './TanksInfo'

export default function TanksDetail() {
  
  
  const {slug} = useParams();
  const [details,setdetails] = useState([])

  const fetchData = async () => {
    const res = await axios.get(`/api/tanks/slug/${slug}`)
    setdetails(res.data)
  }

  useEffect(()=> {
    fetchData();
  },[slug])
  
    return (
    <div>
      <TanksInfo detail={details}/>
    </div>
  )
}
