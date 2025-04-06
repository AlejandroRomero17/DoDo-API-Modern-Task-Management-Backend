import mongoose, { Schema, Document, Types } from "mongoose";

// Interface para el documento ToDo
export interface ITodo extends Document {
  title: string;
  description: string;
  isCompleted: boolean;
  completedOn?: string;
  createdBy: {
    type: Schema.Types.ObjectId;
    ref: "User";
    required: [true, "El usuario creador es requerido"];
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// Esquema de Mongoose con TypeScript
const toDoSchema: Schema<ITodo> = new Schema(
  {
    title: {
      type: String,
      required: [true, "El título es requerido"],
    },
    description: {
      type: String,
      required: [true, "La descripción es requerida"],
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    completedOn: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El usuario creador es requerido"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Modelo tipado
const ToDo = mongoose.model<ITodo>("ToDo", toDoSchema);

export default ToDo;
