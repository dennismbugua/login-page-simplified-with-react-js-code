import React, { Component } from "react";
//import moment from 'moment'
//import 'moment/locale/zh-cn';
import Scheduler, {
  SchedulerData,
  ViewTypes,
  // DATE_FORMAT,
} from "react-big-scheduler";
// import { DemoData } from "../../../pages/test/DemoData";
import withDragDropContext from "../../../withDnDContext";
import { connect } from "react-redux";
// import moment from "moment";
import "react-big-scheduler/lib/css/style.css";
import { Button } from "reactstrap";

let schedulerData = new SchedulerData(
  new Date(),
  ViewTypes.Week,
  false,
  false,
  {
    // minuteStep: 15
  }
);
class Basic extends Component {
  constructor(props) {
    super(props);

    // let schedulerData = new SchedulerData(
    //   new moment("2017-12-18").format(DATE_FORMAT),
    //   ViewTypes.Week
    // );
    // let schedulerData = new SchedulerData(
    //   new Date(),
    //   ViewTypes.Week,
    //   false,
    //   false,
    //   {
    //     // minuteStep: 15
    //   }
    // );

    // schedulerData.localeMoment.locale("en");

    // schedulerData.setResources(DemoData.resources);

    // schedulerData.setEvents(DemoData.events);
    this.state = {
      //   viewModel: schedulerData,
      calendarShedularData: {},
    };
  }

  componentDidUpdate(prevProps) {
    const { fullTaskArr } = this.props.fullTaskArr;

    if (prevProps.fullTaskArr.fullTaskArr.length !== fullTaskArr.length) {
      this.dataPopulationReactScheduler(fullTaskArr);
    }
  }

  componentDidMount() {
    const { fullTaskArr, empTask } = this.props.fullTaskArr;
    // let taskList = empTask.filter((el) => el.status === "inProgress");
    this.dataPopulationReactScheduler(empTask);
  }

  // func to handle data population in react-big-schedular, for componentDidMout & componentDidUpdate.
  dataPopulationReactScheduler = (fullTaskArr) => {
    // get the unique name.
    let resources = this.getProjectNames(fullTaskArr);
    let events = this.getEvents(fullTaskArr);
    const calendarData = { resources: resources, events: events };
    // console.log(calendarData);
    schedulerData.setResources(calendarData.resources);
    schedulerData.setEvents(calendarData.events);
    schedulerData.config.schedulerWidth = "80%";
    this.setState({
      calendarShedularData: schedulerData,
      calendarData: calendarData,
    });
  };

  // get project name, no repeatations.
  getProjectNames = (fullTaskArr) => {
    let projectNameArr = Array.from(
      new Set(fullTaskArr.map((tasks) => tasks.projectId))
    ).map((id) => {
      console.log(id);
      return {
        id: id,
        name: fullTaskArr.find((el) => el.projectId === id).projectName,
      };
    });
    console.log(projectNameArr);
    return projectNameArr;
    // return [];
  };

  //   to make the events for the calender.
  getEvents = (fullTaskArr) => {
    let taskColor = ["#FA9E95", "#6a7d15", "#6a7d15", "#a6120d"];
    let allEvents = fullTaskArr.map((el) => {
      // // add a date to
      // let taskEndDate = new Date(el.createdDate);
      // taskEndDate.setDate(taskEndDate.getDate() + 1);
      // // convert the end date to string to resolve console err.
      // let endDate = `${
      //   taskEndDate.getMonth() + 1
      // }-${taskEndDate.getDate()}-${taskEndDate.getFullYear()}`;
      // console.log(el.createdDate + " 23:30:00");
      return {
        id: el.taskId,
        start: el.createdDate,
        end: el.createdDate + " 23:30:00",
        resourceId: el.projectId,
        title: el.taskTitle,
        bgColor: taskColor[Math.floor(Math.random() * taskColor.length)],
        //   showPopover: false,
      };
    });
    return allEvents;
  };

  render() {
    const { calendarShedularData } = this.state;
    const { handleToggleAllTaskCalendar } = this.props;
    // console.log(viewModel);
    // console.log(calendarData);

    return (
      <div>
        <Button
          outline
          className="primary mt-2"
          onClick={handleToggleAllTaskCalendar}
        >
          <i className="fas fa-arrow-left"></i> Back
        </Button>
        {Object.keys(calendarShedularData).length > 0 ? (
          <Scheduler
            schedulerData={calendarShedularData}
            prevClick={this.prevClick}
            nextClick={this.nextClick}
            onSelectDate={this.onSelectDate}
            onViewChange={this.onViewChange}
            eventItemClick={this.eventClicked}
            viewEventClick={this.ops1}
            viewEventText="Ops 1"
            viewEvent2Text="Ops 2"
            viewEvent2Click={this.ops2}
            updateEventStart={this.updateEventStart}
            updateEventEnd={this.updateEventEnd}
            moveEvent={this.moveEvent}
            newEvent={this.newEvent}
          />
        ) : null}
        {/* {viewModel !== null ? (
          <Scheduler
            schedulerData={viewModel}
            prevClick={this.prevClick}
            nextClick={this.nextClick}
            onSelectDate={this.onSelectDate}
            onViewChange={this.onViewChange}
            eventItemClick={this.eventClicked}
            viewEventClick={this.ops1}
            viewEventText="Ops 1"
            viewEvent2Text="Ops 2"
            viewEvent2Click={this.ops2}
            updateEventStart={this.updateEventStart}
            updateEventEnd={this.updateEventEnd}
            moveEvent={this.moveEvent}
            newEvent={this.newEvent}
          />
        ) : null} */}
      </div>
    );
  }

  prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(this.state.calendarData.events);
    this.setState({
      calendarShedularData: schedulerData,
    });
  };

  nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(this.state.calendarData.events);
    this.setState({
      calendarShedularData: schedulerData,
    });
  };

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(this.state.calendarData.events);
    this.setState({
      calendarShedularData: schedulerData,
    });
  };

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(this.state.calendarData.events);
    this.setState({
      calendarShedularData: schedulerData,
    });
  };

  eventClicked = (schedulerData, event) => {
    alert(
      `You just clicked an event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  ops1 = (schedulerData, event) => {
    alert(
      `You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  ops2 = (schedulerData, event) => {
    alert(
      `You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    let newFreshId = 0;
    schedulerData.events.forEach((item) => {
      if (item.id >= newFreshId) newFreshId = item.id + 1;
    });

    let newEvent = {
      id: newFreshId,
      title: "New event you just created",
      start: start,
      end: end,
      resourceId: slotId,
      bgColor: "purple",
    };
    schedulerData.addEvent(newEvent);
    this.setState({
      calendarShedularData: schedulerData,
    });
  };

  updateEventStart = (schedulerData, event, newStart) => {
    schedulerData.updateEventStart(event, newStart);
    this.setState({
      calendarShedularData: schedulerData,
    });
  };

  updateEventEnd = (schedulerData, event, newEnd) => {
    schedulerData.updateEventEnd(event, newEnd);
    this.setState({
      calendarShedularData: schedulerData,
    });
  };

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    schedulerData.moveEvent(event, slotId, slotName, start, end);
    this.setState({
      calendarShedularData: schedulerData,
    });
  };
}

const mapStateToProps = (state) => ({
  fullTaskArr: state.taskReducer,
});

export default connect(mapStateToProps, {})(withDragDropContext(Basic));
