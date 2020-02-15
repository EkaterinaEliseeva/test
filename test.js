// get play
function getPlay(perfomance) {
  return plays[perfomance.playID];
}

// get the cost of the performance
function amount(perfomance) {

  let thisAmount = 0;

  switch (getPlay(performance).type) {
    case "tragedy":
      thisAmount = 40000;
      if (perfomance.audience > 30) {
        thisAmount += 1000 * (perfomance.audience - 30);
      }
      break;
  case "comedy":
    thisAmount = 30000;
    if (perfomance.audience > 20) {
      thisAmount += 10000 + 500 * (perfomance.audience - 20);
    }
    thisAmount += 300 * perfomance.audience;
    break;
  default:
    throw new Error(`неизвестный тип: ${getPlay(performance).type}`);
  }

  return thisAmount;
}

// get bonus size
function getVolumeCredits(performance) {
  let volumeCredits = 0;

  // add bonus
  volumeCredits += Math.max(performance.audience - 30, 0);

  // bonus for comedies
  if ("comedy" === getPlay(performance).type) {
    volumeCredits += Math.floor(performance.audience / 5);
  }
  return volumeCredits;
}

// format in RUB
function rubFormat(number) {
  return new Intl.NumberFormat("ru-RU",
          { style: "currency", currency: "RUB",
          minimumFractionDigits: 2 }).format(number / 100);
}

// get the total amount
function getTotalAmount() {
  let totalAmount = 0;
  for (let performance of invoice.performances) {
    totalAmount += amount(performance);
  }
  return totalAmount;
}

// get the total volume credits
function getTotalVolumeCredits() {
  let totalVolumeCredits = 0;
  for (let performance of invoice.performances) {
    totalVolumeCredits += getVolumeCredits(performance);
  }
  return totalVolumeCredits;
}


function statement(invoice, plays) {
  
  let result = `Счет для ${invoice.customer}\n`;

  for (let performance of invoice.performances) {
    result += ` ${getPlay(performance).name}: ${rubFormat(amount(performance))}`;
    result += ` (${perf.audience} мест)\n`;
  }

  result += `Итого с вас ${rubFormat(getTotalAmount())}\n`;
  result += `Вы заработали ${getTotalVolumeCredits()} бонусов\n`;
  return result;

}

