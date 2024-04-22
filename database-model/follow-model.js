import mongoose from "mongoose";
import followSchema from "../schemas/follow-schema.js";

const followModel = mongoose
    .model('FollowModel', followSchema)
export default followModel