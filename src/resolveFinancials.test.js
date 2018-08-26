import resolveData from './resolveFinancials.js';

let data = [];
let dOne = {
  id: `oasidjas1`,
  raccount: `account`,
  description: `description`,
  category: `test default`,
  type: `income`,
  start: `2018-03-22`,
  rtype: `day`,
  cycle: 3,
  value: 150
};
data.push(dOne);
let dTwo = {
  id: `oasis2`,
  raccount: `account`,
  description: `description`,
  category: `test default`,
  type: `income`,
  start: `2018-03-22`,
  rtype: `day`,
  cycle: 1,
  value: 100
};
data.push(dTwo);
let dThree = {
  id: `oasis3`,
  raccount: `account`,
  description: `description`,
  category: `test complex`,
  type: `income`,
  start: `2018-03-22`,
  rtype: `day of week`,
  cycle: 2,
  value: 35
};
data.push(dThree);
let dFour = {
  id: `oasis6`,
  raccount: `account`,
  description: `description`,
  category: `test complex`,
  type: `income`,
  start: `2018-03-22`,
  rtype: `day of month`,
  cycle: 1,
  value: 90
};
data.push(dFour);
let dThreePointFive = {
  id: `oasis92`,
  raccount: `account`,
  description: `description`,
  category: `test complex`,
  type: `income`,
  start: `2018-09-22`,
  rtype: `none`,
  value: 190
};
data.push(dThreePointFive);
let dFive = {
  id: `oasis8`,
  raccount: `account`,
  description: `description`,
  category: `test comp`,
  type: `expense`,
  start: `2018-03-22`,
  rtype: `day`,
  repeat: 1,
  cycle: 1,
  value: 112
};
data.push(dFive);
let dSix = {
  id: `oasis8asg`,
  raccount: `account2`,
  description: `description`,
  category: `test comp`,
  type: `transfer`,
  start: `2018-03-22`,
  rtype: `day`,
  repeat: 1,
  cycle: 1,
  value: 112
};
data.push(dSix);

let testData = {
  transactions: data,
  accounts: [
    {
      name: 'account',
      starting: 3000,
      interest: 0.01,
      vehicle: 'operating'
    },
    {
      name: 'account2',
      starting: 30000,
      interest: 0.01,
      vehicle: 'investment'
    }
  ],
  transactionForm: {
    id: `oasid7`,
    raccount: `account`,
    description: `description`,
    category: `test default`,
    type: `income`,
    start: `2018-03-22`,
    rtype: `day`,
    cycle: 3,
    value: 150
  },
  accountForm: {
    name: 'new account',
    starting: 1000,
    interest: 0.0,
    vehicle: 'operating'
  }
};

let resolvedTestData = resolveData(testData);

describe(`check resolveData`, () => {
  it(`returns the correct number of transactions`, () => {
    expect(resolvedTestData.transactions).toHaveLength(7);
  });
  it(`returns the correct number of accounts`, () => {
    expect(resolvedTestData.accounts).toHaveLength(2);
  });
  it(`returns the correct number of BarChartIncome`, () => {
    expect(resolvedTestData.BarChartIncome).toHaveLength(6);
  });
  it(`has the correct BarChartIncome structure`, () => {
    let expected = [
      expect.objectContaining({
        category: 'test default',
        cycle: 3,
        dailyRate: 50,
        description: 'description',
        id: 'oasidjas1',
        maxHeight: 402,
        raccount: 'account',
        rtype: 'day'
      })
    ];
    expect(resolvedTestData.BarChartIncome).toEqual(
      expect.arrayContaining(expected)
    );
  });
  it(`returns the correct number of BarChartExpense`, () => {
    expect(resolvedTestData.BarChartExpense).toHaveLength(1);
  });
  it(`calcs the correct BarChartMax`, () => {
    expect(resolvedTestData.BarChartMax).toBe(402);
  });
  it(`calcs the correct LineChartMax`, () => {
    expect(resolvedTestData.LineChartMax).toBe(43440);
  });
  it(`calcs the correct dailyIncome`, () => {
    expect(resolvedTestData.dailyIncome).toBe(158);
  });
  it(`calcs the correct dailyExpense`, () => {
    expect(resolvedTestData.dailyExpense).toBe(112);
  });
  it(`calcs the correct savingsRate`, () => {
    expect(resolvedTestData.savingsRate).toBe(100);
  });
  it(`calcs the correct fiNumber`, () => {
    expect(resolvedTestData.fiNumber).toBeCloseTo(2.94);
  });
});