import { redirect } from "@remix-run/cloudflare";
import { getOrCreateClient } from "./client";
import { createSessionManager } from "./session/session";
import { generateCookieHeader } from "./utils/cookies";

/**
 *
 * @param {Request} request
 * @param {*} route
 * @param {import("./types").KindeConfig} config
 * @returns
 */
export const handleAuth = async (request, route, config) => {
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

  const callback = async () => {
    await kindeClient.handleRedirectToApp(sessionManager, new URL(request.url));

    const postLoginRedirectURLFromMemory = await sessionManager.getSessionItem(
      "post_login_redirect_url"
    );

    if (postLoginRedirectURLFromMemory) {
      sessionManager.removeSessionItem("post_login_redirect_url");
    }

    const postLoginRedirectURL = postLoginRedirectURLFromMemory
      ? postLoginRedirectURLFromMemory
      : config.kindePostLoginRedirectUrl ||
        "Set your post login redirect URL in your environment variables.";
    const headers = generateCookieHeader(request, cookies);
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
  }
};
