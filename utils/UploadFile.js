var cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier')
let utils= {}
utils.uploadSingleByPath = (file) => {
        return new Promise(resolve => {
            cloudinary.uploader.upload(file, {
                    folder: 'single'
                })
                .then(result => {
                    if (result) {
                        resolve({
                            url: result.secure_url
                        })
                    }
                })
        })
    }


utils.deleteSingle = (url) => {
    try{
        let public_ids=url.slice(url.indexOf(`upload/`)==-1?0:url.indexOf(`upload/`)+7).split(`/`).slice(1).join(`/`).replace(/\..*/,"")||""
        console.log(`public_ids`, public_ids)
        return new Promise(resolve => {
            cloudinary.api.delete_resources([public_ids])
                .then(result => {
                    if (result) {
                        resolve({
                            message:result
                        })
                    }
                })
                .catch(err=> reject({message:err}))
        })
    }
    catch(err){
        return new Promise((resolve=>{resolve("ok")}))
    }
   
    }

utils.uploadSingle=(file, options={})=>{
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(options,
          (error, result) => {
            if (result) {
              resolve(result.secure_url);
            } else {
              reject(error);
            }
          }
        );

       streamifier.createReadStream(file.buffer).pipe(stream);
    });
}

utils.reSizeImage = (id, h, w) => {
        return cloudinary.url(id, {
            height: h,
            width: w,
            crop: 'scale',
            format: 'jpg'
        })
}

module.exports= utils