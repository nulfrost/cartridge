/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { CID } from 'multiformats/cid'
import { validate as _validate } from '../../../lexicons'
import { $Typed, is$typed as _is$typed, OmitKey } from '../../../util'

const is$typed = _is$typed,
  validate = _validate
const id = 'community.cartridge.defs'
/** State representing a video game that is in progress by a user */
export const PLAYING = `${id}#playing`
/** State representing a video game that was completed by a user */
export const COMPLETED = `${id}#completed`
/** State representing a video game that is planned to be played by a user */
export const PLANNED = `${id}#planned`
/** State representing a video game that has been dropped by a user */
export const DROPPED = `${id}#dropped`
/** State representing a video game that was started by a user but put on hold */
export const ONHOLD = `${id}#onHold`
/** Games that are available on the PC platform */
export const PC = `${id}#pc`
/** Games that are available on the playstation platform */
export const PLAYSTATION = `${id}#playstation`
/** Games that are available on the xbox platform */
export const XBOX = `${id}#xbox`
/** Games that are available on the nintendo platform */
export const NINTENDO = `${id}#nintendo`
