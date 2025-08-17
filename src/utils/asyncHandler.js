export default asyncHandler = (fn) => async (error,req,res,next) => {

    // using try and catch
    try {

        await fn(req,res,next)
        
    } catch (error) {
        res.status(error.code || 500).json({
            success: false, messsage: error.messsage
        })
    }

}