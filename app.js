// This program calculates interest paid on a loan given the APR %, total
// loan amount, and a duration of the lone assuming the same payment amount each
// month.
//
// arguments needed:
//    aprPercentage = float
//    totalLoanAmount = int
//    loanDuration = int, time in years
//    epsilon = int, dollar amount degree of accuracy

function findMonthlyPayment(totalLoanAmount, aprPercentage, loanDuration, epsilon) {
  var monthlyPercentage = aprPercentage/12;
  var months = loanDuration * 12;
  var balance = totalLoanAmount;
  var totalPaid = 0;
  var hiGuess = ((balance*aprPercentage)+balance)/months;
  var lowGuess = balance/months;
  var monthlyPaymentGuess = (hiGuess+lowGuess)/2;
  // console.log("Hi low Guess: "+lowGuess+","+hiGuess);


  while(Math.abs(balance) >= epsilon) {
    // reset balance
    balance = totalLoanAmount;

    // run through monthly payments for loan duration, recalculating balance each month
    for (var i = 0; i < months; i++) {
      balance += (balance * monthlyPercentage);
      balance -= monthlyPaymentGuess;
      totalPaid += monthlyPaymentGuess;
    }

    if (Math.abs(balance) <= epsilon) {
      console.log("Monthly Payment: $"+(monthlyPaymentGuess).toFixed(2));
      console.log("Total Paid: $"+totalPaid.toFixed(2));
      console.log("Interest Paid: $"+(totalPaid - totalLoanAmount).toFixed(2));
      // return an array to access values in jQuery
      return [(monthlyPaymentGuess).toFixed(2),
              totalPaid.toFixed(2),
              (totalPaid - totalLoanAmount).toFixed(2)];
      }


    else if (balance < epsilon) {
      // console.log(balance);
      // console.log("Guess too high: "+monthlyPaymentGuess);
      hiGuess = monthlyPaymentGuess;
      monthlyPaymentGuess = (hiGuess + lowGuess)/2
      totalPaid = 0;
        // Checking for stale mate in payment guess calculation
        if (Math.abs(lowGuess-monthlyPaymentGuess) < 1) {
          monthlyPaymentGuess -= 100;
      }
    }
    else if (balance > epsilon) {
      // console.log(balance);
      // console.log("Guess too low: "+monthlyPaymentGuess);
      lowGuess = monthlyPaymentGuess;
      monthlyPaymentGuess = (hiGuess + lowGuess)/2
      totalPaid = 0;
        // Checking for stale mate in payment guess calculation
        if (Math.abs(lowGuess-monthlyPaymentGuess) < 1) {
          monthlyPaymentGuess += 100;
        }
    }
  }
};


$(document).ready(function() {
  $("#loanTerms").on("submit", function(event) {
    event.preventDefault();
    // grab user input data
    var amount = parseInt($(this).find('#amountInput').val());
    var apr = parseFloat($(this).find('#aprInput').val());
    var time = parseInt($(this).find('#timeInput').val());

    console.log(amount, apr, time);
    console.log(typeof amount, typeof apr, typeof time);
    // find monthly payment and store results in variable
    var results = findMonthlyPayment(amount, apr, time, 100);
    console.log(results);;

    // parse results and display on web page
    $("#paymentResult").append(results[0]);
    $("#totalPaidResult").append(results[1]);
    $("#totalInterestResult").append(results[2]);

    });


});

// the code below has variable names are that are the same as the one inside
// the main function, is this going to be bad?
// $(document).ready(function() {
//   $("#loanTerms").on("submit", function(event) {
//     event.preventDefault();
//     var totalLoanAmount = $(this).find('#amountInput').val();
//     var aprPercentage = $(this).find('#aprInput').val();
//     var loanDuration = $(this).find('#timeInput').val();
//     console.log(totalLoanAmount, aprPercentage, loanDuration);
//     findMonthlyPayment(totalLoanAmount, aprPercentage, loanDuration, 100);
//     findMonthlyPayment(16000, 0.07, 3, 100);
//     });
// });

// findMonthlyPayment (16000, 0.07, 3, 100);

// return array and loop through array to retreive values

// values needed:
//    monthly payment amount
//    total paid
//    interest paid
//
