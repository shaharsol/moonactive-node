import Draft from "./draft";
import DTO from "./dto";

export default interface Model {
    login(githubId: string): Promise<DTO>
    signup(draft: Draft): Promise<DTO>
}