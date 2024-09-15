import {
  GrantType,
  createKindeServerClient,
} from "@kinde-oss/kinde-typescript-sdk";
import { version } from "./utils/version";

/**
 *
 * @param {import("./types").KindeConfig} config
 * @returns
 */
export function getOrCreateClient(config) {
  const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
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
