import React from 'react';
import { BlockPicker } from 'react-color';
import { Draggable, state } from 'react-page-maker';

function Employment({ employmentDetails }) {
  const { position, employer, summary, start, end, highlights } = employmentDetails;
  const highlightList = highlights.map((item, index) => (<li key={index}>{item}</li>));
  return(
    <div>
      <h2>{position} - {employer}</h2>
      <h3>{start} - {end}</h3>
      <p>{summary}</p>
      <h4>Highlights</h4>
      <ul>
        {highlightList}
      </ul>
    </div>
  );
}

function getName(componentState, payload, isSummary) {
  if (isSummary) {
    return 'Employment Summary';
  }
  return componentState.title || payload && `${payload.position} - ${payload.employer}` || 'No Name';
}

class DraggableEmployment extends React.Component {
  state = {
    name: '',
  };

  handleChangeComplete = (title) => {
    const { id, dropzoneID, parentID, payload } = this.props;
    const isSummary = payload.hasOwnProperty('other');
    const itemName = getName({}, payload, isSummary);
    this.setState({ title: itemName }, () => {
      state.updateElement(id, dropzoneID, parentID, {
        payload: { title: itemName }
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

    const isSummary = payload.hasOwnProperty('history');

    const itemName = getName(state, payload, isSummary);

    if (showBasicContent) {
      return (
        <Draggable { ...this.props } >
          {
            <span>Employment - {itemName}</span>
          }
        </Draggable>
      )
    }

    if (showPreview) {
      if (isSummary) {
        return (
          <p>{payload.summary}</p>
        )
      }
      return (
        <Employment employmentDetails={payload} />
      );
    }

    return (
      <Draggable { ...this.props } >
        <header>
          <h2 className="center-heading">Employment - {itemName}</h2>
        </header>
      </Draggable>
    )
  }
};

export default DraggableEmployment;
