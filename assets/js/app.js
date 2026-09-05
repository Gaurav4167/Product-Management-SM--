var cl = console.log;

let productDetails = [{
    productName : "Laptop",
    category : "Electronics",
    price : "46000",
    stock : "23",
    productId : "111"
},{
    productName : "Shirt",
    category : "Clothing",
    price : "2100",
    stock : "78",
    productId : "112"

}]

let tbody = document.getElementById("tbody")
let form = document.getElementById("form")
let productName = document.getElementById("productName")
let category = document.getElementById("category")
let price = document.getElementById("price")
let stock = document.getElementById("stock")
let addBtn = document.getElementById("addBtn")
let updateBtn = document.getElementById("updateBtn")

if(!sessionStorage.getItem("products")){
    sessionStorage.setItem("products", JSON.stringify(productDetails))
}

let products = JSON.parse(sessionStorage.getItem("products"))
// cl(products)

// ====================================== 1. Templating ==========================================
function templatingProducts(productsArray){

    let result = "";
    productsArray.forEach((product,i) => {
        result += `
         <tr id=${product.productId}>
                            <td> ${i+1} </td>
                            <td> ${product.productName} </td>
                            <td> ${product.category} </td>
                            <td class="color-blue"> ${product.price}</td>
                            <td class="color-green"> ${product.stock}</td>
                            <td><button onClick="editProduct(this)" class="btn btn-warning">Edit</button></td>
                            <td><button onClick="deleteProduct(this)" class="btn btn-danger">Delete</button></td>
                        </tr>
                        `
    })
    tbody.innerHTML = result
}

templatingProducts(products)

// ====================================== 2. Adding new Product ==========================================
function addNewProduct(ele){
    ele.preventDefault()

    let newProduct ={
    productName : productName.value,
    category : category.value,
    price : price.value,
    stock : stock.value,
    productId : String(Date.now())
}
    products.push(newProduct)
    sessionStorage.setItem("products",JSON.stringify(products))

    tbody.innerHTML += `
                      <tr id=${newProduct.productId}>
                            <td> ${products.length} </td>
                            <td>${newProduct.productName}</td>
                            <td>${newProduct.category}</td>
                            <td class="color-blue">${newProduct.price}</td>
                            <td class="color-green">${newProduct.stock}</td>
                            <td><button onClick="editProduct(this)" class="btn btn-warning">Edit</button></td>
                            <td><button onClick="deleteProduct(this)" class="btn btn-danger">Delete</button></td>
                        </tr>
                        `

    form.reset()
}

// ====================================== 3. Edit Product ==========================================
function editProduct(ele){
    let EDIT_ID = ele.closest("tr").id
    // cl(EDIT_ID)

    let getProduct = products.find((ele) => {
        return ele.productId === EDIT_ID
    })

     productName.value = getProduct.productName
     category.value = getProduct.category
     price.value = getProduct.price
     stock.value = getProduct.stock

     addBtn.classList.add("d-none");
     updateBtn.classList.remove("d-none")

     sessionStorage.setItem("EDIT_ID",EDIT_ID)

}


// ====================================== 4. Update Product ==========================================
function updateProduct(ele){
    let UPDATE_ID = sessionStorage.getItem("EDIT_ID")
    sessionStorage.removeItem("EDIT_ID")
    // cl(UPDATE_ID)

    let getIndex = products.findIndex(ele => ele.productId === UPDATE_ID)

    let updatedProduct = {
         productName : productName.value,
         category : category.value,
         price : price.value,
         stock : stock.value,
         productId : UPDATE_ID
    }

    products[getIndex] = updatedProduct

    sessionStorage.setItem("products", JSON.stringify(products))

    let updateTr = document.getElementById(UPDATE_ID)
    updateTr.innerHTML = ` <td> ${products.length} </td>
                            <td>${updatedProduct.productName}</td>
                            <td>${updatedProduct.category}</td>
                            <td class="color-blue">${updatedProduct.price}</td>
                            <td class="color-green">${updatedProduct.stock}</td>
                            <td><button onClick="editProduct(this)" class="btn btn-warning">Edit</button></td>
                            <td><button onClick="deleteProduct(this)" class="btn btn-danger">Delete</button></td>`

    addBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")


}

// ====================================== 5. Delete Product ==========================================
function deleteProduct(ele){
    let DELETE_ID = ele.closest("tr").id

    let getIndex = products.find(ele => ele.productId === DELETE_ID)

    products.splice(getIndex, 1)
    sessionStorage.setItem("products", JSON.stringify(products))

    ele.closest("tr").remove()

    //Updating Table Sr Number
    let td = document.querySelectorAll("tbody tr");
    td.forEach((ele, i) => {
        ele.querySelector("td").innerText = i+1
    })
    
}

form.addEventListener("submit", addNewProduct)
updateBtn.addEventListener("click", updateProduct)



























