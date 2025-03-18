document.addEventListener("DOMContentLoaded", ()=> {
    const form = document.querySelector("form#transaction-form")
    form.addEventListener("submit", handleSubmit)
})

let counter = 1
let transactions = []

function handleSubmit(event){
    event.preventDefault()
    const transaction = {
        id: counter++,
        type: event.target.type.value,
        amount: event.target.amount.value
    }
    transactions = [...transactions, transaction] // same as transations.push(transaction)
    renderTransactions(transactions)
    event.target.reset()
}

//display transactions to the table
function renderTransactions(transactions){
    const tbody = document.querySelector("#transactions")
    tbody.innerHTML = ''

    transactions.forEach((transaction, index)=> {
        tbody.innerHTML += `
        <tr>
         <td>${index + 1}</td>
         <td>${transaction.type}</td>
         <td>${transaction.amount}</td>
         <td>
             <button onclick='removeTransaction(${transaction.id})' class='btn btn-danger btn-sm'>X</button>
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