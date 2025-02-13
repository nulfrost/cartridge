/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { XrpcClient, FetchHandler, FetchHandlerOptions } from '@atproto/xrpc'
import { schemas } from './lexicons'
import { CID } from 'multiformats/cid'
import * as CommunityCartridgeDefs from './types/community/cartridge/defs'
import * as CommunityCartridgeLog from './types/community/cartridge/log'
import * as CommunityCartridgeReview from './types/community/cartridge/review'

export * as CommunityCartridgeDefs from './types/community/cartridge/defs'
export * as CommunityCartridgeLog from './types/community/cartridge/log'
export * as CommunityCartridgeReview from './types/community/cartridge/review'

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
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
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
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
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
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: CommunityCartridgeLog.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'community.cartridge.log'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'community.cartridge.log', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
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
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
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
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
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
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: CommunityCartridgeReview.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'community.cartridge.review'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'community.cartridge.review', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
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
