import { useMemo } from "react";

export type UserVerifiedProps = {
  verified: boolean;
};    

export const UserVerified = ({ verified }: UserVerifiedProps) => {
  const color = useMemo(() => verified ? 'green' : 'red', [verified]);

  return (
    <span className={`lmui-badge lmui-badge_secondary lmui-badge_s lmui-badge_${color}`}>{verified ? 'Vérifié' : 'Non vérifié'}</span>
  );
}