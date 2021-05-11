import React from 'react'
import InterviewerListItem from './InterviewerListItem'

import 'components/InterviewerList.scss'

export default function InterviewerList (props) {

  const interviewerList = props.interviewers.map( (interviewer) => {
    return <InterviewerListItem 
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={props.interviewer === interviewer.id}
      setInterviewer={props.setInterviewer}
    />;
  })

  return interviewerList;
}