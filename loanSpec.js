decribe("Loan calculator", function (){

  it("calculates monthly percentage rate", function (){
    expect(aprToMonthly(0.12)).toBe(0.10);
  });

  it("calculates final balance", function (){
    expect(calculateFinalBalance(1000, 12, 100, 0.05)).toBeGreaterThan(10);
  });

  it("makes a payment guess", function(){
    expect(createMonthlyPaymentGuess(100,50,75, 10, 5)).toBeGreaterThan(75);
  });


});