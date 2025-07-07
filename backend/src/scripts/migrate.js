import DatabaseMigration from "../database/migrations.js";

async function runMigrations() {
  try {
    console.log("🚀 Starting database migration...");

    const migration = new DatabaseMigration();
    const success = await migration.runAllMigrations();

    if (success) {
      console.log("\n✅ Database migration completed successfully!");
      process.exit(0);
    } else {
      console.log("\n❌ Database migration failed!");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Migration script error:", error);
    process.exit(1);
  }
}

// Run migrations if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations();
}

export default runMigrations;
