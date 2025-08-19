export class apiError extends Error{
    constructor(statusCode,message='something went code',errors=[],stack = '') {
        super(message)
        this.statusCode = statusCode,
        this.data = null,
        this.message = message,
        this.success = false,
        this.errors = errors


    }
}

