import Draft from "./draft";
import DTO from "./dto";
import Model from "./model";

class Mysql implements Model {
    async login(githubId: string): Promise<DTO> {
        
    }
    async signup(draft: Draft): Promise<DTO> {
        throw new Error("Method not implemented.");
    }
    
}

export default new Mysql()