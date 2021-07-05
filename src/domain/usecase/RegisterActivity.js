const Activity = require("../entity/Activity");
const Tag = require("../entity/Tag");

class RegisterActivity {
    activityRepositoy;
    consultingRepository;
    
    constructor(repositoryFactory) {
        this.activityRepositoy = repositoryFactory.createActivityRepository();        
        this.consultingRepository = repositoryFactory.createConsultingRepository();
    }

    async execute({ name, description, date, consultingEmail, amountOfHours, tags }) {
        const consulting = await this.consultingRepository.getByEmail(consultingEmail);
        const activity = new Activity({
            name, 
            description, 
            date, 
            consulting: consulting.id,
            hours: amountOfHours, 
            tags
        });
        await this.activityRepositoy.saveActivity(activity);
        if (tags) {
            for (let tag of tags) {
                if (!(await this.activityRepositoy.existsTag(tag))) {
                    await this.activityRepositoy.saveTag(new Tag(tag))
                }
            }
        }
    }
}

module.exports = RegisterActivity;