export interface userStateInterface {
    message: string;
    accessToken: string;
    refreshToken: string;
    loading: boolean;
    error: string | boolean | null;
  }

export interface userSignUpInterface {
    accessToken: string;
    refreshToken: string;
    message: string;
}

export interface userLoginInterface {
    accessToken: string;
}