import LoadingScreen from "@/components/my-components/LoadingScreen"
import MyTextarea from "@/components/my-components/MyTextarea"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSocket } from "@/context/SocketContext"
import { isNotEmpty, timeAgo } from "@/helpers/validation"
import useAppDispatch from "@/hooks/useAppDispatch"
import useAppSelector from "@/hooks/useAppSelector"
import useInputValidation from "@/hooks/useInputValidation"
import {
  AskQuestionHandler,
  endLiveQaHandler,
  getLiveQaDataHandler,
  userLeftMeetingHandler,
} from "@/http/apiHandlers"
import type { IMember } from "@/interfaces/storeInterfaces"
import {
  handleMemberLeft,
  handleQuestionAsked,
  handleSetOnRefresh,
} from "@/store/qaMeetingSlice"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { toast } from "sonner"
// import { useNavigate } from "react-router"
// import { useNavigate } from "react-router"

const QAMeeting: React.FC = () => {
  const teamId = useAppSelector((state) => state.auth.teamID)
  const token = useAppSelector((state) => state.auth.token)
  const members = useAppSelector((state) => state.qaMeeting.members)
  const questions = useAppSelector((state) => state.qaMeeting.questions)
  const email = useAppSelector((state) => {
    return state.auth.email
  })
  //   const navigate = useNavigate()
  const { data, isError, isLoading } = useQuery({
    queryKey: ["qa-live-data", token],
    queryFn: getLiveQaDataHandler,
    retry: false,
    staleTime: Infinity,
  })
  console.log("email", email)

  const dispatch = useAppDispatch()
  let meetingmembers: IMember[] = []

  if (data) {
    console.log("data from live qa-", data)

    if (data)
      meetingmembers = data.existingMeeting.members.map((user: any) => {
        return {
          email: user.email,
          userId: user._id,
          fullname: user.fullName,
        }
      })
  }

  if (isError) {
    // navigate("/employee-dashboard")
    console.log("error while getting live data.")
  }

  useEffect(() => {
    if (data) {
      console.log("data from live qa-", data)

      meetingmembers = data.existingMeeting.members.map((user: any) => {
        return {
          email: user.email,
          userId: user._id,
          fullname: user.fullName,
        }
      })
      dispatch(
        handleSetOnRefresh({
          members: meetingmembers,
          questions: data.existingMeeting.questions,
        })
      )
    }
  }, [data])

  const {
    mutate: endLiveQaMutate,
    isError: endLiveQaIsError,
    reset: endLiveQaReset,
    isPending: endLivePending,
  } = useMutation({
    mutationFn: endLiveQaHandler,
  })
  if (endLiveQaIsError) {
    toast.error("error while ending live QA", {
      classNames: {
        toast: "!bg-red-400 !text-gray-100 !border-0",
      },
      position: "top-right",
    })
    endLiveQaReset()
  }
  const handleEndMeeting = () => {
    endLiveQaMutate()
  }

  const { mutate: userLeftMutate } = useMutation({
    mutationFn: userLeftMeetingHandler,
  })

  let socket = useSocket()
  useEffect(() => {
    if (!socket) return

    // const handleUserJoined = (data: any) => {
    //   console.log("data from user joined", data)
    //   // show alert
    //   //   setIsMeetingAlertOpen(true)
    // }
    const handleQuestionAskedIO = (data: any) => {
      console.log("data from question asked", data)
      dispatch(
        handleQuestionAsked({
          question: data.question,
        })
      )
    }
    const handleUserLeft = (data: any) => {
      console.log("data from user left ", data)
      dispatch(
        handleMemberLeft({
          email: data.email,
        })
      )
    }
    // console.log("meeting_started_" + teamId)

    socket.on("user_left_" + teamId, handleUserLeft)
    socket.on("question_asked_" + teamId, handleQuestionAskedIO)

    return () => {
      //   socket.off("user_joined_" + teamId, handleUserJoined)
      socket.off("user_left_" + teamId, handleUserLeft)
      // socket.emit("user-left", {
      //   token: token,
      //   teamId: teamId,
      // })
      userLeftMutate()
    }
  }, [socket])

  const {
    value,
    didEdit,
    error,
    setValue,
    handleFocus,
    handleOnBlur,
    handleOnChange,
    setDidEdit,
  } = useInputValidation("", () => {
    return isNotEmpty(value)
  })

  const handleAskQuestionClicked = () => {
    handleOnBlur()
    if (!canSubmitForm) {
      return
    }
    if (error && !error.chk) {
      return
    }

    console.log("now can ask question!!!", {
      question: value,
      upvotes: 0,
    })
    mutate({
      question: value,
      upvotes: 0,
    })
  }

  const [canSubmitForm, setCanSubmitForm] = useState(false)

  const {
    mutate,
    isError: askQAError,
    isPending,
    reset,
  } = useMutation({
    mutationFn: AskQuestionHandler,
    onSuccess: (data) => {
      console.log("data qa asked-", data)
      setValue("")
      setDidEdit(false)
    },
  })
  if (askQAError) {
    console.log("error in asking question")
    reset()
  }

  //   for validation

  useEffect(() => {
    if (didEdit) {
      setCanSubmitForm(true)
    } else {
      setCanSubmitForm(false)
    }
  }, [didEdit])
  return (
    <>
      {(isLoading || isPending || endLivePending) && <LoadingScreen />}
      <div
        id="QA-Meeting-outer-container"
        className="flex  w-full justify-center"
      >
        <div
          id="QA-Meeting-inner-container"
          className="flex flex-col w-10/12 mb-11 "
        >
          <div className="flex flex-row w-full text-gray-300">
            Welcome to Live QA Meet
            {data && data.existingMeeting.hostEmail == email && (
              <div onClick={handleEndMeeting} className="ml-auto">
                <Button variant={"destructive"}>End Session</Button>
              </div>
            )}
          </div>
          <div className="flex flex-row w-full mt-4 gap-6">
            <div id="left-panel-questions-area" className="flex flex-col w-2/3">
              <div id="question-askink-form" className="flex flex-col">
                <MyTextarea
                  placeholder="What's in your mind ?..... Ask the team about anything"
                  id="question-textarea"
                  style={{
                    height: "6em",
                  }}
                  value={value}
                  onChange={handleOnChange}
                  onFocus={handleFocus}
                  onBlur={handleOnBlur}

                  //   rows={50}
                />
                {didEdit && error && !error.chk && (
                  <div className="text-sm pl-1.5 mt-1.5 text-red-400">
                    {error.message}
                  </div>
                )}
                <div className="mt-3 ml-auto">
                  <Button
                    onClick={handleAskQuestionClicked}
                    className="bg-emerald-400 hover:bg-emerald-400/75 ring-0 focus-visible:ring-0 cursor-pointer text-secondary-foreground"
                  >
                    Ask
                  </Button>
                </div>
                <div id="question-bank" className="my-7">
                  <ScrollArea className="min-h-11">
                    <div className="h-[50vh]">
                      {questions.map((question) => {
                        return (
                          <div
                            id="question-container"
                            className="bg-blue-400/20 p-4 flex-col flex rounded-2xl mb-5"
                            key={question.createdAt}
                          >
                            <div className="flex flex-row">
                              {/* <div>
                                <Button
                                  variant={"outline"}
                                  className="cursor-pointer"
                                  size={"sm"}
                                >
                                  Upvote {question.upvotes}
                                </Button>
                              </div> */}
                              <div className="text-lg text-gray-300 px-3">
                                {question.question}
                              </div>
                            </div>
                            <div className="text-gray-400 ml-auto">
                              Asked {timeAgo(question.createdAt as string)}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
            <div
              id="right-panel-live-members-area"
              className="flex flex-col w-1/3 bg-blue-400/20 p-4 rounded-xl"
            >
              <div className="text-xl text-gray-300">
                Members In Meet : {members.length}
              </div>
              <hr className="text-gray-300 border stroke-1 rounded-2xl my-3" />
              <div className="text-xl text-gray-300">current Members</div>
              <ScrollArea>
                <div className="p-2">
                  {members.map((user) => {
                    return (
                      <Button
                        key={user.userId}
                        variant={"outline"}
                        className="my-3 w-full"
                      >
                        {user.fullname.split(" ")[0]}
                      </Button>
                    )
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default QAMeeting
