import type {
  IinitialQaMeetingValue,
  IMember,
  IQuestion,
} from "@/interfaces/storeInterfaces"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
// import type {
//   IhandleLoginPayload,
//   IinitialAuthValue,
// } from "../interfaces/storeInterfaces"
// import {
//   handleLocalStorageLogin,
//   handleLocalStorageLogout,
// } from "@/helpers/authentication"

const initialValue: IinitialQaMeetingValue = {
  members: [],
  questions: [],
}

const qaMeetingSlice = createSlice({
  name: "qaMeeting",
  initialState: initialValue,
  reducers: {
    handleMemberJoined: (state, action: PayloadAction<IMember>) => {
      let member = {
        email: action.payload.email,
        userId: action.payload.userId,
        fullname: action.payload.fullname,
      }
      if (
        state.members.find((user) => {
          return user.email == action.payload.email
        })
      ) {
      } else {
        state.members.unshift(member)
      }
    },
    handleMemberLeft: (
      state,
      action: PayloadAction<{
        email: string
      }>
    ) => {
      let index = state.members.findIndex((member) => {
        return member.email == action.payload.email
      })
      if (index >= 0) {
        state.members.splice(index, 1)
      }
    },
    handleQuestionAsked: (
      state,
      action: PayloadAction<{
        // email: string,
        question: IQuestion
      }>
    ) => {
      if (
        state.questions.find((question) => {
          return question.createdAt == action.payload.question.createdAt
        })
      ) {
      } else {
        state.questions.unshift(action.payload.question)
      }
    },
    handleSetOnRefresh: (
      _state,
      action: PayloadAction<{
        members: IMember[]
        questions: IQuestion[]
      }>
    ) => {
      //   let questions = state.questions

      let newState = {
        questions: action.payload.questions,
        members: action.payload.members,
      }
      return newState
    },
    handleOnReset: () => {
      return initialValue
    },
    // handleSetQuestions: (state,action:PayloadAction<{questions:IQuestion[]}>)=>{
    //     let
    // }
  },
})

export const {
  handleMemberJoined,
  handleMemberLeft,
  handleQuestionAsked,
  handleSetOnRefresh,
  handleOnReset,
} = qaMeetingSlice.actions

export default qaMeetingSlice
