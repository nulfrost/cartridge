/**
 * GENERATED CODE - DO NOT MODIFY
 */
import {
  LexiconDoc,
  Lexicons,
  ValidationError,
  ValidationResult,
} from '@atproto/lexicon'
import { $Typed, is$typed, maybe$typed } from './util.js'

export const schemaDict = {
  CommunityCartridgeDefs: {
    lexicon: 1,
    id: 'community.cartridge.defs',
    description: 'Common definitions for cartridge.community',
    defs: {
      playing: {
        type: 'token',
        description:
          'State representing a video game that is in progress by a user',
      },
      completed: {
        type: 'token',
        description:
          'State representing a video game that was completed by a user',
      },
      planned: {
        type: 'token',
        description:
          'State representing a video game that is planned to be played by a user',
      },
      dropped: {
        type: 'token',
        description:
          'State representing a video game that has been dropped by a user',
      },
      onHold: {
        type: 'token',
        description:
          'State representing a video game that was started by a user but put on hold',
      },
      pc: {
        type: 'token',
        description: 'Games that are available on the PC platform',
      },
      playstation: {
        type: 'token',
        description: 'Games that are available on the playstation platform',
      },
      xbox: {
        type: 'token',
        description: 'Games that are available on the xbox platform',
      },
      nintendo: {
        type: 'token',
        description: 'Games that are available on the nintendo platform',
      },
    },
  },
  CommunityCartridgeLog: {
    lexicon: 1,
    id: 'community.cartridge.log',
    description:
      "An object representing a single log within a person's backlog",
    defs: {
      main: {
        type: 'record',
        key: 'tid',
        record: {
          type: 'object',
          required: ['gameId', 'status'],
          properties: {
            gameId: {
              type: 'string',
              description: 'ID for the game being reviewed (IGDB)',
            },
            status: {
              type: 'string',
              description: 'The current playing status for a video game',
              knownValues: [
                'community.cartridge.defs#playing',
                'community.cartridge.defs#completed',
                'community.cartridge.defs#planned',
                'community.cartridge.defs#dropped',
                'community.cartridge.defs#onHold',
              ],
            },
            startedAt: {
              type: 'string',
              format: 'datetime',
              description: 'When the user started playing a game',
            },
            finishedAt: {
              type: 'string',
              format: 'datetime',
              description: 'When the user finished/dropped a game',
            },
            platform: {
              type: 'string',
              description: 'The platform that the video game was played on',
              knownValues: [
                'community.cartridge.defs#playstation',
                'community.cartridge.defs#pc',
                'community.cartridge.defs#xbox',
                'community.cartridge.defs#nintendo',
              ],
            },
          },
        },
      },
    },
  },
  CommunityCartridgeReview: {
    lexicon: 1,
    id: 'community.cartridge.review',
    defs: {
      main: {
        type: 'record',
        description: "A user's review/rating for a video game",
        record: {
          type: 'object',
          required: ['gameId', 'rating'],
          properties: {
            gameId: {
              type: 'string',
              description: 'ID for the game being reviewed (IGDB)',
            },
            rating: {
              type: 'integer',
              minimum: 1,
              maximum: 5,
              description:
                'The rating for the video game on a scale from 1 to 5',
            },
            text: {
              type: 'string',
              maxLength: 3000,
              maxGraphemes: 300,
              description: 'Written review of the video game',
            },
            containsSpoilers: {
              type: 'boolean',
              default: false,
              description: 'Whether the review contains spoilers or not',
            },
          },
        },
      },
    },
  },
} as const satisfies Record<string, LexiconDoc>

export const schemas = Object.values(schemaDict) satisfies LexiconDoc[]
export const lexicons: Lexicons = new Lexicons(schemas)

export function validate<T extends { $type: string }>(
  v: unknown,
  id: string,
  hash: string,
  requiredType: true,
): ValidationResult<T>
export function validate<T extends { $type?: string }>(
  v: unknown,
  id: string,
  hash: string,
  requiredType?: false,
): ValidationResult<T>
export function validate(
  v: unknown,
  id: string,
  hash: string,
  requiredType?: boolean,
): ValidationResult {
  return (requiredType ? is$typed : maybe$typed)(v, id, hash)
    ? lexicons.validate(`${id}#${hash}`, v)
    : {
        success: false,
        error: new ValidationError(
          `Must be an object with "${hash === 'main' ? id : `${id}#${hash}`}" $type property`,
        ),
      }
}

export const ids = {
  CommunityCartridgeDefs: 'community.cartridge.defs',
  CommunityCartridgeLog: 'community.cartridge.log',
  CommunityCartridgeReview: 'community.cartridge.review',
} as const
