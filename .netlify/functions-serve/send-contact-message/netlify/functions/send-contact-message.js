var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@netlify/runtime-utils/dist/main.js
var main_exports = {};
__export(main_exports, {
  base64Decode: () => base64Decode,
  base64Encode: () => base64Encode
});
var getString, base64Decode, base64Encode;
var init_main = __esm({
  "node_modules/@netlify/runtime-utils/dist/main.js"() {
    getString = (input) => typeof input === "string" ? input : JSON.stringify(input);
    base64Decode = globalThis.Buffer ? (input) => Buffer.from(input, "base64").toString() : (input) => atob(input);
    base64Encode = globalThis.Buffer ? (input) => Buffer.from(getString(input)).toString("base64") : (input) => btoa(getString(input));
  }
});

// node_modules/@netlify/blobs/dist/main.cjs
var require_main = __commonJS({
  "node_modules/@netlify/blobs/dist/main.cjs"(exports2, module2) {
    "use strict";
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var main_exports2 = {};
    __export2(main_exports2, {
      connectLambda: () => connectLambda,
      getDeployStore: () => getDeployStore,
      getStore: () => getStore2,
      listStores: () => listStores,
      setEnvironmentContext: () => setEnvironmentContext
    });
    module2.exports = __toCommonJS2(main_exports2);
    var import_runtime_utils = (init_main(), __toCommonJS(main_exports));
    var getEnvironment = () => {
      const { Deno, Netlify, process: process2 } = globalThis;
      return Netlify?.env ?? Deno?.env ?? {
        delete: (key) => delete process2?.env[key],
        get: (key) => process2?.env[key],
        has: (key) => Boolean(process2?.env[key]),
        set: (key, value) => {
          if (process2?.env) {
            process2.env[key] = value;
          }
        },
        toObject: () => process2?.env ?? {}
      };
    };
    var getEnvironmentContext = () => {
      const context = globalThis.netlifyBlobsContext || getEnvironment().get("NETLIFY_BLOBS_CONTEXT");
      if (typeof context !== "string" || !context) {
        return {};
      }
      const data = (0, import_runtime_utils.base64Decode)(context);
      try {
        return JSON.parse(data);
      } catch {
      }
      return {};
    };
    var setEnvironmentContext = (context) => {
      const encodedContext = (0, import_runtime_utils.base64Encode)(JSON.stringify(context));
      getEnvironment().set("NETLIFY_BLOBS_CONTEXT", encodedContext);
    };
    var MissingBlobsEnvironmentError = class extends Error {
      constructor(requiredProperties) {
        super(
          `The environment has not been configured to use Netlify Blobs. To use it manually, supply the following properties when creating a store: ${requiredProperties.join(
            ", "
          )}`
        );
        this.name = "MissingBlobsEnvironmentError";
      }
    };
    var import_runtime_utils2 = (init_main(), __toCommonJS(main_exports));
    var connectLambda = (event) => {
      const rawData = (0, import_runtime_utils2.base64Decode)(event.blobs);
      const data = JSON.parse(rawData);
      const environmentContext = {
        deployID: event.headers["x-nf-deploy-id"],
        edgeURL: data.url,
        siteID: event.headers["x-nf-site-id"],
        token: data.token
      };
      setEnvironmentContext(environmentContext);
    };
    var BlobsConsistencyError = class extends Error {
      constructor() {
        super(
          `Netlify Blobs has failed to perform a read using strong consistency because the environment has not been configured with a 'uncachedEdgeURL' property`
        );
        this.name = "BlobsConsistencyError";
      }
    };
    var import_runtime_utils3 = (init_main(), __toCommonJS(main_exports));
    var BASE64_PREFIX = "b64;";
    var METADATA_HEADER_INTERNAL = "x-amz-meta-user";
    var METADATA_HEADER_EXTERNAL = "netlify-blobs-metadata";
    var METADATA_MAX_SIZE = 2 * 1024;
    var encodeMetadata = (metadata) => {
      if (!metadata) {
        return null;
      }
      const encodedObject = (0, import_runtime_utils3.base64Encode)(JSON.stringify(metadata));
      const payload = `b64;${encodedObject}`;
      if (METADATA_HEADER_EXTERNAL.length + payload.length > METADATA_MAX_SIZE) {
        throw new Error("Metadata object exceeds the maximum size");
      }
      return payload;
    };
    var decodeMetadata = (header) => {
      if (!header?.startsWith(BASE64_PREFIX)) {
        return {};
      }
      const encodedData = header.slice(BASE64_PREFIX.length);
      const decodedData = (0, import_runtime_utils3.base64Decode)(encodedData);
      const metadata = JSON.parse(decodedData);
      return metadata;
    };
    var getMetadataFromResponse = (response) => {
      if (!response.headers) {
        return {};
      }
      const value = response.headers.get(METADATA_HEADER_EXTERNAL) || response.headers.get(METADATA_HEADER_INTERNAL);
      try {
        return decodeMetadata(value);
      } catch {
        throw new Error(
          "An internal error occurred while trying to retrieve the metadata for an entry. Please try updating to the latest version of the Netlify Blobs client."
        );
      }
    };
    var REGION_AUTO = "auto";
    var regions = {
      "us-east-1": true,
      "us-east-2": true,
      "eu-central-1": true,
      "ap-southeast-1": true,
      "ap-southeast-2": true
    };
    var isValidRegion = (input) => Object.keys(regions).includes(input);
    var InvalidBlobsRegionError = class extends Error {
      constructor(region) {
        super(
          `${region} is not a supported Netlify Blobs region. Supported values are: ${Object.keys(regions).join(", ")}.`
        );
        this.name = "InvalidBlobsRegionError";
      }
    };
    var DEFAULT_RETRY_DELAY = getEnvironment().get("NODE_ENV") === "test" ? 1 : 5e3;
    var MIN_RETRY_DELAY = 1e3;
    var MAX_RETRY = 5;
    var RATE_LIMIT_HEADER = "X-RateLimit-Reset";
    var fetchAndRetry = async (fetch2, url, options, attemptsLeft = MAX_RETRY) => {
      try {
        const res = await fetch2(url, options);
        if (attemptsLeft > 0 && (res.status === 429 || res.status >= 500)) {
          const delay = getDelay(res.headers.get(RATE_LIMIT_HEADER));
          await sleep(delay);
          return fetchAndRetry(fetch2, url, options, attemptsLeft - 1);
        }
        return res;
      } catch (error) {
        if (attemptsLeft === 0) {
          throw error;
        }
        const delay = getDelay();
        await sleep(delay);
        return fetchAndRetry(fetch2, url, options, attemptsLeft - 1);
      }
    };
    var getDelay = (rateLimitReset) => {
      if (!rateLimitReset) {
        return DEFAULT_RETRY_DELAY;
      }
      return Math.max(Number(rateLimitReset) * 1e3 - Date.now(), MIN_RETRY_DELAY);
    };
    var sleep = (ms) => new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
    var import_node_process = __toESM2(require("process"), 1);
    var NF_ERROR = "x-nf-error";
    var NF_REQUEST_ID = "x-nf-request-id";
    var BlobsInternalError = class extends Error {
      constructor(res) {
        let details = res.headers.get(NF_ERROR) || `${res.status} status code`;
        if (res.headers.has(NF_REQUEST_ID)) {
          details += `, ID: ${res.headers.get(NF_REQUEST_ID)}`;
        }
        super(`Netlify Blobs has generated an internal error (${details})`);
        this.name = "BlobsInternalError";
      }
    };
    var collectIterator = async (iterator) => {
      const result = [];
      for await (const item of iterator) {
        result.push(item);
      }
      return result;
    };
    var SIGNED_URL_ACCEPT_HEADER = "application/json;type=signed-url";
    var Client = class {
      constructor({ apiURL, consistency, edgeURL, fetch: fetch2, region, siteID, token, uncachedEdgeURL }) {
        this.apiURL = apiURL;
        this.consistency = consistency ?? "eventual";
        this.edgeURL = edgeURL;
        this.fetch = fetch2 ?? globalThis.fetch;
        this.region = region;
        this.siteID = siteID;
        this.token = token;
        this.uncachedEdgeURL = uncachedEdgeURL;
        if (!this.fetch) {
          throw new Error(
            "Netlify Blobs could not find a `fetch` client in the global scope. You can either update your runtime to a version that includes `fetch` (like Node.js 18.0.0 or above), or you can supply your own implementation using the `fetch` property."
          );
        }
      }
      async getFinalRequest({
        consistency: opConsistency,
        key,
        metadata,
        method,
        parameters = {},
        storeName
      }) {
        const encodedMetadata = encodeMetadata(metadata);
        const consistency = opConsistency ?? this.consistency;
        let urlPath = `/${this.siteID}`;
        if (storeName) {
          urlPath += `/${storeName}`;
        }
        if (key) {
          urlPath += `/${key}`;
        }
        if (this.edgeURL) {
          if (consistency === "strong" && !this.uncachedEdgeURL) {
            throw new BlobsConsistencyError();
          }
          const headers = {
            authorization: `Bearer ${this.token}`
          };
          if (encodedMetadata) {
            headers[METADATA_HEADER_INTERNAL] = encodedMetadata;
          }
          if (this.region) {
            urlPath = `/region:${this.region}${urlPath}`;
          }
          const url2 = new URL(urlPath, consistency === "strong" ? this.uncachedEdgeURL : this.edgeURL);
          for (const key2 in parameters) {
            url2.searchParams.set(key2, parameters[key2]);
          }
          return {
            headers,
            url: url2.toString()
          };
        }
        const apiHeaders = { authorization: `Bearer ${this.token}` };
        const url = new URL(`/api/v1/blobs${urlPath}`, this.apiURL ?? "https://api.netlify.com");
        for (const key2 in parameters) {
          url.searchParams.set(key2, parameters[key2]);
        }
        if (this.region) {
          url.searchParams.set("region", this.region);
        }
        if (storeName === void 0 || key === void 0) {
          return {
            headers: apiHeaders,
            url: url.toString()
          };
        }
        if (encodedMetadata) {
          apiHeaders[METADATA_HEADER_EXTERNAL] = encodedMetadata;
        }
        if (method === "head" || method === "delete") {
          return {
            headers: apiHeaders,
            url: url.toString()
          };
        }
        const res = await this.fetch(url.toString(), {
          headers: { ...apiHeaders, accept: SIGNED_URL_ACCEPT_HEADER },
          method
        });
        if (res.status !== 200) {
          throw new BlobsInternalError(res);
        }
        const { url: signedURL } = await res.json();
        const userHeaders = encodedMetadata ? { [METADATA_HEADER_INTERNAL]: encodedMetadata } : void 0;
        return {
          headers: userHeaders,
          url: signedURL
        };
      }
      async makeRequest({
        body,
        conditions = {},
        consistency,
        headers: extraHeaders,
        key,
        metadata,
        method,
        parameters,
        storeName
      }) {
        const { headers: baseHeaders = {}, url } = await this.getFinalRequest({
          consistency,
          key,
          metadata,
          method,
          parameters,
          storeName
        });
        const headers = {
          ...baseHeaders,
          ...extraHeaders
        };
        if (method === "put") {
          headers["cache-control"] = "max-age=0, stale-while-revalidate=60";
        }
        if ("onlyIfMatch" in conditions && conditions.onlyIfMatch) {
          headers["if-match"] = conditions.onlyIfMatch;
        } else if ("onlyIfNew" in conditions && conditions.onlyIfNew) {
          headers["if-none-match"] = "*";
        }
        const options = {
          body,
          headers,
          method
        };
        if (body instanceof ReadableStream) {
          options.duplex = "half";
        }
        return fetchAndRetry(this.fetch, url, options);
      }
    };
    var getClientOptions = (options, contextOverride) => {
      const context = contextOverride ?? getEnvironmentContext();
      const siteID = context.siteID ?? options.siteID;
      const token = context.token ?? options.token;
      if (!siteID || !token) {
        throw new MissingBlobsEnvironmentError(["siteID", "token"]);
      }
      if (options.region !== void 0 && !isValidRegion(options.region)) {
        throw new InvalidBlobsRegionError(options.region);
      }
      const clientOptions = {
        apiURL: context.apiURL ?? options.apiURL,
        consistency: options.consistency,
        edgeURL: context.edgeURL ?? options.edgeURL,
        fetch: options.fetch,
        region: options.region,
        siteID,
        token,
        uncachedEdgeURL: context.uncachedEdgeURL ?? options.uncachedEdgeURL
      };
      return clientOptions;
    };
    var DEPLOY_STORE_PREFIX = "deploy:";
    var LEGACY_STORE_INTERNAL_PREFIX = "netlify-internal/legacy-namespace/";
    var SITE_STORE_PREFIX = "site:";
    var STATUS_OK = 200;
    var STATUS_PRE_CONDITION_FAILED = 412;
    var Store = class _Store {
      constructor(options) {
        this.client = options.client;
        if ("deployID" in options) {
          _Store.validateDeployID(options.deployID);
          let name = DEPLOY_STORE_PREFIX + options.deployID;
          if (options.name) {
            name += `:${options.name}`;
          }
          this.name = name;
        } else if (options.name.startsWith(LEGACY_STORE_INTERNAL_PREFIX)) {
          const storeName = options.name.slice(LEGACY_STORE_INTERNAL_PREFIX.length);
          _Store.validateStoreName(storeName);
          this.name = storeName;
        } else {
          _Store.validateStoreName(options.name);
          this.name = SITE_STORE_PREFIX + options.name;
        }
      }
      async delete(key) {
        const res = await this.client.makeRequest({ key, method: "delete", storeName: this.name });
        if (![200, 204, 404].includes(res.status)) {
          throw new BlobsInternalError(res);
        }
      }
      async get(key, options) {
        const { consistency, type } = options ?? {};
        const res = await this.client.makeRequest({ consistency, key, method: "get", storeName: this.name });
        if (res.status === 404) {
          return null;
        }
        if (res.status !== 200) {
          throw new BlobsInternalError(res);
        }
        if (type === void 0 || type === "text") {
          return res.text();
        }
        if (type === "arrayBuffer") {
          return res.arrayBuffer();
        }
        if (type === "blob") {
          return res.blob();
        }
        if (type === "json") {
          return res.json();
        }
        if (type === "stream") {
          return res.body;
        }
        throw new BlobsInternalError(res);
      }
      async getMetadata(key, { consistency } = {}) {
        const res = await this.client.makeRequest({ consistency, key, method: "head", storeName: this.name });
        if (res.status === 404) {
          return null;
        }
        if (res.status !== 200 && res.status !== 304) {
          throw new BlobsInternalError(res);
        }
        const etag = res?.headers.get("etag") ?? void 0;
        const metadata = getMetadataFromResponse(res);
        const result = {
          etag,
          metadata
        };
        return result;
      }
      async getWithMetadata(key, options) {
        const { consistency, etag: requestETag, type } = options ?? {};
        const headers = requestETag ? { "if-none-match": requestETag } : void 0;
        const res = await this.client.makeRequest({
          consistency,
          headers,
          key,
          method: "get",
          storeName: this.name
        });
        if (res.status === 404) {
          return null;
        }
        if (res.status !== 200 && res.status !== 304) {
          throw new BlobsInternalError(res);
        }
        const responseETag = res?.headers.get("etag") ?? void 0;
        const metadata = getMetadataFromResponse(res);
        const result = {
          etag: responseETag,
          metadata
        };
        if (res.status === 304 && requestETag) {
          return { data: null, ...result };
        }
        if (type === void 0 || type === "text") {
          return { data: await res.text(), ...result };
        }
        if (type === "arrayBuffer") {
          return { data: await res.arrayBuffer(), ...result };
        }
        if (type === "blob") {
          return { data: await res.blob(), ...result };
        }
        if (type === "json") {
          return { data: await res.json(), ...result };
        }
        if (type === "stream") {
          return { data: res.body, ...result };
        }
        throw new Error(`Invalid 'type' property: ${type}. Expected: arrayBuffer, blob, json, stream, or text.`);
      }
      list(options = {}) {
        const iterator = this.getListIterator(options);
        if (options.paginate) {
          return iterator;
        }
        return collectIterator(iterator).then(
          (items) => items.reduce(
            (acc, item) => ({
              blobs: [...acc.blobs, ...item.blobs],
              directories: [...acc.directories, ...item.directories]
            }),
            { blobs: [], directories: [] }
          )
        );
      }
      async set(key, data, options = {}) {
        _Store.validateKey(key);
        const conditions = _Store.getConditions(options);
        const res = await this.client.makeRequest({
          conditions,
          body: data,
          key,
          metadata: options.metadata,
          method: "put",
          storeName: this.name
        });
        const etag = res.headers.get("etag") ?? "";
        if (conditions) {
          return res.status === STATUS_PRE_CONDITION_FAILED ? { modified: false } : { etag, modified: true };
        }
        if (res.status === STATUS_OK) {
          return {
            etag,
            modified: true
          };
        }
        throw new BlobsInternalError(res);
      }
      async setJSON(key, data, options = {}) {
        _Store.validateKey(key);
        const conditions = _Store.getConditions(options);
        const payload = JSON.stringify(data);
        const headers = {
          "content-type": "application/json"
        };
        const res = await this.client.makeRequest({
          ...conditions,
          body: payload,
          headers,
          key,
          metadata: options.metadata,
          method: "put",
          storeName: this.name
        });
        const etag = res.headers.get("etag") ?? "";
        if (conditions) {
          return res.status === STATUS_PRE_CONDITION_FAILED ? { modified: false } : { etag, modified: true };
        }
        if (res.status === STATUS_OK) {
          return {
            etag,
            modified: true
          };
        }
        throw new BlobsInternalError(res);
      }
      static formatListResultBlob(result) {
        if (!result.key) {
          return null;
        }
        return {
          etag: result.etag,
          key: result.key
        };
      }
      static getConditions(options) {
        if ("onlyIfMatch" in options && "onlyIfNew" in options) {
          throw new Error(
            `The 'onlyIfMatch' and 'onlyIfNew' options are mutually exclusive. Using 'onlyIfMatch' will make the write succeed only if there is an entry for the key with the given content, while 'onlyIfNew' will make the write succeed only if there is no entry for the key.`
          );
        }
        if ("onlyIfMatch" in options && options.onlyIfMatch) {
          if (typeof options.onlyIfMatch !== "string") {
            throw new Error(`The 'onlyIfMatch' property expects a string representing an ETag.`);
          }
          return {
            onlyIfMatch: options.onlyIfMatch
          };
        }
        if ("onlyIfNew" in options && options.onlyIfNew) {
          if (typeof options.onlyIfNew !== "boolean") {
            throw new Error(
              `The 'onlyIfNew' property expects a boolean indicating whether the write should fail if an entry for the key already exists.`
            );
          }
          return {
            onlyIfNew: true
          };
        }
      }
      static validateKey(key) {
        if (key === "") {
          throw new Error("Blob key must not be empty.");
        }
        if (key.startsWith("/") || key.startsWith("%2F")) {
          throw new Error("Blob key must not start with forward slash (/).");
        }
        if (new TextEncoder().encode(key).length > 600) {
          throw new Error(
            "Blob key must be a sequence of Unicode characters whose UTF-8 encoding is at most 600 bytes long."
          );
        }
      }
      static validateDeployID(deployID) {
        if (!/^\w{1,24}$/.test(deployID)) {
          throw new Error(`'${deployID}' is not a valid Netlify deploy ID.`);
        }
      }
      static validateStoreName(name) {
        if (name.includes("/") || name.includes("%2F")) {
          throw new Error("Store name must not contain forward slashes (/).");
        }
        if (new TextEncoder().encode(name).length > 64) {
          throw new Error(
            "Store name must be a sequence of Unicode characters whose UTF-8 encoding is at most 64 bytes long."
          );
        }
      }
      getListIterator(options) {
        const { client, name: storeName } = this;
        const parameters = {};
        if (options?.prefix) {
          parameters.prefix = options.prefix;
        }
        if (options?.directories) {
          parameters.directories = "true";
        }
        return {
          [Symbol.asyncIterator]() {
            let currentCursor = null;
            let done = false;
            return {
              async next() {
                if (done) {
                  return { done: true, value: void 0 };
                }
                const nextParameters = { ...parameters };
                if (currentCursor !== null) {
                  nextParameters.cursor = currentCursor;
                }
                const res = await client.makeRequest({
                  method: "get",
                  parameters: nextParameters,
                  storeName
                });
                let blobs = [];
                let directories = [];
                if (![200, 204, 404].includes(res.status)) {
                  throw new BlobsInternalError(res);
                }
                if (res.status === 404) {
                  done = true;
                } else {
                  const page = await res.json();
                  if (page.next_cursor) {
                    currentCursor = page.next_cursor;
                  } else {
                    done = true;
                  }
                  blobs = (page.blobs ?? []).map(_Store.formatListResultBlob).filter(Boolean);
                  directories = page.directories ?? [];
                }
                return {
                  done: false,
                  value: {
                    blobs,
                    directories
                  }
                };
              }
            };
          }
        };
      }
    };
    var getDeployStore = (input = {}) => {
      const context = getEnvironmentContext();
      const options = typeof input === "string" ? { name: input } : input;
      const deployID = options.deployID ?? context.deployID;
      if (!deployID) {
        throw new MissingBlobsEnvironmentError(["deployID"]);
      }
      const clientOptions = getClientOptions(options, context);
      if (!clientOptions.region) {
        if (clientOptions.edgeURL || clientOptions.uncachedEdgeURL) {
          if (!context.primaryRegion) {
            throw new Error(
              "When accessing a deploy store, the Netlify Blobs client needs to be configured with a region, and one was not found in the environment. To manually set the region, set the `region` property in the `getDeployStore` options. If you are using the Netlify CLI, you may have an outdated version; run `npm install -g netlify-cli@latest` to update and try again."
            );
          }
          clientOptions.region = context.primaryRegion;
        } else {
          clientOptions.region = REGION_AUTO;
        }
      }
      const client = new Client(clientOptions);
      return new Store({ client, deployID, name: options.name });
    };
    var getStore2 = (input) => {
      if (typeof input === "string") {
        const clientOptions = getClientOptions({});
        const client = new Client(clientOptions);
        return new Store({ client, name: input });
      }
      if (typeof input?.name === "string" && typeof input?.siteID === "string" && typeof input?.token === "string") {
        const { name, siteID, token } = input;
        const clientOptions = getClientOptions(input, { siteID, token });
        if (!name || !siteID || !token) {
          throw new MissingBlobsEnvironmentError(["name", "siteID", "token"]);
        }
        const client = new Client(clientOptions);
        return new Store({ client, name });
      }
      if (typeof input?.name === "string") {
        const { name } = input;
        const clientOptions = getClientOptions(input);
        if (!name) {
          throw new MissingBlobsEnvironmentError(["name"]);
        }
        const client = new Client(clientOptions);
        return new Store({ client, name });
      }
      if (typeof input?.deployID === "string") {
        const clientOptions = getClientOptions(input);
        const { deployID } = input;
        if (!deployID) {
          throw new MissingBlobsEnvironmentError(["deployID"]);
        }
        const client = new Client(clientOptions);
        return new Store({ client, deployID });
      }
      throw new Error(
        "The `getStore` method requires the name of the store as a string or as the `name` property of an options object"
      );
    };
    function listStores(options = {}) {
      const context = getEnvironmentContext();
      const clientOptions = getClientOptions(options, context);
      const client = new Client(clientOptions);
      const iterator = getListIterator(client, SITE_STORE_PREFIX);
      if (options.paginate) {
        return iterator;
      }
      return collectIterator(iterator).then((results) => ({ stores: results.flatMap((page) => page.stores) }));
    }
    var formatListStoreResponse = (stores) => stores.filter((store) => !store.startsWith(DEPLOY_STORE_PREFIX)).map((store) => store.startsWith(SITE_STORE_PREFIX) ? store.slice(SITE_STORE_PREFIX.length) : store);
    var getListIterator = (client, prefix) => {
      const parameters = {
        prefix
      };
      return {
        [Symbol.asyncIterator]() {
          let currentCursor = null;
          let done = false;
          return {
            async next() {
              if (done) {
                return { done: true, value: void 0 };
              }
              const nextParameters = { ...parameters };
              if (currentCursor !== null) {
                nextParameters.cursor = currentCursor;
              }
              const res = await client.makeRequest({
                method: "get",
                parameters: nextParameters
              });
              if (res.status === 404) {
                return { done: true, value: void 0 };
              }
              const page = await res.json();
              if (page.next_cursor) {
                currentCursor = page.next_cursor;
              } else {
                done = true;
              }
              return {
                done: false,
                value: {
                  ...page,
                  stores: formatListStoreResponse(page.stores)
                }
              };
            }
          };
        }
      };
    };
  }
});

