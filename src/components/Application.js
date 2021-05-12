import React, { useEffect, useState } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import axios from "axios";
import getAppointmentsForDay from "helpers/selectors";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm"
  },
];

export default function Application(props) {

  const [state, setState] = useState( {
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = [];

  useEffect( () => {
    const promises = [axios.get('/api/days'), axios.get('/api/appointments')];
    Promise.all(promises).then( (res) => {
      setState(prev => ({ ...prev, days: res[0].data, appointments: res[1].data}));
    });
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={ day => setState({...state, day}) }
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {getAppointmentsForDay(state, state.day).map( (appointment) => {
          return <Appointment 
          key={appointment.id} {...appointment}/>
        })}
      </section>
    </main>
  );
}
