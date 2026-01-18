import liff from '@line/liff';

export type LiffProfile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};

export const initLiff = async (liffId: string) => {
  await liff.init({ liffId });
  return liff;
};

export const ensureLoggedIn = async () => {
  if (!liff.isLoggedIn()) {
    liff.login();
    return false;
  }
  return true;
};

export const getProfile = async (): Promise<LiffProfile | null> => {
  if (!liff.isLoggedIn()) return null;
  const profile = await liff.getProfile();
  return {
    userId: profile.userId,
    displayName: profile.displayName,
    pictureUrl: profile.pictureUrl,
    statusMessage: profile.statusMessage,
  };
};

