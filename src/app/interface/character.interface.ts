export interface Character {
  "name": string,
  "vision": string,
  "weapon": string,
  "nation": string,
  "affiliation": string,
  "rarity": number,
  "constellation": string,
  "birthday": string,
  "description": string,
  "skillTalents": [
    {
      "name": string,
      "unlock": string,
      "description": string,
      "type": string
    },
    {
      "name": string,
      "unlock": string,
      "description": string,
      "type": string
    },
    {
      "name": string,
      "unlock": string,
      "description": string,
      "type": string
    }
  ],
  "passiveTalents": [
    {
      "name": string,
      "unlock": string,
      "description": string,
      "level": number
    },
    {
      "name": string,
      "unlock": string,
      "description": string,
      "level": number
    },
    {
      "name": string,
      "unlock": string,
      "description": string
    }
  ],
  "constellations": [
    {
      "name": string,
      "unlock": string,
      "description": string,
      "level": number
    },
    {
      "name": string,
      "unlock": string,
      "description": string,
      "level": number
    },
    {
      "name": string,
      "unlock": string,
      "description": string,
      "level": number
    },
    {
      "name": string,
      "unlock": string,
      "description": string,
      "level": number
    },
    {
      "name": string,
      "unlock": string,
      "description": string,
      "level": number
    },
    {
      "name": string,
      "unlock": string,
      "description": string,
      "level": number
    }
  ],
  "vision_key": string,
  "weapon_type": string
}
