// This program calculates interest paid on a loan given the APR %, total
// loan amount, and a duration of the lone assuming the same payment amount each
// month.

// arguments needed:
//    aprPercentage = float
//    totalLoanAmount = int
//    loanDuration = int, time in years
//    epsilon = int, dollar amount degree of accuracy


function loanCalc (aprPercentage, totalLoanAmount, loanDuration, epsilon) {
  var monthlyPercentage = aprPercentage/12;
  var months = loanDuration * 12;
  var balance = totalLoanAmount;
  var totalPaid = 0;
  var hiGuess = ((balance*aprPercentage)+balance)/months;
  var lowGuess = balance/months;
  var monthlyPaymentGuess = (hiGuess+lowGuess)/2;
  console.log("Hi low Guess: "+lowGuess+","+hiGuess);


  while(Math.abs(balance) >= epsilon) {
      balance = totalLoanAmount;
      console.log("Payment Guess: "+monthlyPaymentGuess);

    for (var i = 0; i < months; i++) {
      balance += (balance * monthlyPercentage);
      balance -= monthlyPaymentGuess;
      totalPaid += monthlyPaymentGuess;
    }

    if (Math.abs(balance) <= epsilon) {
      console.log("Interest Paid: $"+(totalPaid - totalLoanAmount).toFixed(2));
      console.log("Monthly Payment: $"+(monthlyPaymentGuess).toFixed(2));
      }


    else if (balance < epsilon) {
    console.log(balance);
    console.log("Guess too high: "+monthlyPaymentGuess);
    hiGuess = monthlyPaymentGuess;
    monthlyPaymentGuess = (hiGuess + lowGuess)/2
    totalPaid = 0;
      // Checking for stale mate in payment guess calculation
      if (Math.abs(lowGuess-monthlyPaymentGuess) < 1) {
        monthlyPaymentGuess -= 100;
    }
    }
    else if (balance > epsilon) {
    console.log(balance);
    console.log("Guess too low: "+monthlyPaymentGuess);
    lowGuess = monthlyPaymentGuess;
    monthlyPaymentGuess = (hiGuess + lowGuess)/2
    totalPaid = 0;
      // Checking for stale mate in payment guess calculation
      if (Math.abs(lowGuess-monthlyPaymentGuess) < 1) {
        monthlyPaymentGuess += 100;
      }
    }


    }

  }


loanCalc (0.07, 16000, 3, 100);
