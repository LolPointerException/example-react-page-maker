import React from 'react';
import { BlockPicker } from 'react-color';
import { Draggable, state } from 'react-page-maker';

function Education({ educationDetails }) {
  const { area, grade, summary, start, end, highlights } = educationDetails;
  const highlightList = highlights.map((item, index) => (<li key={`${item}-${index}`}>{item}</li>));
  return(
    <div>
      <h2>{grade} {area}</h2>
      <h3>{start} - {end}</h3>
      <p>{summary}</p>
      <h4>Highlights</h4>
      <ul>
        {highlightList}
      </ul>
    </div>
  );
}

class DraggableEducation extends React.Component {
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

    const itemName =  this.state.title ||
      payload && payload.area || 'No Name';

    if (showBasicContent) {
      return (
        <Draggable { ...this.props } >
          {
            <span>Education - {itemName}</span>
          }
        </Draggable>
      )
    }

    if (showPreview) {
      return (
        <Education educationDetails={payload} />
      );
    }

    return (
      <Draggable { ...this.props } >
        <header>
          <h2 className="center-heading">Education - {itemName}</h2>
        </header>
      </Draggable>
    )
  }
};

export default DraggableEducation;
