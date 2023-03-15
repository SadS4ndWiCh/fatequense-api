declare global {
  declare module '@types/jsonwebtoken' {
    interface JwtPayload {
      session: string;
    }
  }
}