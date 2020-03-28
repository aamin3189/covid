import React, { Component } from "react";
import { Modal, List, Button,Radio} from 'antd-mobile';
import PropTypes from 'prop-types';

const RadioItem = Radio.RadioItem;

class CommonModal extends Component {


  state = {
      sorts : ["Total","Active Case","Deaths","New Deaths","New Cases","Death per 1 Million","Recovered"],
  }
  render() {
    return (
      <div>
        <Modal
          popup
          visible={this.props.visible}
          onClose={this.props.onClose}
          animationType="slide-up"
          afterClose={this.props.afterClose}
        >
          <List renderHeader={() => <div>Sort By</div>} className="popup-list">
            {
                this.state.sorts.map((itx,index)=>(
                    // <List.Item key={index}>
                        <RadioItem key={itx} checked={this.props.selected === itx} onChange={() => this.props.selectSort(itx)}>
                            {itx}
                        </RadioItem>      
                    // </List.Item>
                ))
            }
            <List.Item>
              <Button type="primary" onClick={this.props.onClose}>
                Apply
              </Button>
            </List.Item>
          </List>
        </Modal>
      </div>
    );
  }
}

CommonModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    afterClose: PropTypes.func
}

export default CommonModal;
