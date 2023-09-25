export interface Record {
    ID: number;
    record_id: string;
    court_id: number;
    title: string;
    status: string;
    description:string;
    created: string;
    completed: string;
}

export class createRecord {
	// handle user signup data
	constructor(
        public record_id: string,
        public title: string,
        public description:string,
        public created: string,
        public completed: string
    ) {}
}