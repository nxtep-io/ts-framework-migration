import { SelectQueryBuilder, BaseEntity } from 'typeorm';
export interface DatabaseMigrationOptions {
    transactionSize?: number;
    rowsPerInsert?: number;
}
export default abstract class BaseDatabaseMigration<T extends BaseEntity> {
    name: String;
    options: DatabaseMigrationOptions;
    protected readonly transactionSize: number;
    protected readonly rowsPerInsert: number;
    protected currentIndex: number;
    constructor(name: String, options?: DatabaseMigrationOptions);
    protected chunk: <T>(array: T[]) => IterableIterator<T[]>;
    /**
     * This method determines whether this script has any work to be done.
     */
    abstract hasWork(): Promise<boolean>;
    /**
     * Maps the the documents that should be migrated, will only be called is ```hasWork()``` have returned ```true```.
     */
    abstract map(): SelectQueryBuilder<T>;
    /**
     * Handles the migrations of the mapped documents.
     *
     * @param data The data mapped by the migration step
     */
    abstract migrate(data: T[]): Promise<void>;
    /**
     * Handles the migrations of the mapped documents.
     *
     * @param data The data mapped by the migration step
     */
    abstract revert(error: Error, data: T[]): Promise<void>;
    /**
     * Runs the migration step safely, reverting the changes in the case of errors.
     *
     * @returns List of ids of the documents migrated.
     */
    run(): Promise<any[]>;
}
