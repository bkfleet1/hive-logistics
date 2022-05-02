const db = require("./connection");
const { User, Apiary, Hive, ShareFeeder } = require("../models");

db.once("open", async () => {
  await User.deleteMany();

  await User.create({
    fName: "ftest1",
    lName: "ltest1",
    username: "test1@test.com",
    email: "test1@test.com",
    password: "test123",
    address: "1 test st",
    city: "Katy",
    state: "Texas",
    zipCode: "77459",
    Apiary: [
      {
        name: [name[0]._id, name[0]._id, name[1]._id],
      },
    ],
  });

  await User.create({
    fName: "ftest2",
    lName: "ltest2",
    username: "test2@test.com",
    email: "test2@test.com",
    password: "test123",
    address: "2 test st",
    city: "Katy",
    state: "Texas",
    zipCode: "77459",
  });

  console.log("users seeded");

  process.exit();
});
