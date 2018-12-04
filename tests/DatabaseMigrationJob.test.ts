import Server from 'ts-framework';
import { Logger } from 'ts-framework-common';
import { BaseDatabaseMigration, DatabaseMigrationJob } from '../lib';
import QueryBuilderMock from './__mock__/QueryBuilder.util';

describe('lib.jobs.DatabaseMigrationJob', () => {

  let server;

  class TestSuccessMigration extends BaseDatabaseMigration {
    constructor(name = 'TestSuccessMigration') {
      super(name);
    }
    async hasWork(): Promise<boolean> {
      return true;
    }
     
    map() {
      return <any>(new QueryBuilderMock());
    }


    async migrate(data: any[]): Promise<void> {
      return;
    }
    async revert(error: Error, data: any[]): Promise<void> {
      throw new Error("Method not implemented.");
    }
  }

  beforeEach(() => {
    server = new Server({
      logger: Logger.getInstance(),
      port: process.env.PORT as any || 3333,
      router: {
        routes: {
          get: {
            '/': (req, res) => res.success({ test: 'ok' })
          }
        }
      }
    });
  })

  afterEach(async () => {
    try {
      await server.stop();
    } catch (error) {
      console.warn(error);
    }
  })

  it('should handle an empty job successfully', async () => {
    const job = new DatabaseMigrationJob();
    await job.run(server);
  });

  it('should handle an empty migration job successfully', async () => {
    const job = new DatabaseMigrationJob({
      migration: {
        auto: true,
        pipeline: [],
      }
    });
    await job.run(server);
  });

  it('should handle a valid migration pipeline successfully', async () => {
    const job = new DatabaseMigrationJob({
      migration: {
        auto: true,
        pipeline: [
          new TestSuccessMigration()
        ],
      }
    });
    await job.run(server);
  });

  it('should handle a valid migration pipeline successfully in verbose mode', async () => {
    const job = new DatabaseMigrationJob({
      verbose: true,
      migration: {
        auto: true,
        pipeline: [
          new TestSuccessMigration()
        ],
      }
    });
    await job.run(server);
  });

  it('should crash if migration is needed but disabled', async () => {
    let hasCrashed = false;
    const job = new DatabaseMigrationJob({
      verbose: true,
      migration: {
        auto: false,
        pipeline: [
          new TestSuccessMigration()
        ],
      }
    });
    try {
      await job.run(server);
    } catch (error) {
      hasCrashed = true;
    }

    expect(hasCrashed).toBe(true);
  });

  it('should crash if migration is needed but disabled exiting the process', async () => {
    expect.assertions(1);
    let hasCrashed = false;

    const job = new DatabaseMigrationJob({
      verbose: true,
      exitOnError: true,
      migration: {
        auto: false,
        pipeline: [
          new TestSuccessMigration()
        ],
      }
    });
    try {
      await job.run(server);
    } catch (error) {
      hasCrashed = true;
    }

    expect(hasCrashed).toBe(false);
  });

});