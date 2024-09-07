import { describe, expect, it, vi } from "vitest";
import { getKindeSession } from "../src";
import { kindeClient } from "../src/handle-auth";

describe("getKindeSession", () => {
  it("correctly exports getKindeSession", () => {
    expect(getKindeSession).toBeDefined();
  });

  it("returns a session object", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    expect(session).toBeDefined();

    const kindeSession = await getKindeSession(requestEvent);
    expect(kindeSession).toHaveProperty("getClaim");
    expect(kindeSession).toHaveProperty("getClaimValue");
    expect(kindeSession).toHaveProperty("getOrganization");
    expect(kindeSession).toHaveProperty("getPermission");
    expect(kindeSession).toHaveProperty("getPermissions");
    expect(kindeSession).toHaveProperty("getFlag");
    expect(kindeSession).toHaveProperty("getStringFlag");
    expect(kindeSession).toHaveProperty("getBooleanFlag");
    expect(kindeSession).toHaveProperty("getIntegerFlag");
    expect(kindeSession).toHaveProperty("getToken");
    expect(kindeSession).toHaveProperty("getUser");
    expect(kindeSession).toHaveProperty("getUserProfile");
    expect(kindeSession).toHaveProperty("getUserOrganizations");
    expect(kindeSession).toHaveProperty("isAuthenticated");
    expect(kindeSession).toHaveProperty("refreshTokens");
  });

  it("returns a session object", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    expect(session).toBeDefined();

    expect(session).toHaveProperty("getClaim");
    expect(session).toHaveProperty("getClaimValue");
    expect(session).toHaveProperty("getOrganization");
    expect(session).toHaveProperty("getPermission");
    expect(session).toHaveProperty("getPermissions");
    expect(session).toHaveProperty("getFlag");
    expect(session).toHaveProperty("getStringFlag");
    expect(session).toHaveProperty("getBooleanFlag");
    expect(session).toHaveProperty("getIntegerFlag");
    expect(session).toHaveProperty("getToken");
    expect(session).toHaveProperty("getUser");
    expect(session).toHaveProperty("getUserProfile");
    expect(session).toHaveProperty("getUserOrganizations");
    expect(session).toHaveProperty("isAuthenticated");
    expect(session).toHaveProperty("refreshTokens");
  });

  it("can get a claim", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getClaim = vi.fn().mockResolvedValueOnce("test-claim");
    const claim = await session.getClaim("test", "access_token");
    expect(kindeClient.getClaim).toHaveBeenCalledWith(
      expect.anything(),
      "test",
      "access_token",
    );
    expect(claim).toBe("test-claim");
  });

  it("returns null for claims when not authed", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getClaim = vi
      .fn()
      .mockRejectedValueOnce(Error("Not authenticated"));
    const claim = await session.getClaim("test", "access_token");
    expect(kindeClient.getClaim).toHaveBeenCalledWith(
      expect.anything(),
      "test",
      "access_token",
    );
    expect(claim).toBe(null);
  });

  it("can get a claim value", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getClaimValue = vi.fn().mockResolvedValueOnce("test-claim");
    const claim = await session.getClaimValue("test", "access_token");
    expect(kindeClient.getClaimValue).toHaveBeenCalledWith(
      expect.anything(),
      "test",
      "access_token",
    );
    expect(claim).toBe("test-claim");
  });

  it("returns null for claim values when not authed", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getClaimValue = vi
      .fn()
      .mockRejectedValueOnce(Error("Not authenticated"));
    const claim = await session.getClaimValue("test", "access_token");
    expect(kindeClient.getClaimValue).toHaveBeenCalledWith(
      expect.anything(),
      "test",
      "access_token",
    );
    expect(claim).toBe(null);
  });

  it("can get token", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getToken = vi.fn().mockResolvedValueOnce("test-claim");
    const claim = await session.getToken();
    expect(kindeClient.getToken).toHaveBeenCalledWith(expect.anything());
    expect(claim).toBe("test-claim");
  });

  it("returns null for token when not authed", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getToken = vi
      .fn()
      .mockRejectedValueOnce(Error("Not authenticated"));
    const claim = await session.getToken();
    expect(kindeClient.getToken).toHaveBeenCalledWith(expect.anything());
    expect(claim).toBe(null);
  });

  it("can get determine if a user is authenticated", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.isAuthenticated = vi.fn().mockResolvedValueOnce(true);
    const claim = await session.isAuthenticated();
    expect(kindeClient.isAuthenticated).toHaveBeenCalledWith(expect.anything());
    expect(claim).toBe(true);
  });

  it("returns for isAuthenticated false when not authed", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.isAuthenticated = vi
      .fn()
      .mockRejectedValueOnce(Error("Not authenticated"));
    const claim = await session.isAuthenticated();
    expect(kindeClient.isAuthenticated).toHaveBeenCalledWith(expect.anything());
    expect(claim).toBe(false);
  });

  it("can get the authenticated user", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getUser = vi.fn().mockResolvedValueOnce({
      given_name: "test",
      family_name: "test",
      email: "test@test.com",
      id: "test-id",
    });
    const claim = await session.getUser();
    expect(kindeClient.getUser).toHaveBeenCalledWith(expect.anything());
    expect(claim).toStrictEqual({
      given_name: "test",
      family_name: "test",
      email: "test@test.com",
      id: "test-id",
    });
  });

  it("returns null for getUser when not authed", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getUser = vi
      .fn()
      .mockRejectedValueOnce(Error("Not authenticated"));
    const claim = await session.getUser();
    expect(kindeClient.getUser).toHaveBeenCalledWith(expect.anything());
    expect(claim).toBe(null);
  });

  it("can get the authenticated user profile", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getUserProfile = vi.fn().mockResolvedValueOnce({
      given_name: "test",
      family_name: "test",
      email: "test@test.com",
      id: "test-id",
    });
    const claim = await session.getUserProfile();
    expect(kindeClient.getUserProfile).toHaveBeenCalledWith(expect.anything());
    expect(claim).toStrictEqual({
      given_name: "test",
      family_name: "test",
      email: "test@test.com",
      id: "test-id",
    });
  });

  it("returns null for getUserProfile when not authed", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getUserProfile = vi
      .fn()
      .mockRejectedValueOnce(Error("Not authenticated"));
    const claim = await session.getUserProfile();
    expect(kindeClient.getUserProfile).toHaveBeenCalledWith(expect.anything());
    expect(claim).toBe(null);
  });

  it("can get a flag", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getFlag = vi.fn().mockResolvedValueOnce("flag");
    const claim = await session.getFlag("test-flag", "default", "s");
    expect(kindeClient.getFlag).toHaveBeenCalledWith(
      expect.anything(),
      "test-flag",
      "default",
      "s",
    );
    expect(claim).toStrictEqual("flag");
  });

  it("returns null for getFlag when not authed", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getFlag = vi
      .fn()
      .mockRejectedValueOnce(Error("Not authenticated"));
    const claim = await session.getFlag("test-flag", "default", "s");
    expect(claim).toBe(null);
  });

  it("can get a boolean flag", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getBooleanFlag = vi.fn().mockResolvedValueOnce(true);
    const claim = await session.getBooleanFlag("test-flag", false);
    expect(kindeClient.getBooleanFlag).toHaveBeenCalledWith(
      expect.anything(),
      "test-flag",
      false,
    );
    expect(claim).toStrictEqual(true);
  });

  it("returns null for getBooleanFlag when not authed", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getBooleanFlag = vi
      .fn()
      .mockRejectedValueOnce(Error("Not authenticated"));
    const claim = await session.getBooleanFlag("test-flag", false);
    expect(claim).toBe(null);
  });

  it("can get a string flag", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getStringFlag = vi.fn().mockResolvedValueOnce(true);
    const claim = await session.getStringFlag("test-flag", "false");
    expect(kindeClient.getStringFlag).toHaveBeenCalledWith(
      expect.anything(),
      "test-flag",
      "false",
    );
    expect(claim).toStrictEqual(true);
  });

  it("returns null for getStringFlag when not authed", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getStringFlag = vi
      .fn()
      .mockRejectedValueOnce(Error("Not authenticated"));
    const claim = await session.getStringFlag("test-flag", "false");
    expect(claim).toBe(null);
  });

  it("can get a integer flag", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getIntegerFlag = vi.fn().mockResolvedValueOnce(true);
    const claim = await session.getIntegerFlag("test-flag", 1);
    expect(kindeClient.getIntegerFlag).toHaveBeenCalledWith(
      expect.anything(),
      "test-flag",
      1,
    );
    expect(claim).toStrictEqual(true);
  });

  it("returns null for getIntegerFlag when not authed", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getIntegerFlag = vi
      .fn()
      .mockRejectedValueOnce(Error("Not authenticated"));
    const claim = await session.getIntegerFlag("test-flag", 1);
    expect(claim).toBe(null);
  });

  it("can get a permission", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getPermission = vi.fn().mockResolvedValueOnce("permission");
    const claim = await session.getPermission("test-permission");
    expect(kindeClient.getPermission).toHaveBeenCalledWith(
      expect.anything(),
      "test-permission",
    );
    expect(claim).toStrictEqual("permission");
  });

  it("returns null for getPermission when not authed", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getPermission = vi
      .fn()
      .mockRejectedValueOnce(Error("Not authenticated"));
    const claim = await session.getPermission("test-permission");
    expect(claim).toBe(null);
  });

  it("can get permissions", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getPermissions = vi.fn().mockResolvedValueOnce("permission");
    const claim = await session.getPermissions();
    expect(kindeClient.getPermissions).toHaveBeenCalledWith(expect.anything());
    expect(claim).toStrictEqual("permission");
  });

  it("returns empty array for getPermissions when not authed", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getPermissions = vi
      .fn()
      .mockRejectedValueOnce(Error("Not authenticated"));
    const claim = await session.getPermissions();
    expect(claim).toStrictEqual([]);
  });

  it("can get the users organization", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getOrganization = vi.fn().mockResolvedValueOnce("org_code");
    const claim = await session.getOrganization();
    expect(kindeClient.getOrganization).toHaveBeenCalledWith(expect.anything());
    expect(claim).toStrictEqual("org_code");
  });

  it("returns null for getOrganization when not authed", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getOrganization = vi
      .fn()
      .mockRejectedValueOnce(Error("Not authenticated"));
    const claim = await session.getOrganization();
    expect(claim).toBe(null);
  });

  it("can get the users organizations", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getUserOrganizations = vi
      .fn()
      .mockResolvedValueOnce("org_code");
    const claim = await session.getUserOrganizations();
    expect(kindeClient.getUserOrganizations).toHaveBeenCalledWith(
      expect.anything(),
    );
    expect(claim).toStrictEqual("org_code");
  });

  it("returns an empty array for getUserOrganizations when not authed", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.getUserOrganizations = vi
      .fn()
      .mockRejectedValueOnce(Error("Not authenticated"));
    const claim = await session.getUserOrganizations();
    expect(claim).toStrictEqual({ orgCodes: [] });
  });

  it("can refreshTokens", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.refreshTokens = vi.fn().mockResolvedValueOnce({});
    const headers = await session.refreshTokens();
    expect(kindeClient.refreshTokens).toHaveBeenCalledWith(expect.anything());
    expect(headers).toStrictEqual(new Headers());
  });

  it("returns new Headers() for refreshTokens when not authed", async () => {
    const requestEvent = new Request("http://localhost/oop");
    const session = await getKindeSession(requestEvent);
    kindeClient.refreshTokens = vi
      .fn()
      .mockRejectedValueOnce(Error("Not authenticated"));
    const claim = await session.refreshTokens();
    expect(claim).toStrictEqual(new Headers());
  });
});
