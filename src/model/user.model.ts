import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

// Define una interfaz para el documento del usuario
export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  userName: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define el esquema del usuario
const userSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    userName: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Agrega `createdAt` y `updatedAt`
  }
);

// Middleware para encriptar la contraseña antes de guardar el documento
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

// Modelo del usuario
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
