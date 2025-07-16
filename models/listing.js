const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  image: {
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=60",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=60"
          : v,
    },
    filename: {
      type: String,
      default: "default-image",
    },
  },

  price: Number,
  location: String,
  country: String,

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User", // capital 'User' is conventional
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
    
  ],
});

// Optional: Cascade delete reviews when a listing is deleted
/*
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});
*/

module.exports = mongoose.model("Listing", listingSchema);
