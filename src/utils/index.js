const {uploader} = require('cloudinary').v2;

exports.uploader = (request) => {
    uploader.upload(request, function(error, result){ 
        if(error){
            console.log(`Error: ${error}`);
        }
        console.log(result); 
    });
};

exports.sendEmail = (to, from, subject, html) => {
    
};