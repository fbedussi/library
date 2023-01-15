export type Id = string;

export type ErrorOrigin = 'ui' | 'db' | 'auth' | 'unknown'; // TODO: add types as needed

export type HttpErrorCode = 400 | 401 | 403 | 404 | 405 | 408 | 500;

export type UrlString = string;
export type BeError = {
	message: string;
	origin: ErrorOrigin;
};

export type RecordedBeError = BeError & {
	id: string;
};

export type UiError = {
	message: string;
	stack?: string;
};

export type RecordedUiError = UiError & {
	id: string;
};

export type Errors = {
	http: RecordedBeError[];
	ui: RecordedUiError[];
};

export type Book = {
	id: Id;
	author: string;
	title: string;
	location: string;
	coverPath: string;
	read?: boolean;
};

export type DbBook = Book & {
	userId: Id;
};

export type NotificationType = 'success' | 'error' | 'info';

export type Notification = {
	_id: Id;
	type: NotificationType;
	message: string;
	autoClose: boolean;
	errorId?: string;
	errorType?: 'ui' | 'http';
	messageIsLabelKey?: boolean;
};

export type AuthState = {
	userId: Id;
};

export type RootState = {
	books: Book[];
	notifications: Notification[];
	photos: {
		currentPhotoPath: UrlString;
		words: string[];
	};
	errors: Errors;
	auth: AuthState;
};

export type SearchCriteria = {
	author: string;
	title: string;
	location: string;
	showOnlyNotRead?: boolean;
};

export type FormData = Omit<SearchCriteria, 'read'> & {
	read?: string;
};

export type SortingKey = 'author' | 'title' | 'location';

export type Base64 = string;

export type SelectedField = 'author' | 'title';

export type SortingOrder = 'asc' | 'desc';
