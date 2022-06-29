import { sessionStorage } from "../localstorage";




function calcTotalExpensesDuringBudgetDates() {
    var budgetStartDate = sessionStorage.getItem('budgetStartDate');
    var budgetEndDate = sessionStorage.getItem('budgetEndDate');
    // console.log(budgetStartDate.toISOString())
    // console.log(budgetEndDate.toISOString())
    var filteredExpenseArray = sessionStorage.getItem('expenses').filter(exp => {
        return new Date(exp.date) <= budgetEndDate && new Date(exp.date) >= budgetStartDate;
    })
    if (filteredExpenseArray.length == 0) {
        return 0;
    }
    var totalExpenseAmount = filteredExpenseArray
        .reduce(function(accumulator, curExpense) {return accumulator + parseFloat(curExpense.amount)}, 0)
    // console.log(totalExpenseAmount)
    return totalExpenseAmount;
}

function calcRemaingBudget() {
    var budget = sessionStorage.getItem('budget');
    if (budget === 'No Budget Set') {
        // console.log(1)
        // console.log({budget})
        return "No Budget Set"
    } else {
        // console.log(2)
        // console.log({budget})
        budget = parseFloat(sessionStorage.getItem('budget'));
        var totalExpense = calcTotalExpensesDuringBudgetDates();
        return (budget - totalExpense).toFixed(2);
    }
}


export {calcTotalExpensesDuringBudgetDates, calcRemaingBudget};

