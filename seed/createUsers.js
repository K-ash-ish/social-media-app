const { prisma } = require("@/lib/db");
const { hash } = require("@/lib/hash");

async function createUsers(email, password) {
  const hashPassword = await hash(password);
  const requestedUser = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });
  if (requestedUser) {
    return "User exist";
  }
  await prisma.user.create({
    data: {
      email: email,
      password: hashPassword,
      authType: "PASSWORD",
    },
  });
}
export function createSeed() {
  const sampleUsers = [
    {
      email: "user1@test.com",
      password: "bar",
    },
    {
      email: "user2@test.com",
      password: "bar",
    },
    {
      email: "user3@test.com",
      password: "bar",
    },
    {
      email: "user4@test.com",
      password: "bar",
    },
    {
      email: "user5@test.com",
      password: "bar",
    },
    {
      email: "user6@test.com",
      password: "bar",
    },
    {
      email: "user7@test.com",
      password: "bar",
    },
    {
      email: "user8@test.com",
      password: "bar",
    },
    {
      email: "user9@test.com",
      password: "bar",
    },
    {
      email: "user10@test.com",
      password: "bar",
    },
  ];

  sampleUsers.map((user) => createUsers(user.email, user.password));
}
