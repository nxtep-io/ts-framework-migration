export default class QueryBuilderMock {
  protected values: any[];
  protected pageSize: number;
  protected index: number;

  constructor(values?: any) {
    this.values = values || [1, 2];
  }

  public take(n: number) {
    this.pageSize = n;
    return this;
  }

  public skip(n: number) {
    this.index = n;
    return this;
  }

  public getMany() {
    return Promise.resolve(this.values.slice(this.index, this.index + this.pageSize));
  }

  public getCount() {
    return Promise.resolve(this.values.length);
  }
}
