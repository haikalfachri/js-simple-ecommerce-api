const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userSeed = async () => {
    for (let i = 0; i < 10; i++) {
        await prisma.users.create({
            data: {
                name: `user${i}`,
                email: `user${i}@mail.com`,
                password: `password${i}`,
            },
        });
    }
}

const seeder = async () => {
    try {
        const user = await prisma.users.findFirst({
            where: { email: "user1@mail.com" },
        });

        if (!user) {
            await userSeed();
            console.log("Data seeded successfully.");
        } else {
            console.log("Data already seeded.");
        }
    } catch (error) {
        console.error("Error during seeding:", error);
    }
};

module.exports = {
    seeder,
};