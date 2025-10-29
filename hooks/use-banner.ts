import {
    fetchBanners,
    fetchBannerById,
    createBanner,
    updateBanner,
    deleteBanner,
    clearError,
    clearCurrentBanner,
} from '@/lib/redux/features/banners/bannerSlice';
import { BannerType, CreateBannerInput, UpdateBannerInput } from '@/types/banner.types';
import { useAppDispatch, useAppSelector } from './hooks';

export const useBanner = () => {
    const dispatch = useAppDispatch();
    const { banners, currentBanner, loading, error } = useAppSelector(
        (state) => state.banners
    );

    const getBanners = (type?: BannerType) => {
        dispatch(fetchBanners(type));
    };

    const getBannerById = (id: string) => {
        dispatch(fetchBannerById(id));
    };

    const addBanner = async (data: CreateBannerInput) => {
        return dispatch(createBanner(data)).unwrap();
    };

    const editBanner = async (id: string, data: UpdateBannerInput) => {
        return dispatch(updateBanner({ id, data })).unwrap();
    };

    const removeBanner = async (id: string) => {
        return dispatch(deleteBanner(id)).unwrap();
    };

    const clearBannerError = () => {
        dispatch(clearError());
    };

    const clearCurrent = () => {
        dispatch(clearCurrentBanner());
    };

    return {
        banners,
        currentBanner,
        loading,
        error,
        getBanners,
        getBannerById,
        addBanner,
        editBanner,
        removeBanner,
        clearBannerError,
        clearCurrent,
    };
};
