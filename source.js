import gaussian from 'gaussian';

export default class ThreePoint {
  constructor(items, confidenceLevel) {
    this.items = items;
    this.confidenceLevel = confidenceLevel || 0.9;
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
    return Math.round(this._expected * 10) / 10;
  }

  get pessimistic() {
    return Math.round(this._pessimistic * 10) / 10;
  }

  get optimistic() {
    return Math.round(this._optimistic * 10) / 10;
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
