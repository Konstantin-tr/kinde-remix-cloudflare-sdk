import {
  GrantType,
  createKindeServerClient,
} from "@kinde-oss/kinde-typescript-sdk";
import { version } from "./utils/version";

let kindeClient = null;

/**
 *
 * @param {import("./types").KindeEnvironmentConfig} config
 * @returns
 */
export function getOrCreateClient(config) {
  if (!!kindeClient) {
    return kindeClient;
  }

  kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
    authDomain: config.issuerUrl,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    redirectURL: config.kindeSiteUrl + "/kinde-auth/callback",
    logoutRedirectURL: config.kindePostLogoutRedirectUrl,
    framework: "Remix",
    frameworkVersion: version,
  });

  return kindeClient;
}
