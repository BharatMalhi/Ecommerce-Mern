const{constants} =  require("../constant")

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.json({message : err.message, stackTrack: err.stack})
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
          res.json({
            title: "Validation Failed some proper fields not found",
            message: err.message,
            stackTrace: err.stack,
          });
          break;
        case constants.NOT_FOUND:
          res.json({
            title: "Not Found",
            message: err.message,
            stackTrace: err.stack,
          });
        case constants.UNAUTHORIZED:
          res.json({
            title: "Unauthorized",
            message: err.message,
            stackTrace: err.stack,
          });
        case constants.FORBIDDEN:
          res.json({
            title: "Forbidden",
            message: err.message,
            stackTrace: err.stack,
          });
        case constants.SERVER_ERROR:
          res.json({
            title: "Server Error",
            message: err.message,
            stackTrace: err.stack,
          });
        default:
          console.log("No Error, All good !");
          break;
      }
    };



module.exports = errorHandler;
