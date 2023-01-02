import {menuArray} from '/data.js'

const orderBtn = document.getElementById('order-btn')
const mainEl = document.querySelector('.main')
const orders= document.querySelector('.orders')
const modal = document.getElementById('modal')
let total = 0
let idArr = []



document.addEventListener('click',function(e){
    if(e.target.id == 'close-btn'){
        location.reload()
    }
})


orderBtn.addEventListener('click', function(){
    modal.style.display = 'block'
})
form.addEventListener('submit', completeOrder)

mainEl.addEventListener('click', function(e){
    if(e.target.id){
        getOrders(e.target.id)
        document.querySelector('.orders').style.display = 'block'
    }
    
})



function getOrders(id){
    
   const order = menuArray.filter(function(menu){
       return menu.id == id
   })[0]
        
   if(!idArr.includes(id)){
       
         total = total + order.price
        document.querySelector('.order-list').innerHTML += `<div class='container'>
                                                    <div class='order-tag'>
                                                        <h3>${order.name}</h3>
                                                        <button class='remove-btn' 
                                                        id='remove${id}'>
                                                        remove</button>
                                                        <p class='order-price'>$${order.price}</p>
                                                    </div>
                                                    </div>`
    
            document.querySelector('.total-price').innerHTML = `
                                                            <h3>total</h3>
                                                            <p>$${total}</p>
                                                        ` 
            idArr.push(order.id)
        
         
   }
   
    orders.addEventListener('click', function(e){
             if(e.target.id=== `remove${id}`){
             removeItem(e.target.id, order)
                    }
              })  
    
   
}


function completeOrder(){
       modal.innerHTML=  `<div class='order-loading'>
                            <h3> kindly wait</h3>
                            <img src='images/loading.svg'>
                         </div>   
                        `
    setTimeout(function(){
        modal.innerHTML = ` <div class='order-completed'>
                            <h1>Your Order is sucessfully completed</h1>
                             <h2>Thankyou for purchasing from our site</h2>
                             </div>
                             <button id = 'close-btn' class="close-btn">❌</button>
                          `
    }, 3000)}


function removeItem(removeid, order){
       document.querySelector('.total-price').innerHTML = `
                                                            <h3>total</h3>
                                                            <p>$${total}</p>
                                                        `
    
    let id = parseInt(removeid.slice(6))
    let index = idArr.indexOf(id)
     document.getElementById(removeid).parentElement.style.display = 'none' 

    idArr = idArr.filter(function(idel, index){
        return idel != id
    })

    if (idArr.length === 0){
        location.reload()
    }

}

function renderMenu(){
    let renderHtml = ''
    for(let menu of menuArray){
        const {name , ingredients, id, price, emoji} = menu
        
        renderHtml += `<div class='menu'>
                            <div class='emoji' >${emoji}</div>
                            <div class='menu-content'>
                                <h3>${name}</h3>
                                <p class = 'ingredients'>${ingredients}</p>
                                <p>$${price}</p>
                            </div>
                            <button class='btn' id='${id}'' >+</button>
                        </div>
                    `
    }
    
    mainEl.innerHTML = renderHtml
}

renderMenu()