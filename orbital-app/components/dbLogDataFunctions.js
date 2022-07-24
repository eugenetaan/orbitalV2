import { sessionStorage } from "../localstorage";
import { db } from '../Firebase'


const logExpenseToDB = () => {
    var currentUserEmail = sessionStorage.getItem('email')
    var expensesNew = sessionStorage.getItem('expenses')

    db.collection('profiles')
    .doc(currentUserEmail)
    .update({
        expenses : expensesNew
    })
}

const changeUsername = (newUsername) => {
    var currentUserEmail = sessionStorage.getItem('email')

    db.collection('profiles')
    .doc(currentUserEmail)
    .update({
        username : newUsername
    })
}


const logBudgetToDB = () => {
    var currentUserEmail = sessionStorage.getItem('email')
    var budgetNew = sessionStorage.getItem('budget')
    var budgetStartDateNew = sessionStorage.getItem('budgetStartDate').toISOString()
    var budgetEndDateNew = sessionStorage.getItem('budgetEndDate').toISOString()

    db.collection('profiles')
    .doc(currentUserEmail)
    .update({
        budget : budgetNew,
        budgetStartDate : budgetStartDateNew,
        budgetEndDate : budgetEndDateNew
    })
}

const logCategoriesToDB = () => {
    var currentUserEmail = sessionStorage.getItem('email')
    var categoriesNew = sessionStorage.getItem('Cats')

    db.collection('profiles')
    .doc(currentUserEmail)
    .update({
        categories : categoriesNew
    })

}


const logBillsToDB = () => {
    var currentUserEmail = sessionStorage.getItem('email')
    var billsUpdated = sessionStorage.getItem('bills')

    db.collection('profiles')
    .doc(currentUserEmail)
    .update({
        bills : billsUpdated
    })

}

export {logBudgetToDB, logCategoriesToDB, logExpenseToDB, changeUsername, logBillsToDB};