// node_modules/postal-mime/dist/decode-strings.cjs
var require_decode_strings = __commonJS({
  "node_modules/postal-mime/dist/decode-strings.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key2 of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key2) && key2 !== except)
            __defProp2(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc2(from, key2)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var decode_strings_exports = {};
    __export2(decode_strings_exports, {
      blobToArrayBuffer: () => blobToArrayBuffer,
      decodeBase64: () => decodeBase64,
      decodeParameterValueContinuations: () => decodeParameterValueContinuations,
      decodeURIComponentWithCharset: () => decodeURIComponentWithCharset,
      decodeWord: () => decodeWord,
      decodeWords: () => decodeWords2,
      getDecoder: () => getDecoder,
      getHex: () => getHex,
      textEncoder: () => textEncoder
    });
    module2.exports = __toCommonJS2(decode_strings_exports);
    var textEncoder = new TextEncoder();
    var base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var base64Lookup = new Uint8Array(256);
    for (let i = 0; i < base64Chars.length; i++) {
      base64Lookup[base64Chars.charCodeAt(i)] = i;
    }
    function decodeBase64(base64) {
      let bufferLength = Math.ceil(base64.length / 4) * 3;
      const len = base64.length;
      let p = 0;
      if (base64.length % 4 === 3) {
        bufferLength--;
      } else if (base64.length % 4 === 2) {
        bufferLength -= 2;
      } else if (base64[base64.length - 1] === "=") {
        bufferLength--;
        if (base64[base64.length - 2] === "=") {
          bufferLength--;
        }
      }
      const arrayBuffer = new ArrayBuffer(bufferLength);
      const bytes = new Uint8Array(arrayBuffer);
      for (let i = 0; i < len; i += 4) {
        let encoded1 = base64Lookup[base64.charCodeAt(i)];
        let encoded2 = base64Lookup[base64.charCodeAt(i + 1)];
        let encoded3 = base64Lookup[base64.charCodeAt(i + 2)];
        let encoded4 = base64Lookup[base64.charCodeAt(i + 3)];
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
      }
      return arrayBuffer;
    }
    function getDecoder(charset) {
      charset = charset || "utf8";
      let decoder;
      try {
        decoder = new TextDecoder(charset);
      } catch (err) {
        decoder = new TextDecoder("windows-1252");
      }
      return decoder;
    }
    async function blobToArrayBuffer(blob) {
      if ("arrayBuffer" in blob) {
        return await blob.arrayBuffer();
      }
      const fr = new FileReader();
      return new Promise((resolve, reject) => {
        fr.onload = function(e) {
          resolve(e.target.result);
        };
        fr.onerror = function(e) {
          reject(fr.error);
        };
        fr.readAsArrayBuffer(blob);
      });
    }
    function getHex(c) {
      if (c >= 48 && c <= 57 || c >= 97 && c <= 102 || c >= 65 && c <= 70) {
        return String.fromCharCode(c);
      }
      return false;
    }
    function decodeWord(charset, encoding, str) {
      let splitPos = charset.indexOf("*");
      if (splitPos >= 0) {
        charset = charset.substr(0, splitPos);
      }
      encoding = encoding.toUpperCase();
      let byteStr;
      if (encoding === "Q") {
        str = str.replace(/=\s+([0-9a-fA-F])/g, "=$1").replace(/[_\s]/g, " ");
        let buf = textEncoder.encode(str);
        let encodedBytes = [];
        for (let i = 0, len = buf.length; i < len; i++) {
          let c = buf[i];
          if (i <= len - 2 && c === 61) {
            let c1 = getHex(buf[i + 1]);
            let c2 = getHex(buf[i + 2]);
            if (c1 && c2) {
              let c3 = parseInt(c1 + c2, 16);
              encodedBytes.push(c3);
              i += 2;
              continue;
            }
          }
          encodedBytes.push(c);
        }
        byteStr = new ArrayBuffer(encodedBytes.length);
        let dataView = new DataView(byteStr);
        for (let i = 0, len = encodedBytes.length; i < len; i++) {
          dataView.setUint8(i, encodedBytes[i]);
        }
      } else if (encoding === "B") {
        byteStr = decodeBase64(str.replace(/[^a-zA-Z0-9\+\/=]+/g, ""));
      } else {
        byteStr = textEncoder.encode(str);
      }
      return getDecoder(charset).decode(byteStr);
    }
    function decodeWords2(str) {
      let joinString = true;
      let done = false;
      while (!done) {
        let result = (str || "").toString().replace(
          /(=\?([^?]+)\?[Bb]\?([^?]*)\?=)\s*(?==\?([^?]+)\?[Bb]\?[^?]*\?=)/g,
          (match, left, chLeft, encodedLeftStr, chRight) => {
            if (!joinString) {
              return match;
            }
            if (chLeft === chRight && encodedLeftStr.length % 4 === 0 && !/=$/.test(encodedLeftStr)) {
              return left + "__\0JOIN\0__";
            }
            return match;
          }
        ).replace(
          /(=\?([^?]+)\?[Qq]\?[^?]*\?=)\s*(?==\?([^?]+)\?[Qq]\?[^?]*\?=)/g,
          (match, left, chLeft, chRight) => {
            if (!joinString) {
              return match;
            }
            if (chLeft === chRight) {
              return left + "__\0JOIN\0__";
            }
            return match;
          }
        ).replace(/(\?=)?__\x00JOIN\x00__(=\?([^?]+)\?[QqBb]\?)?/g, "").replace(/(=\?[^?]+\?[QqBb]\?[^?]*\?=)\s+(?==\?[^?]+\?[QqBb]\?[^?]*\?=)/g, "$1").replace(
          /=\?([\w_\-*]+)\?([QqBb])\?([^?]*)\?=/g,
          (m, charset, encoding, text) => decodeWord(charset, encoding, text)
        );
        if (joinString && result.indexOf("\uFFFD") >= 0) {
          joinString = false;
        } else {
          return result;
        }
      }
    }
    function decodeURIComponentWithCharset(encodedStr, charset) {
      charset = charset || "utf-8";
      let encodedBytes = [];
      for (let i = 0; i < encodedStr.length; i++) {
        let c = encodedStr.charAt(i);
        if (c === "%" && /^[a-f0-9]{2}/i.test(encodedStr.substr(i + 1, 2))) {
          let byte = encodedStr.substr(i + 1, 2);
          i += 2;
          encodedBytes.push(parseInt(byte, 16));
        } else if (c.charCodeAt(0) > 126) {
          c = textEncoder.encode(c);
          for (let j = 0; j < c.length; j++) {
            encodedBytes.push(c[j]);
          }
        } else {
          encodedBytes.push(c.charCodeAt(0));
        }
      }
      const byteStr = new ArrayBuffer(encodedBytes.length);
      const dataView = new DataView(byteStr);
      for (let i = 0, len = encodedBytes.length; i < len; i++) {
        dataView.setUint8(i, encodedBytes[i]);
      }
      return getDecoder(charset).decode(byteStr);
    }
    function decodeParameterValueContinuations(header) {
      let paramKeys = /* @__PURE__ */ new Map();
      Object.keys(header.params).forEach((key2) => {
        let match = key2.match(/\*((\d+)\*?)?$/);
        if (!match) {
          return;
        }
        let actualKey = key2.substr(0, match.index).toLowerCase();
        let nr = Number(match[2]) || 0;
        let paramVal;
        if (!paramKeys.has(actualKey)) {
          paramVal = {
            charset: false,
            values: []
          };
          paramKeys.set(actualKey, paramVal);
        } else {
          paramVal = paramKeys.get(actualKey);
        }
        let value = header.params[key2];
        if (nr === 0 && match[0].charAt(match[0].length - 1) === "*" && (match = value.match(/^([^']*)'[^']*'(.*)$/))) {
          paramVal.charset = match[1] || "utf-8";
          value = match[2];
        }
        paramVal.values.push({ nr, value });
        delete header.params[key2];
      });
      paramKeys.forEach((paramVal, key2) => {
        header.params[key2] = decodeURIComponentWithCharset(
          paramVal.values.sort((a, b) => a.nr - b.nr).map((a) => a.value).join(""),
          paramVal.charset
        );
      });
    }
    if (module2.exports.default) {
      defaultExport = module2.exports.default;
      namedExports = {};
      for (key in module2.exports) {
        if (key !== "default" && key !== "__esModule") {
          namedExports[key] = module2.exports[key];
        }
      }
      module2.exports = defaultExport;
      Object.assign(module2.exports, namedExports);
      Object.defineProperty(module2.exports, "__esModule", { value: true });
      module2.exports.default = defaultExport;
    }
    var defaultExport;
    var namedExports;
    var key;
  }
});

// node_modules/postal-mime/dist/pass-through-decoder.cjs
var require_pass_through_decoder = __commonJS({
  "node_modules/postal-mime/dist/pass-through-decoder.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key2 of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key2) && key2 !== except)
            __defProp2(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc2(from, key2)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var pass_through_decoder_exports = {};
    __export2(pass_through_decoder_exports, {
      default: () => PassThroughDecoder
    });
    module2.exports = __toCommonJS2(pass_through_decoder_exports);
    var import_decode_strings = require_decode_strings();
    var PassThroughDecoder = class {
      constructor() {
        this.chunks = [];
      }
      update(line) {
        this.chunks.push(line);
        this.chunks.push("\n");
      }
      finalize() {
        return (0, import_decode_strings.blobToArrayBuffer)(new Blob(this.chunks, { type: "application/octet-stream" }));
      }
    };
    if (module2.exports.default) {
      defaultExport = module2.exports.default;
      namedExports = {};
      for (key in module2.exports) {
        if (key !== "default" && key !== "__esModule") {
          namedExports[key] = module2.exports[key];
        }
      }
      module2.exports = defaultExport;
      Object.assign(module2.exports, namedExports);
      Object.defineProperty(module2.exports, "__esModule", { value: true });
      module2.exports.default = defaultExport;
    }
    var defaultExport;
    var namedExports;
    var key;
  }
});

// node_modules/postal-mime/dist/base64-decoder.cjs
var require_base64_decoder = __commonJS({
  "node_modules/postal-mime/dist/base64-decoder.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key2 of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key2) && key2 !== except)
            __defProp2(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc2(from, key2)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var base64_decoder_exports = {};
    __export2(base64_decoder_exports, {
      default: () => Base64Decoder
    });
    module2.exports = __toCommonJS2(base64_decoder_exports);
    var import_decode_strings = require_decode_strings();
    var Base64Decoder = class {
      constructor(opts) {
        opts = opts || {};
        this.decoder = opts.decoder || new TextDecoder();
        this.maxChunkSize = 100 * 1024;
        this.chunks = [];
        this.remainder = "";
      }
      update(buffer) {
        let str = this.decoder.decode(buffer);
        str = str.replace(/[^a-zA-Z0-9+\/]+/g, "");
        this.remainder += str;
        if (this.remainder.length >= this.maxChunkSize) {
          let allowedBytes = Math.floor(this.remainder.length / 4) * 4;
          let base64Str;
          if (allowedBytes === this.remainder.length) {
            base64Str = this.remainder;
            this.remainder = "";
          } else {
            base64Str = this.remainder.substr(0, allowedBytes);
            this.remainder = this.remainder.substr(allowedBytes);
          }
          if (base64Str.length) {
            this.chunks.push((0, import_decode_strings.decodeBase64)(base64Str));
          }
        }
      }
      finalize() {
        if (this.remainder && !/^=+$/.test(this.remainder)) {
          this.chunks.push((0, import_decode_strings.decodeBase64)(this.remainder));
        }
        return (0, import_decode_strings.blobToArrayBuffer)(new Blob(this.chunks, { type: "application/octet-stream" }));
      }
    };
    if (module2.exports.default) {
      defaultExport = module2.exports.default;
      namedExports = {};
      for (key in module2.exports) {
        if (key !== "default" && key !== "__esModule") {
          namedExports[key] = module2.exports[key];
        }
      }
      module2.exports = defaultExport;
      Object.assign(module2.exports, namedExports);
      Object.defineProperty(module2.exports, "__esModule", { value: true });
      module2.exports.default = defaultExport;
    }
    var defaultExport;
    var namedExports;
    var key;
  }
});

// node_modules/postal-mime/dist/qp-decoder.cjs
var require_qp_decoder = __commonJS({
  "node_modules/postal-mime/dist/qp-decoder.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key2 of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key2) && key2 !== except)
            __defProp2(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc2(from, key2)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var qp_decoder_exports = {};
    __export2(qp_decoder_exports, {
      default: () => QPDecoder
    });
    module2.exports = __toCommonJS2(qp_decoder_exports);
    var import_decode_strings = require_decode_strings();
    var VALID_QP_REGEX = /^=[a-f0-9]{2}$/i;
    var QP_SPLIT_REGEX = /(?==[a-f0-9]{2})/i;
    var SOFT_LINE_BREAK_REGEX = /=\r?\n/g;
    var PARTIAL_QP_ENDING_REGEX = /=[a-fA-F0-9]?$/;
    var QPDecoder = class {
      constructor(opts) {
        opts = opts || {};
        this.decoder = opts.decoder || new TextDecoder();
        this.maxChunkSize = 100 * 1024;
        this.remainder = "";
        this.chunks = [];
      }
      decodeQPBytes(encodedBytes) {
        let buf = new ArrayBuffer(encodedBytes.length);
        let dataView = new DataView(buf);
        for (let i = 0, len = encodedBytes.length; i < len; i++) {
          dataView.setUint8(i, parseInt(encodedBytes[i], 16));
        }
        return buf;
      }
      decodeChunks(str) {
        str = str.replace(SOFT_LINE_BREAK_REGEX, "");
        let list = str.split(QP_SPLIT_REGEX);
        let encodedBytes = [];
        for (let part of list) {
          if (part.charAt(0) !== "=") {
            if (encodedBytes.length) {
              this.chunks.push(this.decodeQPBytes(encodedBytes));
              encodedBytes = [];
            }
            this.chunks.push(part);
            continue;
          }
          if (part.length === 3) {
            if (VALID_QP_REGEX.test(part)) {
              encodedBytes.push(part.substr(1));
            } else {
              if (encodedBytes.length) {
                this.chunks.push(this.decodeQPBytes(encodedBytes));
                encodedBytes = [];
              }
              this.chunks.push(part);
            }
            continue;
          }
          if (part.length > 3) {
            const firstThree = part.substr(0, 3);
            if (VALID_QP_REGEX.test(firstThree)) {
              encodedBytes.push(part.substr(1, 2));
              this.chunks.push(this.decodeQPBytes(encodedBytes));
              encodedBytes = [];
              part = part.substr(3);
              this.chunks.push(part);
            } else {
              if (encodedBytes.length) {
                this.chunks.push(this.decodeQPBytes(encodedBytes));
                encodedBytes = [];
              }
              this.chunks.push(part);
            }
          }
        }
        if (encodedBytes.length) {
          this.chunks.push(this.decodeQPBytes(encodedBytes));
        }
      }
      update(buffer) {
        let str = this.decoder.decode(buffer) + "\n";
        str = this.remainder + str;
        if (str.length < this.maxChunkSize) {
          this.remainder = str;
          return;
        }
        this.remainder = "";
        let partialEnding = str.match(PARTIAL_QP_ENDING_REGEX);
        if (partialEnding) {
          if (partialEnding.index === 0) {
            this.remainder = str;
            return;
          }
          this.remainder = str.substr(partialEnding.index);
          str = str.substr(0, partialEnding.index);
        }
        this.decodeChunks(str);
      }
      finalize() {
        if (this.remainder.length) {
          this.decodeChunks(this.remainder);
          this.remainder = "";
        }
        return (0, import_decode_strings.blobToArrayBuffer)(new Blob(this.chunks, { type: "application/octet-stream" }));
      }
    };
    if (module2.exports.default) {
      defaultExport = module2.exports.default;
      namedExports = {};
      for (key in module2.exports) {
        if (key !== "default" && key !== "__esModule") {
          namedExports[key] = module2.exports[key];
        }
      }
      module2.exports = defaultExport;
      Object.assign(module2.exports, namedExports);
      Object.defineProperty(module2.exports, "__esModule", { value: true });
      module2.exports.default = defaultExport;
    }
    var defaultExport;
    var namedExports;
    var key;
  }
});

// node_modules/postal-mime/dist/mime-node.cjs
var require_mime_node = __commonJS({
  "node_modules/postal-mime/dist/mime-node.cjs"(exports2, module2) {
    "use strict";
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key2 of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key2) && key2 !== except)
            __defProp2(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc2(from, key2)) || desc.enumerable });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var mime_node_exports = {};
    __export2(mime_node_exports, {
      default: () => MimeNode
    });
    module2.exports = __toCommonJS2(mime_node_exports);
    var import_decode_strings = require_decode_strings();
    var import_pass_through_decoder = __toESM2(require_pass_through_decoder(), 1);
    var import_base64_decoder = __toESM2(require_base64_decoder(), 1);
    var import_qp_decoder = __toESM2(require_qp_decoder(), 1);
    var defaultDecoder = (0, import_decode_strings.getDecoder)();
    var MimeNode = class {
      constructor(options) {
        this.options = options || {};
        this.postalMime = this.options.postalMime;
        this.root = !!this.options.parentNode;
        this.childNodes = [];
        if (this.options.parentNode) {
          this.parentNode = this.options.parentNode;
          this.depth = this.parentNode.depth + 1;
          if (this.depth > this.options.maxNestingDepth) {
            throw new Error(`Maximum MIME nesting depth of ${this.options.maxNestingDepth} levels exceeded`);
          }
          this.options.parentNode.childNodes.push(this);
        } else {
          this.depth = 0;
        }
        this.state = "header";
        this.headerLines = [];
        this.headerSize = 0;
        const parentMultipartType = this.options.parentMultipartType || null;
        const defaultContentType = parentMultipartType === "digest" ? "message/rfc822" : "text/plain";
        this.contentType = {
          value: defaultContentType,
          default: true
        };
        this.contentTransferEncoding = {
          value: "8bit"
        };
        this.contentDisposition = {
          value: ""
        };
        this.headers = [];
        this.contentDecoder = false;
      }
      setupContentDecoder(transferEncoding) {
        if (/base64/i.test(transferEncoding)) {
          this.contentDecoder = new import_base64_decoder.default();
        } else if (/quoted-printable/i.test(transferEncoding)) {
          this.contentDecoder = new import_qp_decoder.default({ decoder: (0, import_decode_strings.getDecoder)(this.contentType.parsed.params.charset) });
        } else {
          this.contentDecoder = new import_pass_through_decoder.default();
        }
      }
      async finalize() {
        if (this.state === "finished") {
          return;
        }
        if (this.state === "header") {
          this.processHeaders();
        }
        let boundaries = this.postalMime.boundaries;
        for (let i = boundaries.length - 1; i >= 0; i--) {
          let boundary = boundaries[i];
          if (boundary.node === this) {
            boundaries.splice(i, 1);
            break;
          }
        }
        await this.finalizeChildNodes();
        this.content = this.contentDecoder ? await this.contentDecoder.finalize() : null;
        this.state = "finished";
      }
      async finalizeChildNodes() {
        for (let childNode of this.childNodes) {
          await childNode.finalize();
        }
      }
      // Strip RFC 822 comments (parenthesized text) from structured header values
      stripComments(str) {
        let result = "";
        let depth = 0;
        let escaped = false;
        let inQuote = false;
        for (let i = 0; i < str.length; i++) {
          const chr = str.charAt(i);
          if (escaped) {
            if (depth === 0) {
              result += chr;
            }
            escaped = false;
            continue;
          }
          if (chr === "\\") {
            escaped = true;
            if (depth === 0) {
              result += chr;
            }
            continue;
          }
          if (chr === '"' && depth === 0) {
            inQuote = !inQuote;
            result += chr;
            continue;
          }
          if (!inQuote) {
            if (chr === "(") {
              depth++;
              continue;
            }
            if (chr === ")" && depth > 0) {
              depth--;
              continue;
            }
          }
          if (depth === 0) {
            result += chr;
          }
        }
        return result;
      }
      parseStructuredHeader(str) {
        str = this.stripComments(str);
        let response = {
          value: false,
          params: {}
        };
        let key2 = false;
        let value = "";
        let stage = "value";
        let quote = false;
        let escaped = false;
        let chr;
        for (let i = 0, len = str.length; i < len; i++) {
          chr = str.charAt(i);
          switch (stage) {
            case "key":
              if (chr === "=") {
                key2 = value.trim().toLowerCase();
                stage = "value";
                value = "";
                break;
              }
              value += chr;
              break;
            case "value":
              if (escaped) {
                value += chr;
              } else if (chr === "\\") {
                escaped = true;
                continue;
              } else if (quote && chr === quote) {
                quote = false;
              } else if (!quote && chr === '"') {
                quote = chr;
              } else if (!quote && chr === ";") {
                if (key2 === false) {
                  response.value = value.trim();
                } else {
                  response.params[key2] = value.trim();
                }
                stage = "key";
                value = "";
              } else {
                value += chr;
              }
              escaped = false;
              break;
          }
        }
        value = value.trim();
        if (stage === "value") {
          if (key2 === false) {
            response.value = value;
          } else {
            response.params[key2] = value;
          }
        } else if (value) {
          response.params[value.toLowerCase()] = "";
        }
        if (response.value) {
          response.value = response.value.toLowerCase();
        }
        (0, import_decode_strings.decodeParameterValueContinuations)(response);
        return response;
      }
      decodeFlowedText(str, delSp) {
        return str.split(/\r?\n/).reduce((previousValue, currentValue) => {
          if (previousValue.endsWith(" ") && previousValue !== "-- " && !previousValue.endsWith("\n-- ")) {
            if (delSp) {
              return previousValue.slice(0, -1) + currentValue;
            } else {
              return previousValue + currentValue;
            }
          } else {
            return previousValue + "\n" + currentValue;
          }
        }).replace(/^ /gm, "");
      }
      getTextContent() {
        if (!this.content) {
          return "";
        }
        let str = (0, import_decode_strings.getDecoder)(this.contentType.parsed.params.charset).decode(this.content);
        if (/^flowed$/i.test(this.contentType.parsed.params.format)) {
          str = this.decodeFlowedText(str, /^yes$/i.test(this.contentType.parsed.params.delsp));
        }
        return str;
      }
      processHeaders() {
        for (let i = this.headerLines.length - 1; i >= 0; i--) {
          let line = this.headerLines[i];
          if (i && /^\s/.test(line)) {
            this.headerLines[i - 1] += "\n" + line;
            this.headerLines.splice(i, 1);
          }
        }
        this.rawHeaderLines = [];
        for (let i = this.headerLines.length - 1; i >= 0; i--) {
          let rawLine = this.headerLines[i];
          let sep = rawLine.indexOf(":");
          let rawKey = sep < 0 ? rawLine.trim() : rawLine.substr(0, sep).trim();
          this.rawHeaderLines.push({
            key: rawKey.toLowerCase(),
            line: rawLine
          });
          let normalizedLine = rawLine.replace(/\s+/g, " ");
          sep = normalizedLine.indexOf(":");
          let key2 = sep < 0 ? normalizedLine.trim() : normalizedLine.substr(0, sep).trim();
          let value = sep < 0 ? "" : normalizedLine.substr(sep + 1).trim();
          this.headers.push({ key: key2.toLowerCase(), originalKey: key2, value });
          switch (key2.toLowerCase()) {
            case "content-type":
              if (this.contentType.default) {
                this.contentType = { value, parsed: {} };
              }
              break;
            case "content-transfer-encoding":
              this.contentTransferEncoding = { value, parsed: {} };
              break;
            case "content-disposition":
              this.contentDisposition = { value, parsed: {} };
              break;
            case "content-id":
              this.contentId = value;
              break;
            case "content-description":
              this.contentDescription = value;
              break;
          }
        }
        this.contentType.parsed = this.parseStructuredHeader(this.contentType.value);
        this.contentType.multipart = /^multipart\//i.test(this.contentType.parsed.value) ? this.contentType.parsed.value.substr(this.contentType.parsed.value.indexOf("/") + 1) : false;
        if (this.contentType.multipart && this.contentType.parsed.params.boundary) {
          this.postalMime.boundaries.push({
            value: import_decode_strings.textEncoder.encode(this.contentType.parsed.params.boundary),
            node: this
          });
        }
        this.contentDisposition.parsed = this.parseStructuredHeader(this.contentDisposition.value);
        this.contentTransferEncoding.encoding = this.contentTransferEncoding.value.toLowerCase().split(/[^\w-]/).shift();
        this.setupContentDecoder(this.contentTransferEncoding.encoding);
      }
      feed(line) {
        switch (this.state) {
          case "header":
            if (!line.length) {
              this.state = "body";
              return this.processHeaders();
            }
            this.headerSize += line.length;
            if (this.headerSize > this.options.maxHeadersSize) {
              let error = new Error(`Maximum header size of ${this.options.maxHeadersSize} bytes exceeded`);
              throw error;
            }
            this.headerLines.push(defaultDecoder.decode(line));
            break;
          case "body": {
            this.contentDecoder.update(line);
          }
        }
      }
    };
    if (module2.exports.default) {
      defaultExport = module2.exports.default;
      namedExports = {};
      for (key in module2.exports) {
        if (key !== "default" && key !== "__esModule") {
          namedExports[key] = module2.exports[key];
        }
      }
      module2.exports = defaultExport;
      Object.assign(module2.exports, namedExports);
      Object.defineProperty(module2.exports, "__esModule", { value: true });
      module2.exports.default = defaultExport;
    }
    var defaultExport;
    var namedExports;
    var key;
  }
});

