import { sessionStorage } from "../localstorage";

const pieChartColours = [ {color: "#2085ec"}, {color: "#72b4eb"}, {color:"#0a417a"}, {color:"#8464a0"}]


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

const getTopThreeCatsSpending = () => {
    var spending = getCategoricalSpending();
    var sortedSpending = spending.sort(function(a, b){return b.totalSpend - a.totalSpend})
    
    if (spending.length > 3) {
        var top3 = sortedSpending.slice(0, 3);
        var others = sortedSpending.slice(3, spending.length);

        var othersTotalSpend = 0;
    
        // combine others into one
        others.forEach(cat => {
            othersTotalSpend += cat.totalSpend;
        })

        top3.push({name: 'Others', totalSpend: othersTotalSpend})
        
        return top3;
    }
    return sortedSpending
}

const addColoursToCats = () => {
    var sortedCats = getTopThreeCatsSpending();

    for (let i = 0; i < sortedCats.length; i++) {
        sortedCats[i].color = pieChartColours[i].color;
        sortedCats[i].legendFontColor = "#7F7F7F";
        sortedCats[i].legendFontSize = 14;
    }

    return sortedCats
}



export {getCatsAsArray, getCategoricalSpending, addColoursToCats};


