var express = require('express');
var router = express.Router();
const apiKeyMiddleware = require('../middleware/apikey');
const emailUtils = require('../utils/email');
const { DateTime } = require("luxon");
const config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/poweron', apiKeyMiddleware , async function(req, res, next) {
  try {
    const now = DateTime.now().setZone('America/Guatemala').toLocaleString(DateTime.DATETIME_FULL);
    let { 
      to,
      subject,
      body,
      bodyHTML,
    }  = req.body;

    subject = subject.replace('{{date}}', now);
    body = body.replace('{{date}}', now);
    bodyHTML = bodyHTML.replace('{{date}}', now);

    const message = {
      from: config.email.auth.user,
      to,
      subject,
      text: body,
      html: bodyHTML,
    };

    const emailConfig = config.email ?? null;

    const result = await emailUtils.sendEmail(message);
    if (result.success === false) {
        throw new Exception(result.error);
    }
    
    return res.json({
      success: true,
      now,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error:error.message,
    });
  }
});

router.get('*', function(req, res, next) {
  return res.status(404).json({success: false});
});


module.exports = router;