// node_modules/postal-mime/dist/html-entities.cjs
var require_html_entities = __commonJS({
  "node_modules/postal-mime/dist/html-entities.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key2 of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key2) && key2 !== except)
            __defProp2(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc2(from, key2)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var html_entities_exports = {};
    __export2(html_entities_exports, {
      default: () => html_entities_default,
      htmlEntities: () => htmlEntities
    });
    module2.exports = __toCommonJS2(html_entities_exports);
    var htmlEntities = {
      "&AElig": "\xC6",
      "&AElig;": "\xC6",
      "&AMP": "&",
      "&AMP;": "&",
      "&Aacute": "\xC1",
      "&Aacute;": "\xC1",
      "&Abreve;": "\u0102",
      "&Acirc": "\xC2",
      "&Acirc;": "\xC2",
      "&Acy;": "\u0410",
      "&Afr;": "\u{1D504}",
      "&Agrave": "\xC0",
      "&Agrave;": "\xC0",
      "&Alpha;": "\u0391",
      "&Amacr;": "\u0100",
      "&And;": "\u2A53",
      "&Aogon;": "\u0104",
      "&Aopf;": "\u{1D538}",
      "&ApplyFunction;": "\u2061",
      "&Aring": "\xC5",
      "&Aring;": "\xC5",
      "&Ascr;": "\u{1D49C}",
      "&Assign;": "\u2254",
      "&Atilde": "\xC3",
      "&Atilde;": "\xC3",
      "&Auml": "\xC4",
      "&Auml;": "\xC4",
      "&Backslash;": "\u2216",
      "&Barv;": "\u2AE7",
      "&Barwed;": "\u2306",
      "&Bcy;": "\u0411",
      "&Because;": "\u2235",
      "&Bernoullis;": "\u212C",
      "&Beta;": "\u0392",
      "&Bfr;": "\u{1D505}",
      "&Bopf;": "\u{1D539}",
      "&Breve;": "\u02D8",
      "&Bscr;": "\u212C",
      "&Bumpeq;": "\u224E",
      "&CHcy;": "\u0427",
      "&COPY": "\xA9",
      "&COPY;": "\xA9",
      "&Cacute;": "\u0106",
      "&Cap;": "\u22D2",
      "&CapitalDifferentialD;": "\u2145",
      "&Cayleys;": "\u212D",
      "&Ccaron;": "\u010C",
      "&Ccedil": "\xC7",
      "&Ccedil;": "\xC7",
      "&Ccirc;": "\u0108",
      "&Cconint;": "\u2230",
      "&Cdot;": "\u010A",
      "&Cedilla;": "\xB8",
      "&CenterDot;": "\xB7",
      "&Cfr;": "\u212D",
      "&Chi;": "\u03A7",
      "&CircleDot;": "\u2299",
      "&CircleMinus;": "\u2296",
      "&CirclePlus;": "\u2295",
      "&CircleTimes;": "\u2297",
      "&ClockwiseContourIntegral;": "\u2232",
      "&CloseCurlyDoubleQuote;": "\u201D",
      "&CloseCurlyQuote;": "\u2019",
      "&Colon;": "\u2237",
      "&Colone;": "\u2A74",
      "&Congruent;": "\u2261",
      "&Conint;": "\u222F",
      "&ContourIntegral;": "\u222E",
      "&Copf;": "\u2102",
      "&Coproduct;": "\u2210",
      "&CounterClockwiseContourIntegral;": "\u2233",
      "&Cross;": "\u2A2F",
      "&Cscr;": "\u{1D49E}",
      "&Cup;": "\u22D3",
      "&CupCap;": "\u224D",
      "&DD;": "\u2145",
      "&DDotrahd;": "\u2911",
      "&DJcy;": "\u0402",
      "&DScy;": "\u0405",
      "&DZcy;": "\u040F",
      "&Dagger;": "\u2021",
      "&Darr;": "\u21A1",
      "&Dashv;": "\u2AE4",
      "&Dcaron;": "\u010E",
      "&Dcy;": "\u0414",
      "&Del;": "\u2207",
      "&Delta;": "\u0394",
      "&Dfr;": "\u{1D507}",
      "&DiacriticalAcute;": "\xB4",
      "&DiacriticalDot;": "\u02D9",
      "&DiacriticalDoubleAcute;": "\u02DD",
      "&DiacriticalGrave;": "`",
      "&DiacriticalTilde;": "\u02DC",
      "&Diamond;": "\u22C4",
      "&DifferentialD;": "\u2146",
      "&Dopf;": "\u{1D53B}",
      "&Dot;": "\xA8",
      "&DotDot;": "\u20DC",
      "&DotEqual;": "\u2250",
      "&DoubleContourIntegral;": "\u222F",
      "&DoubleDot;": "\xA8",
      "&DoubleDownArrow;": "\u21D3",
      "&DoubleLeftArrow;": "\u21D0",
      "&DoubleLeftRightArrow;": "\u21D4",
      "&DoubleLeftTee;": "\u2AE4",
      "&DoubleLongLeftArrow;": "\u27F8",
      "&DoubleLongLeftRightArrow;": "\u27FA",
      "&DoubleLongRightArrow;": "\u27F9",
      "&DoubleRightArrow;": "\u21D2",
      "&DoubleRightTee;": "\u22A8",
      "&DoubleUpArrow;": "\u21D1",
      "&DoubleUpDownArrow;": "\u21D5",
      "&DoubleVerticalBar;": "\u2225",
      "&DownArrow;": "\u2193",
      "&DownArrowBar;": "\u2913",
      "&DownArrowUpArrow;": "\u21F5",
      "&DownBreve;": "\u0311",
      "&DownLeftRightVector;": "\u2950",
      "&DownLeftTeeVector;": "\u295E",
      "&DownLeftVector;": "\u21BD",
      "&DownLeftVectorBar;": "\u2956",
      "&DownRightTeeVector;": "\u295F",
      "&DownRightVector;": "\u21C1",
      "&DownRightVectorBar;": "\u2957",
      "&DownTee;": "\u22A4",
      "&DownTeeArrow;": "\u21A7",
      "&Downarrow;": "\u21D3",
      "&Dscr;": "\u{1D49F}",
      "&Dstrok;": "\u0110",
      "&ENG;": "\u014A",
      "&ETH": "\xD0",
      "&ETH;": "\xD0",
      "&Eacute": "\xC9",
      "&Eacute;": "\xC9",
      "&Ecaron;": "\u011A",
      "&Ecirc": "\xCA",
      "&Ecirc;": "\xCA",
      "&Ecy;": "\u042D",
      "&Edot;": "\u0116",
      "&Efr;": "\u{1D508}",
      "&Egrave": "\xC8",
      "&Egrave;": "\xC8",
      "&Element;": "\u2208",
      "&Emacr;": "\u0112",
      "&EmptySmallSquare;": "\u25FB",
      "&EmptyVerySmallSquare;": "\u25AB",
      "&Eogon;": "\u0118",
      "&Eopf;": "\u{1D53C}",
      "&Epsilon;": "\u0395",
      "&Equal;": "\u2A75",
      "&EqualTilde;": "\u2242",
      "&Equilibrium;": "\u21CC",
      "&Escr;": "\u2130",
      "&Esim;": "\u2A73",
      "&Eta;": "\u0397",
      "&Euml": "\xCB",
      "&Euml;": "\xCB",
      "&Exists;": "\u2203",
      "&ExponentialE;": "\u2147",
      "&Fcy;": "\u0424",
      "&Ffr;": "\u{1D509}",
      "&FilledSmallSquare;": "\u25FC",
      "&FilledVerySmallSquare;": "\u25AA",
      "&Fopf;": "\u{1D53D}",
      "&ForAll;": "\u2200",
      "&Fouriertrf;": "\u2131",
      "&Fscr;": "\u2131",
      "&GJcy;": "\u0403",
      "&GT": ">",
      "&GT;": ">",
      "&Gamma;": "\u0393",
      "&Gammad;": "\u03DC",
      "&Gbreve;": "\u011E",
      "&Gcedil;": "\u0122",
      "&Gcirc;": "\u011C",
      "&Gcy;": "\u0413",
      "&Gdot;": "\u0120",
      "&Gfr;": "\u{1D50A}",
      "&Gg;": "\u22D9",
      "&Gopf;": "\u{1D53E}",
      "&GreaterEqual;": "\u2265",
      "&GreaterEqualLess;": "\u22DB",
      "&GreaterFullEqual;": "\u2267",
      "&GreaterGreater;": "\u2AA2",
      "&GreaterLess;": "\u2277",
      "&GreaterSlantEqual;": "\u2A7E",
      "&GreaterTilde;": "\u2273",
      "&Gscr;": "\u{1D4A2}",
      "&Gt;": "\u226B",
      "&HARDcy;": "\u042A",
      "&Hacek;": "\u02C7",
      "&Hat;": "^",
      "&Hcirc;": "\u0124",
      "&Hfr;": "\u210C",
      "&HilbertSpace;": "\u210B",
      "&Hopf;": "\u210D",
      "&HorizontalLine;": "\u2500",
      "&Hscr;": "\u210B",
      "&Hstrok;": "\u0126",
      "&HumpDownHump;": "\u224E",
      "&HumpEqual;": "\u224F",
      "&IEcy;": "\u0415",
      "&IJlig;": "\u0132",
      "&IOcy;": "\u0401",
      "&Iacute": "\xCD",
      "&Iacute;": "\xCD",
      "&Icirc": "\xCE",
      "&Icirc;": "\xCE",
      "&Icy;": "\u0418",
      "&Idot;": "\u0130",
      "&Ifr;": "\u2111",
      "&Igrave": "\xCC",
      "&Igrave;": "\xCC",
      "&Im;": "\u2111",
      "&Imacr;": "\u012A",
      "&ImaginaryI;": "\u2148",
      "&Implies;": "\u21D2",
      "&Int;": "\u222C",
      "&Integral;": "\u222B",
      "&Intersection;": "\u22C2",
      "&InvisibleComma;": "\u2063",
      "&InvisibleTimes;": "\u2062",
      "&Iogon;": "\u012E",
      "&Iopf;": "\u{1D540}",
      "&Iota;": "\u0399",
      "&Iscr;": "\u2110",
      "&Itilde;": "\u0128",
      "&Iukcy;": "\u0406",
      "&Iuml": "\xCF",
      "&Iuml;": "\xCF",
      "&Jcirc;": "\u0134",
      "&Jcy;": "\u0419",
      "&Jfr;": "\u{1D50D}",
      "&Jopf;": "\u{1D541}",
      "&Jscr;": "\u{1D4A5}",
      "&Jsercy;": "\u0408",
      "&Jukcy;": "\u0404",
      "&KHcy;": "\u0425",
      "&KJcy;": "\u040C",
      "&Kappa;": "\u039A",
      "&Kcedil;": "\u0136",
      "&Kcy;": "\u041A",
      "&Kfr;": "\u{1D50E}",
      "&Kopf;": "\u{1D542}",
      "&Kscr;": "\u{1D4A6}",
      "&LJcy;": "\u0409",
      "&LT": "<",
      "&LT;": "<",
      "&Lacute;": "\u0139",
      "&Lambda;": "\u039B",
      "&Lang;": "\u27EA",
      "&Laplacetrf;": "\u2112",
      "&Larr;": "\u219E",
      "&Lcaron;": "\u013D",
      "&Lcedil;": "\u013B",
      "&Lcy;": "\u041B",
      "&LeftAngleBracket;": "\u27E8",
      "&LeftArrow;": "\u2190",
      "&LeftArrowBar;": "\u21E4",
      "&LeftArrowRightArrow;": "\u21C6",
      "&LeftCeiling;": "\u2308",
      "&LeftDoubleBracket;": "\u27E6",
      "&LeftDownTeeVector;": "\u2961",
      "&LeftDownVector;": "\u21C3",
      "&LeftDownVectorBar;": "\u2959",
      "&LeftFloor;": "\u230A",
      "&LeftRightArrow;": "\u2194",
      "&LeftRightVector;": "\u294E",
      "&LeftTee;": "\u22A3",
      "&LeftTeeArrow;": "\u21A4",
      "&LeftTeeVector;": "\u295A",
      "&LeftTriangle;": "\u22B2",
      "&LeftTriangleBar;": "\u29CF",
      "&LeftTriangleEqual;": "\u22B4",
      "&LeftUpDownVector;": "\u2951",
      "&LeftUpTeeVector;": "\u2960",
      "&LeftUpVector;": "\u21BF",
      "&LeftUpVectorBar;": "\u2958",
      "&LeftVector;": "\u21BC",
      "&LeftVectorBar;": "\u2952",
      "&Leftarrow;": "\u21D0",
      "&Leftrightarrow;": "\u21D4",
      "&LessEqualGreater;": "\u22DA",
      "&LessFullEqual;": "\u2266",
      "&LessGreater;": "\u2276",
      "&LessLess;": "\u2AA1",
      "&LessSlantEqual;": "\u2A7D",
      "&LessTilde;": "\u2272",
      "&Lfr;": "\u{1D50F}",
      "&Ll;": "\u22D8",
      "&Lleftarrow;": "\u21DA",
      "&Lmidot;": "\u013F",
      "&LongLeftArrow;": "\u27F5",
      "&LongLeftRightArrow;": "\u27F7",
      "&LongRightArrow;": "\u27F6",
      "&Longleftarrow;": "\u27F8",
      "&Longleftrightarrow;": "\u27FA",
      "&Longrightarrow;": "\u27F9",
      "&Lopf;": "\u{1D543}",
      "&LowerLeftArrow;": "\u2199",
      "&LowerRightArrow;": "\u2198",
      "&Lscr;": "\u2112",
      "&Lsh;": "\u21B0",
      "&Lstrok;": "\u0141",
      "&Lt;": "\u226A",
      "&Map;": "\u2905",
      "&Mcy;": "\u041C",
      "&MediumSpace;": "\u205F",
      "&Mellintrf;": "\u2133",
      "&Mfr;": "\u{1D510}",
      "&MinusPlus;": "\u2213",
      "&Mopf;": "\u{1D544}",
      "&Mscr;": "\u2133",
      "&Mu;": "\u039C",
      "&NJcy;": "\u040A",
      "&Nacute;": "\u0143",
      "&Ncaron;": "\u0147",
      "&Ncedil;": "\u0145",
      "&Ncy;": "\u041D",
      "&NegativeMediumSpace;": "\u200B",
      "&NegativeThickSpace;": "\u200B",
      "&NegativeThinSpace;": "\u200B",
      "&NegativeVeryThinSpace;": "\u200B",
      "&NestedGreaterGreater;": "\u226B",
      "&NestedLessLess;": "\u226A",
      "&NewLine;": "\n",
      "&Nfr;": "\u{1D511}",
      "&NoBreak;": "\u2060",
      "&NonBreakingSpace;": "\xA0",
      "&Nopf;": "\u2115",
      "&Not;": "\u2AEC",
      "&NotCongruent;": "\u2262",
      "&NotCupCap;": "\u226D",
      "&NotDoubleVerticalBar;": "\u2226",
      "&NotElement;": "\u2209",
      "&NotEqual;": "\u2260",
      "&NotEqualTilde;": "\u2242\u0338",
      "&NotExists;": "\u2204",
      "&NotGreater;": "\u226F",
      "&NotGreaterEqual;": "\u2271",
      "&NotGreaterFullEqual;": "\u2267\u0338",
      "&NotGreaterGreater;": "\u226B\u0338",
      "&NotGreaterLess;": "\u2279",
      "&NotGreaterSlantEqual;": "\u2A7E\u0338",
      "&NotGreaterTilde;": "\u2275",
      "&NotHumpDownHump;": "\u224E\u0338",
      "&NotHumpEqual;": "\u224F\u0338",
      "&NotLeftTriangle;": "\u22EA",
      "&NotLeftTriangleBar;": "\u29CF\u0338",
      "&NotLeftTriangleEqual;": "\u22EC",
      "&NotLess;": "\u226E",
      "&NotLessEqual;": "\u2270",
      "&NotLessGreater;": "\u2278",
      "&NotLessLess;": "\u226A\u0338",
      "&NotLessSlantEqual;": "\u2A7D\u0338",
      "&NotLessTilde;": "\u2274",
      "&NotNestedGreaterGreater;": "\u2AA2\u0338",
      "&NotNestedLessLess;": "\u2AA1\u0338",
      "&NotPrecedes;": "\u2280",
      "&NotPrecedesEqual;": "\u2AAF\u0338",
      "&NotPrecedesSlantEqual;": "\u22E0",
      "&NotReverseElement;": "\u220C",
      "&NotRightTriangle;": "\u22EB",
      "&NotRightTriangleBar;": "\u29D0\u0338",
      "&NotRightTriangleEqual;": "\u22ED",
      "&NotSquareSubset;": "\u228F\u0338",
      "&NotSquareSubsetEqual;": "\u22E2",
      "&NotSquareSuperset;": "\u2290\u0338",
      "&NotSquareSupersetEqual;": "\u22E3",
      "&NotSubset;": "\u2282\u20D2",
      "&NotSubsetEqual;": "\u2288",
      "&NotSucceeds;": "\u2281",
      "&NotSucceedsEqual;": "\u2AB0\u0338",
      "&NotSucceedsSlantEqual;": "\u22E1",
      "&NotSucceedsTilde;": "\u227F\u0338",
      "&NotSuperset;": "\u2283\u20D2",
      "&NotSupersetEqual;": "\u2289",
      "&NotTilde;": "\u2241",
      "&NotTildeEqual;": "\u2244",
      "&NotTildeFullEqual;": "\u2247",
      "&NotTildeTilde;": "\u2249",
      "&NotVerticalBar;": "\u2224",
      "&Nscr;": "\u{1D4A9}",
      "&Ntilde": "\xD1",
      "&Ntilde;": "\xD1",
      "&Nu;": "\u039D",
      "&OElig;": "\u0152",
      "&Oacute": "\xD3",
      "&Oacute;": "\xD3",
      "&Ocirc": "\xD4",
      "&Ocirc;": "\xD4",
      "&Ocy;": "\u041E",
      "&Odblac;": "\u0150",
      "&Ofr;": "\u{1D512}",
      "&Ograve": "\xD2",
      "&Ograve;": "\xD2",
      "&Omacr;": "\u014C",
      "&Omega;": "\u03A9",
      "&Omicron;": "\u039F",
      "&Oopf;": "\u{1D546}",
      "&OpenCurlyDoubleQuote;": "\u201C",
      "&OpenCurlyQuote;": "\u2018",
      "&Or;": "\u2A54",
      "&Oscr;": "\u{1D4AA}",
      "&Oslash": "\xD8",
      "&Oslash;": "\xD8",
      "&Otilde": "\xD5",
      "&Otilde;": "\xD5",
      "&Otimes;": "\u2A37",
      "&Ouml": "\xD6",
      "&Ouml;": "\xD6",
      "&OverBar;": "\u203E",
      "&OverBrace;": "\u23DE",
      "&OverBracket;": "\u23B4",
      "&OverParenthesis;": "\u23DC",
      "&PartialD;": "\u2202",
      "&Pcy;": "\u041F",
      "&Pfr;": "\u{1D513}",
      "&Phi;": "\u03A6",
      "&Pi;": "\u03A0",
      "&PlusMinus;": "\xB1",
      "&Poincareplane;": "\u210C",
      "&Popf;": "\u2119",
      "&Pr;": "\u2ABB",
      "&Precedes;": "\u227A",
      "&PrecedesEqual;": "\u2AAF",
      "&PrecedesSlantEqual;": "\u227C",
      "&PrecedesTilde;": "\u227E",
      "&Prime;": "\u2033",
      "&Product;": "\u220F",
      "&Proportion;": "\u2237",
      "&Proportional;": "\u221D",
      "&Pscr;": "\u{1D4AB}",
      "&Psi;": "\u03A8",
      "&QUOT": '"',
      "&QUOT;": '"',
      "&Qfr;": "\u{1D514}",
      "&Qopf;": "\u211A",
      "&Qscr;": "\u{1D4AC}",
      "&RBarr;": "\u2910",
      "&REG": "\xAE",
      "&REG;": "\xAE",
      "&Racute;": "\u0154",
      "&Rang;": "\u27EB",
      "&Rarr;": "\u21A0",
      "&Rarrtl;": "\u2916",
      "&Rcaron;": "\u0158",
      "&Rcedil;": "\u0156",
      "&Rcy;": "\u0420",
      "&Re;": "\u211C",
      "&ReverseElement;": "\u220B",
      "&ReverseEquilibrium;": "\u21CB",
      "&ReverseUpEquilibrium;": "\u296F",
      "&Rfr;": "\u211C",
      "&Rho;": "\u03A1",
      "&RightAngleBracket;": "\u27E9",
      "&RightArrow;": "\u2192",
      "&RightArrowBar;": "\u21E5",
      "&RightArrowLeftArrow;": "\u21C4",
      "&RightCeiling;": "\u2309",
      "&RightDoubleBracket;": "\u27E7",
      "&RightDownTeeVector;": "\u295D",
      "&RightDownVector;": "\u21C2",
      "&RightDownVectorBar;": "\u2955",
      "&RightFloor;": "\u230B",
      "&RightTee;": "\u22A2",
      "&RightTeeArrow;": "\u21A6",
      "&RightTeeVector;": "\u295B",
      "&RightTriangle;": "\u22B3",
      "&RightTriangleBar;": "\u29D0",
      "&RightTriangleEqual;": "\u22B5",
      "&RightUpDownVector;": "\u294F",
      "&RightUpTeeVector;": "\u295C",
      "&RightUpVector;": "\u21BE",
      "&RightUpVectorBar;": "\u2954",
      "&RightVector;": "\u21C0",
      "&RightVectorBar;": "\u2953",
      "&Rightarrow;": "\u21D2",
      "&Ropf;": "\u211D",
      "&RoundImplies;": "\u2970",
      "&Rrightarrow;": "\u21DB",
      "&Rscr;": "\u211B",
      "&Rsh;": "\u21B1",
      "&RuleDelayed;": "\u29F4",
      "&SHCHcy;": "\u0429",
      "&SHcy;": "\u0428",
      "&SOFTcy;": "\u042C",
      "&Sacute;": "\u015A",
      "&Sc;": "\u2ABC",
      "&Scaron;": "\u0160",
      "&Scedil;": "\u015E",
      "&Scirc;": "\u015C",
      "&Scy;": "\u0421",
      "&Sfr;": "\u{1D516}",
      "&ShortDownArrow;": "\u2193",
      "&ShortLeftArrow;": "\u2190",
      "&ShortRightArrow;": "\u2192",
      "&ShortUpArrow;": "\u2191",
      "&Sigma;": "\u03A3",
      "&SmallCircle;": "\u2218",
      "&Sopf;": "\u{1D54A}",
      "&Sqrt;": "\u221A",
      "&Square;": "\u25A1",
      "&SquareIntersection;": "\u2293",
      "&SquareSubset;": "\u228F",
      "&SquareSubsetEqual;": "\u2291",
      "&SquareSuperset;": "\u2290",
      "&SquareSupersetEqual;": "\u2292",
      "&SquareUnion;": "\u2294",
      "&Sscr;": "\u{1D4AE}",
      "&Star;": "\u22C6",
      "&Sub;": "\u22D0",
      "&Subset;": "\u22D0",
      "&SubsetEqual;": "\u2286",
      "&Succeeds;": "\u227B",
      "&SucceedsEqual;": "\u2AB0",
      "&SucceedsSlantEqual;": "\u227D",
      "&SucceedsTilde;": "\u227F",
      "&SuchThat;": "\u220B",
      "&Sum;": "\u2211",
      "&Sup;": "\u22D1",
      "&Superset;": "\u2283",
      "&SupersetEqual;": "\u2287",
      "&Supset;": "\u22D1",
      "&THORN": "\xDE",
      "&THORN;": "\xDE",
      "&TRADE;": "\u2122",
      "&TSHcy;": "\u040B",
      "&TScy;": "\u0426",
      "&Tab;": "	",
      "&Tau;": "\u03A4",
      "&Tcaron;": "\u0164",
      "&Tcedil;": "\u0162",
      "&Tcy;": "\u0422",
      "&Tfr;": "\u{1D517}",
      "&Therefore;": "\u2234",
      "&Theta;": "\u0398",
      "&ThickSpace;": "\u205F\u200A",
      "&ThinSpace;": "\u2009",
      "&Tilde;": "\u223C",
      "&TildeEqual;": "\u2243",
      "&TildeFullEqual;": "\u2245",
      "&TildeTilde;": "\u2248",
      "&Topf;": "\u{1D54B}",
      "&TripleDot;": "\u20DB",
      "&Tscr;": "\u{1D4AF}",
      "&Tstrok;": "\u0166",
      "&Uacute": "\xDA",
      "&Uacute;": "\xDA",
      "&Uarr;": "\u219F",
      "&Uarrocir;": "\u2949",
      "&Ubrcy;": "\u040E",
      "&Ubreve;": "\u016C",
      "&Ucirc": "\xDB",
      "&Ucirc;": "\xDB",
      "&Ucy;": "\u0423",
      "&Udblac;": "\u0170",
      "&Ufr;": "\u{1D518}",
      "&Ugrave": "\xD9",
      "&Ugrave;": "\xD9",
      "&Umacr;": "\u016A",
      "&UnderBar;": "_",
      "&UnderBrace;": "\u23DF",
      "&UnderBracket;": "\u23B5",
      "&UnderParenthesis;": "\u23DD",
      "&Union;": "\u22C3",
      "&UnionPlus;": "\u228E",
      "&Uogon;": "\u0172",
      "&Uopf;": "\u{1D54C}",
      "&UpArrow;": "\u2191",
      "&UpArrowBar;": "\u2912",
      "&UpArrowDownArrow;": "\u21C5",
      "&UpDownArrow;": "\u2195",
      "&UpEquilibrium;": "\u296E",
      "&UpTee;": "\u22A5",
      "&UpTeeArrow;": "\u21A5",
      "&Uparrow;": "\u21D1",
      "&Updownarrow;": "\u21D5",
      "&UpperLeftArrow;": "\u2196",
      "&UpperRightArrow;": "\u2197",
      "&Upsi;": "\u03D2",
      "&Upsilon;": "\u03A5",
      "&Uring;": "\u016E",
      "&Uscr;": "\u{1D4B0}",
      "&Utilde;": "\u0168",
      "&Uuml": "\xDC",
      "&Uuml;": "\xDC",
      "&VDash;": "\u22AB",
      "&Vbar;": "\u2AEB",
      "&Vcy;": "\u0412",
      "&Vdash;": "\u22A9",
      "&Vdashl;": "\u2AE6",
      "&Vee;": "\u22C1",
      "&Verbar;": "\u2016",
      "&Vert;": "\u2016",
      "&VerticalBar;": "\u2223",
      "&VerticalLine;": "|",
      "&VerticalSeparator;": "\u2758",
      "&VerticalTilde;": "\u2240",
      "&VeryThinSpace;": "\u200A",
      "&Vfr;": "\u{1D519}",
      "&Vopf;": "\u{1D54D}",
      "&Vscr;": "\u{1D4B1}",
      "&Vvdash;": "\u22AA",
      "&Wcirc;": "\u0174",
      "&Wedge;": "\u22C0",
      "&Wfr;": "\u{1D51A}",
      "&Wopf;": "\u{1D54E}",
      "&Wscr;": "\u{1D4B2}",
      "&Xfr;": "\u{1D51B}",
      "&Xi;": "\u039E",
      "&Xopf;": "\u{1D54F}",
      "&Xscr;": "\u{1D4B3}",
      "&YAcy;": "\u042F",
      "&YIcy;": "\u0407",
      "&YUcy;": "\u042E",
      "&Yacute": "\xDD",
      "&Yacute;": "\xDD",
      "&Ycirc;": "\u0176",
      "&Ycy;": "\u042B",
      "&Yfr;": "\u{1D51C}",
      "&Yopf;": "\u{1D550}",
      "&Yscr;": "\u{1D4B4}",
      "&Yuml;": "\u0178",
      "&ZHcy;": "\u0416",
      "&Zacute;": "\u0179",
      "&Zcaron;": "\u017D",
      "&Zcy;": "\u0417",
      "&Zdot;": "\u017B",
      "&ZeroWidthSpace;": "\u200B",
      "&Zeta;": "\u0396",
      "&Zfr;": "\u2128",
      "&Zopf;": "\u2124",
      "&Zscr;": "\u{1D4B5}",
      "&aacute": "\xE1",
      "&aacute;": "\xE1",
      "&abreve;": "\u0103",
      "&ac;": "\u223E",
      "&acE;": "\u223E\u0333",
      "&acd;": "\u223F",
      "&acirc": "\xE2",
      "&acirc;": "\xE2",
      "&acute": "\xB4",
      "&acute;": "\xB4",
      "&acy;": "\u0430",
      "&aelig": "\xE6",
      "&aelig;": "\xE6",
      "&af;": "\u2061",
      "&afr;": "\u{1D51E}",
      "&agrave": "\xE0",
      "&agrave;": "\xE0",
      "&alefsym;": "\u2135",
      "&aleph;": "\u2135",
      "&alpha;": "\u03B1",
      "&amacr;": "\u0101",
      "&amalg;": "\u2A3F",
      "&amp": "&",
      "&amp;": "&",
      "&and;": "\u2227",
      "&andand;": "\u2A55",
      "&andd;": "\u2A5C",
      "&andslope;": "\u2A58",
      "&andv;": "\u2A5A",
      "&ang;": "\u2220",
      "&ange;": "\u29A4",
      "&angle;": "\u2220",
      "&angmsd;": "\u2221",
      "&angmsdaa;": "\u29A8",
      "&angmsdab;": "\u29A9",
      "&angmsdac;": "\u29AA",
      "&angmsdad;": "\u29AB",
      "&angmsdae;": "\u29AC",
      "&angmsdaf;": "\u29AD",
      "&angmsdag;": "\u29AE",
      "&angmsdah;": "\u29AF",
      "&angrt;": "\u221F",
      "&angrtvb;": "\u22BE",
      "&angrtvbd;": "\u299D",
      "&angsph;": "\u2222",
      "&angst;": "\xC5",
      "&angzarr;": "\u237C",
      "&aogon;": "\u0105",
      "&aopf;": "\u{1D552}",
      "&ap;": "\u2248",
      "&apE;": "\u2A70",
      "&apacir;": "\u2A6F",
      "&ape;": "\u224A",
      "&apid;": "\u224B",
      "&apos;": "'",
      "&approx;": "\u2248",
      "&approxeq;": "\u224A",
      "&aring": "\xE5",
      "&aring;": "\xE5",
      "&ascr;": "\u{1D4B6}",
      "&ast;": "*",
      "&asymp;": "\u2248",
      "&asympeq;": "\u224D",
      "&atilde": "\xE3",
      "&atilde;": "\xE3",
      "&auml": "\xE4",
      "&auml;": "\xE4",
      "&awconint;": "\u2233",
      "&awint;": "\u2A11",
      "&bNot;": "\u2AED",
      "&backcong;": "\u224C",
      "&backepsilon;": "\u03F6",
      "&backprime;": "\u2035",
      "&backsim;": "\u223D",
      "&backsimeq;": "\u22CD",
      "&barvee;": "\u22BD",
      "&barwed;": "\u2305",
      "&barwedge;": "\u2305",
      "&bbrk;": "\u23B5",
      "&bbrktbrk;": "\u23B6",
      "&bcong;": "\u224C",
      "&bcy;": "\u0431",
      "&bdquo;": "\u201E",
      "&becaus;": "\u2235",
      "&because;": "\u2235",
      "&bemptyv;": "\u29B0",
      "&bepsi;": "\u03F6",
      "&bernou;": "\u212C",
      "&beta;": "\u03B2",
      "&beth;": "\u2136",
      "&between;": "\u226C",
      "&bfr;": "\u{1D51F}",
      "&bigcap;": "\u22C2",
      "&bigcirc;": "\u25EF",
      "&bigcup;": "\u22C3",
      "&bigodot;": "\u2A00",
      "&bigoplus;": "\u2A01",
      "&bigotimes;": "\u2A02",
      "&bigsqcup;": "\u2A06",
      "&bigstar;": "\u2605",
      "&bigtriangledown;": "\u25BD",
      "&bigtriangleup;": "\u25B3",
      "&biguplus;": "\u2A04",
      "&bigvee;": "\u22C1",
      "&bigwedge;": "\u22C0",
      "&bkarow;": "\u290D",
      "&blacklozenge;": "\u29EB",
      "&blacksquare;": "\u25AA",
      "&blacktriangle;": "\u25B4",
      "&blacktriangledown;": "\u25BE",
      "&blacktriangleleft;": "\u25C2",
      "&blacktriangleright;": "\u25B8",
      "&blank;": "\u2423",
      "&blk12;": "\u2592",
      "&blk14;": "\u2591",
      "&blk34;": "\u2593",
      "&block;": "\u2588",
      "&bne;": "=\u20E5",
      "&bnequiv;": "\u2261\u20E5",
      "&bnot;": "\u2310",
      "&bopf;": "\u{1D553}",
      "&bot;": "\u22A5",
      "&bottom;": "\u22A5",
      "&bowtie;": "\u22C8",
      "&boxDL;": "\u2557",
      "&boxDR;": "\u2554",
      "&boxDl;": "\u2556",
      "&boxDr;": "\u2553",
      "&boxH;": "\u2550",
      "&boxHD;": "\u2566",
      "&boxHU;": "\u2569",
      "&boxHd;": "\u2564",
      "&boxHu;": "\u2567",
      "&boxUL;": "\u255D",
      "&boxUR;": "\u255A",
      "&boxUl;": "\u255C",
      "&boxUr;": "\u2559",
      "&boxV;": "\u2551",
      "&boxVH;": "\u256C",
      "&boxVL;": "\u2563",
      "&boxVR;": "\u2560",
      "&boxVh;": "\u256B",
      "&boxVl;": "\u2562",
      "&boxVr;": "\u255F",
      "&boxbox;": "\u29C9",
      "&boxdL;": "\u2555",
      "&boxdR;": "\u2552",
      "&boxdl;": "\u2510",
      "&boxdr;": "\u250C",
      "&boxh;": "\u2500",
      "&boxhD;": "\u2565",
      "&boxhU;": "\u2568",
      "&boxhd;": "\u252C",
      "&boxhu;": "\u2534",
      "&boxminus;": "\u229F",
      "&boxplus;": "\u229E",
      "&boxtimes;": "\u22A0",
      "&boxuL;": "\u255B",
      "&boxuR;": "\u2558",
      "&boxul;": "\u2518",
      "&boxur;": "\u2514",
      "&boxv;": "\u2502",
      "&boxvH;": "\u256A",
      "&boxvL;": "\u2561",
      "&boxvR;": "\u255E",
      "&boxvh;": "\u253C",
      "&boxvl;": "\u2524",
      "&boxvr;": "\u251C",
      "&bprime;": "\u2035",
      "&breve;": "\u02D8",
      "&brvbar": "\xA6",
      "&brvbar;": "\xA6",
      "&bscr;": "\u{1D4B7}",
      "&bsemi;": "\u204F",
      "&bsim;": "\u223D",
      "&bsime;": "\u22CD",
      "&bsol;": "\\",
      "&bsolb;": "\u29C5",
      "&bsolhsub;": "\u27C8",
      "&bull;": "\u2022",
      "&bullet;": "\u2022",
      "&bump;": "\u224E",
      "&bumpE;": "\u2AAE",
      "&bumpe;": "\u224F",
      "&bumpeq;": "\u224F",
      "&cacute;": "\u0107",
      "&cap;": "\u2229",
      "&capand;": "\u2A44",
      "&capbrcup;": "\u2A49",
      "&capcap;": "\u2A4B",
      "&capcup;": "\u2A47",
      "&capdot;": "\u2A40",
      "&caps;": "\u2229\uFE00",
      "&caret;": "\u2041",
      "&caron;": "\u02C7",
      "&ccaps;": "\u2A4D",
      "&ccaron;": "\u010D",
      "&ccedil": "\xE7",
      "&ccedil;": "\xE7",
      "&ccirc;": "\u0109",
      "&ccups;": "\u2A4C",
      "&ccupssm;": "\u2A50",
      "&cdot;": "\u010B",
      "&cedil": "\xB8",
      "&cedil;": "\xB8",
      "&cemptyv;": "\u29B2",
      "&cent": "\xA2",
      "&cent;": "\xA2",
      "&centerdot;": "\xB7",
      "&cfr;": "\u{1D520}",
      "&chcy;": "\u0447",
      "&check;": "\u2713",
      "&checkmark;": "\u2713",
      "&chi;": "\u03C7",
      "&cir;": "\u25CB",
      "&cirE;": "\u29C3",
      "&circ;": "\u02C6",
      "&circeq;": "\u2257",
      "&circlearrowleft;": "\u21BA",
      "&circlearrowright;": "\u21BB",
      "&circledR;": "\xAE",
      "&circledS;": "\u24C8",
      "&circledast;": "\u229B",
      "&circledcirc;": "\u229A",
      "&circleddash;": "\u229D",
      "&cire;": "\u2257",
      "&cirfnint;": "\u2A10",
      "&cirmid;": "\u2AEF",
      "&cirscir;": "\u29C2",
      "&clubs;": "\u2663",
      "&clubsuit;": "\u2663",
      "&colon;": ":",
      "&colone;": "\u2254",
      "&coloneq;": "\u2254",
      "&comma;": ",",
      "&commat;": "@",
      "&comp;": "\u2201",
      "&compfn;": "\u2218",
      "&complement;": "\u2201",
      "&complexes;": "\u2102",
      "&cong;": "\u2245",
      "&congdot;": "\u2A6D",
      "&conint;": "\u222E",
      "&copf;": "\u{1D554}",
      "&coprod;": "\u2210",
      "&copy": "\xA9",
      "&copy;": "\xA9",
      "&copysr;": "\u2117",
      "&crarr;": "\u21B5",
      "&cross;": "\u2717",
      "&cscr;": "\u{1D4B8}",
      "&csub;": "\u2ACF",
      "&csube;": "\u2AD1",
      "&csup;": "\u2AD0",
      "&csupe;": "\u2AD2",
      "&ctdot;": "\u22EF",
      "&cudarrl;": "\u2938",
      "&cudarrr;": "\u2935",
      "&cuepr;": "\u22DE",
      "&cuesc;": "\u22DF",
      "&cularr;": "\u21B6",
      "&cularrp;": "\u293D",
      "&cup;": "\u222A",
      "&cupbrcap;": "\u2A48",
      "&cupcap;": "\u2A46",
      "&cupcup;": "\u2A4A",
      "&cupdot;": "\u228D",
      "&cupor;": "\u2A45",
      "&cups;": "\u222A\uFE00",
      "&curarr;": "\u21B7",
      "&curarrm;": "\u293C",
      "&curlyeqprec;": "\u22DE",
      "&curlyeqsucc;": "\u22DF",
      "&curlyvee;": "\u22CE",
      "&curlywedge;": "\u22CF",
      "&curren": "\xA4",
      "&curren;": "\xA4",
      "&curvearrowleft;": "\u21B6",
      "&curvearrowright;": "\u21B7",
      "&cuvee;": "\u22CE",
      "&cuwed;": "\u22CF",
      "&cwconint;": "\u2232",
      "&cwint;": "\u2231",
      "&cylcty;": "\u232D",
      "&dArr;": "\u21D3",
      "&dHar;": "\u2965",
      "&dagger;": "\u2020",
      "&daleth;": "\u2138",
      "&darr;": "\u2193",
      "&dash;": "\u2010",
      "&dashv;": "\u22A3",
      "&dbkarow;": "\u290F",
      "&dblac;": "\u02DD",
      "&dcaron;": "\u010F",
      "&dcy;": "\u0434",
      "&dd;": "\u2146",
      "&ddagger;": "\u2021",
      "&ddarr;": "\u21CA",
      "&ddotseq;": "\u2A77",
      "&deg": "\xB0",
      "&deg;": "\xB0",
      "&delta;": "\u03B4",
      "&demptyv;": "\u29B1",
      "&dfisht;": "\u297F",
      "&dfr;": "\u{1D521}",
      "&dharl;": "\u21C3",
      "&dharr;": "\u21C2",
      "&diam;": "\u22C4",
      "&diamond;": "\u22C4",
      "&diamondsuit;": "\u2666",
      "&diams;": "\u2666",
      "&die;": "\xA8",
      "&digamma;": "\u03DD",
      "&disin;": "\u22F2",
      "&div;": "\xF7",
      "&divide": "\xF7",
      "&divide;": "\xF7",
      "&divideontimes;": "\u22C7",
      "&divonx;": "\u22C7",
      "&djcy;": "\u0452",
      "&dlcorn;": "\u231E",
      "&dlcrop;": "\u230D",
      "&dollar;": "$",
      "&dopf;": "\u{1D555}",
      "&dot;": "\u02D9",
      "&doteq;": "\u2250",
      "&doteqdot;": "\u2251",
      "&dotminus;": "\u2238",
      "&dotplus;": "\u2214",
      "&dotsquare;": "\u22A1",
      "&doublebarwedge;": "\u2306",
      "&downarrow;": "\u2193",
      "&downdownarrows;": "\u21CA",
      "&downharpoonleft;": "\u21C3",
      "&downharpoonright;": "\u21C2",
      "&drbkarow;": "\u2910",
      "&drcorn;": "\u231F",
      "&drcrop;": "\u230C",
      "&dscr;": "\u{1D4B9}",
      "&dscy;": "\u0455",
      "&dsol;": "\u29F6",
      "&dstrok;": "\u0111",
      "&dtdot;": "\u22F1",
      "&dtri;": "\u25BF",
      "&dtrif;": "\u25BE",
      "&duarr;": "\u21F5",
      "&duhar;": "\u296F",
      "&dwangle;": "\u29A6",
      "&dzcy;": "\u045F",
      "&dzigrarr;": "\u27FF",
      "&eDDot;": "\u2A77",
      "&eDot;": "\u2251",
      "&eacute": "\xE9",
      "&eacute;": "\xE9",
      "&easter;": "\u2A6E",
      "&ecaron;": "\u011B",
      "&ecir;": "\u2256",
      "&ecirc": "\xEA",
      "&ecirc;": "\xEA",
      "&ecolon;": "\u2255",
      "&ecy;": "\u044D",
      "&edot;": "\u0117",
      "&ee;": "\u2147",
      "&efDot;": "\u2252",
      "&efr;": "\u{1D522}",
      "&eg;": "\u2A9A",
      "&egrave": "\xE8",
      "&egrave;": "\xE8",
      "&egs;": "\u2A96",
      "&egsdot;": "\u2A98",
      "&el;": "\u2A99",
      "&elinters;": "\u23E7",
      "&ell;": "\u2113",
      "&els;": "\u2A95",
      "&elsdot;": "\u2A97",
      "&emacr;": "\u0113",
      "&empty;": "\u2205",
      "&emptyset;": "\u2205",
      "&emptyv;": "\u2205",
      "&emsp13;": "\u2004",
      "&emsp14;": "\u2005",
      "&emsp;": "\u2003",
      "&eng;": "\u014B",
      "&ensp;": "\u2002",
      "&eogon;": "\u0119",
      "&eopf;": "\u{1D556}",
      "&epar;": "\u22D5",
      "&eparsl;": "\u29E3",
      "&eplus;": "\u2A71",
      "&epsi;": "\u03B5",
      "&epsilon;": "\u03B5",
      "&epsiv;": "\u03F5",
      "&eqcirc;": "\u2256",
      "&eqcolon;": "\u2255",
      "&eqsim;": "\u2242",
      "&eqslantgtr;": "\u2A96",
      "&eqslantless;": "\u2A95",
      "&equals;": "=",
      "&equest;": "\u225F",
      "&equiv;": "\u2261",
      "&equivDD;": "\u2A78",
      "&eqvparsl;": "\u29E5",
      "&erDot;": "\u2253",
      "&erarr;": "\u2971",
      "&escr;": "\u212F",
      "&esdot;": "\u2250",
      "&esim;": "\u2242",
      "&eta;": "\u03B7",
      "&eth": "\xF0",
      "&eth;": "\xF0",
      "&euml": "\xEB",
      "&euml;": "\xEB",
      "&euro;": "\u20AC",
      "&excl;": "!",
      "&exist;": "\u2203",
      "&expectation;": "\u2130",
      "&exponentiale;": "\u2147",
      "&fallingdotseq;": "\u2252",
      "&fcy;": "\u0444",
      "&female;": "\u2640",
      "&ffilig;": "\uFB03",
      "&fflig;": "\uFB00",
      "&ffllig;": "\uFB04",
      "&ffr;": "\u{1D523}",
      "&filig;": "\uFB01",
      "&fjlig;": "fj",
      "&flat;": "\u266D",
      "&fllig;": "\uFB02",
      "&fltns;": "\u25B1",
      "&fnof;": "\u0192",
      "&fopf;": "\u{1D557}",
      "&forall;": "\u2200",
      "&fork;": "\u22D4",
      "&forkv;": "\u2AD9",
      "&fpartint;": "\u2A0D",
      "&frac12": "\xBD",
      "&frac12;": "\xBD",
      "&frac13;": "\u2153",
      "&frac14": "\xBC",
      "&frac14;": "\xBC",
      "&frac15;": "\u2155",
      "&frac16;": "\u2159",
      "&frac18;": "\u215B",
      "&frac23;": "\u2154",
      "&frac25;": "\u2156",
      "&frac34": "\xBE",
      "&frac34;": "\xBE",
      "&frac35;": "\u2157",
      "&frac38;": "\u215C",
      "&frac45;": "\u2158",
      "&frac56;": "\u215A",
      "&frac58;": "\u215D",
      "&frac78;": "\u215E",
      "&frasl;": "\u2044",
      "&frown;": "\u2322",
      "&fscr;": "\u{1D4BB}",
      "&gE;": "\u2267",
      "&gEl;": "\u2A8C",
      "&gacute;": "\u01F5",
      "&gamma;": "\u03B3",
      "&gammad;": "\u03DD",
      "&gap;": "\u2A86",
      "&gbreve;": "\u011F",
      "&gcirc;": "\u011D",
      "&gcy;": "\u0433",
      "&gdot;": "\u0121",
      "&ge;": "\u2265",
      "&gel;": "\u22DB",
      "&geq;": "\u2265",
      "&geqq;": "\u2267",
      "&geqslant;": "\u2A7E",
      "&ges;": "\u2A7E",
      "&gescc;": "\u2AA9",
      "&gesdot;": "\u2A80",
      "&gesdoto;": "\u2A82",
      "&gesdotol;": "\u2A84",
      "&gesl;": "\u22DB\uFE00",
      "&gesles;": "\u2A94",
      "&gfr;": "\u{1D524}",
      "&gg;": "\u226B",
      "&ggg;": "\u22D9",
      "&gimel;": "\u2137",
      "&gjcy;": "\u0453",
      "&gl;": "\u2277",
      "&glE;": "\u2A92",
      "&gla;": "\u2AA5",
      "&glj;": "\u2AA4",
      "&gnE;": "\u2269",
      "&gnap;": "\u2A8A",
      "&gnapprox;": "\u2A8A",
      "&gne;": "\u2A88",
      "&gneq;": "\u2A88",
      "&gneqq;": "\u2269",
      "&gnsim;": "\u22E7",
      "&gopf;": "\u{1D558}",
      "&grave;": "`",
      "&gscr;": "\u210A",
      "&gsim;": "\u2273",
      "&gsime;": "\u2A8E",
      "&gsiml;": "\u2A90",
      "&gt": ">",
      "&gt;": ">",
      "&gtcc;": "\u2AA7",
      "&gtcir;": "\u2A7A",
      "&gtdot;": "\u22D7",
      "&gtlPar;": "\u2995",
      "&gtquest;": "\u2A7C",
      "&gtrapprox;": "\u2A86",
      "&gtrarr;": "\u2978",
      "&gtrdot;": "\u22D7",
      "&gtreqless;": "\u22DB",
      "&gtreqqless;": "\u2A8C",
      "&gtrless;": "\u2277",
      "&gtrsim;": "\u2273",
      "&gvertneqq;": "\u2269\uFE00",
      "&gvnE;": "\u2269\uFE00",
      "&hArr;": "\u21D4",
      "&hairsp;": "\u200A",
      "&half;": "\xBD",
      "&hamilt;": "\u210B",
      "&hardcy;": "\u044A",
      "&harr;": "\u2194",
      "&harrcir;": "\u2948",
      "&harrw;": "\u21AD",
      "&hbar;": "\u210F",
      "&hcirc;": "\u0125",
      "&hearts;": "\u2665",
      "&heartsuit;": "\u2665",
      "&hellip;": "\u2026",
      "&hercon;": "\u22B9",
      "&hfr;": "\u{1D525}",
      "&hksearow;": "\u2925",
      "&hkswarow;": "\u2926",
      "&hoarr;": "\u21FF",
      "&homtht;": "\u223B",
      "&hookleftarrow;": "\u21A9",
      "&hookrightarrow;": "\u21AA",
      "&hopf;": "\u{1D559}",
      "&horbar;": "\u2015",
      "&hscr;": "\u{1D4BD}",
      "&hslash;": "\u210F",
      "&hstrok;": "\u0127",
      "&hybull;": "\u2043",
      "&hyphen;": "\u2010",
      "&iacute": "\xED",
      "&iacute;": "\xED",
      "&ic;": "\u2063",
      "&icirc": "\xEE",
      "&icirc;": "\xEE",
      "&icy;": "\u0438",
      "&iecy;": "\u0435",
      "&iexcl": "\xA1",
      "&iexcl;": "\xA1",
      "&iff;": "\u21D4",
      "&ifr;": "\u{1D526}",
      "&igrave": "\xEC",
      "&igrave;": "\xEC",
      "&ii;": "\u2148",
      "&iiiint;": "\u2A0C",
      "&iiint;": "\u222D",
      "&iinfin;": "\u29DC",
      "&iiota;": "\u2129",
      "&ijlig;": "\u0133",
      "&imacr;": "\u012B",
      "&image;": "\u2111",
      "&imagline;": "\u2110",
      "&imagpart;": "\u2111",
      "&imath;": "\u0131",
      "&imof;": "\u22B7",
      "&imped;": "\u01B5",
      "&in;": "\u2208",
      "&incare;": "\u2105",
      "&infin;": "\u221E",
      "&infintie;": "\u29DD",
      "&inodot;": "\u0131",
      "&int;": "\u222B",
      "&intcal;": "\u22BA",
      "&integers;": "\u2124",
      "&intercal;": "\u22BA",
      "&intlarhk;": "\u2A17",
      "&intprod;": "\u2A3C",
      "&iocy;": "\u0451",
      "&iogon;": "\u012F",
      "&iopf;": "\u{1D55A}",
      "&iota;": "\u03B9",
      "&iprod;": "\u2A3C",
      "&iquest": "\xBF",
      "&iquest;": "\xBF",
      "&iscr;": "\u{1D4BE}",
      "&isin;": "\u2208",
      "&isinE;": "\u22F9",
      "&isindot;": "\u22F5",
      "&isins;": "\u22F4",
      "&isinsv;": "\u22F3",
      "&isinv;": "\u2208",
      "&it;": "\u2062",
      "&itilde;": "\u0129",
      "&iukcy;": "\u0456",
      "&iuml": "\xEF",
      "&iuml;": "\xEF",
      "&jcirc;": "\u0135",
      "&jcy;": "\u0439",
      "&jfr;": "\u{1D527}",
      "&jmath;": "\u0237",
      "&jopf;": "\u{1D55B}",
      "&jscr;": "\u{1D4BF}",
      "&jsercy;": "\u0458",
      "&jukcy;": "\u0454",
      "&kappa;": "\u03BA",
      "&kappav;": "\u03F0",
      "&kcedil;": "\u0137",
      "&kcy;": "\u043A",
      "&kfr;": "\u{1D528}",
      "&kgreen;": "\u0138",
      "&khcy;": "\u0445",
      "&kjcy;": "\u045C",
      "&kopf;": "\u{1D55C}",
      "&kscr;": "\u{1D4C0}",
      "&lAarr;": "\u21DA",
      "&lArr;": "\u21D0",
      "&lAtail;": "\u291B",
      "&lBarr;": "\u290E",
      "&lE;": "\u2266",
      "&lEg;": "\u2A8B",
      "&lHar;": "\u2962",
      "&lacute;": "\u013A",
      "&laemptyv;": "\u29B4",
      "&lagran;": "\u2112",
      "&lambda;": "\u03BB",
      "&lang;": "\u27E8",
      "&langd;": "\u2991",
      "&langle;": "\u27E8",
      "&lap;": "\u2A85",
      "&laquo": "\xAB",
      "&laquo;": "\xAB",
      "&larr;": "\u2190",
      "&larrb;": "\u21E4",
      "&larrbfs;": "\u291F",
      "&larrfs;": "\u291D",
      "&larrhk;": "\u21A9",
      "&larrlp;": "\u21AB",
      "&larrpl;": "\u2939",
      "&larrsim;": "\u2973",
      "&larrtl;": "\u21A2",
      "&lat;": "\u2AAB",
      "&latail;": "\u2919",
      "&late;": "\u2AAD",
      "&lates;": "\u2AAD\uFE00",
      "&lbarr;": "\u290C",
      "&lbbrk;": "\u2772",
      "&lbrace;": "{",
      "&lbrack;": "[",
      "&lbrke;": "\u298B",
      "&lbrksld;": "\u298F",
      "&lbrkslu;": "\u298D",
      "&lcaron;": "\u013E",
      "&lcedil;": "\u013C",
      "&lceil;": "\u2308",
      "&lcub;": "{",
      "&lcy;": "\u043B",
      "&ldca;": "\u2936",
      "&ldquo;": "\u201C",
      "&ldquor;": "\u201E",
      "&ldrdhar;": "\u2967",
      "&ldrushar;": "\u294B",
      "&ldsh;": "\u21B2",
      "&le;": "\u2264",
      "&leftarrow;": "\u2190",
      "&leftarrowtail;": "\u21A2",
      "&leftharpoondown;": "\u21BD",
      "&leftharpoonup;": "\u21BC",
      "&leftleftarrows;": "\u21C7",
      "&leftrightarrow;": "\u2194",
      "&leftrightarrows;": "\u21C6",
      "&leftrightharpoons;": "\u21CB",
      "&leftrightsquigarrow;": "\u21AD",
      "&leftthreetimes;": "\u22CB",
      "&leg;": "\u22DA",
      "&leq;": "\u2264",
      "&leqq;": "\u2266",
      "&leqslant;": "\u2A7D",
      "&les;": "\u2A7D",
      "&lescc;": "\u2AA8",
      "&lesdot;": "\u2A7F",
      "&lesdoto;": "\u2A81",
      "&lesdotor;": "\u2A83",
      "&lesg;": "\u22DA\uFE00",
      "&lesges;": "\u2A93",
      "&lessapprox;": "\u2A85",
      "&lessdot;": "\u22D6",
      "&lesseqgtr;": "\u22DA",
      "&lesseqqgtr;": "\u2A8B",
      "&lessgtr;": "\u2276",
      "&lesssim;": "\u2272",
      "&lfisht;": "\u297C",
      "&lfloor;": "\u230A",
      "&lfr;": "\u{1D529}",
      "&lg;": "\u2276",
      "&lgE;": "\u2A91",
      "&lhard;": "\u21BD",
      "&lharu;": "\u21BC",
      "&lharul;": "\u296A",
      "&lhblk;": "\u2584",
      "&ljcy;": "\u0459",
      "&ll;": "\u226A",
      "&llarr;": "\u21C7",
      "&llcorner;": "\u231E",
      "&llhard;": "\u296B",
      "&lltri;": "\u25FA",
      "&lmidot;": "\u0140",
      "&lmoust;": "\u23B0",
      "&lmoustache;": "\u23B0",
      "&lnE;": "\u2268",
      "&lnap;": "\u2A89",
      "&lnapprox;": "\u2A89",
      "&lne;": "\u2A87",
      "&lneq;": "\u2A87",
      "&lneqq;": "\u2268",
      "&lnsim;": "\u22E6",
      "&loang;": "\u27EC",
      "&loarr;": "\u21FD",
      "&lobrk;": "\u27E6",
      "&longleftarrow;": "\u27F5",
      "&longleftrightarrow;": "\u27F7",
      "&longmapsto;": "\u27FC",
      "&longrightarrow;": "\u27F6",
      "&looparrowleft;": "\u21AB",
      "&looparrowright;": "\u21AC",
      "&lopar;": "\u2985",
      "&lopf;": "\u{1D55D}",
      "&loplus;": "\u2A2D",
      "&lotimes;": "\u2A34",
      "&lowast;": "\u2217",
      "&lowbar;": "_",
      "&loz;": "\u25CA",
      "&lozenge;": "\u25CA",
      "&lozf;": "\u29EB",
      "&lpar;": "(",
      "&lparlt;": "\u2993",
      "&lrarr;": "\u21C6",
      "&lrcorner;": "\u231F",
      "&lrhar;": "\u21CB",
      "&lrhard;": "\u296D",
      "&lrm;": "\u200E",
      "&lrtri;": "\u22BF",
      "&lsaquo;": "\u2039",
      "&lscr;": "\u{1D4C1}",
      "&lsh;": "\u21B0",
      "&lsim;": "\u2272",
      "&lsime;": "\u2A8D",
      "&lsimg;": "\u2A8F",
      "&lsqb;": "[",
      "&lsquo;": "\u2018",
      "&lsquor;": "\u201A",
      "&lstrok;": "\u0142",
      "&lt": "<",
      "&lt;": "<",
      "&ltcc;": "\u2AA6",
      "&ltcir;": "\u2A79",
      "&ltdot;": "\u22D6",
      "&lthree;": "\u22CB",
      "&ltimes;": "\u22C9",
      "&ltlarr;": "\u2976",
      "&ltquest;": "\u2A7B",
      "&ltrPar;": "\u2996",
      "&ltri;": "\u25C3",
      "&ltrie;": "\u22B4",
      "&ltrif;": "\u25C2",
      "&lurdshar;": "\u294A",
      "&luruhar;": "\u2966",
      "&lvertneqq;": "\u2268\uFE00",
      "&lvnE;": "\u2268\uFE00",
      "&mDDot;": "\u223A",
      "&macr": "\xAF",
      "&macr;": "\xAF",
      "&male;": "\u2642",
      "&malt;": "\u2720",
      "&maltese;": "\u2720",
      "&map;": "\u21A6",
      "&mapsto;": "\u21A6",
      "&mapstodown;": "\u21A7",
      "&mapstoleft;": "\u21A4",
      "&mapstoup;": "\u21A5",
      "&marker;": "\u25AE",
      "&mcomma;": "\u2A29",
      "&mcy;": "\u043C",
      "&mdash;": "\u2014",
      "&measuredangle;": "\u2221",
      "&mfr;": "\u{1D52A}",
      "&mho;": "\u2127",
      "&micro": "\xB5",
      "&micro;": "\xB5",
      "&mid;": "\u2223",
      "&midast;": "*",
      "&midcir;": "\u2AF0",
      "&middot": "\xB7",
      "&middot;": "\xB7",
      "&minus;": "\u2212",
      "&minusb;": "\u229F",
      "&minusd;": "\u2238",
      "&minusdu;": "\u2A2A",
      "&mlcp;": "\u2ADB",
      "&mldr;": "\u2026",
      "&mnplus;": "\u2213",
      "&models;": "\u22A7",
      "&mopf;": "\u{1D55E}",
      "&mp;": "\u2213",
      "&mscr;": "\u{1D4C2}",
      "&mstpos;": "\u223E",
      "&mu;": "\u03BC",
      "&multimap;": "\u22B8",
      "&mumap;": "\u22B8",
      "&nGg;": "\u22D9\u0338",
      "&nGt;": "\u226B\u20D2",
      "&nGtv;": "\u226B\u0338",
      "&nLeftarrow;": "\u21CD",
      "&nLeftrightarrow;": "\u21CE",
      "&nLl;": "\u22D8\u0338",
      "&nLt;": "\u226A\u20D2",
      "&nLtv;": "\u226A\u0338",
      "&nRightarrow;": "\u21CF",
      "&nVDash;": "\u22AF",
      "&nVdash;": "\u22AE",
      "&nabla;": "\u2207",
      "&nacute;": "\u0144",
      "&nang;": "\u2220\u20D2",
      "&nap;": "\u2249",
      "&napE;": "\u2A70\u0338",
      "&napid;": "\u224B\u0338",
      "&napos;": "\u0149",
      "&napprox;": "\u2249",
      "&natur;": "\u266E",
      "&natural;": "\u266E",
      "&naturals;": "\u2115",
      "&nbsp": "\xA0",
      "&nbsp;": "\xA0",
      "&nbump;": "\u224E\u0338",
      "&nbumpe;": "\u224F\u0338",
      "&ncap;": "\u2A43",
      "&ncaron;": "\u0148",
      "&ncedil;": "\u0146",
      "&ncong;": "\u2247",
      "&ncongdot;": "\u2A6D\u0338",
      "&ncup;": "\u2A42",
      "&ncy;": "\u043D",
      "&ndash;": "\u2013",
      "&ne;": "\u2260",
      "&neArr;": "\u21D7",
      "&nearhk;": "\u2924",
      "&nearr;": "\u2197",
      "&nearrow;": "\u2197",
      "&nedot;": "\u2250\u0338",
      "&nequiv;": "\u2262",
      "&nesear;": "\u2928",
      "&nesim;": "\u2242\u0338",
      "&nexist;": "\u2204",
      "&nexists;": "\u2204",
      "&nfr;": "\u{1D52B}",
      "&ngE;": "\u2267\u0338",
      "&nge;": "\u2271",
      "&ngeq;": "\u2271",
      "&ngeqq;": "\u2267\u0338",
      "&ngeqslant;": "\u2A7E\u0338",
      "&nges;": "\u2A7E\u0338",
      "&ngsim;": "\u2275",
      "&ngt;": "\u226F",
      "&ngtr;": "\u226F",
      "&nhArr;": "\u21CE",
      "&nharr;": "\u21AE",
      "&nhpar;": "\u2AF2",
      "&ni;": "\u220B",
      "&nis;": "\u22FC",
      "&nisd;": "\u22FA",
      "&niv;": "\u220B",
      "&njcy;": "\u045A",
      "&nlArr;": "\u21CD",
      "&nlE;": "\u2266\u0338",
      "&nlarr;": "\u219A",
      "&nldr;": "\u2025",
      "&nle;": "\u2270",
      "&nleftarrow;": "\u219A",
      "&nleftrightarrow;": "\u21AE",
      "&nleq;": "\u2270",
      "&nleqq;": "\u2266\u0338",
      "&nleqslant;": "\u2A7D\u0338",
      "&nles;": "\u2A7D\u0338",
      "&nless;": "\u226E",
      "&nlsim;": "\u2274",
      "&nlt;": "\u226E",
      "&nltri;": "\u22EA",
      "&nltrie;": "\u22EC",
      "&nmid;": "\u2224",
      "&nopf;": "\u{1D55F}",
      "&not": "\xAC",
      "&not;": "\xAC",
      "&notin;": "\u2209",
      "&notinE;": "\u22F9\u0338",
      "&notindot;": "\u22F5\u0338",
      "&notinva;": "\u2209",
      "&notinvb;": "\u22F7",
      "&notinvc;": "\u22F6",
      "&notni;": "\u220C",
      "&notniva;": "\u220C",
      "&notnivb;": "\u22FE",
      "&notnivc;": "\u22FD",
      "&npar;": "\u2226",
      "&nparallel;": "\u2226",
      "&nparsl;": "\u2AFD\u20E5",
      "&npart;": "\u2202\u0338",
      "&npolint;": "\u2A14",
      "&npr;": "\u2280",
      "&nprcue;": "\u22E0",
      "&npre;": "\u2AAF\u0338",
      "&nprec;": "\u2280",
      "&npreceq;": "\u2AAF\u0338",
      "&nrArr;": "\u21CF",
      "&nrarr;": "\u219B",
      "&nrarrc;": "\u2933\u0338",
      "&nrarrw;": "\u219D\u0338",
      "&nrightarrow;": "\u219B",
      "&nrtri;": "\u22EB",
      "&nrtrie;": "\u22ED",
      "&nsc;": "\u2281",
      "&nsccue;": "\u22E1",
      "&nsce;": "\u2AB0\u0338",
      "&nscr;": "\u{1D4C3}",
      "&nshortmid;": "\u2224",
      "&nshortparallel;": "\u2226",
      "&nsim;": "\u2241",
      "&nsime;": "\u2244",
      "&nsimeq;": "\u2244",
      "&nsmid;": "\u2224",
      "&nspar;": "\u2226",
      "&nsqsube;": "\u22E2",
      "&nsqsupe;": "\u22E3",
      "&nsub;": "\u2284",
      "&nsubE;": "\u2AC5\u0338",
      "&nsube;": "\u2288",
      "&nsubset;": "\u2282\u20D2",
      "&nsubseteq;": "\u2288",
      "&nsubseteqq;": "\u2AC5\u0338",
      "&nsucc;": "\u2281",
      "&nsucceq;": "\u2AB0\u0338",
      "&nsup;": "\u2285",
      "&nsupE;": "\u2AC6\u0338",
      "&nsupe;": "\u2289",
      "&nsupset;": "\u2283\u20D2",
      "&nsupseteq;": "\u2289",
      "&nsupseteqq;": "\u2AC6\u0338",
      "&ntgl;": "\u2279",
      "&ntilde": "\xF1",
      "&ntilde;": "\xF1",
      "&ntlg;": "\u2278",
      "&ntriangleleft;": "\u22EA",
      "&ntrianglelefteq;": "\u22EC",
      "&ntriangleright;": "\u22EB",
      "&ntrianglerighteq;": "\u22ED",
      "&nu;": "\u03BD",
      "&num;": "#",
      "&numero;": "\u2116",
      "&numsp;": "\u2007",
      "&nvDash;": "\u22AD",
      "&nvHarr;": "\u2904",
      "&nvap;": "\u224D\u20D2",
      "&nvdash;": "\u22AC",
      "&nvge;": "\u2265\u20D2",
      "&nvgt;": ">\u20D2",
      "&nvinfin;": "\u29DE",
      "&nvlArr;": "\u2902",
      "&nvle;": "\u2264\u20D2",
      "&nvlt;": "<\u20D2",
      "&nvltrie;": "\u22B4\u20D2",
      "&nvrArr;": "\u2903",
      "&nvrtrie;": "\u22B5\u20D2",
      "&nvsim;": "\u223C\u20D2",
      "&nwArr;": "\u21D6",
      "&nwarhk;": "\u2923",
      "&nwarr;": "\u2196",
      "&nwarrow;": "\u2196",
      "&nwnear;": "\u2927",
      "&oS;": "\u24C8",
      "&oacute": "\xF3",
      "&oacute;": "\xF3",
      "&oast;": "\u229B",
      "&ocir;": "\u229A",
      "&ocirc": "\xF4",
      "&ocirc;": "\xF4",
      "&ocy;": "\u043E",
      "&odash;": "\u229D",
      "&odblac;": "\u0151",
      "&odiv;": "\u2A38",
      "&odot;": "\u2299",
      "&odsold;": "\u29BC",
      "&oelig;": "\u0153",
      "&ofcir;": "\u29BF",
      "&ofr;": "\u{1D52C}",
      "&ogon;": "\u02DB",
      "&ograve": "\xF2",
      "&ograve;": "\xF2",
      "&ogt;": "\u29C1",
      "&ohbar;": "\u29B5",
      "&ohm;": "\u03A9",
      "&oint;": "\u222E",
      "&olarr;": "\u21BA",
      "&olcir;": "\u29BE",
      "&olcross;": "\u29BB",
      "&oline;": "\u203E",
      "&olt;": "\u29C0",
      "&omacr;": "\u014D",
      "&omega;": "\u03C9",
      "&omicron;": "\u03BF",
      "&omid;": "\u29B6",
      "&ominus;": "\u2296",
      "&oopf;": "\u{1D560}",
      "&opar;": "\u29B7",
      "&operp;": "\u29B9",
      "&oplus;": "\u2295",
      "&or;": "\u2228",
      "&orarr;": "\u21BB",
      "&ord;": "\u2A5D",
      "&order;": "\u2134",
      "&orderof;": "\u2134",
      "&ordf": "\xAA",
      "&ordf;": "\xAA",
      "&ordm": "\xBA",
      "&ordm;": "\xBA",
      "&origof;": "\u22B6",
      "&oror;": "\u2A56",
      "&orslope;": "\u2A57",
      "&orv;": "\u2A5B",
      "&oscr;": "\u2134",
      "&oslash": "\xF8",
      "&oslash;": "\xF8",
      "&osol;": "\u2298",
      "&otilde": "\xF5",
      "&otilde;": "\xF5",
      "&otimes;": "\u2297",
      "&otimesas;": "\u2A36",
      "&ouml": "\xF6",
      "&ouml;": "\xF6",
      "&ovbar;": "\u233D",
      "&par;": "\u2225",
      "&para": "\xB6",
      "&para;": "\xB6",
      "&parallel;": "\u2225",
      "&parsim;": "\u2AF3",
      "&parsl;": "\u2AFD",
      "&part;": "\u2202",
      "&pcy;": "\u043F",
      "&percnt;": "%",
      "&period;": ".",
      "&permil;": "\u2030",
      "&perp;": "\u22A5",
      "&pertenk;": "\u2031",
      "&pfr;": "\u{1D52D}",
      "&phi;": "\u03C6",
      "&phiv;": "\u03D5",
      "&phmmat;": "\u2133",
      "&phone;": "\u260E",
      "&pi;": "\u03C0",
      "&pitchfork;": "\u22D4",
      "&piv;": "\u03D6",
      "&planck;": "\u210F",
      "&planckh;": "\u210E",
      "&plankv;": "\u210F",
      "&plus;": "+",
      "&plusacir;": "\u2A23",
      "&plusb;": "\u229E",
      "&pluscir;": "\u2A22",
      "&plusdo;": "\u2214",
      "&plusdu;": "\u2A25",
      "&pluse;": "\u2A72",
      "&plusmn": "\xB1",
      "&plusmn;": "\xB1",
      "&plussim;": "\u2A26",
      "&plustwo;": "\u2A27",
      "&pm;": "\xB1",
      "&pointint;": "\u2A15",
      "&popf;": "\u{1D561}",
      "&pound": "\xA3",
      "&pound;": "\xA3",
      "&pr;": "\u227A",
      "&prE;": "\u2AB3",
      "&prap;": "\u2AB7",
      "&prcue;": "\u227C",
      "&pre;": "\u2AAF",
      "&prec;": "\u227A",
      "&precapprox;": "\u2AB7",
      "&preccurlyeq;": "\u227C",
      "&preceq;": "\u2AAF",
      "&precnapprox;": "\u2AB9",
      "&precneqq;": "\u2AB5",
      "&precnsim;": "\u22E8",
      "&precsim;": "\u227E",
      "&prime;": "\u2032",
      "&primes;": "\u2119",
      "&prnE;": "\u2AB5",
      "&prnap;": "\u2AB9",
      "&prnsim;": "\u22E8",
      "&prod;": "\u220F",
      "&profalar;": "\u232E",
      "&profline;": "\u2312",
      "&profsurf;": "\u2313",
      "&prop;": "\u221D",
      "&propto;": "\u221D",
      "&prsim;": "\u227E",
      "&prurel;": "\u22B0",
      "&pscr;": "\u{1D4C5}",
      "&psi;": "\u03C8",
      "&puncsp;": "\u2008",
      "&qfr;": "\u{1D52E}",
      "&qint;": "\u2A0C",
      "&qopf;": "\u{1D562}",
      "&qprime;": "\u2057",
      "&qscr;": "\u{1D4C6}",
      "&quaternions;": "\u210D",
      "&quatint;": "\u2A16",
      "&quest;": "?",
      "&questeq;": "\u225F",
      "&quot": '"',
      "&quot;": '"',
      "&rAarr;": "\u21DB",
      "&rArr;": "\u21D2",
      "&rAtail;": "\u291C",
      "&rBarr;": "\u290F",
      "&rHar;": "\u2964",
      "&race;": "\u223D\u0331",
      "&racute;": "\u0155",
      "&radic;": "\u221A",
      "&raemptyv;": "\u29B3",
      "&rang;": "\u27E9",
      "&rangd;": "\u2992",
      "&range;": "\u29A5",
      "&rangle;": "\u27E9",
      "&raquo": "\xBB",
      "&raquo;": "\xBB",
      "&rarr;": "\u2192",
      "&rarrap;": "\u2975",
      "&rarrb;": "\u21E5",
      "&rarrbfs;": "\u2920",
      "&rarrc;": "\u2933",
      "&rarrfs;": "\u291E",
      "&rarrhk;": "\u21AA",
      "&rarrlp;": "\u21AC",
      "&rarrpl;": "\u2945",
      "&rarrsim;": "\u2974",
      "&rarrtl;": "\u21A3",
      "&rarrw;": "\u219D",
      "&ratail;": "\u291A",
      "&ratio;": "\u2236",
      "&rationals;": "\u211A",
      "&rbarr;": "\u290D",
      "&rbbrk;": "\u2773",
      "&rbrace;": "}",
      "&rbrack;": "]",
      "&rbrke;": "\u298C",
      "&rbrksld;": "\u298E",
      "&rbrkslu;": "\u2990",
      "&rcaron;": "\u0159",
      "&rcedil;": "\u0157",
      "&rceil;": "\u2309",
      "&rcub;": "}",
      "&rcy;": "\u0440",
      "&rdca;": "\u2937",
      "&rdldhar;": "\u2969",
      "&rdquo;": "\u201D",
      "&rdquor;": "\u201D",
      "&rdsh;": "\u21B3",
      "&real;": "\u211C",
      "&realine;": "\u211B",
      "&realpart;": "\u211C",
      "&reals;": "\u211D",
      "&rect;": "\u25AD",
      "&reg": "\xAE",
      "&reg;": "\xAE",
      "&rfisht;": "\u297D",
      "&rfloor;": "\u230B",
      "&rfr;": "\u{1D52F}",
      "&rhard;": "\u21C1",
      "&rharu;": "\u21C0",
      "&rharul;": "\u296C",
      "&rho;": "\u03C1",
      "&rhov;": "\u03F1",
      "&rightarrow;": "\u2192",
      "&rightarrowtail;": "\u21A3",
      "&rightharpoondown;": "\u21C1",
      "&rightharpoonup;": "\u21C0",
      "&rightleftarrows;": "\u21C4",
      "&rightleftharpoons;": "\u21CC",
      "&rightrightarrows;": "\u21C9",
      "&rightsquigarrow;": "\u219D",
      "&rightthreetimes;": "\u22CC",
      "&ring;": "\u02DA",
      "&risingdotseq;": "\u2253",
      "&rlarr;": "\u21C4",
      "&rlhar;": "\u21CC",
      "&rlm;": "\u200F",
      "&rmoust;": "\u23B1",
      "&rmoustache;": "\u23B1",
      "&rnmid;": "\u2AEE",
      "&roang;": "\u27ED",
      "&roarr;": "\u21FE",
      "&robrk;": "\u27E7",
      "&ropar;": "\u2986",
      "&ropf;": "\u{1D563}",
      "&roplus;": "\u2A2E",
      "&rotimes;": "\u2A35",
      "&rpar;": ")",
      "&rpargt;": "\u2994",
      "&rppolint;": "\u2A12",
      "&rrarr;": "\u21C9",
      "&rsaquo;": "\u203A",
      "&rscr;": "\u{1D4C7}",
      "&rsh;": "\u21B1",
      "&rsqb;": "]",
      "&rsquo;": "\u2019",
      "&rsquor;": "\u2019",
      "&rthree;": "\u22CC",
      "&rtimes;": "\u22CA",
      "&rtri;": "\u25B9",
      "&rtrie;": "\u22B5",
      "&rtrif;": "\u25B8",
      "&rtriltri;": "\u29CE",
      "&ruluhar;": "\u2968",
      "&rx;": "\u211E",
      "&sacute;": "\u015B",
      "&sbquo;": "\u201A",
      "&sc;": "\u227B",
      "&scE;": "\u2AB4",
      "&scap;": "\u2AB8",
      "&scaron;": "\u0161",
      "&sccue;": "\u227D",
      "&sce;": "\u2AB0",
      "&scedil;": "\u015F",
      "&scirc;": "\u015D",
      "&scnE;": "\u2AB6",
      "&scnap;": "\u2ABA",
      "&scnsim;": "\u22E9",
      "&scpolint;": "\u2A13",
      "&scsim;": "\u227F",
      "&scy;": "\u0441",
      "&sdot;": "\u22C5",
      "&sdotb;": "\u22A1",
      "&sdote;": "\u2A66",
      "&seArr;": "\u21D8",
      "&searhk;": "\u2925",
      "&searr;": "\u2198",
      "&searrow;": "\u2198",
      "&sect": "\xA7",
      "&sect;": "\xA7",
      "&semi;": ";",
      "&seswar;": "\u2929",
      "&setminus;": "\u2216",
      "&setmn;": "\u2216",
      "&sext;": "\u2736",
      "&sfr;": "\u{1D530}",
      "&sfrown;": "\u2322",
      "&sharp;": "\u266F",
      "&shchcy;": "\u0449",
      "&shcy;": "\u0448",
      "&shortmid;": "\u2223",
      "&shortparallel;": "\u2225",
      "&shy": "\xAD",
      "&shy;": "\xAD",
      "&sigma;": "\u03C3",
      "&sigmaf;": "\u03C2",
      "&sigmav;": "\u03C2",
      "&sim;": "\u223C",
      "&simdot;": "\u2A6A",
      "&sime;": "\u2243",
      "&simeq;": "\u2243",
      "&simg;": "\u2A9E",
      "&simgE;": "\u2AA0",
      "&siml;": "\u2A9D",
      "&simlE;": "\u2A9F",
      "&simne;": "\u2246",
      "&simplus;": "\u2A24",
      "&simrarr;": "\u2972",
      "&slarr;": "\u2190",
      "&smallsetminus;": "\u2216",
      "&smashp;": "\u2A33",
      "&smeparsl;": "\u29E4",
      "&smid;": "\u2223",
      "&smile;": "\u2323",
      "&smt;": "\u2AAA",
      "&smte;": "\u2AAC",
      "&smtes;": "\u2AAC\uFE00",
      "&softcy;": "\u044C",
      "&sol;": "/",
      "&solb;": "\u29C4",
      "&solbar;": "\u233F",
      "&sopf;": "\u{1D564}",
      "&spades;": "\u2660",
      "&spadesuit;": "\u2660",
      "&spar;": "\u2225",
      "&sqcap;": "\u2293",
      "&sqcaps;": "\u2293\uFE00",
      "&sqcup;": "\u2294",
      "&sqcups;": "\u2294\uFE00",
      "&sqsub;": "\u228F",
      "&sqsube;": "\u2291",
      "&sqsubset;": "\u228F",
      "&sqsubseteq;": "\u2291",
      "&sqsup;": "\u2290",
      "&sqsupe;": "\u2292",
      "&sqsupset;": "\u2290",
      "&sqsupseteq;": "\u2292",
      "&squ;": "\u25A1",
      "&square;": "\u25A1",
      "&squarf;": "\u25AA",
      "&squf;": "\u25AA",
      "&srarr;": "\u2192",
      "&sscr;": "\u{1D4C8}",
      "&ssetmn;": "\u2216",
      "&ssmile;": "\u2323",
      "&sstarf;": "\u22C6",
      "&star;": "\u2606",
      "&starf;": "\u2605",
      "&straightepsilon;": "\u03F5",
      "&straightphi;": "\u03D5",
      "&strns;": "\xAF",
      "&sub;": "\u2282",
      "&subE;": "\u2AC5",
      "&subdot;": "\u2ABD",
      "&sube;": "\u2286",
      "&subedot;": "\u2AC3",
      "&submult;": "\u2AC1",
      "&subnE;": "\u2ACB",
      "&subne;": "\u228A",
      "&subplus;": "\u2ABF",
      "&subrarr;": "\u2979",
      "&subset;": "\u2282",
      "&subseteq;": "\u2286",
      "&subseteqq;": "\u2AC5",
      "&subsetneq;": "\u228A",
      "&subsetneqq;": "\u2ACB",
      "&subsim;": "\u2AC7",
      "&subsub;": "\u2AD5",
      "&subsup;": "\u2AD3",
      "&succ;": "\u227B",
      "&succapprox;": "\u2AB8",
      "&succcurlyeq;": "\u227D",
      "&succeq;": "\u2AB0",
      "&succnapprox;": "\u2ABA",
      "&succneqq;": "\u2AB6",
      "&succnsim;": "\u22E9",
      "&succsim;": "\u227F",
      "&sum;": "\u2211",
      "&sung;": "\u266A",
      "&sup1": "\xB9",
      "&sup1;": "\xB9",
      "&sup2": "\xB2",
      "&sup2;": "\xB2",
      "&sup3": "\xB3",
      "&sup3;": "\xB3",
      "&sup;": "\u2283",
      "&supE;": "\u2AC6",
      "&supdot;": "\u2ABE",
      "&supdsub;": "\u2AD8",
      "&supe;": "\u2287",
      "&supedot;": "\u2AC4",
      "&suphsol;": "\u27C9",
      "&suphsub;": "\u2AD7",
      "&suplarr;": "\u297B",
      "&supmult;": "\u2AC2",
      "&supnE;": "\u2ACC",
      "&supne;": "\u228B",
      "&supplus;": "\u2AC0",
      "&supset;": "\u2283",
      "&supseteq;": "\u2287",
      "&supseteqq;": "\u2AC6",
      "&supsetneq;": "\u228B",
      "&supsetneqq;": "\u2ACC",
      "&supsim;": "\u2AC8",
      "&supsub;": "\u2AD4",
      "&supsup;": "\u2AD6",
      "&swArr;": "\u21D9",
      "&swarhk;": "\u2926",
      "&swarr;": "\u2199",
      "&swarrow;": "\u2199",
      "&swnwar;": "\u292A",
      "&szlig": "\xDF",
      "&szlig;": "\xDF",
      "&target;": "\u2316",
      "&tau;": "\u03C4",
      "&tbrk;": "\u23B4",
      "&tcaron;": "\u0165",
      "&tcedil;": "\u0163",
      "&tcy;": "\u0442",
      "&tdot;": "\u20DB",
      "&telrec;": "\u2315",
      "&tfr;": "\u{1D531}",
      "&there4;": "\u2234",
      "&therefore;": "\u2234",
      "&theta;": "\u03B8",
      "&thetasym;": "\u03D1",
      "&thetav;": "\u03D1",
      "&thickapprox;": "\u2248",
      "&thicksim;": "\u223C",
      "&thinsp;": "\u2009",
      "&thkap;": "\u2248",
      "&thksim;": "\u223C",
      "&thorn": "\xFE",
      "&thorn;": "\xFE",
      "&tilde;": "\u02DC",
      "&times": "\xD7",
      "&times;": "\xD7",
      "&timesb;": "\u22A0",
      "&timesbar;": "\u2A31",
      "&timesd;": "\u2A30",
      "&tint;": "\u222D",
      "&toea;": "\u2928",
      "&top;": "\u22A4",
      "&topbot;": "\u2336",
      "&topcir;": "\u2AF1",
      "&topf;": "\u{1D565}",
      "&topfork;": "\u2ADA",
      "&tosa;": "\u2929",
      "&tprime;": "\u2034",
      "&trade;": "\u2122",
      "&triangle;": "\u25B5",
      "&triangledown;": "\u25BF",
      "&triangleleft;": "\u25C3",
      "&trianglelefteq;": "\u22B4",
      "&triangleq;": "\u225C",
      "&triangleright;": "\u25B9",
      "&trianglerighteq;": "\u22B5",
      "&tridot;": "\u25EC",
      "&trie;": "\u225C",
      "&triminus;": "\u2A3A",
      "&triplus;": "\u2A39",
      "&trisb;": "\u29CD",
      "&tritime;": "\u2A3B",
      "&trpezium;": "\u23E2",
      "&tscr;": "\u{1D4C9}",
      "&tscy;": "\u0446",
      "&tshcy;": "\u045B",
      "&tstrok;": "\u0167",
      "&twixt;": "\u226C",
      "&twoheadleftarrow;": "\u219E",
      "&twoheadrightarrow;": "\u21A0",
      "&uArr;": "\u21D1",
      "&uHar;": "\u2963",
      "&uacute": "\xFA",
      "&uacute;": "\xFA",
      "&uarr;": "\u2191",
      "&ubrcy;": "\u045E",
      "&ubreve;": "\u016D",
      "&ucirc": "\xFB",
      "&ucirc;": "\xFB",
      "&ucy;": "\u0443",
      "&udarr;": "\u21C5",
      "&udblac;": "\u0171",
      "&udhar;": "\u296E",
      "&ufisht;": "\u297E",
      "&ufr;": "\u{1D532}",
      "&ugrave": "\xF9",
      "&ugrave;": "\xF9",
      "&uharl;": "\u21BF",
      "&uharr;": "\u21BE",
      "&uhblk;": "\u2580",
      "&ulcorn;": "\u231C",
      "&ulcorner;": "\u231C",
      "&ulcrop;": "\u230F",
      "&ultri;": "\u25F8",
      "&umacr;": "\u016B",
      "&uml": "\xA8",
      "&uml;": "\xA8",
      "&uogon;": "\u0173",
      "&uopf;": "\u{1D566}",
      "&uparrow;": "\u2191",
      "&updownarrow;": "\u2195",
      "&upharpoonleft;": "\u21BF",
      "&upharpoonright;": "\u21BE",
      "&uplus;": "\u228E",
      "&upsi;": "\u03C5",
      "&upsih;": "\u03D2",
      "&upsilon;": "\u03C5",
      "&upuparrows;": "\u21C8",
      "&urcorn;": "\u231D",
      "&urcorner;": "\u231D",
      "&urcrop;": "\u230E",
      "&uring;": "\u016F",
      "&urtri;": "\u25F9",
      "&uscr;": "\u{1D4CA}",
      "&utdot;": "\u22F0",
      "&utilde;": "\u0169",
      "&utri;": "\u25B5",
      "&utrif;": "\u25B4",
      "&uuarr;": "\u21C8",
      "&uuml": "\xFC",
      "&uuml;": "\xFC",
      "&uwangle;": "\u29A7",
      "&vArr;": "\u21D5",
      "&vBar;": "\u2AE8",
      "&vBarv;": "\u2AE9",
      "&vDash;": "\u22A8",
      "&vangrt;": "\u299C",
      "&varepsilon;": "\u03F5",
      "&varkappa;": "\u03F0",
      "&varnothing;": "\u2205",
      "&varphi;": "\u03D5",
      "&varpi;": "\u03D6",
      "&varpropto;": "\u221D",
      "&varr;": "\u2195",
      "&varrho;": "\u03F1",
      "&varsigma;": "\u03C2",
      "&varsubsetneq;": "\u228A\uFE00",
      "&varsubsetneqq;": "\u2ACB\uFE00",
      "&varsupsetneq;": "\u228B\uFE00",
      "&varsupsetneqq;": "\u2ACC\uFE00",
      "&vartheta;": "\u03D1",
      "&vartriangleleft;": "\u22B2",
      "&vartriangleright;": "\u22B3",
      "&vcy;": "\u0432",
      "&vdash;": "\u22A2",
      "&vee;": "\u2228",
      "&veebar;": "\u22BB",
      "&veeeq;": "\u225A",
      "&vellip;": "\u22EE",
      "&verbar;": "|",
      "&vert;": "|",
      "&vfr;": "\u{1D533}",
      "&vltri;": "\u22B2",
      "&vnsub;": "\u2282\u20D2",
      "&vnsup;": "\u2283\u20D2",
      "&vopf;": "\u{1D567}",
      "&vprop;": "\u221D",
      "&vrtri;": "\u22B3",
      "&vscr;": "\u{1D4CB}",
      "&vsubnE;": "\u2ACB\uFE00",
      "&vsubne;": "\u228A\uFE00",
      "&vsupnE;": "\u2ACC\uFE00",
      "&vsupne;": "\u228B\uFE00",
      "&vzigzag;": "\u299A",
      "&wcirc;": "\u0175",
      "&wedbar;": "\u2A5F",
      "&wedge;": "\u2227",
      "&wedgeq;": "\u2259",
      "&weierp;": "\u2118",
      "&wfr;": "\u{1D534}",
      "&wopf;": "\u{1D568}",
      "&wp;": "\u2118",
      "&wr;": "\u2240",
      "&wreath;": "\u2240",
      "&wscr;": "\u{1D4CC}",
      "&xcap;": "\u22C2",
      "&xcirc;": "\u25EF",
      "&xcup;": "\u22C3",
      "&xdtri;": "\u25BD",
      "&xfr;": "\u{1D535}",
      "&xhArr;": "\u27FA",
      "&xharr;": "\u27F7",
      "&xi;": "\u03BE",
      "&xlArr;": "\u27F8",
      "&xlarr;": "\u27F5",
      "&xmap;": "\u27FC",
      "&xnis;": "\u22FB",
      "&xodot;": "\u2A00",
      "&xopf;": "\u{1D569}",
      "&xoplus;": "\u2A01",
      "&xotime;": "\u2A02",
      "&xrArr;": "\u27F9",
      "&xrarr;": "\u27F6",
      "&xscr;": "\u{1D4CD}",
      "&xsqcup;": "\u2A06",
      "&xuplus;": "\u2A04",
      "&xutri;": "\u25B3",
      "&xvee;": "\u22C1",
      "&xwedge;": "\u22C0",
      "&yacute": "\xFD",
      "&yacute;": "\xFD",
      "&yacy;": "\u044F",
      "&ycirc;": "\u0177",
      "&ycy;": "\u044B",
      "&yen": "\xA5",
      "&yen;": "\xA5",
      "&yfr;": "\u{1D536}",
      "&yicy;": "\u0457",
      "&yopf;": "\u{1D56A}",
      "&yscr;": "\u{1D4CE}",
      "&yucy;": "\u044E",
      "&yuml": "\xFF",
      "&yuml;": "\xFF",
      "&zacute;": "\u017A",
      "&zcaron;": "\u017E",
      "&zcy;": "\u0437",
      "&zdot;": "\u017C",
      "&zeetrf;": "\u2128",
      "&zeta;": "\u03B6",
      "&zfr;": "\u{1D537}",
      "&zhcy;": "\u0436",
      "&zigrarr;": "\u21DD",
      "&zopf;": "\u{1D56B}",
      "&zscr;": "\u{1D4CF}",
      "&zwj;": "\u200D",
      "&zwnj;": "\u200C"
    };
    var html_entities_default = htmlEntities;
    if (module2.exports.default) {
      defaultExport = module2.exports.default;
      namedExports = {};
      for (key in module2.exports) {
        if (key !== "default" && key !== "__esModule") {
          namedExports[key] = module2.exports[key];
        }
      }
      module2.exports = defaultExport;
      Object.assign(module2.exports, namedExports);
      Object.defineProperty(module2.exports, "__esModule", { value: true });
      module2.exports.default = defaultExport;
    }
    var defaultExport;
    var namedExports;
    var key;
  }
});

