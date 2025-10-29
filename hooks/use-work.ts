import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    createWorkSample,
    fetchWorkSamples,
    fetchWorkSampleById,
    fetchWorkSamplesByTalentProfile,
    fetchWorkSamplesByType,
    fetchWorkSamplesByStatus,
    updateWorkSample,
    updateWorkSampleStatus,
    deleteWorkSample,
    deleteWorkSamplesByTalentProfile,
    countWorkSamples,
    clearError,
    clearCurrentWorkSample,
    resetWorkSamples,
    CreateWorkSampleDto,
    UpdateWorkSampleDto,
    QueryWorkSampleDto,
} from '@/lib/redux/features/works/worksSlice';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { WorkSampleType, WorkStatus } from '@/components/works/work-sample';


export const useWorkSample = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { workSamples, currentWorkSample, loading, error, count } = useSelector(
        (state: RootState) => state.workSample
    );

    const create = useCallback(
        async (data: CreateWorkSampleDto) => {
            const result = await dispatch(createWorkSample(data));
            return result;
        },
        [dispatch]
    );

    const fetchAll = useCallback(
        async (query?: QueryWorkSampleDto) => {
            const result = await dispatch(fetchWorkSamples(query ?? {}));
            return result;
        },
        [dispatch]
    );

    const fetchById = useCallback(
        async (id: string) => {
            const result = await dispatch(fetchWorkSampleById(id));
            return result;
        },
        [dispatch]
    );

    const fetchByTalentProfile = useCallback(
        async (talentProfileId: string, queryParams: Record<string, any> = {}) => {
            const result = await dispatch(
                fetchWorkSamplesByTalentProfile({ talentProfileId, queryParams })
            );
            return result;
        },
        [dispatch]
    );


    const fetchByType = useCallback(
        async (type: WorkSampleType) => {
            const result = await dispatch(fetchWorkSamplesByType(type));
            return result;
        },
        [dispatch]
    );

    const fetchByStatus = useCallback(
        async (status: WorkStatus) => {
            const result = await dispatch(fetchWorkSamplesByStatus(status));
            return result;
        },
        [dispatch]
    );

    const update = useCallback(
        async (id: string, data: UpdateWorkSampleDto) => {
            const result = await dispatch(updateWorkSample({ id, data }));
            return result;
        },
        [dispatch]
    );

    const updateStatus = useCallback(
        async (id: string, status: WorkStatus) => {
            const result = await dispatch(updateWorkSampleStatus({ id, status }));
            return result;
        },
        [dispatch]
    );

    const remove = useCallback(
        async (id: string) => {
            const result = await dispatch(deleteWorkSample(id));
            return result;
        },
        [dispatch]
    );

    const removeByTalentProfile = useCallback(
        async (talentProfileId: string) => {
            const result = await dispatch(deleteWorkSamplesByTalentProfile(talentProfileId));
            return result;
        },
        [dispatch]
    );

    const getCount = useCallback(
        async (query?: QueryWorkSampleDto) => {
            const result = await dispatch(countWorkSamples(query ?? {}));
            return result;
        },
        [dispatch]
    );

    const clearErr = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    const clearCurrent = useCallback(() => {
        dispatch(clearCurrentWorkSample());
    }, [dispatch]);

    const reset = useCallback(() => {
        dispatch(resetWorkSamples());
    }, [dispatch]);

    return {
        // State
        workSamples,
        currentWorkSample,
        loading,
        error,
        count,

        // Actions
        create,
        fetchAll,
        fetchById,
        fetchByTalentProfile,
        fetchByType,
        fetchByStatus,
        update,
        updateStatus,
        remove,
        removeByTalentProfile,
        getCount,
        clearError: clearErr,
        clearCurrentWorkSample: clearCurrent,
        reset,
    };
};