// import { PrismaClient } from "@/generated/prisma";

// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "@/generated/prisma";
// import Pris

const prisma = new PrismaClient();

async function main() {
  // write code herei
  const pro = await prisma.user.findMany();
  console.log(pro);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
