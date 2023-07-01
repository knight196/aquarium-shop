import React from 'react'

export default function Pagination({currentPage,setCurrentPage,currentPosts}) {

    function pagination(sign){
        if(sign === '+'){
                setCurrentPage(currentPage + 1)
        }else{
            setCurrentPage(currentPage - 1)
        }
    
    }

  return (
    <>
       
        <div className="my-2 d-block text-center">
        <button disabled={currentPage === 1 || currentPosts.length === 1} className='btn bg-primary rounded-0 text-white' onClick={()=> pagination('-')}>Prev</button>
        <span className="mx-2">{currentPage}</span>
        <button disabled={currentPage >= currentPosts.length} className="btn bg-primary rounded-0 text-white" onClick={()=> pagination('+')}>Next</button>
        </div>
        
    
    </>
  )
}
