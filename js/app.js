/***
 * 
 * 
 * 
 */



document.addEventListener("DOMContentLoaded", ()=> {
    renderTransactions()
    const form = document.querySelector("form#transaction-form")
    form.addEventListener("submit", handleSubmit)
    // Efficient event delegation for removing transactions
    document.querySelector("#transactions").addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-remove")) {
            removeTransaction(Number(event.target.id)); // Ensure id is a number
        }
    });

})

let counter = 1
let transactions = []

function addtransaction(transaction){
    fetch("http://localhost:3000/transactions", {
        method: "POST",
        body: JSON.stringify(transaction)
    }).then((response)=> response.json())
    .then((data)=> {
        // transactions.push()
        renderTransactions([data])

    })
}

function getTransactions(){
    return fetch("http://localhost:3000/transactions", {
        method: "GET"
    }).then((response)=> response.json())
    .then((data)=> data)
}

function handleSubmit(event){
    event.preventDefault()
    const transaction = {
        id: counter++,
        type: event.target.type.value,
        amount: event.target.amount.value
    }

    addtransaction(transaction)

    event.target.reset()
}

//display transactions to the table
async function renderTransactions(transactions = []){
    const tbody = document.querySelector("#transactions")
    tbody.innerHTML = ''

    const d = await getTransactions()
    console.log(d)

    d.forEach((transaction, index)=> {
        tbody.innerHTML += `
        <tr>
         <td>${index + 1}</td>
         <td>${transaction.type}</td>
         <td>${transaction.amount}</td>
         <td>
             <button id='${transaction.id}'  class='btn-remove btn btn-danger btn-sm'>X</button>
         </td>
        </tr>
        `
    })
    
}


//Removing a transaction from the table
function removeTransaction(id){
    const filteredTransactions = transactions.filter((transaction)=> {
        return transaction.id !== id
    })
    transactions = [...filteredTransactions]
    renderTransactions(transactions)
}

