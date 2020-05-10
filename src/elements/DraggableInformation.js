import React from 'react';
import { BlockPicker } from 'react-color';
import { Draggable, state } from 'react-page-maker';

function getName(componentState, payload, isSummary) {
  if (isSummary) {
    return 'Contact details';
  }
  return componentState.label || payload && payload.label || 'No Name';
}

const renderableContactDetails = ['email', 'phone', 'website'];

function ContactDetails({ contactDetails }) {
  const items = Object.keys(contactDetails)
  .filter((item) => renderableContactDetails.includes(item))
  .flatMap((item, index) => [<dt key={`dl-${index}`}>{item}</dt>, <dd key={`dd-${index}`}>{contactDetails[item]}</dd>])
  return (
    <dl>
      {items}
    </dl>
  )
}

class DraggableInformation extends React.Component {
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

    const isSummary = payload.hasOwnProperty('other');

    const itemName = getName(this.state, payload, isSummary);

    if (showBasicContent) {
      return (
        <Draggable { ...this.props } >
          {
            <span>Info - {itemName}</span>
          }
        </Draggable>
      )
    }

    if (showPreview) {
      if (isSummary) {
        return (
          <ContactDetails contactDetails={payload} />
        );
      }
      return (
        <dl>
          <dt>{payload.label}</dt>
          <dd>{payload.value}</dd>
        </dl>
      )
    }

    return (
      <Draggable { ...this.props } >
        <header>
          <h2 className="center-heading">{itemName}</h2>
        </header>
      </Draggable>
    )
  }
};

export default DraggableInformation;
