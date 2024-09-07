import Cookies from "universal-cookie";

const KINDE_COOKIES = [
  "refresh_token",
  "access_token",
  "id_token",
  "user",
  "ac-state-key",
  "post_login_redirect_url",
];

/**
 *
 * @param {string} name
 * @param {object | string} value
 * @param {{maxAge?: number, domain?: string, path?:string, expires?: any, httpOnly?: boolean, secure?: boolean, sameSite?: "Strict" | "Lax" | "None" | "Secure"}} options
 * @returns
 */
function serializeCookie(name, value, options = {}) {
  const cookieParts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(typeof value === "object" ? JSON.stringify(value) : value)}`,
  ];

  if (options.maxAge) {
    cookieParts.push(`Max-Age=${options.maxAge}`);
  }

  if (options.domain) {
    cookieParts.push(`Domain=${options.domain}`);
  }

  if (options.path) {
    cookieParts.push(`Path=${options.path}`);
  }

  if (options.expires) {
    cookieParts.push(`Expires=${options.expires.toUTCString()}`);
  }

  if (options.httpOnly) {
    cookieParts.push("HttpOnly");
  }

  if (options.secure) {
    cookieParts.push("Secure");
  }

  if (options.sameSite) {
    cookieParts.push(`SameSite=${options.sameSite}`);
  }

  return cookieParts.join("; ");
}

/**
 *
 * @param {Request} request
 * @param {Cookies} cookies
 * @returns {Headers}
 */
export const generateCookieHeader = (request, cookies) => {
  const oldCookies = new Cookies(request.headers.get("Cookie"), {
    path: "/",
  });
  const oldCookiesKeys = Object.keys(oldCookies.getAll());
  const newCookiesKeys = Object.keys(cookies.getAll()).filter((cookie) =>
    KINDE_COOKIES.includes(cookie),
  );

  const cookiesToBeDeleted = oldCookiesKeys
    .filter((cookie) => KINDE_COOKIES.includes(cookie))
    .filter((x) => !newCookiesKeys.includes(x));

  let headers = new Headers();

  newCookiesKeys.forEach((key) => {
    headers.append(
      "Set-Cookie",
      serializeCookie(key, cookies.get(key), {
        path: "/",
        sameSite: "Lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      }),
    );
  });

  cookiesToBeDeleted.forEach((key) => {
    headers.append(
      "Set-Cookie",
      serializeCookie(key, 0, {
        path: "/",
        maxAge: -1,
        sameSite: "Lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      }),
    );
  });

  return headers;
};
