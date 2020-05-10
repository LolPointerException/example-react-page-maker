import React from 'react';
import { BlockPicker } from 'react-color';
import { Draggable, state } from 'react-page-maker';

function Project({ projectDetails }) {
  const { title, description, summary, start, end, highlights } = projectDetails;
  const highlightList = highlights.map((item, index) => (<li key={index}>{item}</li>));
  return(
    <div>
      <h2>{title}</h2>
      <h3>{start} - {end}</h3>
      <p>{summary}</p>
      <h4>Highlights</h4>
      <ul>
        {highlightList}
      </ul>
    </div>
  );
}

class DraggableProject extends React.Component {
  state = {
    name: '',
  };

  handleChangeComplete = (title) => {
    const { id, dropzoneID, parentID } = this.props;
    this.setState({ title: title }, () => {
      state.updateElement(id, dropzoneID, parentID, {
        payload: { title: title }
      });
    });
  };

  render() {
    const {
      id,
      showBasicContent,
      showPreview,
      dropzoneID,
      parentID,
      name,
      payload
    } = this.props;

    const nameToShow =  this.state.title ||
      payload && payload.title || 'No Name';

    if (showBasicContent) {
      return (
        <Draggable { ...this.props } >
          {
            <span>Project - {nameToShow}</span>
          }
        </Draggable>
      )
    }

    if (showPreview) {
      return (
        <Project projectDetails={payload} />
      );
    }

    return (
      <Draggable { ...this.props } >
        <header>
          <h2 className="center-heading">Project - {nameToShow}</h2>
        </header>
      </Draggable>
    )
  }
};

export default DraggableProject;
