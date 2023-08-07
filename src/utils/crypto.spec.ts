import { describe, expect, it } from 'vitest';

import { decrypt, encrypt } from './crypto';

describe('crypt functions', () => {
  const secretKey = 'UruQb/EpgzUVyDwc+0wifqfbFpA4taBLpsJNJ26BHDE=';
  const wrongKey = 'UruQb/EpgzUVyDwc+0wifqfbFpA4taBLpsJNJ26BHDX=';

  it('should be able to encrypt a data with key', () => {
    const data = 'some-data';

    expect(() => encrypt(data, secretKey)).not.toThrow();
  });

  it('should be ablt to decrypt a data with same key', () => {
    const data = 'some-data';

    const encryptedData = encrypt(data, secretKey);

    const decryptedData = decrypt(encryptedData, secretKey);
    expect(decryptedData).toBe(data);
  });

  it('should not be able to decrypt a data with wrong key', () => {
    const data = 'some-data';

    const encryptedData = encrypt(data, secretKey);

    expect(() => decrypt(encryptedData, wrongKey)).toThrow();
  });
});
