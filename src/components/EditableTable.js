import React, { Component } from "react";
import { Table, Input, Icon, Popconfirm } from "antd";
import { connect } from "react-redux";
import { dataSource, dataSourceTmp } from "../store/actions/index";

class EditableCell extends Component {
  state = {
    value: this.props.value,
    editable: false
  };
  handleChange = e => {
    const value = e.target.value;
    this.setState({ value });
  };
  check = () => {
    if (this.state.value.length !== 0) {
      this.setState({ editable: false });
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    }
  };
  edit = () => {
    this.setState({ editable: true });
  };
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {editable ? (
          <div className="editable-cell-input-wrapper">
            <Input
              value={value}
              onChange={this.handleChange}
              onPressEnter={this.check}
            />
            <Icon
              type="check"
              className="editable-cell-icon-check"
              onClick={this.check}
            />
          </div>
        ) : (
          <div className="editable-cell-text-wrapper">
            {value || " "}
            <Icon
              type="edit"
              className="editable-cell-icon"
              onClick={this.edit}
            />
          </div>
        )}
      </div>
    );
  }
}

class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Name Supplier",
        dataIndex: "name",
        width: "30%",
        sorter: true,
        render: (text, record) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(record.key, "name")}
          />
        )
      },
      {
        title: "Address",
        dataIndex: "address",
        width: "40%",
        sorter: true,
        render: (text, record) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(record.key, "address")}
          />
        )
      },
      {
        title: "Phone",
        dataIndex: "phone",
        width: "25%",
        sorter: true,
        render: (text, record) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(record.key, "phone")}
          />
        )
      },
      {
        title: "",
        dataIndex: "operation",
        width: "5%",
        render: (text, record) => {
          return this.props.dataSource.length > 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.onDelete(record.key)}
            >
              <Icon type="delete" theme="twoTone" twoToneColor="red" />
            </Popconfirm>
          ) : null;
        }
      }
    ];
  }

  onCellChange = (key, dataIndex) => {
    return value => {
      const dataSource = [...this.props.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.props.onDataSource(dataSource);
        this.props.onDataSourceTmp(dataSource);
      }
    };
  };

  onDelete = key => {
    const dataSourceTmp = [...this.props.dataSourceTmp];
    const supplierTmp = dataSourceTmp.filter(item => item.key !== key);
    this.props.onDataSource(supplierTmp);
    this.props.onDataSourceTmp(supplierTmp);
  };

  render() {
    return (
      <div>
        <Table
          bordered
          dataSource={this.props.dataSource}
          columns={this.columns}
        />
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(EditableTable);
