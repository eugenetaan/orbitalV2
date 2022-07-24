import axios from "axios"
import { sessionStorage } from "../localstorage"
import { logBillsToDB } from "./dbLogDataFunctions"


const monthsWith31Days = [1,3,5,7,8,10,12]

const monthsWith30Days = [4,6,9,11]

const handleBillDueNotification = () => {
    axios
        .post(`https://app.nativenotify.com/api/indie/notification`, {
            subID: sessionStorage.getItem("email"),
            appId: 3313,
            appToken: 'pHNaixT134xYCkOZbPDsMA',
            title: 'Bill Due',
            message: 'One or more of your bills is due for payment.'
        })
}


const addDaysToDate = (currentDate, daysToAdd) => {
    var date = new Date(currentDate);
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString();
}

const updateDueDateOfBills = () => {
    var bills = sessionStorage.getItem('bills')
    var date = new Date().toISOString().slice(0,10);

    for (let i = 0; i < bills.length; i++) {
        var bill = bills[i]
        let newDue;
        var currentDate = new Date(bill.nextDue)
        if (bill.nextDue.slice(0,10) <= date) {
            if (bill.billPeriod == "Weekly") {
            
                newDue = addDaysToDate(currentDate, 7);

            } else if (bill.billPeriod == "Monthly") {
                
                newDue = addDaysToDate(currentDate, 30);

                // var currentMonth = parseInt(bill.nextDue.slice(5,7));
                // var currentDay = parseInt(bill.nextDue.slice(8,10));
                // // case 1 december to jan (case 2 wont matter since jan and dec have both 31 days)
                // if (currentMonth == 12) {
                //     var newDue = (bill.nextDue.slice(0,5) + "01" + bill.nextDue.slice(7, bill.nextDue.length))
                // // case 2 month no 30/31    
                // } else if (currentDay > 28) {
                //     var nextMonth = currentMonth + 1;
                //     if (nextMonth == 2) {
                //         var newDue = (bill.nextDue.slice(0,5) + (currentMonth+1).toString() + ""  bill.nextDue.slice(10, bill.nextDue.length))
                //     }
                // } else {
                //     var newDue = (bill.nextDue.slice(0,5) + (currentMonth+1).toString() + bill.nextDue.slice(7, bill.nextDue.length))
                // }
            } else if (bill.billPeriod == "Daily") {
                newDue = addDaysToDate(currentDate, 1);

            } else {
                var currentYear = parseInt(bill.nextDue.slice(0,4));
                var newYear = (currentYear + 1).toString();
                newDue = (newYear + bill.nextDue.slice(4, bill.nextDue.length))
            }
        }
        bill.nextDue = newDue;
    }; 

    sessionStorage.setItem("bills", bills);
    logBillsToDB();

}

const checkIfBillsDue = () => {
    const date = new Date().toISOString().slice(0,10)
    var bills = sessionStorage.getItem('bills')

    for (let i = 0; i < bills.length; i++) {
        if (bills[i].nextDue.slice(0,10) <= date) {
            return true;
        }
    }; 
    return false;
}


export {handleBillDueNotification, checkIfBillsDue, updateDueDateOfBills};