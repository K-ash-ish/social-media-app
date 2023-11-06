import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
const refreshSecret = new TextEncoder().encode(
  process.env.REFRESH_TOKEN_SECRET
);
export const sign = async (payload) => {
  const alg = "HS256";

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime("15m")
    .sign(secret);

  return jwt;
};

export const refreshSign = async (payload) => {
  const alg = "HS256";
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime("7d")
    .sign(refreshSecret);
  return jwt;
};

export const verify = async (token) => {
  try {
    const data = await jose.jwtVerify(token, secret, {
      issuer: "urn:example:issuer",
      audience: "urn:example:audience",
    });
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};
export const refreshVerify = async (token) => {
  try {
    const data = await jose.jwtVerify(token, refreshSecret, {
      issuer: "urn:example:issuer",
      audience: "urn:example:audience",
    });
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};
