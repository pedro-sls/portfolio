import crypto from "crypto";
import { cookies } from "next/headers";

const cookieName = "portfolio_vault";
const sessionMaxAge = 60 * 60 * 8;

type VaultSessionPayload = {
  exp: number;
  nonce: string;
  v: 1;
};

function getSessionSecret() {
  return process.env.PORTFOLIO_SESSION_SECRET;
}

function encodeBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(payload: string) {
  const secret = getSessionSecret();

  if (!secret) {
    return null;
  }

  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftHash = crypto.createHash("sha256").update(left).digest();
  const rightHash = crypto.createHash("sha256").update(right).digest();

  return crypto.timingSafeEqual(leftHash, rightHash);
}

export function isVaultConfigured() {
  return Boolean(
    process.env.PORTFOLIO_ADMIN_PASSWORD && process.env.PORTFOLIO_SESSION_SECRET,
  );
}

export function verifyVaultPassword(password: string) {
  const expectedPassword = process.env.PORTFOLIO_ADMIN_PASSWORD;

  if (!expectedPassword || !password) {
    return false;
  }

  return safeEqual(password, expectedPassword);
}

export async function setVaultSessionCookie() {
  const payload: VaultSessionPayload = {
    exp: Date.now() + sessionMaxAge * 1000,
    nonce: crypto.randomUUID(),
    v: 1,
  };
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = signPayload(encodedPayload);

  if (!signature) {
    return false;
  }

  (await cookies()).set(cookieName, `${encodedPayload}.${signature}`, {
    httpOnly: true,
    maxAge: sessionMaxAge,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return true;
}

export function verifyVaultSessionToken(token?: string) {
  if (!token) {
    return false;
  }

  const [encodedPayload, signature] = token.split(".");
  const expectedSignature = encodedPayload ? signPayload(encodedPayload) : null;

  if (!encodedPayload || !signature || !expectedSignature) {
    return false;
  }

  if (!safeEqual(signature, expectedSignature)) {
    return false;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as VaultSessionPayload;

    return payload.v === 1 && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isVaultSessionValid() {
  const token = (await cookies()).get(cookieName)?.value;

  return verifyVaultSessionToken(token);
}

export async function clearVaultSessionCookie() {
  (await cookies()).delete(cookieName);
}

