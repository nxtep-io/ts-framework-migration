"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncIterator) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
};
Object.defineProperty(exports, "__esModule", { value: true });
class BaseDatabaseMigration {
    constructor(name, options = { transactionSize: 50, rowsPerInsert: 50 }) {
        this.name = name;
        this.options = options;
        this.transactionSize = options.transactionSize || 50;
        this.rowsPerInsert = options.rowsPerInsert || 50;
    }
    /**
     * Creates an asyncIterator for the ```map()``` QueryBuilder for performing a paginated query
     * over the records
     *
     * @param count The number of records to be iterated over
     * @param pageSize The number of records to be taken on each iteration
     */
    paginatedMap(count, pageSize) {
        return __asyncGenerator(this, arguments, function* paginatedMap_1() {
            let index = 0;
            while (index < count) {
                yield this.map().take(pageSize).skip(index).getMany();
                index += pageSize;
            }
        });
    }
    /**
     * Runs the migration step safely, reverting the changes in the case of errors.
     *
     */
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield this.map().getCount();
                try {
                    for (var _a = __asyncValues(this.paginatedMap(count, this.rowsPerInsert)), _b; _b = yield _a.next(), !_b.done;) {
                        const dataSlice = yield _b.value;
                        if (dataSlice && dataSlice.length) {
                            try {
                                yield this.migrate(dataSlice);
                            }
                            catch (error) {
                                // TODO: Handle this case properly
                                yield this.revert(error, dataSlice);
                                throw error;
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) yield _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            catch (error) {
                // TODO: Handle mapping errors properly
                throw error;
            }
            var e_1, _c;
        });
    }
}
exports.default = BaseDatabaseMigration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZURhdGFiYXNlTWlncmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21pZ3JhdGlvbi9CYXNlRGF0YWJhc2VNaWdyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0E7SUFJRSxZQUFtQixJQUFZLEVBQVMsVUFBb0MsRUFBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUM7UUFBakcsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQXFFO1FBQ2xILElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBYUQ7Ozs7OztPQU1HO0lBQ1ksWUFBWSxDQUFDLEtBQUssRUFBRSxRQUFROztZQUN6QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7WUFFZCxPQUFPLEtBQUssR0FBRyxLQUFLLEVBQUUsQ0FBQztnQkFDckIsTUFBTSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDdEQsS0FBSyxJQUFJLFFBQVEsQ0FBQztZQUNwQixDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBZ0JEOzs7T0FHRztJQUNVLEdBQUc7O1lBQ2QsSUFBSSxDQUFDO2dCQUNILE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOztvQkFFMUMsR0FBRyxDQUFDLENBQTBCLElBQUEsS0FBQSxjQUFBLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQSxJQUFBO3dCQUEvRCxNQUFNLFNBQVMsaUJBQUEsQ0FBQTt3QkFDeEIsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzRCQUVsQyxJQUFJLENBQUM7Z0NBQ0gsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUVoQyxDQUFDOzRCQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0NBQ2Ysa0NBQWtDO2dDQUNsQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dDQUNwQyxNQUFNLEtBQUssQ0FBQzs0QkFDZCxDQUFDO3dCQUNILENBQUM7cUJBQ0Y7Ozs7Ozs7OztZQUNILENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLHVDQUF1QztnQkFDdkMsTUFBTSxLQUFLLENBQUM7WUFDZCxDQUFDOztRQUNILENBQUM7S0FBQTtDQUNGO0FBNUVELHdDQTRFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlbGVjdFF1ZXJ5QnVpbGRlciB9IGZyb20gJ3R5cGVvcm0nO1xuXG5leHBvcnQgaW50ZXJmYWNlIERhdGFiYXNlTWlncmF0aW9uT3B0aW9ucyB7XG4gIHRyYW5zYWN0aW9uU2l6ZT86IG51bWJlcjtcbiAgcm93c1Blckluc2VydD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZURhdGFiYXNlTWlncmF0aW9uIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHRyYW5zYWN0aW9uU2l6ZTogbnVtYmVyO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgcm93c1Blckluc2VydDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBTdHJpbmcsIHB1YmxpYyBvcHRpb25zOiBEYXRhYmFzZU1pZ3JhdGlvbk9wdGlvbnMgPSB7dHJhbnNhY3Rpb25TaXplOiA1MCwgcm93c1Blckluc2VydDogNTB9KSB7XG4gICAgdGhpcy50cmFuc2FjdGlvblNpemUgPSBvcHRpb25zLnRyYW5zYWN0aW9uU2l6ZSB8fCA1MDtcbiAgICB0aGlzLnJvd3NQZXJJbnNlcnQgPSBvcHRpb25zLnJvd3NQZXJJbnNlcnQgfHwgNTA7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgZGV0ZXJtaW5lcyB3aGV0aGVyIHRoaXMgc2NyaXB0IGhhcyBhbnkgd29yayB0byBiZSBkb25lLlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGFzeW5jIGhhc1dvcmsoKTogUHJvbWlzZTxib29sZWFuPjtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIFF1ZXJ5QnVpbGRlciBmb3IgdGhlIHJlY29ycyB0aGF0IHNob3VsZCBiZSBtaWdyYXRlZCxcbiAgICogd2lsbCBvbmx5IGJlIGNhbGxlZCBpcyBgYGBoYXNXb3JrKClgYGAgaGF2ZSByZXR1cm5lZCBgYGB0cnVlYGBgLlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IG1hcCgpOiBTZWxlY3RRdWVyeUJ1aWxkZXI8YW55PjtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBhc3luY0l0ZXJhdG9yIGZvciB0aGUgYGBgbWFwKClgYGAgUXVlcnlCdWlsZGVyIGZvciBwZXJmb3JtaW5nIGEgcGFnaW5hdGVkIHF1ZXJ5XG4gICAqIG92ZXIgdGhlIHJlY29yZHNcbiAgICogXG4gICAqIEBwYXJhbSBjb3VudCBUaGUgbnVtYmVyIG9mIHJlY29yZHMgdG8gYmUgaXRlcmF0ZWQgb3ZlclxuICAgKiBAcGFyYW0gcGFnZVNpemUgVGhlIG51bWJlciBvZiByZWNvcmRzIHRvIGJlIHRha2VuIG9uIGVhY2ggaXRlcmF0aW9uXG4gICAqL1xuICBwcml2YXRlIGFzeW5jICpwYWdpbmF0ZWRNYXAoY291bnQsIHBhZ2VTaXplKTogQXN5bmNJdGVyYWJsZUl0ZXJhdG9yPGFueT4ge1xuICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICB3aGlsZSAoaW5kZXggPCBjb3VudCkge1xuICAgICAgeWllbGQgdGhpcy5tYXAoKS50YWtlKHBhZ2VTaXplKS5za2lwKGluZGV4KS5nZXRNYW55KCk7XG4gICAgICBpbmRleCArPSBwYWdlU2l6ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgbWlncmF0aW9ucyBvZiB0aGUgbWFwcGVkIGRvY3VtZW50cy5cbiAgICogXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIG1hcHBlZCBieSB0aGUgbWlncmF0aW9uIHN0ZXBcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3luYyBtaWdyYXRlKGRhdGE6IGFueVtdKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgbWlncmF0aW9ucyBvZiB0aGUgbWFwcGVkIGRvY3VtZW50cy5cbiAgICogXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIG1hcHBlZCBieSB0aGUgbWlncmF0aW9uIHN0ZXBcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3luYyByZXZlcnQoZXJyb3I6IEVycm9yLCBkYXRhOiBhbnlbXSk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFJ1bnMgdGhlIG1pZ3JhdGlvbiBzdGVwIHNhZmVseSwgcmV2ZXJ0aW5nIHRoZSBjaGFuZ2VzIGluIHRoZSBjYXNlIG9mIGVycm9ycy5cbiAgICogXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcnVuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb3VudCA9IGF3YWl0IHRoaXMubWFwKCkuZ2V0Q291bnQoKTtcblxuICAgICAgZm9yIGF3YWl0IChjb25zdCBkYXRhU2xpY2Ugb2YgdGhpcy5wYWdpbmF0ZWRNYXAoY291bnQsIHRoaXMucm93c1Blckluc2VydCkpIHtcbiAgICAgICAgaWYgKGRhdGFTbGljZSAmJiBkYXRhU2xpY2UubGVuZ3RoKSB7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5taWdyYXRlKGRhdGFTbGljZSk7XG5cbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gVE9ETzogSGFuZGxlIHRoaXMgY2FzZSBwcm9wZXJseVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5yZXZlcnQoZXJyb3IsIGRhdGFTbGljZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gVE9ETzogSGFuZGxlIG1hcHBpbmcgZXJyb3JzIHByb3Blcmx5XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==