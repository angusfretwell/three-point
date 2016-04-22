import gaussian from 'gaussian';

export default class ThreePoint {
  _confidenceLevel = 0.9;

  constructor(items, confidenceLevel) {
    this.items = items;

    if (confidenceLevel) {
      this.confidenceLevel = confidenceLevel;
    }

    this.estimate();
  }

  set items(value) {
    value.forEach(({ optimistic, pessimistic, likely }) => {
      if (isNaN(optimistic) || isNaN(pessimistic) || isNaN(likely)) {
        throw new Error('Encountered a non-number in estimate items');
      }
    });

    this._items = value;
    this.estimate();
  }

  set confidenceLevel(value) {
    this._criticalValue = this.findCriticalValue(value);
    this.estimate();
  }

  get expected() {
    return parseFloat(this._expected.toPrecision(2));
  }

  get pessimistic() {
    return parseFloat(this._pessimistic.toPrecision(2));
  }

  get optimistic() {
    return parseFloat(this._optimistic.toPrecision(2));
  }

  findCriticalValue(value) {
    const distribution = gaussian(0, 1);
    return distribution.ppf((1 + value) / 2);
  }

  estimate() {
    const estimates = this._items.map(this.estimateItem);

    const standardDeviation = Math.sqrt(estimates
      .map(x => Math.pow(x.standardDeviation, 2))
      .reduce((a, b) => a + b));

    const expected = estimates
      .map(x => x.expected)
      .reduce((a, b) => a + b);

    this._expected = expected;
    this._pessimistic = expected + (standardDeviation * this._criticalValue);
    this._optimistic = expected - (standardDeviation * this._criticalValue);
  }

  estimateItem({ optimistic, pessimistic, likely }) {
    return {
      standardDeviation: (pessimistic - optimistic) / 6,
      expected: (optimistic + 4 * likely + pessimistic) / 6,
    };
  }
}
