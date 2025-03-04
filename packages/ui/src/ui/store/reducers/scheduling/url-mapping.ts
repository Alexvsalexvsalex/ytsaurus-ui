import _ from 'lodash';

import {initialState as schedulingInitialState} from './index';
import {initialState as tableSortState} from '../../../store/reducers/tables';

import {
    SCHEDULING_POOL_CHILDREN_TABLE_ID,
    SCHEDULING_POOL_TREE_TABLE_ID,
} from '../../../constants/scheduling';
import {parseSortState} from '../../../utils';
import produce from 'immer';
import {updateIfChanged} from '../../../utils/utils';
import {RootState} from '../../../store/reducers';
import {aclFiltersParams, getAclFiltersPreparedState} from '../acl/url-mapping';

export const schedulingParams = {
    pool: {
        stateKey: 'scheduling.pool',
        initialState: '<Root>',
    },
    tree: {
        stateKey: 'scheduling.tree',
        initialState: schedulingInitialState.tree,
    },
};

export function getSchedulingPreparedState(state: RootState, {query}: {query: RootState}) {
    return produce(state, (draft) => {
        updateIfChanged(draft.scheduling, 'pool', query.scheduling.pool);
        updateIfChanged(draft.scheduling, 'tree', query.scheduling.tree);
    });
}

export const schedulingOverviewParams = {
    ...schedulingParams,
    filter: {
        stateKey: 'scheduling.filter',
        initialState: schedulingInitialState.filter,
    },
    sortState: {
        stateKey: `tables.${SCHEDULING_POOL_TREE_TABLE_ID}`,
        initialState: {...tableSortState[SCHEDULING_POOL_TREE_TABLE_ID]},
        options: {parse: parseSortState},
        type: 'object',
    },
    abc: {
        stateKey: 'scheduling.abcServiceFilter',
        initialState: schedulingInitialState.abcServiceFilter,
        type: 'object',
    },
};

export function getSchedulingOverviewPreparedState(state: RootState, {query}: {query: RootState}) {
    state = getSchedulingPreparedState(state, {query});
    return produce(state, (draft) => {
        updateIfChanged(draft.scheduling, 'filter', query.scheduling.filter);
        updateIfChanged(draft.scheduling, 'abcServiceFilter', query.scheduling.abcServiceFilter);
        updateIfChanged(
            draft.tables,
            SCHEDULING_POOL_TREE_TABLE_ID,
            query.tables[SCHEDULING_POOL_TREE_TABLE_ID],
        );
    });
}

export const schedulingDetailsParams = {
    ...schedulingParams,
    filter: {
        stateKey: 'scheduling.poolChildrenFilter',
        initialState: schedulingInitialState.poolChildrenFilter,
    },
    contentMode: {
        stateKey: 'scheduling.contentMode',
        initialState: schedulingInitialState.contentMode,
    },
    sortState: {
        stateKey: `tables.${SCHEDULING_POOL_CHILDREN_TABLE_ID}`,
        initialState: {...tableSortState[SCHEDULING_POOL_CHILDREN_TABLE_ID]},
        options: {parse: parseSortState},
        type: 'object',
    },
};

export const schedulingMonitorParams = {
    ...schedulingParams,
};

export const schedulingAclParams = {
    ...schedulingParams,
    ...aclFiltersParams,
};

export function getSchedulingDetailsPreparedState(state: RootState, {query}: {query: RootState}) {
    state = getSchedulingPreparedState(state, {query});
    return produce(state, (draft) => {
        updateIfChanged(
            draft.scheduling,
            'poolChildrenFilter',
            query.scheduling.poolChildrenFilter,
        );
        updateIfChanged(draft.scheduling, 'contentMode', query.scheduling.contentMode);
        updateIfChanged(
            draft.tables,
            SCHEDULING_POOL_CHILDREN_TABLE_ID,
            query.tables[SCHEDULING_POOL_CHILDREN_TABLE_ID],
        );
    });
}

export function getSchedulingMonitorPreparedState(state: RootState, location: {query: RootState}) {
    return getSchedulingPreparedState(state, location);
}

export function getSchedulingAclPreparedState(prevState: RootState, {query}: {query: RootState}) {
    const state = getAclFiltersPreparedState(prevState, {query});
    return getSchedulingPreparedState(state, {query});
}
