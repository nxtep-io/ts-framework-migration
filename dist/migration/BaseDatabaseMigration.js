"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class BaseDatabaseMigration {
    constructor(name, options) {
        this.name = name;
        this.options = options;
        this.currentIndex = 0;
        this.chunk = function* (array) {
            let index = 0;
            while (index < array.length) {
                yield array.slice(index, index + this.rowsPerInsert);
                index += this.rowsPerInsert;
            }
        };
        this.transactionSize = options.transactionSize || 50;
        this.rowsPerInsert = options.rowsPerInsert || 50;
    }
    /**
     * Runs the migration step safely, reverting the changes in the case of errors.
     *
     * @returns List of ids of the documents migrated.
     */
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield this.map().getCount();
                while (this.currentIndex < count) {
                    const dataSlice = yield this.map().take(this.rowsPerInsert).skip(this.currentIndex).getMany();
                    this.currentIndex += this.rowsPerInsert;
                    if (dataSlice && dataSlice.length) {
                        try {
                            yield this.migrate(dataSlice);
                            return dataSlice;
                        }
                        catch (error) {
                            // TODO: Handle this case properly
                            yield this.revert(error, dataSlice);
                            throw error;
                        }
                    }
                }
            }
            catch (error) {
                // TODO: Handle mapping errors properly
                throw error;
            }
        });
    }
}
exports.default = BaseDatabaseMigration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZURhdGFiYXNlTWlncmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21pZ3JhdGlvbi9CYXNlRGF0YWJhc2VNaWdyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQVFBO0lBS0UsWUFBbUIsSUFBWSxFQUFTLE9BQWtDO1FBQXZELFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUEyQjtRQUZoRSxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQU9qQixVQUFLLEdBQUcsUUFBUSxDQUFDLEVBQUksS0FBVTtZQUN2QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7WUFFZCxPQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzNCLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDckQsS0FBSyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDOUIsQ0FBQztRQUNILENBQUMsQ0FBQTtRQVhDLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBbUNEOzs7O09BSUc7SUFDVSxHQUFHOztZQUNkLElBQUksQ0FBQztnQkFDSCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFFMUMsT0FBTyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssRUFBRSxDQUFDO29CQUNqQyxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzlGLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQztvQkFFeEMsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxJQUFJLENBQUM7NEJBQ0gsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUM5QixNQUFNLENBQUMsU0FBUyxDQUFDO3dCQUVuQixDQUFDO3dCQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ2Ysa0NBQWtDOzRCQUNsQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDOzRCQUNwQyxNQUFNLEtBQUssQ0FBQzt3QkFDZCxDQUFDO29CQUNILENBQUM7Z0JBRUgsQ0FBQztZQUNILENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLHVDQUF1QztnQkFDdkMsTUFBTSxLQUFLLENBQUM7WUFDZCxDQUFDO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUExRUQsd0NBMEVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VsZWN0UXVlcnlCdWlsZGVyLCBCYXNlRW50aXR5IH0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQgeyBEYXRhYmFzZSB9IGZyb20gJ3RzLWZyYW1ld29yay1jb21tb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIERhdGFiYXNlTWlncmF0aW9uT3B0aW9ucyB7XG4gIHRyYW5zYWN0aW9uU2l6ZT86IG51bWJlcjtcbiAgcm93c1Blckluc2VydD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZURhdGFiYXNlTWlncmF0aW9uPFQgZXh0ZW5kcyBCYXNlRW50aXR5PiB7XG4gIHByb3RlY3RlZCByZWFkb25seSB0cmFuc2FjdGlvblNpemU6IG51bWJlcjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHJvd3NQZXJJbnNlcnQ6IG51bWJlcjtcbiAgcHJvdGVjdGVkIGN1cnJlbnRJbmRleCA9IDA7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IFN0cmluZywgcHVibGljIG9wdGlvbnM/OiBEYXRhYmFzZU1pZ3JhdGlvbk9wdGlvbnMpIHtcbiAgICB0aGlzLnRyYW5zYWN0aW9uU2l6ZSA9IG9wdGlvbnMudHJhbnNhY3Rpb25TaXplIHx8IDUwO1xuICAgIHRoaXMucm93c1Blckluc2VydCA9IG9wdGlvbnMucm93c1Blckluc2VydCB8fCA1MDtcbiAgfVxuXG4gIHByb3RlY3RlZCBjaHVuayA9IGZ1bmN0aW9uKjxUPihhcnJheTogVFtdKSB7XG4gICAgbGV0IGluZGV4ID0gMDtcblxuICAgIHdoaWxlKGluZGV4IDwgYXJyYXkubGVuZ3RoKSB7XG4gICAgICB5aWVsZCBhcnJheS5zbGljZShpbmRleCwgaW5kZXggKyB0aGlzLnJvd3NQZXJJbnNlcnQpO1xuICAgICAgaW5kZXggKz0gdGhpcy5yb3dzUGVySW5zZXJ0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBkZXRlcm1pbmVzIHdoZXRoZXIgdGhpcyBzY3JpcHQgaGFzIGFueSB3b3JrIHRvIGJlIGRvbmUuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgYXN5bmMgaGFzV29yaygpOiBQcm9taXNlPGJvb2xlYW4+O1xuXG4gIC8qKlxuICAgKiBNYXBzIHRoZSB0aGUgZG9jdW1lbnRzIHRoYXQgc2hvdWxkIGJlIG1pZ3JhdGVkLCB3aWxsIG9ubHkgYmUgY2FsbGVkIGlzIGBgYGhhc1dvcmsoKWBgYCBoYXZlIHJldHVybmVkIGBgYHRydWVgYGAuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgbWFwKCk6IFNlbGVjdFF1ZXJ5QnVpbGRlcjxUPjtcblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgbWlncmF0aW9ucyBvZiB0aGUgbWFwcGVkIGRvY3VtZW50cy5cbiAgICogXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIG1hcHBlZCBieSB0aGUgbWlncmF0aW9uIHN0ZXBcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3luYyBtaWdyYXRlKGRhdGE6IFRbXSk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIG1pZ3JhdGlvbnMgb2YgdGhlIG1hcHBlZCBkb2N1bWVudHMuXG4gICAqIFxuICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSBtYXBwZWQgYnkgdGhlIG1pZ3JhdGlvbiBzdGVwXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgYXN5bmMgcmV2ZXJ0KGVycm9yOiBFcnJvciwgZGF0YTogVFtdKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogUnVucyB0aGUgbWlncmF0aW9uIHN0ZXAgc2FmZWx5LCByZXZlcnRpbmcgdGhlIGNoYW5nZXMgaW4gdGhlIGNhc2Ugb2YgZXJyb3JzLlxuICAgKiBcbiAgICogQHJldHVybnMgTGlzdCBvZiBpZHMgb2YgdGhlIGRvY3VtZW50cyBtaWdyYXRlZC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBydW4oKTogUHJvbWlzZTxhbnlbXT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb3VudCA9IGF3YWl0IHRoaXMubWFwKCkuZ2V0Q291bnQoKTtcbiAgICAgIFxuICAgICAgd2hpbGUgKHRoaXMuY3VycmVudEluZGV4IDwgY291bnQpIHtcbiAgICAgICAgY29uc3QgZGF0YVNsaWNlID0gYXdhaXQgdGhpcy5tYXAoKS50YWtlKHRoaXMucm93c1Blckluc2VydCkuc2tpcCh0aGlzLmN1cnJlbnRJbmRleCkuZ2V0TWFueSgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCArPSB0aGlzLnJvd3NQZXJJbnNlcnQ7XG4gICAgICAgIFxuICAgICAgICBpZiAoZGF0YVNsaWNlICYmIGRhdGFTbGljZS5sZW5ndGgpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5taWdyYXRlKGRhdGFTbGljZSk7XG4gICAgICAgICAgICByZXR1cm4gZGF0YVNsaWNlO1xuXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IEhhbmRsZSB0aGlzIGNhc2UgcHJvcGVybHlcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucmV2ZXJ0KGVycm9yLCBkYXRhU2xpY2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gVE9ETzogSGFuZGxlIG1hcHBpbmcgZXJyb3JzIHByb3Blcmx5XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==