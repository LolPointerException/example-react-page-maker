import React from 'react';
import { BlockPicker } from 'react-color';
import { Draggable, state } from 'react-page-maker';

class DraggableName extends React.Component {
  state = {
    name: '',
  };

  handleChangeComplete = (name) => {
    const { id, dropzoneID, parentID } = this.props;
    this.setState({ name: name }, () => {
      state.updateElement(id, dropzoneID, parentID, {
        payload: { name: name }
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

    const nameToShow =  this.state.name ||
      payload && payload.name || 'No Name';

    if (showBasicContent) {
      return (
        <Draggable { ...this.props } >
          {
            <span>Name - {nameToShow}</span>
          }
        </Draggable>
      )
    }

    if (showPreview) {
      return (
          <h2 className="center-heading">{nameToShow}</h2>
      );
    }

    return (
      <Draggable { ...this.props } >
        <header>
          <h2 className="center-heading">{nameToShow}</h2>
        </header>
      </Draggable>
    )
  }
};

export default DraggableName;
