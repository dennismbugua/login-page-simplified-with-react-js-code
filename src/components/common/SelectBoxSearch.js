import React from "react";
import Select from "react-select";

// const options = [
//   { value: { id: 1, name: "roy" }, label: "Roy" },
//   { value: { id: 2, name: "Tom" }, label: "Tom" },
// ];

class SelectBoxSearch extends React.Component {
  state = {
    selectedOption: "",
  };

  // componentDidMount() {
  //   if()
  // }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedUser !== this.props.selectedUser) {
      this.setState({
        selectedOption: this.props.selectedUser,
      });
    }
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.onChange(selectedOption);
  };

  render() {
    const { selectedOption } = this.state;
    const { options } = this.props;
    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

export default SelectBoxSearch;
