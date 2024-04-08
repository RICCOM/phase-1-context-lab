function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
    return this;
  }
  
  function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
    return this;
  }
  
  function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(event => event.date === date).hour;
    let timeOut = this.timeOutEvents.find(event => event.date === date).hour;
    return (timeOut - timeIn) / 100;
  }
  
  function wagesEarnedOnDate(date) {
    let hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  }
  
  function allWagesFor() {
    let datesWorked = this.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate.call(this, date), 0);
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => totalPayroll + allWagesFor.call(employee), 0);
  }
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      createEmployeeRecord,
      createEmployeeRecords,
      createTimeInEvent,
      createTimeOutEvent,
      hoursWorkedOnDate,
      wagesEarnedOnDate,
      allWagesFor,
      findEmployeeByFirstName,
      calculatePayroll
    };
  }
  