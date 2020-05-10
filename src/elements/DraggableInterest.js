import React from 'react';
import { BlockPicker } from 'react-color';
import { Draggable, state } from 'react-page-maker';

function Interest({ interestDetails }) {
  const { name, summary } = interestDetails;
  return(
    <div>
      <h2>{name}</h2>
      <p>{summary}</p>
    </div>
  );
}

class DraggableInterest extends React.Component {
  state = {
    name: '',
  };

  handleChangeComplete = (title) => {
    const { id, dropzoneID, parentID, payload } = this.props;
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

    const itemName = this.state.name || payload && payload.name || 'No Name';

    if (showBasicContent) {
      return (
        <Draggable { ...this.props } >
          {
            <span>Interest - {itemName}</span>
          }
        </Draggable>
      )
    }

    if (showPreview) {
      return (
        <Interest interestDetails={payload} />
      );
    }

    return (
      <Draggable { ...this.props } >
        <header>
          <h2 className="center-heading">Interest - {itemName}</h2>
        </header>
      </Draggable>
    )
  }
};

export default DraggableInterest;
