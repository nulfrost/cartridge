/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../lexicons'
import { $Typed, is$typed as _is$typed, OmitKey } from '../../../util'

const is$typed = _is$typed,
  validate = _validate
const id = 'community.cartridge.review'

export interface Record {
  $type: 'community.cartridge.review'
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

const hashRecord = 'main'

export function isRecord<V>(v: V) {
  return is$typed(v, id, hashRecord)
}

export function validateRecord<V>(v: V) {
  return validate<Record & V>(v, id, hashRecord, true)
}
