import { validateClientSecret } from "@kinde-oss/kinde-typescript-sdk";
import { json, redirect } from "@remix-run/cloudflare";
import { getOrCreateClient } from "./client";
import { createSessionManager } from "./session/session";
import { generateCookieHeader } from "./utils/cookies";

/**
 *
 * @param {Request} request
 * @param {string | undefined} route
 * @param {import("./types").KindeConfig} config
 * @param {{onRedirectCallback?: (props: {user: import("./types").KindeUser}) => void}} [options]
 * @returns
 */
export const handleAuth = async (request, route, config, options) => {
  const { sessionManager, cookies } = await createSessionManager(request);

  const kindeClient = getOrCreateClient(config);

  const login = async () => {
    const { searchParams } = new URL(request.url);
    const authUrl = await kindeClient.login(sessionManager, {
      authUrlParams: Object.fromEntries(searchParams),
    });

    const postLoginRedirecturl = searchParams.get("returnTo");

    if (postLoginRedirecturl) {
      cookies.set("post_login_redirect_url", postLoginRedirecturl);
    }

    const headers = generateCookieHeader(request, cookies);

    return redirect(authUrl.toString(), {
      headers,
    });
  };

  const register = async () => {
    const { searchParams } = new URL(request.url);
    const authUrl = await kindeClient.register(sessionManager, {
      authUrlParams: Object.fromEntries(searchParams),
    });
    const postLoginRedirecturl = searchParams.get("returnTo");

    if (postLoginRedirecturl) {
      cookies.set("post_login_redirect_url", postLoginRedirecturl);
    }
    const headers = generateCookieHeader(request, cookies);
    return redirect(authUrl.toString(), {
      headers,
    });
  };

  const health = async () => {
    return json({
      siteUrl: config.kindeSiteUrl,
      issuerURL: config.issuerUrl,
      clientID: config.clientId,
      clientSecret: validateClientSecret(config.clientSecret || "")
        ? "Set correctly"
        : "Not set correctly",
      postLogoutRedirectUrl: config.kindePostLogoutRedirectUrl,
      postLoginRedirectUrl: config.kindePostLoginRedirectUrl,
      audience: config.audience,
      cookieMaxAge: config.cookieMaxAge,
    });
  };

  const callback = async () => {
    await kindeClient.handleRedirectToApp(sessionManager, new URL(request.url));

    const postLoginRedirectURLFromMemory = await sessionManager.getSessionItem(
      "post_login_redirect_url",
    );

    if (postLoginRedirectURLFromMemory) {
      sessionManager.removeSessionItem("post_login_redirect_url");
    }

    const postLoginRedirectURL = postLoginRedirectURLFromMemory
      ? postLoginRedirectURLFromMemory
      : config.kindePostLoginRedirectUrl ||
        "Set your post login redirect URL in your environment variables.";
    const headers = generateCookieHeader(request, cookies);

    const user = await kindeClient.getUser(sessionManager);

    options?.onRedirectCallback?.({ user });

    return redirect(postLoginRedirectURL.toString(), {
      headers,
    });
  };

  const logout = async () => {
    const authUrl = await kindeClient.logout(sessionManager);
    const headers = generateCookieHeader(request, cookies);
    return redirect(authUrl.toString(), {
      headers,
    });
  };

  switch (route) {
    case "login":
      return login();
    case "register":
      return register();
    case "callback":
      return callback();
    case "logout":
      return logout();
    case "health":
      return health();
  }
};
