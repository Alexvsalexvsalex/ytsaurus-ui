import {TabsItemProps} from '@gravity-ui/uikit';
import times_ from 'lodash/times';
import has_ from 'lodash/has';
import find_ from 'lodash/find';
import {CompletedStates, QueryItem, QueryStatus} from '../../module/api';
import {QueryStatusIcon} from '../../QueryStatus';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadQueryResultsErrors} from '../../module/query_result/actions';
import {getQueryResults} from '../../module/query_result/selectors';
import {RootState} from '../../../../store/reducers';

export enum QueryResultTab {
    ERROR = 'error',
    META = 'meta',
    RESULT = 'result',
    STATISTIC = 'statistic',
    PROGRESS = 'progress',
}

const isResultTab = (tabId: string) => tabId.startsWith('result/');

const createResultTabId = (index: number) => `result/${index}`;

const parseResultTabIndex = (tabId: string) => {
    const parts = tabId.split('/');
    return parts?.[1] ? parseInt(parts?.[1], 10) : undefined;
};

type ResultCurrentState = {
    activeTabId: string;
    category: QueryResultTab;
    activeResultParams?: {queryId: string; resultIndex: number};
};

export const useQueryResultTabs = (
    query?: QueryItem,
): [TabsItemProps[], (tab: string) => void, ResultCurrentState] => {
    const [tab, setTab] = useState<QueryResultTab>(QueryResultTab.META);
    const [activeResultParams, setResultParams] =
        useState<ResultCurrentState['activeResultParams']>(undefined);
    const dispatch = useDispatch();
    const resultsMeta = useSelector((state: RootState) => getQueryResults(state, query?.id || ''));

    const activeTabId = useMemo(() => {
        if (tab === QueryResultTab.RESULT) {
            return createResultTabId(activeResultParams?.resultIndex || 0);
        }
        return tab;
    }, [tab, activeResultParams]);

    const setActiveTab = useCallback(
        (tabId: string, queryId?: string) => {
            if (isResultTab(tabId)) {
                setTab(QueryResultTab.RESULT);
                const id = queryId || activeResultParams?.queryId;
                if (id) {
                    setResultParams({
                        queryId: id,
                        resultIndex: parseResultTabIndex(tabId) || 0,
                    });
                } else {
                    setResultParams(undefined);
                }
            } else {
                setTab(tabId as QueryResultTab);
                setResultParams(undefined);
            }
        },
        [activeResultParams],
    );

    const tabs = useMemo(() => {
        if (!query) {
            return [];
        }
        const items: TabsItemProps[] = [{id: QueryResultTab.META, title: 'Meta'}];
        if (query.progress) {
            items.unshift({
                id: QueryResultTab.PROGRESS,
                title: 'Progress',
            });
        }
        if (query.state === QueryStatus.FAILED) {
            items.unshift({id: QueryResultTab.ERROR, title: 'Error'});
        } else if (query.state === QueryStatus.COMPLETED) {
            if (query.progress?.yql_statistics) {
                items.unshift({
                    id: QueryResultTab.STATISTIC,
                    title: 'Statistics',
                });
            }
            items.unshift(
                ...times_(query.result_count, (num) => {
                    let icon;
                    if (resultsMeta && resultsMeta[num] && has_(resultsMeta[num], 'error')) {
                        icon = (
                            <QueryStatusIcon
                                status={QueryStatus.FAILED}
                                className={'query-status_tabs'}
                            />
                        );
                    }
                    return {
                        id: createResultTabId(num),
                        title: query.result_count === 1 ? 'Result' : `Result #${num + 1}`,
                        icon,
                    };
                }),
            );
        }
        return items;
    }, [query, resultsMeta]);

    const isCompleted = find_(CompletedStates, (status) => query?.state === status);

    useEffect(() => {
        if (query) {
            dispatch(loadQueryResultsErrors(query));
        }
        setActiveTab(tabs?.[0]?.id, query?.id);
    }, [dispatch, query?.id, isCompleted]);

    return [
        tabs,
        setActiveTab,
        {
            activeTabId,
            category: tab,
            activeResultParams,
        },
    ];
};
