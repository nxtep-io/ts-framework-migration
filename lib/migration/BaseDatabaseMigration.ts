import { SelectQueryBuilder } from 'typeorm';

export interface DatabaseMigrationOptions {
  transactionSize?: number;
  rowsPerInsert?: number;
}

export default abstract class BaseDatabaseMigration {
  protected readonly transactionSize: number;
  protected readonly rowsPerInsert: number;

  constructor(public name: String, public options: DatabaseMigrationOptions = {transactionSize: 50, rowsPerInsert: 50}) {
    this.transactionSize = options.transactionSize || 50;
    this.rowsPerInsert = options.rowsPerInsert || 50;
  }

  /**
   * This method determines whether this script has any work to be done.
   */
  public abstract async hasWork(): Promise<boolean>;

  /**
   * Creates a QueryBuilder for the recors that should be migrated,
   * will only be called is ```hasWork()``` have returned ```true```.
   */
  public abstract map(): SelectQueryBuilder<any>;

  /**
   * Creates an asyncIterator for the ```map()``` QueryBuilder for performing a paginated query
   * over the records
   * 
   * @param count The number of records to be iterated over
   * @param pageSize The number of records to be taken on each iteration
   */
  private async *paginatedMap(count, pageSize): AsyncIterableIterator<any> {
    let index = 0;

    while (index < count) {
      yield this.map().take(pageSize).skip(index).getMany();
      index += pageSize;
    }
  }

  /**
   * Handles the migrations of the mapped documents.
   * 
   * @param data The data mapped by the migration step
   */
  public abstract async migrate(data: any[]): Promise<void>;

  /**
   * Handles the migrations of the mapped documents.
   * 
   * @param data The data mapped by the migration step
   */
  public abstract async revert(error: Error, data: any[]): Promise<void>;

  /**
   * Runs the migration step safely, reverting the changes in the case of errors.
   * 
   */
  public async run(): Promise<void> {
    try {
      const count = await this.map().getCount();

      for await (const dataSlice of this.paginatedMap(count, this.rowsPerInsert)) {
        if (dataSlice && dataSlice.length) {

          try {
            await this.migrate(dataSlice);

          } catch (error) {
            // TODO: Handle this case properly
            await this.revert(error, dataSlice);
            throw error;
          }
        }
      }
    } catch (error) {
      // TODO: Handle mapping errors properly
      throw error;
    }
  }
}
