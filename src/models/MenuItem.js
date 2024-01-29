import { model, models, Schema } from "mongoose";

const MenuItemSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: {
      type: String,
      ref: "Category",
    },
    price: { type: String, required: true },
    image: String,
  },
  { timestamps: true }
);

export const MenuItem = models.MenuItem || model("MenuItem", MenuItemSchema);
