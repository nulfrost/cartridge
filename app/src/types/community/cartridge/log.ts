/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../lexicons'
import { $Typed, is$typed as _is$typed, OmitKey } from '../../../util'

const is$typed = _is$typed,
  validate = _validate
const id = 'community.cartridge.log'

export interface Record {
  $type: 'community.cartridge.log'
  /** ID for the game being reviewed (IGDB) */
  gameId: string
  /** The current playing status for a video game */
  status:
    | 'community.cartridge.defs#playing'
    | 'community.cartridge.defs#completed'
    | 'community.cartridge.defs#planned'
    | 'community.cartridge.defs#dropped'
    | 'community.cartridge.defs#onHold'
    | (string & {})
  /** When the user started playing a game */
  startedAt?: string
  /** When the user finished/dropped a game */
  finishedAt?: string
  /** The platform that the video game was played on */
  platform?:
    | 'community.cartridge.defs#playstation'
    | 'community.cartridge.defs#pc'
    | 'community.cartridge.defs#xbox'
    | 'community.cartridge.defs#nintendo'
    | (string & {})
  [k: string]: unknown
}

const hashRecord = 'main'

export function isRecord<V>(v: V) {
  return is$typed(v, id, hashRecord)
}

export function validateRecord<V>(v: V) {
  return validate<Record & V>(v, id, hashRecord, true)
}
