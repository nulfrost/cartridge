/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { isObj, hasProp } from '../../../util'
import { lexicons } from '../../../lexicons'
import { CID } from 'multiformats/cid'

export interface Record {
  /** ID for the game being reviewed (IGDB) */
  gameId: string
  /** The rating for the video game on a scale from 1 to 5 */
  rating: number
  /** Written review of the video game */
  text?: string
  /** Whether the review contains spoilers or not */
  containsSpoilers: boolean
  [k: string]: unknown
}

export function isRecord(v: unknown): v is Record {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    (v.$type === 'community.cartridge.review#main' ||
      v.$type === 'community.cartridge.review')
  )
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate('community.cartridge.review#main', v)
}
