import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import multer from 'multer';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET_KEY
});

const storage = multer.diskStorage({

});

const upload = multer({
    storage,
    limits: {
        fileSize: 4 * 1024 * 1024, // Set the File size in 4 MB
    }
});

const uploadimage = (req, res, next) => {
    upload.single('image')(req, res, async error => {
        try {
            if (req.file) {
                const uploadResult = await cloudinary.uploader.upload(req.file.path);
                req.cloudinaryImageUrl = uploadResult.secure_url;
            }
            next();
        } catch (error) {
            return next(error);
        }
    })
}

export default uploadimage;