// node_modules/postal-mime/dist/text-format.cjs
var require_text_format = __commonJS({
  "node_modules/postal-mime/dist/text-format.cjs"(exports2, module2) {
    "use strict";
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key2 of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key2) && key2 !== except)
            __defProp2(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc2(from, key2)) || desc.enumerable });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var text_format_exports = {};
    __export2(text_format_exports, {
      decodeHTMLEntities: () => decodeHTMLEntities,
      escapeHtml: () => escapeHtml2,
      formatHtmlHeader: () => formatHtmlHeader,
      formatTextHeader: () => formatTextHeader,
      htmlToText: () => htmlToText,
      textToHtml: () => textToHtml
    });
    module2.exports = __toCommonJS2(text_format_exports);
    var import_html_entities = __toESM2(require_html_entities(), 1);
    function decodeHTMLEntities(str) {
      return str.replace(/&(#\d+|#x[a-f0-9]+|[a-z]+\d*);?/gi, (match, entity) => {
        if (typeof import_html_entities.default[match] === "string") {
          return import_html_entities.default[match];
        }
        if (entity.charAt(0) !== "#" || match.charAt(match.length - 1) !== ";") {
          return match;
        }
        let codePoint;
        if (entity.charAt(1) === "x") {
          codePoint = parseInt(entity.substr(2), 16);
        } else {
          codePoint = parseInt(entity.substr(1), 10);
        }
        let output = "";
        if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
          return "\uFFFD";
        }
        if (codePoint > 65535) {
          codePoint -= 65536;
          output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        output += String.fromCharCode(codePoint);
        return output;
      });
    }
    function escapeHtml2(str) {
      return str.trim().replace(/[<>"'?&]/g, (c) => {
        let hex = c.charCodeAt(0).toString(16);
        if (hex.length < 2) {
          hex = "0" + hex;
        }
        return "&#x" + hex.toUpperCase() + ";";
      });
    }
    function textToHtml(str) {
      let html = escapeHtml2(str).replace(/\n/g, "<br />");
      return "<div>" + html + "</div>";
    }
    function htmlToText(str) {
      str = str.replace(/\r?\n/g, "").replace(/<\!\-\-.*?\-\->/gi, " ").replace(/<br\b[^>]*>/gi, "\n").replace(/<\/?(p|div|table|tr|td|th)\b[^>]*>/gi, "\n\n").replace(/<script\b[^>]*>.*?<\/script\b[^>]*>/gi, " ").replace(/^.*<body\b[^>]*>/i, "").replace(/^.*<\/head\b[^>]*>/i, "").replace(/^.*<\!doctype\b[^>]*>/i, "").replace(/<\/body\b[^>]*>.*$/i, "").replace(/<\/html\b[^>]*>.*$/i, "").replace(/<a\b[^>]*href\s*=\s*["']?([^\s"']+)[^>]*>/gi, " ($1) ").replace(/<\/?(span|em|i|strong|b|u|a)\b[^>]*>/gi, "").replace(/<li\b[^>]*>[\n\u0001\s]*/gi, "* ").replace(/<hr\b[^>]*>/g, "\n-------------\n").replace(/<[^>]*>/g, " ").replace(/\u0001/g, "\n").replace(/[ \t]+/g, " ").replace(/^\s+$/gm, "").replace(/\n\n+/g, "\n\n").replace(/^\n+/, "\n").replace(/\n+$/, "\n");
      str = decodeHTMLEntities(str);
      return str;
    }
    function formatTextAddress(address) {
      return [].concat(address.name || []).concat(address.name ? `<${address.address}>` : address.address).join(" ");
    }
    function formatTextAddresses(addresses) {
      let parts = [];
      let processAddress = (address, partCounter) => {
        if (partCounter) {
          parts.push(", ");
        }
        if (address.group) {
          let groupStart = `${address.name}:`;
          let groupEnd = `;`;
          parts.push(groupStart);
          address.group.forEach(processAddress);
          parts.push(groupEnd);
        } else {
          parts.push(formatTextAddress(address));
        }
      };
      addresses.forEach(processAddress);
      return parts.join("");
    }
    function formatHtmlAddress(address) {
      return `<a href="mailto:${escapeHtml2(address.address)}" class="postal-email-address">${escapeHtml2(address.name || `<${address.address}>`)}</a>`;
    }
    function formatHtmlAddresses(addresses) {
      let parts = [];
      let processAddress = (address, partCounter) => {
        if (partCounter) {
          parts.push('<span class="postal-email-address-separator">, </span>');
        }
        if (address.group) {
          let groupStart = `<span class="postal-email-address-group">${escapeHtml2(address.name)}:</span>`;
          let groupEnd = `<span class="postal-email-address-group">;</span>`;
          parts.push(groupStart);
          address.group.forEach(processAddress);
          parts.push(groupEnd);
        } else {
          parts.push(formatHtmlAddress(address));
        }
      };
      addresses.forEach(processAddress);
      return parts.join(" ");
    }
    function foldLines(str, lineLength, afterSpace) {
      str = (str || "").toString();
      lineLength = lineLength || 76;
      let pos = 0, len = str.length, result = "", line, match;
      while (pos < len) {
        line = str.substr(pos, lineLength);
        if (line.length < lineLength) {
          result += line;
          break;
        }
        if (match = line.match(/^[^\n\r]*(\r?\n|\r)/)) {
          line = match[0];
          result += line;
          pos += line.length;
          continue;
        } else if ((match = line.match(/(\s+)[^\s]*$/)) && match[0].length - (afterSpace ? (match[1] || "").length : 0) < line.length) {
          line = line.substr(0, line.length - (match[0].length - (afterSpace ? (match[1] || "").length : 0)));
        } else if (match = str.substr(pos + line.length).match(/^[^\s]+(\s*)/)) {
          line = line + match[0].substr(0, match[0].length - (!afterSpace ? (match[1] || "").length : 0));
        }
        result += line;
        pos += line.length;
        if (pos < len) {
          result += "\r\n";
        }
      }
      return result;
    }
    function formatTextHeader(message) {
      let rows = [];
      if (message.from) {
        rows.push({ key: "From", val: formatTextAddress(message.from) });
      }
      if (message.subject) {
        rows.push({ key: "Subject", val: message.subject });
      }
      if (message.date) {
        let dateOptions = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false
        };
        let dateStr = typeof Intl === "undefined" ? message.date : new Intl.DateTimeFormat("default", dateOptions).format(new Date(message.date));
        rows.push({ key: "Date", val: dateStr });
      }
      if (message.to && message.to.length) {
        rows.push({ key: "To", val: formatTextAddresses(message.to) });
      }
      if (message.cc && message.cc.length) {
        rows.push({ key: "Cc", val: formatTextAddresses(message.cc) });
      }
      if (message.bcc && message.bcc.length) {
        rows.push({ key: "Bcc", val: formatTextAddresses(message.bcc) });
      }
      let maxKeyLength = rows.map((r) => r.key.length).reduce((acc, cur) => {
        return cur > acc ? cur : acc;
      }, 0);
      rows = rows.flatMap((row) => {
        let sepLen = maxKeyLength - row.key.length;
        let prefix = `${row.key}: ${" ".repeat(sepLen)}`;
        let emptyPrefix = `${" ".repeat(row.key.length + 1)} ${" ".repeat(sepLen)}`;
        let foldedLines = foldLines(row.val, 80, true).split(/\r?\n/).map((line) => line.trim());
        return foldedLines.map((line, i) => `${i ? emptyPrefix : prefix}${line}`);
      });
      let maxLineLength = rows.map((r) => r.length).reduce((acc, cur) => {
        return cur > acc ? cur : acc;
      }, 0);
      let lineMarker = "-".repeat(maxLineLength);
      let template = `
${lineMarker}
${rows.join("\n")}
${lineMarker}
`;
      return template;
    }
    function formatHtmlHeader(message) {
      let rows = [];
      if (message.from) {
        rows.push(
          `<div class="postal-email-header-key">From</div><div class="postal-email-header-value">${formatHtmlAddress(message.from)}</div>`
        );
      }
      if (message.subject) {
        rows.push(
          `<div class="postal-email-header-key">Subject</div><div class="postal-email-header-value postal-email-header-subject">${escapeHtml2(
            message.subject
          )}</div>`
        );
      }
      if (message.date) {
        let dateOptions = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false
        };
        let dateStr = typeof Intl === "undefined" ? message.date : new Intl.DateTimeFormat("default", dateOptions).format(new Date(message.date));
        rows.push(
          `<div class="postal-email-header-key">Date</div><div class="postal-email-header-value postal-email-header-date" data-date="${escapeHtml2(
            message.date
          )}">${escapeHtml2(dateStr)}</div>`
        );
      }
      if (message.to && message.to.length) {
        rows.push(
          `<div class="postal-email-header-key">To</div><div class="postal-email-header-value">${formatHtmlAddresses(message.to)}</div>`
        );
      }
      if (message.cc && message.cc.length) {
        rows.push(
          `<div class="postal-email-header-key">Cc</div><div class="postal-email-header-value">${formatHtmlAddresses(message.cc)}</div>`
        );
      }
      if (message.bcc && message.bcc.length) {
        rows.push(
          `<div class="postal-email-header-key">Bcc</div><div class="postal-email-header-value">${formatHtmlAddresses(message.bcc)}</div>`
        );
      }
      let template = `<div class="postal-email-header">${rows.length ? '<div class="postal-email-header-row">' : ""}${rows.join(
        '</div>\n<div class="postal-email-header-row">'
      )}${rows.length ? "</div>" : ""}</div>`;
      return template;
    }
    if (module2.exports.default) {
      defaultExport = module2.exports.default;
      namedExports = {};
      for (key in module2.exports) {
        if (key !== "default" && key !== "__esModule") {
          namedExports[key] = module2.exports[key];
        }
      }
      module2.exports = defaultExport;
      Object.assign(module2.exports, namedExports);
      Object.defineProperty(module2.exports, "__esModule", { value: true });
      module2.exports.default = defaultExport;
    }
    var defaultExport;
    var namedExports;
    var key;
  }
});

