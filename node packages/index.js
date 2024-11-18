import { v2 as cloudinary } from 'cloudinary';

(async function() {
    cloudinary.config({ 
        cloud_name: 'dxjb32pfs', 
        api_key: '193274648216665', 
        api_secret: 'jH1EgTOFQ1oCZlO5vab8oQxfTY4' 
    });
     const uploadResult = await cloudinary.uploader
       .upload(
           'img.jpg',
           {
               public_id: 'trees',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    const optimizeUrl = cloudinary.url('trees', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl); 
    const autoCropUrl = cloudinary.url('trees', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();