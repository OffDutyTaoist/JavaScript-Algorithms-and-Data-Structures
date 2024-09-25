const price = 19.5;
let cid = [
  ['PENNY', 0.5],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];

const cashInput = document.getElementById("cash");
const changeDueElement = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

const currencyUnits = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100]
];

function checkCashRegister(price, cash, cid) {
  let changeDue = cash - price;
  let totalInDrawer = cid.reduce((total, denom) => total + denom[1], 0).toFixed(2);

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (changeDue === 0) {
    changeDueElement.textContent = "No change due - customer paid with exact cash";
    return;
  }

  if (parseFloat(totalInDrawer) < changeDue) {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  if (parseFloat(totalInDrawer) === changeDue) {

    let sortedCid = [...cid].reverse();
    
    let closedChange = cid
      .filter(([_, amount]) => amount > 0)
      .map(([name, amount]) => `${name}: $${amount.toFixed(2)}`);
      
    changeDueElement.textContent = `Status: CLOSED ${closedChange.join(' ')}`;
    return;
  }

  let changeArray = [];
  let remainingChange = changeDue;
  
  for (let i = currencyUnits.length - 1; i >= 0; i--) {
    let currencyName = currencyUnits[i][0];
    let currencyValue = currencyUnits[i][1];
    let currencyAvailable = cid[i][1];

    if (remainingChange >= currencyValue) {
      let amountFromThisCurrency = 0;
      
      while (remainingChange >= currencyValue && currencyAvailable > 0) {
        remainingChange = (remainingChange - currencyValue).toFixed(2);
        currencyAvailable -= currencyValue;
        amountFromThisCurrency += currencyValue;
      }

      if (amountFromThisCurrency > 0) {
        changeArray.push([currencyName, amountFromThisCurrency]);
      }
    }
  }

  if (remainingChange > 0) {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
  } else {
    changeDueElement.textContent = `Status: OPEN ${changeArray.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(' ')}`;
  }
}

purchaseBtn.addEventListener("click", () => {
  const cash = parseFloat(cashInput.value);
  checkCashRegister(price, cash, cid);
});
