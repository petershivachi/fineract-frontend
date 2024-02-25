export class UserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "error";
    }
}