export type InputProps = {
	type?: 'text' | 'password' | 'date';
	label: string;
	name: string;
	id: string;
	value?: string;
	placeholder?: string;
	error?: string;
	required?: boolean;
};

export type SelectOption = {
	value: string;
	label: string;
};

export type SelectProps = Omit<InputProps, 'type'> & {
	options: SelectOption[];
};

export type OptionButtonsProps = {
	label: string;
	options: SelectOption[];
	name: string;
	defaultValue?: string;
	selectedValue?: string;
};

export type TextAreaProps = Omit<InputProps, 'type'>;

export type ButtonProps = {
	type?: 'submit' | 'button';
	text: string;
	disabled?: boolean;
	isLoading?: boolean;
	onClick?: () => void;
};
