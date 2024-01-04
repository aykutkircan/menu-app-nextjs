import { model, models, Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    image: String,
  },
  { timestamps: true }
);

export const Category = models.Category || model("Category", CategorySchema);
