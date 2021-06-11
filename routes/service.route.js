var express = require('express');
var router = express.Router();
var multer  = require('multer');
var controller = require('../controller/service.controller');

const storage = multer.memoryStorage();  // lưu vào ram

// const storage = multer.diskStorage({
//   // destination: function (req, file, cb) {
//   //   cb(null, './public/image/product');
//   // },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   }
// });

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage:storage,
  fileFilter: fileFilter
});


router.get('/',controller.index)

router.get('/:id',controller.viewDetail)

router.post('/serviceCreate',
  upload.single('img'),
  controller.serviceCreate
);

router.put('/updateService/:id',
  upload.single('img'),
  controller.updateService
);

router.delete('/deleteService/:id',
  controller.deleteService
);


module.exports = router;
