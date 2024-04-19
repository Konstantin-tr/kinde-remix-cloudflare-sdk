import { installGlobals } from "@remix-run/cloudflare";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { handleAuth } from "../src/handle-auth";

installGlobals();

vi.stubEnv("SESSION_SECRET", "secret");

describe("handleAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle login requests", async () => {
    const requestEvent = new Request(
      "http://localhost/oop/?returnTo=/redirect"
    );

    const loginMock = vi.fn().mockImplementation(async () => {
      return new URL("http://localhost/test");
    });
    kindeClient.login = loginMock;
    const res = await handleAuth(requestEvent, "login");
    expect(res?.status).toBe(302);
    expect(res?.headers.get("location")).toBe("http://localhost/test");

    expect(loginMock).toHaveBeenCalledWith(expect.anything(), {
      authUrlParams: {
        returnTo: "/redirect",
      },
    });
  });

  it("should handle register requests", async () => {
    const requestEvent = new Request(
      "http://localhost/oop/?returnTo=/redirect"
    );

    const registerMock = vi.fn().mockImplementation(async () => {
      return new URL("http://localhost/test");
    });
    kindeClient.register = registerMock;
    const res = await handleAuth(requestEvent, "register");
    expect(res?.status).toBe(302);
    expect(res?.headers.get("location")).toBe("http://localhost/test");

    expect(registerMock).toHaveBeenCalledWith(expect.anything(), {
      authUrlParams: {
        returnTo: "/redirect",
      },
    });
  });

  it("should handle logout requests", async () => {
    const requestEvent = new Request("http://localhost/oop");

    const logout = vi.fn().mockImplementation(async () => {
      return new URL("http://localhost");
    });
    kindeClient.logout = logout;
    const res = await handleAuth(requestEvent, "logout");
    expect(res?.status).toBe(302);
    expect(res?.headers.get("location")).toBe("http://localhost/");

    expect(logout).toHaveBeenCalledWith(expect.anything());
  });

  it("should handle callback requests", async () => {
    const requestEvent = new Request("http://localhost/oop");

    const callback = vi.fn().mockImplementation(async () => {
      return new URL("http://localhost/logged-out");
    });
    kindeClient.handleRedirectToApp = callback;
    const res = await handleAuth(requestEvent, "callback");
    expect(res?.status).toBe(302);
    expect(res?.headers.get("location")).toBe(
      "http://localhost:3000/test-login"
    );
  });
});
