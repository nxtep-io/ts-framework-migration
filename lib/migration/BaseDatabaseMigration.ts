import { SelectQueryBuilder, BaseEntity } from 'typeorm';
import { Database } from 'ts-framework-common';

export interface DatabaseMigrationOptions {
  transactionSize?: number;
  rowsPerInsert?: number;
}

export default abstract class BaseDatabaseMigration<T extends BaseEntity> {
  protected readonly transactionSize: number;
  protected readonly rowsPerInsert: number;
  protected currentIndex = 0;

  constructor(public name: String, public options?: DatabaseMigrationOptions) {
    this.transactionSize = options.transactionSize || 50;
    this.rowsPerInsert = options.rowsPerInsert || 50;
  }

  protected chunk = function*<T>(array: T[]) {
    let index = 0;

    while(index < array.length) {
      yield array.slice(index, index + this.rowsPerInsert);
      index += this.rowsPerInsert;
    }
  }

  /**
   * This method determines whether this script has any work to be done.
   */
  public abstract async hasWork(): Promise<boolean>;

  /**
   * Maps the the documents that should be migrated, will only be called is ```hasWork()``` have returned ```true```.
   */
  public abstract map(): SelectQueryBuilder<T>;

  /**
   * Handles the migrations of the mapped documents.
   * 
   * @param data The data mapped by the migration step
   */
  public abstract async migrate(data: T[]): Promise<void>;

  /**
   * Handles the migrations of the mapped documents.
   * 
   * @param data The data mapped by the migration step
   */
  public abstract async revert(error: Error, data: T[]): Promise<void>;

  /**
   * Runs the migration step safely, reverting the changes in the case of errors.
   * 
   * @returns List of ids of the documents migrated.
   */
  public async run(): Promise<any[]> {
    try {
      const count = await this.map().getCount();
      
      while (this.currentIndex < count) {
        const dataSlice = await this.map().take(this.rowsPerInsert).skip(this.currentIndex).getMany();
        this.currentIndex += this.rowsPerInsert;
        
        if (dataSlice && dataSlice.length) {
          try {
            await this.migrate(dataSlice);
            return dataSlice;

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
