import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL;

  if (url?.startsWith("prisma+postgres://")) {
    // Prisma Accelerate — URL carries the connection protocol
    return new PrismaClient({ accelerateUrl: url });
  }

  // Direct PostgreSQL via pg driver adapter
  const adapter = new PrismaPg({ connectionString: url });
  return new PrismaClient({ adapter });
}

// Cache the client on globalThis in development to survive hot reloads.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
