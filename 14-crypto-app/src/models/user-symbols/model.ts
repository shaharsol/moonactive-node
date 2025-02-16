import Draft from "./draft";
import DTO from "./dto";

export default interface Model {
    add(draft: Draft): Promise<DTO>
    getPerUser(id: string): Promise<DTO[]>
    getDistinctSymbols(): Promise<{symbol: string}[]>
}