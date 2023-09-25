export class SignupModel {
	// handle user signup data
	constructor(
        public name: string, 
        public location: string, 
        public type: string, 
        public email: string, 
        public password: string
    ) {}
}

export class LoginModel {
	// handle user login data
	constructor(
        public email: string, 
        public password: string
    ) {}
}

export class User {
    id!: string;
    created_at!: string;
    email!: string;
    first_name!: string;
    last_name!: string;
    is_verified!: true
}