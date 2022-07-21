import { sessionStorage } from "../localstorage";


// For PIE CHART
const pieChartColours = [ {color: "#2085ec"}, {color: "#72b4eb"}, {color:"#0a417a"}, {color:"#8464a0"}, {color: "#cea9bc"}]

const getCatsAsArray = () => {
    var cats = sessionStorage.getItem('Cats');

    let catsArray = [];
    cats.forEach(cat => {
        catsArray.push(cat.value);
    })
    return catsArray;
}


const getCategoricalSpending = () => {
    var expenses = sessionStorage.getItem('expenses');
    const catsAvailable = getCatsAsArray();
    var filteredCatSpending = []

    catsAvailable.forEach(cat => {
        var filteredExpenseArray = expenses.filter(exp => {
            return exp.cat === cat;
        })

        var catSpending = 0.0;

        filteredExpenseArray.forEach(exp => {
            catSpending += parseFloat(exp.amount);
        })

        catSpending = { name : cat, totalSpend : catSpending}
        filteredCatSpending.push(catSpending)
    })

    return filteredCatSpending;
}

const getTopFourCatsSpending = () => {
    var spending = getCategoricalSpending();
    var sortedSpending = spending.sort(function(a, b){return b.totalSpend - a.totalSpend})
    
    if (spending.length > 4) {
        var top4 = sortedSpending.slice(0, 4);
        var others = sortedSpending.slice(4, spending.length);

        var othersTotalSpend = 0;
    
        // combine others into one
        others.forEach(cat => {
            othersTotalSpend += cat.totalSpend;
        })

        top4.push({name: 'Others', totalSpend: othersTotalSpend})
        
        return top4;
    }
    return sortedSpending
}

const addColoursToCats = () => {
    var sortedCats = getTopFourCatsSpending();

    for (let i = 0; i < sortedCats.length; i++) {
        sortedCats[i].color = pieChartColours[i].color;
        sortedCats[i].legendFontColor = "#7F7F7F";
        sortedCats[i].legendFontSize = 14;
    }

    return sortedCats
}



// For Line Chart

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

//For Label
const getLatestSixMonths = () => {
    if (sessionStorage.getItem('expenses').length == 0) {
        var latestMonth = new Date().toISOString().slice(5,7)
        var latestYear = new Date().toISOString().slice(2,4)
        var lastYear = (parseInt(latestYear) - 1).toString()
    } else {
        var latestExpense = sessionStorage.getItem('expenses')[0];
        var latestYear = latestExpense.date.slice(2,4);
        var lastYear = (parseInt(latestYear) - 1).toString()
        var latestMonth = parseInt(latestExpense.date.slice(5,7))
    }
    var sixMonths = [];

    for (let i = latestMonth - 1; i > latestMonth - 7; i--) {
        if ( i >= 0) {
            sixMonths.push(months[i] + " " + latestYear);
        } else {
            sixMonths.push(months[i+12] +  " " + lastYear);
        }
    }
    return sixMonths.reverse();    
}


const getTotalSpendForMonth = (monthAndYear) => {
    var expenses = sessionStorage.getItem('expenses')
    var totalExpense = expenses.filter((exp => { return exp.date.slice(0,7)===monthAndYear})).reduce((x,y) => x + parseFloat(y.amount), 0);

    return totalExpense;
}

// For Actual Data
const getSpendingForLatestSixMonths = () => {
    if (sessionStorage.getItem('expenses').length == 0) {
        return (
            [0,0,0,0,0,0]
        )
    }

    var latestExpense = sessionStorage.getItem('expenses')[0];
    var latestYear = latestExpense.date.slice(0,4);
    var latestMonth = parseInt(latestExpense.date.slice(5,7));
    
    var lastSixMonthExpensesArray = [];
    var monthInString = "";
    var lastYear = "";
    var totalSpend = 0;
    let j;

    for (let i = latestMonth; i > latestMonth - 6; i--) {
        if (i > 0) {
            monthInString = (i.toString().length > 1 ? i.toString() : "0" + i.toString());
            totalSpend = getTotalSpendForMonth(latestYear+ "-" + monthInString);
            lastSixMonthExpensesArray.push(totalSpend);
        } else {
            j = i + 12
            monthInString = (j.toString().length > 1 ? j.toString() : "0" + j.toString());
            lastYear = (parseInt(latestYear) - 1).toString();
            totalSpend = getTotalSpendForMonth(lastYear+ "-" + monthInString);
            lastSixMonthExpensesArray.push(totalSpend);
        }

    }

    return lastSixMonthExpensesArray.reverse();
    
}

// check if any expense with category to prevent deletion

const checkIfCatHasExpense = (cat) => {
    var filteredExpenses = sessionStorage.getItem("expenses").filter((exp => {return exp.cat == cat}))

    if (filteredExpenses.length == 0) {
        return true;
    } else {
        return false;
    }
    
}

export {addColoursToCats, getLatestSixMonths, getSpendingForLatestSixMonths, checkIfCatHasExpense};


