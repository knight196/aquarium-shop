import {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import TanksInfo from './TanksInfo'
import Loaders from '../../Loaders'

export default function TanksDetail() {
  
  
  const {slug} = useParams();
  const [details,setdetails] = useState([])


  const [loading,setloading] = useState(false)

  const fetchData = async () => {
    const res = await axios.get(`/api/tanks/slug/${slug}`)
    setdetails(res.data)
    setloading(true)
  }

  useEffect(()=> {
    fetchData();
  },[slug])
  
    return (
    <>
      {loading ?
      <div>
      <TanksInfo detail={details}/>
      </div> : <Loaders/>
    }
    </>
  )
}
