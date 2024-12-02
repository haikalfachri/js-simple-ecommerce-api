const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const cost = 10;

const hashPassword = (password) => {
    return bcrypt.hashSync(password, cost);
};

const userSeed = async () => {
    for (let i = 1; i <= 10; i++) {
        await prisma.user.create({
            data: {
                name: `user${i}`,
                email: `user${i}@mail.com`,
                password: hashPassword("password"),
            },
        });
    }

    await prisma.user.create({
        data: {
            name: "admin1",
            email: "admin1@mail.com",
            password: hashPassword("password"),
            role: "ADMIN",
        },
    });
}

const categorySeed = async () => {
    for (let i = 1; i <= 4; i++) {
        await prisma.category.create({
            data: {
                name: `category${i}`,
            },
        });
    }
}

const productSeed = async () => {
    const categories = await prisma.category.findMany();

    for (let i = 1; i <= 10; i++) {
        await prisma.Product.create({
            data: {
                name: `product${i}`,
                price: 1000 * i,
                category: {
                    connect: { id: categories[i % categories.length].id }
                },
                stock: 10,
            },
        });
    }
}

const seeder = async () => {
    try {
        const user = await prisma.user.findFirst({
            where: { email: "user1@mail.com" },
        });

        if (!user) {
            await userSeed();
            await categorySeed();
            await productSeed();
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