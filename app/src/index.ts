/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { XrpcClient, FetchHandler, FetchHandlerOptions } from '@atproto/xrpc'
import { schemas } from './lexicons.js'
import { CID } from 'multiformats/cid'
import { OmitKey, Un$Typed } from './util.js'
import * as CommunityCartridgeDefs from './types/community/cartridge/defs.js'
import * as CommunityCartridgeLog from './types/community/cartridge/log.js'
import * as CommunityCartridgeReview from './types/community/cartridge/review.js'

export * as CommunityCartridgeDefs from './types/community/cartridge/defs.js'
export * as CommunityCartridgeLog from './types/community/cartridge/log.js'
export * as CommunityCartridgeReview from './types/community/cartridge/review.js'

export const COMMUNITY_CARTRIDGE = {
  DefsPlaying: 'community.cartridge.defs#playing',
  DefsCompleted: 'community.cartridge.defs#completed',
  DefsPlanned: 'community.cartridge.defs#planned',
  DefsDropped: 'community.cartridge.defs#dropped',
  DefsOnHold: 'community.cartridge.defs#onHold',
  DefsPc: 'community.cartridge.defs#pc',
  DefsPlaystation: 'community.cartridge.defs#playstation',
  DefsXbox: 'community.cartridge.defs#xbox',
  DefsNintendo: 'community.cartridge.defs#nintendo',
}

export class AtpBaseClient extends XrpcClient {
  community: CommunityNS

  constructor(options: FetchHandler | FetchHandlerOptions) {
    super(options, schemas)
    this.community = new CommunityNS(this)
  }

  /** @deprecated use `this` instead */
  get xrpc(): XrpcClient {
    return this
  }
}

export class CommunityNS {
  _client: XrpcClient
  cartridge: CommunityCartridgeNS

  constructor(client: XrpcClient) {
    this._client = client
    this.cartridge = new CommunityCartridgeNS(client)
  }
}

export class CommunityCartridgeNS {
  _client: XrpcClient
  log: LogRecord
  review: ReviewRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.log = new LogRecord(client)
    this.review = new ReviewRecord(client)
  }
}

export class LogRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: CommunityCartridgeLog.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'community.cartridge.log',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: CommunityCartridgeLog.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'community.cartridge.log',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<CommunityCartridgeLog.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'community.cartridge.log'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'community.cartridge.log', ...params },
      { headers },
    )
  }
}

export class ReviewRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: OmitKey<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: CommunityCartridgeReview.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'community.cartridge.review',
      ...params,
    })
    return res.data
  }

  async get(
    params: OmitKey<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: CommunityCartridgeReview.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'community.cartridge.review',
      ...params,
    })
    return res.data
  }

  async create(
    params: OmitKey<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: Un$Typed<CommunityCartridgeReview.Record>,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    const collection = 'community.cartridge.review'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection, ...params, record: { ...record, $type: collection } },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: OmitKey<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'community.cartridge.review', ...params },
      { headers },
    )
  }
}
