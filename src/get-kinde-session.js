import { getOrCreateClient } from "./client";
import { createSessionManager } from "./session/session";
import { generateCookieHeader } from "./utils/cookies";

/**
 *
 * @param {Request} request
 * @param {import("./types").KindeConfig} config
 */
export const getKindeSession = async (request, config) => {
  const { sessionManager, cookies } = await createSessionManager(request);

  const kindeClient = getOrCreateClient(config);

  /**
   *
   * @param {string} claim
   * @param {import("@kinde-oss/kinde-typescript-sdk").ClaimTokenType} type
   * @returns
   */
  const getClaimValue = async (claim, type) => {
    try {
      return await kindeClient.getClaimValue(sessionManager, claim, type);
    } catch (error) {
      if (config.isDebugMode) console.debug(error);
      return null;
    }
  };

  /**
   *
   * @param {string} claim
   * @param {import("@kinde-oss/kinde-typescript-sdk").ClaimTokenType} type
   * @returns {Promise<{name: string, value: unknown} | null>}
   */
  const getClaim = async (claim, type) => {
    try {
      return await kindeClient.getClaim(sessionManager, claim, type);
    } catch (error) {
      if (config.isDebugMode) console.debug(error);
      return null;
    }
  };

  /**
   *
   * @returns {Promise<string | null>}
   */
  const getToken = async () => {
    try {
      return await kindeClient.getToken(sessionManager);
    } catch (error) {
      if (config.isDebugMode) console.debug(error);
      return null;
    }
  };

  /**
   *
   * @returns {Promise<boolean>}
   */
  const isAuthenticated = async () => {
    try {
      return await kindeClient.isAuthenticated(sessionManager);
    } catch (error) {
      if (config.isDebugMode) console.debug(error);
      return false;
    }
  };

  /**
   *
   * @returns {Promise<import("@kinde-oss/kinde-typescript-sdk").UserType | null>}
   */
  const getUser = async () => {
    try {
      return await kindeClient.getUser(sessionManager);
    } catch (error) {
      if (
        error.message !==
        "Cannot get user details, no authentication credential found"
      )
        if (config.isDebugMode) console.debug(error);
      return null;
    }
  };

  /**
   *
   * @returns {Promise<import("@kinde-oss/kinde-typescript-sdk").UserType | null>}
   */
  const getUserProfile = async () => {
    try {
      return await kindeClient.getUserProfile(sessionManager);
    } catch (error) {
      if (config.isDebugMode) console.debug(error);
      return null;
    }
  };

  /**
   *
   * @param {string} code
   * @param {boolean | string | number} defaultValue
   * @param {*} type
   * @returns {Promise<import("@kinde-oss/kinde-typescript-sdk").GetFlagType | null>}
   */
  const getFlag = async (code, defaultValue, type) => {
    try {
      return await kindeClient.getFlag(
        sessionManager,
        code.toLowerCase(),
        defaultValue,
        type
      );
    } catch (err) {
      if (config.isDebugMode) console.debug(err);
      return null;
    }
  };

  /**
   *
   * @param {string} code
   * @param {boolean} defaultValue
   * @returns {Promise<boolean | null>}
   */
  const getBooleanFlag = async (code, defaultValue) => {
    try {
      return await kindeClient.getBooleanFlag(
        sessionManager,
        code.toLowerCase(),
        defaultValue
      );
    } catch (err) {
      if (config.isDebugMode) console.debug(err);
      return null;
    }
  };

  /**
   *
   * @param {string} code
   * @param {number} defaultValue
   * @returns {Promise<number | null>}
   */
  const getIntegerFlag = async (code, defaultValue) => {
    try {
      return await kindeClient.getIntegerFlag(
        sessionManager,
        code.toLowerCase(),
        defaultValue
      );
    } catch (err) {
      if (config.isDebugMode) console.debug(err);
      return null;
    }
  };
  /**
   *
   * @param {string} code
   * @param {string} defaultValue
   * @returns {Promise<string | null>}
   */
  const getStringFlag = async (code, defaultValue) => {
    try {
      return await kindeClient.getStringFlag(
        sessionManager,
        code.toLowerCase(),
        defaultValue
      );
    } catch (err) {
      if (config.isDebugMode) console.debug(err);
      return null;
    }
  };

  /**
   *
   * @param {string} permission
   * @returns {Promise<{orgCode: string | null; isGranted: boolean}| null>}
   */
  const getPermission = async (permission) => {
    try {
      return await kindeClient.getPermission(sessionManager, permission);
    } catch (err) {
      if (config.isDebugMode) console.debug(err);
      return null;
    }
  };

  /**
   *
   * @returns {Promise<{permissions: string[]; orgCode: string | null} | []>}
   */
  const getPermissions = async () => {
    try {
      return await kindeClient.getPermissions(sessionManager);
    } catch (err) {
      if (config.isDebugMode) console.debug(err);
      return [];
    }
  };

  /**
   *
   * @returns {Promise<{orgCode: string | null} | null>}
   */
  const getOrganization = async () => {
    try {
      return await kindeClient.getOrganization(sessionManager);
    } catch (err) {
      if (config.isDebugMode) console.debug(err);
      return null;
    }
  };

  /**
   *
   * @returns {Promise<{orgCodes: string[]} | []>}
   */
  const getUserOrganizations = async () => {
    try {
      return await kindeClient.getUserOrganizations(sessionManager);
    } catch (err) {
      if (config.isDebugMode) console.debug(err);
      return { orgCodes: [] };
    }
  };

  const refreshTokens = async () => {
    try {
      await kindeClient.refreshTokens(sessionManager);
      const headers = generateCookieHeader(request, cookies);
      return headers;
    } catch (error) {
      if (config.isDebugMode) {
        console.debug(error);
      }
      return new Headers();
    }
  };

  const headers = await refreshTokens();

  return {
    headers,
    getClaim,
    getClaimValue,
    getOrganization,
    getPermission,
    getPermissions,
    getFlag,
    getStringFlag,
    getBooleanFlag,
    getIntegerFlag,
    getToken,
    getUser,
    getUserProfile,
    getUserOrganizations,
    isAuthenticated,
    refreshTokens,
  };
};
