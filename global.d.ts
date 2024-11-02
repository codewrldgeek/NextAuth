import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

// This line is necessary to make this file a module, which allows TypeScript to understand it as a global type declaration
export {};
