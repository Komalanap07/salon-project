const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dxjb32pfs', 
  api_key: '193274648216665', 
  api_secret: 'jH1EgTOFQ1oCZlO5vab8oQxfTY4' 
});

module.exports = cloudinary;
