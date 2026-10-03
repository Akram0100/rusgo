// Every number that decides how much XP is earned, or how many hearts a lesson attempt gets, lives here,
// so the game economy can be tuned in one place.

/** Hearts per lesson attempt. The attempt ends when they are all gone. */
export const MAX_HEARTS = 5;

/** XP for finishing a lesson for the first time, and for repeating it afterwards. */
export const LESSON_FIRST_XP = 50;
export const LESSON_REPLAY_XP = 10;

/** XP for finishing a role-play scenario for the first time, and for repeating it afterwards. */
export const ROLEPLAY_FIRST_XP = 30;
export const ROLEPLAY_REPEAT_XP = 5;

/** Speed Match: XP per correct pair, the extra XP a streak of correct pairs can add, and the cap for one round. */
export const SPEED_MATCH_PAIR_XP = 3;
export const SPEED_MATCH_MAX_COMBO_BONUS = 3;
export const SPEED_MATCH_ROUND_MAX_XP = 40;

/** XP of one Speed Match pair. `combo` is the number of correct pairs in a row, this one included (1 = no bonus yet). */
export const getSpeedMatchPairXp = (combo: number): number =>
  SPEED_MATCH_PAIR_XP + Math.min(Math.max(combo - 1, 0), SPEED_MATCH_MAX_COMBO_BONUS);

/** Adds a pair's XP to the round total without going over the cap. */
export const addSpeedMatchXp = (total: number, pairXp: number): number =>
  Math.min(SPEED_MATCH_ROUND_MAX_XP, total + pairXp);