// node_modules/postal-mime/dist/address-parser.cjs
var require_address_parser = __commonJS({
  "node_modules/postal-mime/dist/address-parser.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key2 of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key2) && key2 !== except)
            __defProp2(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc2(from, key2)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var address_parser_exports = {};
    __export2(address_parser_exports, {
      default: () => address_parser_default
    });
    module2.exports = __toCommonJS2(address_parser_exports);
    var import_decode_strings = require_decode_strings();
    function _handleAddress(tokens, depth) {
      let isGroup = false;
      let state = "text";
      let address;
      let addresses = [];
      let data = {
        address: [],
        comment: [],
        group: [],
        text: [],
        textWasQuoted: []
        // Track which text tokens came from inside quotes
      };
      let i;
      let len;
      let insideQuotes = false;
      for (i = 0, len = tokens.length; i < len; i++) {
        let token = tokens[i];
        let prevToken = i ? tokens[i - 1] : null;
        if (token.type === "operator") {
          switch (token.value) {
            case "<":
              state = "address";
              insideQuotes = false;
              break;
            case "(":
              state = "comment";
              insideQuotes = false;
              break;
            case ":":
              state = "group";
              isGroup = true;
              insideQuotes = false;
              break;
            case '"':
              insideQuotes = !insideQuotes;
              state = "text";
              break;
            default:
              state = "text";
              insideQuotes = false;
              break;
          }
        } else if (token.value) {
          if (state === "address") {
            token.value = token.value.replace(/^[^<]*<\s*/, "");
          }
          if (prevToken && prevToken.noBreak && data[state].length) {
            data[state][data[state].length - 1] += token.value;
            if (state === "text" && insideQuotes) {
              data.textWasQuoted[data.textWasQuoted.length - 1] = true;
            }
          } else {
            data[state].push(token.value);
            if (state === "text") {
              data.textWasQuoted.push(insideQuotes);
            }
          }
        }
      }
      if (!data.text.length && data.comment.length) {
        data.text = data.comment;
        data.comment = [];
      }
      if (isGroup) {
        data.text = data.text.join(" ");
        let groupMembers = [];
        if (data.group.length) {
          let parsedGroup = addressParser2(data.group.join(","), { _depth: depth + 1 });
          parsedGroup.forEach((member) => {
            if (member.group) {
              groupMembers = groupMembers.concat(member.group);
            } else {
              groupMembers.push(member);
            }
          });
        }
        addresses.push({
          name: (0, import_decode_strings.decodeWords)(data.text || address && address.name),
          group: groupMembers
        });
      } else {
        if (!data.address.length && data.text.length) {
          for (i = data.text.length - 1; i >= 0; i--) {
            if (!data.textWasQuoted[i] && data.text[i].match(/^[^@\s]+@[^@\s]+$/)) {
              data.address = data.text.splice(i, 1);
              data.textWasQuoted.splice(i, 1);
              break;
            }
          }
          let _regexHandler = function(address2) {
            if (!data.address.length) {
              data.address = [address2.trim()];
              return " ";
            } else {
              return address2;
            }
          };
          if (!data.address.length) {
            for (i = data.text.length - 1; i >= 0; i--) {
              if (!data.textWasQuoted[i]) {
                data.text[i] = data.text[i].replace(/\s*\b[^@\s]+@[^\s]+\b\s*/, _regexHandler).trim();
                if (data.address.length) {
                  break;
                }
              }
            }
          }
        }
        if (!data.text.length && data.comment.length) {
          data.text = data.comment;
          data.comment = [];
        }
        if (data.address.length > 1) {
          data.text = data.text.concat(data.address.splice(1));
        }
        data.text = data.text.join(" ");
        data.address = data.address.join(" ");
        if (!data.address && /^=\?[^=]+?=$/.test(data.text.trim())) {
          const decodedText = (0, import_decode_strings.decodeWords)(data.text);
          if (/<[^<>]+@[^<>]+>/.test(decodedText)) {
            const parsedSubAddresses = addressParser2(decodedText);
            if (parsedSubAddresses && parsedSubAddresses.length) {
              return parsedSubAddresses;
            }
          }
          return [{ address: "", name: decodedText }];
        }
        address = {
          address: data.address || data.text || "",
          name: (0, import_decode_strings.decodeWords)(data.text || data.address || "")
        };
        if (address.address === address.name) {
          if ((address.address || "").match(/@/)) {
            address.name = "";
          } else {
            address.address = "";
          }
        }
        addresses.push(address);
      }
      return addresses;
    }
    var Tokenizer = class {
      constructor(str) {
        this.str = (str || "").toString();
        this.operatorCurrent = "";
        this.operatorExpecting = "";
        this.node = null;
        this.escaped = false;
        this.list = [];
        this.operators = {
          '"': '"',
          "(": ")",
          "<": ">",
          ",": "",
          ":": ";",
          // Semicolons are not a legal delimiter per the RFC2822 grammar other
          // than for terminating a group, but they are also not valid for any
          // other use in this context.  Given that some mail clients have
          // historically allowed the semicolon as a delimiter equivalent to the
          // comma in their UI, it makes sense to treat them the same as a comma
          // when used outside of a group.
          ";": ""
        };
      }
      /**
       * Tokenizes the original input string
       *
       * @return {Array} An array of operator|text tokens
       */
      tokenize() {
        let list = [];
        for (let i = 0, len = this.str.length; i < len; i++) {
          let chr = this.str.charAt(i);
          let nextChr = i < len - 1 ? this.str.charAt(i + 1) : null;
          this.checkChar(chr, nextChr);
        }
        this.list.forEach((node) => {
          node.value = (node.value || "").toString().trim();
          if (node.value) {
            list.push(node);
          }
        });
        return list;
      }
      /**
       * Checks if a character is an operator or text and acts accordingly
       *
       * @param {String} chr Character from the address field
       */
      checkChar(chr, nextChr) {
        if (this.escaped) {
        } else if (chr === this.operatorExpecting) {
          this.node = {
            type: "operator",
            value: chr
          };
          if (nextChr && ![" ", "	", "\r", "\n", ",", ";"].includes(nextChr)) {
            this.node.noBreak = true;
          }
          this.list.push(this.node);
          this.node = null;
          this.operatorExpecting = "";
          this.escaped = false;
          return;
        } else if (!this.operatorExpecting && chr in this.operators) {
          this.node = {
            type: "operator",
            value: chr
          };
          this.list.push(this.node);
          this.node = null;
          this.operatorExpecting = this.operators[chr];
          this.escaped = false;
          return;
        } else if (this.operatorExpecting === '"' && chr === "\\") {
          this.escaped = true;
          return;
        }
        if (!this.node) {
          this.node = {
            type: "text",
            value: ""
          };
          this.list.push(this.node);
        }
        if (chr === "\n") {
          chr = " ";
        }
        if (chr.charCodeAt(0) >= 33 || [" ", "	"].includes(chr)) {
          this.node.value += chr;
        }
        this.escaped = false;
      }
    };
    var MAX_NESTED_GROUP_DEPTH = 50;
    function addressParser2(str, options) {
      options = options || {};
      let depth = options._depth || 0;
      if (depth > MAX_NESTED_GROUP_DEPTH) {
        return [];
      }
      let tokenizer = new Tokenizer(str);
      let tokens = tokenizer.tokenize();
      let addresses = [];
      let address = [];
      let parsedAddresses = [];
      tokens.forEach((token) => {
        if (token.type === "operator" && (token.value === "," || token.value === ";")) {
          if (address.length) {
            addresses.push(address);
          }
          address = [];
        } else {
          address.push(token);
        }
      });
      if (address.length) {
        addresses.push(address);
      }
      addresses.forEach((address2) => {
        address2 = _handleAddress(address2, depth);
        if (address2.length) {
          parsedAddresses = parsedAddresses.concat(address2);
        }
      });
      if (options.flatten) {
        let addresses2 = [];
        let walkAddressList = (list) => {
          list.forEach((address2) => {
            if (address2.group) {
              return walkAddressList(address2.group);
            } else {
              addresses2.push(address2);
            }
          });
        };
        walkAddressList(parsedAddresses);
        return addresses2;
      }
      return parsedAddresses;
    }
    var address_parser_default = addressParser2;
    if (module2.exports.default) {
      defaultExport = module2.exports.default;
      namedExports = {};
      for (key in module2.exports) {
        if (key !== "default" && key !== "__esModule") {
          namedExports[key] = module2.exports[key];
        }
      }
      module2.exports = defaultExport;
      Object.assign(module2.exports, namedExports);
      Object.defineProperty(module2.exports, "__esModule", { value: true });
      module2.exports.default = defaultExport;
    }
    var defaultExport;
    var namedExports;
    var key;
  }
});

