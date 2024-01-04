const { model, models, Schema } = require("mongoose");
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre("save", function () {
  try {
    const user = this;

    if (user.isModified("password")) {
      const hash = bcrypt.hashSync(user["password"], 10);
      this.password = hash;
    }
  } catch (error) {
    throw new Error("Password could not hash");
  }
});

export const User = models.User || model("User", UserSchema);
