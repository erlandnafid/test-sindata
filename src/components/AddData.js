import React, { Component } from "react";
import { connect } from "react-redux";
import { dataSource, dataSourceTmp } from "../store/actions/index";
import { Modal, Button, Icon, Form, Input, Row, Col } from "antd";

class AddData extends Component {
  state = {
    loading: false,
    visible: false,
    isFill: true,
    validation: {
      name: "",
      address: "",
      phone: ""
    },
    supplier: {
      key: "",
      name: "",
      address: "",
      phone: ""
    }
  };

  inputHandler = (value, event) => {
    const supplier = this.state.supplier;
    const validation = this.state.validation;
    supplier[value] = event.target.value;
    validation[value] = event.target.value.length < 1 ? "error" : "success";
    this.setState({
      [supplier]: supplier,
      [validation]: validation
    });

    this.state.supplier.name &&
    this.state.supplier.address &&
    this.state.supplier.phone
      ? this.setState({ isFill: false })
      : this.setState({ isFill: true });
  };

  _toggleModal = () => {
    this.setState({
      visible: true
    });
  };

  _onRefresh = () => {
    this.props.onDataSource(this.props.dataSourceTmp)
  };

  _onSave = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      let dataSource = this.props.dataSource;
      let dataSourceTmp = this.props.dataSourceTmp;

      const newData = {
        key: `${this.state.supplier.name}${Math.random()}`,
        name: this.state.supplier.name,
        address: this.state.supplier.address,
        phone: this.state.supplier.phone
      };

      dataSource = [newData, ...dataSource];
      dataSourceTmp = [newData, ...dataSourceTmp];
      this.props.onDataSource(dataSource);
      this.props.onDataSourceTmp(dataSourceTmp);
      this.setState({
        loading: false,
        visible: false,
        isFill: true,
        validation: {
          name: "",
          address: "",
          phone: ""
        },
        supplier: {
          key: "",
          name: "",
          address: "",
          phone: ""
        }
      });
    }, 1000);
  };

  _onCancle = () => {
    this.setState({
      loading: false,
      visible: false,
      isFill: true,
      validation: {
        name: "",
        address: "",
        phone: ""
      },
      supplier: {
        key: "",
        name: "",
        address: "",
        phone: ""
      }
    });
  };

  render() {
    const { visible, loading } = this.state;

    return (
      <div>
        <Icon
          type="diff"
          theme="twoTone"
          className="custom-icon"
          onClick={this._toggleModal}
        />
        <Icon type="reload" className="custom-icon" onClick={this._onRefresh} />

        <Modal
          visible={visible}
          title="Supplier Administration"
          onOk={this._onSave}
          onCancel={this._onCancle}
          width={750}
          maskClosable={false}
          footer={[
            <Button key="back" onClick={this._onCancle}>
              Cancle
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              disabled={this.state.isFill}
              onClick={this._onSave}
            >
              Save
            </Button>
          ]}
        >
          <Form layout="horizontal" style={{ textAlign: "center" }}>
            <Row gutter={15}>
              <Col span={10}>
                <Form.Item
                  hasFeedback
                  label="Supplier Name"
                  validateStatus={this.state.validation.name}
                >
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    // placeholder="Supplier Name"
                    value={this.state.supplier.name}
                    onChange={this.inputHandler.bind(this, "name")}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  hasFeedback
                  label="Address"
                  validateStatus={this.state.validation.address}
                >
                  <Input
                    prefix={
                      <Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    // placeholder="Address"
                    value={this.state.supplier.address}
                    onChange={this.inputHandler.bind(this, "address")}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  hasFeedback
                  label="Phone"
                  validateStatus={this.state.validation.phone}
                >
                  <Input
                    prefix={
                      <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    // placeholder="Phone"
                    type="number"
                    value={this.state.supplier.phone}
                    onChange={this.inputHandler.bind(this, "phone")}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: "add_data" })(AddData);

const mapStateToProps = state => {
  return {
    dataSource: state.main.dataSource,
    dataSourceTmp: state.main.dataSourceTmp
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDataSource: item => dispatch(dataSource(item)),
    onDataSourceTmp: item => dispatch(dataSourceTmp(item))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedHorizontalLoginForm);