// node_modules/postal-mime/dist/base64-encoder.cjs
var require_base64_encoder = __commonJS({
  "node_modules/postal-mime/dist/base64-encoder.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key2 of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key2) && key2 !== except)
            __defProp2(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc2(from, key2)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var base64_encoder_exports = {};
    __export2(base64_encoder_exports, {
      base64ArrayBuffer: () => base64ArrayBuffer
    });
    module2.exports = __toCommonJS2(base64_encoder_exports);
    function base64ArrayBuffer(arrayBuffer) {
      var base64 = "";
      var encodings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var bytes = new Uint8Array(arrayBuffer);
      var byteLength = bytes.byteLength;
      var byteRemainder = byteLength % 3;
      var mainLength = byteLength - byteRemainder;
      var a, b, c, d;
      var chunk;
      for (var i = 0; i < mainLength; i = i + 3) {
        chunk = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
        a = (chunk & 16515072) >> 18;
        b = (chunk & 258048) >> 12;
        c = (chunk & 4032) >> 6;
        d = chunk & 63;
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
      }
      if (byteRemainder == 1) {
        chunk = bytes[mainLength];
        a = (chunk & 252) >> 2;
        b = (chunk & 3) << 4;
        base64 += encodings[a] + encodings[b] + "==";
      } else if (byteRemainder == 2) {
        chunk = bytes[mainLength] << 8 | bytes[mainLength + 1];
        a = (chunk & 64512) >> 10;
        b = (chunk & 1008) >> 4;
        c = (chunk & 15) << 2;
        base64 += encodings[a] + encodings[b] + encodings[c] + "=";
      }
      return base64;
    }
    if (module2.exports.default) {
      defaultExport = module2.exports.default;
      namedExports = {};
      for (key in module2.exports) {
        if (key !== "default" && key !== "__esModule") {
          namedExports[key] = module2.exports[key];
        }
      }
      module2.exports = defaultExport;
      Object.assign(module2.exports, namedExports);
      Object.defineProperty(module2.exports, "__esModule", { value: true });
      module2.exports.default = defaultExport;
    }
    var defaultExport;
    var namedExports;
    var key;
  }
});

// node_modules/postal-mime/dist/postal-mime.cjs
var require_postal_mime = __commonJS({
  "node_modules/postal-mime/dist/postal-mime.cjs"(exports2, module2) {
    "use strict";
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key2 of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key2) && key2 !== except)
            __defProp2(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc2(from, key2)) || desc.enumerable });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var postal_mime_exports = {};
    __export2(postal_mime_exports, {
      addressParser: () => import_address_parser.default,
      decodeWords: () => import_decode_strings.decodeWords,
      default: () => PostalMime
    });
    module2.exports = __toCommonJS2(postal_mime_exports);
    var import_mime_node = __toESM2(require_mime_node(), 1);
    var import_text_format = require_text_format();
    var import_address_parser = __toESM2(require_address_parser(), 1);
    var import_decode_strings = require_decode_strings();
    var import_base64_encoder = require_base64_encoder();
    var MAX_NESTING_DEPTH = 256;
    var MAX_HEADERS_SIZE = 2 * 1024 * 1024;
    function toCamelCase(key2) {
      return key2.replace(/-(.)/g, (o, c) => c.toUpperCase());
    }
    var PostalMime = class _PostalMime {
      static parse(buf, options) {
        const parser = new _PostalMime(options);
        return parser.parse(buf);
      }
      constructor(options) {
        this.options = options || {};
        this.mimeOptions = {
          maxNestingDepth: this.options.maxNestingDepth || MAX_NESTING_DEPTH,
          maxHeadersSize: this.options.maxHeadersSize || MAX_HEADERS_SIZE
        };
        this.root = this.currentNode = new import_mime_node.default({
          postalMime: this,
          ...this.mimeOptions
        });
        this.boundaries = [];
        this.textContent = {};
        this.attachments = [];
        this.attachmentEncoding = (this.options.attachmentEncoding || "").toString().replace(/[-_\s]/g, "").trim().toLowerCase() || "arraybuffer";
        this.started = false;
      }
      async finalize() {
        await this.root.finalize();
      }
      async processLine(line, isFinal) {
        let boundaries = this.boundaries;
        if (boundaries.length && line.length > 2 && line[0] === 45 && line[1] === 45) {
          for (let i = boundaries.length - 1; i >= 0; i--) {
            let boundary = boundaries[i];
            if (line.length < boundary.value.length + 2) {
              continue;
            }
            let boundaryMatches = true;
            for (let j = 0; j < boundary.value.length; j++) {
              if (line[j + 2] !== boundary.value[j]) {
                boundaryMatches = false;
                break;
              }
            }
            if (!boundaryMatches) {
              continue;
            }
            let boundaryEnd = boundary.value.length + 2;
            let isTerminator = false;
            if (line.length >= boundary.value.length + 4 && line[boundary.value.length + 2] === 45 && line[boundary.value.length + 3] === 45) {
              isTerminator = true;
              boundaryEnd = boundary.value.length + 4;
            }
            let hasValidTrailing = true;
            for (let j = boundaryEnd; j < line.length; j++) {
              if (line[j] !== 32 && line[j] !== 9) {
                hasValidTrailing = false;
                break;
              }
            }
            if (!hasValidTrailing) {
              continue;
            }
            if (isTerminator) {
              await boundary.node.finalize();
              this.currentNode = boundary.node.parentNode || this.root;
            } else {
              await boundary.node.finalizeChildNodes();
              this.currentNode = new import_mime_node.default({
                postalMime: this,
                parentNode: boundary.node,
                parentMultipartType: boundary.node.contentType.multipart,
                ...this.mimeOptions
              });
            }
            if (isFinal) {
              return this.finalize();
            }
            return;
          }
        }
        this.currentNode.feed(line);
        if (isFinal) {
          return this.finalize();
        }
      }
      readLine() {
        let startPos = this.readPos;
        let endPos = this.readPos;
        while (this.readPos < this.av.length) {
          const c = this.av[this.readPos++];
          if (c !== 13 && c !== 10) {
            endPos = this.readPos;
          }
          if (c === 10) {
            return {
              bytes: new Uint8Array(this.buf, startPos, endPos - startPos),
              done: this.readPos >= this.av.length
            };
          }
        }
        return {
          bytes: new Uint8Array(this.buf, startPos, endPos - startPos),
          done: this.readPos >= this.av.length
        };
      }
      async processNodeTree() {
        let textContent = {};
        let textTypes = /* @__PURE__ */ new Set();
        let textMap = this.textMap = /* @__PURE__ */ new Map();
        let forceRfc822Attachments = this.forceRfc822Attachments();
        let walk = async (node, alternative, related) => {
          var _a, _b, _c, _d, _e;
          alternative = alternative || false;
          related = related || false;
          if (!node.contentType.multipart) {
            if (this.isInlineMessageRfc822(node) && !forceRfc822Attachments) {
              const subParser = new _PostalMime();
              node.subMessage = await subParser.parse(node.content);
              if (!textMap.has(node)) {
                textMap.set(node, {});
              }
              let textEntry = textMap.get(node);
              if (node.subMessage.text || !node.subMessage.html) {
                textEntry.plain = textEntry.plain || [];
                textEntry.plain.push({ type: "subMessage", value: node.subMessage });
                textTypes.add("plain");
              }
              if (node.subMessage.html) {
                textEntry.html = textEntry.html || [];
                textEntry.html.push({ type: "subMessage", value: node.subMessage });
                textTypes.add("html");
              }
              if (subParser.textMap) {
                subParser.textMap.forEach((subTextEntry, subTextNode) => {
                  textMap.set(subTextNode, subTextEntry);
                });
              }
              for (let attachment of node.subMessage.attachments || []) {
                this.attachments.push(attachment);
              }
            } else if (this.isInlineTextNode(node)) {
              let textType = node.contentType.parsed.value.substr(node.contentType.parsed.value.indexOf("/") + 1);
              let selectorNode = alternative || node;
              if (!textMap.has(selectorNode)) {
                textMap.set(selectorNode, {});
              }
              let textEntry = textMap.get(selectorNode);
              textEntry[textType] = textEntry[textType] || [];
              textEntry[textType].push({ type: "text", value: node.getTextContent() });
              textTypes.add(textType);
            } else if (node.content) {
              const filename = ((_c = (_b = (_a = node.contentDisposition) == null ? void 0 : _a.parsed) == null ? void 0 : _b.params) == null ? void 0 : _c.filename) || node.contentType.parsed.params.name || null;
              const attachment = {
                filename: filename ? (0, import_decode_strings.decodeWords)(filename) : null,
                mimeType: node.contentType.parsed.value,
                disposition: ((_e = (_d = node.contentDisposition) == null ? void 0 : _d.parsed) == null ? void 0 : _e.value) || null
              };
              if (related && node.contentId) {
                attachment.related = true;
              }
              if (node.contentDescription) {
                attachment.description = node.contentDescription;
              }
              if (node.contentId) {
                attachment.contentId = node.contentId;
              }
              switch (node.contentType.parsed.value) {
                // Special handling for calendar events
                case "text/calendar":
                case "application/ics": {
                  if (node.contentType.parsed.params.method) {
                    attachment.method = node.contentType.parsed.params.method.toString().toUpperCase().trim();
                  }
                  const decodedText = node.getTextContent().replace(/\r?\n/g, "\n").replace(/\n*$/, "\n");
                  attachment.content = import_decode_strings.textEncoder.encode(decodedText);
                  break;
                }
                // Regular attachments
                default:
                  attachment.content = node.content;
              }
              this.attachments.push(attachment);
            }
          } else if (node.contentType.multipart === "alternative") {
            alternative = node;
          } else if (node.contentType.multipart === "related") {
            related = node;
          }
          for (let childNode of node.childNodes) {
            await walk(childNode, alternative, related);
          }
        };
        await walk(this.root, false, false);
        textMap.forEach((mapEntry) => {
          textTypes.forEach((textType) => {
            if (!textContent[textType]) {
              textContent[textType] = [];
            }
            if (mapEntry[textType]) {
              mapEntry[textType].forEach((textEntry) => {
                switch (textEntry.type) {
                  case "text":
                    textContent[textType].push(textEntry.value);
                    break;
                  case "subMessage":
                    {
                      switch (textType) {
                        case "html":
                          textContent[textType].push((0, import_text_format.formatHtmlHeader)(textEntry.value));
                          break;
                        case "plain":
                          textContent[textType].push((0, import_text_format.formatTextHeader)(textEntry.value));
                          break;
                      }
                    }
                    break;
                }
              });
            } else {
              let alternativeType;
              switch (textType) {
                case "html":
                  alternativeType = "plain";
                  break;
                case "plain":
                  alternativeType = "html";
                  break;
              }
              (mapEntry[alternativeType] || []).forEach((textEntry) => {
                switch (textEntry.type) {
                  case "text":
                    switch (textType) {
                      case "html":
                        textContent[textType].push((0, import_text_format.textToHtml)(textEntry.value));
                        break;
                      case "plain":
                        textContent[textType].push((0, import_text_format.htmlToText)(textEntry.value));
                        break;
                    }
                    break;
                  case "subMessage":
                    {
                      switch (textType) {
                        case "html":
                          textContent[textType].push((0, import_text_format.formatHtmlHeader)(textEntry.value));
                          break;
                        case "plain":
                          textContent[textType].push((0, import_text_format.formatTextHeader)(textEntry.value));
                          break;
                      }
                    }
                    break;
                }
              });
            }
          });
        });
        Object.keys(textContent).forEach((textType) => {
          textContent[textType] = textContent[textType].join("\n");
        });
        this.textContent = textContent;
      }
      isInlineTextNode(node) {
        var _a, _b, _c;
        if (((_b = (_a = node.contentDisposition) == null ? void 0 : _a.parsed) == null ? void 0 : _b.value) === "attachment") {
          return false;
        }
        switch ((_c = node.contentType.parsed) == null ? void 0 : _c.value) {
          case "text/html":
          case "text/plain":
            return true;
          case "text/calendar":
          case "text/csv":
          default:
            return false;
        }
      }
      isInlineMessageRfc822(node) {
        var _a, _b, _c;
        if (((_a = node.contentType.parsed) == null ? void 0 : _a.value) !== "message/rfc822") {
          return false;
        }
        let disposition = ((_c = (_b = node.contentDisposition) == null ? void 0 : _b.parsed) == null ? void 0 : _c.value) || (this.options.rfc822Attachments ? "attachment" : "inline");
        return disposition === "inline";
      }
      // Check if this is a specially crafted report email where message/rfc822 content should not be inlined
      forceRfc822Attachments() {
        if (this.options.forceRfc822Attachments) {
          return true;
        }
        let forceRfc822Attachments = false;
        let walk = (node) => {
          if (!node.contentType.multipart) {
            if (node.contentType.parsed && ["message/delivery-status", "message/feedback-report"].includes(node.contentType.parsed.value)) {
              forceRfc822Attachments = true;
            }
          }
          for (let childNode of node.childNodes) {
            walk(childNode);
          }
        };
        walk(this.root);
        return forceRfc822Attachments;
      }
      async resolveStream(stream) {
        let chunkLen = 0;
        let chunks = [];
        const reader = stream.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          chunks.push(value);
          chunkLen += value.length;
        }
        const result = new Uint8Array(chunkLen);
        let chunkPointer = 0;
        for (let chunk of chunks) {
          result.set(chunk, chunkPointer);
          chunkPointer += chunk.length;
        }
        return result;
      }
      async parse(buf) {
        var _a, _b;
        if (this.started) {
          throw new Error("Can not reuse parser, create a new PostalMime object");
        }
        this.started = true;
        if (buf && typeof buf.getReader === "function") {
          buf = await this.resolveStream(buf);
        }
        buf = buf || new ArrayBuffer(0);
        if (typeof buf === "string") {
          buf = import_decode_strings.textEncoder.encode(buf);
        }
        if (buf instanceof Blob || Object.prototype.toString.call(buf) === "[object Blob]") {
          buf = await (0, import_decode_strings.blobToArrayBuffer)(buf);
        }
        if (buf.buffer instanceof ArrayBuffer) {
          buf = new Uint8Array(buf).buffer;
        }
        this.buf = buf;
        this.av = new Uint8Array(buf);
        this.readPos = 0;
        while (this.readPos < this.av.length) {
          const line = this.readLine();
          await this.processLine(line.bytes, line.done);
        }
        await this.processNodeTree();
        const message = {
          headers: this.root.headers.map((entry) => ({ key: entry.key, originalKey: entry.originalKey, value: entry.value })).reverse()
        };
        for (const key2 of ["from", "sender"]) {
          const addressHeader = this.root.headers.find((line) => line.key === key2);
          if (addressHeader && addressHeader.value) {
            const addresses = (0, import_address_parser.default)(addressHeader.value);
            if (addresses && addresses.length) {
              message[key2] = addresses[0];
            }
          }
        }
        for (const key2 of ["delivered-to", "return-path"]) {
          const addressHeader = this.root.headers.find((line) => line.key === key2);
          if (addressHeader && addressHeader.value) {
            const addresses = (0, import_address_parser.default)(addressHeader.value);
            if (addresses && addresses.length && addresses[0].address) {
              const camelKey = toCamelCase(key2);
              message[camelKey] = addresses[0].address;
            }
          }
        }
        for (const key2 of ["to", "cc", "bcc", "reply-to"]) {
          const addressHeaders = this.root.headers.filter((line) => line.key === key2);
          let addresses = [];
          addressHeaders.filter((entry) => entry && entry.value).map((entry) => (0, import_address_parser.default)(entry.value)).forEach((parsed) => addresses = addresses.concat(parsed || []));
          if (addresses && addresses.length) {
            const camelKey = toCamelCase(key2);
            message[camelKey] = addresses;
          }
        }
        for (const key2 of ["subject", "message-id", "in-reply-to", "references"]) {
          const header = this.root.headers.find((line) => line.key === key2);
          if (header && header.value) {
            const camelKey = toCamelCase(key2);
            message[camelKey] = (0, import_decode_strings.decodeWords)(header.value);
          }
        }
        let dateHeader = this.root.headers.find((line) => line.key === "date");
        if (dateHeader) {
          let date = new Date(dateHeader.value);
          if (date.toString() === "Invalid Date") {
            date = dateHeader.value;
          } else {
            date = date.toISOString();
          }
          message.date = date;
        }
        if ((_a = this.textContent) == null ? void 0 : _a.html) {
          message.html = this.textContent.html;
        }
        if ((_b = this.textContent) == null ? void 0 : _b.plain) {
          message.text = this.textContent.plain;
        }
        message.attachments = this.attachments;
        message.headerLines = (this.root.rawHeaderLines || []).slice().reverse();
        switch (this.attachmentEncoding) {
          case "arraybuffer":
            break;
          case "base64":
            for (let attachment of message.attachments || []) {
              if (attachment == null ? void 0 : attachment.content) {
                attachment.content = (0, import_base64_encoder.base64ArrayBuffer)(attachment.content);
                attachment.encoding = "base64";
              }
            }
            break;
          case "utf8":
            let attachmentDecoder = new TextDecoder("utf8");
            for (let attachment of message.attachments || []) {
              if (attachment == null ? void 0 : attachment.content) {
                attachment.content = attachmentDecoder.decode(attachment.content);
                attachment.encoding = "utf8";
              }
            }
            break;
          default:
            throw new Error("Unknown attachment encoding");
        }
        return message;
      }
    };
    if (module2.exports.default) {
      defaultExport = module2.exports.default;
      namedExports = {};
      for (key in module2.exports) {
        if (key !== "default" && key !== "__esModule") {
          namedExports[key] = module2.exports[key];
        }
      }
      module2.exports = defaultExport;
      Object.assign(module2.exports, namedExports);
      Object.defineProperty(module2.exports, "__esModule", { value: true });
      module2.exports.default = defaultExport;
    }
    var defaultExport;
    var namedExports;
    var key;
  }
});

// node_modules/standardwebhooks/dist/timing_safe_equal.js
var require_timing_safe_equal = __commonJS({
  "node_modules/standardwebhooks/dist/timing_safe_equal.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.timingSafeEqual = void 0;
    function assert(expr, msg = "") {
      if (!expr) {
        throw new Error(msg);
      }
    }
    function timingSafeEqual(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      if (!(a instanceof DataView)) {
        a = new DataView(ArrayBuffer.isView(a) ? a.buffer : a);
      }
      if (!(b instanceof DataView)) {
        b = new DataView(ArrayBuffer.isView(b) ? b.buffer : b);
      }
      assert(a instanceof DataView);
      assert(b instanceof DataView);
      const length = a.byteLength;
      let out = 0;
      let i = -1;
      while (++i < length) {
        out |= a.getUint8(i) ^ b.getUint8(i);
      }
      return out === 0;
    }
    exports2.timingSafeEqual = timingSafeEqual;
  }
});

