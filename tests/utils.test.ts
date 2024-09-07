import { describe, expect, test } from "vitest";
import { createSessionManager } from "../src/session";
import { generateCookieHeader } from "../src/utils/cookies";

describe("Utils tests", () => {
  test("serializeCookie returns headers object", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { cookies, sessionManager } = await createSessionManager(mockRequest);
    sessionManager.setSessionItem("access_token", "someValue");
    const res = generateCookieHeader(mockRequest, cookies);
    expect(res).toBeTypeOf("object");
    const setCookie = res.getSetCookie();
    expect(setCookie).toEqual([
      "access_token=someValue; Path=/; HttpOnly; SameSite=Lax",
    ]);
  });

  test("serializeCookie only adds to Set-Cookie when needed", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { cookies, sessionManager } = await createSessionManager(mockRequest);
    sessionManager.setSessionItem("access_token", "someValue");
    sessionManager.removeSessionItem("access_token");
    const res = generateCookieHeader(mockRequest, cookies);
    expect(res).toBeTypeOf("object");
    const setCookie = res.getSetCookie();
    expect(setCookie).toStrictEqual([]);
  });

  test("serializeCookie handles deletion", async () => {
    const mockRequest = new Request("http://kinde.com");
    mockRequest.headers.append("Cookie", "access_token=someValue");
    const { cookies, sessionManager } = await createSessionManager(mockRequest);
    sessionManager.removeSessionItem("access_token");
    const res = generateCookieHeader(mockRequest, cookies);
    expect(res).toBeTypeOf("object");
    const setCookie = res.getSetCookie();
    expect(setCookie).toContain(
      "access_token=0; Max-Age=-1; Path=/; HttpOnly; SameSite=Lax",
    );
  });
});
