// import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Component } from 'react';
import {
  Header,
  Form,
  Button,
  Label,
  Input,
} from '../Searchbar/Searchbar.styled';

import 'react-toastify/dist/ReactToastify.css';
//
//
export class SearchBar extends Component {
  state = {
    search: '',
  };
  handleInputChange = e => {
    this.setState({ search: e.currentTarget.value });
    //  console.log({ earch: e.currentTarget.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') {
      return toast.error('Введите слово для поиска');
    }
    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
  };
  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <Label>Search</Label>
          </Button>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.handleInputChange}
          />
        </Form>
      </Header>
    );
  }
}

export default SearchBar;
