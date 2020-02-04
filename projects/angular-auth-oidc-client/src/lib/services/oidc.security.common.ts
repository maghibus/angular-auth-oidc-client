import { Injectable } from '@angular/core';
import { OidcSecurityStorage } from './oidc.security.storage';

export type SilentRenewState = 'running' | '';

@Injectable()
export class OidcSecurityCommon {

    public get authResult(): any {
        return this.retrieve(this.storageAuthResult);
    }

    public set authResult(value: any) {
        this.store(this.storageAuthResult, value);
    }

    public get accessToken(): string {
        return this.retrieve(this.storageAccessToken) || '';
    }

    public set accessToken(value: string) {
        this.store(this.storageAccessToken, value);
    }

    public get idToken(): string {
        return this.retrieve(this.storageIdToken) || '';
    }

    public set idToken(value: string) {
        this.store(this.storageIdToken, value);
    }

    public get isAuthorized(): boolean | undefined {
        return this.retrieve(this.storageIsAuthorized);
    }

    public set isAuthorized(value: boolean | undefined) {
        this.store(this.storageIsAuthorized, value);
    }

    public get userData(): any {
        return this.retrieve(this.storageUserData);
    }

    public set userData(value: any) {
        this.store(this.storageUserData, value);
    }

    public get authNonce(): string {
        return this.retrieve(this.storageAuthNonce) || '';
    }

    public set authNonce(value: string) {
        this.store(this.storageAuthNonce, value);
    }

    public get code_verifier(): string {
        return this.retrieve(this.storageCodeVerifier) || '';
    }

    public set code_verifier(value: string) {
        this.store(this.storageCodeVerifier, value);
    }

    public get authStateControl(): string {
        return this.retrieve(this.storageAuthStateControl) || '';
    }

    public set authStateControl(value: string) {
        this.store(this.storageAuthStateControl, value);
    }

    public get sessionState(): any {
        return this.retrieve(this.storageSessionState);
    }

    public set sessionState(value: any) {
        this.store(this.storageSessionState, value);
    }

    public get silentRenewRunning(): SilentRenewState {
        return this.retrieve(this.storageSilentRenewRunning) || '';
    }

    public set silentRenewRunning(value: SilentRenewState) {
        this.store(this.storageSilentRenewRunning, value);
    }

    public get customRequestParams(): {
        [key: string]: string | number | boolean;
    } {
        return this.retrieve(this.storageCustomRequestParams);
    }

    public set customRequestParams(value: { [key: string]: string | number | boolean }) {
        this.store(this.storageCustomRequestParams, value);
    }

    constructor(private oidcSecurityStorage: OidcSecurityStorage) {}

    public get expiresAt(): string {
    return this.retrieve(this.storageExpiresAt) || '';
  }

  public set expiresAt(value: string) {
    this.store(this.storageExpiresAt, value);
  }

    private storageAuthResult = 'authorizationResult';

    private storageAccessToken = 'authorizationData';

    private storageIdToken = 'authorizationDataIdToken';

    private storageIsAuthorized = '_isAuthorized';

    private storageUserData = 'userData';

    private storageAuthNonce = 'authNonce';

    private storageCodeVerifier = 'code_verifier';

    private storageAuthStateControl = 'authStateControl';

    private storageSessionState = 'session_state';

    private storageSilentRenewRunning = 'storage_silent_renew_running';

    private storageCustomRequestParams = 'storage_custom_request_params';

    private storageExpiresAt = 'expires_at';

    private retrieve(key: string): any {
        return this.oidcSecurityStorage.read(key);
    }

    private store(key: string, value: any) {
        this.oidcSecurityStorage.write(key, value);
    }

    resetStorageData(isRenewProcess: boolean) {
        if (!isRenewProcess) {
            this.store(this.storageAuthResult, '');
            this.store(this.storageSessionState, '');
            this.store(this.storageSilentRenewRunning, '');
            this.store(this.storageIsAuthorized, false);
            this.store(this.storageAccessToken, '');
            this.store(this.storageIdToken, '');
            this.store(this.storageUserData, '');
            this.store(this.storageCodeVerifier, '');
            this.store(this.storageExpiresAt, '');
        }
    }

    getAccessToken(): any {
        return this.retrieve(this.storageAccessToken);
    }

    getIdToken(): any {
        return this.retrieve(this.storageIdToken);
    }

    getRefreshToken(): any {
        return this.authResult.refresh_token;
    }
}
