import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
      maxlength: 32,
      unique: true,
    },
  },
  { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema)
export default Category
