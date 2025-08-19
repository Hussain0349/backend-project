export const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(error.stausCode || 500).json({
      success: false,
      message: error.message, // fixed typo messsage -> message
    });
  }
};
