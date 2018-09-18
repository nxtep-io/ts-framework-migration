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
    constructor(name, options = {}) {
        this.name = name;
        this.options = options;
    }
    /**
     * Runs the migration step safely, reverting the changes in the case of errors.
     *
     * @returns List of ids of the documents migrated.
     */
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            try {
                data = yield this.map();
            }
            catch (error) {
                // TODO: Handle mapping errors properly
                throw error;
            }
            if (data && data.length) {
                try {
                    yield this.migrate(data);
                    return data;
                }
                catch (error) {
                    // TODO: Handle this case properly
                    yield this.revert(error, data);
                    throw error;
                }
            }
        });
    }
}
exports.default = BaseDatabaseMigration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZURhdGFiYXNlTWlncmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21pZ3JhdGlvbi9CYXNlRGF0YWJhc2VNaWdyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0lBQ0UsWUFBbUIsSUFBWSxFQUFTLFVBQWUsRUFBRTtRQUF0QyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBVTtJQUV6RCxDQUFDO0lBMEJEOzs7O09BSUc7SUFDVSxHQUFHOztZQUNkLElBQUksSUFBYyxDQUFDO1lBRW5CLElBQUksQ0FBQztnQkFDSCxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDMUIsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsdUNBQXVDO2dCQUN2QyxNQUFNLEtBQUssQ0FBQztZQUNkLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQztvQkFDSCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNmLGtDQUFrQztvQkFDbEMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDL0IsTUFBTSxLQUFLLENBQUM7Z0JBQ2QsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQXZERCx3Q0F1REMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlRGF0YWJhc2VNaWdyYXRpb24ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogU3RyaW5nLCBwdWJsaWMgb3B0aW9uczogYW55ID0ge30pIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGRldGVybWluZXMgd2hldGhlciB0aGlzIHNjcmlwdCBoYXMgYW55IHdvcmsgdG8gYmUgZG9uZS5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3luYyBoYXNXb3JrKCk6IFByb21pc2U8Ym9vbGVhbj47XG5cbiAgLyoqXG4gICAqIE1hcHMgdGhlIHRoZSBkb2N1bWVudHMgdGhhdCBzaG91bGQgYmUgbWlncmF0ZWQsIHdpbGwgb25seSBiZSBjYWxsZWQgaXMgYGBgaGFzV29yaygpYGBgIGhhdmUgcmV0dXJuZWQgYGBgdHJ1ZWBgYC5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3luYyBtYXAoKTogUHJvbWlzZTxhbnlbXT47XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIG1pZ3JhdGlvbnMgb2YgdGhlIG1hcHBlZCBkb2N1bWVudHMuXG4gICAqIFxuICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSBtYXBwZWQgYnkgdGhlIG1pZ3JhdGlvbiBzdGVwXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgYXN5bmMgbWlncmF0ZShkYXRhOiBhbnlbXSk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIG1pZ3JhdGlvbnMgb2YgdGhlIG1hcHBlZCBkb2N1bWVudHMuXG4gICAqIFxuICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSBtYXBwZWQgYnkgdGhlIG1pZ3JhdGlvbiBzdGVwXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgYXN5bmMgcmV2ZXJ0KGVycm9yOiBFcnJvciwgZGF0YTogYW55W10pOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBSdW5zIHRoZSBtaWdyYXRpb24gc3RlcCBzYWZlbHksIHJldmVydGluZyB0aGUgY2hhbmdlcyBpbiB0aGUgY2FzZSBvZiBlcnJvcnMuXG4gICAqIFxuICAgKiBAcmV0dXJucyBMaXN0IG9mIGlkcyBvZiB0aGUgZG9jdW1lbnRzIG1pZ3JhdGVkLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHJ1bigpOiBQcm9taXNlPGFueVtdPiB7XG4gICAgbGV0IGRhdGE6IHN0cmluZ1tdO1xuXG4gICAgdHJ5IHtcbiAgICAgIGRhdGEgPSBhd2FpdCB0aGlzLm1hcCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBUT0RPOiBIYW5kbGUgbWFwcGluZyBlcnJvcnMgcHJvcGVybHlcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLm1pZ3JhdGUoZGF0YSk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gVE9ETzogSGFuZGxlIHRoaXMgY2FzZSBwcm9wZXJseVxuICAgICAgICBhd2FpdCB0aGlzLnJldmVydChlcnJvciwgZGF0YSk7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSJdfQ==