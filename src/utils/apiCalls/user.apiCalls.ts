import { ICurrentUser, ISignInPayload, ISignInResponse, IWalletMessageResponse } from '@/types/user.types';
import axiosInstance from '../helpers/axiosInstance';
import { AxiosResponse } from 'axios';

export const getUserData = async (): Promise<ICurrentUser | undefined> => {
  try {
    const response: { user: ICurrentUser } = await axiosInstance({
      url: '/auth/me'
    });
    return response.user;
  } catch (error) {
    console.error('Error fetching user address:', error);
    return undefined;
  }
};

export const logoutUser = async (): Promise<{ message: string } | undefined> => {
  try {
    const response: { message: string } = await axiosInstance({
      url: '/auth/signout'
    });
    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    return undefined;
  }
};

export const getWalletMessage = async (payload: string): Promise<IWalletMessageResponse> => {
  const response: IWalletMessageResponse = await axiosInstance({
    url: '/auth/message',
    params: { address: payload }
  });
  return response;
};

export const getMessageVerified = async <T>(payload: Partial<ISignInPayload>): Promise<AxiosResponse<ISignInResponse<T>>> => {
  const response = await axiosInstance<ISignInResponse<T>>({
    url: '/auth/signin',
    method: 'post',
    data: payload
  });
  return response;
};
