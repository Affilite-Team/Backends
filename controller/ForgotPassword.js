require("dotenv").config();
const crypto = require("crypto");
const userModel = require("../model/User");
const sgMail = require("@sendgrid/mail");

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const userExist = await userModel.findOne({ email: email }).exec();
  if (!userExist) {
    return res.json({ msg: "user not found", code: 404 });
  }

  try {
    // you must instantiate the model
    const resetToken = userExist.createToken();
    // save the reset token
    await userExist
      .save()
      .then(() => {
        console.log("user saved with reset token");
      })
      .catch((err) => {
        console.log("Error saveing user", +err);
      });

    sgMail.setApiKey(process.env.SENDGRID_KEY);
    const msg = {
      to: userExist.email,
      from: {
        Name: "AFFILIATE MARKET SUPPORT",
        email: process.env.EMAIL,
      },
      templateId: process.env.TEMPLATE_ID,
      dynamicTemplateData: {
        name: `${userExist.firstName}`,
        names: `${resetToken}`,
      },
    };

    const sendMail = async () => {
      try {
        await sgMail.send(msg);
        res.json({
          msg: "reset token send successfully",
          status: "success",
          code: 200,
        });
      } catch (error) {
        console.error(error);
        return res.json(error.message);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    };

    sendMail();
  } catch (error) {
    console.log(error.message);
    userExist.passwordResetToken = undefined;
    userExist.passwordResetTokenExpire = undefined;
    return res.json({
      msg: "there was an error sending password reset link",
      code: 500,
    });
  }
  // this is to save the changes to the database
  // await userModel.save();
};
