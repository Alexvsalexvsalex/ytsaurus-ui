export const YT_API_REQUEST_ID_HEADER = 'X-Custom-Request-Id';
export const YT_CYPRESS_COOKIE_NAME = 'YTCypressCookie';
export const YT_LOCAL_CLUSTER_ID = 'ui';
export const ODIN_PAGE_ID = 'odin';

/**
 * Allows to succeed requests when master are in read-only mode and the transaction coordinator cell is evicted
 */
export const USE_SUPRESS_SYNC = {
    suppress_transaction_coordinator_sync: true,
    suppress_upstream_sync: true,
};