// node_modules/@stablelib/base64/lib/base64.js
var require_base64 = __commonJS({
  "node_modules/@stablelib/base64/lib/base64.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var INVALID_BYTE = 256;
    var Coder = (
      /** @class */
      (function() {
        function Coder2(_paddingCharacter) {
          if (_paddingCharacter === void 0) {
            _paddingCharacter = "=";
          }
          this._paddingCharacter = _paddingCharacter;
        }
        Coder2.prototype.encodedLength = function(length) {
          if (!this._paddingCharacter) {
            return (length * 8 + 5) / 6 | 0;
          }
          return (length + 2) / 3 * 4 | 0;
        };
        Coder2.prototype.encode = function(data) {
          var out = "";
          var i = 0;
          for (; i < data.length - 2; i += 3) {
            var c = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
            out += this._encodeByte(c >>> 3 * 6 & 63);
            out += this._encodeByte(c >>> 2 * 6 & 63);
            out += this._encodeByte(c >>> 1 * 6 & 63);
            out += this._encodeByte(c >>> 0 * 6 & 63);
          }
          var left = data.length - i;
          if (left > 0) {
            var c = data[i] << 16 | (left === 2 ? data[i + 1] << 8 : 0);
            out += this._encodeByte(c >>> 3 * 6 & 63);
            out += this._encodeByte(c >>> 2 * 6 & 63);
            if (left === 2) {
              out += this._encodeByte(c >>> 1 * 6 & 63);
            } else {
              out += this._paddingCharacter || "";
            }
            out += this._paddingCharacter || "";
          }
          return out;
        };
        Coder2.prototype.maxDecodedLength = function(length) {
          if (!this._paddingCharacter) {
            return (length * 6 + 7) / 8 | 0;
          }
          return length / 4 * 3 | 0;
        };
        Coder2.prototype.decodedLength = function(s) {
          return this.maxDecodedLength(s.length - this._getPaddingLength(s));
        };
        Coder2.prototype.decode = function(s) {
          if (s.length === 0) {
            return new Uint8Array(0);
          }
          var paddingLength = this._getPaddingLength(s);
          var length = s.length - paddingLength;
          var out = new Uint8Array(this.maxDecodedLength(length));
          var op = 0;
          var i = 0;
          var haveBad = 0;
          var v0 = 0, v1 = 0, v2 = 0, v3 = 0;
          for (; i < length - 4; i += 4) {
            v0 = this._decodeChar(s.charCodeAt(i + 0));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = v0 << 2 | v1 >>> 4;
            out[op++] = v1 << 4 | v2 >>> 2;
            out[op++] = v2 << 6 | v3;
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
            haveBad |= v2 & INVALID_BYTE;
            haveBad |= v3 & INVALID_BYTE;
          }
          if (i < length - 1) {
            v0 = this._decodeChar(s.charCodeAt(i));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            out[op++] = v0 << 2 | v1 >>> 4;
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
          }
          if (i < length - 2) {
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            out[op++] = v1 << 4 | v2 >>> 2;
            haveBad |= v2 & INVALID_BYTE;
          }
          if (i < length - 3) {
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = v2 << 6 | v3;
            haveBad |= v3 & INVALID_BYTE;
          }
          if (haveBad !== 0) {
            throw new Error("Base64Coder: incorrect characters for decoding");
          }
          return out;
        };
        Coder2.prototype._encodeByte = function(b) {
          var result = b;
          result += 65;
          result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
          result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
          result += 61 - b >>> 8 & 52 - 48 - 62 + 43;
          result += 62 - b >>> 8 & 62 - 43 - 63 + 47;
          return String.fromCharCode(result);
        };
        Coder2.prototype._decodeChar = function(c) {
          var result = INVALID_BYTE;
          result += (42 - c & c - 44) >>> 8 & -INVALID_BYTE + c - 43 + 62;
          result += (46 - c & c - 48) >>> 8 & -INVALID_BYTE + c - 47 + 63;
          result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
          result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
          result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
          return result;
        };
        Coder2.prototype._getPaddingLength = function(s) {
          var paddingLength = 0;
          if (this._paddingCharacter) {
            for (var i = s.length - 1; i >= 0; i--) {
              if (s[i] !== this._paddingCharacter) {
                break;
              }
              paddingLength++;
            }
            if (s.length < 4 || paddingLength > 2) {
              throw new Error("Base64Coder: incorrect padding");
            }
          }
          return paddingLength;
        };
        return Coder2;
      })()
    );
    exports2.Coder = Coder;
    var stdCoder = new Coder();
    function encode(data) {
      return stdCoder.encode(data);
    }
    exports2.encode = encode;
    function decode(s) {
      return stdCoder.decode(s);
    }
    exports2.decode = decode;
    var URLSafeCoder = (
      /** @class */
      (function(_super) {
        __extends(URLSafeCoder2, _super);
        function URLSafeCoder2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        URLSafeCoder2.prototype._encodeByte = function(b) {
          var result = b;
          result += 65;
          result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
          result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
          result += 61 - b >>> 8 & 52 - 48 - 62 + 45;
          result += 62 - b >>> 8 & 62 - 45 - 63 + 95;
          return String.fromCharCode(result);
        };
        URLSafeCoder2.prototype._decodeChar = function(c) {
          var result = INVALID_BYTE;
          result += (44 - c & c - 46) >>> 8 & -INVALID_BYTE + c - 45 + 62;
          result += (94 - c & c - 96) >>> 8 & -INVALID_BYTE + c - 95 + 63;
          result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
          result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
          result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
          return result;
        };
        return URLSafeCoder2;
      })(Coder)
    );
    exports2.URLSafeCoder = URLSafeCoder;
    var urlSafeCoder = new URLSafeCoder();
    function encodeURLSafe(data) {
      return urlSafeCoder.encode(data);
    }
    exports2.encodeURLSafe = encodeURLSafe;
    function decodeURLSafe(s) {
      return urlSafeCoder.decode(s);
    }
    exports2.decodeURLSafe = decodeURLSafe;
    exports2.encodedLength = function(length) {
      return stdCoder.encodedLength(length);
    };
    exports2.maxDecodedLength = function(length) {
      return stdCoder.maxDecodedLength(length);
    };
    exports2.decodedLength = function(s) {
      return stdCoder.decodedLength(s);
    };
  }
});

// node_modules/fast-sha256/sha256.js
var require_sha256 = __commonJS({
  "node_modules/fast-sha256/sha256.js"(exports2, module2) {
    (function(root, factory) {
      var exports3 = {};
      factory(exports3);
      var sha256 = exports3["default"];
      for (var k in exports3) {
        sha256[k] = exports3[k];
      }
      if (typeof module2 === "object" && typeof module2.exports === "object") {
        module2.exports = sha256;
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          return sha256;
        });
      } else {
        root.sha256 = sha256;
      }
    })(exports2, function(exports3) {
      "use strict";
      exports3.__esModule = true;
      exports3.digestLength = 32;
      exports3.blockSize = 64;
      var K = new Uint32Array([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      function hashBlocks(w, v, p, pos, len) {
        var a, b, c, d, e, f, g, h, u, i, j, t1, t2;
        while (len >= 64) {
          a = v[0];
          b = v[1];
          c = v[2];
          d = v[3];
          e = v[4];
          f = v[5];
          g = v[6];
          h = v[7];
          for (i = 0; i < 16; i++) {
            j = pos + i * 4;
            w[i] = (p[j] & 255) << 24 | (p[j + 1] & 255) << 16 | (p[j + 2] & 255) << 8 | p[j + 3] & 255;
          }
          for (i = 16; i < 64; i++) {
            u = w[i - 2];
            t1 = (u >>> 17 | u << 32 - 17) ^ (u >>> 19 | u << 32 - 19) ^ u >>> 10;
            u = w[i - 15];
            t2 = (u >>> 7 | u << 32 - 7) ^ (u >>> 18 | u << 32 - 18) ^ u >>> 3;
            w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
          }
          for (i = 0; i < 64; i++) {
            t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f ^ ~e & g) | 0) + (h + (K[i] + w[i] | 0) | 0) | 0;
            t2 = ((a >>> 2 | a << 32 - 2) ^ (a >>> 13 | a << 32 - 13) ^ (a >>> 22 | a << 32 - 22)) + (a & b ^ a & c ^ b & c) | 0;
            h = g;
            g = f;
            f = e;
            e = d + t1 | 0;
            d = c;
            c = b;
            b = a;
            a = t1 + t2 | 0;
          }
          v[0] += a;
          v[1] += b;
          v[2] += c;
          v[3] += d;
          v[4] += e;
          v[5] += f;
          v[6] += g;
          v[7] += h;
          pos += 64;
          len -= 64;
        }
        return pos;
      }
      var Hash = (
        /** @class */
        (function() {
          function Hash2() {
            this.digestLength = exports3.digestLength;
            this.blockSize = exports3.blockSize;
            this.state = new Int32Array(8);
            this.temp = new Int32Array(64);
            this.buffer = new Uint8Array(128);
            this.bufferLength = 0;
            this.bytesHashed = 0;
            this.finished = false;
            this.reset();
          }
          Hash2.prototype.reset = function() {
            this.state[0] = 1779033703;
            this.state[1] = 3144134277;
            this.state[2] = 1013904242;
            this.state[3] = 2773480762;
            this.state[4] = 1359893119;
            this.state[5] = 2600822924;
            this.state[6] = 528734635;
            this.state[7] = 1541459225;
            this.bufferLength = 0;
            this.bytesHashed = 0;
            this.finished = false;
            return this;
          };
          Hash2.prototype.clean = function() {
            for (var i = 0; i < this.buffer.length; i++) {
              this.buffer[i] = 0;
            }
            for (var i = 0; i < this.temp.length; i++) {
              this.temp[i] = 0;
            }
            this.reset();
          };
          Hash2.prototype.update = function(data, dataLength) {
            if (dataLength === void 0) {
              dataLength = data.length;
            }
            if (this.finished) {
              throw new Error("SHA256: can't update because hash was finished.");
            }
            var dataPos = 0;
            this.bytesHashed += dataLength;
            if (this.bufferLength > 0) {
              while (this.bufferLength < 64 && dataLength > 0) {
                this.buffer[this.bufferLength++] = data[dataPos++];
                dataLength--;
              }
              if (this.bufferLength === 64) {
                hashBlocks(this.temp, this.state, this.buffer, 0, 64);
                this.bufferLength = 0;
              }
            }
            if (dataLength >= 64) {
              dataPos = hashBlocks(this.temp, this.state, data, dataPos, dataLength);
              dataLength %= 64;
            }
            while (dataLength > 0) {
              this.buffer[this.bufferLength++] = data[dataPos++];
              dataLength--;
            }
            return this;
          };
          Hash2.prototype.finish = function(out) {
            if (!this.finished) {
              var bytesHashed = this.bytesHashed;
              var left = this.bufferLength;
              var bitLenHi = bytesHashed / 536870912 | 0;
              var bitLenLo = bytesHashed << 3;
              var padLength = bytesHashed % 64 < 56 ? 64 : 128;
              this.buffer[left] = 128;
              for (var i = left + 1; i < padLength - 8; i++) {
                this.buffer[i] = 0;
              }
              this.buffer[padLength - 8] = bitLenHi >>> 24 & 255;
              this.buffer[padLength - 7] = bitLenHi >>> 16 & 255;
              this.buffer[padLength - 6] = bitLenHi >>> 8 & 255;
              this.buffer[padLength - 5] = bitLenHi >>> 0 & 255;
              this.buffer[padLength - 4] = bitLenLo >>> 24 & 255;
              this.buffer[padLength - 3] = bitLenLo >>> 16 & 255;
              this.buffer[padLength - 2] = bitLenLo >>> 8 & 255;
              this.buffer[padLength - 1] = bitLenLo >>> 0 & 255;
              hashBlocks(this.temp, this.state, this.buffer, 0, padLength);
              this.finished = true;
            }
            for (var i = 0; i < 8; i++) {
              out[i * 4 + 0] = this.state[i] >>> 24 & 255;
              out[i * 4 + 1] = this.state[i] >>> 16 & 255;
              out[i * 4 + 2] = this.state[i] >>> 8 & 255;
              out[i * 4 + 3] = this.state[i] >>> 0 & 255;
            }
            return this;
          };
          Hash2.prototype.digest = function() {
            var out = new Uint8Array(this.digestLength);
            this.finish(out);
            return out;
          };
          Hash2.prototype._saveState = function(out) {
            for (var i = 0; i < this.state.length; i++) {
              out[i] = this.state[i];
            }
          };
          Hash2.prototype._restoreState = function(from, bytesHashed) {
            for (var i = 0; i < this.state.length; i++) {
              this.state[i] = from[i];
            }
            this.bytesHashed = bytesHashed;
            this.finished = false;
            this.bufferLength = 0;
          };
          return Hash2;
        })()
      );
      exports3.Hash = Hash;
      var HMAC = (
        /** @class */
        (function() {
          function HMAC2(key) {
            this.inner = new Hash();
            this.outer = new Hash();
            this.blockSize = this.inner.blockSize;
            this.digestLength = this.inner.digestLength;
            var pad = new Uint8Array(this.blockSize);
            if (key.length > this.blockSize) {
              new Hash().update(key).finish(pad).clean();
            } else {
              for (var i = 0; i < key.length; i++) {
                pad[i] = key[i];
              }
            }
            for (var i = 0; i < pad.length; i++) {
              pad[i] ^= 54;
            }
            this.inner.update(pad);
            for (var i = 0; i < pad.length; i++) {
              pad[i] ^= 54 ^ 92;
            }
            this.outer.update(pad);
            this.istate = new Uint32Array(8);
            this.ostate = new Uint32Array(8);
            this.inner._saveState(this.istate);
            this.outer._saveState(this.ostate);
            for (var i = 0; i < pad.length; i++) {
              pad[i] = 0;
            }
          }
          HMAC2.prototype.reset = function() {
            this.inner._restoreState(this.istate, this.inner.blockSize);
            this.outer._restoreState(this.ostate, this.outer.blockSize);
            return this;
          };
          HMAC2.prototype.clean = function() {
            for (var i = 0; i < this.istate.length; i++) {
              this.ostate[i] = this.istate[i] = 0;
            }
            this.inner.clean();
            this.outer.clean();
          };
          HMAC2.prototype.update = function(data) {
            this.inner.update(data);
            return this;
          };
          HMAC2.prototype.finish = function(out) {
            if (this.outer.finished) {
              this.outer.finish(out);
            } else {
              this.inner.finish(out);
              this.outer.update(out, this.digestLength).finish(out);
            }
            return this;
          };
          HMAC2.prototype.digest = function() {
            var out = new Uint8Array(this.digestLength);
            this.finish(out);
            return out;
          };
          return HMAC2;
        })()
      );
      exports3.HMAC = HMAC;
      function hash(data) {
        var h = new Hash().update(data);
        var digest = h.digest();
        h.clean();
        return digest;
      }
      exports3.hash = hash;
      exports3["default"] = hash;
      function hmac(key, data) {
        var h = new HMAC(key).update(data);
        var digest = h.digest();
        h.clean();
        return digest;
      }
      exports3.hmac = hmac;
      function fillBuffer(buffer, hmac2, info, counter) {
        var num = counter[0];
        if (num === 0) {
          throw new Error("hkdf: cannot expand more");
        }
        hmac2.reset();
        if (num > 1) {
          hmac2.update(buffer);
        }
        if (info) {
          hmac2.update(info);
        }
        hmac2.update(counter);
        hmac2.finish(buffer);
        counter[0]++;
      }
      var hkdfSalt = new Uint8Array(exports3.digestLength);
      function hkdf(key, salt, info, length) {
        if (salt === void 0) {
          salt = hkdfSalt;
        }
        if (length === void 0) {
          length = 32;
        }
        var counter = new Uint8Array([1]);
        var okm = hmac(salt, key);
        var hmac_ = new HMAC(okm);
        var buffer = new Uint8Array(hmac_.digestLength);
        var bufpos = buffer.length;
        var out = new Uint8Array(length);
        for (var i = 0; i < length; i++) {
          if (bufpos === buffer.length) {
            fillBuffer(buffer, hmac_, info, counter);
            bufpos = 0;
          }
          out[i] = buffer[bufpos++];
        }
        hmac_.clean();
        buffer.fill(0);
        counter.fill(0);
        return out;
      }
      exports3.hkdf = hkdf;
      function pbkdf2(password, salt, iterations, dkLen) {
        var prf = new HMAC(password);
        var len = prf.digestLength;
        var ctr = new Uint8Array(4);
        var t = new Uint8Array(len);
        var u = new Uint8Array(len);
        var dk = new Uint8Array(dkLen);
        for (var i = 0; i * len < dkLen; i++) {
          var c = i + 1;
          ctr[0] = c >>> 24 & 255;
          ctr[1] = c >>> 16 & 255;
          ctr[2] = c >>> 8 & 255;
          ctr[3] = c >>> 0 & 255;
          prf.reset();
          prf.update(salt);
          prf.update(ctr);
          prf.finish(u);
          for (var j = 0; j < len; j++) {
            t[j] = u[j];
          }
          for (var j = 2; j <= iterations; j++) {
            prf.reset();
            prf.update(u).finish(u);
            for (var k = 0; k < len; k++) {
              t[k] ^= u[k];
            }
          }
          for (var j = 0; j < len && i * len + j < dkLen; j++) {
            dk[i * len + j] = t[j];
          }
        }
        for (var i = 0; i < len; i++) {
          t[i] = u[i] = 0;
        }
        for (var i = 0; i < 4; i++) {
          ctr[i] = 0;
        }
        prf.clean();
        return dk;
      }
      exports3.pbkdf2 = pbkdf2;
    });
  }
});

// node_modules/standardwebhooks/dist/index.js
var require_dist = __commonJS({
  "node_modules/standardwebhooks/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Webhook = exports2.WebhookVerificationError = void 0;
    var timing_safe_equal_1 = require_timing_safe_equal();
    var base64 = require_base64();
    var sha256 = require_sha256();
    var WEBHOOK_TOLERANCE_IN_SECONDS = 5 * 60;
    var ExtendableError = class _ExtendableError extends Error {
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, _ExtendableError.prototype);
        this.name = "ExtendableError";
        this.stack = new Error(message).stack;
      }
    };
    var WebhookVerificationError = class _WebhookVerificationError extends ExtendableError {
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, _WebhookVerificationError.prototype);
        this.name = "WebhookVerificationError";
      }
    };
    exports2.WebhookVerificationError = WebhookVerificationError;
    var Webhook = class _Webhook {
      constructor(secret, options) {
        if (!secret) {
          throw new Error("Secret can't be empty.");
        }
        if ((options === null || options === void 0 ? void 0 : options.format) === "raw") {
          if (secret instanceof Uint8Array) {
            this.key = secret;
          } else {
            this.key = Uint8Array.from(secret, (c) => c.charCodeAt(0));
          }
        } else {
          if (typeof secret !== "string") {
            throw new Error("Expected secret to be of type string");
          }
          if (secret.startsWith(_Webhook.prefix)) {
            secret = secret.substring(_Webhook.prefix.length);
          }
          this.key = base64.decode(secret);
        }
      }
      verify(payload, headers_) {
        const headers = {};
        for (const key of Object.keys(headers_)) {
          headers[key.toLowerCase()] = headers_[key];
        }
        const msgId = headers["webhook-id"];
        const msgSignature = headers["webhook-signature"];
        const msgTimestamp = headers["webhook-timestamp"];
        if (!msgSignature || !msgId || !msgTimestamp) {
          throw new WebhookVerificationError("Missing required headers");
        }
        const timestamp = this.verifyTimestamp(msgTimestamp);
        const computedSignature = this.sign(msgId, timestamp, payload);
        const expectedSignature = computedSignature.split(",")[1];
        const passedSignatures = msgSignature.split(" ");
        const encoder = new globalThis.TextEncoder();
        for (const versionedSignature of passedSignatures) {
          const [version, signature] = versionedSignature.split(",");
          if (version !== "v1") {
            continue;
          }
          if ((0, timing_safe_equal_1.timingSafeEqual)(encoder.encode(signature), encoder.encode(expectedSignature))) {
            return JSON.parse(payload.toString());
          }
        }
        throw new WebhookVerificationError("No matching signature found");
      }
      sign(msgId, timestamp, payload) {
        if (typeof payload === "string") {
        } else if (payload.constructor.name === "Buffer") {
          payload = payload.toString();
        } else {
          throw new Error("Expected payload to be of type string or Buffer.");
        }
        const encoder = new TextEncoder();
        const timestampNumber = Math.floor(timestamp.getTime() / 1e3);
        const toSign = encoder.encode(`${msgId}.${timestampNumber}.${payload}`);
        const expectedSignature = base64.encode(sha256.hmac(this.key, toSign));
        return `v1,${expectedSignature}`;
      }
      verifyTimestamp(timestampHeader) {
        const now = Math.floor(Date.now() / 1e3);
        const timestamp = parseInt(timestampHeader, 10);
        if (isNaN(timestamp)) {
          throw new WebhookVerificationError("Invalid Signature Headers");
        }
        if (now - timestamp > WEBHOOK_TOLERANCE_IN_SECONDS) {
          throw new WebhookVerificationError("Message timestamp too old");
        }
        if (timestamp > now + WEBHOOK_TOLERANCE_IN_SECONDS) {
          throw new WebhookVerificationError("Message timestamp too new");
        }
        return new Date(timestamp * 1e3);
      }
    };
    exports2.Webhook = Webhook;
    Webhook.prefix = "whsec_";
  }
});

