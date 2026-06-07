export type AuthUser = {
	name: string;
	email: string;
	avatar?: string | null;
};

export type TokenResponse = {
	success: true;
};

export type LogoutResponse = {
	success: true;
};
