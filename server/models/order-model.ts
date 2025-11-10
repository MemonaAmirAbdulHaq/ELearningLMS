import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrder extends Document {
  courseId: string;
  userId: string;
  payment_info: object;
}

const orderSchema = new Schema<IOrder>(
  {
    courseId: {
      type: String,
      required: [true, "Course id is required!"],
    },
    userId: {
      type: String,
      required: [true, "User id is required!"],
    },
    payment_info: {
      type: Object,
      // required: [true, "Payment info is required!"]
    },
  },
  { timestamps: true }
);

const OrderModel: Model<IOrder> = mongoose.model("Order", orderSchema);
export default OrderModel;
