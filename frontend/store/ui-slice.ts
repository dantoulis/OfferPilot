import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type {
  ApplicationPriorityFilter,
  ApplicationSort,
  ApplicationStatusFilter,
} from "@/features/applications/types"
import type { CompanySort } from "@/features/companies/types"

type UiState = {
  applicationSearch: string
  applicationStatusFilter: ApplicationStatusFilter
  applicationPriorityFilter: ApplicationPriorityFilter
  applicationSort: ApplicationSort
  companySearch: string
  companySort: CompanySort
  dashboardView: "board" | "analytics"
}

const initialState: UiState = {
  applicationSearch: "",
  applicationStatusFilter: "all",
  applicationPriorityFilter: "all",
  applicationSort: "updated_desc",
  companySearch: "",
  companySort: "active_desc",
  dashboardView: "board",
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setApplicationSearch: (state, action: PayloadAction<string>) => {
      state.applicationSearch = action.payload
    },
    setApplicationStatusFilter: (
      state,
      action: PayloadAction<ApplicationStatusFilter>
    ) => {
      state.applicationStatusFilter = action.payload
    },
    setApplicationPriorityFilter: (
      state,
      action: PayloadAction<ApplicationPriorityFilter>
    ) => {
      state.applicationPriorityFilter = action.payload
    },
    setApplicationSort: (state, action: PayloadAction<ApplicationSort>) => {
      state.applicationSort = action.payload
    },
    setCompanySearch: (state, action: PayloadAction<string>) => {
      state.companySearch = action.payload
    },
    setCompanySort: (state, action: PayloadAction<CompanySort>) => {
      state.companySort = action.payload
    },
    setDashboardView: (state, action: PayloadAction<UiState["dashboardView"]>) => {
      state.dashboardView = action.payload
    },
  },
})

export const {
  setApplicationPriorityFilter,
  setApplicationSearch,
  setApplicationSort,
  setApplicationStatusFilter,
  setCompanySearch,
  setCompanySort,
  setDashboardView,
} = uiSlice.actions

export const uiReducer = uiSlice.reducer
