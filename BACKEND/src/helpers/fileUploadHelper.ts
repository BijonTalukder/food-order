import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import * as fs from 'fs'
import { ICloudinaryResponse, IUploadFile } from '../app/interface/file';

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dajbq6ac0', 
        api_key: '471757252541213', 
        api_secret: '7gB6E_Fjjfd16Hhl4iQ4soePcNI' // Click 'View Credentials' below to copy your API secret
    });
    const uploadToCloudinary = async(file:IUploadFile):Promise<ICloudinaryResponse>=>{
        return new Promise((resolve,reject)=>{

            console.log(file);
            
          cloudinary.uploader.upload(file.path,(error:Error,result:ICloudinaryResponse)=>{
            // {
            //     // public_id: file.originalname,
            //   }
            fs.unlinkSync(file.path)
          if(error){
              reject(error)
             }
          else{
            resolve(result)
             }
          })  
        })
    // Upload an image
    //  const uploadResult = await cloudinary.uploader
    //    .upload(
    //        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
    //            public_id: 'shoes',
    //        }
    //    )
    //    .catch((error) => {
    //        console.log(error);
    //    });
    
    // console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url('shoes', {
    //     fetch_format: 'auto',
    //     quality: 'auto'
    // });
    
    // console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url('shoes', {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });
    
    // console.log(autoCropUrl);    
};

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({
    storage:storage
})
export const fileUploadHelper ={
    uploadToCloudinary,
    upload
}