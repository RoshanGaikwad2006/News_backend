const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    mr: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    mr: { type: String, required: true }
  },
  content: {
    en: { type: String },
    mr: { type: String }
  },
  location: {
    en: { type: String, default: 'Vinchur' },
    mr: { type: String, default: 'विंचूर' }
  },
  author: { type: String, required: true },
  authorImage: { type: String, default: '/images/writer_photo.png' },
  adImage: { type: String, default: '' },
  category: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true },
  readTime: { type: Number, default: 5 },
  views: { type: Number, default: 0 },
  isBreaking: { type: Boolean, default: false },
  isVideo: { type: Boolean, default: false },
  videoDuration: { type: String }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Article', articleSchema);
