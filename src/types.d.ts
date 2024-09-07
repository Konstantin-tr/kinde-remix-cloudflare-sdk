export interface KindeUser {
  family_name: string | null;
  given_name: string | null;
  picture: string | null;
  email: string;
  id: string;
}

export interface KindeAccessToken {
  aud: string[];
  azp: string;
  billing: {
    has_payment_details: boolean;
    org_entitlements: string[] | null;
    plan: {
      code: string | null;
      created_on: number | null;
      has_trial_period: boolean | null;
      invoice_due_on: number | null;
      name: string | null;
      plan_charge_type: number | null;
      trial_expires_on: number | null;
    };
  };
  exp: number;
  feature_flags: Record<
    string,
    {
      t: "i" | "b" | "s";
      v: string | boolean | number;
    }
  >;
  iat: number;
  iss: string;
  jti: string;
  org_code: string;
  permissions: string[];
  scp: string[];
  sub: string;
}

export interface KindeIdToken {
  at_hash: string;
  aud: string[];
  auth_time: number;
  azp: string;
  email: string;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  org_codes: string[];
  picture: string;
  sub: string;
  updated_at: number;
}

export interface KindePermission {
  isGranted: boolean;
  orgCode: string | null;
}

export interface KindeConfig {
  clientId: string;
  clientSecret: string;
  issuerUrl: string;
  kindeSiteUrl: string;
  kindePostLoginRedirectUrl: string;
  kindePostLogoutRedirectUrl: string;
  audience?: string;
  isDebugMode: boolean;
  cookieMaxAge?: number;
}
