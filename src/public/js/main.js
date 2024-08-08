console.log("Si funcionaaaaaaaaaaa");

const socket = io();




socket.on("product", data => {
        const card = document.getElementById("productsRealTime"); 
        let products= ""; 
    
        data.forEach( product => {
            products = products + `
    <ul>
        <li> ${product.title} </li>
        <li> ${product.description} </li>
        <li> ${product.price} </li>
        
    </ul>
    `;
        })
        card.innerHTML = products; 
    })
