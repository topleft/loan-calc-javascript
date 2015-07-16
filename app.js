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
      hiGuess = monthlyPaymentGuess;
      monthlyPaymentGuess = (hiGuess + lowGuess)/2
      totalPaid = 0;
        // Checking for stale mate in payment guess calculation
        if (Math.abs(lowGuess-monthlyPaymentGuess) < 1) {
          monthlyPaymentGuess -= 100;
      }
    }
    else if (balance > epsilon) {
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
  var submitted = false;
  $("#loanTerms").on("submit", function(event) {
    event.preventDefault();
    console.log(submitted);

    // grab user input data
    var amount = parseInt($(this).find('#amountInput').val());
    var apr = parseFloat($(this).find('#aprInput').val());
    var time = parseInt($(this).find('#timeInput').val());

    console.log(amount, apr, time);
    console.log(typeof amount, typeof apr, typeof time);

    // find monthly payment and store results in variable
    var results = findMonthlyPayment(amount, apr, time, 100);

    console.log(results);;

    // clear the previous results from output table
    if (submitted) {
      $('#results-table').find(".result").empty();
    };

    // parse results and display on web page
    $("#paymentResult").append('<span>$ '+results[0]+'</span>');
    $("#totalPaidResult").append('<span>$ '+results[1]+'</span>');
    $("#totalInterestResult").append('<span>$ '+results[2]+'</span>');

    submitted = true;
    console.log(submitted);

    });


});
