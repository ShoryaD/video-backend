import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // Check if the file exists before deleting it
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);  // Delete the file only if it exists
        // console.log('File deleted successfully from local storage');
    } else {
        console.error('File not found:', localFilePath);
    }

    return response;

} catch (error) {
    // In case of error, also check before attempting to delete the file
    if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath); // Delete the file if it exists
    }
    // console.error('Error uploading to Cloudinary or deleting local file:', error);
    return null;
    }
}



export {uploadOnCloudinary}