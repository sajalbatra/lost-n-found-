import 'dotenv/config';
import Grid from 'gridfs-stream';
import mongoose from 'mongoose';
import express from 'express';


// Set up MongoDB connection
mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const conn = mongoose.connection;
//console.log(conn)
let gfs;

conn.once('open', function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('photos');
});

// Get image route
export async function getimage(req, res) {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete image route
export async function deleteimage(req, res) {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    await gfs.files.deleteOne({ _id: file._id });
    await gfs.chunks.deleteMany({ files_id: file._id });

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Export app for use in other modules if needed
