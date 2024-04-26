import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon } from "@neondatabase/serverless";

const sql = neon(Bun.env.DATABASE_URL);
const db = drizzle(sql);

const dbMigrate = async () => {
	try {
		await migrate(db, {
			migrationsFolder: "./db/migrations"
		});
		console.log("migration successfull");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

dbMigrate();
