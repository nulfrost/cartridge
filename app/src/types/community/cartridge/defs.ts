/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { isObj, hasProp } from '../../../util'
import { lexicons } from '../../../lexicons'
import { CID } from 'multiformats/cid'

/** State representing a video game that is in progress by a user */
export const PLAYING = 'community.cartridge.defs#playing'
/** State representing a video game that was completed by a user */
export const COMPLETED = 'community.cartridge.defs#completed'
/** State representing a video game that is planned to be played by a user */
export const PLANNED = 'community.cartridge.defs#planned'
/** State representing a video game that has been dropped by a user */
export const DROPPED = 'community.cartridge.defs#dropped'
/** State representing a video game that was started by a user but put on hold */
export const ONHOLD = 'community.cartridge.defs#onHold'
/** Games that are available on the PC platform */
export const PC = 'community.cartridge.defs#pc'
/** Games that are available on the playstation platform */
export const PLAYSTATION = 'community.cartridge.defs#playstation'
/** Games that are available on the xbox platform */
export const XBOX = 'community.cartridge.defs#xbox'
/** Games that are available on the nintendo platform */
export const NINTENDO = 'community.cartridge.defs#nintendo'
