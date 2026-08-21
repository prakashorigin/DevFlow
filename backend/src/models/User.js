import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const emailPattern = /^\S+@\S+\.\S+$/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9_]{3,30}$/, "Username must contain 3-30 letters, numbers, or underscores"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [emailPattern, "Please provide a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    avatar: {
      type: String,
      default: "",
    },

    phone: { type: String, trim: true, default: "" },

    role: {
      type: String,
      enum: ["developer", "manager", "admin", "designer", "member", "viewer"],
      default: "developer",
    },

    bio: {
      type: String,
      maxlength: 500,
      default: "",
    },

    location: { type: String, trim: true, maxlength: 100, default: "" },
    jobTitle: { type: String, trim: true, maxlength: 100, default: "" },
    website: { type: String, trim: true, default: "" },
    github: { type: String, trim: true, default: "" },
    linkedin: { type: String, trim: true, default: "" },
    theme: { type: String, enum: ["light", "dark", "system"], default: "system" },
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    refreshTokenHash: { type: String, select: false, default: "" },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.set("toJSON", {
  transform: (_document, returnedUser) => {
    delete returnedUser.password;
    delete returnedUser.__v;
    return returnedUser;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
