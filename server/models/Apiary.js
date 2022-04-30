const { Schema, model } = require("mongoose");

const apiarySchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    // set savedShareFeeder to be an array of data that adheres to the shareFeeSchema
    hive: [
      {
        type: Schema.Types.ObjectId,
        ref: "Hive",
      },
    ],
    shareFeeder: [
      {
        type: Schema.Types.ObjectId,
        ref: "ShareFeeder",
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
apiarySchema.virtual("hiveCount").get(function () {
  return this.hive.length;
});
apiarySchema.virtual("shareFeederCount").get(function () {
  return this.shareFeeder.length;
});
const Apiary = model("Apiary", apiarySchema);

module.exports = Apiary;
