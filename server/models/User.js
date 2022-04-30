const { Schema, model } = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    fName: {
      type: String,
      //required: true,
      trim: true
    },
    lName: {
      type: String,
      //required: true,
      trim: true
    },
    address: {
      type: String,
      //required: true,
      trim: true
    },
    city: {
      type: String,
      // required: true,
      trim: true
    },
    zipCode: {
      type: String,
      //required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    // set Apiary to be an array of data that adheres to the apiarySchema
    // Apiary: [Apiary.schema],
    apiary: [
      {
        type: Schema.Types.ObjectId,
        ref: "Apiary",
      },
    ],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `apiaryCount` with the number of saved apiary we have
userSchema.virtual('apiaryCount').get(function () {
  return this.apiary.length;
});

const User = model("User", userSchema);
module.exports = User;
