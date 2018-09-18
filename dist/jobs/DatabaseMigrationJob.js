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
const ts_framework_common_1 = require("ts-framework-common");
const AsyncUtil_1 = require("../util/AsyncUtil");
const Logger = ts_framework_common_1.Logger.getInstance();
class DatabaseMigrationJob extends ts_framework_common_1.Job {
    constructor(options = {}) {
        super({
            name: 'DatabaseMigrationJob',
        });
        this.options = options;
    }
    /**
     * Runs the database migrations.
     *
     * @param server The main server instance.
     */
    run(server) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.options.migration && server.logger) {
                server.logger.warn('MainDatabase: No migration pipeline specified');
            }
            else if (this.options.migration) {
                const pipeline = this.options.migration.pipeline;
                const hasWorkQueue = yield Promise.all(pipeline.map((step) => {
                    return step.hasWork().then(count => ({ name: step.name, count }));
                }));
                const hasWork = hasWorkQueue.reduce((tot, next) => tot + next.count, 0);
                const details = hasWorkQueue.reduce((result, next) => (Object.assign({}, result, { [next.name]: next.count })), {});
                if (hasWork && this.options.migration.auto) {
                    if (this.options.verbose && server.logger) {
                        server.logger.debug('MainDatabase: Starting migration pipeline', details);
                        Logger.info('\n-------------------------------------------------------------------------------------------------\n' +
                            '                                                               \n' +
                            '              NOTICE: The database will be migrated            \n' +
                            '                                                               \n' +
                            hasWorkQueue.map(work => `              ${work.name}:\t\t${work.count} document(s)\n`).join('') +
                            '                                                               \n' +
                            '\n-------------------------------------------------------------------------------------------------\n');
                    }
                    else if (server.logger) {
                        server.logger.debug('MainDatabase: Starting migration pipeline', details);
                    }
                    // Run the migrations in series for expliciting defining the order of the execution
                    // This may be important because migrations may depend on one another
                    yield AsyncUtil_1.default.mapSeries(pipeline, (step) => __awaiter(this, void 0, void 0, function* () { return step.run(); }));
                }
                else if (hasWork) {
                    if (this.options.exitOnError) {
                        server.logger.error('Database needs migration', details);
                        return process.exit(1);
                    }
                    else {
                        throw new Error('Database needs migration');
                    }
                }
                else {
                    Logger.silly(`Database needs no migration, all models are updated`);
                }
            }
        });
    }
}
exports.default = DatabaseMigrationJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2VNaWdyYXRpb25Kb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvam9icy9EYXRhYmFzZU1pZ3JhdGlvbkpvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsNkRBQTRFO0FBRTVFLGlEQUEwQztBQUUxQyxNQUFNLE1BQU0sR0FBRyw0QkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBV3hDLDBCQUEwQyxTQUFRLHlCQUFHO0lBQ25ELFlBQW1CLFVBQXVDLEVBQUU7UUFDMUQsS0FBSyxDQUFDO1lBQ0osSUFBSSxFQUFFLHNCQUFzQjtTQUM3QixDQUFDLENBQUM7UUFIYyxZQUFPLEdBQVAsT0FBTyxDQUFrQztJQUk1RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLEdBQUcsQ0FBQyxNQUFjOztZQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1lBQ3RFLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7Z0JBRWpELE1BQU0sWUFBWSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBMkIsRUFBRSxFQUFFO29CQUNsRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLENBQUMsQ0FBQyxDQUFVLENBQUM7Z0JBRWIsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN4RSxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsbUJBQU0sTUFBTSxJQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFcEcsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUMxQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFFMUUsTUFBTSxDQUFDLElBQUksQ0FDVCx1R0FBdUc7NEJBQ3ZHLG1FQUFtRTs0QkFDbkUsbUVBQW1FOzRCQUNuRSxtRUFBbUU7NEJBQ25FLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7NEJBQy9GLG1FQUFtRTs0QkFDbkUsdUdBQXVHLENBQUMsQ0FBQztvQkFFN0csQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDJDQUEyQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUM1RSxDQUFDO29CQUVELG1GQUFtRjtvQkFDbkYscUVBQXFFO29CQUNyRSxNQUFNLG1CQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFLGdEQUFDLE1BQU0sQ0FBTixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUEsR0FBQSxDQUFDLENBQUM7Z0JBQ2xFLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzt3QkFDN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQ3pELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztvQkFDOUMsQ0FBQztnQkFDSCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQztnQkFDdEUsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQXpERCx1Q0F5REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VydmVyIGZyb20gJ3RzLWZyYW1ld29yayc7XG5pbXBvcnQgeyBMb2dnZXIgYXMgQmFzZUxvZ2dlciwgSm9iLCBKb2JPcHRpb25zIH0gZnJvbSAndHMtZnJhbWV3b3JrLWNvbW1vbic7XG5pbXBvcnQgQmFzZURhdGFiYXNlTWlncmF0aW9uIGZyb20gJy4uL21pZ3JhdGlvbi9CYXNlRGF0YWJhc2VNaWdyYXRpb24nO1xuaW1wb3J0IEFzeW5jVXRpbCBmcm9tICcuLi91dGlsL0FzeW5jVXRpbCc7XG5cbmNvbnN0IExvZ2dlciA9IEJhc2VMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcblxuZXhwb3J0IGludGVyZmFjZSBEYXRhYmFzZU1pZ3JhdGlvbkpvYk9wdGlvbnMgZXh0ZW5kcyBKb2JPcHRpb25zIHtcbiAgdmVyYm9zZT86IGJvb2xlYW4sXG4gIGV4aXRPbkVycm9yPzogYm9vbGVhbjtcbiAgbWlncmF0aW9uPzoge1xuICAgIGF1dG86IGJvb2xlYW4sXG4gICAgcGlwZWxpbmU6IGFueVtdLFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFiYXNlTWlncmF0aW9uSm9iIGV4dGVuZHMgSm9iIHtcbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IERhdGFiYXNlTWlncmF0aW9uSm9iT3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoe1xuICAgICAgbmFtZTogJ0RhdGFiYXNlTWlncmF0aW9uSm9iJyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSdW5zIHRoZSBkYXRhYmFzZSBtaWdyYXRpb25zLlxuICAgKiBcbiAgICogQHBhcmFtIHNlcnZlciBUaGUgbWFpbiBzZXJ2ZXIgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcnVuKHNlcnZlcjogU2VydmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMubWlncmF0aW9uICYmIHNlcnZlci5sb2dnZXIpIHtcbiAgICAgIHNlcnZlci5sb2dnZXIud2FybignTWFpbkRhdGFiYXNlOiBObyBtaWdyYXRpb24gcGlwZWxpbmUgc3BlY2lmaWVkJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMubWlncmF0aW9uKSB7XG4gICAgICBjb25zdCBwaXBlbGluZSA9IHRoaXMub3B0aW9ucy5taWdyYXRpb24ucGlwZWxpbmU7XG5cbiAgICAgIGNvbnN0IGhhc1dvcmtRdWV1ZSA9IGF3YWl0IFByb21pc2UuYWxsKHBpcGVsaW5lLm1hcCgoc3RlcDogQmFzZURhdGFiYXNlTWlncmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBzdGVwLmhhc1dvcmsoKS50aGVuKGNvdW50ID0+ICh7IG5hbWU6IHN0ZXAubmFtZSwgY291bnQgfSkpO1xuICAgICAgfSkpIGFzIGFueVtdO1xuXG4gICAgICBjb25zdCBoYXNXb3JrID0gaGFzV29ya1F1ZXVlLnJlZHVjZSgodG90LCBuZXh0KSA9PiB0b3QgKyBuZXh0LmNvdW50LCAwKTtcbiAgICAgIGNvbnN0IGRldGFpbHMgPSBoYXNXb3JrUXVldWUucmVkdWNlKChyZXN1bHQsIG5leHQpID0+ICh7IC4uLnJlc3VsdCwgW25leHQubmFtZV06IG5leHQuY291bnQgfSksIHt9KTtcblxuICAgICAgaWYgKGhhc1dvcmsgJiYgdGhpcy5vcHRpb25zLm1pZ3JhdGlvbi5hdXRvKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudmVyYm9zZSAmJiBzZXJ2ZXIubG9nZ2VyKSB7XG4gICAgICAgICAgc2VydmVyLmxvZ2dlci5kZWJ1ZygnTWFpbkRhdGFiYXNlOiBTdGFydGluZyBtaWdyYXRpb24gcGlwZWxpbmUnLCBkZXRhaWxzKTtcblxuICAgICAgICAgIExvZ2dlci5pbmZvKFxuICAgICAgICAgICAgJ1xcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICAgICAgIE5PVElDRTogVGhlIGRhdGFiYXNlIHdpbGwgYmUgbWlncmF0ZWQgICAgICAgICAgICBcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG4nICtcbiAgICAgICAgICAgIGhhc1dvcmtRdWV1ZS5tYXAod29yayA9PiBgICAgICAgICAgICAgICAke3dvcmsubmFtZX06XFx0XFx0JHt3b3JrLmNvdW50fSBkb2N1bWVudChzKVxcbmApLmpvaW4oJycpICtcbiAgICAgICAgICAgICcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcXG4nICtcbiAgICAgICAgICAgICdcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuJyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChzZXJ2ZXIubG9nZ2VyKSB7XG4gICAgICAgICAgc2VydmVyLmxvZ2dlci5kZWJ1ZygnTWFpbkRhdGFiYXNlOiBTdGFydGluZyBtaWdyYXRpb24gcGlwZWxpbmUnLCBkZXRhaWxzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJ1biB0aGUgbWlncmF0aW9ucyBpbiBzZXJpZXMgZm9yIGV4cGxpY2l0aW5nIGRlZmluaW5nIHRoZSBvcmRlciBvZiB0aGUgZXhlY3V0aW9uXG4gICAgICAgIC8vIFRoaXMgbWF5IGJlIGltcG9ydGFudCBiZWNhdXNlIG1pZ3JhdGlvbnMgbWF5IGRlcGVuZCBvbiBvbmUgYW5vdGhlclxuICAgICAgICBhd2FpdCBBc3luY1V0aWwubWFwU2VyaWVzKHBpcGVsaW5lLCBhc3luYyAoc3RlcCkgPT4gc3RlcC5ydW4oKSk7XG4gICAgICB9IGVsc2UgaWYgKGhhc1dvcmspIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5leGl0T25FcnJvcikge1xuICAgICAgICAgIHNlcnZlci5sb2dnZXIuZXJyb3IoJ0RhdGFiYXNlIG5lZWRzIG1pZ3JhdGlvbicsIGRldGFpbHMpO1xuICAgICAgICAgIHJldHVybiBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRhYmFzZSBuZWVkcyBtaWdyYXRpb24nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgTG9nZ2VyLnNpbGx5KGBEYXRhYmFzZSBuZWVkcyBubyBtaWdyYXRpb24sIGFsbCBtb2RlbHMgYXJlIHVwZGF0ZWRgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0iXX0=