import { RepositoryFactory } from "@domain/factory/RepositoryFactory";
import { UserController } from "src/adapter/controller/UserController";

export class UserRoute {
    private route = "/user";
    private app;
    private repositoryFactory: RepositoryFactory;
    
    constructor(app, repositoryFactory) {
        this.app = app;
        this.repositoryFactory = repositoryFactory;
    }

    async configure() {
        this.app.post(`${this.route}`, async (req, res) => {
            try {
                const userController = new UserController(this.repositoryFactory);
                const { email, password } = req.body;
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