// node_modules/resend/dist/index.cjs
var require_dist2 = __commonJS({
  "node_modules/resend/dist/index.cjs"(exports2) {
    Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames2(from), i = 0, n = keys.length, key; i < n; i++) {
        key = keys[i];
        if (!__hasOwnProp2.call(to, key) && key !== except) __defProp2(to, key, {
          get: ((k) => from[k]).bind(null, key),
          enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", {
      value: mod,
      enumerable: true
    }) : target, mod));
    var postal_mime = require_postal_mime();
    postal_mime = __toESM2(postal_mime);
    var standardwebhooks = require_dist();
    var version = "6.14.0";
    function buildPaginationQuery(options) {
      const searchParams = new URLSearchParams();
      if (options.limit !== void 0) searchParams.set("limit", options.limit.toString());
      if ("after" in options && options.after !== void 0) searchParams.set("after", options.after);
      if ("before" in options && options.before !== void 0) searchParams.set("before", options.before);
      return searchParams.toString();
    }
    var ApiKeys = class {
      constructor(resend) {
        this.resend = resend;
      }
      async create(payload, options = {}) {
        return await this.resend.post("/api-keys", payload, options);
      }
      async list(options = {}) {
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/api-keys?${queryString}` : "/api-keys";
        return await this.resend.get(url);
      }
      async remove(id) {
        return await this.resend.delete(`/api-keys/${id}`);
      }
    };
    var AutomationRuns = class {
      constructor(resend) {
        this.resend = resend;
      }
      async get(options) {
        return await this.resend.get(`/automations/${options.automationId}/runs/${options.runId}`);
      }
      async list(options) {
        const queryString = buildPaginationQuery(options);
        const searchParams = new URLSearchParams(queryString);
        if (options.status) {
          const statusValue = Array.isArray(options.status) ? options.status.join(",") : options.status;
          searchParams.set("status", statusValue);
        }
        const qs = searchParams.toString();
        const url = qs ? `/automations/${options.automationId}/runs?${qs}` : `/automations/${options.automationId}/runs`;
        return await this.resend.get(url);
      }
    };
    function parseStepConfig(step) {
      switch (step.type) {
        case "trigger":
          return {
            key: step.key,
            type: step.type,
            config: { event_name: step.config.eventName }
          };
        case "delay":
          return {
            key: step.key,
            type: step.type,
            config: step.config
          };
        case "send_email":
          return {
            key: step.key,
            type: step.type,
            config: {
              template: step.config.template,
              subject: step.config.subject,
              from: step.config.from,
              reply_to: step.config.replyTo
            }
          };
        case "wait_for_event":
          return {
            key: step.key,
            type: step.type,
            config: {
              event_name: step.config.eventName,
              timeout: step.config.timeout,
              filter_rule: step.config.filterRule
            }
          };
        case "condition":
          return {
            key: step.key,
            type: step.type,
            config: step.config
          };
        case "contact_update":
          return {
            key: step.key,
            type: step.type,
            config: {
              first_name: step.config.firstName,
              last_name: step.config.lastName,
              unsubscribed: step.config.unsubscribed,
              properties: step.config.properties
            }
          };
        case "contact_delete":
          return {
            key: step.key,
            type: step.type,
            config: step.config
          };
        case "add_to_segment":
          return {
            key: step.key,
            type: step.type,
            config: { segment_id: step.config.segmentId }
          };
      }
    }
    function parseConnection(connection) {
      return {
        from: connection.from,
        to: connection.to,
        type: connection.type
      };
    }
    function parseAutomationToApiOptions(automation) {
      return {
        name: automation.name,
        status: automation.status,
        steps: automation.steps.map(parseStepConfig),
        connections: automation.connections.map(parseConnection)
      };
    }
    function parseEventToApiOptions(event) {
      return {
        event: event.event,
        contact_id: event.contactId,
        email: event.email,
        payload: event.payload
      };
    }
    var Automations = class {
      constructor(resend) {
        this.resend = resend;
        this.runs = new AutomationRuns(this.resend);
      }
      async create(payload) {
        return await this.resend.post("/automations", parseAutomationToApiOptions(payload));
      }
      async list(options = {}) {
        const params = [buildPaginationQuery(options)];
        if (options.status) params.push(`status=${encodeURIComponent(options.status)}`);
        const qs = params.filter(Boolean).join("&");
        const url = qs ? `/automations?${qs}` : "/automations";
        return await this.resend.get(url);
      }
      async get(id) {
        return await this.resend.get(`/automations/${id}`);
      }
      async remove(id) {
        return await this.resend.delete(`/automations/${id}`);
      }
      async update(id, payload) {
        const apiPayload = {};
        if (payload.name !== void 0) apiPayload.name = payload.name;
        if (payload.status !== void 0) apiPayload.status = payload.status;
        if (payload.steps !== void 0) apiPayload.steps = payload.steps.map(parseStepConfig);
        if (payload.connections !== void 0) apiPayload.connections = payload.connections.map(parseConnection);
        return await this.resend.patch(`/automations/${id}`, apiPayload);
      }
      async stop(id) {
        return await this.resend.post(`/automations/${id}/stop`);
      }
    };
    function parseAttachments(attachments) {
      return attachments?.map((attachment) => ({
        content: attachment.content,
        filename: attachment.filename,
        path: attachment.path,
        content_type: attachment.contentType,
        content_id: attachment.contentId
      }));
    }
    function parseEmailToApiOptions(email) {
      return {
        attachments: parseAttachments(email.attachments),
        bcc: email.bcc,
        cc: email.cc,
        from: email.from,
        headers: email.headers,
        html: email.html,
        reply_to: email.replyTo,
        scheduled_at: email.scheduledAt,
        subject: email.subject,
        tags: email.tags,
        text: email.text,
        to: email.to,
        template: email.template ? {
          id: email.template.id,
          variables: email.template.variables
        } : void 0,
        topic_id: email.topicId
      };
    }
    async function render(node) {
      let render2;
      try {
        ({ render: render2 } = await import("@react-email/render"));
      } catch {
        throw new Error("Failed to render React component. Make sure to install `@react-email/render` or `@react-email/components`.");
      }
      return render2(node);
    }
    var Batch = class {
      constructor(resend) {
        this.resend = resend;
      }
      async send(payload, options) {
        return this.create(payload, options);
      }
      async create(payload, options) {
        const emails = [];
        for (const email of payload) {
          if (email.react) {
            email.html = await render(email.react);
            email.react = void 0;
          }
          emails.push(parseEmailToApiOptions(email));
        }
        return await this.resend.post("/emails/batch", emails, {
          ...options,
          headers: {
            "x-batch-validation": options?.batchValidation ?? "strict",
            ...options?.headers
          }
        });
      }
    };
    var Broadcasts = class {
      constructor(resend) {
        this.resend = resend;
      }
      async create(payload, options = {}) {
        const html = payload.react ? await render(payload.react) : payload.html;
        return await this.resend.post("/broadcasts", {
          name: payload.name,
          segment_id: payload.segmentId,
          audience_id: payload.audienceId,
          preview_text: payload.previewText,
          from: payload.from,
          html,
          reply_to: payload.replyTo,
          subject: payload.subject,
          text: payload.text,
          topic_id: payload.topicId,
          send: payload.send,
          scheduled_at: payload.scheduledAt
        }, options);
      }
      async send(id, payload) {
        return await this.resend.post(`/broadcasts/${id}/send`, { scheduled_at: payload?.scheduledAt });
      }
      async list(options = {}) {
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/broadcasts?${queryString}` : "/broadcasts";
        return await this.resend.get(url);
      }
      async get(id) {
        return await this.resend.get(`/broadcasts/${id}`);
      }
      async remove(id) {
        return await this.resend.delete(`/broadcasts/${id}`);
      }
      async update(id, payload) {
        const html = payload.react ? await render(payload.react) : payload.html;
        return await this.resend.patch(`/broadcasts/${id}`, {
          name: payload.name,
          segment_id: payload.segmentId,
          audience_id: payload.audienceId,
          from: payload.from,
          html,
          text: payload.text,
          subject: payload.subject,
          reply_to: payload.replyTo,
          preview_text: payload.previewText,
          topic_id: payload.topicId
        });
      }
    };
    function parseContactPropertyFromApi(contactProperty) {
      return {
        id: contactProperty.id,
        key: contactProperty.key,
        createdAt: contactProperty.created_at,
        type: contactProperty.type,
        fallbackValue: contactProperty.fallback_value
      };
    }
    function parseContactPropertyToApiOptions(contactProperty) {
      if ("key" in contactProperty) return {
        key: contactProperty.key,
        type: contactProperty.type,
        fallback_value: contactProperty.fallbackValue
      };
      return { fallback_value: contactProperty.fallbackValue };
    }
    var ContactProperties = class {
      constructor(resend) {
        this.resend = resend;
      }
      async create(options) {
        const apiOptions = parseContactPropertyToApiOptions(options);
        return await this.resend.post("/contact-properties", apiOptions);
      }
      async list(options = {}) {
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/contact-properties?${queryString}` : "/contact-properties";
        const response = await this.resend.get(url);
        if (response.data) return {
          data: {
            ...response.data,
            data: response.data.data.map((apiContactProperty) => parseContactPropertyFromApi(apiContactProperty))
          },
          headers: response.headers,
          error: null
        };
        return response;
      }
      async get(id) {
        if (!id) return {
          data: null,
          headers: null,
          error: {
            message: "Missing `id` field.",
            statusCode: null,
            name: "missing_required_field"
          }
        };
        const response = await this.resend.get(`/contact-properties/${id}`);
        if (response.data) return {
          data: {
            object: "contact_property",
            ...parseContactPropertyFromApi(response.data)
          },
          headers: response.headers,
          error: null
        };
        return response;
      }
      async update(payload) {
        if (!payload.id) return {
          data: null,
          headers: null,
          error: {
            message: "Missing `id` field.",
            statusCode: null,
            name: "missing_required_field"
          }
        };
        const apiOptions = parseContactPropertyToApiOptions(payload);
        return await this.resend.patch(`/contact-properties/${payload.id}`, apiOptions);
      }
      async remove(id) {
        if (!id) return {
          data: null,
          headers: null,
          error: {
            message: "Missing `id` field.",
            statusCode: null,
            name: "missing_required_field"
          }
        };
        return await this.resend.delete(`/contact-properties/${id}`);
      }
    };
    var ContactImports = class {
      constructor(resend) {
        this.resend = resend;
      }
      async create(payload, options = {}) {
        const formData = this.buildCreateFormData(payload);
        return this.resend.post("/contacts/imports", formData, options);
      }
      async list(options = {}) {
        const searchParams = new URLSearchParams(buildPaginationQuery(options));
        if (options.status !== void 0) searchParams.set("status", options.status);
        const queryString = searchParams.toString();
        const url = queryString ? `/contacts/imports?${queryString}` : "/contacts/imports";
        return this.resend.get(url);
      }
      async get(id) {
        return this.resend.get(`/contacts/imports/${id}`);
      }
      buildCreateFormData(payload) {
        const formData = new FormData();
        formData.append("file", payload.file);
        this.appendField(formData, "column_map", this.buildColumnMap(payload.columnMap ?? null));
        this.appendField(formData, "on_conflict", payload.onConflict ?? null);
        this.appendField(formData, "segments", payload.segments ?? null);
        this.appendField(formData, "topics", payload.topics ?? null);
        return formData;
      }
      buildColumnMap(columnMap) {
        if (columnMap === null) return null;
        return {
          email: columnMap.email,
          first_name: columnMap.firstName,
          last_name: columnMap.lastName,
          unsubscribed: columnMap.unsubscribed,
          properties: columnMap.properties
        };
      }
      appendField(formData, name, value) {
        if (value === null) return;
        formData.append(name, typeof value === "string" ? value : JSON.stringify(value));
      }
    };
    var ContactSegments = class {
      constructor(resend) {
        this.resend = resend;
      }
      async list(options) {
        if (!options.contactId && !options.email) return {
          data: null,
          headers: null,
          error: {
            message: "Missing `id` or `email` field.",
            statusCode: null,
            name: "missing_required_field"
          }
        };
        const identifier = options.email ? options.email : options.contactId;
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/contacts/${identifier}/segments?${queryString}` : `/contacts/${identifier}/segments`;
        return await this.resend.get(url);
      }
      async add(options) {
        if (!options.contactId && !options.email) return {
          data: null,
          headers: null,
          error: {
            message: "Missing `id` or `email` field.",
            statusCode: null,
            name: "missing_required_field"
          }
        };
        const identifier = options.email ? options.email : options.contactId;
        return this.resend.post(`/contacts/${identifier}/segments/${options.segmentId}`);
      }
      async remove(options) {
        if (!options.contactId && !options.email) return {
          data: null,
          headers: null,
          error: {
            message: "Missing `id` or `email` field.",
            statusCode: null,
            name: "missing_required_field"
          }
        };
        const identifier = options.email ? options.email : options.contactId;
        return this.resend.delete(`/contacts/${identifier}/segments/${options.segmentId}`);
      }
    };
    var ContactTopics = class {
      constructor(resend) {
        this.resend = resend;
      }
      async update(payload) {
        if (!payload.id && !payload.email) return {
          data: null,
          headers: null,
          error: {
            message: "Missing `id` or `email` field.",
            statusCode: null,
            name: "missing_required_field"
          }
        };
        const identifier = payload.email ? payload.email : payload.id;
        return this.resend.patch(`/contacts/${identifier}/topics`, payload.topics);
      }
      async list(options) {
        if (!options.id && !options.email) return {
          data: null,
          headers: null,
          error: {
            message: "Missing `id` or `email` field.",
            statusCode: null,
            name: "missing_required_field"
          }
        };
        const identifier = options.email ? options.email : options.id;
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/contacts/${identifier}/topics?${queryString}` : `/contacts/${identifier}/topics`;
        return this.resend.get(url);
      }
    };
    var Contacts = class {
      constructor(resend) {
        this.resend = resend;
        this.imports = new ContactImports(this.resend);
        this.topics = new ContactTopics(this.resend);
        this.segments = new ContactSegments(this.resend);
      }
      async create(payload, options = {}) {
        if ("audienceId" in payload) {
          if ("segments" in payload || "topics" in payload) return {
            data: null,
            headers: null,
            error: {
              message: "`audienceId` is deprecated, and cannot be used together with `segments` or `topics`. Use `segments` instead to add one or more segments to the new contact.",
              statusCode: null,
              name: "invalid_parameter"
            }
          };
          return await this.resend.post(`/audiences/${payload.audienceId}/contacts`, {
            unsubscribed: payload.unsubscribed,
            email: payload.email,
            first_name: payload.firstName,
            last_name: payload.lastName,
            properties: payload.properties
          }, options);
        }
        return await this.resend.post("/contacts", {
          unsubscribed: payload.unsubscribed,
          email: payload.email,
          first_name: payload.firstName,
          last_name: payload.lastName,
          properties: payload.properties,
          segments: payload.segments,
          topics: payload.topics
        }, options);
      }
      async list(options = {}) {
        const segmentId = options.segmentId ?? options.audienceId;
        if (!segmentId) {
          const queryString2 = buildPaginationQuery(options);
          const url2 = queryString2 ? `/contacts?${queryString2}` : "/contacts";
          return await this.resend.get(url2);
        }
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/segments/${segmentId}/contacts?${queryString}` : `/segments/${segmentId}/contacts`;
        return await this.resend.get(url);
      }
      async get(options) {
        if (typeof options === "string") return this.resend.get(`/contacts/${options}`);
        if (!options.id && !options.email) return {
          data: null,
          headers: null,
          error: {
            message: "Missing `id` or `email` field.",
            statusCode: null,
            name: "missing_required_field"
          }
        };
        if (!options.audienceId) return this.resend.get(`/contacts/${options?.email ? options?.email : options?.id}`);
        return this.resend.get(`/audiences/${options.audienceId}/contacts/${options?.email ? options?.email : options?.id}`);
      }
      async update(options) {
        if (!options.id && !options.email) return {
          data: null,
          headers: null,
          error: {
            message: "Missing `id` or `email` field.",
            statusCode: null,
            name: "missing_required_field"
          }
        };
        if (!options.audienceId) return await this.resend.patch(`/contacts/${options?.email ? options?.email : options?.id}`, {
          unsubscribed: options.unsubscribed,
          first_name: options.firstName,
          last_name: options.lastName,
          properties: options.properties
        });
        return await this.resend.patch(`/audiences/${options.audienceId}/contacts/${options?.email ? options?.email : options?.id}`, {
          unsubscribed: options.unsubscribed,
          first_name: options.firstName,
          last_name: options.lastName,
          properties: options.properties
        });
      }
      async remove(payload) {
        if (typeof payload === "string") return this.resend.delete(`/contacts/${payload}`);
        if (!payload.id && !payload.email) return {
          data: null,
          headers: null,
          error: {
            message: "Missing `id` or `email` field.",
            statusCode: null,
            name: "missing_required_field"
          }
        };
        if (!payload.audienceId) return this.resend.delete(`/contacts/${payload?.email ? payload?.email : payload?.id}`);
        return this.resend.delete(`/audiences/${payload.audienceId}/contacts/${payload?.email ? payload?.email : payload?.id}`);
      }
    };
    function parseDomainToApiOptions(domain) {
      return {
        name: domain.name,
        region: domain.region,
        custom_return_path: domain.customReturnPath,
        capabilities: domain.capabilities,
        open_tracking: domain.openTracking,
        click_tracking: domain.clickTracking,
        tls: domain.tls,
        tracking_subdomain: domain.trackingSubdomain
      };
    }
    var DomainClaims = class {
      constructor(resend) {
        this.resend = resend;
      }
      async create(payload, options = {}) {
        return await this.resend.post("/domains/claim", {
          name: payload.name,
          region: payload.region,
          custom_return_path: payload.customReturnPath,
          open_tracking: payload.openTracking,
          click_tracking: payload.clickTracking,
          tracking_subdomain: payload.trackingSubdomain
        }, options);
      }
      async get(domainId) {
        return await this.resend.get(`/domains/${domainId}/claim`);
      }
      async verify(domainId) {
        return await this.resend.post(`/domains/${domainId}/claim/verify`);
      }
    };
    var Domains = class {
      constructor(resend) {
        this.resend = resend;
        this.claims = new DomainClaims(this.resend);
      }
      async create(payload, options = {}) {
        return await this.resend.post("/domains", parseDomainToApiOptions(payload), options);
      }
      async list(options = {}) {
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/domains?${queryString}` : "/domains";
        return await this.resend.get(url);
      }
      async get(id) {
        return await this.resend.get(`/domains/${id}`);
      }
      async update(payload) {
        return await this.resend.patch(`/domains/${payload.id}`, {
          click_tracking: payload.clickTracking,
          open_tracking: payload.openTracking,
          tls: payload.tls,
          capabilities: payload.capabilities,
          tracking_subdomain: payload.trackingSubdomain
        });
      }
      async remove(id) {
        return await this.resend.delete(`/domains/${id}`);
      }
      async verify(id) {
        return await this.resend.post(`/domains/${id}/verify`);
      }
    };
    var Attachments$1 = class {
      constructor(resend) {
        this.resend = resend;
      }
      async get(options) {
        const { emailId, id } = options;
        return await this.resend.get(`/emails/${emailId}/attachments/${id}`);
      }
      async list(options) {
        const { emailId } = options;
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/emails/${emailId}/attachments?${queryString}` : `/emails/${emailId}/attachments`;
        return await this.resend.get(url);
      }
    };
    var Attachments = class {
      constructor(resend) {
        this.resend = resend;
      }
      async get(options) {
        const { emailId, id } = options;
        return await this.resend.get(`/emails/receiving/${emailId}/attachments/${id}`);
      }
      async list(options) {
        const { emailId } = options;
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/emails/receiving/${emailId}/attachments?${queryString}` : `/emails/receiving/${emailId}/attachments`;
        return await this.resend.get(url);
      }
    };
    var Receiving = class {
      constructor(resend) {
        this.resend = resend;
        this.attachments = new Attachments(resend);
      }
      async get(id, options = {}) {
        const searchParams = new URLSearchParams();
        if (options.html_format !== void 0) searchParams.set("html_format", options.html_format);
        const queryString = searchParams.toString();
        const path = queryString ? `/emails/receiving/${id}?${queryString}` : `/emails/receiving/${id}`;
        return await this.resend.get(path);
      }
      async list(options = {}) {
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/emails/receiving?${queryString}` : "/emails/receiving";
        return await this.resend.get(url);
      }
      async forward(options) {
        const { emailId, to, from } = options;
        const passthrough = options.passthrough !== false;
        const emailResponse = await this.get(emailId);
        if (emailResponse.error) return {
          data: null,
          error: emailResponse.error,
          headers: emailResponse.headers
        };
        const email = emailResponse.data;
        const originalSubject = email.subject || "(no subject)";
        if (passthrough) return this.forwardPassthrough(email, {
          to,
          from,
          subject: originalSubject
        });
        const forwardSubject = originalSubject.startsWith("Fwd:") ? originalSubject : `Fwd: ${originalSubject}`;
        return this.forwardWrapped(email, {
          to,
          from,
          subject: forwardSubject,
          text: "text" in options ? options.text : void 0,
          html: "html" in options ? options.html : void 0
        });
      }
      async forwardPassthrough(email, options) {
        const { to, from, subject } = options;
        if (!email.raw?.download_url) return {
          data: null,
          error: {
            name: "validation_error",
            message: "Raw email content is not available for this email",
            statusCode: 400
          },
          headers: null
        };
        const rawResponse = await fetch(email.raw.download_url);
        if (!rawResponse.ok) return {
          data: null,
          error: {
            name: "application_error",
            message: "Failed to download raw email content",
            statusCode: rawResponse.status
          },
          headers: null
        };
        const rawEmailContent = await rawResponse.text();
        const parsed = await postal_mime.default.parse(rawEmailContent, { attachmentEncoding: "base64" });
        const attachments = parsed.attachments.map((attachment) => {
          const contentId = attachment.contentId ? attachment.contentId.replace(/^<|>$/g, "") : void 0;
          return {
            filename: attachment.filename,
            content: attachment.content.toString(),
            content_type: attachment.mimeType,
            content_id: contentId || void 0
          };
        });
        return await this.resend.post("/emails", {
          from,
          to,
          subject,
          text: parsed.text || void 0,
          html: parsed.html || void 0,
          attachments: attachments.length > 0 ? attachments : void 0
        });
      }
      async forwardWrapped(email, options) {
        const { to, from, subject, text, html } = options;
        if (!email.raw?.download_url) return {
          data: null,
          error: {
            name: "validation_error",
            message: "Raw email content is not available for this email",
            statusCode: 400
          },
          headers: null
        };
        const rawResponse = await fetch(email.raw.download_url);
        if (!rawResponse.ok) return {
          data: null,
          error: {
            name: "application_error",
            message: "Failed to download raw email content",
            statusCode: rawResponse.status
          },
          headers: null
        };
        const rawEmailContent = await rawResponse.text();
        return await this.resend.post("/emails", {
          from,
          to,
          subject,
          text,
          html,
          attachments: [{
            filename: "forwarded_message.eml",
            content: Buffer.from(rawEmailContent).toString("base64"),
            content_type: "message/rfc822"
          }]
        });
      }
    };
    var Emails = class {
      constructor(resend) {
        this.resend = resend;
        this.attachments = new Attachments$1(resend);
        this.receiving = new Receiving(resend);
      }
      async send(payload, options = {}) {
        return this.create(payload, options);
      }
      async create(payload, options = {}) {
        const body = { ...payload };
        if (payload.react) body.html = await render(payload.react);
        return await this.resend.post("/emails", parseEmailToApiOptions(body), options);
      }
      async get(id) {
        return await this.resend.get(`/emails/${id}`);
      }
      async list(options = {}) {
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/emails?${queryString}` : "/emails";
        return await this.resend.get(url);
      }
      async update(payload) {
        return await this.resend.patch(`/emails/${payload.id}`, { scheduled_at: payload.scheduledAt });
      }
      async cancel(id) {
        return await this.resend.post(`/emails/${id}/cancel`);
      }
    };
    var Events = class {
      constructor(resend) {
        this.resend = resend;
      }
      async send(payload) {
        return await this.resend.post("/events/send", parseEventToApiOptions(payload));
      }
      async create(payload) {
        return await this.resend.post("/events", payload);
      }
      async get(identifier) {
        return await this.resend.get(`/events/${encodeURIComponent(identifier)}`);
      }
      async list(options = {}) {
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/events?${queryString}` : "/events";
        return await this.resend.get(url);
      }
      async update(identifier, payload) {
        return await this.resend.patch(`/events/${encodeURIComponent(identifier)}`, payload);
      }
      async remove(identifier) {
        return await this.resend.delete(`/events/${encodeURIComponent(identifier)}`);
      }
    };
    var Logs = class {
      constructor(resend) {
        this.resend = resend;
      }
      async list(options = {}) {
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/logs?${queryString}` : "/logs";
        return await this.resend.get(url);
      }
      async get(id) {
        return await this.resend.get(`/logs/${id}`);
      }
    };
    var Segments = class {
      constructor(resend) {
        this.resend = resend;
      }
      async create(payload, options = {}) {
        return await this.resend.post("/segments", payload, options);
      }
      async list(options = {}) {
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/segments?${queryString}` : "/segments";
        return await this.resend.get(url);
      }
      async get(id) {
        return await this.resend.get(`/segments/${id}`);
      }
      async remove(id) {
        return await this.resend.delete(`/segments/${id}`);
      }
    };
    function getPaginationQueryProperties(options = {}) {
      const query = new URLSearchParams();
      if (options.before) query.set("before", options.before);
      if (options.after) query.set("after", options.after);
      if (options.limit) query.set("limit", options.limit.toString());
      return query.size > 0 ? `?${query.toString()}` : "";
    }
    function parseVariables(variables) {
      return variables?.map((variable) => ({
        key: variable.key,
        type: variable.type,
        fallback_value: variable.fallbackValue
      }));
    }
    function parseTemplateToApiOptions(template) {
      return {
        name: "name" in template ? template.name : void 0,
        subject: template.subject,
        html: template.html,
        text: template.text,
        alias: template.alias,
        from: template.from,
        reply_to: template.replyTo,
        variables: parseVariables(template.variables)
      };
    }
    var ChainableTemplateResult = class {
      constructor(promise, publishFn) {
        this.promise = promise;
        this.publishFn = publishFn;
      }
      then(onfulfilled, onrejected) {
        return this.promise.then(onfulfilled, onrejected);
      }
      async publish() {
        const { data, error } = await this.promise;
        if (error) return {
          data: null,
          headers: null,
          error
        };
        return this.publishFn(data.id);
      }
    };
    var Templates = class {
      constructor(resend) {
        this.resend = resend;
      }
      create(payload) {
        return new ChainableTemplateResult(this.performCreate(payload), this.publish.bind(this));
      }
      async performCreate(payload) {
        const body = { ...payload };
        if (payload.react) body.html = await render(payload.react);
        return this.resend.post("/templates", parseTemplateToApiOptions(body));
      }
      async remove(identifier) {
        return await this.resend.delete(`/templates/${identifier}`);
      }
      async get(identifier) {
        return await this.resend.get(`/templates/${identifier}`);
      }
      async list(options = {}) {
        return this.resend.get(`/templates${getPaginationQueryProperties(options)}`);
      }
      duplicate(identifier) {
        return new ChainableTemplateResult(this.resend.post(`/templates/${identifier}/duplicate`), this.publish.bind(this));
      }
      async publish(identifier) {
        return await this.resend.post(`/templates/${identifier}/publish`);
      }
      async update(identifier, payload) {
        return await this.resend.patch(`/templates/${identifier}`, parseTemplateToApiOptions(payload));
      }
    };
    var Topics = class {
      constructor(resend) {
        this.resend = resend;
      }
      async create(payload) {
        const { defaultSubscription, ...body } = payload;
        return await this.resend.post("/topics", {
          ...body,
          default_subscription: defaultSubscription
        });
      }
      async list() {
        return await this.resend.get("/topics");
      }
      async get(id) {
        if (!id) return {
          data: null,
          headers: null,
          error: {
            message: "Missing `id` field.",
            statusCode: null,
            name: "missing_required_field"
          }
        };
        return await this.resend.get(`/topics/${id}`);
      }
      async update(payload) {
        if (!payload.id) return {
          data: null,
          headers: null,
          error: {
            message: "Missing `id` field.",
            statusCode: null,
            name: "missing_required_field"
          }
        };
        return await this.resend.patch(`/topics/${payload.id}`, payload);
      }
      async remove(id) {
        if (!id) return {
          data: null,
          headers: null,
          error: {
            message: "Missing `id` field.",
            statusCode: null,
            name: "missing_required_field"
          }
        };
        return await this.resend.delete(`/topics/${id}`);
      }
    };
    var Webhooks = class {
      constructor(resend) {
        this.resend = resend;
      }
      async create(payload, options = {}) {
        return await this.resend.post("/webhooks", payload, options);
      }
      async get(id) {
        return await this.resend.get(`/webhooks/${id}`);
      }
      async list(options = {}) {
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/webhooks?${queryString}` : "/webhooks";
        return await this.resend.get(url);
      }
      async update(id, payload) {
        return await this.resend.patch(`/webhooks/${id}`, payload);
      }
      async remove(id) {
        return await this.resend.delete(`/webhooks/${id}`);
      }
      verify(payload) {
        return new standardwebhooks.Webhook(payload.webhookSecret).verify(payload.payload, {
          "webhook-id": payload.headers.id,
          "webhook-timestamp": payload.headers.timestamp,
          "webhook-signature": payload.headers.signature
        });
      }
    };
    var defaultBaseUrl = "https://api.resend.com";
    var defaultUserAgent = `resend-node:${version}`;
    function getDefaultBaseUrl() {
      return typeof process !== "undefined" && process.env ? process.env.RESEND_BASE_URL || defaultBaseUrl : defaultBaseUrl;
    }
    function getDefaultUserAgent() {
      return typeof process !== "undefined" && process.env ? process.env.RESEND_USER_AGENT || defaultUserAgent : defaultUserAgent;
    }
    var Resend2 = class {
      constructor(key, options) {
        this.key = key;
        this.segments = new Segments(this);
        this.apiKeys = new ApiKeys(this);
        this.audiences = this.segments;
        this.automations = new Automations(this);
        this.batch = new Batch(this);
        this.broadcasts = new Broadcasts(this);
        this.contactProperties = new ContactProperties(this);
        this.contacts = new Contacts(this);
        this.domains = new Domains(this);
        this.emails = new Emails(this);
        this.events = new Events(this);
        this.logs = new Logs(this);
        this.templates = new Templates(this);
        this.topics = new Topics(this);
        this.webhooks = new Webhooks(this);
        if (!key) {
          if (typeof process !== "undefined" && process.env) this.key = process.env.RESEND_API_KEY;
          if (!this.key) throw new Error('Missing API key. Pass it to the constructor `new Resend("re_123")`');
        }
        this.baseUrl = options?.baseUrl ?? getDefaultBaseUrl();
        this.userAgent = options?.userAgent ?? getDefaultUserAgent();
        this.headers = new Headers({
          Authorization: `Bearer ${this.key}`,
          "User-Agent": this.userAgent,
          "Content-Type": "application/json"
        });
      }
      async fetchRequest(path, options = {}) {
        try {
          const response = await fetch(`${this.baseUrl}${path}`, options);
          if (!response.ok) try {
            const rawError = await response.text();
            return {
              data: null,
              error: JSON.parse(rawError),
              headers: Object.fromEntries(response.headers.entries())
            };
          } catch (err) {
            if (err instanceof SyntaxError) return {
              data: null,
              error: {
                name: "application_error",
                statusCode: response.status,
                message: "Internal server error. We are unable to process your request right now, please try again later."
              },
              headers: Object.fromEntries(response.headers.entries())
            };
            const error = {
              message: response.statusText,
              statusCode: response.status,
              name: "application_error"
            };
            if (err instanceof Error) return {
              data: null,
              error: {
                ...error,
                message: err.message
              },
              headers: Object.fromEntries(response.headers.entries())
            };
            return {
              data: null,
              error,
              headers: Object.fromEntries(response.headers.entries())
            };
          }
          return {
            data: await response.json(),
            error: null,
            headers: Object.fromEntries(response.headers.entries())
          };
        } catch {
          return {
            data: null,
            error: {
              name: "application_error",
              statusCode: null,
              message: "Unable to fetch data. The request could not be resolved."
            },
            headers: null
          };
        }
      }
      async post(path, entity, options = {}) {
        const headers = new Headers(this.headers);
        const isFormData = typeof FormData !== "undefined" && entity instanceof FormData;
        if (isFormData) headers.delete("Content-Type");
        if (options.headers) for (const [key, value] of new Headers(options.headers).entries()) headers.set(key, value);
        if (options.idempotencyKey) headers.set("Idempotency-Key", options.idempotencyKey);
        const requestOptions = {
          method: "POST",
          body: isFormData ? entity : JSON.stringify(entity),
          ...options,
          headers
        };
        return this.fetchRequest(path, requestOptions);
      }
      async get(path, options = {}) {
        const headers = new Headers(this.headers);
        if (options.headers) for (const [key, value] of new Headers(options.headers).entries()) headers.set(key, value);
        const requestOptions = {
          method: "GET",
          ...options,
          headers
        };
        return this.fetchRequest(path, requestOptions);
      }
      async put(path, entity, options = {}) {
        const headers = new Headers(this.headers);
        if (options.headers) for (const [key, value] of new Headers(options.headers).entries()) headers.set(key, value);
        const requestOptions = {
          method: "PUT",
          body: JSON.stringify(entity),
          ...options,
          headers
        };
        return this.fetchRequest(path, requestOptions);
      }
      async patch(path, entity, options = {}) {
        const headers = new Headers(this.headers);
        if (options.headers) for (const [key, value] of new Headers(options.headers).entries()) headers.set(key, value);
        const requestOptions = {
          method: "PATCH",
          body: JSON.stringify(entity),
          ...options,
          headers
        };
        return this.fetchRequest(path, requestOptions);
      }
      async delete(path, query, options = {}) {
        const headers = new Headers(this.headers);
        if (options.headers) for (const [key, value] of new Headers(options.headers).entries()) headers.set(key, value);
        const requestOptions = {
          method: "DELETE",
          body: query === void 0 ? void 0 : JSON.stringify(query),
          ...options,
          headers
        };
        return this.fetchRequest(path, requestOptions);
      }
    };
    exports2.Resend = Resend2;
  }
});

// netlify/functions/send-contact-message.js
var { getStore } = require_main();
var { Resend } = require_dist2();
var ALLOWED_REASONS = ["Customer Question", "App Issue", "Other"];
var MAX_MESSAGE_LENGTH = 2e3;
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);
}
var RATE_LIMIT = 5;
var WINDOW_MS = 60 * 60 * 1e3;
async function checkRateLimit(ip) {
  try {
    const store = getStore({ name: "rate-limits", consistency: "strong" });
    const key = `contact-message:${ip}`;
    const now = Date.now();
    const data = await store.get(key, { type: "json" });
    if (!data || now - data.windowStart >= WINDOW_MS) {
      await store.set(key, JSON.stringify({ count: 1, windowStart: now, alerted: false }));
      return "allow";
    }
    if (data.count >= RATE_LIMIT) {
      if (!data.alerted) {
        await store.set(key, JSON.stringify({ ...data, alerted: true }));
        return "block-and-alert";
      }
      return "block";
    }
    await store.set(key, JSON.stringify({ ...data, count: data.count + 1 }));
    return "allow";
  } catch (err) {
    console.error("contact rate limit check failed:", err);
    return "allow";
  }
}
async function sendSpamAlert(resend, ip) {
  try {
    await resend.emails.send({
      from: "Brian\xE7on Fant\xF4mes <noreply@brianconfantomes.com>",
      to: "brianconfantomes@gmail.com",
      subject: "\u26A0\uFE0F Spam alert \u2014 contact form rate limit hit",
      html: `
        <div style="font-family:Arial,sans-serif;background:#111827;color:#f9fafb;padding:32px;">
          <h2 style="color:#fbbf24;margin:0 0 16px;">\u26A0\uFE0F Rate limit triggered</h2>
          <p>An IP address has made <strong>${RATE_LIMIT}+ requests</strong> to <code>send-contact-message</code> within one hour.</p>
          <p style="color:#9ca3af;">IP: <code>${ip}</code> \u2014 further requests from it are blocked for the rest of the hour.</p>
        </div>
      `
    });
  } catch (err) {
    console.error("Failed to send spam alert:", err);
  }
}
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const ip = event.headers["x-forwarded-for"]?.split(",")[0].trim() || event.headers["client-ip"] || "unknown";
  const resend = new Resend(process.env.RESEND_API_KEY);
  const rateStatus = await checkRateLimit(ip);
  if (rateStatus === "block-and-alert") {
    await sendSpamAlert(resend, ip);
  }
  if (rateStatus === "block" || rateStatus === "block-and-alert") {
    return {
      statusCode: 429,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Too many requests. Please try again later." })
    };
  }
  try {
    const { reason, email, message } = JSON.parse(event.body);
    if (!reason || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" })
      };
    }
    if (!ALLOWED_REASONS.includes(reason)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid reason" }) };
    }
    if (!EMAIL_RE.test(email)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid email" }) };
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return { statusCode: 400, body: JSON.stringify({ error: "Message too long" }) };
    }
    await resend.emails.send({
      from: "Brian\xE7on Fant\xF4mes <noreply@brianconfantomes.com>",
      to: "brianconfantomes@gmail.com",
      replyTo: email,
      subject: `WEBSITE CONTACT: ${reason}`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#111827;color:#f9fafb;padding:32px;">
          <h2 style="color:#fbbf24;margin:0 0 16px;">New website contact message</h2>
          <table style="margin:0 0 20px;border-collapse:collapse;">
            <tr>
              <td style="color:#9ca3af;padding:4px 12px 4px 0;">Reason</td>
              <td style="color:#f9fafb;">${reason}</td>
            </tr>
            <tr>
              <td style="color:#9ca3af;padding:4px 12px 4px 0;">From</td>
              <td style="color:#f9fafb;">${escapeHtml(email)}</td>
            </tr>
          </table>
          <p style="color:#f9fafb;white-space:pre-wrap;border-top:1px solid #374151;padding-top:16px;">${escapeHtml(message)}</p>
        </div>
      `
    });
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    console.error("send-contact-message error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to send message" })
    };
  }
};
//# sourceMappingURL=send-contact-message.js.map
