import { UserController } from "src/adapter/controller/UserController";

export class UserRoute {
    private route = "/user";
    private app;
    private repositoryFactory;
    constructor(app, repositoryFactory) {
        this.app = app;
        this.repositoryFactory = repositoryFactory;
    }

    async configure() {
        this.app.post(`${this.route}`, async (req, res) => {
            try {
                const userController = new UserController(this.repositoryFactory);
                console.log("BODY", req.body)
                const { email, password } = req.body;
                console.log(email, password);
                let authenticateUserOutput = await userController.authenticateUser({
                    email, 
                    password
                });
                res.json(authenticateUserOutput);
            } catch(error) {
                console.log(error)
                res.status(403);
                res.json(error.toString());
            }
        });
    }
}