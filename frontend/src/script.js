const  orderData = () =>{

    fetch('http://localhost:5000/orders/get',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({email:'test111@gmail.com'})
    })
    .then(res => res.json())
    .then(data => showdata(data))

 }
 
 orderData()
 
 const orderContainer = document.getElementById('order-container')
 
 function showdata(data){
 
 orderContainer.innerHTML = ''
 
 console.log(data)
 
 data.map(item => {
 
 const orderContainerDiv = document.createElement('div')
 
 orderContainerDiv.innerHTML = `
 
 <p>Order_id: ${item._id}</p>

 ${item.products?.map(item => {

    return `

     <div>

 <p>${item.title}</p>

 <img style="height:200px;width:200px;" src=${item.image.url} alt=${item.title}/>

 </div>
 `
 })}

 <hr>
 
 `
 
 orderContainer.appendChild(orderContainerDiv)
 
 })
 
 }