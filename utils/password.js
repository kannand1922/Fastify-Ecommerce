import bcrypt from "bcrypt";

export async function hashPassowrd(pass) {
  const salt = 10;
  try {
    const saltValue = await bcrypt.genSalt(salt);
    const hash = await bcrypt.hash(pass, saltValue);
    return hash;
  } catch {
    console.log(error);
    throw error;
  }
}

export async function VerifyPassword(pass, hashedPass) {
  try {
    const response = await bcrypt.verify(pass, hashedPass);
    return response;
  } catch {
    console.log(error);
    throw error;
  }
}
