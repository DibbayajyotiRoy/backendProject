import mongooose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary URL
      required: true,
    },
    coverImage: {
      type: String, // cloudinary URL
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },

  { timestamps: true }
);


//PASSWORD ENCRYPTION
userSchema.pre("save", async function(next) {

  if(!this.isModified("password")) return next()

  this.password = bcrypt.hash(this.password, 10)
  next()
})


//METHOD FOR CHECKING IF PASSWORDS MATCH
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
  }

export const User = mongoose.model("User", userSchema);
