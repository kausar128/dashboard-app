import MockAdapter from 'axios-mock-adapter';
import { dataMock } from "../api/data.mock";
import apiClient from './apiClient';

export const setupMockApi = (axiosInstance: typeof apiClient) => {
  const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });
  
  dataMock(mock);
  
  mock.onAny().passThrough();
};