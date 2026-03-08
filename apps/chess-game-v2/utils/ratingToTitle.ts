export type PlayerGender = "male" | "female";

export function getChessTitle(
  rating: number,
  gender: PlayerGender = "male"
): string | null {
  if (!rating || rating < 0) return null;

  // Kadın (W-titles)
  if (gender === "female") {
    if (rating >= 2300) return "WGM"; // Woman Grandmaster
    if (rating >= 2200) return "WIM"; // Woman International Master
    if (rating >= 2100) return "WFM"; // Woman FIDE Master
    if (rating >= 2000) return "WCM"; // Woman Candidate Master
    return null;
  }

  // Erkek (GM/IM/FM/CM)
  if (rating >= 2500) return "GM";  // Grandmaster
  if (rating >= 2400) return "IM";  // International Master
  if (rating >= 2300) return "FM";  // FIDE Master
  if (rating >= 2200) return "CM";  // Candidate Master

  return null;
}
