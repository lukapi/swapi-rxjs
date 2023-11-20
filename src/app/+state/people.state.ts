import { People } from "../dto/people";

export interface PeopleState {
    people: People[],
    loading: boolean
}