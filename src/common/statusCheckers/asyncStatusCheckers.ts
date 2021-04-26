import { PromiseStatuses } from '../enums/asyncActionStatuses';

export const isPending = (status: PromiseStatuses) => status === PromiseStatuses.PENDING;
export const isFulfilled = (status: PromiseStatuses) => status === PromiseStatuses.FULFILLED;
export const isRejected = (status: PromiseStatuses) => status === PromiseStatuses.REJECTED;
