import MockAdapter from 'axios-mock-adapter';
import { dataMock } from "../api/data.mock";
import apiClient from './apiClient';
import { mockNotifications } from './notifications.mock';


export const notificationsMock = (mock: MockAdapter) => {
  mock.onGet('/api/notifications').reply(200, mockNotifications);
};

export const setupMockApi = (axiosInstance: typeof apiClient) => {
  const mock = new MockAdapter(axiosInstance, { delayResponse: 10000 });
  
  dataMock(mock);
  notificationsMock(mock);
  mock.onAny().passThrough();
};
