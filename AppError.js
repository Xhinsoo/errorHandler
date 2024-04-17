class AppError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    //built in express EH looks for .status and sets that status in response
    this.status = status;
  }
}


module.exports = AppError;