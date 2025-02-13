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

export function isRecord(v: unknown): v is Record {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    (v.$type === 'community.cartridge.log#main' ||
      v.$type === 'community.cartridge.log')
  )
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate('community.cartridge.log#main', v)
}
