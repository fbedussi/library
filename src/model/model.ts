export type Id = string

export type ErrorOrigin =
	| 'internal-ui'
	| 'external'
	| 'unknown' // TODO: add types as needed

export type HttpErrorCode = 400 | 401 | 403 | 404 | 405 | 408 | 500

export interface HttpError {
	status: HttpErrorCode
	stack: string
	message: string
	internalUrl: string
	externalUrl: string
	origin: ErrorOrigin
}

export interface RecordedHttpError extends HttpError {
	id: string
}

export interface UiError {
	id: string
	message: string
	stack: string
}

export interface RecordedUiError extends UiError {
	id: string
}

export interface Errors {
	http: RecordedHttpError[]
	ui: RecordedUiError[]
}

export interface Book {
  author: string
  publisher: string
  title: string
  location: string
}

export type NotificationType = 'success' | 'error' | 'info'

export interface Notification {
	_id: Id
	type: NotificationType
	message: string
	autoClose: boolean
	errorId?: string
	errorType?: 'ui' | 'http'
	messageIsLabelKey?: boolean
}

export interface AuthState {
  userId: Id
}

export interface RootState {
  books: Book[]
	notifications: Notification[]
  errors: Errors
  auth: AuthState
}
