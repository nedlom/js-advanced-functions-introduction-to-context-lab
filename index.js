// Your code here
function createEmployeeRecord(employee) {
  const employeeRecord = {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return employeeRecord;
};

function createEmployeeRecords(employees) {
  return employees.map(createEmployeeRecord);
};

function createTimeInEvent(record, dateStamp) {
  let dateArray = dateStamp.split(" ")
  const timeIn = {
    type: "TimeIn",
    date: dateArray[0],
    hour: parseInt(dateArray[1], 10)
  }
  record.timeInEvents.push(timeIn);
  return record;
};

function createTimeOutEvent(record, dateStamp) {
  let dateArray = dateStamp.split(" ")
  const timeOut = {
    type: "TimeOut",
    date: dateArray[0],
    hour: parseInt(dateArray[1], 10)
  }
  record.timeOutEvents.push(timeOut);
  return record;
};

function hoursWorkedOnDate(record, date) {
  const timeIn = record.timeInEvents.find(function(e){return e.date === date}).hour
  const timeOut = record.timeOutEvents.find(function(e){return e.date === date}).hour
  return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(record, date) {
  return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record) {
  const datesWorked = record.timeInEvents.map(function(e){return e.date})
  const payEarned = datesWorked.map(function(e){return wagesEarnedOnDate(record, e)});
  return payEarned.reduce(function(e, v){return e + v})
}

function calculatePayroll(records) {
  const wages = records.map(function(e) {return allWagesFor(e)});
  return wages.reduce(function(e, v) {return e + v});
}

function findEmployeeByFirstName(records, firstName) {
  return records.find(function(e) {return e.firstName === firstName})
}



