/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_tokens.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'profile.access_tokens.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/account/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
    }
  }
  'categories.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/categories'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'categories.store': {
    methods: ["POST"]
    pattern: '/api/v1/categories'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'categories.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/categories/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'products.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/products'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'products.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/products/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'products.store': {
    methods: ["POST"]
    pattern: '/api/v1/products'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'products.update': {
    methods: ["PUT"]
    pattern: '/api/v1/products/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'products.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/products/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'reports.store': {
    methods: ["POST"]
    pattern: '/api/v1/reports'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'reports.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/reports'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'reports.update': {
    methods: ["PUT"]
    pattern: '/api/v1/reports/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'reports.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/reports/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
}
