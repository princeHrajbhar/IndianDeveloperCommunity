import { baseApi } from '@/src/lib/api/base-api';
import type { HRCase, HRExpense, HRHoliday, HROperationsSelf, HROpsEnvelope, HROpsList, HRPolicy, HRPolicyAck, HRTimesheet } from './hr-operations-types';
type Q={page?:number;limit?:number;employeeId?:string;status?:string;category?:string;from?:string;to?:string;search?:string};
export const hrOperationsApi=baseApi.injectEndpoints({endpoints:b=>({
 getMyHROperations:b.query<HROpsEnvelope<HROperationsSelf>,void>({query:()=>'/hr-management/operations/me',providesTags:['HROperations','HRHoliday','HRTimesheet','HRExpense','HRCase','HRPolicy']}),
 createMyHRTimesheet:b.mutation<HROpsEnvelope<HRTimesheet>,Record<string,unknown>>({query:body=>({url:'/hr-management/operations/me/timesheets',method:'POST',body}),invalidatesTags:['HROperations','HRTimesheet']}),
 createMyHRExpense:b.mutation<HROpsEnvelope<HRExpense>,Record<string,unknown>>({query:body=>({url:'/hr-management/operations/me/expenses',method:'POST',body}),invalidatesTags:['HROperations','HRExpense']}),
 createMyHRCase:b.mutation<HROpsEnvelope<HRCase>,Record<string,unknown>>({query:body=>({url:'/hr-management/operations/me/cases',method:'POST',body}),invalidatesTags:['HROperations','HRCase']}),
 acknowledgeMyHRPolicy:b.mutation<HROpsEnvelope<HRPolicyAck>,string>({query:id=>({url:`/hr-management/operations/me/policies/${id}/acknowledge`,method:'POST'}),invalidatesTags:['HROperations','HRPolicy']}),
 getHRHolidays:b.query<HROpsList<HRHoliday>,Q|void>({query:q=>({url:'/hr-management/operations/holidays',params:q||{}}),providesTags:['HRHoliday']}),
 saveHRHoliday:b.mutation<HROpsEnvelope<HRHoliday>,Record<string,unknown>>({query:body=>({url:'/hr-management/operations/holidays',method:'POST',body}),invalidatesTags:['HRHoliday','HROperations']}),
 updateHRHoliday:b.mutation<HROpsEnvelope<HRHoliday>,{id:string;body:Record<string,unknown>}>({query:({id,body})=>({url:`/hr-management/operations/holidays/${id}`,method:'PATCH',body}),invalidatesTags:['HRHoliday','HROperations']}),
 getHRTimesheets:b.query<HROpsList<HRTimesheet>,Q|void>({query:q=>({url:'/hr-management/operations/timesheets',params:q||{}}),providesTags:['HRTimesheet']}),
 saveHRTimesheet:b.mutation<HROpsEnvelope<HRTimesheet>,Record<string,unknown>>({query:body=>({url:'/hr-management/operations/timesheets',method:'POST',body}),invalidatesTags:['HRTimesheet']}),
 decideHRTimesheet:b.mutation<HROpsEnvelope<HRTimesheet>,{id:string;status:'approved'|'rejected';note?:string}>({query:({id,...body})=>({url:`/hr-management/operations/timesheets/${id}/decision`,method:'PATCH',body}),invalidatesTags:['HRTimesheet','HROperations']}),
 getHRExpenses:b.query<HROpsList<HRExpense>,Q|void>({query:q=>({url:'/hr-management/operations/expenses',params:q||{}}),providesTags:['HRExpense']}),
 saveHRExpense:b.mutation<HROpsEnvelope<HRExpense>,Record<string,unknown>>({query:body=>({url:'/hr-management/operations/expenses',method:'POST',body}),invalidatesTags:['HRExpense']}),
 decideHRExpense:b.mutation<HROpsEnvelope<HRExpense>,{id:string;status:'approved'|'rejected'|'paid';note?:string;paymentReference?:string}>({query:({id,...body})=>({url:`/hr-management/operations/expenses/${id}/decision`,method:'PATCH',body}),invalidatesTags:['HRExpense','HROperations']}),
 getHRCases:b.query<HROpsList<HRCase>,Q|void>({query:q=>({url:'/hr-management/operations/cases',params:q||{}}),providesTags:['HRCase']}),
 saveHRCase:b.mutation<HROpsEnvelope<HRCase>,Record<string,unknown>>({query:body=>({url:'/hr-management/operations/cases',method:'POST',body}),invalidatesTags:['HRCase']}),
 updateHRCase:b.mutation<HROpsEnvelope<HRCase>,{id:string;body:Record<string,unknown>}>({query:({id,body})=>({url:`/hr-management/operations/cases/${id}`,method:'PATCH',body}),invalidatesTags:['HRCase','HROperations']}),
 getHRPolicies:b.query<HROpsList<HRPolicy>,Q|void>({query:q=>({url:'/hr-management/operations/policies',params:q||{}}),providesTags:['HRPolicy']}),
 saveHRPolicy:b.mutation<HROpsEnvelope<HRPolicy>,Record<string,unknown>>({query:body=>({url:'/hr-management/operations/policies',method:'POST',body}),invalidatesTags:['HRPolicy','HROperations']}),
 updateHRPolicy:b.mutation<HROpsEnvelope<HRPolicy>,{id:string;body:Record<string,unknown>}>({query:({id,body})=>({url:`/hr-management/operations/policies/${id}`,method:'PATCH',body}),invalidatesTags:['HRPolicy','HROperations']}),
 getHRPolicyAcknowledgements:b.query<HROpsEnvelope<HRPolicyAck[]>,string>({query:id=>`/hr-management/operations/policies/${id}/acknowledgements`,providesTags:['HRPolicy']}),
})});
export const {useGetMyHROperationsQuery,useCreateMyHRTimesheetMutation,useCreateMyHRExpenseMutation,useCreateMyHRCaseMutation,useAcknowledgeMyHRPolicyMutation,useGetHRHolidaysQuery,useSaveHRHolidayMutation,useUpdateHRHolidayMutation,useGetHRTimesheetsQuery,useSaveHRTimesheetMutation,useDecideHRTimesheetMutation,useGetHRExpensesQuery,useSaveHRExpenseMutation,useDecideHRExpenseMutation,useGetHRCasesQuery,useSaveHRCaseMutation,useUpdateHRCaseMutation,useGetHRPoliciesQuery,useSaveHRPolicyMutation,useUpdateHRPolicyMutation,useGetHRPolicyAcknowledgementsQuery}=hrOperationsApi;
