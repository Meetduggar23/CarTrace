/**
 * Optional seed: mirrors the curated RTO dataset into the database.
 * Requires DATABASE_URL to be set. Run: npm run db:seed
 */
import { PrismaClient } from "../backend/src/generated/prisma";
import { rtoDirectory } from "../backend/src/data/rto";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error(
      "DATABASE_URL is not set — configure a database before seeding."
    );
    process.exit(1);
  }

  const prisma = new PrismaClient();
  try {
    let created = 0;
    for (const rto of rtoDirectory) {
      await prisma.rto.upsert({
        where: { code: rto.code },
        update: {
          stateCode: rto.stateCode,
          state: rto.state,
          city: rto.city,
          officeName: rto.officeName,
          location: rto.location,
          services: rto.services,
        },
        create: {
          code: rto.code,
          stateCode: rto.stateCode,
          state: rto.state,
          city: rto.city,
          officeName: rto.officeName,
          location: rto.location,
          services: rto.services,
        },
      });
      created += 1;
    }
    console.log(`Seeded ${created} RTO entries.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
